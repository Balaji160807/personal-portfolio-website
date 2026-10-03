import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      react(),
      {
        name: 'contact-api-dev-middleware',
        configureServer(server) {
          server.middlewares.use('/api/contact', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Method Not Allowed' }));
              return;
            }

            let bodyStr = '';
            req.on('data', (chunk) => {
              bodyStr += chunk;
            });

            req.on('end', async () => {
              try {
                // Dynamically reload .env on each request so user changes take effect immediately
                const currentEnv = loadEnv(mode, process.cwd(), '');
                process.env.RESEND_API_KEY = currentEnv.RESEND_API_KEY || process.env.RESEND_API_KEY;
                process.env.CONTACT_EMAIL = currentEnv.CONTACT_EMAIL || process.env.CONTACT_EMAIL || 'balajicloud16@gmail.com';
                process.env.FROM_EMAIL = currentEnv.FROM_EMAIL || process.env.FROM_EMAIL;

                const body = JSON.parse(bodyStr || '{}');

                const { validateContactPayload } = await import('./src/lib/sanitize');
                const { checkRateLimit } = await import('./src/lib/rateLimit');
                const { getResendClient } = await import('./src/lib/email/resendClient');
                const { sendOwnerNotification } = await import('./src/lib/email/sendOwnerNotification');
                const { sendVisitorConfirmation } = await import('./src/lib/email/sendVisitorConfirmation');
                const { sendDirectRelay } = await import('./src/lib/email/sendDirectRelay');

                const forwarded = req.headers['x-forwarded-for'];
                const ip = Array.isArray(forwarded)
                  ? forwarded[0]
                  : typeof forwarded === 'string'
                  ? forwarded.split(',')[0].trim()
                  : req.socket.remoteAddress || '127.0.0.1';

                const rate = checkRateLimit(ip);
                if (!rate.allowed) {
                  res.statusCode = 429;
                  res.setHeader('Content-Type', 'application/json');
                  res.setHeader('Retry-After', String(rate.retryAfter || 60));
                  res.end(
                    JSON.stringify({
                      success: false,
                      error: `Too many submissions. Please wait ${rate.retryAfter || 60} seconds before attempting again.`,
                    })
                  );
                  return;
                }

                const validation = validateContactPayload(body);
                if (!validation.valid || !validation.sanitized) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(
                    JSON.stringify({
                      success: false,
                      error: 'Please correct the validation errors below',
                      fieldErrors: validation.errors,
                    })
                  );
                  return;
                }

                const payload = validation.sanitized;
                const apiKey = (process.env.RESEND_API_KEY || '').trim();

                // Priority 1: Resend (if configured)
                if (apiKey) {
                  const { client } = getResendClient();
                  if (client) {
                    const owner = await sendOwnerNotification(payload);
                    if (owner.success) {
                      const visitor = await sendVisitorConfirmation(payload);
                      res.statusCode = 200;
                      res.setHeader('Content-Type', 'application/json');
                      res.end(
                        JSON.stringify({
                          success: true,
                          ownerDelivered: true,
                          confirmationDelivered: visitor.success,
                          provider: 'resend',
                          warning: visitor.domainRestricted
                            ? 'Message delivered to Balaji! (Auto-confirmation requires custom domain verification on Resend).'
                            : undefined,
                          message: 'Your message has been received! Balaji has been notified.',
                        })
                      );
                      return;
                    }
                    console.warn('[Vite Dev API] Resend dispatch failed, attempting direct cloud relay:', owner.error);
                  }
                }

                // Priority 2: Direct Cloud Relay (delivers straight to balajicloud16@gmail.com)
                const directResult = await sendDirectRelay(payload);
                if (directResult.success) {
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(
                    JSON.stringify({
                      success: true,
                      ownerDelivered: true,
                      provider: 'direct-relay',
                      message: directResult.message || 'Your message has been received! Delivered directly to Balaji R.',
                    })
                  );
                  return;
                }

                res.statusCode = 502;
                res.setHeader('Content-Type', 'application/json');
                res.end(
                  JSON.stringify({
                    success: false,
                    error: directResult.error || 'Unable to deliver message. Please contact balajicloud16@gmail.com directly.',
                  })
                );
              } catch (err: any) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: err?.message || 'Server processing error' }));
              }
            });
          });
        },
      },
    ],
  };
});
