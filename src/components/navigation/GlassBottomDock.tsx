import React from 'react';
import { Calendar, Info, Layers, Sparkles } from 'lucide-react';

interface GlassBottomDockProps {
  onOpenBookOnline: () => void;
  onOpenInfo: () => void;
  onOpenCatalog: () => void;
  activeModal?: 'book' | 'info' | 'catalog' | null;
}

export const GlassBottomDock: React.FC<GlassBottomDockProps> = ({
  onOpenBookOnline,
  onOpenInfo,
  onOpenCatalog,
  activeModal,
}) => {
  return (
    <aside 
      aria-label="Mobile quick action navigation dock"
      className="md:hidden fixed bottom-[max(0.75rem,env(safe-area-inset-bottom,0.75rem))] inset-x-2 sm:inset-x-4 z-40 max-w-[400px] mx-auto pointer-events-none"
    >
      {/* iPhone-inspired Ultra-Glass Floating Capsule Dock */}
      <nav 
        id="iphone-glass-dock"
        aria-label="Mobile and Desktop Quick Dock"
        className="pointer-events-auto relative flex items-center justify-between p-1 xs:p-1.5 sm:p-2 rounded-full bg-black/85 backdrop-blur-2xl border border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.75)] ring-1 ring-white/10 transition-all duration-300 hover:border-white/35"
      >
        {/* Subtle Ambient Refraction Sheen */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#d4af37]/10 via-white/5 to-[#d4af37]/10 pointer-events-none" />

        {/* 1. Book Online Button (Dynamic Gold Glass Focus) */}
        <button
          type="button"
          id="dock-book-online-btn"
          onClick={onOpenBookOnline}
          className={`relative flex-1 flex items-center justify-center gap-1 xs:gap-1.5 sm:gap-2 py-2 xs:py-2.5 sm:py-3 px-2 xs:px-2.5 sm:px-3 rounded-full font-bold text-[10px] xs:text-xs sm:text-sm transition-all duration-200 active:scale-95 cursor-pointer ${
            activeModal === 'book'
              ? 'bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#b8860b] text-black shadow-lg shadow-[#d4af37]/30'
              : 'bg-gradient-to-r from-[#dfbc5e]/20 via-[#dfbc5e]/30 to-[#dfbc5e]/20 text-[#ebd07f] hover:bg-[#dfbc5e]/40 hover:text-white border border-[#dfbc5e]/40'
          }`}
          title="Book your print and design order online"
        >
          <Calendar className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-[#dfbc5e] shrink-0" />
          <span className="font-extrabold tracking-tight whitespace-nowrap">Book</span>
        </button>

        {/* Vertical Frosted Glass Divider */}
        <div className="h-5 sm:h-6 w-[1px] bg-white/15 mx-0.5 shrink-0" />

        {/* 2. Categories Button (Gallery & Print Categories Showcase) */}
        <button
          type="button"
          id="dock-catalog-btn"
          onClick={onOpenCatalog}
          className={`relative flex-1 flex items-center justify-center gap-1 xs:gap-1.5 py-2 xs:py-2.5 sm:py-3 px-2 xs:px-2.5 rounded-full font-semibold text-[10px] xs:text-xs transition-all duration-200 active:scale-95 cursor-pointer ${
            activeModal === 'catalog'
              ? 'bg-white/25 text-white shadow-inner'
              : 'text-stone-200 hover:text-white hover:bg-white/10'
          }`}
          title="Browse Print & Branding Categories"
        >
          <div className="relative">
            <Layers className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-[#ebd07f] shrink-0" />
            <Sparkles className="w-2 h-2 text-amber-300 absolute -top-1 -right-1" />
          </div>
          <span className="tracking-tight whitespace-nowrap">Categories</span>
        </button>

        {/* Vertical Frosted Glass Divider */}
        <div className="h-5 sm:h-6 w-[1px] bg-white/15 mx-0.5 shrink-0" />

        {/* 3. Info Button */}
        <button
          type="button"
          id="dock-info-btn"
          onClick={onOpenInfo}
          className={`relative flex-1 flex items-center justify-center gap-1 xs:gap-1.5 py-2 xs:py-2.5 sm:py-3 px-1.5 xs:px-2 rounded-full font-semibold text-[10px] xs:text-xs transition-all duration-200 active:scale-95 cursor-pointer ${
            activeModal === 'info'
              ? 'bg-white/25 text-white shadow-inner'
              : 'text-stone-200 hover:text-white hover:bg-white/10'
          }`}
          title="Company Info, RC Verification & Services"
        >
          <Info className="w-3.5 h-3.5 text-stone-300 shrink-0" />
          <span className="tracking-tight whitespace-nowrap">Info</span>
        </button>
      </nav>
    </aside>
  );
};
