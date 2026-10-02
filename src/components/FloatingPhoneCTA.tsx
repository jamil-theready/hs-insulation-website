"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

export default function FloatingPhoneCTA() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY > document.body.offsetHeight - 600;
      setShow(!nearBottom);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-4 bottom-4 z-40 flex items-center gap-2 transition-all duration-300 md:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-20 opacity-0"
      }`}
    >
      <Link
        href="/contact"
        className="flex h-12 flex-1 items-center justify-center rounded-full bg-orange px-3 text-center text-sm font-semibold text-white shadow-lift"
      >
        Get a Free Estimate
      </Link>
      <a
        href={site.phoneHref}
        aria-label={`Call ${site.phone}`}
        className="flex h-12 flex-1 items-center justify-center rounded-full bg-white px-3 text-center text-sm font-semibold text-graphite shadow-lift"
      >
        Call {site.phone}
      </a>
    </div>
  );
}
