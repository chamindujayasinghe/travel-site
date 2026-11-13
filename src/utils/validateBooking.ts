export interface BookingValues {
  name: string
  email: string
  startDate: string // "YYYY-MM-DD" from <input type="date">
  travellers: number
}

export type BookingErrors = Partial<Record<keyof BookingValues, string>>

export const MIN_TRAVELLERS = 1
export const MAX_TRAVELLERS = 10

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Returns an error message for every invalid field. An empty object means the form is valid. */
export function validateBooking(values: BookingValues): BookingErrors {
  const errors: BookingErrors = {}

  if (values.name.trim().length < 2) {
    errors.name = 'Please enter your full name.'
  }

  if (!values.email.trim()) {
    errors.email = 'Please enter your email address.'
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Please enter a valid email, e.g. name@example.com.'
  }

  if (!values.startDate) {
    errors.startDate = 'Please choose a start date.'
  } else if (values.startDate < todayISO()) {
    errors.startDate = 'The start date can’t be in the past.'
  }

  if (values.travellers < MIN_TRAVELLERS || values.travellers > MAX_TRAVELLERS) {
    errors.travellers = `Choose between ${MIN_TRAVELLERS} and ${MAX_TRAVELLERS} travellers.`
  }

  return errors
}

// ---- Date helpers (local time, so "today" matches the user's calendar) ----

function toISO(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function fromISO(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

/** Today as "YYYY-MM-DD" — used as the earliest selectable date. */
export function todayISO(): string {
  return toISO(new Date())
}

/** Last day of a trip: a 3-day trip starting on the 19th ends on the 21st. */
export function tripEndISO(startISO: string, days: number): string {
  const end = fromISO(startISO)
  end.setDate(end.getDate() + days - 1)
  return toISO(end)
}

/** "2026-11-21" -> "Sat, 21 Nov 2026" */
export function formatDate(iso: string): string {
  return fromISO(iso).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
