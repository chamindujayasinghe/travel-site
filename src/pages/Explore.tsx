import { SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'
import { useSearchParams } from 'react-router'
import { CardGridSkeleton } from '../components/CardSkeleton'
import DestinationCard from '../components/DestinationCard'
import EmptyState from '../components/EmptyState'
import ErrorState from '../components/ErrorState'
import ActiveFilters from '../components/explore/ActiveFilters'
import FilterPanel from '../components/explore/FilterPanel'
import SortSelect from '../components/explore/SortSelect'
import SearchBar from '../components/SearchBar'
import { getDestinations } from '../data/api'
import { useAsync } from '../hooks/useAsync'
import {
  countActiveFilters,
  filterDestinations,
  parseFilters,
} from '../utils/filterDestinations'

function Explore() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const { data, loading, error, retry } = useAsync(getDestinations)

  // The URL is the single source of truth for every filter
  const filters = parseFilters(searchParams)
  const results = data ? filterDestinations(data, filters) : []
  const activeCount = countActiveFilters(filters)

  // Set or remove one query param (replace = don't add a history entry for every keystroke)
  const updateParam = (key: string, value: string | number | null) => {
    const next = new URLSearchParams(searchParams)
    if (value === null || value === '') next.delete(key)
    else next.set(key, String(value))
    setSearchParams(next, { replace: true })
  }

  const clearFilters = () => setSearchParams({}, { replace: true })

  const filterPanel = (
    <FilterPanel
      filters={filters}
      onCategoryChange={(v) => updateParam('category', v)}
      onRegionChange={(v) => updateParam('region', v)}
      onMaxPriceChange={(v) => updateParam('maxPrice', v)}
      onClear={clearFilters}
    />
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold text-teal-900 sm:text-4xl">Explore destinations</h1>
        <p className="mt-3 text-teal-900/70">
          Search and filter handpicked trips across Sri Lanka — from ancient cities to surf beaches.
        </p>
      </header>

      <div className="mt-6 max-w-3xl">
        <SearchBar value={filters.q} onChange={(v) => updateParam('q', v)} />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[18rem_1fr]">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block" aria-label="Filters">
          <div className="sticky top-24">{filterPanel}</div>
        </aside>

        <section aria-label="Results" className="min-w-0">
          {/* Toolbar: mobile filter button, result count, sort */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen((open) => !open)}
              aria-expanded={mobileFiltersOpen}
              aria-controls="mobile-filters"
              className="inline-flex items-center gap-2 rounded-xl border border-sand-200 bg-white px-4 py-2 text-sm font-semibold text-teal-900 hover:bg-sand-100 lg:hidden"
            >
              <SlidersHorizontal className="size-4" aria-hidden="true" />
              Filters{activeCount > 0 && ` (${activeCount})`}
            </button>

            <p className="order-last w-full text-sm text-teal-900/70 sm:order-none sm:w-auto" aria-live="polite">
              {data && (
                <>
                  Showing <span className="font-semibold text-teal-900">{results.length}</span> of{' '}
                  {data.length} destinations
                </>
              )}
            </p>

            <SortSelect value={filters.sort} onChange={(v) => updateParam('sort', v === 'recommended' ? null : v)} />
          </div>

          {mobileFiltersOpen && (
            <div id="mobile-filters" className="mt-4 lg:hidden">
              {filterPanel}
            </div>
          )}

          <div className="mt-4">
            <ActiveFilters
              filters={filters}
              onRemove={(key) => updateParam(key, null)}
              onClearAll={clearFilters}
            />
          </div>

          <div className="mt-6">
            {loading && <CardGridSkeleton count={6} />}
            {error && <ErrorState message={error.message} onRetry={retry} />}
            {data && results.length === 0 && (
              <EmptyState
                title="No destinations match your search"
                message="Try a different search term, pick another category or raise the max price."
                actionLabel="Clear filters"
                onAction={clearFilters}
              />
            )}
            {data && results.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((destination) => (
                  <DestinationCard key={destination.id} destination={destination} showDescription />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Explore
