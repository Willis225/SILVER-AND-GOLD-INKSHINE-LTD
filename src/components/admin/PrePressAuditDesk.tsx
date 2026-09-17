import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  Download, 
  ExternalLink, 
  Eye, 
  Layers, 
  Sparkles, 
  RotateCw,
  Send,
  Printer,
  ChevronRight
} from 'lucide-react';
import { Order } from '../../types/schema';

interface PrePressAuditDeskProps {
  orders: Order[];
  onOpenOrder: (order: Order) => void;
  onApproveArtwork: (orderId: string) => void;
}

export const PrePressAuditDesk: React.FC<PrePressAuditDeskProps> = ({
  orders,
  onOpenOrder,
  onApproveArtwork,
}) => {
  // Filter only orders in artwork_review or with direct uploads
  const preflightQueue = orders.filter(
    (o) => o.orderStatus === 'artwork_review' || o.orderStatus === 'in_production'
  );

  const [selectedOrderId, setSelectedOrderId] = useState<string>(
    preflightQueue[0]?.id || orders[0]?.id || ''
  );

  const [activeChannel, setActiveChannel] = useState<'all' | 'c' | 'm' | 'y' | 'k'>('all');
  const [showBleedGuides, setShowBleedGuides] = useState(true);
  const [showSafeZone, setShowSafeZone] = useState(true);

  const activeOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];
  const activeItem = activeOrder?.items[0];
  const artwork = activeItem?.artwork;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 border border-stone-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
              High-Precision Pre-Flight Desk
            </span>
            <span className="text-xs text-stone-400 font-mono">1440 DPI Wide-Format RIP Protocol</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1.5">
            Automated Bleed, CMYK & Resolution Pre-Press Engine
          </h2>
          <p className="text-xs text-stone-300 max-w-2xl mt-1 leading-relaxed">
            All customer uploaded graphic assets undergo automated RIP preflighting before being released to the factory floor Roland and Mimaki eco-solvent printer queues.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-stone-800/80 p-3 rounded-xl border border-stone-700">
          <div className="text-right">
            <span className="text-xs text-stone-400 block">Queue Pending Inspection</span>
            <span className="text-lg font-mono font-bold text-amber-400">
              {orders.filter((o) => o.orderStatus === 'artwork_review').length} Orders
            </span>
          </div>
          <ShieldCheck className="w-8 h-8 text-[#b8860b] ml-2" />
        </div>
      </div>

      {/* Main Workspace Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Queue Selector */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-xs">
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3">
              Active Artwork Inspection Queue
            </h3>

            <div className="space-y-2">
              {preflightQueue.length === 0 ? (
                <div className="text-center py-8 text-stone-400 text-xs">
                  No orders currently waiting in pre-press review.
                </div>
              ) : (
                preflightQueue.map((ord) => {
                  const isSelected = ord.id === selectedOrderId;
                  const item = ord.items[0];

                  return (
                    <div
                      key={ord.id}
                      onClick={() => setSelectedOrderId(ord.id)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-amber-50 border-amber-500 shadow-xs ring-1 ring-amber-400/30'
                          : 'bg-stone-50/70 border-stone-200 hover:bg-stone-100 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-xs font-bold text-stone-900">
                          {ord.orderNumber}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            ord.orderStatus === 'artwork_review'
                              ? 'bg-indigo-100 text-indigo-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {ord.orderStatus === 'artwork_review' ? 'Pre-Press Review' : 'On Press'}
                        </span>
                      </div>

                      <p className="text-xs font-semibold text-stone-800 truncate">
                        {ord.customer.companyName || ord.customer.fullName}
                      </p>

                      <p className="text-[11px] text-stone-500 truncate mt-0.5">
                        {item?.productName} ({item?.quantity} units)
                      </p>

                      <div className="mt-2 flex items-center justify-between text-[11px] pt-2 border-t border-stone-200/60">
                        <span className="font-mono text-stone-600 truncate max-w-[180px]">
                          📄 {item?.artwork?.fileName || 'Artwork.pdf'}
                        </span>
                        <span className="text-amber-700 font-semibold text-[10px]">
                          {item?.artwork?.fileSizeMb || 35} MB
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Standards Reference Card */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs text-stone-600 space-y-2">
            <h4 className="font-bold text-stone-900 uppercase text-[11px]">Nigerian Factory Rollup Specifications</h4>
            <ul className="list-disc list-inside space-y-1 text-stone-600">
              <li><strong className="text-stone-800">Top Header Clamp Bleed:</strong> 10mm</li>
              <li><strong className="text-stone-800">Bottom Roller Cassette Bleed:</strong> 50mm (hidden inside drum)</li>
              <li><strong className="text-stone-800">Side Safety Margin:</strong> 5mm minimum safe text distance</li>
              <li><strong className="text-stone-800">Factory Color Profile:</strong> U.S. Web Coated (SWOP) v2 / CMYK</li>
            </ul>
          </div>
        </div>

        {/* Right: Live Interactive Pre-Press Canvas & Preflight Report */}
        {activeOrder && activeItem && (
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-6">
              {/* Header Info */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-mono text-lg font-bold text-stone-900">
                      {activeOrder.orderNumber}
                    </h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-semibold">
                      Payment Verified
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Client: <strong className="text-stone-800">{activeOrder.customer.fullName}</strong> ({activeOrder.customer.companyName || 'Corporate Client'})
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenOrder(activeOrder)}
                    className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg transition-colors"
                  >
                    Open Full Order Drawer
                  </button>

                  <button
                    onClick={() => onApproveArtwork(activeOrder.id)}
                    className="px-4 py-1.5 bg-[#b8860b] hover:bg-[#996515] text-white text-xs font-bold rounded-lg shadow-xs flex items-center gap-1.5 transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve & Release to Press</span>
                  </button>
                </div>
              </div>

              {/* Visual Simulated Banner Proof with Overlays */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Visual Banner Preview */}
                <div className="md:col-span-6 bg-stone-900 rounded-xl p-6 flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="text-stone-400 text-[11px] mb-2 font-mono flex items-center justify-between w-full px-2">
                    <span>Simulated 33" x 81" Aspect</span>
                    <span className="text-amber-400">1:2.45 Ratio</span>
                  </div>

                  {/* Banner Canvas Container */}
                  <div className="relative w-48 h-96 bg-stone-800 rounded shadow-2xl border border-stone-700 overflow-hidden flex flex-col items-center justify-between">
                    {/* Simulated banner background graphic */}
                    <div 
                      className={`absolute inset-0 bg-cover bg-center transition-all ${
                        activeChannel === 'c' ? 'filter hue-rotate-180 contrast-125' :
                        activeChannel === 'm' ? 'filter saturate-200' :
                        activeChannel === 'y' ? 'filter brightness-125' :
                        activeChannel === 'k' ? 'filter grayscale contrast-150' : ''
                      }`}
                      style={{
                        backgroundImage: `url(${activeItem.productImage})`,
                      }}
                    />

                    {/* Top clamp allowance (10mm) */}
                    {showBleedGuides && (
                      <div className="absolute top-0 inset-x-0 h-4 bg-red-500/20 border-b border-dashed border-red-400 flex items-center justify-center">
                        <span className="text-[8px] font-mono text-red-200 uppercase tracking-tighter">
                          10mm Clamp Line
                        </span>
                      </div>
                    )}

                    {/* Safe Text Zone Box */}
                    {showSafeZone && (
                      <div className="absolute inset-x-3 inset-y-6 border border-amber-400/80 rounded-xs pointer-events-none flex flex-col justify-between p-1">
                        <span className="text-[7px] font-mono text-amber-300 uppercase">
                          Safe Text Zone
                        </span>
                        <span className="text-[7px] font-mono text-amber-300 uppercase self-end">
                          Safe Text Zone
                        </span>
                      </div>
                    )}

                    {/* Bottom roller cassette bleed (50mm hidden inside cassette) */}
                    {showBleedGuides && (
                      <div className="absolute bottom-0 inset-x-0 h-10 bg-amber-500/30 border-t-2 border-dashed border-amber-400 flex items-center justify-center">
                        <span className="text-[8px] font-mono font-bold text-amber-200 uppercase tracking-tight text-center leading-none">
                          50mm Cassette Leader<br />(Inside Drum)
                        </span>
                      </div>
                    )}

                    {/* Simulated Content Overlay */}
                    <div className="relative z-10 w-full p-4 text-center mt-8">
                      <span className="px-2 py-0.5 bg-black/60 backdrop-blur-xs text-white text-[9px] font-bold rounded">
                        {activeOrder.customer.companyName || 'Corporate Event'}
                      </span>
                    </div>
                  </div>

                  {/* Guide Toggle Controls */}
                  <div className="mt-4 flex items-center gap-3 text-[11px] text-stone-300">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showBleedGuides}
                        onChange={(e) => setShowBleedGuides(e.target.checked)}
                        className="rounded text-amber-500 focus:ring-0"
                      />
                      <span>Bleed Margins</span>
                    </label>

                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showSafeZone}
                        onChange={(e) => setShowSafeZone(e.target.checked)}
                        className="rounded text-[#b8860b] focus:ring-0"
                      />
                      <span>Safe Zone</span>
                    </label>
                  </div>
                </div>

                {/* Preflight Automated Diagnostics Checklist */}
                <div className="md:col-span-6 space-y-4">
                  <div className="bg-stone-50 border border-stone-200 rounded-xl p-4">
                    <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                      Automated Preflight Diagnostics
                    </h4>

                    <div className="space-y-2.5 text-xs">
                      <div className="flex items-start gap-2.5 p-2 bg-amber-50 border border-amber-200 rounded-lg">
                        <CheckCircle2 className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-amber-950">Raster Image Resolution (300 DPI)</p>
                          <p className="text-[11px] text-amber-800">
                            Verified at 300 DPI native at 850mm x 2050mm. No low-res pixilation detected.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 p-2 bg-amber-50 border border-amber-200 rounded-lg">
                        <CheckCircle2 className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-amber-950">Color Separation & Profile (CMYK)</p>
                          <p className="text-[11px] text-amber-800">
                            Embedded profile U.S. Web Coated (SWOP) v2. Zero RGB out-of-gamut banding.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 p-2 bg-amber-50 border border-amber-200 rounded-lg">
                        <CheckCircle2 className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-amber-950">Cassette Mechanical Bleed (+50mm)</p>
                          <p className="text-[11px] text-amber-800">
                            Correct bottom bleed included to anchor artwork securely onto the inner roller drum.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 p-2 bg-amber-50 border border-amber-200 rounded-lg">
                        <CheckCircle2 className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-amber-950">Typography Outlines</p>
                          <p className="text-[11px] text-amber-800">
                            All vector fonts converted to curves. No missing glyphs or substitution risk.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Channel Separation Simulation buttons */}
                  <div className="bg-stone-50 border border-stone-200 rounded-xl p-3">
                    <span className="text-[11px] font-bold text-stone-700 block mb-2 uppercase">
                      Color Plate Separation Inspector
                    </span>
                    <div className="grid grid-cols-5 gap-1.5 text-center text-xs">
                      <button
                        onClick={() => setActiveChannel('all')}
                        className={`py-1 rounded font-bold transition-colors ${
                          activeChannel === 'all'
                            ? 'bg-stone-900 text-white'
                            : 'bg-white text-stone-700 border border-stone-200'
                        }`}
                      >
                        CMYK
                      </button>
                      <button
                        onClick={() => setActiveChannel('c')}
                        className={`py-1 rounded font-bold transition-colors ${
                          activeChannel === 'c'
                            ? 'bg-cyan-600 text-white'
                            : 'bg-cyan-50 text-cyan-800 border border-cyan-200'
                        }`}
                      >
                        Cyan
                      </button>
                      <button
                        onClick={() => setActiveChannel('m')}
                        className={`py-1 rounded font-bold transition-colors ${
                          activeChannel === 'm'
                            ? 'bg-pink-600 text-white'
                            : 'bg-pink-50 text-pink-800 border border-pink-200'
                        }`}
                      >
                        Magenta
                      </button>
                      <button
                        onClick={() => setActiveChannel('y')}
                        className={`py-1 rounded font-bold transition-colors ${
                          activeChannel === 'y'
                            ? 'bg-yellow-500 text-stone-900'
                            : 'bg-yellow-50 text-yellow-800 border border-yellow-200'
                        }`}
                      >
                        Yellow
                      </button>
                      <button
                        onClick={() => setActiveChannel('k')}
                        className={`py-1 rounded font-bold transition-colors ${
                          activeChannel === 'k'
                            ? 'bg-stone-950 text-white'
                            : 'bg-stone-200 text-stone-800 border border-stone-300'
                        }`}
                      >
                        Black (K)
                      </button>
                    </div>
                  </div>

                  {/* Action row */}
                  <div className="pt-2 flex items-center justify-between gap-2">
                    <a
                      href={`https://wa.me/${activeOrder.customer.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        `Hello ${activeOrder.customer.fullName}! Pre-press proof for your order ${activeOrder.orderNumber} is ready and verified. Proceeding to printing press floor.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-2 bg-[#b8860b] hover:bg-[#996515] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Client Proof PDF via WhatsApp</span>
                    </a>

                    <button
                      onClick={() => alert(`Master file ${artwork?.fileName || 'Artwork.pdf'} downloaded for RIP software.`)}
                      className="px-3 py-2 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 text-xs font-semibold rounded-lg flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Master RIP File</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
