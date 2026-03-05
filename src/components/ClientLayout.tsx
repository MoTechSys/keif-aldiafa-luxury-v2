"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { DallahLogo } from "@/components/DallahLogo";

const WA_NUMBER = "966535636933";

const navLinks = [
  { href: "/", label: "الرئيسية", icon: "⌂" },
  { href: "/services", label: "خدماتنا", icon: "◈" },
  { href: "/offerings", label: "تقديماتنا", icon: "☕" },
  { href: "/portfolio", label: "معرض الأعمال", icon: "◻" },
  { href: "/about", label: "من نحن", icon: "✦" },
  { href: "/contact", label: "تواصل معنا", icon: "✉" },
];

function useWhatsAppUrl() {
  const pathname = usePathname();
  const messages: Record<string, string> = {
    "/services": "مرحباً، أود الاستفسار عن خدمات الضيافة لديكم.",
    "/offerings": "مرحباً، أود الاستفسار عن تقديماتكم وتوزيعاتكم الفاخرة.",
    "/portfolio": "مرحباً، رأيت أعمالكم وأود الاستفسار عن باقات الضيافة.",
    "/about": "مرحباً، تعرفت على كيف الضيافة وأود الاستفسار عن خدماتكم.",
    "/contact": "مرحباً، أود التواصل معكم للاستفسار عن خدمات الضيافة.",
  };
  const msg = messages[pathname] ?? "مرحباً، أود الاستفسار عن خدمات الضيافة لديكم.";
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollDir, setScrollDir] = useState<"up" | "down">("up");
  const pathname = usePathname();
  const waUrl = useWhatsAppUrl();

  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setScrollDir(y > lastY ? "down" : "up");
      lastY = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const isActive = (href: string) => pathname === href;

  return (
    <div
      className="min-h-screen bg-[#0f0f0f] text-[#F5F5DC]"
      dir="rtl"
      style={{ fontFamily: "'IBM Plex Sans Arabic', 'Tajawal', 'IBM Plex Sans', sans-serif" }}
    >
      {/* ══════════════════════ HEADER ══════════════════════ */}
      <motion.header
        initial={false}
        animate={{
          y: scrolled && scrollDir === "down" ? -80 : 0,
          backgroundColor: scrolled ? "rgba(10,8,2,0.95)" : "transparent",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          borderBottom: scrolled ? "1px solid rgba(184,134,11,0.12)" : "none",
          boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.4)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group" aria-label="الصفحة الرئيسية">
            <motion.div
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative"
            >
              <DallahLogo size={40} />
              <motion.div
                className="absolute -inset-1 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(184,134,11,0.15) 0%, transparent 70%)" }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
            <div className="hidden sm:block">
              <span className="block gold-gradient-text" style={{ fontSize: "1.15rem", fontWeight: 800, lineHeight: 1.1 }}>
                كيف الضيافة
              </span>
              <span className="block text-[#B8860B]/60" style={{ fontSize: "0.6rem", letterSpacing: "0.25em" }}>
                KEIF AL-DIAFA
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                  isActive(link.href) ? "text-[#B8860B]" : "text-[#F5F5DC]/70 hover:text-[#B8860B]"
                }`}
                style={{ fontWeight: isActive(link.href) ? 600 : 400 }}
              >
                {isActive(link.href) && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: "rgba(184,134,11,0.1)", border: "1px solid rgba(184,134,11,0.2)" }}
                    transition={{ type: "spring", duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <motion.a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm text-[#0f0f0f]"
              style={{
                background: "linear-gradient(135deg, #B8860B, #D4A017)",
                fontWeight: 700,
                boxShadow: "0 4px 15px rgba(184,134,11,0.3)",
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              تواصل الآن
            </motion.a>
          </div>
        </div>
      </motion.header>

      {/* ══════════════════════ PAGE CONTENT ══════════════════════ */}
      <main id="main-content">
        {children}
      </main>

      {/* ══════════════════════ FOOTER ══════════════════════ */}
      <footer
        className="relative pt-16 pb-32 md:pb-16 overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #0f0f0f 0%, #080602 100%)",
          borderTop: "1px solid rgba(184,134,11,0.1)",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, #B8860B 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <DallahLogo size={44} />
                <div>
                  <p className="gold-gradient-text" style={{ fontSize: "1.3rem", fontWeight: 800 }}>كيف الضيافة</p>
                  <p className="text-[#B8860B]/50" style={{ fontSize: "0.62rem", letterSpacing: "0.25em" }}>KEIF AL-DIAFA · LUXURY HOSPITALITY</p>
                </div>
              </div>
              <p className="text-[#F5F5DC]/50 text-sm leading-relaxed max-w-sm">
                منصة تجربة فاخرة تعكس جودة وفخامة خدمات الضيافة السعودية الأصيلة. نحوّل كل مناسبة إلى ذكرى لا تُنسى.
              </p>
              <div className="flex gap-3 mt-5">
                <motion.a href={waUrl} target="_blank" rel="noopener noreferrer" aria-label="واتساب" whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#25D36612", border: "1px solid #25D36630", color: "#25D366" }}>
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                </motion.a>
                <motion.a href="https://instagram.com/keifdiafa" target="_blank" rel="noopener noreferrer" aria-label="إنستغرام" whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#E1306C12", border: "1px solid #E1306C30", color: "#E1306C" }}>
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </motion.a>
                <motion.a href="tel:+966535636933" aria-label="اتصل بنا" whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(184,134,11,0.1)", border: "1px solid rgba(184,134,11,0.3)", color: "#B8860B" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </motion.a>
              </div>
            </div>
            <div>
              <h3 className="text-[#B8860B] mb-4" style={{ fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.1em" }}>روابط سريعة</h3>
              <ul className="space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[#F5F5DC]/50 text-sm hover:text-[#B8860B] transition-colors duration-200 flex items-center gap-2 group">
                      <span className="w-3 h-px bg-[#B8860B]/30 group-hover:w-5 group-hover:bg-[#B8860B] transition-all duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[#B8860B] mb-4" style={{ fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.1em" }}>معلومات التواصل</h3>
              <div className="space-y-3">
                {[
                  { icon: "📱", text: "+966 53 563 6933", href: "tel:+966535636933" },
                  { icon: "💬", text: "واتساب متاح 24/7", href: waUrl },
                  { icon: "📧", text: "info@keifdiafa.com", href: "mailto:info@keifdiafa.com" },
                  { icon: "📍", text: "الرياض، المملكة العربية السعودية", href: "#" },
                ].map((item) => (
                  <a key={item.text} href={item.href} className="flex items-start gap-3 text-[#F5F5DC]/50 text-sm hover:text-[#B8860B] transition-colors duration-200 group">
                    <span className="mt-0.5 flex-shrink-0">{item.icon}</span>
                    <span>{item.text}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: "1px solid rgba(184,134,11,0.08)" }}>
            <p className="text-[#F5F5DC]/30 text-xs">© {new Date().getFullYear()} كيف الضيافة. جميع الحقوق محفوظة.</p>
            <p className="text-[#B8860B]/30 text-xs" style={{ letterSpacing: "0.1em" }}>KEIF AL-DIAFA · LUXURY HOSPITALITY · KSA</p>
          </div>
        </div>
      </footer>

      {/* ══════════════════════ FLOATING WHATSAPP ══════════════════════ */}
      <motion.a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تواصل عبر واتساب"
        className="fixed bottom-28 left-4 z-50 w-14 h-14 rounded-full flex items-center justify-center whatsapp-pulse md:bottom-8"
        style={{ background: "linear-gradient(135deg, #25D366, #1da851)", boxShadow: "0 4px 20px rgba(37,211,102,0.5)" }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        initial={{ opacity: 0, scale: 0, x: -20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 200, delay: 1.5 }}
      >
        <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
      </motion.a>

      {/* ══════════════════════ BOTTOM MOBILE NAV ══════════════════════ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden safe-bottom bottom-nav" style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}>
        <div className="flex items-center justify-between px-4 pt-3 pb-1">
          <div className="flex gap-3">
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-[#25D366]" style={{ background: "rgba(37,211,102,0.08)", border: "1px solid rgba(37,211,102,0.2)" }}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              <span style={{ fontWeight: 600 }}>واتساب</span>
            </a>
            <a href="tel:+966535636933" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-[#B8860B]" style={{ background: "rgba(184,134,11,0.08)", border: "1px solid rgba(184,134,11,0.2)" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              <span style={{ fontWeight: 600 }}>اتصال</span>
            </a>
          </div>
          <motion.button onClick={toggleMenu} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.93 }} className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[#0f0f0f]" style={{ background: menuOpen ? "linear-gradient(135deg, #8B6914, #B8860B)" : "linear-gradient(135deg, #B8860B, #D4A017)", fontWeight: 700, fontSize: "0.85rem", boxShadow: "0 4px 20px rgba(184,134,11,0.4)" }} aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"} aria-expanded={menuOpen}>
            <motion.span animate={{ rotate: menuOpen ? 45 : 0 }} transition={{ duration: 0.25 }}>{menuOpen ? "✕" : "☰"}</motion.span>
            <span>القائمة</span>
          </motion.button>
        </div>
      </div>

      {/* ══════════════════════ SLIDE-UP MENU ══════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm" onClick={closeMenu} />
            <motion.nav initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 280 }} className="fixed bottom-0 left-0 right-0 z-[70] rounded-t-3xl overflow-hidden" style={{ background: "linear-gradient(160deg, rgba(18,14,5,0.98) 0%, rgba(12,10,3,0.99) 100%)", backdropFilter: "blur(30px) saturate(200%)", borderTop: "1px solid rgba(184,134,11,0.25)", boxShadow: "0 -20px 80px rgba(184,134,11,0.1)", paddingBottom: "max(100px, calc(80px + env(safe-area-inset-bottom)))" }} role="navigation" aria-label="القائمة الرئيسية">
              <div className="max-w-lg mx-auto px-5 pt-6">
                <div className="w-10 h-1 bg-[#B8860B]/40 rounded-full mx-auto mb-5" />
                <div className="flex items-center justify-center gap-3 mb-6">
                  <DallahLogo size={32} />
                  <span className="gold-gradient-text" style={{ fontSize: "1.1rem", fontWeight: 800 }}>كيف الضيافة</span>
                </div>
                <div className="space-y-1">
                  {navLinks.map((link, i) => (
                    <motion.div key={link.href} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.045, duration: 0.25 }}>
                      <Link href={link.href} onClick={closeMenu} className={`flex items-center justify-between w-full px-4 py-3.5 rounded-xl transition-all duration-200 ${isActive(link.href) ? "text-[#B8860B]" : "text-[#F5F5DC]/75 hover:text-[#B8860B] hover:bg-[#B8860B]/5"}`} style={{ background: isActive(link.href) ? "rgba(184,134,11,0.1)" : undefined, border: isActive(link.href) ? "1px solid rgba(184,134,11,0.25)" : "1px solid transparent", fontWeight: isActive(link.href) ? 700 : 400, fontSize: "1rem" }}>
                        <div className="flex items-center gap-3">
                          <span className="text-[#B8860B]/60 text-sm">{link.icon}</span>
                          <span>{link.label}</span>
                        </div>
                        {isActive(link.href) && <span className="text-[#B8860B] text-xs">●</span>}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
