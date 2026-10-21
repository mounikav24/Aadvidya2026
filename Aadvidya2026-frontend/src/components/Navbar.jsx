
import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { createPortal } from 'react-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)

    return () => {
      document.body.classList.remove('menu-open')
    }
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const scrollToId = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const goSection = (id) => {
    setOpen(false)

    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => scrollToId(id), 300)
    } else {
      scrollToId(id)
    }
  }

  const goPage = (path) => {
    setOpen(false)
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  const toggleMenu = () => {
    setOpen(prev => !prev)
  }

  const menuItems = (
    <>
      <button className="nav-link" onClick={() => goSection('home')}>
        Home
      </button>

      <button className="nav-link" onClick={() => goSection('about')}>
        About
      </button>

      <button className="nav-link" onClick={() => goSection('events')}>
        Events
      </button>

      <button className="nav-link" onClick={() => goSection('workshops')}>
        Workshops
      </button>

      <button className="nav-link" onClick={() => goPage('/guests')}>
        Guests
      </button>

      <button className="nav-link" onClick={() => goPage('/milestones')}>
        Milestones
      </button>

      <button className="nav-link" onClick={() => goPage('/feedback')}>
        Feedback
      </button>

      <button className="btn-register" onClick={() => goSection('register')}>
        Register
      </button>
    </>
  )

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div
            className="navbar-brand"
            onClick={() => goSection('home')}
            style={{ cursor: 'pointer' }}
          >
            <img
              src="/Aadvidya logo.png"
              alt="Aadvidya Logo"
              className="navbar-logo"
            />
            <span className="brand-text">AADVIDYA</span>
          </div>

          {/* Desktop navigation */}
          <div className="navbar-nav desktop-nav">
            {menuItems}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="mobile-menu-btn"
            onClick={toggleMenu}
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
          >
            <i className={`fas ${open ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </nav>

      {/* Mobile overlay outside the navbar container */}
      {open && createPortal(
        <div className="mobile-menu-overlay">
          <button
            className="mobile-menu-close"
            onClick={() => setOpen(false)}
            aria-label="Close navigation menu"
          >
            <i className="fas fa-times"></i>
          </button>

          <div className="navbar-nav mobile-open">
            {menuItems}
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
