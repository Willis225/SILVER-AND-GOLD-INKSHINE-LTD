import React, { useRef } from 'react';
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';

interface StationeryItem {
  id: string;
  title: string;
  price: string;
  numericPrice: number;
  category: string;
}

interface BusinessStationerySectionProps {
  onViewProducts?: () => void;
  onSelectItem?: (item: StationeryItem) => void;
}

const STATIONERY_ITEMS: StationeryItem[] = [
  {
    id: 'stationery-business-cards',
    title: 'Business Cards Printing in Lagos – Custom & Premium Cards',
    price: '₦20,000.00',
    numericPrice: 20000,
    category: 'cards_invitations',
  },
  {
    id: 'stationery-plastic-cards',
    title: 'Premium Plastic Business Cards',
    price: '₦48,000.00',
    numericPrice: 48000,
    category: 'cards_invitations',
  },
  {
    id: 'stationery-certificates',
    title: 'Certificate Printing in Lagos – Professional Award & Academic Certificates',
    price: '₦1,000.00',
    numericPrice: 1000,
    category: 'office_stationery',
  },
  {
    id: 'stationery-book-printing',
    title: 'Book Printing in Lagos Nigeria',
    price: '₦2,400.00',
    numericPrice: 2400,
    category: 'books_magazines',
  },
];

export const BusinessStationerySection: React.FC<BusinessStationerySectionProps> = ({
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
              Business Stationery &amp; Office Printing
            </h2>

            <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-normal">
              Leave a strong impression on every client, partner and stakeholder with professionally printed business stationery from SILVER &amp; GOLD INKSHINE LTD. From branded letterheads and complimentary cards to customised envelopes, notepads and presentation folders, we help your business communicate with clarity, consistency and professionalism at every touchpoint.
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
              {STATIONERY_ITEMS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectItem?.(item)}
                  className="w-[200px] sm:w-[220px] shrink-0 flex flex-col group cursor-pointer"
                >
                  {/* Image Container with Exact Visual Representation from Image */}
                  <div className="w-full h-[210px] sm:h-[230px] rounded-lg overflow-hidden bg-stone-50 border border-stone-100 group-hover:shadow-md transition-shadow relative flex items-center justify-center">
                    
                    {/* Item 1: Business Cards Printing in Lagos */}
                    {item.id === 'stationery-business-cards' && (
                      <div className="w-full h-full p-3 flex items-center justify-center bg-[#1c1c1e]">
                        <div className="relative w-40 h-28 flex items-center justify-center">
                          {/* Stack of gold cards */}
                          <div className="absolute top-1 right-2 w-28 h-18 bg-[#b8860b] rounded-xs shadow-md border border-amber-600/40 p-2 flex flex-col justify-between transform rotate-12">
                            <div className="w-4 h-4 rounded-xs border-2 border-white/80" />
                            <div className="text-[5px] font-bold text-white tracking-widest uppercase">
                              COMPANY NAME
                            </div>
                          </div>

                          {/* Front facing card on dark surface */}
                          <div className="absolute bottom-1 left-2 w-30 h-20 bg-white rounded-xs shadow-xl p-2 flex flex-col justify-between border border-stone-200 transform -rotate-12 group-hover:rotate-0 transition-transform duration-300">
                            <div className="flex items-center justify-between">
                              <div className="w-4 h-4 bg-[#b8860b] rounded-xs" />
                              <div className="text-[5px] text-stone-400">000 123 4567</div>
                            </div>
                            <div className="border-t border-stone-100 pt-1">
                              <div className="text-[7.5px] font-black text-stone-900 leading-tight">
                                JOHN DOE
                              </div>
                              <div className="text-[5px] text-[#b8860b] font-semibold">
                                CREATIVE DIRECTOR
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Item 2: Premium Plastic Business Cards (Hand holding translucent frosted card) */}
                    {item.id === 'stationery-plastic-cards' && (
                      <div className="w-full h-full relative overflow-hidden bg-stone-200">
                        <img
                          src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80"
                          alt="Hand holding card"
                          className="w-full h-full object-cover filter contrast-105"
                          referrerPolicy="no-referrer"
                        />
                        {/* Overlay Frosted Plastic Card */}
                        <div className="absolute inset-4 rounded-md bg-white/35 backdrop-blur-md border border-white/60 shadow-xl p-2.5 flex flex-col justify-between text-white drop-shadow-sm">
                          <div className="text-[5px] text-stone-100 font-medium tracking-wide uppercase">
                            COMPLETE PROJECT MANAGEMENT FOR ALL INTERIOR DESIGN WORKS
                          </div>
                          <div className="flex items-center gap-1.5 my-auto">
                            <div className="w-5 h-5 rounded-full border border-white/70 flex items-center justify-center">
                              <span className="text-[7px]">🌸</span>
                            </div>
                            <div>
                              <div className="text-sm font-light text-white tracking-wider">
                                Josez
                              </div>
                              <div className="text-[5px] text-stone-200">
                                Interior Design Consultant
                              </div>
                            </div>
                          </div>
                          <div className="text-[5px] text-stone-200 text-right space-y-0.5">
                            <div>123 456 7890 📞</div>
                            <div>www.websiteaddress.com</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Item 3: Certificate Printing with Ornate Border & Gold Seal */}
                    {item.id === 'stationery-certificates' && (
                      <div className="w-full h-full p-2.5 flex items-center justify-center bg-stone-100">
                        <div className="w-full h-full bg-[#fdfbf7] rounded-xs border-4 border-stone-800 p-2 flex flex-col justify-between relative shadow-md">
                          {/* Inner Guilloche Thin Border */}
                          <div className="border border-stone-400 p-1.5 h-full flex flex-col justify-between items-center text-center">
                            <div className="space-y-1">
                              <div className="font-serif text-[9px] font-black text-stone-900 tracking-wide">
                                Certificate of Completion
                              </div>
                              <div className="text-[4.5px] italic text-stone-500 font-serif">
                                This certifies that
                              </div>
                              <div className="w-24 h-0.5 border-b border-stone-400 mx-auto" />
                              <div className="text-[4px] text-stone-500">
                                has successfully met the requirements of
                              </div>
                              <div className="w-28 h-0.5 border-b border-stone-400 mx-auto" />
                            </div>

                            {/* Gold Embossed Foil Seal in bottom left */}
                            <div className="w-full flex items-end justify-between px-1">
                              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-200 border-2 border-yellow-200 shadow-md flex items-center justify-center text-[7px] text-amber-950 font-bold">
                                🎖️
                              </div>
                              <div className="text-[4px] text-stone-500">
                                <div className="w-12 border-b border-stone-400 mb-0.5" />
                                <span>DATE &amp; SIGNATURE</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Item 4: Book Printing in Lagos Nigeria (Dual standing books with vibrant magenta splatter) */}
                    {item.id === 'stationery-book-printing' && (
                      <div className="w-full h-full p-2 flex items-center justify-center bg-[#f0f2f5]">
                        <div className="relative w-38 h-38 flex items-center justify-center gap-1.5">
                          {/* Book 1 (Slanted Spine View) */}
                          <div className="w-16 h-32 bg-white rounded-xs shadow-xl border border-stone-200 flex flex-col justify-between p-1.5 transform -rotate-6 transition-transform group-hover:rotate-0 duration-300 overflow-hidden">
                            <div className="text-[4.5px] font-black tracking-wider text-stone-800">
                              THE MEDIA MAFIA
                            </div>
                            <div className="my-auto text-center">
                              {/* Splatter Effect */}
                              <div className="w-8 h-8 rounded-full bg-[#e11d48] mx-auto opacity-90 blur-[0.5px]" />
                              <div className="text-[7.5px] font-black text-white bg-[#e11d48] px-1 py-0.5 rounded-xs mt-1 leading-none uppercase">
                                BOOK PRINTING
                              </div>
                            </div>
                            <div className="text-[3.5px] text-stone-400">Lagos Press Edition</div>
                          </div>

                          {/* Book 2 (Standing Front View) */}
                          <div className="w-18 h-34 bg-white rounded-xs shadow-2xl border border-stone-300 flex flex-col justify-between p-2 transform rotate-3 transition-transform group-hover:rotate-0 duration-300 overflow-hidden">
                            <div className="flex items-center justify-between">
                              <div className="text-[5px] font-black tracking-wider text-stone-900">
                                THE MEDIA MAFIA
                              </div>
                              <div className="w-2 h-2 rounded-full bg-[#db2777]" />
                            </div>
                            {/* Ink splatter visual */}
                            <div className="my-auto space-y-1">
                              <div className="text-[9px] font-black text-[#db2777] uppercase leading-tight tracking-tight">
                                BOOK<br />PRINTING
                              </div>
                              <div className="w-full h-1 bg-gradient-to-r from-[#db2777] to-amber-400 rounded-full" />
                            </div>
                            <div className="text-[4px] text-stone-500 font-medium">
                              Commercial Hardcover &amp; Paperback
                            </div>
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
