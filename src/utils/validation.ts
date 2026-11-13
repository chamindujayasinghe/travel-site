const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Basic email format check, shared by the booking and contact forms. */
export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email.trim())
}
