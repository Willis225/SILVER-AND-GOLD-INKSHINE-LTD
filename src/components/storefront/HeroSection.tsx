import React from 'react';
import { motion, type Variants } from 'motion/react';
import { 
  ArrowRight, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { HeroImageSlider } from './HeroImageSlider';

interface HeroSectionProps {
  onExploreProducts: () => void;
  onOpenPricingSandbox: () => void;
  onSelectProductQuickView: (productId: string) => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProducts,
  onOpenPricingSandbox,
  onSelectProductQuickView,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#07080a] text-white pt-8 pb-14 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24">
      {/* 
        Dark Sleek Minimalist UI Website Hero Background:
        - Moody dark aesthetic with dark charcoal textured backdrop
        - Soft subtle vertical silky light rays and shadows falling top-to-bottom
        - Faint subtle geometric grid lines in the center
      */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <img 
          src="/assets/hero-dark-texture.svg" 
          alt="Dark sleek minimalist hero background with vertical silky light rays and faint geometric grid" 
          className="w-full h-full object-cover object-center opacity-60"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Subtle warm gold ambient atmospheric light blooms */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] lg:w-[600px] h-[300px] sm:h-[500px] lg:h-[600px] rounded-full bg-[radial-gradient(circle,rgba(235,208,127,0.14)_0%,rgba(212,175,55,0.05)_45%,transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[250px] sm:w-[380px] h-[250px] sm:h-[380px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,rgba(223,188,94,0.04)_50%,transparent_70%)] blur-2xl pointer-events-none" />

      {/* Subtle glowing gold light effects at the bottom */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-[radial-gradient(ellipse_at_bottom,rgba(245,190,56,0.18)_0%,rgba(212,175,55,0.05)_45%,transparent_75%)] pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#f5be38]/85 to-transparent shadow-[0_0_22px_#f5be38] pointer-events-none z-20" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#07080a] to-transparent pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Exact Headline, Eyebrow Pill, Gold Shimmer Subheadline, Flare Divider & WhatsApp Button */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 xl:col-span-6 space-y-5 sm:space-y-6 relative"
          >
            {/* Soft gold glow behind text */}
            <div className="absolute -top-12 -left-12 w-[300px] sm:w-[480px] h-[300px] sm:h-[480px] rounded-full bg-[radial-gradient(circle,rgba(245,190,56,0.15)_0%,rgba(212,175,55,0.05)_45%,transparent_70%)] blur-3xl pointer-events-none -z-10" />

            {/* Eyebrow Pill Badge with Gold Accent (Matching Reference) */}
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-[#ebd07f]/40 bg-[#16140f]/90 text-xs text-stone-200 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.4)] group"
            >
              <span className="w-2 h-2 rounded-full bg-[#f5be38] shadow-[0_0_8px_#f5be38] animate-pulse shrink-0" />
              <span className="tracking-wide text-[11.5px] sm:text-[12.5px] font-medium text-stone-100">
                Bring your business to the best scale
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#f5be38] opacity-90 shrink-0" />
            </motion.div>

            {/* Headline, Sub-headline, Gold Divider, and Subtitle in tightly composed typographic hierarchy */}
            <motion.div variants={itemVariants} className="space-y-2">
              {/* Primary Headline: Bold Large White Font */}
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[45px] xl:text-[52px] font-black tracking-tight text-white leading-[1.1] sm:leading-[1.08] drop-shadow-[0_2px_20px_rgba(245,190,56,0.2)]">
                #1 Online Printing Company in Bayelsa
              </h1>

              {/* Sub-headline: Shimmering Vibrant Gold Font */}
              <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[45px] font-black tracking-tight leading-[1.14] sm:leading-[1.12]">
                <span className="gold-shimmer-text drop-shadow-[0_0_24px_rgba(245,190,56,0.4)] inline-block">
                  Banners • Branding • Digital Printing
                </span>
              </div>

              {/* Subtle glowing gold light effects beam & constellation divider (Tight Spacing) */}
              <div className="relative py-1 pt-1 max-w-xl">
                {/* Radiant gold lens flare in center */}
                <div className="absolute left-1/4 sm:left-1/3 top-1/2 -translate-y-1/2 w-48 sm:w-72 h-3 bg-[radial-gradient(ellipse_at_center,rgba(255,245,210,1)_0%,rgba(245,190,56,0.8)_35%,transparent_75%)] blur-[2px] pointer-events-none" />
                {/* Horizontal hairline light beam */}
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#f5be38]/85 to-transparent shadow-[0_0_12px_rgba(245,190,56,0.6)]" />
                {/* Dotted constellation accent with gold diamond (Tighter Dot Gap) */}
                <div className="absolute inset-0 flex items-center justify-center gap-1.5 text-[#f5be38]/85 text-[7px] pointer-events-none select-none tracking-[0.14em]">
                  <span>••••••</span>
                  <span className="text-[#fff2b2] text-[11px] font-serif px-0.5">✧</span>
                  <span>••••••</span>
                </div>
              </div>

              {/* Subtitle text: Modern clean sans-serif typography (Tight gap below gold line) */}
              <p className="text-stone-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl font-normal pt-0.5">
                Select from top print collections, guaranteeing precision color matching and pre-press audit. Need custom specs or large volume? Fast turnaround and nationwide doorstep delivery across Nigeria!
              </p>
            </motion.div>

            {/* Action Buttons: WhatsApp Gold Button & White-Bordered Services Button */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3 pt-1 w-full xs:w-auto"
            >
              {/* WhatsApp Button: Vibrant Gold with Crisp White Typography */}
              <a
                href="https://wa.me/2347030372539?text=Hello%20Silver%20%26%20Gold%20Inkshine%20Ltd%2C%20I%20would%20like%20to%20inquire%20about%20printing%20services"
                target="_blank"
                rel="noreferrer"
                id="hero-whatsapp-btn"
                className="relative overflow-hidden bg-gradient-to-r from-[#d4af37] via-[#f5be38] to-[#b8860b] hover:from-[#f5be38] hover:via-[#fff1a8] hover:to-[#d4af37] active:scale-98 text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-lg flex items-center justify-center gap-2.5 shadow-[0_8px_24px_rgba(212,175,55,0.4)] border border-[#fae8aa]/60 transition-all group cursor-pointer text-center"
              >
                {/* Continuous subtle metallic light sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform pointer-events-none" />

                {/* WhatsApp Chat Bubble Icon in Pure White */}
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-4 h-4 fill-white shrink-0 drop-shadow-xs"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span className="text-white drop-shadow-xs">Chat on WhatsApp Now</span>
              </a>

              {/* View Our Services: Transparent Button with White Border */}
              <button
                onClick={onExploreProducts}
                id="hero-view-services-btn"
                className="relative bg-transparent hover:bg-white/10 active:scale-98 border-2 border-white text-white font-bold text-xs sm:text-sm px-5 py-3.5 rounded-lg transition-all shadow-md shadow-black/30 flex items-center justify-center gap-2 group backdrop-blur-xs cursor-pointer text-center"
              >
                <span className="text-white">View Our Services</span>
                <ArrowRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>

            {/* Quick-links / Features pill indicators with entrance animation */}
            <motion.div 
              variants={itemVariants}
              className="pt-2 flex flex-wrap items-center gap-4 text-xs text-stone-200"
            >
              <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
                <CheckCircle2 className="w-4 h-4 text-[#ebd07f] shrink-0" />
                <span className="font-medium">Same-Day &amp; 24hr Turnaround</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
                <CheckCircle2 className="w-4 h-4 text-[#ebd07f] shrink-0" />
                <span className="font-medium">Free Bleed &amp; Pre-Press Audit</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
                <CheckCircle2 className="w-4 h-4 text-[#ebd07f] shrink-0" />
                <span className="font-medium">Bayelsa &amp; Nationwide Delivery</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: 3D-feel Brand Suite Mockup Scene with Fluid Entrance */}
          <motion.div 
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 xl:col-span-6 flex flex-col items-center lg:items-end"
          >
            <div className="w-full max-w-xl relative">
              {/* Product Visual Presentation Scene Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-b from-[#14151b]/95 via-[#0a0a0d]/98 to-[#040406] border border-[#ebd07f]/25 p-2 sm:p-2.5 backdrop-blur-md ring-1 ring-[#ebd07f]/10">
                {/* Pure Interactive Animated Sliding Image Showcase */}
                <HeroImageSlider />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
