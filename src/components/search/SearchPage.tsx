import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  ArrowLeft, 
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
  ShoppingBag,
  Star,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { ProductCategory, Product } from '../../types/schema';
import { CATEGORIES } from '../layout/Header';
import { CompanyLogoMark } from '../common/CompanyLogo';
import { PriceOnRequestBadge } from '../common/PriceOnRequestBadge';

interface SearchPageProps {
  initialQuery?: string;
  onNavigateHome: () => void;
  onSelectCategory: (categoryKey: string) => void;
  onSelectProduct: (product: Product) => void;
  onOpenCustomQuote?: () => void;
  products?: Product[];
}

export const SearchPage: React.FC<SearchPageProps> = ({
  initialQuery = '',
  onNavigateHome,
  onSelectCategory,
  onSelectProduct,
  onOpenCustomQuote,
  products = []
}) => {
  const [query, setQuery] = useState(initialQuery);
  const searchTerm = query.trim().toLowerCase();

  const QUICK_TAGS = [
    'Flyers',
    'Banners',
    'Business Cards',
    '3D Signage',
    'Stickers',
    'Packaging',
    'Apparel',
    'Mugs',
    'Books & Magazines',
    'Awards'
  ];

  const TOPIC_PAGES = [
    {
      id: 'flyers',
      title: 'Flyer & Handbill Printing',
      keywords: ['flyer', 'flyers', 'handbill', 'handbills', 'marketing', 'pamphlet', 'leaflet', 'a4', 'a5', 'dl', 'promo', 'poster', 'print'],
      categoryKey: 'flyers_handbills',
      desc: 'Full-color A4, A5, DL flyers on 130gsm / 150gsm gloss card'
    },
    {
      id: 'banners',
      title: 'Banners, Roll-Ups & Displays',
      keywords: ['banner', 'banners', 'rollup', 'roll-up', 'flex', 'backdrop', 'stage', 'display', 'feather', 'flag', 'stand', 'teardrop', 'x-frame'],
      categoryKey: 'banners_stands',
      desc: 'High-resolution vinyl flex banners, rollup stands, and outdoor teardrop flags'
    },
    {
      id: 'cards',
      title: 'Business Cards & Invitations',
      keywords: ['card', 'cards', 'business card', 'complimentary', 'invitation', 'wedding invitation', 'matte', 'gloss', 'emboss', 'gold foil', 'stationery'],
      categoryKey: 'cards_invitations',
      desc: '300gsm double-sided business cards, executive lamination & gold foil'
    },
    {
      id: 'stationery',
      title: 'Office Stationery & Corporate Branding',
      keywords: ['stationery', 'office', 'letterhead', 'envelope', 'folder', 'receipt', 'invoice', 'cac', 'seal', 'stamp', 'docket', 'id card', 'lanyard', 'corporate'],
      categoryKey: 'office_stationery',
      desc: 'Custom corporate letterheads, presentation folders, stamps & branded envelopes'
    },
    {
      id: 'signage',
      title: 'Signage & 3D Letters',
      keywords: ['sign', 'signage', '3d', 'led', 'letters', 'acrylic', 'illuminated', 'channel', 'billboard', 'outdoor', 'fascia', 'reception', 'directional', 'neon', 'metal'],
      categoryKey: 'signages',
      desc: '3D illuminated channel letters, acrylic reception signs & outdoor fascias'
    },
    {
      id: 'packaging',
      title: 'Packaging & Custom Cartons',
      keywords: ['packaging', 'carton', 'box', 'boxes', 'shipping', 'mailer', 'labels', 'pouch', 'bags', 'cartons', 'food box', 'pizza box', 'kraft'],
      categoryKey: 'packaging_shipping_cartons',
      desc: 'Corrugated cartons, mailer boxes, product pouches & custom carrier bags'
    },
    {
      id: 'stickers',
      title: 'Stickers & Product Labels',
      keywords: ['sticker', 'stickers', 'label', 'labels', 'diecut', 'vinyl', 'waterproof', 'bottle', 'roll label', 'packaging label', 'decal'],
      categoryKey: 'stickers_labels',
      desc: 'Waterproof vinyl die-cut stickers and high-speed product roll labels'
    },
    {
      id: 'apparel',
      title: 'Branded Clothing & Merchandise',
      keywords: ['apparel', 'shirt', 'shirts', 't-shirt', 'tshirt', 'polo', 'cap', 'caps', 'jersey', 'dtf', 'screenprint', 'uniform', 'workwear', 'hoodie', 'hat'],
      categoryKey: 'custom_apparels_caps',
      desc: 'Direct-to-Film (DTF) shirts, corporate embroidered polos & event caps'
    },
    {
      id: 'awards',
      title: 'Awards, Plaques & Trophies',
      keywords: ['award', 'awards', 'plaque', 'plaques', 'trophy', 'crystal', 'acrylic award', 'medal', 'shield', 'wooden plaque', 'recognition', 'star'],
      categoryKey: 'awards',
      desc: 'Laser-engraved crystal awards, wooden plaques & custom acrylic trophies'
    },
    {
      id: 'gifts',
      title: 'Corporate Gifts & Souvenirs',
      keywords: ['gift', 'gifts', 'souvenir', 'souvenirs', 'mug', 'pen', 'umbrella', 'journal', 'keychain', 'flask', 'bottle', 'water bottle', 'powerbank', 'promotional'],
      categoryKey: 'gift_items_souvenirs',
      desc: 'Custom vacuum flasks, executive notebooks, branded pens & event souvenirs'
    },
    {
      id: 'books',
      title: 'Books, Magazines & Catalogues',
      keywords: ['book', 'books', 'magazine', 'magazines', 'catalogue', 'catalog', 'program', 'programme', 'annual report', 'handbook', 'manual', 'exercise book', 'brochure'],
      categoryKey: 'books_magazines',
      desc: 'Annual reports, event programmes, company profiles & perfect-bound magazines'
    }
  ];

  const matchedTopics = searchTerm === '' 
    ? TOPIC_PAGES.slice(0, 8)
    : TOPIC_PAGES.filter(topic => 
        topic.title.toLowerCase().includes(searchTerm) ||
        topic.desc.toLowerCase().includes(searchTerm) ||
        topic.keywords.some(kw => kw.includes(searchTerm))
      );

  const matchedProducts = searchTerm === ''
    ? products.slice(0, 8)
    : products.filter(prod =>
        prod.name.toLowerCase().includes(searchTerm) ||
        prod.description?.toLowerCase().includes(searchTerm) ||
        prod.category.toLowerCase().includes(searchTerm) ||
        prod.categoryLabel?.toLowerCase().includes(searchTerm)
      );

  return (
    <div className="min-h-screen bg-[#08080a] text-stone-200 antialiased selection:bg-[#f5be38]/30 selection:text-white flex flex-col justify-between">
      <div>
        {/* Hero Search Banner */}
        <div className="relative bg-[#0d0e14] border-b border-white/10 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden text-center">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(245,190,56,0.08)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

          <div className="max-w-3xl mx-auto relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[#f5be38] text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-[#f5be38] animate-pulse" />
              <span>Instant Commercial Print Search</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1]">
              Search Products, Signages &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f5be38] via-amber-200 to-white">Print Services</span>
            </h1>

            {/* Big Search Input Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-amber-400" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search flyers, banners, business cards, 3D signs, stickers..."
                autoFocus
                className="w-full bg-[#181822] border-2 border-white/15 focus:border-[#f5be38] rounded-2xl py-4 pl-12 pr-12 text-base text-white placeholder-stone-400 focus:outline-hidden shadow-2xl transition-all"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute inset-y-0 right-4 flex items-center text-stone-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Keyword Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              <span className="text-xs text-stone-400 font-semibold uppercase">Popular:</span>
              {QUICK_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setQuery(tag)}
                  className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                    query.toLowerCase() === tag.toLowerCase()
                      ? 'bg-[#f5be38] text-black shadow-md'
                      : 'bg-white/5 hover:bg-white/10 text-stone-300 border border-white/10'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Search Results Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          
          {/* Matched Categories & Services */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f5be38]" />
                <h2 className="text-lg font-black text-white">
                  Matched Categories &amp; Services ({matchedTopics.length})
                </h2>
              </div>
              <span className="text-xs text-stone-400 font-mono">Click any category to browse catalog</span>
            </div>

            {matchedTopics.length === 0 ? (
              <div className="text-center py-8 text-stone-400 text-xs">
                No matching categories found for &ldquo;{query}&rdquo;. Try another keyword or request a custom quote.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {matchedTopics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => onSelectCategory(topic.categoryKey)}
                    className="p-5 rounded-2xl bg-[#12131a] border border-white/10 hover:border-[#f5be38]/50 text-left transition-all group cursor-pointer flex flex-col justify-between shadow-lg"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#f5be38] bg-[#f5be38]/10 px-2 py-0.5 rounded border border-[#f5be38]/20">
                          Category
                        </span>
                        <ChevronRight className="w-4 h-4 text-stone-500 group-hover:text-[#f5be38] group-hover:translate-x-1 transition-all" />
                      </div>
                      <h3 className="text-base font-bold text-white group-hover:text-[#f5be38] transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-xs text-stone-400 leading-relaxed">
                        {topic.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Matched Products */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f5be38]" />
                <h2 className="text-lg font-black text-white">
                  Matched Products ({matchedProducts.length})
                </h2>
              </div>
              <span className="text-xs text-stone-400 font-mono">Price on Request • Free Pre-Press Audit</span>
            </div>

            {matchedProducts.length === 0 ? (
              <div className="bg-[#12131a] border border-white/10 rounded-3xl p-10 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#f5be38]/10 text-[#f5be38] flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">No specific product items found</h3>
                <p className="text-xs text-stone-400 max-w-md mx-auto">
                  Don&apos;t worry! Silver &amp; Gold Inkshine Ltd produces bespoke print runs for any custom size, material, or finish.
                </p>
                {onOpenCustomQuote && (
                  <button
                    type="button"
                    onClick={onOpenCustomQuote}
                    className="px-6 py-2.5 rounded-xl bg-[#f5be38] hover:bg-[#ffd15c] text-black font-extrabold text-xs shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Request Custom Enterprise Quote</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {matchedProducts.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => onSelectProduct(prod)}
                    className="bg-[#12131a] rounded-3xl border border-white/10 overflow-hidden shadow-xl group hover:border-[#f5be38]/50 transition-all flex flex-col justify-between cursor-pointer"
                  >
                    <div className="relative aspect-4/3 overflow-hidden bg-black/50">
                      <img
                        src={prod.image || '/luxury-rollup-banner-stand.jpg'}
                        alt={prod.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/85 text-[#f5be38] text-[10px] font-black uppercase tracking-wider border border-[#f5be38]/30">
                        {prod.categoryLabel}
                      </div>
                    </div>

                    <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <div className="text-[10px] font-mono text-stone-400">{prod.sku}</div>
                        <h3 className="text-sm font-black text-white group-hover:text-[#f5be38] transition-colors line-clamp-2">
                          {prod.name}
                        </h3>
                        <p className="text-[11px] text-stone-400 line-clamp-2">
                          {prod.shortDescription || prod.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                        <PriceOnRequestBadge theme="dark" size="sm" />
                        <span className="text-xs font-bold text-[#f5be38] group-hover:underline flex items-center gap-1">
                          Configure <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#040406] border-t border-white/15 text-stone-300 py-8 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs sm:text-sm font-medium text-stone-300">
            &copy; {new Date().getFullYear()} <strong className="text-white font-bold">SILVER &amp; GOLD INKSHINE LTD</strong> (RC 1892044). All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
