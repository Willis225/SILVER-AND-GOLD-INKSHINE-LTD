import React, { useRef, useMemo } from 'react';
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
import { Product } from '../../types/schema';
import { getSectionDisplayItems, SectionDisplayItem } from '../../utils/categoryUtils';

export interface GiftItem extends SectionDisplayItem {}

interface BrandedGiftsSectionProps {
  products?: Product[];
  onViewProducts?: () => void;
  onSelectItem?: (item: GiftItem) => void;
}

const DEFAULT_GIFT_ITEMS: GiftItem[] = [
  {
    id: 'gift-drawstring-bag',
    title: 'Drawstring Bag & Corporate Gift Sets',
    price: '₦2,000.00',
    numericPrice: 2000,
    imageUrl: 'https://cdn.hstockplus.org/uploads/public/img-1789638283912-8e755036c7f5a300.webp',
    category: 'gift_items_souvenirs',
  },
  {
    id: 'gift-pop-socket',
    title: 'Custom Pop Socket Phone Holder & Gadgets',
    price: '₦1,999.00',
    numericPrice: 1999,
    imageUrl: 'https://cdn.hstockplus.org/uploads/public/img-1789638121027-6ecd906745a42aaa.webp',
    category: 'gift_items_souvenirs',
  },
  {
    id: 'gift-jute-bag',
    title: 'Custom Jute Bag Printing in Nigeria',
    price: '₦3,500.00',
    numericPrice: 3500,
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
    category: 'paper_bags_tags',
  },
  {
    id: 'gift-wristband',
    title: 'Custom Wristband Printing in Lagos, Nigeria – Silicone & Fabric',
    price: '₦1,200.00',
    numericPrice: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    category: 'gift_items_souvenirs',
  },
];

export const BrandedGiftsSection: React.FC<BrandedGiftsSectionProps> = ({
  products = [],
  onViewProducts,
  onSelectItem,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const displayItems = useMemo(() => {
    return getSectionDisplayItems(
      products,
      ['gift_items_souvenirs', 'custom_apparels_caps', 'paper_bags_tags', 'branding', 'gifts'],
      DEFAULT_GIFT_ITEMS
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
              Branded Corporate Gifts &amp; Promotional Items
            </h2>

            <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-normal">
              Strengthen relationships and keep your brand top of mind with customised corporate gift items from SILVER &amp; GOLD INKSHINE LTD. We print and brand pens, mugs, keychains, notepads, water bottles, face caps, tote bags and more with your company logo, colours and message. Perfect for staff appreciation, client gifts, product launches and corporate events across Nigeria.
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
