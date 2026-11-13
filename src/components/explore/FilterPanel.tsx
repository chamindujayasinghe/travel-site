import { useId } from 'react'
import { CATEGORIES, REGIONS, type Category, type Region } from '../../types/destination'
import { PRICE_MAX, PRICE_MIN, PRICE_STEP, type Filters } from '../../utils/filterDestinations'
import { formatPrice } from '../../utils/format'

interface FilterPanelProps {
  filters: Filters
  onCategoryChange: (category: Category | null) => void
  onRegionChange: (region: Region | null) => void
  onMaxPriceChange: (maxPrice: number | null) => void
  onClear: () => void
}

function pillClass(active: boolean) {
  return `rounded-full px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-coral-500 ${
    active ? 'bg-teal-700 text-white' : 'bg-sand-100 text-teal-900 hover:bg-sand-200'
  }`
}

function FilterPanel({
  filters,
  onCategoryChange,
  onRegionChange,
  onMaxPriceChange,
  onClear,
}: FilterPanelProps) {
  // Unique ids, because this panel is rendered twice (desktop sidebar + mobile panel)
  const regionId = useId()
  const priceId = useId()
  const sliderValue = filters.maxPrice ?? PRICE_MAX

  return (
    <div className="space-y-6 rounded-2xl bg-white p-5 shadow-md shadow-teal-950/5">
      <fieldset>
        <legend className="text-sm font-semibold text-teal-900">Category</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={filters.category === null}
            onClick={() => onCategoryChange(null)}
            className={pillClass(filters.category === null)}
          >
            All
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={filters.category === category}
              onClick={() => onCategoryChange(category)}
              className={pillClass(filters.category === category)}
            >
              {category}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor={regionId} className="text-sm font-semibold text-teal-900">
          Region
        </label>
        <select
          id={regionId}
          value={filters.region ?? ''}
          onChange={(e) => onRegionChange(e.target.value ? (e.target.value as Region) : null)}
          className="mt-2 w-full rounded-xl border border-sand-200 bg-sand-50 px-3 py-2 text-teal-950 focus:border-coral-500 focus:ring-2 focus:ring-coral-500/30 focus:outline-none"
        >
          <option value="">All regions</option>
          {REGIONS.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor={priceId} className="text-sm font-semibold text-teal-900">
            Max price
          </label>
          <span className="text-sm font-semibold text-coral-600">
            {filters.maxPrice === null ? 'Any price' : `Up to ${formatPrice(filters.maxPrice)}`}
          </span>
        </div>
        <input
          id={priceId}
          type="range"
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={PRICE_STEP}
          value={sliderValue}
          onChange={(e) => {
            const value = Number(e.target.value)
            onMaxPriceChange(value >= PRICE_MAX ? null : value) // far right = no limit
          }}
          className="mt-3 w-full accent-coral-500"
        />
        <div className="mt-1 flex justify-between text-xs text-teal-900/60">
          <span>{formatPrice(PRICE_MIN)}</span>
          <span>{formatPrice(PRICE_MAX)}+</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onClear}
        className="w-full rounded-xl border border-teal-700 py-2 text-sm font-semibold text-teal-700 transition-colors hover:bg-teal-700 hover:text-white"
      >
        Clear filters
      </button>
    </div>
  )
}

export default FilterPanel
