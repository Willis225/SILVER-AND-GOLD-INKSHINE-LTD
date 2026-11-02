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
      className="relative bg-white py-10 sm:py-14 border-b border-stone-200 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Horizontal Banner with Warm Cream Background (#FFF3E0) */}
        <div className="relative rounded-2xl sm:rounded-3xl bg-[#FFF3E0] border border-amber-200/80 px-6 py-10 sm:py-14 overflow-hidden shadow-sm flex items-center justify-between">
          
          {/* Left Anchored Product Image inside clean rounded frame */}
          <div className="hidden sm:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-28 sm:w-36 lg:w-40 aspect-square rounded-[12px] bg-white/90 p-3 sm:p-3.5 shadow-md border border-amber-200/70 backdrop-blur-xs items-center justify-center overflow-hidden pointer-events-none select-none transition-transform hover:scale-102">
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

          {/* Centered Heading & Dual Pill Buttons */}
          <div className="relative z-10 max-w-xl mx-auto text-center space-y-4">
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight">
              Enjoy Up Your Vacations <br />
              In <span className="inline-block bg-[#f5be38] text-black px-2.5 py-0.5 rounded-md font-black shadow-2xs">the Best</span> Printing
            </h2>

            <p className="text-xs sm:text-sm text-stone-700 max-w-md mx-auto font-medium">
              Get your custom printed items for your next trip and events.
            </p>

            {/* Two Pill Buttons: Get a Quote in Gold, Learn More in White/Outline */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5">
              <button
                type="button"
                onClick={onRequestQuote}
                className="h-10 sm:h-11 px-6 rounded-full bg-[#f5be38] hover:bg-[#e5af28] text-black font-extrabold text-xs sm:text-sm inline-flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>

              <button
                type="button"
                onClick={onOrderNow}
                className="h-10 sm:h-11 px-6 rounded-full bg-white hover:bg-stone-50 text-slate-900 border border-slate-300 font-extrabold text-xs sm:text-sm inline-flex items-center gap-2 transition-all shadow-2xs active:scale-95 cursor-pointer"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 text-slate-900" />
              </button>
            </div>

          </div>

          {/* Right Anchored Product Image inside clean rounded frame */}
          <div className="hidden sm:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-28 sm:w-36 lg:w-40 aspect-square rounded-[12px] bg-white/90 p-3 sm:p-3.5 shadow-md border border-amber-200/70 backdrop-blur-xs items-center justify-center overflow-hidden pointer-events-none select-none transition-transform hover:scale-102">
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

        </div>

      </div>
    </section>
  );
};
