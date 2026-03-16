"use client";

import { motion } from "motion/react";
import { useRef, useEffect, useCallback, useMemo, useState } from "react";
import { ImageWithFallback } from "@/components/ImageWithFallback";

// Partner logos (30 total)
const allPartners = [
  { id: 1, name: "Olayan Group", logo: "/images/partners/01_Olayan_Group.webp" },
  { id: 2, name: "Schneider Electric", logo: "/images/partners/02_Schneider_Electric.webp" },
  { id: 3, name: "Najeeb Auto Suzuki", logo: "/images/partners/03_Najeeb_Auto_Suzuki.webp" },
  { id: 4, name: "WSM Digital", logo: "/images/partners/04_WSM_Digital.webp" },
  { id: 5, name: "Mokab", logo: "/images/partners/05_Mokab.webp" },
  { id: 6, name: "MyClinic", logo: "/images/partners/06_MyClinic.webp" },
  { id: 7, name: "Al Ahli FC", logo: "/images/partners/07_Al_Ahli_FC.webp" },
  { id: 8, name: "Benchmark", logo: "/images/partners/08_Benchmark.webp" },
  { id: 9, name: "Fuchs KSA", logo: "/images/partners/09_Fuchs_KSA.webp" },
  { id: 10, name: "Milia Travel", logo: "/images/partners/10_Milia_Travel.webp" },
  { id: 11, name: "Al Mousa Group", logo: "/images/partners/11_Al_Mousa_Group.webp" },
  { id: 12, name: "Damanat", logo: "/images/partners/12_Damanat.webp" },
  { id: 13, name: "Daam Broker", logo: "/images/partners/13_Daam_Broker.webp" },
  { id: 14, name: "Munera Alessa", logo: "/images/partners/14_Munera_Alessa.webp" },
  { id: 15, name: "Somer", logo: "/images/partners/15_Somer.webp" },
  { id: 16, name: "Napco National", logo: "/images/partners/16_Napco_National.webp" },
  { id: 17, name: "Saudi Binladen Group", logo: "/images/partners/17_Saudi_Binladen_Group.webp" },
  { id: 18, name: "Glamera", logo: "/images/partners/18_Glamera.webp" },
  { id: 19, name: "Sharq Jeddah Association", logo: "/images/partners/19_Sharq_Jeddah_Association.webp" },
  { id: 20, name: "Olayan Group Alt", logo: "/images/partners/20_Olayan_Group_Alt.webp" },
  { id: 21, name: "Najeeb Auto Suzuki Alt", logo: "/images/partners/21_Najeeb_Auto_Suzuki_Alt.webp" },
  { id: 22, name: "WSM Digital Alt", logo: "/images/partners/22_WSM_Digital_Alt.webp" },
  { id: 23, name: "Benchmark Strategy", logo: "/images/partners/23_Benchmark_Strategy.webp" },
  { id: 24, name: "Fuchs KSA Alt", logo: "/images/partners/24_Fuchs_KSA_Alt.webp" },
  { id: 25, name: "Damanat Alt", logo: "/images/partners/25_Damanat_Alt.webp" },
  { id: 26, name: "Napco National Alt", logo: "/images/partners/26_Napco_National_Alt.webp" },
  { id: 27, name: "Binladin Holding", logo: "/images/partners/27_Binladin_Holding.webp" },
  { id: 28, name: "Glamera Alt", logo: "/images/partners/28_Glamera_Alt.webp" },
  { id: 29, name: "Bahja Events", logo: "/images/partners/29_Bahja_Events.webp" },
  { id: 30, name: "Hamat Leading", logo: "/images/partners/30_Hamat_Leading.webp" },
];

/* ─── Partner Card ─── */
function PartnerCard({ partner }: { partner: (typeof allPartners)[0] }) {
  return (
    <div
      className="marquee-item flex-shrink-0 select-none px-2 sm:px-3"
      style={{ width: "clamp(120px, 22vw, 160px)" }}
    >
      <div
        className="relative h-16 sm:h-20 rounded-xl flex items-center justify-center transition-all duration-300 hover:border-[rgba(184,134,11,0.4)] group"
        style={{
          background: "rgba(20,16,6,0.4)",
          border: "1px solid rgba(184,134,11,0.12)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center p-1.5 group-hover:opacity-100 transition-opacity duration-300">
          <ImageWithFallback
            src={partner.logo}
            alt={partner.name}
            className="w-full h-full object-contain brightness-110 contrast-110 group-hover:brightness-125 transition-all duration-500"
            loading="lazy"
            width={60}
            height={60}
            quality={80}
          />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Infinite Seamless Marquee Row
   
   The "prayer beads" technique:
   - Render items N times (enough to cover viewport + overflow)
   - Use requestAnimationFrame for GPU-accelerated translate3d
   - When the track moves exactly one "set width", snap back instantly
   - The snap is invisible because the duplicate set looks identical
   - Result: endless smooth scroll with ZERO gaps, ever.
   ───────────────────────────────────────────────────────── */

interface MarqueeRowProps {
  items: typeof allPartners;
  /** Pixels per second */
  speed?: number;
  /** Visual direction: "left" = items flow leftward, "right" = items flow rightward */
  direction?: "left" | "right";
}

function MarqueeRow({ items, speed = 40, direction = "left" }: MarqueeRowProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>(0);
  const offset = useRef(0);
  const lastTime = useRef(0);
  const isPaused = useRef(false);
  const singleSetWidth = useRef(0);
  const [ready, setReady] = useState(false);

  // Render items 4x to guarantee seamless coverage on ultra-wide screens
  const repeatedItems = useMemo(
    () => [...items, ...items, ...items, ...items],
    [items]
  );

  /* ── Measure one complete set of items ── */
  const measure = useCallback(() => {
    if (!trackRef.current) return;
    const allItems = trackRef.current.querySelectorAll(".marquee-item");
    const perSet = items.length;
    let w = 0;
    for (let i = 0; i < perSet && i < allItems.length; i++) {
      w += (allItems[i] as HTMLElement).offsetWidth;
    }
    singleSetWidth.current = w;

    // For "right" direction, start at -singleSetWidth so items
    // are pre-scrolled and there's content to the left of viewport
    if (direction === "right" && offset.current === 0 && w > 0) {
      offset.current = -w;
    }

    setReady(true);
  }, [items.length, direction]);

  useEffect(() => {
    // Wait a frame for layout to settle, then measure
    const raf = requestAnimationFrame(() => measure());
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [measure]);

  /* ── Core animation loop (requestAnimationFrame) ── */
  useEffect(() => {
    const animate = (now: number) => {
      if (!lastTime.current) {
        lastTime.current = now;
      }
      const delta = now - lastTime.current;
      lastTime.current = now;

      const setW = singleSetWidth.current;

      if (!isPaused.current && setW > 0 && trackRef.current) {
        const moveBy = speed * (delta / 1000);

        if (direction === "left") {
          // Moving left: offset decreases
          offset.current -= moveBy;
          // Once we've moved past one full set, snap forward
          if (offset.current <= -setW) {
            offset.current += setW;
          }
        } else {
          // Moving right: offset increases
          offset.current += moveBy;
          // Once we've moved past 0 (from starting at -setW), snap back
          if (offset.current >= 0) {
            offset.current -= setW;
          }
        }

        trackRef.current.style.transform = `translate3d(${offset.current}px, 0, 0)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [speed, direction]);

  /* ── Pause on hover / touch ── */
  const handlePause = useCallback(() => {
    isPaused.current = true;
  }, []);

  const handleResume = useCallback(() => {
    isPaused.current = false;
    lastTime.current = 0; // reset delta to prevent jump
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative overflow-hidden py-2"
      dir="ltr" /* Force LTR so translate direction is consistent */
      onMouseEnter={handlePause}
      onMouseLeave={handleResume}
      onTouchStart={handlePause}
      onTouchEnd={handleResume}
      style={{ opacity: ready ? 1 : 0, transition: "opacity 0.3s ease" }}
    >
      <div
        ref={trackRef}
        className="flex will-change-transform"
        style={{ transform: "translate3d(0px, 0, 0)" }}
      >
        {repeatedItems.map((partner, i) => (
          <PartnerCard
            key={`${partner.id}-r${Math.floor(i / items.length)}-${i % items.length}`}
            partner={partner}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Main Partners Marquee Section ─── */
export function PartnersMarquee() {
  const firstRow = useMemo(() => allPartners.slice(0, 15), []);
  const secondRow = useMemo(() => allPartners.slice(15, 30), []);

  return (
    <section
      className="py-12 sm:py-16 px-4 overflow-hidden contain-paint bg-[#0f0f0f]"
      aria-label="شركاء النجاح"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-8 sm:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p
            className="text-[#B8860B] mb-2 text-center"
            style={{ fontSize: "0.7rem", letterSpacing: "0.3em", fontWeight: 600 }}
          >
            ✦ نثق بهم ويثقون بنا ✦
          </p>
          <h2
            className="text-[#F5F5DC] text-center font-amiri"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.4rem)",
              fontWeight: 800,
              lineHeight: 1.2,
            }}
          >
            شركاء النجاح
          </h2>
          <div
            className="mt-3 mb-1 rounded-full mx-auto"
            style={{
              width: 60,
              height: 2,
              background:
                "linear-gradient(90deg, transparent, #B8860B 30%, #D4A017 60%, transparent)",
            }}
          />
        </motion.div>
      </div>

      {/* Marquee Rows */}
      <div className="relative space-y-4 sm:space-y-6">
        {/* Fade edges for cinematic look */}
        <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#0f0f0f] to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#0f0f0f] to-transparent z-20 pointer-events-none" />

        {/* Row 1 — flows leftward */}
        <MarqueeRow items={firstRow} speed={45} direction="left" />

        {/* Row 2 — flows rightward (opposite for visual contrast) */}
        <MarqueeRow items={secondRow} speed={35} direction="right" />
      </div>

      {/* Hint */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-[#F5F5DC]/30 text-[10px] sm:text-xs text-center mt-8 font-ibm-plex-arabic tracking-wide"
      >
        مرر الماوس فوق الشريط لإيقاف الحركة مؤقتاً
      </motion.p>
    </section>
  );
}
