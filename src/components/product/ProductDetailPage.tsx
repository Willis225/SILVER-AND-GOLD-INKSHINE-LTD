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
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBackToCatalog,
  onAddToCart,
}) => {
  // Initialize default options
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const defaults: Record<string, string> = {};
    product.optionGroups.forEach((grp) => {
      const def = grp.options.find((o) => o.isDefault) || grp.options[0];
      if (def) defaults[grp.id] = def.id;
    });
    return defaults;
  });

  const [quantity, setQuantity] = useState<number>(product.minQuantity);
  const [submissionMode, setSubmissionMode] = useState<SubmissionMode>('direct_upload');
  const [preflightResult, setPreflightResult] = useState<PreflightResult | null>(null);
  const [designerBrief, setDesignerBrief] = useState<DesignerBrief | undefined>();
  const [selectedDestinationZone, setSelectedDestinationZone] = useState<string>(NIGERIAN_SHIPPING_ZONES[0].id);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'box_contents' | 'delivery'>('overview');
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [addedToast, setAddedToast] = useState(false);

  // Gallery angles
  const galleryImages = [
    product.image,
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80',
  ];

  const designerFeeNgn = submissionMode === 'hire_designer' ? 7500 : 0;
  const pricing = calculateDynamicPrice(product, quantity, selectedOptions);
  const grandTotalWithDesign = pricing.grandTotalNgn + designerFeeNgn;

  const currentZone = NIGERIAN_SHIPPING_ZONES.find((z) => z.id === selectedDestinationZone) || NIGERIAN_SHIPPING_ZONES[0];

  const handleOptionSelect = (groupId: string, optionId: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [groupId]: optionId,
    }));
  };

  const handleQuantityAdjust = (delta: number) => {
    setQuantity((prev) => Math.max(product.minQuantity, prev + delta));
  };

  const handleSetQuickQuantity = (qty: number) => {
    setQuantity(Math.max(product.minQuantity, qty));
  };

  const formatNaira = (amount: number) => {
    return '₦' + Math.round(amount).toLocaleString('en-NG');
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
    <div className="bg-stone-50 min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between">
          <nav className="flex items-center gap-2 text-xs text-stone-500 font-medium">
            <button
              onClick={onBackToCatalog}
              className="hover:text-amber-700 flex items-center gap-1 font-semibold text-stone-700"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Catalog</span>
            </button>
            <span>/</span>
            <span className="text-stone-400">{product.categoryLabel}</span>
            <span>/</span>
            <span className="text-stone-900 font-bold truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </span>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/2347030372539?text=Hello%20Silver%20%26%20Gold%20Inkshine%2C%20I%20am%20inquiring%20about%20${encodeURIComponent(product.name)}`}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors"
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
            <div className="relative aspect-4/3 rounded-3xl overflow-hidden bg-white border border-stone-200 shadow-sm group">
              <img
                src={galleryImages[activeImageIdx]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                <span className="px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-stone-900 text-amber-400 shadow-xs">
                  {product.categoryLabel}
                </span>
                {product.badge && (
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-600 text-white shadow-xs">
                    {product.badge}
                  </span>
                )}
              </div>

              <div className="absolute bottom-3 right-3">
                <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-stone-900/80 text-stone-200 backdrop-blur-xs flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
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
                  className={`aspect-4/3 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImageIdx === idx
                      ? 'border-amber-600 ring-2 ring-amber-600/30 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 opacity-80 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Logistics & Delivery Estimator for Nigeria */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
                  <Truck className="w-4 h-4 text-amber-600" />
                  <span>Check Nigerian Delivery Timeline & Rates</span>
                </div>
                <span className="text-[10px] text-stone-500 font-mono">Central Press Dispatch</span>
              </div>

              <div className="space-y-2">
                <select
                  value={selectedDestinationZone}
                  onChange={(e) => setSelectedDestinationZone(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs font-semibold text-stone-900 focus:ring-2 focus:ring-amber-500"
                >
                  {NIGERIAN_SHIPPING_ZONES.map((zone) => (
                    <option key={zone.id} value={zone.id}>
                      {zone.name} ({zone.region}) — {formatNaira(zone.baseFeeNgn)}
                    </option>
                  ))}
                </select>

                <div className="bg-stone-50 rounded-xl p-3 text-xs flex items-center justify-between text-stone-700">
                  <div>
                    <span className="text-stone-500 block text-[11px]">Estimated Arrival:</span>
                    <strong className="text-stone-900 font-bold">{currentZone.estimatedDays}</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-stone-500 block text-[11px]">Standard Logistics Fee:</span>
                    <strong className="font-mono text-amber-800 font-bold">
                      {formatNaira(currentZone.baseFeeNgn)}
                    </strong>
                  </div>
                </div>

                {currentZone.expressAvailable && (
                  <div className="text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl flex items-center justify-between">
                    <span>⚡ Same-Day Express Logistics available for {currentZone.name}</span>
                    <span className="font-mono font-bold">{formatNaira(currentZone.expressFeeNgn!)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Pre-Press Trust Guarantees */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-3.5 rounded-xl border border-stone-200 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-stone-900">Pre-Press Bleed Guarantee</div>
                  <div className="text-[10px] text-stone-500">Every file is inspected by an expert before press.</div>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-stone-200 flex items-start gap-2.5">
                <Package className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-stone-900">Secure Travel Packaging</div>
                  <div className="text-[10px] text-stone-500">Shipped in padded cartons & protective canvas sleeves.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Dynamic Options, Bulk Matrix, Pricing & Cart */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Header info */}
            <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 space-y-4">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span className="font-mono text-stone-400 font-bold">{product.sku}</span>
                <div className="flex items-center gap-1.5 text-amber-500">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-stone-800 text-[11px]">4.9 (84 reviews)</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight leading-tight">
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {product.description}
              </p>

              {/* Dynamic Option Groups */}
              <div className="space-y-4 pt-2 border-t border-stone-100">
                {product.optionGroups.map((grp) => (
                  <div key={grp.id} className="space-y-2">
                    <label className="text-xs font-bold text-stone-800 flex items-center justify-between">
                      <span>{grp.name}</span>
                      {grp.required && <span className="text-[10px] text-amber-600 font-semibold">Select One</span>}
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {grp.options.map((opt) => {
                        const isSelected = selectedOptions[grp.id] === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => handleOptionSelect(grp.id, opt.id)}
                            className={`p-3 rounded-xl text-left text-xs transition-all border flex flex-col justify-between ${
                              isSelected
                                ? 'bg-amber-50/80 border-amber-600 text-stone-900 ring-2 ring-amber-600/30 shadow-xs'
                                : 'bg-stone-50/60 border-stone-200 text-stone-700 hover:border-stone-300'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold">{opt.name}</span>
                              {isSelected && <Check className="w-4 h-4 text-amber-600 shrink-0 ml-1" />}
                            </div>
                            {opt.priceModifierValue !== 0 && (
                              <span className={`text-[10px] mt-1 font-mono font-semibold ${
                                opt.priceModifierValue > 0 ? 'text-amber-800' : 'text-emerald-700'
                              }`}>
                                {opt.priceModifierValue > 0 ? `+${formatNaira(opt.priceModifierValue)}` : formatNaira(opt.priceModifierValue)}
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
              <div className="pt-3 border-t border-stone-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">Select Order Quantity</span>
                    <span className="text-[10px] text-stone-500">
                      Minimum order: {product.minQuantity} {product.minQuantity === 1 ? 'unit' : 'pack'}
                    </span>
                  </div>

                  <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50 overflow-hidden shadow-2xs">
                    <button
                      type="button"
                      onClick={() => handleQuantityAdjust(-1)}
                      disabled={quantity <= product.minQuantity}
                      className="p-2 text-stone-600 hover:bg-stone-200 disabled:opacity-30"
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
                      className="w-14 text-center font-mono font-black text-sm py-1.5 text-stone-900 focus:outline-hidden"
                    />
                    <button
                      type="button"
                      onClick={() => handleQuantityAdjust(1)}
                      className="p-2 text-stone-600 hover:bg-stone-200"
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
                      className={`text-[11px] px-2.5 py-1 rounded-lg font-mono font-semibold transition-colors ${
                        quantity === stepQty
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {stepQty}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bulk Volume Discount Matrix Table */}
              <div className="pt-2 border-t border-stone-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-800 flex items-center gap-1">
                    <Percent className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Tiered Bulk Volume Discount Matrix</span>
                  </span>
                  <span className="text-[10px] text-stone-500">Live Tier Applied</span>
                </div>

                <div className="border border-stone-200 rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-stone-100 text-stone-600 font-semibold text-[11px]">
                      <tr>
                        <th className="p-2.5">Tier Quantity</th>
                        <th className="p-2.5">Discount %</th>
                        <th className="p-2.5 text-right">Unit Price</th>
                        <th className="p-2.5 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 bg-white">
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
                                ? 'bg-emerald-50/80 font-bold text-emerald-950'
                                : 'text-stone-700'
                            }`}
                          >
                            <td className="p-2.5">{tier.label}</td>
                            <td className="p-2.5 font-mono text-emerald-700">
                              {tier.discountPercentage > 0 ? `${tier.discountPercentage}% OFF` : 'Base Price'}
                            </td>
                            <td className="p-2.5 text-right font-mono">
                              {formatNaira(tierPrice)}
                            </td>
                            <td className="p-2.5 text-right">
                              {isTierActive ? (
                                <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full uppercase">
                                  <Check className="w-2.5 h-2.5" />
                                  Active
                                </span>
                              ) : (
                                <span className="text-[10px] text-stone-400">—</span>
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
            <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-7 shadow-xl space-y-5 border border-stone-800">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Dynamic Order Subtotal
                </span>
                <span className="text-xs text-stone-400 font-mono">
                  {quantity} unit{quantity > 1 ? 's' : ''} configured
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-stone-300">
                  <span>Unit Price Before Discount:</span>
                  <span className="font-mono text-stone-200">
                    {formatNaira(pricing.unitPriceBeforeDiscount)}
                  </span>
                </div>

                {pricing.bulkDiscountPercentage > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Bulk Tier Savings ({pricing.bulkDiscountPercentage}% Off):</span>
                    <span className="font-mono">-{formatNaira(pricing.savingsNgn)}</span>
                  </div>
                )}

                <div className="flex justify-between text-stone-300">
                  <span>Effective Unit Rate:</span>
                  <span className="font-mono font-bold text-white">
                    {formatNaira(pricing.unitPriceAfterDiscount)} / unit
                  </span>
                </div>

                {designerFeeNgn > 0 && (
                  <div className="flex justify-between text-amber-400 font-bold">
                    <span>In-House Pre-Press Creative Desk:</span>
                    <span className="font-mono">+{formatNaira(designerFeeNgn)}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-stone-800 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs uppercase font-bold text-stone-400 block">
                      Total Print Amount:
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono tracking-tight">
                      {formatNaira(grandTotalWithDesign)}
                    </span>
                  </div>

                  <span className="text-[11px] text-stone-400 text-right">
                    Excludes shipping fee<br />(Calculated in Cart)
                  </span>
                </div>
              </div>

              {/* Add to Cart CTA */}
              <button
                id="pdp-add-to-cart-btn"
                type="button"
                onClick={handleAddToCartClick}
                className="w-full py-4 px-6 rounded-2xl bg-amber-600 hover:bg-amber-500 active:scale-98 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-amber-600/30 transition-all"
              >
                <ShoppingBag className="w-5 h-5 text-white" />
                <span>Add to Cart • {formatNaira(grandTotalWithDesign)}</span>
              </button>

              {addedToast && (
                <div className="text-center text-xs text-emerald-400 font-bold flex items-center justify-center gap-1.5 animate-in fade-in">
                  <Check className="w-4 h-4" />
                  <span>Item added to your order cart!</span>
                </div>
              )}

              <div className="text-center pt-1">
                <a
                  href="https://wa.me/2347030372539?text=Hello%20Silver%20%26%20Gold%20Inkshine%2C%20I%20need%20a%20bulk%20corporate%20quote%20for%20100%2B%20units"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-stone-400 hover:text-amber-400 inline-flex items-center gap-1 font-medium transition-colors"
                >
                  <span>Ordering over 50 units? Contact Corporate Procurement Desk</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Technical Specifications & Box Contents */}
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="flex border-b border-stone-200 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-4 text-xs font-bold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === 'overview'
                  ? 'border-amber-600 text-amber-700 bg-amber-50/40'
                  : 'border-transparent text-stone-600 hover:text-stone-900'
              }`}
            >
              Product Overview & Corporate Uses
            </button>

            <button
              onClick={() => setActiveTab('specs')}
              className={`px-6 py-4 text-xs font-bold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === 'specs'
                  ? 'border-amber-600 text-amber-700 bg-amber-50/40'
                  : 'border-transparent text-stone-600 hover:text-stone-900'
              }`}
            >
              Technical Print Specifications
            </button>

            <button
              onClick={() => setActiveTab('box_contents')}
              className={`px-6 py-4 text-xs font-bold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === 'box_contents'
                  ? 'border-amber-600 text-amber-700 bg-amber-50/40'
                  : 'border-transparent text-stone-600 hover:text-stone-900'
              }`}
            >
              What&apos;s Included In Package
            </button>

            <button
              onClick={() => setActiveTab('delivery')}
              className={`px-6 py-4 text-xs font-bold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === 'delivery'
                  ? 'border-amber-600 text-amber-700 bg-amber-50/40'
                  : 'border-transparent text-stone-600 hover:text-stone-900'
              }`}
            >
              Nationwide Logistics Schedule
            </button>
          </div>

          <div className="p-6 sm:p-8 text-xs text-stone-700 leading-relaxed">
            {activeTab === 'overview' && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="text-base font-bold text-stone-900">
                  Command Corporate Attention at Exhibitions & Conferences
                </h3>
                <p>
                  Engineered specifically for Nigerian trade exhibitions, bank branch lobbies, VIP annual general meetings, and retail showrooms. Designed to endure tropical transit with zero curling on edges, providing razor-sharp graphical contrast even under harsh tungsten or LED hall lighting.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                    <strong className="block text-stone-900 mb-1">Corporate AGM & Expos</strong>
                    <span>Flawless photography reproduction with zero glare under television cameras.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                    <strong className="block text-stone-900 mb-1">Retail Lobbies & Headquarters</strong>
                    <span>Weighted teardrop base sits sturdy with no protruding feet to trip visitors.</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="text-base font-bold text-stone-900">Commercial Substrate Specifications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 font-mono text-xs">
                  <div className="flex justify-between border-b border-stone-100 py-1.5">
                    <span className="text-stone-500">Substrate Weight:</span>
                    <span className="font-bold text-stone-900">380gsm Premium Solite / 440gsm Flex</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-100 py-1.5">
                    <span className="text-stone-500">Cassette Material:</span>
                    <span className="font-bold text-stone-900">Anodized Solid Extruded Aluminum</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-100 py-1.5">
                    <span className="text-stone-500">Print Resolution:</span>
                    <span className="font-bold text-emerald-700">1440 DPI High-Definition Photo Quality</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-100 py-1.5">
                    <span className="text-stone-500">Bleed Requirement:</span>
                    <span className="font-bold text-stone-900">{product.artworkRequirements.bleedMarginMm}mm Edge Bleed</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-100 py-1.5">
                    <span className="text-stone-500">Color Spectrum:</span>
                    <span className="font-bold text-stone-900">4-Color CMYK Process</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-100 py-1.5">
                    <span className="text-stone-500">Cassette Lifespan:</span>
                    <span className="font-bold text-stone-900">Reusable with Replaceable Graphic Inserts</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'box_contents' && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="text-base font-bold text-stone-900">What is Packed in the Transit Box</h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li><strong>1x High-Resolution Printed Graphic:</strong> Pre-installed into the tension cassette with protective film.</li>
                  <li><strong>1x Weighted Solid Base Cassette:</strong> Chrome teardrop end-caps and precision retraction spring mechanism.</li>
                  <li><strong>1x Heavy-Duty Telescopic / 3-Stage Support Pole:</strong> With secure locking top hook.</li>
                  <li><strong>1x Padded Oxford Nylon Travel Bag:</strong> Full zipper with reinforced dual carry handles and shoulder strap.</li>
                  <li><strong>1x Quality Control Pass Certificate:</strong> Signed by pre-press pressmaster in Lagos.</li>
                </ul>
              </div>
            )}

            {activeTab === 'delivery' && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="text-base font-bold text-stone-900">Nationwide Delivery Schedules</h3>
                <p>
                  Orders dispatched directly from our Somolu & Ikeja Graphic Production Hub. Packaged in custom corrugated cartons to ensure zero denting of aluminum cassettes during road and air transit.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                    <strong className="text-stone-900 block mb-1">Lagos State Express:</strong>
                    <span>Same-day or next-day dispatch via dedicated dispatch riders and vans.</span>
                  </div>
                  <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                    <strong className="text-stone-900 block mb-1">Abuja, PH & Interstate:</strong>
                    <span>2–3 business days via GIG Logistics, Air Express, and hub freight.</span>
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
