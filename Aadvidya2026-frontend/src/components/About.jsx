import React from 'react'
import GallerySlideshow from './GallerySlideshow'

const aadvidyaImages = [
  { src: 'https://placehold.co/900x500/1a1a1a/e60000?text=Inauguration', caption: 'Inauguration Ceremony' },
  { src: 'https://placehold.co/900x500/1a1a1a/e60000?text=Workshops', caption: 'Hands-on Workshops' },
  { src: 'https://placehold.co/900x500/1a1a1a/e60000?text=Case+Presentation', caption: 'Case Presentations' },
  { src: 'https://placehold.co/900x500/1a1a1a/e60000?text=Cultural+Night', caption: 'Cultural Night' }
]

const collegeImages = [
  { src: 'https://placehold.co/900x500/1a1a1a/e60000?text=Main+Campus', caption: 'Main Campus' },
  { src: 'https://placehold.co/900x500/1a1a1a/e60000?text=Hospital+Building', caption: '1031-Bed Multispecialty Hospital' },
  { src: 'https://placehold.co/900x500/1a1a1a/e60000?text=Simulation+Labs', caption: 'Advanced Simulation Labs' },
  { src: 'https://placehold.co/900x500/1a1a1a/e60000?text=Central+Library', caption: 'Central Library' }
]

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="section-container">
        {/* <h2 className="section-title">About <span className="text-red">Us</span></h2> */}

        {/* AADVIDYA BOX */}
        <div className="about-box">
          <div className="about-box-header">
            <i className="fas fa-calendar-star"></i>
            <h3>AADVIDYA 2026</h3>
          </div>
          <p>Aadvidya, the academic medical fest of MNR Medical College, is a vibrant two-day affair that brings together medical students from across Telangana to celebrate knowledge, innovation, skill, and creativity.</p>
          <p>The fest features a diverse range of active events, including case presentations, poster presentations, and other academic competitions that nurture research aptitude, critical thinking, and a spirit of healthy competition. Complementing these are passive events that blend fun with learning, making medical education engaging, interactive, and accessible.</p>
          <p>Workshops conducted across various departments provide students with invaluable opportunities to acquire essential clinical and practical skills under the guidance of experienced professionals. In a landmark achievement, Aadvidya hosted the first-of-its-kind Model United Nations at a medical college in Telangana.</p>
          <p className="about-quote">"Making medical education more interactive, inclusive, and enjoyable."</p>
          <GallerySlideshow images={aadvidyaImages} />
        </div>

        {/* MNR COLLEGE BOX */}
        <div className="about-box">
          <div className="about-box-header">
            <i className="fas fa-hospital"></i>
            <h3>MNR Medical College</h3>
          </div>
          <p>Established in 2001 in Sangareddy, Telangana, MNR Medical College & Hospital has grown into one of the region’s leading institutions, nurturing over 5,000 students in Medicine and Health Sciences. Affiliated with KNR University of Health Sciences, recognized by the National Medical Commission (NMC), and accredited by NAAC with an “A” grade, MNR stands for excellence in medical education and compassionate healthcare. </p>
          <p>Our modern campus features lecture halls, labs, libraries, a 1400-seat auditorium, and a 1031-bed multispecialty hospital offering 24/7 emergency care. With advanced facilities like simulation labs, Central Clinical Laboratory, Radiology Center, Neonatal ICUs, and ultramodern Modular Operation Theatres, we deliver world-class training and patient care. </p>
          <p>As we celebrate 25 years of excellence, MNR reaffirms its commitment to shaping skilled, ethical, and compassionate healthcare professionals. </p>

          <div className="highlight-line small" align="center" role="note">
            <span>25 Years of Knowledge. 25 Years of Service. A Future Dedicated to Healing.</span>
          </div>

          {/* <div className="vision-mission">
            <div className="vm-card">
              <h4>Our Vision</h4>
              <p>To be a center of excellence in medical education, healthcare, and research. We aim to deliver quality training, foster innovation, and create compassionate, socially responsible professionals recognized globally.</p>
            </div>
            <div className="vm-card">
              <h4>Our Mission</h4>
              <p>To provide a student-focused learning environment that nurtures knowledge, skills, and values. We are committed to shaping ethical, skilled medical professionals through research, leadership, and advanced facilities.</p>
            </div>
          </div> */}
          <GallerySlideshow images={collegeImages} />
        </div>
      </div>
    </section>
  )
}