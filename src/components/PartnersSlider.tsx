"use client";

import { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";

const partners = [
  { id: 1, name: "أرامكو السعودية", nameEn: "Saudi Aramco", icon: "⬡", color: "#00A651", bg: "#001a0d" },
  { id: 2, name: "الريتز كارلتون", nameEn: "Ritz-Carlton", icon: "♦", color: "#B8860B", bg: "#1a1305" },
  { id: 3, name: "موسم الرياض", nameEn: "Riyadh Season", icon: "✦", color: "#E8C84A", bg: "#1a1600" },
  { id: 4, name: "نيوم", nameEn: "NEOM", icon: "◈", color: "#00BFFF", bg: "#00101a" },
  { id: 5, name: "مجموعة المملكة", nameEn: "Kingdom Holdings", icon: "▲", color: "#C0A030", bg: "#1a1408" },
  { id: 6, name: "هيئة الأفلام", nameEn: "Film Commission", icon: "◉", color: "#FF6B35", bg: "#1a0c00" },
  { id: 7, name: "مطار الملك عبدالعزيز", nameEn: "KAIA", icon: "✈", color: "#5B9BD5", bg: "#000d1a" },
  { id: 8, name: "Vision 2030", nameEn: "Vision 2030", icon: "◎", color: "#009C5B", bg: "#001a0e" },
  { id: 9, name: "فندق الفيصلية", nameEn: "Al Faisaliyah Hotel", icon: "◆", color: "#B8860B", bg: "#1a1305" },
  { id: 10, name: "شركة STC", nameEn: "STC Group", icon: "⬟", color: "#7C3AED", bg: "#0d0018" },
];

function PartnerCard({ partner }: { partner: (typeof partners)[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="flex-shrink-0 select-none" style={{ width: "clamp(130px, 35vw, 200px)" }}>
      <motion.div
        className="relative h-24 sm:h-28 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-grab active:cursor-grabbing transition-all duration-400"
        style={{
          background: hovered ? `linear-gradient(135deg, ${partner.bg}, rgba(25,20,8,0.9))` : "rgba(20,16,6,0.7)",
          border: hovered ? `1px solid ${partner.color}55` : "1px solid rgba(184,134,11,0.1)",
          boxShadow: hovered ? `0 8px 30px ${partner.color}22` : "none",
        }}
        whileTap={{ scale: 0.97 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
      >
        <motion.div className="flex items-center justify-center w-10 h-10 rounded-xl" style={{ background: hovered ? `${partner.color}18` : "rgba(184,134,11,0.08)", color: hovered ? partner.color : "rgba(184,134,11,0.5)", fontSize: "1.4rem", transition: "all 0.3s" }}>
          {partner.icon}
        </motion.div>
        <div className="text-center px-3">
          <p style={{ color: hovered ? "#F5F5DC" : "rgba(245,245,220,0.4)", fontSize: "0.75rem", fontWeight: 600, transition: "color 0.3s", lineHeight: 1.3 }}>{partner.name}</p>
          <p style={{ color: hovered ? partner.color : "rgba(245,245,220,0.2)", fontSize: "0.55rem", letterSpacing: "0.1em", transition: "color 0.3s" }}>{partner.nameEn}</p>
        </div>
      </motion.div>
    </div>
  );
}

export function PartnersSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ direction: "rtl", loop: true, align: "center", dragFree: true, containScroll: "trimSnaps" });
  const [isDragging, setIsDragging] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("pointerDown", () => setIsDragging(true));
    emblaApi.on("pointerUp", () => setIsDragging(false));
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="py-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto mb-10">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <p className="text-[#B8860B] mb-3 text-center" style={{ fontSize: "0.75rem", letterSpacing: "0.35em" }}>✦ نثق بهم ويثقون بنا ✦</p>
          <h2 className="text-[#F5F5DC] text-center" style={{ fontSize: "clamp(1.6rem, 4.5vw, 2.4rem)", fontWeight: 800, lineHeight: 1.3, fontFamily: "'Tajawal', 'IBM Plex Sans Arabic', sans-serif" }}>شركاء النجاح</h2>
          <div className="mt-4 mb-1 rounded-full mx-auto" style={{ width: 90, height: 2, background: "linear-gradient(90deg, transparent, #B8860B 30%, #D4A017 60%, transparent)" }} />
          <p className="text-[#F5F5DC]/40 text-sm mt-4">اسحب يميناً أو يساراً لاستعراض شركائنا</p>
        </motion.div>
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#0f0f0f] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#0f0f0f] to-transparent z-10 pointer-events-none" />
        <div ref={emblaRef} className="overflow-hidden" style={{ cursor: isDragging ? "grabbing" : "grab" }}>
          <div className="flex gap-4 px-4">
            {[...partners, ...partners].map((partner, i) => (
              <PartnerCard key={`${partner.id}-${i}`} partner={partner} />
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-8 relative z-20">
          <motion.button onClick={scrollPrev} whileTap={{ scale: 0.92 }} className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300" style={{ background: canScrollPrev ? "rgba(184,134,11,0.12)" : "rgba(255,255,255,0.03)", border: "1px solid rgba(184,134,11,0.2)", color: canScrollPrev ? "#B8860B" : "rgba(245,245,220,0.2)" }} aria-label="السابق">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </motion.button>
          <div className="flex items-center gap-2 px-4 rounded-full" style={{ background: "rgba(184,134,11,0.06)", border: "1px solid rgba(184,134,11,0.12)" }}>
            <span className="text-[#B8860B]/50 text-xs">اسحب للتصفح</span>
          </div>
          <motion.button onClick={scrollNext} whileTap={{ scale: 0.92 }} className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300" style={{ background: canScrollNext ? "rgba(184,134,11,0.12)" : "rgba(255,255,255,0.03)", border: "1px solid rgba(184,134,11,0.2)", color: canScrollNext ? "#B8860B" : "rgba(245,245,220,0.2)" }} aria-label="التالي">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
