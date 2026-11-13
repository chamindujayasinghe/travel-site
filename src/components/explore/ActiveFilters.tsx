import { X } from 'lucide-react'
import type { Filters } from '../../utils/filterDestinations'
import { formatPrice } from '../../utils/format'

type FilterKey = 'q' | 'category' | 'region' | 'maxPrice'

interface ActiveFiltersProps {
  filters: Filters
  onRemove: (key: FilterKey) => void
  onClearAll: () => void
}

function ActiveFilters({ filters, onRemove, onClearAll }: ActiveFiltersProps) {
  // One removable chip per active filter
  const chips: { key: FilterKey; label: string }[] = []
  if (filters.q) chips.push({ key: 'q', label: `“${filters.q}”` })
  if (filters.category) chips.push({ key: 'category', label: filters.category })
  if (filters.region) chips.push({ key: 'region', label: `${filters.region} region` })
  if (filters.maxPrice !== null) chips.push({ key: 'maxPrice', label: `Up to ${formatPrice(filters.maxPrice)}` })

  if (chips.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={() => onRemove(chip.key)}
          aria-label={`Remove filter ${chip.label}`}
          className="inline-flex items-center gap-1 rounded-full bg-coral-500/10 px-3 py-1 text-sm font-medium text-coral-700 transition-colors hover:bg-coral-500/20"
        >
          {chip.label}
          <X className="size-3.5" aria-hidden="true" />
        </button>
      ))}
      <button type="button" onClick={onClearAll} className="text-sm font-semibold text-teal-700 underline-offset-2 hover:underline">
        Clear all
      </button>
    </div>
  )
}

export default ActiveFilters
