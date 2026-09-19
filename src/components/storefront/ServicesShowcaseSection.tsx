import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
import { ShowcaseServiceItem } from '../../types/websiteContent';

export interface ShowcaseItem {
  id: string;
  title: string;
  price: string;
  numericPrice?: number;
  imageUrl: string;
  badge?: string;
  category: string;
}

interface ServicesShowcaseSectionProps {
  onOrderNow?: () => void;
  onSelectItem?: (item: ShowcaseItem) => void;
  items?: ShowcaseServiceItem[];
  title?: string;
  description?: string;
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: 'showcase-annual-reports',
    title: 'Annual Reports & Financial Statements Printing in Lagos, Nigeria',
    price: '₦10,000.00',
    numericPrice: 10000,
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    category: 'books_magazines',
  },
  {
    id: 'showcase-nylon-printer',
    title: 'Nylon Printing Machine in Nigeria | Buy Packaging Printer',
    price: '₦24,000.00',
    numericPrice: 24000,
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    category: 'printing_machines',
  },
  {
    id: 'showcase-teardrop-banners',
    title: 'Teardrop Banners',
    price: '₦70,000.00',
    numericPrice: 70000,
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80',
    category: 'banners_stands',
  },
  {
    id: 'showcase-souvenir-bags',
    title: 'Souvenirs Bags',
    price: '₦1,300.00',
    numericPrice: 1300,
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
    category: 'paper_bags_tags',
  },
  {
    id: 'showcase-luxury-rollup',
    title: 'Luxury Rollup Banner Stand (Teardrop Chrome Base)',
    price: '₦34,500.00',
    numericPrice: 34500,
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80',
    category: 'banners_stands',
  },
  {
    id: 'showcase-business-cards',
    title: 'Corporate Soft-Touch Laminated Business Cards (Pack of 100)',
    price: '₦8,500.00',
    numericPrice: 8500,
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
    category: 'cards_invitations',
  },
];

export const ServicesShowcaseSection: React.FC<ServicesShowcaseSectionProps> = ({
  onOrderNow,
  onSelectItem,
  items: propItems,
  title = 'Get Top-Quality Printing Services Across Nigeria',
  description = 'From flyers, business cards, banners and packaging to branded items, signage, apparel printing and corporate stationery, SILVER & GOLD INKSHINE LTD delivers fast, affordable and professional printing services for businesses across Nigeria.',
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const displayItems = propItems && propItems.length > 0 ? propItems : SHOWCASE_ITEMS;

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-white py-12 sm:py-16 border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Heading, Paragraph & Call to Action with entrance animation */}
          <motion.div 
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 space-y-4 sm:space-y-5"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight leading-snug">
              {title}
            </h2>

            <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-normal">
              {description}
            </p>

            <div>
              <button
                type="button"
                id="services-section-order-now-btn"
                onClick={onOrderNow}
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-[#d4af37] via-[#c59b27] to-[#b8860b] hover:from-[#e5c158] hover:to-[#c59b27] active:scale-95 text-stone-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-md shadow-[#d4af37]/25 transition-all group cursor-pointer"
                title="Browse our complete design and print catalog to order instantly"
              >
                <span>Order Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>

          {/* Right Column: Carousel of Products */}
          <div className="lg:col-span-9 relative group/carousel">
            
            {/* Scroll buttons for desktop */}
            <button
              onClick={() => handleScroll('left')}
              className="absolute -left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md border border-stone-200 text-stone-700 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity z-20 hover:bg-stone-50"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleScroll('right')}
              className="absolute -right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md border border-stone-200 text-stone-700 flex items-center justify-center opacity-80 group-hover/carousel:opacity-100 transition-opacity z-20 hover:bg-stone-50"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Scrollable Container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none scroll-smooth pb-4 pt-1 px-1 -mx-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {displayItems.map((item) => {
                const hasReplacedImage = item.imageUrl && 
                  item.imageUrl !== 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80' &&
                  item.imageUrl !== 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' &&
                  item.imageUrl !== 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80' &&
                  item.imageUrl !== 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80';

                return (
                  <div
                    key={item.id}
                    onClick={() => onSelectItem?.(item as any)}
                    className="w-[200px] sm:w-[220px] shrink-0 flex flex-col group cursor-pointer"
                  >
                    {/* Image Container with Exact Aspect Ratio & Styling */}
                    <div className="w-full h-[210px] sm:h-[230px] rounded-lg overflow-hidden bg-stone-50 border border-stone-100 group-hover:shadow-md transition-shadow relative flex items-center justify-center">
                      
                      {/* If user uploaded or replaced the image, show it directly */}
                      {hasReplacedImage ? (
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      ) : item.id === 'showcase-annual-reports' ? (
                      /* Realistic Annual Report booklets */
                      <div className="w-full h-full p-4 flex items-center justify-center bg-[#fafafa]">
                        <div className="relative w-36 h-48 transform -rotate-6 transition-transform group-hover:rotate-0 duration-300">
                          {/* Underneath booklet 1 */}
                          <div className="absolute inset-0 bg-[#881337] rounded-sm transform rotate-6 translate-x-2 translate-y-1 shadow-sm opacity-60" />
                          {/* Underneath booklet 2 */}
                          <div className="absolute inset-0 bg-[#9f1239] rounded-sm transform rotate-3 translate-x-1 shadow-sm opacity-80" />
                          {/* Main top booklet */}
                          <div className="absolute inset-0 bg-[#be123c] rounded-sm shadow-lg p-3 text-white flex flex-col justify-between overflow-hidden border border-rose-400/30">
                            <div className="space-y-1">
                              <div className="text-[6px] font-bold tracking-wider text-rose-200">CREATIVE AGENCY</div>
                              <div className="text-xs font-black uppercase leading-tight pt-2">ANNUAL<br />REPORT</div>
                              <div className="text-[7px] text-rose-200">2024–2025</div>
                            </div>
                            {/* Circle Graphic on Cover */}
                            <div className="w-20 h-20 rounded-full border-4 border-rose-300/40 -right-6 -bottom-6 absolute flex items-center justify-center">
                              <div className="w-12 h-12 rounded-full bg-white/20" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : item.id === 'showcase-nylon-printer' ? (
                      /* Industrial Nylon Machine graphic */
                      <div className="w-full h-full p-2 flex items-center justify-center bg-stone-50">
                        <div className="relative w-44 h-36 flex flex-col items-center justify-center">
                          <svg viewBox="0 0 200 160" className="w-full h-full drop-shadow-md">
                            {/* Machine Base */}
                            <rect x="20" y="125" width="160" height="20" rx="4" fill="#64748b" />
                            <rect x="30" y="140" width="20" height="15" fill="#334155" />
                            <rect x="150" y="140" width="20" height="15" fill="#334155" />
                            {/* Gold Main Body Column */}
                            <rect x="30" y="30" width="35" height="100" rx="3" fill="#d4af37" />
                            <rect x="135" y="30" width="35" height="100" rx="3" fill="#d4af37" />
                            {/* Top bridge gold */}
                            <rect x="25" y="20" width="150" height="20" rx="4" fill="#b8860b" />
                            {/* Rollers and central print press cylinder units */}
                            <circle cx="100" cy="55" r="14" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
                            <circle cx="100" cy="85" r="14" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
                            <circle cx="100" cy="115" r="12" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
                            {/* Web path line (printed film) */}
                            <path d="M40 120 L100 115 L100 85 L100 55 L160 55" stroke="#facc15" strokeWidth="4" fill="none" opacity="0.85" />
                            {/* Control Screen */}
                            <rect x="140" y="50" width="25" height="35" fill="#1e293b" rx="2" />
                            <circle cx="148" cy="60" r="2.5" fill="#ef4444" />
                            <circle cx="156" cy="60" r="2.5" fill="#d4af37" />
                            <circle cx="148" cy="70" r="2.5" fill="#3b82f6" />
                            <circle cx="156" cy="70" r="2.5" fill="#eab308" />
                          </svg>
                        </div>
                      </div>
                    ) : item.id === 'showcase-teardrop-banners' ? (
                      /* Teardrop Banners graphic */
                      <div className="w-full h-full p-2 flex items-center justify-center bg-stone-50">
                        <div className="relative w-full h-full flex items-end justify-center gap-1.5 pb-2">
                          {/* Banner 1 (Orange Coca Cola / Vanilla) */}
                          <div className="flex flex-col items-center">
                            <div className="w-7 h-32 bg-gradient-to-b from-orange-500 to-amber-600 rounded-t-full shadow-md p-1 flex flex-col justify-between text-[5px] text-white font-black text-center overflow-hidden">
                              <span className="rotate-90 origin-center mt-6">ORANGE</span>
                              <div className="w-full h-4 bg-white/20 rounded-xs" />
                            </div>
                            <div className="w-0.5 h-6 bg-stone-700" />
                            <div className="w-5 h-1 bg-stone-500 rounded-full" />
                          </div>

                          {/* Banner 2 (Red OPEN) */}
                          <div className="flex flex-col items-center">
                            <div className="w-7 h-34 bg-[#dc2626] rounded-t-full shadow-md p-1 flex flex-col justify-between text-[6px] text-white font-black text-center overflow-hidden">
                              <span className="leading-tight mt-3">O<br />P<br />E<br />N</span>
                            </div>
                            <div className="w-0.5 h-6 bg-stone-700" />
                            <div className="w-5 h-1 bg-stone-500 rounded-full" />
                          </div>

                          {/* Banner 3 (Red WELCOME) */}
                          <div className="flex flex-col items-center">
                            <div className="w-7 h-34 bg-[#b91c1c] rounded-t-full shadow-md p-1 flex flex-col justify-between text-[5.5px] text-white font-black text-center overflow-hidden">
                              <span className="leading-tight mt-2">W<br />E<br />L<br />C<br />O<br />M<br />E</span>
                            </div>
                            <div className="w-0.5 h-6 bg-stone-700" />
                            <div className="w-5 h-1 bg-stone-500 rounded-full" />
                          </div>

                          {/* Banner 4 (Multicolor Teardrop) */}
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-30 bg-gradient-to-tr from-cyan-500 via-amber-400 to-rose-500 rounded-tl-full rounded-br-2xl shadow-md p-1 flex flex-col justify-center text-[5px] text-white font-extrabold text-center">
                              <span>FLAG<br />WORLD</span>
                            </div>
                            <div className="w-0.5 h-8 bg-stone-700" />
                            <div className="w-6 h-1 bg-stone-500 rounded-full" />
                          </div>
                        </div>
                      </div>
                    ) : item.id === 'showcase-souvenir-bags' ? (
                      /* Maroon photo souvenir tote bag */
                      <div className="w-full h-full p-2 flex items-center justify-center bg-[#b8860b]/15">
                        <div className="relative w-36 h-44 bg-[#881337] rounded-md shadow-lg p-2 flex flex-col justify-between border-2 border-[#701a35]">
                          {/* Handles */}
                          <div className="w-12 h-6 border-2 border-[#581c87] rounded-t-full mx-auto -mt-4 bg-transparent" />
                          {/* White printed photo area */}
                          <div className="bg-white rounded-sm p-1.5 flex-1 flex flex-col justify-between shadow-inner">
                            <div className="text-right text-[5px] font-bold text-amber-700">#ForeverAfter</div>
                            {/* Couple photo simulation */}
                            <div className="w-full h-20 rounded-xs overflow-hidden bg-rose-50 relative">
                              <img
                                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                                alt="Event Couple Souvenir"
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="text-center pt-1">
                              <div className="text-[6.5px] font-serif font-black text-rose-950 leading-tight">
                                Demilade &amp; Olanrewaju
                              </div>
                              <div className="text-[4.5px] text-stone-500">Sat, 29th May</div>
                            </div>
                          </div>
                          <div className="text-center text-[4px] text-rose-200 mt-1">Courtesy: The Couple</div>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    )}

                  </div>

                  {/* Title */}
                  <div className="pt-3 text-center">
                    <h3 className="text-xs sm:text-[13px] font-bold text-stone-900 line-clamp-2 leading-tight group-hover:text-[#b8860b] transition-colors">
                      {item.title}
                    </h3>
                    
                    {/* Gold Price */}
                    <div className="text-xs sm:text-[13.5px] font-bold text-[#b8860b] mt-1.5">
                      {item.price}
                    </div>
                  </div>
                </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
