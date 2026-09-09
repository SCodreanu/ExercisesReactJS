// Mostra solo i film preferiti, letti dal context. (Es. 8)
import { useContext } from 'react'
import { MoviesContext } from '../context/MoviesContext'
import MovieList from '../components/MovieList'

function FavoritesPage() {
  const { movies } = useContext(MoviesContext)
  const favoriteMovies = movies.filter((movie) => movie.favorite)

  return (
    <>
      <h2>I tuoi film preferiti</h2>
      <MovieList movies={favoriteMovies} />
    </>
  )
}

export default FavoritesPage
