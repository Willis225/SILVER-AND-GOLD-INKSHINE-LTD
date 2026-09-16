import React, { useRef } from 'react';
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';

interface EventItem {
  id: string;
  title: string;
  price: string;
  numericPrice: number;
  category: string;
}

interface EventExhibitionSectionProps {
  onViewProducts?: () => void;
  onSelectItem?: (item: EventItem) => void;
}

const EVENT_ITEMS: EventItem[] = [
  {
    id: 'event-a3-poster',
    title: 'A3 Poster',
    price: '₦370.00',
    numericPrice: 370,
    category: 'marketing_materials',
  },
  {
    id: 'event-pos-banners',
    title: 'POS Banners',
    price: '₦4,900.00',
    numericPrice: 4900,
    category: 'banners_stands',
  },
  {
    id: 'event-wall-frames',
    title: 'Wall Pictures & Photo Frames',
    price: '₦10,000.00',
    numericPrice: 10000,
    category: 'signage',
  },
  {
    id: 'event-spin-wheel',
    title: 'Spin To Win Wheel',
    price: '₦175,000.00',
    numericPrice: 175000,
    category: 'banners_stands',
  },
];

export const EventExhibitionSection: React.FC<EventExhibitionSectionProps> = ({
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
              Event, Exhibition and Activation Branding Materials
            </h2>

            <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-normal">
              Make every occasion memorable with tailored{' '}
              <span className="text-[#009b72] font-semibold underline cursor-pointer hover:text-[#00875a]">
                event
              </span>{' '}
              printing solutions from Rollupbanners.ng. We design and print wedding invitations, event programmes, birthday souvenirs, aso-ebi tags, table cards, backdrop banners, gazebo tents, promotional tables and branded display materials for weddings, corporate events, conferences, product launches and social gatherings across Nigeria.
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
              {EVENT_ITEMS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectItem?.(item)}
                  className="w-[200px] sm:w-[220px] shrink-0 flex flex-col group cursor-pointer"
                >
                  {/* Image Container with Exact Visual Representation from Image */}
                  <div className="w-full h-[210px] sm:h-[230px] rounded-lg overflow-hidden bg-stone-50 border border-stone-100 group-hover:shadow-md transition-shadow relative flex items-center justify-center">
                    
                    {/* Item 1: A3 Poster (Person holding up Jomo Friday night food & drink poster) */}
                    {item.id === 'event-a3-poster' && (
                      <div className="w-full h-full p-2 flex items-center justify-center bg-stone-100">
                        <div className="relative w-40 h-44 flex flex-col items-center justify-center">
                          {/* Simulated Hands holding paper */}
                          <div className="absolute -top-1 left-2 w-4 h-4 bg-stone-300 rounded-full border border-stone-400 z-15" />
                          <div className="absolute -top-1 right-2 w-4 h-4 bg-stone-300 rounded-full border border-stone-400 z-15" />

                          {/* A3 Poster Print */}
                          <div className="w-32 h-42 bg-white rounded-xs shadow-xl border border-stone-200 p-2 flex flex-col justify-between items-center overflow-hidden">
                            {/* Header Banner */}
                            <div className="w-full text-center border-b border-stone-100 pb-1">
                              <div className="font-serif italic text-base font-bold text-amber-900 leading-tight">
                                Jomo
                              </div>
                              <div className="w-16 h-0.5 bg-amber-700 mx-auto" />
                            </div>

                            {/* Food & Wine Image */}
                            <div className="w-full h-20 rounded-2xs overflow-hidden shadow-inner my-1">
                              <img
                                src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=300&q=80"
                                alt="Food and Drinks Poster"
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>

                            {/* Offer Text */}
                            <div className="text-center">
                              <div className="text-[5.5px] font-bold text-stone-800 leading-tight">
                                Food &amp; drinks on Friday Nights
                              </div>
                              <div className="text-[4.5px] text-amber-800 font-semibold mt-0.5">
                                with 20% discount on all items on menu
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Item 2: POS Banners (Bright yellow flex banner with red headers & cash options) */}
                    {item.id === 'event-pos-banners' && (
                      <div className="w-full h-full p-2 flex items-center justify-center bg-[#fafafa]">
                        <div className="w-32 h-44 bg-[#fde047] rounded-xs shadow-xl border-2 border-stone-300 p-2 flex flex-col justify-between items-center relative overflow-hidden">
                          {/* Corner eyelets / grommets */}
                          <div className="w-2 h-2 rounded-full border-2 border-stone-500 bg-white absolute top-1 left-1" />
                          <div className="w-2 h-2 rounded-full border-2 border-stone-500 bg-white absolute top-1 right-1" />
                          <div className="w-2 h-2 rounded-full border-2 border-stone-500 bg-white absolute bottom-1 left-1" />
                          <div className="w-2 h-2 rounded-full border-2 border-stone-500 bg-white absolute bottom-1 right-1" />

                          {/* Big Bold Red Header */}
                          <div className="text-center pt-1">
                            <div className="text-xl font-black text-[#dc2626] leading-none tracking-tight">
                              POS
                            </div>
                            <div className="text-[6.5px] font-black text-stone-900 uppercase tracking-wider">
                              SERVICES AVAILABLE HERE
                            </div>
                          </div>

                          {/* POS Machine & Naira banknotes illustration */}
                          <div className="flex items-center justify-center gap-1 my-0.5">
                            <div className="w-8 h-12 bg-stone-900 rounded-2xs border border-stone-700 p-0.5 flex flex-col justify-between">
                              <div className="w-full h-4 bg-emerald-500 rounded-2xs flex items-center justify-center text-[3.5px] font-bold text-white">
                                READY
                              </div>
                              <div className="grid grid-cols-3 gap-0.5">
                                {[...Array(9)].map((_, i) => (
                                  <div key={i} className="w-1.5 h-1 bg-stone-600 rounded-2xs" />
                                ))}
                              </div>
                            </div>
                            <div className="w-12 h-8 bg-emerald-600 rounded-2xs border border-emerald-400 p-0.5 flex flex-col justify-center items-center shadow-xs">
                              <div className="text-[6px] font-black text-white">₦1000</div>
                              <div className="text-[3px] text-emerald-100">CENTRAL BANK</div>
                            </div>
                          </div>

                          {/* Service list items */}
                          <div className="w-full space-y-0.5">
                            <div className="bg-[#dc2626] text-white text-[5px] font-bold py-0.5 text-center rounded-2xs uppercase">
                              CASH WITHDRAWAL
                            </div>
                            <div className="bg-[#dc2626] text-white text-[5px] font-bold py-0.5 text-center rounded-2xs uppercase">
                              CASH TRANSFER
                            </div>
                            <div className="bg-[#dc2626] text-white text-[5px] font-bold py-0.5 text-center rounded-2xs uppercase">
                              CASH DEPOSIT
                            </div>
                            <div className="bg-[#dc2626] text-white text-[5px] font-bold py-0.5 text-center rounded-2xs uppercase">
                              BILLS PAYMENT
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Item 3: Wall Pictures & Photo Frames (Gallery wrap stretched canvas 40in x 30in) */}
                    {item.id === 'event-wall-frames' && (
                      <div className="w-full h-full p-2 flex items-center justify-center bg-stone-100">
                        <div className="relative w-44 h-36 flex items-center justify-center">
                          {/* 3D Stretched Canvas Wrap */}
                          <div className="relative w-36 h-28 bg-stone-900 rounded-2xs shadow-2xl overflow-hidden border border-stone-300 group-hover:scale-103 transition-transform duration-300">
                            <img
                              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
                              alt="Scenic Landscape Canvas"
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            {/* Canvas texture overlay */}
                            <div className="absolute inset-0 bg-black/10" />
                          </div>

                          {/* 3D Right Fold Depth */}
                          <div className="w-2.5 h-28 bg-stone-700/80 transform skew-y-12 -ml-1 rounded-r-2xs shadow-md" />

                          {/* Dimensions Label Tags */}
                          <span className="absolute -bottom-2 text-[6px] font-bold text-stone-500">
                            40in
                          </span>
                          <span className="absolute -right-2 top-1/2 -translate-y-1/2 text-[6px] font-bold text-stone-500 transform rotate-90">
                            30in
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Item 4: Spin To Win Wheel */}
                    {item.id === 'event-spin-wheel' && (
                      <div className="w-full h-full p-2 flex items-center justify-center bg-stone-100">
                        <div className="relative w-36 h-46 flex flex-col items-center justify-between">
                          {/* Top Prize Wheel with colorful wedges */}
                          <div className="relative w-24 h-24 rounded-full border-4 border-[#009b72] shadow-xl overflow-hidden flex items-center justify-center bg-white group-hover:rotate-45 transition-transform duration-700">
                            {/* Conic wedge simulation */}
                            <div className="absolute inset-0 bg-[conic-gradient(#34d399_0deg_45deg,#f59e0b_45deg_90deg,#ef4444_90deg_135deg,#3b82f6_135deg_180deg,#8b5cf6_180deg_225deg,#ec4899_225deg_270deg,#10b981_270deg_315deg,#eab308_315deg_360deg)] opacity-80" />
                            {/* Wheel center hub */}
                            <div className="w-6 h-6 rounded-full bg-white border-2 border-stone-800 shadow-md flex items-center justify-center text-[5px] font-black z-10 text-stone-900">
                              WIN
                            </div>
                            {/* Top Indicator Arrow */}
                            <div className="w-2 h-3 bg-[#dc2626] clip-triangle absolute top-0 z-20" />
                          </div>

                          {/* Standing Upright Pedestal Stand */}
                          <div className="w-20 h-16 bg-[#00875a] rounded-t-md p-1.5 flex flex-col justify-between items-center text-center shadow-md -mt-1 border border-emerald-700">
                            <div className="text-[6.5px] font-black text-white leading-tight uppercase">
                              TAKE A<br />SPIN
                            </div>
                            <div className="flex items-center gap-1 bg-white/90 px-1 rounded-2xs">
                              <div className="w-3 h-3 bg-stone-900 rounded-2xs" />
                              <div className="text-[3.5px] font-bold text-stone-800">
                                SCAN TO PLAY
                              </div>
                            </div>
                          </div>

                          {/* Floor Base */}
                          <div className="w-26 h-2 bg-stone-400 rounded-full shadow-md" />
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
