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
    <section className="bg-[#0a0a0d]/80 backdrop-blur-sm text-stone-200 py-12 sm:py-16 lg:py-20 border-b border-white/10 relative overflow-hidden bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Descriptive Text & Bullet Points with Entrance Animation */}
          <motion.div 
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <p className="text-stone-300 text-sm sm:text-[15px] leading-relaxed font-normal text-justify sm:text-left">
              Order everything you need for your business, events or promotions at SILVER &amp; GOLD INKSHINE LTD and have them delivered nationwide in 3–5 business days! Send your print-ready artwork or hire our graphic experts to help you. We design and print quality roll-up banners, display stands, flyers, business cards, custom t-shirts, branded apparels, vehicle branding, signage, packaging labels, stickers, posters, promotional gifts and more.
            </p>

            {/* Bullet Points with exact radiant gold filled checkmarks */}
            <div className="space-y-3.5 pt-1">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#f5be38] text-black flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(245,190,56,0.35)]">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="font-bold text-white text-sm sm:text-base">
                  100% Quality Printing Services.
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#f5be38] text-black flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(245,190,56,0.35)]">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="font-bold text-white text-sm sm:text-base">
                  12% Discount on Bulk Orders.
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#f5be38] text-black flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(245,190,56,0.35)]">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="font-bold text-white text-sm sm:text-base">
                  Fast Delivery Nationwide.
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Promotional Banner Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div 
              onClick={onExploreProducts}
              className={`relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-[#121217] backdrop-blur-xl group transition-all duration-500 hover:border-[#f5be38]/60 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] ${onExploreProducts ? 'cursor-pointer' : ''}`}
            >
              <div className="relative w-full aspect-[1492/1054] overflow-hidden bg-black/40">
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
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
