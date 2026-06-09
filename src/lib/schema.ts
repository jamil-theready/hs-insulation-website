import { site, services, serviceAreas } from "./site";

const areaServed = serviceAreas.map((a) => ({
  "@type": "City",
  name: a.city,
}));

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": `${site.url}/#business`,
    name: site.brand,
    legalName: site.legalName,
    description: `Insulation contractor serving ${site.region} since ${site.since}. Spray foam, blown-in, batt insulation and old insulation removal.`,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    image: `${site.url}/images/og/og-image.svg`,
    priceRange: "$$",
    foundingDate: site.since,
    knowsLanguage: ["en", "es"],
    address: {
      "@type": "PostalAddress",
      addressLocality: site.baseCity,
      addressRegion: site.state,
      postalCode: site.zip,
      addressCountry: "US",
    },
    areaServed,
    openingHours: "Mo-Sa 07:00-18:00",
    sameAs: [site.social.facebook, site.social.instagram].filter(Boolean),
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.name },
    })),
  };
}

export function serviceSchema(serviceName: string, description: string, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description,
    serviceType: serviceName,
    provider: { "@id": `${site.url}/#business` },
    areaServed,
    url: `${site.url}/services/${slug}`,
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function blogPostingSchema(post: {
  title: string;
  description: string;
  slug: string;
  date: string;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: { "@id": `${site.url}/#business` },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };
}
