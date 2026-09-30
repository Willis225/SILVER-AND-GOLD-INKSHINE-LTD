import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  X, 
  ArrowRight, 
  Sparkles, 
  Printer, 
  Layers, 
  Tag, 
  FileText, 
  Calendar, 
  HelpCircle, 
  Building2, 
  ShieldCheck, 
  ChevronRight,
  TrendingUp,
  RotateCcw,
  Check
} from 'lucide-react';
import { ProductCategory, Product } from '../../types/schema';
import { CATEGORIES } from '../layout/Header';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectCategory: (categoryKey: string) => void;
  onSelectProduct?: (productId: string) => void;
  onNavigateToPage?: (page: 'storefront' | 'categories' | 'about' | 'services' | 'order' | 'quote' | 'policies', docKey?: 'terms' | 'privacy' | 'returns') => void;
  products?: Product[];
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  searchQuery,
  onSearchChange,
  onSelectCategory,
  onSelectProduct,
  onNavigateToPage,
  products = []
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const query = searchQuery.trim().toLowerCase();

  // Search in Categories
  const matchedCategories = CATEGORIES.filter(cat => 
    cat.label.toLowerCase().includes(query) || cat.id.toLowerCase().includes(query)
  );

  // Search in Products
  const matchedProducts = products.filter(prod =>
    prod.name.toLowerCase().includes(query) ||
    prod.description?.toLowerCase().includes(query) ||
    prod.category.toLowerCase().includes(query)
  ).slice(0, 6);

  // Search in Main Topics / Pages
  const TOPIC_PAGES = [
    {
      id: 'flyers',
      title: 'Flyer & Handbill Printing',
      keywords: ['flyer', 'flyers', 'handbill', 'marketing', 'pamphlet', 'leaflet'],
      type: 'category' as const,
      categoryKey: 'flyers_handbills',
      desc: 'Full-color A4, A5, DL flyers on 130gsm / 150gsm gloss card'
    },
    {
      id: 'banners',
      title: 'Banners, Roll-Ups & Displays',
      keywords: ['banner', 'banners', 'rollup', 'roll-up', 'flex', 'backdrop', 'stage', 'display', 'feather', 'flag'],
      type: 'category' as const,
      categoryKey: 'banners_stands',
      desc: 'High-resolution vinyl flex banners, rollup stands, and outdoor teardrop flags'
    },
    {
      id: 'cards',
      title: 'Business Cards & Invitations',
      keywords: ['card', 'cards', 'business card', 'complimentary', 'invitation', 'wedding invitation', 'matte', 'gloss'],
      type: 'category' as const,
      categoryKey: 'cards_invitations',
      desc: '300gsm double-sided business cards, executive lamination & gold foil'
    },
    {
      id: 'signage',
      title: 'Signage & 3D Letters',
      keywords: ['sign', 'signage', '3d', 'led', 'letters', 'acrylic', 'illuminated', 'channel', 'billboard', 'outdoor'],
      type: 'category' as const,
      categoryKey: 'signages',
      desc: '3D illuminated channel letters, acrylic reception signs & outdoor fascias'
    },
    {
      id: 'packaging',
      title: 'Packaging & Custom Cartons',
      keywords: ['packaging', 'carton', 'box', 'boxes', 'shipping', 'mailer', 'labels', 'pouch', 'bags'],
      type: 'category' as const,
      categoryKey: 'packaging_shipping_cartons',
      desc: 'Corrugated cartons, mailer boxes, product pouches & custom carrier bags'
    },
    {
      id: 'stickers',
      title: 'Stickers & Product Labels',
      keywords: ['sticker', 'stickers', 'label', 'labels', 'diecut', 'vinyl', 'waterproof', 'bottle'],
      type: 'category' as const,
      categoryKey: 'stickers_labels',
      desc: 'Waterproof vinyl die-cut stickers and high-speed product roll labels'
    },
    {
      id: 'apparel',
      title: 'Branded Clothing & Merchandise',
      keywords: ['apparel', 'shirt', 'shirts', 't-shirt', 'polo', 'cap', 'caps', 'jersey', 'dtf', 'screenprint'],
      type: 'category' as const,
      categoryKey: 'custom_apparels_caps',
      desc: 'Direct-to-Film (DTF) shirts, corporate embroidered polos & event caps'
    },
    {
      id: 'awards',
      title: 'Awards, Plaques & Trophies',
      keywords: ['award', 'awards', 'plaque', 'plaques', 'trophy', 'crystal', 'acrylic award', 'medal'],
      type: 'category' as const,
      categoryKey: 'awards',
      desc: 'Laser-engraved crystal awards, wooden plaques & custom acrylic trophies'
    },
    {
      id: 'gifts',
      title: 'Corporate Gifts & Souvenirs',
      keywords: ['gift', 'gifts', 'souvenir', 'souvenirs', 'mug', 'pen', 'umbrella', 'journal', 'keychain', 'flask', 'bottle'],
      type: 'category' as const,
      categoryKey: 'gift_items_souvenirs',
      desc: 'Custom vacuum flasks, executive notebooks, branded pens & event souvenirs'
    },
    {
      id: 'quote',
      title: 'Free Custom Quote Desk',
      keywords: ['quote', 'custom quote', 'estimate', 'price', 'pricing', 'cost', 'tender', 'bespoke', 'bulk'],
      type: 'page' as const,
      pageKey: 'quote' as const,
      desc: 'Get a tailored quote with itemized breakdown & WhatsApp confirmation'
    },
    {
      id: 'book',
      title: 'Book Online / Order Desk',
      keywords: ['book', 'order', 'book online', 'place order', 'order online', 'upload', 'booking'],
      type: 'page' as const,
      pageKey: 'order' as const,
      desc: 'Fast 4-step online booking with instant WhatsApp order dispatch'
    },
    {
      id: 'about',
      title: 'About Us & Printing Press Facility',
      keywords: ['about', 'facility', 'company', 'press', 'yenagoa', 'bayelsa', 'rc', '1892044', 'offset', 'machine', 'story'],
      type: 'page' as const,
      pageKey: 'about' as const,
      desc: '1,200 sqm commercial production plant in Opolo-Epie, Yenagoa, Bayelsa'
    },
    {
      id: 'refund',
      title: 'Refund Policy & Quality Guarantee',
      keywords: ['refund', 'refunds', 'return', 'reprint', 'defect', 'cancel', 'policy'],
      type: 'page' as const,
      pageKey: 'policies' as const,
      docKey: 'returns' as const,
      desc: 'Zero-defect guarantee, 100% pre-proof refund, free production reprints'
    }
  ];

  const matchedTopics = query.length > 0 ? TOPIC_PAGES.filter(topic =>
    topic.title.toLowerCase().includes(query) ||
    topic.desc.toLowerCase().includes(query) ||
    topic.keywords.some(k => k.toLowerCase().includes(query) || query.includes(k.toLowerCase()))
  ) : [];

  const POPULAR_PILLS = [
    { label: 'Flyers & Handbills', query: 'flyer' },
    { label: 'Banners & Roll-Ups', query: 'banner' },
    { label: 'Business Cards', query: 'business card' },
    { label: '3D Signage', query: 'signage' },
    { label: 'Packaging Boxes', query: 'packaging' },
    { label: 'Stickers & Labels', query: 'sticker' },
    { label: 'Branded Apparel', query: 'apparel' },
    { label: 'Custom Quote', query: 'quote' },
    { label: 'Book Online', query: 'book' },
  ];

  const handleSelectTopic = (topic: typeof TOPIC_PAGES[0]) => {
    onClose();
    if (topic.type === 'category' && topic.categoryKey) {
      onSelectCategory(topic.categoryKey);
    } else if (topic.type === 'page' && topic.pageKey && onNavigateToPage) {
      onNavigateToPage(topic.pageKey, topic.docKey);
    }
  };

  const handleSelectCategoryItem = (catId: string) => {
    onClose();
    onSelectCategory(catId);
  };

  const handleSelectProductItem = (prodId: string) => {
    onClose();
    if (onSelectProduct) {
      onSelectProduct(prodId);
    }
  };

  const handleViewAllResults = () => {
    onClose();
    onSelectCategory('all');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] overflow-y-auto">
          {/* Backdrop with heavy blur and high contrast */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
          />

          {/* Search Palette Container */}
          <div className="min-h-full flex items-start justify-center p-4 sm:p-6 md:pt-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -20 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-3xl bg-[#0c0d12] border border-[#D4AF37]/30 rounded-2xl sm:rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(212,175,55,0.15)] overflow-hidden my-auto"
            >
              
              {/* Gold Top Accent Bar */}
              <div className="h-1 w-full bg-gradient-to-r from-[#b8860b] via-[#ffd25d] to-[#b8860b]" />

              {/* Search Header Bar */}
              <div className="relative p-4 sm:p-6 border-b border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0">
                  <Search className="w-5 h-5 stroke-[2.5]" />
                </div>

                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        if (matchedTopics.length > 0) {
                          handleSelectTopic(matchedTopics[0]);
                        } else if (matchedCategories.length > 0) {
                          handleSelectCategoryItem(matchedCategories[0].id);
                        } else {
                          handleViewAllResults();
                        }
                      }
                    }}
                    placeholder="Search flyers, banners, business cards, signage, quotes..."
                    className="w-full bg-transparent text-white placeholder:text-stone-500 text-base sm:text-lg font-semibold focus:outline-hidden pr-8"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => onSearchChange('')}
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white text-xs font-mono border border-white/10 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>ESC</span>
                </button>
              </div>

              {/* Quick Suggestion Pills Strip */}
              <div className="px-4 sm:px-6 py-3 bg-[#14141a]/60 border-b border-white/5 overflow-x-auto flex items-center gap-2 no-scrollbar">
                <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Popular:</span>
                </div>
                {POPULAR_PILLS.map((pill, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      onSearchChange(pill.query);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 transition-all cursor-pointer border ${
                      query === pill.query.toLowerCase()
                        ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-bold'
                        : 'bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white border-white/10'
                    }`}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>

              {/* Results Body */}
              <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto space-y-6 divide-y divide-white/10">

                {/* ── 1. EXACT MATCHED TOPICS & SERVICES ── */}
                {matchedTopics.length > 0 && (
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Instant Topics &amp; Services ({matchedTopics.length})</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {matchedTopics.map((topic) => (
                        <button
                          key={topic.id}
                          type="button"
                          onClick={() => handleSelectTopic(topic)}
                          className="w-full text-left p-3 rounded-xl bg-white/[0.03] hover:bg-[#D4AF37]/10 border border-white/10 hover:border-[#D4AF37]/50 transition-all flex items-start gap-3 group cursor-pointer"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs sm:text-sm font-bold text-white group-hover:text-[#D4AF37] transition-colors flex items-center justify-between">
                              <span className="truncate">{topic.title}</span>
                              <span className="text-[10px] text-[#D4AF37] font-mono shrink-0 ml-1">JUMP →</span>
                            </div>
                            <p className="text-[11px] text-stone-400 line-clamp-1 mt-0.5">
                              {topic.desc}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── 2. MATCHED PRODUCTS ── */}
                {matchedProducts.length > 0 && (
                  <div className="pt-4 space-y-3">
                    <div className="text-xs font-bold text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Products &amp; Items ({matchedProducts.length})</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {matchedProducts.map((product) => (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => handleSelectProductItem(product.id)}
                          className="w-full text-left p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/10 border border-white/10 transition-all flex items-center gap-3 group cursor-pointer"
                        >
                          {product.imageUrl && (
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-12 h-12 rounded-lg object-cover bg-black shrink-0 border border-white/10"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold text-white group-hover:text-[#D4AF37] truncate">
                              {product.name}
                            </div>
                            <div className="text-[11px] text-[#D4AF37] font-extrabold">
                              ₦{product.basePrice.toLocaleString()}
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-stone-500 group-hover:text-white shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── 3. MATCHED CATEGORIES ── */}
                {matchedCategories.length > 0 && (
                  <div className="pt-4 space-y-3">
                    <div className="text-xs font-bold text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Catalog Categories ({matchedCategories.length})</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {matchedCategories.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => handleSelectCategoryItem(cat.id)}
                          className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-[#D4AF37]/15 text-xs text-stone-200 hover:text-white border border-white/10 hover:border-[#D4AF37]/50 transition-all flex items-center gap-1.5 group cursor-pointer"
                        >
                          <span>{cat.label}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-all" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── NO RESULTS STATE ── */}
                {query.length > 0 && matchedTopics.length === 0 && matchedProducts.length === 0 && matchedCategories.length === 0 && (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-stone-400 mx-auto">
                      <Search className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-white">No direct matches for "{searchQuery}"</h4>
                      <p className="text-xs text-stone-400 max-w-sm mx-auto">
                        Need a custom size, specialty material, or unique fabrication? You can place a quick custom quote request right away.
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          if (onNavigateToPage) onNavigateToPage('quote');
                        }}
                        className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#e5c158] text-black font-extrabold text-xs shadow-md transition-all cursor-pointer"
                      >
                        Request Custom Quote →
                      </button>
                      <button
                        type="button"
                        onClick={handleViewAllResults}
                        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all cursor-pointer"
                      >
                        Browse All Catalog
                      </button>
                    </div>
                  </div>
                )}

                {/* ── DEFAULT STATE (WHEN QUERY IS EMPTY) ── */}
                {query.length === 0 && (
                  <div className="space-y-4">
                    <div className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Quick Navigation &amp; Topics</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {TOPIC_PAGES.slice(0, 8).map((topic) => (
                        <button
                          key={topic.id}
                          type="button"
                          onClick={() => handleSelectTopic(topic)}
                          className="w-full text-left p-3 rounded-xl bg-white/[0.03] hover:bg-[#D4AF37]/10 border border-white/10 hover:border-[#D4AF37]/50 transition-all flex items-start gap-3 group cursor-pointer"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs sm:text-sm font-bold text-white group-hover:text-[#D4AF37] transition-colors flex items-center justify-between">
                              <span className="truncate">{topic.title}</span>
                              <span className="text-[10px] text-[#D4AF37] font-mono shrink-0 ml-1">GO →</span>
                            </div>
                            <p className="text-[11px] text-stone-400 line-clamp-1 mt-0.5">
                              {topic.desc}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Search Palette Footer Bar */}
              <div className="p-3.5 sm:p-4 bg-[#14141a]/90 border-t border-white/10 flex items-center justify-between text-xs text-stone-400">
                <div className="flex items-center gap-3">
                  <span>Press <strong className="text-white font-mono">ENTER</strong> to open</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline">Press <strong className="text-white font-mono">ESC</strong> to exit</span>
                </div>
                <button
                  type="button"
                  onClick={handleViewAllResults}
                  className="text-[#D4AF37] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore Full Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
