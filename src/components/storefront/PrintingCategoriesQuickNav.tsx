import React, { useState, useEffect } from 'react';
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
  subtitle: string;
  image: string;
}

const CATEGORY_ITEMS: CategoryCardItem[] = [
  {
    id: 'gift_items_souvenirs',
    title: 'Executive Gifts & Souvenirs',
    subtitle: 'Vacuum flasks, corporate mugs & gift sets',
    image: '/vacuum-flask-coffee-mug-set.jpg',
  },
  {
    id: 'custom_apparels_caps',
    title: 'Branded Apparels & Polos',
    subtitle: 'Embroidered polo shirts & custom t-shirts',
    image: '/executive-embroidered-polo-shirts.jpg',
  },
  {
    id: 'packaging_shipping_cartons',
    title: 'Custom Packaging Boxes',
    subtitle: 'Corrugated mailers & retail product cartons',
    image: '/corrugated-shipping-cartons-mailer-boxes.jpg',
  },
  {
    id: 'books_magazines',
    title: 'Books & Publications',
    subtitle: 'Annual reports, catalogues & profile booklets',
    image: '/book-printing-lagos.jpg',
  },
  {
    id: 'advertising_materials',
    title: 'Flyers & Marketing Brochures',
    subtitle: 'A5/A6 leaflets on premium gloss & matte paper',
    image: '/brochures-event-programs-flyers.jpg',
  },
  {
    id: 'stickers_labels',
    title: 'Die-Cut Stickers & Labels',
    subtitle: 'Waterproof vinyl, bottle & packaging labels',
    image: '/product-packaging-labels-stickers.jpg',
  },
  {
    id: 'banners_stands',
    title: 'Rollup Banners & Displays',
    subtitle: 'Teardrop base & standard aluminium pull-up stands',
    image: '/luxury-rollup-banner-stand.jpg',
  },
  {
    id: 'paper_bags_tags',
    title: 'Luxury Carrier Bags',
    subtitle: 'Foil-stamped kraft & branded shopping bags',
    image: '/luxury-kraft-shopping-carrier-bags.jpg',
  },
];

export const PrintingCategoriesQuickNav: React.FC<PrintingCategoriesQuickNavProps> = ({
  onSelectCategory,
  onExploreCatalog,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance carousel unless hovered / interacted with
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === CATEGORY_ITEMS.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? CATEGORY_ITEMS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === CATEGORY_ITEMS.length - 1 ? 0 : prev + 1));
  };

  const getWarpedSequence = () => {
    const items = [];
    for (let i = -2; i <= 2; i++) {
      const index = (activeIndex + i + CATEGORY_ITEMS.length) % CATEGORY_ITEMS.length;
      items.push({ item: CATEGORY_ITEMS[index], offset: i, index });
    }
    return items;
  };

  return (
    <section 
      aria-label="Commercial Production Gallery"
      className="relative bg-[#FAF7F2] text-slate-900 py-10 sm:py-14 border-y border-[#ede4d8] overflow-hidden"
      style={{ perspective: '1400px' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1. Sand Dot Matrix Pattern on Cream White Canvas */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(#cbbba7_1.35px,transparent_1.35px)] [background-size:24px_24px] opacity-80 pointer-events-none" 
        aria-hidden="true"
      />
      
      {/* 2. Soft Ambient Radial Highlight */}
      <div 
        className="absolute inset-0 bg-radial-[circle_at_center] from-white/60 via-transparent to-[#FAF7F2]/60 pointer-events-none" 
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 relative z-10">
        
        {/* Section Header: Cleaned up without subtitle */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight font-display">
            Explore All Categories
          </h2>
          <div className="w-12 h-1 bg-[#f5be38] mx-auto rounded-full" />
        </div>

        {/* 3D Warped Perspective Carousel Stage */}
        <div className="relative w-full py-2 flex items-center justify-center min-h-[360px] sm:min-h-[400px]">
          
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous warped card"
            className="absolute left-2 sm:left-6 z-30 w-11 h-11 rounded-full bg-white hover:bg-stone-900 text-stone-900 hover:text-white shadow-[0_6px_20px_rgba(0,0,0,0.12)] border border-[#e2d8cb] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next warped card"
            className="absolute right-2 sm:right-6 z-30 w-11 h-11 rounded-full bg-stone-900 hover:bg-[#b8860b] text-white shadow-[0_6px_20px_rgba(0,0,0,0.18)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Warped 3D Cylinder / Perspective Track */}
          <div className="w-full max-w-5xl h-[340px] sm:h-[380px] flex items-center justify-center relative px-12 sm:px-16 overflow-hidden">
            {getWarpedSequence().map(({ item, offset, index }) => {
              const isActive = offset === 0;
              const absOffset = Math.abs(offset);

              const translateX = offset * 170;
              const rotateY = offset * -22;
              const scale = isActive ? 1 : Math.max(0.75, 1 - absOffset * 0.15);
              const zIndex = 20 - absOffset * 5;
              const opacity = isActive ? 1 : Math.max(0.35, 1 - absOffset * 0.35);
              const filter = isActive ? 'blur(0px)' : `blur(${absOffset * 2.5}px)`;

              return (
                <motion.div
                  key={item.id}
                  style={{
                    zIndex,
                  }}
                  animate={{
                    x: translateX,
                    rotateY,
                    scale,
                    opacity,
                    filter,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onClick={() => {
                    if (isActive) {
                      onSelectCategory(item.id);
                    } else {
                      setActiveIndex(index);
                    }
                  }}
                  className={`absolute w-[250px] sm:w-[290px] rounded-2xl p-5 sm:p-6 flex flex-col justify-between text-left cursor-pointer transition-all duration-300 ${
                    isActive
                      ? 'bg-white border-2 border-[#c8a951] shadow-[0_20px_50px_rgba(180,140,80,0.22),0_8px_16px_rgba(0,0,0,0.06)] ring-4 ring-[#f5be38]/15'
                      : 'bg-white/80 border border-[#e0d4c3] shadow-md hover:bg-white'
                  }`}
                >
                  {/* Top Warped Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold tracking-[0.2em] text-[#b8860b] uppercase">
                      Category 0{index + 1}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#f5be38]" />
                  </div>

                  {/* Centered Warped Image Frame */}
                  <div className="my-3 aspect-[4/3] rounded-xl bg-[#F7F4EE] p-3 flex items-center justify-center overflow-hidden border border-[#eae0d2]/85 shadow-inner group relative">
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
                      className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-108 transition-transform duration-500 ease-out"
                    />
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-1">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#b8860b] transition-colors leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-stone-500 font-normal line-clamp-1">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Action Footer */}
                  <div className="mt-3 pt-3 border-t border-[#f0e7db] flex items-center justify-between text-[11.5px] font-extrabold text-stone-900">
                    <span className="text-[#b8860b]">Explore Collection</span>
                    <div className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center shadow-sm">
                      <ArrowRight className="w-3 h-3 text-[#f5be38] stroke-[2.5]" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* Thumbnail Dots Indicator & Browse Button brought closer up */}
        <div className="flex flex-col items-center gap-3 pt-0">
          {/* Thumbnail Dots */}
          <div className="flex items-center justify-center gap-2">
            {CATEGORY_ITEMS.map((cat, idx) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to ${cat.title}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === idx ? 'w-7 bg-[#b8860b]' : 'w-2 bg-[#dcd2c4] hover:bg-[#b8860b]/50'
                }`}
              />
            ))}
          </div>

          {/* Center Button: BROWSE ALL CATEGORIES */}
          <div>
            <button
              type="button"
              onClick={onExploreCatalog}
              className="h-10 sm:h-11 px-7 rounded-full bg-[#111116] hover:bg-[#000000] text-white font-extrabold text-xs tracking-[0.16em] uppercase inline-flex items-center gap-2 transition-all shadow-[0_6px_20px_rgba(0,0,0,0.18)] hover:shadow-[0_8px_24px_rgba(245,190,56,0.25)] border border-[#f5be38]/30 active:scale-95 cursor-pointer"
            >
              <span>Browse All Categories</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#f5be38] stroke-[2.5]" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
