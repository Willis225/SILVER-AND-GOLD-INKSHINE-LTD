import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';

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
  // Default to 'contain' so images fit 100% uncropped on every device size
  const [fitMode, setFitMode] = useState<'contain' | 'cover'>('contain');
  
  // Touch swipe tracking for mobile responsiveness
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
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

  // Continuous auto-sliding animation every 4.5 seconds, pauses on user hover or touch
  useEffect(() => {
    if (isHovered) {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      return;
    }

    autoplayTimerRef.current = window.setInterval(() => {
      nextSlide();
    }, 4500);

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [isHovered, nextSlide]);

  // Touch gesture handlers for mobile devices (phones and tablets)
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsHovered(true);
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsHovered(false);
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    
    const deltaX = touchStartXRef.current - e.changedTouches[0].clientX;
    const deltaY = touchStartYRef.current - e.changedTouches[0].clientY;

    // Detect horizontal swipe if deltaX is greater than vertical movement deltaY
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        // Swiped left -> show next
        nextSlide();
      } else {
        // Swiped right -> show previous
        prevSlide();
      }
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const currentSlide = SLIDES[currentIndex];

  return (
    <div 
      id="hero-image-slider-container"
      className="relative w-full h-[260px] xs:h-[300px] sm:h-[360px] md:h-[420px] lg:h-[450px] xl:h-[480px] overflow-hidden rounded-xl sm:rounded-2xl bg-[#08080a] select-none group cursor-pointer touch-pan-y"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
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
                scale: 1.03,
              }),
              center: {
                x: 0,
                opacity: 1,
                scale: 1,
                transition: {
                  x: { type: 'spring', stiffness: 260, damping: 28 },
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.5 },
                },
              },
              exit: (dir: number) => ({
                x: dir > 0 ? '-100%' : '100%',
                opacity: 0,
                scale: 0.97,
                transition: {
                  x: { type: 'spring', stiffness: 260, damping: 28 },
                  opacity: { duration: 0.35 },
                },
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full transform-gpu"
          >
            {/* Layer 1: Ambient Backdrop Glow (Fills all device aspect ratios with matching vibrant color) */}
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
              <img 
                src={currentSlide.imageUrl}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover blur-2xl opacity-40 scale-110 filter transform-gpu pointer-events-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/40 pointer-events-none" />
            </div>

            {/* Layer 2: Main High-Resolution Foreground Image (100% uncropped and responsive on all devices) */}
            <div className="relative z-10 w-full h-full flex items-center justify-center p-1 sm:p-2">
              <img 
                src={currentSlide.imageUrl}
                alt={currentSlide.alt}
                className={`w-full h-full ${
                  fitMode === 'contain' 
                    ? 'object-contain object-center drop-shadow-2xl' 
                    : 'object-cover object-center'
                } pointer-events-none transition-all duration-300 max-h-full max-w-full`}
                loading="eager"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Counter Badge: Top Left (Shows current slide index cleanly on all devices) */}
        <div 
          className="absolute top-3 left-3 z-30 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/90 text-[11px] font-semibold tracking-wide shadow-lg pointer-events-none"
        >
          <span className="text-[#dfbc5e]">{currentIndex + 1}</span>
          <span className="text-white/40">/</span>
          <span>{SLIDES.length}</span>
        </div>

        {/* Fit Mode Switcher: Top Right (Toggle between 100% uncropped fit vs full bleed cover) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setFitMode((prev) => (prev === 'contain' ? 'cover' : 'contain'));
          }}
          aria-label={fitMode === 'contain' ? 'Expand to fill frame' : 'Fit entire picture'}
          title={fitMode === 'contain' ? 'Fill frame' : 'Fit entire picture uncropped'}
          className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/60 hover:bg-black/80 active:scale-90 text-white/80 hover:text-white border border-white/15 backdrop-blur-md transition-all cursor-pointer shadow-lg flex items-center justify-center"
        >
          {fitMode === 'contain' ? (
            <Maximize2 className="w-3.5 h-3.5 text-[#dfbc5e]" />
          ) : (
            <Minimize2 className="w-3.5 h-3.5 text-[#dfbc5e]" />
          )}
        </button>

        {/* Previous Slide Tap Button (Responsive sizing with 44px touch target) */}
        <button
          id="hero-slider-prev-btn"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          aria-label="Previous image"
          className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/65 hover:bg-black/90 active:scale-90 text-white/90 hover:text-white border border-white/20 backdrop-blur-md transition-all cursor-pointer shadow-xl flex items-center justify-center opacity-85 sm:opacity-0 sm:group-hover:opacity-100"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Next Slide Tap Button (Responsive sizing with 44px touch target) */}
        <button
          id="hero-slider-next-btn"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          aria-label="Next image"
          className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/65 hover:bg-black/90 active:scale-90 text-white/90 hover:text-white border border-white/20 backdrop-blur-md transition-all cursor-pointer shadow-xl flex items-center justify-center opacity-85 sm:opacity-0 sm:group-hover:opacity-100"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Minimal Animated Dot Indicators (Tap to jump directly to any of the 7 pictures) */}
      <div 
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 shadow-lg"
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
              className={`h-1.5 rounded-full transition-all cursor-pointer p-0.5 ${
                isActive 
                  ? 'w-6 bg-[#dfbc5e]' 
                  : 'w-2 bg-white/40 hover:bg-white/75'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};
