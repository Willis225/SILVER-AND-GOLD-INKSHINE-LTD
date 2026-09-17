import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface SlideItem {
  id: string;
  imageUrl: string;
  alt: string;
}

// Exactly and exclusively the 7 images specified by the user
const SLIDES: SlideItem[] = [
  {
    id: 'slide-1',
    imageUrl: 'https://cdn.hstockplus.org/uploads/public/img-1789638023483-0654f1a516c4673a.webp',
    alt: 'Silver & Gold Inkshine Ltd - Showcase 1',
  },
  {
    id: 'slide-2',
    imageUrl: 'https://cdn.hstockplus.org/uploads/public/img-1789638121027-6ecd906745a42aaa.webp',
    alt: 'Silver & Gold Inkshine Ltd - Showcase 2',
  },
  {
    id: 'slide-3',
    imageUrl: 'https://cdn.hstockplus.org/uploads/public/img-1789638161792-fdf550c93a995761.webp',
    alt: 'Silver & Gold Inkshine Ltd - Showcase 3',
  },
  {
    id: 'slide-4',
    imageUrl: 'https://cdn.hstockplus.org/uploads/public/img-1789638184148-5858e68459451c46.webp',
    alt: 'Silver & Gold Inkshine Ltd - Showcase 4',
  },
  {
    id: 'slide-5',
    imageUrl: 'https://cdn.hstockplus.org/uploads/public/img-1789638210286-d54286b63f154e3c.webp',
    alt: 'Silver & Gold Inkshine Ltd - Showcase 5',
  },
  {
    id: 'slide-6',
    imageUrl: 'https://cdn.hstockplus.org/uploads/public/img-1789638255572-4a3ec89bf3a4c4fa.webp',
    alt: 'Silver & Gold Inkshine Ltd - Showcase 6',
  },
  {
    id: 'slide-7',
    imageUrl: 'https://cdn.hstockplus.org/uploads/public/img-1789638283912-8e755036c7f5a300.webp',
    alt: 'Silver & Gold Inkshine Ltd - Showcase 7',
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

  // Touch swipe handling for smartphones and tablets
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    const isLeftSwipe = distance > 40;
    const isRightSwipe = distance < -40;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  const currentSlide = SLIDES[currentIndex];

  return (
    <div 
      id="hero-image-slider-container"
      className="relative w-full h-[240px] xs:h-[280px] sm:h-[360px] md:h-[430px] overflow-hidden rounded-xl bg-[#08080a] select-none group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={nextSlide}
      title="Tap anywhere or swipe to view next picture"
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
              src={currentSlide.imageUrl}
              alt={currentSlide.alt}
              className="w-full h-full object-cover object-center pointer-events-none"
              loading="eager"
              referrerPolicy="no-referrer"
            />
            {/* Subtle aesthetic gradient vignette framing */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20 pointer-events-none" />
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

      {/* Minimal Animated Dot Indicators (Tap to jump directly to any of the 7 pictures) */}
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
