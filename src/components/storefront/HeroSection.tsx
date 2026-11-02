import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
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
  headline = '#1 Online Printing Company in Bayelsa',
  subheadline = 'Banners • Branding • Digital Printing',
  eyebrow = 'Grow Your Brand with Premium, Fast Printing',
  description = 'Buy your custom products online and have them delivered across Bayelsa.',
  backgroundImageUrl = 'https://cdn.hstockplus.org/uploads/public/img-1790066633477-1b16a758309b0fff.webp',
}) => {
  return (
    <section className="relative bg-[#07080a] text-white overflow-hidden border-b border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-60" />
        <div className="absolute -top-32 -left-32 w-96 sm:w-[500px] h-96 sm:h-[500px] rounded-full bg-[radial-gradient(circle,rgba(245,190,56,0.12)_0%,transparent_70%)] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[500px] lg:min-h-[580px]">
          
          {/* Left Column: Typography, Star Rating, Pill CTAs, Bottom Badges */}
          <div className="lg:col-span-7 xl:col-span-7 py-12 sm:py-16 lg:py-20 pr-0 lg:pr-8 flex flex-col justify-center space-y-6 sm:space-y-7">
            
            {/* Headline & Subheadline */}
            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3"
            >
              <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-[48px] xl:text-[54px] font-black tracking-tight text-white leading-[1.08] text-balance">
                {headline}
              </h1>

              <div className="text-xl xs:text-2xl sm:text-3xl lg:text-[32px] font-extrabold tracking-tight text-stone-200">
                {subheadline}
              </div>

              {/* Description */}
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal pt-1">
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
              <span className="font-bold text-white text-xs sm:text-sm tracking-tight">
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
                className="h-11 px-6 rounded-full bg-white hover:bg-stone-100 text-black font-extrabold text-sm inline-flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>

              {/* Outline / Gold Accent Pill Button: Get a Free Quote */}
              <a
                href="https://wa.me/2347030372539?text=Hello%20Silver%20%26%20Gold%20Inkshine%20Ltd%2C%20I%20would%20like%20to%20get%20a%20free%20quote"
                target="_blank"
                rel="noreferrer"
                className="h-11 px-6 rounded-full bg-transparent hover:bg-white/10 text-white font-bold text-sm inline-flex items-center justify-center gap-2 border border-white/30 hover:border-white/60 transition-all active:scale-95 cursor-pointer"
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
              className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs sm:text-sm font-semibold text-stone-300"
            >
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#f5be38] shrink-0" />
                <span>Fast Turnaround</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#f5be38] shrink-0" />
                <span>Affordable Prices</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#f5be38] shrink-0" />
                <span>100% Satisfaction</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Flush / Full-Bleed Hero Image to Top, Bottom, and Right */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 xl:col-span-5 relative w-full h-full min-h-[420px] lg:min-h-full overflow-hidden flex items-end justify-center lg:justify-end"
          >
            <div className="relative w-full h-full flex items-center justify-center lg:justify-end">
              <img
                src="/inkshine-brand-portrait.png"
                alt="Silver & Gold Inkshine Ltd Printing Press Ambassador"
                className="w-full h-full object-cover object-top lg:object-right-top"
                loading="eager"
              />
              {/* Gentle bottom & left gradient fade to blend with dark container */}
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#07080a] to-transparent pointer-events-none hidden lg:block" />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#07080a] to-transparent pointer-events-none lg:hidden" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
