"use client";

import { motion } from "framer-motion";
import { media } from "@/lib/media";

/**
 * Hero background.
 * - To enable a looping background video, drop files in /public/videos and set
 *   `media.heroVideo` in src/lib/media.ts (e.g. { mp4: "/videos/hero-insulation.mp4" }).
 * - Until then, the `poster` image shows, with animated insulation waves +
 *   drifting dust particles so the hero feels alive and cinematic.
 */

const WAVE =
  "M0,300 q60,40 120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0";

// deterministic particle field (no random -> no hydration mismatch)
const PARTICLES = [
  { l: 8, s: 3, d: 0, dur: 14 },
  { l: 18, s: 2, d: 3, dur: 18 },
  { l: 27, s: 4, d: 6, dur: 12 },
  { l: 39, s: 2, d: 1, dur: 20 },
  { l: 48, s: 3, d: 8, dur: 15 },
  { l: 58, s: 2, d: 4, dur: 17 },
  { l: 66, s: 4, d: 9, dur: 13 },
  { l: 74, s: 2, d: 2, dur: 19 },
  { l: 83, s: 3, d: 6, dur: 16 },
  { l: 92, s: 2, d: 10, dur: 21 },
];

function WaveLayer({ ys, width, dur, op }: { ys: number[]; width: number; dur: number; op: number }) {
  return (
    <motion.svg
      className="absolute inset-x-0 top-1/2 w-[200%] -translate-y-1/2"
      style={{ height: "120%" }}
      viewBox="0 0 2880 600"
      preserveAspectRatio="none"
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: dur, repeat: Infinity, ease: "linear" }}
    >
      {ys.map((y) => (
        <path
          key={y}
          d={WAVE.replace("300", String(y))}
          fill="none"
          stroke="#F26A21"
          strokeWidth={width}
          strokeLinecap="round"
          opacity={op}
        />
      ))}
    </motion.svg>
  );
}

export default function HeroMedia({ poster }: { poster: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-ink">
      {/* Drop-in background video (poster image until media.heroVideo is set) */}
      {media.heroVideo ? (
        <motion.video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster={poster}
          aria-hidden="true"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1.16 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        >
          {media.heroVideo.webm && <source src={media.heroVideo.webm} type="video/webm" />}
          {media.heroVideo.mp4 && <source src={media.heroVideo.mp4} type="video/mp4" />}
        </motion.video>
      ) : (
        <motion.img
          src={poster}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1.16 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
      )}

      {/* Pulsing warm glow (worklight feel) */}
      <motion.div
        className="pointer-events-none absolute -right-1/4 top-0 h-full w-2/3 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(242,106,33,0.22), transparent 65%)" }}
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Flowing insulation waves, three parallax layers */}
      <div className="pointer-events-none absolute inset-0">
        <WaveLayer ys={[140, 240, 340, 440]} width={3.5} dur={20} op={0.32} />
        <WaveLayer ys={[90, 190, 290, 390, 490]} width={2.5} dur={32} op={0.2} />
        <WaveLayer ys={[60, 200, 360, 520]} width={2} dur={46} op={0.12} />
      </div>

      {/* Drifting dust particles */}
      <div className="pointer-events-none absolute inset-0">
        {PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-orange/70"
            style={{ left: `${p.l}%`, width: p.s, height: p.s }}
            initial={{ top: "100%", opacity: 0 }}
            animate={{ top: "-5%", opacity: [0, 0.8, 0] }}
            transition={{ duration: p.dur, delay: p.d, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>

      {/* Overlay: strong on the left for headline contrast, lighter on the
          right so the video footage actually reads */}
      <div className="absolute inset-0 bg-ink/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/30" />
    </div>
  );
}
