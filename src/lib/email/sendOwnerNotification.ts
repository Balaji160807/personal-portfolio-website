import { getResendClient } from './resendClient';

interface OwnerNotificationParams {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp?: string;
}

export function getFromEmail(): string {
  const raw = (process.env.FROM_EMAIL || '').trim();
  // Resend free tier on onboarding@resend.dev strictly prohibits friendly names like "Balaji R <onboarding@resend.dev>"
  if (!raw || raw.includes('onboarding@resend.dev')) {
    return 'onboarding@resend.dev';
  }
  return raw;
}

export async function sendOwnerNotification(
  params: OwnerNotificationParams
): Promise<{ success: boolean; id?: string; error?: string }> {
  const { client, error: clientError } = getResendClient();

  if (clientError || !client) {
    return { success: false, error: clientError || 'Email client not initialized' };
  }

  const ownerEmail = (process.env.CONTACT_EMAIL || 'balajicloud16@gmail.com').trim();
  const fromEmail = getFromEmail();
  const receivedAt = params.timestamp || new Date().toUTCString();

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>New Portfolio Message</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF9F6; color: #0E0E10;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #E5E4E1; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    <tr>
      <td style="padding: 28px 32px; background-color: #0B0B0D; color: #ffffff;">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td>
              <span style="font-family: monospace; font-size: 11px; letter-spacing: 2px; color: #FF2E93; font-weight: bold; text-transform: uppercase;">TRANSMISSION RECEIVED</span>
              <h1 style="margin: 6px 0 0 0; font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">NEW PORTFOLIO MESSAGE</h1>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding: 32px;">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
          <tr>
            <td style="padding-bottom: 12px; font-size: 13px; font-family: monospace; color: #6B7280; text-transform: uppercase;">From:</td>
            <td style="padding-bottom: 12px; font-size: 15px; font-weight: 600; color: #0E0E10;">${params.name}</td>
          </tr>
          <tr>
            <td style="padding-bottom: 12px; font-size: 13px; font-family: monospace; color: #6B7280; text-transform: uppercase;">Email:</td>
            <td style="padding-bottom: 12px; font-size: 15px; color: #0E0E10;"><a href="mailto:${params.email}" style="color: #FF2E93; text-decoration: none;">${params.email}</a></td>
          </tr>
          <tr>
            <td style="padding-bottom: 12px; font-size: 13px; font-family: monospace; color: #6B7280; text-transform: uppercase;">Subject:</td>
            <td style="padding-bottom: 12px; font-size: 15px; font-weight: 600; color: #0E0E10;">${params.subject}</td>
          </tr>
          <tr>
            <td style="padding-bottom: 12px; font-size: 13px; font-family: monospace; color: #6B7280; text-transform: uppercase;">Received:</td>
            <td style="padding-bottom: 12px; font-size: 13px; color: #6B7280; font-family: monospace;">${receivedAt}</td>
          </tr>
        </table>
        <div style="background-color: #FAF9F6; border: 1px solid #E5E4E1; border-radius: 12px; padding: 20px; margin-bottom: 28px;">
          <span style="display: block; font-family: monospace; font-size: 11px; color: #6B7280; text-transform: uppercase; margin-bottom: 8px; font-weight: bold;">Message:</span>
          <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #18181B; white-space: pre-wrap;">${params.message}</p>
        </div>
        <table role="presentation" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td style="border-radius: 9999px; background: #0E0E10;">
              <a href="mailto:${params.email}?subject=Re: ${encodeURIComponent(params.subject)}" target="_blank" style="font-family: monospace; font-size: 13px; font-weight: bold; letter-spacing: 0.5px; text-transform: uppercase; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 9999px; display: inline-block;">
                REPLY TO VISITOR ↗
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px 32px; background-color: #FAF9F6; border-top: 1px solid #E5E4E1; font-size: 12px; color: #6B7280; font-family: monospace;">
        Sent via Balaji R Portfolio Contact Gateway • Auto-forwarded to ${ownerEmail}
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  try {
    const response = await client.emails.send({
      from: fromEmail,
      to: [ownerEmail],
      replyTo: params.email,
      subject: `[Portfolio Inquiry] ${params.subject} — from ${params.name}`,
      html: htmlContent,
      text: `NEW PORTFOLIO MESSAGE\n\nFrom: ${params.name}\nEmail: ${params.email}\nSubject: ${params.subject}\nReceived: ${receivedAt}\n\nMessage:\n${params.message}\n\nReply directly to this email to respond to ${params.name}.`,
    });

    if (response.error) {
      return { success: false, error: response.error.message };
    }

    return { success: true, id: response.data?.id };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to dispatch owner notification' };
  }
}
