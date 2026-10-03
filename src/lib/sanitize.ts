export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
  sanitized?: ContactPayload;
}

/**
 * Strips dangerous HTML tags, angle brackets, and script tags to prevent injection
 */
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<[^>]*>/g, '') // remove HTML tags
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

/**
 * Prevents email header injection attacks (newline characters in headers)
 */
export function sanitizeHeader(input: string): string {
  if (typeof input !== 'string') return '';
  return input.replace(/[\r\n]+/g, ' ').trim();
}

export function validateContactPayload(data: any): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data || typeof data !== 'object') {
    return { valid: false, errors: { form: 'Invalid request body' } };
  }

  // Honeypot spam check
  if (data.website || data.honeypot || data.bot_trap) {
    return { valid: false, errors: { bot: 'Spam detected' } };
  }

  const rawName = (data.name || '').trim();
  const rawEmail = (data.email || '').trim();
  const rawSubject = (data.subject || '').trim();
  const rawMessage = (data.message || '').trim();

  // Name validation
  if (!rawName) {
    errors.name = 'Name is required';
  } else if (rawName.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  } else if (rawName.length > 80) {
    errors.name = 'Name cannot exceed 80 characters';
  }

  // Email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!rawEmail) {
    errors.email = 'Email address is required';
  } else if (!emailRegex.test(rawEmail) || rawEmail.length > 120) {
    errors.email = 'Please provide a valid email address';
  }

  // Subject validation
  if (!rawSubject) {
    errors.subject = 'Subject is required';
  } else if (rawSubject.length < 2) {
    errors.subject = 'Subject must be at least 2 characters';
  } else if (rawSubject.length > 120) {
    errors.subject = 'Subject cannot exceed 120 characters';
  }

  // Message validation
  if (!rawMessage) {
    errors.message = 'Message content is required';
  } else if (rawMessage.length < 10) {
    errors.message = 'Message must be at least 10 characters';
  } else if (rawMessage.length > 4000) {
    errors.message = 'Message cannot exceed 4000 characters';
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: {},
    sanitized: {
      name: sanitizeHeader(rawName),
      email: rawEmail.toLowerCase(),
      subject: sanitizeHeader(rawSubject),
      message: sanitizeString(rawMessage),
    },
  };
}
