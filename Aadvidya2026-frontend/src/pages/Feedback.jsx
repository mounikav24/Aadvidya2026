import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Feedback() {
  const [mode, setMode] = useState('identified')
  const [rating, setRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="feedback-page">
      <div className="section-container">
        <h1 className="page-title">Your <span className="text-red">Feedback</span></h1>

        <div className="feedback-mode-toggle">
          <button className={mode === 'identified' ? 'active' : ''} onClick={() => setMode('identified')}>
            Identified
          </button>
          <button className={mode === 'anonymous' ? 'active' : ''} onClick={() => setMode('anonymous')}>
            Anonymous
          </button>
        </div>

        <form className="feedback-form" onSubmit={handleSubmit}>
          {mode === 'identified' && (
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="John Doe" />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="john@college.edu" />
              </div>
              <div className="form-group full-width">
                <label>College / Institution</label>
                <input type="text" placeholder="MNR Medical College" />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Feedback Category</label>
            <select>
              <option>Overall conference experience</option>
              <option>Event organization</option>
              <option>Workshop quality</option>
              <option>Guest sessions</option>
              <option>Website usability</option>
              <option>Suggestions for future editions</option>
            </select>
          </div>

          <div className="form-group">
            <label>Rating</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <i key={star} className={`fas fa-star ${star <= rating ? 'active' : ''}`} onClick={() => setRating(star)}></i>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Comments / Suggestions</label>
            <textarea rows="5" placeholder="Share your thoughts..."></textarea>
          </div>

          <button type="submit" className="btn btn-primary">
            {submitted ? 'Submitted Successfully!' : 'Submit Feedback'}
          </button>
        </form>

        <Link to="/" className="btn btn-secondary back-btn">
          <i className="fas fa-arrow-left"></i> Back to Home
        </Link>
      </div>
    </div>
  )
}