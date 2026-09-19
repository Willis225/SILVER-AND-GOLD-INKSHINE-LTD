import React, { useRef } from 'react';
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';

interface SignageItem {
  id: string;
  title: string;
  price: string;
  numericPrice: number;
  category: string;
}

interface SignageCompanySectionProps {
  onViewProducts?: () => void;
  onSelectItem?: (item: SignageItem) => void;
}

const SIGNAGE_ITEMS: SignageItem[] = [
  {
    id: 'signage-3d-signs',
    title: '3D Signs in Lagos Nigeria | Custom 3D Signage for Businesses',
    price: '₦70,000.00',
    numericPrice: 70000,
    category: 'signages',
  },
  {
    id: 'signage-logo-signs',
    title: 'Logo Signage in Lagos Nigeria | Custom Business Logo Signs',
    price: '₦37,000.00',
    numericPrice: 37000,
    category: 'signages',
  },
  {
    id: 'signage-directional',
    title: 'Directional Signage in Lagos Nigeria | Custom Wayfinding Signs',
    price: '₦27,000.00',
    numericPrice: 27000,
    category: 'signages',
  },
  {
    id: 'signage-digital-display',
    title: 'Electronic Digital Signage in Lagos Nigeria | Digital Display Signs',
    price: '₦2,400,000.00',
    numericPrice: 2400000,
    category: 'signages',
  },
];

export const SignageCompanySection: React.FC<SignageCompanySectionProps> = ({
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
              Signage Making Company in Lagos, Nigeria
            </h2>

            <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-normal">
              Boost your business visibility with a trusted signage making company in Lagos, Nigeria. We design, produce, and install high-quality{' '}
              <strong className="text-stone-800 font-semibold">shop signs, 3D letter signs, lightbox signs, LED signs, acrylic signs, directional signs, wall signs, pylon signs, Caution, Safety, Danger and Warning Signage, indoor signs, and outdoor signage</strong>{' '}
              that attract attention and strengthen your brand.
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
              {SIGNAGE_ITEMS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectItem?.(item)}
                  className="w-[200px] sm:w-[220px] shrink-0 flex flex-col group cursor-pointer"
                >
                  {/* Image Container with Exact Visual Representation from Image */}
                  <div className="w-full h-[210px] sm:h-[230px] rounded-lg overflow-hidden bg-stone-50 border border-stone-100 group-hover:shadow-md transition-shadow relative flex items-center justify-center">
                    
                    {/* Item 1: 3D Signs in Lagos Nigeria (Technician on ladder installing 3D TECNO storefront) */}
                    {item.id === 'signage-3d-signs' && (
                      <div className="w-full h-full relative overflow-hidden bg-sky-950">
                        {/* Blue storefront facade */}
                        <div className="absolute inset-0 bg-[#0052a3] flex flex-col justify-between p-2">
                          {/* 3D Illuminated Channel Letters */}
                          <div className="pt-2 px-1">
                            <div className="flex items-center gap-0.5 text-white font-black text-xl tracking-wider drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)]">
                              <span className="text-2xl text-white">TECNO</span>
                              <span className="text-xs font-normal text-sky-200 lowercase mt-1.5">mobile</span>
                            </div>
                            <div className="w-full h-1 bg-white/40 rounded-full mt-1" />
                          </div>

                          {/* Building awning / window */}
                          <div className="bg-[#003d7a] rounded-sm p-1.5 border border-sky-600/40 text-center">
                            <span className="text-[6px] text-sky-200 font-bold">AUTHORIZED EXPERIENCE CENTRE</span>
                          </div>
                        </div>

                        {/* Signage Installation Technician in Red Shirt on Ladder */}
                        <div className="absolute bottom-1 left-2 z-10 flex flex-col items-center">
                          {/* Technician */}
                          <div className="relative w-12 h-20">
                            {/* Head with safety cap */}
                            <div className="w-3.5 h-3.5 rounded-full bg-amber-500 absolute top-0 left-3 border border-amber-600" />
                            {/* Red Work Shirt */}
                            <div className="w-6 h-9 bg-[#dc2626] rounded-t-sm absolute top-3 left-1.5 shadow-md flex items-center justify-center">
                              <div className="w-4 h-1 bg-amber-400 rounded-2xs" />
                            </div>
                            {/* Jeans */}
                            <div className="w-5 h-9 bg-blue-900 absolute top-11 left-2" />
                          </div>

                          {/* Ladder */}
                          <div className="w-8 h-24 border-x-2 border-stone-300 absolute -bottom-1 -left-1 flex flex-col justify-around py-1 -z-5">
                            <div className="w-full h-0.5 bg-stone-300" />
                            <div className="w-full h-0.5 bg-stone-300" />
                            <div className="w-full h-0.5 bg-stone-300" />
                            <div className="w-full h-0.5 bg-stone-300" />
                          </div>
                        </div>

                        {/* Lagos sunny sky effect */}
                        <div className="absolute top-0 right-0 w-24 h-12 bg-gradient-to-b from-sky-400/40 to-transparent pointer-events-none" />
                      </div>
                    )}

                    {/* Item 2: Logo Signage (Jumex Empire Home of Beauty on fluted wood slat wall) */}
                    {item.id === 'signage-logo-signs' && (
                      <div className="w-full h-full relative overflow-hidden bg-[#78350f]">
                        {/* Vertical Wood Slat Wall Texture */}
                        <div className="absolute inset-0 bg-[#9a3412] flex justify-between px-1">
                          {[...Array(14)].map((_, i) => (
                            <div key={i} className="w-1.5 h-full bg-[#7c2d12] border-r border-[#431407]" />
                          ))}
                        </div>

                        {/* Acrylic Round Plaque with Golden Rim & 3D Gold Lettering */}
                        <div className="relative z-10 w-36 h-36 rounded-full bg-stone-900/60 backdrop-blur-xs border-3 border-[#fbbf24] shadow-2xl p-2.5 flex flex-col items-center justify-center text-center mx-auto my-auto group-hover:scale-105 transition-transform duration-300">
                          {/* Inner gold crest emblem */}
                          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-300 flex items-center justify-center text-amber-950 font-serif font-black text-xs shadow-md mb-0.5">
                            👑
                          </div>

                          {/* Brand Name in 3D Gold */}
                          <div className="text-[8.5px] font-black tracking-widest text-[#fde047] uppercase leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                            JUMEX EMPIRE
                          </div>

                          <div className="font-serif italic text-[5.5px] text-amber-200 mt-0.5">
                            Home Of Beauty
                          </div>

                          <div className="text-[4px] text-stone-300 mt-1 tracking-wider border-t border-amber-400/40 pt-0.5">
                            Your Beauty Is Our Concern
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Item 3: Directional Signage in Lagos Nigeria */}
                    {item.id === 'signage-directional' && (
                      <div className="w-full h-full p-2 flex items-center justify-center bg-stone-100">
                        <div className="relative w-42 h-42 flex flex-col justify-between items-center">
                          {/* Overhead gold gantry signs */}
                          <div className="w-full flex items-center justify-between gap-1">
                            {/* Highway Gold Board with Arrow */}
                            <div className="bg-[#b8860b] border-2 border-white text-white rounded-2xs px-1.5 py-0.5 text-[5px] font-bold flex items-center gap-1 shadow-md">
                              <span>AIRPORT</span>
                              <span>➡</span>
                            </div>
                            {/* Up Arrow Board */}
                            <div className="bg-[#b8860b] border-2 border-white text-white rounded-2xs px-1.5 py-0.5 text-[5px] font-bold flex items-center gap-1 shadow-md">
                              <span>⬆ LEKKI - EPE</span>
                            </div>
                            {/* Turn right board */}
                            <div className="bg-[#b8860b] border-2 border-white text-white rounded-2xs px-1 py-0.5 text-[5px] font-bold shadow-md">
                              <span>VI ↩</span>
                            </div>
                          </div>

                          {/* Gold street name hanging sign */}
                          <div className="w-32 bg-[#996515] border-2 border-white text-white py-1 px-2 rounded-2xs text-center shadow-lg my-1">
                            <div className="text-[6.5px] font-black tracking-wider uppercase">
                              BROAD STREET
                            </div>
                          </div>

                          {/* Row of Roadway Traffic & Safety Warning Signs */}
                          <div className="flex items-end justify-center gap-1.5 pt-1">
                            {/* Red/White Triangular Caution Sign */}
                            <div className="w-5 h-5 border-2 border-[#dc2626] bg-white flex items-center justify-center text-[7px] font-black text-stone-900 clip-triangle shadow-xs">
                              ⚠️
                            </div>

                            {/* Yellow Diamond Warning */}
                            <div className="w-4.5 h-4.5 bg-[#eab308] border border-stone-800 transform rotate-45 flex items-center justify-center shadow-xs">
                              <span className="transform -rotate-45 text-[5px] font-black text-black">⚡</span>
                            </div>

                            {/* Red Circular No Entry Sign */}
                            <div className="w-5 h-5 rounded-full bg-[#dc2626] border-2 border-white flex items-center justify-center shadow-xs">
                              <div className="w-3 h-0.5 bg-white rounded-full" />
                            </div>

                            {/* Blue Circular Mandatory Arrow Sign */}
                            <div className="w-5 h-5 rounded-full bg-[#2563eb] border-2 border-white flex items-center justify-center shadow-xs">
                              <span className="text-white text-[7px] font-black">⬆</span>
                            </div>

                            {/* Red Octagonal STOP sign */}
                            <div className="w-5 h-5 bg-[#dc2626] border border-white flex items-center justify-center text-[4px] font-black text-white shadow-xs">
                              STOP
                            </div>
                          </div>

                          {/* Mounting metal poles */}
                          <div className="w-32 flex justify-around -mt-0.5">
                            <div className="w-0.5 h-6 bg-stone-400" />
                            <div className="w-0.5 h-6 bg-stone-400" />
                            <div className="w-0.5 h-6 bg-stone-400" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Item 4: Electronic Digital Signage (Dual high-tech standing totems) */}
                    {item.id === 'signage-digital-display' && (
                      <div className="w-full h-full p-2 flex items-center justify-center bg-stone-100">
                        <div className="relative w-42 h-44 flex items-center justify-center gap-2">
                          {/* Totem 1: Sleek Black Vertical Kiosk Display with Brand Promo */}
                          <div className="w-15 h-38 bg-stone-950 rounded-t-sm rounded-b-2xs border-2 border-stone-700 shadow-2xl p-1 flex flex-col justify-between items-center group-hover:scale-102 transition-transform duration-300">
                            {/* Brand Header */}
                            <div className="text-[3.5px] font-black tracking-widest text-stone-400 uppercase">
                              VESTEL
                            </div>

                            {/* Crisp Illuminated LCD Screen */}
                            <div className="w-full h-28 bg-gradient-to-b from-sky-400 via-sky-600 to-indigo-900 rounded-2xs shadow-inner p-1 flex flex-col justify-between overflow-hidden relative">
                              <div className="text-[4px] font-black text-white tracking-wide">
                                4K ULTRA HD
                              </div>
                              <div className="text-center my-auto">
                                <div className="text-[6px] font-black text-white leading-none">
                                  DIGITAL<br />SIGNAGE
                                </div>
                                <div className="w-6 h-0.5 bg-amber-400 mx-auto mt-0.5 rounded-full" />
                              </div>
                              <div className="text-[3px] text-white/80 text-right">
                                Cloud CMS Controlled
                              </div>
                            </div>

                            {/* Heavy Floor Pedestal Base */}
                            <div className="w-14 h-1.5 bg-stone-800 rounded-2xs border border-stone-600 shadow-md" />
                          </div>

                          {/* Totem 2: Standing Commercial Advertising Display */}
                          <div className="w-16 h-38 bg-stone-900 rounded-t-sm rounded-b-2xs border-2 border-stone-600 shadow-2xl p-1 flex flex-col justify-between items-center group-hover:scale-102 transition-transform duration-300">
                            {/* Screen */}
                            <div className="w-full h-30 bg-black rounded-2xs shadow-inner overflow-hidden relative border border-stone-800">
                              <img
                                src="https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=300&q=80"
                                alt="Digital Cinema / Brand Promo"
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-x-0 bottom-0 bg-black/70 p-0.5 text-center">
                                <div className="text-[4.5px] font-black text-rose-500 uppercase">
                                  NOW SHOWING
                                </div>
                              </div>
                            </div>

                            {/* Floor Base */}
                            <div className="w-15 h-1.5 bg-stone-800 rounded-2xs border border-stone-600 shadow-md" />
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
