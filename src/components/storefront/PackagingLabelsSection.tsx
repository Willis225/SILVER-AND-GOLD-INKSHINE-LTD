import React, { useRef } from 'react';
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';

interface PackagingItem {
  id: string;
  title: string;
  price: string;
  numericPrice: number;
  category: string;
}

interface PackagingLabelsSectionProps {
  onViewProducts?: () => void;
  onSelectItem?: (item: PackagingItem) => void;
}

const PACKAGING_ITEMS: PackagingItem[] = [
  {
    id: 'pkg-pouch-packaging',
    title: 'Design and Print custom branded pouch Packaging in Lagos',
    price: '₦85.00',
    numericPrice: 85,
    category: 'packaging',
  },
  {
    id: 'pkg-woven-labels',
    title: 'Custom Woven Labels',
    price: '₦85.00',
    numericPrice: 85,
    category: 'packaging',
  },
  {
    id: 'pkg-ice-cream-cups',
    title: 'Ice Cream Cups',
    price: '₦900.00',
    numericPrice: 900,
    category: 'packaging',
  },
  {
    id: 'pkg-paper-bags-a3',
    title: 'Custom Paper Bags (A3 size)',
    price: '₦1,000.00',
    numericPrice: 1000,
    category: 'packaging',
  },
];

export const PackagingLabelsSection: React.FC<PackagingLabelsSectionProps> = ({
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
          
          {/* Left Column: Heading, Paragraph & Call to Action */}
          <div className="lg:col-span-3 space-y-4 sm:space-y-5">
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight leading-snug">
              Packaging, Labels &amp; Stickers Printing
            </h2>

            <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-normal">
              Protect your products and strengthen your brand identity with custom packaging solutions from Rollupbanners.ng. We produce product labels, stickers, food packaging, paper bags, cartons, shipping boxes and custom printed packaging for small businesses, e-commerce stores and manufacturers across Nigeria. Great packaging builds trust and influences buying decisions.
            </p>

            <div>
              <button
                onClick={onViewProducts}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#009b72] hover:bg-[#00875a] active:scale-98 text-white font-bold text-xs sm:text-sm rounded-md shadow-sm transition-all group"
              >
                <span>View Products</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

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
              {PACKAGING_ITEMS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectItem?.(item)}
                  className="w-[200px] sm:w-[220px] shrink-0 flex flex-col group cursor-pointer"
                >
                  {/* Image Container with Exact Visual Representation from Image */}
                  <div className="w-full h-[210px] sm:h-[230px] rounded-lg overflow-hidden bg-stone-50 border border-stone-100 group-hover:shadow-md transition-shadow relative flex items-center justify-center">
                    
                    {/* Item 1: Custom Branded Pouch Packaging (Dried Ponmo Pouch with Window) */}
                    {item.id === 'pkg-pouch-packaging' && (
                      <div className="w-full h-full p-2 flex items-center justify-center bg-[#292211]">
                        <div className="relative w-32 h-44 bg-[#6b4e23] rounded-t-sm rounded-b-md shadow-2xl p-2 flex flex-col justify-between items-center border border-[#523c1b]">
                          {/* Heat sealed top notch */}
                          <div className="w-full border-b border-black/30 flex items-center justify-between pb-1">
                            <div className="w-2 h-0.5 bg-black/40" />
                            <div className="text-[4px] text-amber-200 font-mono tracking-widest">ZIP-LOCK RESEALABLE</div>
                            <div className="w-2 h-0.5 bg-black/40" />
                          </div>

                          {/* Brand Label Area */}
                          <div className="w-full bg-white rounded-xs p-1.5 shadow-md text-center space-y-1 my-1">
                            <div className="text-[5px] text-amber-800 font-bold uppercase">NIGERIAN SPECIALTY FOODS</div>
                            <div className="bg-amber-500 text-white font-black text-[9px] py-0.5 rounded-xs tracking-wide uppercase">
                              DRIED PONMO
                            </div>
                            
                            {/* Clear Oval Window showing food inside */}
                            <div className="w-16 h-12 rounded-full border-2 border-amber-300 bg-[#3a2818] mx-auto flex items-center justify-center overflow-hidden shadow-inner relative">
                              <div className="text-[6px] text-amber-200 font-serif">CRISPY GOURMET</div>
                            </div>

                            <div className="flex items-center justify-between pt-0.5 text-[4px] text-stone-500">
                              <span>Net: 250g</span>
                              <span>NAFDAC REG.</span>
                              <div className="w-4 h-2 bg-stone-700 rounded-2xs" />
                            </div>
                          </div>

                          <div className="text-[4.5px] text-amber-200 font-medium">100% HYGIENICALLY PROCESSED</div>
                        </div>
                      </div>
                    )}

                    {/* Item 2: Custom Woven Labels (Stack of green woven clothing tags) */}
                    {item.id === 'pkg-woven-labels' && (
                      <div className="w-full h-full p-2 flex items-center justify-center bg-stone-100">
                        <div className="relative w-40 h-36 flex items-center justify-center">
                          {/* Fan of green labels underneath */}
                          <div className="absolute top-2 left-3 w-28 h-12 bg-[#16a34a] rounded-xs shadow-sm transform -rotate-12 border border-green-700/40" />
                          <div className="absolute bottom-2 right-3 w-28 h-12 bg-[#15803d] rounded-xs shadow-sm transform rotate-12 border border-green-800/40" />

                          {/* Front facing woven label with NGO text */}
                          <div className="relative z-10 w-32 h-14 bg-[#16a34a] rounded-xs shadow-xl border border-emerald-700 p-2 flex flex-col justify-between items-center transform group-hover:scale-105 transition-transform duration-300">
                            {/* Woven fabric grain effect */}
                            <div className="flex items-center justify-center gap-1">
                              <span className="text-white font-black text-xs tracking-wider">
                                N • G • O
                              </span>
                              <div className="w-3 h-3 rounded-full border border-white flex items-center justify-center text-[6px] text-white">
                                🌐
                              </div>
                            </div>
                            <div className="text-[5.5px] text-emerald-100 font-bold tracking-widest uppercase">
                              NOTHING GROWS OVERNIGHT
                            </div>
                            <div className="w-full flex items-center justify-between text-[4.5px] text-emerald-200">
                              <span>MADE IN NIGERIA</span>
                              <span>100% COTTON</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Item 3: Ice Cream Cups (Clean white paper cups) */}
                    {item.id === 'pkg-ice-cream-cups' && (
                      <div className="w-full h-full p-2 flex items-center justify-center bg-white">
                        <div className="relative w-40 h-36 flex items-center justify-center gap-2">
                          {/* Standing white cup */}
                          <div className="w-16 h-20 bg-gradient-to-r from-stone-200 via-white to-stone-100 rounded-b-xl border-t-4 border-stone-300 shadow-md flex flex-col justify-between items-center p-1.5 transform -translate-y-1">
                            <div className="w-full h-1 bg-stone-300 rounded-full" />
                            <div className="text-center">
                              <div className="text-[5.5px] font-bold text-stone-400">ECO CUP</div>
                              <div className="text-[4.5px] text-stone-300">200ml</div>
                            </div>
                            <div className="w-12 h-0.5 bg-stone-200 rounded-full" />
                          </div>

                          {/* Angled tilted cup */}
                          <div className="w-16 h-20 bg-gradient-to-r from-stone-100 via-white to-stone-200 rounded-b-xl border-t-4 border-stone-300 shadow-xl flex flex-col justify-center items-center p-1.5 transform rotate-25 -translate-x-1 translate-y-1">
                            <div className="w-10 h-10 rounded-full border border-stone-300 bg-stone-50 flex items-center justify-center">
                              <span className="text-[6px] font-bold text-stone-400">FOOD GRADE</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Item 4: Custom Paper Bags A3 size (Glossy event couple bag) */}
                    {item.id === 'pkg-paper-bags-a3' && (
                      <div className="w-full h-full p-2 flex items-center justify-center bg-stone-200/70">
                        <div className="relative w-36 h-46 flex flex-col items-center justify-center">
                          {/* White Twisted Rope Handles */}
                          <div className="w-12 h-8 border-3 border-white rounded-t-full -mb-3 z-5 bg-transparent shadow-xs" />

                          {/* Paper bag body with 3D angle perspective */}
                          <div className="w-30 h-38 bg-gradient-to-tr from-amber-600 to-amber-500 rounded-xs shadow-2xl p-1.5 flex flex-col justify-between border border-amber-700/30 overflow-hidden relative">
                            {/* Couple photo printed on bag */}
                            <div className="w-full h-26 rounded-2xs overflow-hidden shadow-inner relative bg-stone-900">
                              <img
                                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80"
                                alt="Event Bag Print"
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-1 text-center">
                                <div className="font-serif italic text-[7.5px] font-bold text-amber-200 leading-tight">
                                  Victory &amp; Isaac
                                </div>
                                <div className="text-[4.5px] text-white/90">#ForeverTogether2025</div>
                              </div>
                            </div>

                            {/* Bottom Thank You message on bag */}
                            <div className="text-center text-[5px] text-amber-100 font-medium">
                              Thank you for celebrating with us!
                            </div>
                          </div>

                          {/* Paper bag side gusset 3D effect */}
                          <div className="absolute top-8 right-2 w-3 h-36 bg-amber-700/60 transform skew-y-12 rounded-r-xs -z-5" />
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Title */}
                  <div className="pt-3 text-center">
                    <h3 className="text-xs sm:text-[13px] font-bold text-stone-900 line-clamp-2 leading-tight group-hover:text-[#009b72] transition-colors">
                      {item.title}
                    </h3>
                    
                    {/* Teal Price */}
                    <div className="text-xs sm:text-[13.5px] font-bold text-[#009b72] mt-1.5">
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
