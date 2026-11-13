import { Search, X } from 'lucide-react'
import type { FormEvent } from 'react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSubmit?: (value: string) => void
  placeholder?: string
}

function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search destinations, e.g. Ella or beach',
}: SearchBarProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit?.(value.trim())
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="flex w-full items-center gap-2 rounded-2xl bg-white p-2 shadow-lg shadow-teal-950/10 ring-1 ring-sand-200 focus-within:ring-2 focus-within:ring-coral-500"
    >
      <Search className="ml-2 size-5 shrink-0 text-teal-700" aria-hidden="true" />
      <label htmlFor="destination-search" className="sr-only">
        Search destinations
      </label>
      <input
        id="destination-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent py-2 text-teal-950 placeholder:text-teal-900/50 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="rounded-full p-1.5 text-teal-900/60 hover:bg-sand-100 hover:text-teal-900"
        >
          <X className="size-4" />
        </button>
      )}
      <button
        type="submit"
        className="rounded-xl bg-coral-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-coral-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-500"
      >
        Search
      </button>
    </form>
  )
}

export default SearchBar
