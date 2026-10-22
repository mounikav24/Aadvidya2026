import React, { useState, useEffect } from 'react'

export default function Registration() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const targetDate = new Date("Nov 19, 2026 09:00:00").getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance < 0) {
        clearInterval(timer)
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const pad = (num) => String(num).padStart(2, '0')

  return (
    <section id="register" className="registration-section">
      <div className="section-container">
        {/* <h2 className="section-title">Participant <span className="text-red">Registration</span></h2> */}
        <div className="registration-card">
          <i className="fas fa-hourglass-half registration-icon"></i>
          <h3>Registrations Open Soon...</h3>
          <p>"Great things take time. The pulse of innovation is about to beat.<br />
             <strong>Stay tuned for November 19, 2026.</strong>"</p>

          <div className="countdown-box">
            <div className="countdown-title">Event Starts In</div>
            <div className="countdown-timer">
              <div className="time-unit">
                <span className="time-value">{pad(timeLeft.days)}</span>
                <span className="time-label">Days</span>
              </div>
              <span className="colon">:</span>
              <div className="time-unit">
                <span className="time-value">{pad(timeLeft.hours)}</span>
                <span className="time-label">Hrs</span>
              </div>
              <span className="colon">:</span>
              <div className="time-unit">
                <span className="time-value">{pad(timeLeft.minutes)}</span>
                <span className="time-label">Min</span>
              </div>
              <span className="colon">:</span>
              <div className="time-unit">
                <span className="time-value">{pad(timeLeft.seconds)}</span>
                <span className="time-label">Sec</span>
              </div>
            </div>
          </div>

          <div className="registration-buttons">
            <a href="#events" className="btn btn-secondary">
              <i className="fas fa-calendar-alt"></i> View Events
            </a>
            <a href="https://www.instagram.com/aadvidya.2026?srtk=cWYzYzdlMHd6dm9x" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram" 
              className="btn btn-primary">
              <i className="fab fa-instagram"></i> Follow for Updates
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}