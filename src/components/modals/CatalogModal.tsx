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
  Filter
} from 'lucide-react';
import { Product } from '../../types/schema';

interface CatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onBookSample: (sampleTitle: string) => void;
}

// Additional high-resolution painting and print samples gallery items
interface ArtworkSample {
  id: string;
  title: string;
  category: string;
  categoryTag: 'paintings' | 'signage' | 'banners' | 'packaging' | 'awards' | 'stationery' | 'gifts';
  imageUrl: string;
  specs: string;
  startingPriceNgn: number;
  turnaround: string;
  description: string;
}

const ARTWORK_SAMPLES: ArtworkSample[] = [
  {
    id: 'art-sample-1',
    title: 'Custom Textured Oil & Acrylic Canvas Painting',
    category: 'Canvas Art & Paintings',
    categoryTag: 'paintings',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    specs: 'Gallery Wrapped 380gsm Cotton Canvas, Pine Frame',
    startingPriceNgn: 45000,
    turnaround: '2-3 Days',
    description: 'Bespoke hand-embellished canvas portraits, executive office landscapes, and vibrant wall art prints.',
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
    description: 'High-visibility illuminated corporate facade logos for banks, hotels, and prestigious headquarters.',
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
    description: 'Weatherproof outdoor advertising flags built for coastal Bayelsa breezes and nationwide roadshows.',
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
    description: 'Luxury unboxing experience for perfumes, corporate gifting hampers, and retail cosmetics.',
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
    description: 'Prestigious merit awards for government valedictory summits, annual general meetings, and milestones.',
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
    description: 'Ultra-thick corporate identity cards with tactile debossing and lustrous gold foil accenting.',
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
    description: 'Laser engraved premium merchandise packs for executive stakeholders and conference delegates.',
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
    description: 'High-stability freestanding banner stand with anti-curl Solite satin print and no folding feet needed.',
  }
];

const CATEGORY_CHIPS = [
  { id: 'all', label: 'All Samples & Artworks' },
  { id: 'paintings', label: 'Paintings & Wall Art' },
  { id: 'signage', label: '3D Signs & Backlight' },
  { id: 'banners', label: 'Rollup & Feather Banners' },
  { id: 'packaging', label: 'Boxes & Labels' },
  { id: 'awards', label: 'Plaques & Awards' },
  { id: 'stationery', label: 'Cards & Stationery' },
  { id: 'gifts', label: 'Corporate Gifts' },
];

export const CatalogModal: React.FC<CatalogModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onBookSample,
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  if (!isOpen) return null;

  // Filtered list of samples
  const filteredSamples = ARTWORK_SAMPLES.filter((item) => {
    const matchesTag = selectedTag === 'all' || item.categoryTag === selectedTag;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.specs.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl h-[92vh] max-h-[850px] my-auto rounded-3xl bg-[#0d0e12] border border-[#dfbc5e]/30 shadow-2xl flex flex-col text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 shrink-0 bg-gradient-to-r from-[#14151c] via-[#0d0e12] to-[#14151c] flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dfbc5e]/20 border border-[#dfbc5e]/40 text-[#ebd07f] text-xs font-bold">
                <Layers className="w-3.5 h-3.5" />
                <span>Silver &amp; Gold Inkshine Catalog</span>
              </span>
              <span className="hidden sm:inline-block text-stone-400 text-xs font-medium">
                {filteredSamples.length} Curated Samples &amp; Artworks
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Sample Gallery &amp; Product Portfolio
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm mt-0.5 hidden xs:block">
              Browse authentic print samples, 3D backlit signs, paintings, and premium corporate packaging.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-all active:scale-95 cursor-pointer shrink-0"
            aria-label="Close catalog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-3 sm:p-4 bg-[#111218] border-b border-white/10 shrink-0 space-y-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search samples by keyword, material (e.g., canvas, backlit, foil, 3D letters)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs sm:text-sm placeholder:text-stone-500 focus:outline-hidden focus:border-[#dfbc5e] transition-colors"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Chips Scrollbar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORY_CHIPS.map((chip) => {
              const isActive = selectedTag === chip.id;
              return (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => setSelectedTag(chip.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#dfbc5e] text-black shadow-md shadow-[#dfbc5e]/30'
                      : 'bg-white/5 text-stone-300 hover:bg-white/15 border border-white/10'
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Catalog Grid Viewport */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0a0a0e]">
          {filteredSamples.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {filteredSamples.map((sample) => (
                <div
                  key={sample.id}
                  className="group rounded-2xl bg-[#13141b] border border-white/10 hover:border-[#dfbc5e]/50 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-black/60"
                >
                  {/* Sample Image with Aspect Ratio and Overlay */}
                  <div className="relative aspect-4/3 w-full bg-black/40 overflow-hidden">
                    <img
                      src={sample.imageUrl}
                      alt={sample.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                    
                    {/* Category Tag Chip */}
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-sm border border-white/15 text-[10px] font-bold text-[#ebd07f]">
                      {sample.category}
                    </div>

                    {/* Turnaround Badge */}
                    <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#dfbc5e]/20 border border-[#dfbc5e]/40 text-[#ebd07f] text-[10px] font-semibold">
                      ⚡ {sample.turnaround}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-white text-sm sm:text-base leading-snug group-hover:text-[#dfbc5e] transition-colors">
                        {sample.title}
                      </h3>
                      <p className="text-stone-400 text-xs line-clamp-2 mt-1.5 leading-relaxed">
                        {sample.description}
                      </p>
                      
                      {/* Technical Specs Pill */}
                      <div className="mt-2.5 p-2 rounded-lg bg-white/5 border border-white/10 text-[11px] text-stone-300 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#dfbc5e] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{sample.specs}</span>
                      </div>
                    </div>

                    {/* Price and Action Footer */}
                    <div className="pt-4 mt-3 border-t border-white/10 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Starts from</span>
                        <span className="font-extrabold text-[#dfbc5e] text-sm sm:text-base">
                          ₦{sample.startingPriceNgn.toLocaleString()}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onBookSample(sample.title);
                        }}
                        className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b8860b] hover:from-[#e5c158] hover:to-[#d4af37] text-black font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-[#d4af37]/20 active:scale-95 transition-all cursor-pointer"
                      >
                        <span>Book Sample</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-stone-400 space-y-2">
              <Layers className="w-10 h-10 mx-auto text-stone-600 mb-2" />
              <p className="font-semibold text-white">No samples found matching &ldquo;{searchTerm}&rdquo;</p>
              <p className="text-xs text-stone-500">Try searching for other terms like canvas, banner, flag, or packaging.</p>
            </div>
          )}
        </div>

        {/* Modal Footer with Support Action */}
        <div className="p-3.5 sm:p-4 bg-[#111218] border-t border-white/10 shrink-0 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#dfbc5e]" />
            <span>Need a custom size, painting commission, or bespoke mockup? We produce everything in-house in Yenagoa.</span>
          </div>

          <a
            href="https://wa.me/2347030372539?text=Hello%20Silver%20%26%20Gold%20Inkshine%20Ltd%2C%20I%20am%20viewing%20your%20Catalog%20and%20would%20like%20a%20custom%20quotation"
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
  );
};
