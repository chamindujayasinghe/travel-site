import { Link } from 'react-router'
import WhyUs from '../components/home/WhyUs'
import { destinations } from '../data/destinations'
import { CATEGORIES } from '../types/destination'
import { formatReviews } from '../utils/format'

const BANNER_IMAGE =
  'https://images.unsplash.com/photo-1580635849305-4399d586ac5c?w=1920&q=80&auto=format&fit=crop'
const STORY_IMAGE =
  'https://images.unsplash.com/photo-1760532511219-c8b7566f90af?w=1200&q=80&auto=format&fit=crop'

// Stats are calculated from the data so they always stay accurate
const totalReviews = destinations.reduce((sum, d) => sum + d.reviewCount, 0)
const averageRating = destinations.reduce((sum, d) => sum + d.rating, 0) / destinations.length

const stats = [
  { value: String(destinations.length), label: 'Destinations' },
  { value: String(CATEGORIES.length), label: 'Travel styles' },
  { value: `${averageRating.toFixed(1)}★`, label: 'Average rating' },
  { value: formatReviews(totalReviews), label: 'Traveller reviews' },
]

function About() {
  return (
    <>
      <title>About · Ceylon Trails</title>

      {/* Banner */}
      <section className="relative isolate overflow-hidden">
        <img
          src={BANNER_IMAGE}
          alt="Green mountains of Sri Lanka's hill country"
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-teal-950/75 to-teal-950/60" />
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <p className="text-sm font-semibold tracking-widest text-coral-400 uppercase">About us</p>
          <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">Our story</h1>
          <p className="mt-4 max-w-2xl text-lg text-sand-100/90">
            A small Sri Lankan team helping travellers see the island the way locals do.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div>
          <h2 className="text-3xl font-bold text-teal-900 sm:text-4xl">Born on the island, built for travellers</h2>
          <p className="mt-5 leading-relaxed text-teal-900/80">
            Ceylon Trails started with a simple idea: the best trips in Sri Lanka are planned by people who live here.
            Our guides grew up between the tea hills, the ancient cities and the coast, and they know when the trains
            run on time, where the leopards rest at dawn and which beach is calm this month.
          </p>
          <p className="mt-4 leading-relaxed text-teal-900/80">
            We keep our groups small, work with family-run guesthouses and local drivers, and make sure the money you
            spend stays in the communities you visit. Every trip on this site is one we have taken ourselves.
          </p>
        </div>
        <img
          src={STORY_IMAGE}
          alt="Tea plantation on a misty hillside"
          loading="lazy"
          className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lg shadow-teal-950/10"
        />
      </section>

      {/* Stats */}
      <section className="bg-sand-100">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 text-center sm:px-6 md:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            // flex-col-reverse shows the number above its label, while keeping <dt> before <dd> in the HTML
            <div key={stat.label} className="flex flex-col-reverse">
              <dt className="mt-1 text-sm text-teal-900/70">{stat.label}</dt>
              <dd className="text-3xl font-bold text-teal-800 sm:text-4xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <WhyUs />

      {/* Call to action */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="rounded-2xl bg-teal-900 px-6 py-12 text-center sm:px-12">
          <h2 className="text-3xl font-bold text-white">Ready to explore?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sand-100/90">
            Browse our handpicked trips, or tell us what you have in mind and we’ll plan it with you.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/destinations"
              className="rounded-xl bg-coral-500 px-6 py-3 font-semibold text-teal-950 transition-colors hover:bg-coral-400"
            >
              Explore destinations
            </Link>
            <Link
              to="/contact"
              className="rounded-xl border border-white/40 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default About
