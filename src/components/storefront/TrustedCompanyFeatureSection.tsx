import React from 'react';
import { motion } from 'motion/react';

interface TrustedCompanyFeatureSectionProps {
  onLearnMore?: () => void;
}

export const TrustedCompanyFeatureSection: React.FC<TrustedCompanyFeatureSectionProps> = () => {
  return (
    <section className="bg-white text-stone-900 py-14 sm:py-20 border-b border-stone-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading and Brand Story */}
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-4 sm:space-y-6"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-950 tracking-tight leading-tight">
              Nigeria's Trusted Online Printing Company
            </h2>

            <p className="text-xs sm:text-[14.5px] text-stone-700 leading-relaxed font-normal">
              SILVER &amp; GOLD INKSHINE LTD is a professional online printing company in Bayelsa &amp; Lagos, Nigeria. We serve businesses, schools, churches, event planners, product owners and corporate organisations who need fast, affordable and reliable printing solutions. Our goal is simple — help Nigerian brands look professional, advertise better and print with confidence. Whether you need one urgent item or bulk printing for a nationwide campaign, we are ready to support you with fast response, clean production and fair pricing.
            </p>
          </motion.div>

          {/* Right Column: High Quality Press Room Production Photo with Brand Rep */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96, x: 25 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-200 bg-stone-100 group hover:border-[#f5be38] transition-colors">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80"
                alt="SILVER & GOLD INKSHINE LTD Quality Assurance Specialist in Modern Print Facility"
                className="w-full h-[260px] sm:h-[320px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Overlaid Brand Badge simulating the gold 'S&G' Inkshine uniform */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="absolute top-4 right-4 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#f5be38]/40 flex items-center gap-2 text-white shadow-lg"
              >
                <div className="w-5 h-5 rounded-full bg-[#f5be38] flex items-center justify-center text-black text-[9px] font-black">
                  S
                </div>
                <span className="text-[11px] font-bold tracking-wide text-[#f5be38]">Quality Guaranteed</span>
              </motion.div>

              {/* Bottom Subtle Printroom Facility Tag */}
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-stone-200 shadow-md flex items-center gap-2 text-stone-800">
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
