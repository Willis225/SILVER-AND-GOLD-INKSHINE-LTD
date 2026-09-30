import React, { useState } from 'react';
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
} from 'lucide-react';
import { ProductCategory, Product } from '../../types/schema';
import { CompanyLogoMark } from '../common/CompanyLogo';
import { InfoModalTab } from '../common/CompanyInfoModal';
import { GlobalSearchModal } from '../common/GlobalSearchModal';

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
  onNavigateToPage,
  products = [],
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showSearchModal, setShowSearchModal] = useState(false);

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
    <header className="sticky top-0 z-40 bg-[#000000] border-b border-white/10 shadow-lg">
      {/* Top Utility Bar: Liquid Silver & Gold Shimmer */}
      <div className="gold-silver-shimmer text-stone-950 text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-black/20 shadow-xs relative overflow-hidden">
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
            <a
              href="tel:+2347030372539"
              className="bg-black/90 hover:bg-black text-white hover:text-[#f5be38] font-black text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full transition-all shadow-sm border border-white/30 flex items-center gap-1.5 shrink-0 backdrop-blur-xs"
            >
              <Phone className="w-3 h-3 text-[#f5be38] shrink-0" />
              <span>+234 703 037 2539</span>
            </a>

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
                href="https://facebook.com" 
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
                href="mailto:orders@silverandgold.ng" 
                className="hover:text-black hover:scale-110 transition-all drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]"
                aria-label="Email"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>

              {/* Discreet Staff Portal in Top Bar */}
            </div>
          </div>
        </div>
      </div>

      {/* Main Brand Header Navigation - Sleek Black */}
      <div className="bg-[#000000]">
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
            <nav className="hidden md:flex items-center space-x-5 text-sm font-semibold text-stone-200">
              {/* Prints */}
              <div 
                className="relative group py-2"
                onMouseEnter={() => setActiveDropdown('prints')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  onClick={() => handleCategoryNav('advertising_materials')}
                  className="flex items-center gap-1 hover:text-[#ffd25d] text-stone-200 transition-colors cursor-pointer"
                >
                  <span>Prints</span>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400 group-hover:rotate-180 transition-transform" />
                </button>

                {activeDropdown === 'prints' && (
                  <div className="absolute top-full left-0 w-80 bg-[#0c0d12] border border-white/15 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in-50 duration-150 backdrop-blur-xl">
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
                <div className="absolute top-full left-0 w-80 bg-[#0c0d12] border border-white/15 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in-50 duration-150 backdrop-blur-xl">
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
                <div className="absolute top-full left-0 w-80 bg-[#0c0d12] border border-white/15 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in-50 duration-150 backdrop-blur-xl">
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
                <div className="absolute top-full left-0 w-80 bg-[#0c0d12] border border-white/15 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in-50 duration-150 backdrop-blur-xl">
                  {/* -Company Info */}
                  <button
                    onClick={() => {
                      onOpenInfoModal?.('info');
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item"
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
                      onOpenInfoModal?.('about');
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item"
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
                      onOpenInfoModal?.('services');
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item"
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
                      onOpenInfoModal?.('portfolios');
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item"
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
                      onOpenInfoModal?.('faq');
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item"
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
                      onOpenInfoModal?.('contact');
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item"
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

            {/* Unified Single Primary Action Button: Book Online */}
            <button
              id="desktop-header-book-online-btn"
              type="button"
              onClick={onOpenBookOnline}
              className="relative px-4 py-1.5 rounded-full bg-gradient-to-r from-[#ffd25d] via-[#e5c158] to-[#b8860b] hover:from-[#e5c158] hover:to-[#ffd25d] text-black font-extrabold text-xs tracking-tight shadow-md shadow-[#ffd25d]/25 flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer group"
              title="Configure, calculate live quote and book online"
            >
              <Calendar className="w-3.5 h-3.5 stroke-[2.4]" />
              <span className="whitespace-nowrap">Book Online</span>
              <span className="w-1.5 h-1.5 rounded-full bg-black/70 animate-pulse" />
            </button>

            {/* Subtle Custom Quote Link for non-standard/enterprise jobs */}
            {onOpenQuoteModal && (
              <button
                id="desktop-header-custom-quote-link"
                type="button"
                onClick={onOpenQuoteModal}
                className="text-stone-300 hover:text-[#f5be38] text-xs font-semibold px-2.5 py-1.5 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-1 cursor-pointer"
                title="Need custom die-cuts, foil stamping, or enterprise bulk specifications?"
              >
                <FileText className="w-3.5 h-3.5 text-[#f5be38]" />
                <span className="whitespace-nowrap">Custom Quote</span>
              </button>
            )}
          </nav>

          {/* Right Action Icons: Search + Cart */}
          <div className="flex items-center gap-3">
            {/* Search Icon / Toggle -> Opens Global Search Modal */}
            <button
              onClick={() => setShowSearchModal(true)}
              className="p-2 text-stone-300 hover:text-[#ffd25d] transition-colors rounded-full hover:bg-white/10 cursor-pointer"
              aria-label="Search items and categories"
              title="Search flyers, banners, business cards, signage..."
            >
              <Search className="w-5 h-5 stroke-[2.2]" />
            </button>

            {/* Shopping Cart Icon with Counter */}
            <button
              id="cart-toggle-btn"
              onClick={onOpenCart}
              className="relative flex items-center justify-center min-w-[44px] min-h-[44px] p-2 text-stone-200 hover:text-[#ffd25d] hover:bg-white/10 rounded-full transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
              {cartCount > 0 ? (
                <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#f5be38] text-black font-black text-[10px] flex items-center justify-center shadow-md animate-in zoom-in-75 duration-150">
                  {cartCount}
                </span>
              ) : (
                <span className="text-[11px] font-bold text-stone-400 ml-1">0</span>
              )}
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

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0b0e] border-b border-white/15 px-4 py-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
          
          {/* Mobile Instant Search Input Trigger */}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              setShowSearchModal(true);
            }}
            className="w-full py-2.5 px-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-left flex items-center justify-between text-stone-300 text-xs transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-[#ffd25d]" />
              <span className="text-stone-400">Search flyers, banners, cards, signs...</span>
            </span>
            <span className="text-[10px] text-[#ffd25d] font-bold px-1.5 py-0.5 rounded bg-[#ffd25d]/10 border border-[#ffd25d]/30">SEARCH</span>
          </button>

          {/* Mobile Direct Action Buttons */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookOnline?.();
              }}
              className="min-h-[44px] py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-[#ffd25d] via-[#f5be38] to-[#e5ab20] text-black font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#f5be38]/20 active:scale-95 transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-black" />
              <span>Book Online</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenCategoriesPage) {
                  onOpenCategoriesPage('all');
                } else {
                  onOpenCatalog?.();
                }
              }}
              className="min-h-[44px] py-2.5 px-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-[#ffd25d] border border-[#ffd25d]/40 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#ffd25d]" />
              <span>Catalog</span>
            </button>
          </div>

          {/* Subtle Custom Quote Row in Mobile Drawer */}
          {onOpenQuoteModal && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full min-h-[44px] py-2.5 px-3.5 rounded-xl bg-[#14141c] hover:bg-white/10 border border-white/15 text-stone-200 hover:text-white text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#ffd25d]" />
                <span>Need a Custom Enterprise Quote?</span>
              </span>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </button>
          )}

          <div className="text-xs font-bold text-stone-400 uppercase tracking-wider">
            Quick Navigation &amp; Info
          </div>
          {/* Quick Displays & Company Info Links */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
            <div className="text-xs font-bold uppercase tracking-wider text-[#ffd25d] mb-2.5 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-[#ffd25d]" />
              <span>Displays &amp; Company Hub</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { tab: 'info' as const, label: 'About / FAQs' },
                { tab: 'about' as const, label: 'About Us' },
                { tab: 'services' as const, label: 'Our Services' },
                { tab: 'portfolios' as const, label: 'Our Portfolios' },
                { tab: 'faq' as const, label: 'How It Works / FAQ' },
                { tab: 'contact' as const, label: 'Contact Us' },
              ].map((item) => (
                <button
                  key={item.tab}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenInfoModal?.(item.tab);
                  }}
                  className="min-h-[42px] px-3 py-2 bg-white/10 text-stone-100 hover:bg-white/20 active:bg-white/25 font-bold text-xs rounded-xl text-left shadow-xs border border-white/10 transition-colors flex items-center"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs font-bold text-stone-400 uppercase tracking-wider pt-1">
            Browse Categories
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onSelectCategory('all');
                setMobileMenuOpen(false);
                if (onOpenCategoriesPage) {
                  onOpenCategoriesPage('all');
                } else {
                  onNavigateHome();
                }
              }}
              className={`min-h-[44px] text-left p-3 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-[#ffd25d] to-[#f5be38] text-black shadow-md'
                  : 'bg-white/10 text-stone-200 hover:bg-white/15'
              }`}
            >
              All Products
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  setMobileMenuOpen(false);
                  if (onOpenCategoriesPage) {
                    onOpenCategoriesPage(cat.id);
                  } else {
                    onNavigateHome();
                  }
                }}
                className={`min-h-[44px] text-left p-3 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-[#ffd25d] to-[#f5be38] text-black font-bold shadow-md'
                    : 'bg-white/5 text-stone-200 hover:bg-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <a
              href="tel:+2347030372539"
              className="text-[#ffd25d] font-bold flex items-center gap-1.5 min-h-[40px] px-2"
            >
              📞 +234 703 037 2539
            </a>
            <a
              href="https://wa.me/2347030372539"
              target="_blank"
              rel="noreferrer"
              className="text-[#ffd25d] font-bold flex items-center gap-1.5 min-h-[40px] px-2"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      )}
      {/* Liquid Gold & Silver Hairline Accent under the whole header */}
      <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-[#f5be38] via-white to-transparent opacity-80" />

      {/* Global Interactive Search Modal / Palette */}
      <GlobalSearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onSelectCategory={(catId) => {
          handleCategoryNav(catId);
        }}
        onSelectProduct={(prodId) => {
          if (onOpenCategoriesPage) {
            onOpenCategoriesPage('all', prodId);
          } else {
            onNavigateHome();
          }
        }}
        onNavigateToPage={(page, docKey) => {
          if (onNavigateToPage) {
            onNavigateToPage(page, docKey);
          } else if (page === 'order' && onOpenBookOnline) {
            onOpenBookOnline();
          } else if (page === 'quote' && onOpenQuoteModal) {
            onOpenQuoteModal();
          } else if (page === 'categories' && onOpenCategoriesPage) {
            onOpenCategoriesPage('all');
          } else {
            onNavigateHome();
          }
        }}
        products={products}
      />
    </header>
  );
};

