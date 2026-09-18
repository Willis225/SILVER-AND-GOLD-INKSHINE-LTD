import React, { useState, useMemo, useEffect } from 'react';
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
  ChevronDown
} from 'lucide-react';
import { Product, ProductCategory } from '../../types/schema';
import { ConfirmPriceModal } from './ConfirmPriceModal';
import { RecentPostModal, PostItem } from './RecentPostModal';

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
    title: 'Flyer Design in Nigeria | Professional Flyer Printing Lagos',
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
    name: 'Foot Mat in Lagos, Nigeria – Custom Branded Door & Entrance Mats',
    price: '₦10,000.00',
    priceNum: 10000,
    image: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=400&q=80',
    category: 'gift_items_souvenirs',
  },
  {
    id: 'sidebar-prod-2',
    name: 'Custom Branded Center Rug Printing',
    price: '₦100,000.00',
    priceNum: 100000,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
    category: 'frames_wallarts',
  },
  {
    id: 'sidebar-prod-3',
    name: 'Key Holder & Keychain Printing in Lagos, Nigeria – Custom Branded Keyholders',
    price: '₦1,000.00',
    priceNum: 1000,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80',
    category: 'gift_items_souvenirs',
  },
  {
    id: 'sidebar-prod-4',
    name: 'Custom Branded Water Bottle Printing in Lagos, Nigeria – Custom & Personalized Bottles',
    price: '₦3,500.00',
    priceNum: 3500,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=400&q=80',
    category: 'gift_items_souvenirs',
  },
];

interface CategoriesPageProps {
  products: Product[];
  initialCategory?: string;
  initialSearchQuery?: string;
  onNavigateHome: () => void;
  onSelectProduct: (product: Product) => void;
  onOpenCart?: () => void;
  cartCount?: number;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({
  products,
  initialCategory = 'all',
  initialSearchQuery = '',
  onNavigateHome,
  onSelectProduct,
  onOpenCart,
  cartCount = 0,
}) => {
  // Navigation & filter states
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string>(initialCategory || 'all');
  const [searchKeyword, setSearchKeyword] = useState<string>(initialSearchQuery || '');
  const [searchInput, setSearchInput] = useState<string>(initialSearchQuery || '');
  const [sortBy, setSortBy] = useState<string>('default');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list'); // Default to list view as in screenshot
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  // Modals
  const [confirmPriceProduct, setConfirmPriceProduct] = useState<Product | null>(null);
  const [selectedPost, setSelectedPost] = useState<PostItem | null>(null);

  // Sync if initialCategory or initialSearchQuery prop changes
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategoryKey(initialCategory);
    }
  }, [initialCategory]);

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
      // 1. Category check
      if (selectedCategoryKey !== 'all') {
        const pCat = (p.category || '').toLowerCase();
        const pPlacement = (p.categoryPlacement || '').toLowerCase();
        const sKey = selectedCategoryKey.toLowerCase();
        
        // Exact match or related prefix
        const matchesCategory = 
          pCat === sKey || 
          pPlacement === sKey || 
          pCat.includes(sKey) ||
          (sKey === 'advertising_materials' && (pCat.includes('advertising') || pCat.includes('banner') || pPlacement === 'banners')) ||
          (sKey === 'banners_stands' && (pCat.includes('banner') || pPlacement === 'banners')) ||
          (sKey === 'flyers_handbills' && (pCat.includes('flyer') || pPlacement === 'flyers')) ||
          (sKey === 'office_stationery' && (pCat.includes('stationery') || pPlacement === 'stationery')) ||
          (sKey === 'packaging_shipping_cartons' && (pCat.includes('carton') || pCat.includes('packaging'))) ||
          (sKey === 'stickers_labels' && (pCat.includes('sticker') || pCat.includes('label'))) ||
          (sKey === 'signages' && (pCat.includes('sign') || pPlacement === 'signage')) ||
          (sKey === 'events_exhibitions' && (pCat.includes('event') || pPlacement === 'events')) ||
          (sKey === 'custom_apparels_caps' && (pCat.includes('apparel') || pCat.includes('uniform'))) ||
          (sKey === 'gift_items_souvenirs' && (pCat.includes('gift') || pPlacement === 'gifts')) ||
          (sKey === 'awards' && (pCat.includes('award') || pPlacement === 'awards')) ||
          (sKey === 'frames_wallarts' && (pCat.includes('frame') || pCat.includes('canvas') || pPlacement === 'paintings')) ||
          (sKey === 'printing_machines' && (pCat.includes('machine') || pPlacement === 'machines'));

        if (!matchesCategory) return false;
      }

      // 2. Search keyword check
      if (searchKeyword) {
        const kw = searchKeyword.toLowerCase();
        const matchesKeyword = 
          p.name.toLowerCase().includes(kw) ||
          p.description.toLowerCase().includes(kw) ||
          (p.shortDescription && p.shortDescription.toLowerCase().includes(kw)) ||
          p.sku.toLowerCase().includes(kw) ||
          (p.categoryLabel && p.categoryLabel.toLowerCase().includes(kw));
        
        if (!matchesKeyword) return false;
      }

      return true;
    });
  }, [products, selectedCategoryKey, searchKeyword]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.basePriceNgn - b.basePriceNgn);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.basePriceNgn - a.basePriceNgn);
    } else if (sortBy === 'latest') {
      list.reverse();
    }
    return list;
  }, [filteredProducts, sortBy]);

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

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(val);
  };

  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* 1. Top Breadcrumb & Page Bar */}
      <div className="border-b border-stone-200 bg-stone-50/80 sticky top-0 z-30 backdrop-blur-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Breadcrumb path */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-500">
            <button
              onClick={onNavigateHome}
              className="font-medium text-stone-600 hover:text-amber-600 transition-colors cursor-pointer flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span 
              onClick={() => handleSelectCategory('all')} 
              className={`cursor-pointer ${selectedCategoryKey === 'all' ? 'font-bold text-stone-900' : 'hover:text-stone-800'}`}
            >
              Categories
            </span>
            {selectedCategoryKey !== 'all' && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                <span className="font-bold text-stone-900 truncate max-w-[200px] sm:max-w-xs">
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
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-emerald-600 stroke-none" />
              <span>WhatsApp: 07030372539</span>
            </a>

            {onOpenCart && (
              <button
                onClick={onOpenCart}
                className="relative p-2 text-stone-700 hover:text-amber-600 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
                title="View cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-black font-extrabold text-[10px] flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </button>
            )}

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="md:hidden flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 text-white rounded-lg text-xs font-bold cursor-pointer"
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
            <div className="space-y-2">
              <label htmlFor="cat-search-input" className="block text-sm font-semibold text-stone-700">
                Search
              </label>
              <form onSubmit={handleSearchSubmit} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    id="cat-search-input"
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder=""
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-xs focus:outline-hidden focus:border-stone-500 text-stone-900"
                  />
                  {searchInput && (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-sm font-medium border border-stone-300 rounded-xs transition-colors cursor-pointer"
                >
                  Search
                </button>
              </form>
              {searchKeyword && (
                <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
                  <span>Filtered: "{searchKeyword}"</span>
                  <button 
                    onClick={handleClearSearch}
                    className="text-amber-700 font-bold underline cursor-pointer"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>

            {/* Browse by Category Widget */}
            <div>
              <h2 className="text-base font-bold text-stone-900 tracking-tight pb-2 border-b border-stone-200">
                Browse by Category
              </h2>
              <ul className="mt-3 space-y-1.5 text-sm text-stone-600">
                {/* All Categories item */}
                <li key="cat-all">
                  <button
                    onClick={() => handleSelectCategory('all')}
                    className={`w-full text-left py-1 px-1.5 rounded-xs transition-colors flex items-center justify-between group cursor-pointer ${
                      selectedCategoryKey === 'all'
                        ? 'font-bold text-stone-900 bg-stone-100'
                        : 'hover:text-stone-900 hover:bg-stone-50'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${selectedCategoryKey === 'all' ? 'bg-amber-600' : 'bg-stone-300 group-hover:bg-stone-500'}`} />
                      <span>All Categories</span>
                    </span>
                    <span className="text-xs text-stone-400">({products.length})</span>
                  </button>
                </li>

                {/* 22 Screenshot Categories */}
                {SCREENSHOT_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategoryKey === cat.key;
                  return (
                    <li key={cat.key}>
                      <button
                        onClick={() => handleSelectCategory(cat.key)}
                        className={`w-full text-left py-1 px-1.5 rounded-xs transition-colors flex items-center justify-between group cursor-pointer ${
                          isSelected
                            ? 'font-bold text-stone-900 bg-stone-100'
                            : 'hover:text-stone-900 hover:bg-stone-50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-amber-600' : 'bg-stone-300 group-hover:bg-stone-500'}`} />
                          <span className="leading-snug">{cat.label}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Recent Posts Widget */}
            <div>
              <h3 className="text-base font-bold text-stone-900 tracking-tight pb-2 border-b border-stone-200">
                Recent Posts
              </h3>
              <ul className="mt-3 space-y-3.5 text-xs text-stone-700">
                {RECENT_POSTS_DATA.map((post) => (
                  <li key={post.id} className="leading-snug">
                    <button
                      type="button"
                      onClick={() => setSelectedPost(post)}
                      className="text-left font-medium text-stone-700 hover:text-amber-700 transition-colors cursor-pointer block"
                    >
                      {post.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* PRODUCTS Widget (Mini Thumbnails from screenshot) */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 pb-2 border-b border-stone-200">
                PRODUCTS
              </h3>
              <div className="mt-4 space-y-4">
                {SIDEBAR_WIDGET_PRODUCTS.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-start gap-3 group cursor-pointer"
                    onClick={() => {
                      // Find in main products or mock select
                      const existing = products.find((p) => p.name.includes(item.name.substring(0, 15)));
                      if (existing) {
                        onSelectProduct(existing);
                      } else {
                        // Open confirm price directly with constructed product
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
                    <div className="w-12 h-12 rounded-xs overflow-hidden bg-stone-100 border border-stone-200 shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-medium text-stone-800 leading-snug group-hover:text-amber-700 transition-colors line-clamp-2">
                        {item.name}
                      </h4>
                      <div className="text-xs font-bold text-stone-900 mt-1">
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-stone-200">
              {/* Results count (e.g. Showing 1-16 of 170 results) */}
              <div className="text-xs sm:text-sm text-stone-600">
                {totalResults > 0 ? (
                  <span>
                    Showing {startIndex + 1}–{endIndex} of {totalResults} results
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
                    className="appearance-none text-xs sm:text-sm py-1.5 pl-3 pr-8 bg-white border border-stone-300 rounded-xs text-stone-800 focus:outline-hidden focus:border-stone-500 cursor-pointer"
                  >
                    <option value="default">Default sorting</option>
                    <option value="popularity">Sort by popularity</option>
                    <option value="latest">Sort by latest</option>
                    <option value="price-low">Sort by price: low to high</option>
                    <option value="price-high">Sort by price: high to low</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Grid & List View Toggle Icons */}
                <div className="flex items-center border border-stone-300 rounded-xs overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 transition-colors cursor-pointer ${
                      viewMode === 'grid' 
                        ? 'bg-stone-800 text-white' 
                        : 'bg-white text-stone-600 hover:bg-stone-100'
                    }`}
                    title="Grid view"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 transition-colors cursor-pointer ${
                      viewMode === 'list' 
                        ? 'bg-stone-800 text-white' 
                        : 'bg-white text-stone-600 hover:bg-stone-100'
                    }`}
                    title="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Empty State */}
            {currentProducts.length === 0 && (
              <div className="p-12 text-center bg-stone-50 rounded-xl border border-stone-200">
                <p className="text-base font-semibold text-stone-700">No products matching your selection.</p>
                <p className="text-xs text-stone-500 mt-1">Try clearing your search query or selecting a different category from the sidebar.</p>
                <button
                  onClick={() => {
                    setSelectedCategoryKey('all');
                    setSearchKeyword('');
                    setSearchInput('');
                  }}
                  className="mt-4 px-4 py-2 bg-stone-900 text-white text-xs font-bold rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  View All Products
                </button>
              </div>
            )}

            {/* ========================================================== */}
            {/* 1. LIST VIEW (Exact replica of the uploaded image layout)  */}
            {/* ========================================================== */}
            {viewMode === 'list' && (
              <div className="space-y-10 sm:space-y-14">
                {currentProducts.map((product) => {
                  const formattedPrice = formatPrice(product.basePriceNgn);
                  
                  // Extract or construct 4-6 bullet specs with checkmarks
                  const specs = [
                    '300 DPI High-Definition Commercial Printing',
                    'Direct Prepress & Artwork Verification',
                    'Fast Turnaround & Express Options',
                    'Doorstep Delivery Across Nigeria',
                  ];

                  // Specific custom checks for known products matching screenshot
                  const isPhotoBooth = product.name.toLowerCase().includes('360 photo');
                  const isSignage = product.name.toLowerCase().includes('3d signs') || product.name.toLowerCase().includes('signage');
                  const isExerciseBook = product.name.toLowerCase().includes('exercise book');
                  const isPoster = product.name.toLowerCase().includes('poster');

                  let dynamicSpecs = specs;
                  if (isPhotoBooth) {
                    dynamicSpecs = [
                      '360° Video Experience',
                      'Weddings & Birthday Parties',
                      'Corporate & Brand Activations',
                      'Custom Video Branding',
                      'Social Media-Friendly Videos',
                      'Lagos Event Setup',
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
                    <div 
                      key={product.id}
                      className="flex flex-col sm:flex-row items-start gap-6 lg:gap-10 pb-10 sm:pb-14 border-b border-stone-200/80 last:border-b-0"
                    >
                      {/* Left: Product Image */}
                      <div className="w-full sm:w-64 lg:w-72 shrink-0 aspect-4/3 sm:aspect-square bg-stone-50 rounded-xs overflow-hidden border border-stone-200/90 group cursor-pointer relative"
                        onClick={() => onSelectProduct(product)}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        {product.badge && (
                          <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold bg-amber-500 text-black rounded-xs shadow-xs uppercase tracking-wider">
                            {product.badge}
                          </span>
                        )}
                      </div>

                      {/* Right: Product Details matching screenshot */}
                      <div className="flex-1 min-w-0 space-y-3">
                        {/* Title */}
                        <h3 
                          onClick={() => onSelectProduct(product)}
                          className="text-lg sm:text-xl font-medium text-stone-900 leading-snug hover:text-amber-700 transition-colors cursor-pointer"
                        >
                          {product.name}
                        </h3>

                        {/* Price */}
                        <div className="text-xs font-bold text-stone-500">
                          <span className="text-stone-700 text-sm font-semibold">{formattedPrice}</span>
                        </div>

                        {/* Description Text */}
                        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl">
                          {product.description || product.shortDescription}
                        </p>

                        {/* Bullet Specs with Green Checkmark */}
                        <div className="space-y-1 py-1">
                          {dynamicSpecs.map((spec, sIdx) => (
                            <div key={sIdx} className="flex items-center gap-2 text-xs sm:text-sm text-stone-800">
                              <Check className="w-3.5 h-3.5 text-[#22c55e] stroke-[2.5] shrink-0" />
                              <span>{spec}</span>
                            </div>
                          ))}
                        </div>

                        {/* Action Buttons: Confirm Price (Green Button matching screenshot) */}
                        <div className="pt-2 flex flex-wrap items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setConfirmPriceProduct(product)}
                            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xs bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
                          >
                            <MessageCircle className="w-4 h-4 fill-white stroke-none" />
                            <span>Confirm Price</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ========================================================== */}
            {/* 2. GRID VIEW (Modern Clean Card Grid when toggled)       */}
            {/* ========================================================== */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProducts.map((product) => {
                  const formattedPrice = formatPrice(product.basePriceNgn);
                  return (
                    <div 
                      key={product.id}
                      className="border border-stone-200 rounded-lg overflow-hidden bg-white hover:shadow-lg transition-all flex flex-col group"
                    >
                      <div 
                        className="aspect-square bg-stone-50 overflow-hidden relative cursor-pointer"
                        onClick={() => onSelectProduct(product)}
                      >
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                        />
                        {product.badge && (
                          <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold bg-amber-500 text-black rounded-xs shadow-xs uppercase">
                            {product.badge}
                          </span>
                        )}
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                            {product.categoryLabel || 'Print Item'}
                          </p>
                          <h3 
                            onClick={() => onSelectProduct(product)}
                            className="text-sm font-bold text-stone-900 leading-snug hover:text-amber-700 transition-colors cursor-pointer line-clamp-2 mt-0.5"
                          >
                            {product.name}
                          </h3>
                          <div className="text-sm font-extrabold text-stone-800 mt-1">
                            {formattedPrice}
                          </div>
                          <p className="text-xs text-stone-500 line-clamp-2 mt-1">
                            {product.shortDescription || product.description}
                          </p>
                        </div>

                        <div className="pt-2 flex flex-col gap-2">
                          <button
                            type="button"
                            onClick={() => setConfirmPriceProduct(product)}
                            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-md bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                          >
                            <MessageCircle className="w-3.5 h-3.5 fill-white stroke-none" />
                            <span>Confirm Price</span>
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
              <div className="mt-12 pt-6 border-t border-stone-200 flex items-center justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => {
                      setCurrentPage(pageNum);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-9 h-9 flex items-center justify-center rounded-xs text-xs font-bold transition-colors cursor-pointer ${
                      currentPage === pageNum
                        ? 'bg-stone-900 text-white'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
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
                    className="px-3 h-9 flex items-center gap-1 rounded-xs bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-colors cursor-pointer"
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
