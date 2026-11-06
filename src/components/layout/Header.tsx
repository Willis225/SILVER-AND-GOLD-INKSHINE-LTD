import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Phone, 
  Menu, 
  X, 
  ChevronDown,
  ChevronRight,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Mail,
  Share2,
  FileText,
  Truck,
  Sparkles,
  ShieldCheck,
  Megaphone,
  Tag,
  Briefcase,
  BookOpen,
  Stamp,
  Flag,
  Sun,
  Signpost,
  Calendar,
  Image as ImageIcon,
  Award,
  Printer,
  Heart,
  Car,
  Shirt,
  UserCheck,
  Gift,
  Utensils,
  Package,
  Layers,
  Info,
  Building2,
  HelpCircle,
  Clock,
  ArrowRight,
  Home,
  MapPin,
} from 'lucide-react';
import { ProductCategory, Product } from '../../types/schema';
import { CompanyLogoMark } from '../common/CompanyLogo';
import { InfoModalTab } from '../common/CompanyInfoModal';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  selectedCategory: ProductCategory | 'all';
  onSelectCategory: (cat: ProductCategory | 'all') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNavigateHome: () => void;
  onOpenInfoModal?: (tab?: InfoModalTab) => void;
  onOpenBookOnline?: () => void;
  onOpenCatalog?: () => void;
  onOpenCategoriesPage?: (categoryKey?: string) => void;
  onOpenQuoteModal?: () => void;
  onOpenSearch?: () => void;
  onNavigateToPage?: (page: 'storefront' | 'categories' | 'about' | 'services' | 'order' | 'quote' | 'policies', docKey?: 'terms' | 'privacy' | 'returns') => void;
  products?: Product[];
}

export const CATEGORIES: { id: ProductCategory; label: string }[] = [
  // Prints
  { id: 'advertising_materials', label: 'Advertising Materials' },
  { id: 'stickers_labels', label: 'Stickers & Labels' },
  { id: 'flyers_handbills', label: 'Flyer & Handbill Printing' },
  { id: 'cards_invitations', label: 'Cards & Invitations' },
  { id: 'office_stationery', label: 'Office Stationery & Corporate Branding' },
  { id: 'books_magazines', label: 'Books & Magazines' },
  // Branding
  { id: 'custom_apparels_caps', label: 'Custom Apparels & Caps' },
  { id: 'gift_items_souvenirs', label: 'Gift Items & Souvenirs' },
  { id: 'food_packaging', label: 'Food Packaging' },
  { id: 'packaging_shipping_cartons', label: 'Packaging and Shipping Cartons' },
  { id: 'paper_bags_tags', label: 'Paper Bags & Tags' },
  { id: 'vehicle_branding', label: 'Vehicle Branding' },
  { id: 'packages', label: 'Packages' },
  // Displays & Structures
  { id: 'banners_stands', label: 'Banners & Stands' },
  { id: 'outdoor_displays', label: 'Outdoor Displays' },
  { id: 'signages', label: 'Signages' },
  { id: 'events_exhibitions', label: 'Events & Exhibitions' },
  { id: 'frames_wallarts', label: 'Frames & Wall Arts' },
  { id: 'awards', label: 'Awards' },
  { id: 'printing_machines', label: 'Printing Machines' },
  { id: 'wedding', label: 'Wedding' },
  { id: 'carports', label: 'Carports' },
];

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onNavigateHome,
  onOpenInfoModal,
  onOpenBookOnline,
  onOpenCatalog,
  onOpenCategoriesPage,
  onOpenQuoteModal,
  onOpenSearch,
  onNavigateToPage,
  products = [],
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [mobileSearchInput, setMobileSearchInput] = useState(searchQuery || '');

  // Keep mobile search input synced with search query
  useEffect(() => {
    setMobileSearchInput(searchQuery || '');
  }, [searchQuery]);

  // Lock body scroll when mobile standalone page is open to prevent background scrolling/floating
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  const handleTriggerSearch = () => {
    if (onOpenSearch) {
      onOpenSearch();
    } else {
      setShowSearchModal(true);
    }
  };

  const handleMobileSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = mobileSearchInput.trim() || searchQuery.trim();
    if (query) {
      onSearchChange(query);
    }
    setMobileMenuOpen(false);
    if (onOpenSearch) {
      onOpenSearch();
    } else {
      setShowSearchModal(true);
    }
  };

  const handleQuickSearch = (tag: string) => {
    setMobileSearchInput(tag);
    onSearchChange(tag);
    setMobileMenuOpen(false);
    if (onOpenSearch) {
      onOpenSearch();
    } else {
      setShowSearchModal(true);
    }
  };

  const handleCategoryNav = (cat: ProductCategory | string) => {
    onSelectCategory(cat as ProductCategory);
    setActiveDropdown(null);
    if (onOpenCategoriesPage) {
      onOpenCategoriesPage(cat);
    } else {
      onNavigateHome();
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-transparent transition-colors">
      {/* Top Utility Bar: Liquid Silver & Gold Shimmer */}
      <div className="gold-silver-shimmer text-stone-950 text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-none relative overflow-hidden">
        {/* Subtle luminous metallic gloss sheen */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-black/10" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-25deg] animate-connecting-light" />

        <div className="relative max-w-7xl mx-auto flex items-center justify-between gap-2 z-10">
          {/* Left Text: Fast Delivery with Truck Icon */}
          <div className="font-black text-[11px] sm:text-xs md:text-sm tracking-wide text-neutral-950 flex items-center gap-1.5 drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] shrink-0">
            <span className="w-2 h-2 rounded-full bg-black shadow-[0_0_8px_rgba(0,0,0,0.6)] animate-pulse" />
            <Truck className="w-3.5 h-3.5 text-neutral-950 shrink-0" />
            <span className="hidden xs:inline font-black">Fast Nationwide Delivery</span>
            <span className="xs:hidden font-black">Fast Delivery</span>
          </div>

          {/* Right Section: Call Button + Social Icons */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <div className="bg-black/90 text-white font-black text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full shadow-sm border border-white/30 flex items-center gap-1.5 shrink-0 backdrop-blur-xs">
              <Phone className="w-3 h-3 text-[#f5be38] shrink-0" />
              <a href="tel:+2347030372539" className="hover:text-[#f5be38] transition-colors">+234 703 037 2539</a>
              <span className="text-white/40">|</span>
              <a href="tel:+2349055947639" className="hover:text-[#f5be38] transition-colors">0905 594 7639</a>
            </div>

            {/* Social Icons */}
            <div className="hidden sm:flex items-center gap-2.5 text-neutral-900">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-black hover:scale-110 transition-all drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://web.facebook.com/silverGoldprinting?locale=en_GB&_rdc=1&_rdr#" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-black hover:scale-110 transition-all drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-black hover:scale-110 transition-all drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]"
                aria-label="YouTube"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-black hover:scale-110 transition-all drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://pinterest.com" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-black hover:scale-110 transition-all drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]"
                aria-label="Pinterest"
              >
                <Share2 className="w-3.5 h-3.5" />
              </a>
              <a 
                href="mailto:inkshineltd@gmail.com" 
                className="hover:text-black hover:scale-110 transition-all drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]"
                aria-label="Email"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Brand Header Navigation - Completely Plain & Seamless on Homepage Background */}
      <div className="relative bg-transparent border-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-6">
            {/* Brand Logo - SILVER & GOLD INKSHINE LTD */}
            <button 
              onClick={onNavigateHome}
              className="flex items-center gap-3 text-left focus:outline-hidden group"
            >
              {/* Official Silver & Gold Inkshine Emblem */}
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center shrink-0 drop-shadow-md group-hover:scale-105 transition-transform">
                <CompanyLogoMark className="w-full h-full" />
              </div>

              <div>
                <div className="text-base sm:text-xl font-black tracking-tight leading-none flex items-center gap-1 sm:gap-1.5">
                  <span className="text-[#d8dce2] drop-shadow-[0_1px_1px_rgba(255,255,255,0.15)] font-black">
                    SILVER
                  </span>
                  <span className="text-stone-400 font-semibold text-xs sm:text-sm">&amp;</span>
                  <span className="text-[#f5be38] drop-shadow-[0_1px_2px_rgba(245,190,56,0.25)] font-black">
                    GOLD
                  </span>
                </div>
                <div className="text-[9px] sm:text-[10.5px] font-extrabold tracking-[0.24em] text-white leading-none mt-1 drop-shadow-xs">
                  INKSHINE LTD
                </div>
              </div>
            </button>

            {/* Desktop Category Navigation */}
            <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold text-stone-200">

              {/* Prints */}
              <div 
                className="relative group py-2"
                onMouseEnter={() => setActiveDropdown('prints')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  onClick={() => handleCategoryNav('all')}
                  className="flex items-center gap-1 hover:text-[#ffd25d] text-stone-200 transition-colors cursor-pointer"
                >
                  <span>Prints</span>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400 group-hover:rotate-180 transition-transform" />
                </button>

                {activeDropdown === 'prints' && (
                  <div className="absolute top-full left-0 w-80 bg-[#0c0d12] border border-white/15 rounded-2xl shadow-2xl py-2 z-[70] animate-in fade-in-50 duration-150 backdrop-blur-xl">
                    <button
                      onClick={() => handleCategoryNav('advertising_materials')}
                      className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#b8860b] group-hover/item:text-white transition-colors">
                        <Megaphone className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-white group-hover/item:text-[#ffd25d]">Advertising Materials</div>
                        <div className="text-[11px] text-stone-400 truncate">Rollup banners, flags, posters &amp; backdrops</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleCategoryNav('stickers_labels')}
                      className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#b8860b] group-hover/item:text-white transition-colors">
                        <Tag className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-white group-hover/item:text-[#ffd25d]">Stickers &amp; Labels</div>
                        <div className="text-[11px] text-stone-400 truncate">Product packaging, bottle &amp; die-cut vinyl stickers</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleCategoryNav('flyers_handbills')}
                      className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#b8860b] group-hover/item:text-white transition-colors">
                        <FileText className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-white group-hover/item:text-[#ffd25d]">Flyer &amp; Handbill Printing</div>
                        <div className="text-[11px] text-stone-400 truncate">A5, A6 marketing leaflets on gloss &amp; matte art paper</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleCategoryNav('cards_invitations')}
                      className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#b8860b] group-hover/item:text-white transition-colors">
                        <Mail className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-white group-hover/item:text-[#ffd25d]">Cards &amp; Invitations</div>
                        <div className="text-[11px] text-stone-400 truncate">Matte business cards, VIP invitations &amp; greeting cards</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleCategoryNav('office_stationery')}
                      className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#b8860b] group-hover/item:text-white transition-colors">
                        <Briefcase className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-white group-hover/item:text-[#ffd25d]">Office Stationery &amp; Corporate Branding</div>
                        <div className="text-[11px] text-stone-400 truncate">Letterheads, envelopes, presentation folders &amp; notepads</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleCategoryNav('books_magazines')}
                      className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#b8860b] group-hover/item:text-white transition-colors">
                        <BookOpen className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-white group-hover/item:text-[#ffd25d]">Books &amp; Magazines</div>
                        <div className="text-[11px] text-stone-400 truncate">Annual reports, catalogs, profile booklets &amp; magazines</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>

            {/* Branding */}
            <div 
              className="relative group py-2"
              onMouseEnter={() => setActiveDropdown('branding')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                onClick={() => handleCategoryNav('custom_apparels_caps')}
                className="flex items-center gap-1 hover:text-[#ffd25d] text-stone-200 transition-colors cursor-pointer"
              >
                <span>Branding</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 group-hover:rotate-180 transition-transform" />
              </button>

              {activeDropdown === 'branding' && (
                <div className="absolute top-full left-0 w-80 bg-[#0c0d12] border border-white/15 rounded-2xl shadow-2xl py-2 z-[70] animate-in fade-in-50 duration-150 backdrop-blur-xl">
                  <button
                    onClick={() => handleCategoryNav('custom_apparels_caps')}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#b8860b] group-hover/item:text-white transition-colors">
                      <Shirt className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#ffd25d]">Custom Apparels &amp; Caps</div>
                      <div className="text-[11px] text-stone-400 truncate">Polo shirts, round neck tees, branded face caps &amp; hoodies</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleCategoryNav('gift_items_souvenirs')}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#b8860b] group-hover/item:text-white transition-colors">
                      <Gift className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#ffd25d]">Gift Items &amp; Souvenirs</div>
                      <div className="text-[11px] text-stone-400 truncate">Ceramic mugs, vacuum flasks, executive pens &amp; event umbrellas</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleCategoryNav('food_packaging')}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#b8860b] group-hover/item:text-white transition-colors">
                      <Utensils className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#ffd25d]">Food Packaging</div>
                      <div className="text-[11px] text-stone-400 truncate">Burger boxes, pastry packs, takeout bowls &amp; greaseproof wrap</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleCategoryNav('packaging_shipping_cartons')}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#b8860b] group-hover/item:text-white transition-colors">
                      <Package className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#ffd25d]">Packaging and Shipping Cartons</div>
                      <div className="text-[11px] text-stone-400 truncate">Corrugated brown boxes, mailer cartons &amp; cargo packaging</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleCategoryNav('paper_bags_tags')}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#b8860b] group-hover/item:text-white transition-colors">
                      <Tag className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#ffd25d]">Paper Bags &amp; Tags</div>
                      <div className="text-[11px] text-stone-400 truncate">Kraft shopping carrier bags, boutique rope shoppers &amp; clothing tags</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleCategoryNav('vehicle_branding')}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#b8860b] group-hover/item:text-white transition-colors">
                      <Car className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#ffd25d]">Vehicle Branding</div>
                      <div className="text-[11px] text-stone-400 truncate">Commercial fleet wraps, delivery bus graphics &amp; one-way vision</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleCategoryNav('packages')}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#b8860b] group-hover/item:text-white transition-colors">
                      <Layers className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#ffd25d]">Packages</div>
                      <div className="text-[11px] text-stone-400 truncate">Startup branding bundles, corporate kits &amp; campaign suites</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Displays */}
            <div 
              className="relative group py-2"
              onMouseEnter={() => setActiveDropdown('displays')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                onClick={() => handleCategoryNav('banners_stands')}
                className="flex items-center gap-1 hover:text-[#ffd25d] text-stone-200 transition-colors cursor-pointer"
              >
                <span>Displays</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 group-hover:rotate-180 transition-transform" />
              </button>

              {activeDropdown === 'displays' && (
                <div className="absolute top-full left-0 w-80 bg-[#0c0d12] border border-white/15 rounded-2xl shadow-2xl py-2 z-[70] animate-in fade-in-50 duration-150 backdrop-blur-xl">
                  <button
                    onClick={() => handleCategoryNav('banners_stands')}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#b8860b] group-hover/item:text-white transition-colors">
                      <Flag className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#ffd25d]">Banners &amp; Stands</div>
                      <div className="text-[11px] text-stone-400 truncate">Rollup teardrop base, standard pull-ups &amp; X-banners</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleCategoryNav('outdoor_displays')}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#b8860b] group-hover/item:text-white transition-colors">
                      <Sun className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#ffd25d]">Outdoor Displays</div>
                      <div className="text-[11px] text-stone-400 truncate">Teardrop flying flags, feather banners &amp; event gazebos</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleCategoryNav('signages')}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#b8860b] group-hover/item:text-white transition-colors">
                      <Signpost className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#ffd25d]">Signages</div>
                      <div className="text-[11px] text-stone-400 truncate">3D illuminated acrylic letters, aluminum fascia boards</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleCategoryNav('events_exhibitions')}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#b8860b] group-hover/item:text-white transition-colors">
                      <Calendar className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#ffd25d]">Events &amp; Exhibitions</div>
                      <div className="text-[11px] text-stone-400 truncate">Media backdrops, exhibition booth popups &amp; podiums</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleCategoryNav('frames_wallarts')}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#b8860b] group-hover/item:text-white transition-colors">
                      <ImageIcon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#ffd25d]">Frames &amp; Wall Arts</div>
                      <div className="text-[11px] text-stone-400 truncate">Canvas gallery wraps, acrylic floating prints &amp; wood frames</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleCategoryNav('awards')}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#b8860b] group-hover/item:text-white transition-colors">
                      <Award className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#ffd25d]">Awards</div>
                      <div className="text-[11px] text-stone-400 truncate">Crystal engraved trophies, wooden plaques &amp; medals</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleCategoryNav('printing_machines')}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#b8860b] group-hover/item:text-white transition-colors">
                      <Printer className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#ffd25d]">Printing Machines</div>
                      <div className="text-[11px] text-stone-400 truncate">Large format eco-solvent printers, DTF &amp; laminators</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleCategoryNav('wedding')}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#b8860b] group-hover/item:text-white transition-colors">
                      <Heart className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#ffd25d]">Wedding</div>
                      <div className="text-[11px] text-stone-400 truncate">Event welcome boards, ceremonial backdrop &amp; guest books</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleCategoryNav('carports')}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#b8860b] group-hover/item:text-white transition-colors">
                      <Car className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#ffd25d]">Carports</div>
                      <div className="text-[11px] text-stone-400 truncate">Custom commercial tensile carports &amp; fabric shade structures</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Info Dropdown */}
            <div 
              className="relative group py-2"
              onMouseEnter={() => setActiveDropdown('info')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                onClick={() => {
                  onOpenInfoModal?.('info');
                  setActiveDropdown(null);
                }}
                className="flex items-center gap-1 hover:text-[#ffd25d] text-stone-200 transition-colors"
              >
                <span>About / FAQs</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 group-hover:rotate-180 transition-transform" />
              </button>

              {activeDropdown === 'info' && (
                <div className="absolute top-full left-0 w-80 bg-[#0c0d12] border border-white/15 rounded-2xl shadow-2xl py-2 z-[70] animate-in fade-in-50 duration-150 backdrop-blur-xl">
                  {/* -Company Info */}
                  <button
                    onClick={() => {
                      onNavigateToPage?.('about');
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#b8860b] group-hover/item:text-white transition-colors">
                      <Info className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#ffd25d]">About / FAQs</div>
                      <div className="text-[11px] text-stone-400 truncate">Corporate credentials, RC 1892044 &amp; factory capacity</div>
                    </div>
                  </button>

                  {/* -About Us */}
                  <button
                    onClick={() => {
                      onNavigateToPage?.('about');
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#b8860b] group-hover/item:text-white transition-colors">
                      <Building2 className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#ffd25d]">About Us</div>
                      <div className="text-[11px] text-stone-400 truncate">Our story, mission, quality promise &amp; values</div>
                    </div>
                  </button>

                  {/* -Our Services */}
                  <button
                    onClick={() => {
                      onNavigateToPage?.('services');
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#b8860b] group-hover/item:text-white transition-colors">
                      <Printer className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#ffd25d]">Our Services</div>
                      <div className="text-[11px] text-stone-400 truncate">Commercial printing, signage, packaging &amp; apparel</div>
                    </div>
                  </button>

                  {/* -Our Portfolios */}
                  <button
                    onClick={() => {
                      onNavigateToPage?.('portfolios');
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#b8860b] group-hover/item:text-white transition-colors">
                      <ImageIcon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#ffd25d]">Our Portfolios</div>
                      <div className="text-[11px] text-stone-400 truncate">Completed projects gallery, summits &amp; client works</div>
                    </div>
                  </button>

                  {/* -How It Works / FAQ */}
                  <button
                    onClick={() => {
                      onNavigateToPage?.('faq');
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#b8860b] group-hover/item:text-white transition-colors">
                      <HelpCircle className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#ffd25d]">How It Works / FAQ</div>
                      <div className="text-[11px] text-stone-400 truncate">4-step ordering guide, turnaround &amp; FAQs</div>
                    </div>
                  </button>

                  {/* -Contact Us */}
                  <button
                    onClick={() => {
                      onNavigateToPage?.('about');
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#b8860b] group-hover/item:text-white transition-colors">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#ffd25d]">Contact Us</div>
                      <div className="text-[11px] text-stone-400 truncate">Yenagoa press complex, WhatsApp &amp; telephone desk</div>
                    </div>
                  </button>

                </div>
              )}
            </div>

            {/* Book Online & Custom Quote Buttons */}
            <button
              onClick={onOpenBookOnline}
              className="h-9 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-stone-200 hover:text-white font-bold text-xs inline-flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer border border-white/15"
            >
              <Calendar className="w-3.5 h-3.5 text-[#f5be38]" />
              <span>Book Online</span>
            </button>

          </nav>

          {/* Right Action Icons: Search + Cart + Get a Quote Primary CTA Button */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Icon / Toggle */}
            <button
              type="button"
              onClick={handleTriggerSearch}
              className="p-2 text-stone-200 hover:text-white transition-colors rounded-full hover:bg-white/10 cursor-pointer"
              aria-label="Search items and categories"
              title="Search flyers, banners, business cards, signage..."
            >
              <Search className="w-5 h-5 stroke-[2.2]" />
            </button>

            {/* Shopping Cart Icon with Counter */}
            <button
              id="cart-toggle-btn"
              onClick={onOpenCart}
              className="relative flex items-center justify-center min-w-[40px] min-h-[40px] p-2 text-stone-200 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
              {cartCount > 0 ? (
                <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#f5be38] text-stone-950 font-black text-[10px] flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              ) : (
                <span className="text-[11px] font-bold text-stone-400 ml-1">0</span>
              )}
            </button>

            {/* Gold 'Get a Quote' CTA Button */}
            <button
              type="button"
              onClick={onOpenQuoteModal || onOpenBookOnline}
              className="hidden sm:inline-flex h-9.5 px-5 rounded-xl bg-gradient-to-r from-[#ffd25d] via-[#f5be38] to-[#e5af28] hover:from-[#f5be38] hover:to-[#d49f18] text-stone-950 font-bold text-xs sm:text-[13px] items-center gap-1.5 transition-all shadow-[0_4px_16px_rgba(245,190,56,0.25)] active:scale-95 cursor-pointer"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-950 stroke-[2.5]" />
            </button>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center justify-center min-w-[44px] min-h-[44px] p-2 text-stone-200 md:hidden hover:text-[#ffd25d] hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>
      </div>
    </div>

      {/* Dedicated Standalone Mobile Full-Screen Page (Swipes in from corner/right edge, NOT floating on homepage) */}
      <div
        className={`fixed inset-0 z-[100] md:hidden transition-all duration-300 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto visible'
            : 'opacity-0 pointer-events-none invisible'
        }`}
        aria-modal="true"
        role="dialog"
        aria-label="Mobile Navigation & Search Page"
      >
        {/* Full-screen Dark Backdrop */}
        <div
          className={`fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300 ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Standalone Full-Screen Sliding Page (Swipes in from the right corner) */}
        <div
          className={`fixed inset-0 bg-[#07080b] flex flex-col h-[100dvh] w-full overflow-hidden shadow-2xl transition-transform duration-300 ease-out transform ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Top Page Header Bar */}
          <div className="shrink-0 bg-[#0c0e14] border-b border-white/10 px-4 py-3 flex items-center justify-between shadow-md">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateHome();
              }}
              className="flex items-center gap-2.5 text-left active:scale-95 transition-transform cursor-pointer"
            >
              <CompanyLogoMark className="w-8 h-8 rounded-full border border-[#f5be38]/40 shadow-sm" />
              <div>
                <div className="text-white font-black text-sm tracking-tight flex items-center gap-1.5">
                  <span>SILVER &amp; GOLD</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#f5be38]/20 text-[#ffd25d] border border-[#f5be38]/40">
                    HUB
                  </span>
                </div>
                <div className="text-[10px] text-stone-400 font-medium">Search &amp; Navigation Page</div>
              </div>
            </button>

            {/* Prominent Swipe/Close Page Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-1.5 min-h-[40px] px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white border border-white/20 text-xs font-bold transition-all cursor-pointer shadow-sm"
              aria-label="Close page"
            >
              <span>Close</span>
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Liquid Gold/Silver Hairline Line */}
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#f5be38] via-white to-transparent opacity-80 shrink-0" />

          {/* Scrollable Standalone Page Body */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-5 space-y-5">
            {/* 1. Integrated Search Engine */}
            <div className="bg-[#12131b] border border-white/15 rounded-2xl p-4 shadow-lg">
              <div className="flex items-center justify-between mb-2.5">
                <div className="text-xs font-black uppercase tracking-wider text-[#ffd25d] flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-[#ffd25d]" />
                  <span>Search Engine</span>
                </div>
                <span className="text-[10px] text-stone-400">Search products &amp; prints</span>
              </div>

              <form onSubmit={handleMobileSearchSubmit} className="space-y-2.5">
                <div className="relative flex items-center">
                  <Search className="absolute left-3.5 w-4 h-4 text-[#ffd25d] pointer-events-none" />
                  <input
                    type="search"
                    value={mobileSearchInput}
                    onChange={(e) => setMobileSearchInput(e.target.value)}
                    placeholder="Search flyers, banners, stickers, cards..."
                    className="w-full h-11 pl-10 pr-20 bg-white/5 border border-white/20 focus:border-[#f5be38] focus:bg-white/10 text-white placeholder:text-stone-400 text-sm rounded-xl outline-none transition-all"
                  />
                  {mobileSearchInput && (
                    <button
                      type="button"
                      onClick={() => {
                        setMobileSearchInput('');
                        onSearchChange('');
                      }}
                      className="absolute right-16 p-1 text-stone-400 hover:text-white cursor-pointer"
                      title="Clear search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="absolute right-1.5 h-8 px-3 rounded-lg bg-[#f5be38] hover:bg-[#e5af28] text-black font-extrabold text-xs flex items-center justify-center transition-all active:scale-95 shadow-sm cursor-pointer"
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Quick Search Chips */}
              <div className="mt-3 pt-3 border-t border-white/10">
                <div className="text-[11px] font-semibold text-stone-400 mb-2">Popular Searches:</div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Banners & Stands',
                    'T-Shirt Printing',
                    'Flyers & Handbills',
                    'Package Design',
                    'Stickers & Labels',
                    'Custom Apparels',
                    'Mug Printing',
                    'Vehicle Branding',
                    'Roll-Up Stand',
                  ].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleQuickSearch(tag)}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-stone-300 hover:text-[#ffd25d] transition-colors active:scale-95 cursor-pointer"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Direct Action Buttons */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBookOnline?.();
                }}
                className="min-h-[52px] p-3 rounded-2xl bg-gradient-to-r from-[#ffd25d] via-[#f5be38] to-[#e5ab20] text-black font-black text-xs flex flex-col justify-center items-start shadow-md shadow-[#f5be38]/20 active:scale-95 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-black" />
                  <span className="text-sm font-black">Book Online</span>
                </div>
                <span className="text-[10px] text-black/80 font-medium">Fast ordering &amp; proof</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenCategoriesPage) {
                    onOpenCategoriesPage('all');
                  } else {
                    onOpenCatalog?.();
                  }
                }}
                className="min-h-[52px] p-3 rounded-2xl bg-white/10 hover:bg-white/15 text-[#ffd25d] border border-[#ffd25d]/40 font-bold text-xs flex flex-col justify-center items-start active:scale-95 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#ffd25d]" />
                  <span className="text-sm font-black text-white">Catalog</span>
                </div>
                <span className="text-[10px] text-stone-400 font-medium">Browse 24+ Categories</span>
              </button>
            </div>

            {/* 3. Customized Enterprise Quote Card */}
            {onOpenQuoteModal && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="w-full p-4 rounded-2xl bg-gradient-to-r from-[#171822] to-[#12131b] hover:from-[#20212f] hover:to-[#171824] border border-[#f5be38]/30 text-left transition-all active:scale-[0.98] cursor-pointer shadow-lg group relative overflow-hidden"
              >
                <div className="pointer-events-none absolute -right-6 -bottom-6 w-24 h-24 bg-[#f5be38]/10 rounded-full blur-xl" />
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-[#f5be38]/15 border border-[#f5be38]/30 text-[#ffd25d] shrink-0">
                      <FileText className="w-5 h-5 text-[#ffd25d]" />
                    </div>
                    <div>
                      <div className="text-sm font-black text-white flex items-center gap-1.5">
                        <span>Needs a Customized Enterprise Quote?</span>
                      </div>
                      <p className="text-xs text-stone-300 mt-0.5">
                        Bulk printing, corporate packaging &amp; custom specifications
                      </p>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#ffd25d] mt-2">
                        <span>Request Custom Enterprise Quote</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-stone-400 group-hover:text-white shrink-0 ml-2" />
                </div>
              </button>
            )}

            {/* 4. Quick Navigation Hub */}
            <div className="bg-[#12131b] border border-white/10 rounded-2xl p-4 shadow-md">
              <div className="text-xs font-black uppercase tracking-wider text-[#ffd25d] mb-3 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-[#ffd25d]" />
                <span>Quick Navigation &amp; Company Hub</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Home Page', action: () => { setMobileMenuOpen(false); onNavigateHome(); } },
                  { label: 'Our Services', action: () => { setMobileMenuOpen(false); onNavigateToPage?.('services'); } },
                  { label: 'Our Portfolios', action: () => { setMobileMenuOpen(false); onNavigateToPage?.('portfolios'); } },
                  { label: 'How It Works / FAQ', action: () => { setMobileMenuOpen(false); onNavigateToPage?.('faq'); } },
                  { label: 'About Us', action: () => { setMobileMenuOpen(false); onNavigateToPage?.('about'); } },
                  { label: 'Contact Us', action: () => { setMobileMenuOpen(false); onNavigateToPage?.('about'); } },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={item.action}
                    className="min-h-[46px] px-3 py-2.5 bg-white/5 hover:bg-white/15 active:bg-white/20 text-stone-100 font-bold text-xs rounded-xl text-left border border-white/10 transition-colors flex items-center justify-between cursor-pointer group"
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#ffd25d] transition-colors" />
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Browse All Categories */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-black uppercase tracking-wider text-[#ffd25d]">
                  Browse Categories
                </div>
                <span className="text-[10px] font-semibold text-stone-400">
                  {CATEGORIES.length + 1} categories
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onSelectCategory('all');
                    setMobileMenuOpen(false);
                    if (onOpenCategoriesPage) {
                      onOpenCategoriesPage('all');
                    } else {
                      onNavigateHome();
                    }
                  }}
                  className={`min-h-[46px] text-left p-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                    selectedCategory === 'all'
                      ? 'bg-gradient-to-r from-[#ffd25d] to-[#f5be38] text-black shadow-md'
                      : 'bg-white/10 text-stone-200 hover:bg-white/15 border border-white/10'
                  }`}
                >
                  <span>🌟 All Products</span>
                  <ChevronRight className={`w-3.5 h-3.5 ${selectedCategory === 'all' ? 'text-black' : 'text-stone-400'}`} />
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      onSelectCategory(cat.id);
                      setMobileMenuOpen(false);
                      if (onOpenCategoriesPage) {
                        onOpenCategoriesPage(cat.id);
                      } else {
                        onNavigateHome();
                      }
                    }}
                    className={`min-h-[46px] text-left p-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                      selectedCategory === cat.id
                        ? 'bg-gradient-to-r from-[#ffd25d] to-[#f5be38] text-black font-bold shadow-md'
                        : 'bg-white/5 text-stone-200 hover:bg-white/10 border border-white/5'
                    }`}
                  >
                    <span className="line-clamp-1">{cat.label}</span>
                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 ml-1 ${selectedCategory === cat.id ? 'text-black' : 'text-stone-500'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* 6. Direct Support & Contact Hotlines */}
            <div className="pt-4 border-t border-white/15 space-y-3">
              <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                Direct Customer Support &amp; Enquiries
              </div>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:+2347030372539"
                  className="min-h-[44px] px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-[#ffd25d] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#ffd25d]" />
                  <span>+234 703 037 2539</span>
                </a>
                <a
                  href="tel:+2349055947639"
                  className="min-h-[44px] px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-[#ffd25d] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#ffd25d]" />
                  <span>0905 594 7639</span>
                </a>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="https://wa.me/2347030372539"
                  target="_blank"
                  rel="noreferrer"
                  className="min-h-[44px] px-3 py-2 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#25D366] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>💬 WhatsApp Chat</span>
                </a>
                <a
                  href="mailto:inkshineltd@gmail.com"
                  className="min-h-[44px] px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-stone-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-stone-400" />
                  <span>inkshineltd@gmail.com</span>
                </a>
              </div>
              <div className="text-center text-[10px] text-stone-400 pt-1 pb-4">
                📍 Yenagoa, Bayelsa State, Nigeria • Fast Nationwide Delivery
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Liquid Gold & Silver Hairline Accent under the whole header */}
      <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-[#f5be38] via-white to-transparent opacity-80" />
    </header>
  );
};

