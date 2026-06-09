import Link from "next/link";
import { Eyebrow } from "./ui";

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumbs?: { name: string; href: string }[];
}) {
  return (
    <section className="relative overflow-hidden bg-ink">
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.10]" preserveAspectRatio="none" viewBox="0 0 1200 320">
        {[50, 115, 180, 245].map((y) => (
          <path key={y} d={`M-20,${y} q60,38 120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0 t120,0`} fill="none" stroke="#F26A21" strokeWidth={3} strokeLinecap="round" />
        ))}
      </svg>
      <div className="container-x relative py-16 sm:py-20">
        {breadcrumbs && (
          <nav className="mb-5 flex flex-wrap items-center gap-1.5 text-xs text-cream/50">
            {breadcrumbs.map((b, i) => (
              <span key={b.href} className="flex items-center gap-1.5">
                {i > 0 && <span className="text-cream/30">/</span>}
                <Link href={b.href} className="hover:text-orange">{b.name}</Link>
              </span>
            ))}
          </nav>
        )}
        {eyebrow && <Eyebrow light>{eyebrow}</Eyebrow>}
        <h1 className="font-display mt-4 max-w-3xl text-4xl font-extrabold leading-tight text-cream sm:text-5xl">
          {title}
        </h1>
        {subtitle && <p className="mt-4 max-w-2xl text-lg text-cream/70">{subtitle}</p>}
      </div>
    </section>
  );
}
