import React, { useRef } from 'react';
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';

interface DisplayStandItem {
  id: string;
  title: string;
  price: string;
  numericPrice: number;
  category: string;
}

interface BannersDisplayStandsSectionProps {
  onViewProducts?: () => void;
  onSelectItem?: (item: DisplayStandItem) => void;
}

const DISPLAY_ITEMS: DisplayStandItem[] = [
  {
    id: 'display-waterbase-poster',
    title: 'Waterbase Poster Signs',
    price: '₦170,000.00',
    numericPrice: 170000,
    category: 'banners_stands',
  },
  {
    id: 'display-instagram-frame',
    title: 'Instagram Frame',
    price: '₦25,000.00',
    numericPrice: 25000,
    category: 'banners_stands',
  },
  {
    id: 'display-giant-pole-flag',
    title: 'Giant Pole Feather Flag Banner 5.5m',
    price: '₦160,000.00',
    numericPrice: 160000,
    category: 'banners_stands',
  },
  {
    id: 'display-backdrop-banner',
    title: 'Advertisement Backdrop Banner',
    price: '₦180,000.00',
    numericPrice: 180000,
    category: 'banners_stands',
  },
];

export const BannersDisplayStandsSection: React.FC<BannersDisplayStandsSectionProps> = ({
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
              Banners, Display Stands &amp; Advertising Materials
            </h2>

            <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-normal">
              Get noticed everywhere with high-impact banners, display stands and advertising materials from SILVER &amp; GOLD INKSHINE LTD. Whether you are setting up at a trade fair, running a street activation, decorating an office or promoting an event, we produce roll-up banners, backdrop stands, feather flags,{' '}
              <span className="text-[#b8860b] font-semibold underline cursor-pointer hover:text-[#996515]">
                gazebo tent
              </span>
              , flex banners and outdoor signage that make your brand impossible to ignore.
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
              {DISPLAY_ITEMS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectItem?.(item)}
                  className="w-[200px] sm:w-[220px] shrink-0 flex flex-col group cursor-pointer"
                >
                  {/* Image Container with Exact Visual Representation from Image */}
                  <div className="w-full h-[210px] sm:h-[230px] rounded-lg overflow-hidden bg-stone-50 border border-stone-100 group-hover:shadow-md transition-shadow relative flex items-center justify-center">
                    
                    {/* Item 1: Waterbase Poster Signs */}
                    {item.id === 'display-waterbase-poster' && (
                      <div className="w-full h-full p-2 flex items-center justify-center bg-[#fafafa]">
                        <div className="relative w-36 h-48 flex flex-col items-center justify-end pb-2">
                          {/* Snap frame poster board */}
                          <div className="w-24 h-34 rounded-sm border-4 border-stone-400 bg-[#38bdf8] p-2 flex flex-col justify-between items-center text-center shadow-md relative z-10">
                            <div className="space-y-0.5">
                              <div className="text-[9px] font-black text-white uppercase tracking-wider">
                                SALE
                              </div>
                              <div className="text-[5.5px] font-bold text-white/90">
                                NOW ON
                              </div>
                            </div>
                            <div className="my-auto">
                              <div className="text-2xl font-black text-white leading-none">
                                50%
                              </div>
                              <div className="text-[6.5px] font-black text-[#0369a1] bg-white/90 px-1 py-0.5 rounded-xs mt-0.5">
                                OFF
                              </div>
                            </div>
                            <div className="text-[4.5px] text-white/90 font-medium">
                              ON SELECTED LINES
                            </div>
                          </div>

                          {/* Dual heavy-duty steel springs */}
                          <div className="flex gap-4 -my-0.5 z-5">
                            <div className="w-2.5 h-3.5 bg-stone-500 rounded-xs border border-stone-600 flex flex-col justify-around py-0.5">
                              <div className="w-full h-0.5 bg-stone-300" />
                              <div className="w-full h-0.5 bg-stone-300" />
                            </div>
                            <div className="w-2.5 h-3.5 bg-stone-500 rounded-xs border border-stone-600 flex flex-col justify-around py-0.5">
                              <div className="w-full h-0.5 bg-stone-300" />
                              <div className="w-full h-0.5 bg-stone-300" />
                            </div>
                          </div>

                          {/* Heavy moulded plastic water/sand fillable base */}
                          <div className="w-28 h-6 bg-stone-600 rounded-t-xl rounded-b-md shadow-lg border border-stone-700 relative flex items-center justify-center">
                            {/* Water inlet cap */}
                            <div className="w-2.5 h-2.5 rounded-full bg-stone-800 border border-stone-500 absolute top-1 right-4" />
                            {/* Built-in rolling wheel accents on base */}
                            <div className="w-3 h-1.5 bg-stone-900 rounded-xs absolute bottom-0 left-2" />
                            <div className="w-3 h-1.5 bg-stone-900 rounded-xs absolute bottom-0 right-2" />
                            <div className="w-8 h-1 bg-stone-700 rounded-full" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Item 2: Instagram Frame (Photo booth cutout held by smiling youth) */}
                    {item.id === 'display-instagram-frame' && (
                      <div className="w-full h-full relative overflow-hidden bg-stone-100">
                        {/* Background photo of people */}
                        <img
                          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80"
                          alt="Friends taking photo"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        {/* Die-cut Instagram Selfie Prop Frame Overlay */}
                        <div className="absolute inset-2 border-8 border-white bg-transparent rounded-sm shadow-2xl flex flex-col justify-between pointer-events-none">
                          {/* Top Header of Instagram frame */}
                          <div className="bg-white -m-2 p-1.5 flex items-center justify-between border-b border-stone-200">
                            <div className="flex items-center gap-1">
                              <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 flex items-center justify-center p-0.5">
                                <div className="w-full h-full rounded-full bg-white" />
                              </div>
                              <span className="font-serif italic font-bold text-[8.5px] text-stone-900">
                                Instagram
                              </span>
                            </div>
                            {/* Paper airplane / share icon */}
                            <div className="text-[7px] text-stone-700">✈️</div>
                          </div>

                          {/* Profile badges on top right */}
                          <div className="bg-white/95 backdrop-blur-xs mx-auto -mt-1 px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1 border border-stone-200">
                            <div className="w-3 h-3 rounded-full bg-indigo-600 border border-white" />
                            <div className="w-3 h-3 rounded-full bg-rose-600 border border-white -ml-1.5" />
                            <div className="w-3 h-3 rounded-full bg-amber-500 border border-white -ml-1.5" />
                            <span className="text-[4.5px] font-bold text-stone-700">@overcomers_assembly</span>
                          </div>

                          {/* Empty Center for Faces (transparent) */}
                          <div className="flex-1" />

                          {/* Bottom Footer of Instagram frame */}
                          <div className="bg-white -m-2 p-1.5 border-t border-stone-200 flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-[6px]">
                              <span>❤️ 1,248</span>
                              <span>💬 94</span>
                            </div>
                            <span className="text-[5.5px] font-bold text-[#0284c7]">#WeddingVibes2025</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Item 3: Giant Pole Feather Flag Banner 5.5m */}
                    {item.id === 'display-giant-pole-flag' && (
                      <div className="w-full h-full p-2 flex items-center justify-center bg-stone-50 relative">
                        {/* Scale comparison businesswoman & specs on left */}
                        <div className="absolute left-2 top-2 space-y-1 text-[5px] text-stone-500">
                          <div className="flex items-center gap-0.5">
                            <span>👤</span> 1 Person Setup
                          </div>
                          <div className="flex items-center gap-0.5">
                            <span>⏱️</span> 3 Mins
                          </div>
                          <div className="flex items-center gap-0.5">
                            <span>💨</span> Wind 18mph
                          </div>
                          <div className="flex items-center gap-0.5">
                            <span>🌧️</span> Water Resist
                          </div>
                        </div>

                        {/* Flag assembly */}
                        <div className="relative h-46 w-32 flex items-end justify-center">
                          {/* Telescopic pole */}
                          <div className="w-1 h-44 bg-stone-300 border-l border-stone-400 absolute bottom-3 left-12 z-10" />
                          
                          {/* Tall white rectangular flag with Google logo */}
                          <div className="w-12 h-36 bg-white shadow-lg border border-stone-300 absolute top-0 left-12 rounded-r-xs p-1 flex flex-col justify-between items-center overflow-hidden z-20">
                            {/* Vertical Google Text Simulation */}
                            <div className="transform rotate-90 origin-center my-auto flex items-center gap-0.5 font-bold text-xs tracking-wide">
                              <span className="text-[#4285f4]">G</span>
                              <span className="text-[#ea4335]">o</span>
                              <span className="text-[#fbbc05]">o</span>
                              <span className="text-[#4285f4]">g</span>
                              <span className="text-[#34a853]">l</span>
                              <span className="text-[#ea4335]">e</span>
                            </div>
                          </div>

                          {/* Business woman standing next to it for scale */}
                          <div className="absolute right-2 bottom-3 w-7 h-18 z-25">
                            {/* Stylized woman figure */}
                            <svg viewBox="0 0 40 100" className="w-full h-full drop-shadow-sm">
                              {/* Head */}
                              <circle cx="20" cy="12" r="7" fill="#7c2d12" />
                              {/* White Shirt */}
                              <path d="M12 20 L28 20 L26 48 L14 48 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                              {/* Black pencil skirt */}
                              <path d="M14 48 L26 48 L24 75 L16 75 Z" fill="#1e293b" />
                              {/* Legs */}
                              <line x1="18" y1="75" x2="18" y2="95" stroke="#7c2d12" strokeWidth="2.5" />
                              <line x1="22" y1="75" x2="22" y2="95" stroke="#7c2d12" strokeWidth="2.5" />
                            </svg>
                          </div>

                          {/* Base tripod rigging and water ring */}
                          <div className="relative z-15 flex flex-col items-center">
                            <div className="w-14 h-4 bg-stone-400/80 rounded-full border border-stone-500 shadow-sm" />
                            <div className="w-18 h-1 bg-stone-600 rounded-full" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Item 4: Advertisement Backdrop Banner */}
                    {item.id === 'display-backdrop-banner' && (
                      <div className="w-full h-full p-2 flex items-center justify-center bg-[#f8fafc]">
                        <div className="relative w-44 h-40 flex flex-col justify-between items-center">
                          {/* Banner top text */}
                          <div className="w-full flex items-center justify-between text-[5.5px] font-black tracking-tight text-stone-900 px-1">
                            <div>
                              <span>Advertisement</span>
                              <div className="text-[7.5px] text-[#b8860b]">Backdrop Banner</div>
                            </div>
                            <div className="text-[4px] text-stone-400 text-right">
                              Ideal for Events, Promotions<br />&amp; Photo Backdrops
                            </div>
                          </div>

                          {/* Telescopic stand with gold brand graphic */}
                          <div className="relative w-36 h-28 border-2 border-stone-400 bg-stone-900 rounded-xs shadow-xl p-2 flex flex-col justify-between overflow-hidden">
                            {/* Graphic inside */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#2a2205] via-[#1a1403] to-black p-2 flex flex-col justify-between">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-0.5">
                                  <div className="w-2 h-2 rounded-full bg-[#d4af37]" />
                                  <span className="text-[4px] font-bold text-white">NEXT LEVEL</span>
                                </div>
                                <span className="text-[3.5px] text-[#ebd07f] font-semibold">CREATIVE AGENCY</span>
                              </div>

                              <div className="my-auto">
                                <div className="text-[5px] text-stone-300 font-medium">WE CREATE</div>
                                <div className="text-[8px] font-black text-white tracking-tight leading-none">
                                  BRANDS<br />THAT GROW
                                </div>
                              </div>

                              <div className="w-full h-0.5 bg-[#d4af37] rounded-full" />
                            </div>

                            {/* Corner metal screw/bracket graphics */}
                            <div className="w-1.5 h-1.5 rounded-full bg-stone-300 absolute top-0.5 left-0.5" />
                            <div className="w-1.5 h-1.5 rounded-full bg-stone-300 absolute top-0.5 right-0.5" />
                            <div className="w-1.5 h-1.5 rounded-full bg-stone-300 absolute bottom-0.5 left-0.5" />
                            <div className="w-1.5 h-1.5 rounded-full bg-stone-300 absolute bottom-0.5 right-0.5" />
                          </div>

                          {/* Stand base feet */}
                          <div className="w-38 flex justify-between px-1 -mt-1">
                            <div className="w-7 h-1 bg-stone-600 rounded-full" />
                            <div className="w-7 h-1 bg-stone-600 rounded-full" />
                          </div>

                          {/* Bottom icon row */}
                          <div className="w-full flex items-center justify-around text-[4px] text-stone-500 pt-0.5">
                            <span>⭐ Events</span>
                            <span>📢 Promotions</span>
                            <span>📸 Photo</span>
                            <span>🏢 Corporate</span>
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
