import { useEffect } from "react";
import Lenis from "lenis";

let activeLenis: Lenis | null = null;
let pauseCount = 0;

/** Pause Lenis scrolling while modals, lightboxes or drawers are open. */
export function pauseSmoothScroll() {
  pauseCount += 1;
  activeLenis?.stop();
}

/** Resume Lenis scrolling once all overlays have closed. */
export function resumeSmoothScroll() {
  pauseCount = Math.max(0, pauseCount - 1);
  if (pauseCount === 0) activeLenis?.start();
}

/** Jump to the top of the page immediately (used on route transitions). */
export function scrollToTopImmediate() {
  if (activeLenis) {
    activeLenis.scrollTo(0, { immediate: true });
  } else {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }
}

/** Smoothly scroll to a target element, accounting for the sticky header height. */
export function scrollToElementSmooth(element: HTMLElement) {
  const headerOffset = -92;
  if (activeLenis) {
    activeLenis.scrollTo(element, { offset: headerOffset, duration: 1.1 });
  } else {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/**
 * Desktop Lenis smooth wheel scrolling (lerp: 0.1, >1024px), matching
 * 8 Northumberland Avenue's silky scroll cadence while honouring
 * `prefers-reduced-motion` and touch devices.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = window.innerWidth > 1024;
    if (reduceMotion || !isDesktop) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 0,
    });
    activeLenis = lenis;
    if (pauseCount > 0) lenis.stop();

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };
    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
      if (activeLenis === lenis) activeLenis = null;
    };
  }, []);
}
