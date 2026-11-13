import type { Destination } from '../types/destination'
import { destinations } from './destinations'

const DELAY_MS = 600

// Add ?fail=1 to the URL to simulate a network error (to demo the error state)
function shouldFail(): boolean {
  return new URLSearchParams(window.location.search).get('fail') === '1'
}

// Wait like a real network request, then resolve or reject
function simulateRequest<T>(getData: () => T): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail()) {
        reject(new Error('Unable to load destinations. Please check your connection and try again.'))
      } else {
        resolve(getData())
      }
    }, DELAY_MS)
  })
}

export function getDestinations(): Promise<Destination[]> {
  return simulateRequest(() => destinations)
}

// Resolves to null when no destination has this id ("not found" state)
export function getDestinationById(id: string): Promise<Destination | null> {
  return simulateRequest(() => destinations.find((d) => d.id === id) ?? null)
}
