import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  ArrowUpDown, 
  Eye, 
  CheckCircle2, 
  Clock, 
  Printer, 
  Truck, 
  Package, 
  AlertCircle, 
  ChevronRight, 
  ShieldCheck, 
  Layers, 
  TrendingUp, 
  CreditCard, 
  Building2, 
  Phone, 
  Download, 
  RefreshCw, 
  ArrowLeft,
  Sparkles,
  DollarSign,
  FileText
} from 'lucide-react';
import { Order, OrderStatus, PaymentStatus, Product } from '../../types/schema';
import { CompanyLogoMark } from '../common/CompanyLogo';
import { OrderDetailDrawer } from './OrderDetailDrawer';
import { PrePressAuditDesk } from './PrePressAuditDesk';
import { PressFloorQueue } from './PressFloorQueue';
import { ProductPricingManager } from './ProductPricingManager';

interface AdminDashboardProps {
  orders: Order[];
  products: Product[];
  onReturnToStorefront: () => void;
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  onUpdatePaymentStatus: (orderId: string, newPaymentStatus: PaymentStatus) => void;
  onUpdateTrackingNumber: (orderId: string, trackingNumber: string) => void;
  onUpdateProductionNotes: (orderId: string, notes: string) => void;
  onUpdateProduct: (productId: string, updates: Partial<Product>) => void;
}

type AdminTab = 'orders' | 'prepress' | 'press_floor' | 'pricing';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  orders,
  products,
  onReturnToStorefront,
  onUpdateOrderStatus,
  onUpdatePaymentStatus,
  onUpdateTrackingNumber,
  onUpdateProductionNotes,
  onUpdateProduct,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('orders');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [gatewayFilter, setGatewayFilter] = useState<'all' | 'paystack' | 'flutterwave' | 'bank_transfer'>('all');
  
  // Selected order for deep inspection drawer
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Compute live KPIs
  const totalGrossRevenueNgn = orders.reduce((sum, ord) => sum + (ord.paymentStatus === 'paid' ? ord.grandTotalNgn : 0), 0);
  const ordersInReview = orders.filter((o) => o.orderStatus === 'artwork_review').length;
  const ordersInProduction = orders.filter((o) => o.orderStatus === 'in_production').length;
  const ordersDispatched = orders.filter((o) => o.orderStatus === 'out_for_delivery' || o.orderStatus === 'ready_for_dispatch').length;

  // Filtered orders list
  const filteredOrders = orders.filter((ord) => {
    const matchesSearch = 
      ord.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.customer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ord.customer.companyName && ord.customer.companyName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      ord.customer.phone.includes(searchQuery);

    const matchesStatus = statusFilter === 'all' || ord.orderStatus === statusFilter;
    const matchesGateway = gatewayFilter === 'all' || ord.paymentGateway === gatewayFilter;

    return matchesSearch && matchesStatus && matchesGateway;
  });

  const handleOpenDrawer = (order: Order) => {
    setSelectedOrder(order);
    setIsDrawerOpen(true);
  };

  const handleAdvanceOrderStatus = (orderId: string) => {
    const target = orders.find((o) => o.id === orderId);
    if (!target) return;

    const pipeline: OrderStatus[] = [
      'pending_payment',
      'artwork_review',
      'in_production',
      'ready_for_dispatch',
      'out_for_delivery',
      'delivered',
    ];

    const currentIdx = pipeline.indexOf(target.orderStatus);
    if (currentIdx !== -1 && currentIdx < pipeline.length - 1) {
      const nextStatus = pipeline[currentIdx + 1];
      onUpdateOrderStatus(orderId, nextStatus);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100/70 text-stone-900 pb-20">
      {/* Top Admin Navigation Header */}
      <header className="bg-stone-950 text-stone-100 border-b border-stone-800 sticky top-7 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onReturnToStorefront}
              className="px-2.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Storefront</span>
            </button>

            <div className="h-4 w-px bg-stone-700" />

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 shrink-0">
                <CompanyLogoMark className="w-full h-full" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm sm:text-base tracking-tight text-white">
                    Silver &amp; Gold Inkshine Pressmaster Command Desk
                  </span>
                  <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold rounded-full">
                    Stage 5 Live
                  </span>
                </div>
                <p className="text-[11px] text-stone-400 hidden sm:block">
                  Centralized Nigerian Operations: Somolu Factory Floor, Ikeja Distribution & Pre-Press Proofing
                </p>
              </div>
            </div>
          </div>

          {/* Quick tab switcher */}
          <div className="flex items-center gap-1.5 bg-stone-900 p-1 rounded-xl border border-stone-800">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'orders'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Orders Desk ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('prepress')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'prepress'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Pre-Press Audit ({ordersInReview})</span>
            </button>

            <button
              onClick={() => setActiveTab('press_floor')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'press_floor'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Press Floor & HW</span>
            </button>

            <button
              onClick={() => setActiveTab('pricing')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'pricing'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Catalog & Rates</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Executive KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block font-mono">
                Settled Gross Revenue
              </span>
              <span className="text-xl font-mono font-extrabold text-stone-900 mt-1 block">
                ₦{totalGrossRevenueNgn.toLocaleString()}
              </span>
              <span className="text-[11px] text-[#b8860b] font-semibold flex items-center gap-1 mt-0.5">
                <TrendingUp className="w-3 h-3" />
                Paystack & Wire Confirmed
              </span>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 text-amber-600 border border-amber-200/60">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block font-mono">
                Pre-Press Audit Queue
              </span>
              <span className="text-xl font-mono font-extrabold text-stone-900 mt-1 block">
                {ordersInReview} Artwork Files
              </span>
              <span className="text-[11px] text-indigo-700 font-semibold flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3 h-3" />
                Awaiting 300 DPI / Bleed Approval
              </span>
            </div>
            <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200/60">
              <FileText className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block font-mono">
                Live Press Floor Running
              </span>
              <span className="text-xl font-mono font-extrabold text-stone-900 mt-1 block">
                {ordersInProduction} Active Jobs
              </span>
              <span className="text-[11px] text-blue-700 font-semibold flex items-center gap-1 mt-0.5">
                <Printer className="w-3 h-3" />
                Roland TrueVIS & Mimaki
              </span>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 text-blue-600 border border-blue-200/60">
              <Printer className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block font-mono">
                In Transit & Dispatched
              </span>
              <span className="text-xl font-mono font-extrabold text-stone-900 mt-1 block">
                {ordersDispatched} Deliveries
              </span>
              <span className="text-[11px] text-purple-700 font-semibold flex items-center gap-1 mt-0.5">
                <Truck className="w-3 h-3" />
                Lagos Bike & Interstate Air
              </span>
            </div>
            <div className="p-3 rounded-xl bg-purple-50 text-purple-600 border border-purple-200/60">
              <Truck className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Tab 1: Orders Desk Table View */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {/* Filter and Search Bar */}
            <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by Order #, Customer, Corporate Co., or Phone..."
                  className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="bg-stone-50 border border-stone-200 text-xs font-semibold rounded-xl px-3 py-2 text-stone-700 focus:ring-1 focus:ring-amber-500"
                >
                  <option value="all">All Order Statuses</option>
                  <option value="artwork_review">Pre-Press Review</option>
                  <option value="in_production">In Production</option>
                  <option value="ready_for_dispatch">Ready for Dispatch</option>
                  <option value="out_for_delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                  <option value="pending_payment">Pending Wire</option>
                </select>

                {/* Gateway Filter */}
                <select
                  value={gatewayFilter}
                  onChange={(e) => setGatewayFilter(e.target.value as any)}
                  className="bg-stone-50 border border-stone-200 text-xs font-semibold rounded-xl px-3 py-2 text-stone-700 focus:ring-1 focus:ring-amber-500"
                >
                  <option value="all">All Gateways</option>
                  <option value="paystack">Paystack</option>
                  <option value="flutterwave">Flutterwave</option>
                  <option value="bank_transfer">Direct Bank Transfer</option>
                </select>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white border border-stone-200 rounded-2xl shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase font-mono">
                    <tr>
                      <th className="py-3 px-4 font-bold">Order #</th>
                      <th className="py-3 px-4 font-bold">Client / Company</th>
                      <th className="py-3 px-4 font-bold">Items & Specs</th>
                      <th className="py-3 px-4 font-bold">Location</th>
                      <th className="py-3 px-4 font-bold">Total (₦)</th>
                      <th className="py-3 px-4 font-bold">Payment</th>
                      <th className="py-3 px-4 font-bold">Production Stage</th>
                      <th className="py-3 px-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-stone-400">
                          No commercial orders match the applied filters.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((ord) => {
                        const totalQty = ord.items.reduce((s, i) => s + i.quantity, 0);

                        return (
                          <tr key={ord.id} className="hover:bg-stone-50/70 transition-colors">
                            <td className="py-3.5 px-4 font-mono font-bold text-stone-900 whitespace-nowrap">
                              <button
                                onClick={() => handleOpenDrawer(ord)}
                                className="hover:text-amber-600 hover:underline"
                              >
                                {ord.orderNumber}
                              </button>
                              <span className="block text-[10px] text-stone-400 font-sans font-normal mt-0.5">
                                {new Date(ord.createdAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'short' })}
                              </span>
                            </td>

                            <td className="py-3.5 px-4 max-w-[200px]">
                              <p className="font-bold text-stone-900 truncate">{ord.customer.fullName}</p>
                              {ord.customer.companyName && (
                                <p className="text-[11px] text-amber-700 font-medium truncate">
                                  {ord.customer.companyName}
                                </p>
                              )}
                              <p className="text-[10px] text-stone-400 truncate">{ord.customer.phone}</p>
                            </td>

                            <td className="py-3.5 px-4 max-w-[220px]">
                              <div className="flex items-center gap-2">
                                <img
                                  src={ord.items[0]?.productImage}
                                  alt=""
                                  className="w-8 h-8 rounded object-cover border border-stone-200 shrink-0"
                                />
                                <div className="truncate">
                                  <p className="font-semibold text-stone-800 truncate">
                                    {ord.items[0]?.productName}
                                  </p>
                                  <span className="text-[10px] text-stone-500 font-mono">
                                    {totalQty} {totalQty === 1 ? 'unit' : 'units'} {ord.items.length > 1 ? `(+${ord.items.length - 1} more)` : ''}
                                  </span>
                                </div>
                              </div>
                            </td>

                            <td className="py-3.5 px-4 text-stone-600 whitespace-nowrap">
                              <span className="font-medium text-stone-800 block">{ord.customer.city}</span>
                              <span className="text-[10px] text-stone-400">{ord.customer.state}</span>
                            </td>

                            <td className="py-3.5 px-4 font-mono font-bold text-stone-900 whitespace-nowrap">
                              ₦{ord.grandTotalNgn.toLocaleString()}
                            </td>

                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span
                                className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                  ord.paymentStatus === 'paid'
                                    ? 'bg-[#b8860b] text-white shadow-2xs'
                                    : 'bg-stone-100 text-stone-700 border border-stone-200'
                                }`}
                              >
                                {ord.paymentStatus === 'paid' ? 'PAID' : 'PENDING WIRE'}
                              </span>
                              <span className="block text-[10px] text-stone-400 uppercase font-mono mt-0.5">
                                {ord.paymentGateway}
                              </span>
                            </td>

                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <button
                                onClick={() => handleAdvanceOrderStatus(ord.id)}
                                title="Click to advance order stage"
                                className="group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-800 transition-colors"
                              >
                                <span>
                                  {ord.orderStatus === 'artwork_review' && 'Pre-Press Review'}
                                  {ord.orderStatus === 'in_production' && 'In Production'}
                                  {ord.orderStatus === 'ready_for_dispatch' && 'Ready / QC OK'}
                                  {ord.orderStatus === 'out_for_delivery' && 'Dispatched'}
                                  {ord.orderStatus === 'delivered' && 'Delivered'}
                                  {ord.orderStatus === 'pending_payment' && 'Pending Wire'}
                                </span>
                                <ChevronRight className="w-3 h-3 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                              </button>
                            </td>

                            <td className="py-3.5 px-4 text-right whitespace-nowrap">
                              <button
                                onClick={() => handleOpenDrawer(ord)}
                                className="px-3 py-1 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-lg text-xs inline-flex items-center gap-1 transition-colors shadow-xs"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Inspect</span>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Pre-Press Inspection Flight Desk */}
        {activeTab === 'prepress' && (
          <PrePressAuditDesk
            orders={orders}
            onOpenOrder={handleOpenDrawer}
            onApproveArtwork={(orderId) => {
              onUpdateOrderStatus(orderId, 'in_production');
              alert('Artwork approved! Order moved to In Production (Printing Press Queue).');
            }}
          />
        )}

        {/* Tab 3: Print Press Floor & Hardware Inventory */}
        {activeTab === 'press_floor' && (
          <PressFloorQueue
            orders={orders}
            onOpenOrder={handleOpenDrawer}
            onAdvanceStatus={handleAdvanceOrderStatus}
          />
        )}

        {/* Tab 4: Product Catalog & Pricing Manager */}
        {activeTab === 'pricing' && (
          <ProductPricingManager
            products={products}
            onUpdateProduct={onUpdateProduct}
          />
        )}
      </main>

      {/* Slide-over Deep Order Inspection Drawer */}
      <OrderDetailDrawer
        order={selectedOrder}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onUpdateOrderStatus={(id, status) => {
          onUpdateOrderStatus(id, status);
          if (selectedOrder && selectedOrder.id === id) {
            setSelectedOrder({ ...selectedOrder, orderStatus: status });
          }
        }}
        onUpdatePaymentStatus={(id, status) => {
          onUpdatePaymentStatus(id, status);
          if (selectedOrder && selectedOrder.id === id) {
            setSelectedOrder({ ...selectedOrder, paymentStatus: status });
          }
        }}
        onUpdateTrackingNumber={(id, trk) => {
          onUpdateTrackingNumber(id, trk);
          if (selectedOrder && selectedOrder.id === id) {
            setSelectedOrder({ ...selectedOrder, trackingNumber: trk });
          }
        }}
        onUpdateProductionNotes={(id, notes) => {
          onUpdateProductionNotes(id, notes);
          if (selectedOrder && selectedOrder.id === id) {
            setSelectedOrder({ ...selectedOrder, productionNotes: notes });
          }
        }}
      />
    </div>
  );
};
