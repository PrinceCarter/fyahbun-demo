"use client";

import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { PhoneIcon } from "./Icons";

const platforms = [
  { label: "DoorDash", href: "https://www.doordash.com", logo: "/images/doordash-logo.png", bg: "#FFFFFF", height: "h-8 md:h-10" },
  { label: "Seamless", href: "https://www.seamless.com", logo: "/images/seamless-logo.png", bg: "#FFFFFF", height: "h-16 md:h-20" },
  { label: "Grubhub", href: "https://www.grubhub.com", logo: "/images/grubhub-logo.png", bg: "#FFFFFF", height: "h-10 md:h-12" },
];

export function OrderSection() {
  return (
    <section id="order" className="py-20 bg-cream overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <h2 className="font-[Oswald] text-5xl md:text-7xl font-bold text-dark text-center mb-4 uppercase">
            Ready Fi Nyam?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-dark/50 text-center text-lg mb-14 max-w-md mx-auto">
            Order through your favourite platform or call us direct for the fastest service.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {platforms.map((p) => (
              <motion.a
                key={p.label}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                style={{ backgroundColor: p.bg }}
                className="rounded-2xl p-6 flex flex-col items-center justify-center hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
              >
                <span className="text-dark/40 text-[10px] uppercase tracking-[0.2em] font-[Oswald] mb-2">Order Online</span>
                <img
                  src={p.logo}
                  alt={p.label}
                  className={`${p.height} object-contain mix-blend-multiply`}
                />
              </motion.a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="text-center">
            <motion.a
              href="tel:3478164946"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-fyah hover:bg-fyah-dark text-white font-semibold px-10 py-4 rounded-full uppercase tracking-wider text-sm transition-all duration-300 hover:shadow-lg hover:shadow-fyah/25"
            >
              <PhoneIcon />
              (347) 816-4946 — Call Direct
            </motion.a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
