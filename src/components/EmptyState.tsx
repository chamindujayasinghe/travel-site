import { SearchX } from 'lucide-react'

interface EmptyStateProps {
  title: string
  message: string
  actionLabel?: string
  onAction?: () => void
}

function EmptyState({ title, message, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center rounded-2xl bg-white px-6 py-14 text-center shadow-md shadow-teal-950/5">
      <div className="rounded-full bg-sand-100 p-4">
        <SearchX className="size-8 text-teal-700" aria-hidden="true" />
      </div>
      <h2 className="mt-4 text-xl font-bold text-teal-900">{title}</h2>
      <p className="mt-2 max-w-md text-teal-900/70">{message}</p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 rounded-full bg-teal-700 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-500"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}

export default EmptyState
