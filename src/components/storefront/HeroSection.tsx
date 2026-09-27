import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Sparkles,
  CheckCircle2,
  Printer,
  ShieldCheck,
  Truck,
  Clock,
  Layers,
  FileCheck
} from 'lucide-react';
import { HeroVideoPlayer } from './HeroVideoPlayer';
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
  eyebrow = 'Bring your business to the best scale',
  description = 'Select from top print collections, guaranteeing precision color matching and pre-press audit. Need custom specs or large volume? Fast turnaround and nationwide doorstep delivery across Nigeria!',
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
          
          {/* Left Column: Natural, Authoritative Printing Press Typography (NO ARTIFICIAL FLOATING BOX) */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6 sm:space-y-7">
            
            {/* Eyebrow & Brand Kicker: Refined Editorial Hallmark */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121217] border border-[#f5be38]/30 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#f5be38] shadow-[0_0_8px_#f5be38]" />
                <span className="text-[11px] sm:text-xs font-black tracking-wider uppercase text-[#f5be38]">
                  {eyebrow}
                </span>
                <Sparkles className="w-3.5 h-3.5 text-[#f5be38]" />
              </div>
              <span className="text-xs font-semibold text-stone-400 hidden sm:inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-600" />
                Yenagoa &amp; Nationwide Hub
              </span>
            </div>

            {/* Headline and Subheadline: Bold, Balanced, Dominant */}
            <div className="space-y-3">
              <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-[46px] xl:text-[52px] font-black tracking-tight text-white leading-[1.08] text-balance">
                {headline}
              </h1>

              {/* Radiant Metallic Gold Subheadline */}
              <div className="text-2xl xs:text-3xl sm:text-4xl lg:text-[36px] xl:text-[42px] font-black tracking-tight leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f5be38] via-[#ffd56b] to-[#d4af37] drop-shadow-sm inline-block">
                  {subheadline}
                </span>
              </div>

              {/* CMYK Registration Hairline Rule (Honoring authentic printing press craft) */}
              <div className="flex items-center gap-2.5 pt-1 max-w-xl">
                <div className="flex items-center gap-1 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#00a8e8] title='Cyan'" title="Cyan" />
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#e01a4f] title='Magenta'" title="Magenta" />
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#f5be38] title='Yellow'" title="Yellow" />
                  <span className="w-2.5 h-2.5 rounded-sm bg-black border border-white/20 title='Key Black'" title="Key Black" />
                </div>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-[#f5be38]/50 via-white/15 to-transparent" />
                <span className="text-[10px] font-mono tracking-widest text-[#f5be38]/80 uppercase shrink-0">
                  2400 DPI CMYK
                </span>
              </div>

              {/* Subtitle Description Write-up (Preserving exact wording) */}
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal pt-1">
                {description}
              </p>
            </div>

            {/* Realtime Client Trust Proof */}
            <div className="flex items-center gap-3.5 pt-1">
              <div className="flex -space-x-2 overflow-hidden shrink-0">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-[#09090d] object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Client"
                  referrerPolicy="no-referrer"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-[#09090d] object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="Client"
                  referrerPolicy="no-referrer"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-[#09090d] object-cover"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                  alt="Client"
                  referrerPolicy="no-referrer"
                />
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#f5be38] text-black font-black text-[11px] ring-2 ring-[#09090d] shadow-sm">
                  +5k
                </div>
              </div>
              <div className="text-xs">
                <span className="font-extrabold text-white text-[13px] block">168K+ Realtime Clients</span>
                <span className="text-stone-400 block text-[11.5px] font-medium">Corporate brands, SMEs &amp; event planners served</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              {/* WhatsApp Button: Solid Radiant Gold with WhatsApp Icon */}
              <a
                href="https://wa.me/2347030372539?text=Hello%20Silver%20%26%20Gold%20Inkshine%20Ltd%2C%20I%20would%20like%20to%20inquire%20about%20printing%20services"
                target="_blank"
                rel="noreferrer"
                id="hero-whatsapp-btn"
                className="relative overflow-hidden bg-[#f5be38] hover:bg-[#ffd15c] text-black font-extrabold text-xs sm:text-sm px-7 py-3.5 rounded-full flex items-center justify-center gap-2.5 shadow-[0_4px_20px_rgba(245,190,56,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] group cursor-pointer text-center"
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
                className="bg-[#14141a] hover:bg-[#1a1a24] border border-white/20 hover:border-[#f5be38]/50 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md flex items-center justify-center gap-2 group cursor-pointer text-center"
              >
                <span>Explore Print Catalog</span>
                <ArrowRight className="w-4 h-4 text-[#f5be38] transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Quick Guarantees: 3 Clean Inline Items */}
            <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#f5be38] shrink-0" />
                <span className="font-medium text-stone-200">Same-Day &amp; 24hr Turnaround</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#f5be38] shrink-0" />
                <span className="font-medium text-stone-200">Free Bleed &amp; Pre-Press Audit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#f5be38] shrink-0" />
                <span className="font-medium text-stone-200">Bayelsa &amp; Nationwide Delivery</span>
              </div>
            </div>

          </div>

          {/* Right Column: Sleek Industrial Video Showcase Monitor (Proportionate & Compact) */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col items-center lg:items-end">
            <div className="w-full max-w-md lg:max-w-[430px]">
              
              {/* Executive Production Studio Frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] bg-[#0d0d12] border border-white/20 ring-1 ring-[#f5be38]/30">
                
                {/* Monitor Top Status Bar */}
                <div className="px-4 py-2.5 bg-[#14141a] border-b border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_#10b981]" />
                    <span className="font-extrabold tracking-wider uppercase text-[11px] text-[#f5be38]">
                      SILVER &amp; GOLD INKSHINE
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-stone-400">
                    FACTORY &amp; PRODUCTION TOUR
                  </span>
                </div>

                {/* Video Player */}
                <div className="p-1 sm:p-1.5 bg-black">
                  <HeroVideoPlayer 
                    initialVideoUrl="https://www.kapwing.com/w/JxRjisdMGT"
                  />
                </div>

                {/* Monitor Bottom Footer: Capability Pillars */}
                <div className="px-3.5 py-2.5 bg-[#121217] border-t border-white/10 grid grid-cols-3 gap-2 text-center text-[10px] font-medium text-stone-300">
                  <div className="flex items-center justify-center gap-1.5">
                    <Printer className="w-3 h-3 text-[#f5be38] shrink-0" />
                    <span>2400 DPI Offset</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 border-x border-white/10">
                    <Layers className="w-3 h-3 text-[#f5be38] shrink-0" />
                    <span>Precision Die-Cut</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3 h-3 text-[#f5be38] shrink-0" />
                    <span>100% Quality QA</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
