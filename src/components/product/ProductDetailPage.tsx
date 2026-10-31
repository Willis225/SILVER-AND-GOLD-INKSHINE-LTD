import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Star, 
  Truck, 
  Clock, 
  ShieldCheck, 
  Check, 
  Percent, 
  Sparkles, 
  ShoppingBag, 
  ChevronRight, 
  Layers, 
  Package, 
  HelpCircle,
  Plus,
  Minus,
  MessageSquare,
  Share2,
  FileCheck
} from 'lucide-react';
import { Product, calculateDynamicPrice } from '../../types/schema';
import { NIGERIAN_SHIPPING_ZONES } from '../../data/seedData';
import { 
  ArtworkPreflightChecker, 
  SubmissionMode, 
  PreflightResult, 
  DesignerBrief 
} from './ArtworkPreflightChecker';
import { PriceOnRequestBadge } from '../common/PriceOnRequestBadge';

interface ProductDetailPageProps {
  product: Product;
  onBackToCatalog: () => void;
  onAddToCart: (item: {
    product: Product;
    selectedOptions: Record<string, string>;
    quantity: number;
    artworkType: SubmissionMode;
    uploadedFileName?: string;
    designerFeeNgn?: number;
    designerBrief?: DesignerBrief;
  }) => void;
  onOpenCustomQuote?: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBackToCatalog,
  onAddToCart,
  onOpenCustomQuote,
}) => {
  // Initialize default options
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const defaults: Record<string, string> = {};
    (product?.optionGroups || []).forEach((grp) => {
      if (!grp || !Array.isArray(grp.options)) return;
      const def = grp.options.find((o) => o?.isDefault) || grp.options[0];
      if (def) defaults[grp.id] = def.id;
    });
    return defaults;
  });

  const minQty = typeof product?.minQuantity === 'number' && product.minQuantity > 0 ? product.minQuantity : 1;
  const [quantity, setQuantity] = useState<number>(minQty);
  const [submissionMode, setSubmissionMode] = useState<SubmissionMode>('direct_upload');
  const [preflightResult, setPreflightResult] = useState<PreflightResult | null>(null);
  const [designerBrief, setDesignerBrief] = useState<DesignerBrief | undefined>();
  const [selectedDestinationZone, setSelectedDestinationZone] = useState<string>(() => NIGERIAN_SHIPPING_ZONES[0]?.id || 'default');
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'box_contents' | 'delivery'>('overview');
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [addedToast, setAddedToast] = useState(false);

  // Gallery angles - prioritize uploaded multi-image photos of finished work
  const galleryImages = (product?.images && product.images.length > 0)
    ? product.images
    : [
        product?.image || '',
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80',
      ].filter(Boolean);

  const designerFeeNgn = submissionMode === 'hire_designer' ? 7500 : 0;
  const pricing = calculateDynamicPrice(product, quantity, selectedOptions);
  const grandTotalWithDesign = (pricing?.grandTotalNgn || 0) + designerFeeNgn;

  const currentZone = NIGERIAN_SHIPPING_ZONES.find((z) => z.id === selectedDestinationZone) || NIGERIAN_SHIPPING_ZONES[0] || {
    id: 'default',
    name: 'Bayelsa State',
    region: 'South-South',
    baseFeeNgn: 2500,
    estimatedDays: '1-2 Days',
    expressAvailable: true
  };

  const handleOptionSelect = (groupId: string, optionId: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [groupId]: optionId,
    }));
  };

  const handleQuantityAdjust = (delta: number) => {
    setQuantity((prev) => Math.max(minQty, prev + delta));
  };

  const handleSetQuickQuantity = (qty: number) => {
    setQuantity(Math.max(minQty, qty));
  };

  const formatNaira = (amount: number | undefined | null) => {
    const val = typeof amount === 'number' && !isNaN(amount) ? amount : 0;
    return '₦' + Math.round(val).toLocaleString('en-NG');
  };

  const handleAddToCartClick = () => {
    onAddToCart({
      product,
      selectedOptions,
      quantity,
      artworkType: submissionMode,
      uploadedFileName: preflightResult ? preflightResult.fileName : undefined,
      designerFeeNgn: designerFeeNgn > 0 ? designerFeeNgn : undefined,
      designerBrief,
    });
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  return (
    <div className="bg-[#08080a] min-h-screen py-6 sm:py-10 text-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between">
          <nav className="flex items-center gap-2 text-xs text-stone-400 font-medium">
            <button
              onClick={onBackToCatalog}
              className="hover:text-[#f5be38] flex items-center gap-1 font-semibold text-stone-300 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Catalog</span>
            </button>
            <span>/</span>
            <span className="text-stone-500">{product.categoryLabel}</span>
            <span>/</span>
            <span className="text-white font-bold truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </span>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/2347030372539?text=Hello%20Silver%20%26%20Gold%20Inkshine%2C%20I%20am%20inquiring%20about%20${encodeURIComponent(product.name)}`}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-[#f5be38] bg-[#f5be38]/10 border border-[#f5be38]/30 px-3 py-1.5 rounded-lg hover:bg-[#f5be38]/20 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Inquiries</span>
            </a>
          </div>
        </div>

        {/* Top Split: Media Gallery (Left) vs Pricing & Options (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Media Gallery & Nigerian Dispatch Ticker */}
          <div className="lg:col-span-6 space-y-5">
            {/* Main Stage Image */}
            <div className="relative aspect-4/3 rounded-3xl overflow-hidden bg-[#121217] border border-white/10 shadow-xl group">
              <img
                src={galleryImages[activeImageIdx]}
                alt={product.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('luxury-rollup-banner-stand.jpg')) {
                    target.src = '/luxury-rollup-banner-stand.jpg';
                  }
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                <span className="px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-black/85 text-[#f5be38] border border-[#f5be38]/30 shadow-md">
                  {product.categoryLabel}
                </span>
                {product.badge && (
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black bg-[#f5be38] text-black shadow-md">
                    {product.badge}
                  </span>
                )}
              </div>

              <div className="absolute bottom-3 right-3">
                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-black/80 text-stone-200 backdrop-blur-xs border border-white/10 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#f5be38]" />
                  <span>{product.turnaroundDays} Business Days TAT</span>
                </span>
              </div>
            </div>

            {/* Thumbnail Navigation */}
            <div className="grid grid-cols-3 gap-3">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIdx(idx)}
                  className={`aspect-4/3 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIdx === idx
                      ? 'border-[#f5be38] ring-2 ring-[#f5be38]/30 shadow-md'
                      : 'border-white/10 hover:border-white/20 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Angle ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('luxury-rollup-banner-stand.jpg')) {
                        target.src = '/luxury-rollup-banner-stand.jpg';
                      }
                    }}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Optional Location Delivery Estimator */}
            <div className="bg-[#121217] rounded-2xl border border-white/10 p-5 space-y-3 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <Truck className="w-4 h-4 text-[#f5be38]" />
                  <span>Delivery to Your Location (Optional)</span>
                </div>
                <span className="text-[10px] text-stone-400 font-medium">To Your Address</span>
              </div>

              <p className="text-[11px] text-stone-400">
                When your job is ready, we can deliver directly to your specific office or home address upon request:
              </p>

              <div className="space-y-2">
                <select
                  value={selectedDestinationZone}
                  onChange={(e) => setSelectedDestinationZone(e.target.value)}
                  className="w-full bg-[#181822] border border-white/15 rounded-xl p-2.5 text-xs font-semibold text-white focus:outline-hidden focus:border-[#f5be38]"
                >
                  {NIGERIAN_SHIPPING_ZONES.map((zone) => (
                    <option key={zone.id} value={zone.id} className="bg-[#181822] text-white">
                      {zone.name} ({zone.region}) — {formatNaira(zone.baseFeeNgn)}
                    </option>
                  ))}
                </select>

                <div className="bg-[#181822] rounded-xl p-3 text-xs flex items-center justify-between text-stone-300 border border-white/5">
                  <div>
                    <span className="text-stone-400 block text-[11px]">Estimated Timeline:</span>
                    <strong className="text-white font-bold">{currentZone.estimatedDays}</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-stone-400 block text-[11px]">Dispatch Status:</span>
                    <strong className="text-[#f5be38] font-bold">
                      Flat Regional Rate
                    </strong>
                  </div>
                </div>

                {currentZone.expressAvailable && (
                  <div className="text-[11px] text-[#f5be38] bg-[#f5be38]/10 border border-[#f5be38]/30 p-2.5 rounded-xl flex items-center justify-between">
                    <span>⚡ Priority Rush Delivery available for {currentZone.name}</span>
                    <span className="font-bold text-white">Direct Courier</span>
                  </div>
                )}
              </div>
            </div>

            {/* Pre-Press Trust Guarantees */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-[#121217] p-3.5 rounded-xl border border-white/10 flex items-start gap-2.5 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-[#f5be38] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">Pre-Press Bleed Guarantee</div>
                  <div className="text-[10px] text-stone-400">Every file is inspected by an expert before press.</div>
                </div>
              </div>

              <div className="bg-[#121217] p-3.5 rounded-xl border border-white/10 flex items-start gap-2.5 shadow-sm">
                <Package className="w-4 h-4 text-[#f5be38] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">Secure Travel Packaging</div>
                  <div className="text-[10px] text-stone-400">Shipped in padded cartons &amp; protective canvas sleeves.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Dynamic Options, Bulk Matrix, Pricing & Cart */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Header info */}
            <div className="bg-[#121217] rounded-3xl border border-white/10 p-6 sm:p-7 space-y-4 shadow-xl">
              <div className="flex items-center justify-between text-xs text-stone-400">
                <span className="font-mono text-stone-400 font-bold">{product.sku}</span>
                <div className="flex items-center gap-1.5 text-[#f5be38]">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#f5be38] text-[#f5be38]" />
                    ))}
                  </div>
                  <span className="font-bold text-stone-300 text-[11px]">4.9 (84 reviews)</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {product.description}
              </p>

              {/* Dynamic Option Groups */}
              <div className="space-y-4 pt-2 border-t border-white/10">
                {product.optionGroups.map((grp) => (
                  <div key={grp.id} className="space-y-2">
                    <label className="text-xs font-bold text-stone-200 flex items-center justify-between">
                      <span>{grp.name}</span>
                      {grp.required && <span className="text-[10px] text-[#f5be38] font-bold">Select One</span>}
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {grp.options.map((opt) => {
                        const isSelected = selectedOptions[grp.id] === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => handleOptionSelect(grp.id, opt.id)}
                            className={`p-3 rounded-xl text-left text-xs transition-all border flex flex-col justify-between cursor-pointer ${
                              isSelected
                                ? 'bg-[#f5be38]/15 border-[#f5be38] text-white ring-2 ring-[#f5be38]/30 shadow-md font-bold'
                                : 'bg-[#181822] border-white/10 text-stone-300 hover:border-white/20'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold">{opt.name}</span>
                              {isSelected && <Check className="w-4 h-4 text-[#f5be38] shrink-0 ml-1" />}
                            </div>
                            {opt.priceModifierValue !== 0 && (
                              <span className="text-[10px] mt-1 font-mono font-semibold text-[#f5be38]">
                                Custom Spec
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quantity Counter & Quick Step Pills */}
              <div className="pt-3 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">Select Order Quantity</span>
                    <span className="text-[10px] text-stone-400">
                      Minimum order: {product.minQuantity} {product.minQuantity === 1 ? 'unit' : 'pack'}
                    </span>
                  </div>

                  <div className="flex items-center border border-white/15 rounded-xl bg-[#181822] overflow-hidden shadow-inner">
                    <button
                      type="button"
                      onClick={() => handleQuantityAdjust(-1)}
                      disabled={quantity <= product.minQuantity}
                      className="p-2 text-stone-300 hover:bg-white/10 disabled:opacity-30 cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val)) setQuantity(Math.max(product.minQuantity, val));
                      }}
                      className="w-14 text-center font-mono font-black text-sm py-1.5 text-white bg-transparent focus:outline-hidden"
                    />
                    <button
                      type="button"
                      onClick={() => handleQuantityAdjust(1)}
                      className="p-2 text-stone-300 hover:bg-white/10 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Quick select buttons */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-stone-400 uppercase font-semibold">Quick Step:</span>
                  {[1, 3, 5, 10, 25, 50].map((stepQty) => (
                    <button
                      key={stepQty}
                      type="button"
                      onClick={() => handleSetQuickQuantity(stepQty)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg font-mono font-semibold transition-colors cursor-pointer ${
                        quantity === stepQty
                          ? 'bg-[#f5be38] text-black font-bold shadow-md'
                          : 'bg-[#181822] text-stone-300 hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      {stepQty}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bulk Volume Discount Matrix Table */}
              <div className="pt-2 border-t border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white flex items-center gap-1">
                    <Percent className="w-3.5 h-3.5 text-[#f5be38]" />
                    <span>Tiered Bulk Volume Discount Matrix</span>
                  </span>
                  <span className="text-[10px] text-stone-400">Live Tier Applied</span>
                </div>

                <div className="border border-white/10 rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-[#181822] text-stone-300 font-semibold text-[11px]">
                      <tr>
                        <th className="p-2.5">Tier Quantity</th>
                        <th className="p-2.5">Discount %</th>
                        <th className="p-2.5 text-right">Unit Price</th>
                        <th className="p-2.5 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 bg-[#121217]">
                      {product.bulkPricingTiers.map((tier, idx) => {
                        const isTierActive = 
                          quantity >= tier.minQuantity &&
                          (tier.maxQuantity === null || quantity <= tier.maxQuantity);
                        
                        // Calculate sample unit price for this tier
                        const tierPrice = Math.round(
                          pricing.unitPriceBeforeDiscount * (1 - tier.discountPercentage / 100)
                        );

                        return (
                          <tr
                            key={idx}
                            className={`transition-colors ${
                              isTierActive
                                ? 'bg-[#f5be38]/15 font-bold text-white'
                                : 'text-stone-300'
                            }`}
                          >
                            <td className="p-2.5">{tier.label}</td>
                            <td className="p-2.5 font-mono text-[#f5be38] font-bold">
                              {tier.discountPercentage > 0 ? `${tier.discountPercentage}% OFF` : 'Base Price'}
                            </td>
                            <td className="p-2.5 text-right font-mono">
                              <span className="text-[#f5be38] text-[11px] font-sans font-bold">Quote on Request</span>
                            </td>
                            <td className="p-2.5 text-right">
                              {isTierActive ? (
                                <span className="inline-flex items-center gap-1 text-[10px] bg-[#f5be38] text-black font-black px-2 py-0.5 rounded-full uppercase shadow-xs">
                                  <Check className="w-2.5 h-2.5" />
                                  Active
                                </span>
                              ) : (
                                <span className="text-[10px] text-stone-500">—</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Integrated Artwork Submission & Pre-Press Section */}
            <ArtworkPreflightChecker
              requirements={product.artworkRequirements}
              submissionMode={submissionMode}
              onSubmissionModeChange={setSubmissionMode}
              onPreflightComplete={setPreflightResult}
              designerFeeNgn={7500}
              onDesignerBriefChange={setDesignerBrief}
            />

            {/* Live Pricing Summary & Add to Cart Sticky Box */}
            <div className="bg-[#121217] text-white rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 border border-white/10">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f5be38] animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#f5be38]">
                    Live Order Summary &amp; Configuration
                  </span>
                </div>
                <span className="text-xs text-stone-400 font-mono">
                  {quantity} unit{quantity > 1 ? 's' : ''} configured
                </span>
              </div>

              {/* Dynamic Real-Time Configuration Spec Tags */}
              <div className="p-4 rounded-2xl bg-[#181822] border border-white/10 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold text-stone-400">
                    Calculated Configuration:
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#f5be38]/20 text-[#f5be38] font-bold text-[10px] uppercase tracking-wider border border-[#f5be38]/30">
                    Live Verified
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                  <div className="bg-black/40 p-2 rounded-lg border border-white/5">
                    <span className="text-stone-400 block text-[10px]">Order Volume:</span>
                    <span className="font-bold text-white font-mono">{quantity} {quantity === 1 ? 'Unit' : 'Units'}</span>
                  </div>
                  <div className="bg-black/40 p-2 rounded-lg border border-white/5">
                    <span className="text-stone-400 block text-[10px]">Turnaround:</span>
                    <span className="font-bold text-white">{product.turnaroundDays} Business Days</span>
                  </div>
                  <div className="bg-black/40 p-2 rounded-lg border border-white/5 sm:col-span-2">
                    <span className="text-stone-400 block text-[10px]">Selected Options:</span>
                    <span className="font-bold text-stone-200 truncate block">
                      {Object.entries(selectedOptions).map(([k, v]) => `${String(k).replace('opt-', '')}: ${String(v).replace('opt-', '')}`).join(' • ') || 'Standard Press Specs'}
                    </span>
                  </div>
                  <div className="bg-black/40 p-2 rounded-lg border border-white/5 sm:col-span-2 flex items-center justify-between">
                    <div>
                      <span className="text-stone-400 block text-[10px]">Artwork Status:</span>
                      <span className="font-bold text-[#f5be38]">
                        {submissionMode === 'upload_ready' ? (preflightResult ? `Ready (${preflightResult.fileName})` : 'File Upload Ready') : submissionMode === 'hire_designer' ? 'Hire Certified Press Artist' : 'Submit Later via WhatsApp'}
                      </span>
                    </div>
                    <span className="text-[10px] text-stone-400">
                      Destination: <strong className="text-white">{currentZone.name}</strong>
                    </span>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs uppercase font-bold text-stone-400">
                    Storefront Rate:
                  </span>
                  <PriceOnRequestBadge theme="dark" size="sm" />
                </div>
              </div>

              {/* The Single Primary Action Button */}
              <div className="space-y-3">
                <button
                  type="button"
                  id="pdp-primary-order-btn"
                  onClick={handleAddToCartClick}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#f5be38] via-[#ffd25d] to-[#e5c158] hover:from-[#ffd25d] hover:to-[#f5be38] active:scale-98 text-black font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl shadow-[#f5be38]/25 transition-all cursor-pointer group"
                >
                  <ShoppingBag className="w-5 h-5 text-black group-hover:scale-110 transition-transform" />
                  <span>Add to Cart &amp; Proceed to Checkout</span>
                </button>

                {/* Direct WhatsApp Instant Consultation */}
                <a
                  href={`https://wa.me/2347030372539?text=${encodeURIComponent(`Hello Silver & Gold Inkshine Ltd, I am configuring: "${product.name}" (${quantity} units, Specs: ${Object.entries(selectedOptions).map(([k, v]) => `${k}: ${v}`).join(', ')}). Please confirm the live quote and production schedule.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#181822] hover:bg-white/10 active:scale-98 text-stone-300 hover:text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer border border-white/15"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  <span>Quick WhatsApp Inquiries &amp; Instant Verification</span>
                </a>
              </div>

              {addedToast && (
                <div className="text-center text-xs text-[#f5be38] font-bold flex items-center justify-center gap-1.5 animate-in fade-in py-1 bg-[#f5be38]/10 rounded-lg border border-[#f5be38]/20">
                  <Check className="w-4 h-4" />
                  <span>Configured item saved to your cart &amp; ready for checkout!</span>
                </div>
              )}

              {/* Exception Handling: Subtle "Need a Custom Quote?" Trigger */}
              <div className="pt-2 border-t border-white/10">
                <div className="bg-[#181822]/60 rounded-xl p-3 border border-white/5 flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-bold text-white block">
                      Complex or non-standard print job?
                    </span>
                    <p className="text-[10px] text-stone-400">
                      Custom die-cuts, specialty foil stamping, embossing, or 500+ bulk runs.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenCustomQuote) {
                        onOpenCustomQuote();
                      } else {
                        window.open(`https://wa.me/2347030372539?text=${encodeURIComponent(`Hello Silver & Gold Inkshine Ltd, I need a custom quote for complex/enterprise print specifications for: ${product.name}`)}`, '_blank');
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#f5be38] hover:text-white text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <span>Request Custom Quote</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Technical Specifications & Box Contents */}
        <div className="bg-[#121217] rounded-3xl border border-white/10 overflow-hidden shadow-xl">
          <div className="flex border-b border-white/10 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-4 text-xs font-bold whitespace-nowrap transition-colors border-b-2 cursor-pointer ${
                activeTab === 'overview'
                  ? 'border-[#f5be38] text-[#f5be38] bg-[#f5be38]/10'
                  : 'border-transparent text-stone-400 hover:text-white'
              }`}
            >
              Product Overview &amp; Corporate Uses
            </button>

            <button
              onClick={() => setActiveTab('specs')}
              className={`px-6 py-4 text-xs font-bold whitespace-nowrap transition-colors border-b-2 cursor-pointer ${
                activeTab === 'specs'
                  ? 'border-[#f5be38] text-[#f5be38] bg-[#f5be38]/10'
                  : 'border-transparent text-stone-400 hover:text-white'
              }`}
            >
              Technical Print Specifications
            </button>

            <button
              onClick={() => setActiveTab('box_contents')}
              className={`px-6 py-4 text-xs font-bold whitespace-nowrap transition-colors border-b-2 cursor-pointer ${
                activeTab === 'box_contents'
                  ? 'border-[#f5be38] text-[#f5be38] bg-[#f5be38]/10'
                  : 'border-transparent text-stone-400 hover:text-white'
              }`}
            >
              What&apos;s Included In Package
            </button>

            <button
              onClick={() => setActiveTab('delivery')}
              className={`px-6 py-4 text-xs font-bold whitespace-nowrap transition-colors border-b-2 cursor-pointer ${
                activeTab === 'delivery'
                  ? 'border-[#f5be38] text-[#f5be38] bg-[#f5be38]/10'
                  : 'border-transparent text-stone-400 hover:text-white'
              }`}
            >
              Nationwide Logistics Schedule
            </button>

            <button
              onClick={() => setActiveTab('custom_quote')}
              className={`px-6 py-4 text-xs font-bold whitespace-nowrap transition-colors border-b-2 cursor-pointer ${
                activeTab === 'custom_quote'
                  ? 'border-[#f5be38] text-[#f5be38] bg-[#f5be38]/10'
                  : 'border-transparent text-stone-400 hover:text-white'
              }`}
            >
              Custom Quote
            </button>
          </div>

          <div className="p-6 sm:p-8 text-xs text-stone-300 leading-relaxed">
            {activeTab === 'overview' && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="text-base font-bold text-white">
                  Command Corporate Attention at Exhibitions &amp; Conferences
                </h3>
                <p>
                  Engineered specifically for Nigerian trade exhibitions, bank branch lobbies, VIP annual general meetings, and retail showrooms. Designed to endure tropical transit with zero curling on edges, providing razor-sharp graphical contrast even under harsh tungsten or LED hall lighting.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-[#181822] border border-white/10">
                    <strong className="block text-white mb-1">Corporate AGM &amp; Expos</strong>
                    <span className="text-stone-400">Flawless photography reproduction with zero glare under television cameras.</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#181822] border border-white/10">
                    <strong className="block text-white mb-1">Retail Lobbies &amp; Headquarters</strong>
                    <span className="text-stone-400">Weighted teardrop base sits sturdy with no protruding feet to trip visitors.</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="text-base font-bold text-white">Commercial Substrate Specifications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 font-mono text-xs">
                  <div className="flex justify-between border-b border-white/5 py-2">
                    <span className="text-stone-400">Substrate Weight:</span>
                    <span className="font-bold text-white">380gsm Premium Solite / 440gsm Flex</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 py-2">
                    <span className="text-stone-400">Cassette Material:</span>
                    <span className="font-bold text-white">Anodized Solid Extruded Aluminum</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 py-2">
                    <span className="text-stone-400">Print Resolution:</span>
                    <span className="font-bold text-[#f5be38]">1440 DPI High-Definition Photo Quality</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 py-2">
                    <span className="text-stone-400">Bleed Requirement:</span>
                    <span className="font-bold text-white">{product.artworkRequirements.bleedMarginMm}mm Edge Bleed</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 py-2">
                    <span className="text-stone-400">Color Spectrum:</span>
                    <span className="font-bold text-white">4-Color CMYK Process</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 py-2">
                    <span className="text-stone-400">Cassette Lifespan:</span>
                    <span className="font-bold text-white">Reusable with Replaceable Graphic Inserts</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'box_contents' && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="text-base font-bold text-white">What is Packed in the Transit Box</h3>
                <ul className="space-y-2 list-disc pl-5 text-stone-300">
                  <li><strong className="text-white">1x High-Resolution Printed Graphic:</strong> Pre-installed into the tension cassette with protective film.</li>
                  <li><strong className="text-white">1x Weighted Solid Base Cassette:</strong> Chrome teardrop end-caps and precision retraction spring mechanism.</li>
                  <li><strong className="text-white">1x Heavy-Duty Telescopic / 3-Stage Support Pole:</strong> With secure locking top hook.</li>
                  <li><strong className="text-white">1x Padded Oxford Nylon Travel Bag:</strong> Full zipper with reinforced dual carry handles and shoulder strap.</li>
                  <li><strong className="text-white">1x Quality Control Pass Certificate:</strong> Signed by pre-press pressmaster in Nigeria.</li>
                </ul>
              </div>
            )}

            {activeTab === 'delivery' && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="text-base font-bold text-white">Nationwide Delivery Schedules</h3>
                <p>
                  Orders dispatched directly from our Yenagoa Central Graphic Production Hub. Packaged in custom corrugated cartons to ensure zero denting of aluminum cassettes during road and air transit.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="bg-[#181822] p-3.5 rounded-xl border border-white/10">
                    <strong className="text-white block mb-1">State & Regional Express:</strong>
                    <span className="text-stone-400">Same-day or next-day dispatch via dedicated dispatch riders and vans.</span>
                  </div>
                  <div className="bg-[#181822] p-3.5 rounded-xl border border-white/10">
                    <strong className="text-white block mb-1">Abuja, PH &amp; Interstate:</strong>
                    <span className="text-stone-400">Direct delivery to your address or office location upon completion.</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'custom_quote' && (
              <div className="space-y-4 max-w-3xl">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#f5be38]" />
                  <h3 className="text-base font-bold text-white">Custom Engineering &amp; Bespoke Enterprise Quotes</h3>
                </div>
                <p>
                  Have custom dimensions, special foil stamping (Gold/Silver/Holographic), spot UV lamination, bespoke die-cut shapes, or high-volume corporate runs over 500 units? Our technical pre-press engineers prepare custom quotes within 15 minutes.
                </p>
                <div className="p-4 rounded-2xl bg-[#181822] border border-white/10 space-y-3">
                  <div className="font-bold text-white text-xs">How Custom Quotes Work:</div>
                  <ul className="space-y-1.5 list-disc pl-4 text-stone-300 text-[11px]">
                    <li>Upload your technical architectural drawings, brand guidelines, or custom size requirements.</li>
                    <li>Choose your preferred substrate thickness, metallic foil type, or edge-gilding finishes.</li>
                    <li>Receive an instant itemized invoice with direct press schedule reservation.</li>
                  </ul>
                  <div className="pt-2 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        if (onOpenCustomQuote) {
                          onOpenCustomQuote();
                        } else {
                          window.open(`https://wa.me/2347030372539?text=${encodeURIComponent(`Hello Silver & Gold Inkshine Ltd, I need a custom quote for: ${product.name}`)}`, '_blank');
                        }
                      }}
                      className="px-5 py-2.5 rounded-xl bg-[#f5be38] hover:bg-[#ffd25d] text-black font-extrabold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Open Dedicated Custom Quote Desk</span>
                    </button>
                    <a
                      href={`https://wa.me/2347030372539?text=${encodeURIComponent(`Hello Silver & Gold Inkshine Ltd, I would like to consult directly with your senior press engineer for a custom job on "${product.name}".`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 border border-white/10 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4 text-[#25D366]" />
                      <span>Chat with Press Engineer</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
