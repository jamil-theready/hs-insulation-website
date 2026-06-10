"use client";

import { motion } from "framer-motion";

/**
 * Hero background.
 * - Drop a looping 3D insulation animation at /videos/hero-insulation.mp4
 *   (and optionally .webm) and it plays automatically as the background.
 * - Until then, the `poster` image shows, with animated insulation waves
 *   drifting over it so the hero feels alive.
 */
export default function HeroMedia({ poster }: { poster: string }) {
  // A single periodic wave tile, repeated; drift it horizontally for a "flow" effect.
  const wave = (y: number, w: number, op: number) =>
    `M0,${y} q60,34 120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0`;

  return (
    <div className="absolute inset-0 overflow-hidden bg-ink">
      {/* Drop-in background video (poster shows until the file exists) */}
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-55"
        autoPlay
        loop
        muted
        playsInline
        poster={poster}
        aria-hidden="true"
      >
        <source src="/videos/hero-insulation.webm" type="video/webm" />
        <source src="/videos/hero-insulation.mp4" type="video/mp4" />
      </video>

      {/* Slow Ken Burns drift on the whole backdrop for subtle life */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1.12 }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        {/* Flowing insulation waves, two parallax layers */}
        <motion.svg
          className="absolute inset-x-0 top-1/2 h-[60%] w-[200%] -translate-y-1/2"
          viewBox="0 0 2880 600"
          preserveAspectRatio="none"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          {[120, 220, 320, 420].map((y) => (
            <path key={y} d={wave(y, 2880, 0.18)} fill="none" stroke="#F26A21" strokeWidth={3} strokeLinecap="round" opacity={0.18} />
          ))}
        </motion.svg>
        <motion.svg
          className="absolute inset-x-0 top-1/2 h-[80%] w-[200%] -translate-y-1/2"
          viewBox="0 0 2880 600"
          preserveAspectRatio="none"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
        >
          {[80, 200, 320, 440, 540].map((y) => (
            <path key={y} d={wave(y, 2880, 0.1)} fill="none" stroke="#F26A21" strokeWidth={2} strokeLinecap="round" opacity={0.1} />
          ))}
        </motion.svg>
      </motion.div>

      {/* Legibility gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/92 to-ink/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/30" />
    </div>
  );
}
