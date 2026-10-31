import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles, 
  Printer, 
  MapPin, 
  Clock, 
  Phone, 
  CheckCircle2, 
  ExternalLink,
  Building2,
  Award,
  Layers,
  Check,
  Truck,
  Users,
  MessageCircle,
  FileCheck2,
  Cpu,
  Target,
  Eye,
  HeartHandshake,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Zap,
  Package
} from 'lucide-react';
import { CompanyLogoMark } from '../common/CompanyLogo';

interface AboutUsPageProps {
  onNavigateHome: () => void;
  onOpenQuoteModal?: () => void;
  onOpenBookOnline?: () => void;
  onOpenPolicies?: (docKey?: 'terms' | 'privacy' | 'returns') => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({
  onNavigateHome,
  onOpenQuoteModal,
  onOpenBookOnline,
  onOpenPolicies
}) => {
  const WHATSAPP_LINK = 'https://wa.me/2347030372539?text=Hello%20Silver%20%26%20Gold%20Inkshine%20Ltd%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20printing%20services';
  const MAPS_LINK = 'https://maps.google.com/maps?q=9.081999,8.675277&hl=en&z=16';

  // Accordion FAQ state (just like CustomQuotePage)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setExpandedFaq(prev => prev === index ? null : index);
  };

  const FAQS = [
    {
      q: 'Where is Silver & Gold Inkshine Ltd located?',
      a: 'Our primary commercial press plant is located at No. 875 Medford Okilo Road (Mbiama-Yenagoa Road), Opolo-Epie, opposite Pepperoni, Yenagoa, Bayelsa State, Nigeria. We also offer fast nationwide delivery across all 36 States.'
    },
    {
      q: 'What are your standard turnaround times?',
      a: 'Standard production takes 24 to 48 hours for digital and banner jobs, and 3 to 5 working days for high-volume offset runs, custom packaging, and books. Express 24-hour priority manufacturing is available upon request.'
    },
    {
      q: 'Do you offer free file audits before printing?',
      a: 'Yes! Every file uploaded to our platform undergoes a free pre-press evaluation for resolution, font embedding, bleed integrity (3mm), and CMYK color space before plate burning or digital RIP processing.'
    },
    {
      q: 'Can I request a custom quote for complex enterprise print jobs?',
      a: 'Absolutely. You can use our Dedicated Custom Quote Desk or chat with our senior press engineer via WhatsApp (+234 703 037 2539) for tailored architectural signage, metallic foil stamping, or bulk corporate runs.'
    },
    {
      q: 'What payment methods and currency do you accept?',
      a: 'We accept secure payments in Nigerian Naira (NGN) via bank transfer, Paystack, Flutterwave, and direct corporate invoicing. Verified corporate clients with signed SLAs qualify for 30-day credit terms.'
    },
    {
      q: 'Are you a registered corporate entity in Nigeria?',
      a: 'Yes, Silver & Gold Inkshine Ltd is fully accredited and registered with the Corporate Affairs Commission under the Federal Republic of Nigeria (RC 1892044).'
    }
  ];

  return (
    <div className="min-h-screen bg-[#08080a] text-stone-200 antialiased selection:bg-[#f5be38]/30 selection:text-white flex flex-col justify-between">
      <div>
        
        {/* Top Floating Navigation Header (Exact matching CustomQuotePage style) */}
        <div className="sticky top-0 z-50 bg-[#0c0d12]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 lg:px-8 py-3.5 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            
            {/* Back to Home */}
            <button
              type="button"
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-300 hover:text-white bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-xl border border-white/10 transition-all cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 text-[#f5be38] group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Storefront</span>
            </button>

            {/* Logo & Subtitle */}
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 flex items-center justify-center">
                <CompanyLogoMark className="w-full h-full" />
              </div>
              <div className="hidden sm:block">
                <div className="text-xs font-black tracking-tight text-white flex items-center gap-1.5">
                  <span>SILVER &amp; GOLD INKSHINE LTD</span>
                  <span className="text-[10px] font-mono text-[#f5be38] font-bold px-1.5 py-0.5 rounded bg-[#f5be38]/10 border border-[#f5be38]/30">RC 1892044</span>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Action */}
            <div className="flex items-center gap-2">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-black text-black bg-[#f5be38] hover:bg-[#ffd15c] px-3.5 py-2 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <span>Chat on WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 1 — HERO BANNER (About Us & FAQs)                                 */}
        {/* ========================================================================= */}
        <section className="relative bg-[#0d0e14] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 overflow-hidden text-center">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(245,190,56,0.08)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-[#f5be38]/10 via-white/5 to-[#f5be38]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[#f5be38] text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-[#f5be38] animate-pulse" />
              <span>Official Corporate Profile &amp; FAQs Hub</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              About Us &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f5be38] via-amber-200 to-white">Frequently Asked Questions</span>
            </h1>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Silver &amp; Gold Inkshine Ltd is Nigeria&apos;s accredited commercial printing company delivering high-precision large format printing, corporate branding, custom apparel, and packaging with fast 3–5 day delivery nationwide.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={onOpenQuoteModal}
                className="h-11 px-6 rounded-xl bg-[#f5be38] hover:bg-[#ffd15c] text-black font-extrabold text-xs sm:text-sm tracking-wide uppercase shadow-md transition-all cursor-pointer"
              >
                Request Custom Quote →
              </button>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="h-11 px-6 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm tracking-wide uppercase border border-white/20 transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STAT COUNTERS GRID (Inspired by reference layout: 13 Years, 20+ Products, 100% Happy) */}
        {/* ========================================================================= */}
        <section className="bg-[#050508] border-b border-white/15 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="p-6 rounded-2xl bg-[#12131a] border border-white/10 shadow-lg space-y-2">
              <div className="text-3xl sm:text-4xl font-black text-[#f5be38] font-mono">13+</div>
              <div className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Years Experience</div>
            </div>

            <div className="p-6 rounded-2xl bg-[#12131a] border border-white/10 shadow-lg space-y-2">
              <div className="text-3xl sm:text-4xl font-black text-white font-mono">50k+</div>
              <div className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Prints Daily</div>
            </div>

            <div className="p-6 rounded-2xl bg-[#12131a] border border-white/10 shadow-lg space-y-2">
              <div className="text-3xl sm:text-4xl font-black text-[#f5be38] font-mono">100%</div>
              <div className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Happy Customers</div>
            </div>

            <div className="p-6 rounded-2xl bg-[#12131a] border border-white/10 shadow-lg space-y-2">
              <div className="text-3xl sm:text-4xl font-black text-white font-mono">36</div>
              <div className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">States Nationwide</div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2 — OUR STORY (Two Column Layout)                                 */}
        {/* ========================================================================= */}
        <section className="bg-[#08080a] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5be38]/15 border border-[#f5be38]/30 text-[#f5be38] text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Our Corporate Story</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                More Than Ink on Paper — Excellence in Bayelsa
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-stone-300 leading-relaxed font-normal">
                <p>
                  It started with a gap: businesses in Bayelsa were sending designs to Lagos, Port Harcourt, and beyond — waiting weeks, paying extra for shipping, and still risking damage in transit. We knew our state deserved better.
                </p>
                <p>
                  In 2021, we opened our doors with one goal: match the best standards in the country, right here at home. Today, we operate from our purpose-built complex on Medford Okilo Road, opposite Pepperoni in Opolo-Epie, Yenagoa.
                </p>
                <p>
                  Every banner, business card, sign, and box we produce isn’t just a job — it’s proof that world-class commercial printing thrives right here in Bayelsa State.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative rounded-3xl overflow-hidden bg-[#12131a] border border-white/20 shadow-2xl p-4 sm:p-6 w-full max-w-md">
                <img
                  src="https://cdn.hstockplus.org/uploads/public/img-1790066633477-1b16a758309b0fff.webp"
                  alt="Silver & Gold Inkshine Press Floor"
                  className="w-full aspect-[4/3] object-cover rounded-2xl shadow-inner"
                />
                <div className="mt-4 w-full bg-black/60 rounded-xl p-3 border border-white/15 flex items-center justify-between">
                  <span className="text-xs font-bold text-white">RC 1892044 Certified</span>
                  <span className="text-[11px] font-mono text-[#f5be38]">Yenagoa Press Complex</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3 — PERKS & BENEFITS (Icon Feature Grid)                          */}
        {/* ========================================================================= */}
        <section className="bg-[#050508] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
          <div className="max-w-7xl mx-auto space-y-12">
            
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                Perks &amp; Benefits — What Makes Us Different
              </h2>
              <p className="text-sm sm:text-base text-stone-400">
                Your order carries our name — that’s why we treat yours like our own.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-[#12131a] p-7 rounded-3xl border border-white/10 space-y-4 shadow-lg group hover:border-[#f5be38]/50 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#f5be38]/15 border border-[#f5be38]/30 flex items-center justify-center text-[#f5be38]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-white">Zero-Defect Guarantee</h3>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  If it’s not perfect, we reprint it — no questions, no extra cost. We verify every file before print.
                </p>
              </div>

              <div className="bg-[#12131a] p-7 rounded-3xl border border-white/10 space-y-4 shadow-lg group hover:border-[#f5be38]/50 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#f5be38]/15 border border-[#f5be38]/30 flex items-center justify-center text-[#f5be38]">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-white">Fast 3–5 Day Dispatch</h3>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  Speed without compromise. Fast nationwide express delivery directly to your door across all 36 States.
                </p>
              </div>

              <div className="bg-[#12131a] p-7 rounded-3xl border border-white/10 space-y-4 shadow-lg group hover:border-[#f5be38]/50 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#f5be38]/15 border border-[#f5be38]/30 flex items-center justify-center text-[#f5be38]">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-white">CAC Registered &amp; Certified</h3>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  Fully accredited corporate commercial printing corporation (RC 1892044) — reliable, transparent, accountable.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4 — INTERACTIVE FAQs ACCORDION (Just like CustomQuotePage)       */}
        {/* ========================================================================= */}
        <section className="bg-[#08080a] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
          <div className="max-w-4xl mx-auto space-y-8">
            
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f5be38]/15 border border-[#f5be38]/30 text-[#f5be38] text-xs font-bold">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Got Questions? We Have Answers</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-stone-400 text-sm">
                Click any question below to expand and read our verified corporate policies.
              </p>
            </div>

            <div className="space-y-4">
              {FAQS.map((faq, index) => {
                const isExpanded = expandedFaq === index;
                return (
                  <div 
                    key={index}
                    className="bg-[#12131a] border border-white/10 rounded-2xl overflow-hidden transition-all shadow-md"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="w-full px-6 py-4 text-left font-bold text-sm sm:text-base text-white flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#f5be38]/20 text-[#f5be38] font-mono text-xs flex items-center justify-center shrink-0">
                          {index + 1}
                        </span>
                        <span>{faq.q}</span>
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-[#f5be38] shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-stone-400 shrink-0" />
                      )}
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="px-6 pb-5 pt-1 text-xs sm:text-sm text-stone-300 leading-relaxed border-t border-white/5"
                        >
                          <p>{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5 — LOCATION & MAP                                                */}
        {/* ========================================================================= */}
        <section className="bg-[#050508] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
          <div className="max-w-7xl mx-auto space-y-8">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight text-center">
              Visit Our Yenagoa Press Complex
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 bg-[#12131a] p-6 sm:p-8 rounded-3xl border border-white/10 space-y-5 shadow-xl">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">Silver &amp; Gold Inkshine Ltd</h3>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    No. 875 Medford Okilo Road (Mbiama–Yenagoa Road), Opolo-Epie, directly opposite Pepperoni, Yenagoa, Bayelsa State, Nigeria.
                  </p>
                </div>

                <div className="space-y-2 text-xs sm:text-sm text-stone-300 border-t border-white/10 pt-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#f5be38]" />
                    <span><strong>Hours:</strong> Monday – Saturday, 8:00 AM – 6:00 PM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#f5be38]" />
                    <a href="tel:+2347030372539" className="text-white hover:text-[#f5be38] font-bold">
                      +234 703 037 2539 | 0811 028 5530
                    </a>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={MAPS_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#f5be38] hover:bg-[#ffd15c] text-black font-bold text-xs transition-all shadow-md cursor-pointer"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>Get Directions on Google Maps</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-6 rounded-3xl overflow-hidden border border-white/15 shadow-xl bg-black h-[320px] sm:h-[380px]">
                <iframe
                  title="Google Maps - Silver & Gold Inkshine Ltd"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.799753905124!2d8.675277!3d9.081999000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1051630150b084b5%3A0xf18b26f8ebf417f7!2sSILVER%20%26%20GOLD%20PRINTING%20HOUSE!5e0!3m2!1sen!2sng!4v1793466680089!5m2!1sen!2sng"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full block"
                />
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Global Footer / Bottom Callout */}
      <footer className="bg-[#040406] border-t border-white/15 text-stone-300 py-8 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-7xl mx-auto space-y-4">
          <p className="text-xs sm:text-sm font-medium text-stone-300">
            &copy; {new Date().getFullYear()} <strong className="text-white font-bold">SILVER &amp; GOLD INKSHINE LTD</strong> (RC 1892044). All rights reserved. Registered Commercial Printer in Nigeria.
          </p>
          <div className="flex items-center justify-center gap-4 text-xs">
            <button type="button" onClick={() => onOpenPolicies?.('terms')} className="text-stone-400 hover:text-[#f5be38] underline">Terms &amp; Conditions</button>
            <span>•</span>
            <button type="button" onClick={() => onOpenPolicies?.('privacy')} className="text-stone-400 hover:text-[#f5be38] underline">Privacy Policy</button>
            <span>•</span>
            <button type="button" onClick={() => onOpenPolicies?.('returns')} className="text-stone-400 hover:text-[#f5be38] underline">Refund Policy</button>
          </div>
        </div>
      </footer>

    </div>
  );
};
