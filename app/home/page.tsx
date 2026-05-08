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

    /* ─── Lenis ↔ GSAP Ticker ────────────────────────────── */
    let rafId: number;
    const tickerUpdate = (time: number) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lenis = (window as any).__lenis;
      if (lenis) lenis.raf(time * 1000);
    };

    const waitForLenis = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lenis = (window as any).__lenis;
      if (lenis) {
        // Stop Lenis doing its own smooth scroll — we drive it manually
        lenis.stop();
        gsap.ticker.add(tickerUpdate);
        gsap.ticker.lagSmoothing(0);
        initSnapping(lenis);
      } else {
        rafId = requestAnimationFrame(waitForLenis);
      }
    };

    /* ─── One-At-A-Time Section Snapping ─────────────────── */
    function initSnapping(lenis: { scrollTo: (el: Element, opts: object) => void; start: () => void }) {
      const sections = Array.from(
        mainRef.current?.querySelectorAll<HTMLElement>(':scope > section') ?? []
      );
      if (!sections.length) return;

      let current = 0;
      let animating = false;

      const goTo = (idx: number) => {
        if (animating) return;
        if (idx < 0 || idx >= sections.length) return;
        animating = true;
        current = idx;

        lenis.scrollTo(sections[idx], {
          duration: 1.4,
          easing: (t: number) => 1 - Math.pow(1 - t, 4),
          lock: true,
          onComplete: () => {
            animating = false;
          },
        });
      };

      const onWheel = (e: WheelEvent) => {
        e.preventDefault();
        if (animating) return;
        if (e.deltaY > 0) goTo(current + 1);
        else goTo(current - 1);
      };

      let touchStartY = 0;
      const onTouchStart = (e: TouchEvent) => {
        touchStartY = e.touches[0].clientY;
      };
      const onTouchEnd = (e: TouchEvent) => {
        if (animating) return;
        const dy = touchStartY - e.changedTouches[0].clientY;
        if (Math.abs(dy) < 40) return;
        if (dy > 0) goTo(current + 1);
        else goTo(current - 1);
      };

      window.addEventListener('wheel', onWheel, { passive: false });
      window.addEventListener('touchstart', onTouchStart, { passive: true });
      window.addEventListener('touchend', onTouchEnd, { passive: true });

      // Cleanup stored on closure
      (window as unknown as Record<string, unknown>).__snapCleanup = () => {
        window.removeEventListener('wheel', onWheel);
        window.removeEventListener('touchstart', onTouchStart);
        window.removeEventListener('touchend', onTouchEnd);
        lenis.start();
      };
    }

    waitForLenis();

    return () => {
      gsap.ticker.remove(tickerUpdate);
      if (rafId) cancelAnimationFrame(rafId);
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
