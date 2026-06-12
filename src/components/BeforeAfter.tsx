"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";

// Full-screen scroll-driven before/after. The wrapper is 300vh tall; the
// visual pins to the viewport and a divider sweeps left -> right as the user
// scrolls, wiping the AFTER photo over the BEFORE photo. Captions live inside
// their own layer so the wipe reveals/hides them for free.
// Progress is read from the wrapper's live bounding rect on each scroll frame
// (not framer's useScroll target offsets, which cache positions measured at
// mount and go stale once media above this section finishes loading).
export default function BeforeAfter({ before, after }: { before: string; after: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);

  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      const p = total > 0 ? -el.getBoundingClientRect().top / total : 0;
      progress.set(Math.min(1, Math.max(0, p)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [progress]);

  const clip = useTransform(progress, [0.1, 0.9], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  const dividerLeft = useTransform(progress, [0.1, 0.9], ["0%", "100%"]);
  const dividerOpacity = useTransform(progress, [0.05, 0.1, 0.9, 0.95], [0, 1, 1, 0]);
  const hintOpacity = useTransform(progress, [0, 0.12], [1, 0]);

  return (
    <div ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 h-svh w-full overflow-hidden bg-graphite">
        {/* BEFORE — full bleed */}
        <Image src={before} alt="Attic before new insulation" fill sizes="100vw" className="object-cover" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/30" />
        <span className="absolute bottom-8 right-6 rounded-full bg-graphite/90 px-5 py-2 text-xs font-bold uppercase tracking-[0.15em] text-cream backdrop-blur sm:right-10">
          Before
        </span>

        {/* AFTER — full bleed, wiped in by scroll */}
        <motion.div style={{ clipPath: clip }} className="absolute inset-0">
          <Image src={after} alt="Attic after fresh insulation" fill sizes="100vw" className="object-cover" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/30" />
          <span className="absolute bottom-8 left-6 rounded-full bg-orange px-5 py-2 text-xs font-bold uppercase tracking-[0.15em] text-white sm:left-10">
            After
          </span>
        </motion.div>

        {/* sweeping divider */}
        <motion.div
          style={{ left: dividerLeft, opacity: dividerOpacity }}
          className="absolute inset-y-0 z-10 w-[3px] -translate-x-1/2 bg-cream/90 shadow-[0_0_24px_rgba(0,0,0,0.45)]"
          aria-hidden
        >
          <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream text-graphite shadow-lift">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path d="M9 6l-5 6 5 6M15 6l5 6-5 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </motion.div>

        {/* scroll hint */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex justify-center"
          aria-hidden
        >
          <span className="flex items-center gap-2 rounded-full bg-ink/70 px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-cream backdrop-blur">
            Scroll to see the difference
            <motion.svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <path d="M12 4v16m0 0l-6-6m6 6l6-6" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </span>
        </motion.div>
      </div>
    </div>
  );
}
