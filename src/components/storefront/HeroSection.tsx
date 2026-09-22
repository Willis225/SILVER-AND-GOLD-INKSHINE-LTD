import React, { useState, useEffect } from 'react';
import { motion, type Variants } from 'motion/react';
import { 
  ArrowRight, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { HeroImageSlider } from './HeroImageSlider';
import { HeroSlideItem } from '../../types/websiteContent';

interface HeroSectionProps {
  onExploreProducts: () => void;
  onOpenPricingSandbox: () => void;
  onSelectProductQuickView: (productId: string) => void;
  slides?: HeroSlideItem[];
  headline?: string;
  subheadline?: string;
  eyebrow?: string;
  description?: string;
  backgroundImageUrl?: string;
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
  slides,
  headline = '#1 Online Printing Company in Bayelsa',
  subheadline = 'Banners • Branding • Digital Printing',
  eyebrow = 'Bring your business to the best scale',
  description = 'Select from top print collections, guaranteeing precision color matching and pre-press audit. Need custom specs or large volume? Fast turnaround and nationwide doorstep delivery across Nigeria!',
  backgroundImageUrl = '/7aa493911d023086a5442472c889df70.jpg',
}) => {
  const resolveHeroBg = (url?: string) => {
    if (url && url !== '/homepage-bg.jpg') return url;
    return '/7aa493911d023086a5442472c889df70.jpg';
  };

  const [activeImage, setActiveImage] = useState<string>(() => resolveHeroBg(backgroundImageUrl));

  useEffect(() => {
    setActiveImage(resolveHeroBg(backgroundImageUrl));
  }, [backgroundImageUrl]);

  const handleImageError = () => {
    if (activeImage !== '/hero-banner-main.webp') {
      setActiveImage('/hero-banner-main.webp');
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#08080a] text-white pt-8 pb-16 sm:pt-12 sm:pb-24 lg:pt-16 lg:pb-28 border-b border-white/10 bg-grid-pattern">
      {/* 
        High-Visibility Animated Hero Background Overlay:
        - Continuous slow Ken Burns cinematic motion (scale and gentle pan)
        - High-clarity opacity so colors, commercial machinery, and details are brilliantly visible
        - Directional obsidian contrast scrim on the left ensures 100% WCAG AA text legibility
        - Animated print-carriage laser sweep beam passing continuously across the visual
        - Atmospheric pulsing neon cyan & warm gold radial light blooms
      */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        {/* Continuous Animated Image Layer */}
        <motion.div
          animate={{
            scale: [1.02, 1.07, 1.02],
            x: [0, -12, 0],
            y: [0, -6, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-full h-full relative"
        >
          <img 
            src={activeImage} 
            alt="Silver & Gold Inkshine Ltd Commercial Printing Press Background" 
            className="w-full h-full object-cover object-center brightness-105 contrast-105 opacity-85 lg:opacity-90"
            referrerPolicy="no-referrer"
            onError={handleImageError}
          />
        </motion.div>

        {/* Focused Directional Text Contrast Scrim (Left dark, right vibrant) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#08080a] via-[#08080a]/80 via-40% to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#08080a]/60 via-transparent to-[#08080a] pointer-events-none" />
        
        {/* Subtle grid pattern layer */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

        {/* Animated Print-Carriage Scanning Light Beam */}
        <motion.div
          animate={{
            x: ['-100%', '280%'],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 3,
          }}
          className="absolute inset-y-0 w-64 bg-gradient-to-r from-transparent via-[#f5be38]/15 to-transparent pointer-events-none skew-x-12"
        />

        {/* Pulsing Atmospheric Studio Light Blooms */}
        <motion.div 
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.12, 0.22, 0.12],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[550px] lg:w-[650px] h-[350px] sm:h-[550px] lg:h-[650px] rounded-full bg-[radial-gradient(circle,rgba(245,190,56,0.18)_0%,rgba(212,175,55,0.04)_50%,transparent_75%)] blur-3xl pointer-events-none" 
        />
        <motion.div 
          animate={{
            scale: [1, 1.18, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-1/3 right-10 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.16)_0%,transparent_70%)] blur-3xl pointer-events-none" 
        />
      </div>

      {/* Glowing gold hairline edge at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#f5be38]/85 to-transparent shadow-[0_0_22px_#f5be38] pointer-events-none z-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Exact Headline, Eyebrow Pill, Gold Shimmer Subheadline, Realtime Social Proof & Gold Pill CTA */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 xl:col-span-6 space-y-6 sm:space-y-7 relative"
          >
            {/* Eyebrow Pill Badge with Gold Accent & Floating Micro-Motion */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -2 }}
              className="inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full border border-[#f5be38]/30 bg-[#121217]/90 text-xs text-stone-200 backdrop-blur-md shadow-[0_2px_15px_rgba(245,190,56,0.15)] group cursor-default"
            >
              <span className="w-2 h-2 rounded-full bg-[#f5be38] shadow-[0_0_8px_#f5be38] animate-ping shrink-0" />
              <span className="tracking-widest uppercase text-[10.5px] sm:text-[11.5px] font-black text-[#f5be38]">
                {eyebrow}
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#f5be38] opacity-90 shrink-0 group-hover:rotate-12 transition-transform" />
            </motion.div>

            {/* Headline, Sub-headline, Gold Divider, and Subtitle */}
            <motion.div variants={itemVariants} className="space-y-3">
              {/* Primary Headline: Bold Large White Font */}
              <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-[46px] xl:text-[54px] font-black tracking-tight text-white leading-[1.08] drop-shadow-[0_2px_20px_rgba(245,190,56,0.15)]">
                {headline}
              </h1>

              {/* Sub-headline: Shimmering Radiant Gold Font */}
              <div className="text-2xl xs:text-3xl sm:text-4xl lg:text-[38px] xl:text-[44px] font-black tracking-tight leading-[1.12]">
                <span className="gold-shimmer-text drop-shadow-[0_0_24px_rgba(245,190,56,0.35)] inline-block">
                  {subheadline}
                </span>
              </div>

              {/* Horizontal hairline light beam with constellation accent */}
              <div className="relative py-1 pt-1 max-w-xl">
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#f5be38]/70 to-transparent shadow-[0_0_12px_rgba(245,190,56,0.5)]" />
                <div className="absolute inset-0 flex items-center justify-center gap-1.5 text-[#f5be38]/85 text-[7px] pointer-events-none select-none tracking-[0.14em]">
                  <span>••••••</span>
                  <span className="text-[#fff2b2] text-[11px] font-serif px-0.5">✧</span>
                  <span>••••••</span>
                </div>
              </div>

              {/* Subtitle text */}
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal pt-1">
                {description}
              </p>
            </motion.div>

            {/* Social Proof Realtime Avatar Cluster (matching concept from reference) */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 pt-1">
              <div className="flex -space-x-2.5 overflow-hidden">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-[#08080a] object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Client"
                  referrerPolicy="no-referrer"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-[#08080a] object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="Client"
                  referrerPolicy="no-referrer"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-[#08080a] object-cover"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                  alt="Client"
                  referrerPolicy="no-referrer"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-[#08080a] object-cover"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
                  alt="Client"
                  referrerPolicy="no-referrer"
                />
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#f5be38] text-black font-black text-[11px] ring-2 ring-[#08080a]">
                  +5k
                </div>
              </div>
              <div className="text-xs">
                <span className="font-extrabold text-white">168K+ Realtime Clients</span>
                <span className="text-stone-400 block text-[11px]">Corporate brands &amp; businesses served</span>
              </div>
            </motion.div>

            {/* Action Buttons: Radiant Gold Pill Button & Ghost Outline Pill with Spring Physics */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3.5 pt-1 w-full xs:w-auto"
            >
              {/* WhatsApp Button: Solid Radiant Gold with Black Typography & Pill Shape */}
              <motion.a
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                href="https://wa.me/2347030372539?text=Hello%20Silver%20%26%20Gold%20Inkshine%20Ltd%2C%20I%20would%20like%20to%20inquire%20about%20printing%20services"
                target="_blank"
                rel="noreferrer"
                id="hero-whatsapp-btn"
                className="relative overflow-hidden bg-[#f5be38] hover:bg-[#ffd15c] text-black font-extrabold text-xs sm:text-sm px-7 py-3.5 rounded-full flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(245,190,56,0.35)] transition-colors group cursor-pointer text-center"
              >
                {/* Continuous subtle metallic light sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform pointer-events-none" />

                {/* WhatsApp Chat Bubble Icon */}
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-4 h-4 fill-black shrink-0"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>Chat on WhatsApp Now</span>
              </motion.a>

              {/* View Our Services: Transparent Glass Pill with White Border & Circular Arrow */}
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={onExploreProducts}
                id="hero-view-services-btn"
                className="relative bg-[#121217]/80 hover:bg-white/10 border border-white/20 hover:border-[#f5be38]/50 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full transition-colors shadow-md shadow-black/40 flex items-center justify-center gap-2 group backdrop-blur-md cursor-pointer text-center"
              >
                <span>View Our Services</span>
                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#f5be38] group-hover:text-black transition-colors">
                  <ArrowRight className="w-3 h-3 text-white group-hover:text-black transition-transform group-hover:translate-x-0.5" />
                </div>
              </motion.button>
            </motion.div>

            {/* Quick-links / Features pill indicators with entrance animation */}
            <motion.div 
              variants={itemVariants}
              className="pt-1 flex flex-wrap items-center gap-4 text-xs text-stone-300"
            >
              <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
                <CheckCircle2 className="w-4 h-4 text-[#f5be38] shrink-0" />
                <span className="font-medium">Same-Day &amp; 24hr Turnaround</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
                <CheckCircle2 className="w-4 h-4 text-[#f5be38] shrink-0" />
                <span className="font-medium">Free Bleed &amp; Pre-Press Audit</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
                <CheckCircle2 className="w-4 h-4 text-[#f5be38] shrink-0" />
                <span className="font-medium">Bayelsa &amp; Nationwide Delivery</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: 3D-feel Brand Suite Mockup Scene with Glowing Gold Orbital Rings */}
          <motion.div 
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 xl:col-span-6 flex flex-col items-center lg:items-end relative"
          >
            {/* Glowing gold orbital rings and background trajectory (matching reference concept) */}
            <div className="absolute -top-10 -right-10 w-[420px] h-[420px] rounded-full border border-[#f5be38]/20 pointer-events-none -z-10 animate-spin" style={{ animationDuration: '45s' }} />
            <div className="absolute -bottom-8 -left-8 w-[340px] h-[340px] rounded-full border border-dashed border-[#f5be38]/15 pointer-events-none -z-10" />

            <div className="w-full max-w-xl relative">
              {/* Product Visual Presentation Scene Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] bg-[#101015] border border-white/15 p-2 sm:p-2.5 backdrop-blur-xl ring-1 ring-[#f5be38]/20 group">
                {/* Pure Interactive Animated Sliding Image Showcase */}
                <HeroImageSlider slides={slides} />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
