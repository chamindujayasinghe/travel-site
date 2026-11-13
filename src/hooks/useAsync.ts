import { useEffect, useState } from 'react'

interface AsyncState<T> {
  data: T | null
  error: Error | null
  loading: boolean
  retry: () => void
}

interface Result<T> {
  request: () => Promise<T>
  attempt: number
  data: T | null
  error: Error | null
}

/**
 * Runs an async request and tracks its loading / error / data state.
 * Pass a stable function (wrap it in useCallback) — the request re-runs when it changes.
 */
export function useAsync<T>(request: () => Promise<T>): AsyncState<T> {
  const [attempt, setAttempt] = useState(0)
  const [result, setResult] = useState<Result<T> | null>(null)

  useEffect(() => {
    let cancelled = false // ignore results that arrive after we've moved on

    request().then(
      (data) => {
        if (!cancelled) setResult({ request, attempt, data, error: null })
      },
      (err: unknown) => {
        const error = err instanceof Error ? err : new Error('Something went wrong.')
        if (!cancelled) setResult({ request, attempt, data: null, error })
      },
    )

    return () => {
      cancelled = true
    }
  }, [request, attempt])

  // Only trust a result that belongs to the current request + attempt; otherwise we're still loading
  const current = result?.request === request && result.attempt === attempt ? result : null

  return {
    data: current?.data ?? null,
    error: current?.error ?? null,
    loading: current === null,
    retry: () => setAttempt((n) => n + 1),
  }
}
