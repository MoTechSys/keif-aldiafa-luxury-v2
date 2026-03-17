"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll } from "motion/react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  SERVICE_IMAGES,
  OUTFIT_IMAGES,
  SERVICES_MALE,
  SERVICES_FEMALE_EXTENDED,
  SERVICES_ARTISTIC,
  SAFARJIA_IMAGES,
  SAWAS_IMAGES,
  FEMALE_SERVICES_IMAGES,
} from "@/lib/images";

const WA = "966508252134";

interface OutfitItem { name: string; img: string; desc: string; }
interface ServiceItem { id: string; title: string; subtitle: string; img: string; description: string; features: string[]; outfits: OutfitItem[]; }
interface ServiceCategory { key: string; label: string; sublabel: string; icon: string; color: string; services: ServiceItem[]; }

const categories: ServiceCategory[] = [
  {
    key: "male", label: "الخدمات الرجالية", sublabel: "Male Hospitality", icon: "👨‍💼", color: "#B8860B",
    services: [
      { id: "hosts", title: "مضيفون", subtitle: "Male Hosts", img: SERVICE_IMAGES.maleWaiter, description: "مضيفون محترفون مدربون على أعلى معايير الضيافة الدولية والأصالة العربية.", features: ["زي رسمي أنيق", "خبرة +5 سنوات", "لغات متعددة", "بروتوكول VIP"], outfits: [{ name: "حزام", img: OUTFIT_IMAGES.hizam, desc: "زي رسمي بحزام أنيق" }, { name: "دقلة", img: OUTFIT_IMAGES.dagla, desc: "دقلة سعودية أصيلة" }, { name: "دقلة وجنبية", img: OUTFIT_IMAGES.daglaJanbiya, desc: "دقلة مع جنبية تراثية" }, { name: "سديرية", img: OUTFIT_IMAGES.sideriya, desc: "سديرية أنيقة" }, { name: "مكاوي", img: OUTFIT_IMAGES.makkawi, desc: "زي مكاوي تراثي" }] },
      { id: "zamzam", title: "سقّاء زمزم", subtitle: "Zamzam Server", img: SERVICE_IMAGES.zamzam, description: "سقاء زمزم بأسلوب تراثي فاخر يعكس أصالة الضيافة السعودية.", features: ["زي تراثي أصيل", "إبريق نحاسي فاخر", "خدمة شخصية", "تقديم فوري"], outfits: [{ name: "زي السقّاء التراثي", img: OUTFIT_IMAGES.safarjia, desc: "زي تراثي أصيل" }] },
      { id: "safarjia", title: "السفرجية", subtitle: "Coffee Butler", img: SAFARJIA_IMAGES.mainBg, description: "سفرجية محترفة تقدم القهوة السعودية الأصيلة بأسلوب يليق بضيوفكم، مع تقديم فاخر وخدمة استثنائية.", features: ["قهوة سعودية طازجة", "دلال نحاسية أصيلة", "تمر وحلويات فاخرة", "خدمة مستمرة"], outfits: [{ name: "زي سفرجية - 1", img: SAFARJIA_IMAGES.safarji1, desc: "زي تقليدي فاخر مع دلال نحاسية" }, { name: "زي سفرجية - 2", img: SAFARJIA_IMAGES.safarji2, desc: "ثوب سعودي أصيل مع بشت فاخر" }, { name: "زي سفرجية - 3", img: SAFARJIA_IMAGES.safarji3, desc: "ملابس تراثية بتصميم راقٍ" }, { name: "زي سفرجية - 4", img: SAFARJIA_IMAGES.safarji4, desc: "زي فاخر للمناسبات الخاصة" }] },
      { id: "sawas", title: "سوّاس", subtitle: "Traditional Hospitality", img: SAWAS_IMAGES.mainBg, description: "تجربة ضيافة تراثية حية، حيث يقدم السوّاس بزيّه الفلكلوري الأصيل وإبريقه النحاسي المشروبات بأسلوب استعراضي فاخر يعكس كرم الضيافة.", features: ["مشروبات متنوعة", "زي فلكلوري أصيل", "استعراض وتقديم حي", "إبريق نحاسي فاخر"], outfits: [{ name: "الزي التراثي الأصيل", img: SAWAS_IMAGES.style1, desc: "تقديم المشروبات بأسلوب فلكلوري يعكس الأصالة" }, { name: "ضيافة استعراضية", img: SAWAS_IMAGES.style2, desc: "أجواء تراثية فخمة تلفت أنظار ضيوفكم" }, { name: "تقديم فاخر", img: SAWAS_IMAGES.style3, desc: "تكامل بين جودة الضيافة والمظهر التراثي" }, { name: "أجواء متكاملة", img: SAWAS_IMAGES.style4, desc: "عناصر ديكورية تراثية تصاحب خدمة التقديم" }] },
    ],
  },
  {
    key: "female", label: "الخدمات النسائية", sublabel: "Female Hospitality", icon: "👩‍💼", color: "#D4A017",
    services: [
      {
        id: "hostesses",
        title: "مضيفات",
        subtitle: "Female Hosts",
        img: FEMALE_SERVICES_IMAGES.mainBg,
        description: "مضيفات محترفات بمظهر راقٍ وخدمة استثنائية لمناسباتكم النسائية، مع تدريب عالي المستوى.",
        features: ["مظهر أنيق وراقٍ", "خدمة احترافية", "تنسيق المناسبات", "استقبال VIP"],
        outfits: [
          { name: "عباءة فاخرة - 1", img: FEMALE_SERVICES_IMAGES.female1, desc: "عباءة مصممة خصيصاً بأناقة فائقة" },
          { name: "عباءة فاخرة - 2", img: FEMALE_SERVICES_IMAGES.female2, desc: "عباءة راقية بتصميم مميز" },
          { name: "عباءة فاخرة - 3", img: FEMALE_SERVICES_IMAGES.female3, desc: "زي فاخر للمناسبات الراقية" },
          { name: "عباءة فاخرة - 4", img: FEMALE_SERVICES_IMAGES.female4, desc: "تصميم حديث مع لمسة تراثية" },
        ],
      },
      {
        id: "safarjiat",
        title: "سفرجيات",
        subtitle: "Female Butlers",
        img: FEMALE_SERVICES_IMAGES.female5,
        description: "سفرجيات محترفات يقدمن القهوة السعودية والشاي والتمر بأسلوب راقٍ للمناسبات النسائية.",
        features: ["قهوة سعودية طازجة", "دلال فاخرة", "تمر وحلويات", "خدمة متواصلة"],
        outfits: [
          { name: "زي سفرجية - 1", img: FEMALE_SERVICES_IMAGES.female5, desc: "زي أنيق خاص بالسفرجيات" },
          { name: "زي سفرجية - 2", img: FEMALE_SERVICES_IMAGES.female6, desc: "زي رسمي فاخر" },
          { name: "زي سفرجية - 3", img: FEMALE_SERVICES_IMAGES.female7, desc: "ملابس تراثية راقية" },
          { name: "زي سفرجية - 4", img: FEMALE_SERVICES_IMAGES.female8, desc: "تصميم حديث فاخر" },
        ],
      },
      {
        id: "cleaning-female",
        title: "عاملات نظافة",
        subtitle: "Cleaning Staff",
        img: SERVICES_FEMALE_EXTENDED.cleaning[0],
        description: "طاقم نظافة نسائي مدرب ومتخصص لضمان نظافة المكان طوال فترة المناسبة.",
        features: ["تنظيف مستمر", "معدات حديثة", "فريق مدرب", "خدمة سريعة"],
        outfits: [
          { name: "زي عمل - 1", img: SERVICES_FEMALE_EXTENDED.cleaning[0], desc: "زي عمل أنيق ومريح" },
          { name: "زي عمل - 2", img: SERVICES_FEMALE_EXTENDED.cleaning[1], desc: "زي عمل مميز" },
        ],
      },
    ],
  },
  {
    key: "artistic", label: "الخدمات الفنية", sublabel: "Artistic Services", icon: "🎨", color: "#F0C040",
    services: [
      { id: "calligrapher", title: "خطاط", subtitle: "Arabic Calligrapher", img: SERVICE_IMAGES.calligrapher, description: "خطاط محترف يضيف لمسة فنية راقية لمناسباتكم.", features: ["خط عربي أصيل", "كتابة أسماء الضيوف", "لوحات فنية حية", "هدايا مخصصة"], outfits: [] },
      { id: "artist", title: "رسّام بورتريه", subtitle: "Portrait Artist", img: SERVICE_IMAGES.artist, description: "رسام بورتريه محترف يرسم لوحات حية لضيوفكم.", features: ["رسم حي سريع", "أنماط متنوعة", "هدايا تذكارية", "تجربة تفاعلية"], outfits: [] },
      { id: "folkband", title: "فرقة شعبية", subtitle: "Folk Band", img: SERVICE_IMAGES.folkband, description: "فرقة شعبية تضيف أجواء حماسية أصيلة لمناسباتكم.", features: ["عرض حي", "أغاني تراثية", "أجواء حماسية", "فقرات متنوعة"], outfits: [] },
      { id: "heritage-tent", title: "خيمة تراثية", subtitle: "Heritage Tent", img: SERVICE_IMAGES.heritageTent, description: "خيمة تراثية سعودية مجهزة بالكامل لإضافة لمسة أصالة.", features: ["تجهيز كامل", "ديكور تراثي", "إضاءة مميزة", "أحجام متعددة"], outfits: [] },
      { id: "counter", title: "كاونتر ضيافة", subtitle: "Hospitality Counter", img: SERVICE_IMAGES.counter, description: "كاونتر ضيافة فاخر مجهز بالكامل.", features: ["تصميم أنيق", "تجهيزات كاملة", "أحجام متعددة", "توصيل وتركيب"], outfits: [] },
      { id: "photo-booth", title: "ركن التصوير", subtitle: "Photo Booth", img: SERVICE_IMAGES.photoBooth, description: "ركن تصوير احترافي لتوثيق لحظات مناسباتكم.", features: ["خلفيات متنوعة", "طباعة فورية", "إكسسوارات ممتعة", "صور رقمية"], outfits: [] },
      { id: "buffet", title: "بوفيه متكامل", subtitle: "Full Buffet", img: SERVICE_IMAGES.buffet, description: "تجهيز بوفيه متكامل بأطباق فاخرة ومتنوعة.", features: ["أطباق عالمية", "تقديم فاخر", "معدات حديثة", "فريق متخصص"], outfits: [] },
      { id: "mobile-table", title: "طاولة متنقلة", subtitle: "Mobile Table", img: SERVICE_IMAGES.mobileTable, description: "طاولة متنقلة فاخرة لتقديم المشروبات والحلويات.", features: ["تصميم أنيق", "حركة سهلة", "أحجام متعددة", "تخصيص كامل"], outfits: [] },
    ],
  },
];

function ServiceModal({ service, onClose }: { service: ServiceItem; onClose: () => void }) {
  const [selectedOutfit, setSelectedOutfit] = useState(0);

  const handleDragEnd = (event: any, info: any) => {
    if (service.outfits.length <= 1) return;
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      // Swipe Right -> Previous
      setSelectedOutfit((prev) => (prev === 0 ? service.outfits.length - 1 : prev - 1));
    } else if (info.offset.x < -swipeThreshold) {
      // Swipe Left -> Next
      setSelectedOutfit((prev) => (prev === service.outfits.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] flex items-center justify-center p-1 sm:p-4" onClick={onClose} role="dialog" aria-modal="true" aria-label={`تفاصيل خدمة ${service.title}`}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      <motion.div initial={{ opacity: 0, scale: 0.92, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 30 }} transition={{ type: "spring", damping: 25, stiffness: 250 }} onClick={(e) => e.stopPropagation()} className="relative w-[98%] sm:max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl flex flex-col md:flex-row" style={{ background: "linear-gradient(160deg, rgba(25,20,8,0.98), rgba(15,12,5,0.99))", border: "1px solid rgba(184,134,11,0.25)", boxShadow: "0 40px 80px rgba(0,0,0,0.8)" }}>
        <button onClick={onClose} className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full flex items-center justify-center text-[#F5F5DC]/60 hover:text-[#F5F5DC] transition-colors" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(10px)" }}>✕</button>
        
        {/* Image Section with Gallery Swipe */}
        <div className="relative w-full md:w-1/2 aspect-[3/4] md:aspect-auto overflow-hidden touch-none flex-shrink-0">
          <div className="flex w-full h-full transition-transform duration-500 ease-out" style={{ transform: `translateX(-${selectedOutfit * 100}%)`, direction: 'ltr' }}>
            {service.outfits.length > 0 ? (
              service.outfits.map((o, i) => (
                <div key={i} className="w-full h-full flex-shrink-0">
                  <ImageWithFallback src={o.img} alt={o.name} className="w-full h-full object-cover" />
                </div>
              ))
            ) : (
              <div className="w-full h-full flex-shrink-0">
                <ImageWithFallback src={service.img} alt={service.title} className="w-full h-full object-cover" />
              </div>
            )}
          </div>
          
          {/* Swipe Overlay */}
          <motion.div 
            drag="x" 
            dragConstraints={{ left: 0, right: 0 }} 
            onDragEnd={handleDragEnd}
            className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing"
          />

          <div className="absolute inset-0 img-overlay md:hidden pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:hidden">
            <p className="text-[#B8860B] text-xs mb-1" style={{ letterSpacing: "0.15em" }}>{service.subtitle}</p>
            <h2 className="text-[#F5F5DC]" style={{ fontSize: "1.8rem", fontWeight: 800}}>{service.title}</h2>
            {service.outfits.length > 0 && (
              <p className="text-[#B8860B] text-sm mt-1 font-medium">{service.outfits[selectedOutfit].name}</p>
            )}
          </div>
        </div>

        {/* Content Section - Responsive Layout */}
        <div className="w-full md:w-1/2 p-3 sm:p-8 overflow-y-auto flex flex-col bg-[#0A0802]/40 backdrop-blur-sm">
          <div className="hidden md:block mb-6">
            <p className="text-[#B8860B] text-xs mb-1" style={{ letterSpacing: "0.15em" }}>{service.subtitle}</p>
            <h2 className="text-[#F5F5DC]" style={{ fontSize: "2.2rem", fontWeight: 800, lineHeight: 1.2 }}>{service.title}</h2>
            {service.outfits.length > 0 && (
              <p className="text-[#B8860B] text-sm mt-2 font-medium">{service.outfits[selectedOutfit].name}</p>
            )}
          </div>

          <p className="text-[#F5F5DC]/65 text-[11px] md:text-base leading-tight md:leading-relaxed mb-4 md:mb-6">{service.description}</p>
          
          <div className="grid grid-cols-2 gap-1.5 md:gap-4 mb-4 md:mb-8">
            {service.features.map((f, i) => (
              <div key={i} className="flex items-center gap-1.5 md:gap-3">
                <div className="w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(184,134,11,0.15)", border: "1px solid rgba(184,134,11,0.2)" }}>
                  <svg viewBox="0 0 16 16" fill="#B8860B" className="w-2.5 h-2.5 md:w-3 md:h-3"><path d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z" /></svg>
                </div>
                <span className="text-[#F5F5DC]/60 md:text-[#F5F5DC]/70 text-[10px] md:text-sm">{f}</span>
              </div>
            ))}
          </div>

          {service.outfits.length > 0 && (
            <div className="mt-auto">
              <h3 className="text-[#B8860B] text-[10px] md:text-xs mb-2 md:mb-3 uppercase tracking-wider font-bold">الأزياء المتاحة</h3>
              <div className="flex gap-1.5 md:gap-2 overflow-x-auto scroll-hide pb-1 md:pb-2">
                {service.outfits.map((o, i) => (
                  <button key={i} onClick={() => setSelectedOutfit(i)} className="flex-shrink-0 w-16 md:w-20 rounded-lg md:rounded-xl overflow-hidden transition-all duration-300 group" style={{ border: selectedOutfit === i ? "1.5px solid #B8860B" : "1.5px solid rgba(184,134,11,0.1)", opacity: selectedOutfit === i ? 1 : 0.5 }}>
                    <ImageWithFallback src={o.img} alt={o.name} className="w-full h-12 md:h-16 object-cover group-hover:scale-110 transition-transform duration-500" />
                  </button>
                ))}
              </div>
            </div>
          )}


        </div>
      </motion.div>
    </motion.div>
  );
}

// Royal Trio Sticky Navigation Component
function RoyalTrioNav({ activeTab, onTabChange }: { activeTab: number; onTabChange: (index: number) => void }) {
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
      <motion.section
        ref={navRef}
        className={`w-full transition-all duration-300 ${isSticky ? 'fixed top-0 left-0 right-0 z-50' : 'relative'}`}
        animate={{
          paddingTop: isSticky ? '16px' : '32px',
          paddingBottom: isSticky ? '16px' : '32px',
          background: isSticky ? 'rgba(15, 15, 15, 0.95)' : 'transparent',
          backdropFilter: isSticky ? 'blur(16px)' : 'none',
          borderBottom: isSticky ? '1px solid rgba(184, 134, 11, 0.15)' : 'none',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center gap-4 sm:gap-6">
            {categories.map((cat, idx) => (
              <motion.button
                key={cat.key}
                onClick={() => onTabChange(idx)}
                className="relative group flex-1 max-w-xs"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Background with Glassmorphism */}
                <motion.div
                  className="absolute inset-0 rounded-3xl transition-all duration-300"
                  animate={{
                    background: activeTab === idx
                      ? 'linear-gradient(135deg, rgba(184, 134, 11, 0.25), rgba(212, 160, 23, 0.15))'
                      : 'rgba(0, 0, 0, 0.25)',
                    border: activeTab === idx
                      ? '2px solid rgba(184, 134, 11, 0.7)'
                      : '1.5px solid rgba(184, 134, 11, 0.15)',
                    boxShadow: activeTab === idx
                      ? '0 0 30px rgba(184, 134, 11, 0.4), inset 0 0 20px rgba(184, 134, 11, 0.1)'
                      : 'none',
                  }}
                />

                {/* Content Container */}
                <div className="relative flex flex-col items-center justify-center p-4 sm:p-6 h-full">
                  {/* Icon - Animated Visibility */}
                  <motion.span
                    className="text-5xl sm:text-6xl overflow-hidden"
                    animate={{
                      opacity: isSticky ? 0 : 1,
                      scale: isSticky ? 0 : (activeTab === idx ? 1.3 : 1),
                      height: isSticky ? 0 : 'auto',
                      marginBottom: isSticky ? 0 : '0.5rem',
                      filter: activeTab === idx ? 'drop-shadow(0 0 12px rgba(184, 134, 11, 0.8))' : 'none',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  >
                    {cat.icon}
                  </motion.span>

                  {/* Label */}
                  <motion.p
                    className="text-center font-bold leading-tight"
                    animate={{
                      color: activeTab === idx ? '#D4A017' : '#F5F5DC',
                      opacity: activeTab === idx ? 1 : 0.65,
                      fontSize: isSticky ? '0.85rem' : '0.95rem',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {cat.label}
                  </motion.p>
                </div>

                {/* Active Indicator Line */}
                {activeTab === idx && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B8860B] via-[#D4A017] to-[#B8860B]"
                    style={{ borderRadius: '2px' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}

function ServiceCard({ service, onClick, index }: { service: ServiceItem; onClick: () => void; index: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: index * 0.06, duration: 0.5 }} onClick={onClick} className="relative rounded-2xl overflow-hidden group cursor-pointer h-full" style={{ minHeight: "100%" }}>
      <ImageWithFallback src={service.img} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
      <div className="absolute inset-0 img-overlay" />
      <div className="absolute inset-0 bg-[#B8860B]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[#B8860B]" style={{ fontSize: "0.65rem", background: "rgba(10,8,2,0.85)", backdropFilter: "blur(10px)", border: "1px solid rgba(184,134,11,0.3)", letterSpacing: "0.05em" }}>{service.subtitle}</div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-[#F5F5DC]" style={{ fontSize: "1.05rem", fontWeight: 700 }}>{service.title}</h3>
        <p className="text-[#F5F5DC]/50 text-xs mt-1 line-clamp-2">{service.description}</p>
      </div>
    </motion.div>
  );
}

export default function ServicesClient() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedService(null);
    };
    if (selectedService) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [selectedService]);

  const currentCategory = categories[activeTab];

  return (
    <div>
      <Breadcrumbs />
      {/* HERO */}
      <section className="relative pt-6 pb-10 px-4 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 20%, rgba(184,134,11,0.08) 0%, transparent 60%)" }} />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-[#B8860B] mb-3" style={{ fontSize: "0.75rem", letterSpacing: "0.35em" }}>✦ خدماتنا ✦</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-[#F5F5DC] mb-4 font-tajawal" style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", fontWeight: 900, lineHeight: 1.15}}>باقة متكاملة من<br /><span className="gold-gradient-text">الضيافة الفاخرة</span></motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-[#F5F5DC]/55 max-w-xl mx-auto text-sm leading-relaxed">اكتشف مجموعة خدماتنا المتكاملة المصممة لتلبية جميع احتياجات الضيافة في مناسباتكم</motion.p>
        </div>
      </section>

      {/* ROYAL TRIO STICKY NAV */}
      <RoyalTrioNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* SERVICES GRID */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[300px] sm:auto-rows-[350px] lg:auto-rows-[400px]">
                {currentCategory.services.map((service, i) => (
                  <ServiceCard key={service.id} service={service} onClick={() => setSelectedService(service)} index={i} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} className="mt-16 text-center p-8 sm:p-12 rounded-3xl relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(25,20,8,0.9), rgba(15,12,5,0.95))", border: "1px solid rgba(184,134,11,0.2)" }}>
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(184,134,11,0.06) 0%, transparent 70%)" }} />
            <div className="relative z-10">
              <h2 className="text-[#F5F5DC] mb-3" style={{ fontSize: "clamp(1.4rem, 3.5vw, 2rem)", fontWeight: 800}}>لم تجد ما تبحث عنه؟</h2>
              <p className="text-[#F5F5DC]/50 text-sm mb-6 max-w-lg mx-auto">تواصل معنا وسنصمم لك باقة ضيافة مخصصة تناسب مناسبتك</p>
              <a href={`https://wa.me/${WA}?text=${encodeURIComponent("مرحباً، أود الاستفسار عن خدمات الضيافة لديكم.")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white" style={{ background: "linear-gradient(135deg, #1da851, #25D366)", fontWeight: 700, boxShadow: "0 6px 25px rgba(37,211,102,0.35)" }}>
                <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                تواصل عبر واتساب
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {selectedService && <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />}
      </AnimatePresence>
    </div>
  );
}
