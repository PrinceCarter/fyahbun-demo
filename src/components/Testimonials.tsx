"use client";

import { Reveal } from "./Reveal";

const reviews = [
  {
    text: "Best jerk chicken I've had outside of Jamaica. The spice level is perfect and you can taste the pimento wood smoke in every bite. This is the real deal.",
    name: "Marcus T.",
    title: "EXACTLY WHAT I NEEDED!",
  },
  {
    text: "We ordered catering for our office holiday party and everyone was blown away. The curry goat and oxtail were incredible. Already planning our next order.",
    name: "Sarah L.",
    title: "ABSOLUTELY DELIGHTED!",
  },
  {
    text: "Finally, authentic Jamaican food in Midtown that doesn't compromise on flavor. The ackee and saltfish brought me right back to Kingston. Bless up!",
    name: "Devon R.",
    title: "LOVED EVERYTHING!",
  },
  {
    text: "The flavors are incredibly bold and fresh. You can taste the care in every dish. The jerk wings are addictive and the festivals are perfectly sweet. Pure vibes!",
    name: "Nicole A.",
    title: "FLAVORFUL & FRESH!",
  },
  {
    text: "This place nailed it. Fast service, beautiful presentation, and food that tasted like it came from a five-star Jamaican kitchen. Highly recommend to anyone who loves real food.",
    name: "Chris D.",
    title: "JUST PERFECT!",
  },
  {
    text: "The oxtail is unbelievable. Tender, rich, and full of flavor. Hands down the best Caribbean food I've found in NYC. My whole family loves this spot.",
    name: "Laura S.",
    title: "WONDERFUL TASTE!",
  },
];

function ReviewCard({ r }: { r: (typeof reviews)[number] }) {
  return (
    <div className="w-[260px] md:w-[280px] flex-shrink-0 bg-white border border-dark/5 rounded-2xl p-7 flex flex-col text-center">
      <div className="flex justify-center gap-0.5 mb-4">
        {[...Array(5)].map((_, j) => (
          <span key={j} className="text-fyah text-sm">
            ★
          </span>
        ))}
      </div>
      <h4 className="font-[Oswald] text-base font-bold text-dark uppercase tracking-wider mb-4">
        {r.title}
      </h4>
      <p className="text-dark/50 leading-relaxed text-[15px] italic flex-1">
        &ldquo;{r.text}&rdquo;
      </p>
      <div className="flex flex-col items-center gap-2 mt-6 pt-5 border-t border-dark/5">
        <div className="w-10 h-10 rounded-full bg-fyah/10 flex items-center justify-center">
          <span className="text-fyah font-bold text-sm">{r.name[0]}</span>
        </div>
        <p className="font-[Oswald] text-dark/70 font-bold text-sm">
          — {r.name}
        </p>
      </div>
    </div>
  );
}

export function Testimonials() {
  const doubled = [...reviews, ...reviews];

  return (
    <section className="py-24 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-14">
        <div className="text-center">
          <Reveal>
            <h2 className="font-[Oswald] text-5xl md:text-7xl font-bold text-dark uppercase">
              GOOD FOLKS THAT ALREADY LOVE{" "}
              <span className="text-fyah">FYAHBUN</span>
            </h2>
          </Reveal>
        </div>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10 bg-linear-to-r from-cream to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10 bg-linear-to-l from-cream to-transparent" />

        <div className="flex gap-6 animate-marquee-testimonials hover:[animation-play-state:paused]">
          {doubled.map((r, i) => (
            <ReviewCard key={`a-${i}`} r={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
