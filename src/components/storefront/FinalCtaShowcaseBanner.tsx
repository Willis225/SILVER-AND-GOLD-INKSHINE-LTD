import React from 'react';
import { ArrowRight } from 'lucide-react';

interface FinalCtaShowcaseBannerProps {
  onOrderNow: () => void;
  onRequestQuote: () => void;
}

export const FinalCtaShowcaseBanner: React.FC<FinalCtaShowcaseBannerProps> = ({
  onOrderNow,
  onRequestQuote,
}) => {
  return (
    <section 
      aria-label="Promotional Showcase Banner"
      className="relative bg-[#070204] py-10 sm:py-14 border-b border-stone-800/80 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Horizontal Banner with Black & Faded Grey Theme */}
        <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#1c1c22] via-[#0d0d12] to-[#050506] border border-stone-700/60 px-6 py-10 sm:py-14 overflow-hidden shadow-xl flex items-center justify-between">
          
          {/* Left Anchored Product Image */}
          <div className="hidden sm:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-28 sm:w-36 lg:w-40 aspect-square rounded-[12px] bg-black/60 p-3 sm:p-3.5 shadow-md border border-stone-700 backdrop-blur-xs items-center justify-center overflow-hidden pointer-events-none select-none">
            <img
              src="/custom-paper-bags-a3.jpg"
              alt="Custom Printed Bag"
              className="w-full h-full object-contain filter drop-shadow-xs"
              loading="lazy"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.includes('luxury-kraft-shopping-carrier-bags.jpg')) {
                  target.src = '/luxury-kraft-shopping-carrier-bags.jpg';
                }
              }}
            />
          </div>

          {/* Centered Heading & Dual Buttons */}
          <div className="relative z-10 max-w-xl mx-auto text-center space-y-4">
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              Elevate Your Brand With <br />
              <span className="inline-block bg-[#ffd25d] text-black px-2.5 py-0.5 rounded-md font-black shadow-xs">Exceptional</span> Printing
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto font-medium">
              High-impact displays, premium merchandise, and bespoke corporate branding delivered nationwide.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5">
              <button
                type="button"
                onClick={onRequestQuote}
                className="h-10 sm:h-11 px-6 rounded-full bg-gradient-to-r from-[#ffd25d] via-[#f5be38] to-[#e5af28] hover:from-[#f5be38] hover:to-[#d49f18] text-stone-950 font-extrabold text-xs sm:text-sm inline-flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4 text-stone-950 stroke-[2.5]" />
              </button>

              <button
                type="button"
                onClick={onOrderNow}
                className="h-10 sm:h-11 px-6 rounded-full bg-stone-800 hover:bg-stone-700 text-white font-extrabold text-xs sm:text-sm inline-flex items-center gap-2 transition-all border border-stone-600 active:scale-95 cursor-pointer"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4 text-[#ffd25d]" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
