import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';

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
      className="bg-[#070204] text-white py-12 sm:py-16 border-b border-stone-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        
        {/* Section Heading */}
        <div className="text-center space-y-1.5 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            What Our Clients Are Saying About Us
          </h2>
        </div>

        {/* 4-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
          
          {/* Google Summary Badge */}
          <div className="rounded-2xl bg-[#121217] p-6 text-white border border-stone-800 flex flex-col justify-between shadow-md">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 text-stone-300 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-[#ffd25d] text-[#ffd25d]" />
                <span>Google Verified</span>
              </div>
              <h3 className="text-2xl font-black text-white">4.9 / 5.0 Rating</h3>
              <p className="text-xs text-stone-400">Based on verified reviews from businesses and event organizers across Bayelsa &amp; Nigeria.</p>
            </div>
            <div className="pt-4 border-t border-stone-800 text-xs text-stone-300 font-bold">
              SILVER &amp; GOLD INKSHINE LTD
            </div>
          </div>

          {/* Testimonials */}
          {CLIENT_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="rounded-2xl bg-[#121217] p-5 sm:p-6 text-white border border-stone-800 flex flex-col justify-between shadow-md hover:border-stone-600 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden border border-stone-700 shrink-0 bg-stone-800 relative flex items-center justify-center">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-full h-full object-cover relative z-10"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <span className="absolute inset-0 flex items-center justify-center font-bold text-xs text-[#ffd25d] bg-[#1a1a22]">
                      {review.name.split(' ').map((n) => n[0]).join('')}
                    </span>
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

                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-normal">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-800 flex items-center text-[#ffd25d] gap-0.5">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#ffd25d]" />
                ))}
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};
