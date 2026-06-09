"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

export default function FloatingPhoneCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY > document.body.offsetHeight - 600;
      setShow(window.scrollY > 400 && !nearBottom);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={site.phoneHref}
      className={`fixed inset-x-4 bottom-4 z-40 flex items-center justify-center gap-2 rounded-full bg-orange px-6 py-3.5 text-sm font-semibold text-white shadow-lift transition-all duration-300 md:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-20 opacity-0"
      }`}
    >
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
        <path d="M2 3.5A1.5 1.5 0 013.5 2h1.7a1.5 1.5 0 011.46 1.15l.6 2.4a1.5 1.5 0 01-.4 1.43l-1 1a11 11 0 004.66 4.66l1-1a1.5 1.5 0 011.43-.4l2.4.6A1.5 1.5 0 0118 13.3V15a1.5 1.5 0 01-1.5 1.5C8.49 16.5 3.5 11.51 3.5 3.5z" />
      </svg>
      Call for a Free Estimate
    </a>
  );
}
