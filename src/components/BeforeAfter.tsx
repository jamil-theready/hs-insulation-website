"use client";

import { motion } from "framer-motion";
import Media from "./Media";

export default function BeforeAfter({ before, after }: { before: string; after: string }) {
  return (
    <div className="relative grid grid-cols-2 items-start pb-6">
      {/* BEFORE */}
      <motion.figure
        className="group relative z-10"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.04, zIndex: 30 }}
      >
        <div className="relative overflow-hidden rounded-3xl shadow-lift ring-1 ring-black/5">
          <Media src={before} alt="Attic before new insulation" rounded="rounded-none" className="aspect-[4/5]" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent transition-opacity duration-500 group-hover:opacity-70" />
        </div>
        <figcaption className="absolute bottom-5 left-5 rounded-full bg-graphite/90 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-cream backdrop-blur">
          Before
        </figcaption>
      </motion.figure>

      {/* AFTER (overlaps, lifted) */}
      <motion.figure
        className="group relative z-20 -ml-8 mt-20 sm:-ml-14"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
        whileHover={{ scale: 1.04, zIndex: 30 }}
      >
        <div className="relative overflow-hidden rounded-3xl shadow-lift ring-[6px] ring-cream-2">
          <Media src={after} alt="Attic after fresh insulation" rounded="rounded-none" className="aspect-[4/5]" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent transition-opacity duration-500 group-hover:opacity-70" />
          {/* orange sheen sweep on hover */}
          <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-orange/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </div>
        <figcaption className="absolute bottom-5 left-5 rounded-full bg-orange px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-white">
          After
        </figcaption>
      </motion.figure>
    </div>
  );
}
