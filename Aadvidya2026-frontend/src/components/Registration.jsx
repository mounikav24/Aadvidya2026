import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { QRCodeSVG } from 'qrcode.react'

// --- PAYMENT CONFIGURATION ---
const UPI_ID = "7981732747-2@axl"; 
const PAYEE_NAME = "VENGALA MOUNIKA";

// --- DATA WITH ID, FEEVALUE, AND TIMESLOT FOR VALIDATION ---
const activeEvents = [
  { id: 'E_SYMPTOMA', feeValue: 199, timeSlot: ['19NOV', '20NOV'], name: 'Symptoma', sub: 'Case Presentation', fee: '₹199' },
  { id: 'E_HEPHAESTUS', feeValue: 199, timeSlot: ['19NOV', '20NOV'], name: 'Hephaestus', sub: '3D Model Making', fee: '₹199' },
  { id: 'E_EUREKA', feeValue: 0, timeSlot: '19NOV', name: 'Eureka', sub: 'Quiz', fee: 'FREE' },
  { id: 'E_GRAPHE', feeValue: 199, timeSlot: ['19NOV', '20NOV'], name: 'Graphe', sub: 'Poster Presentation', fee: '₹199' }
]

const passiveEvents = [
  { id: 'E_PULSE_X', feeValue: 0, timeSlot: '19NOV', name: 'Pulse X', sub: 'Med Hunt', fee: 'FREE' },
  { id: 'E_HADES', feeValue: 0, timeSlot: '19NOV', name: 'Hades Differential', sub: 'Hang or Diagnose', fee: 'FREE' },
  { id: 'E_MORTEM', feeValue: 0, timeSlot: '19NOV', name: 'Mortem Mysteria', sub: 'Crime Scene Investigation', fee: 'FREE' },
  { id: 'E_DERMAL', feeValue: 0, timeSlot: '20NOV', name: 'Dermal Duality', sub: 'Face Painting', fee: 'FREE' },
  { id: 'E_PSYCH_ESCAPE', feeValue: 100, timeSlot: ['19NOV', '20NOV'], name: 'Psychiatric Escape Room', sub: 'Mind Games', fee: '₹100' },
  { id: 'E_PATHO', feeValue: 0, timeSlot: '19NOV', name: 'Pathognomon', sub: 'Path Mystery Box', fee: 'FREE' },
  { id: 'E_TABOO', feeValue: 0, timeSlot: '20NOV', name: 'Medical Taboo', sub: 'Word Game', fee: 'FREE' },
  { id: 'E_JAM', feeValue: 0, timeSlot: '19NOV', name: 'Just a Minute', sub: 'Arrheton', fee: 'FREE' },
  { id: 'E_SPELL', feeValue: 0, timeSlot: '20NOV', name: 'Spell Bee', sub: 'Gelorthography', fee: 'FREE' },
  { id: 'E_WORD', feeValue: 0, timeSlot: '19NOV', name: 'Word Scramble', sub: 'Lexis', fee: 'FREE' },
  { id: 'E_CROSS', feeValue: 0, timeSlot: '19NOV', name: 'Med Crossword', sub: 'Syndesis', fee: 'FREE' },
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

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxUEOaJ2GKNIzWHw-xuelJPU71PvjK1adtEcXrK8AJYqH2eZB8B_LTzDyiN_PK9G3Jf/exec";

const formatDate = (timeSlot) => {
  if (Array.isArray(timeSlot)) {
    return timeSlot.map(ts => ts === '19NOV' ? '19th Nov' : '20th Nov').join(' & ');
  }
  return timeSlot === '19NOV' ? '19th Nov' : '20th Nov';
};

export default function Registration() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [generatedRegId, setGeneratedRegId] = useState('')
  
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', bloodGroup: '', collegeName: '', batch: '', foodPreference: 'VEG',
    utrNumber: '', screenshotFile: null
  })

  const [selectedItems, setSelectedItems] = useState({
    activeEvents: [],
    passiveEvents: [],
    workshops: []
  })

  // --- NEW: Check if ANY workshop is selected on 20th Nov ---
  const hasWorkshopOn20th = () => {
    return selectedItems.workshops.some(w => 
      Array.isArray(w.timeSlot) ? w.timeSlot.includes('20NOV') : w.timeSlot === '20NOV'
    );
  };

  // --- SMART VALIDATION LOGIC ---
  const getSelectedPaidEventDays = () => {
    const days = new Set();
    selectedItems.activeEvents.forEach(e => {
      if (e.feeValue > 0) {
        (Array.isArray(e.timeSlot) ? e.timeSlot : [e.timeSlot]).forEach(d => days.add(d));
      }
    });
    selectedItems.passiveEvents.forEach(e => {
      if (e.feeValue > 0) {
        (Array.isArray(e.timeSlot) ? e.timeSlot : [e.timeSlot]).forEach(d => days.add(d));
      }
    });
    return days;
  };

  const getWorkshopCountForDay = (timeSlot) => {
    return selectedItems.workshops.filter(w => w.timeSlot === timeSlot).length;
  };

  const calculateSubtotal = () => {
    let subtotal = 899;
    selectedItems.activeEvents.forEach(e => subtotal += e.feeValue);
    selectedItems.passiveEvents.forEach(e => subtotal += e.feeValue);
    selectedItems.workshops.forEach(w => subtotal += w.feeValue);
    return subtotal;
  }

  const calculateTax = () => Math.round(calculateSubtotal() * 0.02 * 100) / 100;
  const calculateTotal = () => Math.round((calculateSubtotal() + calculateTax()) * 100) / 100;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, screenshotFile: e.target.files[0] })
    }
  }

  const handleActiveEventToggle = (event) => {
    const isSelected = selectedItems.activeEvents.some(e => e.id === event.id);
    if (isSelected) {
      setSelectedItems(prev => ({
        ...prev,
        activeEvents: prev.activeEvents.filter(e => e.id !== event.id)
      }));
    } else {
      // NEW: Block ALL active events if a 20th workshop is selected
      if (hasWorkshopOn20th()) {
        toast.error("You have selected a workshop on 20th Nov. All Active Events are disabled.");
        return;
      }

      // Free events can be selected unlimited times
      if (event.feeValue > 0) {
        const eventDays = Array.isArray(event.timeSlot) ? event.timeSlot : [event.timeSlot];
        const selectedDays = getSelectedPaidEventDays();
        const conflictingDays = eventDays.filter(day => selectedDays.has(day));

        if (conflictingDays.length > 0) {
          const dayNames = conflictingDays.map(d => formatDate(d)).join(' and ');
          toast.error(`You already have a paid event on ${dayNames}. You can only select 1 paid event per day.`);
          return;
        }
      }
      setSelectedItems(prev => ({
        ...prev,
        activeEvents: [...prev.activeEvents, event]
      }));
    }
  }

  const handlePassiveEventToggle = (event) => {
    const isSelected = selectedItems.passiveEvents.some(e => e.id === event.id);
    if (isSelected) {
      setSelectedItems(prev => ({
        ...prev,
        passiveEvents: prev.passiveEvents.filter(e => e.id !== event.id)
      }));
    } else {
      // Check if workshop on 20th blocks this specific passive event
      const eventDays = Array.isArray(event.timeSlot) ? event.timeSlot : [event.timeSlot];
      if (eventDays.includes('20NOV') && hasWorkshopOn20th()) {
        toast.error("You have selected a workshop on 20th Nov. Events on 20th Nov are not available.");
        return;
      }

      if (event.feeValue > 0) {
        const selectedDays = getSelectedPaidEventDays();
        const conflictingDays = eventDays.filter(day => selectedDays.has(day));

        if (conflictingDays.length > 0) {
          const dayNames = conflictingDays.map(d => formatDate(d)).join(' and ');
          toast.error(`You already have a paid event on ${dayNames}. You can only select 1 paid event per day.`);
          return;
        }
      }
      setSelectedItems(prev => ({
        ...prev,
        passiveEvents: [...prev.passiveEvents, event]
      }));
    }
  }

  const handleWorkshopToggle = (workshop) => {
    const isSelected = selectedItems.workshops.some(w => w.id === workshop.id);
    if (isSelected) {
      setSelectedItems(prev => ({
        ...prev,
        workshops: prev.workshops.filter(w => w.id !== workshop.id)
      }));
    } else {
      if (getWorkshopCountForDay(workshop.timeSlot) >= 1) {
        toast.error(`You can only select 1 workshop per day. You already have one on ${formatDate(workshop.timeSlot)}.`);
        return;
      }

      // NEW: If selecting a 20th workshop, auto-remove any selected Active Events to prevent invalid state
      const is20thWorkshop = Array.isArray(workshop.timeSlot) ? workshop.timeSlot.includes('20NOV') : workshop.timeSlot === '20NOV';
      if (is20thWorkshop && selectedItems.activeEvents.length > 0) {
        toast.error("Selecting a 20th Nov workshop disables all Active Events. Your selected Active Event has been removed.");
        setSelectedItems(prev => ({
          ...prev,
          activeEvents: [], // Auto-deselect active events
          workshops: [...prev.workshops, workshop]
        }));
        return;
      }

      setSelectedItems(prev => ({
        ...prev,
        workshops: [...prev.workshops, workshop]
      }));
    }
  }

  const validateStep1 = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.bloodGroup || !formData.collegeName || !formData.batch) {
      toast.error("Please fill in all personal details, including your Batch.");
      return false;
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return false;
    }
    return true;
  }

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2) setStep(3);
    else if (step === 3) setStep(4);
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  }

  const handleSubmitRegistration = () => {
    if (!formData.utrNumber.trim()) {
      toast.error("Please enter your UTR / Transaction ID.");
      return;
    }
    if (!formData.screenshotFile) {
      toast.error("Please upload your payment screenshot.");
      return;
    }

    setIsProcessing(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;

      const itemsList = [
        ...selectedItems.activeEvents.map(e => `${e.name} (Active)`),
        ...selectedItems.passiveEvents.map(e => `${e.name} (Passive)`),
        ...selectedItems.workshops.map(w => w.name)
      ].join(', ') || "Base Registration Only";

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        bloodGroup: formData.bloodGroup,
        college: formData.collegeName,
        batch: formData.batch,
        foodPreference: formData.foodPreference,
        selectedItems: itemsList,
        subtotal: calculateSubtotal(),
        taxRate: 2,
        taxAmount: calculateTax(),
        totalAmount: calculateTotal(),
        utrNumber: formData.utrNumber,
        screenshotBase64: base64String,
        screenshotName: formData.screenshotFile.name
      };

      fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setGeneratedRegId(data.registrationId);
          setStep(5);
          toast.success("Registration submitted successfully!");
        } else {
          toast.error("Submission failed. Please try again.");
          setIsProcessing(false);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        toast.error("Network error. Please check your connection.");
        setIsProcessing(false);
      });
    };
    reader.readAsDataURL(formData.screenshotFile);
  }

  const resetForm = () => {
    setStep(1);
    setIsProcessing(false);
    setGeneratedRegId('');
    setFormData({ name: '', email: '', phone: '', bloodGroup: '', collegeName: '', batch: '', foodPreference: 'VEG', utrNumber: '', screenshotFile: null });
    setSelectedItems({ activeEvents: [], passiveEvents: [], workshops: [] });
    setIsModalOpen(false);
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
                  <div className="form-group">
                    <label>Batch (Year of Study/Graduation) *</label>
                    <select name="batch" value={formData.batch} onChange={handleInputChange}>
                      <option value="">Select Batch</option>
                      {['2020', '2021', '2022', '2023', '2024', '2025', '2026'].map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group full-width">
                    <label>Food Preference: On 19th Nov, only Vegetarian food will be provided. Please select your preferred option for 20th Nov.*</label>
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
                  <i className="fas fa-info-circle"></i> Rule: Max 1 paid event + 1 workshop per day. Free events are unlimited.
                </p>
                
                {/* 1. WORKSHOPS */}
                <div className="reg-selection-block">
                  <h4><i className="fas fa-tools"></i> Workshops (Max 1 per day)</h4>
                  <div className="reg-options-grid">
                    {workshops.map(w => {
                      const isSelected = selectedItems.workshops.some(sel => sel.id === w.id);
                      const isDisabled = !isSelected && getWorkshopCountForDay(w.timeSlot) >= 1;
                      return (
                        <div key={w.id} className={`reg-option-card ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`} onClick={() => !isDisabled && handleWorkshopToggle(w)}>
                          <span className="reg-option-name">{w.name}</span>
                          <span style={{ fontSize: '0.7rem', color: '#a0a0c0', marginTop: '2px' }}>{formatDate(w.timeSlot)}</span>
                          <span className="reg-option-fee">₹{w.feeValue}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* 2. ACTIVE EVENTS */}
                <div className="reg-selection-block">
                  <h4><i className="fas fa-trophy"></i> Active Events</h4>
                  <div className="reg-options-grid">
                    {activeEvents.map(event => {
                      const isSelected = selectedItems.activeEvents.some(e => e.id === event.id);
                      const eventDays = Array.isArray(event.timeSlot) ? event.timeSlot : [event.timeSlot];
                      
                      // NEW: Disable ALL active events (19th and 20th) if a 20th workshop is selected
                      const isDisabled = !isSelected && (
                        hasWorkshopOn20th() || 
                        (event.feeValue > 0 && (() => {
                          const selectedDays = getSelectedPaidEventDays();
                          return eventDays.some(day => selectedDays.has(day));
                        })())
                      );
                      
                      return (
                        <div key={event.id} className={`reg-option-card ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`} onClick={() => !isDisabled && handleActiveEventToggle(event)}>
                          <span className="reg-option-name">{event.name}</span>
                          <span style={{ fontSize: '0.7rem', color: '#a0a0c0', marginTop: '2px' }}>{formatDate(event.timeSlot)}</span>
                          <span className="reg-option-fee">{event.feeValue === 0 ? 'FREE' : `₹${event.feeValue}`}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* 3. PASSIVE EVENTS */}
                <div className="reg-selection-block">
                  <h4><i className="fas fa-star"></i> Passive Events</h4>
                  <div className="reg-options-grid">
                    {passiveEvents.map(event => {
                      const isSelected = selectedItems.passiveEvents.some(e => e.id === event.id);
                      const eventDays = Array.isArray(event.timeSlot) ? event.timeSlot : [event.timeSlot];
                      const isOn20th = eventDays.includes('20NOV');
                      
                      // Only 20th passive events are disabled by a 20th workshop
                      const isDisabled = !isSelected && (
                        (isOn20th && hasWorkshopOn20th()) || 
                        (event.feeValue > 0 && (() => {
                          const selectedDays = getSelectedPaidEventDays();
                          return eventDays.some(day => selectedDays.has(day));
                        })())
                      );

                      return (
                        <div key={event.id} className={`reg-option-card ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`} onClick={() => !isDisabled && handlePassiveEventToggle(event)}>
                          <span className="reg-option-name">{event.name}</span>
                          <span style={{ fontSize: '0.7rem', color: '#a0a0c0', marginTop: '2px' }}>{formatDate(event.timeSlot)}</span>
                          <span className="reg-option-fee">{event.feeValue === 0 ? 'FREE' : `₹${event.feeValue}`}</span>
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
                  <div className="reg-summary-row"><span>Base Fest Registration & Food</span><span>₹899.00</span></div>
                  {selectedItems.activeEvents.map(e => (
                    <div key={e.id} className="reg-summary-row"><span>{e.name} (Active)</span><span>₹{e.feeValue}.00</span></div>
                  ))}
                  {selectedItems.passiveEvents.map(e => (
                    <div key={e.id} className="reg-summary-row"><span>{e.name} (Passive)</span><span>₹{e.feeValue}.00</span></div>
                  ))}
                  {selectedItems.workshops.map(w => (
                    <div key={w.id} className="reg-summary-row"><span>{w.name}</span><span>₹{w.feeValue}.00</span></div>
                  ))}
                  <div className="reg-summary-row" style={{borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '0.5rem', paddingTop: '0.5rem'}}>
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