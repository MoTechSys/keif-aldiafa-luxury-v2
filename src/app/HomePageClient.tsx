'use client';

import { useRef, lazy, Suspense } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { ImageWithFallback } from "@/components/ImageWithFallback";

import { HERO_IMG, HERO_MOBILE_IMG } from "@/lib/images";

const PartnersMarquee = lazy(() =>
  import("@/components/PartnersMarquee").then((m) => ({ default: m.PartnersMarquee }))
);
const WA = "966508252134";

const whyCards = [
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>, title: "خبرة متميزة", desc: "أكثر من ٨ سنوات في تقديم خدمات الضيافة الفاخرة للمناسبات الكبرى والمحافل الرسمية" },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>, title: "فريق احترافي", desc: "كوادر مدربة على أعلى معايير الضيافة الدولية والأصالة العربية" },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>, title: "تقديمات فاخرة", desc: "أرقى المشروبات والتقديمات من قهوة سعودية وشاي وحلويات فاخرة" },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>, title: "تغطية المملكة", desc: "نصل إلى جميع مناطق المملكة بأسطول من المعدات الفاخرة" },
];

function SectionHeader({ label, title, center = true }: { label?: string; title: string; center?: boolean }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }} className={`mb-14 ${center ? "text-center" : ""}`}>
      {label && <p className={`text-[#B8860B] mb-3 ${center ? "text-center" : ""}`} style={{ fontSize: "0.75rem", letterSpacing: "0.35em" }}>✦ {label} ✦</p>}
      <h2 className={`text-[#F5F5DC] font-tajawal ${center ? "text-center" : ""}`} style={{ fontSize: "clamp(1.6rem, 4.5vw, 2.4rem)", fontWeight: 800, lineHeight: 1.3 }}>{title}</h2>
      <div className="mt-4 mb-1 rounded-full" style={{ width: center ? 90 : 70, height: 2, background: "linear-gradient(90deg, transparent, #B8860B 30%, #D4A017 60%, transparent)", margin: "12px auto 0" }} />
    </motion.div>
  );
}

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-[#B8860B]" style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }} animate={{ y: [0, -30, 0], opacity: [0.15, 0.5, 0.15], scale: [1, 1.5, 1] }} transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8, ease: "easeInOut" }} />
      ))}
    </div>
  );
}

function GoldenSparkle({ delay, x, y }: { delay: number; x: number; y: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        background: "radial-gradient(circle, #FFD700 0%, #B8860B 100%)",
        boxShadow: "0 0 8px rgba(184, 134, 11, 0.8)",
      }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

export function HomePageClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <div>
      {/* HERO */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] max-h-[950px] overflow-hidden" aria-label="الشاشة الرئيسية">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          {/* صورة الهواتف والأجهزة الصغيرة — High-Res Local */}
          <ImageWithFallback
            src={HERO_MOBILE_IMG}
            alt="كيف الضيافة - خدمات الضيافة الفاخرة"
            className="block md:hidden w-full h-[110%] object-cover object-center"
            priority={true}
            quality={90}
            sizes="100vw"
          />
          {/* صورة الشاشات الكبيرة واللابتوب — High-Res Local */}
          <ImageWithFallback
            src={HERO_IMG}
            alt="كيف الضيافة - خدمات الضيافة الفاخرة"
            className="hidden md:block w-full h-[110%] object-cover object-center"
            priority={true}
            quality={90}
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f]/60 via-[#0f0f0f]/25 to-[#0f0f0f]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f]/40 via-transparent to-transparent" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(184,134,11,0.06) 0%, transparent 65%)" }} />
        <Particles />
        
        {/* Golden Glassmorphism Container */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-start sm:justify-center text-center px-4 sm:px-6 pt-12 sm:pt-0" 
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl px-6 sm:px-8 py-8 sm:py-12 rounded-3xl mt-4 sm:mt-0"
            style={{
              background: "rgba(184, 134, 11, 0.08)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(184, 134, 11, 0.3)",
              boxShadow: "0 8px 32px rgba(184, 134, 11, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            }}
          >
            {/* Sparkles around the container */}
            {[...Array(8)].map((_, i) => (
              <GoldenSparkle
                key={i}
                delay={i * 0.25}
                x={15 + (i % 2) * 70}
                y={10 + Math.floor(i / 2) * 25}
              />
            ))}

            {/* SINCE 2016 */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <div className="h-px w-8 sm:w-10 bg-gradient-to-l from-[#B8860B] to-transparent" />
              <span
                className="text-[#D4A017] font-medium"
                style={{ fontSize: "0.7rem", letterSpacing: "0.3em" }}
              >
                SINCE 2016
              </span>
              <div className="h-px w-8 sm:w-10 bg-gradient-to-r from-[#B8860B] to-transparent" />
            </motion.div>

            {/* Main Title - 3D Golden Text */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-[#F5F5DC] mb-4 font-tajawal"
              style={{
                fontSize: "clamp(2.2rem, 8vw, 4.5rem)",
                fontWeight: 900,
                lineHeight: 1.2,
                background: "linear-gradient(135deg, #FFD700 0%, #D4A017 25%, #B8860B 50%, #D4A017 75%, #FFD700 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "0 4px 30px rgba(0,0,0,0.6)",
                filter: "drop-shadow(0 0 20px rgba(184, 134, 11, 0.4))",
              }}
            >
              كيف الضيافة
            </motion.h1>

            {/* Divider Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-5 mx-auto"
              style={{
                width: 80,
                height: 2,
                background: "linear-gradient(90deg, transparent, #B8860B, #FFD700, #B8860B, transparent)",
                boxShadow: "0 0 15px rgba(184, 134, 11, 0.6)",
              }}
            />

            {/* KEIF AL-DIAFA & LUXURY HOSPITALITY */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="flex flex-col items-center gap-2 mb-6"
            >
              <p
                className="text-[#D4A017]"
                style={{
                  fontSize: "clamp(0.8rem, 2vw, 0.95rem)",
                  letterSpacing: "0.25em",
                  fontWeight: 600,
                }}
              >
                KEIF AL-DIAFA
              </p>
              <div className="flex items-center justify-center gap-2">
                <div className="h-px w-6 bg-gradient-to-l from-[#B8860B] to-transparent" />
                <span
                  className="text-[#B8860B]"
                  style={{
                    fontSize: "0.65rem",
                    letterSpacing: "0.2em",
                    fontWeight: 500,
                  }}
                >
                  LUXURY HOSPITALITY
                </span>
                <div className="h-px w-6 bg-gradient-to-r from-[#B8860B] to-transparent" />
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="max-w-xl mx-auto"
            >
              <p
                className="text-[#F5F5DC]/85 mb-4 font-amiri"
                style={{
                  fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
                  lineHeight: 1.8,
                  fontWeight: 400,
                }}
              >
                نقدم خدمات ضيافة متكاملة تلبي تطلعات الأفراد، وترتقي بفعاليات الشركات والمؤسسات والجهات الحكومية.
              </p>
              <p
                className="text-[#D4A017]/90 font-amiri"
                style={{
                  fontSize: "clamp(0.9rem, 1.8vw, 1rem)",
                  lineHeight: 1.9,
                  fontWeight: 400,
                  letterSpacing: "0.02em",
                }}
              >
                تغطية شاملة لـ: <span className="text-[#FFD700]">المعارض</span> | <span className="text-[#FFD700]">المؤتمرات</span> | <span className="text-[#FFD700]">الاجتماعات</span> | <span className="text-[#FFD700]">الفعاليات الوطنية</span> | <span className="text-[#FFD700]">المناسبات الخاصة</span>
              </p>
            </motion.div>
          </motion.div>

          {/* CTA Buttons - Outside Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex gap-3 flex-wrap justify-center mt-8 sm:mt-12 relative z-20"
          >
            <Link
              href="/services"
              className="px-6 sm:px-8 py-3 rounded-full text-[#0f0f0f] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #FFD700, #D4A017, #B8860B)",
                backgroundSize: "200% auto",
                fontWeight: 800,
                fontSize: "0.9rem",
                boxShadow: "0 8px 25px rgba(184, 134, 11, 0.5)",
              }}
            >
              اكتشف خدماتنا
            </Link>
            <a
              href={`https://wa.me/${WA}?text=${encodeURIComponent("مرحباً، أود الاستفسار عن خدمات الضيافة لديكم.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 sm:px-8 py-3 rounded-full transition-all duration-300 hover:bg-white/15"
              style={{
                border: "1.5px solid rgba(184, 134, 11, 0.6)",
                color: "#D4A017",
                fontWeight: 600,
                fontSize: "0.9rem",
                backdropFilter: "blur(10px)",
              }}
            >
              تواصل معنا
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center gap-2" style={{ opacity: 0.5 }}>
            <span className="text-[#B8860B] text-xs" style={{ letterSpacing: "0.2em" }}>
              اكتشف
            </span>
            <div className="w-5 h-8 rounded-full border border-[#B8860B]/40 flex items-start justify-center pt-1.5">
              <motion.div
                className="w-1 h-2 rounded-full bg-[#B8860B]"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* PARTNERS SLIDER */}
      <section className="relative py-16 sm:py-20 bg-[#0f0f0f]">
        <div className="container mx-auto px-4">
          <Suspense fallback={<div className="h-32 bg-[#1a1a1a] rounded-lg animate-pulse" />}>
            <PartnersMarquee />
          </Suspense>
        </div>
      </section>

      {/* WHY US SECTION */}
      <section className="relative py-16 sm:py-24 bg-[#0f0f0f]">
        <div className="container mx-auto px-4">
          <SectionHeader label="لماذا نحن" title="لماذا تختار كيف الضيافة؟" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {whyCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative p-6 sm:p-8 rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(184, 134, 11, 0.05)",
                  border: "1px solid rgba(184, 134, 11, 0.2)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#B8860B]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="mb-4 text-[#D4A017] group-hover:scale-110 transition-transform duration-300">
                    {card.icon}
                  </div>
                  <h3 className="text-[#F5F5DC] font-tajawal mb-3" style={{ fontSize: "1.1rem", fontWeight: 700 }}>
                    {card.title}
                  </h3>
                  <p className="text-[#F5F5DC]/70" style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-16 sm:py-24 bg-[#0f0f0f] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#B8860B]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#B8860B]/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[#F5F5DC] font-tajawal mb-6"
            style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 800 }}
          >
            هل أنت مستعد لتجربة الفخامة الحقيقية؟
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#F5F5DC]/70 max-w-2xl mx-auto mb-10"
            style={{ fontSize: "1rem", lineHeight: 1.8 }}
          >
            دع فريقنا المتخصص يحول مناسبتك إلى حدث لا يُنسى بخدمات ضيافة فاخرة وراقية
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex gap-4 flex-wrap justify-center"
          >
            <a
              href={`https://wa.me/${WA}?text=${encodeURIComponent("مرحباً، أود الاستفسار عن خدمات الضيافة لديكم.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full text-[#0f0f0f] transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "linear-gradient(135deg, #FFD700, #D4A017)",
                fontWeight: 800,
                fontSize: "0.95rem",
                boxShadow: "0 8px 25px rgba(184, 134, 11, 0.5)",
              }}
            >
              تواصل معنا الآن
            </a>
            <Link
              href="/portfolio"
              className="px-8 py-4 rounded-full transition-all duration-300 hover:bg-white/10"
              style={{
                border: "1.5px solid rgba(184, 134, 11, 0.6)",
                color: "#D4A017",
                fontWeight: 600,
                fontSize: "0.95rem",
                backdropFilter: "blur(10px)",
              }}
            >
              شاهد أعمالنا
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
