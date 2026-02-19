"use client";

export function Marquee({
  text,
  className = "",
  reverse = false,
  speed = "normal",
  separator = "◆",
}: {
  text: string;
  className?: string;
  reverse?: boolean;
  speed?: "slow" | "normal" | "fast";
  separator?: string;
}) {
  const items = Array(12).fill(text);
  const speedClass =
    speed === "slow"
      ? "animate-marquee-slow"
      : speed === "fast"
        ? "animate-marquee-fast"
        : "animate-marquee";
  const animClass = reverse ? "animate-marquee-reverse" : speedClass;

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div className={`${animClass} inline-flex items-center`}>
        {items.map((t, i) => (
          <span
            key={i}
            className="mx-6 text-lg md:text-2xl font-[Oswald] uppercase tracking-[0.2em] font-bold"
          >
            {t} <span className="mx-3 opacity-70">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
