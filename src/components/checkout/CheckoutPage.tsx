import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Check, 
  ShieldCheck, 
  Truck, 
  Building2, 
  Clock, 
  FileText, 
  CheckCircle2, 
  Printer, 
  MessageSquare, 
  Copy, 
  AlertCircle, 
  Tag, 
  ChevronRight,
  PackageCheck,
  ExternalLink
} from 'lucide-react';
import { CartItem } from '../storefront/CartDrawer';
import { NIGERIAN_SHIPPING_ZONES } from '../../data/seedData';
import { CustomerDetails, Order } from '../../types/schema';
import { CompanyLogoMark } from '../common/CompanyLogo';

interface CheckoutPageProps {
  cartItems: CartItem[];
  onBackToCart: () => void;
  onClearCart: () => void;
  onReturnToHome: () => void;
  onOrderPlaced?: (order: Order) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  cartItems,
  onBackToCart,
  onClearCart,
  onReturnToHome,
  onOrderPlaced,
}) => {
  // Step state: 1: Contact & Delivery Preference, 2: Review & Send to WhatsApp, 3: Order Submitted to WhatsApp
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Customer Form State
  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    deliveryAddress: '',
    landmark: '',
    city: 'Lagos',
    state: 'Lagos State',
  });

  // Wants location delivery toggle
  const [wantsLocationDelivery, setWantsLocationDelivery] = useState<boolean>(true);
  const [shippingZoneId, setShippingZoneId] = useState<string>(NIGERIAN_SHIPPING_ZONES[0].id);
  const [isExpress, setIsExpress] = useState<boolean>(false);

  // Coupon code
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscountPercent, setAppliedDiscountPercent] = useState<number>(0);
  const [couponError, setCouponError] = useState<string | null>(null);

  // Confirmed order state
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const selectedZone = NIGERIAN_SHIPPING_ZONES.find((z) => z.id === shippingZoneId) || NIGERIAN_SHIPPING_ZONES[0];
  const deliveryFeeNgn = wantsLocationDelivery 
    ? (isExpress && selectedZone.expressAvailable && selectedZone.expressFeeNgn ? selectedZone.expressFeeNgn : selectedZone.baseFeeNgn)
    : 0;

  const itemsSubtotalNgn = cartItems.reduce((acc, curr) => acc + curr.totalPriceNgn, 0);
  const discountNgn = Math.round(itemsSubtotalNgn * (appliedDiscountPercent / 100));
  const subtotalAfterDiscount = itemsSubtotalNgn - discountNgn;
  const vatNgn = Math.round(subtotalAfterDiscount * 0.075); // 7.5% Nigerian statutory VAT
  const grandTotalNgn = subtotalAfterDiscount + deliveryFeeNgn + vatNgn;

  const formatNaira = (amount: number) => {
    return '₦' + Math.round(amount).toLocaleString('en-NG');
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    if (clean === 'LAGOSPRINT10' || clean === 'ROLLUP10') {
      setAppliedDiscountPercent(10);
      setCouponError(null);
    } else if (clean === 'ENTERPRISE15') {
      setAppliedDiscountPercent(15);
      setCouponError(null);
    } else {
      setCouponError('Invalid promo code. Try "LAGOSPRINT10" for 10% off.');
    }
  };

  const handleCustomerChange = (field: keyof CustomerDetails, val: string) => {
    setCustomer((prev) => ({ ...prev, [field]: val }));
  };

  // Build the complete WhatsApp message text
  const generateWhatsAppMessage = (orderNum: string): string => {
    const itemsText = cartItems.map((item, idx) => {
      const opts = Object.entries(item.selectedOptions)
        .map(([g, o]) => `${g}: ${o}`)
        .join(', ');
      return `${idx + 1}. *${item.product.name}*\n   - Qty: ${item.quantity}\n   - Rate: ${formatNaira(item.unitPriceNgn)}\n   - Total: ${formatNaira(item.totalPriceNgn)}\n   - Artwork: ${item.artworkType}${item.uploadedFileName ? ` (${item.uploadedFileName})` : ''}${opts ? `\n   - Specs: ${opts}` : ''}`;
    }).join('\n\n');

    const deliveryText = wantsLocationDelivery
      ? `*Deliver to my location:*\n${customer.deliveryAddress || 'Address to be confirmed'}${customer.landmark ? ` (Landmark: ${customer.landmark})` : ''}, ${customer.city}, ${customer.state}\n- Delivery Fee: ${formatNaira(deliveryFeeNgn)}`
      : `*Direct Collection:*\nCustomer will collect directly from Silver & Gold Inkshine Ltd press office.`;

    return `*SILVER & GOLD INKSHINE LTD — NEW ORDER SUBMISSION*\n` +
      `--------------------------------------------------\n` +
      `*Order Ref:* ${orderNum}\n` +
      `*Client Name:* ${customer.fullName || 'Valued Client'}\n` +
      `*Phone/WhatsApp:* ${customer.phone || 'Direct WhatsApp'}\n` +
      `${customer.companyName ? `*Company:* ${customer.companyName}\n` : ''}` +
      `${customer.email ? `*Email:* ${customer.email}\n` : ''}` +
      `--------------------------------------------------\n` +
      `*ORDERED ITEMS:*\n\n${itemsText}\n\n` +
      `--------------------------------------------------\n` +
      `*DELIVERY PREFERENCE:*\n${deliveryText}\n\n` +
      `*FINANCIAL SUMMARY:*\n` +
      `- Items Subtotal: ${formatNaira(itemsSubtotalNgn)}\n` +
      `${discountNgn > 0 ? `- Discount: -${formatNaira(discountNgn)}\n` : ''}` +
      `- Location Delivery: ${formatNaira(deliveryFeeNgn)}\n` +
      `- Statutory VAT (7.5%): ${formatNaira(vatNgn)}\n` +
      `*TOTAL DUE: ${formatNaira(grandTotalNgn)}*\n` +
      `--------------------------------------------------\n` +
      `*PAYMENT REQUEST:*\n` +
      `Hello Silver & Gold Inkshine Ltd, I have submitted my order details above. Please review my specifications and send me your official company bank account number so I can make payment on WhatsApp. Thank you!`;
  };

  const handleSendToWhatsApp = () => {
    const orderNum = 'SG-ORD-' + Math.floor(100000 + Math.random() * 900000);
    const message = generateWhatsAppMessage(orderNum);
    const whatsappUrl = `https://wa.me/2347030372539?text=${encodeURIComponent(message)}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      createdAt: new Date().toISOString(),
      customer,
      items: cartItems.map((item, idx) => ({
        id: `item-${idx}-${Date.now()}`,
        productId: item.product.id,
        productName: item.product.name,
        productImage: item.product.image,
        quantity: item.quantity,
        unitPriceNgn: item.unitPriceNgn,
        totalPriceNgn: item.totalPriceNgn,
        selectedOptions: Object.entries(item.selectedOptions).map(([groupName, optionName]) => ({
          groupName,
          optionName,
          modifierValue: 0
        })),
        artwork: {
          id: `art-${Date.now()}`,
          type: item.artworkType === 'hire_designer' ? 'hire_designer' : 'direct_upload',
          fileName: item.uploadedFileName,
          uploadedAt: new Date().toISOString()
        },
        turnaroundEstimate: `${item.product.turnaroundDays} business days`
      })),
      subtotalNgn: itemsSubtotalNgn,
      shippingFeeNgn: deliveryFeeNgn,
      discountNgn,
      grandTotalNgn,
      paymentGateway: 'bank_transfer',
      paymentStatus: 'pending',
      paymentReference: 'WHATSAPP_PENDING_' + orderNum,
      orderStatus: 'artwork_review',
      shippingZoneId,
      trackingNumber: 'TRK-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
    };

    setConfirmedOrder(newOrder);
    onOrderPlaced?.(newOrder);
    setCurrentStep(3);
    onClearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Open WhatsApp directly in new window
    window.open(whatsappUrl, '_blank');
  };

  const copyOrderRef = () => {
    if (confirmedOrder) {
      navigator.clipboard.writeText(confirmedOrder.orderNumber);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  const copySummaryText = () => {
    if (confirmedOrder) {
      const msg = generateWhatsAppMessage(confirmedOrder.orderNumber);
      navigator.clipboard.writeText(msg);
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2000);
    }
  };

  // STEP 3: ORDER SUBMITTED TO WHATSAPP DESK
  if (currentStep === 3 && confirmedOrder) {
    const whatsappUrl = `https://wa.me/2347030372539?text=${encodeURIComponent(generateWhatsAppMessage(confirmedOrder.orderNumber))}`;

    return (
      <div className="bg-[#070709] min-h-screen py-10 sm:py-16 text-stone-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header Card */}
          <div className="bg-[#121217] rounded-3xl border border-white/20 p-6 sm:p-8 space-y-5 text-center shadow-2xl relative overflow-hidden">
            <div className="w-16 h-16 rounded-full bg-white text-black mx-auto flex items-center justify-center shadow-lg">
              <MessageSquare className="w-8 h-8 fill-black" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider">
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Order Forwarded to WhatsApp Desk</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Order Request Submitted to Silver &amp; Gold Inkshine Ltd
              </h1>
              <p className="text-stone-300 text-sm max-w-xl mx-auto leading-relaxed">
                Thank you, <strong className="text-white">{confirmedOrder.customer.fullName || 'Valued Customer'}</strong>! We have opened WhatsApp with your full order specifications. Our team will verify your details and send our official company account number directly on WhatsApp to make payment.
              </p>
            </div>

            {/* Order Reference Badge */}
            <div className="inline-flex items-center gap-3 bg-[#181822] px-4 py-2.5 rounded-2xl border border-white/20 text-xs sm:text-sm">
              <span className="text-stone-400 font-medium">Order Reference:</span>
              <span className="font-mono font-black text-white text-base tracking-wider">
                {confirmedOrder.orderNumber}
              </span>
              <button
                onClick={copyOrderRef}
                className="p-1 text-stone-300 hover:text-white transition-colors cursor-pointer"
                title="Copy Reference"
              >
                {copiedRef ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Direct WhatsApp Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-stone-200 text-black font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageSquare className="w-4.5 h-4.5 text-black" />
                <span>Open WhatsApp Chat (+234 703 037 2539)</span>
                <ExternalLink className="w-3.5 h-3.5 text-black" />
              </a>

              <button
                type="button"
                onClick={copySummaryText}
                className="w-full sm:w-auto px-5 py-3.5 rounded-full bg-[#181822] hover:bg-[#222230] text-white font-bold text-xs sm:text-sm border border-white/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Copy className="w-4 h-4 text-white" />
                <span>{copiedSummary ? 'Order Summary Copied!' : 'Copy Summary to Clipboard'}</span>
              </button>
            </div>
          </div>

          {/* Next Steps Guide */}
          <div className="bg-[#121217] rounded-3xl border border-white/15 p-6 sm:p-7 space-y-4">
            <h2 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <Clock className="w-4 h-4 text-white" />
              <span>How Payment &amp; Production Works:</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
                <div className="w-7 h-7 rounded-full bg-white text-black font-black flex items-center justify-center text-xs">
                  1
                </div>
                <div className="font-bold text-white text-sm">Direct Contact on WhatsApp</div>
                <p className="text-stone-300 leading-relaxed">
                  Send your order message on WhatsApp. Our customer service desk at Silver &amp; Gold Inkshine Ltd will acknowledge your request.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
                <div className="w-7 h-7 rounded-full bg-white text-black font-black flex items-center justify-center text-xs">
                  2
                </div>
                <div className="font-bold text-white text-sm">Official Account Forwarded</div>
                <p className="text-stone-300 leading-relaxed">
                  We will forward our official corporate company bank account number directly in the WhatsApp chat for you to make payment.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
                <div className="w-7 h-7 rounded-full bg-white text-black font-black flex items-center justify-center text-xs">
                  3
                </div>
                <div className="font-bold text-white text-sm">Payment Confirmation &amp; Print</div>
                <p className="text-stone-300 leading-relaxed">
                  Send your transfer receipt on WhatsApp. Your job card is instantly queued on our Heidelberg/Roland machines, and if requested, delivered directly to your location!
                </p>
              </div>
            </div>
          </div>

          {/* Proforma Order Summary */}
          <div className="bg-[#121217] rounded-3xl border border-white/15 p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-base font-black text-white">
                  Proforma Order Invoice
                </h3>
                <p className="text-xs text-stone-400">
                  Issued by Silver &amp; Gold Inkshine Ltd
                </p>
              </div>

              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white text-stone-200 hover:text-black text-xs font-bold flex items-center gap-2 border border-white/20 transition-all cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>
            </div>

            {/* Client & Delivery Meta */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                <span className="text-stone-400 font-bold uppercase text-[10px]">Client Details:</span>
                <div className="font-bold text-white text-sm">{confirmedOrder.customer.fullName}</div>
                {confirmedOrder.customer.companyName && <div className="text-stone-300">{confirmedOrder.customer.companyName}</div>}
                <div className="text-stone-400">WhatsApp: {confirmedOrder.customer.phone}</div>
                {confirmedOrder.customer.email && <div className="text-stone-400">{confirmedOrder.customer.email}</div>}
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                <span className="text-stone-400 font-bold uppercase text-[10px]">Delivery Preference:</span>
                {wantsLocationDelivery ? (
                  <>
                    <div className="font-bold text-white text-sm">Direct Location Delivery</div>
                    <div className="text-stone-300">{confirmedOrder.customer.deliveryAddress || 'Address specified via WhatsApp'}</div>
                    {confirmedOrder.customer.landmark && <div className="text-stone-400">Landmark: {confirmedOrder.customer.landmark}</div>}
                    <div className="text-stone-400">{confirmedOrder.customer.city}, {confirmedOrder.customer.state}</div>
                  </>
                ) : (
                  <>
                    <div className="font-bold text-white text-sm">Direct Press Collection</div>
                    <div className="text-stone-300">Customer will collect directly from Silver &amp; Gold Inkshine Ltd press office.</div>
                  </>
                )}
              </div>
            </div>

            {/* Items Table */}
            <div className="border border-white/10 rounded-2xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-[#181822] text-stone-300 font-semibold border-b border-white/10">
                  <tr>
                    <th className="p-3">Item Description</th>
                    <th className="p-3 text-center">Qty</th>
                    <th className="p-3 text-right">Unit Rate</th>
                    <th className="p-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {confirmedOrder.items.map((it, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="p-3">
                        <div className="font-bold text-white">{it.productName}</div>
                        <div className="text-[10px] text-stone-400">
                          Artwork: {it.artwork?.fileName ? it.artwork.fileName : it.artwork?.type}
                        </div>
                      </td>
                      <td className="p-3 text-center font-mono font-bold text-stone-200">{it.quantity}</td>
                      <td className="p-3 text-right font-mono text-stone-300">{formatNaira(it.unitPriceNgn)}</td>
                      <td className="p-3 text-right font-mono font-bold text-white">{formatNaira(it.totalPriceNgn)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Financial Summary */}
            <div className="bg-[#181822] rounded-2xl p-4 border border-white/10 max-w-sm ml-auto space-y-2 text-xs">
              <div className="flex justify-between text-stone-300">
                <span>Subtotal:</span>
                <span className="font-mono text-white">{formatNaira(confirmedOrder.subtotalNgn)}</span>
              </div>
              {confirmedOrder.discountNgn > 0 && (
                <div className="flex justify-between text-stone-300">
                  <span>Discount:</span>
                  <span className="font-mono text-white">-{formatNaira(confirmedOrder.discountNgn)}</span>
                </div>
              )}
              {wantsLocationDelivery && (
                <div className="flex justify-between text-stone-300">
                  <span>Location Delivery:</span>
                  <span className="font-mono text-white">{formatNaira(confirmedOrder.shippingFeeNgn)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-300">
                <span>VAT (7.5%):</span>
                <span className="font-mono text-white">{formatNaira(Math.round(confirmedOrder.subtotalNgn * 0.075))}</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-black text-white">
                <span>Total Due:</span>
                <span className="font-mono text-white text-base">{formatNaira(confirmedOrder.grandTotalNgn)}</span>
              </div>
            </div>

            {/* Return Button */}
            <div className="flex justify-between pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={onReturnToHome}
                className="px-6 py-3 rounded-full bg-white hover:bg-stone-200 text-black text-xs font-black flex items-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <span>Return to Storefront Catalog</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // ACTIVE CHECKOUT FORM (Steps 1 & 2)
  return (
    <div className="bg-[#070709] min-h-screen py-8 sm:py-12 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header with Step Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/15 pb-5">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToCart}
              className="p-2.5 rounded-xl bg-[#121217] border border-white/15 hover:bg-white hover:text-black text-stone-200 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white">
                Order Finalization Desk
              </h1>
              <p className="text-xs text-stone-400">
                Orders &amp; payments are processed directly with Silver &amp; Gold Inkshine Ltd on WhatsApp.
              </p>
            </div>
          </div>

          {/* Stepper Indicator */}
          <div className="flex items-center gap-3 text-xs font-bold">
            <div className={`flex items-center gap-2 ${currentStep === 1 ? 'text-white' : 'text-stone-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                currentStep === 1 ? 'bg-white text-black' : 'bg-white/20 text-white'
              }`}>
                {currentStep === 1 ? '1' : '✓'}
              </span>
              <span>1. Contact &amp; Delivery</span>
            </div>
            <span className="text-stone-600">/</span>
            <div className={`flex items-center gap-2 ${currentStep === 2 ? 'text-white' : 'text-stone-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                currentStep === 2 ? 'bg-white text-black' : 'bg-white/10 text-stone-400'
              }`}>
                2
              </span>
              <span>2. WhatsApp Payment Desk</span>
            </div>
          </div>
        </div>

        {/* Notice on WhatsApp Payment Workflow */}
        <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/15 text-xs text-stone-300 flex items-start gap-3">
          <MessageSquare className="w-5 h-5 text-white shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold text-white text-sm">
              Official Payment Policy: Contact &amp; Pay via WhatsApp
            </div>
            <p className="leading-relaxed">
              We do not accept automated card payments on this website. Once you submit your order, your complete job specifications are sent to our direct WhatsApp line. Silver &amp; Gold Inkshine Ltd will review your project and send our official company account number on WhatsApp for you to make payment.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Steps */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Customer Details & Delivery Preference */}
            {currentStep === 1 && (
              <div className="bg-[#121217] rounded-3xl border border-white/15 p-6 sm:p-7 space-y-6 shadow-xl">
                <div className="border-b border-white/10 pb-3">
                  <h2 className="text-base font-black text-white flex items-center gap-2">
                    <span>1. Contact Details &amp; Location Delivery</span>
                  </h2>
                  <p className="text-xs text-stone-400 mt-1">
                    Provide your contact info so we can send the payment account number on WhatsApp.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-white block mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customer.fullName}
                      onChange={(e) => handleCustomerChange('fullName', e.target.value)}
                      placeholder="e.g. Babatunde Adeyemi"
                      className="w-full bg-[#181824] border border-white/15 rounded-xl p-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-white block mb-1">
                      WhatsApp Phone Number * (To Receive Account Details)
                    </label>
                    <input
                      type="tel"
                      required
                      value={customer.phone}
                      onChange={(e) => handleCustomerChange('phone', e.target.value)}
                      placeholder="e.g. +234 803 000 0000"
                      className="w-full bg-[#181824] border border-white/15 rounded-xl p-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-white block mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={customer.email}
                      onChange={(e) => handleCustomerChange('email', e.target.value)}
                      placeholder="e.g. client@company.ng"
                      className="w-full bg-[#181824] border border-white/15 rounded-xl p-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-white block mb-1">
                      Company / Organization Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={customer.companyName || ''}
                      onChange={(e) => handleCustomerChange('companyName', e.target.value)}
                      placeholder="e.g. Apex Global Ventures"
                      className="w-full bg-[#181824] border border-white/15 rounded-xl p-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-white transition-all"
                    />
                  </div>
                </div>

                {/* Location Delivery Toggle */}
                <div className="pt-4 border-t border-white/10 space-y-4">
                  <div className="font-bold text-white text-xs uppercase tracking-wider">
                    Location Delivery Preference
                  </div>

                  <div className="space-y-2.5">
                    <label
                      onClick={() => setWantsLocationDelivery(true)}
                      className={`p-4 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                        wantsLocationDelivery
                          ? 'border-white bg-white/10'
                          : 'border-white/10 bg-[#181824] hover:border-white/20'
                      }`}
                    >
                      <input
                        type="radio"
                        name="delivery_pref"
                        checked={wantsLocationDelivery}
                        onChange={() => setWantsLocationDelivery(true)}
                        className="mt-0.5 accent-white"
                      />
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                          <Truck className="w-4 h-4 text-white" />
                          <span>Yes, deliver the finished work directly to my location</span>
                        </div>
                        <p className="text-[11px] text-stone-300 leading-relaxed">
                          We can deliver directly to your specific home, office, or site address upon completion. (No pickup depots).
                        </p>
                      </div>
                    </label>

                    <label
                      onClick={() => setWantsLocationDelivery(false)}
                      className={`p-4 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                        !wantsLocationDelivery
                          ? 'border-white bg-white/10'
                          : 'border-white/10 bg-[#181824] hover:border-white/20'
                      }`}
                    >
                      <input
                        type="radio"
                        name="delivery_pref"
                        checked={!wantsLocationDelivery}
                        onChange={() => setWantsLocationDelivery(false)}
                        className="mt-0.5 accent-white"
                      />
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-white" />
                          <span>No, I will collect directly from your press office</span>
                        </div>
                        <p className="text-[11px] text-stone-300 leading-relaxed">
                          Collect directly from our press complex (Yenagoa or Lagos Somolu office). No delivery fee added.
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Delivery Address Fields if Location Delivery Selected */}
                  {wantsLocationDelivery && (
                    <div className="pt-2 space-y-3 bg-[#181824] p-4 rounded-2xl border border-white/10 text-xs">
                      <div>
                        <label className="font-bold text-white block mb-1">
                          Delivery Destination State / Region *
                        </label>
                        <select
                          value={shippingZoneId}
                          onChange={(e) => setShippingZoneId(e.target.value)}
                          className="w-full bg-[#121217] border border-white/15 rounded-xl p-2.5 text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-white transition-all"
                        >
                          {NIGERIAN_SHIPPING_ZONES.map((z) => (
                            <option key={z.id} value={z.id} className="bg-[#121217] text-white">
                              {z.name} ({z.region}) — {formatNaira(z.baseFeeNgn)}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="font-bold text-white block mb-1">
                          Exact Delivery Street Address *
                        </label>
                        <input
                          type="text"
                          value={customer.deliveryAddress}
                          onChange={(e) => handleCustomerChange('deliveryAddress', e.target.value)}
                          placeholder="e.g. Plot 14 Commercial Avenue, Victoria Island"
                          className="w-full bg-[#121217] border border-white/15 rounded-xl p-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-white transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="font-bold text-white block mb-1">
                            Nearest Landmark / Bus Stop
                          </label>
                          <input
                            type="text"
                            value={customer.landmark || ''}
                            onChange={(e) => handleCustomerChange('landmark', e.target.value)}
                            placeholder="e.g. Opposite GTBank, Near Gate"
                            className="w-full bg-[#121217] border border-white/15 rounded-xl p-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-white transition-all"
                          />
                        </div>

                        <div>
                          <label className="font-bold text-white block mb-1">
                            City &amp; Area
                          </label>
                          <input
                            type="text"
                            value={customer.city}
                            onChange={(e) => handleCustomerChange('city', e.target.value)}
                            placeholder="e.g. Ikeja, Lagos"
                            className="w-full bg-[#121217] border border-white/15 rounded-xl p-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-white transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (!customer.fullName.trim() || !customer.phone.trim()) {
                        alert('Please provide your name and WhatsApp phone number so we can forward the account details.');
                        return;
                      }
                      setCurrentStep(2);
                    }}
                    className="w-full py-4 px-6 rounded-full bg-white hover:bg-stone-200 active:scale-98 text-black font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                  >
                    <span>Proceed to WhatsApp Payment Desk</span>
                    <ChevronRight className="w-4 h-4 text-black" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Review Order & Send to WhatsApp */}
            {currentStep === 2 && (
              <div className="bg-[#121217] rounded-3xl border border-white/15 p-6 sm:p-7 space-y-6 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h2 className="text-base font-black text-white flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-white" />
                    <span>2. Review Order &amp; Request Payment Account</span>
                  </h2>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-xs text-stone-300 hover:text-white font-bold cursor-pointer underline underline-offset-2"
                  >
                    Edit Contact &amp; Address
                  </button>
                </div>

                {/* Summary of Buyer Details */}
                <div className="bg-[#181824] p-4 rounded-2xl border border-white/10 space-y-2 text-xs">
                  <div className="font-bold text-white text-sm">{customer.fullName}</div>
                  <div className="text-stone-300">WhatsApp: <strong className="text-white">{customer.phone}</strong></div>
                  {customer.companyName && <div className="text-stone-400">Company: {customer.companyName}</div>}
                  <div className="pt-1 text-stone-300 border-t border-white/5">
                    <strong>Delivery: </strong>
                    {wantsLocationDelivery 
                      ? `Deliver to location: ${customer.deliveryAddress || 'Address specified via WhatsApp'}, ${customer.city} (${selectedZone.name})`
                      : 'Direct collection at press office'}
                  </div>
                </div>

                {/* Direct WhatsApp Payment Box */}
                <div className="p-4 rounded-2xl bg-white/[0.06] border border-white/20 text-xs text-stone-200 space-y-3">
                  <div className="font-black text-white text-sm flex items-center gap-2">
                    <MessageSquare className="w-4.5 h-4.5 text-white" />
                    <span>Ready to finalize your order on WhatsApp</span>
                  </div>
                  <p className="leading-relaxed text-stone-300">
                    Clicking below will format your complete order specifications and open a direct chat with <strong className="text-white">Silver &amp; Gold Inkshine Ltd (+234 703 037 2539)</strong> on WhatsApp.
                  </p>
                  <p className="leading-relaxed text-stone-300">
                    Our team will verify your job specifications and send our official company account number directly on WhatsApp to make payment.
                  </p>
                </div>

                {/* Primary WhatsApp Order Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleSendToWhatsApp}
                    className="w-full py-4 px-6 rounded-full bg-white hover:bg-stone-200 active:scale-98 text-black font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-5 h-5 text-black" />
                    <span>Send Order via WhatsApp &amp; Receive Account Number</span>
                  </button>
                </div>

                <div className="text-center text-[11px] text-stone-400">
                  Direct communication with Silver &amp; Gold Inkshine Ltd • Official Company Account Details
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary & Promo Code */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#121217] rounded-3xl border border-white/15 p-6 space-y-5 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-bold text-white">
                  Order Items ({cartItems.length})
                </span>
                <button
                  onClick={onBackToCart}
                  className="text-xs font-bold text-stone-300 hover:text-white cursor-pointer underline underline-offset-2"
                >
                  Modify Cart
                </button>
              </div>

              {/* Items List */}
              <div className="divide-y divide-white/5 max-h-72 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="py-3 flex gap-3 text-xs">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-14 h-14 rounded-xl object-cover border border-white/10 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white truncate">
                        {item.product.name}
                      </div>
                      <div className="text-[11px] text-stone-400">
                        Qty: {item.quantity} • {formatNaira(item.unitPriceNgn)}/unit
                      </div>
                      <div className="text-[10px] text-stone-500 mt-0.5 truncate">
                        Artwork: {item.artworkType.replace('_', ' ').toUpperCase()}
                      </div>
                    </div>
                    <div className="text-right font-mono font-bold text-white">
                      {formatNaira(item.totalPriceNgn)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Input */}
              <form onSubmit={handleApplyCoupon} className="pt-2 border-t border-white/10 space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Coupon (e.g. LAGOSPRINT10)"
                      className="w-full pl-8 pr-2.5 py-2 bg-[#181824] border border-white/15 rounded-xl text-xs uppercase font-mono font-bold text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-white transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-white hover:bg-stone-200 text-black rounded-xl text-xs font-black transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>

                {appliedDiscountPercent > 0 && (
                  <div className="text-[11px] text-white font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Discount applied ({appliedDiscountPercent}% OFF)!</span>
                  </div>
                )}

                {couponError && (
                  <div className="text-[11px] text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{couponError}</span>
                  </div>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="pt-3 border-t border-white/10 space-y-2 text-xs">
                <div className="flex justify-between text-stone-300">
                  <span>Print Items Subtotal:</span>
                  <span className="font-mono text-white">{formatNaira(itemsSubtotalNgn)}</span>
                </div>

                {discountNgn > 0 && (
                  <div className="flex justify-between text-stone-300 font-bold">
                    <span>Promo Discount:</span>
                    <span className="font-mono text-white">-{formatNaira(discountNgn)}</span>
                  </div>
                )}

                {wantsLocationDelivery ? (
                  <div className="flex justify-between text-stone-300">
                    <span>
                      Location Delivery ({selectedZone.name}):
                    </span>
                    <span className="font-mono text-white">{formatNaira(deliveryFeeNgn)}</span>
                  </div>
                ) : (
                  <div className="flex justify-between text-stone-300">
                    <span>Direct Collection at Press:</span>
                    <span className="font-mono text-white">₦0</span>
                  </div>
                )}

                <div className="flex justify-between text-stone-300">
                  <span>VAT (7.5% Nigerian Statutory):</span>
                  <span className="font-mono text-white">{formatNaira(vatNgn)}</span>
                </div>

                <div className="pt-3 border-t border-white/10 flex justify-between text-base font-black text-white">
                  <span>Total Due:</span>
                  <span className="font-mono text-white text-lg">
                    {formatNaira(grandTotalNgn)}
                  </span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-around text-[10px] text-stone-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-white" />
                  <span>Verified Press</span>
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-white" />
                  <span>Location Delivery</span>
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-white" />
                  <span>Official WhatsApp</span>
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
