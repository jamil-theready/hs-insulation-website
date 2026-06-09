import Link from "next/link";
import Logo from "./Logo";
import { WaveTick } from "./ui";
import { site, services, serviceAreas } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-cream/70">
      {/* CTA banner */}
      <div className="container-x">
        <div className="-mb-px translate-y-[-50%] rounded-3xl bg-orange px-6 py-9 text-center shadow-lift sm:px-12 sm:py-11">
          <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
            Ready for a more comfortable home?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-white/90 sm:text-base">
            Free, no-pressure estimates across {site.region}. We&apos;ll tell you honestly what your home needs — in English or Spanish.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={site.phoneHref}
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-graphite transition-transform hover:-translate-y-0.5"
            >
              Call {site.phone}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/60 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Request an Estimate
            </Link>
          </div>
        </div>
      </div>

      <div className="container-x grid grid-cols-2 gap-8 pb-12 pt-16 sm:grid-cols-3 lg:grid-cols-5">
        {/* Brand column */}
        <div className="col-span-2 sm:col-span-3 lg:col-span-2">
          <Logo variant="light" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">
            Locally owned insulation contractor serving {site.baseCity} and the NorCal corridor since {site.since}. Spray foam, blown-in, batt, and old insulation removal — done clean.
          </p>
          <div className="mt-5 space-y-1.5 text-sm">
            <a href={site.phoneHref} className="block font-semibold text-cream hover:text-orange">{site.phone}</a>
            <a href={site.emailHref} className="block hover:text-orange break-all">{site.email}</a>
            <span className="block text-cream/50">{site.baseCity}, {site.state} {site.zip} · {site.hours}</span>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-cream">Services</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="hover:text-orange">{s.short}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-cream">Service Areas</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {serviceAreas.slice(0, 6).map((a) => (
              <li key={a.slug}>
                <Link href={`/service-areas/${a.slug}`} className="hover:text-orange">{a.city}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-cream">Company</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href="/about" className="hover:text-orange">About</Link></li>
            <li><Link href="/faq" className="hover:text-orange">FAQ</Link></li>
            <li><Link href="/blog" className="hover:text-orange">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-orange">Contact</Link></li>
            <li><Link href="/service-areas" className="hover:text-orange">All Areas</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line-dark">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream/50 sm:flex-row">
          <span className="flex items-center gap-2">
            <WaveTick className="text-orange" /> © {year} {site.brand}. All rights reserved.
          </span>
          <div className="flex items-center gap-5">
            <Link href="/privacy-policy" className="hover:text-orange">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-orange">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
