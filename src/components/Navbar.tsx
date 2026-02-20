"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionTemplate } from "framer-motion";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  const heroEnd = typeof window !== "undefined" ? window.innerHeight * 0.7 : 700;
  const transitionRange = 300;

  const progress = useTransform(scrollY, [heroEnd, heroEnd + transitionRange], [0, 1]);

  const navBg = useTransform(progress, [0, 1], ["rgba(255,255,255,0.15)", "rgba(255,255,255,0.85)"]);
  const borderColor = useTransform(progress, [0, 1], ["rgba(255,255,255,0.3)", "rgba(0,0,0,0.08)"]);
  const textColor = useTransform(progress, [0, 1], ["rgba(255,255,255,0.85)", "rgba(30,30,30,0.7)"]);
  const logoColor = useTransform(progress, [0, 1], ["rgba(255,255,255,1)", "rgba(30,30,30,1)"]);
  const hamburgerColor = useTransform(progress, [0, 1], ["rgba(255,255,255,1)", "rgba(30,30,30,1)"]);
  const shadowOpacity = useTransform(progress, [0, 1], [0.05, 0.15]);
  const shadow = useMotionTemplate`0 10px 40px rgba(0,0,0,${shadowOpacity})`;

  const leftLinks = [
    { label: "Menu", href: "#menu" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];
  const rightLinks = [
    { label: "Catering", href: "#catering" },
  ];
  const allLinks = [...leftLinks, ...rightLinks];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 pt-4">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            backgroundColor: navBg,
            borderColor: borderColor,
            boxShadow: shadow,
          }}
          className="max-w-6xl mx-auto rounded-full backdrop-blur-3xl backdrop-saturate-200 border"
        >
          <div className="px-4 md:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-6">
                <motion.a
                  href="#menu"
                  style={{ color: textColor }}
                  className="lg:hidden nav-link text-[11px] uppercase tracking-[0.2em] font-medium"
                >
                  Menu
                </motion.a>
                {leftLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    style={{ color: textColor }}
                    className="hidden lg:inline nav-link text-[11px] uppercase tracking-[0.2em] font-medium"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>

              <a href="#" className="flex flex-col items-center group absolute left-1/2 -translate-x-1/2">
                <span className="font-[Oswald] text-2xl md:text-3xl font-bold tracking-wider leading-none">
                  <span className="text-gold">FYAH</span>
                  <motion.span style={{ color: logoColor }}>BUN</motion.span>
                </span>
                <span className="font-[Pacifico] text-[10px] md:text-xs text-green/80 -mt-0.5">
                  Jerk Kitchen
                </span>
              </a>

              <div className="hidden lg:flex items-center gap-6">
                {rightLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    style={{ color: textColor }}
                    className="nav-link text-[11px] uppercase tracking-[0.2em] font-medium"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <a
                  href="#order"
                  className="bg-fyah hover:bg-fyah-dark text-white text-[11px] font-semibold px-5 py-2 rounded-full uppercase tracking-[0.15em] transition-all duration-300 hover:shadow-lg"
                >
                  Order Now
                </a>
              </div>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden flex flex-col gap-1.5 p-2 ml-auto"
                aria-label="Toggle menu"
              >
                <motion.span style={{ backgroundColor: hamburgerColor }} className={`block w-5 h-0.5 transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
                <motion.span style={{ backgroundColor: hamburgerColor }} className={`block w-5 h-0.5 transition-transform ${menuOpen ? "opacity-0" : ""}`} />
                <motion.span style={{ backgroundColor: hamburgerColor }} className={`block w-5 h-0.5 transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
              </button>
            </div>
          </div>
        </motion.nav>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-dark/80 backdrop-blur-2xl flex flex-col items-center justify-center gap-6"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-white text-2xl"
              aria-label="Close menu"
            >
              &times;
            </button>

            <span className="font-[Pacifico] text-white/80 text-xl mb-4">Jerk Kitchen</span>

            {allLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="font-[Oswald] text-4xl font-bold text-white hover:text-fyah transition-colors uppercase tracking-wider"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#order"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-6 bg-fyah hover:bg-fyah-dark text-white font-semibold px-10 py-4 rounded-full uppercase tracking-wider transition-colors"
            >
              Order Now
            </motion.a>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-2"
            >
              <a href="tel:3478164946" className="text-white/40 text-sm hover:text-gold transition-colors">
                (347) 816-4946
              </a>
              <a
                href="https://www.instagram.com/fyahbuncreative/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 text-sm hover:text-fyah transition-colors"
              >
                @fyahbuncreative
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
