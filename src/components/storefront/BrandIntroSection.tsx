import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

interface BrandIntroSectionProps {
  onExploreProducts?: () => void;
}

export const BrandIntroSection: React.FC<BrandIntroSectionProps> = ({ onExploreProducts }) => {
  return (
    <section className="bg-white text-stone-800 py-10 sm:py-14 lg:py-16 border-b border-stone-200/80">
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
            <p className="text-stone-700 text-sm sm:text-[15px] leading-relaxed font-normal text-justify sm:text-left">
              Order everything you need for your business, events or promotions at SILVER &amp; GOLD INKSHINE LTD and have them delivered nationwide in 3–5 business days! Send your print-ready artwork or hire our graphic experts to help you. We design and print quality roll-up banners, display stands, flyers, business cards, custom t-shirts, branded apparels, vehicle branding, signage, packaging labels, stickers, posters, promotional gifts and more.
            </p>

            {/* Bullet Points with exact gold outline checkmarks */}
            <div className="space-y-3.5 pt-1">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-[#b8860b] flex items-center justify-center shrink-0 text-[#b8860b]">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="font-bold text-stone-900 text-sm sm:text-base">
                  100% Quality Printing Services.
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-[#b8860b] flex items-center justify-center shrink-0 text-[#b8860b]">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="font-bold text-stone-900 text-sm sm:text-base">
                  12% Discount on Bulk Orders.
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-[#b8860b] flex items-center justify-center shrink-0 text-[#b8860b]">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="font-bold text-stone-900 text-sm sm:text-base">
                  Fast Delivery Nationwide.
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Exact Promo Banner Card with Mockups */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-stone-200 bg-gradient-to-r from-stone-50 via-white to-stone-100 p-5 sm:p-7 md:p-8">
              
              {/* Gold Dynamic Swoosh Graphic in the background */}
              <div className="absolute right-0 top-0 bottom-0 w-3/5 pointer-events-none overflow-hidden">
                <svg
                  viewBox="0 0 500 400"
                  className="w-full h-full object-cover preserve-3d"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M180 0 L500 0 L500 400 L60 400 C150 320 120 200 240 140 C320 90 260 30 180 0 Z"
                    fill="url(#goldGradient)"
                  />
                  <path
                    d="M230 0 L500 0 L500 400 L140 400 C200 340 180 230 290 170 C360 120 300 50 230 0 Z"
                    fill="#78350f"
                    opacity="0.6"
                  />
                  <defs>
                    <linearGradient id="goldGradient" x1="100" y1="0" x2="500" y2="400" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#d4af37" />
                      <stop offset="50%" stopColor="#b8860b" />
                      <stop offset="100%" stopColor="#78350f" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Banner Content Layout */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                {/* Text / Brand info side (Left of Banner) */}
                <div className="md:col-span-5 space-y-4">
                  {/* Logo: SILVER & GOLD INKSHINE LTD */}
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md bg-[#b8860b] flex items-center justify-center text-white shadow-xs">
                      {/* Stylized Rollup Banner Icon */}
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M4 3h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 5h14v11H5V8zm-2 12h18a1 1 0 0 1 1 1v1H2v-1a1 1 0 0 1 1-1z" />
                      </svg>
                    </div>
                    <div className="flex items-center text-xs sm:text-sm font-black tracking-tight text-stone-900">
                      <span>SILVER &amp; GOLD INKSHINE LTD</span>
                    </div>
                  </div>

                  {/* Headline: Printing Company in Lagos */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight leading-[1.15]">
                      Printing Company
                    </h3>
                    <div className="text-2xl sm:text-3xl font-black text-[#b8860b] tracking-tight leading-[1.15]">
                      in Lagos
                    </div>
                  </div>

                  {/* Subtext */}
                  <p className="text-[11px] sm:text-xs text-stone-600 leading-relaxed font-normal max-w-xs">
                    Quality digital printing, large format printing and branding solutions for businesses, events and organisations.
                  </p>

                  {/* 4 Feature Badges */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-stone-700">
                      <div className="w-4 h-4 rounded-full border border-stone-400 flex items-center justify-center text-stone-600 shrink-0">
                        ⏱️
                      </div>
                      <span className="truncate">Fast Turnaround</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-stone-700">
                      <div className="w-4 h-4 rounded-full border border-stone-400 flex items-center justify-center text-stone-600 shrink-0">
                        🏅
                      </div>
                      <span className="truncate">Premium Quality</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-stone-700">
                      <div className="w-4 h-4 rounded-full border border-stone-400 flex items-center justify-center text-stone-600 shrink-0">
                        🏷️
                      </div>
                      <span className="truncate">Affordable Pricing</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-stone-700">
                      <div className="w-4 h-4 rounded-full border border-stone-400 flex items-center justify-center text-stone-600 shrink-0">
                        🚚
                      </div>
                      <span className="truncate">Nationwide Delivery</span>
                    </div>
                  </div>

                  {/* CMYK Color Bars at bottom */}
                  <div className="flex items-center gap-1 pt-2">
                    <div className="w-5 h-1.5 bg-[#00a0e9] rounded-xs" title="Cyan" />
                    <div className="w-5 h-1.5 bg-[#e4007f] rounded-xs" title="Magenta" />
                    <div className="w-5 h-1.5 bg-[#fff100] rounded-xs" title="Yellow" />
                    <div className="w-5 h-1.5 bg-[#111111] rounded-xs" title="Black" />
                  </div>
                </div>

                {/* Right Side: Visual Display of Mockups (Rollup Banners, Shirt, Mug, Bag, Signage, Flyers) */}
                <div className="md:col-span-7 flex justify-center items-end overflow-hidden pt-4">
                  <div className="relative w-full max-w-[380px] sm:max-w-[420px] h-[210px] sm:h-[240px] scale-[0.82] xs:scale-[0.92] sm:scale-100 origin-bottom mx-auto">
                    
                    {/* 1. Large Format Rollup Banner 1 (INNOVATIVE SOLUTIONS - White/Gold theme) */}
                    <div className="absolute left-2 bottom-0 w-24 sm:w-28 h-44 sm:h-52 bg-white rounded-t-sm shadow-xl border border-stone-300 flex flex-col justify-between overflow-hidden z-20">
                      {/* Banner graphic */}
                      <div className="p-2 space-y-1 bg-gradient-to-b from-stone-50 to-white flex-1 flex flex-col justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#b8860b]" />
                            <span className="text-[6px] font-bold text-stone-800">SILVER &amp; GOLD</span>
                          </div>
                          <div className="text-[7.5px] font-black text-stone-900 leading-tight">
                            INNOVATIVE SOLUTIONS.
                          </div>
                          <div className="text-[6px] font-extrabold text-[#b8860b]">
                            REAL IMPACT.
                          </div>
                        </div>

                        {/* Image graphic on banner */}
                        <div className="w-full h-12 bg-stone-200 rounded-xs overflow-hidden relative">
                          <img
                            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&q=80"
                            alt="Corporate Building"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-1">
                            <span className="text-[5px] text-white font-medium">We help your brand stand out</span>
                          </div>
                        </div>

                        <div className="text-[5px] text-stone-500 truncate">
                          SILVER &amp; GOLD INKSHINE LTD
                        </div>
                      </div>

                      {/* Silver base */}
                      <div className="h-3 bg-gradient-to-r from-stone-300 via-stone-100 to-stone-400 border-t border-stone-400 flex items-center justify-center">
                        <div className="w-8 h-0.5 bg-stone-500 rounded-full" />
                      </div>
                    </div>

                    {/* 2. Rollup Banner 2 (BAYELSA BUSINESS EXPO - Dark theme) */}
                    <div className="absolute left-24 sm:left-28 bottom-0 w-24 sm:w-28 h-46 sm:h-56 bg-[#0c121d] rounded-t-sm shadow-2xl border border-stone-700 flex flex-col justify-between overflow-hidden z-10">
                      <div className="p-2 space-y-1 bg-gradient-to-b from-[#0c121d] to-[#080d14] flex-1 flex flex-col justify-between text-white">
                        <div className="space-y-1">
                          <div className="text-[5.5px] text-stone-400 tracking-wider uppercase">
                            SILVER &amp; GOLD INKSHINE LTD
                          </div>
                          <div className="text-[8px] font-black text-white leading-tight">
                            LAGOS BUSINESS EXPO 2025
                          </div>
                          <div className="text-[5px] text-amber-400 font-semibold">
                            CONNECT • COLLABORATE • GROW
                          </div>
                        </div>

                        {/* Night city graphic */}
                        <div className="w-full h-14 bg-stone-800 rounded-xs overflow-hidden relative">
                          <img
                            src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=200&q=80"
                            alt="Lagos Skyline"
                            className="w-full h-full object-cover opacity-80"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0c121d] via-transparent to-transparent flex items-end p-1">
                            <span className="text-[5px] text-amber-300 font-bold">JUNE 12–14, 2025</span>
                          </div>
                        </div>

                        <div className="text-[5px] text-stone-400">
                          LANDMARK CENTRE, LAGOS
                        </div>
                      </div>

                      {/* Silver base */}
                      <div className="h-3 bg-gradient-to-r from-stone-400 via-stone-200 to-stone-500 border-t border-stone-500" />
                    </div>

                    {/* 3. Lightbox Brand Signage on right */}
                    <div className="absolute right-1 sm:right-2 bottom-6 w-20 sm:w-24 h-28 sm:h-32 bg-stone-900 rounded-sm shadow-xl border-2 border-stone-600 p-1.5 flex flex-col justify-center items-center text-center z-10">
                      <div className="w-full h-full bg-[#111827] rounded-xs p-1.5 flex flex-col justify-between items-center text-white border border-stone-700 shadow-inner">
                        <div className="text-[5px] text-stone-400">SILVER &amp; GOLD</div>
                        <div>
                          <div className="text-[7.5px] font-black text-white uppercase tracking-tight">
                            BRAND SIGNAGE
                          </div>
                          <div className="text-[5.5px] font-bold text-amber-400">
                            MAKES AN IMPACT
                          </div>
                        </div>
                        <div className="w-full h-0.5 bg-gradient-to-r from-amber-400 via-[#b8860b] to-yellow-400 rounded-full" />
                      </div>
                    </div>

                    {/* 4. Branded Gold/White Polo Shirt */}
                    <div className="absolute left-[175px] sm:left-[200px] bottom-6 w-16 sm:w-20 h-20 sm:h-24 z-30 drop-shadow-lg">
                      <svg viewBox="0 0 100 120" className="w-full h-full filter drop-shadow-md">
                        {/* Polo Collar */}
                        <path d="M35 15 L50 28 L65 15 L55 8 L45 8 Z" fill="#996515" />
                        <path d="M42 16 L50 28 L58 16 Z" fill="#b8860b" />
                        {/* Placket */}
                        <path d="M47 28 L53 28 L53 50 L47 50 Z" fill="#996515" />
                        <circle cx="50" cy="35" r="1.5" fill="#ffffff" />
                        <circle cx="50" cy="42" r="1.5" fill="#ffffff" />
                        {/* Body */}
                        <path d="M25 22 L35 15 L65 15 L75 22 L92 38 L80 50 L72 40 L72 105 L28 105 L28 40 L20 50 L8 38 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
                        {/* Sleeve cuffs gold */}
                        <path d="M8 38 L20 50 L16 53 L5 42 Z" fill="#996515" />
                        <path d="M92 38 L80 50 L84 53 L95 42 Z" fill="#996515" />
                        {/* Chest Logo */}
                        <circle cx="38" cy="42" r="4" fill="#b8860b" />
                        <text x="44" y="44" fontSize="5" fontWeight="bold" fill="#0f172a">S&amp;G</text>
                      </svg>
                    </div>

                    {/* 5. Paper Shopping Bag with rope handles */}
                    <div className="absolute right-12 sm:right-16 bottom-0 w-14 sm:w-16 h-18 sm:h-20 bg-[#fef3c7] rounded-xs shadow-lg border border-amber-200 p-1 flex flex-col justify-between items-center z-35">
                      {/* Handles */}
                      <div className="absolute -top-3 w-6 h-3 border-2 border-amber-700 rounded-t-full" />
                      <div className="mt-1 text-center">
                        <div className="text-[5px] font-bold text-amber-950">SILVER &amp; GOLD</div>
                        <div className="text-[4px] text-amber-800">INKSHINE LTD</div>
                      </div>
                      <div className="w-full h-1 bg-amber-400/50 rounded-full" />
                    </div>

                    {/* 6. Branded Ceramic Coffee Mug */}
                    <div className="absolute right-6 sm:right-8 bottom-0 w-8 sm:w-10 h-9 sm:h-11 bg-white rounded-sm shadow-md border border-stone-300 p-1 flex items-center justify-center z-40">
                      {/* Handle */}
                      <div className="absolute -right-2 top-2 w-2.5 h-5 border-2 border-stone-300 rounded-r-md" />
                      <div className="text-center">
                        <div className="w-3 h-3 rounded-full bg-[#b8860b] mx-auto flex items-center justify-center text-[5px] text-white font-bold">
                          S
                        </div>
                        <div className="text-[3px] text-stone-600 mt-0.5 font-bold">Inkshine</div>
                      </div>
                    </div>

                    {/* 7. Stack of Business Cards in Front */}
                    <div className="absolute left-16 sm:left-20 bottom-0 w-16 sm:w-18 h-7 bg-white rounded-xs shadow-md border border-stone-300 p-1 flex items-center gap-1 z-40 transform -rotate-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#b8860b]" />
                      <div>
                        <div className="text-[5px] font-bold text-stone-900 leading-none">JOHN ADENIYO</div>
                        <div className="text-[4px] text-stone-500 leading-none mt-0.5">MANAGING DIRECTOR</div>
                      </div>
                    </div>

                    {/* 8. Full Colour Flyers Stack / Grand Opening Card */}
                    <div className="absolute left-36 sm:left-44 bottom-0 w-14 sm:w-16 h-10 bg-gradient-to-tr from-[#78350f] to-[#b8860b] text-white rounded-xs shadow-md p-1 flex flex-col justify-between z-40">
                      <div className="text-[5px] font-black uppercase text-amber-300 leading-tight">
                        FULL COLOUR
                      </div>
                      <div className="text-[6.5px] font-black leading-none text-white">
                        FLYERS
                      </div>
                      <div className="text-[4px] text-stone-200">
                        YOU ARE INVITED!
                      </div>
                    </div>

                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
