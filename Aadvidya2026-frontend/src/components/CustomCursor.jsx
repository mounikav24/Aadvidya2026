import React, { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const moveCursor = (e) => setPos({ x: e.clientX, y: e.clientY })
    
    const handleHover = (e) => {
      if (e.target.matches('a, button, .event-flash-card, .workshop-flash-card, .guest-card, input, textarea, select')) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleHover)
    
    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleHover)
    }
  }, [])

  return (
    <>
      <div className="custom-cursor-dot" style={{ left: pos.x, top: pos.y }} />
      <div className={`custom-cursor-ring ${isHovered ? 'hovered' : ''}`} style={{ left: pos.x, top: pos.y }} />
    </>
  )
}