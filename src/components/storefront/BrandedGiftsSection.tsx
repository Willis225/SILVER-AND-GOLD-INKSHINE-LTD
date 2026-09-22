import React, { useRef, useMemo } from 'react';
import { motion } from 'motion/react';
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
    <section className="bg-[#08080a] text-stone-100 py-14 sm:py-20 border-b border-white/10 relative overflow-hidden bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Paragraph & Call to Action */}
          <motion.div 
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 space-y-4 sm:space-y-6"
          >
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              Branded Corporate Gifts &amp; Promotional Items
            </h2>

            <p className="text-xs sm:text-[13.5px] text-stone-300 leading-relaxed font-normal">
              Strengthen relationships and keep your brand top of mind with customised corporate gift items from SILVER &amp; GOLD INKSHINE LTD. We print and brand pens, mugs, keychains, notepads, water bottles, face caps, tote bags and more with your company logo, colours and message. Perfect for staff appreciation, client gifts, product launches and corporate events across Nigeria.
            </p>

            <div>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={onViewProducts}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#f5be38] hover:bg-[#ffd15c] text-black font-extrabold text-xs sm:text-sm rounded-full shadow-[0_0_25px_rgba(245,190,56,0.3)] transition-colors group cursor-pointer"
              >
                <span>View Products</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column: Carousel of Products */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-9 relative group/carousel"
          >
            
            {/* Scroll buttons for desktop */}
            <button
              type="button"
              onClick={() => handleScroll('left')}
              className="absolute -left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#121217] shadow-xl border border-white/20 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity z-20 hover:bg-[#f5be38] hover:text-black cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => handleScroll('right')}
              className="absolute -right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#121217] shadow-xl border border-white/20 text-white flex items-center justify-center opacity-80 group-hover/carousel:opacity-100 transition-opacity z-20 hover:bg-[#f5be38] hover:text-black cursor-pointer"
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
              {displayItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelectItem?.(item)}
                  className="w-[200px] sm:w-[225px] shrink-0 flex flex-col bg-[#121217] border border-white/10 rounded-2xl p-3 hover:border-[#f5be38]/60 hover:shadow-[0_0_30px_rgba(245,190,56,0.2)] transition-colors group cursor-pointer"
                >
                  {/* Image Container */}
                  <div className="w-full h-[200px] sm:h-[220px] rounded-xl overflow-hidden bg-[#181820] border border-white/5 relative flex items-center justify-center">
                    {item.badge && (
                      <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-black/85 backdrop-blur-md text-[#f5be38] border border-[#f5be38]/40">
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
                      <div className="w-full h-full p-4 flex flex-col items-center justify-center bg-[#15151c] text-stone-300 text-center">
                        <div className="text-xs font-bold text-[#f5be38] mb-1">Silver &amp; Gold</div>
                        <div className="text-[11px] font-semibold">{item.title}</div>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <div className="pt-3 text-center">
                    <h3 className="text-xs sm:text-[13px] font-bold text-stone-200 line-clamp-2 leading-tight group-hover:text-[#f5be38] transition-colors">
                      {item.title}
                    </h3>
                    
                    {/* Gold Price */}
                    <div className="text-xs sm:text-[14px] font-black text-[#f5be38] mt-2 font-mono">
                      {item.price}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
