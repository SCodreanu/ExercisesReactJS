// Home: ricerca (in query string, condivisibile), lista filtrata, contatore
// preferiti e focus automatico sulla search bar al mount. (Es. 4, 5, 8)
import { useContext, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'
import { MoviesContext } from '../context/MoviesContext'
import SearchBar from '../components/SearchBar'
import MovieList from '../components/MovieList'

function HomePage() {
  const { movies, isLoading, error } = useContext(MoviesContext)
  const location = useLocation()
  const navigate = useNavigate()
  const searchInputRef = useRef(null)

  const searchTerm = new URLSearchParams(location.search).get('q') ?? ''

  useEffect(() => {
    searchInputRef.current?.focus()
  }, [])

  function handleSearchChange(value) {
    const newParams = new URLSearchParams(location.search)
    if (value) {
      newParams.set('q', value)
    } else {
      newParams.delete('q')
    }
    navigate({ pathname: '/', search: newParams.toString() }, { replace: true })
  }

  // Elenco filtrato e conteggio preferiti come stato derivato: ricalcolati
  // ad ogni render invece di essere salvati come stato a parte.
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const favoriteCount = movies.filter((movie) => movie.favorite).length

  return (
    <>
      <SearchBar ref={searchInputRef} value={searchTerm} onChange={handleSearchChange} />

      <p className="favorites-counter">
        <FaStar aria-hidden="true" /> {favoriteCount} preferiti
      </p>

      {isLoading && <p>Caricamento film in corso...</p>}
      {error && <p className="error-message">Errore: {error}</p>}
      {!isLoading && !error && <MovieList movies={filteredMovies} />}
    </>
  )
}

export default HomePage
