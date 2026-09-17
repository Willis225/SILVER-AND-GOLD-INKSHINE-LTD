import React, { useRef, useState } from 'react';
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  CheckCircle2 
} from 'lucide-react';
import { CLIENT_LOGOS, COMPLETED_JOBS } from '../../data/seedData';

interface GoogleReviewItem {
  id: string;
  name: string;
  avatar?: string;
  initial?: string;
  initialBg?: string;
  timeAgo: string;
  rating: number;
  comment: string;
}

const GOOGLE_REVIEWS_AUTHENTIC: GoogleReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Ariyo Marvelous',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
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
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80',
    timeAgo: '3 years ago',
    rating: 5,
    comment: 'I ordered for Flex Banner material, SAV sticker material and ABS. I received free shipping because it was my first large order and everything was in perfect condition.',
  },
  {
    id: 'rev-4',
    name: 'Micheal Johnson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    timeAgo: '3 years ago',
    rating: 5,
    comment: '"I had a wonderful experience got my Promotional/promo table in time and I would highly recommend this business to anyone looking for reliable branding in Lagos."',
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

export const SocialProofSection: React.FC = () => {
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
    <section className="py-16 bg-white border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* 1. Client Logos Strip */}
        <div className="space-y-6 text-center">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-stone-400">
              TRUSTED BY NIGERIA&apos;S LEADING ENTERPRISES, FINTECHS &amp; INSTITUTIONS
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {CLIENT_LOGOS.map((client, idx) => (
              <div
                key={idx}
                className="bg-stone-50 hover:bg-stone-100 border border-stone-200/80 rounded-xl p-3 flex flex-col items-center justify-center text-center transition-colors group"
              >
                <div className="h-8 w-8 rounded-lg bg-stone-200 text-stone-700 flex items-center justify-center font-bold text-xs group-hover:bg-amber-100 group-hover:text-amber-800 transition-colors">
                  {client.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="text-[11px] font-bold text-stone-800 mt-2 truncate w-full">
                  {client.name}
                </div>
                <div className="text-[9px] text-stone-500 truncate w-full">
                  {client.badge}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Authentic Google Customer Reviews Widget: SILVER & GOLD INKSHINE LTD */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <div className="text-[#b8860b] font-bold text-sm sm:text-base tracking-wide">
              Read Our Happy Customer Reviews on Google
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              What Our Clients Are Saying About Us
            </h2>
          </div>

          {/* Reviews Widget Box */}
          <div className="relative group/reviews flex flex-col lg:flex-row items-stretch gap-6 bg-stone-50/50 border border-stone-200/80 rounded-3xl p-5 sm:p-7 shadow-xs">
            
            {/* Left Column: Google Business Profile Badge Card */}
            <div className="lg:w-[280px] shrink-0 p-5 rounded-2xl border border-stone-200 bg-white flex flex-col justify-between items-center text-center shadow-xs">
              <a
                href="https://share.google/k34pe4JFmZSmpWHlA"
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center gap-3 group cursor-pointer"
              >
                {/* Profile Avatar / Logo */}
                <div className="w-14 h-14 rounded-full bg-[#b8860b] flex items-center justify-center text-white shadow-sm overflow-hidden p-1 group-hover:scale-105 transition-transform">
                  <div className="w-full h-full rounded-full border border-white/40 flex flex-col items-center justify-center text-[8px] font-black leading-none bg-[#78350f]">
                    <span>INKSHINE</span>
                    <span className="text-[6px] text-amber-300">PRINT</span>
                  </div>
                </div>

                {/* Business Name */}
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-stone-900 group-hover:text-blue-600 transition-colors leading-snug">
                    SILVER &amp; GOLD INKSHINE LTD – Printing Company in Nigeria
                  </h3>

                  {/* Rating Stars & Count */}
                  <div className="flex items-center justify-center gap-1.5 pt-1">
                    <span className="text-sm font-bold text-amber-500">4.8</span>
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  <div className="text-[11px] text-stone-500 font-medium">
                    Based on 29 reviews
                  </div>
                </div>
              </a>

              {/* Google Badge & Button */}
              <div className="w-full pt-4 space-y-2.5">
                <div className="text-[11px] text-stone-500 flex items-center justify-center gap-1">
                  <span>powered by</span>
                  <span className="font-bold text-stone-800 flex items-center">
                    <span className="text-[#4285F4]">G</span>
                    <span className="text-[#EA4335]">o</span>
                    <span className="text-[#FBBC05]">o</span>
                    <span className="text-[#4285F4]">g</span>
                    <span className="text-[#34A853]">l</span>
                    <span className="text-[#EA4335]">e</span>
                  </span>
                </div>

                <a
                  href="https://share.google/k34pe4JFmZSmpWHlA"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 px-3.5 rounded-lg bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  <span>review us on</span>
                  <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center text-[10px] font-black text-[#1a73e8]">
                    G
                  </div>
                </a>
              </div>
            </div>

            {/* Right Area: Scrollable Review Cards */}
            <div className="flex-1 relative overflow-hidden">
              
              {/* Scroll Prev Button */}
              <button
                onClick={() => handleScroll('left')}
                className="absolute -left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md border border-stone-200 text-stone-700 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity z-20 hover:bg-stone-50 cursor-pointer"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Scroll Next Button */}
              <button
                onClick={() => handleScroll('right')}
                className="absolute -right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md border border-stone-200 text-stone-700 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity z-20 hover:bg-stone-50 cursor-pointer"
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
                {GOOGLE_REVIEWS_AUTHENTIC.map((review) => (
                  <div
                    key={review.id}
                    className="w-[260px] sm:w-[280px] shrink-0 p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 flex flex-col justify-between hover:shadow-sm transition-shadow relative"
                  >
                    <div>
                      {/* Header: User Avatar, Name, Time, and Google 'G' icon */}
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2.5">
                          {review.avatar ? (
                            <img
                              src={review.avatar}
                              alt={review.name}
                              className="w-9 h-9 rounded-full object-cover border border-stone-200"
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
                            <h4 className="text-xs sm:text-[13px] font-bold text-stone-900 leading-tight">
                              {review.name}
                            </h4>
                            <span className="text-[10px] text-stone-400">
                              {review.timeAgo}
                            </span>
                          </div>
                        </div>

                        {/* Google G logo on top right */}
                        <div className="w-4 h-4 flex items-center justify-center shrink-0">
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
                      <div className="flex items-center gap-0.5 text-amber-400 mb-2.5">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>

                      {/* Review Text */}
                      <p className="text-xs text-stone-600 leading-relaxed font-normal">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Dots */}
              <div className="flex items-center justify-center gap-1.5 mt-4">
                <button
                  onClick={() => handleScroll('left')}
                  className={`h-2 rounded-full transition-all cursor-pointer ${activeDot === 0 ? 'bg-[#b8860b] w-5' : 'bg-stone-300 w-2'}`}
                  aria-label="Page 1"
                />
                <button
                  onClick={() => handleScroll('right')}
                  className={`h-2 rounded-full transition-all cursor-pointer ${activeDot === 1 ? 'bg-[#b8860b] w-5' : 'bg-stone-300 w-2'}`}
                  aria-label="Page 2"
                />
              </div>

            </div>

          </div>
        </div>

        {/* 3. Completed Jobs & Press Showcase */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-amber-600">
                RECENT COMMERCIAL PROJECTS
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight mt-1">
                Completed Jobs Fresh Off Our Production Press
              </h3>
            </div>
            <span className="text-xs text-stone-500">
              Printed in Swali &amp; Yenagoa, delivered nationwide
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {COMPLETED_JOBS.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                    <img
                      src={job.imageUrl}
                      alt={job.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-stone-900/80 text-white backdrop-blur-xs">
                        {job.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-1.5">
                    <h4 className="font-bold text-stone-900 text-sm">{job.title}</h4>
                    <p className="text-[11px] text-amber-700 font-medium">{job.client}</p>
                    <p className="text-[10px] text-stone-500 line-clamp-2">{job.specs}</p>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500 mt-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-stone-400" />
                    {job.location}
                  </span>
                  <span className="text-[#b8860b] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Delivered
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
