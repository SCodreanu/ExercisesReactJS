// Input controllato per la ricerca; forwardRef per il focus automatico da HomePage. (Es. 4, 5)
import { forwardRef } from 'react'

const SearchBar = forwardRef(function SearchBar({ value, onChange }, ref) {
  return (
    <input
      ref={ref}
      type="search"
      className="search-bar"
      placeholder="Cerca un film per titolo..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
})

export default SearchBar
