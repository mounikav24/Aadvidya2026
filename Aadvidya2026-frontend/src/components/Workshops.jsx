import React, { useState } from 'react'

const workshops = [
  {
    name: 'BLS (KAIROS)',
    sub: 'Basic Life Support',
    desc: 'Master CPR, choking management, disaster preparedness, and emergency rescue operations.',
    icon: 'fa-heart-pulse',
    duration: '4 hours',
    fee: '₹1,000',
    // contact: 'GR. Bhargavi (9347801285), K. Neha (6309319218)',
    instructions: 'Venue and faculty to be confirmed. Please arrive 15 minutes early for registration.',
    requirements: 'Valid student ID, a notebook, and a pen. Follow all hospital ward safety and hygiene protocols. Comfortable attire recommended for practical sessions.',
    equipment: [
      'Adult CPR Manikin',
      'Paediatric CPR Manikin',
      'Airway Manikin',
      'Adult Choking Manikin',
      'Paediatric Choking Manikin',
      'Automated External Defibrillator (AED) - to be confirmed'
    ],
    stations: [
      {
        name: 'Adult CPR',
        equipment: ['Adult CPR Manikin']
      },
      {
        name: 'Paediatric CPR',
        equipment: ['Paediatric CPR Manikin']
      },
      {
        name: 'Airway Management',
        equipment: ['Airway Manikin']
      },
      {
        name: 'Choking Management',
        equipment: ['Adult Choking Manikin', 'Paediatric Choking Manikin']
      }
    ]
  },
  {
    name: 'BSS (PRAXIS)',
    sub: 'Basic Surgical Skills',
    desc: 'Hands-on training in knot-tying, suturing, and surgical techniques from experienced surgeons.',
    icon: 'fa-scissors',
    duration: '4 hours',
    fee: '₹1,100',
    // contact: 'S. Sathvika (9492841343), K. Sanjana (9246820004)',
    instructions: 'Venue to be confirmed. Strict adherence to sterility protocols will be enforced. Faculty: Dr. Rita Singh (Professor).',
    requirements: 'Valid student ID, a notebook, and a pen. Follow all hospital ward safety and hygiene protocols. Comfortable attire recommended for practical sessions.',
    stations: [
      {
        name: 'Suturing',
        equipment: ['Silicone pads (6)', 'Suture sets (needle holder, forceps, scissors)', 'Silk sutures', 'Sharps bin']
      },
      {
        name: 'Hand Knots',
        equipment: ['Two-tone thick cords', 'Rubber bands']
      },
      {
        name: 'Handwash & Gloving',
        equipment: ['Hand wash supplies', 'Sterile surgical gloves', 'Non-sterile latex gloves']
      },
      {
        name: 'Catheterization',
        equipment: ['Male and female catheterization pelvic mannequins', '2-way Foley catheters (14/16 Fr)', "Ryle's tube", 'Uro-bags', 'Distilled water (10cc x 6)', 'Lignocaine gel']
      },
      {
        name: 'Clamping a Blood Vessel',
        equipment: ['Artery forceps', 'Syringes (10cc)']
      },
      {
        name: 'Casualty Bandaging & Tourniquet',
        equipment: ['Reusable crepe bandages (10 cm and 15 cm)', 'Commercial tourniquets', 'Paper plaster', 'Easy fix']
      },
      {
        name: 'Holding & Passing Instruments',
        equipment: ['Surgical instruments', 'Suture scissors', 'Blindfolds/eye masks']
      },
      {
        name: 'Patient Draping & OT Sterility',
        equipment: ['OT gowns', 'Green drape', 'Washable poster paint']
      },
      {
        name: 'Venipuncture',
        equipment: ['IV cannulas', 'Syringes', 'Disposal bin']
      }
    ]
  },
  {
    name: 'Emergency & Trauma (AUXILIUM)',
    sub: 'Emergency Care',
    desc: 'Securing airways, stabilizing traumatic injuries, CPR, defibrillation, and trauma immobilisation.',
    icon: 'fa-truck-medical',
    duration: '3.5 hours',
    fee: '₹1,000',
    // contact: 'K. Sreeja, Sameeksha, Manaswini',
    instructions: 'Venue and faculty to be confirmed. Active participation in physical simulations is expected.',
    requirements: 'Valid student ID, a notebook, and a pen. Follow all hospital ward safety and hygiene protocols. Comfortable attire recommended for practical sessions.',
    stations: [
      {
        name: 'Primary Breathing / Airway Management',
        equipment: ['Airway mannequin (up to lungs)', 'Different oxygen-delivery masks', 'Laryngeal tube', 'Oxygen mask', 'Endotracheal tube', 'Rebreathing mask', 'Ambu bag']
      },
      {
        name: 'IV and IM Injection',
        equipment: ['Upper-limb mannequin', 'Gloves', 'NS, DNS, and RL fluids', 'Tourniquet', 'Different types of syringes', 'IV infusion set', 'Sanitiser', 'Cannulas (14G, 16G, 18G, 20G, 22G, 24G)', 'Sterile swabs']
      },
      {
        name: 'Defibrillation and CPR',
        equipment: ['CPR mannequin', 'Defibrillator machine']
      },
      {
        name: 'Immobilisation',
        equipment: ['Full-body mannequin', 'Splint', 'Philadelphia collars', 'Spineboard', 'Roller gauze']
      }
    ]
  },
  {
    name: 'OBGY (VITA IN TRANSITU)',
    sub: 'Obstetrics & Gynaecology',
    desc: 'Childbirth management, vaginal delivery techniques, breech presentations, and emergency care.',
    icon: 'fa-baby',
    duration: '3.5 hours',
    fee: '₹1,100',
    // contact: 'Tejashree, Gayatri',
    instructions: 'Venue and faculty to be confirmed. Maintain professional decorum during practical sessions.',
    requirements: 'Valid student ID, a notebook, and a pen. Follow all hospital ward safety and hygiene protocols. Comfortable attire recommended for practical sessions.',
    stations: [
      {
        name: 'Normal Vaginal Delivery (NVD)',
        equipment: ['NVD mannequin']
      },
      {
        name: 'Breech Delivery',
        equipment: ['Breech-delivery mannequin']
      },
      {
        name: 'Postpartum Haemorrhage (PPH) & Episiotomy',
        equipment: ['PPH kit', 'Uterus model', 'Suturing kits (2)']
      },
      {
        name: 'Cardiotocography (CTG)',
        equipment: ['CTG machine (available in department)']
      },
      {
        name: 'Neonatal Resuscitation',
        equipment: ['Neonatal mannequin']
      }
    ]
  },
  {
    name: 'Paediatrics (NEONOVA 360°)',
    sub: 'Pediatric Care',
    desc: 'Neonatal and pediatric care simulations. Manage emergencies in the smallest patients.',
    icon: 'fa-child',
    duration: '6.5 hours (9:00 AM – 3:30 PM)',
    fee: '₹999',
    // contact: 'P.Srija (9392096290), L.SriTaranga (9030132289)',
    instructions: 'Venue: New Learning Hall. Punctuality is mandatory for this full-day session.',
    requirements: 'Valid student ID, a notebook, and a pen. Follow all hospital ward safety and hygiene protocols. Comfortable attire recommended for practical sessions.',
    stations: [
      {
        name: 'Neonatal Resuscitation Programme (NRP)',
        equipment: ['3 neonatal manikins (main)', 'ET intubation setup (1)', 'BMV (Bag and Mask Ventilation)', 'Preterm baby manikin (1)', 'Term baby manikin (1)', 'Laryngoscope', 'Ambu bag', 'NT catheter (2.5, 3mm)']
      },
      {
        name: 'Kangaroo Mother Care (KMC) & Thermal Care',
        equipment: ['1 manikin', 'KMC wrap/sling']
      },
      {
        name: 'Breastfeeding & Newborn Feeding Practices',
        equipment: ['Breastfeeding model', 'Breastfeeding position banner']
      }
    ]
  },
  {
    name: 'Ophthalmology (ORASIS)',
    sub: 'Vision Care',
    desc: '3D visualization, extraocular movement studies, and intraocular injection techniques.',
    icon: 'fa-eye',
    duration: '3.5 hours (9:00 AM – 12:30 PM)',
    fee: '₹599',
    // contact: 'Yogitha (+91 77290 67977), Sai Shivani',
    instructions: 'Venue: Ophthalmology Ward. Faculty: Prajwali Mam, Ananya Mam. Day 1 (Nov 19).',
    requirements: 'Valid student ID, a notebook, and a pen. Follow all hospital ward safety and hygiene protocols. Comfortable attire recommended for practical sessions.',
    stations: [
      {
        name: 'Cataract Surgery',
        equipment: ['Operating loop (1)', 'Goat eyes (30)', 'Leather pad', 'Viscoelastics (1 box of 10)']
      },
      {
        name: 'Intraocular Injections',
        equipment: ['Saline (RL) - 2 bottles', 'Syringe (2cc) - 5', '26G needle - 20']
      },
      {
        name: 'Visual Field Pathway',
        equipment: [
          'Model: cardboard box (11x8x2.5 inch)',
          'RGB LED strip 12V (1 meter x 2 qty)',
          '12V battery or 12V adaptor',
          'Transparent pipe',
          'Brain model: plastic ball (6 inch), air dry clay, cardboard, masking tape, glue, acrylic colour, hot glue',
          'Eyeball model: plastic ball (4.5 inch), masking tape, tissue paper, Fevicol, chart paper, cardboard, poster colour, hot glue'
        ]
      }
    ]
  },
  {
    name: 'Orthopaedics (OSTEON)',
    sub: 'Bone & Joint Care',
    desc: 'Practical orthopedic training, surgical skills, and clinical reasoning for bone/joint conditions.',
    icon: 'fa-bone',
    duration: '3 hours',
    fee: '₹699',
    // contact: 'Bandhavi (+91 86886 13121), Tarani (+91 63019 41986)',
    instructions: 'Venue to be confirmed. Faculty: Dr. Akram Sir. Hands-on participation in casting and splinting.',
    requirements: 'Valid student ID, a notebook, and a pen. Follow all hospital ward safety and hygiene protocols. Wear comfortable clothing for practical sessions.',
    stations: [
      {
        name: 'Instrument Identification, Clinical Examination & X-ray Interpretation',
        equipment: ['Basic viva instruments', 'X-rays', 'Prosthetics & orthotics models']
      },
      {
        name: 'Hands-on Orthopedic Procedures — Immobilization, Splinting, POP Casting, Drilling',
        equipment: [
          'Casting material – 4-inch POP cast set',
          'Mannequin (full body)',
          'Splints (Thomas, BSB)',
          'IV tubes',
          'Drilling machine with screws, bolts, and plate',
          'Bones (specimens)',
          'Immobilization - Neck cap'
        ]
      },
      {
        name: 'Joint Injection Simulation & Suturing',
        equipment: [
          'Needle holders',
          'Needles',
          'Suturing wire - Fiber wire',
          'Scalpel and blades',
          'Syringes (5-10 cc, 10 units)',
          'Surgical gloves',
          'Forceps'
        ]
      }
    ]
  },
  {
    name: 'Pulmonology (AERION)',
    sub: 'Respiratory Care',
    desc: 'Respiratory assessment, chest X-rays, spirometry, and oxygen therapy management.',
    icon: 'fa-lungs',
    duration: '4 hours',
    fee: '₹599',
    // contact: 'Vani, Marcellus, Nayan',
    instructions: 'Venue to be confirmed. Interactive, station-based learning format.',
    requirements: 'Valid student ID, a notebook, and a pen. Follow all hospital ward safety and hygiene protocols. Comfortable attire recommended for practical sessions.',
    stations: [
      {
        name: 'Pulmonary Function Tests (PFT) — Spirometry',
        equipment: ['Spirometer', 'Mouthpieces', 'Filters', 'Nose clips', 'Sample PFT reports']
      },
      {
        name: 'Chest X-Ray, Asthma & COPD Management',
        equipment: [
          'Chest X-Ray films & view box/digital setup',
          'Metered-Dose Inhaler (MDI) with Spacer',
          'Dry Powder Inhalers (DPI): Accuhaler, Turbuhaler, Ellipta'
        ]
      },
      {
        name: 'Tension Pneumothorax & Emergency Airway',
        equipment: ['Adult airway mannequin', 'Needle decompression kit/setup']
      },
      {
        name: 'Non-Invasive Ventilation (NIV), Oxygen Therapy & Nebulization',
        equipment: [
          'NIV Devices: BiPAP machine, CPAP machine',
          'Pulse oximeter',
          'Nasal cannula',
          'High-flow nasal cannula (HFNC)',
          'Simple face mask',
          'Venturi face mask',
          'Non-rebreather mask',
          'Rebreather mask',
          'Nebulization mask'
        ]
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
              {/* <div className="detail-item full-width">
                <span className="detail-label"><i className="fas fa-user-tie"></i> Contact Person</span>
                <span className="detail-value">{selected.contact}</span>
              </div> */}
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
                <i className="fas fa-map-signs"></i> Workshop Stations & Equipment
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

            <button className="btn btn-primary" onClick={closeAndRegister}>Register Now</button>
          </div>
        </div>
      )}
    </section>
  )
}