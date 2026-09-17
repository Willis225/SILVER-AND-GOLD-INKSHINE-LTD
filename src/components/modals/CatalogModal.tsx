import React, { useState, useMemo } from 'react';
import { 
  X, 
  Search, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink,
  Eye,
  Filter,
  ShoppingBag,
  Clock,
  ArrowDown
} from 'lucide-react';
import { Product } from '../../types/schema';

interface CatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onBookSample: (sampleTitle: string) => void;
  onScrollToPageCatalog?: () => void;
}

// Unified catalog item representation supporting both product models and curated design artworks
interface CatalogItem {
  id: string;
  title: string;
  category: string;
  categoryTag: string;
  imageUrl: string;
  specs: string;
  startingPriceNgn: number;
  turnaround: string;
  description: string;
  badge?: string;
  minQuantity?: number;
  product: Product;
}

// Curated design and architectural artwork samples from the Bayelsa production house
const ARTWORK_SAMPLES = [
  {
    id: 'art-sample-1',
    title: 'Custom Textured Oil & Acrylic Canvas Painting',
    category: 'Canvas Art & Paintings',
    categoryTag: 'paintings',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    specs: 'Gallery Wrapped 380gsm Cotton Canvas, Pine Frame',
    startingPriceNgn: 45000,
    turnaround: '2-3 Days',
    badge: 'Artisan Crafted',
    description: 'Bespoke hand-embellished canvas portraits, executive office landscapes, and vibrant wall art prints.',
    targetProductId: 'prod-frames-floating-canvas',
  },
  {
    id: 'art-sample-2',
    title: '3D Golden Backlit Stainless Steel Channel Lettering',
    category: '3D Signboards & Backlight',
    categoryTag: 'signage',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    specs: 'Gold Titanium Steel, Samsung IP68 LED Modules, Acrylic Face',
    startingPriceNgn: 185000,
    turnaround: '3-4 Days',
    badge: 'Architectural',
    description: 'High-visibility illuminated corporate facade logos for banks, hotels, and prestigious headquarters.',
    targetProductId: 'prod-signage-3d-led-letters',
  },
  {
    id: 'art-sample-3',
    title: 'Teardrop & Feather Flag Display Banner (Double-Sided)',
    category: 'Banners & Flags',
    categoryTag: 'banners',
    imageUrl: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&w=800&q=80',
    specs: '3.5m - 5m Aluminum Pole, Cross Base & Water Bag, Solite Fabric',
    startingPriceNgn: 38000,
    turnaround: '24hr Rush',
    badge: 'Outdoor Weatherproof',
    description: 'Weatherproof outdoor advertising flags built for coastal Bayelsa breezes and nationwide roadshows.',
    targetProductId: 'prod-teardrop-flying-banner',
  },
  {
    id: 'art-sample-4',
    title: 'Heavyweight Custom Rigid Packaging Gift Box with Foil',
    category: 'Boxes & Packaging',
    categoryTag: 'packaging',
    imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
    specs: '1200gsm Rigid Chipboard, Soft Touch Matte Lam, Hot Foil Stamp',
    startingPriceNgn: 1800,
    turnaround: '2-3 Days',
    badge: 'Luxury Finish',
    description: 'Luxury unboxing experience for perfumes, corporate gifting hampers, and retail cosmetics.',
    targetProductId: 'prod-packaging-shipping-cartons',
  },
  {
    id: 'art-sample-5',
    title: 'Diamond-Cut Crystal & Cast Bronze Recognition Award',
    category: 'Awards & Plaques',
    categoryTag: 'awards',
    imageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=80',
    specs: 'K9 Optical Crystal, Solid Polished Walnut Base, UV Color Print',
    startingPriceNgn: 28500,
    turnaround: '24-48 Hours',
    badge: 'Executive',
    description: 'Prestigious merit awards for government valedictory summits, annual general meetings, and milestones.',
    targetProductId: 'prod-awards-crystal-plaque',
  },
  {
    id: 'art-sample-6',
    title: 'Executive Triplex Foil-Edged Business Cards (600gsm)',
    category: 'Luxury Stationery',
    categoryTag: 'stationery',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    specs: '600gsm Cotton Card, Gold Gilded Beveled Edges, Raised Spot UV',
    startingPriceNgn: 18500,
    turnaround: '2 Days',
    badge: 'Ultra Heavyweight',
    description: 'Ultra-thick corporate identity cards with tactile debossing and lustrous gold foil accenting.',
    targetProductId: 'prod-business-cards',
  },
  {
    id: 'art-sample-7',
    title: 'Abstract Geometric Modern Wall Mural & Vinyl Wrap',
    category: 'Canvas Art & Paintings',
    categoryTag: 'paintings',
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    specs: 'Seamless Textured Self-Adhesive Wall Fabric, Eco-Solvent Ink',
    startingPriceNgn: 32000,
    turnaround: '2 Days',
    description: 'Statement interior wall prints and murals transforming boardrooms, reception lounges, and boutique suites.',
    targetProductId: 'prod-frames-floating-canvas',
  },
  {
    id: 'art-sample-8',
    title: 'Corporate Executive VIP Gifting Set in Presentation Case',
    category: 'Corporate Gifts',
    categoryTag: 'gifts',
    imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
    specs: 'Thermal Flask, Metal Pen, Leather Notebook, Metal USB Key',
    startingPriceNgn: 22000,
    turnaround: '2-3 Days',
    badge: 'VIP Box Set',
    description: 'Laser engraved premium merchandise packs for executive stakeholders and conference delegates.',
    targetProductId: 'prod-gift-items-souvenirs',
  },
  {
    id: 'art-sample-9',
    title: 'Luxury Broad-Base Rollup Banner Stand (Tear-Drop Chrome)',
    category: 'Banners & Flags',
    categoryTag: 'banners',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    specs: '85cm x 205cm, Heavy Aluminum Teardrop Base, Padded Carry Bag',
    startingPriceNgn: 34500,
    turnaround: '24hr Rush',
    badge: 'Best Seller',
    description: 'High-stability freestanding banner stand with anti-curl Solite satin print and no folding feet needed.',
    targetProductId: 'prod-rollup-luxury',
  }
];

const CATEGORY_CHIPS = [
  { id: 'all', label: 'All Designs & Products' },
  { id: 'banners', label: 'Banners & Stands' },
  { id: 'stationery', label: 'Business Cards & Stationery' },
  { id: 'packaging', label: 'Boxes & Packaging' },
  { id: 'signage', label: '3D Signs & Channel Letters' },
  { id: 'awards', label: 'Plaques & Awards' },
  { id: 'paintings', label: 'Canvas Paintings & Murals' },
  { id: 'gifts', label: 'Corporate Gifts & Souvenirs' },
  { id: 'apparel', label: 'Apparel & Uniforms' },
];

export const CatalogModal: React.FC<CatalogModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onBookSample,
  onScrollToPageCatalog,
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Build unified, rich catalog dataset combining products and curated artwork samples
  const allCatalogItems = useMemo<CatalogItem[]>(() => {
    // 1. Map standard product catalog items
    const productCatalogItems: CatalogItem[] = products.map((prod) => {
      let categoryTag = 'stationery';
      const cat = prod.category.toLowerCase();
      const id = prod.id.toLowerCase();

      if (
        cat.includes('banner') || 
        cat.includes('advertising') || 
        cat.includes('outdoor') || 
        id.includes('rollup') || 
        id.includes('banner') ||
        id.includes('flag')
      ) {
        categoryTag = 'banners';
      } else if (
        cat.includes('sign') || 
        id.includes('sign') || 
        id.includes('led') || 
        id.includes('channel')
      ) {
        categoryTag = 'signage';
      } else if (
        cat.includes('packag') || 
        cat.includes('sticker') || 
        cat.includes('label') || 
        cat.includes('bag') || 
        cat.includes('carton') || 
        cat.includes('food') ||
        id.includes('packaging') || 
        id.includes('box') || 
        id.includes('sticker')
      ) {
        categoryTag = 'packaging';
      } else if (
        cat.includes('award') || 
        id.includes('award') || 
        id.includes('plaque') || 
        id.includes('trophy')
      ) {
        categoryTag = 'awards';
      } else if (
        cat.includes('frame') || 
        cat.includes('canvas') || 
        id.includes('canvas') || 
        id.includes('frame')
      ) {
        categoryTag = 'paintings';
      } else if (
        cat.includes('gift') || 
        cat.includes('souvenir') || 
        id.includes('gift') || 
        id.includes('notebook')
      ) {
        categoryTag = 'gifts';
      } else if (
        cat.includes('apparel') || 
        cat.includes('uniform') || 
        id.includes('polo') || 
        id.includes('cap') ||
        id.includes('uniform')
      ) {
        categoryTag = 'apparel';
      }

      // Generate a clean summary of technical specifications
      const specsSummary = prod.optionGroups && prod.optionGroups.length > 0
        ? prod.optionGroups.slice(0, 2).map((og) => `${og.name}: ${og.options[0]?.name || ''}`).join(' • ')
        : 'High-Resolution UV Print • Custom Substrate Options';

      return {
        id: prod.id,
        title: prod.name,
        category: prod.categoryLabel || 'Commercial Print',
        categoryTag,
        imageUrl: prod.image,
        specs: specsSummary,
        startingPriceNgn: prod.basePriceNgn,
        turnaround: `${prod.turnaroundDays}d Turnaround`,
        description: prod.shortDescription || prod.description,
        badge: prod.badge,
        minQuantity: prod.minQuantity,
        product: prod,
      };
    });

    // 2. Map curated artwork samples, linking them to a real customizable Product
    const artworkCatalogItems: CatalogItem[] = ARTWORK_SAMPLES.map((sample) => {
      const matchedProduct = 
        products.find((p) => p.id === sample.targetProductId) || 
        products.find((p) => p.category.includes(sample.categoryTag)) || 
        products[0];

      return {
        id: sample.id,
        title: sample.title,
        category: sample.category,
        categoryTag: sample.categoryTag,
        imageUrl: sample.imageUrl,
        specs: sample.specs,
        startingPriceNgn: sample.startingPriceNgn,
        turnaround: sample.turnaround,
        description: sample.description,
        badge: sample.badge,
        minQuantity: 1,
        product: matchedProduct,
      };
    });

    // Combine avoiding duplicate IDs
    const combined = [...productCatalogItems];
    artworkCatalogItems.forEach((art) => {
      if (!combined.some((item) => item.id === art.id)) {
        combined.unshift(art); // Place spotlight artisan designs at the beginning
      }
    });

    return combined;
  }, [products]);

  // Filtered list of catalog items by tag and search keyword
  const filteredItems = useMemo(() => {
    return allCatalogItems.filter((item) => {
      const matchesTag = selectedTag === 'all' || item.categoryTag === selectedTag;
      const q = searchTerm.trim().toLowerCase();
      if (!q) return matchesTag;

      const matchesSearch = 
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.specs.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);

      return matchesTag && matchesSearch;
    });
  }, [allCatalogItems, selectedTag, searchTerm]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 xs:p-3 sm:p-4 bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-6xl h-[95vh] max-h-[900px] my-auto rounded-2xl sm:rounded-3xl bg-[#0d0e12] border border-[#dfbc5e]/30 shadow-2xl flex flex-col text-white overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 shrink-0 bg-gradient-to-r from-[#14151c] via-[#0d0e12] to-[#14151c] flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dfbc5e]/20 border border-[#dfbc5e]/40 text-[#ebd07f] text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Silver &amp; Gold Inkshine Catalog</span>
              </span>
              <span className="text-stone-400 text-xs font-medium">
                {filteredItems.length} Premium Designs &amp; Products Available
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Designs &amp; Print Products Catalog
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm mt-0.5 max-w-2xl">
              Choose from our wide variety of top-quality print designs below and order instantly with automated pricing, custom specs, and nationwide delivery.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onScrollToPageCatalog && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onScrollToPageCatalog();
                }}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-stone-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                title="View on-page product catalog"
              >
                <span>View On Page</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#dfbc5e]" />
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-all active:scale-95 cursor-pointer"
              aria-label="Close catalog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-3 sm:p-4 bg-[#111218] border-b border-white/10 shrink-0 space-y-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search designs by product name, substrate, or keywords (e.g., rollup, business cards, 3D letters, packaging)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-20 py-2 sm:py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs sm:text-sm placeholder:text-stone-500 focus:outline-hidden focus:border-[#dfbc5e] transition-colors"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white text-xs px-2 py-1 rounded bg-white/10 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Chips Scrollbar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORY_CHIPS.map((chip) => {
              const isActive = selectedTag === chip.id;
              const count = chip.id === 'all' 
                ? allCatalogItems.length 
                : allCatalogItems.filter(i => i.categoryTag === chip.id).length;

              return (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => setSelectedTag(chip.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-[#dfbc5e] text-black shadow-md shadow-[#dfbc5e]/30 font-bold'
                      : 'bg-white/5 text-stone-300 hover:bg-white/15 border border-white/10'
                  }`}
                >
                  <span>{chip.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-black/20 text-black' : 'bg-white/10 text-stone-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Catalog Grid Viewport */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0a0a0e]">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group rounded-2xl bg-[#13141b] border border-white/10 hover:border-[#dfbc5e]/60 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-black/70"
                >
                  <div>
                    {/* Image with Badges & Aspect Ratio */}
                    <div className="relative aspect-4/3 w-full bg-black/40 overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                      
                      {/* Category Tag Pill */}
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-bold text-[#ebd07f]">
                        {item.category}
                      </div>

                      {/* Badges */}
                      {item.badge && (
                        <div className="absolute top-2.5 right-2.5">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-amber-600 text-white shadow-xs">
                            {item.badge}
                          </span>
                        </div>
                      )}

                      {/* Turnaround Pill */}
                      <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#dfbc5e]/25 backdrop-blur-sm border border-[#dfbc5e]/50 text-[#ebd07f] text-[10px] font-semibold flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#dfbc5e]" />
                        <span>{item.turnaround}</span>
                      </div>
                    </div>

                    {/* Card Description */}
                    <div className="p-4 space-y-2">
                      <h3 className="font-bold text-white text-sm sm:text-base leading-snug group-hover:text-[#dfbc5e] transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-stone-400 text-xs line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                      
                      {/* Technical Specs Pill */}
                      <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-[11px] text-stone-300 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#dfbc5e] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{item.specs}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Pricing & Instant Order Footer */}
                  <div className="p-4 pt-2 border-t border-white/10 bg-white/[0.01]">
                    <div className="flex items-baseline justify-between py-1 mb-2.5">
                      <div>
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-medium">
                          Starting Price
                        </span>
                        <span className="font-black text-[#dfbc5e] text-base sm:text-lg font-mono">
                          ₦{item.startingPriceNgn.toLocaleString('en-NG')}
                        </span>
                      </div>

                      {item.minQuantity && item.minQuantity > 1 && (
                        <span className="text-[10px] text-stone-400 font-medium">
                          Min: {item.minQuantity} units
                        </span>
                      )}
                    </div>

                    {/* Action Buttons: Order Instantly (Primary) and Quick Specs */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onSelectProduct(item.product);
                        }}
                        className="py-2 px-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b8860b] hover:from-[#e5c158] hover:to-[#d4af37] active:scale-95 text-black font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#d4af37]/25 transition-all cursor-pointer"
                        title="Choose this design and order instantly"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                        <span>Order Instantly</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          if (item.product) {
                            onSelectProduct(item.product);
                          } else {
                            onBookSample(item.title);
                          }
                        }}
                        className="py-2 px-2 rounded-xl bg-white/5 hover:bg-white/15 text-stone-300 hover:text-white border border-white/15 text-xs font-semibold flex items-center justify-center gap-1 active:scale-95 transition-all cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 shrink-0" />
                        <span>Quick Specs</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-stone-400 space-y-3">
              <Layers className="w-12 h-12 mx-auto text-stone-600 mb-2" />
              <p className="font-bold text-white text-base">No designs found matching &ldquo;{searchTerm}&rdquo;</p>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Try searching for other print categories such as banners, cards, stickers, boxes, signs, or plaques.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedTag('all');
                }}
                className="mt-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer with Support & WhatsApp Action */}
        <div className="p-3.5 sm:p-4 bg-[#111218] border-t border-white/10 shrink-0 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#dfbc5e] shrink-0" />
            <span>Need a custom size, painting commission, or bespoke mockup? We produce everything in-house in Yenagoa.</span>
          </div>

          <div className="flex items-center gap-4">
            {onScrollToPageCatalog && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onScrollToPageCatalog();
                }}
                className="text-stone-300 hover:text-[#dfbc5e] font-semibold underline flex items-center gap-1 cursor-pointer"
              >
                <span>Browse on-page catalog</span>
                <ArrowDown className="w-3 h-3" />
              </button>
            )}

            <a
              href="https://wa.me/2347030372539?text=Hello%20Silver%20%26%20Gold%20Inkshine%20Ltd%2C%20I%20am%20viewing%20your%20Catalog%20and%20would%20like%20to%20place%20a%20custom%20order"
              target="_blank"
              rel="noreferrer"
              className="text-[#ebd07f] hover:text-white font-semibold underline flex items-center gap-1 cursor-pointer"
            >
              <span>Inquire on WhatsApp</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
