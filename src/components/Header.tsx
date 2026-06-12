"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { nav, site } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  // Close the menu on ANY route change (logo tap, back/forward, desktop nav),
  // using the render-time adjustment pattern instead of a setState-in-effect.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  return (
    <>
      {/* Top utility bar */}
      <div className="hidden bg-graphite text-cream/80 md:block">
        <div className="container-x flex h-9 items-center justify-between text-xs">
          <span className="tracking-wide">Insulation contractor · {site.region} · Since {site.since}</span>
          <div className="flex items-center gap-5">
            <a href={site.emailHref} className="hover:text-orange transition-colors">{site.email}</a>
            <span className="text-line-dark">|</span>
            <a href={site.phoneHref} className="font-semibold text-cream hover:text-orange transition-colors">{site.phone}</a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled ? "border-line bg-white/95 backdrop-blur shadow-sm" : "border-transparent bg-white"
        }`}
      >
        <div className="container-x flex h-[68px] items-center justify-between">
          <Link href="/" aria-label="H&S Insulation home">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    active ? "text-orange" : "text-graphite hover:text-orange"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-white shadow-card transition-all hover:bg-orange-dark hover:-translate-y-0.5 sm:inline-flex"
            >
              Get a Free Estimate
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
            >
              <span className={`h-0.5 w-6 bg-graphite transition-all ${open ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`h-0.5 w-6 bg-graphite transition-all ${open ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-6 bg-graphite transition-all ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`overflow-hidden border-t border-line bg-white transition-all duration-300 lg:hidden ${
            open ? "max-h-[26rem]" : "max-h-0"
          }`}
        >
          <nav className="container-x flex flex-col py-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="border-b border-line/60 py-3 text-base font-medium text-graphite last:border-0 hover:text-orange"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={site.phoneHref}
              onClick={closeMenu}
              className="mt-4 inline-flex justify-center rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white"
            >
              Call {site.phone}
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}
