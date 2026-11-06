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
      className="relative bg-white text-stone-900 py-8 sm:py-10 border-b border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Two-Column 50/50 Balanced Promotional Banner Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          
          {/* ========================================================================= */}
          {/* PROMO CARD 1: PACKAGE DESIGN (Black & Faded Grey Theme)                   */}
          {/* ========================================================================= */}
          <div className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1c1c22] via-[#0d0d12] to-[#050508] text-white p-6 sm:p-8 flex flex-col justify-between shadow-xl border border-stone-700/60">
            {/* Subtle faded grey background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-stone-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              
              {/* Left text column */}
              <div className="sm:col-span-7 space-y-3">
                <div className="text-[11px] font-bold tracking-[0.2em] text-[#f5be38] uppercase">
                  Packaging Collection
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                  Package <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-stone-200 via-slate-300 to-stone-400">Design</span>
                </h3>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-xs">
                  Custom printed foil pouches, luxury mailer boxes, and retail food cartons.
                </p>

                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => onSelectCategory('packaging_shipping_cartons')}
                    className="h-10 px-5 rounded-full bg-stone-200 hover:bg-white text-stone-950 font-extrabold text-xs tracking-wide uppercase inline-flex items-center gap-2 transition-all shadow-md active:scale-95 border border-stone-300 cursor-pointer"
                  >
                    <span>Shop Now</span>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-950" />
                  </button>
                </div>
              </div>

              {/* Right mockup image cutout */}
              <div className="sm:col-span-5 flex justify-center sm:justify-end">
                <div className="w-36 sm:w-44 aspect-square rounded-xl bg-black/70 p-2 border border-stone-700/80 flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-105 shadow-inner">
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
          {/* PROMO CARD 2: T-SHIRT PRINTING (Black & Faded Grey Theme)                 */}
          {/* ========================================================================= */}
          <div className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1c1c22] via-[#0d0d12] to-[#050508] text-white p-6 sm:p-8 flex flex-col justify-between shadow-xl border border-stone-700/60">
            {/* Subtle faded grey background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-stone-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              
              {/* Left text column */}
              <div className="sm:col-span-7 space-y-3">
                <div className="text-[11px] font-bold tracking-[0.2em] text-stone-300 uppercase">
                  Apparel Studio
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                  T-Shirt <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-stone-200 via-slate-300 to-stone-400">Printing</span>
                </h3>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-xs">
                  Direct-to-Film (DTF) full-color prints &amp; high-density Tajima industrial embroidery.
                </p>

                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => onSelectCategory('custom_apparels_caps')}
                    className="h-10 px-5 rounded-full bg-stone-200 hover:bg-white text-stone-950 font-extrabold text-xs tracking-wide uppercase inline-flex items-center gap-2 transition-all shadow-md active:scale-95 border border-stone-300 cursor-pointer"
                  >
                    <span>Shop Now</span>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-950" />
                  </button>
                </div>
              </div>

              {/* Right mockup image cutout */}
              <div className="sm:col-span-5 flex justify-center sm:justify-end">
                <div className="w-40 sm:w-48 aspect-square rounded-xl bg-black/70 p-2 border border-stone-700/80 flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-105 shadow-inner">
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
