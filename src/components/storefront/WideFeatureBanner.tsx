import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface WideFeatureBannerProps {
  onOrderNow?: () => void;
  onExploreProducts?: () => void;
}

export const WideFeatureBanner: React.FC<WideFeatureBannerProps> = ({
  onOrderNow,
  onExploreProducts,
}) => {
  return (
    <section 
      aria-label="Discover Our Best Selling Product Banner"
      className="relative bg-white text-stone-900 py-8 sm:py-12 border-b border-stone-200 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Sleek, High-Contrast Black & Faded Grey Rounded Banner */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-[#1c1c22] via-[#0d0d12] to-[#050506] text-white p-7 sm:p-10 lg:p-12 shadow-xl border border-stone-700/60">
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                Discover Our Best Selling <br />
                Product You Need
              </h2>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-md font-normal">
                Top-quality printing products, designed to stand out. Shop now and get the best deals in Bayelsa.
              </p>

              {/* White Pill-Shaped CTA Button: Shop Now -> */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOrderNow || onExploreProducts}
                  className="h-10 sm:h-11 px-6 rounded-full bg-white hover:bg-stone-100 text-black font-extrabold text-xs sm:text-sm inline-flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
              </div>
            </div>

            {/* Right Side: Angled Overlapping Product Mockups */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end relative">
              <div className="relative w-full max-w-[420px] h-[200px] sm:h-[240px]">
                
                {/* Layer 1: Back Angled Print Mockup */}
                <motion.div 
                  initial={{ rotate: -10, y: 0 }}
                  whileHover={{ rotate: -6, y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-2 top-1 w-52 sm:w-60 aspect-[16/10] rounded-xl overflow-hidden shadow-2xl border border-stone-600/70 bg-stone-900 -rotate-10 transform origin-bottom-left"
                >
                  <img
                    src="/brochures-event-programs-flyers.jpg"
                    alt="Corporate Brochures Print"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </motion.div>

                {/* Layer 2: Front Angled Stationery Mockup */}
                <motion.div 
                  initial={{ rotate: 8, y: 0 }}
                  whileHover={{ rotate: 4, y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-2 bottom-1 w-56 sm:w-64 aspect-[16/10] rounded-xl overflow-hidden shadow-2xl border border-stone-600/70 bg-stone-900 rotate-8 transform origin-bottom-right"
                >
                  <img
                    src="/premium-matte-business-cards.jpg"
                    alt="Luxury Presentation Stationery"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </motion.div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
