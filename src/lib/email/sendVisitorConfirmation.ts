import { getResendClient } from './resendClient';
import { getFromEmail } from './sendOwnerNotification';

interface VisitorConfirmationParams {
  name: string;
  email: string;
  subject: string;
}

export async function sendVisitorConfirmation(
  params: VisitorConfirmationParams
): Promise<{ success: boolean; id?: string; error?: string; domainRestricted?: boolean }> {
  const { client, error: clientError } = getResendClient();

  if (clientError || !client) {
    return { success: false, error: clientError || 'Email client not initialized' };
  }

  const fromEmail = getFromEmail();
  const ownerEmail = (process.env.CONTACT_EMAIL || 'balajicloud16@gmail.com').trim();

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Thanks for reaching out</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF9F6; color: #0E0E10;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #E5E4E1; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    <tr>
      <td style="padding: 32px 36px; background-color: #FAF9F6; border-bottom: 1px solid #E5E4E1;">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td>
              <div style="display: inline-block; width: 8px; height: 8px; background-color: #FF2E93; border-radius: 50%; margin-right: 8px;"></div>
              <span style="font-family: -apple-system, sans-serif; font-size: 16px; font-weight: 800; letter-spacing: 1px; color: #0E0E10; text-transform: uppercase;">BALAJI R</span>
              <span style="font-family: monospace; font-size: 11px; color: #6B7280; display: block; margin-top: 4px; text-transform: uppercase; letter-spacing: 0.5px;">AWS Cloud Engineer • DevOps • Backend</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding: 36px; line-height: 1.6; font-size: 15px; color: #18181B;">
        <p style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #0E0E10;">
          Hi ${params.name},
        </p>
        <p style="margin: 0 0 16px 0; color: #374151;">
          Thanks for reaching out through my portfolio website.
        </p>
        <p style="margin: 0 0 16px 0; color: #374151;">
          I've received your message regarding <strong>"${params.subject}"</strong> and will review it as soon as possible.
        </p>
        <p style="margin: 0 0 28px 0; color: #374151;">
          I appreciate you taking the time to connect with me.
        </p>
        <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="border-top: 1px solid #F1F1EF; padding-top: 20px; width: 100%;">
          <tr>
            <td>
              <p style="margin: 0 0 4px 0; font-weight: 700; color: #0E0E10; font-size: 15px;">Best regards,</p>
              <p style="margin: 0 0 4px 0; font-size: 14px; color: #0E0E10; font-weight: 600;">Balaji R</p>
              <p style="margin: 0 0 4px 0; font-size: 13px; color: #6B7280;">AWS Cloud Engineer | DevOps | Backend Engineering</p>
              <p style="margin: 0 0 8px 0; font-size: 13px; color: #6B7280;">Coimbatore, Tamil Nadu, India</p>
              <p style="margin: 0; font-size: 13px;">
                <a href="https://linkedin.com/in/balaji-r-219a65332" target="_blank" style="color: #FF2E93; text-decoration: none; font-family: monospace; font-weight: bold;">
                  LinkedIn: linkedin.com/in/balaji-r-219a65332 ↗
                </a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding: 18px 36px; background-color: #FAF9F6; border-top: 1px solid #E5E4E1; font-size: 11px; color: #9CA3AF; font-family: monospace; text-align: center;">
        This is an automated confirmation email dispatched from portfolio contact endpoint. Direct inquiries: ${ownerEmail}
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const textContent = `Hi ${params.name},\n\nThanks for reaching out through my portfolio website.\n\nI've received your message regarding "${params.subject}" and will review it as soon as possible.\n\nI appreciate you taking the time to connect with me.\n\nBest regards,\n\nBalaji R\nAWS Cloud Engineer | DevOps | Backend Engineering\nCoimbatore, India\n\nLinkedIn: linkedin.com/in/balaji-r-219a65332\n\nThis is an automated confirmation email.`;

  try {
    const response = await client.emails.send({
      from: fromEmail,
      to: [params.email],
      replyTo: ownerEmail,
      subject: 'Thanks for reaching out — I received your message',
      html: htmlContent,
      text: textContent,
    });

    if (response.error) {
      // Check if Resend testing restriction triggered
      const msg = response.error.message || '';
      if (msg.includes('only send testing emails to your own email address') || msg.includes('validation_error')) {
        return {
          success: false,
          domainRestricted: true,
          error: 'Resend free testing domain (onboarding@resend.dev) can only deliver to the account owner until a custom domain is verified.',
        };
      }
      return { success: false, error: response.error.message };
    }

    return { success: true, id: response.data?.id };
  } catch (err: any) {
    const msg = err?.message || '';
    if (msg.includes('only send testing emails to your own email address')) {
      return {
        success: false,
        domainRestricted: true,
        error: 'Resend testing domain restriction',
      };
    }
    return { success: false, error: msg || 'Failed to dispatch visitor confirmation' };
  }
}
