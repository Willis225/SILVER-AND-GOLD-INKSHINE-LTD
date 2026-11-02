import React from 'react';
import { ArrowRight, ShoppingBag, Eye } from 'lucide-react';
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
      className="relative bg-white text-slate-900 py-8 sm:py-12 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 3-Column Asymmetrical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          
          {/* ========================================================================= */}
          {/* LEFT PROMO CARD: Dark Rounded Banner with Gold Pill Button                */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 rounded-2xl overflow-hidden bg-[#0d0e14] p-6 sm:p-8 flex flex-col justify-between text-white shadow-lg border border-white/10 relative group">
            
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
                  className="h-10 px-5 rounded-full bg-[#f5be38] hover:bg-[#e5af28] text-black font-extrabold text-xs inline-flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5 text-black" />
                </button>
              </div>
            </div>

            {/* Bag Graphic Cutout on Bottom-Right */}
            <div className="relative z-10 mt-6 flex justify-end">
              <div className="w-40 sm:w-48 aspect-square rounded-xl bg-black/40 p-2 flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-105 border border-white/10">
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
          {/* RIGHT 2 CLEAN PRODUCT CARDS: With Yellow Pill Buttons                     */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 items-stretch">
            
            {/* Card 1: Bag Design */}
            <div className="group rounded-2xl bg-white text-slate-900 p-5 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-300 border border-slate-200/80 hover:border-slate-300">
              <div>
                {/* Product Thumbnail inside soft light well */}
                <div className="w-full aspect-square bg-[#F0F7FF] rounded-xl p-4 mb-4 overflow-hidden flex items-center justify-center border border-sky-100 group-hover:scale-104 transition-transform duration-300">
                  <img
                    src="/custom-paper-bags-a3.jpg"
                    alt="Bag Design"
                    className="w-full h-full object-contain filter drop-shadow-sm"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('luxury-kraft-shopping-carrier-bags.jpg')) {
                        target.src = '/luxury-kraft-shopping-carrier-bags.jpg';
                      }
                    }}
                  />
                </div>

                <div className="space-y-1">
                  <h4 className="font-extrabold text-base text-slate-900 group-hover:text-black transition-colors">
                    Bag Design
                  </h4>
                  <div className="text-sm font-black text-slate-950 font-mono">
                    Price on Request
                  </div>
                </div>
              </div>

              {/* Yellow Pill Button: View Details -> */}
              <div className="mt-4 pt-3 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => onSelectCategory('paper_bags_tags')}
                  className="h-8 px-4 rounded-full bg-[#f5be38] hover:bg-[#e5af28] text-black font-extrabold text-xs inline-flex items-center gap-1.5 transition-all shadow-2xs active:scale-95 cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-black" />
                </button>
              </div>
            </div>

            {/* Card 2: Cap Printing */}
            <div className="group rounded-2xl bg-white text-slate-900 p-5 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-300 border border-slate-200/80 hover:border-slate-300">
              <div>
                {/* Product Thumbnail inside soft light well */}
                <div className="w-full aspect-square bg-[#F8F9FA] rounded-xl p-4 mb-4 overflow-hidden flex items-center justify-center border border-slate-100 group-hover:scale-104 transition-transform duration-300">
                  <img
                    src="/custom-branded-pouch-packaging.jpg"
                    alt="Cap Printing"
                    className="w-full h-full object-contain filter drop-shadow-sm"
                    loading="lazy"
                  />
                </div>

                <div className="space-y-1">
                  <h4 className="font-extrabold text-base text-slate-900 group-hover:text-black transition-colors">
                    Cap Printing
                  </h4>
                  <div className="text-sm font-black text-slate-950 font-mono">
                    Price on Request
                  </div>
                </div>
              </div>

              {/* Yellow Pill Button: Add to Cart -> */}
              <div className="mt-4 pt-3 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => onSelectCategory('custom_apparels_caps')}
                  className="h-8 px-4 rounded-full bg-[#f5be38] hover:bg-[#e5af28] text-black font-extrabold text-xs inline-flex items-center gap-1.5 transition-all shadow-2xs active:scale-95 cursor-pointer"
                >
                  <span>Add to Cart</span>
                  <ArrowRight className="w-3.5 h-3.5 text-black" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
