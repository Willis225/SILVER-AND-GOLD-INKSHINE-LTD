import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Sparkles,
  CheckCircle2,
  Truck,
  Clock,
  Star
} from 'lucide-react';
import { HeroSlideItem } from '../../types/websiteContent';

interface HeroSectionProps {
  onExploreProducts: () => void;
  onOpenPricingSandbox: () => void;
  onSelectProductQuickView: (productId: string) => void;
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
  description = 'Every order includes precision color matching + a free pre-press audit — perfect prints, every time',
  backgroundImageUrl = 'https://cdn.hstockplus.org/uploads/public/img-1790066633477-1b16a758309b0fff.webp',
}) => {
  const resolveHeroBg = (url?: string) => {
    if (url && 
        url !== '/homepage-bg.jpg' && 
        url !== '/7aa493911d023086a5442472c889df70.jpg' &&
        url !== '/hero-banner-main.webp' &&
        !url.includes('unsplash')) {
      return url;
    }
    return 'https://cdn.hstockplus.org/uploads/public/img-1790066633477-1b16a758309b0fff.webp';
  };

  const [activeImage, setActiveImage] = useState<string>(() => resolveHeroBg(backgroundImageUrl));

  useEffect(() => {
    setActiveImage(resolveHeroBg(backgroundImageUrl));
  }, [backgroundImageUrl]);

  const handleImageError = () => {
    if (activeImage !== '/homepage-bg.webp') {
      setActiveImage('/homepage-bg.webp');
    } else if (activeImage !== '/hero-banner-main.webp') {
      setActiveImage('/hero-banner-main.webp');
    }
  };

  return (
    <section className="relative bg-[#09090d] text-white pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-20 border-b border-white/10 overflow-hidden">
      {/* 
        Professional Commercial Printing Press Backdrop:
        - Deep rich onyx/graphite foundation with subtle printing press registration grid
        - Warm gold ambient gradient giving metallic press luster
        - Controlled dark gradient scrim over the workshop image so typography stays grounded and 100% readable without artificial floating boxes
      */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        {/* Subtle Press Registration Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-70" />
        
        {/* Ambient Gold Press Light Bloons */}
        <div className="absolute -top-32 -left-32 w-96 sm:w-[500px] h-96 sm:h-[500px] rounded-full bg-[radial-gradient(circle,rgba(245,190,56,0.14)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-96 sm:w-[500px] h-96 sm:h-[500px] rounded-full bg-[radial-gradient(circle,rgba(245,190,56,0.1)_0%,transparent_70%)] blur-3xl" />

        {/* Ambient Press Machinery Imagery with Measured Dark Scrim */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-2/3 opacity-25 mix-blend-luminosity overflow-hidden">
          <img 
            src={activeImage} 
            alt="Silver & Gold Inkshine Ltd Commercial Printing Press Background" 
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#09090d] via-[#09090d]/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090d] via-transparent to-[#09090d]" />
        </div>
      </div>

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Natural, Authoritative Printing Press Typography */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6 sm:space-y-7">
            
            {/* 1. Eyebrow & Brand Kicker */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.0, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
                <span className="text-[11px] sm:text-xs font-black tracking-wider uppercase text-white">
                  {eyebrow}
                </span>
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
            </motion.div>

            {/* 2. Headline and Subheadline */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3"
            >
              <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-[46px] xl:text-[52px] font-black tracking-tight text-white leading-[1.08] text-balance">
                {headline}
              </h1>

              {/* Radiant Metallic Silver-White Subheadline */}
              <div className="text-2xl xs:text-3xl sm:text-4xl lg:text-[36px] xl:text-[42px] font-black tracking-tight leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-stone-100 to-stone-300 drop-shadow-sm inline-block">
                  {subheadline}
                </span>
              </div>

              {/* Monochromatic Registration Rule */}
              <div className="flex items-center gap-2.5 pt-1 max-w-xl">
                <div className="flex items-center gap-1 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-sm bg-white" title="Process 100%" />
                  <span className="w-2.5 h-2.5 rounded-sm bg-stone-300" title="Process 75%" />
                  <span className="w-2.5 h-2.5 rounded-sm bg-stone-500" title="Process 50%" />
                  <span className="w-2.5 h-2.5 rounded-sm bg-black border border-white/40" title="Key Black" />
                </div>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-white/40 via-white/15 to-transparent" />
                <span className="text-[10px] font-mono tracking-widest text-stone-300 uppercase shrink-0">
                  2400 DPI OFFSET &amp; DIGITAL
                </span>
              </div>

              {/* Subtitle Description Write-up */}
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal pt-1">
                {description}
              </p>
            </motion.div>

            {/* 3. Realtime Client Trust Proof */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="pt-2"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.09] border border-white/15 backdrop-blur-md shadow-lg transition-all duration-300">
                <div className="flex items-center text-[#ffd25d]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#ffd25d] text-[#ffd25d]" />
                  ))}
                </div>
                <div className="h-3.5 w-[1px] bg-white/20" />
                <span className="font-extrabold text-white text-xs sm:text-sm tracking-tight">
                  168K+ Clients • 5K+ Businesses Served
                </span>
              </div>
            </motion.div>

            {/* 4. Primary Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1"
            >
              {/* WhatsApp Button */}
              <a
                href="https://wa.me/2347030372539?text=Hello%20Silver%20%26%20Gold%20Inkshine%20Ltd%2C%20I%20would%20like%20to%20inquire%20about%20printing%20services"
                target="_blank"
                rel="noreferrer"
                id="hero-whatsapp-btn"
                className="relative overflow-hidden bg-white hover:bg-stone-200 text-black font-extrabold text-xs sm:text-sm px-7 py-3.5 rounded-full flex items-center justify-center gap-2.5 shadow-[0_4px_20px_rgba(255,255,255,0.2)] transition-all hover:scale-[1.02] active:scale-[0.98] group cursor-pointer text-center"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-4 h-4 fill-black shrink-0"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>Chat on WhatsApp Now</span>
              </a>

              {/* View Services & Explore Catalog Button */}
              <button
                type="button"
                onClick={onExploreProducts}
                id="hero-view-services-btn"
                className="bg-[#14141a] hover:bg-[#1a1a24] border border-white/20 hover:border-white/50 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md flex items-center justify-center gap-2 group cursor-pointer text-center"
              >
                <span>Explore Print Catalog</span>
                <ArrowRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>

            {/* 5. Quick Guarantees: 3 Clean Inline Items */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-stone-300"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                <span className="font-medium text-stone-200">Same-Day &amp; 24hr Turnaround</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                <span className="font-medium text-stone-200">Free Bleed &amp; Pre-Press Audit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                <span className="font-medium text-stone-200">Bayelsa &amp; Nationwide Delivery</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Clean Professional Image Frame */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 xl:col-span-5 flex flex-col items-center lg:items-end"
          >
            <div className="w-full max-w-md lg:max-w-[430px]">
              
              {/* Executive Image Frame with soft rounded corners and seamless dark background blending */}
              <div className="relative rounded-[28px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(255,210,93,0.12)] bg-[#0d0d12] border border-white/15 hover:border-[#ffd25d]/40 ring-1 ring-white/10 transition-all duration-500 group">
                
                {/* Image Stage */}
                <div className="relative aspect-[1145/1374] overflow-hidden bg-[#0d0d12] flex items-center justify-center">
                  <img
                    src="/inkshine-brand-portrait.png"
                    alt="Silver & Gold Inkshine"
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="eager"
                  />

                  {/* Soft bottom edge gradient to blend seamlessly with the dark background and avoid cutout edges */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#08080a] via-[#08080a]/40 to-transparent pointer-events-none" />
                  <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#08080a]/30 to-transparent pointer-events-none" />

                  {/* Soft inner rounded vignette border */}
                  <div className="absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/15 pointer-events-none" />

                  {/* Subtle specular light sweep effect on hover */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute inset-0 -translate-x-[150%] skew-x-[-25deg] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-[150%]" />
                  </div>
                </div>

              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
