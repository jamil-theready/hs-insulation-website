import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How H&S Insulation collects, uses, and protects your information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Privacy Policy", href: "/privacy-policy" }]}
      />
      <section className="py-16 sm:py-20">
        <div className="prose-hs container-x max-w-3xl">
          <p>Last updated: June 2026.</p>
          <p>
            {site.brand} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy. This policy explains what information we collect through our website and how we use it.
          </p>
          <h2>Information we collect</h2>
          <p>
            When you submit our contact or estimate form, we collect the information you provide, such as your name, phone number, email address, city, and any details about your project. We may also collect basic, anonymous analytics about how visitors use our site.
          </p>
          <h2>How we use your information</h2>
          <p>
            We use your information solely to respond to your inquiry, schedule estimates, and provide our services. We do not sell your information to anyone.
          </p>
          <h2>How we share information</h2>
          <p>
            We may share information with trusted service providers who help us operate our website and communicate with you (for example, our form and email providers). These providers are only permitted to use your information to perform services for us.
          </p>
          <h2>Cookies and analytics</h2>
          <p>
            We use Google Analytics to understand how visitors find and use this site, such as which pages are viewed and which services people are looking for. It sets cookies that record a randomly generated identifier for your browser. We do not use advertising or cross-site tracking cookies, and we do not sell your personal information.
          </p>
          <p>
            You can accept or decline analytics cookies using the banner shown on your first visit, and you can change that choice at any time with the <strong>Cookie Settings</strong> link in the footer of any page. If you decline, we stop analytics collection and remove the analytics cookies already stored in your browser. Visitors in the EU, UK, and Switzerland have analytics disabled by default until they choose to accept.
          </p>
          <h2>Your choices</h2>
          <p>
            You may request that we update or delete your information at any time by contacting us at{" "}
            <a href={site.emailHref}>{site.email}</a> or {site.phone}.
          </p>
          <h2>Contact us</h2>
          <p>
            Questions about this policy? Reach us at <a href={site.emailHref}>{site.email}</a> or call {site.phone}.
          </p>
        </div>
      </section>
    </>
  );
}
