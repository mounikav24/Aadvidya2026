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

  // Determine fee and participation rules based on event type
  const getEventDetails = (event) => {
    const isActive = activeEvents.some(e => e.name === event.name)
    return {
      type: isActive ? 'Active Event' : 'Passive Event',
      fee: isActive ? '₹100' : 'FREE',
      participation: isActive ? '1 Active Event per participant' : 'Unlimited — participate in as many as you like',
      feeHighlight: isActive
    }
  }

  return (
    <section id="events" className="events-section">
      <div className="section-container">
        <h2 className="section-title">Events</h2>

        {/* Quick Info Banner */}
        <div className="events-info-banner">
          <div className="info-item">
            <i className="fas fa-trophy"></i>
            <div>
              <strong>Active Events:</strong> ₹100 each • Limited to 1 per participant
            </div>
          </div>
          <div className="info-item">
            <i className="fas fa-gift"></i>
            <div>
              <strong>Passive Events:</strong> FREE • Participate in as many as you like!
            </div>
          </div>
        </div>

        <div className="events-grid-2col">
          <div className="events-column">
            <h3 className="column-title">
              <i className="fas fa-trophy"></i> Active Events
              {/* <span className="column-badge">₹100</span> */}
            </h3>
            <div className="events-list">
              {activeEvents.map((event, idx) => (
                <div key={idx} className="event-flash-card" onClick={() => setSelectedEvent({ ...event, ...getEventDetails(event) })}>
                  <div className="event-icon"><i className={`fas ${event.icon}`}></i></div>
                  <div className="event-info">
                    <h4>{event.name}</h4>
                    <p>{event.sub}</p>
                  </div>
                  {/* <span className="event-fee-tag">₹100</span> */}
                </div>
              ))}
            </div>
          </div>

          <div className="events-column">
            <h3 className="column-title">
              <i className="fas fa-star"></i> Passive Events
              {/* <span className="column-badge free">FREE</span> */}
            </h3>
            <div className="events-list">
              {passiveEvents.map((event, idx) => (
                <div key={idx} className="event-flash-card" onClick={() => setSelectedEvent({ ...event, ...getEventDetails(event) })}>
                  <div className="event-icon"><i className={`fas ${event.icon}`}></i></div>
                  <div className="event-info">
                    <h4>{event.name}</h4>
                    <p>{event.desc.substring(0, 45)}...</p>
                  </div>
                  {/* <span className="event-fee-tag free">FREE</span> */}
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
              <div className="detail-item">
                <span className="detail-label"><i className="fas fa-location-dot"></i> Venue</span>
                <span className="detail-value">MNR Campus (TBA)</span>
              </div>
              <div className="detail-item">
                <span className="detail-label"><i className="fas fa-tag"></i> Fee</span>
                <span className={`detail-value ${selectedEvent.feeHighlight ? 'fee-highlight' : 'fee-free'}`}>
                  {selectedEvent.fee}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label"><i className="fas fa-certificate"></i> Certificate</span>
                <span className="detail-value">Provided</span>
              </div>
              <div className="detail-item">
                <span className="detail-label"><i className="fas fa-users"></i> Participation</span>
                <span className="detail-value">{selectedEvent.participation}</span>
              </div>
              <div className="detail-item full-width">
                <span className="detail-label"><i className="fas fa-user-tie"></i> Contact</span>
                <span className="detail-value">TBA</span>
              </div>
            </div>
            <div className="flash-card-rules">
              <h4><i className="fas fa-gavel"></i> Rules & Discipline</h4>
              <ul>
                <li>Open to all registered medical students with valid ID</li>
                <li><strong>Active Events:</strong> Each participant may register for only ONE active event</li>
                <li><strong>Passive Events:</strong> No limit — participate in as many as you wish</li>
                <li>Maintain professional decorum and discipline throughout the event</li>
                <li>Arrive 15 minutes before the scheduled time</li>
                <li>Mobile phones must be switched off during presentations and competitions</li>
                <li>No plagiarism or unfair means — strict action will be taken</li>
                <li>Respect judges, coordinators, and fellow participants at all times</li>
                <li>Team size and specific rules will be shared upon registration</li>
                <li>Decision of the judges and organizing committee is final and binding</li>
                <li>Any misconduct may lead to immediate disqualification</li>
              </ul>
            </div>
            <button className="btn btn-primary" onClick={closeAndRegister}>Register Now</button>
          </div>
        </div>
      )}
    </section>
  )
}
