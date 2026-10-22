import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col">
          <div className="footer-brand">
            <img src="/Aadvidya logo.png" alt="Logo" className="footer-logo" />
            <h4>AADVIDYA 2026</h4>
          </div>
          <p>The official academic medical fest of MNR Medical College & Hospital.</p>
          <p>Celebrating 25 Years of Knowledge & 25 Years of Service.</p>
        </div>

        <div className="footer-col">
          <h5>Quick Links</h5>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/#about">About</Link></li>
            <li><Link to="/#events">Events</Link></li>
            <li><Link to="/milestones">Milestones</Link></li>
            <li><Link to="/feedback">Feedback</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>Contact</h5>
          <ul>
            <li><i className="fas fa-map-marker-alt"></i> MNR Nagar, Fasalwadi Narsapur Road, Sangareddy, Telangana - 502294</li>
            <li><i className="fas fa-envelope"></i> team.aadvidya2026@gmail.com</li>
            <li><i className="fas fa-phone"></i> +91 83099 15874</li>
          </ul>
        </div>

        <div className="footer-col footer-social-col">
          <h5>Follow Us</h5>
          <div className="social-icons">
            <a 
              href="https://www.instagram.com/aadvidya.2026?srtk=cWYzYzdlMHd6dm9x" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} AADVIDYA | MNR Medical College | All Rights Reserved.</p>
      </div>
    </footer>
  )
}