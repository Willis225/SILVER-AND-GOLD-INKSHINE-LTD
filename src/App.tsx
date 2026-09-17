import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { HeroSection } from './components/storefront/HeroSection';
import { BrandIntroSection } from './components/storefront/BrandIntroSection';
import { ServicesShowcaseSection } from './components/storefront/ServicesShowcaseSection';
import { BusinessStationerySection } from './components/storefront/BusinessStationerySection';
import { BannersDisplayStandsSection } from './components/storefront/BannersDisplayStandsSection';
import { GoogleReviewsSection } from './components/storefront/GoogleReviewsSection';
import { BrandedGiftsSection } from './components/storefront/BrandedGiftsSection';
import { TrustedCompanyFeatureSection } from './components/storefront/TrustedCompanyFeatureSection';
import { PackagingLabelsSection } from './components/storefront/PackagingLabelsSection';
import { EventExhibitionSection } from './components/storefront/EventExhibitionSection';
import { SignageCompanySection } from './components/storefront/SignageCompanySection';
import { WhyChooseUsSection } from './components/storefront/WhyChooseUsSection';
import { CustomAwardsSection } from './components/storefront/CustomAwardsSection';
import { SocialProofSection } from './components/storefront/SocialProofSection';
import { Footer } from './components/layout/Footer';
import { ProductQuickViewModal } from './components/storefront/ProductQuickViewModal';
import { CartDrawer, CartItem } from './components/storefront/CartDrawer';
import { StageOneArchitectureSandbox } from './components/sandbox/StageOneArchitectureSandbox';
import { ProductDetailPage } from './components/product/ProductDetailPage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CompanyInfoModal, InfoModalTab } from './components/common/CompanyInfoModal';
import { GlassBottomDock } from './components/navigation/GlassBottomDock';
import { BookOnlineModal } from './components/modals/BookOnlineModal';
import { CatalogModal } from './components/modals/CatalogModal';
import { SAMPLE_PRODUCTS, NIGERIAN_SHIPPING_ZONES } from './data/seedData';
import { INITIAL_ORDERS } from './data/seedOrders';
import { Product, ProductCategory, Order, OrderStatus, PaymentStatus, calculateDynamicPrice } from './types/schema';
import { SubmissionMode, DesignerBrief } from './components/product/ArtworkPreflightChecker';

export default function App() {
  // Global mutable catalog & orders state
  const [products, setProducts] = useState<Product[]>(SAMPLE_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

  // Storefront navigation & state
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-item-demo-1',
      product: SAMPLE_PRODUCTS[0], // Luxury Rollup Banner
      selectedOptions: {
        'opt-cassette-base': 'b-teardrop',
        'opt-media-substrate': 'm-solite',
      },
      quantity: 2,
      artworkType: 'direct_upload',
      uploadedFileName: 'AIT_Summit_Banner_Artwork_Final.pdf',
      unitPriceNgn: 34500,
      totalPriceNgn: 69000,
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  
  // Dedicated PDP Product
  const [activePdpProduct, setActivePdpProduct] = useState<Product | null>(null);

  // Company Info & Displays Hub Modal
  const [isCompanyInfoOpen, setIsCompanyInfoOpen] = useState(false);
  const [companyInfoTab, setCompanyInfoTab] = useState<InfoModalTab>('info');

  const handleOpenInfoModal = (tab: InfoModalTab = 'info') => {
    setCompanyInfoTab(tab);
    setIsCompanyInfoOpen(true);
  };

  // Glass Bottom Dock Modal States (Book Online, Info, Catalog)
  const [isBookOnlineOpen, setIsBookOnlineOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [bookOnlineService, setBookOnlineService] = useState('');

  const handleOpenBookOnline = (service: string = '') => {
    setBookOnlineService(service);
    setIsBookOnlineOpen(true);
  };

  // Mode toggle between Live Storefront, PDP, Checkout, Architecture Sandbox, and Admin Dashboard
  const [viewMode, setViewMode] = useState<'storefront' | 'pdp' | 'checkout' | 'stage1_sandbox' | 'admin'>('storefront');

  // Order Management Handlers for Admin
  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, orderStatus: newStatus } : ord))
    );
  };

  const handleUpdatePaymentStatus = (orderId: string, newPaymentStatus: PaymentStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, paymentStatus: newPaymentStatus } : ord))
    );
  };

  const handleUpdateTrackingNumber = (orderId: string, trackingNumber: string) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, trackingNumber } : ord))
    );
  };

  const handleUpdateProductionNotes = (orderId: string, notes: string) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, productionNotes: notes } : ord))
    );
  };

  const handleUpdateProduct = (productId: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, ...updates } : p))
    );
  };

  // Cart Handlers
  const handleAddToCart = (itemData: {
    product: Product;
    selectedOptions: Record<string, string>;
    quantity: number;
    artworkType: SubmissionMode;
    uploadedFileName?: string;
    designerFeeNgn?: number;
    designerBrief?: DesignerBrief;
  }) => {
    const pricing = calculateDynamicPrice(itemData.product, itemData.quantity, itemData.selectedOptions);
    const designerFee = itemData.designerFeeNgn || 0;
    
    const newItem: CartItem = {
      id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      product: itemData.product,
      selectedOptions: itemData.selectedOptions,
      quantity: itemData.quantity,
      artworkType: itemData.artworkType,
      uploadedFileName: itemData.uploadedFileName,
      unitPriceNgn: pricing.unitPriceAfterDiscount,
      totalPriceNgn: pricing.subtotal + designerFee,
    };

    setCartItems((prev) => [newItem, ...prev]);
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateCartQuantity = (id: string, newQuantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const pricing = calculateDynamicPrice(item.product, newQuantity, item.selectedOptions);
          return {
            ...item,
            quantity: newQuantity,
            unitPriceNgn: pricing.unitPriceAfterDiscount,
            totalPriceNgn: pricing.subtotal,
          };
        }
        return item;
      })
    );
  };

  const handleCheckout = (shippingZoneId: string, isExpress: boolean) => {
    setIsCartOpen(false);
    setViewMode('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToCatalog = () => {
    if (viewMode !== 'storefront') {
      setViewMode('storefront');
    }
    setTimeout(() => {
      const catalogEl = document.getElementById('products-catalog-section');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleOpenProductDetailPage = (product: Product) => {
    setActivePdpProduct(product);
    setViewMode('pdp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProductById = (productId: string) => {
    const prod = products.find((p) => p.id === productId) || SAMPLE_PRODUCTS.find((p) => p.id === productId);
    if (prod) {
      handleOpenProductDetailPage(prod);
    }
  };

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans antialiased flex flex-col justify-between selection:bg-amber-500 selection:text-white">
      {/* Global Header (Rendered on storefront, pdp, checkout, and sandbox) */}
      {viewMode !== 'admin' && (
        <Header
          cartCount={totalCartCount}
          onOpenCart={() => setIsCartOpen(true)}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setViewMode('storefront');
            scrollToCatalog();
          }}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onNavigateHome={() => {
            setSelectedCategory('all');
            setSearchQuery('');
            setViewMode('storefront');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenAdmin={() => {
            setViewMode('admin');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenInfoModal={handleOpenInfoModal}
        />
      )}

      {/* Main View Router */}
      <main className="flex-1 pb-24 sm:pb-20">
        {viewMode === 'admin' && (
          <AdminDashboard
            orders={orders}
            products={products}
            onReturnToStorefront={() => {
              setViewMode('storefront');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onUpdatePaymentStatus={handleUpdatePaymentStatus}
            onUpdateTrackingNumber={handleUpdateTrackingNumber}
            onUpdateProductionNotes={handleUpdateProductionNotes}
            onUpdateProduct={handleUpdateProduct}
          />
        )}

        {viewMode === 'stage1_sandbox' && (
          <StageOneArchitectureSandbox onReturnToStorefront={() => setViewMode('storefront')} />
        )}

        {viewMode === 'checkout' && (
          <CheckoutPage
            cartItems={cartItems}
            onBackToCart={() => {
              setViewMode('storefront');
              setIsCartOpen(true);
            }}
            onClearCart={() => setCartItems([])}
            onReturnToHome={() => {
              setViewMode('storefront');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOrderPlaced={(newOrder) => {
              setOrders((prev) => [newOrder, ...prev]);
            }}
          />
        )}

        {viewMode === 'pdp' && activePdpProduct && (
          <ProductDetailPage
            product={activePdpProduct}
            onBackToCatalog={() => {
              setViewMode('storefront');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAddToCart={handleAddToCart}
          />
        )}

        {viewMode === 'storefront' && (
          <>
            {/* Hero Section */}
            <HeroSection
              onExploreProducts={scrollToCatalog}
              onOpenPricingSandbox={() => setViewMode('stage1_sandbox')}
              onSelectProductQuickView={handleOpenProductById}
            />

            {/* Brand Introduction & Promotions Overview (Matching Reference) */}
            <BrandIntroSection onExploreProducts={scrollToCatalog} />

            {/* Top-Quality Printing Services Showcase Carousel (Matching Reference) */}
            <ServicesShowcaseSection
              onOrderNow={scrollToCatalog}
              onSelectItem={(item) => {
                if (item.category) {
                  setSelectedCategory(item.category as ProductCategory);
                }
                scrollToCatalog();
              }}
            />

            {/* Business Stationery & Office Printing Carousel (Matching Reference) */}
            <BusinessStationerySection
              onViewProducts={scrollToCatalog}
              onSelectItem={(item) => {
                if (item.category) {
                  setSelectedCategory(item.category as ProductCategory);
                }
                scrollToCatalog();
              }}
            />

            {/* Banners, Display Stands & Advertising Materials Carousel (Matching Reference) */}
            <BannersDisplayStandsSection
              onViewProducts={scrollToCatalog}
              onSelectItem={(item) => {
                if (item.category) {
                  setSelectedCategory(item.category as ProductCategory);
                }
                scrollToCatalog();
              }}
            />

            {/* Happy Customer Reviews on Google (Matching Reference) */}
            <GoogleReviewsSection />

            {/* Branded Corporate Gifts & Promotional Items (Matching Reference) */}
            <BrandedGiftsSection
              onViewProducts={scrollToCatalog}
              onSelectItem={(item) => {
                if (item.category) {
                  setSelectedCategory(item.category as ProductCategory);
                }
                scrollToCatalog();
              }}
            />

            {/* Nigeria's Trusted Online Printing Company Feature (Matching Reference) */}
            <TrustedCompanyFeatureSection />

            {/* Packaging, Labels & Stickers Printing Carousel (Matching Reference) */}
            <PackagingLabelsSection
              onViewProducts={scrollToCatalog}
              onSelectItem={(item) => {
                if (item.category) {
                  setSelectedCategory(item.category as ProductCategory);
                }
                scrollToCatalog();
              }}
            />

            {/* Event, Exhibition and Activation Branding Materials (Matching Reference) */}
            <EventExhibitionSection
              onViewProducts={scrollToCatalog}
              onSelectItem={(item) => {
                if (item.category) {
                  setSelectedCategory(item.category as ProductCategory);
                }
                scrollToCatalog();
              }}
            />

            {/* Signage Making Company in Lagos, Nigeria (Matching Reference) */}
            <SignageCompanySection
              onViewProducts={scrollToCatalog}
              onSelectItem={(item) => {
                if (item.category) {
                  setSelectedCategory(item.category as ProductCategory);
                }
                scrollToCatalog();
              }}
            />

            {/* Why Businesses Choose SILVER & GOLD INKSHINE LTD */}
            <WhyChooseUsSection />

            {/* Custom Award Plaques and Trophies Printing (Matching Reference) */}
            <CustomAwardsSection
              onViewProducts={scrollToCatalog}
              onSelectItem={(item) => {
                if (item.category) {
                  setSelectedCategory(item.category as ProductCategory);
                }
                scrollToCatalog();
              }}
            />

            {/* Trust & Social Proof (Reviews, Client Logos, Completed Jobs) */}
            <SocialProofSection />
          </>
        )}
      </main>

      {/* Global Footer (only on customer-facing views) */}
      {viewMode !== 'admin' && (
        <Footer
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setViewMode('storefront');
            scrollToCatalog();
          }}
          onOpenAdmin={() => {
            setViewMode('admin');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenInfoModal={handleOpenInfoModal}
        />
      )}

      {/* Product Quick-View & Customization Modal */}
      {quickViewProduct && (
        <ProductQuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Slide-over Cart Drawer with Nigerian Shipping Matrix */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onCheckout={handleCheckout}
      />

      {/* Company Info, Displays Hub & Customer Guidance Modal */}
      <CompanyInfoModal
        isOpen={isCompanyInfoOpen}
        onClose={() => setIsCompanyInfoOpen(false)}
        initialTab={companyInfoTab}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setViewMode('storefront');
          scrollToCatalog();
        }}
      />

      {/* iPhone 17-Style Frosted Glass Floating Bottom Dock (Mobile + Desktop) */}
      <GlassBottomDock
        onOpenBookOnline={() => handleOpenBookOnline()}
        onOpenInfo={() => handleOpenInfoModal('info')}
        onOpenCatalog={() => setIsCatalogOpen(true)}
        activeModal={isBookOnlineOpen ? 'book' : isCompanyInfoOpen ? 'info' : isCatalogOpen ? 'catalog' : null}
      />

      {/* Book Online Modal */}
      <BookOnlineModal
        isOpen={isBookOnlineOpen}
        onClose={() => setIsBookOnlineOpen(false)}
        preselectedService={bookOnlineService}
      />

      {/* Paintings, Artworks & Product Samples Catalog Modal */}
      <CatalogModal
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        products={products}
        onSelectProduct={(prod) => {
          setIsCatalogOpen(false);
          setQuickViewProduct(prod);
        }}
        onBookSample={(sampleTitle) => {
          setIsCatalogOpen(false);
          handleOpenBookOnline(sampleTitle);
        }}
      />
    </div>
  );
}
