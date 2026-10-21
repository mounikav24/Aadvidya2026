import React from 'react'
import { Link } from 'react-router-dom'

const guests = [
  { title: 'Keynote Speaker' },
  { title: 'Guest Lecturer' },
  { title: 'Chief Guest' },
  { title: 'Distinguished Judge' }
]

export default function Guests() {
  return (
    <div className="guests-page">
      <div className="section-container">
        <h1 className="page-title">Guests & <span className="text-red">Speakers</span></h1>
        <p className="section-subtitle">Meet our distinguished panel of keynote speakers, judges, and medical experts. (Final list to be announced soon)</p>

        <div className="guests-grid">
          {guests.map((g, i) => (
            <div key={i} className="guest-card">
              <div className="guest-avatar"><i className="fas fa-user-md"></i></div>
              <h4>{g.title}</h4>
              <p>To Be Announced</p>
            </div>
          ))}
        </div>

        <Link to="/" className="btn btn-secondary back-btn"><i className="fas fa-arrow-left"></i> Back to Home</Link>
      </div>
    </div>
  )
}