import {
  CATEGORIES,
  REGIONS,
  type Category,
  type Destination,
  type Region,
} from '../types/destination'

export const SORT_OPTIONS = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'rating', label: 'Top rated' },
] as const
export type SortOption = (typeof SORT_OPTIONS)[number]['value']

export const PRICE_MIN = 100
export const PRICE_MAX = 450
export const PRICE_STEP = 10

export interface Filters {
  q: string
  category: Category | null
  region: Region | null
  maxPrice: number | null // null = any price
  sort: SortOption
}

// Type guards: only accept values that really exist, so bad URLs (e.g. ?category=Moon) are ignored
function isCategory(value: string | null): value is Category {
  return CATEGORIES.some((c) => c === value)
}
function isRegion(value: string | null): value is Region {
  return REGIONS.some((r) => r === value)
}
function isSortOption(value: string | null): value is SortOption {
  return SORT_OPTIONS.some((o) => o.value === value)
}

/** Reads the filters from the URL query string. */
export function parseFilters(params: URLSearchParams): Filters {
  const category = params.get('category')
  const region = params.get('region')
  const sort = params.get('sort')
  const maxPrice = Number(params.get('maxPrice'))

  return {
    q: params.get('q') ?? '',
    category: isCategory(category) ? category : null,
    region: isRegion(region) ? region : null,
    maxPrice: maxPrice >= PRICE_MIN && maxPrice < PRICE_MAX ? maxPrice : null,
    sort: isSortOption(sort) ? sort : 'recommended',
  }
}

/** True if the destination matches the search text (name, location, region, category or highlights). */
function matchesSearch(destination: Destination, query: string): boolean {
  const text = query.trim().toLowerCase()
  if (!text) return true

  const searchable = [
    destination.name,
    destination.location,
    destination.region,
    destination.category,
    ...destination.highlights,
  ]
  return searchable.some((field) => field.toLowerCase().includes(text))
}

/** Returns the destinations that match the filters, in the chosen sort order. */
export function filterDestinations(list: Destination[], filters: Filters): Destination[] {
  const results = list.filter(
    (d) =>
      matchesSearch(d, filters.q) &&
      (filters.category === null || d.category === filters.category) &&
      (filters.region === null || d.region === filters.region) &&
      (filters.maxPrice === null || d.price <= filters.maxPrice),
  )

  switch (filters.sort) {
    case 'price-asc':
      return results.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return results.sort((a, b) => b.price - a.price)
    case 'rating':
      return results.sort((a, b) => b.rating - a.rating)
    case 'recommended':
      // Featured destinations first, otherwise keep the original order
      return results.sort((a, b) => Number(b.featured) - Number(a.featured))
  }
}

/** How many filters (not counting search or sort) are active — shown on the mobile Filters button. */
export function countActiveFilters(filters: Filters): number {
  return [filters.category, filters.region, filters.maxPrice].filter((v) => v !== null).length
}
