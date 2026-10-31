import React, { useState, useId } from 'react';
import { 
  X, 
  Check, 
  Clock, 
  UploadCloud, 
  ShieldCheck, 
  FileCheck2, 
  Sparkles, 
  ShoppingBag, 
  AlertCircle,
  Percent,
  Plus,
  Minus,
  MessageSquare
} from 'lucide-react';
import { Product, calculateDynamicPrice } from '../../types/schema';
import { PriceOnRequestBadge } from '../common/PriceOnRequestBadge';

interface ProductQuickViewModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (item: {
    product: Product;
    selectedOptions: Record<string, string>;
    quantity: number;
    artworkType: 'direct_upload' | 'hire_designer' | 'send_later';
    uploadedFileName?: string;
  }) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  // Initialize default options
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const defaults: Record<string, string> = {};
    product.optionGroups.forEach((grp) => {
      const def = grp.options.find((o) => o.isDefault) || grp.options[0];
      if (def) {
        defaults[grp.id] = def.id;
      }
    });
    return defaults;
  });

  const [quantity, setQuantity] = useState<number>(product.minQuantity);
  const [artworkType, setArtworkType] = useState<'direct_upload' | 'hire_designer' | 'send_later'>('direct_upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [bleedConfirmed, setBleedConfirmed] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);
  const uploadInputId = useId();

  // Dynamic pricing calculation
  const pricing = calculateDynamicPrice(product, quantity, selectedOptions);

  const handleOptionChange = (groupId: string, optionId: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [groupId]: optionId,
    }));
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(product.minQuantity, prev + delta));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleAdd = () => {
    onAddToCart({
      product,
      selectedOptions,
      quantity,
      artworkType,
      uploadedFileName: uploadedFile ? uploadedFile.name : undefined,
    });
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      onClose();
    }, 900);
  };

  const formatNaira = (amount: number) => {
    return '₦' + Math.round(amount).toLocaleString('en-NG');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-2 xs:p-3 sm:p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl sm:rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col md:flex-row max-h-[94vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Left Column: Product Visual & Print Specs Guide */}
        <div className="md:w-5/12 bg-stone-50 border-b md:border-b-0 md:border-r border-stone-200 p-4 sm:p-6 flex flex-col justify-between overflow-y-auto shrink-0 md:shrink">
          <div className="space-y-4">
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-stone-200 shadow-xs">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2.5 left-2.5">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase bg-stone-900 text-amber-400">
                  {product.categoryLabel}
                </span>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-mono text-stone-400">{product.sku}</span>
              <h3 className="text-lg font-extrabold text-stone-900 leading-tight">
                {product.name}
              </h3>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Turnaround & Pre-Press Badge */}
            <div className="bg-white rounded-xl p-3 border border-stone-200 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-stone-500 font-medium">Standard Production:</span>
                <span className="font-bold text-stone-900 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  {product.turnaroundDays} Business Days
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500 font-medium">Resolution Required:</span>
                <span className="font-bold text-[#b8860b]">
                  {product.artworkRequirements.recommendedDpi} DPI (CMYK)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500 font-medium">Supported Formats:</span>
                <span className="font-mono text-[10px] text-stone-700 bg-stone-100 px-1.5 py-0.5 rounded">
                  {product.artworkRequirements.supportedFormats.join(', ')}
                </span>
              </div>
            </div>
          </div>

          {/* Volume Tiers Notice */}
          <div className="mt-4 pt-4 border-t border-stone-200">
            <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block mb-2">
              Bulk Volume Discounts
            </span>
            <div className="space-y-1">
              {product.bulkPricingTiers.map((tier, idx) => {
                const isActive = 
                  quantity >= tier.minQuantity && 
                  (tier.maxQuantity === null || quantity <= tier.maxQuantity);
                return (
                  <div
                    key={idx}
                    className={`text-xs px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                      isActive
                        ? 'bg-[#b8860b] text-white font-bold shadow-xs'
                        : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    <span>{tier.label}</span>
                    <span>{tier.discountPercentage}% Discount</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Customization Engine & Cart Add */}
        <div className="md:w-7/12 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
          <div className="space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                  Custom Print Configurator
                </span>
                <h4 className="text-xl font-black text-stone-900">
                  Configure Specs & Artwork
                </h4>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Dynamic Option Groups */}
            <div className="space-y-4">
              {product.optionGroups.map((grp) => (
                <div key={grp.id} className="space-y-2">
                  <label className="text-xs font-bold text-stone-800 flex items-center justify-between">
                    <span>{grp.name}</span>
                    {grp.required && <span className="text-[10px] text-amber-600 font-medium">Required</span>}
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {grp.options.map((opt) => {
                      const isSelected = selectedOptions[grp.id] === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleOptionChange(grp.id, opt.id)}
                          className={`p-2.5 rounded-xl text-left text-xs transition-all border flex flex-col justify-between ${
                            isSelected
                              ? 'bg-amber-50/70 border-amber-600 text-stone-900 shadow-xs ring-1 ring-amber-600'
                              : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold">{opt.name}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-amber-600 shrink-0 ml-1" />}
                          </div>
                          {opt.priceModifierValue !== 0 && (
                            <span className={`text-[10px] mt-1 font-mono ${
                              opt.priceModifierValue > 0 ? 'text-amber-800' : 'text-[#b8860b]'
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

            {/* Quantity Selector */}
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-stone-900 block">Print Quantity</span>
                  <span className="text-[11px] text-stone-500">
                    Minimum order: {product.minQuantity}
                  </span>
                </div>

                <div className="flex items-center border border-stone-300 rounded-xl bg-white overflow-hidden shadow-2xs">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= product.minQuantity}
                    className="p-2 text-stone-600 hover:bg-stone-100 disabled:opacity-40 disabled:hover:bg-white"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      if (!isNaN(val)) {
                        setQuantity(Math.max(product.minQuantity, val));
                      }
                    }}
                    className="w-14 text-center font-mono font-bold text-xs py-1 text-stone-900 focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 text-stone-600 hover:bg-stone-100"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Artwork Submission Type */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-800 block">
                Artwork & Design Submission
              </span>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setArtworkType('direct_upload')}
                  className={`p-2 rounded-xl text-center text-xs font-semibold border transition-all ${
                    artworkType === 'direct_upload'
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  Upload File
                </button>
                <button
                  type="button"
                  onClick={() => setArtworkType('hire_designer')}
                  className={`p-2 rounded-xl text-center text-xs font-semibold border transition-all ${
                    artworkType === 'hire_designer'
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  Hire Designer (Pre-Press Desk)
                </button>
                <button
                  type="button"
                  onClick={() => setArtworkType('send_later')}
                  className={`p-2 rounded-xl text-center text-xs font-semibold border transition-all ${
                    artworkType === 'send_later'
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  Send via WhatsApp
                </button>
              </div>

              {/* Direct File Dropzone */}
              {artworkType === 'direct_upload' && (
                <div className="border-2 border-dashed border-stone-300 rounded-2xl p-4 text-center hover:border-amber-500 transition-colors bg-stone-50/50">
                  <input
                    type="file"
                    id={uploadInputId}
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.ai,.cdr,.psd,.png,.jpg"
                  />
                  <label htmlFor={uploadInputId} className="cursor-pointer block space-y-1">
                    <UploadCloud className="w-6 h-6 text-stone-400 mx-auto" />
                    <div className="text-xs font-bold text-stone-800">
                      {uploadedFile ? uploadedFile.name : 'Click to select or drag & drop artwork'}
                    </div>
                    <p className="text-[10px] text-stone-400">
                      Accepts PDF, AI, CDR, PSD (Max 50MB, 300 DPI)
                    </p>
                  </label>
                </div>
              )}

              {/* Hire Designer Notice */}
              {artworkType === 'hire_designer' && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Pre-Press Creative Desk:</strong> Our graphic team in Yenagoa will contact you via WhatsApp / email within 2 hours to gather your corporate logos and copy.
                  </div>
                </div>
              )}

              {/* Send Later Notice */}
              {artworkType === 'send_later' && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Quote Request First:</strong> You can forward large print files to <code>inkshineltd@gmail.com</code> or WhatsApp after submitting your quote request.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Pricing & Add to Cart Action */}
          <div className="pt-4 border-t border-stone-200 space-y-3">
            <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-amber-800 uppercase tracking-wider block font-bold">
                  Live Pricing Status
                </span>
                <PriceOnRequestBadge theme="light" size="sm" />
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                Configured with real-time specs ({quantity} units, {artworkType === 'direct_upload' ? 'Upload Ready' : artworkType === 'hire_designer' ? 'Hire Designer' : 'Send Later'}). Live confirmation within minutes.
              </p>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={handleAdd}
                disabled={addedNotice}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 active:scale-98 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-600/20 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4.5 h-4.5 text-white" />
                <span>{addedNotice ? 'Added to Cart & Booking Desk!' : 'Add to Cart & Proceed to Checkout'}</span>
              </button>

              <a
                href={`https://wa.me/2347030372539?text=${encodeURIComponent(`Hello Silver & Gold Inkshine Ltd, I would like to request an instant price quote for: "${product.name}" (Configured Quantity: ${quantity} units, Specs: ${Object.entries(selectedOptions).map(([k, v]) => `${k}: ${v}`).join(', ')}).`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Instant Quote on WhatsApp</span>
              </a>
            </div>

            {/* Subtle Custom Quote Link for non-standard jobs */}
            <div className="text-center pt-1">
              <a
                href={`https://wa.me/2347030372539?text=${encodeURIComponent(`Hello Silver & Gold Inkshine Ltd, I have complex custom specifications (die-cut, specialty foil, or bulk enterprise run) for: ${product.name}`)}`}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-stone-500 hover:text-amber-700 font-medium inline-flex items-center gap-1 transition-colors"
              >
                <span>Need custom die-cuts, specialty foil or 500+ bulk units? Request Custom Quote</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
