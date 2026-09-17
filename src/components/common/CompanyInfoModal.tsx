import React, { useState, useEffect } from 'react';
import { 
  X, 
  Info, 
  Building2, 
  Printer, 
  Image as ImageIcon, 
  HelpCircle, 
  Phone, 
  MapPin, 
  Mail, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Truck, 
  ExternalLink,
  ChevronRight,
  Send,
  Calendar,
  Layers,
  Award
} from 'lucide-react';
import { CompanyLogoMark } from './CompanyLogo';
import { PRINT_FAQS } from '../../data/seedData';

export type InfoModalTab = 'info' | 'about' | 'services' | 'portfolios' | 'faq' | 'contact';

interface CompanyInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: InfoModalTab;
  onSelectCategory?: (cat: any) => void;
}

export const CompanyInfoModal: React.FC<CompanyInfoModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'info',
  onSelectCategory
}) => {
  const [activeTab, setActiveTab] = useState<InfoModalTab>(initialTab);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [contactFormSubmitted, setContactFormSubmitted] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const tabs: { id: InfoModalTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'info', label: 'Info', icon: Info },
    { id: 'about', label: 'About Us', icon: Building2 },
    { id: 'services', label: 'Our Services', icon: Printer },
    { id: 'portfolios', label: 'Our Portfolios', icon: ImageIcon },
    { id: 'faq', label: 'How It Works / FAQ', icon: HelpCircle },
    { id: 'contact', label: 'Contact Us', icon: Phone },
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactFormSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-stone-900/70 backdrop-blur-xs animate-in fade-in-50 duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <CompanyLogoMark className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-black tracking-tight flex items-center gap-2">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <span className="text-[#d8dce2] font-black">SILVER</span>
                  <span className="text-stone-400 font-semibold text-xs">&amp;</span>
                  <span className="text-[#f5be38] font-black">GOLD</span>
                  <span className="text-white font-extrabold ml-0.5">INKSHINE LTD</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold">
                  RC 1892044
                </span>
              </div>
              <div className="text-[11px] text-stone-400">
                Nigeria&apos;s Digital Commercial Printing Press &amp; Brand Fabrication Hub
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation Navigation Bar */}
        <div className="bg-stone-100 px-4 sm:px-6 border-b border-stone-200 overflow-x-auto scrollbar-none shrink-0 flex items-center gap-1.5 py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#b8860b] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/70'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-stone-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-stone-800">
          {/* TAB 1: INFO */}
          {activeTab === 'info' && (
            <div className="space-y-6 animate-in fade-in-50 duration-150">
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#b8860b] uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-[#b8860b]" />
                    <span>Corporate Registry &amp; Credentials</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-stone-900">
                    Silver &amp; Gold Inkshine Ltd
                  </h3>
                  <p className="text-xs text-stone-600 max-w-xl">
                    Incorporated under the Companies and Allied Matters Act (CAC Nigeria) with Registration Number <strong>RC 1892044</strong>. Full-spectrum digital offset printing, industrial signage, corporate apparel and commercial packaging.
                  </p>
                </div>
                <div className="shrink-0 bg-white border border-amber-200 px-4 py-2.5 rounded-xl text-center shadow-2xs">
                  <div className="text-[10px] uppercase tracking-wider text-stone-500 font-bold">Standard Turnaround</div>
                  <div className="text-base font-black text-[#b8860b]">24 – 48 Hours</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50/60 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                    <Printer className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-sm text-stone-900">Press Infrastructure</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Heavy-duty Japanese Mimaki and Roland eco-solvent large-format machines, UV LED flatbed printers, and Heidelberg commercial offset units for ultra-crisp 1440 DPI reproduction.
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50/60 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                    <Truck className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-sm text-stone-900">Nationwide Logistics</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Same-day and 24-hour intra-state express delivery in Yenagoa and Bayelsa State. Daily secure inter-state dispatches across Port Harcourt, Delta, Abuja, and Lagos.
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50/60 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-sm text-stone-900">Quality Guarantee</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Rigorous digital pre-flight inspection on bleed margins, CMYK color gamuts, and 300 DPI resolution before plate burning or printing. Free reprints for manufacturing defects.
                  </p>
                </div>
              </div>

              {/* Quick Info Specs */}
              <div className="border border-stone-200 rounded-2xl p-5 bg-white space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-stone-500">
                  Key Operational Specifications
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <div className="text-stone-400">Headquarters</div>
                    <div className="font-semibold text-stone-800 mt-0.5">Yenagoa, Bayelsa State</div>
                  </div>
                  <div>
                    <div className="text-stone-400">Max Print Width</div>
                    <div className="font-semibold text-stone-800 mt-0.5">3.2m Seamless Roll</div>
                  </div>
                  <div>
                    <div className="text-stone-400">Artwork Support</div>
                    <div className="font-semibold text-stone-800 mt-0.5">PDF, AI, CDR, TIFF, PNG</div>
                  </div>
                  <div>
                    <div className="text-stone-400">Corporate Invoicing</div>
                    <div className="font-semibold text-stone-800 mt-0.5">Proforma, VAT &amp; Receipts</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ABOUT US */}
          {activeTab === 'about' && (
            <div className="space-y-6 animate-in fade-in-50 duration-150">
              <div className="space-y-3">
                <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                  Our Story &amp; Heritage
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                  Pioneering World-Class Commercial Print &amp; Brand Fabrication in the Niger Delta
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Founded in Bayelsa State, <strong>Silver &amp; Gold Inkshine Ltd</strong> was established with a singular focus: giving Nigerian corporations, SMEs, public institutions, and events access to international-grade print production without enduring weeks of shipping delays from overseas or distant hubs.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="text-xs font-bold uppercase text-[#b8860b] flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Our Mission</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    To engineer impactful visual branding, superior display craftsmanship, and high-fidelity print materials that help forward-thinking organizations capture market attention, build lasting credibility, and drive commercial success.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="text-xs font-bold uppercase text-amber-700 flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    <span>Our Standard of Excellence</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    We do not cut corners. From genuine aluminum luxury teardrop cassettes and 340gsm light-blocking Solite film to fade-resistant UV inks that endure harsh tropical weather, every piece that leaves our press is built to impress.
                  </p>
                </div>
              </div>

              <div className="border-t border-stone-200 pt-6">
                <h4 className="font-bold text-sm text-stone-900 mb-3">Why Leading Brands Choose Us</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-stone-900">Direct Factory Pricing:</strong>
                      <span className="text-stone-600">No middleman markups on roll-up stands or substrates.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-stone-900">Free Artwork Pre-Flight:</strong>
                      <span className="text-stone-600">Automated file sanity checking for bleeds, DPI, and safe areas.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-stone-900">Strict SLA Delivery:</strong>
                      <span className="text-stone-600">Guaranteed turnaround backed by real-time order tracking.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: OUR SERVICES */}
          {activeTab === 'services' && (
            <div className="space-y-6 animate-in fade-in-50 duration-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-stone-900 tracking-tight">
                    Comprehensive Printing &amp; Brand Fabrication Services
                  </h3>
                  <p className="text-xs text-stone-600">
                    Industrial equipment and artisan finishing under one roof in Bayelsa State.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-stone-200 bg-white hover:border-[#b8860b] transition-colors group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#b8860b] flex items-center justify-center font-bold">
                      01
                    </div>
                    <h4 className="font-bold text-sm text-stone-900 group-hover:text-[#b8860b] transition-colors">
                      Large Format &amp; Display Systems
                    </h4>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed mb-3">
                    Luxury &amp; standard rollup banners, teardrop feather flags, backdrop media walls, canopy gazebos, and exhibition booth displays.
                  </p>
                  <div className="flex flex-wrap gap-1 text-[11px] text-stone-500 font-medium">
                    <span className="bg-stone-100 px-2 py-0.5 rounded-md">Roll-ups</span>
                    <span className="bg-stone-100 px-2 py-0.5 rounded-md">Flags</span>
                    <span className="bg-stone-100 px-2 py-0.5 rounded-md">Media Walls</span>
                    <span className="bg-stone-100 px-2 py-0.5 rounded-md">Pop-up Counters</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-stone-200 bg-white hover:border-[#b8860b] transition-colors group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                      02
                    </div>
                    <h4 className="font-bold text-sm text-stone-900 group-hover:text-amber-800 transition-colors">
                      Commercial Stationery &amp; Publications
                    </h4>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed mb-3">
                    Premium matte velvet laminated business cards, embossed letterheads, presentation folders, corporate annual reports, flyers &amp; magazines.
                  </p>
                  <div className="flex flex-wrap gap-1 text-[11px] text-stone-500 font-medium">
                    <span className="bg-stone-100 px-2 py-0.5 rounded-md">Business Cards</span>
                    <span className="bg-stone-100 px-2 py-0.5 rounded-md">Brochures</span>
                    <span className="bg-stone-100 px-2 py-0.5 rounded-md">Letterheads</span>
                    <span className="bg-stone-100 px-2 py-0.5 rounded-md">Books</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-stone-200 bg-white hover:border-[#b8860b] transition-colors group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center font-bold">
                      03
                    </div>
                    <h4 className="font-bold text-sm text-stone-900 group-hover:text-blue-800 transition-colors">
                      Custom Apparels, Uniforms &amp; Caps
                    </h4>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed mb-3">
                    Precision 3D embroidered polo shirts, executive oxford button-down shirts, corporate safety overalls, medical scrubs, and custom face caps.
                  </p>
                  <div className="flex flex-wrap gap-1 text-[11px] text-stone-500 font-medium">
                    <span className="bg-stone-100 px-2 py-0.5 rounded-md">Polos</span>
                    <span className="bg-stone-100 px-2 py-0.5 rounded-md">Caps</span>
                    <span className="bg-stone-100 px-2 py-0.5 rounded-md">Safety Workwear</span>
                    <span className="bg-stone-100 px-2 py-0.5 rounded-md">Uniforms</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-stone-200 bg-white hover:border-[#b8860b] transition-colors group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-800 flex items-center justify-center font-bold">
                      04
                    </div>
                    <h4 className="font-bold text-sm text-stone-900 group-hover:text-purple-800 transition-colors">
                      Packaging, Boxes &amp; Paper Bags
                    </h4>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed mb-3">
                    FDA food-grade takeout containers, corrugated shipping cartons, boutique rope kraft carrier bags, and custom product labels.
                  </p>
                  <div className="flex flex-wrap gap-1 text-[11px] text-stone-500 font-medium">
                    <span className="bg-stone-100 px-2 py-0.5 rounded-md">Food Packs</span>
                    <span className="bg-stone-100 px-2 py-0.5 rounded-md">Shipping Cartons</span>
                    <span className="bg-stone-100 px-2 py-0.5 rounded-md">Kraft Bags</span>
                    <span className="bg-stone-100 px-2 py-0.5 rounded-md">Vinyl Labels</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-stone-200 bg-white hover:border-[#b8860b] transition-colors group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-800 flex items-center justify-center font-bold">
                      05
                    </div>
                    <h4 className="font-bold text-sm text-stone-900 group-hover:text-rose-800 transition-colors">
                      Signages, Vehicle Wraps &amp; Carports
                    </h4>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed mb-3">
                    3D LED channel letters, pylon directional signs, commercial fleet vehicle wrapping, one-way vision graphics, and architectural tensile carports.
                  </p>
                  <div className="flex flex-wrap gap-1 text-[11px] text-stone-500 font-medium">
                    <span className="bg-stone-100 px-2 py-0.5 rounded-md">3D Signages</span>
                    <span className="bg-stone-100 px-2 py-0.5 rounded-md">Vehicle Wraps</span>
                    <span className="bg-stone-100 px-2 py-0.5 rounded-md">Tensile Carports</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-stone-200 bg-white hover:border-[#b8860b] transition-colors group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
                      06
                    </div>
                    <h4 className="font-bold text-sm text-stone-900 group-hover:text-teal-800 transition-colors">
                      Corporate Gifts &amp; Souvenirs
                    </h4>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed mb-3">
                    Laser-engraved thermal vacuum flasks, ceramic mugs, debossed executive leather notebooks, luxury pens, and event umbrella souvenirs.
                  </p>
                  <div className="flex flex-wrap gap-1 text-[11px] text-stone-500 font-medium">
                    <span className="bg-stone-100 px-2 py-0.5 rounded-md">Vacuum Flasks</span>
                    <span className="bg-stone-100 px-2 py-0.5 rounded-md">Mugs</span>
                    <span className="bg-stone-100 px-2 py-0.5 rounded-md">Notebooks</span>
                    <span className="bg-stone-100 px-2 py-0.5 rounded-md">Crystal Plaques</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: OUR PORTFOLIOS */}
          {activeTab === 'portfolios' && (
            <div className="space-y-6 animate-in fade-in-50 duration-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-stone-900 tracking-tight">
                    Recent Completed Projects &amp; Visual Showcase
                  </h3>
                  <p className="text-xs text-stone-600">
                    Explore high-profile projects delivered for government summits, multinational contractors, banks, and major events.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-stone-200 overflow-hidden bg-white shadow-2xs group">
                  <div className="h-40 overflow-hidden relative">
                    <img 
                      src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80" 
                      alt="Bayelsa State Energy Summit" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-900/80 text-white backdrop-blur-xs">
                      Government Summit
                    </span>
                  </div>
                  <div className="p-3.5 space-y-1.5">
                    <h4 className="font-bold text-xs text-stone-900">Bayelsa Oil &amp; Gas Summit</h4>
                    <p className="text-[11px] text-stone-500 line-clamp-2">
                      50 Luxury Teardrop Roll-up Banners, 8m x 3m Media Stage Backdrop, and VIP Delegate Lanyards.
                    </p>
                    <div className="text-[10px] text-[#b8860b] font-semibold pt-1">Completed &amp; Dispatched in 48h</div>
                  </div>
                </div>

                <div className="rounded-2xl border border-stone-200 overflow-hidden bg-white shadow-2xs group">
                  <div className="h-40 overflow-hidden relative">
                    <img 
                      src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80" 
                      alt="Commercial Logistics Fleet Vehicle Wrap" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-900/80 text-white backdrop-blur-xs">
                      Fleet Branding
                    </span>
                  </div>
                  <div className="p-3.5 space-y-1.5">
                    <h4 className="font-bold text-xs text-stone-900">Express Courier Delivery Fleet</h4>
                    <p className="text-[11px] text-stone-500 line-clamp-2">
                      Full cast vinyl bubble-free wrap on 12 delivery vans with perforated one-way vision rear glass.
                    </p>
                    <div className="text-[10px] text-[#b8860b] font-semibold pt-1">UV Laminated 3-Year Durability</div>
                  </div>
                </div>

                <div className="rounded-2xl border border-stone-200 overflow-hidden bg-white shadow-2xs group">
                  <div className="h-40 overflow-hidden relative">
                    <img 
                      src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80" 
                      alt="Corporate Embroidered Polos" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-900/80 text-white backdrop-blur-xs">
                      Corporate Apparel
                    </span>
                  </div>
                  <div className="p-3.5 space-y-1.5">
                    <h4 className="font-bold text-xs text-stone-900">Commercial Bank Staff Uniforms</h4>
                    <p className="text-[11px] text-stone-500 line-clamp-2">
                      250 Heavyweight 220gsm pique cotton polo shirts with matched 3D embossed baseball caps.
                    </p>
                    <div className="text-[10px] text-[#b8860b] font-semibold pt-1">Colorfast Embroidered Quality</div>
                  </div>
                </div>

                <div className="rounded-2xl border border-stone-200 overflow-hidden bg-white shadow-2xs group">
                  <div className="h-40 overflow-hidden relative">
                    <img 
                      src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80" 
                      alt="Luxury Kraft Carrier Bags" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-900/80 text-white backdrop-blur-xs">
                      Retail Packaging
                    </span>
                  </div>
                  <div className="p-3.5 space-y-1.5">
                    <h4 className="font-bold text-xs text-stone-900">Boutique Shopping Bags &amp; Tags</h4>
                    <p className="text-[11px] text-stone-500 line-clamp-2">
                      5,000 Custom gold foil stamped kraft paper carrier bags with reinforced bases and braided rope handles.
                    </p>
                    <div className="text-[10px] text-[#b8860b] font-semibold pt-1">Premium High-End Retail</div>
                  </div>
                </div>

                <div className="rounded-2xl border border-stone-200 overflow-hidden bg-white shadow-2xs group">
                  <div className="h-40 overflow-hidden relative">
                    <img 
                      src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80" 
                      alt="3D LED Channel Letters Signage" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-900/80 text-white backdrop-blur-xs">
                      Outdoor Signage
                    </span>
                  </div>
                  <div className="p-3.5 space-y-1.5">
                    <h4 className="font-bold text-xs text-stone-900">Corporate HQ 3D Facade Sign</h4>
                    <p className="text-[11px] text-stone-500 line-clamp-2">
                      Front &amp; backlit LED channel lettering on brushed aluminum composite panel cladding.
                    </p>
                    <div className="text-[10px] text-[#b8860b] font-semibold pt-1">Weatherproof IP67 Lighting</div>
                  </div>
                </div>

                <div className="rounded-2xl border border-stone-200 overflow-hidden bg-white shadow-2xs group">
                  <div className="h-40 overflow-hidden relative">
                    <img 
                      src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80" 
                      alt="Executive Corporate Souvenirs" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-900/80 text-white backdrop-blur-xs">
                      Souvenirs
                    </span>
                  </div>
                  <div className="p-3.5 space-y-1.5">
                    <h4 className="font-bold text-xs text-stone-900">Executive Year-End Gift Sets</h4>
                    <p className="text-[11px] text-stone-500 line-clamp-2">
                      Temperature-display vacuum flasks and ceramic mugs in luxury silk-lined magnetic presentation boxes.
                    </p>
                    <div className="text-[10px] text-[#b8860b] font-semibold pt-1">Delivered to 150 VIP Clients</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: HOW IT WORKS / FAQ */}
          {activeTab === 'faq' && (
            <div className="space-y-6 animate-in fade-in-50 duration-150">
              <div>
                <div className="text-xs font-bold text-[#b8860b] uppercase tracking-wider">
                  Seamless Ordering Process
                </div>
                <h3 className="text-lg sm:text-xl font-black text-stone-900 tracking-tight">
                  How Ordering with Silver &amp; Gold Inkshine Works
                </h3>
              </div>

              {/* 4-Step Interactive Flow */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1 relative">
                  <div className="w-7 h-7 rounded-full bg-[#b8860b] text-white flex items-center justify-center text-xs font-bold mb-2">
                    1
                  </div>
                  <h4 className="font-bold text-xs text-stone-900">Choose &amp; Configure</h4>
                  <p className="text-[11px] text-stone-500">
                    Pick banner base, sizes, fabrics, and quantities with real-time Nigerian Naira pricing.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1 relative">
                  <div className="w-7 h-7 rounded-full bg-[#b8860b] text-white flex items-center justify-center text-xs font-bold mb-2">
                    2
                  </div>
                  <h4 className="font-bold text-xs text-stone-900">Upload or Hire</h4>
                  <p className="text-[11px] text-stone-500">
                    Upload your ready-to-print design or hire our certified press graphic artist for ₦5,000.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1 relative">
                  <div className="w-7 h-7 rounded-full bg-[#b8860b] text-white flex items-center justify-center text-xs font-bold mb-2">
                    3
                  </div>
                  <h4 className="font-bold text-xs text-stone-900">Pre-Flight Proof</h4>
                  <p className="text-[11px] text-stone-500">
                    We verify bleeds, resolution, and safe text margins. You approve the high-res digital proof.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1 relative">
                  <div className="w-7 h-7 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs font-bold mb-2">
                    4
                  </div>
                  <h4 className="font-bold text-xs text-stone-900">Print &amp; Dispatch</h4>
                  <p className="text-[11px] text-stone-500">
                    Produced within 24–48 hours and delivered directly to your doorstep anywhere in Nigeria.
                  </p>
                </div>
              </div>

              {/* FAQ Accordion */}
              <div className="space-y-3 pt-2">
                <h4 className="font-bold text-sm text-stone-900">Frequently Asked Questions</h4>
                <div className="space-y-2">
                  {PRINT_FAQS.slice(0, 5).map((faq, idx) => {
                    const isOpen = openFaqIdx === idx;
                    return (
                      <div 
                        key={idx} 
                        className="border border-stone-200 rounded-xl overflow-hidden bg-white transition-colors"
                      >
                        <button
                          onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                          className="w-full p-3.5 text-left flex items-center justify-between gap-3 text-stone-800 hover:text-[#b8860b] font-medium text-xs sm:text-sm"
                        >
                          <span className="font-semibold">{faq.question}</span>
                          <span className="text-stone-400 font-bold shrink-0">{isOpen ? '−' : '+'}</span>
                        </button>
                        {isOpen && (
                          <div className="px-3.5 pb-3.5 pt-0 text-xs text-stone-600 leading-relaxed border-t border-stone-100 bg-stone-50/50">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: CONTACT US */}
          {activeTab === 'contact' && (
            <div className="space-y-6 animate-in fade-in-50 duration-150">
              <div>
                <div className="text-xs font-bold text-[#b8860b] uppercase tracking-wider">
                  Bayelsa Central Print Hub &amp; Customer Support
                </div>
                <h3 className="text-lg sm:text-xl font-black text-stone-900 tracking-tight">
                  Get in Touch with Our Commercial Print Consultants
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Information & Channels */}
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 text-xs">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-[#b8860b] flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <strong className="block text-stone-900 text-sm font-bold">Physical Factory &amp; Press Hub:</strong>
                        <span className="text-stone-600 leading-relaxed">
                          Mbiama-Yenagoa Road, Graphic Arts Industrial Complex, Yenagoa, Bayelsa State, Nigeria.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <strong className="block text-stone-900">Direct Telephone Desk:</strong>
                        <a href="tel:+2347030372539" className="text-[#b8860b] font-bold hover:underline">
                          +234 (0) 703 037 2539
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <strong className="block text-stone-900">Official Electronic Mail:</strong>
                        <a href="mailto:orders@silverandgold.ng" className="text-stone-600 hover:text-[#b8860b]">
                          orders@silverandgold.ng / support@silverandgold.ng
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <strong className="block text-stone-900">Press Operation Hours:</strong>
                        <span className="text-stone-600">
                          Mon – Fri: 8:00 AM – 6:30 PM | Sat: 9:00 AM – 3:00 PM
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Direct Chat Button */}
                  <a
                    href="https://wa.me/2347030372539?text=Hello%20Silver%20%26%20Gold%20Inkshine%2C%20I%20would%20like%20to%20make%20an%20inquiry%20regarding%20a%20commercial%20print%20job"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-[#b8860b] hover:bg-[#996515] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
                  >
                    <span>Chat on WhatsApp Directly (+234 703 037 2539)</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Quick Message Form */}
                <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3">
                  <h4 className="font-bold text-sm text-stone-900">
                    Send Instant Job Inquiry
                  </h4>
                  {contactFormSubmitted ? (
                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-center space-y-2 py-8">
                      <CheckCircle2 className="w-8 h-8 text-[#b8860b] mx-auto" />
                      <div className="font-bold text-sm text-amber-900">Inquiry Sent Successfully!</div>
                      <p className="text-xs text-amber-800">
                        Our commercial print production manager will review your specifications and contact you shortly via phone or WhatsApp.
                      </p>
                      <button
                        onClick={() => setContactFormSubmitted(false)}
                        className="mt-2 text-xs font-bold text-[#b8860b] underline"
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-3 text-xs">
                      <div>
                        <label className="block text-stone-700 font-semibold mb-1">Your Full Name / Corporate Entity *</label>
                        <input
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="e.g. Chief Ebikeme Briggs / Shell Contractors Ltd"
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#b8860b]"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-700 font-semibold mb-1">Phone / WhatsApp Number *</label>
                        <input
                          type="tel"
                          required
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          placeholder="e.g. 0803 123 4567"
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#b8860b]"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-700 font-semibold mb-1">Job Details &amp; Quantity Specs *</label>
                        <textarea
                          required
                          rows={3}
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          placeholder="Provide details on roll-up banners, uniform quantities, paper bags, or delivery timeline needed..."
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-[#b8860b]"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Production Inquiry</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-stone-100 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500 shrink-0">
          <div>
            Silver &amp; Gold Inkshine Ltd • RC 1892044 • Yenagoa, Bayelsa
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-800 font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
