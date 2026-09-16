import React, { useState } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Phone, 
  Menu, 
  X, 
  ChevronDown,
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
import { ProductCategory } from '../../types/schema';
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
  onOpenAdmin?: () => void;
  onOpenInfoModal?: (tab?: InfoModalTab) => void;
}

export const CATEGORIES: { id: ProductCategory; label: string }[] = [
  // Prints
  { id: 'advertising_materials', label: 'Advertising Materials' },
  { id: 'stickers_labels', label: 'Stickers & Labels' },
  { id: 'flyers_handbills', label: 'Flyer & Handbill' },
  { id: 'cards_invitations', label: 'Cards & Invitations' },
  { id: 'office_stationery', label: 'Office Stationery & Branding' },
  { id: 'books_magazines', label: 'Books & Magazines' },
  { id: 'stamps_seals', label: 'Company Stamps & Seals' },
  // Branding
  { id: 'custom_apparels_caps', label: 'Custom Apparels & Caps' },
  { id: 'company_uniforms', label: 'Company Uniforms' },
  { id: 'gift_items_souvenirs', label: 'Gift Items & Souvenirs' },
  { id: 'food_packaging', label: 'Food Packaging' },
  { id: 'packaging_shipping_cartons', label: 'Packaging & Cartons' },
  { id: 'paper_bags_tags', label: 'Paper Bags & Tags' },
  { id: 'vehicle_branding', label: 'Vehicle Branding' },
  { id: 'packages', label: 'Packages' },
  // Displays
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
  onOpenAdmin,
  onOpenInfoModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showSearchModal, setShowSearchModal] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#000000] border-b border-white/10 shadow-lg">
      {/* Top Utility Bar: Shining Gold and Mix of Silver */}
      <div className="gold-silver-shimmer text-stone-900 text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-[#a87a20]/30 shadow-xs relative overflow-hidden">
        {/* Subtle glossy sheen sweep */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-black/5" />

        <div className="relative max-w-7xl mx-auto flex items-center justify-between">
          {/* Left Text */}
          <div className="font-extrabold text-xs sm:text-sm tracking-wide text-stone-900 flex items-center gap-1.5 drop-shadow-[0_1px_0_rgba(255,255,255,0.7)]">
            <span className="w-2 h-2 rounded-full bg-amber-600 shadow-[0_0_8px_rgba(217,119,6,0.8)] animate-pulse" />
            <span>Fast Nationwide Delivery</span>
          </div>

          {/* Right Section: Call Button + Social Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="tel:+2347030372539"
              className="bg-[#0b0c10] hover:bg-[#181a20] text-[#fbf5b7] hover:text-white font-bold text-[11px] sm:text-xs px-3 sm:px-3.5 py-1 rounded-md transition-all shadow-sm border border-amber-400/40 flex items-center gap-1.5"
            >
              <span>Call: +2347030372539</span>
            </a>

            {/* Social Icons */}
            <div className="hidden sm:flex items-center gap-2.5 text-stone-900/85">
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
            <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold text-stone-200">
              {/* Prints */}
              <div 
                className="relative group py-2"
                onMouseEnter={() => setActiveDropdown('prints')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  onClick={() => {
                    onSelectCategory('advertising_materials');
                    onNavigateHome();
                  }}
                  className="flex items-center gap-1 hover:text-[#65b32e] text-stone-200 transition-colors"
                >
                  <span>Prints</span>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400 group-hover:rotate-180 transition-transform" />
                </button>

                {activeDropdown === 'prints' && (
                  <div className="absolute top-full left-0 w-80 bg-[#0c0d12] border border-white/15 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in-50 duration-150 backdrop-blur-xl">
                    <button
                      onClick={() => {
                        onSelectCategory('advertising_materials');
                        setActiveDropdown(null);
                        onNavigateHome();
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item"
                    >
                      <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#65b32e] group-hover/item:text-black transition-colors">
                        <Megaphone className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-white group-hover/item:text-[#65b32e]">Advertising Materials</div>
                        <div className="text-[11px] text-stone-400 truncate">Rollup banners, flags, posters &amp; backdrops</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        onSelectCategory('stickers_labels');
                        setActiveDropdown(null);
                        onNavigateHome();
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item"
                    >
                      <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#65b32e] group-hover/item:text-black transition-colors">
                        <Tag className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-white group-hover/item:text-[#65b32e]">Stickers &amp; Labels</div>
                        <div className="text-[11px] text-stone-400 truncate">Product packaging, bottle &amp; die-cut vinyl stickers</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        onSelectCategory('flyers_handbills');
                        setActiveDropdown(null);
                        onNavigateHome();
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item"
                    >
                      <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#65b32e] group-hover/item:text-black transition-colors">
                        <FileText className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-white group-hover/item:text-[#65b32e]">Flyer &amp; Handbill Printing</div>
                        <div className="text-[11px] text-stone-400 truncate">A5, A6 marketing leaflets on gloss &amp; matte art paper</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        onSelectCategory('cards_invitations');
                        setActiveDropdown(null);
                        onNavigateHome();
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item"
                    >
                      <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#65b32e] group-hover/item:text-black transition-colors">
                        <Mail className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-white group-hover/item:text-[#65b32e]">Cards &amp; Invitations</div>
                        <div className="text-[11px] text-stone-400 truncate">Matte business cards, VIP invitations &amp; greeting cards</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        onSelectCategory('office_stationery');
                        setActiveDropdown(null);
                        onNavigateHome();
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item"
                    >
                      <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#65b32e] group-hover/item:text-black transition-colors">
                        <Briefcase className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-white group-hover/item:text-[#65b32e]">Office Stationery &amp; Corporate Branding</div>
                        <div className="text-[11px] text-stone-400 truncate">Letterheads, envelopes, presentation folders &amp; notepads</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        onSelectCategory('books_magazines');
                        setActiveDropdown(null);
                        onNavigateHome();
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item"
                    >
                      <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#65b32e] group-hover/item:text-black transition-colors">
                        <BookOpen className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-white group-hover/item:text-[#65b32e]">Books &amp; Magazines</div>
                        <div className="text-[11px] text-stone-400 truncate">Annual reports, catalogs, profile booklets &amp; magazines</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        onSelectCategory('stamps_seals');
                        setActiveDropdown(null);
                        onNavigateHome();
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item"
                    >
                      <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#65b32e] group-hover/item:text-black transition-colors">
                        <Stamp className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-white group-hover/item:text-[#65b32e]">Company Stamps &amp; Seals</div>
                        <div className="text-[11px] text-stone-400 truncate">Self-inking date stamps &amp; heavy-duty embossing seals</div>
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
                onClick={() => {
                  onSelectCategory('custom_apparels_caps');
                  onNavigateHome();
                }}
                className="flex items-center gap-1 hover:text-[#65b32e] text-stone-200 transition-colors"
              >
                <span>Branding</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 group-hover:rotate-180 transition-transform" />
              </button>

              {activeDropdown === 'branding' && (
                <div className="absolute top-full left-0 w-80 bg-[#0c0d12] border border-white/15 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in-50 duration-150 backdrop-blur-xl">
                  <button
                    onClick={() => {
                      onSelectCategory('custom_apparels_caps');
                      setActiveDropdown(null);
                      onNavigateHome();
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#65b32e] group-hover/item:text-black transition-colors">
                      <Shirt className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#65b32e]">Custom Apparels &amp; Caps</div>
                      <div className="text-[11px] text-stone-400 truncate">Polo shirts, round neck tees, branded face caps &amp; hoodies</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onSelectCategory('company_uniforms');
                      setActiveDropdown(null);
                      onNavigateHome();
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#65b32e] group-hover/item:text-black transition-colors">
                      <UserCheck className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#65b32e]">Company Uniforms</div>
                      <div className="text-[11px] text-stone-400 truncate">Staff shirts, executive workwear, medical scrubs &amp; safety overalls</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onSelectCategory('gift_items_souvenirs');
                      setActiveDropdown(null);
                      onNavigateHome();
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#65b32e] group-hover/item:text-black transition-colors">
                      <Gift className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#65b32e]">Gift Items &amp; Souvenirs</div>
                      <div className="text-[11px] text-stone-400 truncate">Ceramic mugs, vacuum flasks, executive pens &amp; event umbrellas</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onSelectCategory('food_packaging');
                      setActiveDropdown(null);
                      onNavigateHome();
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#65b32e] group-hover/item:text-black transition-colors">
                      <Utensils className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#65b32e]">Food Packaging</div>
                      <div className="text-[11px] text-stone-400 truncate">Burger boxes, pastry packs, takeout bowls &amp; greaseproof wrap</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onSelectCategory('packaging_shipping_cartons');
                      setActiveDropdown(null);
                      onNavigateHome();
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#65b32e] group-hover/item:text-black transition-colors">
                      <Package className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#65b32e]">Packaging and Shipping Cartons</div>
                      <div className="text-[11px] text-stone-400 truncate">Corrugated brown boxes, mailer cartons &amp; cargo packaging</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onSelectCategory('paper_bags_tags');
                      setActiveDropdown(null);
                      onNavigateHome();
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#65b32e] group-hover/item:text-black transition-colors">
                      <Tag className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#65b32e]">Paper Bags &amp; Tags</div>
                      <div className="text-[11px] text-stone-400 truncate">Kraft shopping carrier bags, boutique rope shoppers &amp; clothing tags</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onSelectCategory('vehicle_branding');
                      setActiveDropdown(null);
                      onNavigateHome();
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#65b32e] group-hover/item:text-black transition-colors">
                      <Car className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#65b32e]">Vehicle Branding</div>
                      <div className="text-[11px] text-stone-400 truncate">Commercial fleet wraps, delivery bus graphics &amp; one-way vision</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onSelectCategory('packages');
                      setActiveDropdown(null);
                      onNavigateHome();
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#65b32e] group-hover/item:text-black transition-colors">
                      <Layers className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#65b32e]">Packages</div>
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
                onClick={() => {
                  onSelectCategory('banners_stands');
                  onNavigateHome();
                }}
                className="flex items-center gap-1 hover:text-[#65b32e] text-stone-200 transition-colors"
              >
                <span>Displays</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 group-hover:rotate-180 transition-transform" />
              </button>

              {activeDropdown === 'displays' && (
                <div className="absolute top-full left-0 w-80 bg-[#0c0d12] border border-white/15 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in-50 duration-150 backdrop-blur-xl">
                  <button
                    onClick={() => {
                      onSelectCategory('banners_stands');
                      setActiveDropdown(null);
                      onNavigateHome();
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#65b32e] group-hover/item:text-black transition-colors">
                      <Flag className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#65b32e]">Banners &amp; Stands</div>
                      <div className="text-[11px] text-stone-400 truncate">Rollup teardrop base, standard pull-ups &amp; X-banners</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onSelectCategory('outdoor_displays');
                      setActiveDropdown(null);
                      onNavigateHome();
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#65b32e] group-hover/item:text-black transition-colors">
                      <Sun className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#65b32e]">Outdoor Displays</div>
                      <div className="text-[11px] text-stone-400 truncate">Teardrop flying flags, feather banners &amp; event gazebos</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onSelectCategory('signages');
                      setActiveDropdown(null);
                      onNavigateHome();
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#65b32e] group-hover/item:text-black transition-colors">
                      <Signpost className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#65b32e]">Signages</div>
                      <div className="text-[11px] text-stone-400 truncate">3D illuminated acrylic letters, aluminum fascia boards</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onSelectCategory('events_exhibitions');
                      setActiveDropdown(null);
                      onNavigateHome();
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#65b32e] group-hover/item:text-black transition-colors">
                      <Calendar className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#65b32e]">Events &amp; Exhibitions</div>
                      <div className="text-[11px] text-stone-400 truncate">Media backdrops, exhibition booth popups &amp; podiums</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onSelectCategory('frames_wallarts');
                      setActiveDropdown(null);
                      onNavigateHome();
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#65b32e] group-hover/item:text-black transition-colors">
                      <ImageIcon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#65b32e]">Frames &amp; Wall Arts</div>
                      <div className="text-[11px] text-stone-400 truncate">Canvas gallery wraps, acrylic floating prints &amp; wood frames</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onSelectCategory('awards');
                      setActiveDropdown(null);
                      onNavigateHome();
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#65b32e] group-hover/item:text-black transition-colors">
                      <Award className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#65b32e]">Awards</div>
                      <div className="text-[11px] text-stone-400 truncate">Crystal engraved trophies, wooden plaques &amp; medals</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onSelectCategory('printing_machines');
                      setActiveDropdown(null);
                      onNavigateHome();
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#65b32e] group-hover/item:text-black transition-colors">
                      <Printer className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#65b32e]">Printing Machines</div>
                      <div className="text-[11px] text-stone-400 truncate">Large format eco-solvent printers, DTF &amp; laminators</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onSelectCategory('wedding');
                      setActiveDropdown(null);
                      onNavigateHome();
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#65b32e] group-hover/item:text-black transition-colors">
                      <Heart className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#65b32e]">Wedding</div>
                      <div className="text-[11px] text-stone-400 truncate">Event welcome boards, ceremonial backdrop &amp; guest books</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onSelectCategory('carports');
                      setActiveDropdown(null);
                      onNavigateHome();
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold text-stone-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3 group/item"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#65b32e] group-hover/item:text-black transition-colors">
                      <Car className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#65b32e]">Carports</div>
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
                className="flex items-center gap-1 hover:text-[#65b32e] text-stone-200 transition-colors"
              >
                <span>Info</span>
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
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#65b32e] group-hover/item:text-black transition-colors">
                      <Info className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#65b32e]">Info</div>
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
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#65b32e] group-hover/item:text-black transition-colors">
                      <Building2 className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#65b32e]">About Us</div>
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
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#65b32e] group-hover/item:text-black transition-colors">
                      <Printer className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#65b32e]">Our Services</div>
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
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#65b32e] group-hover/item:text-black transition-colors">
                      <ImageIcon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#65b32e]">Our Portfolios</div>
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
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#65b32e] group-hover/item:text-black transition-colors">
                      <HelpCircle className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#65b32e]">How It Works / FAQ</div>
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
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-stone-300 flex items-center justify-center shrink-0 group-hover/item:bg-[#65b32e] group-hover/item:text-black transition-colors">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white group-hover/item:text-[#65b32e]">Contact Us</div>
                      <div className="text-[11px] text-stone-400 truncate">Yenagoa press complex, WhatsApp &amp; telephone desk</div>
                    </div>
                  </button>

                  {onOpenAdmin && (
                    <div className="pt-1 mt-1 border-t border-white/10">
                      <button
                        onClick={() => {
                          setActiveDropdown(null);
                          onOpenAdmin();
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-amber-400 hover:bg-white/10 transition-colors flex items-center justify-between"
                      >
                        <span>Press &amp; Admin Desk</span>
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Icons: Search + Cart */}
          <div className="flex items-center gap-3">
            {/* Search Icon / Toggle */}
            <div className="relative">
              <button
                onClick={() => setShowSearchModal(!showSearchModal)}
                className="p-2 text-stone-300 hover:text-[#65b32e] transition-colors rounded-full hover:bg-white/10"
                aria-label="Search items"
              >
                <Search className="w-5 h-5 stroke-[2.2]" />
              </button>

              {showSearchModal && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-[#0c0d12] border border-white/15 rounded-2xl shadow-2xl p-3 z-50">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => onSearchChange(e.target.value)}
                      placeholder="Search roll-up banners, flags, stickers..."
                      autoFocus
                      className="w-full bg-white/10 border border-white/20 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#65b32e]"
                    />
                    <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                  {searchQuery && (
                    <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                      <span className="text-stone-400">Filtering catalog...</span>
                      <button 
                        onClick={() => {
                          onSearchChange('');
                          setShowSearchModal(false);
                        }}
                        className="text-stone-400 hover:text-white font-bold"
                      >
                        Clear
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Shopping Cart Icon with Counter matching screenshot */}
            <button
              id="cart-toggle-btn"
              onClick={onOpenCart}
              className="flex items-center gap-1.5 p-1.5 text-stone-200 hover:text-[#65b32e] transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
              <span className="text-xs font-bold text-stone-200">
                {cartCount}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-stone-200 md:hidden hover:text-[#65b32e]"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0b0e] border-b border-white/15 px-4 py-3 space-y-3">
          <div className="text-xs font-bold text-stone-400 uppercase tracking-wider">
            Explore Categories
          </div>
          {/* Quick Displays & Company Info Links */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" />
              <span>Displays &amp; Company Hub</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {[
                { tab: 'info' as const, label: 'Info' },
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
                  className="px-2.5 py-1.5 bg-white/10 text-stone-200 hover:bg-white/20 font-semibold text-xs rounded-lg text-left shadow-xs border border-white/10 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onSelectCategory('all');
                setMobileMenuOpen(false);
                onNavigateHome();
              }}
              className={`text-left p-2.5 rounded-lg text-xs font-bold ${
                selectedCategory === 'all'
                  ? 'bg-[#65b32e] text-black'
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
                  onNavigateHome();
                }}
                className={`text-left p-2.5 rounded-lg text-xs font-semibold ${
                  selectedCategory === cat.id
                    ? 'bg-[#65b32e] text-black'
                    : 'bg-white/5 text-stone-300 hover:bg-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
            <a
              href="tel:+2347030372539"
              className="text-emerald-400 font-bold"
            >
              📞 +234 703 037 2539
            </a>
            {onOpenAdmin && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Desk</span>
              </button>
            )}
            <a
              href="https://wa.me/2347030372539"
              target="_blank"
              rel="noreferrer"
              className="text-[#65b32e] font-bold"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

