"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          className={`max-w-6xl mx-auto rounded-full transition-all duration-500 ${
            scrolled
              ? "bg-fyah shadow-2xl shadow-fyah/20"
              : "bg-fyah/95 backdrop-blur-md"
          }`}
        >
          <div className="px-4 md:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-6">
                <a
                  href="#menu"
                  className="lg:hidden nav-link text-[11px] uppercase tracking-[0.2em] text-white/80 hover:text-white transition-colors font-medium"
                >
                  Menu
                </a>
                {leftLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="hidden lg:inline nav-link text-[11px] uppercase tracking-[0.2em] text-white/80 hover:text-white transition-colors font-medium"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <a href="#" className="flex flex-col items-center group absolute left-1/2 -translate-x-1/2">
                <span className="font-[Oswald] text-2xl md:text-3xl font-bold tracking-wider leading-none">
                  <span className="text-white">FYAH</span>
                  <span className="text-white">BUN</span>
                </span>
                <span className="font-[Pacifico] text-[10px] md:text-xs text-white/70 -mt-0.5">
                  Jerk Kitchen
                </span>
              </a>

              <div className="hidden lg:flex items-center gap-6">
                {rightLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="nav-link text-[11px] uppercase tracking-[0.2em] text-white/80 hover:text-white transition-colors font-medium"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#order"
                  className="bg-white hover:bg-cream text-fyah text-[11px] font-semibold px-5 py-2 rounded-full uppercase tracking-[0.15em] transition-all duration-300 hover:shadow-lg"
                >
                  Order Now
                </a>
              </div>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden flex flex-col gap-1.5 p-2 ml-auto"
                aria-label="Toggle menu"
              >
                <span className={`hamburger-line block w-5 h-0.5 bg-white ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
                <span className={`hamburger-line block w-5 h-0.5 bg-white ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`hamburger-line block w-5 h-0.5 bg-white ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
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
            className="fixed inset-0 z-40 bg-fyah/98 backdrop-blur-xl flex flex-col items-center justify-center gap-6"
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
                className="font-[Oswald] text-4xl font-bold text-white hover:text-dark transition-colors uppercase tracking-wider"
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
              className="mt-6 bg-white hover:bg-cream text-fyah font-semibold px-10 py-4 rounded-full uppercase tracking-wider transition-colors"
            >
              Order Now
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
