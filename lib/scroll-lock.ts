'use client';

/**
 * scrollLock — global singleton.
 * Sections call lock() when their GSAP animation starts and unlock() when done.
 * While locked, ALL wheel / touch / key scroll is fully suppressed.
 */

type Handler = (e: Event) => void;

const CANCEL: Handler = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

let _locked = false;

export const scrollLock = {
  get isLocked() {
    return _locked;
  },

  lock() {
    if (_locked) return;
    _locked = true;
    window.addEventListener('wheel',     CANCEL, { passive: false, capture: true });
    window.addEventListener('touchmove', CANCEL, { passive: false, capture: true });
    window.addEventListener('touchstart',CANCEL, { passive: false, capture: true });
  },

  unlock() {
    if (!_locked) return;
    _locked = false;
    window.removeEventListener('wheel',      CANCEL, { capture: true });
    window.removeEventListener('touchmove',  CANCEL, { capture: true });
    window.removeEventListener('touchstart', CANCEL, { capture: true });
  },
};
