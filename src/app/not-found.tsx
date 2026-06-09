import Link from "next/link";
import { LogoIcon } from "@/components/Logo";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-cream-2 py-20">
      <div className="container-x max-w-xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-card">
          <LogoIcon className="h-11 w-11" />
        </div>
        <p className="font-display mt-6 text-5xl font-extrabold text-orange">404</p>
        <h1 className="font-display mt-2 text-2xl font-bold text-graphite sm:text-3xl">
          We couldn&apos;t find that page
        </h1>
        <p className="mt-3 text-[#4a4d51]">
          It may have moved. Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/" className="inline-flex items-center justify-center rounded-full bg-orange px-7 py-3 text-sm font-semibold text-white hover:bg-orange-dark">
            Back to home
          </Link>
          <a href={site.phoneHref} className="inline-flex items-center justify-center rounded-full border border-graphite/20 px-7 py-3 text-sm font-semibold text-graphite hover:border-orange hover:text-orange">
            Call {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
