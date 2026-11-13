import { destinations } from '../../data/destinations'
import type { Destination } from '../../types/destination'
import DestinationCard from '../DestinationCard'

interface RelatedDestinationsProps {
  current: Destination
}

// Other destinations: same category first, then highest rated
function getRelated(current: Destination, count = 3): Destination[] {
  return destinations
    .filter((d) => d.id !== current.id)
    .sort((a, b) => {
      const sameCategory = Number(b.category === current.category) - Number(a.category === current.category)
      return sameCategory !== 0 ? sameCategory : b.rating - a.rating
    })
    .slice(0, count)
}

function RelatedDestinations({ current }: RelatedDestinationsProps) {
  const related = getRelated(current)

  return (
    <section className="mt-16 border-t border-sand-200 pt-12">
      <h2 className="text-2xl font-bold text-teal-900 sm:text-3xl">You might also like</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
    </section>
  )
}

export default RelatedDestinations
