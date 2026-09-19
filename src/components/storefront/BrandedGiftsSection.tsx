import React, { useRef } from 'react';
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';

interface GiftItem {
  id: string;
  title: string;
  price: string;
  numericPrice: number;
  category: string;
}

interface BrandedGiftsSectionProps {
  onViewProducts?: () => void;
  onSelectItem?: (item: GiftItem) => void;
}

const GIFT_ITEMS: GiftItem[] = [
  {
    id: 'gift-drawstring-bag',
    title: 'Drawstring Bag Printing',
    price: '₦2,000.00',
    numericPrice: 2000,
    category: 'gift_items_souvenirs',
  },
  {
    id: 'gift-pop-socket',
    title: 'Custom Pop Socket Phone Holder',
    price: '₦1,999.00',
    numericPrice: 1999,
    category: 'gift_items_souvenirs',
  },
  {
    id: 'gift-jute-bag',
    title: 'Custom Jute Bag Printing in Nigeria',
    price: '₦3,500.00',
    numericPrice: 3500,
    category: 'paper_bags_tags',
  },
  {
    id: 'gift-wristband',
    title: 'Custom Wristband Printing in Lagos, Nigeria – Silicone, Fabric & Rubber Bands',
    price: '₦1,200.00',
    numericPrice: 1200,
    category: 'gift_items_souvenirs',
  },
];

export const BrandedGiftsSection: React.FC<BrandedGiftsSectionProps> = ({
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
              Branded Corporate Gifts &amp; Promotional Items
            </h2>

            <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-normal">
              Strengthen relationships and keep your brand top of mind with customised corporate gift items from SILVER &amp; GOLD INKSHINE LTD. We print and brand pens, mugs, keychains, notepads, water bottles, face caps, tote bags and more with your company logo, colours and message. Perfect for staff appreciation, client gifts, product launches and corporate events across Nigeria.
            </p>

            <div>
              <button
                onClick={onViewProducts}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#b8860b] hover:bg-[#996515] active:scale-98 text-white font-bold text-xs sm:text-sm rounded-md shadow-sm transition-all group"
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
              {GIFT_ITEMS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectItem?.(item)}
                  className="w-[200px] sm:w-[220px] shrink-0 flex flex-col group cursor-pointer"
                >
                  {/* Image Container with Exact Visual Representation from Image */}
                  <div className="w-full h-[210px] sm:h-[230px] rounded-lg overflow-hidden bg-stone-50 border border-stone-100 group-hover:shadow-md transition-shadow relative flex items-center justify-center">
                    
                    {/* Item 1: Drawstring Bag Printing */}
                    {item.id === 'gift-drawstring-bag' && (
                      <div className="w-full h-full p-2 flex items-center justify-center bg-[#fafafa]">
                        <div className="relative w-36 h-46 flex flex-col items-center justify-center">
                          {/* Drawstring Bag Body */}
                          <div className="w-32 h-40 bg-white rounded-b-2xl rounded-t-sm shadow-md border border-stone-200 p-2.5 flex flex-col justify-between items-center relative overflow-hidden">
                            {/* Gold accent bottom corners */}
                            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-[#b8860b] rounded-full opacity-90" />
                            <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-[#b8860b] rounded-full opacity-90" />
                            
                            {/* Top gathered hem & black cords */}
                            <div className="w-full h-2 border-b border-stone-200 flex justify-between px-1">
                              <div className="w-1 h-1 bg-stone-700 rounded-full" />
                              <div className="w-1 h-1 bg-stone-700 rounded-full" />
                            </div>

                            {/* Centered Rollup logo */}
                            <div className="my-auto text-center z-10">
                              <div className="w-10 h-10 rounded-full bg-[#b8860b] mx-auto flex items-center justify-center text-white text-base font-black shadow-xs">
                                S&amp;G
                              </div>
                              <div className="text-[7px] font-black text-stone-900 tracking-wider mt-1 uppercase">
                                INKSHINE
                              </div>
                              <div className="text-[5px] text-stone-500 font-bold tracking-widest">
                                LIMITED
                              </div>
                            </div>

                            <div className="text-[4px] text-stone-400 z-10">WATER RESISTANT</div>
                          </div>

                          {/* Black drawstrings on the sides */}
                          <div className="absolute inset-x-0 inset-y-2 border-2 border-stone-800 rounded-3xl -z-5 opacity-40 pointer-events-none" />
                        </div>
                      </div>
                    )}

                    {/* Item 2: Custom Pop Socket Phone Holder */}
                    {item.id === 'gift-pop-socket' && (
                      <div className="w-full h-full p-2 flex items-center justify-center bg-[#fdfbf7]">
                        <div className="relative w-44 h-44 bg-white rounded-md shadow-xs p-1.5 flex flex-col justify-between border border-amber-200 overflow-hidden">
                          {/* Header banner */}
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-[5px] font-bold text-stone-800">INKSHINE</span>
                              <div className="text-[6.5px] font-black text-[#b8860b] leading-none uppercase">
                                CUSTOM<br />POP SOCKET
                              </div>
                            </div>
                            <div className="w-5 h-5 rounded-full bg-[#b8860b] text-white flex items-center justify-center text-[5px] font-bold">
                              ✨
                            </div>
                          </div>

                          {/* Phone mockup with socket attached */}
                          <div className="relative flex items-center justify-center my-1">
                            {/* iPhone representation */}
                            <div className="w-20 h-28 bg-stone-100 rounded-xl border-2 border-stone-300 shadow-md p-1 flex items-center justify-center relative">
                              {/* Camera bump */}
                              <div className="w-6 h-6 rounded-md bg-stone-200 absolute top-1 left-1 border border-stone-300 flex items-center justify-around p-0.5">
                                <div className="w-2 h-2 rounded-full bg-stone-700" />
                                <div className="w-2 h-2 rounded-full bg-stone-700" />
                              </div>

                              {/* Pop socket on back of phone */}
                              <div className="w-10 h-10 rounded-full bg-white shadow-xl border-2 border-stone-400 flex flex-col items-center justify-center z-10">
                                <div className="w-4 h-4 rounded-full bg-[#b8860b] flex items-center justify-center text-white text-[6px] font-bold">
                                  ★
                                </div>
                                <span className="text-[3.5px] font-bold text-stone-700">INKSHINE</span>
                              </div>
                            </div>

                            {/* Additional pop socket side views */}
                            <div className="ml-2 flex flex-col gap-1.5">
                              <div className="w-7 h-7 rounded-full bg-white border border-stone-300 shadow-sm flex items-center justify-center">
                                <span className="text-[4px] font-bold text-[#b8860b]">COLLAPSED</span>
                              </div>
                              <div className="w-7 h-7 rounded-full bg-white border border-stone-300 shadow-sm flex items-center justify-center">
                                <span className="text-[4px] font-bold text-[#b8860b]">EXPANDED</span>
                              </div>
                            </div>
                          </div>

                          {/* Footer spec tags */}
                          <div className="w-full bg-[#b8860b] text-white rounded-xs p-1 flex justify-around text-[4px] font-semibold">
                            <span>GRIP IT</span>
                            <span>•</span>
                            <span>STAND IT</span>
                            <span>•</span>
                            <span>LOVE IT</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Item 3: Custom Jute Bag Printing in Nigeria */}
                    {item.id === 'gift-jute-bag' && (
                      <div className="w-full h-full p-2 flex items-center justify-center bg-[#fafaf9]">
                        <div className="relative w-36 h-46 flex flex-col items-center justify-center">
                          {/* Round rope handles */}
                          <div className="w-14 h-12 border-4 border-[#d6b78d] rounded-t-full -mb-3 z-5 bg-transparent shadow-xs" />

                          {/* Jute bag body texture */}
                          <div className="w-32 h-36 bg-[#e4caa3] rounded-sm shadow-lg border border-[#c4a477] p-3 flex flex-col justify-between items-center relative overflow-hidden">
                            {/* Woven burlap pattern simulation */}
                            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:4px_4px]" />

                            <div className="w-full" />

                            {/* Brand logo printed on center */}
                            <div className="text-center z-10">
                              <div className="w-10 h-10 rounded-full bg-[#b8860b] mx-auto flex items-center justify-center text-white text-base font-black shadow-xs">
                                S&amp;G
                              </div>
                              <div className="text-[7.5px] font-black text-stone-900 tracking-wider mt-1.5 uppercase">
                                INKSHINE
                              </div>
                              <div className="text-[5px] text-stone-700 font-bold tracking-widest">
                                LIMITED
                              </div>
                            </div>

                            <div className="text-[4.5px] text-stone-700 font-semibold z-10">
                              100% ECO-FRIENDLY HESSIAN
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Item 4: Custom Wristband Printing */}
                    {item.id === 'gift-wristband' && (
                      <div className="w-full h-full p-2 flex items-center justify-center bg-[#f5f5f5]">
                        <div className="relative w-40 h-36 flex items-center justify-center">
                          {/* Gold Silicone Band */}
                          <div className="absolute -top-1 left-2 w-32 h-18 rounded-full border-6 border-[#d4af37] shadow-lg flex items-center justify-center transform -rotate-12 group-hover:rotate-0 transition-transform duration-300">
                            <div className="text-[6.5px] font-black tracking-widest text-[#78350f] uppercase">
                              SILICONE WRISTBAND
                            </div>
                          </div>

                          {/* Sleek Black Debossed Wristband */}
                          <div className="absolute top-6 right-2 w-32 h-18 rounded-full border-6 border-stone-900 shadow-xl flex items-center justify-center transform rotate-6 group-hover:rotate-0 transition-transform duration-300">
                            <div className="text-[6px] font-extrabold tracking-widest text-white/90 uppercase">
                              CUSTOM WRISTBAND
                            </div>
                          </div>

                          <div className="absolute bottom-1 right-1 text-[4px] text-stone-400">
                            IMAGE NOT INC.
                          </div>
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
