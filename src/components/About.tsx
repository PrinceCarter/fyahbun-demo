"use client";

import { Reveal } from "./Reveal";
import { Marquee } from "./Marquee";

export function About() {
  return (
    <section id="about" className="overflow-hidden">
      <div className="bg-cream py-24 md:py-32 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-center gap-6 md:gap-10">
            <Reveal direction="right" className="hidden md:block shrink-0">
              <div className="w-28 h-28 lg:w-36 lg:h-36 rounded-full overflow-hidden border-4 border-fyah/20 shadow-xl -rotate-6">
                <img
                  src="https://zimmysnook.ca/wp-content/uploads/2025/01/DSC_1315-e1738328453534.jpg"
                  alt="Jerk chicken grilling"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>

            <div className="text-center max-w-2xl relative">
              <Reveal>
                <span className="inline-block bg-fyah text-white text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded mb-6 font-[Oswald]">
                  About Us
                </span>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-[Oswald] text-4xl md:text-6xl lg:text-7xl font-bold text-dark leading-none uppercase mb-6">
                  AUTHENTIC <span className="text-fyah">JAMAICAN FLAVOUR</span>{" "}
                  IN THE BIG APPLE
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-dark/60 text-base md:text-lg leading-relaxed">
                  Fyahbun Creative brings the taste and spice of authentic
                  Jamaican food to New York City. Jerk seasoning, curry, scotch
                  bonnet pepper, lots of herbs and sunshine — every plate is
                  packed with island heat and soul.
                </p>
              </Reveal>
            </div>

            <Reveal direction="left" className="hidden md:block shrink-0">
              <div className="w-28 h-28 lg:w-36 lg:h-36 rounded-full overflow-hidden border-4 border-gold/20 shadow-xl rotate-6">
                <img
                  src="https://images.pexels.com/photos/374710/pexels-photo-374710.jpeg"
                  alt="Caribbean spices"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.4}>
            <div className="flex justify-center mt-10">
              <a
                href="#menu"
                className="w-12 h-12 rounded-full border-2 border-dark/20 hover:border-fyah hover:bg-fyah/10 flex items-center justify-center transition-all duration-300 group"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="text-dark/60 group-hover:text-fyah transition-colors"
                >
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <Marquee
        text="FYAHBUN JERK KITCHEN · MIDTOWN MANHATTAN"
        className="py-3 bg-dark text-white font-bold"
      />
      <Marquee
        text="JERK CHICKEN · CURRY GOAT · OXTAIL · ACKEE & SALTFISH"
        className="py-3 bg-gold text-dark font-bold"
        reverse
      />
      <Marquee
        text="AVAILABLE FOR DELIVERY · ORDER NOW · CATERING AVAILABLE"
        className="py-3 bg-green text-white font-bold"
      />
    </section>
  );
}
