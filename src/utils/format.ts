const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const numberFormatter = new Intl.NumberFormat('en-US')

// 260 -> "$260"
export function formatPrice(amount: number): string {
  return priceFormatter.format(amount)
}

// 1284 -> "1,284"
export function formatReviews(count: number): string {
  return numberFormatter.format(count)
}
