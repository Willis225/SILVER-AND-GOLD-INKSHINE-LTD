import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight
} from 'lucide-react';
import { Product, ProductCategory } from '../../types/schema';
import { SAMPLE_PRODUCTS } from '../../data/seedData';

interface BestSellersShowcaseProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onExploreCatalog?: () => void;
}

interface BestSellerItem {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  tag: 'Popular' | 'Bulk Savings' | 'Fast Turnaround' | 'Top Rated' | 'Enterprise Choice';
  specsSummary: string;
  startingPriceNgn: number;
  hidePrice?: boolean;
  priceCustomLabel?: string;
  image: string;
  rating: number;
  reviewCount: number;
  leadTime: string;
}

const CURATED_BEST_SELLERS: BestSellerItem[] = [
  {
    id: 'prod-rollup-banner-luxury',
    name: 'Luxury Rollup Banner Stand (Broad Aluminium Base)',
    category: 'banners_stands',
    categoryLabel: 'Banners & Displays',
    tag: 'Popular',
    specsSummary: '440gsm Solite anti-curl media · Heavy anodized aluminium cartridge · Padded travel carrier',
    startingPriceNgn: 18500,
    image: '/luxury-rollup-banner-stand.jpg',
    rating: 5,
    reviewCount: 68,
    leadTime: '24–48 Hours',
  },
  {
    id: 'prod-embroidered-polos',
    name: 'Executive Embroidered Pique Cotton Polo Shirts',
    category: 'custom_apparels_caps',
    categoryLabel: 'Corporate Apparel',
    tag: 'Enterprise Choice',
    specsSummary: '220gsm combed pique cotton · High-density chest embroidery · Color-fast reactive dyeing',
    startingPriceNgn: 6500,
    image: '/executive-embroidered-polo-shirts.jpg',
    rating: 5,
    reviewCount: 94,
    leadTime: '3–5 Days',
  },
  {
    id: 'prod-corrugated-mailer-cartons',
    name: 'Custom Corrugated Mailer Boxes & Cartons',
    category: 'packaging_shipping_cartons',
    categoryLabel: 'Custom Packaging',
    tag: 'Bulk Savings',
    specsSummary: 'E-flute rigid corrugated board · Full outer photographic CMYK print · Dust flaps & tab lock',
    startingPriceNgn: 450,
    image: '/corrugated-shipping-cartons-mailer-boxes.jpg',
    rating: 5,
    reviewCount: 51,
    leadTime: '3–4 Days',
  },
  {
    id: 'prod-premium-matte-business-cards',
    name: 'Executive Soft-Touch Velvet Business Cards (Double-Sided)',
    category: 'cards_invitations',
    categoryLabel: 'Stationery',
    tag: 'Fast Turnaround',
    specsSummary: '600gsm duplex board · Soft-touch velvet lamination · Optional metallic gold/silver foil',
    startingPriceNgn: 12000,
    image: '/premium-matte-business-cards.jpg',
    rating: 5,
    reviewCount: 112,
    leadTime: '24 Hours',
  },
  {
    id: 'prod-teardrop-feather-banner',
    name: 'Outdoor Teardrop Flying Feather Flag Banner',
    category: 'banners_stands',
    categoryLabel: 'Outdoor Displays',
    tag: 'Popular',
    specsSummary: '110gsm knitted weather-mesh · Fiberglass tension pole set · Water-fillable heavy base',
    startingPriceNgn: 26000,
    image: '/teardrop-flying-feather-banner.jpg',
    rating: 5,
    reviewCount: 39,
    leadTime: '24–48 Hours',
  },
  {
    id: 'prod-vacuum-flask-mug-gift-set',
    name: 'Executive Vacuum Thermal Flask & Coffee Mug Gift Set',
    category: 'gift_items_souvenirs',
    categoryLabel: 'Corporate Gifts',
    tag: 'Enterprise Choice',
    specsSummary: 'Double-wall 304 food-grade stainless steel · Precision fiber-laser engraving · Rigid presentation box',
    startingPriceNgn: 8500,
    image: '/vacuum-flask-coffee-mug-set.jpg',
    rating: 5,
    reviewCount: 76,
    leadTime: '2–3 Days',
  },
  {
    id: 'prod-luxury-kraft-shopping-bags',
    name: 'Custom Branded Kraft Retail & Shopping Bags',
    category: 'paper_bags_tags',
    categoryLabel: 'Bags & Tags',
    tag: 'Fast Turnaround',
    specsSummary: '250gsm virgin kraft art paper · Reinforced base board · Twisted cotton rope handles',
    startingPriceNgn: 420,
    image: '/luxury-kraft-shopping-carrier-bags.jpg',
    rating: 5,
    reviewCount: 47,
    leadTime: '2–3 Days',
  },
  {
    id: 'prod-crystal-award-plaque',
    name: 'Laser-Engraved Crystal & Wooden Award Plaque',
    category: 'awards',
    categoryLabel: 'Awards & Trophies',
    tag: 'Top Rated',
    specsSummary: 'Optical K9 crystal bevelled block · Hardwood mahogany pedestal · Gold metallic plate engraving',
    startingPriceNgn: 28000,
    image: '/crystal-glass-award-plaque.jpg',
    rating: 5,
    reviewCount: 52,
    leadTime: '2 Days',
  },
];

type FilterTab = 'all' | 'banners' | 'apparel' | 'packaging' | 'stationery' | 'gifts';

export const BestSellersShowcase: React.FC<BestSellersShowcaseProps> = ({
  products = [],
  onSelectProduct,
  onExploreCatalog,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');

  const filteredItems = CURATED_BEST_SELLERS.filter((item) => {
    if (activeFilter === 'banners') return item.category === 'banners_stands';
    if (activeFilter === 'apparel') return item.category === 'custom_apparels_caps';
    if (activeFilter === 'packaging') return item.category === 'packaging_shipping_cartons' || item.category === 'paper_bags_tags';
    if (activeFilter === 'stationery') return item.category === 'cards_invitations' || item.category === 'office_stationery';
    if (activeFilter === 'gifts') return item.category === 'gift_items_souvenirs' || item.category === 'awards';
    return true;
  });

  const handleCardClick = (item: BestSellerItem) => {
    const matched =
      products.find(
        (p) =>
          p.id === item.id ||
          p.category === item.category ||
          p.name.toLowerCase().includes(item.name.toLowerCase().split(' ')[0])
      ) ||
      SAMPLE_PRODUCTS.find(
        (p) =>
          p.id === item.id ||
          p.category === item.category ||
          p.name.toLowerCase().includes(item.name.toLowerCase().split(' ')[0])
      ) ||
      products[0] ||
      SAMPLE_PRODUCTS[0];

    if (matched) {
      onSelectProduct(matched);
    }
  };

  return (
    <section 
      aria-label="Best-Selling Commercial Printing Services"
      className="relative bg-[#08080a] text-white py-16 sm:py-20 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-mono font-medium text-[#d4af37] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
              <span>High-Converting Production Line</span>
              <span className="text-stone-600">·</span>
              <span className="text-stone-400">Tested &amp; Dispatched Nationwide</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Featured Services &amp; Best-Sellers
            </h2>
            <p className="text-stone-400 text-sm mt-1 max-w-xl">
              Our highest-demand print specifications. Precision calibrated for corporate identity, trade activations, and high-volume commercial runs.
            </p>
          </div>

          {onExploreCatalog && (
            <button
              type="button"
              onClick={onExploreCatalog}
              className="h-10 px-4 rounded-lg text-sm font-semibold text-stone-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 inline-flex items-center gap-2 transition-colors cursor-pointer self-start md:self-auto shrink-0 shadow-xs"
            >
              <span>Explore Entire Catalog</span>
              <ArrowRight className="w-4 h-4 text-stone-400" />
            </button>
          )}
        </div>

        {/* Filter Tabs Bar (Ergonomic, disciplined h-9 buttons, no pills) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {[
            { id: 'all', label: 'All Best-Sellers' },
            { id: 'banners', label: 'Banners & Displays' },
            { id: 'apparel', label: 'Corporate Apparel' },
            { id: 'packaging', label: 'Packaging & Cartons' },
            { id: 'stationery', label: 'Stationery & Cards' },
            { id: 'gifts', label: 'Gifts & Awards' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id as FilterTab)}
              className={`h-9 px-3.5 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeFilter === tab.id
                  ? 'bg-[#f5be38] text-black font-semibold'
                  : 'bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Best-Sellers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => {
              const tagColors: Record<string, string> = {
                'Popular': 'bg-[#d4af37]/15 text-[#ffd25d] border border-[#d4af37]/30',
                'Bulk Savings': 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/25',
                'Fast Turnaround': 'bg-sky-500/15 text-sky-300 border border-sky-500/25',
                'Top Rated': 'bg-amber-500/15 text-amber-300 border border-amber-500/25',
                'Enterprise Choice': 'bg-purple-500/15 text-purple-300 border border-purple-500/25',
              };

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25, delay: idx * 0.03 }}
                  className="group relative bg-[#0e0f15] hover:bg-[#14151e] border border-white/10 hover:border-[#D4AF37]/50 rounded-lg p-4 sm:p-5 flex flex-col justify-between overflow-hidden shadow-sm transition-colors duration-200"
                >
                  {/* Top Row: Tag badge and Lead Time */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm font-medium ${tagColors[item.tag] || 'bg-white/10 text-white'}`}>
                      {item.tag}
                    </span>
                    <span className="text-[11px] font-mono text-stone-400">
                      ⚡ {item.leadTime}
                    </span>
                  </div>

                  {/* Mockup Container */}
                  <div 
                    onClick={() => handleCardClick(item)}
                    className="relative w-full aspect-4/3 rounded-md bg-black/60 border border-white/5 overflow-hidden mb-3.5 flex items-center justify-center cursor-pointer group-hover:border-[#D4AF37]/30 transition-colors"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.src.includes('luxury-rollup-banner-stand.jpg')) {
                          target.src = '/luxury-rollup-banner-stand.jpg';
                        }
                      }}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>

                  {/* Body Info */}
                  <div className="flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs text-stone-400">
                        <div className="flex text-[#d4af37]">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-[#d4af37]" />
                          ))}
                        </div>
                        <span className="text-[11px] font-mono font-medium text-stone-300">({item.reviewCount})</span>
                      </div>

                      <h3 
                        onClick={() => handleCardClick(item)}
                        className="text-[15px] font-bold text-white group-hover:text-[#f5be38] transition-colors line-clamp-2 leading-snug cursor-pointer"
                      >
                        {item.name}
                      </h3>

                      <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                        {item.specsSummary}
                      </p>
                    </div>

                    {/* Price and Ergonomic Direct CTA Button */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-medium text-stone-400 uppercase tracking-wider">
                          Starting From
                        </span>
                        <span className="text-sm font-bold text-[#ffd25d] font-mono">
                          {item.hidePrice 
                            ? (item.priceCustomLabel || 'Price on Request') 
                            : `₦${item.startingPriceNgn.toLocaleString('en-NG')}`
                          }
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCardClick(item)}
                        className="h-9 px-3.5 rounded-lg text-xs font-semibold text-black bg-[#f5be38] hover:bg-[#e6b12f] inline-flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                      >
                        <span>Configure</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
