// Pagina di dettaglio: id letto dall'URL con useParams(), film recuperato
// dal context, "torna indietro" con useNavigate(). (Es. 8)
import { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeft, FaCheckCircle, FaEye, FaRegStar, FaStar } from 'react-icons/fa'
import { MoviesContext } from '../context/MoviesContext'

function MovieDetailPage() {
  const { movieId } = useParams()
  const { getMovieById, toggleFavorite, toggleWatched } = useContext(MoviesContext)
  const navigate = useNavigate()

  const movie = getMovieById(movieId)

  if (!movie) {
    return (
      <>
        <p>Film non trovato.</p>
        <button type="button" onClick={() => navigate(-1)}>
          <FaArrowLeft aria-hidden="true" /> Torna indietro
        </button>
      </>
    )
  }

  const { id, title, year, poster, genre, watched, favorite } = movie

  return (
    <article className="movie-detail">
      <button type="button" onClick={() => navigate(-1)} className="back-button">
        <FaArrowLeft aria-hidden="true" /> Torna indietro
      </button>

      {poster && <img className="movie-detail__poster" src={poster} alt={title} />}

      <div>
        <h2>{title}</h2>
        <p>{year}</p>
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

export default MovieDetailPage
