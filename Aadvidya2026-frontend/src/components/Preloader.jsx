import React from 'react'

export default function Preloader() {
  return (
    <div className="preloader">
      <div className="preloader-bg"></div>
      <div className="preloader-content">
        <div className="logo-container">
          <img src="/Aadvidya logo.png" alt="AADVIDYA Logo" className="preloader-logo" />
        </div>
        <div className="preloader-text">2026</div>
        <div className="ecg-line">
          <div className="ecg-pulse"></div>
        </div>
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
      </div>
    </div>
  )
}