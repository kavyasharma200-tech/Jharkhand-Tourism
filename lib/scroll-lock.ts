'use client';

/**
 * ScrollLock — global singleton that sections can call to lock/unlock
 * the page scroll while an animation is in progress.
 *
 * Usage:
 *   scrollLock.lock()    → disables wheel + touch scroll
 *   scrollLock.unlock()  → re-enables scroll
 *   scrollLock.isLocked  → boolean
 */

let locked = false;

const preventScroll = (e: Event) => {
  e.preventDefault();
};

export const scrollLock = {
  get isLocked() {
    return locked;
  },

  lock() {
    if (locked) return;
    locked = true;
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    document.documentElement.classList.add('scroll-locked');
  },

  unlock() {
    if (!locked) return;
    locked = false;
    window.removeEventListener('wheel', preventScroll);
    window.removeEventListener('touchmove', preventScroll);
    document.documentElement.classList.remove('scroll-locked');
  },
};
