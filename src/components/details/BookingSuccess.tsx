import { CircleCheck } from 'lucide-react'
import { Link } from 'react-router'
import { formatPrice } from '../../utils/format'
import { formatDate, type BookingValues } from '../../utils/validateBooking'

interface BookingSuccessProps {
  reference: string
  destinationName: string
  values: BookingValues
  endDate: string
  total: number
  onReset: () => void
}

function BookingSuccess({ reference, destinationName, values, endDate, total, onReset }: BookingSuccessProps) {
  const rows = [
    { label: 'Destination', value: destinationName },
    { label: 'Lead traveller', value: values.name },
    { label: 'Dates', value: `${formatDate(values.startDate)} – ${formatDate(endDate)}` },
    { label: 'Travellers', value: String(values.travellers) },
    { label: 'Total', value: formatPrice(total) },
  ]

  return (
    <div role="status" className="text-center">
      <CircleCheck className="mx-auto size-12 text-teal-600" aria-hidden="true" />
      <h2 className="mt-3 text-xl font-bold text-teal-900">Booking confirmed!</h2>
      <p className="mt-1 text-sm text-teal-900/70">
        A confirmation has been sent to <span className="font-medium text-teal-900">{values.email}</span>.
      </p>

      <p className="mt-4 inline-block rounded-xl bg-sand-100 px-4 py-2 font-mono text-sm font-semibold text-teal-900">
        Ref: {reference}
      </p>

      <dl className="mt-5 space-y-2 text-left text-sm">
        {rows.map((row) => (
          <div key={row.label} className="flex justify-between gap-4 border-b border-sand-100 pb-2">
            <dt className="text-teal-900/70">{row.label}</dt>
            <dd className="text-right font-medium text-teal-900">{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 flex flex-col gap-2">
        <button
          type="button"
          onClick={onReset}
          className="rounded-xl bg-coral-500 py-3 font-semibold text-white transition-colors hover:bg-coral-600"
        >
          Book another trip
        </button>
        <Link
          to="/destinations"
          className="rounded-xl border border-teal-700 py-3 font-semibold text-teal-700 transition-colors hover:bg-teal-700 hover:text-white"
        >
          Explore more destinations
        </Link>
      </div>
    </div>
  )
}

export default BookingSuccess
