import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Star,
  Clock,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { HeroSlideItem } from '../../types/websiteContent';

interface HeroSectionProps {
  onExploreProducts: () => void;
  onOpenPricingSandbox?: () => void;
  onSelectProductQuickView?: (productId: string) => void;
  onSelectCategory?: (category: string) => void;
  slides?: HeroSlideItem[];
  headline?: string;
  subheadline?: string;
  eyebrow?: string;
  description?: string;
  backgroundImageUrl?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProducts,
  onOpenPricingSandbox,
  onSelectProductQuickView,
  onSelectCategory,
  slides,
  headline = '#1 Online Printing & Branding Company in Bayelsa',
  subheadline = 'Banners, Branding, Digital Printing & Packaging',
  eyebrow = 'Grow Your Brand with Premium, Fast Printing',
  description = 'Buy your custom products online and have them delivered across Bayelsa.',
  backgroundImageUrl = '/assets/aistudio/image_88a63b88.png',
}) => {
  return (
    <section className="relative bg-[#07080a] text-white overflow-hidden border-b border-white/10">
      {/* Background Animated Media (Playing and Animated in the Background, Clearly Showing) */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        <video
          src="/inkshine-printing-machine-animation.mp4"
          poster="/assets/aistudio/image_88a63b88.png"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center brightness-95 contrast-105"
        />

        {/* Semi-transparent dark overlay for text readability while keeping the background media clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-black/25" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:pl-8 lg:pr-0 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[520px] lg:min-h-[580px] xl:min-h-[620px]">
          
          {/* Left Column: Typography, Star Rating, Pill CTAs, Bottom Badges */}
          <div className="lg:col-span-6 xl:col-span-6 py-10 sm:py-14 lg:py-16 pr-0 lg:pr-6 flex flex-col justify-center space-y-6 sm:space-y-7 z-20">
            
            {/* Headline & Subheadline */}
            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3"
            >
              <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-[44px] xl:text-[50px] font-black tracking-tight text-white leading-[1.08] text-balance drop-shadow-md">
                {headline}
              </h1>

              <div className="text-xl xs:text-2xl sm:text-3xl lg:text-[28px] xl:text-[30px] font-extrabold tracking-tight text-[#f5be38] drop-shadow-sm">
                {subheadline}
              </div>

              {/* Description */}
              <p className="text-stone-200 text-sm sm:text-base leading-relaxed max-w-xl font-normal pt-1 drop-shadow-sm">
                {description}
              </p>
            </motion.div>

            {/* Gold Star Rating Row: 5 Stars + 4.9/5 | 2,500+ Happy Clients */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 pt-1"
            >
              <div className="flex items-center text-[#f5be38]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-[#f5be38] text-[#f5be38]" />
                ))}
              </div>
              <span className="font-bold text-white text-xs sm:text-sm tracking-tight drop-shadow-xs">
                4.9/5 | 2,500+ Happy Clients
              </span>
            </motion.div>

            {/* Pill-Shaped Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3.5 pt-1"
            >
              {/* White Pill Button: Explore Our Services */}
              <button
                type="button"
                onClick={onExploreProducts}
                className="h-11 px-6 rounded-full bg-white hover:bg-stone-100 text-black font-extrabold text-sm inline-flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>

              {/* Outline / Gold Accent Pill Button: Get a Free Quote */}
              <a
                href="https://wa.me/2347030372539?text=Hello%20Silver%20%26%20Gold%20Inkshine%20Ltd%2C%20I%20would%20like%20to%20get%20a%20free%20quote"
                target="_blank"
                rel="noreferrer"
                className="h-11 px-6 rounded-full bg-black/40 hover:bg-black/60 text-white font-bold text-sm inline-flex items-center justify-center gap-2 border border-white/40 hover:border-white/70 backdrop-blur-xs transition-all active:scale-95 cursor-pointer shadow-md"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-4 h-4 text-[#f5be38]" />
              </a>
            </motion.div>

            {/* Bottom Trust Badges: Fast Turnaround • Affordable Prices • 100% Satisfaction */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs sm:text-sm font-semibold text-stone-200"
            >
              <div className="flex items-center gap-2 drop-shadow-xs">
                <Clock className="w-4 h-4 text-[#f5be38] shrink-0" />
                <span>Fast Turnaround</span>
              </div>
              <div className="flex items-center gap-2 drop-shadow-xs">
                <Tag className="w-4 h-4 text-[#f5be38] shrink-0" />
                <span>Affordable Prices</span>
              </div>
              <div className="flex items-center gap-2 drop-shadow-xs">
                <ShieldCheck className="w-4 h-4 text-[#f5be38] shrink-0" />
                <span>100% Satisfaction</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Promotional Hero Image (Woman pointing towards left headline) */}
          <motion.div 
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 xl:col-span-6 relative w-full h-full pb-8 lg:pb-0 flex items-center justify-center lg:justify-end overflow-hidden"
          >
            {/* Image Wrapper: Maintains natural proportions on mobile/tablet, full-bleed flush on desktop */}
            <div className="relative w-full aspect-[1457/1079] sm:aspect-[1457/1079] lg:aspect-auto lg:h-full lg:min-h-[580px] xl:min-h-[620px] rounded-2xl lg:rounded-none overflow-hidden flex items-center justify-center lg:justify-end">
              <img
                src="/assets/aistudio/image_88a63b88.png"
                alt="Silver & Gold Printing Services Ambassador in Yenagoa Printing Studio"
                className="w-full h-full object-cover object-[32%_center] sm:object-[35%_center] lg:object-[32%_center] select-none"
                loading="eager"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('inkshine-hero-ambassador.png')) {
                    target.src = '/inkshine-hero-ambassador.png';
                  }
                }}
              />

              {/* Gentle blend gradients on desktop so image edges meet dark hero background naturally */}
              <div className="absolute inset-y-0 left-0 w-16 xl:w-24 bg-gradient-to-r from-black/80 to-transparent pointer-events-none hidden lg:block z-10" />
              <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#07080a] to-transparent pointer-events-none z-10" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
