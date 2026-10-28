import React, { useEffect, useState, useCallback } from 'react'

export default function GallerySlideshow({ images, interval = 3000, showCaptions = false }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => setIndex(i => (i + 1) % images.length), [images.length])
  const prev = () => setIndex(i => (i - 1 + images.length) % images.length)

  useEffect(() => {
    if (paused || images.length <= 1) return
    
    const t = setInterval(next, interval)
    return () => clearInterval(t)
  }, [paused, next, interval, images.length])

  if (!images || images.length === 0) return null

  return (
    <div className="slideshow" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="slideshow-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {images.map((item, i) => (
          <div className="slideshow-slide" key={i}>
            {/* Check if it's a video */}
            {item.isVideo || item.src.endsWith('.MOV') || item.src.endsWith('.mp4') || item.src.endsWith('.webm') ? (
              <video
                src={item.src}
                autoPlay={index === i}
                muted
                loop
                playsInline
                className="slideshow-video"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <img src={item.src} alt={item.caption || 'Gallery slide'} />
            )}
            
            {showCaptions && item.caption && (
              <div className="slide-caption">{item.caption}</div>
            )}
          </div>
        ))}
      </div>
      
      {images.length > 1 && (
        <>
          <button className="slide-arrow slide-prev" onClick={prev} aria-label="Previous">
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="slide-arrow slide-next" onClick={next} aria-label="Next">
            <i className="fas fa-chevron-right"></i>
          </button>
        </>
      )}
    </div>
  )
}