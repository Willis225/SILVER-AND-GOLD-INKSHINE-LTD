import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { Product } from '../../types/schema';
import { getSectionDisplayItems, SectionDisplayItem } from '../../utils/categoryUtils';
import { PriceOnRequestBadge } from '../common/PriceOnRequestBadge';

export interface StationeryItem extends SectionDisplayItem {}

interface BusinessStationerySectionProps {
  products?: Product[];
  onViewProducts?: () => void;
  onSelectItem?: (item: StationeryItem) => void;
}

const DEFAULT_STATIONERY_ITEMS: StationeryItem[] = [
  {
    id: 'prod-exercise-books',
    badge: 'School Special',
    title: '40 and 60 Leaves Exercise Books Printing',
    price: 'Price on Request',
    numericPrice: 0,
    imageUrl: '/exercise-books-40-60.jpg',
    category: 'books_magazines',
  },
  {
    id: 'stationery-matte-cards',
    badge: 'Essential',
    title: 'Premium Matte Laminated Business Cards (Pack of 100)',
    price: 'Price on Request',
    numericPrice: 0,
    imageUrl: '/premium-matte-business-cards.jpg',
    category: 'cards_invitations',
  },
  {
    id: 'stationery-csuite-suite',
    badge: 'C-Suite Pack',
    title: 'Executive Corporate Letterheads & Presentation Folders Suite (100 Sets)',
    price: 'Price on Request',
    numericPrice: 0,
    imageUrl: '/executive-letterheads-folders.jpg',
    category: 'office_stationery',
  },
  {
    id: 'stationery-plastic-cards',
    badge: 'VIP Choice',
    title: 'Premium Plastic Business Cards',
    price: 'Price on Request',
    numericPrice: 0,
    imageUrl: '/premium-plastic-business-cards.jpg',
    category: 'cards_invitations',
  },
];

export const BusinessStationerySection: React.FC<BusinessStationerySectionProps> = ({
  products = [],
  onViewProducts,
  onSelectItem,
}) => {
  const displayItems = useMemo(() => {
    return getSectionDisplayItems(
      products,
      ['cards_invitations', 'office_stationery', 'books_magazines', 'stationery'],
      DEFAULT_STATIONERY_ITEMS
    );
  }, [products]);

  return (
    <section id="business-stationery-section" className="relative text-white py-16 sm:py-24 border-b border-white/10 overflow-hidden bg-black">
      {/* Deep black architectural texture with subtle gold and silver specular light */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(245,190,56,0.04)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#f5be38]/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Wide Header Row: Headline, Description & Call to Action in Silver & Gold on Pure Black */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col lg:flex-row lg:items-end justify-between gap-6 p-6 sm:p-10 rounded-3xl border border-white/15 shadow-2xl overflow-hidden group transition-all duration-300 bg-[#050508]"
        >
          {/* Background Image Layer */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img
              src="https://cdn.hstockplus.org/uploads/public/img-1790085965718-b3376e39924b61f7.webp"
              alt="Office Stationery & Corporate Identity Background"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-25 filter grayscale contrast-125"
              referrerPolicy="no-referrer"
            />
            {/* Deep black gradient veil */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/85" />
          </div>

          {/* Top Silver & Gold Metallic Border Accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#f5be38] via-white to-transparent opacity-90 z-10" />

          <div className="space-y-3.5 max-w-3xl relative z-10">
            {/* Eyebrow badge in Silver & Gold */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#f5be38]/15 via-white/10 to-[#f5be38]/15 border border-[#f5be38]/40 text-[#f5be38] text-xs font-black uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#f5be38]" />
              <span className="bg-gradient-to-r from-[#f5be38] via-white to-[#ffd15c] bg-clip-text text-transparent font-black">
                Office Stationery &amp; Corporate Identity
              </span>
            </div>

            {/* Title in Silver & Gold */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              <span>Business Stationery &amp; </span>
              <span className="bg-gradient-to-r from-[#ffd700] via-[#f5be38] to-[#e5a820] bg-clip-text text-transparent">
                Office Printing
              </span>
            </h2>

            {/* Exact Description Provided by User */}
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-normal">
              Leave a strong impression on every client, partner and stakeholder with professionally printed business stationery from <strong className="text-white font-bold">SILVER &amp; GOLD INKSHINE LTD</strong>. From branded letterheads and complimentary cards to customised envelopes, notepads and presentation folders, we help your business communicate with clarity, consistency and professionalism at every touchpoint.
            </p>
          </div>

          {/* Action CTA Button in Silver & Gold */}
          <div className="shrink-0 relative z-10">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={onViewProducts}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-[#f5be38] via-[#ffd56b] to-[#e5a820] hover:from-[#ffd56b] hover:to-[#f5be38] text-black font-black text-sm rounded-xl shadow-[0_0_25px_rgba(245,190,56,0.3)] transition-all group cursor-pointer"
            >
              <span>View Products</span>
              <ArrowRight className="w-4 h-4 text-black transition-transform group-hover:translate-x-1" />
            </motion.button>
          </div>
        </motion.div>

        {/* Wide Full-Grid Showcase: Product Cards with Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              onClick={() => onSelectItem?.(item)}
              className="group relative rounded-3xl bg-[#09090d] hover:bg-[#111116] border border-white/15 hover:border-[#ffd25d]/50 overflow-hidden shadow-xl hover:shadow-[0_15px_35px_rgba(255,210,93,0.12)] transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              {/* Top hover accent in Gold */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#f5be38] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

              <div>
                {/* Image Stage */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#0d0d12]">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full p-4 flex flex-col items-center justify-center bg-[#0d0d12] text-stone-300 text-center">
                      <div className="text-xs font-bold text-white mb-1">Silver &amp; Gold</div>
                      <div className="text-[11px] font-semibold">{item.title}</div>
                    </div>
                  )}

                  {/* Floating Custom Badge in Gold */}
                  {item.badge && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-black/90 text-[#f5be38] border border-[#f5be38]/40 backdrop-blur-md shadow-md">
                        {item.badge}
                      </span>
                    </div>
                  )}

                  {/* Direct Action Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 z-10 pointer-events-none group-hover:pointer-events-auto">
                    <span className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#f5be38] via-[#ffd56b] to-[#e5a820] text-black font-black text-xs rounded-xl shadow-lg transition-transform hover:scale-105">
                      <ShoppingBag className="w-3.5 h-3.5 text-black" />
                      <span>Customize &amp; Order</span>
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-2">
                  <h3 className="font-extrabold text-white text-[15px] group-hover:text-stone-200 transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Card Price & Action Footer */}
              <div className="p-5 pt-3 border-t border-white/10 bg-[#050508] flex items-center justify-between">
                <PriceOnRequestBadge theme="dark" size="sm" />

                <span className="text-xs font-bold text-stone-300 group-hover:text-[#f5be38] inline-flex items-center gap-1 transition-colors">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#f5be38] transition-transform group-hover:translate-x-1" />
                </span>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
