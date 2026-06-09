import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import Media from "@/components/Media";
import CTASection from "@/components/CTASection";
import FAQAccordion from "@/components/FAQAccordion";
import JsonLd from "@/components/JsonLd";
import { LogoIcon } from "@/components/Logo";
import { Button, Eyebrow, WaveTick, ArrowRight } from "@/components/ui";
import { site, services, serviceAreas, trustPoints } from "@/lib/site";
import { media } from "@/lib/media";
import { faqs } from "@/lib/faqs";
import { faqSchema } from "@/lib/schema";

const reasons = [
  { title: "We start clean", text: "Old, contaminated insulation comes out before anything new goes in. No sealing problems under fresh foam." },
  { title: "Honest recommendations", text: "We spec the right product for each space, never an upsell. You'll understand exactly what you're paying for." },
  { title: "On time, every time", text: "We show up when we say we will, work clean, and treat your home like it's our own." },
  { title: "English & Spanish", text: "Every step explained in the language you're most comfortable with. Sí, hablamos español." },
];

const steps = [
  { n: "01", title: "Free estimate", text: "We inspect your attic or walls, measure what's there, and give you a clear written quote, no pressure." },
  { n: "02", title: "Clean install", text: "We mask off your living space, remove old material if needed, and install fresh insulation the right way." },
  { n: "03", title: "Comfortable home", text: "Even temperatures, lower bills, and a quieter house, backed by work you can actually see." },
];

const promises = [
  { title: "A written estimate, free", text: "We inspect your home, measure what's actually there, and hand you a clear written quote, at no cost and with zero obligation." },
  { title: "We show you the problem", text: "We go up in the attic and show you what's really going on, then explain your options in plain language so you can decide with confidence." },
  { title: "We leave it cleaner than we found it", text: "We mask off your living space, control the dust, and haul away every scrap. The only thing you'll notice is the comfort." },
];

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-ink">
        <Image
          src={media.heroPrimary}
          alt="Spray foam insulation being applied in an attic"
          fill
          priority
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/40" />
        <div className="container-x relative grid items-center gap-10 py-20 sm:py-28 lg:grid-cols-12 lg:py-32">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow light>NorCal Insulation · Since {site.since}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="font-display mt-5 text-4xl font-extrabold leading-[1.05] text-cream sm:text-5xl lg:text-6xl">
                A more comfortable home,{" "}
                <span className="text-orange">sealed tight</span> and done clean.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/75">
                Spray foam, blown-in, and batt insulation, plus full removal of old, contaminated material. Serving {site.baseCity}, Marysville, and the foothills up to Tahoe.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={site.phoneHref}>Get a Free Estimate</Button>
                <Button href="/services" variant="outline-light">
                  See What We Do <ArrowRight />
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-cream/60">
                <span className="flex items-center gap-2"><WaveTick className="text-orange" /> Free, no-pressure estimates</span>
                <span className="flex items-center gap-2"><WaveTick className="text-orange" /> English &amp; Spanish</span>
                <span className="flex items-center gap-2"><WaveTick className="text-orange" /> Locally owned</span>
              </div>
            </Reveal>
          </div>

          <div className="hidden lg:col-span-5 lg:block">
            <Reveal delay={0.15}>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
                <LogoIcon variant="light" className="h-14 w-14" />
                <p className="mt-5 font-display text-xl font-bold text-cream">Why homeowners call us first</p>
                <ul className="mt-4 space-y-3 text-sm text-cream/75">
                  {["We go in the attic and show you the real problem", "Right product for each space, no upsells", "Clean job site, every single time", "Quotes you can actually understand"].map((t) => (
                    <li key={t} className="flex gap-3">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                      {t}
                    </li>
                  ))}
                </ul>
                <a href={site.phoneHref} className="mt-6 flex items-center justify-between rounded-xl bg-orange px-4 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">
                  Call {site.phone}
                  <ArrowRight />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <section className="border-b border-line bg-cream-2">
        <div className="container-x grid grid-cols-2 gap-6 py-8 sm:grid-cols-4">
          {trustPoints.map((t) => (
            <div key={t.label} className="text-center">
              <p className="font-display text-2xl font-extrabold text-graphite sm:text-3xl">{t.stat}</p>
              <p className="mt-1 text-xs text-muted sm:text-sm">{t.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="py-20 sm:py-24">
        <div className="container-x">
          <Reveal>
            <div className="max-w-2xl">
              <Eyebrow>What we do</Eyebrow>
              <h2 className="font-display mt-4 text-3xl font-extrabold text-graphite sm:text-4xl">
                Insulation for every part of your home
              </h2>
              <p className="mt-4 text-lg text-[#4a4d51]">
                From a quick attic top-up to a full removal and reinstall, we handle the work that keeps NorCal homes comfortable year-round.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.06}>
                <Link href={`/services/${s.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-lift">
                  <Media src={s.image} alt={s.name} rounded="rounded-none" className="aspect-[4/3]" />
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-lg font-bold text-graphite">{s.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[#4a4d51]">{s.blurb}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-dark">
                      Learn more <ArrowRight className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BEFORE / AFTER ===== */}
      <section className="bg-cream-2 py-20 sm:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <Eyebrow>The difference</Eyebrow>
              <h2 className="font-display mt-4 text-3xl font-extrabold text-graphite sm:text-4xl">
                We don&apos;t cover up the problem, we fix it
              </h2>
              <p className="mt-4 text-lg text-[#4a4d51]">
                Too many attics are stuffed with thin, settled, or rodent-damaged insulation. We remove what&apos;s failing, seal the gaps underneath, and install fresh material that actually performs.
              </p>
              <ul className="mt-6 space-y-3">
                {["Full vacuum removal of old material", "Air sealing the hidden gaps", "Even, modern R-value coverage", "Sealed disposal, no mess left behind"].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-[#3a3d41]">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-soft text-orange-dark">
                      <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M4 10l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button href="/services/insulation-removal" variant="outline">Removal &amp; reinstall <ArrowRight /></Button>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Media src={media.atticBefore} alt="Attic before new insulation" className="aspect-[4/5]" />
                <p className="text-center text-xs font-semibold uppercase tracking-wider text-muted">Before</p>
              </div>
              <div className="space-y-2 pt-8">
                <Media src={media.atticAfter} alt="Attic after fresh insulation" className="aspect-[4/5]" />
                <p className="text-center text-xs font-semibold uppercase tracking-wider text-orange-dark">After</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="py-20 sm:py-24">
        <div className="container-x">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow>Why H&amp;S</Eyebrow>
              <h2 className="font-display mt-4 text-3xl font-extrabold text-graphite sm:text-4xl">
                The most professional insulation crew in the valley
              </h2>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-line bg-white p-6 shadow-card">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-soft">
                    <LogoIcon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-graphite">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#4a4d51]">{r.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="bg-graphite py-20 sm:py-24">
        <div className="container-x">
          <Reveal>
            <div className="max-w-2xl">
              <Eyebrow light>How it works</Eyebrow>
              <h2 className="font-display mt-4 text-3xl font-extrabold text-cream sm:text-4xl">
                Three steps to a comfortable home
              </h2>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-line-dark bg-ink-2 p-7">
                  <span className="font-display text-4xl font-extrabold text-orange">{s.n}</span>
                  <h3 className="mt-4 font-display text-xl font-bold text-cream">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/65">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICE AREAS ===== */}
      <section className="py-20 sm:py-24">
        <div className="container-x">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <div className="max-w-2xl">
                <Eyebrow>Where we work</Eyebrow>
                <h2 className="font-display mt-4 text-3xl font-extrabold text-graphite sm:text-4xl">
                  Serving Yuba City and up the corridor
                </h2>
                <p className="mt-4 text-lg text-[#4a4d51]">
                  From the valley floor to the foothills and Tahoe, if you&apos;re in Northern California, we can help.
                </p>
              </div>
              <Button href="/service-areas" variant="outline">All service areas <ArrowRight /></Button>
            </div>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {serviceAreas.map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.04}>
                <Link href={`/service-areas/${a.slug}`} className="group flex items-center justify-between rounded-xl border border-line bg-white px-4 py-3.5 transition-all hover:border-orange hover:shadow-card">
                  <span className="font-medium text-graphite group-hover:text-orange-dark">{a.city}</span>
                  <ArrowRight className="text-muted transition-all group-hover:translate-x-1 group-hover:text-orange" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== OUR PROMISE ===== */}
      <section className="bg-cream-2 py-20 sm:py-24">
        <div className="container-x">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow>Our promise</Eyebrow>
              <h2 className="font-display mt-4 text-3xl font-extrabold text-graphite sm:text-4xl">
                What you can count on
              </h2>
              <p className="mt-4 text-lg text-[#4a4d51]">
                We&apos;re a newer company building our reputation one clean job at a time. Here&apos;s what every {site.baseCity}-area homeowner gets from us.
              </p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {promises.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.07}>
                <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-card">
                  <span className="font-display text-3xl font-extrabold text-orange">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-display text-lg font-bold text-graphite">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[#4a4d51]">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-20 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div>
              <Eyebrow>Questions</Eyebrow>
              <h2 className="font-display mt-4 text-3xl font-extrabold text-graphite sm:text-4xl">
                Answers before you call
              </h2>
              <p className="mt-4 text-lg text-[#4a4d51]">
                Still not sure? We&apos;re happy to walk you through it with no pressure.
              </p>
              <div className="mt-6">
                <Button href="/faq" variant="outline">See all FAQs <ArrowRight /></Button>
              </div>
            </div>
          </Reveal>
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <FAQAccordion faqs={faqs.slice(0, 5)} />
            </Reveal>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
