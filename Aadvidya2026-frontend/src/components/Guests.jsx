import React from 'react'

export default function Guests() {
  const guests = [
    { title: "Keynote Speaker" },
    { title: "Guest Lecturer" },
    { title: "Chief Guest" },
    { title: "Distinguished Judge" }
  ]

  return (
    <section id="guests" className="guests-section">
      <div className="section-container">
        <h2 className="section-title">Guests & <span className="text-red">Speakers</span></h2>
        <p className="section-subtitle">(Final list to be announced soon)</p>

        <div className="guests-grid">
          {guests.map((guest, idx) => (
            <div key={idx} className="guest-card">
              <div className="guest-avatar">
                <i className="fas fa-user-md"></i>
              </div>
              <h4>{guest.title}</h4>
              <p>To Be Announced</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}