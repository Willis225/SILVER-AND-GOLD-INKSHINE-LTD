import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  CreditCard, 
  ShieldCheck, 
  ArrowRight,
  HelpCircle,
  Search
} from 'lucide-react';
import { PRINT_FAQS } from '../../data/seedData';
import { ProductCategory } from '../../types/schema';
import { CompanyLogoMark } from '../common/CompanyLogo';
import { InfoModalTab } from '../common/CompanyInfoModal';

interface FooterProps {
  onSelectCategory: (cat: ProductCategory | 'all') => void;
  onOpenAdmin?: () => void;
  onOpenInfoModal?: (tab?: InfoModalTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenAdmin, onOpenInfoModal }) => {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [faqSearch, setFaqSearch] = useState('');

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  const filteredFaqs = PRINT_FAQS.filter(
    (faq) =>
      !faqSearch.trim() ||
      faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      faq.answer.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Interactive FAQ Accordion Section */}
        <div id="faq-section" className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-500">
                <HelpCircle className="w-4 h-4" />
                <span>Frequently Asked Questions</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                Printing Turnaround, Artwork Bleeds & Nationwide Delivery
              </h3>
            </div>

            <div className="relative w-full md:w-72">
              <input
                type="text"
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                placeholder="Search printing FAQs..."
                className="w-full bg-stone-800 border border-stone-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-stone-500 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="border border-stone-800 rounded-2xl overflow-hidden bg-stone-950/60 transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 text-stone-200 hover:text-white font-medium text-xs sm:text-sm"
                  >
                    <span className="font-semibold">{faq.question}</span>
                    <span className="shrink-0 p-1 rounded-md bg-stone-800 text-stone-400">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="p-4 pt-0 text-xs text-stone-400 leading-relaxed border-t border-stone-800/60 bg-stone-900/30">
                      <p>{faq.answer}</p>
                      <div className="mt-2 text-[10px] text-amber-500/80 font-mono">
                        Category: {faq.category}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Footer Links & Company Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & Nigerian Footprint */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 shrink-0 drop-shadow-md">
                <CompanyLogoMark className="w-full h-full" />
              </div>
              <div>
                <div className="text-lg font-black tracking-tight leading-tight flex items-center gap-1 sm:gap-1.5">
                  <span className="text-[#d8dce2] drop-shadow-[0_1px_1px_rgba(255,255,255,0.15)] font-black">
                    SILVER
                  </span>
                  <span className="text-stone-400 font-semibold text-sm">&amp;</span>
                  <span className="text-[#f5be38] drop-shadow-[0_1px_2px_rgba(245,190,56,0.25)] font-black">
                    GOLD
                  </span>
                  <span className="text-white font-extrabold ml-1">
                    INKSHINE LTD
                  </span>
                </div>
                <p className="text-[10px] text-stone-400 font-medium tracking-wider uppercase mt-0.5">
                  Nigeria&apos;s Digital Commercial Printing &amp; Branding Press
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Providing corporate institutions, event managers, SMEs, and government agencies with precision large-format displays, luxury roll-up banners, and corporate promotional gifts with guaranteed 24–48h express turnaround.
            </p>

            {/* Physical Bayelsa Address & Hub */}
            <div className="space-y-2 text-xs text-stone-400 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-200 block">Bayelsa Central Press Hub:</strong>
                  <span>Mbiama-Yenagoa Road, Graphic Arts Complex, Yenagoa, Bayelsa State, Nigeria.</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>+234 (0) 902 869 4908</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>orders@silverandgold.ng / support@silverandgold.ng</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Mon – Fri: 8:00 AM – 6:30 PM | Sat: 9:00 AM – 3:00 PM</span>
              </div>
            </div>
          </div>

          {/* Col 2: Print Categories */}
          <div className="space-y-3 text-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Print Categories
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => onSelectCategory('banners_displays')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Luxury & Standard Roll-Up Banners
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('banners_displays')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Teardrop Flying Feather Flags
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('packaging_labels')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Custom Kraft & Paper Gift Bags
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('corporate_stationery')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Executive Matte Business Cards
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('signage')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  3D Acrylic Reception Signage
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('apparels')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Embroidered Corporate Staff Polos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('gifts_souvenirs')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Debossed Executive Leather Journals
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Services & Guidelines */}
          <div className="space-y-3 text-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Pre-Press & Support
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button 
                  onClick={() => onOpenInfoModal?.('faq')}
                  className="hover:text-amber-400 text-left transition-colors"
                >
                  Artwork Bleed &amp; Safety Guidelines
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenInfoModal?.('faq')}
                  className="hover:text-amber-400 text-left transition-colors"
                >
                  CMYK vs RGB Color Mode Guide
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenInfoModal?.('faq')}
                  className="hover:text-amber-400 text-left transition-colors"
                >
                  Resolution &amp; 300 DPI Pre-Flight
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenInfoModal?.('services')}
                  className="hover:text-amber-400 text-left transition-colors"
                >
                  Nationwide Logistics Delivery Rates
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenInfoModal?.('contact')}
                  className="hover:text-amber-400 text-left transition-colors"
                >
                  Proforma Invoices for Corporate Accounts
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenInfoModal?.('info')}
                  className="hover:text-amber-400 text-left transition-colors"
                >
                  Company Info &amp; Press Credentials
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Payment Methods & Trust */}
          <div className="space-y-3 text-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Payment & Security
            </h4>
            <p className="text-stone-400 leading-relaxed">
              We accept 100% secure payments via top Central Bank of Nigeria licensed processors.
            </p>

            <div className="space-y-2 pt-1">
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-1 rounded bg-stone-800 text-stone-200 font-mono font-bold text-[11px] border border-stone-700">
                  Paystack
                </span>
                <span className="px-2 py-1 rounded bg-stone-800 text-stone-200 font-mono font-bold text-[11px] border border-stone-700">
                  Flutterwave
                </span>
                <span className="px-2 py-1 rounded bg-stone-800 text-stone-200 font-mono text-[11px] border border-stone-700">
                  Verve
                </span>
                <span className="px-2 py-1 rounded bg-stone-800 text-stone-200 font-mono text-[11px] border border-stone-700">
                  Mastercard
                </span>
                <span className="px-2 py-1 rounded bg-stone-800 text-stone-200 font-mono text-[11px] border border-stone-700">
                  Visa
                </span>
                <span className="px-2 py-1 rounded bg-stone-800 text-amber-400 font-mono text-[11px] border border-stone-700">
                  Bank Transfer
                </span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-1.5 text-emerald-400 text-[11px]">
              <ShieldCheck className="w-4 h-4" />
              <span>256-Bit SSL Encrypted Checkout</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 border-t border-stone-800 text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            © {new Date().getFullYear()} Silver &amp; Gold Inkshine Ltd. All Rights Reserved. RC 1892044.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="hover:text-stone-300 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-stone-300 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-stone-300 cursor-pointer">Print Refund Policy</span>
            {onOpenAdmin && (
              <>
                <span>•</span>
                <button
                  onClick={onOpenAdmin}
                  className="hover:text-amber-400 text-stone-400 transition-colors cursor-pointer flex items-center gap-1 font-medium"
                >
                  <ShieldCheck className="w-3 h-3 text-amber-500" />
                  <span>Staff &amp; Press Desk</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
