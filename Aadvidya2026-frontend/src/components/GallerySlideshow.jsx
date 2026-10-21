import React, { useEffect, useState, useCallback } from 'react'

export default function GallerySlideshow({ images, interval = 4000 }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => setIndex(i => (i + 1) % images.length), [images.length])
  const prev = () => setIndex(i => (i - 1 + images.length) % images.length)

  useEffect(() => {
    if (paused) return
    const t = setInterval(next, interval)
    return () => clearInterval(t)
  }, [paused, next, interval])

  return (
    <div className="slideshow" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="slideshow-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {images.map((img, i) => (
          <div className="slideshow-slide" key={i}>
            <img src={img.src} alt={img.caption} />
            <div className="slide-caption">{img.caption}</div>
          </div>
        ))}
      </div>
      <button className="slide-arrow slide-prev" onClick={prev} aria-label="Previous"><i className="fas fa-chevron-left"></i></button>
      <button className="slide-arrow slide-next" onClick={next} aria-label="Next"><i className="fas fa-chevron-right"></i></button>
      <div className="slide-dots">
        {images.map((_, i) => (
          <button key={i} className={`slide-dot ${i === index ? 'active' : ''}`} onClick={() => setIndex(i)} aria-label={`Slide ${i + 1}`} />
        ))}
      </div>
    </div>
  )
}