'use client'

import Component from '@/components/image-reveal'

export default function SectionImageReveal() {
  return (
    <section className="relative min-h-screen bg-white flex flex-col justify-center overflow-hidden border-t border-black/5">
      <div className="px-8 md:px-16 pt-24 pb-8">
        <h2 className="font-['Anton'] text-[12vw] leading-none text-black tracking-tight mb-2">
          CITIES
        </h2>
        <p className="font-['Space_Mono'] text-[10px] text-black/30 tracking-[0.3em] mb-12">
          EXPLORE THE SOUL OF EACH CITY
        </p>
      </div>
      <Component variant="default" size="expanded" className="border-0 bg-white rounded-none" />
    </section>
  )
}

