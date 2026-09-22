import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Check, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  Building2, 
  Clock, 
  FileText, 
  CheckCircle2, 
  Printer, 
  MessageSquare, 
  Copy, 
  Download, 
  AlertCircle, 
  Tag, 
  Lock,
  ChevronRight,
  PackageCheck
} from 'lucide-react';
import { CartItem } from '../storefront/CartDrawer';
import { NIGERIAN_SHIPPING_ZONES } from '../../data/seedData';
import { CustomerDetails, Order } from '../../types/schema';
import { CompanyLogoMark } from '../common/CompanyLogo';
import { PaystackModal } from './PaystackModal';
import { FlutterwaveModal } from './FlutterwaveModal';

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
  // Step state: 1: Delivery Details, 2: Payment & Review, 3: Order Confirmed
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Customer Form State
  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: 'Adeyemi Babatunde',
    email: 'babatunde@leadwaycorporate.ng',
    phone: '+234 803 456 7890',
    companyName: 'Leadway Corporate Services Ltd',
    deliveryAddress: 'Plot 12, Commercial Avenue, Sabo',
    landmark: 'Opposite First Bank, near Yaba Tech Gate',
    city: 'Yaba / Lagos Mainland',
    state: 'Lagos State',
  });

  // Logistics selection
  const [shippingZoneId, setShippingZoneId] = useState<string>(NIGERIAN_SHIPPING_ZONES[0].id);
  const [isExpress, setIsExpress] = useState<boolean>(false);

  // Coupon code
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscountPercent, setAppliedDiscountPercent] = useState<number>(0);
  const [couponError, setCouponError] = useState<string | null>(null);

  // Payment gateway selection
  const [paymentGateway, setPaymentGateway] = useState<'paystack' | 'flutterwave' | 'bank_transfer'>('paystack');
  const [showPaystackModal, setShowPaystackModal] = useState(false);
  const [showFlutterwaveModal, setShowFlutterwaveModal] = useState(false);

  // Confirmed order state
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  const selectedZone = NIGERIAN_SHIPPING_ZONES.find((z) => z.id === shippingZoneId) || NIGERIAN_SHIPPING_ZONES[0];
  const shippingFeeNgn = isExpress && selectedZone.expressAvailable 
    ? (selectedZone.expressFeeNgn || selectedZone.baseFeeNgn) 
    : selectedZone.baseFeeNgn;

  const itemsSubtotalNgn = cartItems.reduce((acc, curr) => acc + curr.totalPriceNgn, 0);
  const discountNgn = Math.round(itemsSubtotalNgn * (appliedDiscountPercent / 100));
  const subtotalAfterDiscount = itemsSubtotalNgn - discountNgn;
  const vatNgn = Math.round(subtotalAfterDiscount * 0.075); // 7.5% Nigerian statutory VAT
  const grandTotalNgn = subtotalAfterDiscount + shippingFeeNgn + vatNgn;

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

  const handleStartPayment = () => {
    if (paymentGateway === 'paystack') {
      setShowPaystackModal(true);
    } else if (paymentGateway === 'flutterwave') {
      setShowFlutterwaveModal(true);
    } else {
      // Direct Bank Transfer
      finalizeOrder('MANUAL_BANK_TRANSFER_' + Date.now());
    }
  };

  const finalizeOrder = (paymentRef: string) => {
    const orderNum = 'RP-NG-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      createdAt: new Date().toISOString(),
      customer,
      items: cartItems.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        unitPriceNgn: item.unitPriceNgn,
        totalPriceNgn: item.totalPriceNgn,
        selectedOptions: item.selectedOptions,
        artworkSubmissionType: item.artworkType,
        uploadedArtworkUrl: item.uploadedFileName,
      })),
      subtotalNgn: itemsSubtotalNgn,
      shippingFeeNgn,
      discountNgn,
      grandTotalNgn,
      paymentGateway,
      paymentStatus: paymentGateway === 'bank_transfer' ? 'pending' : 'paid',
      paymentReference: paymentRef,
      orderStatus: 'artwork_review',
      shippingZoneId,
      trackingNumber: 'TRK-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
    };

    setConfirmedOrder(newOrder);
    onOrderPlaced?.(newOrder);
    setCurrentStep(3);
    setShowPaystackModal(false);
    setShowFlutterwaveModal(false);
    onClearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyOrderRef = () => {
    if (confirmedOrder) {
      navigator.clipboard.writeText(confirmedOrder.orderNumber);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  // Step 3: Render Confirmed Order & Tracking receipt
  if (currentStep === 3 && confirmedOrder) {
    return (
      <div className="bg-[#08080a] min-h-screen py-10 text-stone-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Success Banner */}
          <div className="bg-[#121217] text-white rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-4 border border-[#f5be38]/30 relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-60 h-60 bg-[#f5be38]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="w-16 h-16 bg-[#f5be38] text-black rounded-full flex items-center justify-center mx-auto shadow-lg shadow-[#f5be38]/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Commercial Print Order Received & Queued!
              </h1>
              <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto mt-2 leading-relaxed">
                Your order is being routed to our central Somolu & Ikeja Graphic Arts production press. An official confirmation email with payment receipt has been dispatched to <strong className="text-[#f5be38]">{confirmedOrder.customer.email}</strong>.
              </p>
            </div>

            <div className="inline-flex items-center gap-3 bg-black/70 border border-[#f5be38]/40 px-5 py-2.5 rounded-2xl backdrop-blur-md">
              <span className="text-xs text-stone-400">Official Order No:</span>
              <span className="font-mono text-sm sm:text-base font-black text-[#f5be38]">
                {confirmedOrder.orderNumber}
              </span>
              <button
                onClick={copyOrderRef}
                className="p-1.5 rounded-lg hover:bg-[#f5be38]/20 text-[#f5be38] transition-colors"
                title="Copy order reference"
              >
                {copiedRef ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Real-time Order Production Stepper */}
          <div className="bg-[#121217] rounded-3xl border border-white/10 p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#f5be38]" />
                  <span>Real-Time Production & Dispatch Status</span>
                </h3>
                <span className="text-xs text-stone-400">
                  Estimated Dispatch Date: <strong className="text-stone-200">Within 24–48 Hours</strong>
                </span>
              </div>
              <span className="px-3 py-1 bg-[#f5be38]/15 text-[#f5be38] border border-[#f5be38]/30 text-xs font-bold rounded-full">
                Status: Pre-Press Inspection
              </span>
            </div>

            {/* Stepper Steps */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { step: 1, label: 'Order Paid', desc: confirmedOrder.paymentGateway.toUpperCase(), done: true, current: false },
                { step: 2, label: 'Pre-Press Check', desc: '300 DPI Bleed Audit', done: false, current: true },
                { step: 3, label: 'High-Res Press', desc: '1440 DPI Printing', done: false, current: false },
                { step: 4, label: 'Cassette Mount', desc: 'Assembly & QC', done: false, current: false },
                { step: 5, label: 'Dispatch / Courier', desc: selectedZone.name, done: false, current: false },
              ].map((st) => (
                <div 
                  key={st.step} 
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    st.done
                      ? 'bg-[#181824] border-[#f5be38]/40 text-stone-200'
                      : st.current
                      ? 'bg-[#181824] border-[#f5be38] text-white ring-2 ring-[#f5be38]/30'
                      : 'bg-[#0e0e12] border-white/5 text-stone-500'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className={st.done || st.current ? 'text-[#f5be38]' : 'text-stone-500'}>Stage 0{st.step}</span>
                    {st.done ? (
                      <Check className="w-4 h-4 text-[#f5be38]" />
                    ) : st.current ? (
                      <span className="h-2 w-2 rounded-full bg-[#f5be38] animate-ping" />
                    ) : null}
                  </div>
                  <div className="font-bold text-xs mt-1.5">{st.label}</div>
                  <div className="text-[10px] text-stone-400 mt-0.5">{st.desc}</div>
                </div>
              ))}
            </div>

            {/* Direct WhatsApp Despatch Link */}
            <div className="bg-[#181824] border border-[#f5be38]/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#f5be38] text-black shrink-0 shadow-md">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">
                    Receive Real-Time Production Photos via WhatsApp
                  </h4>
                  <p className="text-[11px] text-stone-300">
                    Connect directly with our print floor supervisor to receive photos of your banners as they come off the wide-format press.
                  </p>
                </div>
              </div>

              <a
                href={`https://wa.me/2347030372539?text=Hello%20Silver%20%26%20Gold%20Inkshine%2C%20I%20am%20tracking%20my%20order%20${confirmedOrder.orderNumber}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full bg-[#f5be38] hover:bg-[#ffd15c] text-black text-xs font-black whitespace-nowrap shadow-lg shadow-[#f5be38]/20 flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Chat with Pressmaster</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Official Printable Tax & Commercial Invoice Receipt */}
          <div className="bg-[#121217] rounded-3xl border border-white/10 p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 shrink-0 drop-shadow-md">
                  <CompanyLogoMark className="w-full h-full" />
                </div>
                <div>
                  <span className="font-mono text-xs font-black text-[#f5be38] uppercase tracking-wider block">
                    Commercial Invoice &amp; Tax Receipt
                  </span>
                  <h3 className="text-xl font-black text-white">
                    Silver &amp; Gold Inkshine Ltd
                  </h3>
                  <p className="text-[11px] text-stone-400">
                    RC: 1849204 • TIN: 24891029-0001 • Plot 14 Commercial Ave, Somolu, Lagos State
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => window.print()}
                className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-stone-200 text-xs font-bold flex items-center gap-2 border border-white/10 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4 text-[#f5be38]" />
                <span>Print Invoice</span>
              </button>
            </div>

            {/* Billing & Delivery Meta */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="space-y-1 bg-[#181824] p-4 rounded-2xl border border-white/5">
                <span className="text-[#f5be38] font-bold uppercase tracking-wider text-[10px]">
                  Billed To / Corporate Client:
                </span>
                <div className="font-bold text-white text-sm">{confirmedOrder.customer.fullName}</div>
                {confirmedOrder.customer.companyName && (
                  <div className="text-stone-300">{confirmedOrder.customer.companyName}</div>
                )}
                <div className="text-stone-400">{confirmedOrder.customer.email}</div>
                <div className="text-stone-400">{confirmedOrder.customer.phone}</div>
              </div>

              <div className="space-y-1 bg-[#181824] p-4 rounded-2xl border border-white/5">
                <span className="text-[#f5be38] font-bold uppercase tracking-wider text-[10px]">
                  Delivery Destination:
                </span>
                <div className="font-bold text-white text-sm">{confirmedOrder.customer.deliveryAddress}</div>
                {confirmedOrder.customer.landmark && (
                  <div className="text-stone-400">Landmark: {confirmedOrder.customer.landmark}</div>
                )}
                <div className="text-stone-400">
                  {confirmedOrder.customer.city}, {confirmedOrder.customer.state}
                </div>
                <div className="text-[#f5be38] font-semibold mt-1">
                  Logistics Zone: {selectedZone.name} ({isExpress ? 'Express Dispatch' : 'Standard Hub'})
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="border border-white/10 rounded-2xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-[#181824] text-stone-300 font-semibold border-b border-white/10">
                  <tr>
                    <th className="p-3">Item Description</th>
                    <th className="p-3 text-center">Qty</th>
                    <th className="p-3 text-right">Unit Rate</th>
                    <th className="p-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {confirmedOrder.items.map((it, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="p-3">
                        <div className="font-bold text-white">{it.productName}</div>
                        <div className="text-[10px] text-stone-400">
                          Artwork: {it.artworkSubmissionType.replace('_', ' ').toUpperCase()} {it.uploadedArtworkUrl ? `(${it.uploadedArtworkUrl})` : ''}
                        </div>
                      </td>
                      <td className="p-3 text-center font-mono font-bold text-stone-200">{it.quantity}</td>
                      <td className="p-3 text-right font-mono text-stone-300">{formatNaira(it.unitPriceNgn)}</td>
                      <td className="p-3 text-right font-mono font-bold text-[#f5be38]">{formatNaira(it.totalPriceNgn)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Financial Totals Box */}
            <div className="bg-[#181824] rounded-2xl p-4 border border-white/10 max-w-sm ml-auto space-y-2 text-xs">
              <div className="flex justify-between text-stone-300">
                <span>Subtotal:</span>
                <span className="font-mono text-white">{formatNaira(confirmedOrder.subtotalNgn)}</span>
              </div>
              {confirmedOrder.discountNgn > 0 && (
                <div className="flex justify-between text-[#f5be38] font-bold">
                  <span>Corporate Discount:</span>
                  <span className="font-mono">-{formatNaira(confirmedOrder.discountNgn)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-300">
                <span>Logistics & Dispatch ({selectedZone.name}):</span>
                <span className="font-mono text-white">{formatNaira(confirmedOrder.shippingFeeNgn)}</span>
              </div>
              <div className="flex justify-between text-stone-300">
                <span>VAT (7.5%):</span>
                <span className="font-mono text-white">{formatNaira(Math.round(confirmedOrder.subtotalNgn * 0.075))}</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-black text-white">
                <span>Grand Total Paid:</span>
                <span className="font-mono text-[#f5be38] text-base">{formatNaira(confirmedOrder.grandTotalNgn)}</span>
              </div>
              <div className="text-[10px] text-stone-400 text-right pt-1">
                Ref: {confirmedOrder.paymentReference}
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={onReturnToHome}
                className="px-6 py-3 rounded-full bg-[#f5be38] hover:bg-[#ffd15c] text-black text-xs font-black flex items-center gap-2 transition-all shadow-md cursor-pointer"
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

  // Active Checkout Stepper (Step 1 or Step 2)
  return (
    <div className="bg-[#08080a] min-h-screen py-8 sm:py-12 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header with Step Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToCart}
              className="p-2.5 rounded-xl bg-[#121217] border border-white/10 hover:border-[#f5be38]/50 hover:bg-[#181822] text-stone-200 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#f5be38]" />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white">
                Corporate Order Checkout
              </h1>
              <p className="text-xs text-stone-400">
                Secure 256-Bit SSL Checkout with nationwide Nigerian dispatch.
              </p>
            </div>
          </div>

          {/* Stepper Indicator */}
          <div className="flex items-center gap-3 text-xs font-bold">
            <div className={`flex items-center gap-2 ${currentStep === 1 ? 'text-[#f5be38]' : 'text-stone-300'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                currentStep === 1 ? 'bg-[#f5be38] text-black shadow-md shadow-[#f5be38]/20' : 'bg-[#f5be38]/20 text-[#f5be38] border border-[#f5be38]/40'
              }`}>
                {currentStep === 1 ? '1' : '✓'}
              </span>
              <span>1. Delivery &amp; Address</span>
            </div>

            <span className="text-stone-600">→</span>

            <div className={`flex items-center gap-2 ${currentStep === 2 ? 'text-[#f5be38]' : 'text-stone-500'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                currentStep === 2 ? 'bg-[#f5be38] text-black shadow-md shadow-[#f5be38]/20' : 'bg-[#181822] text-stone-500 border border-white/10'
              }`}>
                2
              </span>
              <span>2. Payment &amp; Gateways</span>
            </div>
          </div>
        </div>

        {/* Two-Column Checkout Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form Area */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Customer Contact & Nigerian Address */}
            {currentStep === 1 && (
              <div className="bg-[#121217] rounded-3xl border border-white/10 p-6 sm:p-7 space-y-5 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h2 className="text-sm font-bold text-white flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#f5be38]" />
                    <span>Contact &amp; Nigerian Delivery Destination</span>
                  </h2>
                  <span className="text-[10px] text-stone-400 font-mono">Step 1 of 2</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-stone-300 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customer.fullName}
                      onChange={(e) => handleCustomerChange('fullName', e.target.value)}
                      placeholder="e.g. Adeyemi Babatunde"
                      className="w-full bg-[#181824] border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-[#f5be38] focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-stone-300 block mb-1">
                      Corporate Company Name (Optional for Invoicing)
                    </label>
                    <input
                      type="text"
                      value={customer.companyName || ''}
                      onChange={(e) => handleCustomerChange('companyName', e.target.value)}
                      placeholder="e.g. Leadway Assurance / Access Holdings"
                      className="w-full bg-[#181824] border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-[#f5be38] focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-stone-300 block mb-1">
                      Email Address (For Invoices &amp; Pre-Press Proofs) *
                    </label>
                    <input
                      type="email"
                      required
                      value={customer.email}
                      onChange={(e) => handleCustomerChange('email', e.target.value)}
                      placeholder="babatunde@company.ng"
                      className="w-full bg-[#181824] border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-[#f5be38] focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-stone-300 block mb-1">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customer.phone}
                      onChange={(e) => handleCustomerChange('phone', e.target.value)}
                      placeholder="+234 803 000 0000"
                      className="w-full bg-[#181824] border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-[#f5be38] focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-bold text-stone-300 block mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={customer.deliveryAddress}
                      onChange={(e) => handleCustomerChange('deliveryAddress', e.target.value)}
                      placeholder="e.g. Plot 14 Commercial Avenue, Somolu"
                      className="w-full bg-[#181824] border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-[#f5be38] focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-bold text-stone-300 block mb-1">
                      Landmark / Nearest Bus Stop (Crucial for Dispatch Riders) *
                    </label>
                    <input
                      type="text"
                      required
                      value={customer.landmark || ''}
                      onChange={(e) => handleCustomerChange('landmark', e.target.value)}
                      placeholder="e.g. Beside First Bank Somolu, Near Ikeja City Mall"
                      className="w-full bg-[#181824] border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-[#f5be38] focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-stone-300 block mb-1">
                      Destination Shipping Zone *
                    </label>
                    <select
                      value={shippingZoneId}
                      onChange={(e) => setShippingZoneId(e.target.value)}
                      className="w-full bg-[#181824] border border-white/10 rounded-xl p-2.5 text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-[#f5be38] focus:border-transparent transition-all"
                    >
                      {NIGERIAN_SHIPPING_ZONES.map((z) => (
                        <option key={z.id} value={z.id} className="bg-[#121217] text-white">
                          {z.name} ({z.region}) — {formatNaira(z.baseFeeNgn)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-stone-300 block mb-1">
                      City &amp; State
                    </label>
                    <input
                      type="text"
                      value={customer.city + ', ' + customer.state}
                      onChange={(e) => handleCustomerChange('city', e.target.value)}
                      className="w-full bg-[#181824] border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-[#f5be38] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Dispatch Speed Toggle */}
                {selectedZone.expressAvailable && (
                  <div className="pt-3 border-t border-white/10">
                    <label className="p-3.5 rounded-2xl border border-white/10 bg-[#181824] flex items-center justify-between cursor-pointer hover:border-[#f5be38]/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isExpress}
                          onChange={(e) => setIsExpress(e.target.checked)}
                          className="h-4 w-4 rounded accent-[#f5be38]"
                        />
                        <div>
                          <span className="text-xs font-bold text-white block">
                            Upgrade to Same-Day / Next-Day Priority Courier
                          </span>
                          <span className="text-[11px] text-stone-400">
                            Guaranteed priority press queue and dedicated dispatch rider.
                          </span>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold text-[#f5be38]">
                        {formatNaira(selectedZone.expressFeeNgn!)}
                      </span>
                    </label>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="w-full py-4 px-6 rounded-full bg-[#f5be38] hover:bg-[#ffd15c] active:scale-98 text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(245,190,56,0.3)] transition-all cursor-pointer"
                  >
                    <span>Proceed to Payment Gateways</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Payment Gateway Selection */}
            {currentStep === 2 && (
              <div className="bg-[#121217] rounded-3xl border border-white/10 p-6 sm:p-7 space-y-6 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h2 className="text-sm font-bold text-white flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#f5be38]" />
                    <span>Select Payment Gateway (Nigerian Banking Channels)</span>
                  </h2>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-xs text-[#f5be38] hover:text-[#ffd15c] font-medium cursor-pointer"
                  >
                    Edit Address
                  </button>
                </div>

                {/* Gateway Radio Cards */}
                <div className="space-y-3">
                  {/* Paystack */}
                  <label
                    onClick={() => setPaymentGateway('paystack')}
                    className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentGateway === 'paystack'
                        ? 'border-[#0BA4DB] bg-[#0BA4DB]/10 ring-2 ring-[#0BA4DB]/30 shadow-md'
                        : 'border-white/10 bg-[#181824] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="gateway"
                        checked={paymentGateway === 'paystack'}
                        onChange={() => setPaymentGateway('paystack')}
                        className="accent-[#0BA4DB]"
                      />
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                          <span>Paystack Checkout</span>
                          <span className="bg-[#0BA4DB] text-white text-[9px] px-1.5 py-0.5 rounded font-black">
                            POPULAR
                          </span>
                        </div>
                        <div className="text-[11px] text-stone-400">
                          Verve, Mastercard, Visa, Direct Bank Transfer &amp; USSD (*737#, *966#).
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#0BA4DB]">
                      Instant Confirmation
                    </span>
                  </label>

                  {/* Flutterwave */}
                  <label
                    onClick={() => setPaymentGateway('flutterwave')}
                    className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentGateway === 'flutterwave'
                        ? 'border-[#FB9129] bg-[#FB9129]/10 ring-2 ring-[#FB9129]/30 shadow-md'
                        : 'border-white/10 bg-[#181824] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="gateway"
                        checked={paymentGateway === 'flutterwave'}
                        onChange={() => setPaymentGateway('flutterwave')}
                        className="accent-[#FB9129]"
                      />
                      <div>
                        <div className="text-xs font-bold text-white">
                          Flutterwave / Rave
                        </div>
                        <div className="text-[11px] text-stone-400">
                          Card, Barter, Mobile Money &amp; Virtual Accounts.
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#FB9129]">
                      Multi-Option
                    </span>
                  </label>

                  {/* Direct Corporate Bank Transfer */}
                  <label
                    onClick={() => setPaymentGateway('bank_transfer')}
                    className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentGateway === 'bank_transfer'
                        ? 'border-[#f5be38] bg-[#f5be38]/10 ring-2 ring-[#f5be38]/30 shadow-md'
                        : 'border-white/10 bg-[#181824] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="gateway"
                        checked={paymentGateway === 'bank_transfer'}
                        onChange={() => setPaymentGateway('bank_transfer')}
                        className="accent-[#f5be38]"
                      />
                      <div>
                        <div className="text-xs font-bold text-white">
                          Direct Corporate Bank Transfer / Invoice
                        </div>
                        <div className="text-[11px] text-stone-400">
                          Pay directly to Titan Trust or GTBank corporate account. Recommended for enterprises.
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#f5be38]">
                      Proforma Invoice
                    </span>
                  </label>
                </div>

                {/* Bank details if direct transfer */}
                {paymentGateway === 'bank_transfer' && (
                  <div className="bg-[#181824] border border-[#f5be38]/30 rounded-2xl p-4 space-y-2 text-xs">
                    <div className="font-bold text-[#f5be38]">
                      Silver &amp; Gold Inkshine Ltd — Corporate Accounts:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-300">
                      <div className="p-3 bg-[#121217] rounded-xl border border-white/10">
                        <strong className="block text-white">GTBank Corporate:</strong>
                        <span className="font-mono text-sm font-bold text-[#f5be38]">0123456789</span>
                        <div className="text-[10px] text-stone-400">Silver &amp; Gold Inkshine Ltd</div>
                      </div>
                      <div className="p-3 bg-[#121217] rounded-xl border border-white/10">
                        <strong className="block text-white">Titan Trust Bank:</strong>
                        <span className="font-mono text-sm font-bold text-[#f5be38]">1009823412</span>
                        <div className="text-[10px] text-stone-400">Silver &amp; Gold Inkshine Ltd</div>
                      </div>
                    </div>
                    <p className="text-[11px] text-stone-400 pt-1">
                      Please use your full name or Order No. as the transfer narration for immediate automated matching.
                    </p>
                  </div>
                )}

                {/* Primary Trigger Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleStartPayment}
                    className="w-full py-4 px-6 rounded-full bg-[#f5be38] hover:bg-[#ffd15c] active:scale-98 text-black font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(245,190,56,0.3)] transition-all cursor-pointer"
                  >
                    <Lock className="w-4 h-4 text-black" />
                    <span>
                      {paymentGateway === 'bank_transfer'
                        ? `Generate Invoice & Place Order • ${formatNaira(grandTotalNgn)}`
                        : `Pay ${formatNaira(grandTotalNgn)} via ${paymentGateway === 'paystack' ? 'Paystack' : 'Flutterwave'}`}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary & Coupon */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Order Items Review */}
            <div className="bg-[#121217] rounded-3xl border border-white/10 p-6 space-y-5 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-bold text-white">
                  Order Items ({cartItems.length})
                </span>
                <button
                  onClick={onBackToCart}
                  className="text-xs font-semibold text-[#f5be38] hover:text-[#ffd15c] cursor-pointer"
                >
                  Modify Cart
                </button>
              </div>

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
                    <div className="text-right font-mono font-bold text-[#f5be38]">
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
                      className="w-full pl-8 pr-2.5 py-2 bg-[#181824] border border-white/10 rounded-xl text-xs uppercase font-mono font-bold text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-[#f5be38] focus:border-transparent transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#f5be38] hover:bg-[#ffd15c] text-black rounded-xl text-xs font-black transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>

                {appliedDiscountPercent > 0 && (
                  <div className="text-[11px] text-[#f5be38] font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Corporate discount applied ({appliedDiscountPercent}% OFF)!</span>
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
                  <div className="flex justify-between text-[#f5be38] font-bold">
                    <span>Promo Code Discount:</span>
                    <span className="font-mono">-{formatNaira(discountNgn)}</span>
                  </div>
                )}

                <div className="flex justify-between text-stone-300">
                  <span>
                    Logistics Delivery ({selectedZone.name}{isExpress ? ' • Priority' : ''}):
                  </span>
                  <span className="font-mono text-white">{formatNaira(shippingFeeNgn)}</span>
                </div>

                <div className="flex justify-between text-stone-300">
                  <span>VAT (7.5% Nigerian Statutory):</span>
                  <span className="font-mono text-white">{formatNaira(vatNgn)}</span>
                </div>

                <div className="pt-3 border-t border-white/10 flex justify-between text-base font-black text-white">
                  <span>Total Due:</span>
                  <span className="font-mono text-[#f5be38] text-lg">
                    {formatNaira(grandTotalNgn)}
                  </span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-around text-[10px] text-stone-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#f5be38]" />
                  <span>Verified Press</span>
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#f5be38]" />
                  <span>36 States Delivery</span>
                </span>
                <span className="flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-sky-400" />
                  <span>CBN Regulated Gateways</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal: Paystack Checkout */}
        {showPaystackModal && (
          <PaystackModal
            amountNgn={grandTotalNgn}
            email={customer.email}
            onSuccess={(ref) => finalizeOrder(ref)}
            onClose={() => setShowPaystackModal(false)}
          />
        )}

        {/* Modal: Flutterwave Checkout */}
        {showFlutterwaveModal && (
          <FlutterwaveModal
            amountNgn={grandTotalNgn}
            email={customer.email}
            customerName={customer.fullName}
            onSuccess={(ref) => finalizeOrder(ref)}
            onClose={() => setShowFlutterwaveModal(false)}
          />
        )}
      </div>
    </div>
  );
};
