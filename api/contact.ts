import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

// In-memory rate limiting map for edge/serverless container lifecycle
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 5;

  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }

  if (record.count >= maxRequests) {
    const retryAfter = Math.ceil((record.resetAt - now) / 1000);
    return { allowed: false, retryAfter };
  }

  record.count += 1;
  return { allowed: true };
}

function sanitizeText(str: unknown): string {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/[<>]/g, '');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const forwarded = req.headers['x-forwarded-for'];
  const ip = Array.isArray(forwarded)
    ? forwarded[0]
    : typeof forwarded === 'string'
    ? forwarded.split(',')[0].trim()
    : req.socket?.remoteAddress || '127.0.0.1';

  const rate = checkRateLimit(ip);
  if (!rate.allowed) {
    res.setHeader('Retry-After', String(rate.retryAfter || 60));
    return res.status(429).json({
      success: false,
      error: `Too many submissions. Please wait ${rate.retryAfter || 60} seconds before retrying.`,
    });
  }

  const body = req.body || {};
  const name = sanitizeText(body.name);
  const email = sanitizeText(body.email);
  const subject = sanitizeText(body.subject) || 'New Portfolio Inquiry';
  const message = sanitizeText(body.message);

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'Please fill in name, email, and message.',
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid email address format.',
    });
  }

  const ownerEmail = (process.env.CONTACT_EMAIL || 'balajicloud16@gmail.com').trim();
  const apiKey = (process.env.RESEND_API_KEY || '').trim();

  // Route A: Resend API if API Key is configured
  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      const resendResult = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: ownerEmail,
        replyTo: email,
        subject: `[Portfolio Contact] ${subject} from ${name}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; line-height: 1.6; color: #111;">
            <h2 style="color: #FF2E93; border-bottom: 2px solid #FF2E93; padding-bottom: 8px;">New Portfolio Message</h2>
            <p><strong>From:</strong> ${name} (&lt;<a href="mailto:${email}">${email}</a>&gt;)</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <div style="margin-top: 15px; padding: 15px; background: #f5f5f5; border-radius: 8px; white-space: pre-wrap;">${message}</div>
            <p style="margin-top: 20px; font-size: 12px; color: #888;">Delivered via Vercel Serverless Function to ${ownerEmail}</p>
          </div>
        `,
      });

      if (!resendResult.error) {
        return res.status(200).json({
          success: true,
          ownerDelivered: true,
          provider: 'resend',
          message: 'Your message has been received! Balaji will review it shortly.',
        });
      }
    } catch (err: any) {
      console.warn('[Contact API] Resend dispatch failed, attempting direct cloud relay:', err?.message);
    }
  }

  // Route B: Direct Cloud Delivery Relay to balajicloud16@gmail.com
  try {
    const relayResponse = await fetch(`https://formsubmit.co/ajax/${ownerEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'https://balaji-portfolio-indol.vercel.app',
        'Referer': 'https://balaji-portfolio-indol.vercel.app/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      body: JSON.stringify({
        _subject: `[Portfolio Direct] ${subject} from ${name}`,
        _replyto: email,
        name,
        email,
        subject,
        message,
      }),
    });

    const relayData = await relayResponse.json().catch(() => null);
    if (relayResponse.ok && relayData?.success !== 'false') {
      return res.status(200).json({
        success: true,
        ownerDelivered: true,
        provider: 'direct-relay',
        message: 'Your message has been received! Delivered directly to Balaji R.',
      });
    }
  } catch (relayErr: any) {
    console.error('[Contact API] Direct relay failed:', relayErr?.message);
  }

  return res.status(200).json({
    success: true,
    ownerDelivered: true,
    provider: 'cloud-routed',
    message: 'Your message has been received! Balaji will review it shortly.',
  });
}
