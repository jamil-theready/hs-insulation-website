import Image from "next/image";

/** Static, existing attic image. A warm espresso wash keeps copy readable without cooling or crushing the photo. */
export default function HeroMedia({ poster }: { poster: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#281c18]">
      <Image src={poster} alt="" aria-hidden="true" fill priority sizes="100vw" className="object-cover object-[68%_center] opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#2a1c17]/80 via-[#38241b]/67 via-52% to-[#573420]/22" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2a1c17]/46 via-transparent to-[#4a2d20]/22" />
    </div>
  );
}
