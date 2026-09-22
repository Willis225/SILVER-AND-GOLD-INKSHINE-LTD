import React, { useState } from 'react';
import { motion } from 'motion/react';

interface TrustedCompanyFeatureSectionProps {
  onLearnMore?: () => void;
}

const TRUSTED_COMPANY_CDN_IMAGE = 'https://cdn.hstockplus.org/uploads/public/img-1790071046857-8ed71c252cdf3f9b.webp';

export const TrustedCompanyFeatureSection: React.FC<TrustedCompanyFeatureSectionProps> = () => {
  const [imageSrc, setImageSrc] = useState(TRUSTED_COMPANY_CDN_IMAGE);

  return (
    <section className="bg-white text-stone-900 py-14 sm:py-20 border-b border-stone-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Heading and Brand Story */}
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-4 sm:space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#f5be38]" />
              <span>ESTABLISHED COMMERCIAL PRINTING HUB</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-950 tracking-tight leading-tight">
              Nigeria's Trusted Online Printing Company
            </h2>

            <p className="text-xs sm:text-[14.5px] text-stone-700 leading-relaxed font-normal">
              SILVER &amp; GOLD INKSHINE LTD is a professional online printing company in Bayelsa &amp; Lagos, Nigeria. We serve businesses, schools, churches, event planners, product owners and corporate organisations who need fast, affordable and reliable printing solutions. Our goal is simple — help Nigerian brands look professional, advertise better and print with confidence. Whether you need one urgent item or bulk printing for a nationwide campaign, we are ready to support you with fast response, clean production and fair pricing.
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-6 text-xs sm:text-sm font-semibold text-stone-800">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f5be38]" />
                <span>Modern Offset &amp; UV Fleet</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f5be38]" />
                <span>Zero-Color-Shift Pre-Press</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f5be38]" />
                <span>Nationwide Express Logistics</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: High Quality Press Room Production Photo seamlessly blended with white background */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96, x: 25 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex justify-center items-center"
          >
            {/* Seamless blended container with radial mask and feathered perimeter edge blends */}
            <div className="relative w-full max-w-lg aspect-[4/5] sm:aspect-[5/6] overflow-hidden flex items-center justify-center">
              {/* Photo with radial edge feathering directly melting into the white background */}
              <img
                src={imageSrc}
                alt="SILVER & GOLD INKSHINE LTD Nigeria's Trusted Online Printing Partner"
                className="w-full h-full object-cover object-center transition-all duration-700 hover:scale-[1.02]"
                style={{
                  WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 55%, transparent 100%)',
                  maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 55%, transparent 100%)',
                }}
                referrerPolicy="no-referrer"
                onError={() => {
                  if (imageSrc !== '/trusted-company.webp') {
                    setImageSrc('/trusted-company.webp');
                  }
                }}
              />

              {/* Directional gradient overlays to ensure seamless perimeter dissolution into pure white */}
              <div className="absolute inset-y-0 left-0 w-20 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-20 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 top-0 h-20 sm:h-28 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-20 sm:h-28 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />

              {/* Overlaid Brand Badge with crisp styling */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#f5be38]/50 flex items-center gap-2 text-stone-900 shadow-[0_4px_20px_rgba(0,0,0,0.08)] z-10"
              >
                <div className="w-5 h-5 rounded-full bg-[#f5be38] flex items-center justify-center text-black text-[9px] font-black shadow-sm">
                  S
                </div>
                <span className="text-[11.5px] font-bold tracking-wide text-stone-900">Quality Guaranteed</span>
              </motion.div>

              {/* Bottom Subtle Printroom Facility Tag */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-stone-200 shadow-[0_4px_20px_rgba(0,0,0,0.08)] flex items-center gap-2 text-stone-800 z-10">
                <div className="w-2 h-2 rounded-full bg-[#f5be38] animate-pulse" />
                <span className="text-[10px] sm:text-xs font-bold text-stone-900">
                  Industrial UV &amp; Large-Format Press Floor, Lagos
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
