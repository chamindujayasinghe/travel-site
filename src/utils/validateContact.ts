import { isValidEmail } from './validation'

export const CONTACT_SUBJECTS = ['General question', 'Booking help', 'Custom trip', 'Feedback'] as const
export type ContactSubject = (typeof CONTACT_SUBJECTS)[number]

export interface ContactValues {
  name: string
  email: string
  subject: ContactSubject
  message: string
}

export type ContactErrors = Partial<Record<keyof ContactValues, string>>

export const MESSAGE_MIN = 10
export const MESSAGE_MAX = 500

/** Returns an error message for every invalid field. An empty object means the form is valid. */
export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {}

  if (values.name.trim().length < 2) {
    errors.name = 'Please enter your full name.'
  }

  if (!values.email.trim()) {
    errors.email = 'Please enter your email address.'
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Please enter a valid email, e.g. name@example.com.'
  }

  const messageLength = values.message.trim().length
  if (messageLength < MESSAGE_MIN) {
    errors.message = `Your message should be at least ${MESSAGE_MIN} characters.`
  } else if (messageLength > MESSAGE_MAX) {
    errors.message = `Please keep your message under ${MESSAGE_MAX} characters.`
  }

  return errors
}
