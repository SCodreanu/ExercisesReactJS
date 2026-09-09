// Route '*': cattura ogni URL non riconosciuto. (Es. 8)
import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

function NotFoundPage() {
  return (
    <div className="not-found">
      <h2>404 - Pagina non trovata</h2>
      <p>La pagina che cerchi non esiste.</p>
      <Link to="/"><FaArrowLeft aria-hidden="true" /> Torna alla home</Link>
    </div>
  )
}

export default NotFoundPage
