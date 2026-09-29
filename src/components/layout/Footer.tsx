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
      {/* 1. HIGH-IMPACT PRE-FOOTER CONVERSION BANNER (Monochrome Luxury Bridge)    */}
      {/* ========================================================================= */}
      <div className="relative bg-gradient-to-r from-[#0a0a0f] via-[#14141e] to-[#0a0a0f] border-b border-white/10 py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        {/* Subtle decorative silver light glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/[0.04] rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Left Text Block */}
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[11px] sm:text-xs font-black tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>Full-Service Commercial Printing Press</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              Ready to bring your next print project to life?
            </h2>

            <p className="text-stone-300 text-sm sm:text-base font-normal leading-relaxed">
              Get an instant pre-press file audit, transparent volume pricing, or discuss your bespoke corporate requirements directly with our senior press engineers.
            </p>

            {/* 3 Quick Value Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-stone-300">
              <div className="flex items-center gap-1.5 text-stone-200">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                <span>Free Bleed &amp; Resolution Inspection</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-200">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                <span>24–48hr Rush Order Dispatch</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-200">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                <span>Direct Delivery to Your Location Upon Request</span>
              </div>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full lg:w-auto shrink-0">
            {/* WhatsApp Direct Chat Button */}
            <a
              href="https://wa.me/2347030372539?text=Hello%20Silver%20%26%20Gold%20Inkshine%20Ltd%2C%20I%20would%20like%20to%20discuss%20a%20commercial%20print%20job"
              target="_blank"
              rel="noreferrer"
              className="bg-white hover:bg-stone-200 text-black font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl flex items-center justify-center gap-2.5 shadow-[0_4px_16px_rgba(255,255,255,0.2)] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-black shrink-0">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>Chat on WhatsApp</span>
            </a>

            {/* Request Custom Quote Trigger */}
            <button
              type="button"
              onClick={onOpenQuoteModal}
              className="bg-[#181822] hover:bg-[#222230] text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl border border-white/30 flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>Request Custom Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN FOOTER CONTENT COLUMNS                                            */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Column 1: Brand, About Writeup, Social Proof Badges & Direct Links */}
          <div className="md:col-span-5 lg:col-span-4 space-y-6">
            {/* Logo Mark and Title */}
            <div className="flex items-center gap-3.5">
              <div className="relative w-12 h-12 flex items-center justify-center shrink-0 drop-shadow-md">
                <CompanyLogoMark className="w-full h-full" />
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-black tracking-tight leading-none flex items-center gap-1.5">
                  <span className="text-white drop-shadow-[0_1px_2px_rgba(255,255,255,0.2)] font-black">
                    SILVER
                  </span>
                  <span className="text-stone-300 font-bold text-sm sm:text-base">&amp;</span>
                  <span className="text-white drop-shadow-[0_1px_4px_rgba(255,255,255,0.2)] font-black">
                    GOLD
                  </span>
                </div>
                <div className="text-[11px] sm:text-xs font-black tracking-[0.25em] text-stone-300 leading-none mt-1.5 drop-shadow-xs">
                  INKSHINE LTD
                </div>
              </div>
            </div>

            {/* Credibility & Corporate Description */}
            <p className="text-sm sm:text-[14.5px] text-stone-200 leading-relaxed text-left font-normal">
              <strong className="text-white font-bold">Silver &amp; Gold Inkshine Ltd</strong> is an accredited commercial printing corporation, proudly recognized as Nigeria&apos;s trusted hub for high-precision offset and digital production. We deliver tailored branding and print solutions that empower corporate institutions, SMEs, government bodies, and event planners across all 36 States. Featured on <strong className="text-white font-bold">Business Insider</strong>.
            </p>

            {/* Corporate Registration & Trust Seals */}
            <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-2 text-xs">
              <div className="flex items-center justify-between text-stone-300">
                <span className="flex items-center gap-1.5 text-stone-200 font-bold">
                  <BadgeCheck className="w-4 h-4 text-white" />
                  <span>Corporate Affairs Commission:</span>
                </span>
                <span className="font-mono text-white font-black px-2 py-0.5 rounded bg-white/10 border border-white/20">
                  RC Certified
                </span>
              </div>
              <div className="flex items-center justify-between text-stone-300">
                <span className="flex items-center gap-1.5 text-stone-200 font-bold">
                  <ShieldCheck className="w-4 h-4 text-white" />
                  <span>Quality Assurance:</span>
                </span>
                <span className="text-white font-bold">
                  100% Pre-Press Guarantee
                </span>
              </div>
            </div>

            {/* Quick Policy Triggers */}
            <div className="text-xs text-stone-400 space-x-2 pt-1">
              <button 
                type="button"
                onClick={() => onOpenInfoModal?.('terms')}
                className="text-white hover:text-stone-300 font-bold underline underline-offset-2 cursor-pointer"
              >
                Terms &amp; Conditions
              </button>
              <span>•</span>
              <button 
                type="button"
                onClick={() => onOpenInfoModal?.('privacy')}
                className="text-white hover:text-stone-300 font-bold underline underline-offset-2 cursor-pointer"
              >
                Privacy Policy
              </button>
              <span>•</span>
              <button 
                type="button"
                onClick={() => onOpenInfoModal?.('contact')}
                className="text-white hover:text-stone-300 font-bold underline underline-offset-2 cursor-pointer"
              >
                Return Policy
              </button>
            </div>

            {/* Social Media Channels (Clean Monochrome Pills) */}
            <div className="pt-1">
              <div className="text-[11px] text-stone-400 font-bold uppercase tracking-wider mb-2">Connect With Our Studio</div>
              <div className="flex items-center gap-3">
                {/* Instagram */}
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 flex items-center justify-center shadow-md transition-all"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>

                {/* Facebook */}
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 flex items-center justify-center shadow-md transition-all"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* YouTube */}
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 flex items-center justify-center shadow-md transition-all"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Structured Print Categories (Organized by Customer Intent) */}
          <div className="md:col-span-4 lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-white/15 pb-2">
              <span className="w-2 h-2 rounded-full bg-white" />
              <h3 className="font-black text-lg sm:text-xl text-white tracking-wide">
                Commercial Print Catalog
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-[13px]">
              
              {/* Category Group A: Stationery & Marketing */}
              <div className="space-y-2">
                <div className="text-[11px] font-black uppercase tracking-wider text-white border-b border-white/10 pb-1 mb-2">
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
                    className="flex items-center gap-1.5 text-stone-300 hover:text-white transition-colors text-left py-0.5 group w-full cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-stone-500 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
                    <span className="group-hover:underline">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Category Group B: Large Format & Branding */}
              <div className="space-y-2">
                <div className="text-[11px] font-black uppercase tracking-wider text-white border-b border-white/10 pb-1 mb-2">
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
                    className="flex items-center gap-1.5 text-stone-300 hover:text-white transition-colors text-left py-0.5 group w-full cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-stone-500 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
                    <span className="group-hover:underline">{item.label}</span>
                  </button>
                ))}
              </div>

            </div>
          </div>

          {/* Column 3: Press Plants, Contact & Direct WhatsApp Payment (Monochrome Styling) */}
          <div className="md:col-span-3 lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2 border-b border-white/15 pb-2">
              <span className="w-2 h-2 rounded-full bg-white" />
              <h3 className="font-black text-lg sm:text-xl text-white tracking-wide">
                Press Plant &amp; Offices
              </h3>
            </div>

            {/* Production Locations */}
            <div className="text-xs text-stone-200 leading-relaxed bg-white/5 p-3.5 rounded-xl border border-white/10 space-y-2.5">
              <div>
                <div className="flex items-center gap-1.5 text-white font-black text-[11px] uppercase tracking-wider mb-0.5">
                  <Building2 className="w-3.5 h-3.5 text-white" />
                  <span>Head Office &amp; Main Production Press</span>
                </div>
                <span className="text-white font-medium">No. 875 Medford Okilo Road (Mbiama-Yenagoa Road), Opolo-Epie, directly opposite Pepperoni, Yenagoa, Bayelsa State, Nigeria.</span>
              </div>

              <div className="pt-2 border-t border-white/10">
                <div className="flex items-center gap-1.5 text-white font-bold text-[11px] uppercase tracking-wider mb-0.5">
                  <Truck className="w-3.5 h-3.5 text-white" />
                  <span>Doorstep &amp; Nationwide Delivery Upon Request</span>
                </div>
                <p className="text-stone-300 text-[11px] leading-relaxed">
                  When your job is ready, we deliver directly to your specific office, home or event address in Bayelsa and across Nigeria.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. BOTTOM FULL-WIDTH COPYRIGHT STRIP (Safe Area for Frosted Glass Dock)    */}
      {/* ========================================================================= */}
      <div className="bg-[#030305] border-t border-white/15 text-stone-300 py-6 px-4 sm:px-6 lg:px-8 pb-32 sm:pb-36">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          
          {/* Copyright Notice */}
          <p className="text-xs sm:text-sm font-medium text-stone-300">
            &copy; {new Date().getFullYear()} <strong className="text-white font-bold">Silver &amp; Gold Inkshine Ltd</strong>. All rights reserved. Registered commercial printer in Nigeria.
          </p>

          {/* Back to Top Smooth Action */}
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white text-stone-200 hover:text-black font-bold text-xs border border-white/20 hover:border-white transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

        </div>
      </div>

    </footer>
  );
};
