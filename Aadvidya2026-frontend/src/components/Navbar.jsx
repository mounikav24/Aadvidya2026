import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const scrollToId = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const goSection = (id) => {
    setOpen(false)
    document.body.classList.remove('menu-open') // Re-enable scrolling
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => scrollToId(id), 250)
    } else {
      scrollToId(id)
    }
  }

  const goPage = (path) => {
    setOpen(false)
    document.body.classList.remove('menu-open') // Re-enable scrolling
    navigate(path)
    window.scrollTo({ top: 0 })
  }

  const toggleMenu = () => {
    const newState = !open
    setOpen(newState)
    if (newState) {
      document.body.classList.add('menu-open') // Disable background scrolling
    } else {
      document.body.classList.remove('menu-open') // Re-enable background scrolling
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div 
          className="navbar-brand" 
          onClick={() => { goSection('home'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} 
          style={{ cursor: 'pointer' }}
        >
          <img src="/Aadvidya logo.png" alt="Logo" className="navbar-logo" />
          <span className="brand-text">AADVIDYA</span>
        </div>

        <div className={`navbar-nav ${open ? 'mobile-open' : ''}`}>
          <button className="nav-link" onClick={() => { toggleMenu(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>Home</button>
          <button className="nav-link" onClick={() => goSection('about')}>About</button>
          <button className="nav-link" onClick={() => goSection('events')}>Events</button>
          <button className="nav-link" onClick={() => goSection('workshops')}>Workshops</button>
          <button className="nav-link" onClick={() => goPage('/guests')}>Guests</button>
          <button className="nav-link" onClick={() => goPage('/milestones')}>Milestones</button>
          <button className="nav-link" onClick={() => goPage('/feedback')}>Feedback</button>
          <button className="btn-register" onClick={() => goSection('register')}>Register</button>
        </div>

        <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
          <i className={`fas ${open ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>
    </nav>
  )
}