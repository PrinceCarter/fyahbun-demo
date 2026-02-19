"use client";

import { Reveal } from "./Reveal";
import { InstagramIcon, MailIcon, PhoneIcon } from "./Icons";

export function Footer() {
  return (
    <section id="contact" className="relative overflow-hidden">
      {/* Jamaican flag background image — blurred with overlay */}
      <div className="absolute inset-0">
        <img
          src="/images/jamaican-flag.png"
          alt=""
          className="w-full h-full object-cover blur-sm"
        />
      </div>
      <div className="absolute inset-0 bg-dark/75 backdrop-blur-md" />

      <div className="relative z-10 glow-line" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 md:py-20">
        {/* Brand + socials row on mobile */}
        <div className="flex items-center justify-between md:hidden mb-6">
          <div>
            <span className="font-[Oswald] text-2xl font-bold tracking-wider">
              <span className="text-gold">FYAH</span>
              <span className="text-white">BUN</span>
            </span>
            <p className="font-[Pacifico] text-[10px] text-green/60 -mt-0.5">
              Jerk Kitchen
            </p>
          </div>
          <div className="flex gap-2">
            <a
              href="https://www.instagram.com/fyahbuncreative/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-fyah/20 flex items-center justify-center transition-colors group"
            >
              <InstagramIcon className="w-4 h-4 text-white/50 group-hover:text-fyah transition-colors" />
            </a>
            <a
              href="mailto:fyahbuncreative@gmail.com"
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-gold/20 flex items-center justify-center transition-colors group"
            >
              <MailIcon className="w-4 h-4 text-white/50 group-hover:text-gold transition-colors" />
            </a>
            <a
              href="tel:3478164946"
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-green/20 flex items-center justify-center transition-colors group"
            >
              <PhoneIcon className="w-4 h-4 text-white/50 group-hover:text-green transition-colors" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
          {/* Brand column — desktop only */}
          <div className="hidden md:block md:col-span-1">
            <Reveal>
              <div className="mb-6">
                <span className="font-[Oswald] text-3xl font-bold tracking-wider">
                  <span className="text-gold">FYAH</span>
                  <span className="text-white">BUN</span>
                </span>
                <p className="font-[Pacifico] text-xs text-green/60 mt-0.5">
                  Jerk Kitchen
                </p>
              </div>
              <p className="text-white/40 leading-relaxed text-sm">
                Modern Jamaican food with authentic flavors. Crafted with care.
                Served with pride.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex gap-3 mt-6">
                <a
                  href="https://www.instagram.com/fyahbuncreative/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-fyah/20 flex items-center justify-center transition-colors group"
                >
                  <InstagramIcon className="w-4 h-4 text-white/50 group-hover:text-fyah transition-colors" />
                </a>
                <a
                  href="mailto:fyahbuncreative@gmail.com"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-gold/20 flex items-center justify-center transition-colors group"
                >
                  <MailIcon className="w-4 h-4 text-white/50 group-hover:text-gold transition-colors" />
                </a>
                <a
                  href="tel:3478164946"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-green/20 flex items-center justify-center transition-colors group"
                >
                  <PhoneIcon className="w-4 h-4 text-white/50 group-hover:text-green transition-colors" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-[Oswald] text-xs md:text-sm font-bold text-white uppercase tracking-[0.25em] mb-3 md:mb-6">
              Hours
            </h4>
            <div className="space-y-1.5 md:space-y-3 text-white/40 text-xs md:text-sm">
              <p>Tue: 11:30am – 4pm</p>
              <p>Wed: 11:30am – 4pm</p>
              <p>Thu: 11:30am – 4pm</p>
              <p className="text-white/20">Fri – Mon: Closed</p>
            </div>
          </div>

          {/* Find Us */}
          <div>
            <h4 className="font-[Oswald] text-xs md:text-sm font-bold text-white uppercase tracking-[0.25em] mb-3 md:mb-6">
              Find Us
            </h4>
            <div className="space-y-1.5 md:space-y-3 text-white/40 text-xs md:text-sm">
              <p>325 East 48th Street</p>
              <p>New York, NY 10017</p>
              <p>
                <a
                  href="tel:3478164946"
                  className="text-gold hover:text-gold-dark transition-colors"
                >
                  (347) 816-4946
                </a>
              </p>
              <p>
                <a
                  href="mailto:fyahbuncreative@gmail.com"
                  className="text-gold hover:text-gold-dark transition-colors"
                >
                  fyahbuncreative@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-[Oswald] text-xs md:text-sm font-bold text-white uppercase tracking-[0.25em] mb-3 md:mb-6">
              Quick Links
            </h4>
            <div className="flex flex-wrap gap-x-6 gap-y-1.5 md:flex-col md:gap-y-3">
              {["About", "Menu", "Catering"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-white/40 text-xs md:text-sm hover:text-gold transition-colors"
                >
                  {link}
                </a>
              ))}
              <a
                href="#order"
                className="text-fyah text-xs md:text-sm font-semibold hover:text-gold transition-colors"
              >
                Order Now →
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-16 pt-6 md:pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4">
          <p className="text-white/20 text-[10px] md:text-xs">
            © 2026 Fyahbun Creative. All rights reserved.
          </p>
          <p className="text-white/15 text-[10px] md:text-xs">
            Website by{" "}
            <a
              href="https://asabove.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-gold transition-colors"
            >
              As Above Web Design
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
