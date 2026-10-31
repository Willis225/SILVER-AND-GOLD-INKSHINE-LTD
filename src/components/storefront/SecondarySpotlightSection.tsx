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
          {/* LEFT PROMO BANNER: 50% OFF TODAY - NICE COLORFULL BAG PRINTING            */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 rounded-2xl overflow-hidden bg-gradient-to-br from-[#059669] via-[#10B981] to-[#047857] p-7 sm:p-8 flex flex-col justify-between text-white shadow-xl relative group">
            
            {/* Subtle light mesh */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-black/30 border border-white/20 text-xs font-mono font-bold tracking-wider text-white uppercase backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>GET 50% OFF TODAY</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                Nice Colorfull <br />
                Bag Printing
              </h3>

              <div className="text-xs sm:text-sm text-emerald-100 font-mono">
                Start selling <span className="text-white font-extrabold text-base">$235.00</span>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onSelectCategory('paper_bags_tags')}
                  className="h-10 px-6 rounded-lg bg-[#F5BE38] hover:bg-[#E5AF28] text-stone-950 font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Bag & Mug / Cup Graphics Cutout */}
            <div className="relative z-10 mt-6 flex items-end justify-center sm:justify-end gap-3">
              <div className="w-40 sm:w-48 aspect-square rounded-xl bg-emerald-950/40 p-2 flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-105 border border-white/10">
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
              <div className="w-24 sm:w-28 aspect-square rounded-xl bg-emerald-950/40 p-2 flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-105 border border-white/10">
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
                  <span className="text-sm font-extrabold text-indigo-900 font-mono">
                    $68.00
                  </span>
                </div>

                <div className="relative w-full aspect-square rounded-lg bg-stone-50 p-3 mb-4 flex items-center justify-center overflow-hidden">
                  <img
                    src="/brochures-event-programs-flyers.jpg"
                    alt="Book Design Print"
                    className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-500 group-hover:scale-108"
                    loading="lazy"
                  />

                  {/* Add to Cart button */}
                  <div className="absolute inset-x-2 bottom-2 z-10">
                    <button
                      type="button"
                      onClick={() => onSelectCategory('books_magazines')}
                      className="w-full h-8 px-3 rounded-md bg-[#000000] hover:bg-[#18181B] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      <ShoppingBag className="w-3 h-3 text-[#D4AF37]" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-1 text-center">
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-black transition-colors">
                  Book Design
                </h4>
                <div className="flex items-center justify-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>
            </div>

            {/* Card 2: Cap Mockup */}
            <div className="group rounded-xl bg-[#FFFFFF] text-[#0F172A] p-5 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 border border-stone-200">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                    Packet
                  </span>
                  <span className="text-sm font-extrabold text-indigo-900 font-mono">
                    $35.00
                  </span>
                </div>

                <div className="relative w-full aspect-square rounded-lg bg-stone-50 p-3 mb-4 flex items-center justify-center overflow-hidden">
                  <img
                    src="/executive-embroidered-polo-shirts.jpg"
                    alt="Cap Mockup"
                    className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-500 group-hover:scale-108"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="space-y-1 text-center">
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-black transition-colors">
                  Cap Mockup
                </h4>
                <div className="flex items-center justify-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
