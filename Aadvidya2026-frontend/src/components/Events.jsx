import React, { useState } from 'react'

const activeEvents = [
  { name: 'Symptoma', sub: 'Case Presentation', desc: 'Present real medical cases with structured diagnosis and treatment plans. A platform to showcase clinical reasoning and communication skills.', icon: 'fa-stethoscope' },
  { name: 'Hephaestus', sub: '3D Model Making', desc: 'Bring anatomy and medical concepts to life through creative model building. A blend of science and art that tests innovation and teamwork.', icon: 'fa-cubes' },
  { name: 'Eureka', sub: 'Quiz', desc: 'A thrilling medical quiz where speed, accuracy, and teamwork decide the winners. Test your knowledge across specialties.', icon: 'fa-brain' },
  { name: 'Graphe', sub: 'Poster Presentation', desc: 'Design and present medical posters that highlight research, innovation, or clinical themes. Combine creativity with scientific communication.', icon: 'fa-chart-column' }
]

const passiveEvents = [
  { name: 'Hang or Diagnose', desc: "A diagnostic puzzle game where teams race to crack the case before the diagnosis gets 'hanged.'", icon: 'fa-user-doctor' },
  { name: 'Spell Bee', desc: 'Test your spelling speed and accuracy with medical terms.', icon: 'fa-spell-check' },
  { name: 'Clinical Quickfire', desc: 'Race against time to identify diseases from signs or pick the correct first-line drug.', icon: 'fa-bolt' },
  { name: 'Medical Taboo', desc: 'Guess medical terms without using restricted words. A fun team game.', icon: 'fa-comments' },
  { name: 'Just a Minute', desc: 'Speak impromptu for one minute on medical topics.', icon: 'fa-microphone' },
  { name: 'Word Scramble', desc: 'Unscramble medical words and terms under time pressure.', icon: 'fa-font' },
  { name: 'Med Crossword', desc: 'Decode clues and complete a medical crossword grid.', icon: 'fa-table-cells' },
  { name: 'Med Dumbcharades', desc: 'Act out medical terms for teammates to guess.', icon: 'fa-masks-theater' },
  { name: 'Med Hunt', desc: 'Follow clues, solve challenges, and navigate a trail of medical knowledge.', icon: 'fa-map-location-dot' },
  { name: 'Face Painting', desc: 'Blend art and anatomy with creative designs.', icon: 'fa-palette' },
  { name: 'Path Mystery Box', desc: 'Spot diseases from pathological images and histology clues.', icon: 'fa-microscope' },
  { name: 'Psychiatry Escape Room', desc: 'Solve psychological puzzles and escape within time limits.', icon: 'fa-key' },
  { name: 'Wrong Answers Only', desc: 'Say the most ridiculous answers — creativity and humor win.', icon: 'fa-face-laugh-squint' },
  { name: 'Crime Scene Investigation', desc: 'Step into the shoes of a forensic investigator.', icon: 'fa-magnifying-glass' }
]

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null)

  const closeAndRegister = () => {
    setSelectedEvent(null)
    setTimeout(() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' }), 50)
  }

  return (
    <section id="events" className="events-section">
      <div className="section-container">
        <h2 className="section-title">Events</h2>

        <div className="events-grid-2col">
          <div className="events-column">
            <h3 className="column-title">Active Events</h3>
            <div className="events-list">
              {activeEvents.map((event, idx) => (
                <div key={idx} className="event-flash-card" onClick={() => setSelectedEvent({ ...event, type: 'Active Event' })}>
                  <div className="event-icon"><i className={`fas ${event.icon}`}></i></div>
                  <div className="event-info"><h4>{event.name}</h4><p>{event.sub}</p></div>
                </div>
              ))}
            </div>
          </div>

          <div className="events-column">
            <h3 className="column-title">Passive Events</h3>
            <div className="events-list">
              {passiveEvents.map((event, idx) => (
                <div key={idx} className="event-flash-card" onClick={() => setSelectedEvent({ ...event, type: 'Passive Event' })}>
                  <div className="event-icon"><i className={`fas ${event.icon}`}></i></div>
                  <div className="event-info"><h4>{event.name}</h4><p>{event.desc.substring(0, 45)}...</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedEvent && (
        <div className="flash-card-modal" onClick={() => setSelectedEvent(null)}>
          <div className="flash-card-content" onClick={(e) => e.stopPropagation()}>
            <button className="flash-close" onClick={() => setSelectedEvent(null)} aria-label="Close details">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="flash-card-header">
              <div className="flash-card-icon"><i className={`fas ${selectedEvent.icon}`}></i></div>
              <div>
                <h3>{selectedEvent.name}</h3>
                <p className="event-type">{selectedEvent.sub || selectedEvent.type}</p>
              </div>
            </div>
            <p className="flash-card-desc">{selectedEvent.desc}</p>
            <div className="flash-card-details">
              <div className="detail-item"><span className="detail-label">Venue</span><span className="detail-value">MNR Campus (TBA)</span></div>
              <div className="detail-item"><span className="detail-label">Fee</span><span className="detail-value">To be announced</span></div>
              <div className="detail-item"><span className="detail-label">Certificate</span><span className="detail-value">Provided</span></div>
              <div className="detail-item"><span className="detail-label">Contact</span><span className="detail-value">TBA</span></div>
            </div>
            <div className="flash-card-rules">
              <h4>Rules & Eligibility</h4>
              <ul>
                <li>Open to all registered medical students</li>
                <li>Team size and rules shared upon registration</li>
                <li>Decision of judges is final</li>
              </ul>
            </div>
            <button className="btn btn-primary" onClick={closeAndRegister}>Register Now</button>
          </div>
        </div>
      )}
    </section>
  )
}