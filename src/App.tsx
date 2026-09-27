import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Header } from './components/layout/Header';
import { HeroSection } from './components/storefront/HeroSection';
import { BrandIntroSection } from './components/storefront/BrandIntroSection';
import { PrintingCategoriesQuickNav } from './components/storefront/PrintingCategoriesQuickNav';
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
  deleteProductFromCloud,
  safeLocalStorageSet
} from './lib/firebase';
import { loadProductsFromIndexedDb, loadWebsiteContentFromIndexedDb } from './lib/indexedDbStorage';
import { ensureCompleteCatalog } from './data/homepageCatalogProducts';
import {
  applyImageLocksToProducts,
  applyImageLocksToWebsiteContent,
  lockProductImage,
  lockHeroSlideImage,
  lockHeroBackgroundImage,
  lockShowcaseServiceImage,
  lockAllCurrentState
} from './lib/imageLockRegistry';

export default function App() {
  // Global mutable catalog & orders state with local storage persistence
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('inkshine_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return applyImageLocksToProducts(ensureCompleteCatalog(parsed));
        }
      }
    } catch (e) {
      console.error('Error loading saved products:', e);
    }
    return applyImageLocksToProducts(ensureCompleteCatalog(SAMPLE_PRODUCTS));
  });

  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

  // Dynamic Website CMS Content with local storage persistence
  const [websiteContent, setWebsiteContent] = useState<WebsiteContent>(() => {
    return applyImageLocksToWebsiteContent(loadSavedWebsiteContent());
  });

  // Real-time Cloud Database sync across all devices via Firebase Firestore + IndexedDB Fallback
  useEffect(() => {
    // 1. Immediately hydrate catalog & website content from high-capacity IndexedDB (survives tab close, refresh, and quota limits)
    loadProductsFromIndexedDb().then((storedProds) => {
      if (storedProds && storedProds.length > 0) {
        setProducts(applyImageLocksToProducts(ensureCompleteCatalog(storedProds)));
      }
    }).catch(console.warn);

    loadWebsiteContentFromIndexedDb().then((storedContent) => {
      if (storedContent) {
        setWebsiteContent((prev) => applyImageLocksToWebsiteContent({
          ...prev,
          ...storedContent,
        }));
      }
    }).catch(console.warn);

    const unsubscribeContent = subscribeWebsiteContent(
      (cloudContent: WebsiteContent) => {
        if (cloudContent) {
          setWebsiteContent((prev) => applyImageLocksToWebsiteContent({
            ...prev,
            ...cloudContent,
          }));
        }
      },
      (err: any) => console.warn('Website content sync notice:', err?.message || err)
    );

    const unsubscribeProducts = subscribeProducts(
      (cloudProducts: Product[]) => {
        if (cloudProducts && cloudProducts.length > 0) {
          setProducts(applyImageLocksToProducts(ensureCompleteCatalog(cloudProducts)));
        }
      },
      (err: any) => console.warn('Products sync notice:', err?.message || err)
    );

    return () => {
      unsubscribeContent();
      unsubscribeProducts();
    };
  }, []);

  const handleUpdateWebsiteContent = (newContent: WebsiteContent) => {
    // Lock all new content images permanently so they don't revert
    if (newContent.heroSlides) {
      newContent.heroSlides.forEach((s) => {
        if (s.imageUrl) lockHeroSlideImage(s.id, s.imageUrl, s.title, true);
      });
    }
    if (newContent.heroBackgroundImage) {
      lockHeroBackgroundImage(newContent.heroBackgroundImage, true);
    }
    if (newContent.showcaseServices) {
      newContent.showcaseServices.forEach((sc) => {
        if (sc.imageUrl) lockShowcaseServiceImage(sc.id, sc.imageUrl, sc.title, true);
      });
    }

    const lockedContent = applyImageLocksToWebsiteContent(newContent);
    setWebsiteContent(lockedContent);
    saveWebsiteContent(lockedContent);
    saveWebsiteContentToCloud(lockedContent).catch((err) => {
      console.warn('Cloud website content sync notice:', err?.message || err);
    });
  };

  const handleResetWebsiteContent = () => {
    const defaults = resetWebsiteContentToDefaults();
    setWebsiteContent(defaults);
    saveWebsiteContentToCloud(defaults).catch((err) => {
      console.warn('Cloud reset sync notice:', err?.message || err);
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
  // By default, open the main customer-facing website ('storefront') unless explicitly requested via URL pathname (/admin), hash (#admin), or parameter (?admin or ?view=admin)
  const [viewMode, setViewMode] = useState<'storefront' | 'categories' | 'pdp' | 'checkout' | 'stage1_sandbox' | 'admin'>(() => {
    if (typeof window !== 'undefined') {
      const pathname = (window.location.pathname || '').toLowerCase();
      const hash = (window.location.hash || '').toLowerCase();
      const params = new URLSearchParams(window.location.search);
      const viewParam = (params.get('view') || '').toLowerCase();
      const hasAdminParam = params.has('admin');

      if (
        pathname === '/admin' || 
        pathname.startsWith('/admin/') || 
        pathname.endsWith('/admin') || 
        hash === '#admin' || 
        hash.startsWith('#admin') ||
        viewParam === 'admin' || 
        hasAdminParam
      ) {
        return 'admin';
      }
      if (hash === '#categories' || viewParam === 'categories' || pathname.endsWith('/categories')) {
        return 'categories';
      }
    }
    return 'storefront';
  });
  const [adminInitialCategory, setAdminInitialCategory] = useState<string | undefined>(undefined);

  // Synchronize view mode with URL hash, pathname, or query params
  useEffect(() => {
    const syncViewWithUrl = () => {
      const pathname = (window.location.pathname || '').toLowerCase();
      const hash = (window.location.hash || '').toLowerCase();
      const params = new URLSearchParams(window.location.search);
      const viewParam = (params.get('view') || '').toLowerCase();
      const hasAdminParam = params.has('admin');

      if (
        pathname === '/admin' || 
        pathname.startsWith('/admin/') || 
        pathname.endsWith('/admin') || 
        hash === '#admin' || 
        hash.startsWith('#admin') ||
        viewParam === 'admin' || 
        hasAdminParam
      ) {
        setViewMode('admin');
      } else if (hash === '#categories' || viewParam === 'categories' || pathname.endsWith('/categories')) {
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

  const handleOpenAdmin = (categoryKey?: string) => {
    if (categoryKey && typeof categoryKey === 'string') {
      setAdminInitialCategory(categoryKey);
    }
    setViewMode('admin');
    try {
      if (window.location.hash !== '#admin') {
        window.location.hash = '#admin';
      }
    } catch (e) {
      console.error(e);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReturnToStorefront = (catKey?: string) => {
    if (typeof catKey === 'string' && catKey.trim().length > 0) {
      handleOpenCategoriesPage(catKey);
    } else {
      setSelectedCategory('all');
      setSearchQuery('');
      setViewMode('storefront');
      try {
        if (window.location.hash === '#admin') {
          history.replaceState(null, '', window.location.pathname + window.location.search);
        }
      } catch (e) {}
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard shortcut Ctrl+Shift+A or Cmd+Shift+A to open Admin Desk
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        handleOpenAdmin();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Product Add / Update / Delete Handlers with LocalStorage & Firestore Cloud Persistence
  const handleAddProduct = (newProduct: Product) => {
    if (newProduct.image) {
      lockProductImage(newProduct.id, newProduct.image, newProduct.images, newProduct.name, true);
    }
    setProducts((prev) => {
      const next = [newProduct, ...prev];
      safeLocalStorageSet('inkshine_products', JSON.stringify(next));
      saveSingleProductToCloud(newProduct).catch((err) => {
        console.warn('Product cloud sync notice:', err?.message || err);
      });
      saveProductsToCloud(next).catch((err) => {
        console.warn('Catalog cloud sync notice:', err?.message || err);
      });
      return next;
    });
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => {
      const next = prev.filter((p) => p.id !== productId);
      safeLocalStorageSet('inkshine_products', JSON.stringify(next));
      deleteProductFromCloud(productId).catch((err) => {
        console.warn('Product delete cloud notice:', err?.message || err);
      });
      saveProductsToCloud(next).catch((err) => {
        console.warn('Catalog cloud sync notice:', err?.message || err);
      });
      return next;
    });
  };

  const handleUpdateProduct = (productId: string, updates: Partial<Product>) => {
    if (updates.image) {
      lockProductImage(productId, updates.image, updates.images, updates.name, true);
    }
    setProducts((prev) => {
      const next = prev.map((p) => (p.id === productId ? { ...p, ...updates } : p));
      safeLocalStorageSet('inkshine_products', JSON.stringify(next));
      const updatedProduct = next.find((p) => p.id === productId);
      if (updatedProduct) {
        saveSingleProductToCloud(updatedProduct).catch((err) => {
          console.warn('Product update cloud notice:', err?.message || err);
        });
      }
      saveProductsToCloud(next).catch((err) => {
        console.warn('Catalog cloud sync notice:', err?.message || err);
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

  const handleSectionItemSelect = (item: { id: string; title?: string; category?: string }) => {
    const matchedProd =
      products.find(
        (p) =>
          p.id === item.id ||
          (item.title && p.name.trim().toLowerCase() === item.title.trim().toLowerCase())
      ) ||
      SAMPLE_PRODUCTS.find(
        (p) =>
          p.id === item.id ||
          (item.title && p.name.trim().toLowerCase() === item.title.trim().toLowerCase())
      );

    if (matchedProd) {
      handleOpenProductDetailPage(matchedProd);
    } else {
      handleOpenCategories(item.category || 'all', item.id);
    }
  };

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen bg-[#08080a] text-stone-100 font-sans antialiased flex flex-col justify-between selection:bg-[#f5be38] selection:text-black relative">
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
          />
        )}

        {viewMode === 'admin' && (
          <AdminDashboard
            orders={orders || []}
            products={products || []}
            websiteContent={websiteContent}
            initialTab="categories"
            initialCategoryKey={adminInitialCategory}
            onUpdateWebsiteContent={handleUpdateWebsiteContent}
            onResetAllWebsiteContentToDefaults={handleResetWebsiteContent}
            onReturnToStorefront={handleReturnToStorefront}
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
            {/* 1. Hero Section (Clean, high-impact printing press layout with permanent video showcase) */}
            <HeroSection
              onExploreProducts={scrollToCatalog}
              onOpenPricingSandbox={() => setViewMode('stage1_sandbox')}
              onSelectProductQuickView={handleOpenProductById}
              onSelectCategory={(cat) => handleOpenCategories(cat)}
              slides={websiteContent.heroSlides}
              headline={websiteContent.heroHeadline}
              subheadline={websiteContent.heroSubheadline}
              eyebrow={websiteContent.heroEyebrow}
              description={websiteContent.heroDescription}
              backgroundImageUrl={
                websiteContent.heroBackgroundImage && 
                websiteContent.heroBackgroundImage !== '/homepage-bg.jpg' && 
                websiteContent.heroBackgroundImage !== '/7aa493911d023086a5442472c889df70.jpg' &&
                websiteContent.heroBackgroundImage !== '/hero-banner-main.webp' &&
                !websiteContent.heroBackgroundImage.includes('unsplash')
                  ? websiteContent.heroBackgroundImage
                  : 'https://cdn.hstockplus.org/uploads/public/img-1790066633477-1b16a758309b0fff.webp'
              }
            />

            {/* 2. Instant Printing Press Category Navigator & 4 Quality Pillars ("What would you like to print today?") */}
            <PrintingCategoriesQuickNav
              onSelectCategory={(cat) => handleOpenCategories(cat)}
              onExploreCatalog={() => handleOpenCategories('all')}
            />

            {/* 3. Business Stationery & Office Printing (Top Pitch: Silver & Gold on Black) */}
            <BusinessStationerySection
              products={products}
              onViewProducts={() => handleOpenCategories('cards_invitations')}
              onSelectItem={handleSectionItemSelect}
            />

            {/* 4. Brand Introduction & Promotions Overview (100% Quality, 12% Bulk Discounts, Fast Delivery) */}
            <BrandIntroSection onExploreProducts={scrollToCatalog} />

            {/* 5. Top-Quality Printing Services Showcase Carousel */}
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

            {/* 6. Banners, Display Stands & Advertising Materials Carousel */}
            <BannersDisplayStandsSection
              products={products}
              onViewProducts={() => handleOpenCategories('banners_stands')}
              onSelectItem={handleSectionItemSelect}
            />

            {/* 7. Packaging, Labels & Custom Cartons (Commercial print priority) */}
            <PackagingLabelsSection
              products={products}
              onViewProducts={() => handleOpenCategories('packaging_shipping_cartons')}
              onSelectItem={handleSectionItemSelect}
            />

            {/* 8. Branded Corporate Gifts & Promotional Items */}
            <BrandedGiftsSection
              products={products}
              onViewProducts={() => handleOpenCategories('gift_items_souvenirs')}
              onSelectItem={handleSectionItemSelect}
            />

            {/* 9. Signage Making & 3D Letter Fabrication */}
            <SignageCompanySection
              products={products}
              onViewProducts={() => handleOpenCategories('signages')}
              onSelectItem={handleSectionItemSelect}
            />

            {/* 10. Event, Exhibition and Activation Branding Materials */}
            <EventExhibitionSection
              products={products}
              onViewProducts={() => handleOpenCategories('events_exhibitions')}
              onSelectItem={handleSectionItemSelect}
            />

            {/* 11. Nigeria's Trusted Online Printing Company Feature */}
            <TrustedCompanyFeatureSection />

            {/* 12. Custom Award Plaques and Trophies Printing */}
            <CustomAwardsSection
              products={products}
              onViewProducts={() => handleOpenCategories('awards')}
              onSelectItem={handleSectionItemSelect}
            />

            {/* 13. Why Businesses Choose SILVER & GOLD INKSHINE LTD */}
            <WhyChooseUsSection
              title={websiteContent.whyChooseTitle}
              description={websiteContent.whyChooseDescription}
            />

            {/* 14. Trust & Social Proof (Verified Reviews, Client Logos, Real Completed Jobs) */}
            <SocialProofSection />

            {/* 15. Official Production Plant & Location Map */}
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
        activeModal={viewMode === 'categories' ? 'catalog' : isBookOnlineOpen ? 'book' : isCompanyInfoOpen ? 'info' : isCatalogOpen ? 'catalog' : null}
      />

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
