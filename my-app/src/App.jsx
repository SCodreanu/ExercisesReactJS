// Root dell'app: router (React Router 6) avvolto dal MoviesContextProvider,
// così ogni pagina ha accesso ai film senza prop drilling. (Es. 6, 8)
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MoviesContextProvider } from './context/MoviesContext'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import FavoritesPage from './pages/FavoritesPage'
import MovieDetailPage from './pages/MovieDetailPage'
import NotFoundPage from './pages/NotFoundPage'

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: 'favorites', Component: FavoritesPage },
      { path: 'movies/:movieId', Component: MovieDetailPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
])

function App() {
  return (
    <MoviesContextProvider>
      <RouterProvider router={router} />
    </MoviesContextProvider>
  )
}

export default App
