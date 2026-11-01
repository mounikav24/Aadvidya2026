import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { QRCodeSVG } from 'qrcode.react' // <-- ADDED DYNAMIC QR CODE IMPORT

// --- PAYMENT CONFIGURATION ---
// TODO: Replace with your ACTUAL UPI ID (e.g., "team.aadvidya2026@okicici" or "yourname@upi")
const UPI_ID = "8309915874@upi"; 
const PAYEE_NAME = "BODAPATLA VIJAY KANTH";

// --- DATA WITH ID, FEEVALUE, AND TIMESLOT FOR VALIDATION ---
const activeEvents = [
  { id: 'E_SYMPTOMA', feeValue: 199, timeSlot: '19NOV', name: 'Symptoma', sub: 'Case Presentation', fee: '₹199' },
  { id: 'E_HEPHAESTUS', feeValue: 199, timeSlot: '20NOV', name: 'Hephaestus', sub: '3D Model Making', fee: '₹199' },
  { id: 'E_EUREKA', feeValue: 0, timeSlot: '19NOV', name: 'Eureka', sub: 'Quiz', fee: 'FREE' },
  { id: 'E_GRAPHE', feeValue: 199, timeSlot: '20NOV', name: 'Graphe', sub: 'Poster Presentation', fee: '₹199' }
]

const passiveEvents = [
  { id: 'E_PULSE_X', feeValue: 0, timeSlot: '19NOV', name: 'Pulse X', sub: 'Med Hunt', fee: 'FREE' },
  { id: 'E_HADES', feeValue: 0, timeSlot: '19NOV', name: 'Hades Differential', sub: 'Hang or Diagnose', fee: 'FREE' },
  { id: 'E_MORTEM', feeValue: 0, timeSlot: '19NOV', name: 'Mortem Mysteria', sub: 'Crime Scene Investigation', fee: 'FREE' },
  { id: 'E_DERMAL', feeValue: 0, timeSlot: '20NOV', name: 'Dermal Duality', sub: 'Face Painting', fee: 'FREE' },
  { id: 'E_PSYCH_ESCAPE', feeValue: 100, timeSlot: '20NOV', name: 'Psychiatric Escape Room', sub: 'Mind Games', fee: '₹100' },
  { id: 'E_PATHO', feeValue: 0, timeSlot: '19NOV', name: 'Pathognomon', sub: 'Path Mystery Box', fee: 'FREE' },
  { id: 'E_TABOO', feeValue: 0, timeSlot: '20NOV', name: 'Medical Taboo', sub: 'Word Game', fee: 'FREE' },
  { id: 'E_JAM', feeValue: 0, timeSlot: '19NOV', name: 'Just a Minute', sub: 'Arrheton', fee: 'FREE' },
  { id: 'E_SPELL', feeValue: 0, timeSlot: '20NOV', name: 'Spell Bee', sub: 'Gelorthography', fee: 'FREE' },
  { id: 'E_WORD', feeValue: 0, timeSlot: '20NOV', name: 'Word Scramble', sub: 'Lexis', fee: 'FREE' },
  { id: 'E_CROSS', feeValue: 0, timeSlot: '20NOV', name: 'Med Crossword', sub: 'Syndesis', fee: 'FREE' },
  { id: 'E_DUMB', feeValue: 0, timeSlot: '20NOV', name: 'Med Dumbcharades', sub: 'Mimesis', fee: 'FREE' },
  { id: 'E_WRONG', feeValue: 0, timeSlot: '19NOV', name: 'Wrong Answers Only', sub: 'Creative Chaos', fee: 'FREE' }
]

const workshops = [
  { id: 'W_BLS', feeValue: 899, timeSlot: '19NOV', name: 'BLS (KAIROS)', fee: '₹899' },
  { id: 'W_BSS', feeValue: 1099, timeSlot: '19NOV', name: 'BSS (PRAXIS)', fee: '₹1,099' },
  { id: 'W_EMERGENCY', feeValue: 999, timeSlot: '20NOV', name: 'Emergency & Trauma Care', fee: '₹999' },
  { id: 'W_OBGY', feeValue: 799, timeSlot: '20NOV', name: 'OBGY (VITA IN TRANSITU)', fee: '₹799' },
  { id: 'W_PEDIA', feeValue: 699, timeSlot: '19NOV', name: 'Pediatrics (NEONOVA 360°)', fee: '₹699' },
  { id: 'W_OPHTHAL', feeValue: 599, timeSlot: '19NOV', name: 'Ophthalmology (ORASIS)', fee: '₹599' },
  { id: 'W_ORTHO', feeValue: 699, timeSlot: '20NOV', name: 'Orthopaedics (OSTEON)', fee: '₹699' },
  { id: 'W_PULMO', feeValue: 599, timeSlot: '20NOV', name: 'Pulmonology (AERION)', fee: '₹599' }
]

// TODO: PASTE YOUR DEPLOYED GOOGLE APPS SCRIPT WEB APP URL HERE
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyz3LkxYf6sNoWRxQDKM1Bvkskxt8ubjqUUG5k3zv4zkuzVwA6uzWFBHp4QCwreBKD3kQ/exec";

export default function Registration() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [generatedRegId, setGeneratedRegId] = useState('')
  
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', bloodGroup: '', collegeName: '', foodPreference: 'VEG',
    utrNumber: '', screenshotFile: null
  })

  const [selectedItems, setSelectedItems] = useState({
    activeEvent: null,
    passiveEvents: [],
    workshops: []
  })

  // Helper to check if a timeSlot is already taken by ANY selected item (Enforces 1 per day rule)
  const isTimeSlotTaken = (timeSlot) => {
    if (!timeSlot) return false
    if (selectedItems.activeEvent && selectedItems.activeEvent.timeSlot === timeSlot) return true
    if (selectedItems.passiveEvents.some(e => e.timeSlot === timeSlot)) return true
    if (selectedItems.workshops.some(w => w.timeSlot === timeSlot)) return true
    return false
  }

  // Calculate subtotal before tax (base registration + selected activities)
  const calculateSubtotal = () => {
    let subtotal = 899 // Base fest & food fee
    if (selectedItems.activeEvent) subtotal += selectedItems.activeEvent.feeValue
    selectedItems.passiveEvents.forEach(e => subtotal += e.feeValue)
    selectedItems.workshops.forEach(w => subtotal += w.feeValue)
    return subtotal
  }

  // Apply 2% tax to the complete subtotal and round to 2 decimal places
  const calculateTax = () => {
    return Math.round(calculateSubtotal() * 0.02 * 100) / 100
  }

  // Final amount payable, including tax
  const calculateTotal = () => {
    return Math.round((calculateSubtotal() + calculateTax()) * 100) / 100
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, screenshotFile: e.target.files[0] })
    }
  }

  const handleActiveEventSelect = (event) => {
    if (isTimeSlotTaken(event.timeSlot)) {
      toast.error(`You already have an activity scheduled for this day (${event.timeSlot}). You can only choose 1 activity per day.`)
      return
    }
    setSelectedItems({ ...selectedItems, activeEvent: event })
  }

  const handlePassiveEventToggle = (event) => {
    const isSelected = selectedItems.passiveEvents.some(e => e.id === event.id)
    if (isSelected) {
      setSelectedItems({ ...selectedItems, passiveEvents: selectedItems.passiveEvents.filter(e => e.id !== event.id) })
    } else {
      if (isTimeSlotTaken(event.timeSlot)) {
        toast.error(`You already have an activity scheduled for this day (${event.timeSlot}). You can only choose 1 activity per day.`)
        return
      }
      setSelectedItems({ ...selectedItems, passiveEvents: [...selectedItems.passiveEvents, event] })
    }
  }

  const handleWorkshopToggle = (workshop) => {
    const isSelected = selectedItems.workshops.some(w => w.id === workshop.id)
    if (isSelected) {
      setSelectedItems({ ...selectedItems, workshops: selectedItems.workshops.filter(w => w.id !== workshop.id) })
    } else {
      if (isTimeSlotTaken(workshop.timeSlot)) {
        toast.error(`You already have an activity scheduled for this day (${workshop.timeSlot}). You can only choose 1 activity per day.`)
        return
      }
      setSelectedItems({ ...selectedItems, workshops: [...selectedItems.workshops, workshop] })
    }
  }

  const validateStep1 = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.bloodGroup || !formData.collegeName) {
      toast.error("Please fill in all personal details.")
      return false
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number.")
      return false
    }
    return true
  }

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2)
    else if (step === 2) setStep(3) // REMOVED mandatory active event validation
    else if (step === 3) setStep(4)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  // --- GOOGLE APPS SCRIPT INTEGRATION ---
  const handleSubmitRegistration = () => {
    if (!formData.utrNumber.trim()) {
      toast.error("Please enter your UTR / Transaction ID.")
      return
    }
    if (!formData.screenshotFile) {
      toast.error("Please upload your payment screenshot.")
      return
    }

    setIsProcessing(true)

    // Convert image to Base64
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result

      // Format selected items for the sheet/email
      const itemsList = [
        selectedItems.activeEvent ? `${selectedItems.activeEvent.name} (Active)` : null,
        ...selectedItems.passiveEvents.map(e => `${e.name} (Passive)`),
        ...selectedItems.workshops.map(w => w.name)
      ].filter(Boolean).join(', ')

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        bloodGroup: formData.bloodGroup,
        college: formData.collegeName,
        foodPreference: formData.foodPreference,
        selectedItems: itemsList || "Base Registration Only",
        subtotal: calculateSubtotal(),
        taxRate: 2,
        taxAmount: calculateTax(),
        totalAmount: calculateTotal(), // Final amount including 2% tax
        utrNumber: formData.utrNumber,
        screenshotBase64: base64String,
        screenshotName: formData.screenshotFile.name
      }

      // Send to Google Apps Script
      fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setGeneratedRegId(data.registrationId)
          setStep(5) // Move to Success Screen
          toast.success("Registration submitted successfully!")
        } else {
          toast.error("Submission failed. Please try again.")
          setIsProcessing(false)
        }
      })
      .catch(error => {
        console.error('Error:', error)
        toast.error("Network error. Please check your connection.")
        setIsProcessing(false)
      })
    }
    reader.readAsDataURL(formData.screenshotFile)
  }

  const resetForm = () => {
    setStep(1)
    setIsProcessing(false)
    setGeneratedRegId('')
    setFormData({ name: '', email: '', phone: '', bloodGroup: '', collegeName: '', foodPreference: 'VEG', utrNumber: '', screenshotFile: null })
    setSelectedItems({ activeEvent: null, passiveEvents: [], workshops: [] })
    setIsModalOpen(false)
  }

  return (
    <section id="register" className="registration-section">
      <Toaster position="top-center" toastOptions={{
        style: { background: '#1a1a3e', color: '#fff', border: '1px solid #f0a500' }
      }} />
      
      <div className="section-container">
        <div className="registration-card">
          <i className="fas fa-ticket-alt registration-icon"></i>
          <h3>Secure Your Spot at <span style={{color: '#ffd700'}}>AADVIDYA '26</span></h3>
          <p>Register now for the ultimate medical fest experience. <br />
          <strong>Base Registration & Food: ₹899</strong></p>
          
          <div className="registration-buttons" style={{marginTop: '2rem'}}>
            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
              <i className="fas fa-user-plus"></i> Register Now
            </button>
            <a href="#events" className="btn btn-secondary">
              <i className="fas fa-calendar-alt"></i> View Events
            </a>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="flash-card-modal" onClick={() => !isProcessing && setIsModalOpen(false)}>
          <div className="flash-card-content reg-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="flash-close" onClick={() => !isProcessing && setIsModalOpen(false)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Progress Indicator */}
            <div className="reg-progress-bar">
              {[1, 2, 3, 4].map((num, idx) => (
                <React.Fragment key={num}>
                  <div className={`reg-step-dot ${step >= num ? 'active' : ''}`}>{num}</div>
                  {idx < 3 && <div className={`reg-step-line ${step > num ? 'active' : ''}`}></div>}
                </React.Fragment>
              ))}
            </div>

            {/* STEP 1: Personal Details */}
            {step === 1 && (
              <div className="reg-step">
                <h3 className="reg-step-title">Personal Details</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="john@college.edu" />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="10-digit number" maxLength="10" />
                  </div>
                  <div className="form-group">
                    <label>Blood Group *</label>
                    <select name="bloodGroup" value={formData.bloodGroup} onChange={handleInputChange}>
                      <option value="">Select Blood Group</option>
                      {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                    </select>
                  </div>
                  <div className="form-group full-width">
                    <label>College / Institution Name *</label>
                    <input type="text" name="collegeName" value={formData.collegeName} onChange={handleInputChange} placeholder="MNR Medical College" />
                  </div>
                  
                  <div className="form-group full-width">
                    <label>Food Preference *</label>
                    <div className="food-toggle">
                      <button type="button" className={formData.foodPreference === 'VEG' ? 'active' : ''} onClick={() => setFormData({...formData, foodPreference: 'VEG'})}>
                        <i className="fas fa-leaf"></i> Vegetarian (Both Days)
                      </button>
                      <button type="button" className={formData.foodPreference === 'NON_VEG' ? 'active' : ''} onClick={() => setFormData({...formData, foodPreference: 'NON_VEG'})}>
                        <i className="fas fa-drumstick-bite"></i> Non-Vegetarian (20th Nov Only)
                      </button>
                    </div>
                  </div>
                </div>
                <button className="btn btn-primary reg-next-btn" onClick={handleNext}>Next: Select Activities <i className="fas fa-arrow-right"></i></button>
              </div>
            )}

            {/* STEP 2: Event & Workshop Selection */}
            {step === 2 && (
              <div className="reg-step">
                <h3 className="reg-step-title">Select Events & Workshops</h3>
                <p style={{textAlign: 'center', color: '#f0a500', fontSize: '0.9rem', marginBottom: '1.5rem'}}>
                  <i className="fas fa-info-circle"></i> Rule: You can only select a maximum of 1 activity per day (across all categories).
                </p>
                
                <div className="reg-selection-block">
                  <h4><i className="fas fa-trophy"></i> Active Events (Subject to daily limit)</h4>
                  <div className="reg-options-grid">
                    {activeEvents.map(event => {
                      const isSelected = selectedItems.activeEvent?.id === event.id
                      const isDisabled = !isSelected && isTimeSlotTaken(event.timeSlot)
                      return (
                        <div key={event.id} className={`reg-option-card ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`} onClick={() => !isDisabled && handleActiveEventSelect(event)}>
                          <span className="reg-option-name">{event.name}</span>
                          <span className="reg-option-fee">{event.feeValue === 0 ? 'FREE' : `₹${event.feeValue}`}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="reg-selection-block">
                  <h4><i className="fas fa-star"></i> Passive Events (Subject to daily limit)</h4>
                  <div className="reg-options-grid">
                    {passiveEvents.map(event => {
                      const isSelected = selectedItems.passiveEvents.some(e => e.id === event.id)
                      const isDisabled = !isSelected && isTimeSlotTaken(event.timeSlot)
                      return (
                        <div key={event.id} className={`reg-option-card ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`} onClick={() => !isDisabled && handlePassiveEventToggle(event)}>
                          <span className="reg-option-name">{event.name}</span>
                          <span className="reg-option-fee">{event.feeValue === 0 ? 'FREE' : `₹${event.feeValue}`}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="reg-selection-block">
                  <h4><i className="fas fa-tools"></i> Workshops (Subject to daily limit)</h4>
                  <div className="reg-options-grid">
                    {workshops.map(w => {
                      const isSelected = selectedItems.workshops.some(sel => sel.id === w.id)
                      const isDisabled = !isSelected && isTimeSlotTaken(w.timeSlot)
                      return (
                        <div key={w.id} className={`reg-option-card ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`} onClick={() => !isDisabled && handleWorkshopToggle(w)}>
                          <span className="reg-option-name">{w.name}</span>
                          <span className="reg-option-fee">₹{w.feeValue}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="reg-btn-group">
                  <button className="btn btn-secondary" onClick={handleBack}><i className="fas fa-arrow-left"></i> Back</button>
                  <button className="btn btn-primary" onClick={handleNext}>Review Order <i className="fas fa-arrow-right"></i></button>
                </div>
              </div>
            )}

            {/* STEP 3: Order Summary */}
            {step === 3 && (
              <div className="reg-step">
                <h3 className="reg-step-title">Order Summary</h3>
                <div className="reg-summary-box">
                  <div className="reg-summary-row"><span>Base Fest Registration & Food</span><span>₹899</span></div>
                  {selectedItems.activeEvent && (
                    <div className="reg-summary-row"><span>{selectedItems.activeEvent.name} (Active)</span><span>₹{selectedItems.activeEvent.feeValue}</span></div>
                  )}
                  {selectedItems.passiveEvents.map(e => (
                    <div key={e.id} className="reg-summary-row"><span>{e.name} (Passive)</span><span>₹{e.feeValue}</span></div>
                  ))}
                  {selectedItems.workshops.map(w => (
                    <div key={w.id} className="reg-summary-row"><span>{w.name}</span><span>₹{w.feeValue}</span></div>
                  ))}
                  <div className="reg-summary-row">
                    <span>Subtotal</span><span>₹{calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="reg-summary-row">
                    <span>Platform Fee (2%)</span><span>₹{calculateTax().toFixed(2)}</span>
                  </div>
                  <div className="reg-summary-total">
                    <span>Final Amount Payable</span><span>₹{calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
                <div className="reg-btn-group">
                  <button className="btn btn-secondary" onClick={handleBack} disabled={isProcessing}><i className="fas fa-arrow-left"></i> Back</button>
                  <button className="btn btn-primary" onClick={handleNext}>
                    Proceed to Payment <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Payment Details & Screenshot Upload */}
            {step === 4 && (
              <div className="reg-step">
                <h3 className="reg-step-title">Payment & Verification</h3>
                <div className="payment-details-box">
                  <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    
                    {/* --- DYNAMIC QR CODE START --- */}
                    {(() => {
                      const totalAmount = calculateTotal().toFixed(2);
                      const upiLink = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${totalAmount}&cu=INR&tn=Aadvidya26Reg`;
                      
                      return (
                        <>
                          <QRCodeSVG 
                            value={upiLink} 
                            size={200} 
                            bgColor={"#ffffff"} 
                            fgColor={"#000000"} 
                            level={"H"} 
                            includeMargin={true}
                            style={{ borderRadius: '1rem', border: '2px solid #f0a500', marginBottom: '1rem' }} 
                          />
                          <p style={{ color: '#c8c8e0', fontSize: '0.9rem' }}>
                            Scan to pay <strong style={{color: '#ffd700'}}>₹{totalAmount}</strong> via any UPI App
                          </p>
                        </>
                      );
                    })()}
                    {/* --- DYNAMIC QR CODE END --- */}

                  </div>
                  
                  <div className="bank-details">
                    <div className="bank-row">
                      <span className="bank-label">UPI ID:</span>
                      <span className="bank-value" style={{color: '#ffd700', fontWeight: 'bold'}}>{UPI_ID}</span> 
                    </div>
                    <div className="bank-row">
                      <span className="bank-label">Account Name:</span>
                      <span className="bank-value">{PAYEE_NAME}</span> 
                    </div>
                  </div>

                  <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="form-group full-width" style={{margin: 0}}>
                      <label>UTR / Transaction ID *</label>
                      <input 
                        type="text" 
                        name="utrNumber" 
                        value={formData.utrNumber} 
                        onChange={handleInputChange} 
                        placeholder="Enter 12-digit UTR number" 
                        style={{background: '#0a0a1a', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '0.8rem', borderRadius: '0.5rem', width: '100%'}}
                      />
                    </div>

                    <div className="form-group full-width" style={{margin: 0}}>
                      <label>Upload Payment Screenshot *</label>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleFileChange} 
                        style={{background: '#0a0a1a', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '0.8rem', borderRadius: '0.5rem', width: '100%'}}
                      />
                      {formData.screenshotFile && (
                        <p style={{color: '#22c55e', fontSize: '0.85rem', marginTop: '0.5rem'}}>
                          <i className="fas fa-check-circle"></i> {formData.screenshotFile.name} selected
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="reg-btn-group">
                  <button className="btn btn-secondary" onClick={handleBack} disabled={isProcessing}><i className="fas fa-arrow-left"></i> Back</button>
                  <button className="btn btn-primary" onClick={handleSubmitRegistration} disabled={isProcessing}>
                    {isProcessing ? <><i className="fas fa-spinner fa-spin"></i> Processing...</> : <><i className="fas fa-paper-plane"></i> Submit Registration</>}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: Success Screen */}
            {step === 5 && (
              <div className="reg-step" style={{textAlign: 'center', padding: '2rem 0'}}>
                <div style={{
                  width: '80px', height: '80px', borderRadius: '50%', 
                  background: 'rgba(34, 197, 94, 0.2)', border: '2px solid #22c55e',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1.5rem auto'
                }}>
                  <i className="fas fa-check" style={{color: '#22c55e', fontSize: '2.5rem'}}></i>
                </div>
                <h3 className="reg-step-title" style={{color: '#22c55e', marginBottom: '0.5rem'}}>Registration Successful!</h3>
                <p style={{color: '#c8c8e0', marginBottom: '2rem'}}>
                  Your details have been saved. A confirmation email has been sent to <strong>{formData.email}</strong>.
                </p>
                
                <div style={{
                  background: 'rgba(240, 165, 0, 0.1)', border: '1px solid #f0a500',
                  borderRadius: '1rem', padding: '1.5rem', marginBottom: '2rem'
                }}>
                  <p style={{color: '#c8c8e0', fontSize: '0.9rem', margin: '0 0 0.5rem 0'}}>Your Unique Registration ID:</p>
                  <h2 style={{color: '#ffd700', fontFamily: 'monospace', fontSize: '2rem', margin: 0, letterSpacing: '2px'}}>
                    {generatedRegId}
                  </h2>
                </div>

                <p style={{color: '#c8c8e0', fontSize: '0.9rem', marginBottom: '2rem'}}>
                  Please save this ID. Our team will verify your payment screenshot and send a final confirmation email shortly.
                </p>

                <button className="btn btn-primary" onClick={resetForm} style={{width: '100%'}}>
                  <i className="fas fa-home"></i> Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}