import React from 'react';
import { 
  FileText, 
  Flag, 
  Megaphone, 
  Package, 
  Tag, 
  Shirt, 
  Signpost, 
  Award, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { ProductCategory } from '../../types/schema';

interface PrintingCategoriesQuickNavProps {
  onSelectCategory: (category: ProductCategory | 'all') => void;
  onExploreCatalog: () => void;
}

interface CategoryQuickItem {
  id: ProductCategory;
  title: string;
  subtitle: string;
  icon: React.FC<{ className?: string }>;
  tag: string;
  bgImage: string;
  shineClass: string;
}

const PRINT_CATEGORIES: CategoryQuickItem[] = [
  {
    id: 'cards_invitations',
    title: 'Business Stationery',
    subtitle: 'Cards, Letterheads, Envelopes',
    icon: FileText,
    tag: 'Fast Turnaround',
    bgImage: 'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?auto=format&fit=crop&w=700&q=80',
    shineClass: 'shine-delay-1',
  },
  {
    id: 'banners_stands',
    title: 'Banners & Roll-Ups',
    subtitle: 'Teardrop flags, Backdrops, Stands',
    icon: Flag,
    tag: 'Heavy Duty',
    bgImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=700&q=80',
    shineClass: 'shine-delay-2',
  },
  {
    id: 'flyers_handbills',
    title: 'Flyers & Handbills',
    subtitle: 'Promo leaflets, Brochures, Posters',
    icon: Megaphone,
    tag: 'Bulk Discounts',
    bgImage: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=700&q=80',
    shineClass: 'shine-delay-3',
  },
  {
    id: 'packaging_shipping_cartons',
    title: 'Packaging & Cartons',
    subtitle: 'Custom boxes, Food packaging',
    icon: Package,
    tag: 'Sturdy Board',
    bgImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=700&q=80',
    shineClass: 'shine-delay-4',
  },
  {
    id: 'stickers_labels',
    title: 'Stickers & Labels',
    subtitle: 'Die-cut vinyl, Bottle labels',
    icon: Tag,
    tag: 'Waterproof',
    bgImage: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=700&q=80',
    shineClass: 'shine-delay-5',
  },
  {
    id: 'custom_apparels_caps',
    title: 'Custom Apparels',
    subtitle: 'Branded T-shirts, Polos, Caps',
    icon: Shirt,
    tag: 'Screen & DTF',
    bgImage: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=700&q=80',
    shineClass: 'shine-delay-6',
  },
  {
    id: 'signages',
    title: 'Signages & 3D Letters',
    subtitle: 'Shop front signs, Acrylics, Pylons',
    icon: Signpost,
    tag: 'Illuminated',
    bgImage: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=700&q=80',
    shineClass: 'shine-delay-7',
  },
  {
    id: 'awards',
    title: 'Awards & Souvenirs',
    subtitle: 'Crystal plaques, Trophies, Gifts',
    icon: Award,
    tag: 'Premium Metal',
    bgImage: 'https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&w=700&q=80',
    shineClass: 'shine-delay-8',
  },
];

export const PrintingCategoriesQuickNav: React.FC<PrintingCategoriesQuickNavProps> = ({
  onSelectCategory,
  onExploreCatalog,
}) => {
  return (
    <section className="bg-[#09090d] text-white py-14 sm:py-20 border-b border-white/10 relative overflow-hidden z-10">
      
      {/* Dynamic ambient silver/white reflective glow behind cards */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] max-w-full h-[400px] bg-gradient-to-r from-white/[0.04] via-white/[0.08] to-white/[0.04] rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-black tracking-widest uppercase mb-3 shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-white ring-4 ring-white/20 animate-pulse" />
              <span>Full-Service Commercial Printing Press</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              What would you like to print today?
            </h2>
            <p className="text-stone-300 text-sm sm:text-base mt-2 font-normal max-w-2xl">
              Select any category below for instant online pricing, material specs, and instant ordering.
            </p>
          </div>

          <button
            type="button"
            onClick={onExploreCatalog}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-black text-black bg-white hover:bg-stone-200 border border-white transition-all duration-300 group cursor-pointer self-start sm:self-auto shadow-xs hover:shadow-lg hover:scale-105 active:scale-95"
          >
            <span>View All Print Categories</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Reflective Conduit Light Line Connecting Categories (Pure Silver / Monochrome) */}
        <div className="relative mb-6 sm:mb-8">
          {/* Base connector line */}
          <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden relative shadow-inner">
            {/* Animated flowing reflective light beam */}
            <div className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white via-stone-200 to-transparent blur-[1px] animate-connecting-light" />
          </div>

          {/* Micro reflective node indicators in pure silver/white */}
          <div className="hidden sm:flex justify-between items-center -mt-1.5 px-6 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <span key={i} className="w-2 h-2 rounded-full bg-white ring-2 ring-[#09090d] shadow-[0_0_6px_rgba(255,255,255,0.6)]" />
            ))}
          </div>
        </div>

        {/* 8 Luxury Monochrome Black & White Category Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {PRINT_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="group relative bg-[#121217] hover:bg-[#181822] border border-white/15 hover:border-white/50 rounded-2xl sm:rounded-3xl p-6 sm:p-7 min-h-[300px] flex flex-col justify-between overflow-hidden cursor-pointer shadow-md hover:shadow-[0_20px_45px_rgba(255,255,255,0.06)] transform-gpu transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-2 active:scale-95 will-change-transform"
              >
                {/* 1. Underlying Realistic Product Background (Subtle Grayscale Watermark) */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110 pointer-events-none opacity-20 group-hover:opacity-30 filter grayscale contrast-125 mix-blend-luminosity"
                  style={{ backgroundImage: `url('${cat.bgImage}')` }}
                />

                {/* 2. Soft Ambient Dark Vignette for Deep Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

                {/* 3. Subtle Ambient Idle Light Shimmer (Silver / White) */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className={`w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] animate-reflective-shine ${cat.shineClass}`} />
                </div>

                {/* 4. Interactive Hover Reflective Light Overlay (Pure White Gloss Sweep) */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl sm:rounded-3xl z-20">
                  <div className="absolute inset-0 -translate-x-[150%] skew-x-[-25deg] bg-gradient-to-r from-transparent via-white/10 via-white/30 via-white/10 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-[150%]" />
                </div>

                {/* 5. Soft Specular Ambient Glow on Hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

                {/* 6. Top Row: Minimalist Crisp Icon + Category Tag Badge */}
                <div className="relative z-10 flex items-center justify-between mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/10 group-hover:bg-white border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3 shadow-xs">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white group-hover:text-black transition-colors" />
                  </div>

                  <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border border-white/20 bg-white/10 text-white shadow-2xs group-hover:border-white/40">
                    {cat.tag}
                  </span>
                </div>

                {/* 7. Middle Content: High-Impact Typography & Material Subtitle */}
                <div className="relative z-10 flex-1 flex flex-col justify-center">
                  <h3 className="text-xl sm:text-2xl leading-tight mb-2 tracking-tight transition-transform duration-300 group-hover:translate-x-0.5 text-white font-black">
                    {cat.title}
                  </h3>

                  <p className="text-xs sm:text-sm leading-relaxed text-stone-300 font-medium">
                    {cat.subtitle}
                  </p>
                </div>

                {/* 8. Bottom Action: High-Contrast "Order Now" Button with Animated Arrow */}
                <div className="relative z-10 mt-6 pt-4 border-t border-white/15 group-hover:border-white/30 transition-colors">
                  <div className="w-full inline-flex items-center justify-between px-4 py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-black transition-all duration-300 bg-white text-black hover:bg-stone-200 shadow-xs group-hover:shadow-lg group-hover:scale-[1.02]">
                    <span className="tracking-wide uppercase">Order Now</span>
                    <div className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-black" />
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5 text-black" />
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
