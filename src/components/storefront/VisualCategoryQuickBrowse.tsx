import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { ProductCategory } from '../../types/schema';

interface VisualCategoryQuickBrowseProps {
  onSelectCategory: (category: ProductCategory | 'all') => void;
  onExploreCatalog?: () => void;
}

interface CategoryBrowseItem {
  id: ProductCategory;
  title: string;
  image: string;
  tag: string;
}

const CATEGORIES_DATA: CategoryBrowseItem[] = [
  {
    id: 'custom_apparels_caps',
    title: 'Hoodie Design',
    image: '/executive-embroidered-polo-shirts.jpg',
    tag: 'Apparel',
  },
  {
    id: 'advertising_materials',
    title: 'Product Printing',
    image: '/vacuum-flask-coffee-mug-set.jpg',
    tag: 'Promotional',
  },
  {
    id: 'packaging_shipping_cartons',
    title: 'Package Design',
    image: '/custom-branded-pouch-packaging.jpg',
    tag: 'Packaging',
  },
  {
    id: 'books_magazines',
    title: 'Book Cover Design',
    image: '/brochures-event-programs-flyers.jpg',
    tag: 'Publishing',
  },
  {
    id: 'banners_stands',
    title: 'Roll-Up Banners',
    image: '/luxury-rollup-banner-stand.jpg',
    tag: 'Displays',
  },
  {
    id: 'cards_invitations',
    title: 'Business Stationery',
    image: '/premium-matte-business-cards.jpg',
    tag: 'Cards & Foil',
  },
];

export const VisualCategoryQuickBrowse: React.FC<VisualCategoryQuickBrowseProps> = ({
  onSelectCategory,
  onExploreCatalog,
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(CATEGORIES_DATA.length - itemsPerPage, prev + 1));
  };

  return (
    <section 
      aria-label="Explore All Categories"
      className="relative bg-white text-slate-900 py-16 sm:py-20 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Centered with Eyebrow and Nav Arrows */}
        <div className="text-center space-y-2 mb-10 relative">
          <div className="text-xs font-mono font-bold text-teal-700 uppercase tracking-widest">
            CATEGORIES
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight">
            Explore All Categories
          </h2>

          {/* Navigation Arrows (Presvila circle buttons on desktop) */}
          <div className="hidden md:flex items-center justify-between absolute inset-y-0 left-0 right-0 pointer-events-none">
            <button
              type="button"
              onClick={handlePrev}
              disabled={startIndex === 0}
              aria-label="Previous categories"
              className="pointer-events-auto w-10 h-10 rounded-full bg-white hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none border border-slate-200 text-slate-800 flex items-center justify-center transition-all shadow-md cursor-pointer -translate-x-3"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={startIndex >= CATEGORIES_DATA.length - itemsPerPage}
              aria-label="Next categories"
              className="pointer-events-auto w-10 h-10 rounded-full bg-white hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none border border-slate-200 text-slate-800 flex items-center justify-center transition-all shadow-md cursor-pointer translate-x-3"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Categories Row / Grid (Presvila 4-column minimal cutout display) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">
          {CATEGORIES_DATA.slice(startIndex, startIndex + itemsPerPage).map((item, idx) => (
            <motion.div
              key={item.id + idx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              onClick={() => onSelectCategory(item.id)}
              className="group cursor-pointer flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl bg-white hover:bg-slate-50/60 border border-slate-200/90 hover:border-teal-500/50 hover:shadow-xl transition-all duration-300 shadow-xs"
            >
              {/* Product Preview Cutout Container */}
              <div className="w-full aspect-square max-w-[200px] rounded-xl bg-slate-50 group-hover:bg-teal-50/40 p-3 mb-4 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105 border border-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain filter drop-shadow-md"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('placeholder')) {
                      target.src = '/brochures-event-programs-flyers.jpg';
                    }
                  }}
                />
              </div>

              {/* Title & Tag */}
              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  {item.title}
                </h3>
                <span className="text-xs text-slate-500 font-mono">
                  {item.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View All / Explore Full Catalog Link */}
        {onExploreCatalog && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={onExploreCatalog}
              className="h-10 px-6 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-slate-900 hover:bg-black inline-flex items-center gap-2 transition-all shadow-sm cursor-pointer"
            >
              <span>View Full 22 Categories Catalog</span>
              <ArrowRight className="w-4 h-4 text-teal-400" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
