import React, { useState } from 'react'

const workshops = [
   {
  name: 'BLS (KAIROS)',
  sub: 'Basic Life Support',
  tagline: 'Learn with Purpose. Practice with Precision. Heal with Compassion.',
  desc: 'An intensive, hands-on workshop designed to impart essential life-saving skills, encompassing CPR, choking management across all age groups, disaster preparedness, emergency triage, and rescue operations.',
  icon: 'fa-heart-pulse',
  date: '19th November 2026',
  duration: '9:00 AM to 3:30 PM',
  fee: '₹899',
  instructions: 'Follow all hospital ward safety and hygiene protocols. Active participation in physical simulations is expected.',
  requirements: 'Valid student ID, a notebook, and a pen. Comfortable attire recommended for practical sessions.',
  stations: [
    {
      name: 'Adult CPR and AED',
      equipment: ['Recognize cardiac arrest and learn life-saving CPR and AED techniques.']
    },
    {
      name: 'Paediatric CPR',
      equipment: ['Explore age-appropriate CPR techniques for infants and children.']
    },
    {
      name: 'Airway Management',
      equipment: ['Learn airway maintenance and practise essential breathing support techniques.']
    },
    {
      name: 'Choking Management',
      equipment: ['Recognize airway obstruction and practise life-saving choking relief techniques.']
    }
  ],
  additionalTopics: [
    {
      title: 'Disaster Preparedness',
      desc: 'Prepare, respond, and stay safe during disasters.'
    },
    {
      title: 'Triage',
      desc: 'Assess and prioritize patients in emergencies.'
    },
    {
      title: 'Rescue Operations',
      desc: 'Learn safe and effective rescue techniques.'
    }
  ]
},
  {
    name: 'BSS (PRAXIS)',
    sub: 'Basic Surgical Skills',
    tagline: 'From Theory to the Operating Table',
    desc: 'An intensive, hands-on workshop focused on core surgical techniques, knot-tying, and suturing. Learn essential clinical precision directly from expert surgeons.',
    // desc: 'Hands-on training in knot-tying, suturing, and surgical techniques from experienced surgeons.',
    icon: 'fa-scissors',
    date: '19th November 2026',
    duration: '9:00 AM to 3:30 PM',
    fee: '₹1,099',
    // contact: 'S. Sathvika (9492841343), K. Sanjana (9246820004)',
    instructions: 'Follow all hospital ward safety and hygiene protocols. Strict adherence to sterility protocols will be enforced. ',
    requirements: 'Valid student ID, a notebook, and a pen. Comfortable attire recommended for practical sessions.',
    stations: [
      {
        name: 'Suturing',
        // equipment: ['Learn the art of suturing and practice on realistic models under expert guidance.']
      },
      {
        name: 'Hand Knots',
        // equipment: ['Two-tone thick cords', 'Rubber bands']
      },
      {
        name: 'Handwash & Gloving',
        // equipment: ['Hand wash supplies', 'Sterile surgical gloves', 'Non-sterile latex gloves']
      },
      {
        name: 'Catheterization',
        // equipment: ['Male and female catheterization pelvic mannequins', '2-way Foley catheters (14/16 Fr)', "Ryle's tube", 'Uro-bags', 'Distilled water (10cc x 6)', 'Lignocaine gel']
      },
      {
        name: 'Clamping a Blood Vessel',
        // equipment: ['Artery forceps', 'Syringes (10cc)']
      },
      {
        name: 'Casualty Bandaging & Tourniquet',
        // equipment: ['Reusable crepe bandages (10 cm and 15 cm)', 'Commercial tourniquets', 'Paper plaster', 'Easy fix']
      },
      {
        name: 'Holding & Passing Instruments',
        // equipment: ['Surgical instruments', 'Suture scissors', 'Blindfolds/eye masks']
      },
      {
        name: 'Patient Draping & OT Sterility',
        // equipment: ['OT gowns', 'Green drape', 'Washable poster paint']
      },
      {
        name: 'Venipuncture',
        // equipment: ['IV cannulas', 'Syringes', 'Disposal bin']
      }
    ]
  },
  {
    name: 'Emergency & Trauma Care (AUXILIUM)',
    sub: 'Emergency Care',
    tagline: 'From Securing an Airway to Restoring a Heartbeat',
    desc: 'From securing an airway to restoring a heartbeat, from administering emergency injections to stabilising traumatic injuries, every station is designed to transform medical knowledge into life-saving skills. Explore airway and breathing management, Vascular acess and cardiopulmonary resuscitation (CPR), defibrillation, and trauma immobilisation.',
    icon: 'fa-truck-medical',
    date: '20th November 2026',
    duration: '9:00 AM to 01:00 PM',
    fee: '₹999',
    instructions: 'Follow all hospital ward safety and hygiene protocols. Active participation in physical simulations is expected.',
    requirements: 'Valid student ID, a notebook, and a pen. Comfortable attire recommended for practical sessions.',
    stations: [
      {
        name: 'Primary Breathing / Airway Management',
        equipment: ['Master the art of securing the airway through airway assessment, oxygen delivery, and endotracheal intubation demonstration through simulation models']
      },
      {
        name: 'Vascular acess',
        equipment: ['Explore  hands-on practice in IV cannulation, IM injections, and  aseptic procedures ']
      },
      {
        name: 'Defibrillation and CPR',
        equipment: ['Experience life-saving cardiac interventions through CPR techniques, cardiac arrest management, and defibrillator training.']
      },
      {
        name: 'Immobilisation',
        equipment: ['Learn to protect trauma patients through Philadelphia collar application, fracture splinting, and safe patient handling techniques.']
      }
    ]
  },
  {
    name: 'OBGY (VITA IN TRANSITU)',
    sub: 'Obstetrics & Gynaecology',
    tagline: 'Life in Transition',
    desc: 'An intensive, hands-on workshop designed to enhance clinical skills in obstetric emergencies and childbirth management. Explore the stages and mechanism of normal vaginal delivery, identify breech presentations, and practise essential delivery techniques using obstetric mannequins. Focus on recognition and initial management of postpartum haemorrhage (PPH) and episiotomy through interactive sessions.',
    icon: 'fa-baby',
    date: '20th November 2026',
    duration: '9:00 AM to 01:00 PM',
    fee: '₹799',
    instructions: 'Follow all hospital ward safety and hygiene protocols. Maintain professional decorum during practical sessions.',
    requirements: 'Valid student ID, a notebook, and a pen. Comfortable attire recommended for practical sessions.',
    stations: [
      {
        name: 'Normal Vaginal Delivery (NVD)',
        equipment: ['Demonstration of mechanism of normal labour, stages and conduction of labour, with step-by-step hands-on training on normal vaginal delivery on mannequin.']
      },
      {
        name: 'Breech Delivery',
        equipment: ['Diagnosis of breech presentation, principles of assisted breech delivery, maneuvers for delivery of after-coming head and arms, with hands-on practice to ensure safe maternal and fetal outcome.']
      },
      {
        name: 'Postpartum Haemorrhage (PPH) & Episiotomy',
        equipment: ['Identification and management of Postpartum Haemorrhage including the indications, technique of episiotomy and its repair.']
      },
      {
        name: 'Cardiotocography (CTG)',
        equipment: ['Basics of CTG, understanding baseline, variability, accelerations and decelerations, interpretation of normal, suspicious traces and timely decision making for fetal well-being.']
      },
      {
        name: 'Neonatal Resuscitation',
        equipment: ['Systematic approach to newborn assessment at birth, initial steps of warming, drying, stimulation, and hands-on training on airway management and bag-and-mask ventilation as per NRP guidelines.']
      }
    ]
  },
  {
    name: 'Pediatrics (NEONOVA 360°)',
    sub: 'Pediatric Care',
    tagline: 'Little Patients, Big Challenges — 360° of Care, One Precious Beginning',
    desc: 'Every healthy future begins with the right care at the very beginning. Welcome to the world of Paediatrics, where every tiny detail matters and timely intervention can make all the difference. Join us for a hands-on workshop featuring interactive simulations and skill stations to sharpen your clinical skills and experience managing the smallest patients in the biggest emergencies.',
    icon: 'fa-child',
    date: '19th November 2026',
    duration: '9:00 AM to 3:30 PM',
    fee: '₹699',
    // contact: 'P.Srija (9392096290), L.SriTaranga (9030132289)',
    instructions: 'Venue: New Learning Hall. Punctuality is mandatory for this full-day session. Follow all hospital ward safety and hygiene protocols.',
    requirements: 'Valid student ID, a notebook, and a pen. Comfortable attire recommended for practical sessions.',
    stations: [
      {
        name: 'Neonatal Resuscitation Programme (NRP)',
        equipment: ['Training in initial newborn assessment and resuscitation, including bag-and-mask ventilation.']
      },
      {
        name: 'Kangaroo Mother Care (KMC) & Thermal Care',
        equipment: ['Learning skin-to-skin contact and methods to prevent hypothermia in newborns.']
      },
      {
        name: 'Breastfeeding & Newborn Feeding Practices',
        equipment: ['Understanding early initiation, correct latching, positioning, and exclusive breastfeeding.']
      },
      {
        name: 'Sepsis Management / Infection Control',
        equipment: ['Learning hand hygiene, aseptic techniques, and infection prevention practices in neonatal care.']
      }
    ]
  },
  {
    name: 'Ophthalmology (ORASIS)',
    sub: 'Vision Care',
    tagline: 'See • Learn • Practice',
    desc: 'Step into the fascinating world of ophthalmology by  experiencing the art of ophthalmic surgery firsthand with a hands-on cataract surgery session using goat eyes under expert guidance and illuminating  the visual pathway through the art of light, demonstration of intraocular injections techniques.The workshop aims to  bridge the gap between  theoretical knowledge and  clinical application through immersive learning and Hands-on simulation.',
    icon: 'fa-eye',
    date: '19th November 2026',
    duration: '9:00 AM to 12:30 PM',
    fee: '₹599',
    // contact: 'Yogitha (+91 77290 67977), Sai Shivani',
    instructions: 'Venue: Ophthalmology Ward. Follow all hospital ward safety and hygiene protocols.',
    requirements: 'Valid student ID, a notebook, and a pen. Comfortable attire recommended for practical sessions.',
    stations: [
      {
        name: 'Cataract Surgery',
        equipment: ['Explore cataract surgery step by step through hands on practice on goat eyes in an interactive simulation experience.']
      },
      {
        name: 'Intraocular Injections',
        equipment: ['Learn the principles of intraocular injections and practise injection techniques on goat eyes under guided supervision.']
      },
      {
        name: 'Visual Field Pathway',
        equipment: ['Discover the fascinating connection between the eyes and brain through immersive 3D visualisation.']
      }
    ]
  },
  {
    name: 'Orthopaedics (OSTEON)',
    sub: 'Bone & Joint Care',
    tagline: 'Where Precision Meets Practice',
    desc: 'Step beyond textbooks into the world of Orthopedics. This hands-on workshop brings together clinical reasoning, surgical skills, and practical techniques to transform theoretical knowledge into real-world experiences.',
    icon: 'fa-bone',
    date: '20th November 2026',
    duration: '9:00 AM to 01:00 PM',
    fee: '₹699',
    // contact: 'Bandhavi (+91 86886 13121), Tarani (+91 63019 41986)',
    instructions: 'Follow all hospital ward safety and hygiene protocols. Hands-on participation in casting and splinting.',
    requirements: 'Valid student ID, a notebook, and a pen. Wear comfortable clothing for practical sessions.',
    stations: [
      {
        name: 'Orthopedic Basics and Casting',
        equipment: [
            'An introductory station designed to familiarise participants with basic instruments and radiological techniques.',
            'Hands on experience in POP preparation and application for fracture immobilisation.']
      },
      {
        name: 'Hands on Orthopedic procedures',
        equipment: [
          'Provides practical exposure to essential orthopedic procedures.',
          'Learning and practising basic suturing techniques, needle handling and knot tying.',
          'Understand and practice basic drilling and splinting techniques.',
        ]
      },
      {
        name: 'Clinical Orthopedic Skills',
        equipment: [
          'A clinical oriented station where participants will learn the initial approach to trauma cases.',
          'Can learn about principles of joint injection and can perform it on a model.',
          'Practice examination of the knee and hip joints strengthning their clinical assessment skills.',
        ]
      }
    ]
  },
  {
    name: 'Pulmonology (AERION)',
    sub: 'Respiratory Care',
    tagline: 'Exploring Every Breath',
    desc: 'Every breath tells a story, and every timely intervention can make all the difference. Step into the world of Pulmonology through an immersive, hands-on workshop exploring respiratory assessment, diagnosis, and management. From interpreting chest X-rays and performing spirometry to understanding oxygen therapy devices and non-invasive ventilation (NIV), discover the clinical approach to asthma, COPD, and other respiratory disorders.',
        // desc: 'Respiratory assessment, chest X-rays, spirometry, and oxygen therapy management.',
    icon: 'fa-lungs',
    date: '20th November 2026',
    duration: '9:00 AM to 1:00 PM',
    fee: '₹599',
    // contact: 'Vani, Marcellus, Nayan',
    instructions: 'Follow all hospital ward safety and hygiene protocols. Interactive, station-based learning format.',
    requirements: 'Valid student ID, a notebook, and a pen. Comfortable attire recommended for practical sessions.',
    stations: [
      {
        name: 'Pulmonary Function Tests (PFT)',
        // equipment: ['Spirometer', 'Mouthpieces', 'Filters', 'Nose clips', 'Sample PFT reports']
      },
      {
        name: 'Chest X-Ray, Asthma & COPD Management',
        // equipment: [
          // 'Chest X-Ray films & view box/digital setup',
          // 'Metered-Dose Inhaler (MDI) with Spacer',
          // 'Dry Powder Inhalers (DPI): Accuhaler, Turbuhaler, Ellipta'
        // ]
      },
      {
        name: 'Needle Decompression (Airway Management)',
        // equipment: ['Adult airway mannequin', 'Needle decompression kit/setup']
      },
      {
        name: 'Non-Invasive Ventilation (NIV), Oxygen Therapy & Nebulization',
        // equipment: [
        //   'NIV Devices: BiPAP machine, CPAP machine',
        //   'Pulse oximeter',
        //   'Nasal cannula',
        //   'High-flow nasal cannula (HFNC)',
        //   'Simple face mask',
        //   'Venturi face mask',
        //   'Non-rebreather mask',
        //   'Rebreather mask',
        //   'Nebulization mask'
        // ]
      }
    ]
  }
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
              <div className="detail-item">
                <span className="detail-label"><i className="fas fa-clock"></i> Duration</span>
                <span className="detail-value">{selected.duration}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label"><i className="fas fa-tag"></i> Fee</span>
                <span className="detail-value">{selected.fee}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label"><i className="fas fa-certificate"></i> Certificate</span>
                <span className="detail-value">Provided</span>
              </div>
              <div className="detail-item">
                <span className="detail-label"><i className="fas fa-layer-group"></i> Stations</span>
                <span className="detail-value">{selected.stations.length}</span>
              </div>
              <div className="detail-item full-width">
                <span className="detail-label"><i className="fas fa-calendar"></i> Date</span>
                <span className="detail-value">{selected.date}</span>
              </div> 
              {selected.instructions && (
                <div className="detail-item full-width">
                  <span className="detail-label"><i className="fas fa-info-circle"></i> Instructions</span>
                  <span className="detail-value">{selected.instructions}</span>
                </div>
              )}
              {selected.requirements && (
                <div className="detail-item full-width">
                  <span className="detail-label"><i className="fas fa-briefcase"></i> Requirements</span>
                  <span className="detail-value">{selected.requirements}</span>
                </div>
              )}
            </div>

            {/* --- Stations List with Equipment --- */}
            <div className="stations-section">
              <h4 className="stations-title">
                <i className="fas fa-map-signs"></i> Workshop Stations
              </h4>
              <div className="stations-list">
                {selected.stations.map((station, idx) => (
                  <div key={idx} className="station-item">
                    <div className="station-header">
                      <span className="station-number">{String(idx + 1).padStart(2, '0')}</span>
                      <span className="station-name">{station.name}</span>
                    </div>
                    {station.equipment && station.equipment.length > 0 && (
                      <ul className="station-equipment">
                        {station.equipment.map((item, eqIdx) => (
                          <li key={eqIdx} className="equipment-item">
                            <i className="fas fa-tools"></i>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* --- Additional Topics (if any) --- */}
            {selected.additionalTopics && selected.additionalTopics.length > 0 && (
              <div className="additional-topics-section">
                <h4 className="additional-topics-title">
                  <i className="fas fa-star"></i> Additional Topics Covered
                </h4>
                <div className="topics-grid">
                  {selected.additionalTopics.map((topic, idx) => (
                    <div key={idx} className="topic-card">
                      <div className="topic-icon">
                        <i className="fas fa-check-circle"></i>
                      </div>
                      <div className="topic-content">
                        <h5>{topic.title}</h5>
                        <p>{topic.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button className="btn btn-primary" onClick={closeAndRegister}>Register Now</button>
          </div>
        </div>
      )}
    </section>
  )
}