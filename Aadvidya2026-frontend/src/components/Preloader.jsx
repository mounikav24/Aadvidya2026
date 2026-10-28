import React, { useEffect, useRef, useState } from 'react'

export default function Preloader({ onComplete }) {
  const pathRef = useRef(null)
  const headRef = useRef(null)
  const [phase, setPhase] = useState('idle')

  useEffect(() => {
    const path = pathRef.current
    if (!path) return

    const totalLength = path.getTotalLength()
    path.style.strokeDasharray = totalLength
    path.style.strokeDashoffset = totalLength

    const drawDelay = setTimeout(() => {
      setPhase('drawing')
      const duration = 5500 // Slowed down significantly
      const start = performance.now()

      const tick = (now) => {
        const elapsed = now - start
        const t = Math.min(elapsed / duration, 1)
        
        // Linear progression for consistent speed
        const progress = t

        // Update stroke dash for line drawing
        path.style.strokeDashoffset = totalLength * (1 - progress)

        // Get exact point on path for perfect sync
        const point = path.getPointAtLength(totalLength * progress)
        if (headRef.current) {
          headRef.current.style.left = `${point.x}px`
          headRef.current.style.top = `${point.y}px`
        }

        if (t < 1) {
          requestAnimationFrame(tick)
        } else {
          // Pulse reached end - trigger burst
          setPhase('bursting')
          
          // Wait for curtain animation to complete, then immediately show main page
          setTimeout(() => {
            setPhase('done')
            onComplete && onComplete()
          }, 1000) // Match curtain animation duration
        }
      }
      requestAnimationFrame(tick)
    }, 800)

    return () => clearTimeout(drawDelay)
  }, [onComplete])

  return (
    <div className={`preloader preloader--${phase}`}>
      <div className="preloader__bg">
        <div className="preloader__grid" />
        <div className="preloader__particles">
          {Array.from({ length: 30 }).map((_, i) => (
            <span
              key={i}
              className="particle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${4 + Math.random() * 6}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="preloader__content">
        <div className="logo-wrap">
          <div className="logo-orbit">
            <span className="orbit-dot orbit-dot--1" />
            <span className="orbit-dot orbit-dot--2" />
            <span className="orbit-dot orbit-dot--3" />
          </div>
          <div className="logo-glow" />
          <img
            src="/Aadvidya logo.png"
            alt="AADVIDYA"
            className="logo-img"
          />
        </div>

        <div className="brand" aria-label="AADVIDYA">
          {'AADVIDYA'.split('').map((ch, i) => (
            <span key={i} style={{ animationDelay: `${0.1 * i + 0.3}s` }}>
              {ch}
            </span>
          ))}
        </div>

        <div className="ecg">
          <svg
            className="ecg__svg"
            viewBox="0 0 800 120"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="ecgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"  stopColor="#f0a500" stopOpacity="0.15" />
                <stop offset="60%" stopColor="#ffd700" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
              </linearGradient>
              <filter id="ecgGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <line
              x1="0" y1="60" x2="800" y2="60"
              stroke="rgba(240,165,0,0.12)"
              strokeWidth="1"
              strokeDasharray="4 6"
            />

            <path
              ref={pathRef}
              className="ecg__path"
              d="M 0 60
                 L 80 60
                 L 120 60 L 140 45 L 160 75 L 180 60
                 L 240 60
                 L 260 60 L 275 20 L 290 100 L 305 10 L 320 110 L 335 60
                 L 420 60
                 L 440 60 L 455 40 L 470 80 L 485 60
                 L 560 60
                 L 580 60 L 595 15 L 610 105 L 625 5  L 640 115 L 655 60
                 L 800 60"
              stroke="url(#ecgGradient)"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#ecgGlow)"
            />
          </svg>

          <div ref={headRef} className="ecg__head">
            <span className="ecg__head-core" />
            <span className="ecg__head-halo" />
          </div>
        </div>

        <div className="status">
          <span className="status__dot" />
          <span className="status__label">
            {phase === 'idle' && 'STANDBY'}
            {phase === 'drawing' && 'SYNCING VITALS'}
            {phase === 'bursting' && 'ENTERING'}
          </span>
        </div>
      </div>

      {phase === 'bursting' && (
        <>
          <div className="shockwave shockwave--1" />
          <div className="shockwave shockwave--2" />
          <div className="curtain curtain--top" />
          <div className="curtain curtain--bot" />
        </>
      )}
    </div>
  )
}