import React from 'react';
import { motion } from 'motion/react';
import { Star, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { ProductCategory } from '../../types/schema';

interface SecondarySpotlightSectionProps {
  onSelectCategory: (category: ProductCategory | 'all') => void;
  onExploreCatalog?: () => void;
}

export const SecondarySpotlightSection: React.FC<SecondarySpotlightSectionProps> = ({
  onSelectCategory,
  onExploreCatalog,
}) => {
  return (
    <section 
      aria-label="Secondary Product Spotlight"
      className="relative bg-white text-slate-900 py-16 sm:py-20 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Grid: Left Promo Card (50%) + Right 2 Product Cards (50%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* ========================================================================= */}
          {/* LEFT PROMO BANNER: 50% OFF TODAY - NICE COLORFULL BAG PRINTING (Black & Grey) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 rounded-2xl overflow-hidden bg-gradient-to-br from-[#18181b] via-[#09090d] to-[#141417] p-7 sm:p-8 flex flex-col justify-between text-white shadow-xl relative group border border-white/25">
            
            {/* Subtle glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-stone-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 border border-white/25 text-xs font-mono font-bold tracking-wider text-stone-200 uppercase backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#f5be38]" />
                <span>GET 50% OFF TODAY</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                Nice Colorfull <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-stone-200 via-slate-300 to-stone-400">Bag Printing</span>
              </h3>

              <div className="text-xs sm:text-sm text-stone-300 font-mono">
                Start selling <span className="text-white font-extrabold text-base">$235.00</span>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onSelectCategory('paper_bags_tags')}
                  className="h-10 px-6 rounded-lg bg-stone-200 hover:bg-white text-stone-950 font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer border border-stone-300"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-950" />
                </button>
              </div>
            </div>

            {/* Bag & Mug / Cup Graphics Cutout */}
            <div className="relative z-10 mt-6 flex items-end justify-center sm:justify-end gap-3">
              <div className="w-40 sm:w-48 aspect-square rounded-xl bg-black/60 p-2 flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-105 border border-white/20">
                <img
                  src="/luxury-kraft-shopping-carrier-bags.jpg"
                  alt="Custom Printed Luxury Bags"
                  className="w-full h-full object-contain drop-shadow-xl"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('custom-paper-bags-a3.jpg')) {
                      target.src = '/custom-paper-bags-a3.jpg';
                    }
                  }}
                />
              </div>
              <div className="w-24 sm:w-28 aspect-square rounded-xl bg-black/60 p-2 flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-105 border border-white/20">
                <img
                  src="/vacuum-flask-coffee-mug-set.jpg"
                  alt="Branded Drinkware"
                  className="w-full h-full object-contain drop-shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT SIDE: 2 INDIVIDUAL PRODUCT CARDS (Book Design & Cap Mockup)          */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
            
            {/* Card 1: Book Design with Add to Cart button */}
            <div className="group rounded-xl bg-[#FFFFFF] text-[#0F172A] p-5 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 border border-stone-200">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                    Hoodie
                  </span>
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-500" />
                    ))}
                  </div>
                </div>

                <div className="w-full aspect-square bg-stone-50 rounded-lg p-2 mb-3 overflow-hidden flex items-center justify-center">
                  <img
                    src="/executive-embroidered-polo-shirts.jpg"
                    alt="Hoodie Design"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <h4 className="font-bold text-sm sm:text-base text-stone-900 group-hover:text-teal-700 transition-colors">
                  Book Design
                </h4>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                <div className="text-xs sm:text-sm font-extrabold text-stone-950 font-mono">
                  $32.00 <span className="text-[10px] text-stone-400 font-normal">₦12,500</span>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectCategory('books_magazines')}
                  className="h-8 px-3 rounded-md bg-stone-900 hover:bg-black text-white font-semibold text-xs inline-flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <ShoppingBag className="w-3 h-3" />
                  <span>Buy</span>
                </button>
              </div>
            </div>

            {/* Card 2: Cap Mockup with Add to Cart button */}
            <div className="group rounded-xl bg-[#FFFFFF] text-[#0F172A] p-5 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 border border-stone-200">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                    Cap
                  </span>
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-500" />
                    ))}
                  </div>
                </div>

                <div className="w-full aspect-square bg-stone-50 rounded-lg p-2 mb-3 overflow-hidden flex items-center justify-center">
                  <img
                    src="/custom-branded-pouch-packaging.jpg"
                    alt="Cap Mockup"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <h4 className="font-bold text-sm sm:text-base text-stone-900 group-hover:text-teal-700 transition-colors">
                  Cap Printing
                </h4>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                <div className="text-xs sm:text-sm font-extrabold text-stone-950 font-mono">
                  $28.00 <span className="text-[10px] text-stone-400 font-normal">₦9,500</span>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectCategory('custom_apparels_caps')}
                  className="h-8 px-3 rounded-md bg-stone-900 hover:bg-black text-white font-semibold text-xs inline-flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <ShoppingBag className="w-3 h-3" />
                  <span>Buy</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
