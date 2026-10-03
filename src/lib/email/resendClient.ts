import { Resend } from 'resend';

export function getResendClient(): { client: Resend | null; error: string | null } {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey || apiKey.trim() === '') {
    return {
      client: null,
      error: 'RESEND_API_KEY is not configured in environment variables. Please provide a valid key in .env.local or your hosting environment.',
    };
  }

  try {
    const client = new Resend(apiKey.trim());
    return { client, error: null };
  } catch (err: any) {
    return { client: null, error: err?.message || 'Failed to initialize Resend client' };
  }
}
