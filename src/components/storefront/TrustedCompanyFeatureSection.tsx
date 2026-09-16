import React from 'react';

interface TrustedCompanyFeatureSectionProps {
  onLearnMore?: () => void;
}

export const TrustedCompanyFeatureSection: React.FC<TrustedCompanyFeatureSectionProps> = () => {
  return (
    <section className="bg-white py-12 sm:py-16 border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading and Brand Story */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-stone-900 tracking-tight leading-snug">
              Nigeria's Trusted Online Printing Company
            </h2>

            <p className="text-xs sm:text-[13.5px] text-stone-600 leading-relaxed font-normal">
              Rollupbanners.ng is a professional online printing company in Lagos, Nigeria. We serve businesses, schools, churches, event planners, product owners and corporate organisations who need fast, affordable and reliable printing solutions. Our goal is simple — help Nigerian brands look professional, advertise better and print with confidence. Whether you need one urgent item or bulk printing for a nationwide campaign, we are ready to support you with fast response, clean production and fair pricing.
            </p>
          </div>

          {/* Right Column: High Quality Press Room Production Photo with Brand Rep */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-stone-100 bg-stone-100 group">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80"
                alt="Rollupbanners.ng Quality Assurance Specialist in Modern Lagos Print Facility"
                className="w-full h-[260px] sm:h-[320px] object-cover object-center group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Overlaid Brand Badge simulating the green 'b' Rollup Banners uniform */}
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-2 text-white">
                <div className="w-5 h-5 rounded-full bg-[#009b72] flex items-center justify-center text-white text-[10px] font-black">
                  b
                </div>
                <span className="text-[11px] font-bold tracking-wide">Quality Guaranteed</span>
              </div>

              {/* Bottom Subtle Printroom Facility Tag */}
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-stone-200 shadow-sm flex items-center gap-2 text-stone-800">
                <div className="w-2 h-2 rounded-full bg-[#009b72] animate-pulse" />
                <span className="text-[10px] sm:text-xs font-semibold">
                  Industrial UV &amp; Large-Format Press Floor, Lagos
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
