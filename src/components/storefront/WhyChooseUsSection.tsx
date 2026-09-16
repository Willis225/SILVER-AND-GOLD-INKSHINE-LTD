import React from 'react';
import { ArrowRight } from 'lucide-react';

interface WhyChooseUsSectionProps {
  onSendFile?: () => void;
}

export const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({ onSendFile }) => {
  return (
    <section className="bg-[#f0f5f9] py-12 sm:py-16 border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Column 1: Left Overview & Action Button */}
          <div className="lg:col-span-4 space-y-4 sm:space-y-5">
            {/* Eyebrow */}
            <div className="text-[#009b72] font-bold text-sm sm:text-base tracking-tight">
              Why Businesses in Lagos Choose Rollupbanners.ng
            </div>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight leading-snug">
              Lagos’s Fast, Affordable, and Reliable Online Printing Company
            </h2>

            {/* Paragraph */}
            <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-normal">
              Choose Rollupbanners.ng because we make printing simple, affordable and reliable for businesses, schools, churches, event planners, product owners and corporate organisations in Lagos and across Nigeria. We understand that customers want quality work without wasting money, delaying their events or struggling with poor finishing — and that is exactly what we deliver.
            </p>

            {/* Send Print Ready File Button */}
            <div className="pt-1">
              <a
                href="https://wa.me/2347030372539?text=Hello%20Rollupbanners.ng%2C%20I%20have%20a%20print-ready%20file%20to%20send%20for%20production"
                target="_blank"
                rel="noreferrer"
                onClick={onSendFile}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#009b72] hover:bg-[#00875a] active:scale-98 text-white font-bold text-xs sm:text-sm rounded-md shadow-sm transition-all group"
              >
                <span>Send Print Ready File</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Column 2: Points 1 & 2 */}
          <div className="lg:col-span-4 space-y-8">
            {/* Point 1 */}
            <div className="space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-[#005944] tracking-tight">
                1. High-Quality Printing Standards
              </h3>
              <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-normal">
                At Rollupbanners.ng, we maintain high-quality printing standards that give your brand a sharp, professional finish every time. Using modern equipment, premium materials and strict quality checks, we produce banners, business cards, packaging and branded items that look impressive, last longer and help your business stand out confidently across Nigeria.
              </p>
            </div>

            {/* Point 2 */}
            <div className="space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-[#005944] tracking-tight">
                2. Same-Day &amp; Urgent Printing Available
              </h3>
              <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-normal">
                When deadlines matter, Rollupbanners.ng delivers with speed and accuracy. Our streamlined production process, skilled team and efficient workflow help us complete both small and bulk orders on time without compromising quality. Whether for business promotions, events or urgent campaigns, we help you get your printed materials ready fast.
              </p>
            </div>
          </div>

          {/* Column 3: Points 3 & 4 */}
          <div className="lg:col-span-4 space-y-8">
            {/* Point 3 */}
            <div className="space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-[#005944] tracking-tight">
                3. Wide Range of Printing Services
              </h3>
              <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-normal">
                From everyday office stationery to promotional materials, event branding, packaging, signage and custom gift items, Rollupbanners.ng offers a wide range of printing services to meet your business needs. No matter your industry or order size, we provide creative, reliable and professional print solutions that help you market, sell and grow.
              </p>
            </div>

            {/* Point 4 */}
            <div className="space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-[#005944] tracking-tight">
                4. Nationwide Delivery in 3–5 Business Days
              </h3>
              <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-normal">
                Rollupbanners.ng makes it easy to get your printed materials delivered quickly anywhere in Nigeria. From Lagos to Abuja, Port Harcourt and beyond, our fast nationwide delivery service ensures your banners, business cards, souvenirs, packaging and promotional items reach you safely and on time.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
