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
      aria-label="Quick action navigation dock"
      className="fixed bottom-4 inset-x-3 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-40 max-w-sm sm:max-w-md mx-auto pointer-events-none"
    >
      {/* iPhone 17-inspired Ultra-Glass Floating Capsule Dock */}
      <nav 
        id="iphone-glass-dock"
        aria-label="Mobile and Desktop Quick Dock"
        className="pointer-events-auto relative flex items-center justify-between p-1.5 sm:p-2 rounded-full bg-black/70 backdrop-blur-2xl border border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.7)] ring-1 ring-white/10 transition-all duration-300 hover:border-white/35 hover:shadow-[0_20px_50px_rgba(223,188,94,0.18)]"
      >
        {/* Subtle Ambient Refraction Sheen */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#d4af37]/10 via-white/5 to-[#d4af37]/10 pointer-events-none" />

        {/* 1. Book Online Button (Dynamic Gold Glass Focus) */}
        <button
          type="button"
          id="dock-book-online-btn"
          onClick={onOpenBookOnline}
          className={`relative flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-3 sm:px-4 rounded-full font-bold text-xs sm:text-sm transition-all duration-200 active:scale-95 cursor-pointer ${
            activeModal === 'book'
              ? 'bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#b8860b] text-black shadow-lg shadow-[#d4af37]/30'
              : 'bg-gradient-to-r from-[#dfbc5e]/20 via-[#dfbc5e]/30 to-[#dfbc5e]/20 text-[#ebd07f] hover:bg-[#dfbc5e]/40 hover:text-white border border-[#dfbc5e]/40'
          }`}
          title="Book your print and design order online"
        >
          <Calendar className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#dfbc5e] shrink-0" />
          <span className="font-extrabold tracking-tight whitespace-nowrap">Book Online</span>
          <span className="hidden xs:inline-block w-1.5 h-1.5 rounded-full bg-[#dfbc5e] animate-pulse" />
        </button>

        {/* Vertical Frosted Glass Divider */}
        <div className="h-6 w-[1px] bg-white/15 mx-1" />

        {/* 2. Info Button (Sleek Glass Capsule) */}
        <button
          type="button"
          id="dock-info-btn"
          onClick={onOpenInfo}
          className={`relative flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-3 sm:px-4 rounded-full font-semibold text-xs sm:text-sm transition-all duration-200 active:scale-95 cursor-pointer ${
            activeModal === 'info'
              ? 'bg-white/25 text-white shadow-inner'
              : 'text-stone-200 hover:text-white hover:bg-white/10'
          }`}
          title="Company Info, RC Verification & Services"
        >
          <Info className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-stone-300 shrink-0" />
          <span className="tracking-tight whitespace-nowrap">Info</span>
        </button>

        {/* Vertical Frosted Glass Divider */}
        <div className="h-6 w-[1px] bg-white/15 mx-1" />

        {/* 3. Catalog Button (Gallery & Paintings Showcase) */}
        <button
          type="button"
          id="dock-catalog-btn"
          onClick={onOpenCatalog}
          className={`relative flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-3 sm:px-4 rounded-full font-semibold text-xs sm:text-sm transition-all duration-200 active:scale-95 cursor-pointer ${
            activeModal === 'catalog'
              ? 'bg-white/25 text-white shadow-inner'
              : 'text-stone-200 hover:text-white hover:bg-white/10'
          }`}
          title="Explore Sample Paintings, Prints & Works Catalog"
        >
          <div className="relative">
            <Layers className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#ebd07f] shrink-0" />
            <Sparkles className="w-2.5 h-2.5 text-amber-300 absolute -top-1 -right-1" />
          </div>
          <span className="tracking-tight whitespace-nowrap">Catalog</span>
        </button>
      </nav>
    </aside>
  );
};
