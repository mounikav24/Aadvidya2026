import React, { useState } from 'react'

const workshops = [
  { name: 'BLS (KAIROS)', sub: 'Basic Life Support', desc: 'Master CPR, choking management, disaster preparedness, and emergency rescue operations.', icon: 'fa-heart-pulse' },
  { name: 'BSS (PRAXIS)', sub: 'Basic Surgical Skills', desc: 'Hands-on training in knot-tying, suturing, and surgical techniques from experienced surgeons.', icon: 'fa-scissors' },
  { name: 'Emergency & Trauma (AUXILIUM)', sub: 'Emergency Care', desc: 'Securing airways, stabilizing traumatic injuries, CPR, defibrillation, and trauma immobilisation.', icon: 'fa-truck-medical' },
  { name: 'OBG (VIT IN TRANSITU)', sub: 'Obstetrics & Gynaecology', desc: 'Childbirth management, vaginal delivery techniques, breech presentations, and emergency care.', icon: 'fa-baby' },
  { name: 'Paediatrics (NEONOVA 360°)', sub: 'Pediatric Care', desc: 'Neonatal and pediatric care simulations. Manage emergencies in the smallest patients.', icon: 'fa-child' },
  { name: 'Ophthalmology (ORASIS)', sub: 'Vision Care', desc: '3D visualization, extraocular movement studies, and intraocular injection techniques.', icon: 'fa-eye' },
  { name: 'Orthopaedics (OSTEON)', sub: 'Bone & Joint Care', desc: 'Practical orthopedic training, surgical skills, and clinical reasoning for bone/joint conditions.', icon: 'fa-bone' },
  { name: 'Pulmonology (AERION)', sub: 'Respiratory Care', desc: 'Respiratory assessment, chest X-rays, spirometry, and oxygen therapy management.', icon: 'fa-lungs' }
]

export default function Workshops() {
  const [selected, setSelected] = useState(null)

  const closeAndRegister = () => {
    setSelected(null)
    setTimeout(() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' }), 50)
  }

  return (
    <section id="workshops" className="workshops-section">
      <div className="section-container">
        <h2 className="section-title">Workshops</h2>

        <div className="workshops-grid-2col">
          <div className="workshops-column">
            {workshops.slice(0, 4).map((w, idx) => (
              <div key={idx} className="workshop-flash-card" onClick={() => setSelected(w)}>
                <div className="workshop-icon"><i className={`fas ${w.icon}`}></i></div>
                <div className="workshop-info"><h4>{w.name}</h4><p>{w.sub}</p></div>
              </div>
            ))}
          </div>
          <div className="workshops-column">
            {workshops.slice(4).map((w, idx) => (
              <div key={idx} className="workshop-flash-card" onClick={() => setSelected(w)}>
                <div className="workshop-icon"><i className={`fas ${w.icon}`}></i></div>
                <div className="workshop-info"><h4>{w.name}</h4><p>{w.sub}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selected && (
        <div className="flash-card-modal" onClick={() => setSelected(null)}>
          <div className="flash-card-content" onClick={(e) => e.stopPropagation()}>
            <button className="flash-close" onClick={() => setSelected(null)} aria-label="Close details">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="flash-card-header">
              <div className="flash-card-icon"><i className={`fas ${selected.icon}`}></i></div>
              <div>
                <h3>{selected.name}</h3>
                <p className="event-type">{selected.sub}</p>
              </div>
            </div>
            <p className="flash-card-desc">{selected.desc}</p>
            <div className="flash-card-details">
              <div className="detail-item"><span className="detail-label">Duration</span><span className="detail-value">TBA</span></div>
              <div className="detail-item"><span className="detail-label">Fee</span><span className="detail-value">To be announced</span></div>
              <div className="detail-item"><span className="detail-label">Certificate</span><span className="detail-value">Provided</span></div>
              <div className="detail-item"><span className="detail-label">Contact</span><span className="detail-value">TBA</span></div>
            </div>
            <button className="btn btn-primary" onClick={closeAndRegister}>Register Now</button>
          </div>
        </div>
      )}
    </section>
  )
}