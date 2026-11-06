import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ProductCategory } from '../../types/schema';

interface PrintingCategoriesQuickNavProps {
  onSelectCategory: (category: ProductCategory | 'all') => void;
  onExploreCatalog: () => void;
}

interface CategoryCardItem {
  id: ProductCategory;
  title: string;
  image: string;
}

const CATEGORY_ITEMS: CategoryCardItem[] = [
  {
    id: 'gift_items_souvenirs',
    title: 'Necklace Design',
    image: '/vacuum-flask-coffee-mug-set.jpg',
  },
  {
    id: 'custom_apparels_caps',
    title: 'Printed T-Shirt',
    image: '/executive-embroidered-polo-shirts.jpg',
  },
  {
    id: 'packaging_shipping_cartons',
    title: 'Package Design',
    image: '/corrugated-shipping-cartons-mailer-boxes.jpg',
  },
  {
    id: 'books_magazines',
    title: 'Book Cover Design',
    image: '/book-printing-lagos.jpg',
  },
  {
    id: 'advertising_materials',
    title: 'Flyer & Brochure Design',
    image: '/brochures-event-programs-flyers.jpg',
  },
  {
    id: 'stickers_labels',
    title: 'Stickers & Labels',
    image: '/product-packaging-labels-stickers.jpg',
  },
  {
    id: 'banners_stands',
    title: 'Rollup Banner Stands',
    image: '/luxury-rollup-banner-stand.jpg',
  },
  {
    id: 'paper_bags_tags',
    title: 'Carrier Bags',
    image: '/luxury-kraft-shopping-carrier-bags.jpg',
  },
];

export const PrintingCategoriesQuickNav: React.FC<PrintingCategoriesQuickNavProps> = ({
  onSelectCategory,
  onExploreCatalog,
}) => {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? Math.max(0, CATEGORY_ITEMS.length - 4) : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev >= CATEGORY_ITEMS.length - 4 ? 0 : prev + 1));
  };

  const visibleItems = CATEGORY_ITEMS.slice(startIndex, startIndex + 4);

  return (
    <section 
      aria-label="Explore All Categories"
      className="relative bg-white text-slate-900 py-12 sm:py-16 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        
        {/* Header: Centered Title with subtle gold accent line */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
            Explore All Categories
          </h2>
          <div className="w-12 h-1 bg-[#f5be38] mx-auto rounded-full" />
        </div>

        {/* 4 Cards Container with Carousel Navigation Arrows */}
        <div className="relative flex items-center">
          
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous categories"
            className="hidden sm:flex absolute -left-4 z-20 w-10 h-10 rounded-full bg-white hover:bg-slate-100 text-slate-900 shadow-lg border border-slate-200 items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* 4 Category Cards: Soft light-gray background (#F8F9FA), 12px rounded corners, clean padding */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {visibleItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                onClick={() => onSelectCategory(item.id)}
                className="group bg-[#F8F9FA] hover:bg-slate-100/80 border border-slate-200/80 hover:border-slate-300 rounded-[12px] p-4 sm:p-5 flex flex-col items-center justify-between text-center transition-all duration-300 cursor-pointer shadow-xs hover:shadow-md"
              >
                {/* Centered Product / Category Image Thumbnail */}
                <div className="w-full aspect-[4/3] rounded-lg bg-white p-3 flex items-center justify-center overflow-hidden border border-slate-100 shadow-xs group-hover:scale-104 transition-transform duration-300">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('custom-branded-pouch-packaging.jpg')) {
                        target.src = '/custom-branded-pouch-packaging.jpg';
                      }
                    }}
                    className="w-full h-full object-contain filter drop-shadow-sm"
                  />
                </div>

                {/* Centered Bold Title Underneath */}
                <h3 className="mt-4 text-xs sm:text-sm font-bold text-slate-900 group-hover:text-black transition-colors truncate w-full">
                  {item.title}
                </h3>
              </motion.div>
            ))}
          </div>

          {/* Right Arrow Button (Tablet & Desktop) */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next categories"
            className="hidden sm:flex absolute -right-4 z-20 w-10 h-10 rounded-full bg-slate-950 hover:bg-slate-900 text-white shadow-lg items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>

        {/* Mobile Pagination Controls (Smartphone View) */}
        <div className="flex sm:hidden items-center justify-center gap-4 pt-1">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous categories"
            className="w-8.5 h-8.5 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-800 active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-[11px] font-semibold text-slate-500">
            {startIndex + 1}–{Math.min(startIndex + 4, CATEGORY_ITEMS.length)} of {CATEGORY_ITEMS.length}
          </span>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next categories"
            className="w-8.5 h-8.5 rounded-full bg-slate-900 text-white shadow-xs flex items-center justify-center active:scale-95 cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Center Pill Button: BROWSE ALL CATEGORIES -> */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={onExploreCatalog}
            className="h-10 sm:h-11 px-7 rounded-full bg-black hover:bg-stone-900 text-white font-extrabold text-xs tracking-wider uppercase inline-flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <span>Browse All Categories</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#f5be38]" />
          </button>
        </div>

      </div>
    </section>
  );
};
