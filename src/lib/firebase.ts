import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  onSnapshot, 
  getDocFromServer,
  collection,
  getDocs,
  deleteDoc
} from 'firebase/firestore';
import { WebsiteContent } from '../types/websiteContent';
import { Product } from '../types/schema';
import firebaseConfig from '../../firebase-applet-config.json' with { type: 'json' };
import {
  saveProductsToIndexedDb,
  loadProductsFromIndexedDb,
  saveSingleProductToIndexedDb,
  deleteProductFromIndexedDb,
  saveImageToIndexedDb,
  loadImagesFromIndexedDb,
  saveWebsiteContentToIndexedDb,
  loadWebsiteContentFromIndexedDb,
  StoredMediaItem
} from './indexedDbStorage';
import {
  applyImageLocksToProducts,
  applyImageLocksToWebsiteContent,
  lockProductImage
} from './imageLockRegistry';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Connect to the specific Firestore Database ID provisioned for this applet
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || '(default)');

// Document and collection paths
const WEBSITE_CONTENT_DOC = doc(db, 'website_content', 'current');
const PRODUCTS_CATALOG_DOC = doc(db, 'products_data', 'catalog');
const PRODUCTS_COLLECTION = collection(db, 'products');
const UPLOADED_IMAGES_COLLECTION = collection(db, 'uploaded_images');

export interface CloudUploadedImage {
  id: string;
  name: string;
  dataUrl: string;
  uploadedAt: string;
  deviceType?: 'phone' | 'desktop' | 'tablet' | 'unknown';
  category?: string;
  productRefId?: string;
}

// Track Firestore quota and connectivity state with cross-refresh persistence
const QUOTA_STORAGE_KEY = 'inkshine_firestore_quota_status_v1';

function getInitialQuotaStatus(): boolean {
  try {
    const item = localStorage.getItem(QUOTA_STORAGE_KEY);
    if (!item) return false;
    const parsed = JSON.parse(item);
    // Keep quota state active for 6 hours before attempting cloud reconnect
    if (parsed && parsed.exceeded && Date.now() < parsed.expiresAt) {
      return true;
    }
  } catch (_) {}
  return false;
}

export let isFirestoreQuotaExceeded = getInitialQuotaStatus();
export const FIRESTORE_UPGRADE_URL = `https://console.firebase.google.com/project/${firebaseConfig.projectId}/firestore/databases/${firebaseConfig.firestoreDatabaseId}/data?openUpgradeDialog=true`;

const quotaListeners = new Set<(exceeded: boolean) => void>();

export function subscribeQuotaStatus(callback: (exceeded: boolean) => void) {
  quotaListeners.add(callback);
  callback(isFirestoreQuotaExceeded);
  return () => {
    quotaListeners.delete(callback);
  };
}

export function setQuotaExceeded(exceeded: boolean) {
  isFirestoreQuotaExceeded = exceeded;
  try {
    if (exceeded) {
      localStorage.setItem(
        QUOTA_STORAGE_KEY,
        JSON.stringify({ exceeded: true, expiresAt: Date.now() + 6 * 60 * 60 * 1000 })
      );
    } else {
      localStorage.removeItem(QUOTA_STORAGE_KEY);
    }
  } catch (_) {}

  quotaListeners.forEach((fn) => {
    try {
      fn(exceeded);
    } catch (_) {}
  });
}

export function isQuotaError(err: any): boolean {
  if (!err) return false;
  const msg = (err.message || String(err)).toLowerCase();
  const code = (err.code || '').toLowerCase();
  return (
    code.includes('resource-exhausted') ||
    code.includes('quota-exceeded') ||
    code.includes('quota') ||
    msg.includes('quota limit exceeded') ||
    msg.includes('quota exceeded') ||
    msg.includes('free daily read units') ||
    msg.includes('free tier database') ||
    msg.includes('quota metric') ||
    msg.includes('quota checks') ||
    msg.includes('retry after quota limits are reset') ||
    msg.includes('resource exhausted')
  );
}

// Validate connection to Firestore on boot
export async function validateFirebaseConnection() {
  if (isFirestoreQuotaExceeded) {
    console.info('Firestore daily read quota previously reached. Operating in Local Enterprise IndexedDB mode.');
    return;
  }
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('Firebase Firestore connection verified to DB:', firebaseConfig.firestoreDatabaseId);
    setQuotaExceeded(false);
  } catch (error) {
    if (isQuotaError(error)) {
      console.info('Firebase Firestore daily read quota reached. Running in Local Enterprise IndexedDB mode.');
      setQuotaExceeded(true);
    } else if (error instanceof Error && error.message.includes('the client is offline')) {
      console.info('Firebase client appears offline, running in local storage mode.');
    }
  }
}

// Call on startup
validateFirebaseConnection();

/**
 * Helper to retry async operations with exponential backoff.
 */
async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  retries = 2,
  baseDelayMs = 300
): Promise<T> {
  let lastError: any;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await operation();
    } catch (err) {
      lastError = err;
      if (isQuotaError(err)) {
        setQuotaExceeded(true);
        throw err; // Do not retry if quota is hit
      }
      if (attempt < retries) {
        const delay = baseDelayMs * Math.pow(2, attempt) + Math.random() * 80;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  throw lastError;
}

/**
 * Detect client device category for metadata tracking
 */
export function detectDeviceCategory(): 'phone' | 'desktop' | 'tablet' | 'unknown' {
  if (typeof window === 'undefined' || !window.navigator) return 'unknown';
  const ua = window.navigator.userAgent.toLowerCase();
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/mobile|iphone|ipod|blackberry|opera mini|iemobile|wpdesktop/i.test(ua) || (window.innerWidth && window.innerWidth <= 768)) {
    return 'phone';
  }
  return 'desktop';
}

/**
 * Safe localStorage wrapper that catches QuotaExceededError without throwing
 */
export function safeLocalStorageSet(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    console.warn(`localStorage quota exceeded for key "${key}". Relying on high-capacity IndexedDB storage.`);
    return false;
  }
}

// ==========================================
// 1. WEBSITE CMS CONTENT SYNC
// ==========================================

export function subscribeWebsiteContent(
  arg1: any,
  arg2?: any
) {
  const onUpdate: (content: WebsiteContent) => void = 
    typeof arg1 === 'function' ? arg1 : (typeof arg2 === 'function' ? arg2 : () => {});
  const onError: ((err: any) => void) | undefined = 
    typeof arg1 === 'function' && typeof arg2 === 'function' ? arg2 : undefined;

  // 1. Instantly read from IndexedDB first for 0ms loading time
  loadWebsiteContentFromIndexedDb().then((localContent) => {
    if (localContent) {
      onUpdate(localContent);
    }
  }).catch(console.warn);

  // If quota limit is already reached, skip Firestore completely and operate in local mode
  if (isFirestoreQuotaExceeded) {
    return () => {};
  }

  // 2. Fetch from Firestore if quota allows
  getDoc(WEBSITE_CONTENT_DOC)
    .then((snap) => {
      if (snap.exists()) {
        const raw = snap.data() as WebsiteContent;
        const data = applyImageLocksToWebsiteContent(raw);
        saveWebsiteContentToIndexedDb(data).catch(console.warn);
        onUpdate(data);
      }
    })
    .catch((err) => {
      if (isQuotaError(err)) {
        setQuotaExceeded(true);
      }
    });

  // 3. Continuous real-time subscription
  try {
    return onSnapshot(
      WEBSITE_CONTENT_DOC,
      (snapshot) => {
        if (snapshot.exists()) {
          const raw = snapshot.data() as WebsiteContent;
          const data = applyImageLocksToWebsiteContent(raw);
          saveWebsiteContentToIndexedDb(data).catch(console.warn);
          onUpdate(data);
        }
      },
      (err) => {
        if (isQuotaError(err)) {
          setQuotaExceeded(true);
          console.info('Firestore daily read quota reached for website content. Running seamlessly in local IndexedDB mode.');
          return;
        }
        console.warn('Website content sync notice:', err?.message || err);
        onError?.(err);
      }
    );
  } catch (err) {
    if (isQuotaError(err)) {
      setQuotaExceeded(true);
      return () => {};
    }
    return () => {};
  }
}

export async function saveWebsiteContentToCloud(content: WebsiteContent): Promise<void> {
  // 1. Save to high-capacity IndexedDB FIRST (never fails due to 5MB localStorage or network quotas)
  await saveWebsiteContentToIndexedDb(content);
  
  // 2. Attempt lightweight localStorage backup
  safeLocalStorageSet('inkshine_website_content_v5', JSON.stringify(content));

  // 3. Push to Firestore cloud if quota allows
  if (!isFirestoreQuotaExceeded) {
    try {
      const payload = {
        ...content,
        updatedAt: new Date().toISOString(),
      };
      await retryWithBackoff(() => setDoc(WEBSITE_CONTENT_DOC, payload, { merge: true }), 1, 300);
    } catch (err) {
      if (isQuotaError(err)) {
        setQuotaExceeded(true);
      } else {
        console.warn('Failed to save website content to Firestore:', err);
      }
    }
  }
}

// ==========================================
// 2. UPLOADED & REPLACED MEDIA SYNC
// ==========================================

export async function saveUploadedImageToCloud(img: CloudUploadedImage): Promise<void> {
  const enriched: CloudUploadedImage = {
    ...img,
    deviceType: img.deviceType || detectDeviceCategory(),
    uploadedAt: img.uploadedAt || new Date().toISOString(),
  };

  // 1. Instantly save to IndexedDB media store (guaranteed permanent persistence)
  await saveImageToIndexedDb({
    id: enriched.id,
    name: enriched.name,
    dataUrl: enriched.dataUrl,
    uploadedAt: enriched.uploadedAt,
    category: enriched.category,
    deviceType: enriched.deviceType,
    productRefId: enriched.productRefId,
  });

  // 2. Attempt Firestore push with error suppression for quotas
  if (!isFirestoreQuotaExceeded) {
    try {
      await retryWithBackoff(async () => {
        await setDoc(doc(db, 'uploaded_images', enriched.id), enriched, { merge: true });
      }, 1, 300);
    } catch (err) {
      if (isQuotaError(err)) {
        setQuotaExceeded(true);
      } else {
        console.warn('Firestore uploaded image sync notice (saved safely in IndexedDB):', err);
      }
    }
  }
}

export async function getCloudUploadedImages(): Promise<CloudUploadedImage[]> {
  // 1. Load from IndexedDB
  const localItems = await loadImagesFromIndexedDb();

  // 2. If not quota-exceeded, try fetching Firestore additions
  if (!isFirestoreQuotaExceeded) {
    try {
      const snapshot = await getDocs(UPLOADED_IMAGES_COLLECTION);
      const cloudItems: CloudUploadedImage[] = [];
      snapshot.forEach((d) => {
        cloudItems.push(d.data() as CloudUploadedImage);
      });

      // Merge and save any new cloud items to IndexedDB
      for (const item of cloudItems) {
        if (!localItems.some((l) => l.id === item.id)) {
          await saveImageToIndexedDb(item);
          localItems.push(item);
        }
      }
    } catch (err) {
      if (isQuotaError(err)) {
        setQuotaExceeded(true);
      }
    }
  }

  localItems.sort((a, b) => (b.uploadedAt || '').localeCompare(a.uploadedAt || ''));
  return localItems as CloudUploadedImage[];
}

export function subscribeUploadedImages(
  onUpdate: (images: CloudUploadedImage[]) => void,
  onError?: (err: any) => void
) {
  // 1. Pre-load from IndexedDB immediately
  loadImagesFromIndexedDb().then((stored) => {
    if (stored && stored.length > 0) {
      onUpdate(stored as CloudUploadedImage[]);
    }
  }).catch(console.warn);

  // If quota limit reached, stay completely in local IndexedDB mode
  if (isFirestoreQuotaExceeded) {
    return () => {};
  }

  // 2. Real-time snapshot listener
  try {
    return onSnapshot(
      UPLOADED_IMAGES_COLLECTION,
      (snapshot) => {
        const cloudImages: CloudUploadedImage[] = [];
        snapshot.forEach((docSnap) => {
          cloudImages.push(docSnap.data() as CloudUploadedImage);
        });

        loadImagesFromIndexedDb().then((local) => {
          const map = new Map<string, CloudUploadedImage>();
          cloudImages.forEach((img) => map.set(img.id, img));
          local.forEach((img) => {
            if (!map.has(img.id)) {
              map.set(img.id, img as CloudUploadedImage);
            }
          });

          const merged = Array.from(map.values());
          merged.sort((a, b) => (b.uploadedAt || '').localeCompare(a.uploadedAt || ''));
          // Persist cloud additions locally
          cloudImages.forEach((img) => saveImageToIndexedDb(img).catch(console.warn));
          onUpdate(merged);
        });
      },
      (err) => {
        if (isQuotaError(err)) {
          setQuotaExceeded(true);
          console.info('Firestore daily read quota reached for uploaded images. Using local IndexedDB store.');
          return;
        }
        console.warn('Uploaded images sync notice:', err?.message || err);
        onError?.(err);
      }
    );
  } catch (err) {
    if (isQuotaError(err)) {
      setQuotaExceeded(true);
      return () => {};
    }
    return () => {};
  }
}

// ==========================================
// 3. PRODUCTS CATALOG SYNC
// ==========================================

/**
 * Save an individual product safely:
 * - Saves to IndexedDB FIRST so the user NEVER loses edits or uploaded photos on refresh.
 * - Safely syncs to Firestore without breaking when quota is exceeded.
 */
export async function saveSingleProductToCloud(product: Product): Promise<void> {
  if (!product || !product.id) return;

  // 1. Lock image in persistent registry so it never changes until user explicitly updates it
  if (product.image) {
    lockProductImage(product.id, product.image, product.images, product.name, true);
  }

  // 2. IndexedDB persistence (zero size limit, survives refresh & tab closure)
  await saveSingleProductToIndexedDb(product);

  // 2. If product contains an image, also track it in the image gallery
  const imgUrl = product.image || (product.images && product.images[0]);
  if (imgUrl && (imgUrl.startsWith('data:') || imgUrl.startsWith('http'))) {
    saveImageToIndexedDb({
      id: `img-ref-${product.id}`,
      name: `${product.name} Photo`,
      dataUrl: imgUrl,
      uploadedAt: new Date().toISOString(),
      category: product.categoryPlacement || String(product.category || ''),
      productRefId: product.id
    }).catch(console.warn);
  }

  // 3. Firestore cloud sync
  if (!isFirestoreQuotaExceeded) {
    try {
      const payload = {
        ...product,
        updatedAt: new Date().toISOString()
      };

      await retryWithBackoff(async () => {
        await setDoc(doc(db, 'products', product.id), payload, { merge: true });
      }, 1, 300);
    } catch (err) {
      if (isQuotaError(err)) {
        setQuotaExceeded(true);
      } else {
        console.warn(`Firestore saveSingleProduct notice for ${product.id}:`, err);
      }
    }
  }
}

export async function deleteProductFromCloud(productId: string): Promise<void> {
  // 1. Remove from IndexedDB
  await deleteProductFromIndexedDb(productId);

  // 2. Remove from Firestore
  if (!isFirestoreQuotaExceeded) {
    try {
      await retryWithBackoff(() => deleteDoc(doc(db, 'products', productId)), 1, 300);
    } catch (err) {
      if (isQuotaError(err)) {
        setQuotaExceeded(true);
      } else {
        console.warn(`Firestore delete notice for ${productId}:`, err);
      }
    }
  }
}

export function subscribeProducts(
  arg1: any,
  arg2?: any
) {
  const onUpdate: (products: Product[]) => void = 
    typeof arg1 === 'function' ? arg1 : (typeof arg2 === 'function' ? arg2 : () => {});
  const onError: ((err: any) => void) | undefined = 
    typeof arg1 === 'function' && typeof arg2 === 'function' ? arg2 : undefined;

  // 1. Load from IndexedDB immediately for instant offline-first display
  loadProductsFromIndexedDb().then((stored) => {
    if (stored && stored.length > 0) {
      onUpdate(stored);
    }
  }).catch(console.warn);

  // If quota limit reached, stay strictly in local IndexedDB mode
  if (isFirestoreQuotaExceeded) {
    return () => {};
  }

  // 2. Real-time snapshot listener on Firestore products collection
  try {
    const unsubscribeCollection = onSnapshot(
      PRODUCTS_COLLECTION,
      (snapshot) => {
        if (!snapshot.empty) {
          const items: Product[] = [];
          snapshot.forEach((d) => {
            items.push(d.data() as Product);
          });
          if (items.length > 0) {
            // Merge with any offline products in IndexedDB, strictly preserving local custom images
            loadProductsFromIndexedDb().then((localProds) => {
              const map = new Map<string, Product>();
              (localProds || []).forEach((lp) => map.set(lp.id, lp));
              items.forEach((ip) => {
                const local = map.get(ip.id);
                // If local product exists and has an image, preserve the local/saved image!
                if (local && local.image) {
                  map.set(ip.id, {
                    ...ip,
                    image: local.image,
                    images: (local.images && local.images.length > 0) ? local.images : (ip.images || [local.image]),
                  });
                } else {
                  map.set(ip.id, ip);
                }
              });
              const merged = applyImageLocksToProducts(Array.from(map.values()));
              saveProductsToIndexedDb(merged).catch(console.warn);
              onUpdate(merged);
            }).catch(() => {
              const locked = applyImageLocksToProducts(items);
              saveProductsToIndexedDb(locked).catch(console.warn);
              onUpdate(locked);
            });
            return;
          }
        }
      },
      (err) => {
        if (isQuotaError(err)) {
          setQuotaExceeded(true);
          console.info('Firestore daily read quota reached for products collection. Running in local IndexedDB mode.');
          return;
        }
        console.warn('Products sync notice:', err?.message || err);
        onError?.(err);
      }
    );

    return unsubscribeCollection;
  } catch (err) {
    if (isQuotaError(err)) {
      setQuotaExceeded(true);
      return () => {};
    }
    return () => {};
  }
}

/**
 * Save Products Catalog:
 * - Saves ALL products into high-capacity IndexedDB.
 * - ONLY syncs user-created or edited products to Firestore (preventing 70-document bulk blast that burns quota).
 */
export async function saveProductsToCloud(products: Product[]): Promise<void> {
  if (!products || products.length === 0) return;

  // 1. Always save the complete catalog into IndexedDB (rock-solid, zero data loss)
  await saveProductsToIndexedDb(products);

  // 2. Try lightweight localStorage for small metadata
  try {
    const compactCatalog = products.map((p) => {
      // If it's a web URL (http, https, //), it's tiny (~80 bytes), preserve it completely!
      if (p.image && !p.image.startsWith('data:image')) {
        return p;
      }
      return p;
    });
    safeLocalStorageSet('inkshine_products_index', JSON.stringify(compactCatalog));
  } catch (_) {}

  // 3. To prevent burning through Firebase free tier read/write quota,
  // only sync custom or user-uploaded products to Firestore (e.g. prod-* or items with user flags)
  if (!isFirestoreQuotaExceeded) {
    const customOrModified = products.filter(
      (p) => p.id.startsWith('prod-') && !p.id.startsWith('prod-seed-')
    );

    for (const item of customOrModified.slice(0, 8)) {
      try {
        await setDoc(doc(db, 'products', item.id), item, { merge: true });
      } catch (err) {
        if (isQuotaError(err)) {
          setQuotaExceeded(true);
          break;
        }
      }
    }
  }
}

// ==========================================
// 4. CLIENT-SIDE IMAGE COMPRESSOR
// ==========================================

export function compressImageFile(
  file: File | Blob, 
  targetMaxDimension: number = 1080, 
  initialQuality: number = 0.78
): Promise<string> {
  return new Promise((resolve, reject) => {
    if ('type' in file && file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    const img = new Image();
    
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let width = img.naturalWidth || img.width;
      let height = img.naturalHeight || img.height;

      if (!width || !height) {
        reject(new Error('Invalid image dimensions'));
        return;
      }

      const maxDim = Math.min(targetMaxDimension, 1200);
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
        return;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      let dataUrl = canvas.toDataURL('image/jpeg', initialQuality);

      if (dataUrl.length > 175000) {
        const pass2Canvas = document.createElement('canvas');
        const scale2 = 0.85;
        pass2Canvas.width = Math.round(width * scale2);
        pass2Canvas.height = Math.round(height * scale2);
        const ctx2 = pass2Canvas.getContext('2d');
        if (ctx2) {
          ctx2.imageSmoothingEnabled = true;
          ctx2.imageSmoothingQuality = 'high';
          ctx2.drawImage(canvas, 0, 0, pass2Canvas.width, pass2Canvas.height);
          dataUrl = pass2Canvas.toDataURL('image/jpeg', 0.70);
        }
      }

      if (dataUrl.length > 200000) {
        const pass3Canvas = document.createElement('canvas');
        const scale3 = 0.75;
        pass3Canvas.width = Math.round(width * scale3);
        pass3Canvas.height = Math.round(height * scale3);
        const ctx3 = pass3Canvas.getContext('2d');
        if (ctx3) {
          ctx3.imageSmoothingEnabled = true;
          ctx3.imageSmoothingQuality = 'high';
          ctx3.drawImage(canvas, 0, 0, pass3Canvas.width, pass3Canvas.height);
          dataUrl = pass3Canvas.toDataURL('image/jpeg', 0.65);
        }
      }

      resolve(dataUrl);
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read image file on this device'));
      reader.readAsDataURL(file);
    };

    img.src = objectUrl;
  });
}
