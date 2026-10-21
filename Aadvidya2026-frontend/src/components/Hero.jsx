import React, { useEffect, useRef } from 'react'

const TITLE = 'AADVIDYA'

export default function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let width, height, raf
    let particles = [], hexes = []
    let helixBaseY = 0 // Dynamic Y position
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const initParticles = () => {
      const count = Math.min(70, Math.floor(width / 22))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.8 + 0.6,
        speed: Math.random() * 0.35 + 0.08,
        drift: (Math.random() - 0.5) * 0.25,
        alpha: Math.random() * 0.45 + 0.12,
        tw: Math.random() * Math.PI * 2
      }))
    }

    const initHexes = () => {
      hexes = Array.from({ length: 5 }, (_, i) => ({
        nx: 0.1 + i * 0.19 + Math.random() * 0.06,
        ny: 0.1 + Math.random() * 0.45,
        s: 45 + Math.random() * 75,
        rot: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 0.00025
      }))
    }

    const resize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      initParticles()
      initHexes()

      // --- DYNAMIC HELIX POSITIONING ---
      // Find the .helix-zone div and calculate its center relative to the canvas
      const zone = document.querySelector('.helix-zone')
      if (zone) {
        const canvasRect = canvas.getBoundingClientRect()
        const zoneRect = zone.getBoundingClientRect()
        // Calculate Y offset: (Zone Top relative to screen) - (Canvas Top relative to screen) + (Half Zone Height)
        helixBaseY = (zoneRect.top - canvasRect.top) + (zoneRect.height / 2)
      } else {
        helixBaseY = height * 0.8 // Fallback
      }
      
      if (reduceMotion) draw(0)
    }

    const drawHexes = (t) => {
      hexes.forEach((h) => {
        const cx = h.nx * width
        const cy = h.ny * height
        const rot = h.rot + t * h.spin
        ctx.beginPath()
        for (let i = 0; i < 6; i++) {
          const a = rot + (i * Math.PI) / 3
          const px = cx + Math.cos(a) * h.s
          const py = cy + Math.sin(a) * h.s
          i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)
        }
        ctx.closePath()
        ctx.strokeStyle = 'rgba(240,165,0,0.08)' // Gold theme
        ctx.lineWidth = 1
        ctx.stroke()
        for (let i = 0; i < 6; i++) {
          const a = rot + (i * Math.PI) / 3
          ctx.beginPath()
          ctx.arc(cx + Math.cos(a) * h.s, cy + Math.sin(a) * h.s, 1.6, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(255,215,0,0.25)'
          ctx.fill()
        }
      })
    }

    const drawParticles = (t) => {
      particles.forEach((p) => {
        p.y -= p.speed
        p.x += p.drift + Math.sin(t * 0.001 + p.tw) * 0.12
        if (p.y < -12) { p.y = height + 12; p.x = Math.random() * width }
        if (p.x < -12) p.x = width + 12
        if (p.x > width + 12) p.x = -12
        const twinkle = 0.55 + 0.45 * Math.sin(t * 0.002 + p.tw)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,215,0,${(p.alpha * twinkle).toFixed(3)})` // Gold particles
        ctx.shadowBlur = 10
        ctx.shadowColor = 'rgba(240,165,0,0.7)'
        ctx.fill()
        ctx.shadowBlur = 0
      })
    }

    const drawHelix = (t) => {
      const baseY = helixBaseY 
      const amp = Math.min(64, height * 0.075)
      const k = 0.014
      const speed = t * 0.0011

      // base-pair rungs
      for (let x = 0; x <= width; x += 18) {
        const ph = x * k + speed
        const y1 = baseY + Math.sin(ph) * amp
        const y2 = baseY + Math.sin(ph + Math.PI) * amp
        const g = ctx.createLinearGradient(x, y1, x, y2)
        g.addColorStop(0, 'rgba(255,215,0,0.28)')
        g.addColorStop(0.5, 'rgba(240,165,0,0.06)')
        g.addColorStop(1, 'rgba(255,215,0,0.28)')
        ctx.strokeStyle = g
        ctx.lineWidth = 1
        ctx.beginPath(); ctx.moveTo(x, y1); ctx.lineTo(x, y2); ctx.stroke()
      }

      // two glowing strands
      for (let s = 0; s < 2; s++) {
        const off = s * Math.PI
        ctx.beginPath()
        for (let x = 0; x <= width; x += 6) {
          const ph = x * k + speed
          const y = baseY + Math.sin(ph + off) * amp
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.strokeStyle = s === 0 ? 'rgba(255,215,0,0.55)' : 'rgba(240,165,0,0.35)'
        ctx.lineWidth = 2
        ctx.shadowBlur = 14
        ctx.shadowColor = 'rgba(240,165,0,0.55)'
        ctx.stroke()
        ctx.shadowBlur = 0

        for (let x = 0; x <= width; x += 18) {
          const ph = x * k + speed
          const depth = Math.cos(ph + off)
          const y = baseY + Math.sin(ph + off) * amp
          const r = Math.max(0.7, 2.4 + depth * 1.5)
          const a = Math.max(0.12, 0.4 + depth * 0.3)
          ctx.beginPath()
          ctx.arc(x, y, r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255,${s === 0 ? 215 : 165},${s === 0 ? 0 : 0},${a.toFixed(3)})`
          ctx.fill()
        }
      }
    }

    const draw = (t) => {
      ctx.clearRect(0, 0, width, height)
      drawHexes(t)
      drawParticles(t)
      drawHelix(t)
    }

    const loop = (t) => {
      draw(t)
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('resize', resize)
    resize() // This runs immediately and sets the position
    if (!reduceMotion) raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  const total = TITLE.length
  const arc = 44
  const stepDeg = arc / (total - 1)
  const startDeg = -arc / 2
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="home" className="hero-section">
      <canvas ref={canvasRef} id="ecg-canvas" className="ecg-canvas"></canvas>
      <div className="hero-overlay"></div>
      
      <div className="hero-center-content">
        <h1 className="curved-title" aria-label="AADVIDYA">
          {TITLE.split('').map((ch, i) => {
            const angle = startDeg + i * stepDeg
            const rad = (angle * Math.PI) / 180
            const lift = (1 - Math.cos(rad)) * 55
            return (
              <span key={i} className="curved-letter" style={{ transform: `rotate(${angle}deg) translateY(${lift}px)` }}>
                {ch}
              </span>
            )
          })}
        </h1>
        
        <p className="hero-subtitle">MNR Medical College & Hospital</p>
        
        <div className="highlight-line" role="note">
          <svg className="hl-spark" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
          </svg>
          <span>25 Years of Knowledge, 25 Years of Service. <p>A Future Dedicated to Healing.</p></span>
          <svg className="hl-spark" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
          </svg>
        </div>

        {/* THIS DIV REPLACES THE <br /> TAGS */}
        <div className="helix-zone"></div>

        <div className="hero-buttons">
          <button className="btn btn-primary" onClick={() => scrollTo('register')}>Stay Tuned, Registrations Open Soon!</button> 
          <button className="btn btn-secondary" onClick={() => scrollTo('events')}>Explore Events <i className="fas fa-arrow-right"></i></button>
        </div>
      </div>
    </section>
  )
}