import React, { useState } from 'react'

const activeEvents = [
  {
    name: 'Symptoma',
    sub: 'Case Presentation',
    desc: 'A showcase of clinical acumen, diagnostic reasoning, and evidence-based decision-making through the art of clinical case analysis.',
    icon: 'fa-stethoscope',
    rules: [
      'Open to undergraduate MBBS students and interns',
      'Teams must comprise two participants from the same college',
      'One team member may submit the abstract on behalf of the team',
      'The same abstract cannot be submitted for multiple scientific events',
      'Abstracts must be original with less than 10% plagiarism',
      'Previously presented cases are not eligible',
      'Cases must be from the participants\' affiliated teaching hospital',
      'Maintain patient confidentiality and obtain informed consent',
      'The abstract must bear the signature and stamp of the concerned HOD',
      'All participants must be registered for AADVIDYA\'26',
      'Abstract Submission Deadline: 10 November 2026',
      'Presentation Duration: 8 minutes (6 min oral + 2 min Q&A)'
    ],
    prizes: 'Certificates + Prizes for Top Performers'
  },
  {
    name: 'Hephaestus',
    sub: '3D Model Making',
    desc: 'Bring ideas to life beyond textbooks! Showcase your creativity and medical knowledge through innovative 3D models that transform complex concepts into stunning, realistic, and interactive masterpieces. Imagine it. Build it. Bring medicine to life!',
    icon: 'fa-cubes',
    rules: [
      'Open exclusively to UG students',
      'Team and individual registration are mandatory',
      'No plagiarism or foul play is allowed',
      'A video of the model-making process is compulsory',
      'Models must be original, creative, and medically relevant',
      'Ensure scientific accuracy and safe materials',
      'Submit the model within the stipulated time',
      'Participants must explain their models during presentation',
      'Judges\' decision will be final',
      'Rule violations may lead to disqualification'
    ],
    prizes: 'Certificates + Prizes for Top Performers'
  },
  {
    name: 'Eureka',
    sub: 'Quiz',
    desc: 'A stimulating battle of intellect, precision, and clinical acumen. Eureka challenges aspiring physicians to push the boundaries of their medical knowledge, sharpen their diagnostic reasoning, and excel under pressure.',
    icon: 'fa-brain',
    rules: [
      'Open to UG and PG medical students',
      'Individual registrations only',
      'Teams will be allotted on the spot through a random chit system',
      'Online and/or offline rounds will depend on the number of registrations',
      'Participants must report on time; latecomers may be disqualified',
      'Cheating, external assistance, and unauthorised devices are strictly prohibited',
      'Any foul play will result in disqualification',
      'Quizmaster\'s decisions on questions, scoring, and disputes are final',
      'All answers must be submitted within the stipulated time',
      'Discipline and compliance with organisers\' instructions are mandatory',
      'Additional questions or rounds will resolve ties',
      'The organising committee reserves the right to modify rules'
    ],
    prizes: 'Certificates + Prizes for Top Performers'
  },
  {
    name: 'Graphe',
    sub: 'Poster Presentation',
    desc: 'Present your ideas, showcase your knowledge, and turn science into a visual masterpiece. Think creatively. Present confidently. Make an impact!',
    icon: 'fa-chart-column',
    rules: [
      'Posters must represent original work',
      'AI may enhance the design, but creativity, concept and originality must come from the participant',
      'Plagiarism is strictly prohibited and may lead to disqualification',
      'Posters should not contain offensive, inappropriate, or misleading content',
      'Participants must report to the venue at least 30 minutes before the event',
      'Late arrivals may lose presentation time',
      'Judges\' decisions are final and binding'
    ],
    prizes: 'Certificates + Prizes for Top Performers'
  }
]

const passiveEvents = [
  {
    name: 'Pulse',
    sub: 'Treasure Hunt',
    desc: 'A thrilling medical treasure hunt where teams decode clues, solve challenges, and navigate a trail of medical knowledge, observation, and teamwork.',
    icon: 'fa-map-location-dot',
    prize: '🏆 ONE FREE WORKSHOP for the entire winning team on the consecutive day!'
  },
  {
    name: 'Hades',
    sub: 'Hang or Diagnose',
    desc: 'Crack the case before the diagnosis gets hanged. Because medicine isn\'t just about memorizing facts — it\'s about connecting clues to find the answer!',
    icon: 'fa-user-doctor'
  },
  {
    name: 'Mortem Mysteria',
    sub: 'Crime Scene Investigation',
    desc: 'Step into the shoes of a forensic investigator and put your observation, analytical thinking and medical knowledge to the test. Explore the clues, examine the evidence, and piece together the truth — before it\'s too late.',
    icon: 'fa-magnifying-glass'
  },
  {
    name: 'Clinical Quickfire',
    sub: 'Rapid Diagnosis',
    desc: 'Diagnose the signs. Choose the drug. Beat the clock. Put your medical knowledge and reflexes to the test — identify diseases from clinical signs or pick the correct first-line drug from four tricky options.',
    icon: 'fa-bolt'
  },
  {
    name: 'Dermal Duality',
    sub: 'Face Painting',
    desc: 'A face-painting experience where art meets anatomy, contrast meets creativity, and every stroke tells a story. Create the illusion of exposed muscles, bones, anatomical structures, or futuristic cybernetic patterns on the face.',
    icon: 'fa-palette'
  },
  {
    name: 'Psychiatric Escape Room',
    sub: 'Mind Games',
    desc: 'Think you can outsmart your own brain? Step into a world where nothing is as it seems, clues are sus, and every second counts. Decode psychological mysteries, crack mind-bending puzzles, and connect the dots before your time runs out.',
    icon: 'fa-key'
  },
  {
    name: 'Path Mystery Box',
    sub: 'Pathological Images',
    desc: 'Tiny clues. Pathognomonic. It\'s in the details. Examine the pathological images, look for the subtle clues, and identify the disease. From histology to special stains, every detail matters.',
    icon: 'fa-microscope'
  },
  {
    name: 'Medical Taboo',
    sub: 'Word Game',
    desc: 'Think fast, speak smart. Some topics are off the charts — guess the medical term without using the restricted words!',
    icon: 'fa-comments'
  },
  {
    name: 'Just a Minute',
    sub: 'Arrheton',
    desc: 'One minute. One topic. Endless possibilities. Speak impromptu on medical topics — think, speak, and keep it going!',
    icon: 'fa-microphone'
  },
  {
    name: 'Spell Bee',
    sub: 'Gelorthography',
    desc: 'Spell it right, think it fast! Test your spelling speed and accuracy with medical terms.',
    icon: 'fa-spell-check'
  },
  {
    name: 'Word Scramble',
    sub: 'Lexis',
    desc: 'Unscramble the chaos, find the hidden words. Race against time to decode medical terminology.',
    icon: 'fa-font'
  },
  {
    name: 'Med Crossword',
    sub: 'Syndesis',
    desc: 'Decode the clues, complete the grid. A classic puzzle format with a medical twist.',
    icon: 'fa-table-cells'
  },
  {
    name: 'Med Dumbcharades',
    sub: 'Mimesis',
    desc: 'Act it out, guess it right — it\'s all in the signs! A fun team game of charades with medical terms.',
    icon: 'fa-masks-theater'
  },
  {
    name: 'Wrong Answers Only',
    sub: 'Creative Chaos',
    desc: 'Be bold, be wild, and say the most ridiculous thing. In this game, wrong is the new right!',
    icon: 'fa-face-laugh-squint'
  }
]

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null)

  const closeAndRegister = () => {
    setSelectedEvent(null)
    setTimeout(() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' }), 50)
  }

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
          <div className="info-item">
            <i className="fas fa-award"></i>
            <div>
              <strong>Special Prize:</strong> Treasure Hunt winners get a FREE Workshop!
            </div>
          </div>
        </div>

        <div className="events-grid-2col">
          <div className="events-column">
            <h3 className="column-title">
              <i className="fas fa-trophy"></i> Active Events
              <span className="column-badge">₹100</span>
            </h3>
            <div className="events-list">
              {activeEvents.map((event, idx) => (
                <div key={idx} className="event-flash-card" onClick={() => setSelectedEvent({ ...event, ...getEventDetails(event) })}>
                  <div className="event-icon"><i className={`fas ${event.icon}`}></i></div>
                  <div className="event-info">
                    <h4>{event.name}</h4>
                    <p>{event.sub}</p>
                  </div>
                  <span className="event-fee-tag">₹100</span>
                </div>
              ))}
            </div>
          </div>

          <div className="events-column">
            <h3 className="column-title">
              <i className="fas fa-star"></i> Passive Events
              <span className="column-badge free">FREE</span>
            </h3>
            <div className="events-list">
              {passiveEvents.map((event, idx) => (
                <div key={idx} className="event-flash-card" onClick={() => setSelectedEvent({ ...event, ...getEventDetails(event) })}>
                  <div className="event-icon"><i className={`fas ${event.icon}`}></i></div>
                  <div className="event-info">
                    <h4>{event.name}</h4>
                    <p>{event.sub}</p>
                  </div>
                  <span className="event-fee-tag free">FREE</span>
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

            {/* Prizes Section */}
            {selectedEvent.prize && (
              <div className="prizes-section">
                <h4 className="prizes-title">
                  <i className="fas fa-trophy"></i> Prize / Reward
                </h4>
                <p className="prizes-content">{selectedEvent.prize}</p>
              </div>
            )}

            {/* Rules Section */}
            {selectedEvent.rules && (
              <div className="flash-card-rules">
                <h4><i className="fas fa-gavel"></i> Rules & Regulations</h4>
                <ul>
                  {selectedEvent.rules.map((rule, idx) => (
                    <li key={idx}>{rule}</li>
                  ))}
                  <li>Maintain professional decorum and discipline throughout the event</li>
                  <li>Decision of the judges and organizing committee is final and binding</li>
                  <li>Any misconduct may lead to immediate disqualification</li>
                </ul>
              </div>
            )}

            {/* Default rules for passive events without specific rules */}
            {!selectedEvent.rules && (
              <div className="flash-card-rules">
                <h4><i className="fas fa-gavel"></i> General Guidelines</h4>
                <ul>
                  <li>Open to all registered medical students with valid ID</li>
                  <li>Participate in as many passive events as you wish</li>
                  <li>Maintain professional decorum and discipline throughout</li>
                  <li>Arrive 15 minutes before the scheduled time</li>
                  <li>Respect judges, coordinators, and fellow participants at all times</li>
                  <li>Decision of the judges and organizing committee is final and binding</li>
                  <li>Any misconduct may lead to immediate disqualification</li>
                </ul>
              </div>
            )}

            <button className="btn btn-primary" onClick={closeAndRegister}>Register Now</button>
          </div>
        </div>
      )}
    </section>
  )
}