import { RotateCcw, TriangleAlert } from 'lucide-react'
import { useSearchParams } from 'react-router'

interface ErrorStateProps {
  message: string
  onRetry: () => void
}

function ErrorState({ message, onRetry }: ErrorStateProps) {
  const [searchParams, setSearchParams] = useSearchParams()

  const handleRetry = () => {
    // Drop the ?fail=1 demo flag (keeping other params like ?q=) so the retry can succeed
    if (searchParams.has('fail')) {
      const next = new URLSearchParams(searchParams)
      next.delete('fail')
      setSearchParams(next, { replace: true })
    }
    onRetry()
  }

  return (
    <div
      role="alert"
      className="flex flex-col items-center rounded-2xl bg-white px-6 py-14 text-center shadow-md shadow-teal-950/5"
    >
      <div className="rounded-full bg-coral-400/15 p-4">
        <TriangleAlert className="size-8 text-coral-600" aria-hidden="true" />
      </div>
      <h2 className="mt-4 text-xl font-bold text-teal-900">Something went wrong</h2>
      <p className="mt-2 max-w-md text-teal-900/70">{message}</p>
      <button
        type="button"
        onClick={handleRetry}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-coral-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-coral-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-500"
      >
        <RotateCcw className="size-4" aria-hidden="true" />
        Try again
      </button>
    </div>
  )
}

export default ErrorState
