import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, 
  Quote, 
  CheckCircle2,
} from 'lucide-react';

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  organization: string;
  avatarImage: string;
  rating: number;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    quote: "Ut hic qui a repellat. Et nam reprehenderit vitae qui ut numquam et dolore. Eallam culpa aliquam maiores quis qui reprehenderit ipsum. Omnis est consequatur molestias non voluptatum exercitationem blanditiis. Loreum ipsum dollar sit amet more dsuza and tillppal civers!",
    name: 'Anneto Black',
    role: 'Engineer',
    organization: 'Apex Logistics',
    avatarImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
  },
  {
    id: 'test-2',
    quote: "Silver & Gold Inkshine delivered our corporate annual report folders, broad-base rollup banners, and executive apparel with flawless precision. Zero color variance, laser-calibrated CMYK registration, and fast delivery across Nigeria.",
    name: 'Robert Hazelhood',
    role: 'CEO & Co Founder',
    organization: 'Horizon Tech Corp',
    avatarImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
  },
  {
    id: 'test-3',
    quote: "Their packaging engineering completely transformed our retail brand. Custom corrugated mailer boxes and grease-proof food cartons arrived in Lagos and Port Harcourt in perfect condition. Unmatched print craftsmanship.",
    name: 'Anannya Islam',
    role: 'Lead Designer',
    organization: 'Creative Studio NG',
    avatarImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
  },
];

// Monochrome Partner Logos from Reference (Beyond, Amazon, FedEx, Techlify, Inntel)
const PARTNER_LOGOS = [
  { name: 'Beyond', label: 'BEYOND' },
  { name: 'Amazon', label: 'amazon' },
  { name: 'FedEx', label: 'FedEx' },
  { name: 'Techlify', label: 'Techlify' },
  { name: 'Inntel', label: 'INNTEL' },
];

export const CorporateTrustTestimonialsStrip: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // Default to center avatar: Robert Hazelhood

  const current = TESTIMONIALS[currentIndex] || TESTIMONIALS[0];

  return (
    <section 
      aria-label="Client Testimonials and Corporate Trust"
      className="relative bg-[#F5F3FF] text-slate-900 py-16 sm:py-20 border-b border-purple-100/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-14">
        
        {/* Section Header: Centered */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="text-xs font-mono font-bold text-[#7C3AED] uppercase tracking-widest">
            TESTIMONIALS
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight">
            Client Say About Silver &amp; Gold Inkshine
          </h2>
        </div>

        {/* The Testimonial Card with Vertical Dots & Client Avatars (Presvila exact structure) */}
        <div className="max-w-3xl mx-auto space-y-8">
          
          {/* Main Card with Subtle Border and Pure White Surface */}
          <div className="relative rounded-2xl bg-white border border-purple-100 p-7 sm:p-9 shadow-lg">
            <div className="flex items-start justify-between gap-6">
              
              {/* Left Column: Stars and Quote Text */}
              <div className="space-y-4 flex-1">
                {/* 5 Yellow Stars */}
                <div className="flex items-center text-amber-500">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote Paragraph */}
                <div className="min-h-[90px] flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.blockquote
                      key={current.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                      className="text-sm sm:text-base text-stone-700 font-normal leading-relaxed italic"
                    >
                      &ldquo;{current.quote}&rdquo;
                    </motion.blockquote>
                  </AnimatePresence>
                </div>
              </div>

              {/* Right Column: Vertical Pagination Dots */}
              <div className="flex flex-col items-center gap-2.5 pt-2">
                {TESTIMONIALS.map((t, idx) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`View testimonial by ${t.name}`}
                    className={`transition-all duration-200 rounded-full cursor-pointer ${
                      currentIndex === idx
                        ? 'w-2.5 h-2.5 bg-[#7C3AED] ring-4 ring-purple-200'
                        : 'w-2 h-2 bg-stone-300 hover:bg-stone-400'
                    }`}
                  />
                ))}
              </div>

            </div>
          </div>

          {/* 3-Client Avatar Switcher Underneath */}
          <div className="flex items-center justify-center gap-6 sm:gap-12 pt-2">
            {TESTIMONIALS.map((item, idx) => {
              const isActive = currentIndex === idx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className="flex items-center gap-3 text-left group cursor-pointer transition-all focus:outline-hidden"
                >
                  {/* Avatar with active indicator ring */}
                  <div className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden transition-all duration-300 ${
                    isActive 
                      ? 'ring-3 ring-[#7C3AED] scale-105 shadow-md' 
                      : 'opacity-50 grayscale hover:grayscale-0 hover:opacity-90 ring-1 ring-stone-200'
                  }`}>
                    <img
                      src={item.avatarImage}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Name and Role */}
                  <div>
                    <div className={`text-xs sm:text-sm font-bold transition-colors ${
                      isActive ? 'text-stone-950' : 'text-stone-500 group-hover:text-stone-800'
                    }`}>
                      {item.name}
                    </div>
                    <div className="text-[11px] text-stone-500 font-medium">
                      {item.role}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

        </div>

        {/* ========================================================================= */}
        {/* SECTION 9: TRUST BADGES & PARTNER LOGO STRIP (Monochrome Gray)             */}
        {/* ========================================================================= */}
        <div className="pt-8 border-t border-stone-200">
          <div className="flex flex-wrap items-center justify-between gap-6 sm:gap-10 max-w-4xl mx-auto px-4 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
            {PARTNER_LOGOS.map((p) => (
              <div 
                key={p.name}
                className="text-stone-400 hover:text-stone-900 font-black text-lg sm:text-xl tracking-tight transition-colors"
              >
                {p.label}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
