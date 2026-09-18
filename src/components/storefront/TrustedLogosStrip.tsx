import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Award } from 'lucide-react';

export interface EnterpriseBrand {
  id: string;
  name: string;
  category: string;
  badge: string;
  renderLogo: (className?: string) => React.ReactNode;
}

export const ENTERPRISE_BRANDS: EnterpriseBrand[] = [
  {
    id: 'access-bank',
    name: 'Access Bank Plc',
    category: 'Commercial Banking',
    badge: 'Tier-1 Bank',
    renderLogo: () => (
      <svg viewBox="0 0 160 44" className="h-7 w-auto max-w-[120px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Access Bank Chevron arrows */}
        <path d="M6 8 L18 22 L6 36 L12 36 L24 22 L12 8 Z" fill="#F37021" />
        <path d="M18 8 L30 22 L18 36 L24 36 L36 22 L24 8 Z" fill="#F37021" />
        <path d="M30 8 L42 22 L30 36 L36 36 L48 22 L36 8 Z" fill="#002D62" />
        {/* Wordmark */}
        <text x="56" y="27" fontFamily="system-ui, -apple-system, sans-serif" fontSize="18" fontWeight="800" fill="#002D62" letterSpacing="-0.5">
          access
        </text>
        <circle cx="120" cy="18" r="2.5" fill="#F37021" />
      </svg>
    ),
  },
  {
    id: 'flutterwave',
    name: 'Flutterwave',
    category: 'Fintech & Payments',
    badge: 'Tech Unicorn',
    renderLogo: () => (
      <svg viewBox="0 0 170 44" className="h-7 w-auto max-w-[125px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Flutterwave colorful wave ribbons */}
        <g transform="translate(6, 6)">
          <path d="M4 24 C4 14, 14 6, 24 6 C20 12, 14 18, 4 24 Z" fill="#FF9A00" opacity="0.95" />
          <path d="M24 6 C32 10, 36 20, 30 28 C26 22, 22 14, 24 6 Z" fill="#FB6340" />
          <path d="M4 24 C12 28, 22 28, 30 22 C24 26, 14 26, 4 24 Z" fill="#11CDEF" />
          <circle cx="17" cy="17" r="4" fill="#2DCE89" />
        </g>
        {/* Wordmark */}
        <text x="48" y="27" fontFamily="system-ui, -apple-system, sans-serif" fontSize="17" fontWeight="800" fill="#0B132B" letterSpacing="-0.3">
          flutterwave
        </text>
      </svg>
    ),
  },
  {
    id: 'dangote',
    name: 'Dangote Group',
    category: 'Conglomerate & Manufacturing',
    badge: 'Corporate',
    renderLogo: () => (
      <svg viewBox="0 0 160 44" className="h-7 w-auto max-w-[120px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Dangote geometric shield mark */}
        <g transform="translate(8, 7)">
          <path d="M0 0 L14 0 L22 15 L8 15 Z" fill="#E31837" />
          <path d="M10 15 L24 15 L16 30 L2 30 Z" fill="#003366" />
          <circle cx="12" cy="15" r="3" fill="#FFFFFF" />
        </g>
        {/* Wordmark */}
        <text x="40" y="24" fontFamily="system-ui, -apple-system, sans-serif" fontSize="16" fontWeight="900" fill="#003366" letterSpacing="0.5">
          DANGOTE
        </text>
        <text x="40" y="34" fontFamily="system-ui, -apple-system, sans-serif" fontSize="8" fontWeight="700" fill="#E31837" letterSpacing="2">
          GROUP
        </text>
      </svg>
    ),
  },
  {
    id: 'mtn',
    name: 'MTN Nigeria',
    category: 'Telecommunications',
    badge: 'Telco Giant',
    renderLogo: () => (
      <svg viewBox="0 0 150 44" className="h-7 w-auto max-w-[110px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* MTN Yellow pill with oval */}
        <rect x="6" y="8" width="56" height="28" rx="14" fill="#FFCC00" />
        <ellipse cx="34" cy="22" rx="22" ry="10" stroke="#000000" strokeWidth="2" fill="none" />
        <text x="34" y="26" textAnchor="middle" fontFamily="system-ui, -apple-system, sans-serif" fontSize="11" fontWeight="900" fill="#000000" letterSpacing="0.8">
          MTN
        </text>
        <text x="70" y="27" fontFamily="system-ui, -apple-system, sans-serif" fontSize="15" fontWeight="800" fill="#1A1A1A">
          Nigeria
        </text>
      </svg>
    ),
  },
  {
    id: 'paystack',
    name: 'Paystack',
    category: 'Fintech & Payments',
    badge: 'Stripe Company',
    renderLogo: () => (
      <svg viewBox="0 0 150 44" className="h-7 w-auto max-w-[115px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Paystack stacked lines symbol */}
        <g transform="translate(8, 10)">
          <rect x="0" y="0" width="22" height="4.5" rx="2.25" fill="#00C3F9" />
          <rect x="0" y="8.5" width="22" height="4.5" rx="2.25" fill="#00C3F9" />
          <rect x="0" y="17" width="13" height="4.5" rx="2.25" fill="#00C3F9" />
        </g>
        {/* Wordmark */}
        <text x="38" y="27" fontFamily="system-ui, -apple-system, sans-serif" fontSize="17" fontWeight="800" fill="#001738" letterSpacing="-0.4">
          paystack
        </text>
      </svg>
    ),
  },
  {
    id: 'gtbank',
    name: 'Guaranty Trust',
    category: 'Financial Services',
    badge: 'GTCO Holding',
    renderLogo: () => (
      <svg viewBox="0 0 160 44" className="h-7 w-auto max-w-[125px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* GTBank iconic orange square */}
        <rect x="8" y="7" width="30" height="30" rx="4" fill="#E05A10" />
        <text x="18" y="28" fontFamily="Georgia, serif" fontSize="20" fontWeight="900" fill="#FFFFFF">
          gt
        </text>
        <rect x="30" y="13" width="4" height="4" fill="#6B7280" />
        {/* Wordmark */}
        <text x="46" y="22" fontFamily="system-ui, -apple-system, sans-serif" fontSize="13" fontWeight="800" fill="#1F2937">
          Guaranty Trust
        </text>
        <text x="46" y="32" fontFamily="system-ui, -apple-system, sans-serif" fontSize="8" fontWeight="600" fill="#6B7280" letterSpacing="0.5">
          GTCO HOLDINGS
        </text>
      </svg>
    ),
  },
  {
    id: 'kuda',
    name: 'Kuda Bank',
    category: 'Digital Banking',
    badge: 'Microfinance',
    renderLogo: () => (
      <svg viewBox="0 0 140 44" className="h-7 w-auto max-w-[110px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Kuda purple circle + K mark */}
        <circle cx="22" cy="22" r="15" fill="#40196D" />
        <path d="M17 14 L17 30 M27 15 L19 22 L27 29" stroke="#00E5FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* Wordmark */}
        <text x="44" y="27" fontFamily="system-ui, -apple-system, sans-serif" fontSize="19" fontWeight="900" fill="#40196D" letterSpacing="-0.5">
          kuda.
        </text>
      </svg>
    ),
  },
  {
    id: 'unilag',
    name: 'University of Lagos',
    category: 'Higher Education',
    badge: 'Academic Institution',
    renderLogo: () => (
      <svg viewBox="0 0 160 44" className="h-7 w-auto max-w-[125px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* UNILAG Crest shield */}
        <g transform="translate(8, 7)">
          <path d="M0 4 C0 4, 7 0, 14 0 C21 0, 28 4, 28 4 L28 18 C28 26, 14 30, 14 30 C14 30, 0 26, 0 18 Z" fill="#006633" />
          <path d="M5 10 L14 6 L23 10 L14 14 Z" fill="#D4AF37" />
          <rect x="10" y="16" width="8" height="6" fill="#FFFFFF" rx="1" />
        </g>
        {/* Wordmark */}
        <text x="44" y="22" fontFamily="Times New Roman, serif" fontSize="14" fontWeight="800" fill="#006633" letterSpacing="0.2">
          UNILAG
        </text>
        <text x="44" y="32" fontFamily="system-ui, -apple-system, sans-serif" fontSize="8" fontWeight="600" fill="#6B7280">
          Univ. of Lagos
        </text>
      </svg>
    ),
  },
  {
    id: 'oando',
    name: 'Oando Clean Energy',
    category: 'Energy & Infrastructure',
    badge: 'Energy Leader',
    renderLogo: () => (
      <svg viewBox="0 0 150 44" className="h-7 w-auto max-w-[115px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Oando flame / ring */}
        <g transform="translate(8, 8)">
          <circle cx="14" cy="14" r="13" stroke="#E31B23" strokeWidth="3" fill="none" />
          <path d="M9 18 C9 13, 14 7, 14 7 C14 7, 19 13, 19 18 C19 21, 17 23, 14 23 C11 23, 9 21, 9 18 Z" fill="#002B49" />
        </g>
        {/* Wordmark */}
        <text x="42" y="27" fontFamily="system-ui, -apple-system, sans-serif" fontSize="17" fontWeight="900" fill="#002B49">
          Oando
        </text>
      </svg>
    ),
  },
  {
    id: 'leadway',
    name: 'Leadway Assurance',
    category: 'Insurance & Pension',
    badge: 'Financial Services',
    renderLogo: () => (
      <svg viewBox="0 0 160 44" className="h-7 w-auto max-w-[125px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Leadway shield badge */}
        <g transform="translate(8, 8)">
          <rect x="0" y="0" width="26" height="26" rx="5" fill="#0A2540" />
          <path d="M6 13 L13 6 L20 13 L13 20 Z" stroke="#D4AF37" strokeWidth="2.5" fill="none" />
        </g>
        {/* Wordmark */}
        <text x="42" y="22" fontFamily="system-ui, -apple-system, sans-serif" fontSize="13" fontWeight="900" fill="#0A2540" letterSpacing="0.8">
          LEADWAY
        </text>
        <text x="42" y="32" fontFamily="system-ui, -apple-system, sans-serif" fontSize="8" fontWeight="600" fill="#8C7030">
          ASSURANCE PLC
        </text>
      </svg>
    ),
  },
];

interface TrustedLogosStripProps {
  className?: string;
  variant?: 'light' | 'subtle' | 'compact';
}

export const TrustedLogosStrip: React.FC<TrustedLogosStripProps> = ({ 
  className = '',
  variant = 'light'
}) => {
  return (
    <section 
      id="trusted-enterprises-section"
      className={`relative py-8 sm:py-10 border-b border-stone-200/80 bg-gradient-to-b from-stone-50 via-white to-stone-50 overflow-hidden ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-2 mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-extrabold tracking-wider uppercase shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#b8860b]" />
            <span>Official Corporate Printing Partner</span>
          </div>

          <h2 className="text-xs sm:text-sm md:text-base font-black uppercase tracking-wider sm:tracking-widest text-stone-700 max-w-3xl mx-auto leading-relaxed">
            TRUSTED BY NIGERIA&apos;S LEADING ENTERPRISES, FINTECHS &amp; INSTITUTIONS
          </h2>
          
          <p className="text-[11px] sm:text-xs text-stone-500 font-medium">
            Over 50,000+ corporate orders executed with 100% color accuracy, premium substrates &amp; nationwide delivery
          </p>
        </div>

        {/* Logos Grid with authentic brand SVG designs */}
        <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {ENTERPRISE_BRANDS.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative bg-white hover:bg-amber-50/30 border border-stone-200/90 hover:border-amber-400/60 rounded-2xl p-3.5 sm:p-4 flex flex-col items-center justify-between text-center transition-all duration-300 shadow-2xs hover:shadow-md hover:-translate-y-0.5"
            >
              {/* Brand Logo Presentation Box */}
              <div className="h-10 sm:h-12 w-full flex items-center justify-center px-1 transition-transform group-hover:scale-105 duration-200">
                {brand.renderLogo()}
              </div>

              {/* Sub-label & Industry Badge */}
              <div className="w-full pt-2 mt-1 border-t border-stone-100 flex items-center justify-between gap-1 text-[10px]">
                <span className="font-bold text-stone-700 truncate text-left max-w-[85px] sm:max-w-[100px]">
                  {brand.name}
                </span>
                <span className="shrink-0 px-1.5 py-0.5 rounded-md bg-stone-100 text-stone-600 font-semibold text-[9px] group-hover:bg-amber-100 group-hover:text-amber-900 transition-colors">
                  {brand.badge}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Trust Indicators */}
        <div className="mt-6 pt-5 border-t border-stone-200/60 flex flex-wrap items-center justify-center gap-6 text-[11px] sm:text-xs text-stone-500 font-medium">
          <div className="flex items-center gap-1.5 text-stone-700">
            <Award className="w-4 h-4 text-[#b8860b]" />
            <span>Bulk Procurement &amp; Corporate Credit Support</span>
          </div>
          <span className="hidden sm:inline text-stone-300">•</span>
          <div className="flex items-center gap-1.5 text-stone-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Direct Proforma Invoices with Tax &amp; CAC Verification</span>
          </div>
          <span className="hidden sm:inline text-stone-300">•</span>
          <div className="flex items-center gap-1.5 text-stone-700">
            <span>Guaranteed Next-Day Dispatch to Lagos, Abuja, PH &amp; All 36 States</span>
          </div>
        </div>
      </div>
    </section>
  );
};
