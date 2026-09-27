import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, ShoppingBag } from 'lucide-react';
import { Product } from '../../types/schema';
import { getSectionDisplayItems, SectionDisplayItem } from '../../utils/categoryUtils';

export interface GiftItem extends SectionDisplayItem {}

interface BrandedGiftsSectionProps {
  products?: Product[];
  onViewProducts?: () => void;
  onSelectItem?: (item: GiftItem) => void;
}

const DEFAULT_GIFT_ITEMS: GiftItem[] = [
  {
    id: 'gift-water-bottle',
    badge: 'Corporate Gift',
    title: 'Custom Branded Water Bottle Printing in Lagos, Nigeria – Custom & Personalized Bottles',
    price: '₦3,500',
    numericPrice: 3500,
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=700&q=80',
    category: 'gift_items_souvenirs',
  },
  {
    id: 'gift-keychain',
    badge: 'Souvenir Favorite',
    title: 'Key Holder & Keychain Printing in Lagos, Nigeria – Custom Branded Keyholders',
    price: '₦1,000',
    numericPrice: 1000,
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80',
    category: 'gift_items_souvenirs',
  },
  {
    id: 'gift-polo-shirts-10',
    badge: 'Staff Favorite',
    title: 'Executive Embroidered Corporate Polo Shirts (10 pcs)',
    price: '₦58,000',
    numericPrice: 58000,
    imageUrl: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=700&q=80',
    category: 'custom_apparels_caps',
  },
  {
    id: 'gift-polo-caps-bundle',
    badge: 'Top Seller',
    title: 'Custom Branded Polo Shirts & Structured Baseball Caps (Pack of 20 Sets)',
    price: 'Price on Request',
    numericPrice: 0,
    imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=700&q=80',
    category: 'custom_apparels_caps',
  },
];

export const BrandedGiftsSection: React.FC<BrandedGiftsSectionProps> = ({
  products = [],
  onViewProducts,
  onSelectItem,
}) => {
  const displayItems = useMemo(() => {
    return getSectionDisplayItems(
      products,
      ['gift_items_souvenirs', 'custom_apparels_caps', 'paper_bags_tags', 'branding', 'gifts'],
      DEFAULT_GIFT_ITEMS
    );
  }, [products]);

  return (
    <section className="relative text-white py-16 sm:py-24 border-b border-white/10 overflow-hidden bg-[#09090d]">
      {/* Subtle ambient lighting sheen */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[350px] bg-white/[0.03] rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Wide Header Row: Headline, Description & Call to Action with Custom Background Image */}
        <motion.div 
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col lg:flex-row lg:items-end justify-between gap-6 p-6 sm:p-10 rounded-3xl border border-white/15 shadow-2xl overflow-hidden group transition-all duration-300 bg-[#121217]"
        >
          {/* Background Image Layer */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1600&q=80"
              alt="Branded Corporate Gifts & Promotional Items Background"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            {/* High-legibility gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-black/80 backdrop-blur-[1.5px]" />
          </div>

          {/* Top Border Accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-90 z-10" />

          <div className="space-y-3 max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>Promotional Items, Merch &amp; VIP Souvenirs</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              Branded Corporate Gifts &amp; Promotional Items
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-normal">
              Strengthen relationships and keep your brand top of mind with customised corporate gift items from SILVER &amp; GOLD INKSHINE LTD. We print and brand pens, mugs, keychains, notepads, water bottles, face caps, tote bags and more with your company logo, colours and message. Perfect for staff appreciation, client gifts, product launches and corporate events across Nigeria.
            </p>
          </div>

          <div className="shrink-0 relative z-10">
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={onViewProducts}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white hover:bg-stone-200 text-black font-black text-sm rounded-xl shadow-lg border border-white transition-all group cursor-pointer"
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
              className="group relative rounded-3xl bg-[#121217] border border-white/10 hover:border-white/40 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              {/* Top hover accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

              <div>
                {/* Image Stage */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#181820]">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full p-4 flex flex-col items-center justify-center bg-[#181820] text-stone-300 text-center">
                      <div className="text-xs font-bold text-white mb-1">Silver &amp; Gold</div>
                      <div className="text-[11px] font-semibold">{item.title}</div>
                    </div>
                  )}

                  {/* Floating Custom Badge */}
                  {item.badge && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-black/85 text-white border border-white/30 backdrop-blur-md shadow-md">
                        {item.badge}
                      </span>
                    </div>
                  )}

                  {/* Direct Action Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 z-10 pointer-events-none group-hover:pointer-events-auto">
                    <span className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-stone-200 text-black font-extrabold text-xs rounded-xl shadow-lg transition-transform hover:scale-105">
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Customize &amp; Order</span>
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-2">
                  <h3 className="font-extrabold text-white text-[15px] group-hover:text-stone-300 transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Card Price & Action Footer */}
              <div className="p-5 pt-3 border-t border-white/10 bg-[#0e0e13] flex items-center justify-between">
                <span className="text-sm sm:text-base font-black text-white font-sans">
                  {item.price}
                </span>

                <span className="text-xs font-bold text-stone-400 group-hover:text-white inline-flex items-center gap-1 transition-colors">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-white transition-transform group-hover:translate-x-1" />
                </span>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

