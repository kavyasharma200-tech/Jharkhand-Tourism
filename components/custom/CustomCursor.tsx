'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!dot.current || !ring.current) return
      dot.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
      ring.current.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`
    }
    const grow = () => ring.current?.classList.add('scale-150', 'border-black/50')
    const shrink = () => ring.current?.classList.remove('scale-150', 'border-black/50')

    document.addEventListener('mousemove', move)
    document.querySelectorAll('a, button, [data-cursor-grow]').forEach(el => {
      el.addEventListener('mouseenter', grow)
      el.addEventListener('mouseleave', shrink)
    })
    return () => {
      document.removeEventListener('mousemove', move)
      document.querySelectorAll('a, button, [data-cursor-grow]').forEach(el => {
        el.removeEventListener('mouseenter', grow)
        el.removeEventListener('mouseleave', shrink)
      })
    }
  }, [])

  return (
    <>
      <div ref={dot} className="fixed top-0 left-0 w-2 h-2 bg-black rounded-full z-[99999] pointer-events-none transition-transform duration-75 mix-blend-difference" />
      <div ref={ring} className="fixed top-0 left-0 w-8 h-8 border border-black/60 rounded-full z-[99999] pointer-events-none transition-all duration-200" />
    </>
  )
}
