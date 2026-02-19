"use client";

import { Reveal } from "./Reveal";

function PimentoIcon() {
  return (
    <svg width="72" height="72" viewBox="0 0 56 56" fill="none" stroke="#E85D26" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M28 48c-8-4-16-14-16-24a16 16 0 0 1 32 0c0 10-8 20-16 24z" />
      <path d="M28 8V4" />
      <path d="M24 6c2-2 6-2 8 0" />
      <path d="M22 28c2-6 6-10 6-16" />
      <path d="M34 28c-2-6-6-10-6-16" />
      <path d="M20 34c3-4 8-6 8-12" />
      <path d="M36 34c-3-4-8-6-8-12" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg width="72" height="72" viewBox="0 0 56 56" fill="none" stroke="#E85D26" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 48C8 48 12 16 44 8c0 0 4 32-28 40z" />
      <path d="M8 48c8-8 18-16 36-40" />
      <path d="M18 38c4-6 10-12 18-18" />
      <path d="M14 42c2-4 6-8 12-12" />
    </svg>
  );
}

function SpiceIcon() {
  return (
    <svg width="72" height="72" viewBox="0 0 56 56" fill="none" stroke="#E85D26" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="28" cy="36" rx="16" ry="10" />
      <path d="M12 36v-6c0-5.5 7.2-10 16-10s16 4.5 16 10v6" />
      <ellipse cx="28" cy="30" rx="16" ry="10" />
      <path d="M20 28c0-2 3.6-4 8-4s8 2 8 4" />
      <circle cx="24" cy="34" r="1.5" fill="#E85D26" stroke="none" />
      <circle cx="32" cy="33" r="1" fill="#E85D26" stroke="none" />
      <circle cx="28" cy="36" r="1.2" fill="#E85D26" stroke="none" />
    </svg>
  );
}

const items = [
  {
    icon: PimentoIcon,
    title: "PIMENTO WOOD GRILLED",
    desc: "Slow-grilled over pimento wood the traditional Jamaican way — smoky, spicy, and falling off the bone.",
  },
  {
    icon: LeafIcon,
    title: "FARM TO TABLE",
    desc: "Seasonal produce from NYC farmers markets. Hormone-free, antibiotic-free ingredients in every dish we serve.",
  },
  {
    icon: SpiceIcon,
    title: "BOLD ISLAND SPICE",
    desc: "Scotch bonnet, jerk seasoning, curry, and Caribbean herbs — authentic island heat and soul in every plate.",
  },
];

export function HowWeCook() {
  return (
    <section className="py-24 bg-cream overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-20">
          <Reveal>
            <h2 className="font-[Oswald] text-5xl md:text-7xl font-bold text-dark uppercase">
              HOW WE MAKE <span className="text-fyah">OUR FOOD</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-20 md:gap-16">
          {items.map((item, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <div className="text-center">
                <div className="flex justify-center mb-8">
                  <item.icon />
                </div>
                <h3 className="font-[Oswald] text-xl md:text-2xl font-bold text-dark mb-4 uppercase tracking-wider whitespace-nowrap">
                  {item.title}
                </h3>
                <p className="text-dark/50 leading-relaxed text-lg font-medium max-w-[300px] mx-auto">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
