function DetailsSkeleton() {
  return (
    <div role="status" className="animate-pulse">
      <span className="sr-only">Loading destination…</span>
      <div className="h-4 w-40 rounded bg-sand-200" />
      <div className="mt-6 h-9 w-64 rounded bg-sand-200" />
      <div className="mt-3 h-4 w-80 max-w-full rounded bg-sand-100" />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_24rem]">
        <div>
          <div className="aspect-[16/10] rounded-2xl bg-sand-200" />
          <div className="mt-3 grid grid-cols-4 gap-3">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="aspect-[4/3] rounded-xl bg-sand-200" />
            ))}
          </div>
          <div className="mt-8 space-y-3">
            <div className="h-6 w-48 rounded bg-sand-200" />
            <div className="h-4 w-full rounded bg-sand-100" />
            <div className="h-4 w-full rounded bg-sand-100" />
            <div className="h-4 w-2/3 rounded bg-sand-100" />
          </div>
        </div>
        <div className="h-96 rounded-2xl bg-white shadow-md shadow-teal-950/5" />
      </div>
    </div>
  )
}

export default DetailsSkeleton
