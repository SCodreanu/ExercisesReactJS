// Layout condiviso da tutte le route: navbar + <Outlet /> per la route figlia attiva. (Es. 8)
import { NavLink, Outlet } from 'react-router-dom'
import Container from './Container'

function Layout() {
  return (
    <>
      <header className="navbar">
        <Container>
          <nav>
            <NavLink to="/" end>
              Home
            </NavLink>
            <NavLink to="/favorites">Preferiti</NavLink>
          </nav>
        </Container>
      </header>

      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
    </>
  )
}

export default Layout
