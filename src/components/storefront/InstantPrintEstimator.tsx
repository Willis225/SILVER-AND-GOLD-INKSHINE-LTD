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
      className={`relative w-full max-w-[325px] sm:max-w-[340px] mx-auto rounded-2xl text-white p-4 sm:p-4.5 space-y-3 select-none transition-all duration-300 ${className}`}
      style={{
        background: 'rgba(14, 18, 26, 0.45)',
        backdropFilter: 'blur(24px) saturate(190%)',
        WebkitBackdropFilter: 'blur(24px) saturate(190%)',
        border: '1px solid rgba(255, 255, 255, 0.28)',
        boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.16), 0 24px 60px -10px rgba(0, 0, 0, 0.95), 0 10px 25px -5px rgba(0, 0, 0, 0.7), inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 1px 0 rgba(255, 255, 255, 0.12), 0 0 35px rgba(245, 190, 56, 0.08)',
      }}
    >
      {/* 1. Header: Compact Architectural Title & Specification Indicator */}
      <div className="flex items-center justify-between border-b border-white/15 pb-2.5">
        <div>
          <h3 className="text-[13px] sm:text-sm font-bold tracking-tight text-white font-display uppercase leading-tight">
            Instant Print Estimator
          </h3>
          <p className="text-[10px] text-stone-400 font-medium">Fast Custom Specifications</p>
        </div>
        <div className="text-right">
          <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#ffd25d]">Factory Direct</span>
          <p className="text-[9px] text-stone-400 font-medium">Pre-Press Review</p>
        </div>
      </div>

      {/* 2. Product Type */}
      <div className="space-y-1 text-left">
        <label className="text-[10.5px] font-semibold text-stone-300 block uppercase tracking-wider">
          Product Type
        </label>
        <div className="relative">
          <select
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            className="w-full h-9 px-3 pr-8 rounded-lg bg-black/35 hover:bg-black/55 focus:bg-black/65 border border-white/20 focus:border-[#f5be38] text-white font-medium text-xs appearance-none outline-none transition-all cursor-pointer shadow-inner truncate"
          >
            {WEBSITE_PRODUCT_TYPES.map((type) => (
              <option key={type} value={type} className="bg-[#0b0e14] text-white">
                {type}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
        </div>
      </div>

      {/* 3. Dimension / Description */}
      <div className="space-y-1 text-left">
        <label className="text-[10.5px] font-semibold text-stone-300 block uppercase tracking-wider">
          Dimension / Description
        </label>
        <input
          type="text"
          value={dimensionDescription}
          onChange={(e) => setDimensionDescription(e.target.value)}
          placeholder="e.g. 6ft x 3ft, A5 brochure..."
          className="w-full h-9 px-3 rounded-lg bg-black/35 hover:bg-black/55 focus:bg-black/65 border border-white/20 focus:border-[#f5be38] text-white placeholder-stone-400 font-medium text-xs outline-none transition-all shadow-inner"
        />
      </div>

      {/* 4. Material */}
      <div className="space-y-1 text-left">
        <label className="text-[10.5px] font-semibold text-stone-300 block uppercase tracking-wider">
          Material &amp; Finishing
        </label>
        <input
          type="text"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
          placeholder="e.g. 13oz Vinyl, 350gsm Matte..."
          className="w-full h-9 px-3 rounded-lg bg-black/35 hover:bg-black/55 focus:bg-black/65 border border-white/20 focus:border-[#f5be38] text-white placeholder-stone-400 font-medium text-xs outline-none transition-all shadow-inner"
        />
      </div>

      {/* 5. Quantity */}
      <div className="space-y-1 text-left">
        <label className="text-[10.5px] font-semibold text-stone-300 block uppercase tracking-wider">
          Quantity (Units)
        </label>
        <input
          type="text"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="e.g. 50, 100, 500"
          className="w-full h-9 px-3 rounded-lg bg-black/35 hover:bg-black/55 focus:bg-black/65 border border-white/20 focus:border-[#f5be38] text-white placeholder-stone-400 font-medium text-xs outline-none transition-all shadow-inner font-mono tabular-nums"
        />
      </div>

      {/* 6. Estimated Total: Compact Luminous Gold & Diamond White Presentation */}
      <div className="pt-2 border-t border-white/15 flex items-baseline justify-between gap-2">
        <span className="text-[10.5px] font-bold tracking-wider uppercase text-stone-300">
          Estimated Total:
        </span>
        <div className="text-right">
          <span className="font-extrabold text-[13px] sm:text-sm tracking-tight text-[#f5be38] drop-shadow-[0_1px_8px_rgba(245,190,56,0.3)]">
            Price on Request
          </span>
          <p className="text-[9.5px] text-stone-400">Artwork review included</p>
        </div>
      </div>

      {/* 7. Action Button: Brushed Gold Tactile Button */}
      <div className="pt-0.5">
        <button
          type="button"
          onClick={handleOrderNow}
          className="w-full h-10.5 px-4 rounded-xl font-extrabold text-xs tracking-wider uppercase text-stone-950 flex items-center justify-center gap-2 bg-gradient-to-r from-[#ffd25d] via-[#f5be38] to-[#e5af28] hover:from-[#f5be38] hover:to-[#d49f18] shadow-[0_8px_22px_rgba(245,190,56,0.35)] active:scale-[0.98] transition-all cursor-pointer"
        >
          <span>ORDER NOW</span>
          <ArrowRight className="w-3.5 h-3.5 text-stone-950 stroke-[3]" />
        </button>
      </div>

    </div>
  );
};
