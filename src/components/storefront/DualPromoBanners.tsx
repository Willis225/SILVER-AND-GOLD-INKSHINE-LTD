import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ProductCategory } from '../../types/schema';

interface DualPromoBannersProps {
  onSelectCategory: (category: ProductCategory | 'all') => void;
  onRequestQuote?: () => void;
}

export const DualPromoBanners: React.FC<DualPromoBannersProps> = ({
  onSelectCategory,
  onRequestQuote,
}) => {
  return (
    <section 
      aria-label="Promotional Print Highlights"
      className="relative bg-white text-stone-900 py-16 sm:py-20 border-b border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Two-Column 50/50 Balanced Promotional Banner Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* ========================================================================= */}
          {/* PROMO CARD 1: PACKAGE DESIGN (Black & Filled Gold Theme)                  */}
          {/* ========================================================================= */}
          <div className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#141417] via-[#08080a] to-[#000000] text-white p-7 sm:p-8 flex flex-col justify-between shadow-xl border border-[#f5be38]/30">
            {/* Subtle gold background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#f5be38]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              
              {/* Left text column */}
              <div className="sm:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/10 border border-[#f5be38]/40 text-xs font-mono font-bold tracking-wider text-[#f5be38] uppercase backdrop-blur-xs">
                  <Sparkles className="w-3 h-3 text-[#f5be38]" />
                  <span>LATEST DESIGN</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                  Package <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f5be38] to-amber-200">Design</span>
                </h3>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-xs">
                  Custom printed foil pouches, luxury mailer boxes, and retail food cartons.
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onSelectCategory('packaging_shipping_cartons')}
                    className="h-10 px-5 rounded-lg bg-[#f5be38] hover:bg-[#e5af28] text-stone-950 font-bold text-xs tracking-wide uppercase inline-flex items-center gap-2 transition-all shadow-md active:scale-95 border border-amber-300 cursor-pointer"
                  >
                    <span>Shop Now</span>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-950" />
                  </button>
                </div>
              </div>

              {/* Right mockup image cutout */}
              <div className="sm:col-span-5 flex justify-center sm:justify-end">
                <div className="w-40 sm:w-48 aspect-square rounded-xl bg-black/60 p-2 border border-[#f5be38]/30 flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-105 shadow-inner">
                  <img
                    src="/custom-branded-pouch-packaging.jpg"
                    alt="Custom Package Design"
                    className="w-full h-full object-contain drop-shadow-xl"
                    loading="lazy"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* ========================================================================= */}
          {/* PROMO CARD 2: T-SHIRT PRINTING (Black & Filled Grey Theme)                */}
          {/* ========================================================================= */}
          <div className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#18181b] via-[#09090d] to-[#0f172a] text-white p-7 sm:p-8 flex flex-col justify-between shadow-xl border border-white/20">
            {/* Subtle silver/grey background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              
              {/* Left text column */}
              <div className="sm:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/10 border border-white/25 text-xs font-mono font-bold tracking-wider text-stone-300 uppercase backdrop-blur-xs">
                  <Sparkles className="w-3 h-3 text-stone-300" />
                  <span>LATEST DESIGN</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                  T-Shirt <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-stone-200 via-slate-300 to-stone-400">Printing</span>
                </h3>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-xs">
                  Direct-to-Film (DTF) full-color prints &amp; high-density Tajima industrial embroidery.
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onSelectCategory('custom_apparels_caps')}
                    className="h-10 px-5 rounded-lg bg-stone-200 hover:bg-white text-stone-950 font-bold text-xs tracking-wide uppercase inline-flex items-center gap-2 transition-all shadow-md active:scale-95 border border-stone-300 cursor-pointer"
                  >
                    <span>Shop Now</span>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-950" />
                  </button>
                </div>
              </div>

              {/* Right mockup image cutout */}
              <div className="sm:col-span-5 flex justify-center sm:justify-end">
                <div className="w-40 sm:w-48 aspect-square rounded-xl bg-black/60 p-2 border border-white/20 flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-105 shadow-inner">
                  <img
                    src="/executive-embroidered-polo-shirts.jpg"
                    alt="Custom T-Shirt and Apparel Printing"
                    className="w-full h-full object-contain drop-shadow-xl"
                    loading="lazy"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
