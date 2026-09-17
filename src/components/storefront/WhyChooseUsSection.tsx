import React from 'react';
import { motion } from 'motion/react';
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
          <motion.div 
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 space-y-4 sm:space-y-5"
          >
            {/* Eyebrow in Gold */}
            <div className="text-[#b8860b] font-bold text-sm sm:text-base tracking-tight">
              Why Businesses Choose SILVER &amp; GOLD INKSHINE LTD
            </div>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight leading-snug">
              Bayelsa &amp; Nigeria’s Fast, Affordable, and Reliable Online Printing Company
            </h2>

            {/* Paragraph */}
            <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-normal">
              Choose SILVER &amp; GOLD INKSHINE LTD because we make printing simple, affordable and reliable for businesses, schools, churches, event planners, product owners and corporate organisations across Nigeria. We understand that customers want quality work without wasting money, delaying their events or struggling with poor finishing — and that is exactly what we deliver.
            </p>

            {/* Send Print Ready File Button in Gold with White Writing */}
            <div className="pt-1">
              <a
                href="https://wa.me/2347030372539?text=Hello%20SILVER%20%26%20GOLD%20INKSHINE%20LTD%2C%20I%20have%20a%20print-ready%20file%20to%20send%20for%20production"
                target="_blank"
                rel="noreferrer"
                onClick={onSendFile}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#c59b27] hover:bg-[#b8860b] active:scale-98 text-white font-bold text-xs sm:text-sm rounded-md shadow-sm transition-all group"
              >
                <span className="text-white">Send Print Ready File</span>
                <ArrowRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>

          {/* Column 2: Points 1 & 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 space-y-8"
          >
            {/* Point 1 */}
            <div className="space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-[#996515] tracking-tight">
                1. High-Quality Printing Standards
              </h3>
              <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-normal">
                At SILVER &amp; GOLD INKSHINE LTD, we maintain high-quality printing standards that give your brand a sharp, professional finish every time. Using modern equipment, premium materials and strict quality checks, we produce banners, business cards, packaging and branded items that look impressive, last longer and help your business stand out confidently across Nigeria.
              </p>
            </div>

            {/* Point 2 */}
            <div className="space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-[#996515] tracking-tight">
                2. Same-Day &amp; Urgent Printing Available
              </h3>
              <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-normal">
                When deadlines matter, SILVER &amp; GOLD INKSHINE LTD delivers with speed and accuracy. Our streamlined production process, skilled team and efficient workflow help us complete both small and bulk orders on time without compromising quality. Whether for business promotions, events or urgent campaigns, we help you get your printed materials ready fast.
              </p>
            </div>
          </motion.div>

          {/* Column 3: Points 3 & 4 */}
          <motion.div 
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 space-y-8"
          >
            {/* Point 3 */}
            <div className="space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-[#996515] tracking-tight">
                3. Wide Range of Printing Services
              </h3>
              <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-normal">
                From everyday office stationery to promotional materials, event branding, packaging, signage and custom gift items, SILVER &amp; GOLD INKSHINE LTD offers a wide range of printing services to meet your business needs. No matter your industry or order size, we provide creative, reliable and professional print solutions that help you market, sell and grow.
              </p>
            </div>

            {/* Point 4 */}
            <div className="space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-[#996515] tracking-tight">
                4. Nationwide Delivery in 3–5 Business Days
              </h3>
              <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-normal">
                SILVER &amp; GOLD INKSHINE LTD makes it easy to get your printed materials delivered quickly anywhere in Nigeria. From Bayelsa and Lagos to Abuja, Port Harcourt and beyond, our fast nationwide delivery service ensures your banners, business cards, souvenirs, packaging and promotional items reach you safely and on time.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
