import Image from "next/image";

// Thin wrapper around next/image for our photo slots. Works for both the
// branded SVG placeholders and real raster photos once they're swapped in.
export default function Media({
  src,
  alt,
  className = "",
  imgClassName = "",
  width = 1200,
  height = 800,
  priority = false,
  rounded = "rounded-2xl",
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  rounded?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-graphite ${rounded} ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  );
}
