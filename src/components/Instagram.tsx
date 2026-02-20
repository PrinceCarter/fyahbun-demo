"use client";

import { useState, useEffect } from "react";
import { Reveal } from "./Reveal";
import { InstagramIcon } from "./Icons";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&q=80",
  "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&q=80",
  "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=500&q=80",
  "https://images.unsplash.com/photo-1574484284002-952d92456975?w=500&q=80",
  "https://images.unsplash.com/photo-1607532941433-304659e8198a?w=500&q=80",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80",
  "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=500&q=80",
];

interface IgPhoto {
  image_url: string;
  shortcode: string;
}

export function Instagram() {
  const [photos, setPhotos] = useState<IgPhoto[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/instagram/posts.json")
      .then((r) => r.json())
      .then((localPosts: { shortcode: string; file: string }[]) => {
        if (localPosts?.length > 0) {
          setPhotos(
            localPosts.map((p) => ({
              image_url: p.file,
              shortcode: p.shortcode,
            })),
          );
        }
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const imageUrls =
    photos.length > 0
      ? photos.map((p) => ({
          url: p.image_url,
          link: `https://www.instagram.com/p/${p.shortcode}/`,
        }))
      : FALLBACK_IMAGES.map((url) => ({
          url,
          link: "https://www.instagram.com/fyahbuncreative/",
        }));

  const tilts = [-4, 3, -2, 4, -3, 2, -4, 3];
  const doubled = [...imageUrls, ...imageUrls];

  return (
    <section className="py-24 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-14">
        <div className="text-center relative">
          <Reveal>
            <span className="inline-block bg-fyah/10 text-fyah text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded border border-fyah/20 mb-5 font-[Oswald]">
              Follow Us
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-[Oswald] text-3xl sm:text-5xl md:text-7xl font-bold text-dark uppercase">
              FOLLOW{" "}
              <a
                href="https://www.instagram.com/fyahbuncreative/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-fyah hover:text-fyah-dark transition-colors"
              >
                @FYAHBUN
              </a>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-dark/40 mt-4 max-w-lg mx-auto font-[Pacifico] text-base">
              Keep it irie. Tag us @fyahbun
            </p>
          </Reveal>
        </div>
      </div>

      <div
        className={`overflow-hidden py-10 transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
      >
        <div className="animate-marquee-slow inline-flex gap-6 px-6 items-center">
          {doubled.map((img, i) => (
            <a
              key={`insta-${i}`}
              href={img.link}
              target="_blank"
              rel="noopener noreferrer"
              className="insta-tilt-card relative shrink-0 group"
              style={{
                width: "clamp(220px, 22vw, 300px)",
                height: "clamp(220px, 22vw, 300px)",
                transform: `rotate(${tilts[i % tilts.length]}deg)`,
              }}
            >
              <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                <img
                  src={img.url}
                  alt="@fyahbuncreative on Instagram"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 rounded-2xl bg-dark/0 group-hover:bg-dark/30 transition-colors duration-300 flex items-center justify-center">
                  <InstagramIcon className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-10 h-10" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
