'use client';

import FlowArt, { FlowSection } from '@/components/story-scroll';
import { JHARKHAND_IMAGES } from '@/data/images.data';

export default function SectionStoryScroll() {
  return (
    <section className="relative w-full bg-white border-t border-black/5">
      <FlowArt aria-label="Jharkhand Field Notes">

        <FlowSection
          aria-label="Forests"
          style={{ backgroundColor: '#1a1a1a', color: '#fff' }}
        >
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] opacity-50">
            01 — FORESTS
          </p>
          <hr className="my-[2vw] border-t border-white/20" />
          <div>
            <h2 className="leading-[0.85] tracking-tight flex flex-col uppercase">
              <span className="font-['var(--font-bodoni)'] italic font-light text-[clamp(3rem,9vw,9rem)] ml-4">Saranda.</span>
              <span className="font-['Anton'] text-[clamp(3.5rem,12vw,13rem)] -mt-2">THE UNBROKEN.</span>
            </h2>
          </div>
          <hr className="my-[2vw] border-t border-white/20" />
          <div className="flex flex-col md:flex-row gap-[3vw] items-end">
            <div className="flex-1">
              <p className="font-['var(--font-instrument)'] font-serif text-[clamp(1rem,2vw,1.6rem)] leading-relaxed opacity-70 max-w-[50ch]">
                820 km² of unbroken sal canopy — the world's largest. Drive through at dawn.
                The forest floor is older than every road you have ever taken.
              </p>
              <p className="font-mono text-[8px] text-white/30 tracking-[0.35em] uppercase mt-6">
                BEST NOV – FEB · SARANDA DIVISION · JEEP SAFARI AVAILABLE
              </p>
            </div>
            <div className="hidden md:block w-[35%] aspect-[4/3] overflow-hidden shrink-0">
              <img src={JHARKHAND_IMAGES[1]} alt="Saranda Forest" className="w-full h-full object-cover" />
            </div>
          </div>
        </FlowSection>

        <FlowSection
          aria-label="Waterfalls"
          style={{ backgroundColor: '#f2f4f7', color: '#000' }}
        >
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] opacity-40">
            02 — WATERFALLS
          </p>
          <hr className="my-[2vw] border-t border-black/15" />
          <div>
            <h2 className="leading-[0.85] tracking-tight flex flex-col uppercase">
              <span className="font-['Anton'] text-[clamp(3.5rem,12vw,13rem)]">CHASE</span>
              <span className="font-['var(--font-bodoni)'] italic font-light text-[clamp(3rem,9vw,9rem)] ml-8 -mt-2">The Monsoon.</span>
            </h2>
          </div>
          <hr className="my-[2vw] border-t border-black/15" />
          <div className="flex flex-col md:flex-row gap-[3vw] items-end">
            <div className="flex-1">
              <p className="font-['var(--font-instrument)'] font-serif text-[clamp(1rem,2vw,1.6rem)] leading-relaxed opacity-60 max-w-[50ch]">
                Over 40 named waterfalls. Hundru, Jonha, Dassam, Panchghagh — each carved
                by the Subarnarekha over ten thousand years.
              </p>
              <p className="font-mono text-[8px] text-black/30 tracking-[0.35em] uppercase mt-6">
                BEST AUG – OCT · NH-23 LOOP · 45 KM FROM RANCHI
              </p>
            </div>
            <div className="hidden md:block w-[35%] aspect-[4/3] overflow-hidden shrink-0">
              <img src={JHARKHAND_IMAGES[0]} alt="Hundru Falls" className="w-full h-full object-cover" />
            </div>
          </div>
        </FlowSection>

        <FlowSection
          aria-label="Culture"
          style={{ backgroundColor: '#f5f0e8', color: '#000' }}
        >
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] opacity-40">
            03 — CULTURE
          </p>
          <hr className="my-[2vw] border-t border-black/15" />
          <div>
            <h2 className="leading-[0.85] tracking-tight flex flex-col uppercase">
              <span className="font-['Anton'] text-[clamp(3.5rem,12vw,13rem)]">32 TRIBES.</span>
              <span className="font-['var(--font-bodoni)'] italic font-light text-[clamp(3rem,9vw,9rem)] ml-8 -mt-2">One heartbeat.</span>
            </h2>
          </div>
          <hr className="my-[2vw] border-t border-black/15" />
          <div className="flex flex-col md:flex-row gap-[3vw] items-end">
            <div className="flex-1">
              <p className="font-['var(--font-instrument)'] font-serif text-[clamp(1rem,2vw,1.6rem)] leading-relaxed opacity-60 max-w-[50ch]">
                Santhali, Munda, Ho, Oraon — traditions older than written history.
                Witness Sarhul in spring: flowers, drums, and a faith that predates temples.
              </p>
              <p className="font-mono text-[8px] text-black/30 tracking-[0.35em] uppercase mt-6">
                BEST MAR – APR · RANCHI & KHUNTI DISTRICT · FESTIVAL CALENDAR VARIES
              </p>
            </div>
            <div className="hidden md:block w-[35%] aspect-[4/3] overflow-hidden shrink-0">
              <img src={JHARKHAND_IMAGES[3]} alt="Tribal Culture" className="w-full h-full object-cover" />
            </div>
          </div>
        </FlowSection>

        <FlowSection
          aria-label="Wildlife"
          style={{ backgroundColor: '#0d0d0d', color: '#fff' }}
        >
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] opacity-50">
            04 — WILDLIFE
          </p>
          <hr className="my-[2vw] border-t border-white/20" />
          <div>
            <h2 className="leading-[0.85] tracking-tight flex flex-col uppercase">
              <span className="font-['var(--font-bodoni)'] italic font-light text-[clamp(3rem,9vw,9rem)] ml-4">Enter Betla</span>
              <span className="font-['Anton'] text-[clamp(3.5rem,12vw,13rem)] -mt-2">AT 5AM.</span>
            </h2>
          </div>
          <hr className="my-[2vw] border-t border-white/20" />
          <div className="flex flex-col md:flex-row gap-[3vw] items-end">
            <div className="flex-1">
              <p className="font-['var(--font-instrument)'] font-serif text-[clamp(1rem,2vw,1.6rem)] leading-relaxed opacity-70 max-w-[50ch]">
                Betla National Park — one of India's first tiger reserves since 1973.
                Elephants at the salt lick before sunrise. The forest holds its breath.
                So will you.
              </p>
              <p className="font-mono text-[8px] text-white/30 tracking-[0.35em] uppercase mt-6">
                BEST DEC – MAR · 140 KM FROM RANCHI · PRE-BOOK FOREST DEPT JEEP
              </p>
            </div>
            <div className="hidden md:block w-[35%] aspect-[4/3] overflow-hidden shrink-0">
              <img src={JHARKHAND_IMAGES[5]} alt="Betla Wildlife" className="w-full h-full object-cover" />
            </div>
          </div>
        </FlowSection>

      </FlowArt>
    </section>
  );
}
