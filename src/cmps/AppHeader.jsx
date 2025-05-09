import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome,
  faGamepad,
  faChartPie,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons'

export function AppHeader() {
  return (
    <header className="app-header full">
      <section className="header-container">
        <h1 className="logo">Mister Toy</h1>
        
        <nav className="nav">
          <NavLink to="/" end className="nav-link home-link">
            <FontAwesomeIcon icon={faHome} /> Home
          </NavLink>
          <NavLink to="/toy" className="nav-link toy-link">
            <FontAwesomeIcon icon={faGamepad} /> Toys
          </NavLink>
          <NavLink to="/dashboard" className="nav-link dashboard-link">
            <FontAwesomeIcon icon={faChartPie} /> Dashboard
          </NavLink>
          <NavLink to="/about" className="nav-link about-link">
            <FontAwesomeIcon icon={faInfoCircle} /> About
          </NavLink>
        </nav>
      </section>
    </header>
  )
}
