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
  ArrowRight
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
  // Bold color block design styles
  cardBg: string;
  cardHoverBg: string;
  textColor: string;
  subtitleColor: string;
  tagBg: string;
  tagText: string;
  iconBoxBg: string;
  iconColor: string;
  buttonBg: string;
  buttonHoverBg: string;
  buttonText: string;
  borderColor: string;
  shadowHover: string;
}

const PRINT_CATEGORIES: CategoryQuickItem[] = [
  {
    id: 'cards_invitations',
    title: 'Business Stationery',
    subtitle: 'Cards, Letterheads, Envelopes',
    icon: FileText,
    tag: 'Fast Turnaround',
    cardBg: 'bg-[#f5be38]',
    cardHoverBg: 'hover:bg-[#fabf28]',
    textColor: 'text-neutral-950',
    subtitleColor: 'text-neutral-900/80',
    tagBg: 'bg-black/10 border-black/20',
    tagText: 'text-neutral-950',
    iconBoxBg: 'bg-black/10 border-black/15',
    iconColor: 'text-neutral-950',
    buttonBg: 'bg-neutral-950 text-white',
    buttonHoverBg: 'hover:bg-neutral-800',
    buttonText: 'text-white',
    borderColor: 'border-amber-400',
    shadowHover: 'hover:shadow-[0_16px_32px_rgba(245,190,56,0.32)]',
  },
  {
    id: 'banners_stands',
    title: 'Banners & Roll-Ups',
    subtitle: 'Teardrop flags, Backdrops, Stands',
    icon: Flag,
    tag: 'Heavy Duty',
    cardBg: 'bg-[#1e3a8a]',
    cardHoverBg: 'hover:bg-[#1e40af]',
    textColor: 'text-white',
    subtitleColor: 'text-blue-100/90',
    tagBg: 'bg-white/15 border-white/20',
    tagText: 'text-white',
    iconBoxBg: 'bg-white/15 border-white/20',
    iconColor: 'text-white',
    buttonBg: 'bg-white text-[#1e3a8a]',
    buttonHoverBg: 'hover:bg-blue-50',
    buttonText: 'text-[#1e3a8a]',
    borderColor: 'border-blue-700/80',
    shadowHover: 'hover:shadow-[0_16px_32px_rgba(30,58,138,0.32)]',
  },
  {
    id: 'flyers_handbills',
    title: 'Flyers & Handbills',
    subtitle: 'Promo leaflets, Brochures, Posters',
    icon: Megaphone,
    tag: 'Bulk Discounts',
    cardBg: 'bg-[#dc2626]',
    cardHoverBg: 'hover:bg-[#ef4444]',
    textColor: 'text-white',
    subtitleColor: 'text-red-100/90',
    tagBg: 'bg-white/15 border-white/20',
    tagText: 'text-white',
    iconBoxBg: 'bg-white/15 border-white/20',
    iconColor: 'text-white',
    buttonBg: 'bg-white text-[#dc2626]',
    buttonHoverBg: 'hover:bg-red-50',
    buttonText: 'text-[#dc2626]',
    borderColor: 'border-red-600/80',
    shadowHover: 'hover:shadow-[0_16px_32px_rgba(220,38,38,0.32)]',
  },
  {
    id: 'packaging_shipping_cartons',
    title: 'Packaging & Cartons',
    subtitle: 'Custom boxes, Food packaging',
    icon: Package,
    tag: 'Sturdy Board',
    cardBg: 'bg-[#047857]',
    cardHoverBg: 'hover:bg-[#059669]',
    textColor: 'text-white',
    subtitleColor: 'text-emerald-100/90',
    tagBg: 'bg-white/15 border-white/20',
    tagText: 'text-white',
    iconBoxBg: 'bg-white/15 border-white/20',
    iconColor: 'text-white',
    buttonBg: 'bg-white text-[#047857]',
    buttonHoverBg: 'hover:bg-emerald-50',
    buttonText: 'text-[#047857]',
    borderColor: 'border-emerald-600/80',
    shadowHover: 'hover:shadow-[0_16px_32px_rgba(4,120,87,0.32)]',
  },
  {
    id: 'stickers_labels',
    title: 'Stickers & Labels',
    subtitle: 'Die-cut vinyl, Bottle labels',
    icon: Tag,
    tag: 'Waterproof',
    cardBg: 'bg-[#0284c7]',
    cardHoverBg: 'hover:bg-[#0369a1]',
    textColor: 'text-white',
    subtitleColor: 'text-sky-100/90',
    tagBg: 'bg-white/15 border-white/20',
    tagText: 'text-white',
    iconBoxBg: 'bg-white/15 border-white/20',
    iconColor: 'text-white',
    buttonBg: 'bg-white text-[#0284c7]',
    buttonHoverBg: 'hover:bg-sky-50',
    buttonText: 'text-[#0284c7]',
    borderColor: 'border-sky-600/80',
    shadowHover: 'hover:shadow-[0_16px_32px_rgba(2,132,199,0.32)]',
  },
  {
    id: 'custom_apparels_caps',
    title: 'Custom Apparels',
    subtitle: 'Branded T-shirts, Polos, Caps',
    icon: Shirt,
    tag: 'Screen & DTF',
    cardBg: 'bg-[#7c3aed]',
    cardHoverBg: 'hover:bg-[#8b5cf6]',
    textColor: 'text-white',
    subtitleColor: 'text-purple-100/90',
    tagBg: 'bg-white/15 border-white/20',
    tagText: 'text-white',
    iconBoxBg: 'bg-white/15 border-white/20',
    iconColor: 'text-white',
    buttonBg: 'bg-white text-[#7c3aed]',
    buttonHoverBg: 'hover:bg-purple-50',
    buttonText: 'text-[#7c3aed]',
    borderColor: 'border-purple-600/80',
    shadowHover: 'hover:shadow-[0_16px_32px_rgba(124,58,237,0.32)]',
  },
  {
    id: 'signages',
    title: 'Signages & 3D Letters',
    subtitle: 'Shop front signs, Acrylics, Pylons',
    icon: Signpost,
    tag: 'Illuminated',
    cardBg: 'bg-[#18181b]',
    cardHoverBg: 'hover:bg-[#27272a]',
    textColor: 'text-white',
    subtitleColor: 'text-neutral-300',
    tagBg: 'bg-[#f5be38]/20 border-[#f5be38]/40',
    tagText: 'text-[#f5be38]',
    iconBoxBg: 'bg-[#f5be38]/20 border-[#f5be38]/30',
    iconColor: 'text-[#f5be38]',
    buttonBg: 'bg-[#f5be38] text-neutral-950',
    buttonHoverBg: 'hover:bg-amber-300',
    buttonText: 'text-neutral-950',
    borderColor: 'border-neutral-800',
    shadowHover: 'hover:shadow-[0_16px_32px_rgba(24,24,27,0.45)]',
  },
  {
    id: 'awards',
    title: 'Awards & Souvenirs',
    subtitle: 'Crystal plaques, Trophies, Gifts',
    icon: Award,
    tag: 'Premium Metal',
    cardBg: 'bg-[#b45309]',
    cardHoverBg: 'hover:bg-[#d97706]',
    textColor: 'text-white',
    subtitleColor: 'text-amber-100/90',
    tagBg: 'bg-white/15 border-white/20',
    tagText: 'text-white',
    iconBoxBg: 'bg-white/15 border-white/20',
    iconColor: 'text-white',
    buttonBg: 'bg-white text-[#b45309]',
    buttonHoverBg: 'hover:bg-amber-50',
    buttonText: 'text-[#b45309]',
    borderColor: 'border-amber-700/80',
    shadowHover: 'hover:shadow-[0_16px_32px_rgba(180,83,9,0.32)]',
  },
];

export const PrintingCategoriesQuickNav: React.FC<PrintingCategoriesQuickNavProps> = ({
  onSelectCategory,
  onExploreCatalog,
}) => {
  return (
    <section className="bg-white text-neutral-900 py-12 sm:py-16 border-b border-stone-200 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-black tracking-widest uppercase mb-2 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#f5be38] ring-2 ring-amber-300/50" />
              <span>Full-Service Commercial Printing Press</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 tracking-tight">
              What would you like to print today?
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-1.5 font-normal max-w-2xl">
              Select any category below for instant online pricing, material specs, and instant ordering.
            </p>
          </div>

          <button
            type="button"
            onClick={onExploreCatalog}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-neutral-900 bg-stone-100 hover:bg-[#f5be38] hover:text-black border border-stone-200 hover:border-[#f5be38] transition-all duration-200 group cursor-pointer self-start sm:self-auto shadow-2xs"
          >
            <span>View All Print Categories</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 8 Bold Color-Block Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {PRINT_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`group relative ${cat.cardBg} ${cat.cardHoverBg} ${cat.borderColor} border rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between overflow-hidden shadow-sm ${cat.shadowHover}`}
              >
                {/* Subtle sheen highlight in top right */}
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none" />

                <div>
                  {/* Top: Icon + Upper Tag Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${cat.iconBoxBg} border flex items-center justify-center transition-transform group-hover:scale-110 duration-200 shadow-2xs`}>
                      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${cat.iconColor}`} />
                    </div>
                    <span className={`text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${cat.tagBg} ${cat.tagText}`}>
                      {cat.tag}
                    </span>
                  </div>

                  {/* High-Impact Title */}
                  <h3 className={`font-black text-lg sm:text-xl tracking-tight leading-snug mb-1.5 ${cat.textColor}`}>
                    {cat.title}
                  </h3>

                  {/* Material Specs / Subtitle */}
                  <p className={`text-xs sm:text-[13px] font-medium leading-relaxed ${cat.subtitleColor}`}>
                    {cat.subtitle}
                  </p>
                </div>

                {/* Bottom Action: "Order Now" Button with Arrow */}
                <div className="mt-5 pt-4 border-t border-black/10">
                  <div className={`w-full inline-flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all duration-200 ${cat.buttonBg} ${cat.buttonHoverBg} shadow-2xs group-hover:shadow-sm`}>
                    <span className="tracking-wide">Order Now</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
