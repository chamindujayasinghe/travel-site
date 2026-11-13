function CardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl bg-white shadow-md shadow-teal-950/5" aria-hidden="true">
      <div className="aspect-[4/3] bg-sand-200" />
      <div className="space-y-3 p-5">
        <div className="h-5 w-2/3 rounded bg-sand-200" />
        <div className="h-4 w-1/2 rounded bg-sand-100" />
        <div className="h-4 w-full rounded bg-sand-100" />
        <div className="h-5 w-1/3 rounded bg-sand-200" />
      </div>
    </div>
  )
}

interface CardGridSkeletonProps {
  count?: number
}

export function CardGridSkeleton({ count = 6 }: CardGridSkeletonProps) {
  return (
    <div role="status" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <span className="sr-only">Loading destinations…</span>
      {Array.from({ length: count }, (_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}

export default CardSkeleton
