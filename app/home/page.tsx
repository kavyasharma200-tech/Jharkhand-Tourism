'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/custom/Navbar';
import SectionHero from '@/components/custom/SectionHero';
import SectionMorphText from '@/components/custom/SectionMorphText';
import SectionImageReveal from '@/components/custom/SectionImageReveal';
import SectionAnimatedSlideshow from '@/components/custom/SectionAnimatedSlideshow';
import SectionZoomParallax from '@/components/custom/SectionZoomParallax';
import SectionStoryScroll from '@/components/custom/SectionStoryScroll';
import SectionStats from '@/components/custom/SectionStats';
import SectionBrutalistGrid from '@/components/custom/SectionBrutalistGrid';
import SectionKineticText from '@/components/custom/SectionKineticText';
import SectionStaggeredReveal from '@/components/custom/SectionStaggeredReveal';
import Footer from '@/components/custom/Footer';

export default function HomePage() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let rafId: number | undefined;

    const tickerUpdate = (time: number) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lenis = (window as any).__lenis;
      if (lenis) lenis.raf(time * 1000);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function initSnapping(lenis: any) {
      const sections = gsap.utils.toArray<HTMLElement>('section');
      if (!sections.length) return;

      ScrollTrigger.normalizeScroll(true);
      let currentIdx = 0;
      let isAnimating = false;

      const goTo = (index: number) => {
        if (isAnimating || index < 0 || index >= sections.length) return;
        isAnimating = true;
        currentIdx = index;
        lenis.scrollTo(sections[index], {
          duration: 1.2,
          easing: (t: number) => 1 - Math.pow(1 - t, 4),
          onComplete: () => {
            isAnimating = false;
            ScrollTrigger.refresh();
          },
        });
      };

      const observer = ScrollTrigger.observe({
        type: 'wheel,touch,pointer',
        wheelSpeed: 1,
        onDown: () => {
          if (isAnimating) return;
          const activeST = ScrollTrigger.getAll().find(
            (st) => st.trigger === sections[currentIdx]
          );
          if (activeST && activeST.progress < 0.99) return;
          goTo(currentIdx + 1);
        },
        onUp: () => {
          if (isAnimating) return;
          const activeST = ScrollTrigger.getAll().find(
            (st) => st.trigger === sections[currentIdx]
          );
          if (activeST && activeST.progress > 0.01) return;
          goTo(currentIdx - 1);
        },
        tolerance: 20,
        preventDefault: false,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).__snapCleanup = () => {
        observer.kill();
        lenis.start();
      };

      lenis.start();
    }

    const waitForLenis = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lenis = (window as any).__lenis;
      if (lenis) {
        gsap.ticker.add(tickerUpdate);
        gsap.ticker.lagSmoothing(0);
        initSnapping(lenis);
      } else {
        rafId = requestAnimationFrame(waitForLenis);
      }
    };

    waitForLenis();

    return () => {
      gsap.ticker.remove(tickerUpdate);
      if (rafId !== undefined) cancelAnimationFrame(rafId);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cleanup = (window as any).__snapCleanup;
      if (typeof cleanup === 'function') cleanup();
    };
  }, []);

  return (
    <div ref={mainRef} className="bg-white">
      <Navbar />
      <SectionHero />
      <SectionMorphText />
      <SectionImageReveal />
      <SectionAnimatedSlideshow />
      <SectionZoomParallax />
      <SectionStoryScroll />
      <SectionBrutalistGrid />
      <SectionKineticText />
      <SectionStaggeredReveal />
      <SectionStats />
      <Footer />
    </div>
  );
}
