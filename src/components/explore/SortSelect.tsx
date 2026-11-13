import { SORT_OPTIONS, type SortOption } from '../../utils/filterDestinations'

interface SortSelectProps {
  value: SortOption
  onChange: (value: SortOption) => void
}

function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <label className="flex items-center gap-2 text-sm text-teal-900/70">
      <span className="whitespace-nowrap">Sort by</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="rounded-xl border border-sand-200 bg-white px-3 py-2 font-medium text-teal-950 focus:border-coral-500 focus:ring-2 focus:ring-coral-500/30 focus:outline-none"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}

export default SortSelect
