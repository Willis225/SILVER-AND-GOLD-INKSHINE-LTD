import React, { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { STORE_CATEGORIES } from '../../utils/categoryUtils';

export interface InstantEstimatorQuote {
  productType: string;
  dimensionDescription: string;
  material: string;
  quantity: string;
  priceNote: string;
}

export type QuoteDetails = InstantEstimatorQuote;

interface InstantPrintEstimatorProps {
  onProceedToOrder?: (quoteData: InstantEstimatorQuote) => void;
  className?: string;
  isFloating?: boolean;
}

// Product types compiled directly from the website's complete store categories
const WEBSITE_PRODUCT_TYPES = STORE_CATEGORIES
  .filter((c) => c.id !== 'all')
  .map((c) => c.label);

export const InstantPrintEstimator: React.FC<InstantPrintEstimatorProps> = ({
  onProceedToOrder,
  className = '',
}) => {
  // 1. Form States (All start completely empty per user request)
  const [productType, setProductType] = useState<string>(
    WEBSITE_PRODUCT_TYPES.find((p) => p.includes('Banner')) || WEBSITE_PRODUCT_TYPES[0] || 'Large-Format Banners & Stands'
  );
  const [dimensionDescription, setDimensionDescription] = useState<string>('');
  const [material, setMaterial] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');

  // 2. WhatsApp Direct Ordering
  const handleOrderNow = () => {
    const quoteData: InstantEstimatorQuote = {
      productType,
      dimensionDescription: dimensionDescription.trim() || 'Not specified',
      material: material.trim() || 'Not specified',
      quantity: quantity.trim() || 'Not specified',
      priceNote: 'Price on Request',
    };

    if (onProceedToOrder) {
      onProceedToOrder(quoteData);
      return;
    }

    const messageLines = [
      `*SILVER & GOLD PRINTING SERVICES — ORDER / QUOTE REQUEST*`,
      `📦 Product Type: *${quoteData.productType}*`,
      `📐 Dimension / Description: *${quoteData.dimensionDescription}*`,
      `🏷️ Material: *${quoteData.material}*`,
      `🔢 Quantity: *${quoteData.quantity}*`,
      `💰 Estimated Total: *Price on Request*`,
      `\n_Sent from Instant Print Estimator on silvergoldinkshine.com_`,
    ].join('\n');

    const whatsappUrl = `https://wa.me/2347030372539?text=${encodeURIComponent(messageLines)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={`relative w-full max-w-[380px] lg:max-w-[400px] mx-auto rounded-2xl bg-[#090b0e]/90 backdrop-blur-2xl border border-white/15 shadow-[0_30px_70px_rgba(0,0,0,0.9),0_0_1px_1px_rgba(255,255,255,0.08)] text-white p-5 sm:p-6 space-y-4 select-none ${className}`}
    >
      {/* 1. Header: Architectural Title & Discreet Trust Indicator */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div>
          <h3 className="text-sm sm:text-[15px] font-bold tracking-tight text-white font-display uppercase">
            Instant Print Estimator
          </h3>
          <p className="text-[11px] text-stone-400 font-medium">Bespoke Commercial Specifications</p>
        </div>
        <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-md bg-[#f5be38]/15 text-[#f5be38] border border-[#f5be38]/30">
          Live Quote
        </span>
      </div>

      {/* 2. Product Type */}
      <div className="space-y-1.5 text-left">
        <label className="text-[11.5px] font-semibold text-stone-300 block uppercase tracking-wider">
          Product Type
        </label>
        <div className="relative">
          <select
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            className="w-full h-10.5 px-3.5 pr-9 rounded-xl bg-black/50 hover:bg-black/70 border border-white/15 focus:border-[#f5be38] text-white font-medium text-[13px] sm:text-sm appearance-none outline-none transition-all cursor-pointer shadow-inner truncate"
          >
            {WEBSITE_PRODUCT_TYPES.map((type) => (
              <option key={type} value={type} className="bg-[#090b0e] text-white">
                {type}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
        </div>
      </div>

      {/* 3. Dimension / Description */}
      <div className="space-y-1.5 text-left">
        <label className="text-[11.5px] font-semibold text-stone-300 block uppercase tracking-wider">
          Dimension / Description
        </label>
        <input
          type="text"
          value={dimensionDescription}
          onChange={(e) => setDimensionDescription(e.target.value)}
          placeholder="e.g. 6ft x 3ft banner, A5 16-page brochure..."
          className="w-full h-10.5 px-3.5 rounded-xl bg-black/50 hover:bg-black/70 focus:bg-black/80 border border-white/15 focus:border-[#f5be38] text-white placeholder-stone-500 font-medium text-[13px] sm:text-sm outline-none transition-all shadow-inner"
        />
      </div>

      {/* 4. Material */}
      <div className="space-y-1.5 text-left">
        <label className="text-[11.5px] font-semibold text-stone-300 block uppercase tracking-wider">
          Material &amp; Finishing
        </label>
        <input
          type="text"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
          placeholder="e.g. 13oz Solvent Vinyl, 350gsm Matte Card..."
          className="w-full h-10.5 px-3.5 rounded-xl bg-black/50 hover:bg-black/70 focus:bg-black/80 border border-white/15 focus:border-[#f5be38] text-white placeholder-stone-500 font-medium text-[13px] sm:text-sm outline-none transition-all shadow-inner"
        />
      </div>

      {/* 5. Quantity */}
      <div className="space-y-1.5 text-left">
        <label className="text-[11.5px] font-semibold text-stone-300 block uppercase tracking-wider">
          Quantity (Units)
        </label>
        <input
          type="text"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="e.g. 50, 250, 1000"
          className="w-full h-10.5 px-3.5 rounded-xl bg-black/50 hover:bg-black/70 focus:bg-black/80 border border-white/15 focus:border-[#f5be38] text-white placeholder-stone-500 font-medium text-[13px] sm:text-sm outline-none transition-all shadow-inner font-mono tabular-nums"
        />
      </div>

      {/* 6. Estimated Total: Sophisticated Gold & Silver Luxury Presentation */}
      <div className="pt-2 border-t border-white/10 flex items-baseline justify-between gap-2">
        <span className="text-[11px] font-semibold tracking-wider uppercase text-stone-400">
          Estimated Total
        </span>
        <div className="text-right">
          <span className="font-extrabold text-sm sm:text-base tracking-tight text-[#f5be38]">
            Price on Request
          </span>
          <p className="text-[10px] text-stone-400">Calculated after artwork review</p>
        </div>
      </div>

      {/* 7. Action Button: Architectural Brushed Gold Button */}
      <div className="pt-1">
        <button
          type="button"
          onClick={handleOrderNow}
          className="w-full h-12 px-5 rounded-xl font-extrabold text-xs sm:text-sm tracking-wider uppercase text-stone-950 flex items-center justify-center gap-2 bg-gradient-to-r from-[#ffd25d] via-[#f5be38] to-[#e5af28] hover:from-[#f5be38] hover:to-[#d49f18] shadow-[0_10px_28px_rgba(245,190,56,0.25)] active:scale-[0.98] transition-all cursor-pointer"
        >
          <span>ORDER NOW</span>
          <ArrowRight className="w-4 h-4 text-stone-950 stroke-[3]" />
        </button>
      </div>

    </div>
  );
};
