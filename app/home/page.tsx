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
import SectionStats from '@/components/custom/SectionStats';
import SectionBrutalistGrid from '@/components/custom/SectionBrutalistGrid';
import SectionKineticText from '@/components/custom/SectionKineticText';
import SectionStaggeredReveal from '@/components/custom/SectionStaggeredReveal';
import Footer from '@/components/custom/Footer';

export default function HomePage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Connect Lenis to GSAP ticker
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
        // Tell Lenis to defer to GSAP ticker
        lenis.options.autoRaf = false;
      } else {
        rafId = requestAnimationFrame(waitForLenis);
      }
    };
    waitForLenis();

    // ── Scroll Guard ────────────────────────────────────────────────
    // Intercept wheel/touch. If a pinned ScrollTrigger is mid-scrub
    // (progress between 0 and 1), consume the event so the user stays
    // in that section until the animation fully resolves.
    let touchStartY = 0;

    const getActivePinnedST = (): ScrollTrigger | undefined => {
      return ScrollTrigger.getAll().find((st) => {
        if (!st.pin) return false;
        const prog = st.progress;
        // "mid-animation" = past entry threshold but not yet complete
        return prog > 0.005 && prog < 0.995;
      });
    };

    const onWheel = (e: WheelEvent) => {
      const active = getActivePinnedST();
      if (active) {
        // A pinned ST is in progress — let native scroll drive the scrub
        // but prevent Lenis from warping past it.
        // Just prevent any extra momentum by stopping propagation.
        e.stopPropagation();
        return;
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      const active = getActivePinnedST();
      if (active) {
        const dy = touchStartY - e.touches[0].clientY;
        const goingDown = dy > 0;
        // Block touch scroll past a pinned section that isn't done
        if (goingDown && active.progress < 0.99) {
          e.preventDefault();
        } else if (!goingDown && active.progress > 0.01) {
          e.preventDefault();
        }
      }
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
