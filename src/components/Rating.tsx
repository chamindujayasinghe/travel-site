import { Star } from 'lucide-react'
import { formatReviews } from '../utils/format'

interface RatingProps {
  rating: number
  reviewCount?: number
  size?: 'sm' | 'lg'
}

function Rating({ rating, reviewCount, size = 'sm' }: RatingProps) {
  const isLarge = size === 'lg'

  return (
    <div className={`flex items-center gap-1 ${isLarge ? 'text-base' : 'text-sm'}`}>
      <Star className={`fill-coral-500 text-coral-500 ${isLarge ? 'size-5' : 'size-4'}`} aria-hidden="true" />
      {/* Screen readers hear "Rated 4.9 out of 5" instead of just "4.9" */}
      <span className="sr-only">Rated {rating.toFixed(1)} out of 5</span>
      <span className="font-semibold text-teal-950" aria-hidden="true">
        {rating.toFixed(1)}
      </span>
      {reviewCount !== undefined && (
        <span className="text-teal-900/70">({formatReviews(reviewCount)} reviews)</span>
      )}
    </div>
  )
}

export default Rating
