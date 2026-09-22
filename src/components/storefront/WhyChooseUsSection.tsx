import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface WhyChooseUsSectionProps {
  onSendFile?: () => void;
  title?: string;
  description?: string;
}

export const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({ 
  onSendFile,
  title = 'Bayelsa & Nigeria’s Fast, Affordable, and Reliable Online Printing Company',
  description = 'Choose SILVER & GOLD INKSHINE LTD because we make printing simple, affordable and reliable for businesses, schools, churches, event planners, product owners and corporate organisations across Nigeria. We understand that customers want quality work without wasting money, delaying their events or struggling with poor finishing — and that is exactly what we deliver.',
}) => {
  return (
    <section className="bg-[#08080a] text-stone-100 py-14 sm:py-20 border-b border-white/10 relative overflow-hidden bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Column 1: Left Overview & Action Button */}
          <motion.div 
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 space-y-4 sm:space-y-6"
          >
            {/* Eyebrow in Gold */}
            <div className="text-[#f5be38] font-black text-xs sm:text-sm tracking-wider uppercase">
              Why Businesses Choose SILVER &amp; GOLD INKSHINE LTD
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              {title}
            </h2>

            {/* Paragraph */}
            <p className="text-xs sm:text-[13.5px] text-stone-300 leading-relaxed font-normal">
              {description}
            </p>

            {/* Send Print Ready File Button in Gold */}
            <div className="pt-2">
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                href="https://wa.me/2347030372539?text=Hello%20SILVER%20%26%20GOLD%20INKSHINE%20LTD%2C%20I%20have%20a%20print-ready%20file%20to%20send%20for%20production"
                target="_blank"
                rel="noreferrer"
                onClick={onSendFile}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#f5be38] hover:bg-[#ffd15c] text-black font-extrabold text-xs sm:text-sm rounded-full shadow-[0_0_25px_rgba(245,190,56,0.3)] transition-colors group cursor-pointer"
              >
                <span>Send Print Ready File</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.a>
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
            <motion.div 
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="space-y-2.5 p-5 rounded-2xl bg-[#121217] border border-white/10 hover:border-[#f5be38]/60 hover:shadow-[0_0_25px_rgba(245,190,56,0.15)] transition-colors"
            >
              <h3 className="text-sm sm:text-base font-bold text-[#f5be38] tracking-tight">
                1. High-Quality Printing Standards
              </h3>
              <p className="text-xs sm:text-[13px] text-stone-300 leading-relaxed font-normal">
                At SILVER &amp; GOLD INKSHINE LTD, we maintain high-quality printing standards that give your brand a sharp, professional finish every time. Using modern equipment, premium materials and strict quality checks, we produce banners, business cards, packaging and branded items that look impressive, last longer and help your business stand out confidently across Nigeria.
              </p>
            </motion.div>

            {/* Point 2 */}
            <motion.div 
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="space-y-2.5 p-5 rounded-2xl bg-[#121217] border border-white/10 hover:border-[#f5be38]/60 hover:shadow-[0_0_25px_rgba(245,190,56,0.15)] transition-colors"
            >
              <h3 className="text-sm sm:text-base font-bold text-[#f5be38] tracking-tight">
                2. Same-Day &amp; Urgent Printing Available
              </h3>
              <p className="text-xs sm:text-[13px] text-stone-300 leading-relaxed font-normal">
                When deadlines matter, SILVER &amp; GOLD INKSHINE LTD delivers with speed and accuracy. Our streamlined production process, skilled team and efficient workflow help us complete both small and bulk orders on time without compromising quality. Whether for business promotions, events or urgent campaigns, we help you get your printed materials ready fast.
              </p>
            </motion.div>
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
            <motion.div 
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="space-y-2.5 p-5 rounded-2xl bg-[#121217] border border-white/10 hover:border-[#f5be38]/60 hover:shadow-[0_0_25px_rgba(245,190,56,0.15)] transition-colors"
            >
              <h3 className="text-sm sm:text-base font-bold text-[#f5be38] tracking-tight">
                3. Wide Range of Printing Services
              </h3>
              <p className="text-xs sm:text-[13px] text-stone-300 leading-relaxed font-normal">
                From everyday office stationery to promotional materials, event branding, packaging, signage and custom gift items, SILVER &amp; GOLD INKSHINE LTD offers a wide range of printing services to meet your business needs. No matter your industry or order size, we provide creative, reliable and professional print solutions that help you market, sell and grow.
              </p>
            </motion.div>

            {/* Point 4 */}
            <motion.div 
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="space-y-2.5 p-5 rounded-2xl bg-[#121217] border border-white/10 hover:border-[#f5be38]/60 hover:shadow-[0_0_25px_rgba(245,190,56,0.15)] transition-colors"
            >
              <h3 className="text-sm sm:text-base font-bold text-[#f5be38] tracking-tight">
                4. Nationwide Delivery in 3–5 Business Days
              </h3>
              <p className="text-xs sm:text-[13px] text-stone-300 leading-relaxed font-normal">
                SILVER &amp; GOLD INKSHINE LTD makes it easy to get your printed materials delivered quickly anywhere in Nigeria. From Bayelsa and Lagos to Abuja, Port Harcourt and beyond, our fast nationwide delivery service ensures your banners, business cards, souvenirs, packaging and promotional items reach you safely and on time.
              </p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
