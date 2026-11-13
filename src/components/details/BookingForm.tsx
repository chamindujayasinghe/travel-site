import { Minus, Plus } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import type { Destination } from '../../types/destination'
import { formatPrice } from '../../utils/format'
import {
  MAX_TRAVELLERS,
  MIN_TRAVELLERS,
  formatDate,
  todayISO,
  tripEndISO,
  validateBooking,
  type BookingValues,
} from '../../utils/validateBooking'
import BookingSuccess from './BookingSuccess'

interface BookingFormProps {
  destination: Destination
}

type Field = keyof BookingValues

const initialValues: BookingValues = { name: '', email: '', startDate: '', travellers: 2 }

const inputClass = (hasError: boolean) =>
  `mt-1 w-full rounded-xl border bg-sand-50 px-3 py-2.5 text-teal-950 focus:ring-2 focus:outline-none ${
    hasError
      ? 'border-coral-600 focus:ring-coral-500/30'
      : 'border-sand-200 focus:border-teal-600 focus:ring-teal-600/20'
  }`

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="mt-1 text-sm text-coral-700">
      {message}
    </p>
  )
}

function BookingForm({ destination }: BookingFormProps) {
  const [values, setValues] = useState<BookingValues>(initialValues)
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({})
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [reference, setReference] = useState<string | null>(null)

  const errors = validateBooking(values)
  const total = destination.price * values.travellers
  const endDate = values.startDate ? tripEndISO(values.startDate, destination.days) : null

  // Only show an error once the user has left the field or tried to submit
  const visibleError = (field: Field) => (touched[field] || submitAttempted ? errors[field] : undefined)

  const update = <K extends Field>(field: K, value: BookingValues[K]) =>
    setValues((prev) => ({ ...prev, [field]: value }))

  const markTouched = (field: Field) => setTouched((prev) => ({ ...prev, [field]: true }))

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitAttempted(true)

    const firstInvalid = (Object.keys(errors) as Field[])[0]
    if (firstInvalid) {
      document.getElementById(`booking-${firstInvalid}`)?.focus()
      return
    }

    // Simulate sending the booking (no backend)
    setSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    setSubmitting(false)
    setReference(`CT-${destination.id.slice(0, 4).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`)
  }

  const reset = () => {
    setValues(initialValues)
    setTouched({})
    setSubmitAttempted(false)
    setReference(null)
  }

  if (reference && endDate) {
    return (
      <BookingSuccess
        reference={reference}
        destinationName={destination.name}
        values={values}
        endDate={endDate}
        total={total}
        onReset={reset}
      />
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <p className="text-sm text-teal-900/70">
        from <span className="text-2xl font-bold text-coral-700">{formatPrice(destination.price)}</span> / person ·{' '}
        {destination.days} days
      </p>
      <h2 className="mt-1 text-lg font-bold text-teal-900">Book this trip</h2>

      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor="booking-name" className="text-sm font-medium text-teal-900">
            Full name
          </label>
          <input
            id="booking-name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => update('name', e.target.value)}
            onBlur={() => markTouched('name')}
            aria-invalid={Boolean(visibleError('name'))}
            aria-describedby="booking-name-error"
            className={inputClass(Boolean(visibleError('name')))}
          />
          <FieldError id="booking-name-error" message={visibleError('name')} />
        </div>

        <div>
          <label htmlFor="booking-email" className="text-sm font-medium text-teal-900">
            Email
          </label>
          <input
            id="booking-email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => update('email', e.target.value)}
            onBlur={() => markTouched('email')}
            aria-invalid={Boolean(visibleError('email'))}
            aria-describedby="booking-email-error"
            className={inputClass(Boolean(visibleError('email')))}
          />
          <FieldError id="booking-email-error" message={visibleError('email')} />
        </div>

        <div>
          <label htmlFor="booking-startDate" className="text-sm font-medium text-teal-900">
            Start date
          </label>
          <input
            id="booking-startDate"
            type="date"
            min={todayISO()}
            value={values.startDate}
            onChange={(e) => update('startDate', e.target.value)}
            onBlur={() => markTouched('startDate')}
            aria-invalid={Boolean(visibleError('startDate'))}
            aria-describedby="booking-startDate-error booking-endDate"
            className={inputClass(Boolean(visibleError('startDate')))}
          />
          <FieldError id="booking-startDate-error" message={visibleError('startDate')} />
          {endDate && !errors.startDate && (
            <p id="booking-endDate" className="mt-1 text-sm text-teal-900/70">
              Ends on {formatDate(endDate)}
            </p>
          )}
        </div>

        <div>
          <span id="booking-travellers-label" className="text-sm font-medium text-teal-900">
            Travellers
          </span>
          <div className="mt-1 flex items-center gap-3" role="group" aria-labelledby="booking-travellers-label">
            <button
              type="button"
              onClick={() => update('travellers', values.travellers - 1)}
              disabled={values.travellers <= MIN_TRAVELLERS}
              aria-label="Remove a traveller"
              className="rounded-full border border-sand-200 p-2 text-teal-900 hover:bg-sand-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Minus className="size-4" />
            </button>
            <output id="booking-travellers" aria-live="polite" className="w-8 text-center text-lg font-semibold text-teal-900">
              {values.travellers}
            </output>
            <button
              type="button"
              onClick={() => update('travellers', values.travellers + 1)}
              disabled={values.travellers >= MAX_TRAVELLERS}
              aria-label="Add a traveller"
              className="rounded-full border border-sand-200 p-2 text-teal-900 hover:bg-sand-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus className="size-4" />
            </button>
            <span className="text-sm text-teal-900/70">max {MAX_TRAVELLERS}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-sand-200 pt-4 text-sm">
        <span className="text-teal-900/70">
          {formatPrice(destination.price)} × {values.travellers} {values.travellers === 1 ? 'traveller' : 'travellers'}
        </span>
        <span className="text-xl font-bold text-teal-900">{formatPrice(total)}</span>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-4 w-full rounded-xl bg-coral-500 py-3 font-semibold text-teal-950 transition-colors hover:bg-coral-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-500 disabled:cursor-wait disabled:opacity-70"
      >
        {submitting ? 'Booking…' : 'Book now'}
      </button>
      <p className="mt-2 text-center text-xs text-teal-900/70">Free cancellation up to 7 days before your trip</p>
    </form>
  )
}

export default BookingForm
