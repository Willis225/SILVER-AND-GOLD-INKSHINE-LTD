import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { HeroSection } from './components/storefront/HeroSection';
import { BrandIntroSection } from './components/storefront/BrandIntroSection';
import { ServicesShowcaseSection } from './components/storefront/ServicesShowcaseSection';
import { BusinessStationerySection } from './components/storefront/BusinessStationerySection';
import { BannersDisplayStandsSection } from './components/storefront/BannersDisplayStandsSection';
import { BrandedGiftsSection } from './components/storefront/BrandedGiftsSection';
import { TrustedCompanyFeatureSection } from './components/storefront/TrustedCompanyFeatureSection';
import { PackagingLabelsSection } from './components/storefront/PackagingLabelsSection';
import { EventExhibitionSection } from './components/storefront/EventExhibitionSection';
import { SignageCompanySection } from './components/storefront/SignageCompanySection';
import { WhyChooseUsSection } from './components/storefront/WhyChooseUsSection';
import { CustomAwardsSection } from './components/storefront/CustomAwardsSection';
import { SocialProofSection } from './components/storefront/SocialProofSection';
import { LocationMapSection } from './components/storefront/LocationMapSection';
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
import { RequestQuoteModal } from './components/modals/RequestQuoteModal';
import { CategoriesPage } from './components/categories/CategoriesPage';
import { ShieldCheck } from 'lucide-react';
import { SAMPLE_PRODUCTS, NIGERIAN_SHIPPING_ZONES } from './data/seedData';
import { INITIAL_ORDERS } from './data/seedOrders';
import { Product, ProductCategory, Order, OrderStatus, PaymentStatus, calculateDynamicPrice } from './types/schema';
import { SubmissionMode, DesignerBrief } from './components/product/ArtworkPreflightChecker';
import { 
  WebsiteContent, 
  loadSavedWebsiteContent, 
  saveWebsiteContent, 
  resetWebsiteContentToDefaults 
} from './types/websiteContent';
import {
  subscribeWebsiteContent,
  saveWebsiteContentToCloud,
  subscribeProducts,
  saveProductsToCloud,
  saveSingleProductToCloud,
  deleteProductFromCloud
} from './lib/firebase';
import { ensureCompleteCatalog } from './data/homepageCatalogProducts';

export default function App() {
  // Global mutable catalog & orders state with local storage persistence
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('inkshine_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return ensureCompleteCatalog(parsed);
        }
      }
    } catch (e) {
      console.error('Error loading saved products:', e);
    }
    return ensureCompleteCatalog(SAMPLE_PRODUCTS);
  });

  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

  // Dynamic Website CMS Content with local storage persistence
  const [websiteContent, setWebsiteContent] = useState<WebsiteContent>(() => {
    return loadSavedWebsiteContent();
  });

  // Real-time Cloud Database sync across all devices via Firebase Firestore
  useEffect(() => {
    const unsubscribeContent = subscribeWebsiteContent(
      (cloudContent: WebsiteContent) => {
        if (cloudContent) {
          setWebsiteContent((prev) => ({
            ...prev,
            ...cloudContent,
          }));
        }
      },
      (err: any) => console.error('Website content sync listener error:', err)
    );

    const unsubscribeProducts = subscribeProducts(
      (cloudProducts: Product[]) => {
        if (cloudProducts && cloudProducts.length > 0) {
          setProducts(ensureCompleteCatalog(cloudProducts));
        }
      },
      (err: any) => console.error('Products sync listener error:', err)
    );

    return () => {
      unsubscribeContent();
      unsubscribeProducts();
    };
  }, []);

  const handleUpdateWebsiteContent = (newContent: WebsiteContent) => {
    setWebsiteContent(newContent);
    saveWebsiteContent(newContent);
    saveWebsiteContentToCloud(newContent).catch((err) => {
      console.error('Cloud website content sync error:', err);
    });
  };

  const handleResetWebsiteContent = () => {
    const defaults = resetWebsiteContentToDefaults();
    setWebsiteContent(defaults);
    saveWebsiteContentToCloud(defaults).catch((err) => {
      console.error('Cloud reset sync error:', err);
    });
  };

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

  // Glass Bottom Dock Modal States (Book Online, Info, Categories)
  const [isBookOnlineOpen, setIsBookOnlineOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [bookOnlineService, setBookOnlineService] = useState('');
  const [activeCategoryTag, setActiveCategoryTag] = useState<string>('all');

  const [categoryPageInitialCategory, setCategoryPageInitialCategory] = useState<string>('all');
  const [categoryPageHighlightedProductId, setCategoryPageHighlightedProductId] = useState<string | null>(null);

  const handleOpenCategoriesPage = (categoryTag: string = 'all', productId: string | null = null) => {
    const safeTag = typeof categoryTag === 'string' && categoryTag.trim().length > 0 ? categoryTag : 'all';
    const safeProductId = typeof productId === 'string' ? productId : null;
    setCategoryPageInitialCategory(safeTag);
    setCategoryPageHighlightedProductId(safeProductId);
    setViewMode('categories');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCategories = (categoryTag: string = 'all', productId: string | null = null) => {
    handleOpenCategoriesPage(categoryTag, productId);
  };

  const handleOpenBookOnline = (service: string = '') => {
    setBookOnlineService(service);
    setIsBookOnlineOpen(true);
  };

  // Mode toggle between Live Storefront, Dedicated Categories Page, PDP, Checkout, Architecture Sandbox, and Admin Dashboard
  // By default, open the main customer-facing website ('storefront') unless explicitly requested via URL hash (#admin) or parameter (?view=admin)
  const [viewMode, setViewMode] = useState<'storefront' | 'categories' | 'pdp' | 'checkout' | 'stage1_sandbox' | 'admin'>(() => {
    if (typeof window !== 'undefined') {
      const hash = (window.location.hash || '').toLowerCase();
      const params = new URLSearchParams(window.location.search);
      const viewParam = (params.get('view') || '').toLowerCase();

      if (hash === '#admin' || viewParam === 'admin') return 'admin';
      if (hash === '#categories' || viewParam === 'categories') return 'categories';
    }
    return 'storefront';
  });
  const [adminInitialCategory, setAdminInitialCategory] = useState<string | undefined>(undefined);

  // Synchronize view mode with URL hash or query params
  useEffect(() => {
    const syncViewWithUrl = () => {
      const hash = (window.location.hash || '').toLowerCase();
      const params = new URLSearchParams(window.location.search);
      const viewParam = (params.get('view') || '').toLowerCase();

      if (hash === '#admin' || viewParam === 'admin') {
        setViewMode('admin');
      } else if (hash === '#categories' || viewParam === 'categories') {
        setViewMode('categories');
      } else if (hash === '#storefront' || viewParam === 'storefront' || hash === '#home') {
        setViewMode('storefront');
      }
    };

    // Check on mount
    syncViewWithUrl();

    window.addEventListener('hashchange', syncViewWithUrl);
    window.addEventListener('popstate', syncViewWithUrl);
    return () => {
      window.removeEventListener('hashchange', syncViewWithUrl);
      window.removeEventListener('popstate', syncViewWithUrl);
    };
  }, []);

  // Product Add / Update / Delete Handlers with LocalStorage & Firestore Cloud Persistence
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => {
      const next = [newProduct, ...prev];
      try {
        localStorage.setItem('inkshine_products', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      saveSingleProductToCloud(newProduct).catch((err) => {
        console.error('Failed to sync new product to Firestore collection:', err);
      });
      saveProductsToCloud(next).catch((err) => {
        console.error('Failed to sync catalog summary to Firestore:', err);
      });
      return next;
    });
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => {
      const next = prev.filter((p) => p.id !== productId);
      try {
        localStorage.setItem('inkshine_products', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      deleteProductFromCloud(productId).catch((err) => {
        console.error('Failed to delete product from Firestore collection:', err);
      });
      saveProductsToCloud(next).catch((err) => {
        console.error('Failed to sync catalog summary to Firestore:', err);
      });
      return next;
    });
  };

  const handleUpdateProduct = (productId: string, updates: Partial<Product>) => {
    setProducts((prev) => {
      const next = prev.map((p) => (p.id === productId ? { ...p, ...updates } : p));
      try {
        localStorage.setItem('inkshine_products', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      const updatedProduct = next.find((p) => p.id === productId);
      if (updatedProduct) {
        saveSingleProductToCloud(updatedProduct).catch((err) => {
          console.error('Failed to sync updated product to Firestore collection:', err);
        });
      }
      saveProductsToCloud(next).catch((err) => {
        console.error('Failed to sync catalog summary to Firestore:', err);
      });
      return next;
    });
  };

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

  const scrollToCatalog = (cat: string = 'all') => {
    handleOpenCategoriesPage(cat);
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
          onOpenBookOnline={() => handleOpenBookOnline()}
          onOpenCatalog={() => handleOpenCategoriesPage('all')}
          onOpenCategoriesPage={handleOpenCategoriesPage}
          onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        />
      )}

      {/* Main View Router */}
      <main className="flex-1 pb-24 md:pb-0">
        {viewMode === 'categories' && (
          <CategoriesPage
            products={products}
            initialCategory={categoryPageInitialCategory}
            initialSearchQuery={searchQuery}
            highlightedProductId={categoryPageHighlightedProductId}
            onNavigateHome={() => {
              setViewMode('storefront');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectProduct={(prod) => {
              setActivePdpProduct(prod);
              setViewMode('pdp');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCart={() => setIsCartOpen(true)}
            cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            onOpenAdmin={(catKey) => {
              if (catKey) setAdminInitialCategory(catKey);
              setViewMode('admin');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {viewMode === 'admin' && (
          <AdminDashboard
            orders={orders}
            products={products}
            websiteContent={websiteContent}
            initialTab="categories"
            initialCategoryKey={adminInitialCategory}
            onUpdateWebsiteContent={handleUpdateWebsiteContent}
            onResetAllWebsiteContentToDefaults={handleResetWebsiteContent}
            onReturnToStorefront={(catKey) => {
              if (typeof catKey === 'string' && catKey.trim().length > 0) {
                handleOpenCategoriesPage(catKey);
              } else {
                setSelectedCategory('all');
                setSearchQuery('');
                setViewMode('storefront');
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onUpdatePaymentStatus={handleUpdatePaymentStatus}
            onUpdateTrackingNumber={handleUpdateTrackingNumber}
            onUpdateProductionNotes={handleUpdateProductionNotes}
            onUpdateProduct={handleUpdateProduct}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
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
              slides={websiteContent.heroSlides}
              headline={websiteContent.heroHeadline}
              subheadline={websiteContent.heroSubheadline}
              eyebrow={websiteContent.heroEyebrow}
              description={websiteContent.heroDescription}
              backgroundImageUrl={websiteContent.heroBackgroundImage}
            />

            {/* Brand Introduction & Promotions Overview (Matching Reference) */}
            <BrandIntroSection onExploreProducts={scrollToCatalog} />

            {/* Top-Quality Printing Services Showcase Carousel (Matching Reference) */}
            <ServicesShowcaseSection
              title={websiteContent.showcaseTitle}
              description={websiteContent.showcaseDescription}
              items={websiteContent.showcaseServices}
              onOrderNow={() => {
                handleOpenCategories('all');
              }}
              onSelectItem={(item) => {
                handleOpenCategories(item.category || 'all', item.id);
              }}
            />

            {/* Business Stationery & Office Printing Carousel (Matching Reference) */}
            <BusinessStationerySection
              onViewProducts={() => handleOpenCategories('cards_invitations')}
              onSelectItem={(item) => {
                handleOpenCategories(item.category || 'cards_invitations', item.id);
              }}
            />

            {/* Banners, Display Stands & Advertising Materials Carousel (Matching Reference) */}
            <BannersDisplayStandsSection
              onViewProducts={() => handleOpenCategories('banners_stands')}
              onSelectItem={(item) => {
                handleOpenCategories(item.category || 'banners_stands', item.id);
              }}
            />

            {/* Branded Corporate Gifts & Promotional Items (Matching Reference) */}
            <BrandedGiftsSection
              onViewProducts={() => handleOpenCategories('gift_items_souvenirs')}
              onSelectItem={(item) => {
                handleOpenCategories(item.category || 'gift_items_souvenirs', item.id);
              }}
            />

            {/* Nigeria's Trusted Online Printing Company Feature (Matching Reference) */}
            <TrustedCompanyFeatureSection />

            {/* Packaging, Labels & Stickers Printing Carousel (Matching Reference) */}
            <PackagingLabelsSection
              onViewProducts={() => handleOpenCategories('packaging_shipping_cartons')}
              onSelectItem={(item) => {
                handleOpenCategories(item.category || 'packaging_shipping_cartons', item.id);
              }}
            />

            {/* Event, Exhibition and Activation Branding Materials (Matching Reference) */}
            <EventExhibitionSection
              onViewProducts={() => handleOpenCategories('events_exhibitions')}
              onSelectItem={(item) => {
                handleOpenCategories(item.category || 'events_exhibitions', item.id);
              }}
            />

            {/* Signage Making Company in Lagos, Nigeria (Matching Reference) */}
            <SignageCompanySection
              onViewProducts={() => handleOpenCategories('signages')}
              onSelectItem={(item) => {
                handleOpenCategories(item.category || 'signages', item.id);
              }}
            />

            {/* Why Businesses Choose SILVER & GOLD INKSHINE LTD */}
            <WhyChooseUsSection
              title={websiteContent.whyChooseTitle}
              description={websiteContent.whyChooseDescription}
            />

            {/* Custom Award Plaques and Trophies Printing (Matching Reference) */}
            <CustomAwardsSection
              onViewProducts={() => handleOpenCategories('awards')}
              onSelectItem={(item) => {
                handleOpenCategories(item.category || 'awards', item.id);
              }}
            />

            {/* Trust & Social Proof (Reviews, Client Logos, Completed Jobs) */}
            <SocialProofSection />

            {/* Official Production Plant & Location Map */}
            <LocationMapSection
              mapUrl={websiteContent.googleMapsUrl}
              embedUrl={websiteContent.googleMapsEmbedUrl}
              onRequestQuote={() => setIsQuoteModalOpen(true)}
            />
          </>
        )}
      </main>

      {/* Global Footer (only on customer-facing views) */}
      {viewMode !== 'admin' && (
        <Footer
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            handleOpenCategoriesPage(cat);
          }}
          onOpenAdmin={() => {
            setViewMode('admin');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenInfoModal={handleOpenInfoModal}
          onOpenCategoriesPage={handleOpenCategoriesPage}
          onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
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
          handleOpenCategoriesPage(cat);
        }}
      />

      {/* iPhone 17-Style Frosted Glass Floating Bottom Dock (Mobile + Desktop) */}
      <GlassBottomDock
        onOpenBookOnline={() => handleOpenBookOnline()}
        onOpenInfo={() => handleOpenInfoModal('info')}
        onOpenCatalog={() => handleOpenCategoriesPage('all')}
        onOpenAdmin={() => {
          setViewMode('admin');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        activeModal={viewMode === 'admin' ? 'admin' : viewMode === 'categories' ? 'catalog' : isBookOnlineOpen ? 'book' : isCompanyInfoOpen ? 'info' : isCatalogOpen ? 'catalog' : null}
      />

      {/* Floating Quick Mode Badge (Visible in Storefront / Categories to return to Admin with 1 click) */}
      {viewMode !== 'admin' && (
        <div className="fixed bottom-4 left-4 z-50">
          <button
            type="button"
            onClick={() => {
              setViewMode('admin');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-stone-950/90 hover:bg-black text-amber-400 border border-amber-500/40 shadow-xl backdrop-blur-md text-xs font-black hover:scale-105 active:scale-95 transition-all cursor-pointer group"
            title="Switch directly to Admin Desk"
          >
            <ShieldCheck className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>Open Admin Desk</span>
          </button>
        </div>
      )}

      {/* Book Online Modal */}
      <BookOnlineModal
        isOpen={isBookOnlineOpen}
        onClose={() => setIsBookOnlineOpen(false)}
        preselectedService={bookOnlineService}
      />

      {/* Product Categories Modal */}
      <CatalogModal
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        products={products}
        initialCategory={activeCategoryTag}
        onSelectProduct={(prod) => {
          setIsCatalogOpen(false);
          setQuickViewProduct(prod);
        }}
        onBookSample={(sampleTitle) => {
          setIsCatalogOpen(false);
          handleOpenBookOnline(sampleTitle);
        }}
        onScrollToPageCatalog={() => {
          setIsCatalogOpen(false);
          scrollToCatalog();
        }}
      />

      {/* Tell Us About Your Print Job / Request a Quote Modal (Silver & Gold Inkshine Ltd) */}
      <RequestQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        onSelectCategory={(catKey) => {
          handleOpenCategoriesPage(catKey);
        }}
      />
    </div>
  );
}
