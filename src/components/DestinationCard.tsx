import { MapPin } from 'lucide-react'
import { Link } from 'react-router'
import type { Destination } from '../types/destination'
import { formatPrice } from '../utils/format'
import Rating from './Rating'

interface DestinationCardProps {
  destination: Destination
  showDescription?: boolean
}

function DestinationCard({ destination, showDescription = false }: DestinationCardProps) {
  const { id, name, location, category, images, rating, shortDescription, days, price } = destination

  return (
    <Link
      to={`/destinations/${id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md shadow-teal-950/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-950/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-500"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-sand-200">
        <img
          src={images[0]}
          alt={`${name}, ${location}`}
          loading="lazy"
          className="size-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-teal-800 backdrop-blur">
          {category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold text-teal-900">{name}</h3>
          <Rating rating={rating} />
        </div>

        <p className="flex items-center gap-1 text-sm text-teal-900/70">
          <MapPin className="size-4 shrink-0" aria-hidden="true" />
          {location}
        </p>

        {showDescription && (
          <p className="line-clamp-2 text-sm text-teal-900/80">{shortDescription}</p>
        )}

        <p className="mt-auto pt-2 text-sm text-teal-900/70">
          {days} days · from{' '}
          <span className="text-lg font-bold text-coral-700">{formatPrice(price)}</span> / person
        </p>
      </div>
    </Link>
  )
}

export default DestinationCard
