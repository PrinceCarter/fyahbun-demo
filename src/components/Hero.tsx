"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-dvh flex items-end overflow-hidden bg-cream"
    >
      <motion.div
        initial={{ scale: 0.6, borderRadius: "2rem", opacity: 0 }}
        animate={{ scale: 1, borderRadius: "0rem", opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute inset-0 overflow-hidden origin-center"
      >
        <div className="absolute inset-0 [transform:scaleX(-1)]">
          <motion.div
            className="absolute inset-0 bg-cover bg-[30%_center] md:bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1516462886714-8ab794b43fbd?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
              y: bgY,
            }}
          />
        </div>
        <div className="absolute inset-0 bg-dark/30" />
        <div className="absolute inset-0 bg-linear-to-t from-dark/40 via-transparent to-transparent" />
      </motion.div>

      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 pb-14 md:pb-20 w-full"
      >
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="font-[Oswald] text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight text-white text-shadow-hero"
          >
            TASTE DI <br /> <span className="text-fyah">FYAH</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-xl md:text-2xl text-white/90 font-[Pacifico] mt-6 mb-8 max-w-xl leading-relaxed"
          >
            Cause we make the best jerk chicken in town!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <a
              href="#menu"
              className="group bg-fyah hover:bg-fyah-dark text-white font-semibold px-8 py-4 rounded-full uppercase tracking-wider text-sm transition-all duration-300 hover:shadow-lg hover:shadow-fyah/25 flex items-center gap-2"
            >
              Explore Menu
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
            <a
              href="#catering"
              className="bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white px-8 py-4 rounded-full uppercase tracking-wider text-sm transition-all duration-300"
            >
              Catering
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
