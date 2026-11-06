import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
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
      className="relative bg-[#070204] text-white py-10 sm:py-14 border-b border-stone-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Header Row with Countdown and View All Link */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Left Title + Bold Inline Digital Countdown Timer (23 : 45 : 10 : 25) */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
              Deals of the Day
            </h2>

            {/* Inline Digital Timer */}
            <div className="inline-flex items-center gap-1.5 font-mono text-sm sm:text-base font-extrabold text-white bg-stone-900 px-3 py-1 rounded-lg border border-stone-700 shadow-xs">
              <span>{format2(timeLeft.days)}</span>
              <span className="text-stone-500">:</span>
              <span>{format2(timeLeft.hours)}</span>
              <span className="text-stone-500">:</span>
              <span>{format2(timeLeft.minutes)}</span>
              <span className="text-stone-500">:</span>
              <span className="text-[#ffd25d]">{format2(timeLeft.seconds)}</span>
            </div>
          </div>

          {/* Right Action Link */}
          {onExploreCatalog && (
            <button
              type="button"
              onClick={onExploreCatalog}
              className="text-xs font-black uppercase tracking-wider text-stone-300 hover:text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto group"
            >
              <span>View All Products</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-[#ffd25d]" />
            </button>
          )}

        </div>

        {/* 6 Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {DEALS_DATA.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              onClick={onExploreCatalog}
              className="group bg-[#121217] hover:bg-[#1a1a22] rounded-xl p-3 sm:p-4 flex flex-col justify-between shadow-md transition-all duration-300 border border-stone-800 hover:border-stone-600 text-center cursor-pointer"
            >
              <div className="w-full aspect-[4/3] rounded-lg bg-black/60 p-2 flex items-center justify-center overflow-hidden border border-stone-800 mb-2">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="text-xs font-bold text-white group-hover:text-[#ffd25d] transition-colors truncate">
                {item.title}
              </h3>
              <div className="mt-1 text-[11px] font-extrabold text-[#ffd25d]">
                {item.priceNgn}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
