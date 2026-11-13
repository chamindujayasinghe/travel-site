import { CircleCheck, Clock, Mail, MapPin, Phone } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import {
  CONTACT_SUBJECTS,
  MESSAGE_MAX,
  validateContact,
  type ContactSubject,
  type ContactValues,
} from '../utils/validateContact'

type Field = keyof ContactValues

const initialValues: ContactValues = { name: '', email: '', subject: 'General question', message: '' }

// Fictional company details — shown as plain text, not as links
const contactDetails = [
  { icon: MapPin, label: 'Office', value: '42 Galle Road, Colombo 03, Sri Lanka' },
  { icon: Phone, label: 'Phone', value: '+94 11 234 5678' },
  { icon: Mail, label: 'Email', value: 'hello@ceylontrails.example' },
  { icon: Clock, label: 'Office hours', value: 'Mon – Sat, 8:00 am – 6:00 pm (GMT+5:30)' },
]

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

function Contact() {
  const [values, setValues] = useState<ContactValues>(initialValues)
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({})
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const errors = validateContact(values)

  // Only show an error once the user has left the field or tried to submit
  const visibleError = (field: Field) => (touched[field] || submitAttempted ? errors[field] : undefined)

  const update = <K extends Field>(field: K, value: ContactValues[K]) =>
    setValues((prev) => ({ ...prev, [field]: value }))

  const markTouched = (field: Field) => setTouched((prev) => ({ ...prev, [field]: true }))

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitAttempted(true)

    const firstInvalid = (Object.keys(errors) as Field[])[0]
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus()
      return
    }

    // Simulate sending the message (no backend)
    setSending(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    setSending(false)
    setSent(true)
  }

  const reset = () => {
    setValues(initialValues)
    setTouched({})
    setSubmitAttempted(false)
    setSent(false)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <title>Contact · Ceylon Trails</title>

      <header className="max-w-2xl">
        <p className="text-sm font-semibold tracking-widest text-coral-700 uppercase">Contact</p>
        <h1 className="mt-2 text-3xl font-bold text-teal-900 sm:text-4xl">Get in touch</h1>
        <p className="mt-3 text-teal-900/70">
          Questions about a trip, need help with a booking or want something tailor-made? Send us a message and our
          team will reply within one working day.
        </p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.5fr]">
        {/* Contact details */}
        <aside aria-label="Contact details" className="rounded-2xl bg-teal-900 p-6 text-sand-100 sm:p-8">
          <h2 className="text-xl font-bold text-white">Ceylon Trails</h2>
          <ul className="mt-6 space-y-5">
            {contactDetails.map(({ icon: Icon, label, value }) => (
              <li key={label} className="flex gap-3">
                <div className="h-fit rounded-xl bg-teal-800 p-2.5">
                  <Icon className="size-5 text-coral-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm text-sand-200/80">{label}</p>
                  <p className="font-medium text-white">{value}</p>
                </div>
              </li>
            ))}
          </ul>
        </aside>

        {/* Contact form */}
        <section aria-label="Contact form" className="rounded-2xl bg-white p-6 shadow-lg shadow-teal-950/10 sm:p-8">
          {sent ? (
            <div role="status" className="flex flex-col items-center py-10 text-center">
              <CircleCheck className="size-12 text-teal-600" aria-hidden="true" />
              <h2 className="mt-3 text-xl font-bold text-teal-900">Message sent!</h2>
              <p className="mt-2 max-w-md text-teal-900/70">
                Thanks, {values.name.trim()}. We’ve received your message about “{values.subject}” and will reply to{' '}
                <span className="font-medium text-teal-900">{values.email.trim()}</span> within one working day.
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-6 rounded-xl bg-coral-500 px-6 py-3 font-semibold text-teal-950 transition-colors hover:bg-coral-400"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="text-sm font-medium text-teal-900">
                    Full name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={(e) => update('name', e.target.value)}
                    onBlur={() => markTouched('name')}
                    aria-invalid={Boolean(visibleError('name'))}
                    aria-describedby="contact-name-error"
                    className={inputClass(Boolean(visibleError('name')))}
                  />
                  <FieldError id="contact-name-error" message={visibleError('name')} />
                </div>

                <div>
                  <label htmlFor="contact-email" className="text-sm font-medium text-teal-900">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={(e) => update('email', e.target.value)}
                    onBlur={() => markTouched('email')}
                    aria-invalid={Boolean(visibleError('email'))}
                    aria-describedby="contact-email-error"
                    className={inputClass(Boolean(visibleError('email')))}
                  />
                  <FieldError id="contact-email-error" message={visibleError('email')} />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="text-sm font-medium text-teal-900">
                  Subject
                </label>
                <select
                  id="contact-subject"
                  value={values.subject}
                  onChange={(e) => update('subject', e.target.value as ContactSubject)}
                  className={inputClass(false)}
                >
                  {CONTACT_SUBJECTS.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="contact-message" className="text-sm font-medium text-teal-900">
                    Message
                  </label>
                  <span className="text-xs text-teal-900/70" aria-live="polite">
                    {values.message.length}/{MESSAGE_MAX}
                  </span>
                </div>
                <textarea
                  id="contact-message"
                  rows={6}
                  maxLength={MESSAGE_MAX}
                  value={values.message}
                  onChange={(e) => update('message', e.target.value)}
                  onBlur={() => markTouched('message')}
                  aria-invalid={Boolean(visibleError('message'))}
                  aria-describedby="contact-message-error"
                  className={`${inputClass(Boolean(visibleError('message')))} resize-y`}
                />
                <FieldError id="contact-message-error" message={visibleError('message')} />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-xl bg-coral-500 py-3 font-semibold text-teal-950 transition-colors hover:bg-coral-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-500 disabled:cursor-wait disabled:opacity-70 sm:w-auto sm:px-8"
              >
                {sending ? 'Sending…' : 'Send message'}
              </button>
            </form>
          )}
        </section>
      </div>
    </div>
  )
}

export default Contact
