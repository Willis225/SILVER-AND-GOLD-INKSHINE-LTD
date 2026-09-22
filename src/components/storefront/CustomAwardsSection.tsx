import React, { useRef, useMemo } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
import { Product } from '../../types/schema';
import { getSectionDisplayItems, SectionDisplayItem } from '../../utils/categoryUtils';

export interface AwardItem extends SectionDisplayItem {}

interface CustomAwardsSectionProps {
  products?: Product[];
  onViewProducts?: () => void;
  onSelectItem?: (item: AwardItem) => void;
}

const DEFAULT_AWARD_ITEMS: AwardItem[] = [
  {
    id: 'award-acrylic-plaque',
    badge: 'Modern',
    title: 'Custom Branded Acrylic Award Plaque Printing in Lagos',
    price: '₦24,000',
    numericPrice: 24000,
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    category: 'awards',
  },
  {
    id: 'award-crystal-plaque',
    badge: 'Excellence',
    title: 'Customized Branded Crystal Glass Award Plaque Printing in Lagos | Custom Award Plaques',
    price: '₦34,000',
    numericPrice: 34000,
    imageUrl: 'https://cdn.hstockplus.org/uploads/public/img-1789638184148-5858e68459451c46.webp',
    category: 'awards',
  },
  {
    id: 'award-star-trophy',
    badge: 'Star Performer',
    title: 'Custom Engraved Star Award Trophy & Medals',
    price: '₦18,500',
    numericPrice: 18500,
    imageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=600&q=80',
    category: 'awards',
  },
  {
    id: 'award-wooden-plaque',
    badge: 'Handcrafted',
    title: 'Executive Wooden Plaque with Gold Foil Engraving',
    price: '₦16,500',
    numericPrice: 16500,
    imageUrl: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=600&q=80',
    category: 'awards',
  },
];

export const CustomAwardsSection: React.FC<CustomAwardsSectionProps> = ({
  products = [],
  onViewProducts,
  onSelectItem,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const displayItems = useMemo(() => {
    return getSectionDisplayItems(
      products,
      ['awards', 'award_plaques', 'trophies', 'acrylic_awards'],
      DEFAULT_AWARD_ITEMS
    );
  }, [products]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-[#FAF8F5] text-stone-900 py-14 sm:py-20 border-b border-stone-200 relative overflow-hidden">
      {/* Subtle ambient warm texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e0d8_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Paragraph & Call to Action */}
          <motion.div 
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 space-y-4 sm:space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider">
              <span>Recognition &amp; Excellence</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight leading-tight">
              Custom Award Plaques and Trophies Printing
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
              Celebrate excellence with beautifully custom award plaques, trophies and decorative items from SILVER &amp; GOLD INKSHINE LTD. We produce acrylic plaques, crystal glass awards, wooden shields, engraved medals and customised recognition items for schools, corporate organisations, sports competitions, graduations and community events across Nigeria.
            </p>

            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={onViewProducts}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0c0c10] hover:bg-black text-[#f5be38] font-black text-sm rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all group cursor-pointer"
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
            className="lg:col-span-8 relative group/carousel"
          >
            
            {/* Scroll buttons */}
            <button
              type="button"
              onClick={() => handleScroll('left')}
              className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-stone-200 text-stone-800 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity z-20 hover:bg-[#f5be38] hover:text-black cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => handleScroll('right')}
              className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-stone-200 text-stone-800 flex items-center justify-center opacity-90 group-hover/carousel:opacity-100 transition-opacity z-20 hover:bg-[#f5be38] hover:text-black cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
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
                  className="w-[220px] sm:w-[245px] shrink-0 flex flex-col bg-white border border-stone-200/90 rounded-2xl p-3.5 hover:border-[#d4af37] shadow-sm hover:shadow-[0_12px_30px_rgba(212,175,55,0.18)] transition-all duration-300 group cursor-pointer"
                >
                  {/* Image Container */}
                  <div className="w-full h-[200px] sm:h-[220px] rounded-xl overflow-hidden bg-[#f4f2ec] border border-stone-100 relative flex items-center justify-center">
                    {item.badge && (
                      <div className="absolute top-2.5 left-2.5 z-10 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-stone-900/90 text-[#f5be38] border border-amber-400/40 shadow-sm backdrop-blur-sm">
                        {item.badge}
                      </div>
                    )}

                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full p-4 flex flex-col items-center justify-center bg-stone-100 text-stone-700 text-center">
                        <div className="text-xs font-bold text-amber-700 mb-1">Silver &amp; Gold</div>
                        <div className="text-[11px] font-semibold">{item.title}</div>
                      </div>
                    )}
                  </div>

                  {/* Title & Pricing */}
                  <div className="pt-3.5 text-center flex flex-col flex-1 justify-between">
                    <h3 className="text-xs sm:text-[13px] font-bold text-stone-800 line-clamp-2 leading-snug group-hover:text-amber-800 transition-colors">
                      {item.title}
                    </h3>
                    
                    {/* Price */}
                    <div className="text-sm sm:text-base font-black text-amber-800 mt-2.5 font-sans">
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
