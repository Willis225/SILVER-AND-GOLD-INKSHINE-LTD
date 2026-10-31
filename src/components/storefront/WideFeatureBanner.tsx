import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';

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
      aria-label="Best Selling Feature Banner"
      className="relative bg-white text-stone-900 py-16 sm:py-20 border-b border-stone-200 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Landscape Wide Showcase Banner (Black & Faded Grey Theme) */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#18181b] via-[#09090d] to-[#141417] text-white p-8 sm:p-12 lg:p-14 shadow-2xl border border-white/25">
          
          {/* Subtle noise / mesh overlay */}
          <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-[1px] pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-stone-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/25 text-xs font-mono font-bold tracking-wider text-stone-200 uppercase backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#f5be38]" />
                <span>BEST SELLER PRODUCTS</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] text-balance">
                Discover Our Best Selling <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-stone-200 via-slate-300 to-stone-400">Product You Need</span>
              </h2>

              <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-lg">
                High-density offset brochures, corporate presentation kits, and velvet-laminated cards engineered for high-impact enterprise presentations.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOrderNow || onExploreProducts}
                  className="h-11 px-6 rounded-lg bg-stone-200 hover:bg-white text-stone-950 font-bold text-sm inline-flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer border border-stone-300"
                >
                  <span>Make an Order</span>
                  <ArrowRight className="w-4 h-4 text-stone-950" />
                </button>
              </div>
            </div>

            {/* Right Side: Overlapping Layered Angled Brochures / Stationery Graphics */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end relative">
              <div className="relative w-full max-w-[440px] h-[260px] sm:h-[300px]">
                
                {/* Layer 1: Back Angled Folder */}
                <motion.div 
                  initial={{ rotate: -12, y: 0 }}
                  whileHover={{ rotate: -8, y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-4 top-2 w-56 sm:w-64 aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border-2 border-white/30 bg-[#1e1b4b] -rotate-12 transform origin-bottom-left"
                >
                  <img
                    src="/brochures-event-programs-flyers.jpg"
                    alt="Corporate Brochures Print"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </motion.div>

                {/* Layer 2: Front Angled Card Presentation */}
                <motion.div 
                  initial={{ rotate: 10, y: 0 }}
                  whileHover={{ rotate: 6, y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-4 bottom-2 w-60 sm:w-72 aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border-2 border-white/40 bg-[#311042] rotate-8 transform origin-bottom-right"
                >
                  <img
                    src="/premium-matte-business-cards.jpg"
                    alt="Luxury Presentation Stationery"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Floating Like Icon */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 backdrop-blur-xs flex items-center justify-center border border-white/30 text-rose-400">
                    <Heart className="w-4 h-4 fill-rose-500" />
                  </div>
                </motion.div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
