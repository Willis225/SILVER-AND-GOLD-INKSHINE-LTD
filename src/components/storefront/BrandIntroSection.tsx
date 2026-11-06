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
    <section className="bg-[#070204] text-white py-14 sm:py-20 border-b border-stone-800/80 relative overflow-hidden">
      {/* Subtle ambient highlight */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-transparent to-[#070204] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Descriptive Text & Bullet Points */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="text-xs font-bold tracking-[0.2em] text-[#ffd25d] uppercase">
              Full-Service Commercial Production
            </div>

            <p className="text-stone-300 text-sm sm:text-[15.5px] leading-relaxed font-normal text-justify sm:text-left">
              Order everything you need for your business, events or promotions at <strong className="font-bold text-white">SILVER &amp; GOLD INKSHINE LTD</strong> and have them delivered nationwide in 3–5 business days! Send your print-ready artwork or hire our graphic experts to help you. We design and print quality roll-up banners, display stands, flyers, business cards, custom t-shirts, branded apparels, vehicle branding, signage, packaging labels, stickers, posters, promotional gifts and more.
            </p>

            {/* Bullet Points */}
            <div className="space-y-3.5 pt-1">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-stone-800 text-[#ffd25d] flex items-center justify-center shrink-0 shadow-sm border border-stone-700">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="font-extrabold text-white text-sm sm:text-base">
                  100% Quality Printing Services.
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-stone-800 text-[#ffd25d] flex items-center justify-center shrink-0 shadow-sm border border-stone-700">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="font-extrabold text-white text-sm sm:text-base">
                  12% Discount on Bulk Orders.
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-stone-800 text-[#ffd25d] flex items-center justify-center shrink-0 shadow-sm border border-stone-700">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="font-extrabold text-white text-sm sm:text-base">
                  Fast Delivery Nationwide.
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Promotional Commercial Media Showcase Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative flex justify-center items-center"
          >
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-3xl border border-stone-800 shadow-2xl bg-[#121217] group">
              <img
                src={imageSrc}
                alt="SILVER & GOLD INKSHINE LTD Production Facility"
                className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
                onError={() => {
                  if (imageSrc !== '/trusted-company.webp') {
                    setImageSrc('/trusted-company.webp');
                  }
                }}
              />

              {/* Dark subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between z-10">
                <div className="bg-black/80 backdrop-blur-md px-4 py-2 rounded-xl border border-stone-700 text-white shadow-lg">
                  <div className="text-[11px] font-bold text-[#ffd25d]">State-of-the-Art Press Floor</div>
                  <div className="text-xs sm:text-sm font-black">Bayelsa &amp; Nationwide Delivery</div>
                </div>

                {onExploreProducts && (
                  <button
                    type="button"
                    onClick={onExploreProducts}
                    className="h-10 px-5 rounded-xl bg-gradient-to-r from-[#ffd25d] via-[#f5be38] to-[#e5af28] text-stone-950 font-extrabold text-xs tracking-wide uppercase shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer hidden sm:inline-flex items-center gap-2"
                  >
                    <span>View Catalog</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
