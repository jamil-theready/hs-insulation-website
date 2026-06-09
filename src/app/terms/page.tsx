import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing your use of the H&S Insulation website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        title="Terms of Service"
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Terms", href: "/terms" }]}
      />
      <section className="py-16 sm:py-20">
        <div className="prose-hs container-x max-w-3xl">
          <p>Last updated: June 2026.</p>
          <p>
            By using the {site.brand} website, you agree to these terms. If you do not agree, please do not use the site.
          </p>
          <h2>Use of this website</h2>
          <p>
            This website is provided for general information about our insulation services. Content may be updated or changed at any time without notice.
          </p>
          <h2>Estimates and services</h2>
          <p>
            Any estimate provided through this website or by phone is preliminary until confirmed in writing after an on-site assessment. Pricing, scope, and timelines are finalized in a written agreement before work begins.
          </p>
          <h2>No warranty</h2>
          <p>
            While we strive for accuracy, the information on this site is provided &ldquo;as is&rdquo; without warranties of any kind. Workmanship warranties, where applicable, are described in your service agreement.
          </p>
          <h2>Limitation of liability</h2>
          <p>
            {site.brand} is not liable for any indirect or incidental damages arising from your use of this website.
          </p>
          <h2>Contact</h2>
          <p>
            Questions about these terms? Contact us at <a href={site.emailHref}>{site.email}</a> or {site.phone}.
          </p>
        </div>
      </section>
    </>
  );
}
