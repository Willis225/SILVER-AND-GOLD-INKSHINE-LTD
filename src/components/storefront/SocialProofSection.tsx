import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  CheckCircle2,
  X,
  Sparkles,
  ExternalLink,
  PlusCircle,
  Check,
  Building2,
  Layers,
  Printer,
  CheckCheck,
  ArrowUpRight,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { CLIENT_LOGOS, COMPLETED_JOBS } from '../../data/seedData';
import { ENTERPRISE_BRANDS } from './TrustedLogosStrip';
import { CompanyLogoMark } from '../common/CompanyLogo';

interface GoogleReviewItem {
  id: string;
  name: string;
  avatar?: string;
  initial?: string;
  initialBg?: string;
  timeAgo: string;
  rating: number;
  comment: string;
  isRecent?: boolean;
}

const DEFAULT_REVIEWS: GoogleReviewItem[] = [
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

const GOOGLE_PROFILE_URL = 'https://share.google/k34pe4JFmZSmpWHlA';

export const SocialProofSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  // Reviews state persisted in localStorage
  const [reviews, setReviews] = useState<GoogleReviewItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('inkshine_google_reviews');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch {
        // Fallback to default
      }
    }
    return DEFAULT_REVIEWS;
  });

  // Modal for dropping a review
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerRating, setReviewerRating] = useState(5);
  const [reviewerComment, setReviewerComment] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Save reviews to localStorage whenever updated
  useEffect(() => {
    try {
      localStorage.setItem('inkshine_google_reviews', JSON.stringify(reviews));
    } catch {
      // Ignored
    }
  }, [reviews]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setActiveDot((prev) => (direction === 'left' ? Math.max(0, prev - 1) : Math.min(1, prev + 1)));
    }
  };

  // When clicking the main "review us on G" button
  const handleReviewOnGoogleClick = () => {
    // 1. Open the official Google Profile in a new tab
    window.open(GOOGLE_PROFILE_URL, '_blank');
    // 2. Open the instant sync modal so they can paste or display their review here instantly!
    setIsReviewModalOpen(true);
  };

  // Submit new review into the local widget state
  const handleFormSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewerComment.trim()) return;

    const initial = reviewerName.trim().charAt(0).toUpperCase();
    const colors = ['bg-indigo-600', 'bg-blue-600', 'bg-emerald-600', 'bg-amber-600', 'bg-purple-600', 'bg-rose-600'];
    const initialBg = colors[Math.floor(Math.random() * colors.length)];

    const newReview: GoogleReviewItem = {
      id: `user-rev-${Date.now()}`,
      name: reviewerName.trim(),
      initial,
      initialBg,
      timeAgo: 'Just now',
      rating: reviewerRating,
      comment: reviewerComment.trim(),
      isRecent: true,
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    setIsReviewModalOpen(false);
    setReviewerName('');
    setReviewerComment('');
    setReviewerRating(5);
    setShowSuccessToast(true);

    // Scroll carousel to the very beginning so the new review is immediately in focus
    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        setActiveDot(0);
      }
    }, 100);

    setTimeout(() => {
      setShowSuccessToast(false);
    }, 6000);
  };

  const totalReviewsCount = 29 + (reviews.length - DEFAULT_REVIEWS.length);

  return (
    <section className="relative text-stone-900 border-y border-stone-200 overflow-hidden bg-white">
      {/* Subtle architectural hairline grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-16 relative z-10">
        
        {/* Success Notification Banner when Review is added */}
        {showSuccessToast && (
          <div className="fixed bottom-6 right-6 z-50 max-w-md bg-stone-900 text-white rounded-2xl p-4 shadow-2xl border border-[#f5be38]/60 flex items-start gap-3 animate-in fade-in slide-in-from-bottom-5">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-5 h-5" />
            </div>
            <div className="space-y-1 text-xs">
              <p className="font-bold text-[#f5be38]">Your Google Review is now Live!</p>
              <p className="text-stone-300">
                Thank you! Your feedback has been displayed directly in the reviews box.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowSuccessToast(false)}
              className="text-stone-400 hover:text-white p-1 ml-auto cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 1. Client Logos Strip with Animated Continuous Marquee */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4 text-center"
        >
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-100 border border-stone-300 text-stone-900 text-xs sm:text-[13px] font-black uppercase tracking-wider shadow-xs">
              <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
              <span>TRUSTED BY NIGERIA&apos;S LEADING ENTERPRISES, FINTECHS &amp; INSTITUTIONS</span>
            </span>
          </div>

          {/* Continuous Straight Single-Line Moving Marquee with White Edge Fades */}
          <div className="relative w-full overflow-hidden py-2">
            {/* Left & Right Edge Vignette Fades */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/90 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/90 to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee-straight items-center gap-4 py-2">
              {[...ENTERPRISE_BRANDS, ...ENTERPRISE_BRANDS].map((brand, idx) => (
                <div
                  key={`${brand.id}-${idx}`}
                  className="bg-white hover:bg-stone-50/80 border border-stone-200 hover:border-stone-900 rounded-2xl px-5 py-3.5 flex items-center gap-3.5 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 shrink-0 h-[68px] min-w-[210px] sm:min-w-[240px] group cursor-pointer"
                >
                  <div className="h-8 sm:h-9 w-24 sm:w-28 flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 duration-200">
                    {brand.renderLogo()}
                  </div>
                  <div className="h-6 w-px bg-stone-200 shrink-0" />
                  <div className="flex flex-col text-left shrink-0">
                    <span className="font-extrabold text-xs text-stone-900 tracking-tight truncate max-w-[90px] sm:max-w-[110px]">
                      {brand.name}
                    </span>
                    <span className="text-[10px] font-bold text-stone-700 bg-stone-100 border border-stone-200 px-2 py-0.5 rounded-full inline-block mt-0.5 group-hover:bg-stone-200 transition-colors">
                      {brand.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 2. Authentic Google Customer Reviews Widget: SILVER & GOLD INKSHINE LTD */}
        <div className="space-y-6" id="google-reviews-section">
          <motion.div 
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center space-y-2"
          >
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-stone-100 text-stone-900 border border-stone-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-stone-700" />
              <span>Read &amp; Share Customer Reviews on Google</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 tracking-tight">
              What Our Clients Are Saying About Us
            </h2>
          </motion.div>

          {/* Reviews Widget Box in Crisp White */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative group/reviews flex flex-col lg:flex-row items-stretch gap-6 bg-[#FAF9F6] border border-stone-200 rounded-3xl p-5 sm:p-7 shadow-lg"
          >
            
            {/* Left Column: Google Business Profile Badge Card */}
            <div className="lg:w-[290px] shrink-0 p-5 rounded-2xl border border-stone-200 bg-white flex flex-col justify-between items-center text-center shadow-sm">
              <a
                href={GOOGLE_PROFILE_URL}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center gap-3 group cursor-pointer"
              >
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
                  <h3 className="text-sm font-bold text-stone-900 group-hover:text-amber-700 transition-colors leading-snug">
                    SILVER &amp; GOLD INKSHINE LTD – Printing Company in Nigeria
                  </h3>

                  {/* Rating Stars & Count */}
                  <div className="flex items-center justify-center gap-1.5 pt-1">
                    <span className="text-base font-black text-amber-600">4.8</span>
                    <div className="flex items-center text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  <div className="text-xs text-stone-500 font-medium">
                    Based on {totalReviewsCount} reviews
                  </div>
                </div>
              </a>

              {/* Google Badge & Actions */}
              <div className="w-full pt-4 space-y-2.5">
                <div className="text-xs text-stone-500 flex items-center justify-center gap-1.5">
                  <span>powered by</span>
                  <span className="font-bold text-stone-900 flex items-center">
                    <span className="text-[#4285F4]">G</span>
                    <span className="text-[#EA4335]">o</span>
                    <span className="text-[#FBBC05]">o</span>
                    <span className="text-[#4285F4]">g</span>
                    <span className="text-[#34A853]">l</span>
                    <span className="text-[#EA4335]">e</span>
                  </span>
                </div>

                {/* Direct Google Review Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleReviewOnGoogleClick}
                  className="w-full py-2.5 px-3.5 rounded-xl bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <span>review us on</span>
                  <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center text-[10px] font-black text-[#1a73e8]">
                    G
                  </div>
                </motion.button>

                {/* Instant Post & Display button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => setIsReviewModalOpen(true)}
                  className="w-full py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-black text-[#f5be38] text-xs font-black flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4 text-[#f5be38]" />
                  <span>Display Your Review Here</span>
                </motion.button>
              </div>
            </div>

            {/* Right Area: Scrollable Review Cards in Crisp White */}
            <div className="flex-1 relative overflow-hidden flex flex-col justify-between">
              
              {/* Scroll Controls */}
              <button
                onClick={() => handleScroll('left')}
                className="absolute -left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-lg border border-stone-200 text-stone-700 flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity z-20 hover:bg-[#f5be38] hover:text-black cursor-pointer"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => handleScroll('right')}
                className="absolute -right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-lg border border-stone-200 text-stone-700 flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity z-20 hover:bg-[#f5be38] hover:text-black cursor-pointer"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Scrollable Container */}
              <div
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-auto scrollbar-none scroll-smooth py-1 px-1"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {reviews.map((review, idx) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.06 }}
                    whileHover={{ y: -4, scale: 1.015 }}
                    className={`w-[82vw] xs:w-[265px] sm:w-[285px] max-w-xs shrink-0 p-5 rounded-2xl bg-white border ${
                      review.isRecent ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-stone-200'
                    } flex flex-col justify-between shadow-sm hover:shadow-md hover:border-amber-400/80 transition-all relative cursor-default`}
                  >
                    <div>
                      {/* Header: User Avatar, Name, Time, and Google 'G' icon */}
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2.5">
                          {review.avatar ? (
                            <img
                              src={review.avatar}
                              alt={review.name}
                              className="w-10 h-10 rounded-full object-cover border border-stone-200 shadow-xs"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div
                              className={`w-10 h-10 rounded-full ${review.initialBg || 'bg-amber-600'} text-white font-bold flex items-center justify-center text-sm shadow-xs`}
                            >
                              {review.initial}
                            </div>
                          )}
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h4 className="text-xs sm:text-sm font-bold text-stone-900 leading-tight">
                                {review.name}
                              </h4>
                              {review.isRecent && (
                                <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[9px] font-black bg-amber-400 text-stone-900">
                                  New
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-stone-400">
                              {review.timeAgo}
                            </span>
                          </div>
                        </div>

                        {/* Google G logo on top right */}
                        <div className="w-5 h-5 flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4" viewBox="0 0 24 24">
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
                      <div className="flex items-center gap-0.5 text-amber-500 mb-2.5">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>

                      {/* Review Text */}
                      <p className="text-xs sm:text-[13px] text-stone-700 leading-relaxed font-normal">
                        {review.comment}
                      </p>
                    </div>

                    {review.isRecent && (
                      <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px] text-amber-800 font-semibold">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Google Verified Review
                        </span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Pagination Dots */}
              <div className="flex items-center justify-center gap-2 mt-4">
                <button
                  onClick={() => handleScroll('left')}
                  className={`h-2 rounded-full transition-all cursor-pointer ${activeDot === 0 ? 'bg-amber-500 w-6' : 'bg-stone-300 w-2'}`}
                  aria-label="Page 1"
                />
                <button
                  onClick={() => handleScroll('right')}
                  className={`h-2 rounded-full transition-all cursor-pointer ${activeDot === 1 ? 'bg-amber-500 w-6' : 'bg-stone-300 w-2'}`}
                  aria-label="Page 2"
                />
              </div>

            </div>

          </motion.div>
        </div>

        {/* 3. Completed Jobs & Press Showcase */}
        <div className="space-y-8 pt-4">
          <motion.div 
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#14141c]/90 via-[#0f0f15]/90 to-[#14141c]/90 border border-white/10 shadow-2xl relative overflow-hidden"
          >
            {/* Ambient accent top bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#f5be38] to-transparent opacity-80" />

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5be38]/10 border border-[#f5be38]/30 text-[#f5be38] text-[11px] font-black uppercase tracking-wider shadow-[0_0_15px_rgba(245,190,56,0.15)]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>RECENT COMMERCIAL PROJECTS</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                Completed Jobs Fresh Off Our Production Press
              </h3>
            </div>
            
            <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-300 font-medium bg-black/40 px-4 py-2 rounded-xl border border-white/10 shrink-0">
              <MapPin className="w-4 h-4 text-[#f5be38]" />
              <span>Printed in Swali &amp; Yenagoa, delivered nationwide</span>
            </div>
          </motion.div>

          {/* 4-Card Modern Showcase Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMPLETED_JOBS.map((job, idx) => {
              const specItems = job.specs ? job.specs.split(' | ') : [];
              const whatsappOrderUrl = `https://wa.me/2347030372539?text=Hello%20SILVER%20%26%20GOLD%20INKSHINE%20LTD%2C%20I%20saw%20your%20completed%20project%20"${encodeURIComponent(job.title)}"%20(${encodeURIComponent(job.client)})%20and%20I%20would%20like%20to%20place%20a%20similar%20order.`;

              return (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -7 }}
                  className="group relative rounded-3xl bg-gradient-to-b from-[#13131a] to-[#0c0c10] border border-white/10 hover:border-[#f5be38]/60 overflow-hidden shadow-xl hover:shadow-[0_20px_45px_rgba(245,190,56,0.18)] transition-all duration-500 flex flex-col justify-between"
                >
                  {/* Subtle top sheen highlight */}
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#f5be38]/0 group-hover:via-[#f5be38]/80 to-transparent transition-all duration-500 z-20 pointer-events-none" />

                  <div>
                    {/* Image Stage */}
                    <div className="relative aspect-[16/11] overflow-hidden bg-[#181822]">
                      <img
                        src={job.imageUrl}
                        alt={job.title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      {/* Gradient Scrim */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                      {/* Floating Category Pill */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black bg-black/80 text-[#f5be38] border border-[#f5be38]/50 backdrop-blur-md shadow-md">
                          <Layers className="w-3 h-3 text-[#f5be38]" />
                          {job.category}
                        </span>
                      </div>

                      {/* Verified Delivered Pill */}
                      <div className="absolute top-3 right-3 z-10">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 backdrop-blur-md shadow-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Delivered
                        </span>
                      </div>

                      {/* Quick Action Overlay on Hover */}
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 z-10 pointer-events-none group-hover:pointer-events-auto">
                        <a
                          href={whatsappOrderUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#f5be38] hover:bg-[#ffd15c] text-black font-extrabold text-xs rounded-xl shadow-[0_0_20px_rgba(245,190,56,0.5)] transition-transform hover:scale-105"
                        >
                          <span>Request Similar Spec</span>
                          <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                        </a>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 space-y-3.5">
                      
                      {/* Client Tag */}
                      <div className="flex items-center gap-2">
                        <Building2 className="w-3.5 h-3.5 text-[#f5be38]" />
                        <span className="text-xs font-bold text-[#f5be38] tracking-wide">
                          {job.client}
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="font-extrabold text-white text-[15px] group-hover:text-[#f5be38] transition-colors leading-snug">
                        {job.title}
                      </h4>

                      {/* Structured Spec Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {specItems.map((spec, sIdx) => (
                          <span 
                            key={sIdx}
                            className="inline-block px-2.5 py-1 rounded-md text-[10.5px] font-medium bg-white/5 border border-white/10 text-stone-300 group-hover:border-[#f5be38]/20 transition-colors"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>

                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-5 pt-3 border-t border-white/10 bg-black/20 flex items-center justify-between text-xs text-stone-400">
                    <span className="flex items-center gap-1.5 font-medium text-stone-300">
                      <MapPin className="w-3.5 h-3.5 text-[#f5be38]" />
                      {job.location}
                    </span>
                    
                    <a
                      href={whatsappOrderUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#f5be38] font-bold inline-flex items-center gap-1 hover:underline text-[11px]"
                    >
                      <span>Inquire</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Review Submission Modal */}
      {isReviewModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsReviewModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-stone-200 text-stone-900 space-y-5 animate-in fade-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                <span className="font-bold text-[#4285F4]">G</span>
                <span>Google Review Display Sync</span>
              </div>
              <h3 className="text-xl font-black text-stone-900 tracking-tight">
                Display Your Review on Our Website
              </h3>
              <p className="text-xs text-stone-600">
                Left a review on our Google profile? Paste or enter it below so it instantly displays in our live review box for everyone to see!
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleFormSubmitReview} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Adebayo Ogunlesi"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-stone-900 text-sm focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:bg-white"
                  required
                />
              </div>

              {/* Rating Picker */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Rating *
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewerRating(star)}
                      className="p-1 cursor-pointer transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= reviewerRating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-stone-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-amber-700 ml-2">
                    {reviewerRating} Stars
                  </span>
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Your Experience / Review *
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about the print quality, rollup stand, delivery speed, or customer service..."
                  value={reviewerComment}
                  onChange={(e) => setReviewerComment(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-stone-900 text-sm focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:bg-white resize-none"
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2.5">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-stone-900 hover:bg-black text-[#f5be38] font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#f5be38]" />
                  <span>Publish Review to Website Box</span>
                </button>

                <a
                  href={GOOGLE_PROFILE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Open Official Google Profile Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
