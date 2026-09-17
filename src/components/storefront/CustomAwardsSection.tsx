import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';

interface AwardItem {
  id: string;
  title: string;
  price: string;
  numericPrice: number;
  category: string;
}

interface CustomAwardsSectionProps {
  onViewProducts?: () => void;
  onSelectItem?: (item: AwardItem) => void;
}

const AWARD_ITEMS: AwardItem[] = [
  {
    id: 'award-crystal-plaque',
    title: 'Customized Branded Crystal Glass Award Plaque Printing in Lagos | Custom Award Plaques',
    price: '₦34,000.00',
    numericPrice: 34000,
    category: 'awards',
  },
  {
    id: 'award-wooden-plaque',
    title: 'Wooden Award Plaque',
    price: '₦16,500.00',
    numericPrice: 16500,
    category: 'awards',
  },
  {
    id: 'award-acrylic-plaque',
    title: 'Custom Branded Acrylic Award Plaque Printing in Lagos',
    price: '₦24,000.00',
    numericPrice: 24000,
    category: 'awards',
  },
  {
    id: 'award-star-trophy',
    title: 'Custom Engraved Star Award Trophy & Medals',
    price: '₦18,500.00',
    numericPrice: 18500,
    category: 'awards',
  },
];

export const CustomAwardsSection: React.FC<CustomAwardsSectionProps> = ({
  onViewProducts,
  onSelectItem,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-white py-12 sm:py-16 border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Heading, Paragraph & Call to Action with entrance animation */}
          <motion.div 
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 space-y-4 sm:space-y-5"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight leading-snug">
              Custom Award Plaques and Trophies Printing
            </h2>

            <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-normal">
              Celebrate excellence with beautifully custom award plaques, trophies and decorative items from SILVER &amp; GOLD INKSHINE LTD. We produce acrylic plaques, crystal glass awards, wooden shields, engraved medals and customised recognition items for schools, corporate organisations, sports competitions, graduations and community events across Nigeria.
            </p>

            <div>
              <button
                onClick={onViewProducts}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#c59b27] hover:bg-[#b8860b] active:scale-98 text-white font-bold text-xs sm:text-sm rounded-md shadow-sm transition-all group"
              >
                <span className="text-white">View Products</span>
                <ArrowRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>

          {/* Right Column: Carousel of Products */}
          <div className="lg:col-span-9 relative group/carousel">
            
            {/* Scroll buttons for desktop */}
            <button
              onClick={() => handleScroll('left')}
              className="absolute -left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md border border-stone-200 text-stone-700 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity z-20 hover:bg-stone-50"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleScroll('right')}
              className="absolute -right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md border border-stone-200 text-stone-700 flex items-center justify-center opacity-80 group-hover/carousel:opacity-100 transition-opacity z-20 hover:bg-stone-50"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Scrollable Container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none scroll-smooth pb-4 pt-1 px-1 -mx-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {AWARD_ITEMS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectItem?.(item)}
                  className="w-[200px] sm:w-[220px] shrink-0 flex flex-col group cursor-pointer"
                >
                  {/* Image Container with Exact Visual Representation from Image */}
                  <div className="w-full h-[210px] sm:h-[230px] rounded-lg overflow-hidden bg-stone-50 border border-stone-100 group-hover:shadow-md transition-shadow relative flex items-center justify-center">
                    
                    {/* Item 1: Customized Branded Crystal Glass Award Plaque (Flame Crystal on Dark Wood) */}
                    {item.id === 'award-crystal-plaque' && (
                      <div className="w-full h-full relative overflow-hidden bg-stone-900 flex items-center justify-center">
                        {/* Dramatic lighting backdrop */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-stone-900 to-stone-800" />
                        <div className="absolute bottom-0 inset-x-0 h-16 bg-amber-950/40 border-t border-amber-500/20" />

                        {/* Crystal Trophy Body */}
                        <div className="relative z-10 w-32 h-44 flex flex-col items-center justify-end pb-2 group-hover:scale-105 transition-transform duration-300">
                          {/* Flame Beveled Glass */}
                          <div className="relative w-24 h-34 rounded-t-full bg-gradient-to-b from-white/35 via-white/15 to-white/5 backdrop-blur-xs border-2 border-white/60 shadow-2xl p-2 flex flex-col justify-between items-center text-center">
                            {/* Top frosted crest */}
                            <div className="w-6 h-6 rounded-full border border-white/60 flex items-center justify-center text-[7px] text-white font-bold bg-white/20">
                              ~
                            </div>

                            {/* Frosted Engraving */}
                            <div className="space-y-0.5">
                              <div className="text-[4px] text-white/70 tracking-widest uppercase">
                                GREATER AUSTIN
                              </div>
                              <div className="text-[5px] font-bold text-white uppercase tracking-wider">
                                BUSINESS AWARDS
                              </div>
                              <div className="text-[4px] text-amber-300 font-mono">2024</div>
                              <div className="text-[4.5px] font-black text-white mt-1 border-t border-white/20 pt-0.5">
                                Environmental Champion
                              </div>
                              <div className="text-[5.5px] font-black text-amber-200 uppercase">
                                UPLIFT DESK
                              </div>
                            </div>

                            <div className="text-[3px] text-white/60">
                              Presented by Rollup Banners
                            </div>

                            {/* Light refraction highlight */}
                            <div className="absolute top-2 left-1.5 w-1 h-14 bg-white/40 rounded-full transform -rotate-12 blur-2xs" />
                          </div>

                          {/* Solid Black / Wood Base */}
                          <div className="w-28 h-4 bg-stone-950 rounded-sm border-t border-stone-600 shadow-2xl flex items-center justify-center">
                            <div className="w-20 h-0.5 bg-amber-500/40 rounded-full" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Item 2: Wooden Award Plaque (Rich cherry wood with dual plates) */}
                    {item.id === 'award-wooden-plaque' && (
                      <div className="w-full h-full p-2 flex items-center justify-center bg-stone-100">
                        <div className="relative w-40 h-44 flex items-center justify-center">
                          {/* Back Plaque (Larger) */}
                          <div className="absolute top-1 left-2 w-28 h-36 bg-[#5c2415] rounded-xs shadow-lg border-2 border-[#3d160c] p-2 flex flex-col justify-between items-center">
                            <div className="w-full h-full bg-[#1c1917] rounded-2xs border border-amber-400 p-1 flex flex-col justify-between text-center">
                              <div className="font-serif italic text-[5.5px] text-amber-300">
                                Congratulations on your Retirement
                              </div>
                              <div className="text-[4px] text-stone-400 leading-tight">
                                In recognition of 25 years of loyal service and dedication.
                              </div>
                              <div className="text-[4px] text-amber-400 font-bold">2024</div>
                            </div>
                          </div>

                          {/* Front Plaque (Smaller overlapping) */}
                          <div className="relative z-10 w-24 h-32 bg-[#4a1c10] rounded-xs shadow-2xl border-2 border-[#2b0f07] p-1.5 flex flex-col justify-between items-center transform translate-x-3 translate-y-2 group-hover:scale-105 transition-transform duration-300">
                            {/* Gold-bordered engraved metal plate */}
                            <div className="w-full h-full bg-[#171717] rounded-2xs border border-amber-400 p-1 flex flex-col justify-between items-center text-center">
                              <div className="w-4 h-4 rounded-full border border-amber-300 flex items-center justify-center text-[5px] text-amber-300">
                                ★
                              </div>
                              <div>
                                <div className="text-[5px] font-black text-amber-300 tracking-wider uppercase">
                                  CONFECTIONER
                                </div>
                                <div className="text-[4px] text-amber-200">OF THE YEAR</div>
                                <div className="text-[5.5px] font-serif font-bold text-white mt-1">
                                  DAISY PASHA
                                </div>
                              </div>
                              <div className="text-[3.5px] text-stone-400">Presented with Honors</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Item 3: Custom Branded Acrylic Award Plaque (Faceted trophy on black base) */}
                    {item.id === 'award-acrylic-plaque' && (
                      <div className="w-full h-full p-2 flex items-center justify-center bg-stone-100">
                        <div className="relative w-36 h-46 flex flex-col items-center justify-end pb-2">
                          {/* Octagonal Faceted Acrylic Body in Champagne & Gold */}
                          <div className="relative w-26 h-32 bg-gradient-to-b from-amber-50/90 via-white/80 to-amber-100/90 rounded-2xl border-2 border-amber-300/80 shadow-xl p-2 flex flex-col justify-between items-center text-center backdrop-blur-xs group-hover:scale-105 transition-transform duration-300">
                            {/* Gold Official Emblem */}
                            <div className="w-7 h-7 rounded-full bg-[#b8860b] border border-white flex flex-col items-center justify-center text-white shadow-xs">
                              <span className="text-[4px] font-black leading-none">NIGERIA</span>
                              <span className="text-[3px] text-amber-200">SERVICE</span>
                            </div>

                            {/* Award Citation */}
                            <div className="space-y-0.5">
                              <div className="text-[4px] text-stone-600 font-bold uppercase">
                                Award of Appreciation
                              </div>
                              <div className="text-[3.5px] text-stone-500 italic">
                                Presented to
                              </div>
                              <div className="text-[6px] font-black text-[#6d4c0d] font-serif leading-tight">
                                Muharram Sisters
                              </div>
                              <div className="text-[3.5px] text-stone-500 max-w-[85px] mx-auto leading-tight">
                                In recognition of exemplary contribution &amp; leadership
                              </div>
                            </div>

                            <div className="text-[3.5px] text-[#8c6d1f] font-bold">
                              Lagos, Nigeria
                            </div>
                          </div>

                          {/* Black Pedestal Glass Base */}
                          <div className="w-24 h-4 bg-stone-900 rounded-xs border-t-2 border-amber-400 shadow-xl flex items-center justify-center">
                            <div className="w-16 h-0.5 bg-white/20" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Item 4: Star Trophy & Medals */}
                    {item.id === 'award-star-trophy' && (
                      <div className="w-full h-full p-2 flex items-center justify-center bg-stone-100">
                        <div className="relative w-36 h-44 flex flex-col items-center justify-end pb-2">
                          {/* Golden Rising Star Trophy */}
                          <div className="relative w-20 h-32 flex flex-col items-center justify-between group-hover:scale-105 transition-transform duration-300">
                            {/* Gold Star */}
                            <div className="w-12 h-12 text-amber-400 drop-shadow-md text-3xl flex items-center justify-center">
                              ★
                            </div>

                            {/* Twisted Gold Column */}
                            <div className="w-4 h-16 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 rounded-full shadow-md" />

                            {/* Plaque Plate */}
                            <div className="w-18 h-6 bg-stone-900 rounded-xs border border-amber-400 p-0.5 text-center flex flex-col justify-center">
                              <div className="text-[4px] font-black text-amber-300 uppercase">
                                EXCELLENCE AWARD
                              </div>
                              <div className="text-[3px] text-white">CHAMPION 2025</div>
                            </div>
                          </div>

                          {/* Marble Base */}
                          <div className="w-22 h-3.5 bg-stone-950 rounded-xs border-t border-stone-600 shadow-lg" />
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Title */}
                  <div className="pt-3 text-center">
                    <h3 className="text-xs sm:text-[13px] font-bold text-stone-900 line-clamp-2 leading-tight group-hover:text-[#b8860b] transition-colors">
                      {item.title}
                    </h3>
                    
                    {/* Gold Price */}
                    <div className="text-xs sm:text-[13.5px] font-bold text-[#b8860b] mt-1.5">
                      {item.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
