import Link from "next/link";
import Logo from "./Logo";
import { WaveTick } from "./ui";
import { site, services, serviceAreas } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line-dark bg-ink text-cream/70">
      <div className="container-x grid grid-cols-2 gap-8 pb-12 pt-16 sm:grid-cols-3 lg:grid-cols-5">
        {/* Brand column */}
        <div className="col-span-2 sm:col-span-3 lg:col-span-2">
          <Logo variant="light" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">
            Locally owned insulation contractor serving {site.baseCity} and the NorCal corridor since {site.since}. Spray foam, blown-in, batt, and old insulation removal, done clean.
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
