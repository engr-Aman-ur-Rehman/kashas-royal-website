import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ambientTones, DEFAULT_AMBIENT_TONE, type AmbientToneId } from "@/config/ambientTones";

function isAmbientTone(value: string | null): value is AmbientToneId {
  return value !== null && Object.prototype.hasOwnProperty.call(ambientTones, value);
}

/**
 * Full-viewport fixed grainy canvas that smoothly shifts colour as the user
 * scrolls between `[data-ambient-tone]` sections — echoing 8 Northumberland
 * Avenue's tactile `noise_compressed.webp` grain and seamless scroll-driven
 * page background colour transitions.
 *
 * Layered strictly at `-z-10` beneath `<main>` so photography and editorial
 * cards remain crisp while the painted canvas breathes seamlessly behind them.
 */
export default function AmbientCanvas() {
  const { pathname } = useLocation();
  const [tone, setTone] = useState<AmbientToneId>(DEFAULT_AMBIENT_TONE);

  useEffect(() => {
    setTone(DEFAULT_AMBIENT_TONE);

    let rafId = 0;

    const resolveTone = () => {
      rafId = 0;
      const sections = document.querySelectorAll<HTMLElement>("[data-ambient-tone]");
      if (sections.length === 0) {
        setTone(DEFAULT_AMBIENT_TONE);
        return;
      }

      // Match 8na's viewport midpoint trigger (`start: "top center"` / 45% height)
      const triggerY = window.innerHeight * 0.45;
      let nextTone: AmbientToneId = DEFAULT_AMBIENT_TONE;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        const attr = section.getAttribute("data-ambient-tone");
        if (!isAmbientTone(attr)) continue;

        if (rect.top <= triggerY) {
          nextTone = attr;
        } else {
          break;
        }
      }

      setTone((current) => (current === nextTone ? current : nextTone));
    };

    const scheduleResolve = () => {
      if (rafId !== 0) return;
      rafId = window.requestAnimationFrame(resolveTone);
    };

    // Resolve after route mount & layout settle
    const settleTimer = window.setTimeout(scheduleResolve, 60);
    scheduleResolve();

    window.addEventListener("scroll", scheduleResolve, { passive: true });
    window.addEventListener("resize", scheduleResolve, { passive: true });

    return () => {
      window.clearTimeout(settleTimer);
      if (rafId !== 0) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", scheduleResolve);
      window.removeEventListener("resize", scheduleResolve);
    };
  }, [pathname]);

  const active = ambientTones[tone];

  useEffect(() => {
    document.documentElement.style.setProperty("--ambient-bg", active.bg);
  }, [active.bg]);

  return (
    <div
      aria-hidden="true"
      data-ambient-active={tone}
      className="ambient-canvas pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ backgroundColor: active.bg }}
    >
      {/* Soft drifting tonal wash so large canvases feel dimensional and alive */}
      <div
        className="ambient-canvas-wash absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(ellipse 85% 70% at ${active.washPosition}, ${active.wash}, transparent 72%)`,
        }}
      />
      {/* Crisp architectural paper/film grain tile painted directly over the canvas */}
      <div className="ambient-canvas-grain absolute inset-0" />
    </div>
  );
}
