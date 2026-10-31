import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { ProductCategory } from '../../types/schema';

interface PrintingCategoriesQuickNavProps {
  onSelectCategory: (category: ProductCategory | 'all') => void;
  onExploreCatalog: () => void;
}

interface CategoryCardItem {
  id: ProductCategory;
  title: string;
  image: string;
  tag: string;
}

const CATEGORY_ITEMS: CategoryCardItem[] = [
  {
    id: 'custom_apparels_caps',
    title: 'Hoodie Design',
    image: '/executive-embroidered-polo-shirts.jpg',
    tag: 'Apparel',
  },
  {
    id: 'advertising_materials',
    title: 'Product Printing',
    image: '/industrial-large-format-printer.jpg',
    tag: 'Large Format',
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
    image: '/book-printing-lagos.jpg',
    tag: 'Stationery',
  },
  {
    id: 'stickers_labels',
    title: 'Stickers & Labels',
    image: '/product-packaging-labels-stickers.jpg',
    tag: 'Labels',
  },
  {
    id: 'banners_stands',
    title: 'Banners & Stands',
    image: '/luxury-rollup-banner-stand.jpg',
    tag: 'Displays',
  },
];

export const PrintingCategoriesQuickNav: React.FC<PrintingCategoriesQuickNavProps> = ({
  onSelectCategory,
  onExploreCatalog,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, CATEGORY_ITEMS.length - 4) : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= CATEGORY_ITEMS.length - 4 ? 0 : prev + 1));
  };

  const visibleItems = CATEGORY_ITEMS.slice(currentIndex, currentIndex + 4);

  return (
    <section 
      aria-label="Explore All Categories"
      className="relative bg-white text-slate-900 py-16 sm:py-20 border-b border-slate-200 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Header: Centered with Subtitle and Title */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#7C3AED] uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>WE ALWAYS BELIEVE IN QUALITY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
            Explore All Categories
          </h2>
        </div>

        {/* Carousel / 4-Column Grid with Navigation Arrows */}
        <div className="relative flex items-center">
          
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous categories"
            className="absolute -left-3 sm:-left-6 z-20 w-12 h-12 rounded-full bg-white hover:bg-slate-100 text-slate-900 shadow-xl border border-slate-200 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* 4 Cards Container */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-2 sm:px-4">
            {visibleItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                onClick={() => onSelectCategory(item.id)}
                className="group bg-[#F8FAFC] hover:bg-white border border-slate-200 hover:border-purple-500/50 rounded-2xl p-6 flex flex-col items-center justify-between text-center shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer aspect-[4/4.5]"
              >
                {/* Thumbnail Image Container */}
                <div className="w-full aspect-square rounded-xl bg-white p-4 flex items-center justify-center overflow-hidden shadow-inner border border-slate-100 group-hover:scale-105 transition-transform duration-500">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain drop-shadow-md"
                  />
                </div>

                {/* Title */}
                <div className="mt-5 space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-slate-950 group-hover:text-[#7C3AED] transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {item.tag}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next categories"
            className="absolute -right-3 sm:-right-6 z-20 w-12 h-12 rounded-full bg-slate-950 hover:bg-slate-900 text-white shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
          >
            <ArrowRight className="w-5 h-5" />
          </button>

        </div>

        {/* View All Catalog Button */}
        <div className="text-center pt-4">
          <button
            type="button"
            onClick={onExploreCatalog}
            className="h-11 px-8 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs sm:text-sm tracking-wide uppercase inline-flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-4 h-4 text-[#f5be38]" />
          </button>
        </div>

      </div>
    </section>
  );
};
