import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Media from "@/components/Media";
import CTASection from "@/components/CTASection";
import { ArrowRight } from "@/components/ui";
import { getAllPostsMeta, formatDate } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog, Insulation Tips for NorCal Homeowners",
  description:
    "Practical insulation advice for Northern California homeowners, energy savings, attic upgrades, spray foam, and knowing when it's time for new insulation.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  const posts = getAllPostsMeta();
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero
        eyebrow="The blog"
        title="Insulation tips for NorCal homeowners"
        subtitle="Practical, no-nonsense advice on keeping your home comfortable and your energy bills down."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }]}
      />

      <section className="py-20 sm:py-24">
        <div className="container-x">
          {posts.length === 0 && (
            <p className="text-center text-[#4a4d51]">New articles coming soon. Check back shortly.</p>
          )}

          {featured && (
            <Reveal>
              <Link href={`/blog/${featured.slug}`} className="group grid gap-6 overflow-hidden rounded-3xl border border-line bg-white shadow-card transition-all hover:shadow-lift lg:grid-cols-2">
                <Media src={featured.cover} alt={featured.title} rounded="rounded-none" className="aspect-[16/10] lg:aspect-auto lg:h-full" />
                <div className="flex flex-col justify-center p-7 sm:p-10">
                  <span className="text-xs font-semibold uppercase tracking-wider text-orange-dark">{featured.category}</span>
                  <h2 className="font-display mt-3 text-2xl font-bold text-graphite group-hover:text-orange-dark sm:text-3xl">{featured.title}</h2>
                  <p className="mt-3 text-[#4a4d51]">{featured.description}</p>
                  <div className="mt-5 flex items-center gap-3 text-sm text-muted">
                    <span>{formatDate(featured.date)}</span>
                    <span>·</span>
                    <span>{featured.readingTime} min read</span>
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-dark">
                    Read article <ArrowRight className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          )}

          {rest.length > 0 && (
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.06}>
                  <Link href={`/blog/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-lift">
                    <Media src={p.cover} alt={p.title} rounded="rounded-none" className="aspect-[16/10]" />
                    <div className="flex flex-1 flex-col p-6">
                      <span className="text-xs font-semibold uppercase tracking-wider text-orange-dark">{p.category}</span>
                      <h3 className="font-display mt-2 text-lg font-bold text-graphite group-hover:text-orange-dark">{p.title}</h3>
                      <p className="mt-2 flex-1 text-sm text-[#4a4d51]">{p.description}</p>
                      <div className="mt-4 flex items-center gap-2 text-xs text-muted">
                        <span>{formatDate(p.date)}</span><span>·</span><span>{p.readingTime} min</span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
