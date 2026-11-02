import React from 'react';

export interface EnterpriseBrand {
  id: string;
  name: string;
  category: string;
  badge: string;
  renderLogo: (className?: string) => React.ReactNode;
}

export const ENTERPRISE_BRANDS: EnterpriseBrand[] = [
  {
    id: 'google',
    name: 'Google',
    category: 'Technology',
    badge: 'Enterprise Partner',
    renderLogo: () => (
      <span className="font-bold text-lg tracking-tight">
        <span className="text-[#4285F4]">G</span>
        <span className="text-[#EA4335]">o</span>
        <span className="text-[#FBBC05]">o</span>
        <span className="text-[#4285F4]">g</span>
        <span className="text-[#34A853]">l</span>
        <span className="text-[#EA4335]">e</span>
      </span>
    ),
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    category: 'Technology',
    badge: 'Enterprise Partner',
    renderLogo: () => (
      <span className="inline-flex items-center gap-1.5 font-semibold text-stone-800 text-sm">
        <span className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5">
          <span className="bg-[#F25022]" />
          <span className="bg-[#7FBA00]" />
          <span className="bg-[#00A4EF]" />
          <span className="bg-[#FFB900]" />
        </span>
        <span>Microsoft</span>
      </span>
    ),
  },
  {
    id: 'youtube',
    name: 'YouTube',
    category: 'Media & Streaming',
    badge: 'Content Partner',
    renderLogo: () => (
      <span className="inline-flex items-center gap-1 font-bold text-stone-900 text-sm">
        <span className="w-4 h-3 bg-[#FF0000] rounded-xs flex items-center justify-center">
          <span className="w-0 h-0 border-y-2 border-y-transparent border-l-2.5 border-l-white" />
        </span>
        <span>YouTube</span>
      </span>
    ),
  },
  {
    id: 'instagram',
    name: 'Instagram',
    category: 'Social Media',
    badge: 'Verified Brand',
    renderLogo: () => (
      <span className="inline-flex items-center gap-1 font-semibold text-stone-800 text-sm">
        <span className="w-3.5 h-3.5 rounded-sm bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#405DE6] flex items-center justify-center">
          <span className="w-2 h-2 rounded-2xs border border-white" />
        </span>
        <span>Instagram</span>
      </span>
    ),
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    category: 'Messaging & Support',
    badge: 'Verified Business',
    renderLogo: () => (
      <span className="inline-flex items-center gap-1 font-semibold text-stone-800 text-sm">
        <span className="w-3.5 h-3.5 rounded-full bg-[#25D366] flex items-center justify-center text-white text-[8px] font-black">
          W
        </span>
        <span>WhatsApp</span>
      </span>
    ),
  },
  {
    id: 'paypal',
    name: 'PayPal',
    category: 'Payments',
    badge: 'Fintech',
    renderLogo: () => (
      <span className="font-extrabold text-sm text-[#003087]">
        <span>Pay</span><span className="text-[#0079C1]">Pal</span>
      </span>
    ),
  },
  {
    id: 'netflix',
    name: 'Netflix',
    category: 'Entertainment',
    badge: 'Global Media',
    renderLogo: () => (
      <span className="font-black text-sm text-[#E50914] tracking-wider uppercase">
        Netflix
      </span>
    ),
  },
  {
    id: 'access-bank',
    name: 'Access Bank',
    category: 'Banking',
    badge: 'Tier-1 Bank',
    renderLogo: () => (
      <span className="font-black text-xs text-[#002D62] tracking-tight">
        <span className="text-[#F37021]">»</span> access
      </span>
    ),
  },
  {
    id: 'flutterwave',
    name: 'Flutterwave',
    category: 'Fintech',
    badge: 'Payments Unicorn',
    renderLogo: () => (
      <span className="font-extrabold text-xs text-[#0B132B]">
        flutterwave
      </span>
    ),
  },
];

export const TrustedLogosStrip: React.FC = () => {
  return (
    <section 
      aria-label="Trusted By Logos"
      className="bg-white py-6 sm:py-8 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Soft Cream/Peach Tinted Container (#FFF8EE) */}
        <div className="rounded-2xl bg-[#FFF8EE] border border-amber-100/80 px-6 py-6 sm:py-8 space-y-5 text-center">
          
          <h3 className="text-xs sm:text-sm font-bold text-slate-700 tracking-wide">
            Trusted by leading businesses, schools &amp; institutions
          </h3>

          {/* Clean Single Horizontal Row of Brand Logos */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-12 opacity-85">
            {ENTERPRISE_BRANDS.map((brand) => (
              <div key={brand.id} className="flex items-center">
                {brand.renderLogo()}
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
