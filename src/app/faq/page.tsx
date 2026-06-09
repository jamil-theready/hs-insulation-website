import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import { faqs } from "@/lib/faqs";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "FAQ, Insulation Questions Answered",
  description:
    "Answers to common insulation questions: cost, types, removal, timelines, and service areas. H&S Insulation serving Yuba City and Northern California.",
  alternates: { canonical: "/faq" },
};

export default function FAQPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <PageHero
        eyebrow="Questions"
        title="Insulation questions, answered"
        subtitle="Everything homeowners ask us most, and if you don't see your question, just call. We're happy to help."
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "FAQ", href: "/faq" }]}
      />

      <section className="py-20 sm:py-24">
        <div className="container-x max-w-3xl">
          <Reveal>
            <FAQAccordion faqs={faqs} />
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
