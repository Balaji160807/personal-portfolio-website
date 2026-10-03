interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const ipMap = new Map<string, RateLimitRecord>();

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5; // Max 5 submissions per 10 minutes per IP

/**
 * Basic in-memory rate limiter for contact form endpoints
 */
export function checkRateLimit(ip: string): { allowed: boolean; remaining: number; retryAfter?: number } {
  const now = Date.now();
  const record = ipMap.get(ip);

  // Clean stale records periodically
  if (ipMap.size > 1000) {
    for (const [key, val] of ipMap.entries()) {
      if (now > val.resetTime) {
        ipMap.delete(key);
      }
    }
  }

  if (!record || now > record.resetTime) {
    ipMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  if (record.count >= MAX_REQUESTS) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, remaining: 0, retryAfter };
  }

  record.count += 1;
  return { allowed: true, remaining: MAX_REQUESTS - record.count };
}
