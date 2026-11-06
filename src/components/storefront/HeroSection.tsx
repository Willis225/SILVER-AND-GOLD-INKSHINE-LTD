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
}) => {
  return (
    <section className="relative bg-transparent text-white overflow-hidden border-none selection:bg-[#f5be38] selection:text-black">

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
            <div id="hero-instant-estimator" className="w-full max-w-[420px]">
              <InstantPrintEstimator isFloating={false} />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
