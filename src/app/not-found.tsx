"use client";

import Link from "next/link";
import { motion } from "motion/react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", duration: 0.8 }}>
          <h1 className="gold-gradient-text mb-4" style={{ fontSize: "clamp(5rem, 15vw, 10rem)", fontWeight: 900, lineHeight: 1, fontFamily: "'Tajawal', sans-serif" }}>404</h1>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="text-[#F5F5DC] mb-3" style={{ fontSize: "1.5rem", fontWeight: 800, fontFamily: "'Tajawal', sans-serif" }}>الصفحة غير موجودة</h2>
          <p className="text-[#F5F5DC]/50 text-sm mb-8 leading-relaxed">عذراً، الصفحة التي تبحث عنها غير موجودة أو ربما تم نقلها.</p>
          <Link href="/" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[#0f0f0f]" style={{ background: "linear-gradient(135deg, #B8860B, #D4A017)", fontWeight: 700, boxShadow: "0 4px 20px rgba(184,134,11,0.3)" }}>
            <span>→</span>
            <span>العودة للرئيسية</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
