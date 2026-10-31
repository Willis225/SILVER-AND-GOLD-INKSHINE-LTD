import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, Sparkles } from 'lucide-react';

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
      aria-label="Pre-Footer Promotional Showcase Banner"
      className="relative bg-white text-stone-900 py-20 sm:py-24 lg:py-28 border-b border-stone-200 overflow-hidden"
    >
      {/* Subtle background ambient mesh */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.04)_1px,transparent_1px)] [background-size:24px_24px] opacity-70" />
      </div>

      {/* Floating 4-Corner Print Mockup Graphics (Presvila Composition) */}
      <div className="absolute inset-0 max-w-7xl mx-auto pointer-events-none overflow-hidden select-none hidden md:block">
        
        {/* Top-Left: Person with printed portfolio */}
        <motion.div 
          initial={{ y: 0 }}
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-6 left-6 lg:left-12 w-36 sm:w-44 aspect-4/3 rounded-xl overflow-hidden shadow-xl border border-stone-200 bg-stone-100"
        >
          <img 
            src="/brochures-event-programs-flyers.jpg" 
            alt="Corporate Brochures Print" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Top-Right: Person wearing branded printed apparel */}
        <motion.div 
          initial={{ y: 0 }}
          animate={{ y: [4, -4, 4] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-6 right-6 lg:right-12 w-36 sm:w-44 aspect-4/3 rounded-xl overflow-hidden shadow-xl border border-stone-200 bg-stone-100"
        >
          <img 
            src="/executive-embroidered-polo-shirts.jpg" 
            alt="Corporate Embroidered Polos" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Bottom-Left: Custom cartons / brochures spread */}
        <motion.div 
          initial={{ y: 0 }}
          animate={{ y: [3, -3, 3] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-6 left-8 lg:left-16 w-36 sm:w-44 aspect-4/3 rounded-xl overflow-hidden shadow-xl border border-stone-200 bg-stone-100"
        >
          <img 
            src="/corrugated-shipping-cartons-mailer-boxes.jpg" 
            alt="Custom Corrugated Packaging" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Bottom-Right: Branded bottles / drinkware */}
        <motion.div 
          initial={{ y: 0 }}
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-6 right-8 lg:right-16 w-36 sm:w-44 aspect-4/3 rounded-xl overflow-hidden shadow-xl border border-stone-200 bg-stone-100"
        >
          <img 
            src="/vacuum-flask-coffee-mug-set.jpg" 
            alt="Branded Drinkware" 
            className="w-full h-full object-cover"
          />
        </motion.div>

      </div>

      {/* Center High-Impact Typography & Dual CTA Buttons */}
      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center z-10 space-y-6">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 border border-stone-300 text-xs font-mono font-bold tracking-widest text-purple-700 uppercase shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>CONTACT US FOR MORE</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-950 tracking-tight leading-[1.15]">
          Enjoy Up Your Vacations <br />
          In the <span className="text-[#7C3AED]">Best Printing</span>
        </h2>

        {/* Value Proposition Description */}
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
          Start your next commercial print run with Silver &amp; Gold Inkshine Ltd. High-fidelity offset precision, premium papers, and seamless delivery to your doorstep.
        </p>

        {/* Dual Ergonomic Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          {/* Primary Shop Now Button */}
          <button
            type="button"
            onClick={onOrderNow}
            className="h-11 px-6 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-sm inline-flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>

          {/* Secondary Contact Us Button */}
          <button
            type="button"
            onClick={onRequestQuote}
            className="h-11 px-6 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white font-semibold text-sm inline-flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <Phone className="w-4 h-4 text-white" />
            <span>Contact Us</span>
          </button>
        </div>

      </div>
    </section>
  );
};
