import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Media from "@/components/Media";
import CTASection from "@/components/CTASection";
import { Eyebrow } from "@/components/ui";
import { LogoIcon } from "@/components/Logo";
import { site } from "@/lib/site";
import { media } from "@/lib/media";

export const metadata: Metadata = {
  title: "About, Locally Owned NorCal Insulation",
  description:
    "H&S Insulation is a locally owned insulation contractor based in Yuba City, serving Northern California since 2016 with honest, clean, professional work in English and Spanish.",
  alternates: { canonical: "/about" },
};

const values = [
  { title: "Honest work", text: "We recommend what your home actually needs, not the most expensive option. If a top-up will do, we'll tell you." },
  { title: "Clean job sites", text: "We mask off your living space, control the dust, and haul away every scrap. You won't know we were there, except for the comfort." },
  { title: "Real expertise", text: "Spray foam, blown-in, batt, and removal, we know which product belongs where, and we install it the right way." },
  { title: "Bilingual service", text: "We proudly serve both English- and Spanish-speaking families, start to finish. Sí, hablamos español." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={`Since ${site.since}`}
        title="Locally owned, NorCal proud"
        subtitle={`Based in ${site.baseCity}, we've been making Northern California homes more comfortable and energy-efficient since ${site.since}.`}
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]}
      />

      <section className="py-20 sm:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <Eyebrow>Our story</Eyebrow>
              <h2 className="font-display mt-4 text-3xl font-extrabold text-graphite sm:text-4xl">
                Built on doing the job right
              </h2>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-[#4a4d51]">
                <p>
                  H&amp;S Insulation started with a simple idea: most homeowners don&apos;t get straight answers about their insulation. They get upsold, rushed, or left with a mess.
                </p>
                <p>
                  We do it differently. We go up in the attic, show you the real problem, and explain your options in plain language. Then we do clean, professional work that actually keeps your home comfortable, through hot valley summers and cold foothill winters alike.
                </p>
                <p>
                  Owned and operated by {site.owner}, we serve homeowners across {site.region} with the kind of service we&apos;d want for our own families.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative">
              <Media src={media.crew} alt="H&S Insulation crew at work" className="aspect-[4/5]" priority />
              <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-line bg-white p-5 shadow-lift sm:block">
                <LogoIcon className="h-10 w-10" />
                <p className="mt-2 font-display text-sm font-bold text-graphite">Since {site.since}</p>
                <p className="text-xs text-muted">Serving {site.region}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-2 py-20 sm:py-24">
        <div className="container-x">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow>What we stand for</Eyebrow>
              <h2 className="font-display mt-4 text-3xl font-extrabold text-graphite sm:text-4xl">
                The H&amp;S difference
              </h2>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06}>
                <div className="flex h-full gap-4 rounded-2xl border border-line bg-white p-6 shadow-card">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-soft">
                    <LogoIcon className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-graphite">{v.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#4a4d51]">{v.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection heading="Work with a crew you can trust" />
    </>
  );
}
