import Image from "next/image";

/** Static, existing attic image. A charcoal wash keeps a calm reading field without a black text slab. */
export default function HeroMedia({ poster }: { poster: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-graphite">
      <Image src={poster} alt="" aria-hidden="true" fill priority sizes="100vw" className="object-cover object-[68%_center] opacity-55" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#171b20]/96 via-[#171b20]/86 via-52% to-[#171b20]/42" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#171b20]/70 via-transparent to-[#171b20]/40" />
    </div>
  );
}
