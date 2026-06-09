"use client";

import { useState } from "react";
import { site } from "@/lib/site";

export default function ShareBar({ slug, title }: { slug: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const url = `${site.url}/blog/${slug}`;
  const enc = encodeURIComponent(url);
  const encT = encodeURIComponent(title);

  const links = [
    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${enc}`, icon: "M13 10h3l.5-3H13V5.2c0-.9.3-1.5 1.6-1.5H16.6V1.1C16.3 1 15.3.9 14.1.9c-2.4 0-4.1 1.5-4.1 4.2V7H7v3h3v8h3z" },
    { name: "X", href: `https://twitter.com/intent/tweet?url=${enc}&text=${encT}`, icon: "M14.2 2H17l-6 6.9L18.2 18H13l-4-5.2L4.3 18H1.5l6.5-7.4L1 2h5.3l3.6 4.8zM13 16.3h1.5L6 3.6H4.4z" },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  }

  return (
    <div className="flex flex-row gap-3 lg:flex-col">
      <span className="hidden text-[0.65rem] font-semibold uppercase tracking-wider text-muted lg:block">Share</span>
      {links.map((l) => (
        <a
          key={l.name}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${l.name}`}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-graphite transition-colors hover:border-orange hover:bg-orange hover:text-white"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path d={l.icon} /></svg>
        </a>
      ))}
      <button
        onClick={copy}
        aria-label="Copy link"
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line text-graphite transition-colors hover:border-orange hover:bg-orange hover:text-white"
      >
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.7} className="h-4 w-4"><path d="M8 12a3 3 0 004.2 0l2.3-2.3a3 3 0 10-4.2-4.2L11 6.5M12 8a3 3 0 00-4.2 0L5.5 10.3a3 3 0 104.2 4.2L11 13.5" strokeLinecap="round" /></svg>
        {copied && <span className="absolute left-12 whitespace-nowrap rounded-md bg-graphite px-2 py-1 text-xs text-white">Copied!</span>}
      </button>
    </div>
  );
}
