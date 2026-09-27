import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

interface BrandIntroSectionProps {
  onExploreProducts?: () => void;
}

const BRAND_PROMO_CDN_IMAGE = 'https://cdn.hstockplus.org/uploads/public/img-1790081459988-99a85d16a5c3b3d4.webp';

export const BrandIntroSection: React.FC<BrandIntroSectionProps> = ({ onExploreProducts }) => {
  const [imageSrc, setImageSrc] = useState(BRAND_PROMO_CDN_IMAGE);

  return (
    <section className="bg-white text-stone-900 py-14 sm:py-20 border-b border-stone-200 relative overflow-hidden">
      {/* Subtle architectural hairline grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Descriptive Text & Bullet Points with Entrance Animation */}
          <motion.div 
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-300 text-stone-900 text-xs font-black tracking-widest uppercase shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
              <span>Full-Service Commercial Production</span>
            </div>

            <p className="text-stone-700 text-sm sm:text-[15.5px] leading-relaxed font-normal text-justify sm:text-left">
              Order everything you need for your business, events or promotions at <strong className="font-bold text-stone-950">SILVER &amp; GOLD INKSHINE LTD</strong> and have them delivered nationwide in 3–5 business days! Send your print-ready artwork or hire our graphic experts to help you. We design and print quality roll-up banners, display stands, flyers, business cards, custom t-shirts, branded apparels, vehicle branding, signage, packaging labels, stickers, posters, promotional gifts and more.
            </p>

            {/* Bullet Points with solid black circular badges and crisp white checkmarks */}
            <div className="space-y-3.5 pt-1">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-stone-950 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="font-extrabold text-stone-950 text-sm sm:text-base">
                  100% Quality Printing Services.
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-stone-950 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="font-extrabold text-stone-950 text-sm sm:text-base">
                  12% Discount on Bulk Orders.
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-stone-950 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="font-extrabold text-stone-950 text-sm sm:text-base">
                  Fast Delivery Nationwide.
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Promotional Banner Image on Clean Studio Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div 
              onClick={onExploreProducts}
              className={`relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-stone-200 bg-white group transition-all duration-500 hover:border-stone-400 hover:shadow-2xl ${onExploreProducts ? 'cursor-pointer' : ''}`}
            >
              <div className="relative w-full aspect-[1492/1054] overflow-hidden bg-stone-100">
                <img
                  src={imageSrc}
                  alt="SILVER & GOLD INKSHINE LTD Business & Commercial Printing Solutions"
                  className="w-full h-full object-cover sm:object-contain group-hover:scale-[1.02] transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  onError={() => {
                    if (imageSrc !== '/brand-intro-promo.webp') {
                      setImageSrc('/brand-intro-promo.webp');
                    }
                  }}
                />

                {/* Subtle sheen highlight on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
