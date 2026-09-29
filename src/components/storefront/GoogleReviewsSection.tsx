import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { CompanyLogoMark } from '../common/CompanyLogo';

interface GoogleReview {
  id: string;
  name: string;
  avatar?: string;
  initial?: string;
  initialBg?: string;
  timeAgo: string;
  rating: number;
  comment: string;
}

const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: 'rev-1',
    name: 'Ariyo Marvelous',
    avatar: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=100&q=80',
    timeAgo: '5 months ago',
    rating: 5,
    comment: 'I printed a rollup banner for my office campaign and the result was excellent. The design was clear, the stand was solid, and delivery was right on schedule without any delays.',
  },
  {
    id: 'rev-2',
    name: 'Olumide Tos',
    initial: 'O',
    initialBg: 'bg-[#5b21b6]',
    timeAgo: '2 years ago',
    rating: 5,
    comment: 'The establishment offered impeccably maintained merchandise. The layout was thoughtfully organized, customer care was top-notch and print output exceeded our expectations.',
  },
  {
    id: 'rev-3',
    name: 'John Success',
    avatar: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=100&q=80',
    timeAgo: '3 years ago',
    rating: 5,
    comment: 'I ordered for Flex Banner material, SAV sticker material and ABS. I received free shipping because it was my first large order and everything was in perfect condition.',
  },
  {
    id: 'rev-4',
    name: 'Micheal Johnson',
    avatar: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&w=100&q=80',
    timeAgo: '3 years ago',
    rating: 5,
    comment: '"I had a wonderful experience got my Promotional/promo table in time and I would highly recommend this business to anyone looking for reliable branding in Nigeria."',
  },
  {
    id: 'rev-5',
    name: 'Mack Charmness',
    initial: 'M',
    initialBg: 'bg-[#166534]',
    timeAgo: '4 years ago',
    rating: 5,
    comment: '"I was skeptical because their prices were so much cheaper than the other printers I looked at, but I got my Gazebo canopy tent delivered in 3 days and the quality blew me away."',
  },
];

export const GoogleReviewsSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setActiveDot((prev) => (direction === 'left' ? Math.max(0, prev - 1) : Math.min(1, prev + 1)));
    }
  };

  return (
    <section className="bg-[#08080a] text-stone-100 pt-14 pb-12 border-b border-white/10 relative overflow-hidden bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Headers */}
        <motion.div 
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8 sm:mb-10 space-y-1.5"
        >
          <div className="text-[#f5be38] font-bold text-xs sm:text-sm tracking-wider uppercase">
            Read Our Happy Customer Reviews on Google
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
            What Our Clients Are Saying About Us
          </h2>
        </motion.div>

        {/* Carousel / Reviews Grid */}
        <div className="relative group/reviews flex flex-col lg:flex-row items-stretch gap-6">
          
          {/* Left Column: Google Business Profile Badge Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-[280px] shrink-0 p-5 rounded-2xl border border-white/10 bg-[#121217] flex flex-col justify-between items-center text-center shadow-xl hover:border-[#f5be38]/40 transition-colors"
          >
            <div className="flex flex-col items-center gap-3">
              {/* Profile Avatar / Logo */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0c0c10] via-black to-[#1a1a24] flex items-center justify-center text-white shadow-md overflow-hidden p-1 border-2 border-[#f5be38] group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-full flex flex-col items-center justify-center text-center p-0.5">
                  <CompanyLogoMark className="w-6 h-6 shrink-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" />
                  <div className="flex flex-col items-center leading-none mt-0.5">
                    <span className="text-[7px] font-black tracking-wider text-[#f5be38]">INKSHINE</span>
                    <span className="text-[5px] font-extrabold tracking-widest text-stone-300">PRINT</span>
                  </div>
                </div>
              </div>

              {/* Business Name */}
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white leading-snug">
                  SILVER &amp; GOLD INKSHINE LTD – Printing Company in Nigeria
                </h3>

                {/* Rating Stars & Count */}
                <div className="flex items-center justify-center gap-1.5 pt-1">
                  <span className="text-sm font-bold text-[#f5be38]">4.8</span>
                  <div className="flex items-center text-[#f5be38]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#f5be38] text-[#f5be38]" />
                    ))}
                  </div>
                </div>

                <div className="text-[11px] text-stone-400 font-medium">
                  Based on 29 reviews
                </div>
              </div>
            </div>

            {/* Google Badge & Button */}
            <div className="w-full pt-4 space-y-2.5">
              <div className="text-[11px] text-stone-400 flex items-center justify-center gap-1">
                <span>powered by</span>
                <span className="font-bold text-white flex items-center">
                  <span className="text-[#4285F4]">G</span>
                  <span className="text-[#EA4335]">o</span>
                  <span className="text-[#FBBC05]">o</span>
                  <span className="text-[#4285F4]">g</span>
                  <span className="text-[#34A853]">l</span>
                  <span className="text-[#EA4335]">e</span>
                </span>
              </div>

              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="https://share.google/k34pe4JFmZSmpWHlA"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 px-3.5 rounded-xl bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-colors cursor-pointer"
              >
                <span>review us on</span>
                <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center text-[10px] font-black text-[#1a73e8]">
                  G
                </div>
              </motion.a>
            </div>
          </motion.div>

          {/* Right Area: Scrollable Review Cards */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 relative overflow-hidden"
          >
            
            {/* Scroll Prev Button */}
            <button
              type="button"
              onClick={() => handleScroll('left')}
              className="absolute -left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#121217] shadow-xl border border-white/20 text-white flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity z-20 hover:bg-[#f5be38] hover:text-black cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Scroll Next Button */}
            <button
              type="button"
              onClick={() => handleScroll('right')}
              className="absolute -right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#121217] shadow-xl border border-white/20 text-white flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity z-20 hover:bg-[#f5be38] hover:text-black cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Scrollable Container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-4 overflow-x-auto scrollbar-none scroll-smooth py-1 px-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {GOOGLE_REVIEWS.map((review, idx) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="w-[82vw] xs:w-[260px] sm:w-[280px] max-w-xs shrink-0 p-4 sm:p-5 rounded-2xl bg-[#121217] border border-white/10 flex flex-col justify-between hover:border-[#f5be38]/50 hover:shadow-[0_0_25px_rgba(245,190,56,0.15)] transition-colors relative cursor-default"
                >
                  <div>
                    {/* Header: User Avatar, Name, Time, and Google 'G' icon */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        {review.avatar ? (
                          <img
                            src={review.avatar}
                            alt={review.name}
                            className="w-9 h-9 rounded-full object-cover border border-white/15"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div
                            className={`w-9 h-9 rounded-full ${review.initialBg || 'bg-indigo-600'} text-white font-bold flex items-center justify-center text-sm shadow-xs`}
                          >
                            {review.initial}
                          </div>
                        )}
                        <div>
                          <h4 className="text-xs sm:text-[13px] font-bold text-white leading-tight">
                            {review.name}
                          </h4>
                          <span className="text-[10px] text-stone-400">
                            {review.timeAgo}
                          </span>
                        </div>
                      </div>

                      {/* Google G logo on top right */}
                      <div className="w-4 h-4 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Star Rating */}
                    <div className="flex items-center gap-0.5 text-[#f5be38] mb-2.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#f5be38] text-[#f5be38]" />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-xs text-stone-300 leading-relaxed font-normal line-clamp-4">
                      {review.comment}
                    </p>
                  </div>

                  {/* Subtle right scroll indicator line */}
                  <div className="w-1 h-8 bg-white/10 rounded-full absolute right-2 top-1/2 -translate-y-1/2 opacity-30" />
                </motion.div>
              ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-1.5 mt-5">
              <button
                type="button"
                onClick={() => handleScroll('left')}
                className={`h-2 rounded-full transition-all cursor-pointer ${activeDot === 0 ? 'bg-[#f5be38] w-4' : 'bg-white/20 w-2'}`}
                aria-label="Page 1"
              />
              <button
                type="button"
                onClick={() => handleScroll('right')}
                className={`h-2 rounded-full transition-all cursor-pointer ${activeDot === 1 ? 'bg-[#f5be38] w-4' : 'bg-white/20 w-2'}`}
                aria-label="Page 2"
              />
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
