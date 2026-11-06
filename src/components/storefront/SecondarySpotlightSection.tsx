import React from 'react';
import { ArrowRight } from 'lucide-react';
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
      aria-label="Nice Colorful Bag Printing"
      className="relative bg-[#070204] text-white py-8 sm:py-12 border-b border-stone-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 3-Column Asymmetrical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          
          {/* ========================================================================= */}
          {/* LEFT PROMO CARD: Dark Rounded Banner                                       */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 rounded-2xl overflow-hidden bg-gradient-to-br from-[#1c1c22] via-[#0d0d12] to-[#050508] p-6 sm:p-8 flex flex-col justify-between text-white shadow-xl border border-stone-700/60 relative group">
            
            <div className="relative z-10 space-y-3">
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                Nice Colorful <br />
                Bag Printing
              </h3>

              <p className="text-xs sm:text-sm text-stone-300 font-normal">
                Stand out with vibrant bags.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onSelectCategory('paper_bags_tags')}
                  className="h-10 px-5 rounded-full bg-stone-200 hover:bg-white text-stone-950 font-extrabold text-xs inline-flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-950" />
                </button>
              </div>
            </div>

            {/* Bag Graphic Cutout on Bottom-Right */}
            <div className="relative z-10 mt-6 flex justify-end">
              <div className="w-40 sm:w-48 aspect-square rounded-xl bg-black/60 p-2 flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-105 border border-stone-700/80">
                <img
                  src="/luxury-kraft-shopping-carrier-bags.jpg"
                  alt="Custom Colorful Printed Bags"
                  className="w-full h-full object-contain filter drop-shadow-md"
                  loading="lazy"
                />
              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT 2 CLEAN PRODUCT CARDS                                               */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 items-stretch">
            
            {/* Card 1: Bag Design */}
            <div 
              onClick={() => onSelectCategory('paper_bags_tags')}
              className="rounded-2xl bg-[#121217] hover:bg-[#1a1a22] p-6 sm:p-7 text-white border border-stone-800 hover:border-stone-600 flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-md group"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold tracking-[0.2em] text-[#ffd25d] uppercase">
                  Featured Product
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#ffd25d] transition-colors">
                  Bag Design
                </h4>
                <p className="text-xs text-stone-300">
                  Custom kraft and art paper carrier bags.
                </p>
              </div>

              <div className="my-4 aspect-[4/3] rounded-xl bg-black/60 p-3 flex items-center justify-center overflow-hidden border border-stone-800 shadow-inner">
                <img
                  src="/luxury-kraft-shopping-carrier-bags.jpg"
                  alt="Bag Design"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs font-bold text-white">
                <span className="text-[#ffd25d]">View Collection</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#ffd25d] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 2: Box Design */}
            <div 
              onClick={() => onSelectCategory('packaging_shipping_cartons')}
              className="rounded-2xl bg-[#121217] hover:bg-[#1a1a22] p-6 sm:p-7 text-white border border-stone-800 hover:border-stone-600 flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-md group"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold tracking-[0.2em] text-[#ffd25d] uppercase">
                  Packaging Solution
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#ffd25d] transition-colors">
                  Box Design
                </h4>
                <p className="text-xs text-stone-300">
                  Rigid luxury boxes and corrugated cartons.
                </p>
              </div>

              <div className="my-4 aspect-[4/3] rounded-xl bg-black/60 p-3 flex items-center justify-center overflow-hidden border border-stone-800 shadow-inner">
                <img
                  src="/corrugated-shipping-cartons-mailer-boxes.jpg"
                  alt="Box Design"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs font-bold text-white">
                <span className="text-[#ffd25d]">View Collection</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#ffd25d] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
