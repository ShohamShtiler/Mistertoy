import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome,
  faGamepad,
  faChartPie,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons'

export function AppHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function toggleMenu() {
    setIsMenuOpen(prev => !prev)
  }

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <header className="app-header full">
      <section className="header-container">
        <h1 className="logo">Mister Toy</h1>

        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        {/* Dark overlay */}
        {isMenuOpen && <div className="overlay" onClick={closeMenu}></div>}

        <nav className={`nav-sidebar ${isMenuOpen ? 'open' : ''}`}>
          <NavLink to="/" end className="nav-link home-link" onClick={closeMenu}>
            <FontAwesomeIcon icon={faHome} /> Home
          </NavLink>
          <NavLink to="/toy" className="nav-link toy-link" onClick={closeMenu}>
            <FontAwesomeIcon icon={faGamepad} /> Toys
          </NavLink>
          <NavLink to="/dashboard" className="nav-link dashboard-link" onClick={closeMenu}>
            <FontAwesomeIcon icon={faChartPie} /> Dashboard
          </NavLink>
          <NavLink to="/about" className="nav-link about-link" onClick={closeMenu}>
            <FontAwesomeIcon icon={faInfoCircle} /> About
          </NavLink>
        </nav>
      </section>
    </header>
  )
}