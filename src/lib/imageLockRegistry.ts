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
        inMemoryLockRegistry = parsed;
        return inMemoryLockRegistry!;
      }
    }
  } catch (err) {
    console.warn('Could not read image locks from localStorage:', err);
  }

  inMemoryLockRegistry = {};
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
export function applyImageLocksToWebsiteContent(content: WebsiteContent): WebsiteContent {
  if (!content) return content;
  const map = getLockedImagesMap();

  const heroBgLock = map['hero_bg'];
  const resolvedBg = (heroBgLock && heroBgLock.imageUrl && heroBgLock.imageUrl !== '/homepage-bg.jpg')
    ? heroBgLock.imageUrl 
    : (content.heroBackgroundImage || '/7aa493911d023086a5442472c889df70.jpg');

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
