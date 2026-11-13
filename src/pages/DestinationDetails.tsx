import { ArrowLeft, Clock, MapPin } from 'lucide-react'
import { useCallback } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import BookingForm from '../components/details/BookingForm'
import DetailsSkeleton from '../components/details/DetailsSkeleton'
import ImageGallery from '../components/details/ImageGallery'
import RelatedDestinations from '../components/details/RelatedDestinations'
import EmptyState from '../components/EmptyState'
import ErrorState from '../components/ErrorState'
import Rating from '../components/Rating'
import { getDestinationById } from '../data/api'
import { useAsync } from '../hooks/useAsync'

function DestinationDetails() {
  const { id = '' } = useParams<{ id: string }>()
  const navigate = useNavigate()

  // useCallback keeps the request stable, so it only re-runs when the id changes
  const request = useCallback(() => getDestinationById(id), [id])
  const { data: destination, loading, error, retry } = useAsync(request)
  const notFound = !loading && !error && !destination

  let pageTitle = 'Ceylon Trails'
  if (destination) pageTitle = `${destination.name} · Ceylon Trails`
  else if (notFound) pageTitle = 'Destination not found · Ceylon Trails'

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <title>{pageTitle}</title>

      {loading && <DetailsSkeleton />}

      {error && <ErrorState message={error.message} onRetry={retry} />}

      {notFound && (
        <EmptyState
          title="Destination not found"
          message="We couldn’t find that destination. It may have been removed or the link is incorrect."
          actionLabel="Browse all destinations"
          onAction={() => navigate('/destinations')}
        />
      )}

      {destination && (
        <>
          <Link
            to="/destinations"
            className="inline-flex items-center gap-1 text-sm font-semibold text-teal-700 hover:text-coral-700"
          >
            <ArrowLeft className="size-4" aria-hidden="true" /> Back to destinations
          </Link>

          <header className="mt-4">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-teal-700 px-3 py-1 text-xs font-semibold text-white">
                {destination.category}
              </span>
              <span className="rounded-full bg-sand-200 px-3 py-1 text-xs font-semibold text-teal-900">
                {destination.region} Province
              </span>
            </div>
            <h1 className="mt-3 text-3xl font-bold text-teal-900 sm:text-4xl lg:text-5xl">{destination.name}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">
              <p className="flex items-center gap-1 text-teal-900/70">
                <MapPin className="size-4" aria-hidden="true" /> {destination.location}
              </p>
              <Rating rating={destination.rating} reviewCount={destination.reviewCount} size="lg" />
            </div>
          </header>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_24rem]">
            <div className="min-w-0">
              {/* key resets the selected photo when moving to another destination */}
              <ImageGallery key={destination.id} images={destination.images} name={destination.name} />

              <section className="mt-10">
                <h2 className="text-2xl font-bold text-teal-900">About this trip</h2>
                <p className="mt-3 leading-relaxed text-teal-900/80">{destination.description}</p>
              </section>

              <section className="mt-10">
                <h2 className="text-2xl font-bold text-teal-900">Highlights</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {destination.highlights.map((highlight) => (
                    <li key={highlight} className="rounded-full bg-coral-500/10 px-4 py-1.5 text-sm font-medium text-coral-700">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mt-10">
                <h2 className="text-2xl font-bold text-teal-900">Activities</h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {destination.activities.map((activity) => (
                    <li key={activity.name} className="rounded-2xl bg-white p-4 shadow-md shadow-teal-950/5">
                      <p className="font-semibold text-teal-900">{activity.name}</p>
                      <p className="mt-1 flex items-center gap-1 text-sm text-teal-900/70">
                        <Clock className="size-4" aria-hidden="true" /> {activity.duration}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <aside aria-label="Booking">
              <div className="rounded-2xl bg-white p-6 shadow-lg shadow-teal-950/10 lg:sticky lg:top-24">
                {/* key resets the form when moving to another destination */}
                <BookingForm key={destination.id} destination={destination} />
              </div>
            </aside>
          </div>

          <RelatedDestinations current={destination} />
        </>
      )}
    </div>
  )
}

export default DestinationDetails
