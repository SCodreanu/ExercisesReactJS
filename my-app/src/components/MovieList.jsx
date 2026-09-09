// Trasforma l'array di film in una lista di MovieCard (o un messaggio se vuoto). (Es. 2)
import MovieCard from './MovieCard'

function MovieList({ movies }) {
  if (movies.length === 0) {
    return <p className="empty-state">Nessun film trovato.</p>
  }

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

export default MovieList
