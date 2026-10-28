import React from 'react'
import GallerySlideshow from './GallerySlideshow'

// Images for Aadvidya
const aadvidyaImages = [
  // { src: '/Aadvidya-Images/TAR00910.JPG' },
  { src: '/Aadvidya-Images/TAR00921.JPG' },
  { src: '/Aadvidya-Images/TAR00990.JPG' },
  { src: '/Aadvidya-Images/TAR01035.JPG' },
  { src: '/Aadvidya-Images/TAR01256.JPG' },
  { src: '/Aadvidya-Images/TAR01258.JPG' },
  { src: '/Aadvidya-Images/TAR01259.JPG' },
  { src: '/Aadvidya-Images/TAR01261.JPG' },
  { src: '/Aadvidya-Images/TAR01268.JPG' },
  { src: '/Aadvidya-Images/TAR01270.JPG' },
  { src: '/Aadvidya-Images/TAR01790.JPG' },
  { src: '/Aadvidya-Images/TAR01853.JPG' }
]

// Images for Aadvidya MUN
const aadvidyaMUNImages = [ 
  { src: '/MUN-Images/1.JPG' },
  { src: '/MUN-Images/2.JPG' },
  { src: '/MUN-Images/3.JPG' },
  { src: '/MUN-Images/4.JPG' },
  { src: '/MUN-Images/5.JPG' },
  { src: '/MUN-Images/6.JPG' },
  { src: '/MUN-Images/7.JPG' },
  { src: '/MUN-Images/8.JPG' },
]

// Images & Videos for MNR College 
const collegeImages = [
  { src: '/MNR-Images/1624.jpeg' },
  { src: '/MNR-Images/210.mp4', isVideo: true },
  { src: '/MNR-Images/226.mp4', isVideo: true },
  { src: '/MNR-Images/136.JPG' },
  { src: '/MNR-Images/143.png' },
  { src: '/MNR-Images/227.JPG' },
  { src: '/MNR-Images/9383.png' }, 
  { src: '/MNR-Images/9392.png' }, 
]

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="section-container">
        
        {/* AADVIDYA 2026 BOX */}
        <div className="about-box">
          <div className="about-box-header">
            <img 
              src="/Aadvidya logo.png" 
              alt="Aadvidya Logo" 
              style={{ height: '45px', width: 'auto', marginRight: '12px', objectFit: 'contain' }} 
            />
            <h3>AADVIDYA 2026</h3>
          </div>
          <p>Aadvidya, the academic medical fest of MNR Medical College, is a vibrant two-day affair that brings together medical students from across Telangana to celebrate knowledge, innovation, skill, and creativity.</p>
          <p>The fest features a diverse range of active events, including case presentations, poster presentations, and other academic competitions that nurture research aptitude, critical thinking, and a spirit of healthy competition. Complementing these are passive events that blend fun with learning, making medical education engaging, interactive, and accessible.</p>
          <p>Workshops conducted across various departments provide students with invaluable opportunities to acquire essential clinical and practical skills under the guidance of experienced professionals. In a landmark achievement, Aadvidya hosted the first-of-its-kind Model United Nations at a medical college in Telangana.</p>
          <p className="about-quote">"Making medical education more interactive, inclusive, and enjoyable."</p>
          <GallerySlideshow images={aadvidyaImages} interval={3000} showCaptions={false} />
        </div>

        {/* AADVIDYA MUN'26 BOX */}
        <div className="about-box">
          <div className="about-box-header">
            <img 
              src="/Aadvidya logo.png" 
              alt="Aadvidya Logo" 
              style={{ height: '45px', width: 'auto', marginRight: '12px', objectFit: 'contain' }} 
            />
            <h3>AadvidyaMUN'26</h3>
          </div>
          <p>Everyone has an opinion on the world. What if you had a seat at the table, a country to represent, and a voice to speak on the world's biggest issues in a room where questions are encouraged, stances are challenged, and solutions are built together?</p>
          <p style={{ fontWeight: '600', color: '#ffd700' }}>We are extremely excited to announce the 2nd Edition of Aadvidya MUN.</p>
          <p>Model United Nations (MUN) is an engaging simulation of the United Nations where registered participants take on the roles of delegates representing different countries to discuss and debate upon pressing global issues from their country's viewpoints and negotiate solutions through diplomacy and collaboration.</p>
          <p>From researching an issue and presenting a country's position to negotiating with fellow delegates and drafting resolutions, participants experience how diplomacy works in practice. MUN challenges delegates to think beyond their own perspectives, defend their positions with reason, navigate disagreements, and turn ideas into proposals for collective action.</p>
          
          {/* Contact Section */}
          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(240, 165, 0, 0.3)' }}>
            <h4 style={{ color: '#ffd700', marginBottom: '1rem', textAlign: 'center', fontSize: '1.2rem', fontFamily: "'Cinzel', serif" }}>
              <i className="fas fa-headset" style={{ marginRight: '8px' }}></i>
              Contact Coordinators
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#c8c8e0' }}>
                <i className="fas fa-phone" style={{ color: '#f0a500' }}></i>
                <span>Nitish: <a href="tel:9010300075" style={{ color: '#ffd700', textDecoration: 'none', fontWeight: '600' }}>9010300075</a></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#c8c8e0' }}>
                <i className="fas fa-phone" style={{ color: '#f0a500' }}></i>
                <span>Shalini: <a href="tel:6300020324" style={{ color: '#ffd700', textDecoration: 'none', fontWeight: '600' }}>6300020324</a></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#c8c8e0' }}>
                <i className="fas fa-phone" style={{ color: '#f0a500' }}></i>
                <span>Sanjeeti: <a href="tel:9849803759" style={{ color: '#ffd700', textDecoration: 'none', fontWeight: '600' }}>9849803759</a></span>
              </div>
            </div>
            <GallerySlideshow images={aadvidyaMUNImages} interval={3000} showCaptions={false} />
          </div>
        </div>

        {/* MNR COLLEGE BOX */}
        <div className="about-box">
          <div className="about-box-header">
            <img 
              src="/mnr-logo.png" 
              alt="MNR Logo" 
              style={{ height: '45px', width: 'auto', marginRight: '12px', objectFit: 'contain' }} 
            />
            <h3>MNR Medical College</h3>
          </div>
          <p>Established in 2001 in Sangareddy, Telangana, MNR Medical College & Hospital has grown into one of the region’s leading institutions, nurturing over 5,000 students in Medicine and Health Sciences. Affiliated with KNR University of Health Sciences, recognized by the National Medical Commission (NMC), and accredited by NAAC with an “A” grade, MNR stands for excellence in medical education and compassionate healthcare.</p>
          <p>Our modern campus features lecture halls, labs, libraries, a 1400-seat auditorium, and a 1031-bed multispecialty hospital offering 24/7 emergency care. With advanced facilities like simulation labs, Central Clinical Laboratory, Radiology Center, Neonatal ICUs, and ultramodern Modular Operation Theatres, we deliver world-class training and patient care.</p>
          <p>As we celebrate 25 years of excellence, MNR reaffirms its commitment to shaping skilled, ethical, and compassionate healthcare professionals.</p>

          <div className="highlight-line small" style={{ textAlign: 'center' }} role="note">
            <span>25 Years of Knowledge. 25 Years of Service. A Future Dedicated to Healing.</span>
          </div>

          <GallerySlideshow images={collegeImages} interval={3000} showCaptions={false} />
        </div>

      </div>
    </section>
  )
}