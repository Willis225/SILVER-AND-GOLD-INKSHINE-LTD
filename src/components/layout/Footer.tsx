import React from 'react';
import { 
  Phone, 
  Mail, 
  ArrowRight,
  ExternalLink,
  MapPin,
  Navigation,
  Clock,
  ChevronRight
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

  return (
    <footer className="bg-[#07070a] text-stone-100 border-t-2 border-[#f5be38]/30 relative z-20">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          
          {/* ========================================================= */}
          {/* Column 1: Brand, About Writeup, Social Icons & Actions    */}
          {/* ========================================================= */}
          <div className="md:col-span-5 lg:col-span-4 space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-3.5">
              {/* Official Silver & Gold Inkshine Emblem */}
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center shrink-0 drop-shadow-md">
                <CompanyLogoMark className="w-full h-full" />
              </div>

              {/* Brand Text */}
              <div>
                <div className="text-lg sm:text-2xl font-black tracking-tight leading-none flex items-center gap-1.5">
                  <span className="text-white drop-shadow-[0_1px_2px_rgba(255,255,255,0.2)] font-black">
                    SILVER
                  </span>
                  <span className="text-[#f5be38] font-bold text-sm sm:text-base">&amp;</span>
                  <span className="text-[#f5be38] drop-shadow-[0_1px_4px_rgba(245,190,56,0.35)] font-black">
                    GOLD
                  </span>
                </div>
                <div className="text-[11px] sm:text-xs font-black tracking-[0.25em] text-white leading-none mt-1.5 drop-shadow-xs">
                  INKSHINE LTD
                </div>
              </div>
            </div>

            {/* High-Contrast Description Writeup */}
            <p className="text-sm sm:text-[15px] text-stone-100 leading-relaxed text-left font-normal">
              <strong className="text-white font-bold">Silver &amp; Gold Inkshine Ltd</strong> is a complete commercial printing company based in Lagos, Nigeria, and proudly recognized as the Nation&apos;s No.1 trusted online shop for printing. We deliver professional, high-quality print solutions that help businesses, organizations, and individuals stand out. Silver &amp; Gold Inkshine Ltd is proud to be featured on <strong className="text-white font-bold">Business Insider</strong>, a trusted global business and media platform. This recognition strengthens our commitment to providing quality printing, branding, and advertising solutions across Nigeria.{' '}
              <button 
                type="button"
                onClick={() => onOpenInfoModal?.('contact')}
                className="text-[#f5be38] hover:text-[#ffd666] font-bold underline underline-offset-2 cursor-pointer"
              >
                Contact us
              </button>{' '}
              for more info. Read our{' '}
              <button 
                type="button"
                onClick={() => onOpenInfoModal?.('terms')}
                className="text-[#f5be38] hover:text-[#ffd666] font-bold underline underline-offset-2 cursor-pointer"
              >
                Terms &amp; Conditions
              </button>
              ,{' '}
              <button 
                type="button"
                onClick={() => onOpenInfoModal?.('privacy')}
                className="text-[#f5be38] hover:text-[#ffd666] font-bold underline underline-offset-2 cursor-pointer"
              >
                Privacy Policy
              </button>{' '}
              and{' '}
              <button 
                type="button"
                onClick={() => onOpenInfoModal?.('terms')}
                className="text-[#f5be38] hover:text-[#ffd666] font-bold underline underline-offset-2 cursor-pointer"
              >
                Return Policy
              </button>.
            </p>

            {/* Social Media Circular Badges */}
            <div className="flex items-center gap-3 pt-1">
              {/* Instagram */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shadow-md hover:scale-105 transition-transform"
              >
                <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-none stroke-white stroke-2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              {/* YouTube */}
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-[#FF0000] flex items-center justify-center text-white shadow-md hover:scale-105 transition-transform"
              >
                <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-white">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-[#1877F2] flex items-center justify-center text-white shadow-md hover:scale-105 transition-transform"
              >
                <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-white">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Pinterest */}
              <a 
                href="https://pinterest.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Pinterest"
                className="w-9 h-9 rounded-full bg-[#E60023] flex items-center justify-center text-white shadow-md hover:scale-105 transition-transform"
              >
                <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-white">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.546.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-[#0A66C2] flex items-center justify-center text-white shadow-md hover:scale-105 transition-transform"
              >
                <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-white">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              {/* Email */}
              <a 
                href="mailto:orders@silverandgold.ng" 
                aria-label="Email"
                className="w-9 h-9 rounded-full bg-white/15 text-white flex items-center justify-center shadow-md hover:bg-[#f5be38] hover:text-black transition-colors"
              >
                <Mail className="w-4.5 h-4.5 stroke-[2.2]" />
              </a>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <div>
                <button
                  type="button"
                  onClick={() => onOpenQuoteModal ? onOpenQuoteModal() : window.open("https://wa.me/2347030372539?text=Hello%20Silver%20%26%20Gold%20Inkshine%20Ltd%2C%20I%20would%20like%20to%20request%20a%20quote", "_blank")}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#f5be38] to-[#b8860b] hover:from-[#e5c158] hover:via-[#fed766] hover:to-[#c69214] text-stone-950 font-black text-sm shadow-lg transition-all cursor-pointer border border-amber-300 active:scale-95"
                >
                  <span>Get a Quote</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>

              <div>
                <a
                  href="https://share.google/5obB8jqnby72M5IDG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-[#65a30d] hover:bg-[#52840a] text-white font-bold text-xs sm:text-[13.5px] shadow-md transition-colors cursor-pointer text-left leading-snug max-w-sm group border border-lime-400/40"
                >
                  <span className="shrink-0 w-5.5 h-5.5 rounded-full bg-white flex items-center justify-center shadow-xs">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                  </span>
                  <span>Add Silver &amp; Gold Inkshine Ltd as a Preferred Source on Google</span>
                  <ExternalLink className="w-4 h-4 opacity-90 group-hover:opacity-100 shrink-0 ml-auto text-lime-200" />
                </a>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* Column 2: Quick Links (2 Sub-Columns side-by-side)        */}
          {/* ========================================================= */}
          <div className="md:col-span-4 lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-white/15 pb-2">
              <span className="w-2 h-2 rounded-full bg-[#f5be38]" />
              <h3 className="font-black text-lg sm:text-xl text-white tracking-wide">
                Quick Links &amp; Categories
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2.5 text-sm font-medium text-stone-100">
              {/* Left Sub-Column */}
              <div className="space-y-2">
                {[
                  { key: 'advertising_materials', label: 'Advertising Materials' },
                  { key: 'awards', label: 'Awards' },
                  { key: 'banners_stands', label: 'Banners & Stands' },
                  { key: 'books_magazines', label: 'Books & Magazines' },
                  { key: 'cards_invitations', label: 'Cards & Invitations' },
                  { key: 'carports', label: 'Carports' },
                  { key: 'custom_apparels_caps', label: 'Custom Apparels & Caps' },
                  { key: 'events_exhibitions', label: 'Events & Exhibitions' },
                  { key: 'flyer_handbill', label: 'Flyer & Handbill Printing' },
                  { key: 'food_packaging', label: 'Food Packaging' },
                  { key: 'signages', label: 'Signages' }
                ].map((item) => (
                  <button 
                    key={item.key}
                    type="button" 
                    onClick={() => handleCategoryClick(item.key)}
                    className="flex items-center gap-1.5 text-stone-200 hover:text-[#f5be38] transition-colors text-left py-0.5 group w-full cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#f5be38]/70 group-hover:text-[#f5be38] group-hover:translate-x-0.5 transition-all shrink-0" />
                    <span className="group-hover:underline">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Right Sub-Column */}
              <div className="space-y-2">
                {[
                  { key: 'frames_wall_arts', label: 'Frames & Wall Arts' },
                  { key: 'gift_items_souvenirs', label: 'Gift Items & Souvenirs' },
                  { key: 'office_stationery', label: 'Office Stationery & Branding' },
                  { key: 'outdoor_displays', label: 'Outdoor Displays' },
                  { key: 'packages', label: 'Packages' },
                  { key: 'packaging_cartons', label: 'Packaging & Shipping Cartons' },
                  { key: 'paper_bags_tags', label: 'Paper Bags & Tags' },
                  { key: 'stickers_labels', label: 'Stickers & Labels' },
                  { key: 'vehicle_branding', label: 'Vehicle Branding' },
                  { key: 'wedding', label: 'Wedding Printing' },
                  { key: 'printing_machines', label: 'Printing Machines' },
                  { key: 'events_exhibitions', label: 'Event Planner Lagos' }
                ].map((item) => (
                  <button 
                    key={item.label}
                    type="button" 
                    onClick={() => handleCategoryClick(item.key)}
                    className="flex items-center gap-1.5 text-stone-200 hover:text-[#f5be38] transition-colors text-left py-0.5 group w-full cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#f5be38]/70 group-hover:text-[#f5be38] group-hover:translate-x-0.5 transition-all shrink-0" />
                    <span className="group-hover:underline">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* Column 3: Contact Us, Business Hours & Map Preview        */}
          {/* ========================================================= */}
          <div className="md:col-span-3 lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2 border-b border-white/15 pb-2">
              <span className="w-2 h-2 rounded-full bg-[#f5be38]" />
              <h3 className="font-black text-lg sm:text-xl text-white tracking-wide">
                Contact &amp; Location
              </h3>
            </div>

            {/* Address */}
            <div className="text-sm text-stone-200 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/10">
              <div className="flex items-center gap-1.5 text-[#f5be38] font-black text-xs uppercase tracking-wider mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>Head Office</span>
              </div>
              <span className="text-white font-medium">7 George St, off Apata Street, Somolu, Lagos 100231, Lagos State, Nigeria.</span>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-2.5 text-sm text-stone-100 bg-white/5 p-2.5 rounded-xl border border-white/10">
              <div className="w-7 h-7 rounded-lg bg-[#f5be38]/20 flex items-center justify-center text-[#f5be38] shrink-0">
                <Phone className="w-4 h-4 fill-none stroke-current stroke-[2.2]" />
              </div>
              <div>
                <div className="text-[11px] text-stone-400 font-bold uppercase">Phone &amp; WhatsApp</div>
                <a 
                  href="tel:+2347030372539" 
                  className="font-bold text-white hover:text-[#f5be38] transition-colors"
                >
                  +234 703 037 2539
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-2.5 text-sm text-stone-100 bg-white/5 p-2.5 rounded-xl border border-white/10">
              <div className="w-7 h-7 rounded-lg bg-[#f5be38]/20 flex items-center justify-center text-[#f5be38] shrink-0">
                <Mail className="w-4 h-4 fill-none stroke-current stroke-[2.2]" />
              </div>
              <div>
                <div className="text-[11px] text-stone-400 font-bold uppercase">Official Email</div>
                <a 
                  href="mailto:orders@silverandgold.ng" 
                  className="font-bold text-white hover:text-[#f5be38] transition-colors break-all"
                >
                  orders@silverandgold.ng
                </a>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="text-xs sm:text-sm text-stone-200 bg-white/5 p-3 rounded-xl border border-white/10 space-y-1.5">
              <div className="flex items-center gap-1.5 text-[#f5be38] font-black text-xs uppercase tracking-wider mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Working Hours</span>
              </div>
              <div className="flex items-center justify-between text-stone-200">
                <span>Mon – Fri:</span>
                <strong className="text-white font-bold">09:00 AM – 05:30 PM</strong>
              </div>
              <div className="flex items-center justify-between text-stone-200">
                <span>Saturday:</span>
                <strong className="text-white font-bold">10:00 AM – 04:00 PM</strong>
              </div>
              <div className="flex items-center justify-between text-stone-200">
                <span>Sunday:</span>
                <strong className="text-amber-400 font-bold">Closed</strong>
              </div>
            </div>

            {/* Interactive Google Map Preview & Link */}
            <div className="pt-1 space-y-2">
              <div className="rounded-2xl overflow-hidden border border-white/20 bg-stone-900 shadow-md">
                <div className="relative h-28 w-full bg-stone-950">
                  <iframe
                    title="Silver & Gold Printing House Location Map"
                    src="https://maps.google.com/maps?q=9.081999,8.675277&hl=en&z=16&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full block filter contrast-105"
                  />
                  <div className="absolute top-2 left-2 bg-black/90 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/20 text-[10.5px] text-[#f5be38] font-black flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#f5be38]" />
                    <span>Silver &amp; Gold Printing House</span>
                  </div>
                </div>

                <div className="p-2.5 bg-stone-950 border-t border-white/15 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#f5be38] font-bold flex items-center gap-1">
                      <Navigation className="w-3 h-3" />
                      Google Maps Link
                    </span>
                    <a
                      href="https://maps.app.goo.gl/FHkoQGNuL8p13jnG6"
                      target="_blank"
                      rel="noreferrer"
                      className="text-white hover:text-[#f5be38] text-xs font-bold flex items-center gap-0.5 underline"
                    >
                      <span>Open Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <a
                    href="https://maps.app.goo.gl/FHkoQGNuL8p13jnG6"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 px-3 rounded-lg bg-[#b8860b] hover:bg-[#d4af37] text-black text-xs font-extrabold flex items-center justify-center gap-1.5 transition-colors shadow-md"
                  >
                    <span>Get GPS Directions on Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Payment Method Badges */}
            <div className="pt-2">
              <div className="text-[11px] text-stone-400 font-bold uppercase mb-1.5">Accepted Payment Methods</div>
              <div className="flex items-center gap-2 flex-wrap">
                {/* VISA */}
                <div className="h-7 px-2.5 rounded-sm bg-white flex items-center justify-center shadow-xs">
                  <span className="font-black text-xs italic tracking-tighter text-[#1A1F71]">
                    VISA
                  </span>
                </div>

                {/* PayPal */}
                <div className="h-7 px-2.5 rounded-sm bg-white flex items-center justify-center shadow-xs">
                  <span className="font-extrabold text-xs italic text-[#003087]">
                    Pay<span className="text-[#0079C1]">Pal</span>
                  </span>
                </div>

                {/* Maestro */}
                <div className="h-7 px-2 rounded-sm bg-white flex items-center justify-center gap-1 shadow-xs">
                  <div className="flex -space-x-1">
                    <span className="w-3 h-3 rounded-full bg-[#EB001B]" />
                    <span className="w-3 h-3 rounded-full bg-[#0099DF]" />
                  </div>
                  <span className="font-extrabold text-[10px] text-stone-800 ml-0.5">
                    maestro
                  </span>
                </div>

                {/* MasterCard */}
                <div className="h-7 px-2 rounded-sm bg-white flex items-center justify-center gap-1 shadow-xs">
                  <div className="flex -space-x-1">
                    <span className="w-3 h-3 rounded-full bg-[#EB001B]" />
                    <span className="w-3 h-3 rounded-full bg-[#F79E1B]" />
                  </div>
                  <span className="font-extrabold text-[10px] text-stone-800 ml-0.5">
                    mastercard
                  </span>
                </div>

                {/* Discover */}
                <div className="h-7 px-2.5 rounded-sm bg-white flex items-center justify-center shadow-xs">
                  <span className="font-black text-[10px] tracking-tight text-stone-900">
                    DISC<span className="text-[#FF6000]">O</span>VER
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* Bottom Full-Width Bar with Clean Border                   */}
      {/* ========================================================= */}
      <div className="bg-[#030305] border-t border-white/20 text-white py-5 px-4 text-center">
        <p className="text-xs sm:text-sm font-semibold text-stone-200">
          Copyright &copy; {new Date().getFullYear()} <strong className="text-white font-bold">Silver &amp; Gold Inkshine Ltd</strong>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
