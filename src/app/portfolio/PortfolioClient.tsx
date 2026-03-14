"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "motion/react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  EVENT_IMAGES,
  WEDDING_IMAGES,
  EQUIPMENT_IMAGES,
} from "@/lib/images";

const WA = "966508252134";
const ITEMS_PER_PAGE = 12; // عدد الصور في كل صفحة

type FilterType = "all" | "events" | "weddings" | "equipment";

interface PortfolioItem {
  id: number;
  image: string;
  category: FilterType;
}

// ─────────────────────────────────────────────
// بيانات الصور
// ─────────────────────────────────────────────
const portfolioItems: PortfolioItem[] = [
  // الفعاليات
  ...EVENT_IMAGES.map((img, i) => ({
    id: i + 1,
    image: img,
    category: "events" as FilterType,
  })),
  // الأعراس
  ...WEDDING_IMAGES.map((img, i) => ({
    id: 100 + i + 1,
    image: img,
    category: "weddings" as FilterType,
  })),
  // المعدات
  ...EQUIPMENT_IMAGES.map((img, i) => ({
    id: 200 + i + 1,
    image: img,
    category: "equipment" as FilterType,
  })),
];

const filters: { key: FilterType; label: string; icon: string }[] = [
  { key: "all", label: "الكل", icon: "◎" },
  { key: "events", label: "الفعاليات", icon: "🎉" },
  { key: "weddings", label: "الأعراس", icon: "💍" },
  { key: "equipment", label: "المعدات", icon: "⚙️" },
];

// ─────────────────────────────────────────────
// Lightbox بكامل حجم الشاشة
// ─────────────────────────────────────────────
function Lightbox({
  items,
  initialIndex,
  onClose,
}: {
  items: PortfolioItem[];
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
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goTo(index - 1);
      if (e.key === "ArrowLeft") goTo(index + 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, goTo, index]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0, scale: 0.92 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0, scale: 0.92 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/95"
      onClick={onClose}
    >
      {/* زر إغلاق */}
      <button
        onClick={onClose}
        className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full flex items-center justify-center text-[#F5F5DC]/70 hover:text-[#F5F5DC] transition-colors md:top-6 md:left-6 md:w-12 md:h-12"
        style={{
          background: "rgba(0,0,0,0.55)",
          border: "1px solid rgba(184,134,11,0.2)",
        }}
        aria-label="إغلاق"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-5 h-5 md:w-6 md:h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* عداد الصور */}
      <div
        className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full text-xs md:text-sm text-[#B8860B] md:top-6 md:right-6"
        style={{
          background: "rgba(0,0,0,0.55)",
          border: "1px solid rgba(184,134,11,0.2)",
        }}
      >
        {index + 1} / {items.length}
      </div>

      {/* أزرار التنقل */}
      {index > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goTo(index - 1);
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-[#F5F5DC]/70 hover:text-[#B8860B] transition-colors"
          style={{
            background: "rgba(0,0,0,0.55)",
            border: "1px solid rgba(184,134,11,0.2)",
          }}
          aria-label="السابق"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-5 h-5 md:w-6 md:h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}
      {index < items.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goTo(index + 1);
          }}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-[#F5F5DC]/70 hover:text-[#B8860B] transition-colors"
          style={{
            background: "rgba(0,0,0,0.55)",
            border: "1px solid rgba(184,134,11,0.2)",
          }}
          aria-label="التالي"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-5 h-5 md:w-6 md:h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      {/* الصورة بكامل الحجم */}
      <div
        className="relative z-10 w-full h-full flex items-center justify-center px-2 md:px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={item.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 320, damping: 38 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={handleDragEnd}
            className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
            style={{
              x: dragX,
            }}
          >
            <ImageWithFallback
              src={item.image}
              alt={`صورة ${index + 1}`}
              className="max-w-full max-h-full w-auto h-auto object-contain"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// المكون الرئيسي
// ─────────────────────────────────────────────
export default function PortfolioClient() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // تصفية الصور
  const filteredItems =
    activeFilter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  // الصور المعروضة حالياً
  const displayedItems = filteredItems.slice(0, displayCount);
  const hasMore = displayCount < filteredItems.length;

  // معالج عرض المزيد
  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + ITEMS_PER_PAGE);
  };

  // إعادة تعيين العداد عند تغيير الفلتر
  useEffect(() => {
    setDisplayCount(ITEMS_PER_PAGE);
  }, [activeFilter]);

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative py-8 md:py-16 px-4 md:px-8"
      >
        <Breadcrumbs />

        <div className="max-w-7xl mx-auto mt-6 md:mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center mb-8 md:mb-12"
          >
            <h1
              className="text-3xl md:text-5xl font-bold mb-3 md:mb-4"
              style={{
                background:
                  "linear-gradient(135deg, #B8860B 0%, #D4A017 50%, #B8860B 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              معرض أعمالنا
            </h1>
            <p className="text-[#F5F5DC]/70 text-base md:text-xl max-w-2xl mx-auto px-2">
              استعرض أفضل لحظاتنا من الفعاليات والأعراس والمعدات الفاخرة
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12"
          >
            {filters.map((filter) => (
              <motion.button
                key={filter.key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full font-medium transition-all duration-300 flex items-center gap-2 text-sm md:text-base ${
                  activeFilter === filter.key
                    ? "text-white"
                    : "text-[#F5F5DC]/60 hover:text-[#F5F5DC]"
                }`}
                style={{
                  background:
                    activeFilter === filter.key
                      ? "linear-gradient(135deg, #B8860B, #D4A017)"
                      : "rgba(184,134,11,0.1)",
                  border:
                    activeFilter === filter.key
                      ? "1px solid rgba(212,160,23,0.5)"
                      : "1px solid rgba(184,134,11,0.2)",
                }}
              >
                <span>{filter.icon}</span>
                {filter.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Gallery Grid - محسّن للجوال */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4"
          >
            <AnimatePresence mode="popLayout">
              {displayedItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                  onClick={() => setSelectedIndex(idx)}
                  className="group relative cursor-pointer overflow-hidden rounded-lg md:rounded-2xl"
                  style={{
                    aspectRatio: "1/1",
                    background: "rgba(184,134,11,0.1)",
                    border: "1px solid rgba(184,134,11,0.15)",
                  }}
                >
                  {/* الصورة */}
                  <ImageWithFallback
                    src={item.image}
                    alt={`صورة ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center p-2 md:p-4"
                  >
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-center"
                    >
                      <p className="text-[#B8860B] text-xs md:text-sm font-medium">
                        اضغط للعرض الكامل
                      </p>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Load More Button */}
          {hasMore && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex justify-center mt-8 md:mt-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLoadMore}
                className="px-6 md:px-8 py-3 md:py-3.5 rounded-full font-bold text-white transition-all duration-300 text-sm md:text-base"
                style={{
                  background: "linear-gradient(135deg, #B8860B, #D4A017)",
                  boxShadow: "0 8px 30px rgba(184,134,11,0.3)",
                }}
              >
                عرض المزيد ({filteredItems.length - displayCount} متبقي)
              </motion.button>
            </motion.div>
          )}

          {/* Empty State */}
          {displayedItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-[#F5F5DC]/50 text-lg">
                لا توجد صور في هذه الفئة
              </p>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <Lightbox
            items={displayedItems}
            initialIndex={selectedIndex}
            onClose={() => setSelectedIndex(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
