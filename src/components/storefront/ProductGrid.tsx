import React from 'react';
import { 
  ArrowRight, 
  Clock, 
  Percent, 
  Sparkles, 
  SlidersHorizontal,
  Eye,
  FileCheck
} from 'lucide-react';
import { Product, ProductCategory } from '../../types/schema';
import { CATEGORIES } from '../layout/Header';
import { PriceOnRequestBadge } from '../common/PriceOnRequestBadge';

interface ProductGridProps {
  products: Product[];
  selectedCategory: ProductCategory | 'all';
  onSelectCategory: (cat: ProductCategory | 'all') => void;
  searchQuery: string;
  onOpenQuickView: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onOpenQuickView,
}) => {
  // Helper to check if product matches a category filter
  const isProductInCategory = (prod: Product, catId: ProductCategory | 'all'): boolean => {
    if (catId === 'all') return true;
    if (prod.categoryPlacement) {
      if (prod.categoryPlacement === catId) return true;
      if (catId === 'advertising_materials' && (prod.categoryPlacement === 'banners' || prod.categoryPlacement === 'advertising_materials')) return true;
      if (catId === 'banners_stands' && prod.categoryPlacement === 'banners') return true;
      if (catId === 'outdoor_displays' && prod.categoryPlacement === 'banners') return true;
      if (catId === 'office_stationery' && prod.categoryPlacement === 'stationery') return true;
      if (catId === 'cards_invitations' && prod.categoryPlacement === 'stationery') return true;
      if (catId === 'flyers_handbills' && prod.categoryPlacement === 'flyers') return true;
      if (catId === 'packaging_labels' && prod.categoryPlacement === 'packaging') return true;
      if (catId === 'stickers_labels' && prod.categoryPlacement === 'packaging') return true;
      if (catId === 'food_packaging' && prod.categoryPlacement === 'packaging') return true;
      if (catId === 'packaging_shipping_cartons' && prod.categoryPlacement === 'packaging') return true;
      if (catId === 'paper_bags_tags' && prod.categoryPlacement === 'packaging') return true;
      if (catId === 'signages' && prod.categoryPlacement === 'signage') return true;
      if (catId === 'events_exhibitions' && prod.categoryPlacement === 'events') return true;
      if (catId === 'gift_items_souvenirs' && prod.categoryPlacement === 'gifts') return true;
      if (catId === 'custom_apparels_caps' && prod.categoryPlacement === 'apparel') return true;
      if (catId === 'company_uniforms' && prod.categoryPlacement === 'apparel') return true;
      if (catId === 'awards' && prod.categoryPlacement === 'awards') return true;
    }
    if (prod.category === catId) return true;
    if (catId === 'advertising_materials' && (prod.category === 'banners_displays' || prod.category === 'advertising_materials')) return true;
    if (catId === 'stickers_labels' && (prod.category === 'packaging_labels' || prod.category === 'stickers_labels')) return true;
    if (catId === 'cards_invitations' && (prod.category === 'cards_invitations' || prod.id === 'prod-business-cards')) return true;
    if (catId === 'office_stationery' && (prod.category === 'office_stationery' || prod.category === 'corporate_stationery')) return true;
    if (catId === 'banners_stands' && (prod.category === 'banners_stands' || prod.category === 'banners_displays' || prod.id === 'prod-rollup-luxury' || prod.id === 'prod-standard-rollup')) return true;
    if (catId === 'outdoor_displays' && (prod.category === 'outdoor_displays' || prod.id === 'prod-teardrop-flying-banner')) return true;
    if (catId === 'signages' && (prod.category === 'signages' || prod.category === 'signage')) return true;
    if (catId === 'custom_apparels_caps' && (prod.category === 'custom_apparels_caps' || prod.category === 'apparels' || prod.id === 'prod-corporate-polo')) return true;
    if (catId === 'company_uniforms' && (prod.category === 'company_uniforms' || prod.id === 'prod-corporate-polo')) return true;
    if (catId === 'gift_items_souvenirs' && (prod.category === 'gift_items_souvenirs' || prod.category === 'gifts_souvenirs' || prod.id === 'prod-executive-leather-notebook')) return true;
    if (catId === 'food_packaging' && prod.category === 'food_packaging') return true;
    if (catId === 'packaging_shipping_cartons' && (prod.category === 'packaging_shipping_cartons' || prod.category === 'packaging_labels')) return true;
    if (catId === 'paper_bags_tags' && (prod.category === 'paper_bags_tags' || prod.category === 'packaging_labels')) return true;
    if (catId === 'vehicle_branding' && prod.category === 'vehicle_branding') return true;
    if (catId === 'packages' && prod.category === 'packages') return true;
    return false;
  };

  // Filter products by category and search
  const filteredProducts = products.filter((prod) => {
    if (!prod) return false;
    const matchesCategory = isProductInCategory(prod, selectedCategory);
    const q = String(searchQuery || '').trim().toLowerCase();
    if (!q) return matchesCategory;

    const matchesSearch = 
      String(prod.name || '').toLowerCase().includes(q) ||
      String(prod.shortDescription || '').toLowerCase().includes(q) ||
      String(prod.description || '').toLowerCase().includes(q) ||
      String(prod.categoryLabel || '').toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const formatNaira = (amount?: number | null) => {
    const safe = typeof amount === 'number' && !isNaN(amount) ? amount : Number(amount) || 0;
    return '₦' + Math.round(safe).toLocaleString('en-NG');
  };

  return (
    <section id="products-catalog-section" className="py-12 sm:py-16 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Browse Product Categories</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Featured Corporate Branding & Print Products
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
              High-resolution printing on premium substrates. Configure sizing, cassette stands, and finishing with automated bulk volume pricing.
            </p>
          </div>

          <div className="text-xs text-stone-500 font-medium bg-white border border-stone-200 px-3 py-1.5 rounded-lg shrink-0 self-start md:self-auto">
            Showing <strong className="text-stone-900 font-bold">{filteredProducts.length}</strong> print options
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-300'
            }`}
          >
            All Products ({products.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = products.filter((p) => isProductInCategory(p, cat.id)).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-300'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-stone-800 text-stone-300' : 'bg-stone-100 text-stone-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Query Filter Notice */}
        {searchQuery && (
          <div className="text-xs text-stone-600 bg-amber-50/70 border border-amber-200/80 px-4 py-2 rounded-xl flex items-center justify-between">
            <span>
              Searching for: <strong className="text-stone-900">&quot;{searchQuery}&quot;</strong>
            </span>
            <button
              onClick={() => onSelectCategory('all')}
              className="text-amber-700 font-bold hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 mx-auto flex items-center justify-center">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-stone-900">No print products match your query</h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              We may still print it! Contact our custom quote desk for bespoke corporate orders and large-format architectural billboards.
            </p>
            <a
              href="https://wa.me/2347030372539?text=Hello%20Silver%20%26%20Gold%20Inkshine%2C%20I%20need%20a%20custom%20quote"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#b8860b] hover:text-[#996515] hover:underline"
            >
              Request Custom Quote via WhatsApp
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => {
              const maxDiscount = Math.max(
                0,
                ...product.bulkPricingTiers.map((t) => t.discountPercentage)
              );

              return (
                <article
                  key={product.id}
                  className="bg-white rounded-2xl border border-stone-200 hover:border-amber-500/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    {/* Image & Badges Container */}
                    <div className="relative aspect-4/3 bg-stone-100 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                        {product.badge && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-amber-600 text-white shadow-xs">
                            {product.badge}
                          </span>
                        )}
                        {maxDiscount > 0 && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#b8860b] text-white shadow-xs flex items-center gap-1">
                            <Percent className="w-2.5 h-2.5" />
                            Up to {maxDiscount}% bulk off
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-2 right-2">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-stone-900/80 text-stone-200 backdrop-blur-xs flex items-center gap-1">
                          <Clock className="w-3 h-3 text-amber-400" />
                          {product.turnaroundDays}d TAT
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-3.5 sm:p-5 space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-stone-500 font-medium">
                        <span>{product.categoryLabel}</span>
                        <span className="font-mono text-stone-400">{product.sku}</span>
                      </div>

                      <h3 className="font-bold text-stone-900 text-sm sm:text-base leading-snug group-hover:text-amber-700 transition-colors line-clamp-2">
                        {product.name}
                      </h3>

                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {product.shortDescription}
                      </p>

                      {/* Print Specs Summary Tags */}
                      <div className="pt-2 flex flex-wrap gap-1">
                        {product.optionGroups.slice(0, 2).map((grp) => (
                          <span
                            key={grp.id}
                            className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-medium"
                          >
                            {grp.name}: {grp.options.length} options
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Pricing & CTAs */}
                  <div className="p-3.5 sm:p-5 pt-0 border-t border-stone-100 mt-2">
                    <div className="flex items-center justify-between py-2.5">
                      <div>
                        <span className="text-[10px] text-stone-400 uppercase font-medium block mb-1">
                          Pricing Status
                        </span>
                        <PriceOnRequestBadge theme="light" size="xs" />
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-stone-500 block">
                          Min. Order: {product.minQuantity} {product.minQuantity === 1 ? 'unit' : 'pack'}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => onOpenQuickView(product)}
                        className="py-2 px-2.5 rounded-xl border border-stone-300 hover:border-stone-400 text-stone-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Quick View</span>
                      </button>

                      <button
                        onClick={() => onOpenQuickView(product)}
                        className="py-2 px-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white text-xs font-bold flex items-center justify-center gap-1 shadow-xs transition-colors cursor-pointer"
                      >
                        <span>Configure &amp; Order</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
