import { Quote, Star } from 'lucide-react'
import { Link } from 'react-router'
import { testimonials } from '../../data/testimonials'

function Testimonials() {
  return (
    <section className="bg-teal-900 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold tracking-widest text-coral-400 uppercase">Traveller stories</p>
        <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">What our travellers say</h2>

        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.id} className="flex flex-col rounded-2xl bg-teal-800/60 p-6 ring-1 ring-teal-700">
              <Quote className="size-8 text-coral-400" aria-hidden="true" />
              <div className="mt-3 flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`size-4 ${i < t.rating ? 'fill-coral-400 text-coral-400' : 'text-teal-600'}`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sand-100">“{t.quote}”</blockquote>
              <div className="mt-6 border-t border-teal-700 pt-4">
                <p className="font-semibold text-white">{t.name}</p>
                <p className="text-sm text-sand-200/80">
                  {t.country} · visited{' '}
                  <Link to={`/destinations/${t.destinationId}`} className="text-coral-400 hover:underline">
                    {t.destinationName}
                  </Link>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Testimonials
