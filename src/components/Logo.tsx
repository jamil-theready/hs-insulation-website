type Props = {
  variant?: "dark" | "light";
  withWordmark?: boolean;
  className?: string;
  iconClassName?: string;
};

// Layered House mark — house silhouette + 3 orange insulation waves.
export function LogoIcon({
  variant = "dark",
  className = "",
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const house = variant === "light" ? "#f4f1ea" : "#26292d";
  return (
    <svg viewBox="98 30 164 160" className={className} role="img" aria-label="H&S Insulation logo">
      <path
        d="M180,40 L110,96 L110,178 L250,178 L250,96 Z"
        fill="none"
        stroke={house}
        strokeWidth={11}
        strokeLinejoin="round"
      />
      <path d="M132,104 q16,12 32,0 t32,0 t32,0" fill="none" stroke="#F26A21" strokeWidth={8.5} strokeLinecap="round" />
      <path d="M132,124 q16,12 32,0 t32,0 t32,0" fill="none" stroke="#F26A21" strokeWidth={8.5} strokeLinecap="round" />
      <path d="M132,144 q16,12 32,0 t32,0 t32,0" fill="none" stroke="#F26A21" strokeWidth={8.5} strokeLinecap="round" />
    </svg>
  );
}

export default function Logo({ variant = "dark", withWordmark = true, className = "", iconClassName = "" }: Props) {
  const text = variant === "light" ? "text-cream" : "text-graphite";
  const sub = variant === "light" ? "text-muted" : "text-muted";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoIcon variant={variant} className={`h-9 w-9 shrink-0 ${iconClassName}`} />
      {withWordmark && (
        <span className="flex flex-col leading-none">
          <span className={`font-display text-[1.15rem] font-extrabold tracking-tight ${text}`}>
            H&amp;S INSULATION
          </span>
          <span className={`mt-0.5 text-[0.55rem] font-semibold uppercase tracking-[0.28em] ${sub}`}>
            NorCal · Since 2020
          </span>
        </span>
      )}
    </span>
  );
}
