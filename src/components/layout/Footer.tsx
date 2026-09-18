import React from 'react';
import { 
  Phone, 
  Mail, 
  ArrowRight,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { ProductCategory } from '../../types/schema';
import { InfoModalTab } from '../common/CompanyInfoModal';

interface FooterProps {
  onSelectCategory: (cat: ProductCategory | 'all') => void;
  onOpenAdmin?: () => void;
  onOpenInfoModal?: (tab?: InfoModalTab) => void;
  onOpenCategoriesPage?: (catKey?: string) => void;
  onOpenQuoteModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onSelectCategory, 
  onOpenAdmin, 
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
    <footer className="bg-black text-stone-300 border-t border-white/15">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          
          {/* ========================================================= */}
          {/* Column 1: Brand, About Writeup, Social Icons & Actions    */}
          {/* ========================================================= */}
          <div className="md:col-span-5 lg:col-span-4 space-y-5">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              {/* Gold & Emerald SG Emblem */}
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#d97706] via-[#10b981] to-[#047857] flex items-center justify-center shrink-0 shadow-xs ring-1 ring-amber-400/40">
                <span className="font-black text-white text-xs tracking-tighter">SG</span>
              </div>

              {/* Brand Text */}
              <div className="leading-none">
                <span className="block font-black text-lg tracking-tight text-white font-sans">
                  SILVER &amp; GOLD
                </span>
                <span className="block font-bold text-[10px] tracking-wider text-[#10b981] uppercase">
                  INKSHINE LTD
                </span>
              </div>
            </div>

            {/* Description Writeup (Exact from design reference with company name) */}
            <p className="text-[13px] sm:text-sm text-stone-300 leading-relaxed text-justify sm:text-left">
              <strong className="text-white font-bold">Silver &amp; Gold Inkshine Ltd</strong> is a complete commercial printing company based in Lagos, Nigeria, and proudly recognized as the Nation&apos;s No.1 trusted online shop for printing. We deliver professional, high-quality print solutions that help businesses, organizations, and individuals stand out. Silver &amp; Gold Inkshine Ltd is proud to be featured on <strong className="text-white font-bold">Business Insider</strong>, a trusted global business and media platform. This recognition strengthens our commitment to providing quality printing, branding, and advertising solutions across Nigeria.{' '}
              <button 
                type="button"
                onClick={() => onOpenInfoModal?.('contact')}
                className="text-[#f5be38] hover:text-[#ffd666] font-semibold hover:underline cursor-pointer"
              >
                Contact us
              </button>{' '}
              for more info. Read our{' '}
              <button 
                type="button"
                onClick={() => onOpenInfoModal?.('terms')}
                className="text-[#f5be38] hover:text-[#ffd666] font-semibold hover:underline cursor-pointer"
              >
                Terms &amp; Conditions
              </button>
              ,{' '}
              <button 
                type="button"
                onClick={() => onOpenInfoModal?.('privacy')}
                className="text-[#f5be38] hover:text-[#ffd666] font-semibold hover:underline cursor-pointer"
              >
                Private Policy
              </button>{' '}
              and{' '}
              <button 
                type="button"
                onClick={() => onOpenInfoModal?.('terms')}
                className="text-[#f5be38] hover:text-[#ffd666] font-semibold hover:underline cursor-pointer"
              >
                Return Policy
              </button>
            </p>

            {/* Social Media Circular Badges */}
            <div className="flex items-center gap-2.5 pt-1">
              {/* Instagram */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shadow-xs hover:opacity-90 transition-opacity"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-white stroke-2">
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
                className="w-8 h-8 rounded-full bg-[#FF0000] flex items-center justify-center text-white shadow-xs hover:opacity-90 transition-opacity"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center text-white shadow-xs hover:opacity-90 transition-opacity"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Pinterest */}
              <a 
                href="https://pinterest.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Pinterest"
                className="w-8 h-8 rounded-full bg-[#E60023] flex items-center justify-center text-white shadow-xs hover:opacity-90 transition-opacity"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.546.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-[#0A66C2] flex items-center justify-center text-white shadow-xs hover:opacity-90 transition-opacity"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              {/* Email */}
              <a 
                href="mailto:orders@silverandgold.ng" 
                aria-label="Email"
                className="w-8 h-8 rounded-full bg-white/10 text-stone-200 flex items-center justify-center shadow-xs hover:bg-white/20 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 stroke-[2.2]" />
              </a>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <div>
                <button
                  type="button"
                  onClick={() => onOpenQuoteModal ? onOpenQuoteModal() : window.open("https://wa.me/2347030372539?text=Hello%20Silver%20%26%20Gold%20Inkshine%20Ltd%2C%20I%20would%20like%20to%20request%20a%20quote", "_blank")}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-sm bg-[#00473e] hover:bg-[#03554a] text-white font-bold text-sm shadow-xs transition-colors cursor-pointer border border-emerald-500/30"
                >
                  <span>Get a Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div>
                <a
                  href="https://share.google/5obB8jqnby72M5IDG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-sm bg-[#65a30d] hover:bg-[#52840a] text-white font-bold text-xs sm:text-[13px] shadow-xs transition-colors cursor-pointer text-left leading-snug max-w-xs group"
                >
                  <span className="shrink-0 w-5 h-5 rounded-full bg-white flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" aria-hidden="true">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                  </span>
                  <span>Add Silver &amp; Gold Inkshine Ltd as a Preferred Source on Google</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100 shrink-0 ml-auto" />
                </a>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* Column 2: Quick Links (2 Sub-Columns side-by-side)        */}
          {/* ========================================================= */}
          <div className="md:col-span-4 lg:col-span-5 space-y-4">
            <h3 className="font-extrabold text-base sm:text-lg text-white tracking-tight">
              Quick Links
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-[13px] text-stone-300">
              {/* Left Sub-Column */}
              <div className="space-y-2.5">
                <div>
                  <button 
                    type="button" 
                    onClick={() => handleCategoryClick('advertising_materials')}
                    className="hover:text-[#f5be38] transition-colors text-left"
                  >
                    Advertising Materials
                  </button>
                </div>
                <div>
                  <button 
                    type="button" 
                    onClick={() => handleCategoryClick('awards')}
                    className="hover:text-[#f5be38] transition-colors text-left"
                  >
                    Awards
                  </button>
                </div>
                <div>
                  <button 
                    type="button" 
                    onClick={() => handleCategoryClick('banners_stands')}
                    className="hover:text-[#f5be38] transition-colors text-left"
                  >
                    Banners &amp; Stands
                  </button>
                </div>
                <div>
                  <button 
                    type="button" 
                    onClick={() => handleCategoryClick('books_magazines')}
                    className="hover:text-[#f5be38] transition-colors text-left"
                  >
                    Books &amp; Magazines
                  </button>
                </div>
                <div>
                  <button 
                    type="button" 
                    onClick={() => handleCategoryClick('cards_invitations')}
                    className="hover:text-[#f5be38] transition-colors text-left"
                  >
                    Cards &amp; Invitations
                  </button>
                </div>
                <div>
                  <button 
                    type="button" 
                    onClick={() => handleCategoryClick('company_stamps_seals')}
                    className="hover:text-[#f5be38] transition-colors text-left"
                  >
                    Company Stamps &amp; Seals
                  </button>
                </div>
                <div>
                  <button 
                    type="button" 
                    onClick={() => handleCategoryClick('custom_apparels_caps')}
                    className="hover:text-[#f5be38] transition-colors text-left"
                  >
                    Custom Apparels &amp; Caps
                  </button>
                </div>
                <div>
                  <button 
                    type="button" 
                    onClick={() => handleCategoryClick('events_exhibitions')}
                    className="hover:text-[#f5be38] transition-colors text-left"
                  >
                    Events &amp; Exhibitions
                  </button>
                </div>
                <div>
                  <button 
                    type="button" 
                    onClick={() => handleCategoryClick('flyer_handbill')}
                    className="hover:text-[#f5be38] transition-colors text-left"
                  >
                    Flyer &amp; Handbill Printing
                  </button>
                </div>
                <div>
                  <button 
                    type="button" 
                    onClick={() => handleCategoryClick('food_packaging')}
                    className="hover:text-[#f5be38] transition-colors text-left"
                  >
                    Food Packaging
                  </button>
                </div>
                <div>
                  <button 
                    type="button" 
                    onClick={() => handleCategoryClick('signages')}
                    className="hover:text-[#f5be38] transition-colors text-left"
                  >
                    Signages
                  </button>
                </div>
              </div>

              {/* Right Sub-Column */}
              <div className="space-y-2.5">
                <div>
                  <button 
                    type="button" 
                    onClick={() => handleCategoryClick('frames_wall_arts')}
                    className="hover:text-[#f5be38] transition-colors text-left"
                  >
                    Frames &amp; Wall Arts
                  </button>
                </div>
                <div>
                  <button 
                    type="button" 
                    onClick={() => handleCategoryClick('gift_items_souvenirs')}
                    className="hover:text-[#f5be38] transition-colors text-left"
                  >
                    Gift Items &amp; Souvenirs
                  </button>
                </div>
                <div>
                  <button 
                    type="button" 
                    onClick={() => handleCategoryClick('office_stationery')}
                    className="hover:text-[#f5be38] transition-colors text-left"
                  >
                    Office Stationery &amp; Corporate Branding
                  </button>
                </div>
                <div>
                  <button 
                    type="button" 
                    onClick={() => handleCategoryClick('outdoor_displays')}
                    className="hover:text-[#f5be38] transition-colors text-left"
                  >
                    Outdoor Displays
                  </button>
                </div>
                <div>
                  <button 
                    type="button" 
                    onClick={() => handleCategoryClick('packages')}
                    className="hover:text-[#f5be38] transition-colors text-left"
                  >
                    Packages
                  </button>
                </div>
                <div>
                  <button 
                    type="button" 
                    onClick={() => handleCategoryClick('packaging_cartons')}
                    className="hover:text-[#f5be38] transition-colors text-left"
                  >
                    Packaging and Shipping Cartons
                  </button>
                </div>
                <div>
                  <button 
                    type="button" 
                    onClick={() => handleCategoryClick('paper_bags_tags')}
                    className="hover:text-[#f5be38] transition-colors text-left"
                  >
                    Paper Bags &amp; Tags
                  </button>
                </div>
                <div>
                  <button 
                    type="button" 
                    onClick={() => handleCategoryClick('stickers_labels')}
                    className="hover:text-[#f5be38] transition-colors text-left"
                  >
                    Stickers &amp; Labels
                  </button>
                </div>
                <div>
                  <button 
                    type="button" 
                    onClick={() => handleCategoryClick('vehicle_branding')}
                    className="hover:text-[#f5be38] transition-colors text-left"
                  >
                    Vehicle Branding
                  </button>
                </div>
                <div>
                  <button 
                    type="button" 
                    onClick={() => handleCategoryClick('wedding')}
                    className="hover:text-[#f5be38] transition-colors text-left"
                  >
                    Wedding
                  </button>
                </div>
                <div>
                  <button 
                    type="button" 
                    onClick={() => handleCategoryClick('printing_machines')}
                    className="hover:text-[#f5be38] transition-colors text-left"
                  >
                    Printing Machines
                  </button>
                </div>
                <div>
                  <button 
                    type="button" 
                    onClick={() => handleCategoryClick('events_exhibitions')}
                    className="hover:text-[#f5be38] transition-colors text-left"
                  >
                    Event Planner Lagos
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* Column 3: Contact Us, Business Hours & Payment Badges     */}
          {/* ========================================================= */}
          <div className="md:col-span-3 lg:col-span-3 space-y-4">
            <h3 className="font-extrabold text-base sm:text-lg text-white tracking-tight">
              Contact Us
            </h3>

            {/* Address */}
            <div className="text-[13px] text-stone-300 leading-relaxed">
              <strong className="text-white font-bold block">Head Office:</strong>
              <span>7 George St, off Apata Street, Somolu, Lagos 100231, Lagos.</span>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-2 text-[13px] text-stone-300">
              <span className="text-[#10b981] shrink-0">
                <Phone className="w-4 h-4 fill-none stroke-current stroke-[2.2]" />
              </span>
              <a 
                href="tel:+2349028694908" 
                className="font-medium text-stone-200 hover:text-[#f5be38] transition-colors"
              >
                +2349028694908
              </a>
            </div>

            {/* Email */}
            <div className="flex items-center gap-2 text-[13px] text-stone-300">
              <span className="text-[#10b981] shrink-0">
                <Mail className="w-4 h-4 fill-none stroke-current stroke-[2.2]" />
              </span>
              <a 
                href="mailto:orders@silverandgold.ng" 
                className="font-medium text-stone-200 hover:text-[#f5be38] transition-colors"
              >
                orders@silverandgold.ng
              </a>
            </div>

            {/* Operating Hours */}
            <div className="text-[13px] text-stone-300 space-y-1 pt-1">
              <div>
                Mon - Fri: <strong className="text-white font-bold">09:00AM - 5:30PM.</strong>
              </div>
              <div>
                Sat: <strong className="text-white font-bold">10:00AM - 4:00PM.</strong>
              </div>
              <div>
                Sun: <strong className="text-white font-bold">Closed</strong>
              </div>
            </div>

            {/* Payment Method Badges (Exact from Screenshot) */}
            <div className="pt-2">
              <div className="flex items-center gap-1.5 flex-wrap">
                {/* VISA */}
                <div className="h-6 px-2 rounded-xs border border-white/20 bg-white flex items-center justify-center shadow-2xs">
                  <span className="font-extrabold text-[10px] italic tracking-tighter text-[#1A1F71]">
                    VISA
                  </span>
                </div>

                {/* PayPal */}
                <div className="h-6 px-2 rounded-xs border border-white/20 bg-white flex items-center justify-center shadow-2xs">
                  <span className="font-bold text-[10px] italic text-[#003087]">
                    Pay<span className="text-[#0079C1]">Pal</span>
                  </span>
                </div>

                {/* Maestro */}
                <div className="h-6 px-1.5 rounded-xs border border-white/20 bg-white flex items-center justify-center gap-0.5 shadow-2xs">
                  <div className="flex -space-x-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EB001B]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0099DF]" />
                  </div>
                  <span className="font-bold text-[9px] text-stone-700 ml-0.5">
                    maestro
                  </span>
                </div>

                {/* MasterCard */}
                <div className="h-6 px-1.5 rounded-xs border border-white/20 bg-white flex items-center justify-center gap-0.5 shadow-2xs">
                  <div className="flex -space-x-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EB001B]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F79E1B]" />
                  </div>
                  <span className="font-bold text-[9px] text-stone-700 ml-0.5">
                    mastercard
                  </span>
                </div>

                {/* Discover */}
                <div className="h-6 px-2 rounded-xs border border-white/20 bg-white flex items-center justify-center shadow-2xs">
                  <span className="font-bold text-[9px] tracking-tight text-stone-900">
                    DISC<span className="text-[#FF6000]">O</span>VER
                  </span>
                </div>
              </div>
            </div>

            {/* Discreet Admin Desk Link */}
            {onOpenAdmin && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="text-[11px] text-stone-400 hover:text-stone-200 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ShieldCheck className="w-3 h-3 text-[#10b981]" />
                  <span>Admin &amp; Operations Desk</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* Bottom Full-Width Black Bar with Clean Border             */}
      {/* ========================================================= */}
      <div className="bg-[#050505] border-t border-white/10 text-stone-400 py-4 px-4 text-center">
        <p className="text-xs sm:text-[13px] font-medium text-stone-300">
          Copyright &copy; {new Date().getFullYear()} Silver &amp; Gold Inkshine Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
