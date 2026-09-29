import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Search, 
  Grid, 
  List, 
  MessageCircle, 
  ArrowLeft, 
  ChevronRight, 
  Check, 
  Filter, 
  SlidersHorizontal,
  X,
  Phone,
  ShoppingCart,
  ExternalLink,
  ChevronDown,
  Sparkles,
  CheckCircle2,
  FolderTree
} from 'lucide-react';
import { Product, ProductCategory } from '../../types/schema';
import { ConfirmPriceModal } from './ConfirmPriceModal';
import { RecentPostModal, PostItem } from './RecentPostModal';
import { normalizeCategoryKey } from '../../data/homepageCatalogProducts';
import { PriceOnRequestBadge } from '../common/PriceOnRequestBadge';

// Categories matching exact list from screenshot
export const SCREENSHOT_CATEGORIES: { key: string; label: string }[] = [
  { key: 'advertising_materials', label: 'Advertising Materials' },
  { key: 'awards', label: 'Awards' },
  { key: 'banners_stands', label: 'Banners & Stands' },
  { key: 'books_magazines', label: 'Books & Magazines' },
  { key: 'cards_invitations', label: 'Cards & Invitations' },
  { key: 'carports', label: 'Carports' },
  { key: 'custom_apparels_caps', label: 'Custom Apparels & Caps' },
  { key: 'events_exhibitions', label: 'Events & Exhibitions' },
  { key: 'flyers_handbills', label: 'Flyer & Handbill Printing' },
  { key: 'food_packaging', label: 'Food Packaging' },
  { key: 'frames_wallarts', label: 'Frames & Wall Arts' },
  { key: 'gift_items_souvenirs', label: 'Gift Items & Souvenirs' },
  { key: 'office_stationery', label: 'Office Stationery & Corporate Branding' },
  { key: 'outdoor_displays', label: 'Outdoor Displays' },
  { key: 'packages', label: 'Packages' },
  { key: 'packaging_shipping_cartons', label: 'Packaging and Shipping Cartons' },
  { key: 'paper_bags_tags', label: 'Paper Bags & Tags' },
  { key: 'printing_machines', label: 'Printing Machines' },
  { key: 'signages', label: 'Signages' },
  { key: 'stickers_labels', label: 'Stickers & Labels' },
  { key: 'vehicle_branding', label: 'Vehicle Branding' },
  { key: 'wedding', label: 'Wedding' },
];

// Recent posts matching screenshot
export const RECENT_POSTS_DATA: PostItem[] = [
  {
    id: 'post-1',
    title: 'Heat Press Machine in Nigeria | Buy Quality Heat Transfer',
    date: 'Equipment Guide',
    readTime: '4 min read',
    excerpt: 'Comprehensive guide to commercial heat press machines for t-shirt sublimation, cap transfers, and corporate merchandise in Nigeria.',
  },
  {
    id: 'post-2',
    title: 'How to Make Money as Graphic Designer in Nigeria',
    date: 'Business & Career',
    readTime: '6 min read',
    excerpt: 'Actionable strategies for Nigerian creative designers to monetize prepress artwork setup, brand identity systems, and production commissions.',
  },
  {
    id: 'post-3',
    title: 'Flyer Design in Nigeria | Professional Flyer Printing Nigeria',
    date: 'Print Guide',
    readTime: '3 min read',
    excerpt: 'Essential prepress specifications: 150gsm vs 300gsm art card, CMYK color profiles, and bleed setups for mass marketing distribution.',
  },
  {
    id: 'post-4',
    title: '15 Types of Printing Papers & Their Uses',
    date: 'Paper Specifications',
    readTime: '5 min read',
    excerpt: 'An industry overview of bond paper, gloss art, matte finish card, conqueror textures, kraft packaging, and waterproof substrates.',
  },
  {
    id: 'post-5',
    title: 'How to Print JAMB Results in Nigeria (Phone, PC & CBT Centres)',
    date: 'Practical Guide',
    readTime: '3 min read',
    excerpt: 'Standard operational steps for computer business centers, cybercafes, and individual candidates for high-definition color slip printing.',
  },
];

// Sidebar Products matching screenshot
export const SIDEBAR_WIDGET_PRODUCTS = [
  {
    id: 'sidebar-prod-1',
    name: 'Foot Mat in Nigeria – Custom Branded Door & Entrance Mats',
    price: 'Price on Request',
    priceNum: 0,
    image: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=400&q=80',
    category: 'gift_items_souvenirs',
  },
  {
    id: 'sidebar-prod-2',
    name: 'Custom Branded Center Rug Printing',
    price: 'Price on Request',
    priceNum: 0,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
    category: 'frames_wallarts',
  },
  {
    id: 'sidebar-prod-3',
    name: 'Key Holder & Keychain Printing in Nigeria – Custom Branded Keyholders',
    price: 'Price on Request',
    priceNum: 0,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80',
    category: 'gift_items_souvenirs',
  },
  {
    id: 'sidebar-prod-4',
    name: 'Custom Branded Water Bottle Printing in Nigeria – Custom & Personalized Bottles',
    price: 'Price on Request',
    priceNum: 0,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=400&q=80',
    category: 'gift_items_souvenirs',
  },
];

interface CategoriesPageProps {
  products: Product[];
  initialCategory?: string;
  initialSearchQuery?: string;
  highlightedProductId?: string | null;
  onNavigateHome: () => void;
  onSelectProduct: (product: Product) => void;
  onOpenCart?: () => void;
  cartCount?: number;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({
  products,
  initialCategory = 'all',
  initialSearchQuery = '',
  highlightedProductId = null,
  onNavigateHome,
  onSelectProduct,
  onOpenCart,
  cartCount = 0,
}) => {
  // Navigation & filter states
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string>(() => normalizeCategoryKey(initialCategory || 'all'));
  const [searchKeyword, setSearchKeyword] = useState<string>(initialSearchQuery || '');
  const [searchInput, setSearchInput] = useState<string>(initialSearchQuery || '');
  const [activeHighlightedId, setActiveHighlightedId] = useState<string | null>(highlightedProductId || null);
  const [sortBy, setSortBy] = useState<string>('default');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list'); // Default to list view as in screenshot
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  // Modals
  const [confirmPriceProduct, setConfirmPriceProduct] = useState<Product | null>(null);
  const [selectedPost, setSelectedPost] = useState<PostItem | null>(null);

  // Exact target product selected from homepage
  const highlightedProduct = useMemo(() => {
    if (!activeHighlightedId) return null;
    return products.find((p) => p.id === activeHighlightedId || p.slug === activeHighlightedId) || null;
  }, [products, activeHighlightedId]);

  // Sync if initialCategory or highlightedProductId prop changes
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategoryKey(normalizeCategoryKey(initialCategory));
    }
  }, [initialCategory]);

  useEffect(() => {
    if (highlightedProductId) {
      setActiveHighlightedId(highlightedProductId);
      // Auto-scroll gently into view
      setTimeout(() => {
        const el = document.getElementById('highlighted-product-banner') || document.getElementById('catalog-product-list-view');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 120);
    }
  }, [highlightedProductId]);

  useEffect(() => {
    if (initialSearchQuery !== undefined) {
      setSearchInput(initialSearchQuery);
      setSearchKeyword(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  // Handle live search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchKeyword(searchInput.trim());
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setSearchKeyword('');
    setCurrentPage(1);
  };

  // Filter products by category and keyword
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (!p) return false;
      // 1. Category check
      if (selectedCategoryKey !== 'all') {
        const pCat = String(p.category || '').toLowerCase();
        const pPlacement = String(p.categoryPlacement || '').toLowerCase();
        const pName = String(p.name || '').toLowerCase();
        const sKey = String(selectedCategoryKey || '').toLowerCase();
        
        // Exact match or related prefix
        let matchesCategory = 
          pCat === sKey || 
          pPlacement === sKey || 
          pCat.includes(sKey) ||
          pName.includes(sKey.replace(/_/g, ' '));

        if (!matchesCategory) {
          if (sKey === 'books_magazines') {
            matchesCategory = pCat.includes('book') || pCat.includes('magazine') || pCat.includes('annual') ||
              pName.includes('annual report') || pName.includes('book') || pName.includes('handbook') || pName.includes('catalogue') || pName.includes('magazine');
          } else if (sKey === 'cards_invitations') {
            matchesCategory = pCat.includes('card') || pCat.includes('invitation') ||
              pName.includes('business card') || pName.includes('plastic card') || pName.includes('card') || pName.includes('invitation');
          } else if (sKey === 'advertising_materials') {
            matchesCategory = pCat.includes('advertising') || pCat.includes('banner') || pPlacement === 'banners' ||
              pName.includes('advertising') || pName.includes('poster');
          } else if (sKey === 'banners_stands') {
            matchesCategory = pCat.includes('banner') || pCat.includes('stand') || pPlacement === 'banners' ||
              pName.includes('banner') || pName.includes('rollup') || pName.includes('teardrop') || pName.includes('flag') || pName.includes('backdrop');
          } else if (sKey === 'flyers_handbills') {
            matchesCategory = pCat.includes('flyer') || pCat.includes('handbill') || pPlacement === 'flyers' ||
              pName.includes('flyer') || pName.includes('handbill') || pName.includes('poster') || pName.includes('brochure');
          } else if (sKey === 'office_stationery') {
            matchesCategory = pCat.includes('stationery') || pCat.includes('office') || pPlacement === 'stationery' ||
              pName.includes('stationery') || pName.includes('letterhead') || pName.includes('envelope') || pName.includes('stamp') || pName.includes('certificate');
          } else if (sKey === 'packaging_shipping_cartons') {
            matchesCategory = pCat.includes('carton') || pCat.includes('packaging') || pCat.includes('shipping') || pPlacement === 'packaging' ||
              pName.includes('carton') || pName.includes('shipping') || pName.includes('box') || pName.includes('pouch');
          } else if (sKey === 'paper_bags_tags') {
            matchesCategory = pCat.includes('bag') || pCat.includes('tag') ||
              pName.includes('paper bag') || pName.includes('souvenir bag') || pName.includes('jute bag') || pName.includes('hang tag') || pName.includes('drawstring bag');
          } else if (sKey === 'food_packaging') {
            matchesCategory = pCat.includes('food') || pName.includes('ice cream') || pName.includes('food') || pName.includes('cup') || pName.includes('takeaway');
          } else if (sKey === 'stickers_labels') {
            matchesCategory = pCat.includes('sticker') || pCat.includes('label') ||
              pName.includes('sticker') || pName.includes('label');
          } else if (sKey === 'signages') {
            matchesCategory = pCat.includes('sign') || pPlacement === 'signage' ||
              pName.includes('sign') || pName.includes('3d sign') || pName.includes('led') || pName.includes('directional');
          } else if (sKey === 'events_exhibitions') {
            matchesCategory = pCat.includes('event') || pCat.includes('exhibition') || pPlacement === 'events' ||
              pName.includes('event') || pName.includes('spin wheel') || pName.includes('exhibition') || pName.includes('booth');
          } else if (sKey === 'custom_apparels_caps') {
            matchesCategory = pCat.includes('apparel') || pCat.includes('cap') || pCat.includes('shirt') || pCat.includes('uniform') ||
              pName.includes('t-shirt') || pName.includes('cap') || pName.includes('shirt') || pName.includes('hoodie');
          } else if (sKey === 'gift_items_souvenirs') {
            matchesCategory = pCat.includes('gift') || pCat.includes('souvenir') || pPlacement === 'gifts' ||
              pName.includes('gift') || pName.includes('souvenir') || pName.includes('wristband') || pName.includes('keychain') || pName.includes('pop socket') || pName.includes('bottle') || pName.includes('mat');
          } else if (sKey === 'awards') {
            matchesCategory = pCat.includes('award') || pCat.includes('plaque') || pCat.includes('trophy') || pPlacement === 'awards' ||
              pName.includes('award') || pName.includes('plaque') || pName.includes('trophy') || pName.includes('medal');
          } else if (sKey === 'frames_wallarts') {
            matchesCategory = pCat.includes('frame') || pCat.includes('canvas') || pPlacement === 'paintings' ||
              pName.includes('frame') || pName.includes('wall art') || pName.includes('canvas') || pName.includes('center rug');
          } else if (sKey === 'printing_machines') {
            matchesCategory = pCat.includes('machine') || pPlacement === 'machines' ||
              pName.includes('machine') || pName.includes('printer') || pName.includes('press');
          } else if (sKey === 'carports') {
            matchesCategory = pCat.includes('carport') || pName.includes('carport');
          } else if (sKey === 'outdoor_displays') {
            matchesCategory = pCat.includes('outdoor') || pCat.includes('display') || pName.includes('billboard') || pName.includes('outdoor');
          } else if (sKey === 'packages') {
            matchesCategory = pCat.includes('package') || pName.includes('bundle') || pName.includes('package');
          } else if (sKey === 'vehicle_branding') {
            matchesCategory = pCat.includes('vehicle') || pCat.includes('car') || pName.includes('vehicle') || pName.includes('car wrap');
          } else if (sKey === 'wedding') {
            matchesCategory = pCat.includes('wedding') || pName.includes('wedding') || pName.includes('bridal');
          }
        }

        if (!matchesCategory) return false;
      }

      // 2. Search keyword check
      if (searchKeyword) {
        const kw = String(searchKeyword || '').trim().toLowerCase();
        const matchesKeyword = 
          String(p.name || '').toLowerCase().includes(kw) ||
          String(p.description || '').toLowerCase().includes(kw) ||
          String(p.shortDescription || '').toLowerCase().includes(kw) ||
          String(p.sku || '').toLowerCase().includes(kw) ||
          String(p.categoryLabel || '').toLowerCase().includes(kw);
        
        if (!matchesKeyword) return false;
      }

      return true;
    });
  }, [products, selectedCategoryKey, searchKeyword]);

  // Sort products & place the selected product at index 0 (top of page)
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.basePriceNgn - b.basePriceNgn);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.basePriceNgn - a.basePriceNgn);
    } else if (sortBy === 'latest') {
      list.reverse();
    }

    // Pin the highlighted product to the very top so the user immediately sees what they clicked on
    if (activeHighlightedId) {
      const targetIndex = list.findIndex(
        (p) => p.id === activeHighlightedId || p.slug === activeHighlightedId
      );
      if (targetIndex > 0) {
        const [target] = list.splice(targetIndex, 1);
        list.unshift(target);
      } else if (targetIndex === -1 && highlightedProduct) {
        // If not in current category filter, insert at top so user never loses sight of their clicked item
        list.unshift(highlightedProduct);
      }
    }

    return list;
  }, [filteredProducts, sortBy, activeHighlightedId, highlightedProduct]);

  // Pagination calculations
  const totalResults = sortedProducts.length;
  const totalPages = Math.ceil(totalResults / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalResults);
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  // Helper for active category display name
  const currentCategoryLabel = useMemo(() => {
    if (selectedCategoryKey === 'all') return 'All Categories';
    const found = SCREENSHOT_CATEGORIES.find((c) => c.key === selectedCategoryKey);
    return found ? found.label : selectedCategoryKey.replace(/_/g, ' ');
  }, [selectedCategoryKey]);

  const handleSelectCategory = (catKey: string) => {
    setSelectedCategoryKey(catKey);
    setCurrentPage(1);
    setMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatPrice = (_val?: number) => {
    return 'Price on Request';
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-stone-200 font-sans selection:bg-[#f5be38] selection:text-black bg-grid-pattern">
      {/* 1. Top Breadcrumb & Page Bar */}
      <div className="border-b border-white/10 bg-[#0d0e14]/90 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          {/* Breadcrumb path */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-400">
            <button
              onClick={onNavigateHome}
              className="font-medium text-stone-300 hover:text-[#f5be38] transition-colors cursor-pointer flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#f5be38]" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
            <span 
              onClick={() => handleSelectCategory('all')} 
              className={`cursor-pointer ${selectedCategoryKey === 'all' ? 'font-bold text-[#f5be38]' : 'text-stone-300 hover:text-white'}`}
            >
              Categories
            </span>
            {selectedCategoryKey !== 'all' && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
                <span className="font-bold text-white truncate max-w-[200px] sm:max-w-xs">
                  {currentCategoryLabel}
                </span>
              </>
            )}
          </div>

          {/* Quick Actions (Call, WhatsApp, Cart) */}
          <div className="flex items-center gap-3">

            <a
              href="https://wa.me/2347030372539?text=Hello%20Silver%20and%20Gold%20Inkshine,%20I%20am%20browsing%20the%20categories%20page%20and%20need%20assistance"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#f5be38]/10 text-[#f5be38] border border-[#f5be38]/30 text-xs font-bold hover:bg-[#f5be38]/20 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-[#f5be38] stroke-none" />
              <span>WhatsApp: 07030372539</span>
            </a>

            {onOpenCart && (
              <button
                onClick={onOpenCart}
                className="relative p-2 text-stone-300 hover:text-[#f5be38] hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                title="View cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#f5be38] text-black font-extrabold text-[10px] flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </button>
            )}

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="md:hidden flex items-center gap-1.5 px-3 py-1.5 bg-[#f5be38] text-black rounded-lg text-xs font-black cursor-pointer shadow-md"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Browse Categories</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Body Container: Two Columns (Left Sidebar + Right Products) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
          
          {/* ========================================================== */}
          {/* LEFT SIDEBAR (Search, Browse by Category, Recent Posts, Products) */}
          {/* ========================================================== */}
          <aside 
            className={`w-full md:w-64 lg:w-72 shrink-0 space-y-8 ${
              mobileSidebarOpen ? 'block' : 'hidden md:block'
            }`}
          >
            {/* Search Box Widget */}
            <div className="space-y-2 p-4 rounded-2xl bg-[#121217] border border-white/10 shadow-lg">
              <label htmlFor="cat-search-input" className="block text-xs font-bold uppercase tracking-wider text-stone-300">
                Search
              </label>
              <form onSubmit={handleSearchSubmit} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    id="cat-search-input"
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search products..."
                    className="w-full px-3 py-2 text-sm bg-[#181822] border border-white/15 rounded-lg focus:outline-hidden focus:border-[#f5be38] text-white placeholder:text-stone-500"
                  />
                  {searchInput && (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-[#f5be38] hover:bg-[#ffd15c] text-black text-xs font-black rounded-lg transition-colors cursor-pointer shadow-md"
                >
                  Search
                </button>
              </form>
              {searchKeyword && (
                <div className="flex items-center justify-between text-xs text-stone-400 pt-1">
                  <span>Filtered: "{searchKeyword}"</span>
                  <button 
                    onClick={handleClearSearch}
                    className="text-[#f5be38] font-bold underline cursor-pointer"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>

            {/* Browse by Category Widget */}
            <div className="p-4 rounded-2xl bg-[#121217] border border-white/10 shadow-lg">
              <h2 className="text-sm font-black text-white tracking-wide uppercase pb-2.5 border-b border-white/10 flex items-center justify-between">
                <span>Browse by Category</span>
                <span className="w-2 h-2 rounded-full bg-[#f5be38]"></span>
              </h2>
              <ul className="mt-3 space-y-1 text-sm text-stone-300 max-h-[420px] overflow-y-auto pr-1">
                {/* All Categories item */}
                <li key="cat-all">
                  <button
                    onClick={() => handleSelectCategory('all')}
                    className={`w-full text-left py-1.5 px-2 rounded-lg transition-colors flex items-center justify-between group cursor-pointer ${
                      selectedCategoryKey === 'all'
                        ? 'font-bold text-[#f5be38] bg-white/10'
                        : 'hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${selectedCategoryKey === 'all' ? 'bg-[#f5be38]' : 'bg-stone-600 group-hover:bg-[#f5be38]'}`} />
                      <span>All Categories</span>
                    </span>
                    <span className="text-xs text-stone-500">({products.length})</span>
                  </button>
                </li>

                {/* 22 Screenshot Categories */}
                {SCREENSHOT_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategoryKey === cat.key;
                  return (
                    <li key={cat.key}>
                      <button
                        onClick={() => handleSelectCategory(cat.key)}
                        className={`w-full text-left py-1.5 px-2 rounded-lg transition-colors flex items-center justify-between group cursor-pointer ${
                          isSelected
                            ? 'font-bold text-[#f5be38] bg-white/10'
                            : 'hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#f5be38]' : 'bg-stone-600 group-hover:bg-[#f5be38]'}`} />
                          <span className="leading-snug">{cat.label}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Recent Posts Widget */}
            <div className="p-4 rounded-2xl bg-[#121217] border border-white/10 shadow-lg">
              <h3 className="text-sm font-black text-white tracking-wide uppercase pb-2.5 border-b border-white/10">
                Recent Posts
              </h3>
              <ul className="mt-3 space-y-3 text-xs text-stone-300">
                {RECENT_POSTS_DATA.map((post) => (
                  <li key={post.id} className="leading-snug">
                    <button
                      type="button"
                      onClick={() => setSelectedPost(post)}
                      className="text-left font-medium text-stone-300 hover:text-[#f5be38] transition-colors cursor-pointer block"
                    >
                      {post.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* PRODUCTS Widget (Mini Thumbnails from screenshot) */}
            <div className="p-4 rounded-2xl bg-[#121217] border border-white/10 shadow-lg">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white pb-2.5 border-b border-white/10">
                PRODUCTS
              </h3>
              <div className="mt-4 space-y-3.5">
                {SIDEBAR_WIDGET_PRODUCTS.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-start gap-3 group cursor-pointer p-1.5 rounded-xl hover:bg-white/5 transition-colors"
                    onClick={() => {
                      const existing = products.find((p) => p.name.includes(item.name.substring(0, 15)));
                      if (existing) {
                        onSelectProduct(existing);
                      } else {
                        setConfirmPriceProduct({
                          id: item.id,
                          sku: 'INK-SB-01',
                          name: item.name,
                          slug: 'custom-branded-item',
                          category: item.category as ProductCategory,
                          categoryLabel: 'Custom Printing',
                          shortDescription: item.name,
                          description: item.name,
                          basePriceNgn: item.priceNum,
                          minQuantity: 1,
                          turnaroundDays: 2,
                          image: item.image,
                          optionGroups: [],
                          bulkPricingTiers: [],
                          artworkRequirements: { recommendedDpi: 300, supportedFormats: ['PDF', 'CDR'], bleedMarginMm: 3, maxFileSizeMb: 50 }
                        });
                      }
                    }}
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-black/40 border border-white/10 shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-medium text-stone-200 leading-snug group-hover:text-[#f5be38] transition-colors line-clamp-2">
                        {item.name}
                      </h4>
                      <div className="text-xs font-extrabold text-[#f5be38] mt-1">
                        {item.price}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </aside>

          {/* ========================================================== */}
          {/* RIGHT COLUMN: Results Bar, Sort, View Mode, Product List */}
          {/* ========================================================== */}
          <main className="flex-1 min-w-0">
            {/* Top Controls Bar matching screenshot */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-white/10">
              {/* Results count (e.g. Showing 1-16 of 170 results) */}
              <div className="text-xs sm:text-sm text-stone-400">
                {totalResults > 0 ? (
                  <span>
                    Showing <strong className="text-white">{startIndex + 1}–{endIndex}</strong> of <strong className="text-white">{totalResults}</strong> results
                  </span>
                ) : (
                  <span>No products found for this criteria</span>
                )}
              </div>

              {/* Sorting & Grid/List View Controls */}
              <div className="flex items-center gap-3 self-end sm:self-auto">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none text-xs sm:text-sm py-1.5 pl-3 pr-8 bg-[#121217] border border-white/15 rounded-lg text-white focus:outline-hidden focus:border-[#f5be38] cursor-pointer"
                  >
                    <option value="default">Default sorting</option>
                    <option value="popularity">Sort by popularity</option>
                    <option value="latest">Sort by latest</option>
                    <option value="price-low">Sort by price: low to high</option>
                    <option value="price-high">Sort by price: high to low</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Grid & List View Toggle Icons */}
                <div className="flex items-center border border-white/15 rounded-lg overflow-hidden bg-[#121217]">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition-colors cursor-pointer ${
                      viewMode === 'grid' 
                        ? 'bg-[#f5be38] text-black' 
                        : 'text-stone-400 hover:text-white hover:bg-white/10'
                    }`}
                    title="Grid view"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('list')}
                    className={`p-2 transition-colors cursor-pointer ${
                      viewMode === 'list' 
                        ? 'bg-[#f5be38] text-black' 
                        : 'text-stone-400 hover:text-white hover:bg-white/10'
                    }`}
                    title="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Highlighted Banner if navigating from homepage */}
            {highlightedProduct && (
              <div id="highlighted-product-banner" className="mb-6 p-4 sm:p-5 bg-gradient-to-r from-[#181824] to-[#121217] border-2 border-[#f5be38] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-[0_0_25px_rgba(245,190,56,0.15)] animate-fadeIn">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-black/50 border border-[#f5be38]/50 shrink-0 shadow-sm">
                    <img src={highlightedProduct.image} alt={highlightedProduct.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#f5be38] uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-[#f5be38] animate-pulse" />
                      <span>Viewing Selected Item from Homepage</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white truncate mt-0.5">
                      {highlightedProduct.name}
                    </h3>
                    <p className="text-xs text-stone-400 mt-0.5">
                      Showing this item below together with all other designs &amp; options available in <span className="font-bold text-[#f5be38]">{currentCategoryLabel}</span>.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => onSelectProduct(highlightedProduct)}
                    className="px-4 py-2 bg-[#f5be38] hover:bg-[#ffd15c] text-black text-xs font-black rounded-lg shadow-md transition-colors cursor-pointer"
                  >
                    Configure &amp; Order
                  </button>
                  <button
                    onClick={() => setActiveHighlightedId(null)}
                    className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                    title="Dismiss highlight"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Empty State */}
            {currentProducts.length === 0 && (
              <div className="p-12 text-center bg-[#121217] rounded-2xl border border-white/10">
                <p className="text-base font-semibold text-white">No products matching your selection.</p>
                <p className="text-xs text-stone-400 mt-1">Try clearing your search query or selecting a different category from the sidebar.</p>
                <button
                  onClick={() => {
                    setSelectedCategoryKey('all');
                    setSearchKeyword('');
                    setSearchInput('');
                  }}
                  className="mt-4 px-5 py-2.5 bg-[#f5be38] text-black text-xs font-black rounded-xl hover:bg-[#ffd15c] transition-colors cursor-pointer shadow-md"
                >
                  View All Products
                </button>
              </div>
            )}

            {/* ========================================================== */}
            {/* 1. LIST VIEW (Exact replica of the uploaded image layout)  */}
            {/* ========================================================== */}
            {viewMode === 'list' && (
              <div id="catalog-product-list-view" className="space-y-10 sm:space-y-14">
                {currentProducts.map((product, pIndex) => {
                  const isHighlighted = Boolean(
                    activeHighlightedId && (product.id === activeHighlightedId || product.slug === activeHighlightedId)
                  );
                  const formattedPrice = formatPrice(product.basePriceNgn);
                  
                  // Extract or construct 4-6 bullet specs with checkmarks
                  const specs = [
                    '300 DPI High-Definition Commercial Printing',
                    'Direct Prepress & Artwork Verification',
                    'Fast Turnaround & Express Options',
                    'Doorstep Delivery Across Nigeria',
                  ];

                  // Specific custom checks for known products matching screenshot
                  const pNameLower = String(product.name || '').toLowerCase();
                  const isPhotoBooth = pNameLower.includes('360 photo');
                  const isSignage = pNameLower.includes('3d signs') || pNameLower.includes('signage');
                  const isExerciseBook = pNameLower.includes('exercise book');
                  const isPoster = pNameLower.includes('poster');

                  let dynamicSpecs = specs;
                  if (isPhotoBooth) {
                    dynamicSpecs = [
                      '360° Video Experience',
                      'Weddings & Birthday Parties',
                      'Corporate & Brand Activations',
                      'Custom Video Branding',
                      'Social Media-Friendly Videos',
                      'Event Setup',
                    ];
                  } else if (isSignage) {
                    dynamicSpecs = [
                      '3D Logo Signs & Letters',
                      '3D Acrylic & Brushed Metal',
                      'Weatherproof Exterior & Interior',
                      'Backlit LED Illumination',
                      'Nationwide Installation Support',
                    ];
                  } else if (isExerciseBook) {
                    dynamicSpecs = [
                      '40 & 60 Leaves Options',
                      '250gsm Art Card Full-Color Cover',
                      'Quality Ruled Writing Paper',
                      'Custom School & Corporate Branding',
                      'Doorstep Delivery Across Nigeria',
                    ];
                  } else if (isPoster) {
                    dynamicSpecs = [
                      'High-Definition 300 DPI Art Paper',
                      'A1 Standard Large Dimension',
                      'Gloss or Satin Matte Finishing',
                      'Fast Delivery, Order Today!',
                    ];
                  }

                  return (
                    <React.Fragment key={product.id}>
                      <div 
                        className={`flex flex-col sm:flex-row items-start gap-6 lg:gap-10 pb-10 sm:pb-14 border-b border-white/10 last:border-b-0 transition-all ${
                          isHighlighted 
                            ? 'bg-[#181824] p-5 sm:p-7 rounded-2xl border-2 border-[#f5be38] shadow-[0_0_25px_rgba(245,190,56,0.15)]' 
                            : ''
                        }`}
                      >
                        {/* Left: Product Image */}
                        <div className="w-full sm:w-64 lg:w-72 shrink-0 aspect-4/3 sm:aspect-square bg-[#121217] rounded-xl overflow-hidden border border-white/10 group cursor-pointer relative"
                          onClick={() => onSelectProduct(product)}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                          {isHighlighted ? (
                            <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 text-[10px] font-black bg-[#f5be38] text-black rounded-md shadow-md uppercase tracking-wider flex items-center gap-1">
                              <Sparkles className="w-2.5 h-2.5" />
                              Selected Item
                            </span>
                          ) : product.badge ? (
                            <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 text-[10px] font-black bg-[#f5be38] text-black rounded-md shadow-md uppercase tracking-wider">
                              {product.badge}
                            </span>
                          ) : null}
                        </div>

                        {/* Right: Product Details matching screenshot */}
                        <div className="flex-1 min-w-0 space-y-3">
                          {isHighlighted && (
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f5be38]/15 text-[#f5be38] text-xs font-bold border border-[#f5be38]/30">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#f5be38]" />
                              <span>Exact Match from Homepage Showcase</span>
                            </div>
                          )}

                          {/* Title */}
                          <h3 
                            onClick={() => onSelectProduct(product)}
                            className="text-lg sm:text-xl font-bold text-white leading-snug hover:text-[#f5be38] transition-colors cursor-pointer"
                          >
                            {product.name}
                          </h3>

                          {/* Price Tag - Standardized Exact Design */}
                          <div className="pt-0.5">
                            <PriceOnRequestBadge theme="dark" size="sm" />
                          </div>

                          {/* Description Text */}
                          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-2xl">
                            {product.description || product.shortDescription}
                          </p>

                          {/* Bullet Specs with Gold Checkmark */}
                          <div className="space-y-1.5 py-1">
                            {dynamicSpecs.map((spec, sIdx) => (
                              <div key={sIdx} className="flex items-center gap-2 text-xs sm:text-sm text-stone-200">
                                <Check className="w-3.5 h-3.5 text-[#f5be38] stroke-[2.5] shrink-0" />
                                <span>{spec}</span>
                              </div>
                            ))}
                          </div>

                          {/* Uniform Action Buttons */}
                          <div className="pt-2 flex flex-wrap items-center gap-3">
                            <button
                              type="button"
                              onClick={() => setConfirmPriceProduct(product)}
                              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#f5be38] hover:bg-[#ffd15c] text-black font-black text-xs sm:text-sm shadow-lg shadow-[#f5be38]/20 transition-all cursor-pointer"
                            >
                              <MessageCircle className="w-4 h-4 fill-black stroke-none" />
                              <span>Confirm Price</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => onSelectProduct(product)}
                              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm border border-white/15 shadow-sm transition-colors cursor-pointer"
                            >
                              <span>Configure &amp; Book</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Helpful divider separating the clicked item from other items in the same category */}
                      {pIndex === 0 && isHighlighted && currentProducts.length > 1 && (
                        <div className="py-3 px-4 bg-[#121217] border border-white/10 rounded-xl flex items-center justify-between text-xs text-stone-300">
                          <span className="font-semibold text-white flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#f5be38] inline-block"></span>
                            More Designs &amp; Products in {currentCategoryLabel} ({currentProducts.length - 1} other options)
                          </span>
                          <span className="text-stone-400 text-[11px] hidden sm:inline">Browse alternatives below</span>
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            )}

            {/* ========================================================== */}
            {/* 2. GRID VIEW (Modern Clean Card Grid when toggled)       */}
            {/* ========================================================== */}
            {viewMode === 'grid' && (
              <div id="catalog-product-list-view" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProducts.map((product) => {
                  const isHighlighted = Boolean(
                    activeHighlightedId && (product.id === activeHighlightedId || product.slug === activeHighlightedId)
                  );
                  return (
                    <div 
                      key={product.id}
                      className={`border rounded-2xl overflow-hidden bg-[#121217] hover:border-[#f5be38]/60 hover:shadow-[0_0_20px_rgba(245,190,56,0.15)] transition-all flex flex-col group ${
                        isHighlighted 
                          ? 'border-2 border-[#f5be38] ring-2 ring-[#f5be38]/40 shadow-lg' 
                          : 'border-white/10'
                      }`}
                    >
                      <div 
                        className="aspect-square bg-black/40 overflow-hidden relative cursor-pointer"
                        onClick={() => onSelectProduct(product)}
                      >
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                        />
                        {isHighlighted ? (
                          <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 text-[10px] font-black bg-[#f5be38] text-black rounded-md shadow-md uppercase tracking-wider flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5" />
                            Selected
                          </span>
                        ) : product.badge ? (
                          <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 text-[10px] font-black bg-[#f5be38] text-black rounded-md shadow-md uppercase">
                            {product.badge}
                          </span>
                        ) : null}
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                            {product.categoryLabel || 'Print Item'}
                          </p>
                          <h3 
                            onClick={() => onSelectProduct(product)}
                            className="text-sm font-bold text-white leading-snug hover:text-[#f5be38] transition-colors cursor-pointer line-clamp-2 mt-0.5"
                          >
                            {product.name}
                          </h3>
                          <div className="pt-1.5">
                            <PriceOnRequestBadge theme="dark" size="xs" />
                          </div>
                          <p className="text-xs text-stone-400 line-clamp-2 mt-2">
                            {product.shortDescription || product.description}
                          </p>
                        </div>

                        <div className="pt-2 grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setConfirmPriceProduct(product)}
                            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-[#f5be38] hover:bg-[#ffd15c] text-black font-black text-xs shadow-md transition-all cursor-pointer"
                          >
                            <MessageCircle className="w-3.5 h-3.5 fill-black stroke-none shrink-0" />
                            <span className="truncate">Confirm Price</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => onSelectProduct(product)}
                            className="flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/15 transition-colors cursor-pointer"
                          >
                            <span className="truncate">Configure</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 pt-6 border-t border-white/10 flex items-center justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => {
                      setCurrentPage(pageNum);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-9 h-9 flex items-center justify-center rounded-xl text-xs font-black transition-colors cursor-pointer ${
                      currentPage === pageNum
                        ? 'bg-[#f5be38] text-black shadow-md'
                        : 'bg-[#121217] hover:bg-white/10 text-stone-300 border border-white/10'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                {currentPage < totalPages && (
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage(currentPage + 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-3.5 h-9 flex items-center gap-1 rounded-xl bg-[#121217] hover:bg-white/10 text-stone-300 border border-white/10 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}

          </main>
        </div>
      </div>

      {/* Confirm Price Modal */}
      <ConfirmPriceModal
        product={confirmPriceProduct}
        isOpen={!!confirmPriceProduct}
        onClose={() => setConfirmPriceProduct(null)}
        onOrderOnline={(prod) => {
          setConfirmPriceProduct(null);
          onSelectProduct(prod);
        }}
      />

      {/* Recent Post Modal */}
      <RecentPostModal
        post={selectedPost}
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
      />
    </div>
  );
};
