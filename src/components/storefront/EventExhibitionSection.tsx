import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, ShoppingBag } from 'lucide-react';
import { Product } from '../../types/schema';
import { getSectionDisplayItems, SectionDisplayItem } from '../../utils/categoryUtils';

export interface EventItem extends SectionDisplayItem {}

interface EventExhibitionSectionProps {
  products?: Product[];
  onViewProducts?: () => void;
  onSelectItem?: (item: EventItem) => void;
}

const DEFAULT_EVENT_ITEMS: EventItem[] = [
  {
    id: 'event-photo-booth',
    badge: 'Trending',
    title: '360 Photo Booth Hire in Lagos, Nigeria',
    price: '₦1,000',
    numericPrice: 1000,
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=700&q=80',
    category: 'events_exhibitions',
  },
  {
    id: 'event-flyers-500',
    badge: 'High Impact',
    title: 'A5 Gloss Double-Sided Marketing Flyers & Handbills (Pack of 500)',
    price: '₦32,000',
    numericPrice: 32000,
    imageUrl: 'https://cdn.hstockplus.org/uploads/public/img-1789638255572-4a3ec89bf3a4c4fa.webp',
    category: 'flyers_handbills',
  },
  {
    id: 'event-center-rug',
    badge: 'Luxury',
    title: 'Custom Branded Center Rug Printing',
    price: '₦100,000',
    numericPrice: 100000,
    imageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=700&q=80',
    category: 'events_exhibitions',
  },
  {
    id: 'event-popup-backdrop',
    badge: 'Exhibition Grade',
    title: 'Magnetic Curved Pop-Up Exhibition Media Backdrop Wall (3x3m)',
    price: 'Price on Request',
    numericPrice: 0,
    imageUrl: 'https://cdn.hstockplus.org/uploads/public/img-1789638023483-0654f1a516c4673a.webp',
    category: 'events_exhibitions',
  },
];

export const EventExhibitionSection: React.FC<EventExhibitionSectionProps> = ({
  products = [],
  onViewProducts,
  onSelectItem,
}) => {
  const displayItems = useMemo(() => {
    return getSectionDisplayItems(
      products,
      ['events_exhibitions', 'flyers_handbills', 'frames_wallarts', 'events', 'exhibitions'],
      DEFAULT_EVENT_ITEMS
    );
  }, [products]);

  return (
    <section className="relative text-stone-900 py-16 sm:py-24 border-b border-stone-200 overflow-hidden bg-stone-50">
      {/* Provided Section Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://cdn.hstockplus.org/uploads/public/img-1790091847996-3aa2bb1c6a4e12cd.webp"
          alt="Section Background"
          className="w-full h-full object-cover object-center pointer-events-none"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[0.5px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Wide Header Row: Headline, Description & Call to Action with Custom Background Image */}
        <motion.div 
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col lg:flex-row lg:items-end justify-between gap-6 p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-xl overflow-hidden group transition-all duration-300"
        >
          {/* Background Image Layer */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80"
              alt="Event, Exhibition and Activation Branding Materials Background"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            {/* High-legibility gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-900/80 to-stone-950/75 backdrop-blur-[1.5px]" />
          </div>

          {/* Top Gold Border Accent */}
          <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#f5be38] to-transparent opacity-90 z-10" />

          <div className="space-y-3 max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f5be38]/20 border border-[#f5be38]/50 text-[#f5be38] text-xs font-black uppercase tracking-wider shadow-[0_0_15px_rgba(245,190,56,0.2)]">
              <Sparkles className="w-3.5 h-3.5 text-[#f5be38]" />
              <span>Events, Exhibitions &amp; Activations</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              Event, Exhibition and Activation Branding Materials
            </h2>

            <p className="text-stone-200 text-sm sm:text-base leading-relaxed font-normal">
              Make every occasion memorable with tailored event printing solutions from SILVER &amp; GOLD INKSHINE LTD. We design and print wedding invitations, event programmes, birthday souvenirs, aso-ebi tags, table cards, backdrop banners, gazebo tents, promotional tables and branded display materials for weddings, corporate events, conferences, product launches and social gatherings across Nigeria.
            </p>
          </div>

          <div className="shrink-0 relative z-10">
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={onViewProducts}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#f5be38] hover:bg-[#ffd15c] text-black font-black text-sm rounded-xl shadow-[0_4px_25px_rgba(245,190,56,0.35)] transition-all group cursor-pointer"
            >
              <span>View Products</span>
              <ArrowRight className="w-4 h-4 text-black transition-transform group-hover:translate-x-1" />
            </motion.button>
          </div>
        </motion.div>

        {/* Wide Full-Grid Showcase: All Items Visible Simultaneously */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              onClick={() => onSelectItem?.(item)}
              className="group relative rounded-3xl bg-white border border-stone-200 hover:border-amber-400 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              {/* Top hover accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

              <div>
                {/* Image Stage */}
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full p-4 flex flex-col items-center justify-center bg-stone-100 text-stone-700 text-center">
                      <div className="text-xs font-bold text-amber-700 mb-1">Silver &amp; Gold</div>
                      <div className="text-[11px] font-semibold">{item.title}</div>
                    </div>
                  )}

                  {/* Floating Custom Badge */}
                  {item.badge && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-stone-900/90 text-[#f5be38] border border-[#f5be38]/40 backdrop-blur-md shadow-md">
                        {item.badge}
                      </span>
                    </div>
                  )}

                  {/* Direct Action Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 z-10 pointer-events-none group-hover:pointer-events-auto">
                    <span className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#f5be38] hover:bg-[#ffd15c] text-black font-extrabold text-xs rounded-xl shadow-lg transition-transform hover:scale-105">
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Customize &amp; Order</span>
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-2">
                  <h3 className="font-extrabold text-stone-900 text-[15px] group-hover:text-amber-800 transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Card Price & Action Footer */}
              <div className="p-5 pt-3 border-t border-stone-100 bg-stone-50/80 flex items-center justify-between">
                <span className="text-sm sm:text-base font-black text-amber-700 font-sans">
                  {item.price}
                </span>

                <span className="text-xs font-bold text-stone-500 group-hover:text-stone-900 inline-flex items-center gap-1 transition-colors">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-600 transition-transform group-hover:translate-x-1" />
                </span>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
