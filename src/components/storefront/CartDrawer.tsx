import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  MapPin, 
  FileText,
  CreditCard,
  Plus,
  Minus
} from 'lucide-react';
import { Product, calculateDynamicPrice } from '../../types/schema';
import { NIGERIAN_SHIPPING_ZONES } from '../../data/seedData';

export interface CartItem {
  id: string;
  product: Product;
  selectedOptions: Record<string, string>;
  quantity: number;
  artworkType: 'direct_upload' | 'hire_designer' | 'send_later';
  uploadedFileName?: string;
  unitPriceNgn: number;
  totalPriceNgn: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onCheckout: (shippingZoneId: string, isExpress: boolean) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout,
}) => {
  const [selectedZoneId, setSelectedZoneId] = useState<string>(NIGERIAN_SHIPPING_ZONES[0].id);
  const [isExpress, setIsExpress] = useState<boolean>(false);
  const [checkoutCompleteNotice, setCheckoutCompleteNotice] = useState(false);

  if (!isOpen) return null;

  const currentZone = NIGERIAN_SHIPPING_ZONES.find((z) => z.id === selectedZoneId) || NIGERIAN_SHIPPING_ZONES[0];
  const itemsSubtotalNgn = items.reduce((acc, curr) => acc + curr.totalPriceNgn, 0);
  const shippingFeeNgn = isExpress && currentZone.expressAvailable && currentZone.expressFeeNgn
    ? currentZone.expressFeeNgn
    : currentZone.baseFeeNgn;
  const grandTotalNgn = itemsSubtotalNgn + (items.length > 0 ? shippingFeeNgn : 0);

  const formatNaira = (amount: number) => {
    return '₦' + Math.round(amount).toLocaleString('en-NG');
  };

  const handleTriggerCheckout = () => {
    onCheckout(selectedZoneId, isExpress);
    setCheckoutCompleteNotice(true);
    setTimeout(() => {
      setCheckoutCompleteNotice(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-lg h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-900">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-stone-900">Printing Order Cart</h3>
              <p className="text-xs text-stone-500">{items.length} item{items.length !== 1 ? 's' : ''} in cart</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-300 mx-auto flex items-center justify-center">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-stone-800">Your cart is empty</h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Explore our catalog for luxury roll-up banners, paper bags, corporate polos, and stationery.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold"
              >
                Start Browsing
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-14 h-14 object-cover rounded-xl border border-stone-200 shrink-0"
                      />
                      <div>
                        <h5 className="font-bold text-stone-900 text-xs sm:text-sm leading-snug">
                          {item.product.name}
                        </h5>
                        <div className="text-[10px] text-stone-500 mt-1 space-y-0.5">
                          {Object.entries(item.selectedOptions).map(([groupId, optId]) => {
                            const grp = item.product.optionGroups.find((g) => g.id === groupId);
                            const opt = grp?.options.find((o) => o.id === optId);
                            return (
                              <div key={groupId}>
                                <span className="text-stone-400">{grp?.name}:</span> {opt?.name}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-stone-400 hover:text-red-600 p-1 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Artwork status pill */}
                  <div className="bg-white border border-stone-200 rounded-lg p-2 text-[11px] flex items-center justify-between">
                    <span className="text-stone-500 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-amber-600" />
                      Artwork:
                    </span>
                    <span className="font-medium text-stone-800">
                      {item.artworkType === 'direct_upload' && (item.uploadedFileName || 'Uploaded Design File')}
                      {item.artworkType === 'hire_designer' && 'Design Service (+₦7,500)'}
                      {item.artworkType === 'send_later' && 'Send file via WhatsApp / Email'}
                    </span>
                  </div>

                  {/* Quantity & Unit Pricing */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center border border-stone-300 rounded-lg bg-white overflow-hidden">
                      <button
                        onClick={() => onUpdateQuantity(item.id, Math.max(item.product.minQuantity, item.quantity - 1))}
                        disabled={item.quantity <= item.product.minQuantity}
                        className="p-1.5 text-stone-600 hover:bg-stone-100 disabled:opacity-40"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-mono font-bold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 text-stone-600 hover:bg-stone-100"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-black text-stone-900 font-mono">
                        {formatNaira(item.totalPriceNgn)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Nigerian Delivery Destination Selector */}
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                    <Truck className="w-4 h-4 text-amber-700" />
                    <span>Nationwide Delivery Destination</span>
                  </div>
                  <span className="text-[10px] text-amber-800 font-mono">Nigeria Logistics</span>
                </div>

                <select
                  value={selectedZoneId}
                  onChange={(e) => setSelectedZoneId(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl p-2 text-xs font-medium text-stone-900 focus:ring-2 focus:ring-amber-500"
                >
                  {NIGERIAN_SHIPPING_ZONES.map((zone) => (
                    <option key={zone.id} value={zone.id}>
                      {zone.name} ({zone.estimatedDays}) — {formatNaira(zone.baseFeeNgn)}
                    </option>
                  ))}
                </select>

                {/* Express Dispatch Toggle if available */}
                {currentZone.expressAvailable && (
                  <label className="flex items-center justify-between text-xs text-stone-700 bg-white p-2.5 rounded-xl border border-stone-200 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isExpress}
                        onChange={(e) => setIsExpress(e.target.checked)}
                        className="rounded text-amber-600 focus:ring-amber-500 h-4 w-4"
                      />
                      <span>Urgent Express Dispatch</span>
                    </div>
                    <span className="font-bold text-amber-800 font-mono">
                      +{formatNaira(currentZone.expressFeeNgn! - currentZone.baseFeeNgn)}
                    </span>
                  </label>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer Checkout Summary */}
        {items.length > 0 && (
          <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Items Subtotal:</span>
                <span className="font-mono font-medium">{formatNaira(itemsSubtotalNgn)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Shipping ({currentZone.name}):</span>
                <span className="font-mono font-medium">{formatNaira(shippingFeeNgn)}</span>
              </div>
              <div className="flex justify-between text-stone-900 font-bold text-sm pt-2 border-t border-stone-200">
                <span>Grand Total:</span>
                <span className="text-base font-black font-mono text-amber-700">
                  {formatNaira(grandTotalNgn)}
                </span>
              </div>
            </div>

            <button
              onClick={handleTriggerCheckout}
              disabled={checkoutCompleteNotice}
              className="w-full py-3.5 px-4 rounded-2xl bg-amber-600 hover:bg-amber-500 active:scale-98 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-600/25 transition-all"
            >
              {checkoutCompleteNotice ? (
                <span>Redirecting to Paystack / Flutterwave...</span>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  <span>Proceed to Payment • {formatNaira(grandTotalNgn)}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-stone-400 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Secured by Paystack & Flutterwave • Lagos Somolu Production</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
