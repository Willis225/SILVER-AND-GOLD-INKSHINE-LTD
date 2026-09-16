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
      <div className="bg-stone-50 min-h-screen py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Success Banner */}
          <div className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-4 border border-emerald-700">
            <div className="w-16 h-16 bg-emerald-500 text-stone-950 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                Commercial Print Order Received & Queued!
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto mt-2">
                Your order is being routed to our central Somolu & Ikeja Graphic Arts production press. An official confirmation email with payment receipt has been dispatched to <strong>{confirmedOrder.customer.email}</strong>.
              </p>
            </div>

            <div className="inline-flex items-center gap-3 bg-emerald-950/60 border border-emerald-700 px-4 py-2 rounded-2xl">
              <span className="text-xs text-emerald-200">Official Order No:</span>
              <span className="font-mono text-sm sm:text-base font-black text-amber-400">
                {confirmedOrder.orderNumber}
              </span>
              <button
                onClick={copyOrderRef}
                className="p-1 rounded hover:bg-emerald-800 text-emerald-200"
              >
                {copiedRef ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Real-time Order Production Stepper */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div>
                <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Real-Time Production & Dispatch Status</span>
                </h3>
                <span className="text-xs text-stone-500">
                  Estimated Dispatch Date: <strong>Within 24–48 Hours</strong>
                </span>
              </div>
              <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">
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
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    st.done
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                      : st.current
                      ? 'bg-amber-50 border-amber-500 text-amber-950 ring-2 ring-amber-500/20'
                      : 'bg-stone-50 border-stone-200 text-stone-400'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span>Stage 0{st.step}</span>
                    {st.done ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : st.current ? (
                      <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
                    ) : null}
                  </div>
                  <div className="font-bold text-xs mt-1">{st.label}</div>
                  <div className="text-[10px] text-stone-500 mt-0.5">{st.desc}</div>
                </div>
              ))}
            </div>

            {/* Direct WhatsApp Despatch Link */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-600 text-white shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">
                    Receive Real-Time Production Photos via WhatsApp
                  </h4>
                  <p className="text-[11px] text-stone-600">
                    Connect directly with our print floor supervisor to receive photos of your banners as they come off the wide-format press.
                  </p>
                </div>
              </div>

              <a
                href={`https://wa.me/2349028694908?text=Hello%20Silver%20%26%20Gold%20Inkshine%2C%20I%20am%20tracking%20my%20order%20${confirmedOrder.orderNumber}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold whitespace-nowrap shadow-xs flex items-center gap-2"
              >
                <span>Chat with Pressmaster</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Official Printable Tax & Commercial Invoice Receipt */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 shrink-0 drop-shadow-sm">
                  <CompanyLogoMark className="w-full h-full" />
                </div>
                <div>
                  <span className="font-mono text-xs font-black text-amber-600 uppercase tracking-wider block">
                    Commercial Invoice &amp; Tax Receipt
                  </span>
                  <h3 className="text-xl font-black text-stone-900">
                    Silver &amp; Gold Inkshine Ltd
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    RC: 1849204 • TIN: 24891029-0001 • Plot 14 Commercial Ave, Somolu, Lagos State
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => window.print()}
                className="self-start sm:self-auto px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center gap-2 transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print Invoice</span>
              </button>
            </div>

            {/* Billing & Delivery Meta */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="space-y-1">
                <span className="text-stone-400 font-bold uppercase tracking-wider text-[10px]">
                  Billed To / Corporate Client:
                </span>
                <div className="font-bold text-stone-900">{confirmedOrder.customer.fullName}</div>
                {confirmedOrder.customer.companyName && (
                  <div className="text-stone-700">{confirmedOrder.customer.companyName}</div>
                )}
                <div className="text-stone-600">{confirmedOrder.customer.email}</div>
                <div className="text-stone-600">{confirmedOrder.customer.phone}</div>
              </div>

              <div className="space-y-1">
                <span className="text-stone-400 font-bold uppercase tracking-wider text-[10px]">
                  Delivery Destination:
                </span>
                <div className="font-bold text-stone-900">{confirmedOrder.customer.deliveryAddress}</div>
                {confirmedOrder.customer.landmark && (
                  <div className="text-stone-600">Landmark: {confirmedOrder.customer.landmark}</div>
                )}
                <div className="text-stone-600">
                  {confirmedOrder.customer.city}, {confirmedOrder.customer.state}
                </div>
                <div className="text-amber-800 font-semibold mt-1">
                  Logistics Zone: {selectedZone.name} ({isExpress ? 'Express Dispatch' : 'Standard Hub'})
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="border border-stone-200 rounded-2xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-stone-50 text-stone-600 font-semibold border-b border-stone-200">
                  <tr>
                    <th className="p-3">Item Description</th>
                    <th className="p-3 text-center">Qty</th>
                    <th className="p-3 text-right">Unit Rate</th>
                    <th className="p-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {confirmedOrder.items.map((it, idx) => (
                    <tr key={idx}>
                      <td className="p-3">
                        <div className="font-bold text-stone-900">{it.productName}</div>
                        <div className="text-[10px] text-stone-500">
                          Artwork: {it.artworkSubmissionType.replace('_', ' ').toUpperCase()} {it.uploadedArtworkUrl ? `(${it.uploadedArtworkUrl})` : ''}
                        </div>
                      </td>
                      <td className="p-3 text-center font-mono font-bold">{it.quantity}</td>
                      <td className="p-3 text-right font-mono">{formatNaira(it.unitPriceNgn)}</td>
                      <td className="p-3 text-right font-mono font-bold">{formatNaira(it.totalPriceNgn)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Financial Totals Box */}
            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 max-w-sm ml-auto space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal:</span>
                <span className="font-mono text-stone-900">{formatNaira(confirmedOrder.subtotalNgn)}</span>
              </div>
              {confirmedOrder.discountNgn > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Corporate Discount:</span>
                  <span className="font-mono">-{formatNaira(confirmedOrder.discountNgn)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600">
                <span>Logistics & Dispatch ({selectedZone.name}):</span>
                <span className="font-mono text-stone-900">{formatNaira(confirmedOrder.shippingFeeNgn)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>VAT (7.5%):</span>
                <span className="font-mono text-stone-900">{formatNaira(Math.round(confirmedOrder.subtotalNgn * 0.075))}</span>
              </div>
              <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-black text-stone-900">
                <span>Grand Total Paid:</span>
                <span className="font-mono text-amber-700">{formatNaira(confirmedOrder.grandTotalNgn)}</span>
              </div>
              <div className="text-[10px] text-stone-500 text-right pt-1">
                Ref: {confirmedOrder.paymentReference}
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-stone-100">
              <button
                type="button"
                onClick={onReturnToHome}
                className="px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold flex items-center gap-2"
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
    <div className="bg-stone-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header with Step Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToCart}
              className="p-2 rounded-xl bg-white border border-stone-200 hover:bg-stone-100 text-stone-700"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-stone-900">
                Corporate Order Checkout
              </h1>
              <p className="text-xs text-stone-500">
                Secure 256-Bit SSL Checkout with nationwide Nigerian dispatch.
              </p>
            </div>
          </div>

          {/* Stepper Indicator */}
          <div className="flex items-center gap-3 text-xs font-bold">
            <div className={`flex items-center gap-1.5 ${currentStep === 1 ? 'text-amber-700' : 'text-emerald-700'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                currentStep === 1 ? 'bg-amber-600 text-white' : 'bg-emerald-600 text-white'
              }`}>
                {currentStep === 1 ? '1' : '✓'}
              </span>
              <span>1. Delivery & Address</span>
            </div>

            <span className="text-stone-300">→</span>

            <div className={`flex items-center gap-1.5 ${currentStep === 2 ? 'text-amber-700' : 'text-stone-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                currentStep === 2 ? 'bg-amber-600 text-white' : 'bg-stone-200 text-stone-600'
              }`}>
                2
              </span>
              <span>2. Payment & Gateways</span>
            </div>
          </div>
        </div>

        {/* Two-Column Checkout Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form Area */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Customer Contact & Nigerian Address */}
            {currentStep === 1 && (
              <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 space-y-5 shadow-xs">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <h2 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-amber-600" />
                    <span>Contact & Nigerian Delivery Destination</span>
                  </h2>
                  <span className="text-[10px] text-stone-400 font-mono">Step 1 of 2</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customer.fullName}
                      onChange={(e) => handleCustomerChange('fullName', e.target.value)}
                      placeholder="e.g. Adeyemi Babatunde"
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs text-stone-900 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-stone-700 block mb-1">
                      Corporate Company Name (Optional for Invoicing)
                    </label>
                    <input
                      type="text"
                      value={customer.companyName || ''}
                      onChange={(e) => handleCustomerChange('companyName', e.target.value)}
                      placeholder="e.g. Leadway Assurance / Access Holdings"
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs text-stone-900 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-stone-700 block mb-1">
                      Email Address (For Invoices & Pre-Press Proofs) *
                    </label>
                    <input
                      type="email"
                      required
                      value={customer.email}
                      onChange={(e) => handleCustomerChange('email', e.target.value)}
                      placeholder="babatunde@company.ng"
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs text-stone-900 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-stone-700 block mb-1">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customer.phone}
                      onChange={(e) => handleCustomerChange('phone', e.target.value)}
                      placeholder="+234 803 000 0000"
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs text-stone-900 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-bold text-stone-700 block mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={customer.deliveryAddress}
                      onChange={(e) => handleCustomerChange('deliveryAddress', e.target.value)}
                      placeholder="e.g. Plot 14 Commercial Avenue, Somolu"
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs text-stone-900 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-bold text-stone-700 block mb-1">
                      Landmark / Nearest Bus Stop (Crucial for Dispatch Riders) *
                    </label>
                    <input
                      type="text"
                      required
                      value={customer.landmark || ''}
                      onChange={(e) => handleCustomerChange('landmark', e.target.value)}
                      placeholder="e.g. Beside First Bank Somolu, Near Ikeja City Mall"
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs text-stone-900 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-stone-700 block mb-1">
                      Destination Shipping Zone *
                    </label>
                    <select
                      value={shippingZoneId}
                      onChange={(e) => setShippingZoneId(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs font-semibold text-stone-900 focus:ring-2 focus:ring-amber-500"
                    >
                      {NIGERIAN_SHIPPING_ZONES.map((z) => (
                        <option key={z.id} value={z.id}>
                          {z.name} ({z.region}) — {formatNaira(z.baseFeeNgn)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-stone-700 block mb-1">
                      City & State
                    </label>
                    <input
                      type="text"
                      value={customer.city + ', ' + customer.state}
                      onChange={(e) => handleCustomerChange('city', e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs text-stone-900 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* Dispatch Speed Toggle */}
                {selectedZone.expressAvailable && (
                  <div className="pt-3 border-t border-stone-100">
                    <label className="p-3.5 rounded-2xl border bg-stone-50 flex items-center justify-between cursor-pointer hover:border-amber-400 transition-colors">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isExpress}
                          onChange={(e) => setIsExpress(e.target.checked)}
                          className="h-4 w-4 rounded text-amber-600 focus:ring-amber-500"
                        />
                        <div>
                          <span className="text-xs font-bold text-stone-900 block">
                            Upgrade to Same-Day / Next-Day Priority Courier
                          </span>
                          <span className="text-[11px] text-stone-500">
                            Guaranteed priority press queue and dedicated dispatch rider.
                          </span>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold text-amber-800">
                        {formatNaira(selectedZone.expressFeeNgn!)}
                      </span>
                    </label>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="w-full py-4 px-6 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-600/20 transition-all"
                  >
                    <span>Proceed to Payment Gateways</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Payment Gateway Selection */}
            {currentStep === 2 && (
              <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 space-y-6 shadow-xs">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <h2 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-amber-600" />
                    <span>Select Payment Gateway (Nigerian Banking Channels)</span>
                  </h2>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-xs text-stone-500 hover:text-stone-900 font-medium"
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
                        ? 'border-[#0BA4DB] bg-sky-50/70 ring-2 ring-[#0BA4DB]/20 shadow-xs'
                        : 'border-stone-200 bg-stone-50 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="gateway"
                        checked={paymentGateway === 'paystack'}
                        onChange={() => setPaymentGateway('paystack')}
                        className="text-[#0BA4DB] focus:ring-[#0BA4DB]"
                      />
                      <div>
                        <div className="text-xs font-bold text-stone-900 flex items-center gap-2">
                          <span>Paystack Checkout</span>
                          <span className="bg-[#0BA4DB] text-white text-[9px] px-1.5 py-0.5 rounded font-black">
                            POPULAR
                          </span>
                        </div>
                        <div className="text-[11px] text-stone-500">
                          Verve, Mastercard, Visa, Direct Bank Transfer & USSD (*737#, *966#).
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
                        ? 'border-[#FB9129] bg-amber-50/70 ring-2 ring-[#FB9129]/20 shadow-xs'
                        : 'border-stone-200 bg-stone-50 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="gateway"
                        checked={paymentGateway === 'flutterwave'}
                        onChange={() => setPaymentGateway('flutterwave')}
                        className="text-[#FB9129] focus:ring-[#FB9129]"
                      />
                      <div>
                        <div className="text-xs font-bold text-stone-900">
                          Flutterwave / Rave
                        </div>
                        <div className="text-[11px] text-stone-500">
                          Card, Barter, Mobile Money & Virtual Accounts.
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
                        ? 'border-stone-900 bg-stone-100 ring-2 ring-stone-900/20 shadow-xs'
                        : 'border-stone-200 bg-stone-50 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="gateway"
                        checked={paymentGateway === 'bank_transfer'}
                        onChange={() => setPaymentGateway('bank_transfer')}
                        className="text-stone-900 focus:ring-stone-900"
                      />
                      <div>
                        <div className="text-xs font-bold text-stone-900">
                          Direct Corporate Bank Transfer / Invoice
                        </div>
                        <div className="text-[11px] text-stone-500">
                          Pay directly to Titan Trust or GTBank corporate account. Recommended for enterprises.
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-stone-700">
                      Proforma Invoice
                    </span>
                  </label>
                </div>

                {/* Bank details if direct transfer */}
                {paymentGateway === 'bank_transfer' && (
                  <div className="bg-stone-100 border border-stone-300 rounded-2xl p-4 space-y-2 text-xs">
                    <div className="font-bold text-stone-900">
                      Silver &amp; Gold Inkshine Ltd — Corporate Accounts:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-700">
                      <div className="p-2.5 bg-white rounded-xl border border-stone-200">
                        <strong className="block text-stone-900">GTBank Corporate:</strong>
                        <span className="font-mono text-sm font-bold text-stone-900">0123456789</span>
                        <div className="text-[10px] text-stone-500">Silver &amp; Gold Inkshine Ltd</div>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-stone-200">
                        <strong className="block text-stone-900">Titan Trust Bank:</strong>
                        <span className="font-mono text-sm font-bold text-stone-900">1009823412</span>
                        <div className="text-[10px] text-stone-500">Silver &amp; Gold Inkshine Ltd</div>
                      </div>
                    </div>
                    <p className="text-[11px] text-stone-500 pt-1">
                      Please use your full name or Order No. as the transfer narration for immediate automated matching.
                    </p>
                  </div>
                )}

                {/* Primary Trigger Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleStartPayment}
                    className="w-full py-4 px-6 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-amber-600/30 transition-all"
                  >
                    <Lock className="w-4 h-4" />
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
            <div className="bg-white rounded-3xl border border-stone-200 p-6 space-y-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <span className="text-xs font-bold text-stone-900">
                  Order Items ({cartItems.length})
                </span>
                <button
                  onClick={onBackToCart}
                  className="text-xs font-semibold text-amber-700 hover:text-amber-800"
                >
                  Modify Cart
                </button>
              </div>

              <div className="divide-y divide-stone-100 max-h-72 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="py-3 flex gap-3 text-xs">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-14 h-14 rounded-xl object-cover border border-stone-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-stone-900 truncate">
                        {item.product.name}
                      </div>
                      <div className="text-[11px] text-stone-500">
                        Qty: {item.quantity} • {formatNaira(item.unitPriceNgn)}/unit
                      </div>
                      <div className="text-[10px] text-stone-400 mt-0.5 truncate">
                        Artwork: {item.artworkType.replace('_', ' ').toUpperCase()}
                      </div>
                    </div>
                    <div className="text-right font-mono font-bold text-stone-900">
                      {formatNaira(item.totalPriceNgn)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Input */}
              <form onSubmit={handleApplyCoupon} className="pt-2 border-t border-stone-100 space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Coupon (e.g. LAGOSPRINT10)"
                      className="w-full pl-8 pr-2.5 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs uppercase font-mono font-bold text-stone-900 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold"
                  >
                    Apply
                  </button>
                </div>

                {appliedDiscountPercent > 0 && (
                  <div className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Corporate discount applied ({appliedDiscountPercent}% OFF)!</span>
                  </div>
                )}

                {couponError && (
                  <div className="text-[11px] text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{couponError}</span>
                  </div>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="pt-3 border-t border-stone-100 space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Print Items Subtotal:</span>
                  <span className="font-mono text-stone-900">{formatNaira(itemsSubtotalNgn)}</span>
                </div>

                {discountNgn > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Promo Code Discount:</span>
                    <span className="font-mono">-{formatNaira(discountNgn)}</span>
                  </div>
                )}

                <div className="flex justify-between text-stone-600">
                  <span>
                    Logistics Delivery ({selectedZone.name}{isExpress ? ' • Priority' : ''}):
                  </span>
                  <span className="font-mono text-stone-900">{formatNaira(shippingFeeNgn)}</span>
                </div>

                <div className="flex justify-between text-stone-600">
                  <span>VAT (7.5% Nigerian Statutory):</span>
                  <span className="font-mono text-stone-900">{formatNaira(vatNgn)}</span>
                </div>

                <div className="pt-3 border-t border-stone-200 flex justify-between text-base font-black text-stone-900">
                  <span>Total Due:</span>
                  <span className="font-mono text-amber-700 text-lg">
                    {formatNaira(grandTotalNgn)}
                  </span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-around text-[10px] text-stone-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Press</span>
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-amber-600" />
                  <span>36 States Delivery</span>
                </span>
                <span className="flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-sky-600" />
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
