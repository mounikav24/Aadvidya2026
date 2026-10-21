import React, { useEffect, useRef } from 'react'

export default function BackgroundAnimation() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let width, height, raf
    let crosses = [], pills = [], sparkles = [], helixes = []
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const initCrosses = () => {
      crosses = Array.from({ length: 12 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 8 + Math.random() * 16,
        speed: 0.2 + Math.random() * 0.4,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        alpha: 0.1 + Math.random() * 0.3,
        twinkle: Math.random() * Math.PI * 2
      }))
    }

    const initPills = () => {
      pills = Array.from({ length: 8 }, () => ({
        x: Math.random() * width,
        y: height + 50 + Math.random() * 200,
        width: 20 + Math.random() * 15,
        height: 10 + Math.random() * 8,
        speed: 0.3 + Math.random() * 0.5,
        drift: (Math.random() - 0.5) * 0.3,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.015,
        alpha: 0.15 + Math.random() * 0.25,
        color1: Math.random() > 0.5 ? '#ffd700' : '#f0a500',
        color2: Math.random() > 0.5 ? '#7b2ff7' : '#9d4edd'
      }))
    }

    const initSparkles = () => {
      sparkles = Array.from({ length: 40 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 1 + Math.random() * 2.5,
        alpha: 0.2 + Math.random() * 0.6,
        twinkleSpeed: 0.002 + Math.random() * 0.004,
        twinkleOffset: Math.random() * Math.PI * 2
      }))
    }

    const initHelixes = () => {
      helixes = Array.from({ length: 3 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        length: 60 + Math.random() * 80,
        amplitude: 15 + Math.random() * 10,
        speed: 0.001 + Math.random() * 0.002,
        phase: Math.random() * Math.PI * 2,
        alpha: 0.08 + Math.random() * 0.12
      }))
    }

    const resize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      initCrosses()
      initPills()
      initSparkles()
      initHelixes()
      if (reduceMotion) draw(0)
    }

    const drawCross = (c, t) => {
      const twinkle = 0.6 + 0.4 * Math.sin(t * 0.002 + c.twinkle)
      ctx.save()
      ctx.translate(c.x, c.y)
      ctx.rotate(c.rotation)
      ctx.globalAlpha = c.alpha * twinkle
      ctx.strokeStyle = '#ffd700'
      ctx.lineWidth = 2
      ctx.shadowBlur = 10
      ctx.shadowColor = 'rgba(255, 215, 0, 0.6)'
      ctx.beginPath()
      ctx.moveTo(-c.size / 2, 0)
      ctx.lineTo(c.size / 2, 0)
      ctx.moveTo(0, -c.size / 2)
      ctx.lineTo(0, c.size / 2)
      ctx.stroke()
      ctx.restore()
      c.rotation += c.rotSpeed
      c.y -= c.speed
      if (c.y < -20) { c.y = height + 20; c.x = Math.random() * width }
    }

    const drawPill = (p, t) => {
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rotation)
      ctx.globalAlpha = p.alpha
      const grad = ctx.createLinearGradient(-p.width / 2, 0, p.width / 2, 0)
      grad.addColorStop(0, p.color1)
      grad.addColorStop(1, p.color2)
      ctx.fillStyle = grad
      ctx.shadowBlur = 15
      ctx.shadowColor = 'rgba(240, 165, 0, 0.5)'
      ctx.beginPath()
      ctx.roundRect(-p.width / 2, -p.height / 2, p.width, p.height, p.height / 2)
      ctx.fill()
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.restore()
      p.rotation += p.rotSpeed
      p.y -= p.speed
      p.x += p.drift
      if (p.y < -30) { p.y = height + 50; p.x = Math.random() * width }
    }

    const drawSparkle = (s, t) => {
      const twinkle = 0.3 + 0.7 * Math.abs(Math.sin(t * s.twinkleSpeed + s.twinkleOffset))
      ctx.beginPath()
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 215, 0, ${s.alpha * twinkle})`
      ctx.shadowBlur = 8
      ctx.shadowColor = 'rgba(255, 215, 0, 0.8)'
      ctx.fill()
      ctx.shadowBlur = 0
    }

    const drawHelix = (h, t) => {
      ctx.save()
      ctx.globalAlpha = h.alpha
      ctx.strokeStyle = '#f0a500'
      ctx.lineWidth = 1.5
      ctx.shadowBlur = 8
      ctx.shadowColor = 'rgba(240, 165, 0, 0.4)'
      for (let i = 0; i < h.length; i += 3) {
        const y = h.y + i
        const x1 = h.x + Math.sin(i * 0.1 + t * h.speed + h.phase) * h.amplitude
        const x2 = h.x + Math.sin(i * 0.1 + t * h.speed + h.phase + Math.PI) * h.amplitude
        ctx.beginPath()
        ctx.moveTo(x1, y)
        ctx.lineTo(x2, y)
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(x1, y, 2, 0, Math.PI * 2)
        ctx.fillStyle = '#ffd700'
        ctx.fill()
        ctx.beginPath()
        ctx.arc(x2, y, 2, 0, Math.PI * 2)
        ctx.fillStyle = '#7b2ff7'
        ctx.fill()
      }
      ctx.restore()
      h.y -= 0.3
      if (h.y < -h.length) { h.y = height + h.length; h.x = Math.random() * width }
    }

    const draw = (t) => {
      ctx.clearRect(0, 0, width, height)
      sparkles.forEach(s => drawSparkle(s, t))
      helixes.forEach(h => drawHelix(h, t))
      crosses.forEach(c => drawCross(c, t))
      pills.forEach(p => drawPill(p, t))
    }

    const loop = (t) => {
      draw(t)
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('resize', resize)
    resize()
    if (!reduceMotion) raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.4
      }}
    />
  )
}