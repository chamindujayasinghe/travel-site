import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { getDestinations } from '../../data/api'
import { useAsync } from '../../hooks/useAsync'
import { CardGridSkeleton } from '../CardSkeleton'
import DestinationCard from '../DestinationCard'
import ErrorState from '../ErrorState'

function FeaturedDestinations() {
  const { data, loading, error, retry } = useAsync(getDestinations)
  const featured = data?.filter((d) => d.featured) ?? []

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold tracking-widest text-coral-700 uppercase">Featured</p>
          <h2 className="mt-2 text-3xl font-bold text-teal-900 sm:text-4xl">Popular right now</h2>
        </div>
        <Link
          to="/destinations"
          className="inline-flex items-center gap-1 font-semibold text-teal-700 hover:text-coral-700"
        >
          View all destinations <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      {loading && <CardGridSkeleton count={6} />}
      {error && <ErrorState message={error.message} onRetry={retry} />}
      {!loading && !error && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      )}
    </section>
  )
}

export default FeaturedDestinations
