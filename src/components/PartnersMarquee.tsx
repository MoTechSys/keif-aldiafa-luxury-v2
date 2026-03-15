"use client";

import { motion } from "motion/react";
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

// Split into two groups (15 each)
const firstRow = allPartners.slice(0, 15);
const secondRow = allPartners.slice(15, 30);

// Partner card component
function PartnerCard({ partner }: { partner: (typeof allPartners)[0] }) {
  return (
    <div className="flex-shrink-0 select-none" style={{ width: "clamp(140px, 30vw, 200px)" }}>
      <div
        className="relative h-24 sm:h-28 rounded-lg flex items-center justify-center cursor-default transition-all duration-300 hover:border-[rgba(184,134,11,0.5)]"
        style={{
          background: "rgba(20,16,6,0.5)",
          border: "1px solid rgba(184,134,11,0.15)",
        }}
      >
        <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center p-2">
          <ImageWithFallback
            src={partner.logo}
            alt={partner.name}
            className="w-full h-full object-contain brightness-110 contrast-110"
            loading="lazy"
            width={80}
            height={80}
            quality={85}
          />
        </div>
      </div>
    </div>
  );
}

export function PartnersMarquee() {
  return (
    <section className="py-16 px-4 overflow-hidden contain-paint">
      <div className="max-w-7xl mx-auto mb-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-[#B8860B] mb-3 text-center" style={{ fontSize: "0.75rem", letterSpacing: "0.35em" }}>
            ✦ نثق بهم ويثقون بنا ✦
          </p>
          <h2
            className="text-[#F5F5DC] text-center font-amiri"
            style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 800, lineHeight: 1.3 }}
          >
            شركاء النجاح
          </h2>
          <div
            className="mt-4 mb-1 rounded-full mx-auto"
            style={{
              width: 90,
              height: 2,
              background: "linear-gradient(90deg, transparent, #B8860B 30%, #D4A017 60%, transparent)",
            }}
          />
          <p className="text-[#F5F5DC]/40 text-sm mt-4 font-ibm-plex-arabic">
            نفتخر بخدمة نخبة من المؤسسات والشركات الرائدة
          </p>
        </motion.div>
      </div>

      {/* First Marquee - Right to Left */}
      <div className="relative mb-6 overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-[#0f0f0f] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-[#0f0f0f] to-transparent z-10 pointer-events-none" />
        <motion.div
          className="flex gap-4 sm:gap-6"
          animate={{ x: [0, -1000] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...firstRow, ...firstRow].map((partner, i) => (
            <PartnerCard key={`first-${partner.id}-${i}`} partner={partner} />
          ))}
        </motion.div>
      </div>

      {/* Second Marquee - Left to Right */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-[#0f0f0f] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-[#0f0f0f] to-transparent z-10 pointer-events-none" />
        <motion.div
          className="flex gap-4 sm:gap-6"
          animate={{ x: [-1000, 0] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...secondRow, ...secondRow].map((partner, i) => (
            <PartnerCard key={`second-${partner.id}-${i}`} partner={partner} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
