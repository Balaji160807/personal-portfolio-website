interface DirectRelayParams {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Direct HTTPS transactional mail relay sending to Balaji's destination email
 * Ensures messages are delivered even if Resend API key has not yet been populated in .env.local
 */
export async function sendDirectRelay(
  params: DirectRelayParams
): Promise<{ success: boolean; message?: string; error?: string; activationNeeded?: boolean }> {
  try {
    const destination = (process.env.CONTACT_EMAIL || 'balajicloud16@gmail.com').trim();
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(destination)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Origin: 'https://balajir.dev',
        Referer: 'https://balajir.dev/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
      },
      body: JSON.stringify({
        _subject: `[Portfolio Inquiry] ${params.subject} — from ${params.name}`,
        name: params.name,
        email: params.email,
        subject: params.subject,
        message: params.message,
        _replyto: params.email,
        _template: 'table',
      }),
    });

    const data = (await response.json()) as any;
    if (data?.success === 'true' || data?.success === true) {
      return { success: true, message: 'Message delivered directly to Balaji R.' };
    }

    // FormSubmit initial activation link sent to Balaji's email
    if (data?.message && (data.message.includes('Activation') || data.message.includes('activation'))) {
      return {
        success: true,
        activationNeeded: true,
        message:
          "Form submitted! FormSubmit sent a one-time 'Activate Form' confirmation email to balajicloud16@gmail.com. Once clicked, all future submissions deliver instantly.",
      };
    }

    return { success: false, error: data?.message || 'Direct relay delivery failed' };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Network error reaching direct relay' };
  }
}
