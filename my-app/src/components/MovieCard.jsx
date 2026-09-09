// Card di un film: props -> UI, stato preferito/visto letto dal context, link al dettaglio. (Es. 1, 2, 3, 6, 8)
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FaCheckCircle, FaEye, FaRegStar, FaStar } from 'react-icons/fa'
import { MoviesContext } from '../context/MoviesContext'

function MovieCard({ movie }) {
  const { toggleFavorite, toggleWatched } = useContext(MoviesContext)
  const { id, title, year, poster, genre, watched, favorite } = movie

  return (
    <article className={`movie-card ${favorite ? 'movie-card--favorite' : ''}`}>
      {poster && <img className="movie-card__poster" src={poster} alt={title} />}
      <div className="movie-card__body">
        <h3 className="movie-card__title">
          <Link to={`/movies/${id}`}>{title}</Link>
        </h3>
        <p className="movie-card__year">{year}</p>

        {genre && <span className="movie-card__badge">{genre}</span>}

        <p className="movie-card__status">
          {watched ? <FaCheckCircle aria-hidden="true" /> : <FaEye aria-hidden="true" />}
          {watched ? ' Visto' : ' Da vedere'}
        </p>

        <div className="movie-card__actions">
          <button type="button" onClick={() => toggleFavorite(id)}>
            {favorite ? <FaStar aria-hidden="true" /> : <FaRegStar aria-hidden="true" />}
            <span>Preferito</span>
          </button>
          <button type="button" onClick={() => toggleWatched(id)}>
            {watched ? 'Segna da vedere' : 'Segna come visto'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default MovieCard
