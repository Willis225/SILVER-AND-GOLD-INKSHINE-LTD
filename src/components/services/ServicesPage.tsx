import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  FileText, 
  Flag, 
  Megaphone, 
  Package, 
  Shirt, 
  Building2, 
  Gift, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  Tag, 
  Truck, 
  UploadCloud, 
  Check, 
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { CompanyLogoMark } from '../common/CompanyLogo';
import { ProductCategory } from '../../types/schema';

interface ServicesPageProps {
  onNavigateHome: () => void;
  onSelectCategory: (categoryKey: ProductCategory | string) => void;
  onOpenQuoteModal?: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigateHome,
  onSelectCategory,
  onOpenQuoteModal
}) => {
  const WHATSAPP_LINK = 'https://wa.me/2347030372539?text=Hello%20Silver%20%26%20Gold%20Inkshine%20Ltd%2C%20I%20would%20like%20to%20inquire%20about%20your%20printing%20services';

  const SERVICE_CATEGORIES = [
    {
      id: 'office_stationery',
      icon: FileText,
      title: 'Business Stationery',
      description: 'Professional business cards, letterheads, envelopes, presentation folders, notepads & company profiles. Sharp, consistent branding on every document.',
      items: [
        'Premium Matte/Gloss Business Cards',
        'Executive Letterheads & Complimentary Slips',
        'Branded Envelopes & Notepads',
        'Presentation Folders & File Jackets',
        'Annual Reports & Company Profiles'
      ],
      buttonLabel: 'View Stationery Pricing'
    },
    {
      id: 'banners_stands',
      icon: Flag,
      title: 'Banners & Event Displays',
      description: 'High-impact banners and display materials that make your brand impossible to miss at trade fairs, campaigns, and gatherings.',
      items: [
        'Luxury & Standard Roll-Up Stands',
        'Flex & Vinyl Banners (any size)',
        'Teardrop & Feather Flags',
        'Backdrop Stands & Pop-Up Walls',
        'Gazebo Tents & Promotional Tables',
        'A1/A2 Posters & Window Decals'
      ],
      buttonLabel: 'View Banner Options'
    },
    {
      id: 'flyers_handbills',
      icon: Megaphone,
      title: 'Flyers & Promotional Materials',
      description: 'Premium marketing prints that get your message seen — bulk discounts available for campaigns and nationwide distribution.',
      items: [
        'A5/A4 Gloss & Matte Flyers',
        'Brochures & Event Programmes',
        'Handbills & Leaflets',
        'Menu Cards & Price Lists',
        'Calendars & Branded Diaries',
        'Pocket Folders & Info Cards'
      ],
      buttonLabel: 'View Marketing Prints'
    },
    {
      id: 'packaging_shipping_cartons',
      icon: Package,
      title: 'Packaging & Branded Labels',
      description: 'Custom boxes, bags, and labels that protect your products and build your brand identity — perfect for small businesses and e-commerce.',
      items: [
        'Custom Product Boxes & Cartons',
        'Food-Safe Packaging & Takeout Containers',
        'Kraft & Art Paper Gift Bags',
        'Waterproof Vinyl & Die-Cut Stickers',
        'Product Labels & Bottle Labels',
        'Shipping Cartons & Branded Mailers'
      ],
      buttonLabel: 'View Packaging Options'
    },
    {
      id: 'custom_apparels_caps',
      icon: Shirt,
      title: 'Branded Clothing & Apparel',
      description: 'Durable, vibrant custom clothing for teams, events, and merchandise — screen and DTF printed to last.',
      items: [
        'Branded T-Shirts & Polos',
        'Embroidered Corporate Uniforms',
        'Face Caps & Hats',
        'Hoodies & Staff Jackets',
        'Aprons & Workwear',
        'Event Souvenir Shirts'
      ],
      buttonLabel: 'View Apparel'
    },
    {
      id: 'signages',
      icon: Building2,
      title: 'Signage & 3D Branding',
      description: 'Premium indoor and outdoor signage that boosts visibility and makes a lasting first impression — design, production, and installation available.',
      items: [
        '3D Illuminated LED Channel Letters',
        'Acrylic Reception Signs & Plaques',
        'Shop Front Signs & Pylons',
        'Lightbox & Backlit Displays',
        'Safety, Warning & Directional Signs',
        'Vehicle Branding & Fleet Wraps'
      ],
      buttonLabel: 'View Signage'
    },
    {
      id: 'gift_items_souvenirs',
      icon: Gift,
      title: 'Corporate Gifts & Promotional Items',
      description: 'Useful, high-quality branded gifts that keep your business top of mind with clients, staff, and partners.',
      items: [
        'Custom Mugs & Water Bottles',
        'Branded Pens & Notepads',
        'Tote Bags & Keychains',
        'Executive Gift Sets',
        'Custom Door Mats & Floor Branding',
        'Event Souvenir Packs'
      ],
      buttonLabel: 'View Gift Items'
    },
    {
      id: 'awards',
      icon: Award,
      title: 'Awards & Plaques',
      description: 'Elegant, professionally engraved awards and recognition pieces for schools, corporate milestones, and ceremonies.',
      items: [
        'Crystal & Glass Engraved Plaques',
        'Wooden Shields & Wall Plaques',
        'Custom Trophies & Medals',
        'Appreciation & Service Awards',
        'Graduation & Ceremony Keepsakes'
      ],
      buttonLabel: 'View Awards'
    }
  ];

  return (
    <div className="min-h-screen bg-[#09090d] text-stone-200 antialiased selection:bg-[#D4AF37]/30 selection:text-white">
      


      {/* ========================================================================= */}
      {/* SECTION 1 — PAGE HERO                                                     */}
      {/* ========================================================================= */}
      <section className="relative bg-[#0F0F12] pt-16 pb-14 sm:pt-20 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 sm:w-[500px] h-96 sm:h-[500px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.12)_0%,transparent_70%)] blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 space-y-5">
          {/* Gold Accent Line */}
          <div className="w-[60px] h-[3px] bg-[#D4AF37] rounded-full shadow-[0_0_12px_rgba(212,175,55,0.5)]" />

          {/* H1 Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
            Our Printing Services
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-[#C8C8CC] max-w-2xl font-normal leading-relaxed">
            Full-Service Commercial Printing — Everything Your Brand Needs, Under One Roof
          </p>

          {/* Body */}
          <p className="text-sm sm:text-base text-[#E8E8EA] max-w-3xl leading-relaxed font-normal pt-1">
            From everyday business cards to large-format signage, custom packaging, and corporate gifts — we deliver premium, consistent printing for businesses, government bodies, and events across Bayelsa and all 36 States of Nigeria.
          </p>

          {/* CTA Row */}
          <div className="flex flex-wrap items-center gap-3.5 pt-3">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="bg-[#D4AF37] hover:bg-[#e5c158] text-[#0F0F12] font-black text-xs sm:text-sm px-7 py-3.5 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp Now</span>
            </a>

            {onOpenQuoteModal ? (
              <button
                type="button"
                onClick={onOpenQuoteModal}
                className="border border-[#D4AF37] hover:bg-white/10 text-white font-bold text-xs sm:text-sm px-7 py-3.5 rounded-xl transition-all active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <span>Request Custom Quote</span>
              </button>
            ) : (
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="border border-[#D4AF37] hover:bg-white/10 text-white font-bold text-xs sm:text-sm px-7 py-3.5 rounded-xl transition-all active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <span>Request Custom Quote</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2 — ALL SERVICES (8 Category Grid)                                 */}
      {/* ========================================================================= */}
      <section className="bg-[#0F0F12] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICE_CATEGORIES.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: (idx % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-[#1A1A1F] rounded-[10px] p-8 border border-white/10 hover:border-[#D4AF37] hover:-translate-y-1 transition-all duration-400 flex flex-col justify-between shadow-lg group"
                >
                  <div className="space-y-4">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-colors">
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>

                    {/* H3 Title */}
                    <h3 className="text-xl sm:text-[22px] font-semibold text-white group-hover:text-[#D4AF37] transition-colors leading-tight">
                      {service.title}
                    </h3>

                    {/* Body */}
                    <p className="text-xs sm:text-sm text-[#C8C8CC] leading-relaxed">
                      {service.description}
                    </p>

                    {/* What We Print Checklist */}
                    <div className="space-y-2 pt-2 border-t border-white/10">
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#D4AF37]">
                        What We Print:
                      </div>
                      <ul className="space-y-1.5 text-xs text-stone-300">
                        {service.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-2">
                            <span className="text-[#D4AF37] text-sm shrink-0 leading-none mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Secondary Action Button */}
                  <div className="pt-6">
                    <button
                      type="button"
                      onClick={() => onSelectCategory(service.id)}
                      className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white text-stone-200 hover:text-black font-bold text-xs border border-white/15 hover:border-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95 group/btn"
                    >
                      <span>{service.buttonLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3 — HOW IT WORKS (Simple Order Flow)                               */}
      {/* ========================================================================= */}
      <section className="bg-[#1A1A1F] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#D4AF37] tracking-tight">
              How It Works — From Idea to Delivery
            </h2>
            <p className="text-sm sm:text-base text-[#C8C8CC]">
              Simple, transparent, stress-free printing
            </p>
          </div>

          {/* 4 Steps Horizontal Flow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className="bg-[#0F0F12] p-6 sm:p-7 rounded-2xl border border-white/10 space-y-3 relative shadow-md">
              <div className="text-3xl font-black text-[#D4AF37] font-mono">01</div>
              <h3 className="text-lg font-bold text-white">Send Your Design</h3>
              <p className="text-xs text-[#C8C8CC] leading-relaxed">
                Share your ready file or describe what you need. We accept PDF, AI, PNG, CDR, and more. Don’t have artwork? Our design team can create it for you.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#0F0F12] p-6 sm:p-7 rounded-2xl border border-white/10 space-y-3 relative shadow-md">
              <div className="text-3xl font-black text-[#D4AF37] font-mono">02</div>
              <h3 className="text-lg font-bold text-white">Free Pre-Press Check</h3>
              <p className="text-xs text-[#C8C8CC] leading-relaxed">
                We review your file for resolution, bleed, color, and layout — catch issues before printing. Send you a digital proof for approval.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#0F0F12] p-6 sm:p-7 rounded-2xl border border-white/10 space-y-3 relative shadow-md">
              <div className="text-3xl font-black text-[#D4AF37] font-mono">03</div>
              <h3 className="text-lg font-bold text-white">Print &amp; Quality Control</h3>
              <p className="text-xs text-[#C8C8CC] leading-relaxed">
                Once approved, we go to press. Every order is inspected, packed securely, and prepared for dispatch.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-[#0F0F12] p-6 sm:p-7 rounded-2xl border border-white/10 space-y-3 relative shadow-md">
              <div className="text-3xl font-black text-[#D4AF37] font-mono">04</div>
              <h3 className="text-lg font-bold text-white">Delivered To You</h3>
              <p className="text-xs text-[#C8C8CC] leading-relaxed">
                Same-day pickup in Yenagoa or nationwide delivery in 3–5 business days. Real-time updates via WhatsApp.
              </p>
            </div>

          </div>

          {/* CTA Center */}
          <div className="text-center pt-4 space-y-3">
            <p className="text-sm font-semibold text-white">Ready to start your project?</p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#e5c158] text-[#0F0F12] font-black text-xs sm:text-sm px-8 py-3.5 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp Now</span>
            </a>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4 — WHY ORDER FROM US (Quality Guarantees 2x2 Grid)               */}
      {/* ========================================================================= */}
      <section className="bg-[#0F0F12] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-5xl mx-auto space-y-10">
          
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#D4AF37] tracking-tight text-center">
            Why Businesses Choose Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card A */}
            <div className="bg-[#1A1A1F] p-7 rounded-2xl border border-white/10 space-y-2 shadow-md">
              <div className="flex items-center gap-2 text-white font-bold text-base sm:text-lg">
                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                <span>Premium Materials</span>
              </div>
              <p className="text-xs sm:text-sm text-[#C8C8CC] leading-relaxed">
                Industrial-grade paper, inks, and substrates. We don’t cut corners — your brand deserves the best.
              </p>
            </div>

            {/* Card B */}
            <div className="bg-[#1A1A1F] p-7 rounded-2xl border border-white/10 space-y-2 shadow-md">
              <div className="flex items-center gap-2 text-white font-bold text-base sm:text-lg">
                <Clock className="w-5 h-5 text-[#D4AF37]" />
                <span>Fast Turnaround</span>
              </div>
              <p className="text-xs sm:text-sm text-[#C8C8CC] leading-relaxed">
                Same-day dispatch available on select items. Rush orders prioritized. We deliver when promised.
              </p>
            </div>

            {/* Card C */}
            <div className="bg-[#1A1A1F] p-7 rounded-2xl border border-white/10 space-y-2 shadow-md">
              <div className="flex items-center gap-2 text-white font-bold text-base sm:text-lg">
                <Tag className="w-5 h-5 text-[#D4AF37]" />
                <span>Bulk Discounts</span>
              </div>
              <p className="text-xs sm:text-sm text-[#C8C8CC] leading-relaxed">
                10% off 500+ units • 12% off 1,000+ units • 15% off 5,000+ units. The more you print, the more you save.
              </p>
            </div>

            {/* Card D */}
            <div className="bg-[#1A1A1F] p-7 rounded-2xl border border-white/10 space-y-2 shadow-md">
              <div className="flex items-center gap-2 text-white font-bold text-base sm:text-lg">
                <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                <span>Zero-Defect Promise</span>
              </div>
              <p className="text-xs sm:text-sm text-[#C8C8CC] leading-relaxed">
                Not satisfied? Tell us within 48 hours of delivery. We reprint at no cost if the issue is ours.
              </p>
            </div>

          </div>

          <div className="text-center text-xs text-stone-400 font-semibold tracking-wide pt-2">
            Nationwide Delivery • Secure Packaging • WhatsApp Support • CAC Registered
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5 — FILE PREP GUIDE (Quick Help)                                  */}
      {/* ========================================================================= */}
      <section className="bg-[#1A1A1F] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-5xl mx-auto space-y-8">
          
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#D4AF37] tracking-tight">
            Artwork &amp; File Guidelines
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left: Requirements */}
            <div className="bg-[#0F0F12] p-7 rounded-2xl border border-white/10 space-y-4 shadow-md">
              <h3 className="text-lg font-bold text-white">What Works Best</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-stone-300">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span><strong>Formats:</strong> PDF (preferred), AI, PSD, CDR, high-res PNG</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span><strong>Resolution:</strong> 300 DPI minimum for crystal-clear prints</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span><strong>Color Mode:</strong> CMYK for print-ready color accuracy</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span><strong>Bleed:</strong> Add 3mm bleed on all four sides</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span><strong>Fonts:</strong> Outline or embed all typography</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span><strong>Safe Zone:</strong> Keep critical text 3mm away from trim edges</span>
                </li>
              </ul>
            </div>

            {/* Right: Need Help */}
            <div className="bg-[#0F0F12] p-7 rounded-2xl border border-white/10 space-y-4 shadow-md flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white">Don’t Have Ready Artwork?</h3>
                <p className="text-xs sm:text-sm text-[#C8C8CC] leading-relaxed">
                  No problem — our in-house design studio can create your design from scratch or refine your draft.
                </p>
                <ul className="space-y-1.5 text-xs text-stone-300">
                  <li>• Send your brief, logo, and details</li>
                  <li>• First draft within 24–48 hours</li>
                  <li>• Unlimited revisions until you approve</li>
                  <li>• Design fee applied as credit on large orders</li>
                </ul>
              </div>

              <div className="pt-3">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white hover:text-black text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Consult With Design Studio</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6 — FINAL CALL TO ACTION                                          */}
      {/* ========================================================================= */}
      <section className="bg-[#0F0F12] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-center border-b border-white/10">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-white tracking-tight">
            Ready to Print?
          </h2>

          <p className="text-sm sm:text-base text-[#C8C8CC] leading-relaxed">
            Send your file, ask for pricing, or discuss a custom project. We reply on WhatsApp in minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-[#D4AF37] hover:bg-[#e5c158] text-[#0F0F12] font-black text-xs sm:text-sm px-8 py-3.5 rounded-lg shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp Now</span>
            </a>

            {onOpenQuoteModal ? (
              <button
                type="button"
                onClick={onOpenQuoteModal}
                className="w-full sm:w-auto border border-[#D4AF37] hover:bg-white/10 text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-lg transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Get a Free Quote</span>
              </button>
            ) : (
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto border border-[#D4AF37] hover:bg-white/10 text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-lg transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Get a Free Quote</span>
              </a>
            )}
          </div>

          <div className="pt-4 text-xs text-stone-400 font-semibold tracking-wider">
            Serving Yenagoa, Bayelsa, and All 36 States of Nigeria
          </div>
        </div>
      </section>

    </div>
  );
};
