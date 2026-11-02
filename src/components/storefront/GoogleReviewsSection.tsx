import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { CompanyLogoMark } from '../common/CompanyLogo';

interface TestimonialCardItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  comment: string;
  rating: number;
}

const CLIENT_REVIEWS: TestimonialCardItem[] = [
  {
    id: 'test-1',
    name: 'Mary T. Johnson',
    role: 'Business Owner',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
    comment: 'Excellent quality and fast service. Highly recommended!',
    rating: 5,
  },
  {
    id: 'test-2',
    name: 'David K.',
    role: 'Event Planner',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    comment: 'Professional service and outstanding print quality.',
    rating: 5,
  },
  {
    id: 'test-3',
    name: 'Anna S. Wilson',
    role: 'Small Business Owner',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    comment: 'Amazing work, our banners look fantastic.',
    rating: 5,
  },
];

export const GoogleReviewsSection: React.FC = () => {
  return (
    <section 
      aria-label="Client Testimonials"
      className="bg-white text-slate-900 py-12 sm:py-16 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        
        {/* Section Heading: What Our Clients Are Saying About Us */}
        <div className="text-center space-y-1.5 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
            What Our Clients Are Saying About Us
          </h2>
        </div>

        {/* 4-Card Grid: 1 Google Review Summary Badge + 3 Dark Charcoal Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
          
          {/* Google Summary Review Badge Card (Preserved & Styled in Dark Charcoal to Match) */}
          <div className="rounded-2xl bg-[#111111] p-5 sm:p-6 text-white border border-white/10 flex flex-col justify-between items-center text-center shadow-md hover:border-[#f5be38]/40 transition-colors">
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center p-1 border-2 border-[#f5be38] shadow-sm">
                <CompanyLogoMark className="w-6 h-6 shrink-0" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xs font-bold text-white leading-snug">
                  Silver &amp; Gold Inkshine Ltd
                </h3>
                <div className="flex items-center justify-center gap-1.5 pt-1">
                  <span className="text-sm font-extrabold text-[#f5be38]">4.8</span>
                  <div className="flex items-center text-[#f5be38]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#f5be38] text-[#f5be38]" />
                    ))}
                  </div>
                </div>
                <div className="text-[11px] text-stone-400">
                  Based on 29+ Google Reviews
                </div>
              </div>
            </div>

            <div className="w-full pt-4 space-y-2">
              <div className="text-[10px] text-stone-400 flex items-center justify-center gap-1">
                <span>verified on</span>
                <span className="font-bold text-white flex items-center text-xs">
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
                className="w-full py-2 px-3 rounded-full bg-white hover:bg-stone-200 text-black text-xs font-bold flex items-center justify-center transition-colors cursor-pointer"
              >
                <span>Write a Review</span>
              </a>
            </div>
          </div>

          {/* 3 Testimonial Cards in Dark Charcoal (#111111) */}
          {CLIENT_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="rounded-2xl bg-[#111111] p-5 sm:p-6 text-white border border-white/10 flex flex-col justify-between shadow-md hover:border-white/20 transition-all duration-300"
            >
              <div className="space-y-4">
                {/* Top-Left: Circular Profile Avatar + Name & Role */}
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden border border-white/20 shrink-0 bg-stone-800">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">
                      {review.name}
                    </h4>
                    <span className="text-[11px] text-stone-400 font-medium">
                      {review.role}
                    </span>
                  </div>
                </div>

                {/* White Review Text */}
                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-normal">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              {/* Bottom: 5 Gold Stars */}
              <div className="mt-5 pt-3 border-t border-white/10 flex items-center text-[#f5be38] gap-0.5">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#f5be38]" />
                ))}
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};
