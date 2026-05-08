'use client'
import Lenis from 'lenis'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Make lenis available globally for GSAP ScrollTrigger
    ;(window as any).__lenis = lenis

    return () => lenis.destroy()
  }, [pathname])

  return <>{children}</>
}
