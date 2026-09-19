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
  FileText,
  ImageIcon,
  Sliders,
  RotateCcw,
  FolderTree
} from 'lucide-react';
import { Order, OrderStatus, PaymentStatus, Product } from '../../types/schema';
import { WebsiteContent, HeroSlideItem, ShowcaseServiceItem } from '../../types/websiteContent';
import { CompanyLogoMark } from '../common/CompanyLogo';
import { OrderDetailDrawer } from './OrderDetailDrawer';
import { PrePressAuditDesk } from './PrePressAuditDesk';
import { PressFloorQueue } from './PressFloorQueue';
import { ProductPricingManager } from './ProductPricingManager';
import { PageImageStudio } from './PageImageStudio';
import { HeroSlidesManager } from './HeroSlidesManager';
import { PageTextManager } from './PageTextManager';
import { CategoryAdmin } from './CategoryAdmin';

interface AdminDashboardProps {
  orders: Order[];
  products: Product[];
  websiteContent: WebsiteContent;
  onUpdateWebsiteContent: (content: WebsiteContent) => void;
  onReturnToStorefront: (categoryKey?: string) => void;
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  onUpdatePaymentStatus: (orderId: string, newPaymentStatus: PaymentStatus) => void;
  onUpdateTrackingNumber: (orderId: string, trackingNumber: string) => void;
  onUpdateProductionNotes: (orderId: string, notes: string) => void;
  onUpdateProduct: (productId: string, updates: Partial<Product>) => void;
  onAddProduct?: (newProduct: Product) => void;
  onDeleteProduct?: (productId: string) => void;
  onResetAllWebsiteContentToDefaults?: () => void;
  initialTab?: AdminTab;
  initialCategoryKey?: string;
}

export type AdminTab = 
  | 'categories'
  | 'products'
  | 'media' 
  | 'hero_slides' 
  | 'page_texts' 
  | 'orders' 
  | 'prepress' 
  | 'press_floor';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  orders,
  products,
  websiteContent,
  onUpdateWebsiteContent,
  onReturnToStorefront,
  onUpdateOrderStatus,
  onUpdatePaymentStatus,
  onUpdateTrackingNumber,
  onUpdateProductionNotes,
  onUpdateProduct,
  onAddProduct,
  onDeleteProduct,
  onResetAllWebsiteContentToDefaults,
  initialTab,
  initialCategoryKey,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>(initialTab || 'categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [gatewayFilter, setGatewayFilter] = useState<'all' | 'paystack' | 'flutterwave' | 'bank_transfer'>('all');
  
  // Safe arrays
  const safeOrders = Array.isArray(orders) ? orders : [];
  const safeProducts = Array.isArray(products) ? products : [];

  // Selected order for deep inspection drawer
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Compute live KPIs
  const totalGrossRevenueNgn = safeOrders.reduce((sum, ord) => sum + (ord.paymentStatus === 'paid' ? (ord.grandTotalNgn || 0) : 0), 0);
  const ordersInReview = safeOrders.filter((o) => o.orderStatus === 'artwork_review').length;
  const ordersInProduction = safeOrders.filter((o) => o.orderStatus === 'in_production').length;
  const ordersDispatched = safeOrders.filter((o) => o.orderStatus === 'out_for_delivery' || o.orderStatus === 'ready_for_dispatch').length;

  // Filtered orders list
  const filteredOrders = safeOrders.filter((ord) => {
    const matchesStatus = statusFilter === 'all' || ord.orderStatus === statusFilter;
    const matchesGateway = gatewayFilter === 'all' || ord.paymentGateway === gatewayFilter;

    const sq = String(searchQuery || '').trim().toLowerCase();
    if (!sq) return matchesStatus && matchesGateway;

    const matchesSearch = 
      String(ord.orderNumber || '').toLowerCase().includes(sq) ||
      String(ord.customer?.fullName || '').toLowerCase().includes(sq) ||
      (ord.customer?.companyName && String(ord.customer.companyName).toLowerCase().includes(sq)) ||
      String(ord.customer?.phone || '').includes(searchQuery || '');

    return matchesSearch && matchesStatus && matchesGateway;
  });

  const handleOpenDrawer = (order: Order) => {
    setSelectedOrder(order);
    setIsDrawerOpen(true);
  };

  const handleAdvanceOrderStatus = (orderId: string) => {
    const target = safeOrders.find((o) => o.id === orderId);
    if (!target) return;

    const pipeline: OrderStatus[] = [
      'artwork_review',
      'prepress_approved',
      'in_production',
      'ready_for_dispatch',
      'out_for_delivery',
      'delivered'
    ];

    const currentIndex = pipeline.indexOf(target.orderStatus);
    if (currentIndex >= 0 && currentIndex < pipeline.length - 1) {
      const nextStatus = pipeline[currentIndex + 1];
      onUpdateOrderStatus(orderId, nextStatus);
    }
  };

  // Updaters for website content
  const handleUpdateHeroSlides = (newSlides: HeroSlideItem[]) => {
    onUpdateWebsiteContent({
      ...websiteContent,
      heroSlides: newSlides,
    });
  };

  const handleUpdateShowcaseServices = (newServices: ShowcaseServiceItem[]) => {
    onUpdateWebsiteContent({
      ...websiteContent,
      showcaseServices: newServices,
    });
  };

  return (
    <div className="min-h-screen bg-stone-100/70 text-stone-900 pb-20 font-sans">
      {/* Top Header with Brand & Storefront Switcher */}
      <header className="bg-stone-950 text-white border-b border-stone-800 sticky top-0 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            {/* Logo & Operational Badge */}
            <div className="flex items-center gap-3">
              <CompanyLogoMark className="w-9 h-9 border border-amber-500/30 rounded-xl bg-stone-900 p-1 shrink-0" />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm sm:text-base font-black tracking-tight text-white">
                    Silver &amp; Gold Inkshine Ltd
                  </h1>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#b8860b]/20 text-[#f5be38] border border-[#f5be38]/30">
                    Control Center CMS
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-stone-400 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 font-semibold">Live Front-End Sync Active</span>
                  <span>•</span>
                  <span>Changes appear instantly on the website</span>
                </div>
              </div>
            </div>

            {/* Quick Actions & Storefront Link */}
            <div className="flex items-center gap-2 self-stretch sm:self-auto">
              {onResetAllWebsiteContentToDefaults && (
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Reset all website images, hero slides, and custom texts back to factory defaults?')) {
                      onResetAllWebsiteContentToDefaults();
                    }
                  }}
                  className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white font-medium text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Reset custom edits to default seed"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset Defaults</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => onReturnToStorefront()}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 active:scale-95 text-stone-950 font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>View Live Website</span>
              </button>
            </div>
          </div>
        </div>

        {/* Primary Sub-Navigation Tabs */}
        <div className="bg-stone-900 border-t border-stone-800/80 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1.5">
            <button
              type="button"
              onClick={() => setActiveTab('categories')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'categories'
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 font-black shadow-md'
                  : 'text-amber-400 hover:text-white hover:bg-stone-800/80 border border-amber-500/30'
              }`}
            >
              <FolderTree className="w-4 h-4" />
              <span>Categories Admin (Multi-Photo)</span>
              <span className="px-1.5 py-0.2 rounded-full bg-emerald-500 text-white text-[9px] font-bold uppercase">
                New
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('products')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-[#b8860b] text-stone-950 shadow-xs'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Categories &amp; Products Admin</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('media')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'media'
                  ? 'bg-[#b8860b] text-stone-950 shadow-xs'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Page Images Studio</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('hero_slides')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'hero_slides'
                  ? 'bg-[#b8860b] text-stone-950 shadow-xs'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Hero Slider</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('page_texts')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'page_texts'
                  ? 'bg-[#b8860b] text-stone-950 shadow-xs'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Texts &amp; Descriptions</span>
            </button>

            <div className="w-px h-5 bg-stone-700 mx-1 shrink-0" />

            <button
              type="button"
              onClick={() => setActiveTab('orders')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-amber-400 text-stone-950 shadow-xs'
                  : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Orders Desk ({orders.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('prepress')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'prepress'
                  ? 'bg-amber-400 text-stone-950 shadow-xs'
                  : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Pre-Press Audit ({ordersInReview})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('press_floor')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'press_floor'
                  ? 'bg-amber-400 text-stone-950 shadow-xs'
                  : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
              }`}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Press Floor Queue</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* TAB: CATEGORIES ADMIN WITH MULTI-IMAGE UPLOAD */}
        {activeTab === 'categories' && (
          <CategoryAdmin
            products={safeProducts}
            onUpdateProduct={onUpdateProduct}
            onAddProduct={onAddProduct}
            onDeleteProduct={onDeleteProduct}
            onOpenStorefront={onReturnToStorefront}
            initialCategoryKey={initialCategoryKey}
          />
        )}

        {/* TAB: MEDIA & IMAGE STUDIO */}
        {activeTab === 'media' && (
          <PageImageStudio
            heroSlides={websiteContent?.heroSlides || []}
            onUpdateHeroSlides={handleUpdateHeroSlides}
            products={safeProducts}
            onUpdateProduct={onUpdateProduct}
            onDeleteProduct={onDeleteProduct}
            onAddProduct={onAddProduct}
            showcaseServices={websiteContent?.showcaseServices || []}
            onUpdateShowcaseServices={handleUpdateShowcaseServices}
            onOpenStorefront={onReturnToStorefront}
          />
        )}

        {/* TAB 2: HERO SLIDER CAROUSEL */}
        {activeTab === 'hero_slides' && (
          <HeroSlidesManager
            slides={websiteContent?.heroSlides || []}
            onUpdateSlides={handleUpdateHeroSlides}
          />
        )}

        {/* TAB 3: PRODUCTS & CATALOG CMS */}
        {activeTab === 'products' && (
          <ProductPricingManager
            products={safeProducts}
            onUpdateProduct={onUpdateProduct}
            onAddProduct={onAddProduct}
            onDeleteProduct={onDeleteProduct}
            onOpenStorefront={onReturnToStorefront}
          />
        )}

        {/* TAB 4: PAGE TEXTS & DESCRIPTIONS */}
        {activeTab === 'page_texts' && (
          <PageTextManager
            content={websiteContent}
            onSaveContent={onUpdateWebsiteContent}
            onResetToDefaults={() => onResetAllWebsiteContentToDefaults?.()}
          />
        )}

        {/* TAB 5: ORDERS MANAGEMENT DESK */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* Live KPI Metric Strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
                <div className="flex items-center justify-between text-stone-500 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Gross Settled Revenue</span>
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-black text-stone-900 font-mono">
                  ₦{(totalGrossRevenueNgn || 0).toLocaleString()}
                </div>
                <div className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>Verified gateway deposits</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
                <div className="flex items-center justify-between text-stone-500 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Artwork In Review</span>
                  <Clock className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-2xl font-black text-stone-900 font-mono">
                  {ordersInReview}
                </div>
                <div className="text-[11px] text-amber-600 font-medium mt-1">
                  Requires bleed &amp; DPI pre-flight
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
                <div className="flex items-center justify-between text-stone-500 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">In Print Production</span>
                  <Printer className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-2xl font-black text-stone-900 font-mono">
                  {ordersInProduction}
                </div>
                <div className="text-[11px] text-blue-600 font-medium mt-1">
                  Active press floor queue
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
                <div className="flex items-center justify-between text-stone-500 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Logistics &amp; Dispatched</span>
                  <Truck className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-2xl font-black text-stone-900 font-mono">
                  {ordersDispatched}
                </div>
                <div className="text-[11px] text-purple-600 font-medium mt-1">
                  GIG Logistics tracking active
                </div>
              </div>
            </div>

            {/* Orders Search & Filter Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by Order #, Customer, Phone, or Company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#b8860b]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-700 focus:outline-hidden focus:ring-2 focus:ring-[#b8860b]"
                >
                  <option value="all">All Production Stages</option>
                  <option value="artwork_review">Artwork Review</option>
                  <option value="prepress_approved">Pre-press Approved</option>
                  <option value="in_production">In Production</option>
                  <option value="ready_for_dispatch">Ready for Dispatch</option>
                  <option value="out_for_delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                </select>

                <select
                  value={gatewayFilter}
                  onChange={(e) => setGatewayFilter(e.target.value as any)}
                  className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-700 focus:outline-hidden focus:ring-2 focus:ring-[#b8860b]"
                >
                  <option value="all">All Payment Channels</option>
                  <option value="paystack">Paystack</option>
                  <option value="flutterwave">Flutterwave</option>
                  <option value="bank_transfer">Direct Proforma Invoice</option>
                </select>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200/80 text-stone-500 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Order Reference</th>
                      <th className="py-3 px-4">Customer Details</th>
                      <th className="py-3 px-4">Products &amp; Specs</th>
                      <th className="py-3 px-4">Total (NGN)</th>
                      <th className="py-3 px-4">Payment</th>
                      <th className="py-3 px-4">Workflow Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-stone-400">
                          <Package className="w-8 h-8 mx-auto mb-2 opacity-40" />
                          <p className="font-medium text-stone-600">No orders match the selected criteria.</p>
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-stone-50/70 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-stone-900">
                            <div>{ord.orderNumber}</div>
                            <div className="text-[10px] text-stone-400 font-normal mt-0.5">
                              {new Date(ord.createdAt).toLocaleDateString()}
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-stone-900">{ord.customer.fullName}</div>
                            {ord.customer.companyName && (
                              <div className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                                <Building2 className="w-3 h-3 text-stone-400" />
                                <span>{ord.customer.companyName}</span>
                              </div>
                            )}
                            <div className="text-[11px] text-stone-400 flex items-center gap-1 mt-0.5">
                              <Phone className="w-3 h-3" />
                              <span>{ord.customer.phone}</span>
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="font-medium text-stone-800 line-clamp-1">
                              {ord.items[0]?.productName || 'Custom Print Job'}
                            </div>
                            <div className="text-[11px] text-stone-500 mt-0.5">
                              Qty: {ord.items[0]?.quantity || 1} units
                              {ord.items.length > 1 && ` (+${ord.items.length - 1} more items)`}
                            </div>
                          </td>

                          <td className="py-3.5 px-4 font-mono font-bold text-stone-900">
                            ₦{(ord.grandTotalNgn ?? 0).toLocaleString()}
                          </td>

                          <td className="py-3.5 px-4">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              ord.paymentStatus === 'paid' 
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                                : 'bg-amber-100 text-amber-800 border border-amber-300'
                            }`}>
                              {ord.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-stone-100 text-stone-700 border border-stone-200">
                              {ord.orderStatus.replace(/_/g, ' ')}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 text-right space-x-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenDrawer(ord)}
                              className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                            >
                              Inspect
                            </button>

                            <button
                              type="button"
                              onClick={() => handleAdvanceOrderStatus(ord.id)}
                              className="px-2.5 py-1 bg-[#00473e] hover:bg-[#03554a] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                              title="Advance production stage"
                            >
                              Advance
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: PRE-PRESS AUDIT DESK */}
        {activeTab === 'prepress' && (
          <PrePressAuditDesk
            orders={safeOrders}
            onOpenOrder={handleOpenDrawer}
            onAdvanceStatus={handleAdvanceOrderStatus}
          />
        )}

        {/* TAB 7: PRINT PRESS FLOOR */}
        {activeTab === 'press_floor' && (
          <PressFloorQueue
            orders={safeOrders}
            onOpenOrder={handleOpenDrawer}
            onAdvanceStatus={handleAdvanceOrderStatus}
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
