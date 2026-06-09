import Link from "next/link";
import type { ReactNode } from "react";

type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost" | "outline-light";
  className?: string;
};

export function Button({ href, children, variant = "primary", className = "" }: BtnProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2";
  const styles = {
    primary: "bg-orange text-white shadow-card hover:bg-orange-dark hover:-translate-y-0.5",
    outline: "border border-graphite/20 text-graphite hover:border-orange hover:text-orange",
    "outline-light": "border border-white/30 text-cream hover:border-orange hover:text-orange",
    ghost: "text-graphite hover:text-orange",
  }[variant];
  const external = href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("http");
  if (external) {
    return (
      <a href={href} className={`${base} ${styles} ${className}`}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span className={`eyebrow inline-flex items-center gap-2 ${light ? "text-orange" : "text-orange-dark"}`}>
      <WaveTick />
      {children}
    </span>
  );
}

export function WaveTick({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 14" className={`h-2.5 w-12 ${className}`} aria-hidden="true">
      <path d="M2,7 q5,4 10,0 t10,0 t10,0 t10,0 t10,0" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" />
    </svg>
  );
}

export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={`h-4 w-4 ${className}`} aria-hidden="true">
      <path d="M4 10h12m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
