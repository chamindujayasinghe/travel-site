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
    <div
      className={`flex items-center gap-1 ${isLarge ? 'text-base' : 'text-sm'}`}
      aria-label={`Rated ${rating.toFixed(1)} out of 5`}
    >
      <Star className={`fill-coral-500 text-coral-500 ${isLarge ? 'size-5' : 'size-4'}`} aria-hidden="true" />
      <span className="font-semibold text-teal-950">{rating.toFixed(1)}</span>
      {reviewCount !== undefined && (
        <span className="text-teal-900/60">({formatReviews(reviewCount)} reviews)</span>
      )}
    </div>
  )
}

export default Rating
