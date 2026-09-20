import React, { useRef, useMemo } from 'react';
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
import { Product } from '../../types/schema';
import { getSectionDisplayItems, SectionDisplayItem } from '../../utils/categoryUtils';

export interface SignageItem extends SectionDisplayItem {}

interface SignageCompanySectionProps {
  products?: Product[];
  onViewProducts?: () => void;
  onSelectItem?: (item: SignageItem) => void;
}

const DEFAULT_SIGNAGE_ITEMS: SignageItem[] = [
  {
    id: 'signage-3d-signs',
    title: '3D Illuminated LED Channel Letter Signs in Lagos Nigeria',
    price: '₦70,000.00',
    numericPrice: 70000,
    imageUrl: 'https://cdn.hstockplus.org/uploads/public/img-1789638255572-4a3ec89bf3a4c4fa.webp',
    category: 'signages',
  },
  {
    id: 'signage-logo-signs',
    title: 'Corporate Logo Wall Signage & Reception Backlit Signs',
    price: '₦37,000.00',
    numericPrice: 37000,
    imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80',
    category: 'signages',
  },
  {
    id: 'signage-directional',
    title: 'Directional Signage & Architectural Wayfinding Pylon Signs',
    price: '₦27,000.00',
    numericPrice: 27000,
    imageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=600&q=80',
    category: 'signages',
  },
  {
    id: 'signage-digital-display',
    title: 'Electronic Digital LED Screen Signage & Video Walls',
    price: '₦2,400,000.00',
    numericPrice: 2400000,
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=600&q=80',
    category: 'signages',
  },
];

export const SignageCompanySection: React.FC<SignageCompanySectionProps> = ({
  products = [],
  onViewProducts,
  onSelectItem,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const displayItems = useMemo(() => {
    return getSectionDisplayItems(
      products,
      ['signages', 'signage', '3d_signs', 'pylon'],
      DEFAULT_SIGNAGE_ITEMS
    );
  }, [products]);

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
                type="button"
                onClick={onViewProducts}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#b8860b] hover:bg-[#996515] active:scale-98 text-white font-bold text-xs sm:text-sm rounded-md shadow-sm transition-all group cursor-pointer"
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
              type="button"
              onClick={() => handleScroll('left')}
              className="absolute -left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md border border-stone-200 text-stone-700 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity z-20 hover:bg-stone-50 cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => handleScroll('right')}
              className="absolute -right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md border border-stone-200 text-stone-700 flex items-center justify-center opacity-80 group-hover/carousel:opacity-100 transition-opacity z-20 hover:bg-stone-50 cursor-pointer"
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
              {displayItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectItem?.(item)}
                  className="w-[200px] sm:w-[220px] shrink-0 flex flex-col group cursor-pointer"
                >
                  {/* Image Container */}
                  <div className="w-full h-[210px] sm:h-[230px] rounded-lg overflow-hidden bg-stone-50 border border-stone-100 group-hover:shadow-md transition-shadow relative flex items-center justify-center">
                    {item.badge && (
                      <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded text-[9.5px] font-black uppercase tracking-wider bg-stone-900/80 backdrop-blur-xs text-[#dfbc5e] border border-amber-500/30">
                        {item.badge}
                      </div>
                    )}

                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full p-4 flex flex-col items-center justify-center bg-stone-900 text-stone-300 text-center">
                        <div className="text-xs font-bold text-amber-400 mb-1">Silver &amp; Gold</div>
                        <div className="text-[11px] font-semibold">{item.title}</div>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <div className="pt-3 text-center">
                    <h3 className="text-xs sm:text-[13px] font-bold text-stone-900 line-clamp-2 leading-tight group-hover:text-[#b8860b] transition-colors">
                      {item.title}
                    </h3>
                    
                    {/* Gold Price */}
                    <div className="text-xs sm:text-[13.5px] font-bold text-[#b8860b] mt-1.5 font-mono">
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
