'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'


const stats = [
  { number: "28", label: "DISTRICTS" },
  { number: "40", suffix: "+", label: "WATERFALLS" },
  { number: "32", label: "INDIGENOUS TRIBES" },
  { number: "820", suffix: "km²", label: "SARANDA FOREST" },
  { number: "1000", suffix: "+", label: "TEMPLES & SHRINES" },
];

export default function SectionStats() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      numbersRef.current.forEach((numEl, i) => {
        if (!numEl) return
        const finalValue = parseInt(numEl.dataset.value || "0", 10)
        
        gsap.fromTo(numEl, 
          { innerHTML: "0" },
          {
            innerHTML: finalValue,
            duration: 2,
            ease: "power2.out",
            snap: { innerHTML: 1 },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            },
            onUpdate: function() {
              numEl.innerHTML = Math.round(Number(this.targets()[0].innerHTML)).toString()
            }
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="w-full min-h-screen bg-white flex flex-col items-center justify-center py-24 overflow-hidden border-t border-black/5">
      <div className="px-8 md:px-24 w-full mb-12">
        <h2 className="font-['Anton'] text-[10vw] md:text-[8vw] leading-none text-black tracking-tight uppercase">Statistics</h2>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-8 w-full px-8 md:px-24 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {stats.map((stat, i) => (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center text-center">
              <div className="font-['Anton'] text-[15vw] md:text-[8vw] text-black leading-none">
                <span ref={el => { numbersRef.current[i] = el }} data-value={stat.number}>
                  0
                </span>
                {stat.suffix && <span>{stat.suffix}</span>}
              </div>
              <span className="font-['Space_Mono'] text-[9px] tracking-[0.3em] text-black/40 mt-4 uppercase">
                {stat.label}
              </span>
            </div>
            
            {i < stats.length - 1 && (
              <div className="hidden md:block w-px h-32 bg-black/10 mx-8 lg:mx-16" />
            )}
            {i < stats.length - 1 && (
              <div className="block md:hidden w-32 h-px bg-black/10 my-8" />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
