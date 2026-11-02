import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, ArrowRight } from 'lucide-react';
import { Product } from '../../types/schema';

interface DealsOfTheDaySectionProps {
  onSelectProduct?: (product: Product) => void;
  onExploreCatalog?: () => void;
  onAddToCart?: (product: Product) => void;
}

interface DealItem {
  id: string;
  title: string;
  priceNgn: string;
  image: string;
  rating: number;
}

const DEALS_DATA: DealItem[] = [
  {
    id: 'deal-1',
    title: 'Flyer Design',
    priceNgn: 'Price on Request',
    image: '/brochures-event-programs-flyers.jpg',
    rating: 5,
  },
  {
    id: 'deal-2',
    title: 'T-Shirt Design',
    priceNgn: 'Price on Request',
    image: '/executive-embroidered-polo-shirts.jpg',
    rating: 5,
  },
  {
    id: 'deal-3',
    title: 'Mug Design',
    priceNgn: 'Price on Request',
    image: '/vacuum-flask-coffee-mug-set.jpg',
    rating: 5,
  },
  {
    id: 'deal-4',
    title: 'Notebook Design',
    priceNgn: 'Price on Request',
    image: '/book-printing-lagos.jpg',
    rating: 5,
  },
  {
    id: 'deal-5',
    title: 'Cap Design',
    priceNgn: 'Price on Request',
    image: '/custom-branded-pouch-packaging.jpg',
    rating: 5,
  },
  {
    id: 'deal-6',
    title: 'Bag Design',
    priceNgn: 'Price on Request',
    image: '/luxury-kraft-shopping-carrier-bags.jpg',
    rating: 5,
  },
];

export const DealsOfTheDaySection: React.FC<DealsOfTheDaySectionProps> = ({
  onSelectProduct,
  onExploreCatalog,
  onAddToCart,
}) => {
  // Live Countdown Timer matching reference format: 23 : 45 : 10 : 25
  const [timeLeft, setTimeLeft] = useState({
    days: 23,
    hours: 45,
    minutes: 10,
    seconds: 25,
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
      className="relative bg-[#FAFAFA] text-slate-900 py-10 sm:py-14 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Header Row with Countdown and View All Link */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Left Title + Bold Inline Digital Countdown Timer (23 : 45 : 10 : 25) */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-950 tracking-tight">
              Deals of the Day
            </h2>

            {/* Inline Digital Timer */}
            <div className="inline-flex items-center gap-1.5 font-mono text-sm sm:text-base font-extrabold text-slate-900 bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-2xs">
              <span>{format2(timeLeft.days)}</span>
              <span className="text-slate-400">:</span>
              <span>{format2(timeLeft.hours)}</span>
              <span className="text-slate-400">:</span>
              <span>{format2(timeLeft.minutes)}</span>
              <span className="text-slate-400">:</span>
              <span className="text-amber-600">{format2(timeLeft.seconds)}</span>
            </div>
          </div>

          {/* Right Action Link */}
          {onExploreCatalog && (
            <button
              type="button"
              onClick={onExploreCatalog}
              className="text-xs font-black uppercase tracking-wider text-slate-900 hover:text-black inline-flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto group"
            >
              <span>View All Products</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          )}

        </div>

        {/* 6 Product Cards Grid (Matching Reference Mockup 6-Card Row) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {DEALS_DATA.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              onClick={onExploreCatalog}
              className="group bg-white rounded-xl p-3 sm:p-4 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-300 border border-slate-200/80 hover:border-slate-300 text-center cursor-pointer"
            >
              {/* Product Thumbnail inside Soft Well */}
              <div className="w-full aspect-square rounded-lg bg-[#F8F9FA] p-2.5 mb-3 flex items-center justify-center overflow-hidden border border-slate-100 group-hover:scale-104 transition-transform duration-300">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain filter drop-shadow-2xs"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('luxury-rollup-banner-stand.jpg')) {
                      target.src = '/luxury-rollup-banner-stand.jpg';
                    }
                  }}
                />
              </div>

              {/* Product Title */}
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-black transition-colors truncate">
                {item.title}
              </h3>

              {/* Bold Pricing */}
              <div className="mt-1 text-xs font-black text-slate-950 font-mono">
                {item.priceNgn}
              </div>

              {/* 5 Gold Stars */}
              <div className="mt-1.5 flex items-center justify-center text-[#f5be38] gap-0.5">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-[#f5be38]" />
                ))}
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
