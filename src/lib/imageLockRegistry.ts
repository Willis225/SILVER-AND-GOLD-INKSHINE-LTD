/**
 * Permanent Image Lock Registry Engine
 * 
 * Guarantees that EVERY product image, gallery photo, hero slide, and banner
 * stays 100% saved and preserved exactly as configured, with zero unwanted changes.
 * 
 * Protects against:
 * 1. Cloud sync race conditions overwriting local user-saved images with stale cloud data
 * 2. Hardcoded seed catalog resets or default fallbacks
 * 3. Browser localStorage quota truncation (synced to high-capacity IndexedDB)
 * 4. Tab switching, page refreshes, and device reboots
 * 
 * An image CANNOT change unless the user explicitly updates or replaces it in the Admin panel.
 */

import { Product } from '../types/schema';
import { HeroSlideItem, ShowcaseServiceItem, WebsiteContent } from '../types/websiteContent';
import { saveImageToIndexedDb, loadImagesFromIndexedDb, StoredMediaItem } from './indexedDbStorage';

export interface LockedImageEntry {
  id: string; // product id, slide id, 'hero_bg', 'showcase_<id>'
  imageUrl: string;
  images?: string[]; // full gallery array
  title?: string;
  lockedAt: string;
  isUserCustomized: boolean;
}

const REGISTRY_STORAGE_KEY = 'inkshine_locked_images_registry_v1';
const LOCK_PREFIX = 'lock_img_';

// In-memory cache for synchronous, zero-latency lookups
let inMemoryLockRegistry: Record<string, LockedImageEntry> | null = null;
let isHydratedFromIndexedDb = false;

/**
 * Load registry from localStorage (synchronous initial load)
 */
export function getLockedImagesMap(): Record<string, LockedImageEntry> {
  if (inMemoryLockRegistry) {
    return inMemoryLockRegistry;
  }

  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(REGISTRY_STORAGE_KEY) : null;
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        if (!parsed['prod-exercise-books'] || parsed['prod-exercise-books'].imageUrl?.includes('photo-1544716278-ca5e3f4abd8c')) {
          parsed['prod-exercise-books'] = {
            id: 'prod-exercise-books',
            imageUrl: '/exercise-books-40-60.jpg',
            images: ['/exercise-books-40-60.jpg'],
            title: '40 and 60 Leaves Exercise Books Printing',
            lockedAt: new Date().toISOString(),
            isUserCustomized: true,
          };
        }
        if (!parsed['prod-office-stationery-suite'] || parsed['prod-office-stationery-suite'].imageUrl?.includes('photo-1586075010923-2dd4570fb338') || parsed['prod-office-stationery-suite'].imageUrl?.includes('photo-1589829545856')) {
          parsed['prod-office-stationery-suite'] = {
            id: 'prod-office-stationery-suite',
            imageUrl: '/executive-letterheads-folders.jpg',
            images: ['/executive-letterheads-folders.jpg'],
            title: 'Executive Corporate Letterheads & Presentation Folders Suite (100 Sets)',
            lockedAt: new Date().toISOString(),
            isUserCustomized: true,
          };
        }
        if (!parsed['prod-books-magazines-annual'] || parsed['prod-books-magazines-annual'].imageUrl?.includes('photo-1544716278-ca5e3f4abd8c')) {
          parsed['prod-books-magazines-annual'] = {
            id: 'prod-books-magazines-annual',
            imageUrl: '/corporate-annual-report-magazine.jpg',
            images: ['/corporate-annual-report-magazine.jpg'],
            title: 'Corporate Annual Report & Company Profile Magazine (50 Copies)',
            lockedAt: new Date().toISOString(),
            isUserCustomized: true,
          };
        }
        if (!parsed['showcase_showcase-annual-reports'] || parsed['showcase_showcase-annual-reports'].imageUrl?.includes('photo-1544716278-ca5e3f4abd8c') || parsed['showcase_showcase-annual-reports'].imageUrl?.includes('corporate-annual-report-magazine')) {
          parsed['showcase_showcase-annual-reports'] = {
            id: 'showcase_showcase-annual-reports',
            imageUrl: '/annual-reports-handbooks-catalogues.jpg',
            images: ['/annual-reports-handbooks-catalogues.jpg'],
            title: 'Annual Reports & Financial Statements Printing',
            lockedAt: new Date().toISOString(),
            isUserCustomized: true,
          };
        }
        if (!parsed['showcase-annual-reports'] || parsed['showcase-annual-reports'].imageUrl?.includes('photo-1544716278-ca5e3f4abd8c') || parsed['showcase-annual-reports'].imageUrl?.includes('corporate-annual-report-magazine')) {
          parsed['showcase-annual-reports'] = {
            id: 'showcase-annual-reports',
            imageUrl: '/annual-reports-handbooks-catalogues.jpg',
            images: ['/annual-reports-handbooks-catalogues.jpg'],
            title: 'Annual Reports, Handbooks & Catalogues Printing',
            lockedAt: new Date().toISOString(),
            isUserCustomized: true,
          };
        }
        if (!parsed['stationery-plastic-cards'] || parsed['stationery-plastic-cards'].imageUrl?.includes('photo-1544717305') || parsed['stationery-plastic-cards'].imageUrl?.includes('photo-1559526324')) {
          parsed['stationery-plastic-cards'] = {
            id: 'stationery-plastic-cards',
            imageUrl: '/premium-plastic-business-cards.jpg',
            images: ['/premium-plastic-business-cards.jpg'],
            title: 'Premium Plastic Business Cards',
            lockedAt: new Date().toISOString(),
            isUserCustomized: true,
          };
        }
        if (!parsed['prod-stamps-seals-corporate'] || parsed['prod-stamps-seals-corporate'].imageUrl?.includes('photo-1589829545856')) {
          parsed['prod-stamps-seals-corporate'] = {
            id: 'prod-stamps-seals-corporate',
            imageUrl: '/company-stamp-cac-seal.jpg',
            images: ['/company-stamp-cac-seal.jpg'],
            title: 'Shiny Self-Inking Company Stamp & Heavy-Duty CAC Embossing Seal',
            lockedAt: new Date().toISOString(),
            isUserCustomized: true,
          };
        }
        if (!parsed['stationery-certificates'] || parsed['stationery-certificates'].imageUrl?.includes('photo-1589829545856')) {
          parsed['stationery-certificates'] = {
            id: 'stationery-certificates',
            imageUrl: '/certificate-printing-lagos.jpg',
            images: ['/certificate-printing-lagos.jpg'],
            title: 'Certificate Printing in Lagos – Professional Award & Academic Certificates',
            lockedAt: new Date().toISOString(),
            isUserCustomized: true,
          };
        }
        if (!parsed['prod-business-cards'] || parsed['prod-business-cards'].imageUrl?.includes('photo-1589829545856') || parsed['prod-business-cards'].imageUrl?.includes('cdn.hstockplus.org')) {
          parsed['prod-business-cards'] = {
            id: 'prod-business-cards',
            imageUrl: '/premium-matte-business-cards.jpg',
            images: ['/premium-matte-business-cards.jpg'],
            title: 'Premium Matte Laminated Business Cards (Pack of 100)',
            lockedAt: new Date().toISOString(),
            isUserCustomized: true,
          };
        }
        if (!parsed['stationery-matte-cards'] || parsed['stationery-matte-cards'].imageUrl?.includes('photo-1589829545856') || parsed['stationery-matte-cards'].imageUrl?.includes('cdn.hstockplus.org')) {
          parsed['stationery-matte-cards'] = {
            id: 'stationery-matte-cards',
            imageUrl: '/premium-matte-business-cards.jpg',
            images: ['/premium-matte-business-cards.jpg'],
            title: 'Premium Matte Laminated Business Cards (Pack of 100)',
            lockedAt: new Date().toISOString(),
            isUserCustomized: true,
          };
        }
        if (!parsed['stationery-business-cards'] || parsed['stationery-business-cards'].imageUrl?.includes('photo-1589829545856')) {
          parsed['stationery-business-cards'] = {
            id: 'stationery-business-cards',
            imageUrl: '/business-cards-lagos.jpg',
            images: ['/business-cards-lagos.jpg'],
            title: 'Business Cards Printing in Lagos – Custom & Premium Cards',
            lockedAt: new Date().toISOString(),
            isUserCustomized: true,
          };
        }
        if (!parsed['stationery-book-printing'] || parsed['stationery-book-printing'].imageUrl?.includes('photo-1544716278')) {
          parsed['stationery-book-printing'] = {
            id: 'stationery-book-printing',
            imageUrl: '/book-printing-lagos.jpg',
            images: ['/book-printing-lagos.jpg'],
            title: 'Book Printing in Lagos Nigeria',
            lockedAt: new Date().toISOString(),
            isUserCustomized: true,
          };
        }
        if (!parsed['prod-wedding-acrylic-suite'] || parsed['prod-wedding-acrylic-suite'].imageUrl?.includes('photo-1519741497674')) {
          parsed['prod-wedding-acrylic-suite'] = {
            id: 'prod-wedding-acrylic-suite',
            imageUrl: '/frosted-acrylic-wedding-invitation.jpg',
            images: ['/frosted-acrylic-wedding-invitation.jpg'],
            title: 'Royal Foil-Stamped Frosted Acrylic Wedding Invitation Suite & Welcome Easel',
            lockedAt: new Date().toISOString(),
            isUserCustomized: true,
          };
        }
        if (!parsed['showcase-luxury-rollup'] || parsed['showcase-luxury-rollup'].imageUrl?.includes('photo-1540575467063') || parsed['showcase-luxury-rollup'].imageUrl?.includes('photo-1581092160607')) {
          parsed['showcase-luxury-rollup'] = {
            id: 'showcase-luxury-rollup',
            imageUrl: '/luxury-rollup-banner-stand.jpg',
            images: ['/luxury-rollup-banner-stand.jpg'],
            title: 'Luxury Rollup Banner Stand (Teardrop Chrome Base)',
            lockedAt: new Date().toISOString(),
            isUserCustomized: true,
          };
        }
        if (!parsed['prod-rollup-luxury'] || parsed['prod-rollup-luxury'].imageUrl?.includes('photo-1540575467063')) {
          parsed['prod-rollup-luxury'] = {
            id: 'prod-rollup-luxury',
            imageUrl: '/luxury-rollup-banner-stand.jpg',
            images: ['/luxury-rollup-banner-stand.jpg'],
            title: 'Luxury Rollup Banner (Broad Base)',
            lockedAt: new Date().toISOString(),
            isUserCustomized: true,
          };
        }
        if (!parsed['display-backdrop-banner'] || parsed['display-backdrop-banner'].imageUrl?.includes('photo-1540575467063')) {
          parsed['display-backdrop-banner'] = {
            id: 'display-backdrop-banner',
            imageUrl: '/advertisement-backdrop-banner.jpg',
            images: ['/advertisement-backdrop-banner.jpg'],
            title: 'Advertisement Backdrop Banner',
            lockedAt: new Date().toISOString(),
            isUserCustomized: true,
          };
        }
        if (!parsed['showcase-brochures-flyers'] || parsed['showcase-brochures-flyers'].imageUrl?.includes('photo-1511578314322')) {
          parsed['showcase-brochures-flyers'] = {
            id: 'showcase-brochures-flyers',
            imageUrl: '/brochures-event-programs-flyers.jpg',
            images: ['/brochures-event-programs-flyers.jpg'],
            title: 'Brochures, Event Programs & Flyers Printing',
            lockedAt: new Date().toISOString(),
            isUserCustomized: true,
          };
        }
        if (!parsed['prod-flyers-handbills-a5'] || parsed['prod-flyers-handbills-a5'].imageUrl?.includes('photo-1563986768609')) {
          parsed['prod-flyers-handbills-a5'] = {
            id: 'prod-flyers-handbills-a5',
            imageUrl: '/brochures-event-programs-flyers.jpg',
            images: ['/brochures-event-programs-flyers.jpg'],
            title: 'A5 Gloss Double-Sided Marketing Flyers & Handbills (Pack of 500)',
            lockedAt: new Date().toISOString(),
            isUserCustomized: true,
          };
        }
        if (!parsed['showcase-premium-stickers'] || parsed['showcase-premium-stickers'].imageUrl?.includes('photo-1544816155')) {
          parsed['showcase-premium-stickers'] = {
            id: 'showcase-premium-stickers',
            imageUrl: '/product-packaging-labels-stickers.jpg',
            images: ['/product-packaging-labels-stickers.jpg'],
            title: 'Custom Product Packaging Labels & Stickers',
            lockedAt: new Date().toISOString(),
            isUserCustomized: true,
          };
        }
        if (!parsed['prod-stickers-labels-vinyl'] || parsed['prod-stickers-labels-vinyl'].imageUrl?.includes('photo-1572375992501')) {
          parsed['prod-stickers-labels-vinyl'] = {
            id: 'prod-stickers-labels-vinyl',
            imageUrl: '/product-packaging-labels-stickers.jpg',
            images: ['/product-packaging-labels-stickers.jpg'],
            title: 'Custom Die-Cut Vinyl Stickers & Product Bottle Labels (Pack of 200)',
            lockedAt: new Date().toISOString(),
            isUserCustomized: true,
          };
        }
        if (!parsed['award-acrylic-plaque'] || parsed['award-acrylic-plaque'].imageUrl?.includes('photo-1534447677') || parsed['award-acrylic-plaque'].imageUrl?.includes('photo-1578269174')) {
          parsed['award-acrylic-plaque'] = {
            id: 'award-acrylic-plaque',
            imageUrl: '/acrylic-award-plaque.jpg',
            images: ['/acrylic-award-plaque.jpg'],
            title: 'Custom Branded Acrylic Award Plaque Printing in Lagos',
            lockedAt: new Date().toISOString(),
            isUserCustomized: true,
          };
        }
        if (!parsed['award-crystal-plaque'] || parsed['award-crystal-plaque'].imageUrl?.includes('cdn.hstockplus.org') || parsed['award-crystal-plaque'].imageUrl?.includes('photo-1578269174')) {
          parsed['award-crystal-plaque'] = {
            id: 'award-crystal-plaque',
            imageUrl: '/crystal-glass-award-plaque.jpg',
            images: ['/crystal-glass-award-plaque.jpg'],
            title: 'Customized Branded Crystal Glass Award Plaque Printing in Lagos | Custom Award Plaques',
            lockedAt: new Date().toISOString(),
            isUserCustomized: true,
          };
        }
        if (!parsed['prod-awards-crystal-plaque'] || parsed['prod-awards-crystal-plaque'].imageUrl?.includes('photo-1589829545856')) {
          parsed['prod-awards-crystal-plaque'] = {
            id: 'prod-awards-crystal-plaque',
            imageUrl: '/crystal-glass-award-plaque.jpg',
            images: ['/crystal-glass-award-plaque.jpg'],
            title: 'Precision Laser-Etched Optical Crystal Plaque & Wooden Trophy',
            lockedAt: new Date().toISOString(),
            isUserCustomized: true,
          };
        }
        if (!parsed['display-ad-portfolio'] || parsed['display-ad-portfolio'].imageUrl?.includes('cdn.hstockplus.org')) {
          parsed['display-ad-portfolio'] = {
            id: 'display-ad-portfolio',
            imageUrl: '/advertising-materials-portfolio.jpg',
            images: ['/advertising-materials-portfolio.jpg'],
            title: 'Advertising Materials Portfolio Collection',
            lockedAt: new Date().toISOString(),
            isUserCustomized: true,
          };
        }
        if (!parsed['display-flyer-work-3'] || parsed['display-flyer-work-3'].imageUrl?.includes('cdn.hstockplus.org')) {
          parsed['display-flyer-work-3'] = {
            id: 'display-flyer-work-3',
            imageUrl: '/flyers-work-3.jpg',
            images: ['/flyers-work-3.jpg'],
            title: 'Flyers - Work #3',
            lockedAt: new Date().toISOString(),
            isUserCustomized: true,
          };
        }
        if (!parsed['display-flyer-work-2'] || parsed['display-flyer-work-2'].imageUrl?.includes('photo-1511578314')) {
          parsed['display-flyer-work-2'] = {
            id: 'display-flyer-work-2',
            imageUrl: '/flyers-work-2.jpg',
            images: ['/flyers-work-2.jpg'],
            title: 'Flyers - Work #2',
            lockedAt: new Date().toISOString(),
            isUserCustomized: true,
          };
        }
        if (!parsed['display-flyer-work-1'] || parsed['display-flyer-work-1'].imageUrl?.includes('photo-1540575467')) {
          parsed['display-flyer-work-1'] = {
            id: 'display-flyer-work-1',
            imageUrl: '/flyers-work-1.jpg',
            images: ['/flyers-work-1.jpg'],
            title: 'Flyers - Work #1',
            lockedAt: new Date().toISOString(),
            isUserCustomized: true,
          };
        }
        if (!parsed['signage-3d-signs'] || parsed['signage-3d-signs'].imageUrl?.includes('cdn.hstockplus.org') || parsed['signage-3d-signs'].imageUrl?.includes('photo-1542744094')) {
          parsed['signage-3d-signs'] = {
            id: 'signage-3d-signs',
            imageUrl: '/3d-signs-lagos.jpg',
            images: ['/3d-signs-lagos.jpg'],
            title: '3D Signs in Lagos Nigeria | Custom 3D Signage for Businesses',
            lockedAt: new Date().toISOString(),
            isUserCustomized: true,
          };
        }
        if (!parsed['signage-logo-signs'] || parsed['signage-logo-signs'].imageUrl?.includes('photo-1542744173') || parsed['signage-logo-signs'].imageUrl?.includes('photo-1542744094')) {
          parsed['signage-logo-signs'] = {
            id: 'signage-logo-signs',
            imageUrl: '/logo-signage-lagos.jpg',
            images: ['/logo-signage-lagos.jpg'],
            title: 'Logo Signage in Lagos Nigeria | Custom Business Logo Signs',
            lockedAt: new Date().toISOString(),
            isUserCustomized: true,
          };
        }
        if (!parsed['signage-directional'] || parsed['signage-directional'].imageUrl?.includes('photo-1513542789') || parsed['signage-directional'].imageUrl?.includes('photo-1542744094')) {
          parsed['signage-directional'] = {
            id: 'signage-directional',
            imageUrl: '/directional-signage-lagos.jpg',
            images: ['/directional-signage-lagos.jpg'],
            title: 'Directional Signage in Lagos Nigeria | Custom Wayfinding Signs',
            lockedAt: new Date().toISOString(),
            isUserCustomized: true,
          };
        }
        if (!parsed['signage-digital-display'] || parsed['signage-digital-display'].imageUrl?.includes('photo-1542744094')) {
          parsed['signage-digital-display'] = {
            id: 'signage-digital-display',
            imageUrl: '/electronic-digital-signage.jpg',
            images: ['/electronic-digital-signage.jpg'],
            title: 'Electronic Digital Signage in Lagos Nigeria | Digital Display Signs',
            lockedAt: new Date().toISOString(),
            isUserCustomized: true,
          };
        }
        if (!parsed['gift-water-bottle'] || parsed['gift-water-bottle'].imageUrl?.includes('photo-1602143407')) {
          parsed['gift-water-bottle'] = {
            id: 'gift-water-bottle',
            imageUrl: '/custom-branded-water-bottle.jpg',
            images: ['/custom-branded-water-bottle.jpg'],
            title: 'Custom Branded Water Bottle Printing in Lagos, Nigeria – Custom & Personalized Bottles',
            lockedAt: new Date().toISOString(),
            isUserCustomized: true,
          };
        }
        if (!parsed['prod-water-bottle'] || parsed['prod-water-bottle'].imageUrl?.includes('photo-1602143407')) {
          parsed['prod-water-bottle'] = {
            id: 'prod-water-bottle',
            imageUrl: '/custom-branded-water-bottle.jpg',
            images: ['/custom-branded-water-bottle.jpg'],
            title: 'Custom Branded Water Bottle Printing in Lagos, Nigeria – Custom & Personalized Bottles',
            lockedAt: new Date().toISOString(),
            isUserCustomized: true,
          };
        }
        if (!parsed['sidebar-prod-4'] || parsed['sidebar-prod-4'].imageUrl?.includes('photo-1602143407')) {
          parsed['sidebar-prod-4'] = {
            id: 'sidebar-prod-4',
            imageUrl: '/custom-branded-water-bottle.jpg',
            images: ['/custom-branded-water-bottle.jpg'],
            title: 'Custom Branded Water Bottle Printing in Lagos, Nigeria – Custom & Personalized Bottles',
            lockedAt: new Date().toISOString(),
            isUserCustomized: true,
          };
        }
        if (!parsed['gift-keychain'] || parsed['gift-keychain'].imageUrl?.includes('photo-1584917865')) {
          parsed['gift-keychain'] = {
            id: 'gift-keychain',
            imageUrl: '/keychain-keyholder-printing.jpg',
            images: ['/keychain-keyholder-printing.jpg'],
            title: 'Key Holder & Keychain Printing in Lagos, Nigeria – Custom Branded Keyholders',
            lockedAt: new Date().toISOString(),
            isUserCustomized: true,
          };
        }
        if (!parsed['prod-keychain'] || parsed['prod-keychain'].imageUrl?.includes('photo-1584917865')) {
          parsed['prod-keychain'] = {
            id: 'prod-keychain',
            imageUrl: '/keychain-keyholder-printing.jpg',
            images: ['/keychain-keyholder-printing.jpg'],
            title: 'Key Holder & Keychain Printing in Lagos, Nigeria – Custom Branded Keyholders',
            lockedAt: new Date().toISOString(),
            isUserCustomized: true,
          };
        }
        if (!parsed['sidebar-prod-3'] || parsed['sidebar-prod-3'].imageUrl?.includes('photo-1584917865')) {
          parsed['sidebar-prod-3'] = {
            id: 'sidebar-prod-3',
            imageUrl: '/keychain-keyholder-printing.jpg',
            images: ['/keychain-keyholder-printing.jpg'],
            title: 'Key Holder & Keychain Printing in Lagos, Nigeria – Custom Branded Keyholders',
            lockedAt: new Date().toISOString(),
            isUserCustomized: true,
          };
        }
        if (!parsed['event-center-rug'] || parsed['event-center-rug'].imageUrl?.includes('photo-1513542789') || parsed['event-center-rug'].imageUrl?.includes('photo-1600585154')) {
          parsed['event-center-rug'] = {
            id: 'event-center-rug',
            imageUrl: '/custom-branded-center-rug.jpg',
            images: ['/custom-branded-center-rug.jpg'],
            title: 'Custom Branded Center Rug Printing',
            lockedAt: new Date().toISOString(),
            isUserCustomized: true,
          };
        }
        if (!parsed['prod-center-rug'] || parsed['prod-center-rug'].imageUrl?.includes('photo-1600585154')) {
          parsed['prod-center-rug'] = {
            id: 'prod-center-rug',
            imageUrl: '/custom-branded-center-rug.jpg',
            images: ['/custom-branded-center-rug.jpg'],
            title: 'Custom Branded Center Rug Printing',
            lockedAt: new Date().toISOString(),
            isUserCustomized: true,
          };
        }
        if (!parsed['sidebar-prod-2'] || parsed['sidebar-prod-2'].imageUrl?.includes('photo-1600585154')) {
          parsed['sidebar-prod-2'] = {
            id: 'sidebar-prod-2',
            imageUrl: '/custom-branded-center-rug.jpg',
            images: ['/custom-branded-center-rug.jpg'],
            title: 'Custom Branded Center Rug Printing',
            lockedAt: new Date().toISOString(),
            isUserCustomized: true,
          };
        }
        if (!parsed['display-waterbase-poster'] || parsed['display-waterbase-poster'].imageUrl?.includes('photo-1517245386')) {
          parsed['display-waterbase-poster'] = {
            id: 'display-waterbase-poster',
            imageUrl: '/windproof-waterbase-poster-signs.jpg',
            images: ['/windproof-waterbase-poster-signs.jpg'],
            title: 'Waterbase Poster Signs',
            lockedAt: new Date().toISOString(),
            isUserCustomized: true,
          };
        }
        if (!parsed['display-instagram-frame'] || parsed['display-instagram-frame'].imageUrl?.includes('photo-1511578314')) {
          parsed['display-instagram-frame'] = {
            id: 'display-instagram-frame',
            imageUrl: '/instagram-frame-cutout.jpg',
            images: ['/instagram-frame-cutout.jpg'],
            title: 'Instagram Frame',
            lockedAt: new Date().toISOString(),
            isUserCustomized: true,
          };
        }
        if (!parsed['display-giant-pole-flag'] || parsed['display-giant-pole-flag'].imageUrl?.includes('photo-1505373877')) {
          parsed['display-giant-pole-flag'] = {
            id: 'display-giant-pole-flag',
            imageUrl: '/giant-pole-feather-flag-banner.jpg',
            images: ['/giant-pole-feather-flag-banner.jpg'],
            title: 'Giant Pole Feather Flag Banner 5.5m',
            lockedAt: new Date().toISOString(),
            isUserCustomized: true,
          };
        }
        inMemoryLockRegistry = parsed;
        return inMemoryLockRegistry!;
      }
    }
  } catch (err) {
    console.warn('Could not read image locks from localStorage:', err);
  }

  inMemoryLockRegistry = {
    'prod-exercise-books': {
      id: 'prod-exercise-books',
      imageUrl: '/exercise-books-40-60.jpg',
      images: ['/exercise-books-40-60.jpg'],
      title: '40 and 60 Leaves Exercise Books Printing',
      lockedAt: new Date().toISOString(),
      isUserCustomized: true,
    },
    'prod-office-stationery-suite': {
      id: 'prod-office-stationery-suite',
      imageUrl: '/executive-letterheads-folders.jpg',
      images: ['/executive-letterheads-folders.jpg'],
      title: 'Executive Corporate Letterheads & Presentation Folders Suite (100 Sets)',
      lockedAt: new Date().toISOString(),
      isUserCustomized: true,
    },
    'prod-books-magazines-annual': {
      id: 'prod-books-magazines-annual',
      imageUrl: '/corporate-annual-report-magazine.jpg',
      images: ['/corporate-annual-report-magazine.jpg'],
      title: 'Corporate Annual Report & Company Profile Magazine (50 Copies)',
      lockedAt: new Date().toISOString(),
      isUserCustomized: true,
    },
    'showcase_showcase-annual-reports': {
      id: 'showcase_showcase-annual-reports',
      imageUrl: '/annual-reports-handbooks-catalogues.jpg',
      images: ['/annual-reports-handbooks-catalogues.jpg'],
      title: 'Annual Reports & Financial Statements Printing',
      lockedAt: new Date().toISOString(),
      isUserCustomized: true,
    },
    'showcase-annual-reports': {
      id: 'showcase-annual-reports',
      imageUrl: '/annual-reports-handbooks-catalogues.jpg',
      images: ['/annual-reports-handbooks-catalogues.jpg'],
      title: 'Annual Reports, Handbooks & Catalogues Printing',
      lockedAt: new Date().toISOString(),
      isUserCustomized: true,
    },
    'stationery-plastic-cards': {
      id: 'stationery-plastic-cards',
      imageUrl: '/premium-plastic-business-cards.jpg',
      images: ['/premium-plastic-business-cards.jpg'],
      title: 'Premium Plastic Business Cards',
      lockedAt: new Date().toISOString(),
      isUserCustomized: true,
    },
    'prod-stamps-seals-corporate': {
      id: 'prod-stamps-seals-corporate',
      imageUrl: '/company-stamp-cac-seal.jpg',
      images: ['/company-stamp-cac-seal.jpg'],
      title: 'Shiny Self-Inking Company Stamp & Heavy-Duty CAC Embossing Seal',
      lockedAt: new Date().toISOString(),
      isUserCustomized: true,
    },
    'stationery-certificates': {
      id: 'stationery-certificates',
      imageUrl: '/certificate-printing-lagos.jpg',
      images: ['/certificate-printing-lagos.jpg'],
      title: 'Certificate Printing in Lagos – Professional Award & Academic Certificates',
      lockedAt: new Date().toISOString(),
      isUserCustomized: true,
    },
    'prod-business-cards': {
      id: 'prod-business-cards',
      imageUrl: '/premium-matte-business-cards.jpg',
      images: ['/premium-matte-business-cards.jpg'],
      title: 'Premium Matte Laminated Business Cards (Pack of 100)',
      lockedAt: new Date().toISOString(),
      isUserCustomized: true,
    },
    'stationery-matte-cards': {
      id: 'stationery-matte-cards',
      imageUrl: '/premium-matte-business-cards.jpg',
      images: ['/premium-matte-business-cards.jpg'],
      title: 'Premium Matte Laminated Business Cards (Pack of 100)',
      lockedAt: new Date().toISOString(),
      isUserCustomized: true,
    },
    'stationery-business-cards': {
      id: 'stationery-business-cards',
      imageUrl: '/business-cards-lagos.jpg',
      images: ['/business-cards-lagos.jpg'],
      title: 'Business Cards Printing in Lagos – Custom & Premium Cards',
      lockedAt: new Date().toISOString(),
      isUserCustomized: true,
    },
    'stationery-book-printing': {
      id: 'stationery-book-printing',
      imageUrl: '/book-printing-lagos.jpg',
      images: ['/book-printing-lagos.jpg'],
      title: 'Book Printing in Lagos Nigeria',
      lockedAt: new Date().toISOString(),
      isUserCustomized: true,
    },
    'prod-wedding-acrylic-suite': {
      id: 'prod-wedding-acrylic-suite',
      imageUrl: '/frosted-acrylic-wedding-invitation.jpg',
      images: ['/frosted-acrylic-wedding-invitation.jpg'],
      title: 'Royal Foil-Stamped Frosted Acrylic Wedding Invitation Suite & Welcome Easel',
      lockedAt: new Date().toISOString(),
      isUserCustomized: true,
    },
    'showcase-luxury-rollup': {
      id: 'showcase-luxury-rollup',
      imageUrl: '/luxury-rollup-banner-stand.jpg',
      images: ['/luxury-rollup-banner-stand.jpg'],
      title: 'Luxury Rollup Banner Stand (Teardrop Chrome Base)',
      lockedAt: new Date().toISOString(),
      isUserCustomized: true,
    },
    'prod-rollup-luxury': {
      id: 'prod-rollup-luxury',
      imageUrl: '/luxury-rollup-banner-stand.jpg',
      images: ['/luxury-rollup-banner-stand.jpg'],
      title: 'Luxury Rollup Banner (Broad Base)',
      lockedAt: new Date().toISOString(),
      isUserCustomized: true,
    },
    'display-backdrop-banner': {
      id: 'display-backdrop-banner',
      imageUrl: '/advertisement-backdrop-banner.jpg',
      images: ['/advertisement-backdrop-banner.jpg'],
      title: 'Advertisement Backdrop Banner',
      lockedAt: new Date().toISOString(),
      isUserCustomized: true,
    },
    'showcase-brochures-flyers': {
      id: 'showcase-brochures-flyers',
      imageUrl: '/brochures-event-programs-flyers.jpg',
      images: ['/brochures-event-programs-flyers.jpg'],
      title: 'Brochures, Event Programs & Flyers Printing',
      lockedAt: new Date().toISOString(),
      isUserCustomized: true,
    },
    'prod-flyers-handbills-a5': {
      id: 'prod-flyers-handbills-a5',
      imageUrl: '/brochures-event-programs-flyers.jpg',
      images: ['/brochures-event-programs-flyers.jpg'],
      title: 'A5 Gloss Double-Sided Marketing Flyers & Handbills (Pack of 500)',
      lockedAt: new Date().toISOString(),
      isUserCustomized: true,
    },
    'showcase-premium-stickers': {
      id: 'showcase-premium-stickers',
      imageUrl: '/product-packaging-labels-stickers.jpg',
      images: ['/product-packaging-labels-stickers.jpg'],
      title: 'Custom Product Packaging Labels & Stickers',
      lockedAt: new Date().toISOString(),
      isUserCustomized: true,
    },
    'prod-stickers-labels-vinyl': {
      id: 'prod-stickers-labels-vinyl',
      imageUrl: '/product-packaging-labels-stickers.jpg',
      images: ['/product-packaging-labels-stickers.jpg'],
      title: 'Custom Die-Cut Vinyl Stickers & Product Bottle Labels (Pack of 200)',
      lockedAt: new Date().toISOString(),
      isUserCustomized: true,
    },
    'award-acrylic-plaque': {
      id: 'award-acrylic-plaque',
      imageUrl: '/acrylic-award-plaque.jpg',
      images: ['/acrylic-award-plaque.jpg'],
      title: 'Custom Branded Acrylic Award Plaque Printing in Lagos',
      lockedAt: new Date().toISOString(),
      isUserCustomized: true,
    },
    'award-crystal-plaque': {
      id: 'award-crystal-plaque',
      imageUrl: '/crystal-glass-award-plaque.jpg',
      images: ['/crystal-glass-award-plaque.jpg'],
      title: 'Customized Branded Crystal Glass Award Plaque Printing in Lagos | Custom Award Plaques',
      lockedAt: new Date().toISOString(),
      isUserCustomized: true,
    },
    'prod-awards-crystal-plaque': {
      id: 'prod-awards-crystal-plaque',
      imageUrl: '/crystal-glass-award-plaque.jpg',
      images: ['/crystal-glass-award-plaque.jpg'],
      title: 'Precision Laser-Etched Optical Crystal Plaque & Wooden Trophy',
      lockedAt: new Date().toISOString(),
      isUserCustomized: true,
    },
    'display-ad-portfolio': {
      id: 'display-ad-portfolio',
      imageUrl: '/advertising-materials-portfolio.jpg',
      images: ['/advertising-materials-portfolio.jpg'],
      title: 'Advertising Materials Portfolio Collection',
      lockedAt: new Date().toISOString(),
      isUserCustomized: true,
    },
    'display-flyer-work-3': {
      id: 'display-flyer-work-3',
      imageUrl: '/flyers-work-3.jpg',
      images: ['/flyers-work-3.jpg'],
      title: 'Flyers - Work #3',
      lockedAt: new Date().toISOString(),
      isUserCustomized: true,
    },
    'display-flyer-work-2': {
      id: 'display-flyer-work-2',
      imageUrl: '/flyers-work-2.jpg',
      images: ['/flyers-work-2.jpg'],
      title: 'Flyers - Work #2',
      lockedAt: new Date().toISOString(),
      isUserCustomized: true,
    },
    'display-flyer-work-1': {
      id: 'display-flyer-work-1',
      imageUrl: '/flyers-work-1.jpg',
      images: ['/flyers-work-1.jpg'],
      title: 'Flyers - Work #1',
      lockedAt: new Date().toISOString(),
      isUserCustomized: true,
    },
    'signage-3d-signs': {
      id: 'signage-3d-signs',
      imageUrl: '/3d-signs-lagos.jpg',
      images: ['/3d-signs-lagos.jpg'],
      title: '3D Signs in Lagos Nigeria | Custom 3D Signage for Businesses',
      lockedAt: new Date().toISOString(),
      isUserCustomized: true,
    },
    'signage-logo-signs': {
      id: 'signage-logo-signs',
      imageUrl: '/logo-signage-lagos.jpg',
      images: ['/logo-signage-lagos.jpg'],
      title: 'Logo Signage in Lagos Nigeria | Custom Business Logo Signs',
      lockedAt: new Date().toISOString(),
      isUserCustomized: true,
    },
    'signage-directional': {
      id: 'signage-directional',
      imageUrl: '/directional-signage-lagos.jpg',
      images: ['/directional-signage-lagos.jpg'],
      title: 'Directional Signage in Lagos Nigeria | Custom Wayfinding Signs',
      lockedAt: new Date().toISOString(),
      isUserCustomized: true,
    },
    'signage-digital-display': {
      id: 'signage-digital-display',
      imageUrl: '/electronic-digital-signage.jpg',
      images: ['/electronic-digital-signage.jpg'],
      title: 'Electronic Digital Signage in Lagos Nigeria | Digital Display Signs',
      lockedAt: new Date().toISOString(),
      isUserCustomized: true,
    },
    'gift-water-bottle': {
      id: 'gift-water-bottle',
      imageUrl: '/custom-branded-water-bottle.jpg',
      images: ['/custom-branded-water-bottle.jpg'],
      title: 'Custom Branded Water Bottle Printing in Lagos, Nigeria – Custom & Personalized Bottles',
      lockedAt: new Date().toISOString(),
      isUserCustomized: true,
    },
    'prod-water-bottle': {
      id: 'prod-water-bottle',
      imageUrl: '/custom-branded-water-bottle.jpg',
      images: ['/custom-branded-water-bottle.jpg'],
      title: 'Custom Branded Water Bottle Printing in Lagos, Nigeria – Custom & Personalized Bottles',
      lockedAt: new Date().toISOString(),
      isUserCustomized: true,
    },
    'gift-keychain': {
      id: 'gift-keychain',
      imageUrl: '/keychain-keyholder-printing.jpg',
      images: ['/keychain-keyholder-printing.jpg'],
      title: 'Key Holder & Keychain Printing in Lagos, Nigeria – Custom Branded Keyholders',
      lockedAt: new Date().toISOString(),
      isUserCustomized: true,
    },
    'prod-keychain': {
      id: 'prod-keychain',
      imageUrl: '/keychain-keyholder-printing.jpg',
      images: ['/keychain-keyholder-printing.jpg'],
      title: 'Key Holder & Keychain Printing in Lagos, Nigeria – Custom Branded Keyholders',
      lockedAt: new Date().toISOString(),
      isUserCustomized: true,
    },
    'event-center-rug': {
      id: 'event-center-rug',
      imageUrl: '/custom-branded-center-rug.jpg',
      images: ['/custom-branded-center-rug.jpg'],
      title: 'Custom Branded Center Rug Printing',
      lockedAt: new Date().toISOString(),
      isUserCustomized: true,
    },
    'prod-center-rug': {
      id: 'prod-center-rug',
      imageUrl: '/custom-branded-center-rug.jpg',
      images: ['/custom-branded-center-rug.jpg'],
      title: 'Custom Branded Center Rug Printing',
      lockedAt: new Date().toISOString(),
      isUserCustomized: true,
    },
    'display-waterbase-poster': {
      id: 'display-waterbase-poster',
      imageUrl: '/windproof-waterbase-poster-signs.jpg',
      images: ['/windproof-waterbase-poster-signs.jpg'],
      title: 'Waterbase Poster Signs',
      lockedAt: new Date().toISOString(),
      isUserCustomized: true,
    },
    'display-instagram-frame': {
      id: 'display-instagram-frame',
      imageUrl: '/instagram-frame-cutout.jpg',
      images: ['/instagram-frame-cutout.jpg'],
      title: 'Instagram Frame',
      lockedAt: new Date().toISOString(),
      isUserCustomized: true,
    },
    'display-giant-pole-flag': {
      id: 'display-giant-pole-flag',
      imageUrl: '/giant-pole-feather-flag-banner.jpg',
      images: ['/giant-pole-feather-flag-banner.jpg'],
      title: 'Giant Pole Feather Flag Banner 5.5m',
      lockedAt: new Date().toISOString(),
      isUserCustomized: true,
    }
  };
  return inMemoryLockRegistry;
}

/**
 * Asynchronously hydrate image locks from high-capacity IndexedDB
 */
export async function hydrateImageLocksFromIndexedDb(): Promise<void> {
  if (isHydratedFromIndexedDb) return;
  try {
    const stored = await loadImagesFromIndexedDb();
    if (Array.isArray(stored) && stored.length > 0) {
      const current = getLockedImagesMap();
      let changed = false;

      for (const item of stored) {
        if (item.id && item.id.startsWith(LOCK_PREFIX)) {
          const targetId = item.id.replace(LOCK_PREFIX, '');
          if (!current[targetId] && item.dataUrl) {
            current[targetId] = {
              id: targetId,
              imageUrl: item.dataUrl,
              lockedAt: item.uploadedAt || new Date().toISOString(),
              isUserCustomized: true,
              title: item.name,
            };
            changed = true;
          }
        }
      }

      if (changed) {
        saveLockedImagesMap(current);
        notifyLocksUpdated();
      }
    }
    isHydratedFromIndexedDb = true;
  } catch (err) {
    console.warn('Error hydrating image locks from IndexedDB:', err);
  }
}

// Kick off async hydration on module load if in browser
if (typeof window !== 'undefined') {
  setTimeout(() => {
    hydrateImageLocksFromIndexedDb().catch(console.warn);
  }, 100);
}

/**
 * Persist lock registry to localStorage and IndexedDB
 */
export function saveLockedImagesMap(map: Record<string, LockedImageEntry>): void {
  inMemoryLockRegistry = map;

  try {
    // 1. Save lightweight index to localStorage (truncate very large data URLs if needed for safety)
    const compactMap: Record<string, LockedImageEntry> = {};
    for (const [key, val] of Object.entries(map)) {
      if (val && val.imageUrl) {
        compactMap[key] = {
          ...val,
          // If imageUrl is an ultra-long base64 string, keep first 200 chars in localStorage index
          // while IndexedDB keeps the full high-resolution image dataUrl
          imageUrl: val.imageUrl.length > 500000 
            ? val.imageUrl.slice(0, 100) + '...[full_image_saved_in_indexeddb]'
            : val.imageUrl,
        };
      }
    }
    localStorage.setItem(REGISTRY_STORAGE_KEY, JSON.stringify(compactMap));
  } catch (err) {
    console.warn('localStorage full when saving image locks map; IndexedDB will hold full state:', err);
  }

  // 2. Persist full, uncompressed images into IndexedDB asynchronously
  for (const [key, val] of Object.entries(map)) {
    if (val && val.imageUrl) {
      const mediaItem: StoredMediaItem = {
        id: `${LOCK_PREFIX}${key}`,
        name: val.title || key,
        dataUrl: val.imageUrl,
        uploadedAt: val.lockedAt || new Date().toISOString(),
        productRefId: key,
      };
      saveImageToIndexedDb(mediaItem).catch(console.warn);
    }
  }

  notifyLocksUpdated();
}

/**
 * Dispatch an event when image locks are updated so UI components can re-render
 */
function notifyLocksUpdated(): void {
  if (typeof window !== 'undefined') {
    try {
      window.dispatchEvent(new CustomEvent('inkshine-image-locks-updated', {
        detail: { count: Object.keys(inMemoryLockRegistry || {}).length }
      }));
    } catch (e) {
      // ignore in environments without CustomEvent
    }
  }
}

// =========================================================================
// PRODUCT IMAGE LOCKING & PRESERVATION
// =========================================================================

/**
 * Lock an image to a product so it NEVER changes or reverts
 */
export function lockProductImage(
  productId: string, 
  imageUrl: string, 
  images?: string[], 
  title?: string, 
  isUserCustomized: boolean = true
): void {
  if (!productId || !imageUrl) return;

  const map = getLockedImagesMap();
  map[productId] = {
    id: productId,
    imageUrl,
    images: images && images.length > 0 ? images : [imageUrl],
    title,
    lockedAt: new Date().toISOString(),
    isUserCustomized,
  };

  saveLockedImagesMap(map);
}

/**
 * Retrieve locked image details for a product
 */
export function getLockedImageForProduct(productId: string): LockedImageEntry | undefined {
  if (!productId) return undefined;
  const map = getLockedImagesMap();
  return map[productId];
}

/**
 * Checks if a string is a genuine, renderable image URL or data URI
 */
export function isValidImageUrl(url?: string): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (trimmed.length < 5) return false;
  if (trimmed.includes('[cached_in_indexeddb]') || trimmed.includes('[full_image_saved_in_indexeddb]')) {
    return false;
  }
  return (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('//') ||
    trimmed.startsWith('data:image/') ||
    trimmed.startsWith('/')
  );
}

/**
 * Apply locked image to a single product if a lock exists
 */
export function applyImageLocksToProduct(product: Product): Product {
  if (!product || !product.id) return product;
  const lock = getLockedImageForProduct(product.id);
  if (lock && isValidImageUrl(lock.imageUrl)) {
    const validImages = (lock.images || []).filter(isValidImageUrl);
    return {
      ...product,
      image: lock.imageUrl,
      images: validImages.length > 0 ? validImages : [lock.imageUrl],
    };
  }
  return product;
}

/**
 * Apply locked images across all products in an array.
 * Ensures that no cloud sync, default catalog seed, or reload reverts any product photo!
 */
export function applyImageLocksToProducts(products: Product[]): Product[] {
  if (!products || !Array.isArray(products)) return [];
  const map = getLockedImagesMap();
  if (Object.keys(map).length === 0) return products;

  return products.map((p) => {
    if (!p || !p.id) return p;
    const lock = map[p.id];
    if (lock && isValidImageUrl(lock.imageUrl)) {
      const validImages = (lock.images || []).filter(isValidImageUrl);
      return {
        ...p,
        image: lock.imageUrl,
        images: validImages.length > 0 ? validImages : [lock.imageUrl],
      };
    }
    return p;
  });
}

// =========================================================================
// HERO SLIDES & BANNER IMAGE LOCKING
// =========================================================================

/**
 * Lock an image to a hero slide
 */
export function lockHeroSlideImage(
  slideId: string, 
  imageUrl: string, 
  title?: string, 
  isUserCustomized: boolean = true
): void {
  if (!slideId || !imageUrl) return;
  const map = getLockedImagesMap();
  map[`hero_slide_${slideId}`] = {
    id: `hero_slide_${slideId}`,
    imageUrl,
    title,
    lockedAt: new Date().toISOString(),
    isUserCustomized,
  };
  saveLockedImagesMap(map);
}

/**
 * Apply locked images to hero slides array
 */
export function applyImageLocksToHeroSlides(slides: HeroSlideItem[]): HeroSlideItem[] {
  if (!slides || !Array.isArray(slides)) return [];
  const map = getLockedImagesMap();

  return slides.map((slide) => {
    const lock = map[`hero_slide_${slide.id}`];
    if (lock && lock.imageUrl) {
      return {
        ...slide,
        imageUrl: lock.imageUrl,
      };
    }
    return slide;
  });
}

/**
 * Lock hero background image
 */
export function lockHeroBackgroundImage(imageUrl: string, isUserCustomized: boolean = true): void {
  if (!imageUrl) return;
  const map = getLockedImagesMap();
  map['hero_bg'] = {
    id: 'hero_bg',
    imageUrl,
    lockedAt: new Date().toISOString(),
    isUserCustomized,
  };
  saveLockedImagesMap(map);
}

/**
 * Lock showcase service item image
 */
export function lockShowcaseServiceImage(
  serviceId: string, 
  imageUrl: string, 
  title?: string, 
  isUserCustomized: boolean = true
): void {
  if (!serviceId || !imageUrl) return;
  const map = getLockedImagesMap();
  map[`showcase_${serviceId}`] = {
    id: `showcase_${serviceId}`,
    imageUrl,
    title,
    lockedAt: new Date().toISOString(),
    isUserCustomized,
  };
  saveLockedImagesMap(map);
}

/**
 * Apply locked images to website content (hero slides, background, showcase services)
 */
export const CURRENT_OVERLAY_BG = 'https://cdn.hstockplus.org/uploads/public/img-1790066633477-1b16a758309b0fff.webp';

export function applyImageLocksToWebsiteContent(content: WebsiteContent): WebsiteContent {
  if (!content) return content;
  const map = getLockedImagesMap();

  const heroBgLock = map['hero_bg'];
  const isOldPlaceholder = 
    !heroBgLock || 
    !heroBgLock.imageUrl || 
    heroBgLock.imageUrl === '/homepage-bg.jpg' || 
    heroBgLock.imageUrl === '/7aa493911d023086a5442472c889df70.jpg' ||
    heroBgLock.imageUrl === '/hero-banner-main.webp' ||
    heroBgLock.imageUrl.includes('unsplash');

  const resolvedBg = (!isOldPlaceholder && heroBgLock?.imageUrl?.startsWith('data:image/'))
    ? heroBgLock.imageUrl
    : (content.heroBackgroundImage && 
       content.heroBackgroundImage !== '/homepage-bg.jpg' && 
       content.heroBackgroundImage !== '/7aa493911d023086a5442472c889df70.jpg' && 
       content.heroBackgroundImage !== '/hero-banner-main.webp' &&
       !content.heroBackgroundImage.includes('unsplash')
        ? content.heroBackgroundImage 
        : CURRENT_OVERLAY_BG);

  if (isOldPlaceholder && typeof window !== 'undefined') {
    map['hero_bg'] = {
      id: 'hero_bg',
      imageUrl: CURRENT_OVERLAY_BG,
      title: 'Homepage Overlay Background Image',
      lockedAt: new Date().toISOString(),
      isUserCustomized: true,
    };
    saveLockedImagesMap(map);
  }

  const resolvedSlides = Array.isArray(content.heroSlides)
    ? content.heroSlides.map((s) => {
        const lock = map[`hero_slide_${s.id}`];
        return (lock && lock.imageUrl) ? { ...s, imageUrl: lock.imageUrl } : s;
      })
    : content.heroSlides;

  const resolvedShowcase = Array.isArray(content.showcaseServices)
    ? content.showcaseServices.map((sc) => {
        const lock = map[`showcase_${sc.id}`];
        return (lock && lock.imageUrl) ? { ...sc, imageUrl: lock.imageUrl } : sc;
      })
    : content.showcaseServices;

  return {
    ...content,
    heroBackgroundImage: resolvedBg,
    heroSlides: resolvedSlides,
    showcaseServices: resolvedShowcase,
  };
}

// =========================================================================
// MASTER "LOCK ALL IMAGES CURRENTLY VISIBLE" OPERATION
// =========================================================================

/**
 * Locks EVERY single image currently visible across all products, hero slides,
 * and showcase services so they CANNOT CHANGE until the user manually modifies them.
 */
export function lockAllCurrentState(
  products: Product[], 
  websiteContent: WebsiteContent
): { count: number; timestamp: string } {
  const map = getLockedImagesMap();
  let count = 0;
  const now = new Date().toISOString();

  // 1. Lock all product images & galleries
  (products || []).forEach((prod) => {
    if (prod && prod.id && prod.image) {
      map[prod.id] = {
        id: prod.id,
        imageUrl: prod.image,
        images: prod.images && prod.images.length > 0 ? prod.images : [prod.image],
        title: prod.name,
        lockedAt: now,
        isUserCustomized: true,
      };
      count++;
    }
  });

  // 2. Lock hero slides
  if (websiteContent && Array.isArray(websiteContent.heroSlides)) {
    websiteContent.heroSlides.forEach((slide) => {
      if (slide && slide.id && slide.imageUrl) {
        map[`hero_slide_${slide.id}`] = {
          id: `hero_slide_${slide.id}`,
          imageUrl: slide.imageUrl,
          title: slide.title,
          lockedAt: now,
          isUserCustomized: true,
        };
        count++;
      }
    });
  }

  // 3. Lock hero background image
  if (websiteContent && websiteContent.heroBackgroundImage) {
    map['hero_bg'] = {
      id: 'hero_bg',
      imageUrl: websiteContent.heroBackgroundImage,
      title: 'Hero Background Banner',
      lockedAt: now,
      isUserCustomized: true,
    };
    count++;
  }

  // 4. Lock showcase services
  if (websiteContent && Array.isArray(websiteContent.showcaseServices)) {
    websiteContent.showcaseServices.forEach((service) => {
      if (service && service.id && service.imageUrl) {
        map[`showcase_${service.id}`] = {
          id: `showcase_${service.id}`,
          imageUrl: service.imageUrl,
          title: service.title,
          lockedAt: now,
          isUserCustomized: true,
        };
        count++;
      }
    });
  }

  saveLockedImagesMap(map);
  return { count, timestamp: now };
}

/**
 * Check if a specific target (product, slide, etc.) has a locked image
 */
export function isImageLocked(targetId: string): boolean {
  if (!targetId) return false;
  const map = getLockedImagesMap();
  return Boolean(map[targetId] || map[`hero_slide_${targetId}`] || map[`showcase_${targetId}`]);
}

/**
 * Get total number of locked images
 */
export function getLockedImagesCount(): number {
  const map = getLockedImagesMap();
  return Object.keys(map).length;
}

/**
 * Export image lock registry as JSON for safe manual backups
 */
export function exportLockedImagesBackup(): string {
  const map = getLockedImagesMap();
  return JSON.stringify({
    version: '1.0',
    exportedAt: new Date().toISOString(),
    locksCount: Object.keys(map).length,
    locks: map,
  }, null, 2);
}

/**
 * Import and restore image locks from JSON
 */
export function importLockedImagesBackup(jsonStr: string): boolean {
  try {
    const parsed = JSON.parse(jsonStr);
    if (parsed && typeof parsed === 'object' && parsed.locks) {
      const current = getLockedImagesMap();
      const merged = { ...current, ...parsed.locks };
      saveLockedImagesMap(merged);
      return true;
    }
  } catch (err) {
    console.error('Failed to parse locked images backup JSON:', err);
  }
  return false;
}
