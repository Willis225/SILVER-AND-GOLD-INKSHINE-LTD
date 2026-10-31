import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, ShoppingBag, Eye, ArrowRight } from 'lucide-react';
import { Product } from '../../types/schema';

interface DealsOfTheDaySectionProps {
  onSelectProduct?: (product: Product) => void;
  onExploreCatalog?: () => void;
  onAddToCart?: (product: Product) => void;
}

interface DealItem {
  id: string;
  categoryTag: string;
  priceUsd: string;
  priceNgn: string;
  title: string;
  image: string;
  rating: number;
  featuredButton?: boolean;
}

const DEALS_DATA: DealItem[] = [
  {
    id: 'deal-1',
    categoryTag: 'Bag',
    priceUsd: '',
    priceNgn: 'Price on Request',
    title: 'Stylish Bag',
    image: '/luxury-kraft-shopping-carrier-bags.jpg',
    rating: 5,
  },
  {
    id: 'deal-2',
    categoryTag: 'Mug',
    priceUsd: '',
    priceNgn: 'Price on Request',
    title: 'Coffee Mug',
    image: '/vacuum-flask-coffee-mug-set.jpg',
    rating: 5,
  },
  {
    id: 'deal-3',
    categoryTag: 'Hoodie',
    priceUsd: '',
    priceNgn: 'Price on Request',
    title: 'Winter Hoodie',
    image: '/executive-embroidered-polo-shirts.jpg',
    rating: 5,
    featuredButton: true,
  },
  {
    id: 'deal-4',
    categoryTag: 'Packet',
    priceUsd: '',
    priceNgn: 'Price on Request',
    title: 'Packaging',
    image: '/custom-branded-pouch-packaging.jpg',
    rating: 5,
  },
  {
    id: 'deal-5',
    categoryTag: 'Bag',
    priceUsd: '',
    priceNgn: 'Price on Request',
    title: 'Flyer Design',
    image: '/brochures-event-programs-flyers.jpg',
    rating: 5,
  },
  {
    id: 'deal-6',
    categoryTag: 'Mug',
    priceUsd: '',
    priceNgn: 'Price on Request',
    title: 'T-Shirt Print',
    image: '/inkshine-brand-portrait.png',
    rating: 5,
  },
  {
    id: 'deal-7',
    categoryTag: 'Mug',
    priceUsd: '',
    priceNgn: 'Price on Request',
    title: 'Book Cover',
    image: '/book-printing-lagos.jpg',
    rating: 5,
  },
  {
    id: 'deal-8',
    categoryTag: 'Packet',
    priceUsd: '',
    priceNgn: 'Price on Request',
    title: 'Food Packet',
    image: '/corrugated-shipping-cartons-mailer-boxes.jpg',
    rating: 5,
  },
];

export const DealsOfTheDaySection: React.FC<DealsOfTheDaySectionProps> = ({
  onSelectProduct,
  onExploreCatalog,
  onAddToCart,
}) => {
  // Live Countdown Timer matching reference: 28 : 15 : 59 : 23
  const [timeLeft, setTimeLeft] = useState({
    days: 28,
    hours: 15,
    minutes: 59,
    seconds: 23,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format2 = (n: number) => String(n).padStart(2, '0');

  return (
    <section 
      aria-label="Deals of the Day"
      className="relative bg-slate-50/80 text-slate-900 py-16 sm:py-20 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Row with Countdown and View All Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-200">
          
          {/* Left Title + Countdown Timer */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight">
              Deals of the Day
            </h2>

            {/* Countdown Display: 28 : 15 : 59 : 23 */}
            <div className="flex items-center gap-2 font-mono text-base sm:text-lg font-black text-teal-700 bg-white px-4 py-1.5 rounded-xl border border-teal-200/80 shadow-xs">
              <span className="text-slate-900">{format2(timeLeft.days)}</span>
              <span className="text-teal-500">:</span>
              <span className="text-slate-900">{format2(timeLeft.hours)}</span>
              <span className="text-teal-500">:</span>
              <span className="text-slate-900">{format2(timeLeft.minutes)}</span>
              <span className="text-teal-500">:</span>
              <span className="text-teal-600">{format2(timeLeft.seconds)}</span>
            </div>
          </div>

          {/* Right Action Button */}
          {onExploreCatalog && (
            <button
              type="button"
              onClick={onExploreCatalog}
              className="h-10 px-5 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-800 hover:text-black bg-white hover:bg-slate-100 border border-slate-200 inline-flex items-center gap-2 transition-colors cursor-pointer self-start md:self-auto shadow-xs"
            >
              <span>View All Products</span>
              <ArrowRight className="w-3.5 h-3.5 text-teal-600" />
            </button>
          )}

        </div>

        {/* 4-Column x 2-Row Grid = 8 Product Cards (Presvila Reference Structure) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {DEALS_DATA.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              className="group relative rounded-2xl bg-white text-slate-900 p-4 sm:p-5 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 border border-slate-200/90 hover:border-teal-500/50"
            >
              {/* Card Header: Category Tag & Price Tag */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {item.categoryTag}
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-teal-700 font-mono">
                  {item.priceNgn}
                </span>
              </div>

              {/* Product Mockup Container with Smooth Zoom */}
              <div className="relative w-full aspect-square rounded-xl bg-slate-50 p-3 mb-3 flex items-center justify-center overflow-hidden border border-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-500 group-hover:scale-108"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('luxury-rollup-banner-stand.jpg')) {
                      target.src = '/luxury-rollup-banner-stand.jpg';
                    }
                  }}
                />

                {/* Quick Add to Cart button */}
                <div className="absolute inset-x-2 bottom-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onExploreCatalog) onExploreCatalog();
                    }}
                    className="w-full h-8 px-3 rounded-lg bg-[#0F172A] hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-teal-400" />
                    <span>Order Now</span>
                  </button>
                </div>
              </div>

              {/* Product Title and Star Rating */}
              <div className="space-y-1.5 text-center">
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors truncate">
                  {item.title}
                </h3>

                {/* 5 Yellow Stars */}
                <div className="flex items-center justify-center text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
