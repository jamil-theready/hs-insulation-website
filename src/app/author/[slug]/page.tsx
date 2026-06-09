import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Media from "@/components/Media";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import { ArrowRight } from "@/components/ui";
import { authors, authorBySlug } from "@/lib/authors";
import { getAllPostsMeta, formatDate } from "@/lib/content";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return authors.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = authorBySlug(slug);
  if (!a) return {};
  return {
    title: `${a.name} — ${a.role}`,
    description: a.bio.slice(0, 155),
    alternates: { canonical: `/author/${a.slug}` },
  };
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = authorBySlug(slug);
  if (!a) notFound();

  const posts = getAllPostsMeta().filter((p) => p.author === a.name);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: a.name,
    jobTitle: a.role,
    description: a.bio,
    image: `${site.url}${a.avatar}`,
    worksFor: { "@id": `${site.url}/#business` },
    url: `${site.url}/author/${a.slug}`,
    knowsLanguage: ["en", "es"],
    ...(a.sameAs.length ? { sameAs: a.sameAs } : {}),
  };

  return (
    <>
      <JsonLd data={personSchema} />
      <PageHero
        eyebrow="Author"
        title={a.name}
        subtitle={a.role}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: a.name, href: `/author/${a.slug}` },
        ]}
      />

      <section className="py-20 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <Reveal>
              <div className="rounded-2xl border border-line bg-cream-2 p-6">
                <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-full border border-line bg-graphite">
                  <Image src={a.avatar} alt={a.name} width={112} height={112} className="h-full w-full object-cover" />
                </div>
                <h2 className="font-display mt-4 text-center text-xl font-bold text-graphite">{a.name}</h2>
                <p className="text-center text-sm text-muted">{a.role}</p>
                <ul className="mt-5 space-y-2.5">
                  {a.credentials.map((c) => (
                    <li key={c} className="flex items-start gap-2.5 text-sm text-[#3a3d41]">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange text-white">
                        <svg viewBox="0 0 20 20" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={3}><path d="M4 10l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </aside>

          <div className="lg:col-span-8">
            <Reveal delay={0.1}>
              <h2 className="font-display text-2xl font-bold text-graphite">About {a.name.split(" ")[0]}</h2>
              <p className="mt-4 text-lg leading-relaxed text-[#4a4d51]">{a.bio}</p>
            </Reveal>

            {posts.length > 0 && (
              <div className="mt-12">
                <h3 className="font-display text-xl font-bold text-graphite">Articles by {a.name.split(" ")[0]}</h3>
                <div className="mt-5 space-y-4">
                  {posts.map((p) => (
                    <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-4 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lift">
                      <Media src={p.cover} alt={p.title} rounded="rounded-xl" className="h-16 w-24 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="font-display font-bold text-graphite group-hover:text-orange-dark">{p.title}</p>
                        <p className="mt-1 text-xs text-muted">{formatDate(p.date)} · {p.readingTime} min read</p>
                      </div>
                      <ArrowRight className="hidden text-muted transition-transform group-hover:translate-x-1 group-hover:text-orange sm:block" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
