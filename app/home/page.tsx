'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/custom/Navbar';
import SectionHero from '@/components/custom/SectionHero';
import SectionMorphText from '@/components/custom/SectionMorphText';
import SectionImageReveal from '@/components/custom/SectionImageReveal';
import SectionAnimatedSlideshow from '@/components/custom/SectionAnimatedSlideshow';
import SectionZoomParallax from '@/components/custom/SectionZoomParallax';
import SectionStoryScroll from '@/components/custom/SectionStoryScroll';
import SectionBrutalistGrid from '@/components/custom/SectionBrutalistGrid';
import SectionStaggeredReveal from '@/components/custom/SectionStaggeredReveal';
import Section3DModels from '@/components/custom/Section3DModels';
import SectionTripPlanner from '@/components/custom/SectionTripPlanner';
import TribalGuideCharacter from '@/components/custom/TribalGuideCharacter';
import SectionStats from '@/components/custom/SectionStats';
import Footer from '@/components/custom/Footer';

export default function HomePage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let rafId: number | undefined;
    const tickerFn = (time: number) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lenis = (window as any).__lenis;
      if (lenis) lenis.raf(time * 1000);
    };

    const waitForLenis = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lenis = (window as any).__lenis;
      if (lenis) {
        gsap.ticker.add(tickerFn);
        gsap.ticker.lagSmoothing(0);
        lenis.options.autoRaf = false;
      } else {
        rafId = requestAnimationFrame(waitForLenis);
      }
    };
    waitForLenis();

    let touchStartY = 0;
    const getActivePinnedST = (): ScrollTrigger | undefined =>
      ScrollTrigger.getAll().find((st) => {
        if (!st.pin) return false;
        const p = st.progress;
        return p > 0.005 && p < 0.995;
      });

    const onWheel = (e: WheelEvent) => {
      if (getActivePinnedST()) e.stopPropagation();
    };
    const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => {
      const active = getActivePinnedST();
      if (!active) return;
      const goingDown = touchStartY - e.touches[0].clientY > 0;
      if (goingDown && active.progress < 0.99) e.preventDefault();
      else if (!goingDown && active.progress > 0.01) e.preventDefault();
    };

    document.addEventListener('wheel', onWheel, { passive: true });
    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('touchmove', onTouchMove, { passive: false });

    return () => {
      gsap.ticker.remove(tickerFn);
      if (rafId !== undefined) cancelAnimationFrame(rafId);
      document.removeEventListener('wheel', onWheel);
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="bg-white">
      <Navbar />
      <div id="hero"><SectionHero /></div>
      <SectionMorphText />
      <div id="cities"><SectionImageReveal /></div>
      <div id="wonders"><SectionAnimatedSlideshow /></div>
      <div id="landscapes"><SectionZoomParallax /></div>
      <div id="culture"><SectionStoryScroll /></div>
      <div id="wild"><SectionBrutalistGrid /></div>
      <SectionStaggeredReveal />
      <SectionStats />
      <Section3DModels />
      <SectionTripPlanner />
      <Footer />
      <TribalGuideCharacter />
    </div>
  );
}
