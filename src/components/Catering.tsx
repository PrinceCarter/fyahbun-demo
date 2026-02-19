"use client";

import { Reveal } from "./Reveal";

export function Catering() {
  return (
    <section id="catering" className="relative min-h-[85vh] md:min-h-[80vh] overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/grilling.mp4"
      />
      <div className="absolute inset-0 bg-dark/60" />

      <div className="absolute inset-0 z-10 flex items-end justify-center">
        <div className="max-w-7xl w-full mx-auto px-6 pb-16 md:pb-24 pt-48">
          <Reveal>
            <h2 className="font-[Oswald] text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] uppercase mb-5 text-shadow-hero">
              PERFECT FOOD FOR{" "}
              <span className="text-fyah">ANY OCCASION</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-white/80 leading-relaxed mb-8 max-w-lg text-base md:text-lg">
              Delicious meals made with care, using fresh, quality ingredients.
              Perfect for parties, weddings, or any celebration — beautifully
              crafted to impress and satisfy every guest
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <a
              href="tel:3478164946"
              className="inline-flex items-center gap-2 bg-fyah hover:bg-fyah-dark text-white font-semibold px-8 py-4 rounded-full uppercase tracking-wider text-sm transition-all duration-300 hover:shadow-lg hover:shadow-fyah/30"
            >
              Call for Catering
              <span>→</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
