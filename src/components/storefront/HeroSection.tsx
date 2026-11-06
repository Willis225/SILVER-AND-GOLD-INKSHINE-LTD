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
import { InstantPrintEstimator, QuoteDetails } from './InstantPrintEstimator';

interface HeroSectionProps {
  onExploreProducts: () => void;
  onOpenPricingSandbox?: () => void;
  onSelectProductQuickView?: (productId: string) => void;
  onSelectCategory?: (category: string) => void;
  onOpenCustomQuote?: () => void;
  slides?: HeroSlideItem[];
  headline?: string;
  subheadline?: string;
  eyebrow?: string;
  description?: string;
  backgroundImageUrl?: string;
  estimatorSideBackgroundImage?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProducts,
  onOpenPricingSandbox,
  onSelectProductQuickView,
  onSelectCategory,
  onOpenCustomQuote,
  slides,
  headline = '#1 Online Printing & Branding Company in Bayelsa',
  subheadline = 'Banners, Branding, Digital Printing & Packaging',
  eyebrow = '#1 Online Printing & Branding in Bayelsa',
  description = 'Buy your custom products online and have them delivered across Bayelsa.',
  backgroundImageUrl = 'https://cdn.hstockplus.org/uploads/public/img-1790066633477-1b16a758309b0fff.webp',
  estimatorSideBackgroundImage = '/assets/aistudio/image_bb9a9b8c.png',
}) => {
  return (
    <section className="relative bg-transparent text-white overflow-hidden border-none selection:bg-[#f5be38] selection:text-black">
      {/* Desktop: Right-Side Industrial Printing Machine Background seamlessly faded on the left with ultra-soft alpha mask */}
      <div 
        className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0 hidden lg:block"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, transparent 35%, rgba(0, 0, 0, 0.03) 48%, rgba(0, 0, 0, 0.18) 58%, rgba(0, 0, 0, 0.5) 70%, rgba(0, 0, 0, 0.85) 84%, black 98%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 35%, rgba(0, 0, 0, 0.03) 48%, rgba(0, 0, 0, 0.18) 58%, rgba(0, 0, 0, 0.5) 70%, rgba(0, 0, 0, 0.85) 84%, black 98%)',
        }}
        aria-hidden="true"
      >
        <div 
          className="w-full h-full relative"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
          }}
        >
          <img
            src={estimatorSideBackgroundImage}
            alt="Silver & Gold Industrial Printing Machine"
            className="w-full h-full object-cover object-[75%_center] xl:object-[82%_center] opacity-85"
          />
          {/* Subtle vignette for high-end cinematic contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
        </div>
      </div>

      {/* Mobile & Tablet: Seamless vertical fade behind estimator */}
      <div 
        className="absolute inset-x-0 bottom-0 top-[40%] pointer-events-none select-none overflow-hidden z-0 lg:hidden"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 15%, rgba(0,0,0,0.6) 35%, black 65%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 15%, rgba(0,0,0,0.6) 35%, black 65%, transparent 100%)',
        }}
        aria-hidden="true"
      >
        <img
          src={estimatorSideBackgroundImage}
          alt="Silver & Gold Industrial Printing Machine"
          className="w-full h-full object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* =====================================================================
              LEFT COLUMN: BESPOKE COMMERCIAL EDITORIAL ARCHITECTURE
              ===================================================================== */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center space-y-7 z-20">
            


            {/* 2. Primary Display Headline & Editorial Subheadline */}
            <motion.div 
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3.5"
            >
              <h1 className="font-display text-3xl xs:text-4xl sm:text-5xl lg:text-[48px] xl:text-[56px] font-extrabold tracking-[-0.03em] text-white leading-[1.08] text-balance">
                {headline}
              </h1>

              <div className="font-display text-lg xs:text-xl sm:text-2xl lg:text-[25px] font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#ffd25d] via-[#f5be38] to-stone-200">
                {subheadline}
              </div>

              {/* Description Prose */}
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal pt-1 text-pretty">
                {description}
              </p>
            </motion.div>



            {/* 4. Action Buttons: Refined Architectural Radiuses & Micro-Interactions */}
            <motion.div 
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 pt-1"
            >
              {/* Primary Action Button */}
              <button
                type="button"
                onClick={onExploreProducts}
                className="h-12 px-7 rounded-xl bg-white hover:bg-stone-100 text-stone-950 font-bold text-sm inline-flex items-center justify-center gap-2.5 shadow-[0_4px_20px_rgba(255,255,255,0.18)] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4 text-stone-950 stroke-[2.5]" />
              </button>

              {/* Secondary Action: Direct Consultation */}
              <a
                href="https://wa.me/2347030372539?text=Hello%20Silver%20%26%20Gold%20Inkshine%20Ltd%2C%20I%20would%20like%20to%20get%20a%20free%20quote"
                target="_blank"
                rel="noreferrer"
                className="h-12 px-7 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 backdrop-blur-md active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Direct WhatsApp Desk</span>
                <ArrowRight className="w-4 h-4 text-[#f5be38] stroke-[2.5]" />
              </a>
            </motion.div>



          </div>

          {/* =====================================================================
              RIGHT COLUMN: INSTANT PRINT ESTIMATOR INTERACTIVE WIDGET
              Integrated seamlessly as an authoritative precision console
              ===================================================================== */}
          <motion.div 
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 xl:col-span-5 w-full flex items-center justify-center lg:justify-end"
          >
            <div id="hero-instant-estimator" className="w-full max-w-[340px] sm:max-w-[360px]">
              <InstantPrintEstimator isFloating={false} />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
