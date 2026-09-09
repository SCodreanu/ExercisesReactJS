// Context globale dei film: fetch da TMDB al mount, persistenza in localStorage,
// toggle preferito/visto e lookup per id, così MovieCard/HomePage/... leggono
// tutto con useContext invece di riceverlo via props (niente prop drilling). (Es. 5, 6, 7)
import { createContext, useEffect, useState } from 'react'

export const MoviesContext = createContext()

const STORAGE_KEY = 'moviehub-movies'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const POSTER_BASE = 'https://image.tmdb.org/t/p/w500'

function mapApiMovie(apiMovie, genresById) {
  return {
    id: apiMovie.id,
    title: apiMovie.title,
    year: apiMovie.release_date ? apiMovie.release_date.slice(0, 4) : '—',
    poster: apiMovie.poster_path ? `${POSTER_BASE}${apiMovie.poster_path}` : null,
    genre: genresById[apiMovie.genre_ids?.[0]] ?? '',
    watched: false,
    favorite: false,
  }
}

export function MoviesContextProvider({ children }) {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      setMovies(JSON.parse(stored))
      setIsLoading(false)
      return
    }

    // useEffect non accetta una callback async: la Promise andrebbe al posto
    // della funzione di cleanup attesa da React. Per questo definiamo qui
    // una funzione async e la richiamiamo subito.
    async function fetchMovies() {
      try {
        const options = {
          headers: { accept: 'application/json', Authorization: `Bearer ${API_KEY}` },
        }
        const [moviesRes, genresRes] = await Promise.all([
          fetch('https://api.themoviedb.org/3/movie/popular', options),
          fetch('https://api.themoviedb.org/3/genre/movie/list', options),
        ])

        if (!moviesRes.ok || !genresRes.ok) {
          throw new Error('Errore nel recupero dei dati da TMDB')
        }

        const moviesData = await moviesRes.json()
        const genresData = await genresRes.json()
        const genresById = Object.fromEntries(genresData.genres.map((g) => [g.id, g.name]))

        setMovies(moviesData.results.map((m) => mapApiMovie(m, genresById)))
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovies()
  }, [])

  useEffect(() => {
    if (movies.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(movies))
    }
  }, [movies])

  function toggleFavorite(id) {
    setMovies((prev) =>
      prev.map((movie) => (movie.id === id ? { ...movie, favorite: !movie.favorite } : movie))
    )
  }

  function toggleWatched(id) {
    setMovies((prev) =>
      prev.map((movie) => (movie.id === id ? { ...movie, watched: !movie.watched } : movie))
    )
  }

  function getMovieById(id) {
    return movies.find((movie) => String(movie.id) === String(id))
  }

  const contextValue = { movies, isLoading, error, toggleFavorite, toggleWatched, getMovieById }

  return <MoviesContext.Provider value={contextValue}>{children}</MoviesContext.Provider>
}
