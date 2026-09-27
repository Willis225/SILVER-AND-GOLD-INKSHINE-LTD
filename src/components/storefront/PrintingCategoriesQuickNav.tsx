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
  // Product-specific background image (strictly printing press products, no humans)
  bgImage: string;
  imageBlendClass: string;
  baseBgClass: string;
  overlayGradientClass: string;
  borderColor: string;
  hoverBorderColor: string;
  // Text & accents
  textColor: string;
  subtitleColor: string;
  tagBg: string;
  tagText: string;
  tagBorder: string;
  iconBoxBg: string;
  iconColor: string;
  buttonBg: string;
  buttonHoverBg: string;
  buttonText: string;
  shadowHover: string;
  shineClass: string;
}

const PRINT_CATEGORIES: CategoryQuickItem[] = [
  {
    id: 'cards_invitations',
    title: 'Business Stationery',
    subtitle: 'Cards, Letterheads, Envelopes',
    icon: FileText,
    tag: 'Fast Turnaround',
    // Clean stack of luxury printed business cards & stationery flatlay
    bgImage: 'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?auto=format&fit=crop&w=700&q=80',
    imageBlendClass: 'opacity-15 group-hover:opacity-25 mix-blend-multiply',
    baseBgClass: 'bg-[#f5be38]',
    overlayGradientClass: 'bg-gradient-to-t from-amber-400/30 via-transparent to-white/40',
    borderColor: 'border-amber-400',
    hoverBorderColor: 'hover:border-amber-300',
    textColor: 'text-neutral-950 font-black',
    subtitleColor: 'text-neutral-900 font-bold',
    tagBg: 'bg-black/10 backdrop-blur-xs',
    tagText: 'text-neutral-950 font-black',
    tagBorder: 'border-black/20',
    iconBoxBg: 'bg-black/10 backdrop-blur-xs border-black/15',
    iconColor: 'text-neutral-950',
    buttonBg: 'bg-neutral-950 text-white',
    buttonHoverBg: 'group-hover:bg-neutral-900',
    buttonText: 'text-white',
    shadowHover: 'hover:shadow-[0_20px_40px_rgba(245,190,56,0.35)]',
    shineClass: 'shine-delay-1',
  },
  {
    id: 'banners_stands',
    title: 'Banners & Roll-Ups',
    subtitle: 'Teardrop flags, Backdrops, Stands',
    icon: Flag,
    tag: 'Heavy Duty',
    // Retractable roll-up exhibition display stand mockup
    bgImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=700&q=80',
    imageBlendClass: 'opacity-20 group-hover:opacity-30 mix-blend-luminosity',
    baseBgClass: 'bg-[#1e3a8a]',
    overlayGradientClass: 'bg-gradient-to-t from-blue-950/80 via-blue-900/40 to-blue-800/20',
    borderColor: 'border-blue-500/50',
    hoverBorderColor: 'hover:border-blue-400',
    textColor: 'text-white font-black drop-shadow-xs',
    subtitleColor: 'text-blue-100 font-medium',
    tagBg: 'bg-white/15 backdrop-blur-xs',
    tagText: 'text-white font-black',
    tagBorder: 'border-white/25',
    iconBoxBg: 'bg-white/15 backdrop-blur-xs border-white/25',
    iconColor: 'text-white',
    buttonBg: 'bg-white text-[#1e3a8a]',
    buttonHoverBg: 'group-hover:bg-blue-50',
    buttonText: 'text-[#1e3a8a]',
    shadowHover: 'hover:shadow-[0_20px_40px_rgba(30,58,138,0.4)]',
    shineClass: 'shine-delay-2',
  },
  {
    id: 'flyers_handbills',
    title: 'Flyers & Handbills',
    subtitle: 'Promo leaflets, Brochures, Posters',
    icon: Megaphone,
    tag: 'Bulk Discounts',
    // Stacks of printed offset flyers and marketing brochures
    bgImage: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=700&q=80',
    imageBlendClass: 'opacity-20 group-hover:opacity-30 mix-blend-luminosity',
    baseBgClass: 'bg-[#dc2626]',
    overlayGradientClass: 'bg-gradient-to-t from-red-950/80 via-red-900/40 to-red-800/20',
    borderColor: 'border-red-400/50',
    hoverBorderColor: 'hover:border-red-300',
    textColor: 'text-white font-black drop-shadow-xs',
    subtitleColor: 'text-red-100 font-medium',
    tagBg: 'bg-white/15 backdrop-blur-xs',
    tagText: 'text-white font-black',
    tagBorder: 'border-white/25',
    iconBoxBg: 'bg-white/15 backdrop-blur-xs border-white/25',
    iconColor: 'text-white',
    buttonBg: 'bg-white text-[#dc2626]',
    buttonHoverBg: 'group-hover:bg-red-50',
    buttonText: 'text-[#dc2626]',
    shadowHover: 'hover:shadow-[0_20px_40px_rgba(220,38,38,0.4)]',
    shineClass: 'shine-delay-3',
  },
  {
    id: 'packaging_shipping_cartons',
    title: 'Packaging & Cartons',
    subtitle: 'Custom boxes, Food packaging',
    icon: Package,
    tag: 'Sturdy Board',
    // Rigid gift packaging boxes, cartons and cardboard containers
    bgImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=700&q=80',
    imageBlendClass: 'opacity-20 group-hover:opacity-30 mix-blend-luminosity',
    baseBgClass: 'bg-[#047857]',
    overlayGradientClass: 'bg-gradient-to-t from-emerald-950/80 via-emerald-900/40 to-emerald-800/20',
    borderColor: 'border-emerald-400/50',
    hoverBorderColor: 'hover:border-emerald-300',
    textColor: 'text-white font-black drop-shadow-xs',
    subtitleColor: 'text-emerald-100 font-medium',
    tagBg: 'bg-white/15 backdrop-blur-xs',
    tagText: 'text-white font-black',
    tagBorder: 'border-white/25',
    iconBoxBg: 'bg-white/15 backdrop-blur-xs border-white/25',
    iconColor: 'text-white',
    buttonBg: 'bg-white text-[#047857]',
    buttonHoverBg: 'group-hover:bg-emerald-50',
    buttonText: 'text-[#047857]',
    shadowHover: 'hover:shadow-[0_20px_40px_rgba(4,120,87,0.4)]',
    shineClass: 'shine-delay-4',
  },
  {
    id: 'stickers_labels',
    title: 'Stickers & Labels',
    subtitle: 'Die-cut vinyl, Bottle labels',
    icon: Tag,
    tag: 'Waterproof',
    // Rolls of printed custom vinyl stickers and product bottle labels
    bgImage: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=700&q=80',
    imageBlendClass: 'opacity-20 group-hover:opacity-30 mix-blend-luminosity',
    baseBgClass: 'bg-[#0284c7]',
    overlayGradientClass: 'bg-gradient-to-t from-sky-950/80 via-sky-900/40 to-sky-800/20',
    borderColor: 'border-sky-400/50',
    hoverBorderColor: 'hover:border-sky-300',
    textColor: 'text-white font-black drop-shadow-xs',
    subtitleColor: 'text-sky-100 font-medium',
    tagBg: 'bg-white/15 backdrop-blur-xs',
    tagText: 'text-white font-black',
    tagBorder: 'border-white/25',
    iconBoxBg: 'bg-white/15 backdrop-blur-xs border-white/25',
    iconColor: 'text-white',
    buttonBg: 'bg-white text-[#0284c7]',
    buttonHoverBg: 'group-hover:bg-sky-50',
    buttonText: 'text-[#0284c7]',
    shadowHover: 'hover:shadow-[0_20px_40px_rgba(2,132,199,0.4)]',
    shineClass: 'shine-delay-5',
  },
  {
    id: 'custom_apparels_caps',
    title: 'Custom Apparels',
    subtitle: 'Branded T-shirts, Polos, Caps',
    icon: Shirt,
    tag: 'Screen & DTF',
    // Folded screen-printed t-shirts and apparel mockup (PRODUCT ONLY, NO HUMANS)
    bgImage: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=700&q=80',
    imageBlendClass: 'opacity-20 group-hover:opacity-30 mix-blend-luminosity',
    baseBgClass: 'bg-[#7c3aed]',
    overlayGradientClass: 'bg-gradient-to-t from-purple-950/80 via-purple-900/40 to-purple-800/20',
    borderColor: 'border-purple-400/50',
    hoverBorderColor: 'hover:border-purple-300',
    textColor: 'text-white font-black drop-shadow-xs',
    subtitleColor: 'text-purple-100 font-medium',
    tagBg: 'bg-white/15 backdrop-blur-xs',
    tagText: 'text-white font-black',
    tagBorder: 'border-white/25',
    iconBoxBg: 'bg-white/15 backdrop-blur-xs border-white/25',
    iconColor: 'text-white',
    buttonBg: 'bg-white text-[#7c3aed]',
    buttonHoverBg: 'group-hover:bg-purple-50',
    buttonText: 'text-[#7c3aed]',
    shadowHover: 'hover:shadow-[0_20px_40px_rgba(124,58,237,0.4)]',
    shineClass: 'shine-delay-6',
  },
  {
    id: 'signages',
    title: 'Signages & 3D Letters',
    subtitle: 'Shop front signs, Acrylics, Pylons',
    icon: Signpost,
    tag: 'Illuminated',
    // High-clarity illuminated 3D channel letters (user-approved favorite)
    bgImage: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=700&q=80',
    imageBlendClass: 'opacity-25 group-hover:opacity-35 mix-blend-luminosity',
    baseBgClass: 'bg-[#141416]',
    overlayGradientClass: 'bg-gradient-to-t from-black/85 via-[#1c1c20]/60 to-[#09090b]/40',
    borderColor: 'border-amber-400/60',
    hoverBorderColor: 'hover:border-amber-300',
    textColor: 'text-white font-black drop-shadow-xs',
    subtitleColor: 'text-neutral-300 font-medium',
    tagBg: 'bg-[#f5be38]/20 backdrop-blur-xs',
    tagText: 'text-[#f5be38] font-black',
    tagBorder: 'border-[#f5be38]/40',
    iconBoxBg: 'bg-[#f5be38]/20 backdrop-blur-xs border-[#f5be38]/30',
    iconColor: 'text-[#f5be38]',
    buttonBg: 'bg-[#f5be38] text-neutral-950',
    buttonHoverBg: 'group-hover:bg-amber-300',
    buttonText: 'text-neutral-950',
    shadowHover: 'hover:shadow-[0_20px_40px_rgba(245,190,56,0.3)]',
    shineClass: 'shine-delay-7',
  },
  {
    id: 'awards',
    title: 'Awards & Souvenirs',
    subtitle: 'Crystal plaques, Trophies, Gifts',
    icon: Award,
    tag: 'Premium Metal',
    // Polished crystal award plaque and metallic gold trophy
    bgImage: 'https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&w=700&q=80',
    imageBlendClass: 'opacity-20 group-hover:opacity-30 mix-blend-luminosity',
    baseBgClass: 'bg-[#b45309]',
    overlayGradientClass: 'bg-gradient-to-t from-amber-950/80 via-amber-900/40 to-amber-800/20',
    borderColor: 'border-amber-500/50',
    hoverBorderColor: 'hover:border-amber-400',
    textColor: 'text-white font-black drop-shadow-xs',
    subtitleColor: 'text-amber-100 font-medium',
    tagBg: 'bg-white/15 backdrop-blur-xs',
    tagText: 'text-white font-black',
    tagBorder: 'border-white/25',
    iconBoxBg: 'bg-white/15 backdrop-blur-xs border-white/25',
    iconColor: 'text-white',
    buttonBg: 'bg-white text-[#b45309]',
    buttonHoverBg: 'group-hover:bg-amber-50',
    buttonText: 'text-[#b45309]',
    shadowHover: 'hover:shadow-[0_20px_40px_rgba(180,83,9,0.4)]',
    shineClass: 'shine-delay-8',
  },
];

export const PrintingCategoriesQuickNav: React.FC<PrintingCategoriesQuickNavProps> = ({
  onSelectCategory,
  onExploreCatalog,
}) => {
  return (
    <section className="bg-white text-neutral-900 py-14 sm:py-20 border-b border-stone-200 relative overflow-hidden z-10">
      
      {/* Dynamic ambient reflective light aura behind cards */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] max-w-full h-[400px] bg-gradient-to-r from-amber-200/20 via-sky-200/15 to-purple-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-950 text-xs font-black tracking-widest uppercase mb-3 shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f5be38] ring-4 ring-amber-300/40 animate-pulse" />
              <span>Full-Service Commercial Printing Press</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 tracking-tight leading-tight">
              What would you like to print today?
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2 font-normal max-w-2xl">
              Select any category below for instant online pricing, material specs, and instant ordering.
            </p>
          </div>

          <button
            type="button"
            onClick={onExploreCatalog}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-black text-neutral-900 bg-stone-100 hover:bg-[#f5be38] hover:text-black border border-stone-300 hover:border-[#f5be38] transition-all duration-300 group cursor-pointer self-start sm:self-auto shadow-xs hover:shadow-md hover:scale-105 active:scale-95"
          >
            <span>View All Print Categories</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Reflective Conduit Light Line Connecting Categories */}
        <div className="relative mb-6 sm:mb-8">
          {/* Base connector line */}
          <div className="w-full h-1 rounded-full bg-stone-100 overflow-hidden relative shadow-inner">
            {/* Animated flowing reflective light beam */}
            <div className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-[#f5be38] via-sky-400 via-rose-400 to-transparent blur-[1px] animate-connecting-light" />
          </div>

          {/* Micro reflective node indicators that link the cards */}
          <div className="hidden sm:flex justify-between items-center -mt-1.5 px-6 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-[#f5be38] ring-2 ring-white shadow-xs" />
            <span className="w-2 h-2 rounded-full bg-blue-500 ring-2 ring-white shadow-xs" />
            <span className="w-2 h-2 rounded-full bg-red-500 ring-2 ring-white shadow-xs" />
            <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white shadow-xs" />
            <span className="w-2 h-2 rounded-full bg-sky-500 ring-2 ring-white shadow-xs" />
            <span className="w-2 h-2 rounded-full bg-purple-500 ring-2 ring-white shadow-xs" />
            <span className="w-2 h-2 rounded-full bg-amber-400 ring-2 ring-white shadow-xs" />
            <span className="w-2 h-2 rounded-full bg-amber-600 ring-2 ring-white shadow-xs" />
          </div>
        </div>

        {/* 8 Lively Animated Category Boxes with High Contrast & Clear Write-ups */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {PRINT_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`group relative ${cat.baseBgClass} border ${cat.borderColor} ${cat.hoverBorderColor} rounded-2xl sm:rounded-3xl p-6 sm:p-7 min-h-[300px] flex flex-col justify-between overflow-hidden cursor-pointer shadow-md ${cat.shadowHover} transform-gpu transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-2 hover:shadow-2xl active:scale-95 will-change-transform`}
              >
                {/* 1. Underlying Realistic Product Background (Subtle & Reduced Intensity so Write-ups Show Clearly) */}
                <div 
                  className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110 pointer-events-none ${cat.imageBlendClass}`}
                  style={{ backgroundImage: `url('${cat.bgImage}')` }}
                />

                {/* 2. Soft Ambient Tint/Vignette for Maximum Contrast */}
                <div className={`absolute inset-0 ${cat.overlayGradientClass} pointer-events-none`} />

                {/* 3. Subtle Ambient Idle Light Shimmer */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className={`w-1/2 h-full bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-[-25deg] animate-reflective-shine ${cat.shineClass}`} />
                </div>

                {/* 4. Interactive Hover Reflective Light Overlay (Sweeps across card when hovered) */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl sm:rounded-3xl z-20">
                  <div className="absolute inset-0 -translate-x-[150%] skew-x-[-25deg] bg-gradient-to-r from-transparent via-white/10 via-white/35 via-white/10 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-[150%]" />
                </div>

                {/* 5. Soft Specular Ambient Glow on Hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

                {/* 6. Top Row: Minimalist Crisp Icon + Category Tag Badge */}
                <div className="relative z-10 flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${cat.iconBoxBg} border flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3 shadow-xs`}>
                    <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${cat.iconColor}`} />
                  </div>

                  <span className={`text-[11px] sm:text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border ${cat.tagBorder} ${cat.tagBg} ${cat.tagText} shadow-2xs`}>
                    {cat.tag}
                  </span>
                </div>

                {/* 6. Middle Content: High-Impact Typography & Material Subtitle */}
                <div className="relative z-10 flex-1 flex flex-col justify-center">
                  <h3 className={`text-xl sm:text-2xl leading-tight mb-2 tracking-tight transition-transform duration-300 group-hover:translate-x-0.5 ${cat.textColor}`}>
                    {cat.title}
                  </h3>

                  <p className={`text-xs sm:text-sm leading-relaxed ${cat.subtitleColor}`}>
                    {cat.subtitle}
                  </p>
                </div>

                {/* 7. Bottom Action: Popping "Order Now" Button with Animated Arrow */}
                <div className="relative z-10 mt-6 pt-4 border-t border-black/10 group-hover:border-white/20 transition-colors">
                  <div className={`w-full inline-flex items-center justify-between px-4 py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-black transition-all duration-300 ${cat.buttonBg} ${cat.buttonHoverBg} shadow-xs group-hover:shadow-md group-hover:scale-[1.02]`}>
                    <span className="tracking-wide uppercase">Order Now</span>
                    <div className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
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
