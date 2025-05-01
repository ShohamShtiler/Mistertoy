import { NavLink } from 'react-router-dom'
import '../assets/style/cmps/AppHeader.css'

export function AppHeader() {
  return (
    <header className="app-header full">
      <section className="header-container">
        <h1 className="logo">Mister Toy</h1>

        <nav className="nav">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/toy">Toys</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
      </section>
    </header>
  )
}
