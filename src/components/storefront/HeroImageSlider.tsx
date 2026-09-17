import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface SlideItem {
  id: string;
  filename: string;
  alt: string;
  fallbackUrl: string;
}

// All 14 authentic images provided by Silver & Gold Inkshine Ltd
const SLIDES: SlideItem[] = [
  {
    id: 'slide-storefront-main',
    filename: 'WhatsApp Image 2026-09-17 at 2.13.06 AM (10).jpeg',
    alt: 'Silver & Gold Inkshine Ltd Commercial Storefront - RC 9350634',
    fallbackUrl: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=1400&auto=format&fit=crop&q=85',
  },
  {
    id: 'slide-storefront-angle',
    filename: 'WhatsApp Image 2026-09-17 at 2.13.06 AM (5).jpeg',
    alt: 'Silver & Gold Inkshine Ltd Exterior Billboard and Entrance',
    fallbackUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1400&auto=format&fit=crop&q=85',
  },
  {
    id: 'slide-press-room',
    filename: 'WhatsApp Image 2026-09-17 at 2.13.04 AM.jpeg',
    alt: 'Silver & Gold Inkshine Production Showroom and Large Format Printer',
    fallbackUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1400&auto=format&fit=crop&q=85',
  },
  {
    id: 'slide-workshop-rolls',
    filename: 'WhatsApp Image 2026-09-17 at 2.13.05 AM.jpeg',
    alt: 'Silver & Gold Inkshine Printing Press and Media Roll Racks',
    fallbackUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1400&auto=format&fit=crop&q=85',
  },
  {
    id: 'slide-ncdmb-tower',
    filename: 'WhatsApp Image 2026-09-17 at 2.13.06 AM (4).jpeg',
    alt: 'Nigerian Content Tower Landmark, Swali Yenagoa Bayelsa State',
    fallbackUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&auto=format&fit=crop&q=85',
  },
  {
    id: 'slide-gov-house-gate',
    filename: 'WhatsApp Image 2026-09-17 at 2.13.06 AM.jpeg',
    alt: 'Government House Yenagoa Gate and Flagpoles',
    fallbackUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1400&auto=format&fit=crop&q=85',
  },
  {
    id: 'slide-gov-house-monument',
    filename: 'WhatsApp Image 2026-09-17 at 2.13.06 AM (1).jpeg',
    alt: 'Welcome to Government House Yenagoa Monument Plinth',
    fallbackUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1400&auto=format&fit=crop&q=85',
  },
  {
    id: 'slide-roundabout-aerial',
    filename: 'WhatsApp Image 2026-09-17 at 2.13.06 AM (2).jpeg',
    alt: 'Yenagoa City Roundabout Monument Aerial View',
    fallbackUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1400&auto=format&fit=crop&q=85',
  },
  {
    id: 'slide-city-commercial-aerial',
    filename: 'WhatsApp Image 2026-09-17 at 2.13.05 AM (1).jpeg',
    alt: 'Yenagoa Commercial Center and Market Aerial Landscape',
    fallbackUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&auto=format&fit=crop&q=85',
  },
  {
    id: 'slide-park-canopy',
    filename: 'WhatsApp Image 2026-09-17 at 2.13.06 AM (3).jpeg',
    alt: 'Bayelsa Recreation Center Tensile Canopy Pavilion',
    fallbackUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1400&auto=format&fit=crop&q=85',
  },
  {
    id: 'slide-commercial-street',
    filename: 'WhatsApp Image 2026-09-17 at 2.13.06 AM (9).jpeg',
    alt: 'Commercial Street Yenagoa',
    fallbackUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1400&auto=format&fit=crop&q=85',
  },
  {
    id: 'slide-booth-sunlight',
    filename: 'WhatsApp Image 2026-09-17 at 2.13.06 AM (8).jpeg',
    alt: 'Commercial Avenue Yenagoa',
    fallbackUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1400&auto=format&fit=crop&q=85',
  },
  {
    id: 'slide-street-pharmacy',
    filename: 'WhatsApp Image 2026-09-17 at 2.13.06 AM (6).jpeg',
    alt: 'Yenagoa Street View',
    fallbackUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=1400&auto=format&fit=crop&q=85',
  },
  {
    id: 'slide-highway-view',
    filename: 'WhatsApp Image 2026-09-17 at 2.13.06 AM (7).jpeg',
    alt: 'Mbiama-Yenagoa Roadside View',
    fallbackUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1400&auto=format&fit=crop&q=85',
  },
];

export const HeroImageSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const autoplayTimerRef = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  const goToSlide = (idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  // Continuous auto-sliding animation every 4 seconds, pauses slightly on hover
  useEffect(() => {
    if (isHovered) {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      return;
    }

    autoplayTimerRef.current = window.setInterval(() => {
      nextSlide();
    }, 4000);

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [isHovered, nextSlide]);

  const currentSlide = SLIDES[currentIndex];
  const primarySrc = `/${currentSlide.filename}`;

  return (
    <div 
      id="hero-image-slider-container"
      className="relative w-full h-[320px] sm:h-[370px] md:h-[430px] overflow-hidden rounded-xl bg-[#08080a] select-none group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={nextSlide}
      title="Tap anywhere to see next picture"
    >
      {/* Sliding Viewport with Framer Motion AnimatePresence */}
      <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide.id}
            custom={direction}
            variants={{
              enter: (dir: number) => ({
                x: dir > 0 ? '100%' : '-100%',
                opacity: 0,
                scale: 1.04,
              }),
              center: {
                x: 0,
                opacity: 1,
                scale: 1,
                transition: {
                  x: { type: 'spring', stiffness: 260, damping: 28 },
                  opacity: { duration: 0.45 },
                  scale: { duration: 0.6 },
                },
              },
              exit: (dir: number) => ({
                x: dir > 0 ? '-100%' : '100%',
                opacity: 0,
                scale: 0.96,
                transition: {
                  x: { type: 'spring', stiffness: 260, damping: 28 },
                  opacity: { duration: 0.35 },
                },
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            {/* Pure full-bleed image display without any write-ups or labels */}
            <img 
              src={primarySrc}
              alt={currentSlide.alt}
              className="w-full h-full object-cover object-center pointer-events-none"
              loading="eager"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== currentSlide.fallbackUrl) {
                  target.src = currentSlide.fallbackUrl;
                }
              }}
            />
            {/* Subtle aesthetic gradient vignette framing */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/20 pointer-events-none" />
          </motion.div>
        </AnimatePresence>

        {/* Previous Slide Tap Button */}
        <button
          id="hero-slider-prev-btn"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/85 text-white/90 hover:text-white border border-white/20 backdrop-blur-md transition-all active:scale-90 cursor-pointer shadow-xl opacity-80 sm:opacity-0 sm:group-hover:opacity-100"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Next Slide Tap Button */}
        <button
          id="hero-slider-next-btn"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          aria-label="Next image"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/85 text-white/90 hover:text-white border border-white/20 backdrop-blur-md transition-all active:scale-90 cursor-pointer shadow-xl opacity-80 sm:opacity-0 sm:group-hover:opacity-100"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Minimal Animated Dot Indicators (Tap to jump directly to any picture) */}
      <div 
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => goToSlide(idx)}
              aria-label={`Jump to picture ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                isActive 
                  ? 'w-6 bg-[#dfbc5e]' 
                  : 'w-1.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};
