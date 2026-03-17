"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate, useScroll, useMotionTemplate } from "motion/react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  HOT_DRINKS_IMAGES,
  COLD_DRINKS_IMAGES,
  DATES_IMAGES,
  SWEETS_IMAGES,
  PASTRY_IMAGES,
} from "@/lib/images";

const WA = "966508252134";

interface OfferingItem {
  name: string;
  description: string;
  img: string;
}

interface CategoryData {
  id: string;
  label: string;
  icon: string;
  description: string;
  items: OfferingItem[];
}

const categories: CategoryData[] = [
  {
    id: "hot", label: "المشروبات الحارة", icon: "☕", description: "قهوة سعودية أصيلة وشاي فاخر ومشروبات دافئة",
    items: [
      { name: "القهوة التركية",      description: "قهوة تركية أصيلة",                 img: HOT_DRINKS_IMAGES.turkishCoffee },
      { name: "الشاي الأحمر",        description: "شاي أحمر معطر بالنعناع",            img: HOT_DRINKS_IMAGES.redTea },
      { name: "الشاي الأخضر",        description: "شاي أخضر طبيعي منعش",               img: HOT_DRINKS_IMAGES.greenTea },
      { name: "شاي الكرك",           description: "شاي كرك بنكهة فريدة",               img: HOT_DRINKS_IMAGES.karakTea },
      { name: "السحلب",              description: "مشروب الدفء الشتوي",               img: HOT_DRINKS_IMAGES.sahlab },
      { name: "زنجبيل بالأناناس",    description: "مزيج فريد منعش",                    img: HOT_DRINKS_IMAGES.gingerPineapple },
      { name: "الكابتشينو",          description: "كابتشينو إيطالي الأصل",             img: HOT_DRINKS_IMAGES.cappuccino },
    ],
  },
  {
    id: "cold", label: "المشروبات الباردة", icon: "🧊", description: "مشروبات منعشة وباردة تليق بالمناسبات",
    items: [
      { name: "عصائر طبيعية",       description: "عصائر فواكه طازجة",                 img: COLD_DRINKS_IMAGES.freshJuice },
      { name: "موهيتو",             description: "موهيتو منعش بنكهات متعددة",         img: COLD_DRINKS_IMAGES.mojito },
      { name: "عرق سوس",            description: "مشروب عرق السوس الأصيل",            img: COLD_DRINKS_IMAGES.arakSous },
      { name: "كركديه",             description: "شراب الكركديه الأحمر المنعش",        img: COLD_DRINKS_IMAGES.karkade },
      { name: "تمر هندي",           description: "شراب التمر الهندي الحامض",          img: COLD_DRINKS_IMAGES.tamarind },
      { name: "سوبيا",              description: "سوبيا تراثية سعودية",               img: COLD_DRINKS_IMAGES.sobia },
      { name: "سموذي فواكه",        description: "سموذي طازج من الفواكه",             img: COLD_DRINKS_IMAGES.smoothie },
      { name: "آيس لاتيه",          description: "لاتيه مثلج بنكهات مختلفة",          img: COLD_DRINKS_IMAGES.icedLatte },
    ],
  },
  {
    id: "dates", label: "التمور الفاخرة", icon: "🌴", description: "أجود أنواع التمور السعودية الفاخرة",
    items: [
      { name: "تمر سكري محشي",             description: "محشو بالمكسرات الملكية",              img: DATES_IMAGES.sukariStuffed },
      { name: "تمر خلاص محشي",             description: "محشي بالقشدة واللوز",               img: DATES_IMAGES.khalasStuffed },
      { name: "تمر خلاص بالسمسم",          description: "بالسمسم والطحينية الطبيعية",         img: DATES_IMAGES.khalasSesame },
      { name: "تمر محشي بالمكسرات",         description: "تشكيلة تمور محشية فاخرة",            img: DATES_IMAGES.stuffedDates },
      { name: "تمر محشي مشكّل",            description: "بمزيج الشوكولاتة والمكسرات",          img: DATES_IMAGES.stuffedDates2 },
      { name: "تمر محشي فاخر",             description: "تشكيلة فاخرة للمناسبات",             img: DATES_IMAGES.stuffedDates3 },
      { name: "تمر محشي ملكي",             description: "ملكية بالفستق والكاجو",              img: DATES_IMAGES.stuffedDates5 },
      { name: "نخلة تمر سكري",             description: "طبيعي معروض بأناقة",                img: DATES_IMAGES.palmSukari },
      { name: "نخلة تمر سكري محشي",        description: "نخلة تقديم فاخرة",                  img: DATES_IMAGES.palmSukariStuffed },
      { name: "نخلة تمر خلاص محشي",        description: "نخلة تقديم أنيقة",                  img: DATES_IMAGES.palmKhalasStuffed },
      { name: "تمور مشكّلة",               description: "أجود التمور السعودية",               img: DATES_IMAGES.datesAssorted },
    ],
  },
  {
    id: "sweets", label: "الحلويات", icon: "🍰", description: "حلويات شرقية وغربية فاخرة",
    items: [
      { name: "بقلاوة فاخرة",           description: "بقلاوة تركية بالفستق",                  img: SWEETS_IMAGES.baklava },
      { name: "كنافة نابلسية",          description: "كنافة بالجبن والقطر",                  img: SWEETS_IMAGES.kunafa },
      { name: "شوكولاتة باتشي",         description: "باتشي الفاخرة للمناسبات",              img: SWEETS_IMAGES.patchiChocolate },
      { name: "شوكولاتة بستاني",        description: "بستاني الفاخرة بنكهات مميزة",           img: SWEETS_IMAGES.bostaniChocolate },
      { name: "كرواسون شوكولاتة",       description: "كرواسون فرنسي محشو",                   img: SWEETS_IMAGES.chocolateCroissant },
      { name: "بان كيك",                description: "بان كيك طازج بالتوبينج",               img: SWEETS_IMAGES.pancake },
    ],
  },
  {
    id: "pastry", label: "المعجنات", icon: "🥐", description: "معجنات طازجة محضرة بعناية",
    items: [
      { name: "سمبوسة",               description: "ذهبية مقرمشة بحشوات متنوعة",           img: PASTRY_IMAGES.samosa },
      { name: "فطائر بالفواكه",        description: "محشوة بالفواكه الموسمية",               img: PASTRY_IMAGES.fruitPie },
      { name: "معجنات عربية",          description: "تشكيلة معجنات أصيلة",                  img: PASTRY_IMAGES.arabicPastry },
      { name: "معجنات متنوعة",         description: "باقة متنوعة للمناسبات",               img: PASTRY_IMAGES.assortedPastry },
      { name: "مقبلات فاخرة",          description: "مقبلات صغيرة فاخرة",                  img: PASTRY_IMAGES.appetizers },
    ],
  },
];

// ─────────────────────────────────────────────
// Lightbox
// ─────────────────────────────────────────────
function Lightbox({
  items,
  initialIndex,
  onClose,
}: {
  items: OfferingItem[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);
  const dragX = useMotionValue(0);
  const bgOpacity = useTransform(dragX, [-200, 0, 200], [0.5, 1, 0.5]);
  const item = items[index];

  const goTo = useCallback(
    (next: number) => {
      if (next < 0 || next >= items.length) return;
      setDirection(next > index ? 1 : -1);
      setIndex(next);
    },
    [index, items.length]
  );

  const handleDragEnd = useCallback(
    (_: unknown, info: { velocity: { x: number }; offset: { x: number } }) => {
      const { velocity, offset } = info;
      if (velocity.x < -300 || offset.x < -80) {
        goTo(index + 1);
      } else if (velocity.x > 300 || offset.x > 80) {
        goTo(index - 1);
      } else {
        animate(dragX, 0, { type: "spring", stiffness: 400, damping: 40 });
      }
    },
    [goTo, index, dragX]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape")      onClose();
      if (e.key === "ArrowRight")  goTo(index - 1);
      if (e.key === "ArrowLeft")   goTo(index + 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, goTo, index]);

  const variants = {
    enter:  (d: number) => ({ x: d > 0 ?  300 : -300, opacity: 0, scale: 0.92 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit:   (d: number) => ({ x: d > 0 ? -300 :  300, opacity: 0, scale: 0.92 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        className="absolute inset-0"
        style={{ background: "rgba(5,4,2,0.95)", backdropFilter: "blur(24px)", opacity: bgOpacity }}
      />

      <button
        onClick={onClose}
        className="absolute top-5 left-5 z-20 w-11 h-11 rounded-full flex items-center justify-center text-[#F5F5DC]/70 hover:text-[#F5F5DC] transition-colors"
        style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(184,134,11,0.2)" }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="absolute top-5 right-5 z-20 px-3 py-1.5 rounded-full text-xs text-[#B8860B]"
        style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(184,134,11,0.2)" }}>
        {index + 1} / {items.length}
      </div>

      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          style={{ x: dragX }}
          onDragEnd={handleDragEnd}
          className="relative w-full max-w-4xl px-4 flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative w-full h-screen max-h-[80vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex items-center justify-center">
            <ImageWithFallback
              src={item.img}
              alt={item.name}
              className="max-w-full max-h-full w-auto h-auto object-contain"
              priority
            />
          </div>
          <div className="mt-6 text-center">
            <h3 className="text-2xl font-amiri text-[#D4A017] mb-2">{item.name}</h3>
            <p className="text-[#F5F5DC]/70 text-sm max-w-md mx-auto">{item.description}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Smart Micro-Grid Navigation Component
// ─────────────────────────────────────────────
function StickyMicroNav({ activeTab, onTabChange }: { activeTab: string; onTabChange: (id: string) => void }) {
  const [isSticky, setIsSticky] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      if (containerRef.current) {
        const containerTop = containerRef.current.getBoundingClientRect().top;
        setIsSticky(containerTop <= 0);
      }
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <div ref={containerRef} className="w-full">
      <motion.div
        ref={navRef}
        className={`w-full transition-all duration-300 ${isSticky ? 'fixed top-0 left-0 right-0 z-50' : 'relative'}`}
        animate={{
          paddingTop: isSticky ? '12px' : '24px',
          paddingBottom: isSticky ? '12px' : '24px',
          background: isSticky ? 'rgba(15, 15, 15, 0.95)' : 'transparent',
          backdropFilter: isSticky ? 'blur(16px)' : 'none',
          borderBottom: isSticky ? '1px solid rgba(184, 134, 11, 0.15)' : 'none',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {categories.map((cat, idx) => (
            <motion.button
              key={cat.id}
              onClick={() => onTabChange(cat.id)}
              className="relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Background with Glassmorphism */}
              <motion.div
                className="absolute inset-0 rounded-2xl transition-all duration-300"
                animate={{
                  background: activeTab === cat.id
                    ? 'rgba(184, 134, 11, 0.2)'
                    : 'rgba(0, 0, 0, 0.3)',
                  border: activeTab === cat.id
                    ? '1.5px solid rgba(184, 134, 11, 0.6)'
                    : '1px solid rgba(184, 134, 11, 0.1)',
                  boxShadow: activeTab === cat.id
                    ? '0 0 20px rgba(184, 134, 11, 0.3)'
                    : 'none',
                }}
              />

              {/* Content Container */}
              <div className="relative flex flex-col items-center justify-center p-3 sm:p-4 h-full">
                {/* Icon - Animated Visibility with Staggered Transition */}
                <motion.span
                  className="text-3xl sm:text-4xl overflow-hidden absolute"
                  animate={{
                    opacity: isSticky ? 0 : 1,
                    scale: isSticky ? 0.7 : (activeTab === cat.id ? 1.2 : 1),
                    y: isSticky ? -20 : 0,
                    pointerEvents: isSticky ? 'none' : 'auto',
                    filter: activeTab === cat.id ? 'drop-shadow(0 0 8px rgba(184, 134, 11, 0.6))' : 'none',
                  }}
                  transition={{ type: 'spring', stiffness: 280, damping: 20, mass: 0.8, delay: 0 }}
                  layout
                >
                  {cat.icon}
                </motion.span>

                {/* Label - Fluid Transition with Text Shadow */}
                <motion.p
                  className="text-[10px] sm:text-xs text-center font-medium leading-tight relative"
                  style={{
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.6), 0 0 12px rgba(184, 134, 11, 0.3)',
                  }}
                  animate={{
                    color: activeTab === cat.id ? '#D4A017' : '#F5F5DC',
                    opacity: activeTab === cat.id ? 1 : 0.6,
                    fontSize: isSticky ? '0.7rem' : '0.75rem',
                    y: isSticky ? 0 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 280, damping: 20, mass: 0.8, delay: 0.05 }}
                  layout
                >
                  {cat.label}
                </motion.p>
              </div>

              {/* Active Indicator Line */}
              {activeTab === cat.id && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#B8860B] to-[#D4A017]"
                  style={{ borderRadius: '2px' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
export default function OfferingsClient() {
  const [activeTab, setActiveTab] = useState("hot");
  const [lightbox, setLightbox] = useState<{ items: OfferingItem[]; index: number } | null>(null);

  const currentCategory = categories.find((c) => c.id === activeTab) || categories[0];

  return (
    <main className="min-h-screen bg-[#0f0f0f] pb-32">
      <div className="pt-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "تقديماتنا", href: "/offerings" }]} />

          <header className="mb-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-amiri text-[#D4A017] mb-4"
            >
              تقديماتنا الفاخرة
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[#F5F5DC]/70 max-w-2xl mx-auto text-sm sm:text-base"
            >
              نقدم لكم تشكيلة مختارة من أجود المشروبات والتمور والحلويات التي تعكس كرم الضيافة السعودية الأصيلة.
            </motion.p>
          </header>
        </div>

        {/* Sticky Micro-Grid Navigation */}
        <StickyMicroNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Content Grid */}
      <div className="container mx-auto px-4 pt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Category Description */}
            <div className="mb-8 text-center">
              <p className="text-[#B8860B] text-sm mb-2" style={{ letterSpacing: "0.1em" }}>✦ {currentCategory.label} ✦</p>
              <p className="text-[#F5F5DC]/60 text-sm sm:text-base">{currentCategory.description}</p>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {currentCategory.items.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setLightbox({ items: currentCategory.items, index: idx })}
                  className="group relative rounded-xl overflow-hidden cursor-pointer aspect-square"
                >
                  <ImageWithFallback
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-3">
                    <p className="text-[#D4A017] text-xs sm:text-sm font-semibold text-center">{item.name}</p>
                    <p className="text-[#F5F5DC]/70 text-[10px] sm:text-xs text-center mt-1 line-clamp-2">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            items={lightbox.items}
            initialIndex={lightbox.index}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
