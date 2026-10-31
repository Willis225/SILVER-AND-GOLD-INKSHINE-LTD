import React from 'react';
import { 
  Phone, 
  Mail, 
  ArrowRight,
  MapPin,
  Clock,
  ChevronRight,
  ShieldCheck,
  Truck,
  Sparkles,
  ArrowUp,
  FileCheck,
  CheckCircle2,
  Building2,
  BadgeCheck
} from 'lucide-react';
import { ProductCategory } from '../../types/schema';
import { InfoModalTab } from '../common/CompanyInfoModal';
import { CompanyLogoMark } from '../common/CompanyLogo';

interface FooterProps {
  onSelectCategory: (cat: ProductCategory | 'all') => void;
  onOpenInfoModal?: (tab?: InfoModalTab) => void;
  onOpenCategoriesPage?: (catKey?: string) => void;
  onOpenQuoteModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onSelectCategory, 
  onOpenInfoModal,
  onOpenCategoriesPage,
  onOpenQuoteModal 
}) => {
  const handleCategoryClick = (catKey: string) => {
    if (onOpenCategoriesPage) {
      onOpenCategoriesPage(catKey);
    } else {
      onSelectCategory(catKey as ProductCategory);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07070a] text-stone-100 border-t-2 border-white/20 relative z-20 overflow-hidden">
      {/* ========================================================================= */}
      {/* MAIN FOOTER CONTENT COLUMNS                                               */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Column 1: Brand, About Writeup, Social Proof Badges & Direct Links */}
          <div className="md:col-span-5 lg:col-span-4 space-y-6">
            {/* Logo Mark and Title */}
            <div className="flex items-center gap-3.5">
              <div className="relative w-12 h-12 flex items-center justify-center shrink-0 drop-shadow-xs">
                <CompanyLogoMark className="w-full h-full" />
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-black tracking-tight leading-none flex items-center gap-1.5">
                  <span className="text-teal-700 font-black">
                    PrintHub
                  </span>
                  <span className="text-slate-300 font-semibold text-sm sm:text-base">/</span>
                  <span className="text-slate-900 font-black">
                    SILVER &amp; GOLD
                  </span>
                </div>
                <div className="text-[11px] sm:text-xs font-black tracking-[0.2em] text-teal-600 leading-none mt-1.5">
                  INKSHINE LTD
                </div>
              </div>
            </div>

            {/* Credibility & Corporate Description */}
            <p className="text-sm sm:text-[14.5px] text-slate-600 leading-relaxed text-left font-normal">
              <strong className="text-slate-900 font-bold">Silver &amp; Gold Inkshine Ltd</strong> is Nigeria&apos;s accredited commercial printing company, delivering high-precision large format printing, corporate branding, custom apparel, and packaging with fast 3–5 day delivery nationwide.
            </p>

            {/* Contact details */}
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-600 shrink-0" />
                <a href="tel:+2348100913543" className="hover:text-teal-700 font-semibold text-slate-800">
                  +234 810 091 3543 | 0811 028 5530
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-600 shrink-0" />
                <a href="mailto:orders@silverandgold.ng" className="hover:text-teal-700 text-slate-800">
                  orders@silverandgold.ng
                </a>
              </div>
            </div>

            {/* Corporate Registration & Trust Seals */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5 text-slate-700 font-bold">
                  <BadgeCheck className="w-4 h-4 text-teal-600" />
                  <span>Corporate Affairs Commission:</span>
                </span>
                <span className="font-mono text-teal-800 font-black px-2 py-0.5 rounded bg-teal-50 border border-teal-200/60">
                  RC Certified
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5 text-slate-700 font-bold">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  <span>Quality Assurance:</span>
                </span>
                <span className="text-slate-900 font-bold">
                  100% Pre-Press Guarantee
                </span>
              </div>
            </div>

            {/* Quick Policy Triggers */}
            <div className="text-xs text-slate-500 space-x-2 pt-1">
              <button 
                type="button"
                onClick={() => onOpenInfoModal?.('terms')}
                className="text-slate-700 hover:text-teal-700 font-bold underline underline-offset-2 cursor-pointer"
              >
                Terms &amp; Conditions
              </button>
              <span>•</span>
              <button 
                type="button"
                onClick={() => onOpenInfoModal?.('privacy')}
                className="text-slate-700 hover:text-teal-700 font-bold underline underline-offset-2 cursor-pointer"
              >
                Privacy Policy
              </button>
              <span>•</span>
              <button 
                type="button"
                onClick={() => onOpenInfoModal?.('returns')}
                className="text-slate-700 hover:text-teal-700 font-bold underline underline-offset-2 cursor-pointer"
              >
                Refund Policy
              </button>
            </div>
          </div>

          {/* Column 2: Structured Print Categories */}
          <div className="md:col-span-4 lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <span className="w-2 h-2 rounded-full bg-teal-600" />
              <h3 className="font-black text-lg sm:text-xl text-slate-900 tracking-wide">
                Commercial Print Catalog
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-[13px]">
              
              {/* Category Group A: Stationery & Marketing */}
              <div className="space-y-2">
                <div className="text-[11px] font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
                  Stationery &amp; Marketing
                </div>
                {[
                  { key: 'cards_invitations', label: 'Business Cards & Invitations' },
                  { key: 'flyers_handbills', label: 'Flyers, Posters & Leaflets' },
                  { key: 'books_magazines', label: 'Books, Brochures & Annual Reports' },
                  { key: 'office_stationery', label: 'Letterheads & Office Stationery' },
                  { key: 'paper_bags_tags', label: 'Paper Bags & Hang Tags' },
                  { key: 'stickers_labels', label: 'Waterproof Die-Cut Stickers' },
                  { key: 'wedding', label: 'Wedding Stationery & Programs' },
                ].map((item) => (
                  <button 
                    key={item.key}
                    type="button" 
                    onClick={() => handleCategoryClick(item.key)}
                    className="flex items-center gap-1.5 text-slate-600 hover:text-teal-700 transition-colors text-left py-0.5 group w-full cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                    <span className="group-hover:underline">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Category Group B: Large Format & Packaging */}
              <div className="space-y-2">
                <div className="text-[11px] font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
                  Large Format &amp; Packaging
                </div>
                {[
                  { key: 'banners_stands', label: 'Roll-Up Banners & Teardrop Flags' },
                  { key: 'signages', label: '3D Illuminated Signages & Letters' },
                  { key: 'packaging_shipping_cartons', label: 'Packaging Boxes & Cartons' },
                  { key: 'custom_apparels_caps', label: 'Screen & DTF Custom Apparels' },
                  { key: 'awards', label: 'Crystal Awards & Souvenirs' },
                  { key: 'vehicle_branding', label: 'Fleet & Vehicle Vinyl Wrapping' },
                  { key: 'frames_wall_arts', label: 'Canvas Frames & Wall Arts' },
                ].map((item) => (
                  <button 
                    key={item.key}
                    type="button" 
                    onClick={() => handleCategoryClick(item.key)}
                    className="flex items-center gap-1.5 text-slate-600 hover:text-teal-700 transition-colors text-left py-0.5 group w-full cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                    <span className="group-hover:underline">{item.label}</span>
                  </button>
                ))}
              </div>

            </div>
          </div>

          {/* Column 3: Press Plants, Location & Working Hours */}
          <div className="md:col-span-3 lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <span className="w-2 h-2 rounded-full bg-teal-600" />
              <h3 className="font-black text-lg sm:text-xl text-slate-900 tracking-wide">
                Press Plant &amp; Offices
              </h3>
            </div>

            {/* Production Locations */}
            <div className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2.5">
              <div>
                <div className="flex items-center gap-1.5 text-slate-900 font-black text-[11px] uppercase tracking-wider mb-1">
                  <Building2 className="w-3.5 h-3.5 text-teal-600" />
                  <span>Head Office &amp; Production Press</span>
                </div>
                <span className="text-slate-700 font-medium">No. 875 Medford Okilo Road (Mbiama-Yenagoa Road), Opolo-Epie, opposite Pepperoni, Yenagoa, Bayelsa State, Nigeria.</span>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <div className="flex items-center gap-1.5 text-slate-900 font-bold text-[11px] uppercase tracking-wider mb-1">
                  <Truck className="w-3.5 h-3.5 text-teal-600" />
                  <span>Nationwide Express Delivery</span>
                </div>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Fast 3–5 business day delivery directly to your door across Lagos, Abuja, Port Harcourt, Bayelsa and all 36 States.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. BOTTOM FULL-WIDTH COPYRIGHT STRIP & PAYMENT BADGES                     */}
      {/* ========================================================================= */}
      <div className="bg-slate-50 border-t border-slate-200 text-slate-600 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          
          {/* Copyright Notice */}
          <p className="text-xs sm:text-sm font-medium text-slate-600">
            &copy; {new Date().getFullYear()} <strong className="text-slate-900 font-bold">SILVER &amp; GOLD INKSHINE LTD</strong>. All rights reserved. Registered Commercial Printer in Nigeria.
          </p>

          {/* Secure Payment Badges */}
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
            <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700">Paystack</span>
            <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700">Mastercard</span>
            <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700">Visa</span>
            <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700">Verve</span>
            <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700">Bank Transfer</span>
          </div>

          {/* Back to Top Smooth Action */}
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs border border-slate-200 transition-all cursor-pointer shadow-2xs active:scale-95"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

        </div>
      </div>

    </footer>
  );
};
