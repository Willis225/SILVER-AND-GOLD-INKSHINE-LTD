import React, { useState } from 'react';
import { motion } from 'motion/react';

interface TrustedCompanyFeatureSectionProps {
  onLearnMore?: () => void;
}

const TRUSTED_COMPANY_CDN_IMAGE = 'https://cdn.hstockplus.org/uploads/public/img-1790071046857-8ed71c252cdf3f9b.webp';

export const TrustedCompanyFeatureSection: React.FC<TrustedCompanyFeatureSectionProps> = () => {
  const [imageSrc, setImageSrc] = useState(TRUSTED_COMPANY_CDN_IMAGE);

  return (
    <section className="bg-[#09090d] text-white py-16 sm:py-24 border-b border-white/10 relative overflow-hidden bg-grid-pattern">
      {/* Subtle ambient chrome sheen */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[350px] bg-white/[0.03] rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Heading and Brand Story */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-4 sm:space-y-6"
          >
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#ffd25d]">
              Established Commercial Printing Hub
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              Nigeria's Trusted Online Printing Company
            </h2>

            <p className="text-sm sm:text-[15px] text-stone-300 leading-relaxed font-normal">
              SILVER &amp; GOLD INKSHINE LTD is a professional online printing company in Bayelsa &amp; Nigeria. We serve businesses, schools, churches, event planners, product owners and corporate organisations who need fast, affordable and reliable printing solutions. Our goal is simple — help Nigerian brands look professional, advertise better and print with confidence. Whether you need one urgent item or bulk printing for a nationwide campaign, we are ready to support you with fast response, clean production and fair pricing.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs sm:text-sm font-bold text-stone-200">
              <div className="flex items-center gap-2 bg-[#121217] px-3.5 py-2 rounded-xl border border-white/15 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-white" />
                <span>Modern Offset &amp; UV Fleet</span>
              </div>
              <div className="flex items-center gap-2 bg-[#121217] px-3.5 py-2 rounded-xl border border-white/15 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-white" />
                <span>Zero-Color-Shift Pre-Press</span>
              </div>
              <div className="flex items-center gap-2 bg-[#121217] px-3.5 py-2 rounded-xl border border-white/15 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-white" />
                <span>Direct Location Delivery</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: High Quality Press Room Production Photo on Dark Frame */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex justify-center items-center"
          >
            <div className="relative w-full max-w-lg aspect-[4/5] sm:aspect-[5/6] overflow-hidden rounded-3xl border border-white/15 shadow-2xl bg-[#121217] group">
              <img
                src={imageSrc}
                alt="SILVER & GOLD INKSHINE LTD Nigeria's Trusted Online Printing Partner"
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

              {/* Overlaid Brand Badge with crisp styling */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-black/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/30 flex items-center gap-2 text-white shadow-lg z-10"
              >
                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-black text-[9px] font-black shadow-sm">
                  ✓
                </div>
                <span className="text-[11.5px] font-bold tracking-wide text-white">Quality Guaranteed</span>
              </motion.div>

              {/* Bottom Subtle Printroom Facility Tag */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-black/85 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20 shadow-lg flex items-center gap-2 text-stone-200 z-10">
                <span className="text-[10px] sm:text-xs font-bold text-white">
                  Industrial UV &amp; Large-Format Press Floor, Nigeria
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
