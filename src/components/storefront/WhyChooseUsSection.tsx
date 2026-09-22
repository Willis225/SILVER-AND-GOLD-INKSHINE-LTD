import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Layers, 
  Truck, 
  ShieldCheck, 
  CheckCircle2, 
  FileUp,
  MapPin,
  Clock
} from 'lucide-react';

interface WhyChooseUsSectionProps {
  onSendFile?: () => void;
  title?: string;
  description?: string;
}

const WHY_CHOOSE_OVERLAY_IMAGE = 'https://cdn.hstockplus.org/uploads/public/img-1790082465827-74faa2e8c246eb2c.webp';

export const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({ 
  onSendFile,
  title = 'Bayelsa & Nigeria’s Fast, Affordable, and Reliable Online Printing Company',
  description = 'Choose SILVER & GOLD INKSHINE LTD because we make printing simple, affordable and reliable for businesses, schools, churches, event planners, product owners and corporate organisations across Nigeria. We understand that customers want quality work without wasting money, delaying their events or struggling with poor finishing — and that is exactly what we deliver.',
}) => {
  const [overlaySrc, setOverlaySrc] = useState(WHY_CHOOSE_OVERLAY_IMAGE);

  const pillars = [
    {
      number: '01',
      title: 'High-Quality Printing Standards',
      icon: Sparkles,
      tag: 'Premium Quality',
      description:
        'At SILVER & GOLD INKSHINE LTD, we maintain high-quality printing standards that give your brand a sharp, professional finish every time. Using modern equipment, premium materials and strict quality checks, we produce banners, business cards, packaging and branded items that look impressive, last longer and help your business stand out confidently across Nigeria.',
      features: ['High-DPI Color Calibration', 'Industrial-Grade Stock & Inks', 'Zero-Defect Pre-Press Checks'],
      accentGradient: 'from-[#f5be38]/20 via-[#ffd15c]/10 to-transparent',
    },
    {
      number: '02',
      title: 'Same-Day & Urgent Printing Available',
      icon: Zap,
      tag: 'Express Speed',
      description:
        'When deadlines matter, SILVER & GOLD INKSHINE LTD delivers with speed and accuracy. Our streamlined production process, skilled team and efficient workflow help us complete both small and bulk orders on time without compromising quality. Whether for business promotions, events or urgent campaigns, we help you get your printed materials ready fast.',
      features: ['Priority Rush Production', 'Same-Day Dispatch for Select Items', 'Accurate Delivery Schedules'],
      accentGradient: 'from-amber-500/20 via-yellow-500/10 to-transparent',
    },
    {
      number: '03',
      title: 'Wide Range of Printing Services',
      icon: Layers,
      tag: 'Comprehensive Catalog',
      description:
        'From everyday office stationery to promotional materials, event branding, packaging, signage and custom gift items, SILVER & GOLD INKSHINE LTD offers a wide range of printing services to meet your business needs. No matter your industry or order size, we provide creative, reliable and professional print solutions that help you market, sell and grow.',
      features: ['Banners, Rollups & Signage', 'Apparels, Mugs & Souvenirs', 'Labels, Boxes & Corporate Sets'],
      accentGradient: 'from-[#f5be38]/20 via-orange-500/10 to-transparent',
    },
    {
      number: '04',
      title: 'Nationwide Delivery in 3–5 Business Days',
      icon: Truck,
      tag: 'Nationwide Reach',
      description:
        'SILVER & GOLD INKSHINE LTD makes it easy to get your printed materials delivered quickly anywhere in Nigeria. From Bayelsa and Lagos to Abuja, Port Harcourt and beyond, our fast nationwide delivery service ensures your banners, business cards, souvenirs, packaging and promotional items reach you safely and on time.',
      features: ['Doorstep Logistics Partners', 'Protective Moisture Packaging', 'Tracking Updates on Dispatch'],
      accentGradient: 'from-yellow-400/20 via-[#f5be38]/10 to-transparent',
    },
  ];

  return (
    <section className="bg-[#070709] text-stone-100 py-16 sm:py-24 border-b border-white/10 relative overflow-hidden">
      
      {/* Background Overlay Image - Clearly Visible */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src={overlaySrc}
          alt="Silver & Gold Inkshine Background Overlay"
          className="w-full h-full object-cover object-center opacity-85 scale-100 transition-transform duration-1000"
          referrerPolicy="no-referrer"
          onError={() => {
            if (overlaySrc !== '/why-choose-overlay.webp') {
              setOverlaySrc('/why-choose-overlay.webp');
            }
          }}
        />
        {/* Soft Dark Vignette for balanced translucency and supreme text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070709]/60 via-[#070709]/30 to-[#070709]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#070709_90%)] opacity-80" />
      </div>

      {/* Classic Animated Ambient Glow Orbs */}
      <motion.div 
        animate={{ 
          y: [0, -25, 0],
          scale: [1, 1.12, 1],
          opacity: [0.08, 0.16, 0.08]
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#f5be38] to-[#d4af37] blur-[130px] rounded-full pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          y: [0, 20, 0],
          scale: [1, 1.15, 1],
          opacity: [0.06, 0.14, 0.06]
        }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-10 right-10 w-[450px] h-[350px] bg-gradient-to-bl from-[#ffd15c] to-[#b8860b] blur-[120px] rounded-full pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header Card: Transparent Frosted Glass letting overlay show through */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl bg-[#09090e]/40 hover:bg-[#09090e]/55 border border-white/20 p-6 sm:p-10 lg:p-12 backdrop-blur-md mb-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-[#f5be38]/50 transition-all duration-500"
        >
          {/* Classic Animated Gold Border Beam along the top */}
          <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#f5be38] to-transparent opacity-90" />
          
          {/* Sweeping ambient light beam across the header on hover */}
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent skew-x-12 pointer-events-none"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Header Column */}
            <div className="lg:col-span-8 space-y-4 sm:space-y-5">
              
              {/* Animated Badge */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f5be38]/15 border border-[#f5be38]/40 text-[#f5be38] text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(245,190,56,0.2)] backdrop-blur-sm"
              >
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#f5be38]" />
                </motion.div>
                <span>Why Businesses Choose SILVER &amp; GOLD INKSHINE LTD</span>
              </motion.div>

              {/* Main Headline with high contrast */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-[1.2] drop-shadow-md">
                {title}
              </h2>

              {/* Narrative Text */}
              <p className="text-stone-200 text-sm sm:text-base leading-relaxed font-normal max-w-3xl drop-shadow-sm">
                {description}
              </p>

              {/* Quick Trust Badges with smooth hover micro-animations */}
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs sm:text-sm text-stone-200 font-medium">
                <motion.div 
                  whileHover={{ scale: 1.05, x: 2 }}
                  className="flex items-center gap-1.5 text-stone-100 bg-black/40 px-3 py-1 rounded-lg border border-white/10 transition-colors hover:border-[#f5be38]/40 backdrop-blur-sm shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#f5be38]" />
                  <span>Zero-Defect Guarantee</span>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05, x: 2 }}
                  className="flex items-center gap-1.5 text-stone-100 bg-black/40 px-3 py-1 rounded-lg border border-white/10 transition-colors hover:border-[#f5be38]/40 backdrop-blur-sm shadow-sm"
                >
                  <Clock className="w-4 h-4 text-[#f5be38]" />
                  <span>3–5 Days Doorstep Delivery</span>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05, x: 2 }}
                  className="flex items-center gap-1.5 text-stone-100 bg-black/40 px-3 py-1 rounded-lg border border-white/10 transition-colors hover:border-[#f5be38]/40 backdrop-blur-sm shadow-sm"
                >
                  <MapPin className="w-4 h-4 text-[#f5be38]" />
                  <span>Bayelsa, Lagos &amp; All 36 States</span>
                </motion.div>
              </div>
            </div>

            {/* Right Action Column */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/15 lg:pl-8">
              <div className="space-y-3 w-full sm:w-auto">
                <div className="text-xs font-semibold text-stone-300 uppercase tracking-wider text-left lg:text-right">
                  Ready to print your order?
                </div>
                
                {/* Classic Shimmering Button */}
                <motion.a
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href="https://wa.me/2347030372539?text=Hello%20SILVER%20%26%20GOLD%20INKSHINE%20LTD%2C%20I%20have%20a%20print-ready%20file%20to%20send%20for%20production"
                  target="_blank"
                  rel="noreferrer"
                  onClick={onSendFile}
                  className="relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-[#f5be38] via-[#ffd15c] to-[#e5ab20] hover:from-[#ffd15c] hover:to-[#f5be38] text-black font-black text-sm rounded-xl shadow-[0_4px_25px_rgba(245,190,56,0.45)] transition-all group cursor-pointer"
                >
                  {/* Button Sheen Sweep Effect */}
                  <motion.div 
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
                    className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none"
                  />
                  <FileUp className="w-4 h-4 text-black relative z-10" />
                  <span className="relative z-10">Send Print Ready File</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 relative z-10" />
                </motion.a>

                <p className="text-[11px] text-stone-300 text-left lg:text-right flex items-center gap-1.5 lg:justify-end">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Fast WhatsApp pre-press review in minutes</span>
                </p>
              </div>
            </div>

          </div>
        </motion.div>

        {/* 4 Pillars Grid with Transparent Frosted Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, scale: 1.008 }}
                className="group relative rounded-2xl sm:rounded-3xl bg-[#0a0a10]/45 hover:bg-[#0a0a10]/65 border border-white/15 hover:border-[#f5be38]/60 p-6 sm:p-8 backdrop-blur-md transition-all duration-500 shadow-xl hover:shadow-[0_20px_45px_rgba(245,190,56,0.18)] flex flex-col justify-between overflow-hidden"
              >
                {/* Classic Corner Radial Light Accent */}
                <div className={`absolute top-0 right-0 w-52 h-52 bg-gradient-to-bl ${pillar.accentGradient} rounded-full blur-3xl opacity-40 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
                
                {/* Subtle top border highlight */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#f5be38]/0 group-hover:via-[#f5be38]/80 to-transparent transition-all duration-700" />

                <div className="relative z-10">
                  {/* Header Row: Animated Icon + Tag & Classic Number */}
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="flex items-center gap-3">
                      
                      {/* Classic Animated Icon Container */}
                      <motion.div 
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                        className="relative w-12 h-12 rounded-xl bg-[#f5be38]/10 border border-[#f5be38]/30 text-[#f5be38] flex items-center justify-center group-hover:bg-[#f5be38] group-hover:text-black group-hover:shadow-[0_0_20px_rgba(245,190,56,0.4)] transition-all duration-300 shadow-inner"
                      >
                        <Icon className="w-6 h-6 transition-transform duration-300" />
                        
                        {/* Pulsing halo ring */}
                        <div className="absolute inset-0 rounded-xl border border-[#f5be38]/30 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500 pointer-events-none" />
                      </motion.div>

                      <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-stone-300 group-hover:border-[#f5be38]/30 group-hover:text-stone-200 transition-colors">
                        {pillar.tag}
                      </span>
                    </div>

                    {/* Classic Metallic Number with Hover Glow */}
                    <div className="text-3xl sm:text-4xl font-black text-white/20 group-hover:text-[#f5be38] group-hover:drop-shadow-[0_0_12px_rgba(245,190,56,0.4)] transition-all duration-500 font-mono select-none">
                      {pillar.number}
                    </div>
                  </div>

                  {/* Pillar Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#f5be38] transition-colors duration-300 mb-3 leading-snug">
                    {pillar.number}. {pillar.title}
                  </h3>

                  {/* Pillar Description */}
                  <p className="text-xs sm:text-[13.5px] text-stone-300 leading-relaxed font-normal mb-5">
                    {pillar.description}
                  </p>
                </div>

                {/* Sub-features list with animated check dots */}
                <div className="pt-4 border-t border-white/10 space-y-2 mt-auto relative z-10">
                  {pillar.features.map((feat, fIdx) => (
                    <motion.div 
                      key={fIdx} 
                      whileHover={{ x: 3 }}
                      className="flex items-center gap-2 text-xs text-stone-400 group-hover:text-stone-300 font-medium transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f5be38] shadow-[0_0_6px_rgba(245,190,56,0.6)] group-hover:scale-125 transition-transform" />
                      <span>{feat}</span>
                    </motion.div>
                  ))}
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
