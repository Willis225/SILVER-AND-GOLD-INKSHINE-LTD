import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  Printer, 
  Truck, 
  Package, 
  AlertCircle, 
  ExternalLink, 
  Phone, 
  Mail, 
  MapPin, 
  Building2, 
  FileText, 
  Download, 
  ShieldCheck, 
  Send, 
  Edit3, 
  Check, 
  RefreshCw,
  Copy,
  Layers,
  Sparkles
} from 'lucide-react';
import { Order, OrderStatus, PaymentStatus } from '../../types/schema';

interface OrderDetailDrawerProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  onUpdatePaymentStatus: (orderId: string, newPaymentStatus: PaymentStatus) => void;
  onUpdateTrackingNumber: (orderId: string, trackingNumber: string) => void;
  onUpdateProductionNotes: (orderId: string, notes: string) => void;
}

const ORDER_STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; bg: string; border: string; icon: any }> = {
  pending_payment: {
    label: 'Pending Payment',
    color: 'text-amber-800',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: Clock,
  },
  artwork_review: {
    label: 'Pre-Press Review',
    color: 'text-indigo-800',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    icon: FileText,
  },
  prepress_approved: {
    label: 'Pre-Press Approved',
    color: 'text-teal-800',
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    icon: CheckCircle2,
  },
  in_production: {
    label: 'In Production (Printing)',
    color: 'text-blue-800',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: Printer,
  },
  ready_for_dispatch: {
    label: 'Ready for Dispatch / QC Passed',
    color: 'text-amber-800',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: Package,
  },
  out_for_delivery: {
    label: 'Dispatched / In Transit',
    color: 'text-purple-800',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    icon: Truck,
  },
  delivered: {
    label: 'Delivered to Client',
    color: 'text-stone-800',
    bg: 'bg-stone-100',
    border: 'border-stone-300',
    icon: CheckCircle2,
  },
  cancelled: {
    label: 'Cancelled / Refunded',
    color: 'text-red-800',
    bg: 'bg-red-50',
    border: 'border-red-200',
    icon: AlertCircle,
  },
};

const COURIER_OPTIONS = [
  'Express Dispatch',
  'GIG Logistics Air Cargo (Abuja/PH/Enugu)',
  'DHL Express Priority Nigeria',
  'Red Star Express / FedEx',
  'Customer Pickup at Yenagoa Press Complex',
];

export const OrderDetailDrawer: React.FC<OrderDetailDrawerProps> = ({
  order,
  isOpen,
  onClose,
  onUpdateOrderStatus,
  onUpdatePaymentStatus,
  onUpdateTrackingNumber,
  onUpdateProductionNotes,
}) => {
  if (!isOpen || !order) return null;

  const [notes, setNotes] = useState(order.productionNotes || '');
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [trackingInput, setTrackingInput] = useState(order.trackingNumber || '');
  const [selectedCourier, setSelectedCourier] = useState(COURIER_OPTIONS[0]);
  const [copiedRef, setCopiedRef] = useState(false);

  // Pre-press interactive inspection state
  const [prepressChecklist, setPrepressChecklist] = useState({
    resolutionPassed: true,
    bleedPassed: true,
    cmykPassed: true,
    fontsOutlined: true,
  });

  const handleCopyRef = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handleSaveNotes = () => {
    onUpdateProductionNotes(order.id, notes);
    setIsEditingNotes(false);
  };

  const handleSaveTracking = () => {
    onUpdateTrackingNumber(order.id, trackingInput);
  };

  // WhatsApp Client Notification Generator
  const generateWhatsAppMessage = () => {
    const customerFirstName = order.customer.fullName.split(' ')[0] || 'Valued Client';
    const currentStatusText = ORDER_STATUS_CONFIG[order.orderStatus]?.label || order.orderStatus;
    
    let message = `Hello ${customerFirstName}! This is SILVER & GOLD INKSHINE LTD regarding your order *${order.orderNumber}* (${order.items.map(i => `${i.quantity}x ${i.productName}`).join(', ')}).\n\n`;
    
    if (order.orderStatus === 'artwork_review') {
      message += `🔍 *Pre-Press Update*: Our pre-press graphics team has audited your artwork file. Resolution: 300 DPI CMYK verified. Everything looks great for the wide-format press!`;
    } else if (order.orderStatus === 'in_production') {
      message += `🖨️ *Production Update*: Your order is currently on our high-definition wide-format digital press (1440 DPI Solite Satin). We will finish trimming and aluminum cassette mounting shortly.`;
    } else if (order.orderStatus === 'ready_for_dispatch') {
      message += `📦 *Quality Inspection Passed*: Your banner(s) have passed final QC inspection and are securely packed in their padded carrying bags, ready for courier pickup!`;
    } else if (order.orderStatus === 'out_for_delivery') {
      message += `🚚 *Dispatch Notice*: Your order is out for delivery with ${selectedCourier}. Waybill/Tracking: *${order.trackingNumber || 'Pending'}*. Estimated arrival: Today.`;
    } else if (order.orderStatus === 'delivered') {
      message += `🎉 *Delivery Confirmed*: Your order has been successfully delivered to ${order.customer.deliveryAddress}. Thank you for choosing SILVER & GOLD INKSHINE LTD!`;
    } else {
      message += `Current Status: *${currentStatusText}*.`;
    }

    const cleanPhone = order.customer.phone.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  // Flag issue WhatsApp
  const handleFlagArtworkIssue = () => {
    const customerFirstName = order.customer.fullName.split(' ')[0] || 'Client';
    const message = `Hello ${customerFirstName}, this is the Pre-Press Quality Desk at SILVER & GOLD INKSHINE LTD regarding order *${order.orderNumber}*.\n\n⚠️ We noticed an artwork specification issue with your uploaded design:\n- Please provide the file with a minimum of 50mm cassette bottom bleed or CMYK color profile.\n\nCould you kindly reply with an updated high-resolution PDF or AI file here so we can proceed to print without delay? Thank you!`;
    const cleanPhone = order.customer.phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const statusConfig = ORDER_STATUS_CONFIG[order.orderStatus] || ORDER_STATUS_CONFIG.artwork_review;
  const StatusIcon = statusConfig.icon;

  const STATUS_STEPS: OrderStatus[] = [
    'pending_payment',
    'artwork_review',
    'in_production',
    'ready_for_dispatch',
    'out_for_delivery',
    'delivered',
  ];

  const currentStepIdx = STATUS_STEPS.indexOf(order.orderStatus);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden border-l border-stone-200 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-200 bg-stone-50/70 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold font-mono text-stone-900">{order.orderNumber}</span>
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusConfig.bg} ${statusConfig.color} ${statusConfig.border}`}>
                <StatusIcon className="w-3.5 h-3.5" />
                {statusConfig.label}
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              Received {new Date(order.createdAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-200/60 transition-colors"
              title="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Quick Action Bar */}
          <div className="bg-amber-500/10 border border-amber-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-amber-900 uppercase tracking-wide">Customer Direct Dispatch & WhatsApp Desk</p>
              <p className="text-xs text-amber-800 mt-0.5">Send instant pre-press approval, print progress, or rider tracking directly to WhatsApp.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={generateWhatsAppMessage}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#b8860b] hover:bg-[#996515] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Notify Client on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Status Stepper Progression */}
          <div className="bg-white border border-stone-200 rounded-xl p-4">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3">Order Production Pipeline</h4>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
              {STATUS_STEPS.map((stepKey, idx) => {
                const conf = ORDER_STATUS_CONFIG[stepKey];
                const isCurrent = order.orderStatus === stepKey;
                const isPassed = currentStepIdx > idx;

                return (
                  <button
                    key={stepKey}
                    onClick={() => onUpdateOrderStatus(order.id, stepKey)}
                    className={`p-2 text-center rounded-lg text-[11px] font-medium transition-all flex flex-col items-center justify-between border ${
                      isCurrent
                        ? 'bg-amber-50 border-amber-500 text-amber-900 font-bold ring-2 ring-amber-400/20'
                        : isPassed
                        ? 'bg-amber-50 border-amber-300 text-amber-800 hover:bg-amber-100/60'
                        : 'bg-stone-50 border-stone-200 text-stone-500 hover:bg-stone-100'
                    }`}
                  >
                    <span className="text-[10px] mb-1 font-mono">Step {idx + 1}</span>
                    <span className="leading-tight">{conf.label.split('/')[0]}</span>
                    {isCurrent && <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-500" />}
                    {isPassed && <Check className="w-3 h-3 text-amber-600 mt-1" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Customer & Delivery Information */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-stone-600" />
              Customer & Corporate Profile
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-stone-500 block">Contact Name:</span>
                <span className="font-semibold text-stone-900 text-sm">{order.customer.fullName}</span>
                {order.customer.companyName && (
                  <span className="block text-amber-700 font-medium">{order.customer.companyName}</span>
                )}
              </div>
              <div>
                <span className="text-stone-500 block">Contact Channels:</span>
                <div className="flex items-center gap-1 text-stone-800 mt-0.5">
                  <Phone className="w-3.5 h-3.5 text-stone-400" />
                  <a href={`tel:${order.customer.phone}`} className="hover:underline">{order.customer.phone}</a>
                </div>
                <div className="flex items-center gap-1 text-stone-800 mt-0.5">
                  <Mail className="w-3.5 h-3.5 text-stone-400" />
                  <a href={`mailto:${order.customer.email}`} className="hover:underline truncate">{order.customer.email}</a>
                </div>
              </div>

              <div className="sm:col-span-2 border-t border-stone-200/80 pt-2">
                <span className="text-stone-500 block">Delivery Address & Landmark:</span>
                <p className="font-medium text-stone-800 flex items-start gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    {order.customer.deliveryAddress}, {order.customer.city}, {order.customer.state}
                  </span>
                </p>
                {order.customer.landmark && (
                  <p className="text-[11px] text-stone-500 ml-4.5 mt-0.5">
                    <span className="font-semibold text-stone-600">Landmark / Bus Stop:</span> {order.customer.landmark}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Ordered Products & Selected Specs */}
          <div className="border border-stone-200 rounded-xl overflow-hidden">
            <div className="bg-stone-100/80 px-4 py-2.5 border-b border-stone-200 flex items-center justify-between">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-stone-600" />
                Ordered Items ({order.items.length})
              </h4>
              <span className="text-xs font-semibold text-stone-700">
                Qty Total: {order.items.reduce((sum, item) => sum + item.quantity, 0)} units
              </span>
            </div>

            <div className="divide-y divide-stone-100">
              {order.items.map((item) => (
                <div key={item.id} className="p-4 flex flex-col sm:flex-row items-start gap-4">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-16 h-16 rounded-lg object-cover bg-stone-100 border border-stone-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h5 className="font-bold text-stone-900 text-sm">{item.productName}</h5>
                      <span className="font-mono font-bold text-stone-900 text-sm whitespace-nowrap">
                        ₦{item.totalPriceNgn.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 my-2">
                      <span className="px-2 py-0.5 bg-stone-100 text-stone-700 rounded text-[11px] font-semibold">
                        Qty: {item.quantity}
                      </span>
                      <span className="px-2 py-0.5 bg-stone-100 text-stone-700 rounded text-[11px]">
                        ₦{item.unitPriceNgn.toLocaleString()} / unit
                      </span>
                      {item.turnaroundEstimate && (
                        <span className="px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded text-[11px]">
                          ⚡ {item.turnaroundEstimate}
                        </span>
                      )}
                    </div>

                    {item.selectedOptions && item.selectedOptions.length > 0 && (
                      <div className="bg-stone-50 rounded-lg p-2 text-xs space-y-0.5 border border-stone-200/60">
                        {item.selectedOptions.map((opt, oIdx) => (
                          <div key={oIdx} className="text-stone-600 flex items-center justify-between">
                            <span className="text-stone-400">{opt.groupName}:</span>
                            <span className="font-medium text-stone-800">{opt.optionName}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Pre-Press File Inspection Card */}
                    {item.artwork && (
                      <div className="mt-3 bg-indigo-50/60 border border-indigo-200 rounded-lg p-3">
                        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                          <div className="flex items-center gap-1.5">
                            <FileText className="w-4 h-4 text-indigo-700" />
                            <span className="text-xs font-bold text-indigo-900">
                              Uploaded Artwork Proof:
                            </span>
                            <span className="uppercase text-[10px] font-bold px-1.5 py-0.5 bg-indigo-200 text-indigo-800 rounded">
                              {item.artwork.fileFormat || 'PDF'}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => alert(`Simulating secure download of print file: ${item.artwork.fileName || 'Artwork_Print_Ready.pdf'}`)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-semibold shadow-xs transition-colors"
                            >
                              <Download className="w-3 h-3" />
                              <span>Download Master File</span>
                            </button>
                          </div>
                        </div>

                        <p className="text-xs font-mono text-indigo-950 truncate font-semibold">
                          {item.artwork.fileName || 'Direct_Upload_Print_Ready.pdf'}
                        </p>

                        {item.artwork.fileSizeMb && (
                          <p className="text-[11px] text-indigo-700 mt-0.5">
                            File Size: {item.artwork.fileSizeMb} MB • CMYK High-Res Rasterized
                          </p>
                        )}

                        {item.artwork.notes && (
                          <p className="text-xs text-indigo-800 bg-white/70 p-2 rounded mt-2 border border-indigo-100 italic">
                            "{item.artwork.notes}"
                          </p>
                        )}

                        {/* Interactive Pre-press Checklist */}
                        <div className="mt-3 pt-2 border-t border-indigo-200/80">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[11px] font-bold text-indigo-900 uppercase">Pre-Press Flight Check</span>
                            <button
                              onClick={handleFlagArtworkIssue}
                              className="text-[11px] text-amber-700 hover:text-amber-800 font-semibold underline"
                            >
                              Flag Issue to Customer
                            </button>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <label className="flex items-center gap-1.5 text-stone-700 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={prepressChecklist.resolutionPassed}
                                onChange={(e) => setPrepressChecklist(prev => ({ ...prev, resolutionPassed: e.target.checked }))}
                                className="rounded text-indigo-600 focus:ring-indigo-500"
                              />
                              <span>≥300 DPI Resolution</span>
                            </label>

                            <label className="flex items-center gap-1.5 text-stone-700 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={prepressChecklist.bleedPassed}
                                onChange={(e) => setPrepressChecklist(prev => ({ ...prev, bleedPassed: e.target.checked }))}
                                className="rounded text-indigo-600 focus:ring-indigo-500"
                              />
                              <span>+50mm Cassette Bleed</span>
                            </label>

                            <label className="flex items-center gap-1.5 text-stone-700 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={prepressChecklist.cmykPassed}
                                onChange={(e) => setPrepressChecklist(prev => ({ ...prev, cmykPassed: e.target.checked }))}
                                className="rounded text-indigo-600 focus:ring-indigo-500"
                              />
                              <span>CMYK Color Profile</span>
                            </label>

                            <label className="flex items-center gap-1.5 text-stone-700 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={prepressChecklist.fontsOutlined}
                                onChange={(e) => setPrepressChecklist(prev => ({ ...prev, fontsOutlined: e.target.checked }))}
                                className="rounded text-indigo-600 focus:ring-indigo-500"
                              />
                              <span>Fonts Outlined / Curves</span>
                            </label>
                          </div>

                          <button
                            onClick={() => {
                              onUpdateOrderStatus(order.id, 'in_production');
                              alert('Artwork approved! Order moved to In Production (Printing Press Queue).');
                            }}
                            className="mt-3 w-full py-1.5 bg-[#b8860b] hover:bg-[#996515] text-white rounded text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                          >
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Approve Proof & Release to Press Floor</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financials & Payment Gateway Details */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">Financial Breakdown & Payment</h4>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal:</span>
                <span className="font-mono">₦{order.subtotalNgn.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Interstate / Local Delivery Fee:</span>
                <span className="font-mono">₦{order.shippingFeeNgn.toLocaleString()}</span>
              </div>
              {order.discountNgn > 0 && (
                <div className="flex justify-between text-[#b8860b] font-medium">
                  <span>Corporate Discount:</span>
                  <span className="font-mono">-₦{order.discountNgn.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600">
                <span>Statutory Nigerian VAT (7.5%):</span>
                <span className="font-mono">
                  ₦{(Math.round((order.subtotalNgn - order.discountNgn) * 0.075)).toLocaleString()}
                </span>
              </div>
              <div className="border-t border-stone-200 pt-1.5 flex justify-between text-sm font-bold text-stone-900">
                <span>Grand Total Settled:</span>
                <span className="font-mono text-base text-amber-700">₦{order.grandTotalNgn.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-stone-200/80 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-500">Gateway:</span>
                <span className="px-2 py-0.5 bg-stone-200 text-stone-800 rounded font-semibold text-xs uppercase">
                  {order.paymentGateway}
                </span>
                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                  order.paymentStatus === 'paid' ? 'bg-amber-100 text-amber-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {order.paymentStatus === 'paid' ? 'PAID / SETTLED' : 'PENDING WIRE'}
                </span>
              </div>

              {order.paymentStatus === 'pending' && (
                <button
                  onClick={() => onUpdatePaymentStatus(order.id, 'paid')}
                  className="px-2.5 py-1 bg-[#b8860b] hover:bg-[#996515] text-white rounded text-xs font-semibold shadow-xs"
                >
                  Mark Wire Confirmed
                </button>
              )}

              {order.paymentReference && (
                <div className="flex items-center gap-1 text-[11px] text-stone-500 font-mono">
                  <span>Ref: {order.paymentReference}</span>
                  <button 
                    onClick={() => handleCopyRef(order.paymentReference!)} 
                    className="p-1 hover:text-stone-800"
                    title="Copy Reference"
                  >
                    {copiedRef ? <Check className="w-3 h-3 text-amber-600" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Dispatch, Courier & Logistics Assignment */}
          <div className="bg-white border border-stone-200 rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-purple-600" />
              Dispatch Logistics & Waybill Tracking
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-stone-500 mb-1">Assigned Courier Partner:</label>
                <select
                  value={selectedCourier}
                  onChange={(e) => setSelectedCourier(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs text-stone-800 focus:ring-1 focus:ring-amber-500"
                >
                  {COURIER_OPTIONS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-stone-500 mb-1">Waybill / Tracking Number:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={trackingInput}
                    onChange={(e) => setTrackingInput(e.target.value)}
                    placeholder="e.g. GIG-LOS-849201"
                    className="flex-1 bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs text-stone-800 font-mono uppercase"
                  />
                  <button
                    onClick={handleSaveTracking}
                    className="px-2.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-white rounded-lg text-xs font-semibold"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                onClick={() => {
                  onUpdateOrderStatus(order.id, 'out_for_delivery');
                  alert(`Order marked as Dispatched with ${selectedCourier}!`);
                }}
                className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5"
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Mark as Dispatched to Courier</span>
              </button>
            </div>
          </div>

          {/* Internal Production Notes */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Internal Press Floor Notes</h4>
              {!isEditingNotes ? (
                <button
                  onClick={() => setIsEditingNotes(true)}
                  className="text-xs text-amber-700 hover:text-amber-800 font-semibold flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3" />
                  Edit Notes
                </button>
              ) : (
                <button
                  onClick={handleSaveNotes}
                  className="text-xs text-amber-700 hover:text-amber-800 font-semibold flex items-center gap-1"
                >
                  <Check className="w-3 h-3" />
                  Save Notes
                </button>
              )}
            </div>

            {isEditingNotes ? (
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full bg-white border border-stone-300 rounded-lg p-2 text-xs text-stone-800 focus:ring-1 focus:ring-amber-500"
                placeholder="e.g., Use Solite roll #4, customer wants urgent early morning dispatch..."
              />
            ) : (
              <p className="text-xs text-stone-700 bg-white border border-stone-200/80 p-2.5 rounded-lg italic">
                {notes || 'No specific production notes recorded yet.'}
              </p>
            )}
          </div>
        </div>

        {/* Footer with Printable Job Ticket Trigger */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between gap-3">
          <button
            onClick={() => window.print()}
            className="px-3 py-2 bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-4 h-4 text-stone-600" />
            <span>Print Shop Floor Job Ticket</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
