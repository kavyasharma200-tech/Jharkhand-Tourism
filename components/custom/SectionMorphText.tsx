'use client'

import IntroAnimation from '@/components/scroll-morph-hero'

export default function SectionMorphText() {
  return (
    <section className="relative w-full h-[100dvh] bg-white overflow-hidden border-t border-black/5">
      {/* Full-bleed IntroAnimation */}
      <IntroAnimation />
      
      {/* Floating label, bottom-left */}
      <div className="absolute bottom-8 left-8 z-20 pointer-events-none">
        <p className="font-['Space_Mono'] text-[9px] text-black/30 tracking-[0.3em] uppercase">
          Scroll to morph
        </p>
      </div>
    </section>
  )
}
