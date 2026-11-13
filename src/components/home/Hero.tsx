import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { destinations } from '../../data/destinations'
import { CATEGORIES } from '../../types/destination'
import SearchBar from '../SearchBar'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1760020052045-d1ab1631b3a1?w=1920&q=80&auto=format&fit=crop'

const quickLinks = [
  { label: 'Ella', to: '/destinations?q=Ella' },
  { label: 'Beach', to: '/destinations?category=Beach' },
  { label: 'Wildlife', to: '/destinations?category=Wildlife' },
]

// Stats are calculated from the data so they always stay accurate
const averageRating =
  destinations.reduce((sum, d) => sum + d.rating, 0) / destinations.length

const stats = [
  { value: destinations.length, label: 'Destinations' },
  { value: CATEGORIES.length, label: 'Travel styles' },
  { value: `${averageRating.toFixed(1)}★`, label: 'Average rating' },
]

function Hero() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (value: string) => {
    navigate(value ? `/destinations?q=${encodeURIComponent(value)}` : '/destinations')
  }

  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden lg:min-h-[85vh]">
      <img
        src={HERO_IMAGE}
        alt="Sigiriya Lion Rock at sunrise"
        className="absolute inset-0 -z-10 size-full object-cover"
        fetchPriority="high"
      />
      {/* Dark teal fade so the text stays readable over the photo */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-teal-950/70 via-teal-950/50 to-teal-950/80" />

      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-widest text-coral-400 uppercase">
            Ceylon Trails · Sri Lanka
          </p>
          <h1 className="mt-4 text-4xl leading-tight font-bold text-white sm:text-5xl lg:text-6xl">
            Discover the wonders of Sri Lanka
          </h1>
          <p className="mt-5 text-lg text-sand-100/90">
            Ancient rock fortresses, misty tea hills, leopard safaris and golden beaches — handpicked
            trips across the island, all in one place.
          </p>

          <div className="mt-8">
            <SearchBar value={query} onChange={setQuery} onSubmit={handleSearch} />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
            <span className="text-sand-100/80">Popular:</span>
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-white backdrop-blur transition-colors hover:bg-white/25"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-sm text-sand-100/80">{stat.label}</dt>
                <dd className="text-2xl font-bold text-white">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

export default Hero
