"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LogoIcon } from "@/components/Logo";
import { site } from "@/lib/site";
import { media } from "@/lib/media";

/**
 * Full-screen intro that plays the hero video once per session, then fades
 * out to reveal the page (the hero behind it loops the same video, so the
 * hand-off is seamless). Skipped entirely for repeat visits in the same
 * session and for prefers-reduced-motion users. Click anywhere to skip.
 */

const SEEN_KEY = "hs-intro-seen";
// Cut point tuned to the current 10s hero-insulation clip (cuts before the
// loop seam); retune if the video in media.heroVideo is swapped or re-encoded.
const INTRO_MS = 4600;

export default function SiteIntro() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || sessionStorage.getItem(SEEN_KEY)) return;
    // rAF defers the setState out of the effect body (no cascading render).
    // SEEN_KEY is written inside the callback so a StrictMode double-invoke
    // (or an aborted mount) doesn't mark the intro seen before it ever shows.
    const raf = requestAnimationFrame(() => {
      sessionStorage.setItem(SEEN_KEY, "1");
      setShow(true);
    });
    const t = setTimeout(() => setShow(false), INTRO_MS);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    if (!show) return;
    document.body.style.overflow = "hidden";
    // Keyboard users must be able to skip the scroll-locked overlay (WCAG 2.1.1).
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") setShow(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center overflow-hidden bg-ink"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.4 } }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: "easeInOut" } }}
          onClick={() => setShow(false)}
          aria-label="Intro, click to skip"
          role="button"
        >
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            poster={media.heroVideoPoster}
            aria-hidden="true"
          >
            {media.heroVideo?.webm && <source src={media.heroVideo.webm} type="video/webm" />}
            {media.heroVideo?.mp4 && <source src={media.heroVideo.mp4} type="video/mp4" />}
          </video>

          <div className="absolute inset-0 bg-ink/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/50" />

          <motion.div
            className="relative flex flex-col items-center px-6 text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: "easeOut" }}
          >
            <LogoIcon variant="light" className="h-16 w-16 sm:h-20 sm:w-20" />
            <p className="font-display mt-6 text-3xl font-bold tracking-wide text-cream sm:text-5xl">
              H&amp;S INSULATION
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.35em] text-cream/70 sm:text-sm">
              NorCal &middot; Since {site.since}
            </p>
          </motion.div>

          <motion.span
            className="absolute bottom-8 text-xs uppercase tracking-[0.25em] text-cream/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.6 }}
          >
            Click to skip
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
