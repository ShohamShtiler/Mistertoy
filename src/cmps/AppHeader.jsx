import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import { userService } from '../services/user.service.js'
import { eventBusService } from '../services/event-bus.service.js'
import { LoginSignup } from './LoginSignup.jsx'

import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome,
  faGamepad,
  faChartPie,
  faInfoCircle,
  faRightToBracket,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'

export function AppHeader() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState(userService.getLoggedInUser())
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const removeListener = eventBusService.on('user-updated', user => {
      setLoggedInUser(user)
    })
    return () => removeListener()
  }, [])

  function toggleMenu() {
    setIsMenuOpen(prev => !prev)
  }

  function closeMenu() {
    setIsMenuOpen(false)
  }

  function onLogout() {
    userService.logout()
      .then(() => {
        setLoggedInUser(null)
        eventBusService.emit('user-updated', null)
        navigate('/') // optional: go home after logout
      })
      .catch(err => {
        console.log('Logout failed:', err)
      })
  }

  function openLoginModal() {
    setIsLoginModalOpen(true)
  }

  function closeLoginModal() {
    setIsLoginModalOpen(false)
  }

  return (
    <header className="app-header full">
      <section className="header-container">
        <h1 className="logo">Mister Toy</h1>

        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        {isMenuOpen && <div className="overlay" onClick={closeMenu}></div>}

        <div className="header-right">
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

            <section className="user-controls">
              {loggedInUser ? (
                <>
                  <span className="username">Welcome, {loggedInUser.fullname}</span>
                  <button onClick={onLogout} className="logout-btn">
                    <FontAwesomeIcon icon={faRightFromBracket} /> Logout
                  </button>
                </>
              ) : (
                <button className="nav-link login-link" onClick={() => { closeMenu(); openLoginModal() }}>
                  <FontAwesomeIcon icon={faRightToBracket} /> Login
                </button>
              )}
            </section>
          </nav>
        </div>
      </section>

      {isLoginModalOpen && <LoginSignup onClose={closeLoginModal} />}
    </header>
  )
}