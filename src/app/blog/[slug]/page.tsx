import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Media from "@/components/Media";
import CTASection from "@/components/CTASection";
import ShareBar from "@/components/ShareBar";
import JsonLd from "@/components/JsonLd";
import { ArrowRight } from "@/components/ui";
import Image from "next/image";
import { getPost, getPostSlugs, getAllPostsMeta, formatDate } from "@/lib/content";
import { blogPostingSchema, breadcrumbSchema } from "@/lib/schema";
import { authorByName } from "@/lib/authors";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      images: [{ url: post.cover }],
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getAllPostsMeta().filter((p) => p.slug !== post.slug).slice(0, 3);
  const author = authorByName(post.author);

  return (
    <>
      <JsonLd
        data={[
          blogPostingSchema({
            title: post.title,
            description: post.description,
            slug: post.slug,
            date: post.date,
            author: post.author,
            authorUrl: `${site.url}/author/${author.slug}`,
            authorImage: author.avatar,
            image: post.cover,
          }),
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Blog", url: `${site.url}/blog` },
            { name: post.title, url: `${site.url}/blog/${post.slug}` },
          ]),
        ]}
      />
      <PageHero
        eyebrow={post.category}
        title={post.title}
        subtitle={`${formatDate(post.date)} · ${post.readingTime} min read · By ${post.author}`}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: post.category, href: "/blog" },
        ]}
      />

      <article className="py-16 sm:py-20">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-12">
            {/* LEFT: sticky social share */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <ShareBar slug={post.slug} title={post.title} />
              </div>
            </div>

            {/* CENTER: article */}
            <div className="lg:col-span-8">
              <Media src={post.cover} alt={post.title} className="aspect-[16/9]" priority />
              {/* Byline */}
              <div className="mt-6 flex items-center gap-3">
                <Link href={`/author/${author.slug}`} className="flex items-center gap-3 group">
                  <span className="relative h-10 w-10 overflow-hidden rounded-full border border-line bg-graphite">
                    <Image src={author.avatar} alt={author.name} width={40} height={40} className="h-full w-full object-cover" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-graphite group-hover:text-orange-dark">{author.name}</span>
                    <span className="block text-xs text-muted">{author.role} · {formatDate(post.date)}</span>
                  </span>
                </Link>
              </div>

              <div className="prose-hs mt-8 max-w-none" dangerouslySetInnerHTML={{ __html: post.html }} />

              {/* Author bio box (E-E-A-T) */}
              <div className="mt-12 flex flex-col gap-4 rounded-2xl border border-line bg-cream-2 p-6 sm:flex-row">
                <Link href={`/author/${author.slug}`} className="shrink-0">
                  <span className="relative block h-16 w-16 overflow-hidden rounded-full border border-line bg-graphite">
                    <Image src={author.avatar} alt={author.name} width={64} height={64} className="h-full w-full object-cover" />
                  </span>
                </Link>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">Written by</p>
                  <Link href={`/author/${author.slug}`} className="font-display text-lg font-bold text-graphite hover:text-orange-dark">{author.name}</Link>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#4a4d51]">{author.bio}</p>
                </div>
              </div>

              {/* CTA card */}
              <div className="mt-12 rounded-2xl bg-ink p-8 text-center">
                <h3 className="font-display text-xl font-bold text-cream">Think your home needs an upgrade?</h3>
                <p className="mt-2 text-sm text-cream/65">Get a free, no-pressure estimate from a local crew you can trust.</p>
                <a href={site.phoneHref} className="mt-5 inline-flex items-center justify-center rounded-full bg-orange px-7 py-3 text-sm font-semibold text-white hover:bg-orange-dark">
                  Call {site.phone}
                </a>
              </div>
            </div>

            {/* RIGHT: sticky jump-to-section */}
            <aside className="hidden lg:col-span-3 lg:block">
              {post.toc.length > 0 && (
                <div className="sticky top-24">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">On this page</p>
                  <ul className="mt-4 space-y-2.5 border-l border-line">
                    {post.toc.map((t) => (
                      <li key={t.id}>
                        <a href={`#${t.id}`} className="-ml-px block border-l-2 border-transparent pl-4 text-sm text-[#4a4d51] transition-colors hover:border-orange hover:text-orange-dark">
                          {t.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </article>

      {/* RELATED: below */}
      {related.length > 0 && (
        <section className="border-t border-line bg-cream-2 py-16">
          <div className="container-x">
            <h2 className="font-display text-2xl font-bold text-graphite">Keep reading</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-lift">
                  <Media src={p.cover} alt={p.title} rounded="rounded-none" className="aspect-[16/10]" />
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-base font-bold text-graphite group-hover:text-orange-dark">{p.title}</h3>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-dark">
                      Read <ArrowRight className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
