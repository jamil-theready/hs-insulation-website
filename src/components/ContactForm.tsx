"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { site, services } from "@/lib/site";

export default function ContactForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        router.push("/thank-you");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputCls =
    "w-full rounded-xl border border-line bg-cream-2 px-4 py-3 text-graphite outline-none transition-colors placeholder:text-muted focus:border-orange focus:bg-white";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="access_key" value={site.web3formsKey} />
      <input type="hidden" name="subject" value="New estimate request, H&S Insulation website" />
      <input type="hidden" name="from_name" value="H&S Insulation Website" />
      {/* Honeypot */}
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-graphite">Name</label>
          <input name="name" required placeholder="Your name" className={inputCls} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-graphite">Phone</label>
          <input name="phone" type="tel" required placeholder="(916) 000-0000" className={inputCls} />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-graphite">Email</label>
        <input name="email" type="email" required placeholder="you@email.com" className={inputCls} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-graphite">City</label>
          <input name="city" placeholder="Yuba City, Marysville…" className={inputCls} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-graphite">Service needed</label>
          <select name="service" className={inputCls} defaultValue="">
            <option value="" disabled>Select a service</option>
            {services.map((s) => (
              <option key={s.slug} value={s.name}>{s.name}</option>
            ))}
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-graphite">How can we help?</label>
        <textarea name="message" rows={4} placeholder="Tell us about your home and what you're noticing…" className={inputCls} />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex w-full items-center justify-center rounded-full bg-orange px-6 py-3.5 text-sm font-semibold text-white shadow-card transition-all hover:bg-orange-dark hover:-translate-y-0.5 disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Sending…" : "Request My Free Estimate"}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong. Please call us at{" "}
          <a href={site.phoneHref} className="font-semibold underline">{site.phone}</a>.
        </p>
      )}
      <p className="text-xs text-muted">
        We&apos;ll never share your information. Prefer to talk? Call{" "}
        <a href={site.phoneHref} className="font-semibold text-graphite underline">{site.phone}</a>.
      </p>
    </form>
  );
}
