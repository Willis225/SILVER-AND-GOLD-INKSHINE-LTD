import React, { useState } from 'react';
import { MessageCircle, Phone, CheckCircle2, ShieldCheck, Truck, X, Sparkles, Copy, Check } from 'lucide-react';
import { Product } from '../../types/schema';
import { PriceOnRequestBadge } from '../common/PriceOnRequestBadge';

interface ConfirmPriceModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onOrderOnline?: (product: Product) => void;
}

export const ConfirmPriceModal: React.FC<ConfirmPriceModalProps> = ({
  product,
  isOpen,
  onClose,
  onOrderOnline,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [deliveryLocation, setDeliveryLocation] = useState<string>('Nigeria');
  const [copied, setCopied] = useState(false);

  if (!isOpen || !product) return null;

  const whatsappMessage = `Hello Silver & Gold Inkshine Ltd, I would like to request an instant price quote and place an order for:
*${product.name}*
SKU: ${product.sku || 'INK-NG'}
Quantity: ${quantity} unit(s)
Delivery Destination: ${deliveryLocation}

Please confirm current price quote, production turnaround and artwork preflight check. Thank you!`;

  const whatsappUrl = `https://wa.me/2347030372539?text=${encodeURIComponent(whatsappMessage)}`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(whatsappMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#14141c] text-white rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#101017]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f5be38] animate-pulse" />
            <h3 className="text-base font-bold text-white">Confirm Price &amp; Order Details</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Product Mini Preview */}
          <div className="flex gap-4 p-3 bg-[#181824] rounded-xl border border-white/10">
            <div className="w-20 h-20 rounded-lg overflow-hidden bg-black/40 border border-white/10 shrink-0">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-white leading-snug line-clamp-2">
                {product.name}
              </h4>
              <p className="text-xs text-stone-400 mt-0.5">{product.categoryLabel || 'Commercial Print'}</p>
              <div className="mt-1.5">
                <PriceOnRequestBadge theme="dark" size="sm" />
              </div>
            </div>
          </div>

          {/* Quantity & Location Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1.5">
                Required Quantity
              </label>
              <div className="flex items-center border border-white/15 rounded-lg overflow-hidden bg-[#181824]">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-colors cursor-pointer"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full text-center py-2 text-sm font-bold text-white bg-transparent focus:outline-hidden"
                />
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1.5">
                Delivery Destination
              </label>
              <select
                value={deliveryLocation}
                onChange={(e) => setDeliveryLocation(e.target.value)}
                className="w-full py-2 px-3 border border-white/15 rounded-lg text-xs font-semibold text-white bg-[#181824] focus:outline-hidden focus:border-[#f5be38]"
              >
                <option value="Nigeria (Doorstep)">Nigeria (Doorstep Delivery)</option>
                <option value="Abuja FCT (Doorstep / Express)">Abuja FCT</option>
                <option value="Port Harcourt, Rivers State">Port Harcourt</option>
                <option value="Bayelsa State (Yenagoa Office)">Bayelsa (Yenagoa Office)</option>
                <option value="Ibadan, Oyo State">Ibadan</option>
                <option value="Kano / Kaduna / North">Kano / Kaduna</option>
                <option value="Enugu / Onitsha / East">Enugu / Onitsha</option>
                <option value="Other Nationwide States">Other Nigerian State</option>
              </select>
            </div>
          </div>

          {/* Total Cost Estimate Box */}
          <div className="p-3.5 bg-[#f5be38]/10 rounded-xl border border-[#f5be38]/30 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#f5be38] block">Price Quote ({quantity} unit{quantity > 1 ? 's' : ''})</span>
              <span className="text-[11px] text-stone-300">Instant direct quote confirmation via WhatsApp</span>
            </div>
            <div className="text-base font-black text-[#f5be38]">
              Price on Request
            </div>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-300">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#f5be38] shrink-0" />
              <span>Free Pre-press File Check</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#f5be38] shrink-0" />
              <span>Direct Delivery to Your Location</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#f5be38] shrink-0" />
              <span>RC 1892044 Certified Press</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#f5be38] shrink-0" />
              <span>Express Turnaround Available</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-2">
            {/* Direct WhatsApp Confirm */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#f5be38] hover:bg-[#ffd15c] text-black font-black text-sm shadow-lg shadow-[#f5be38]/20 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-black stroke-none" />
              <span>Confirm Price on WhatsApp (07030372539)</span>
            </a>

            <div className="grid grid-cols-2 gap-2">
              {/* Call Direct */}
              <a
                href="tel:+2347030372539"
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-white/20 hover:bg-white/10 text-white font-bold text-xs transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#f5be38]" />
                <span>Call Desk Directly</span>
              </a>

              {/* Copy Inquiry Message */}
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-white/20 hover:bg-white/10 text-white font-bold text-xs transition-colors cursor-pointer"
                title="Copy inquiry message"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-stone-400" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
