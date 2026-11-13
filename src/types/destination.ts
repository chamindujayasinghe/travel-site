export const CATEGORIES = ['Beach', 'Hill Country', 'Heritage', 'Wildlife', 'Adventure'] as const
export type Category = (typeof CATEGORIES)[number]

export const REGIONS = [
  'Central',
  'Southern',
  'Uva',
  'North Central',
  'Eastern',
  'Sabaragamuwa',
] as const
export type Region = (typeof REGIONS)[number]

export interface Activity {
  name: string
  duration: string // e.g. "3 hours"
}

export interface Destination {
  id: string // URL slug, e.g. "ella"
  name: string
  location: string // e.g. "Ella, Badulla District"
  region: Region
  category: Category
  price: number // USD per person, package price ("from")
  days: number // package length in days
  rating: number // 0–5, one decimal
  reviewCount: number
  shortDescription: string // for cards
  description: string // for the details page
  images: string[] // first image is the cover
  activities: Activity[]
  highlights: string[]
  featured: boolean // shown on the Home page
}
