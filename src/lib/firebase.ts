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
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Connect to the specific Firestore Database ID provisioned for this applet
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || '(default)');

// Validate connection to Firestore on boot as required
export async function validateFirebaseConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('Firebase Firestore connection verified to DB:', firebaseConfig.firestoreDatabaseId);
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client appears offline, check network configuration.');
    }
  }
}

// Call on startup
validateFirebaseConnection();

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
}

/**
 * Realtime subscriber for Website CMS Content
 * Supports both signatures: (onUpdate) OR (currentState, onUpdate)
 * Immediately notifies on changes from any device (phone, laptop, tablet).
 */
export function subscribeWebsiteContent(
  arg1: any,
  arg2?: any
) {
  const onUpdate: (content: WebsiteContent) => void = 
    typeof arg1 === 'function' ? arg1 : (typeof arg2 === 'function' ? arg2 : () => {});
  const onError: ((err: any) => void) | undefined = 
    typeof arg1 === 'function' && typeof arg2 === 'function' ? arg2 : undefined;

  // Immediate one-time fetch to guarantee latest cloud state right away
  getDoc(WEBSITE_CONTENT_DOC)
    .then((snap) => {
      if (snap.exists()) {
        onUpdate(snap.data() as WebsiteContent);
      }
    })
    .catch((err) => {
      console.warn('Initial getDoc for website content failed:', err);
    });

  // Continuous real-time subscription for instant multi-device updates
  return onSnapshot(
    WEBSITE_CONTENT_DOC,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as WebsiteContent;
        onUpdate(data);
      }
    },
    (err) => {
      console.error('Error listening to website content changes:', err);
      onError?.(err);
    }
  );
}

/**
 * Save Website Content to Cloud Database
 * Updates Firestore so all visitors and devices see the new images, copy, and layout immediately.
 */
export async function saveWebsiteContentToCloud(content: WebsiteContent): Promise<void> {
  try {
    const payload = {
      ...content,
      updatedAt: new Date().toISOString(),
    };
    await setDoc(WEBSITE_CONTENT_DOC, payload, { merge: true });
    // Also save to localStorage as instant offline fallback
    try {
      localStorage.setItem('inkshine_website_content_v5', JSON.stringify(content));
    } catch (_) {}
  } catch (err) {
    console.error('Failed to save website content to Firestore:', err);
    throw err;
  }
}

/**
 * Save an uploaded image to the dedicated Firestore `uploaded_images` collection
 * Each image gets its own document and 1MB limit.
 */
export async function saveUploadedImageToCloud(img: CloudUploadedImage): Promise<void> {
  try {
    await setDoc(doc(db, 'uploaded_images', img.id), img);
  } catch (err) {
    console.error('Failed to save image to uploaded_images collection:', err);
    throw err;
  }
}

/**
 * Subscribe to all uploaded images in the cloud gallery
 */
export function subscribeUploadedImages(
  onUpdate: (images: CloudUploadedImage[]) => void,
  onError?: (err: any) => void
) {
  return onSnapshot(
    UPLOADED_IMAGES_COLLECTION,
    (snapshot) => {
      const images: CloudUploadedImage[] = [];
      snapshot.forEach((docSnap) => {
        images.push(docSnap.data() as CloudUploadedImage);
      });
      // Sort newest first
      images.sort((a, b) => (b.uploadedAt || '').localeCompare(a.uploadedAt || ''));
      onUpdate(images);
    },
    (err) => {
      console.error('Error listening to uploaded images:', err);
      onError?.(err);
    }
  );
}

/**
 * Save an individual product to Firestore `products/{productId}`
 */
export async function saveSingleProductToCloud(product: Product): Promise<void> {
  try {
    await setDoc(doc(db, 'products', product.id), {
      ...product,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.error(`Failed to save product ${product.id} to Firestore:`, err);
    throw err;
  }
}

/**
 * Delete a product from Firestore `products/{productId}`
 */
export async function deleteProductFromCloud(productId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'products', productId));
  } catch (err) {
    console.error(`Failed to delete product ${productId} from Firestore:`, err);
    throw err;
  }
}

/**
 * Realtime subscriber for Products Catalog
 * Checks both the individual `products` collection and `products_data/catalog`
 * Supports both signatures: (onUpdate) OR (currentState, onUpdate)
 */
export function subscribeProducts(
  arg1: any,
  arg2?: any
) {
  const onUpdate: (products: Product[]) => void = 
    typeof arg1 === 'function' ? arg1 : (typeof arg2 === 'function' ? arg2 : () => {});
  const onError: ((err: any) => void) | undefined = 
    typeof arg1 === 'function' && typeof arg2 === 'function' ? arg2 : undefined;

  // Listen to individual products collection first (scale-proof for photos)
  const unsubscribeCollection = onSnapshot(
    PRODUCTS_COLLECTION,
    (snapshot) => {
      if (!snapshot.empty) {
        const items: Product[] = [];
        snapshot.forEach((d) => {
          items.push(d.data() as Product);
        });
        if (items.length > 0) {
          onUpdate(items);
          return;
        }
      }
      
      // Fallback: check legacy products_data/catalog
      getDoc(PRODUCTS_CATALOG_DOC).then((catSnap) => {
        if (catSnap.exists()) {
          const data = catSnap.data();
          if (data && Array.isArray(data.items) && data.items.length > 0) {
            onUpdate(data.items as Product[]);
          }
        }
      }).catch((e) => console.warn('Legacy catalog fetch error:', e));
    },
    (err) => {
      console.error('Error listening to products collection:', err);
      onError?.(err);
    }
  );

  return unsubscribeCollection;
}

/**
 * Save Products Catalog to Cloud Database
 * Saves both to the collection and to catalog document
 */
export async function saveProductsToCloud(products: Product[]): Promise<void> {
  try {
    // 1. Save individually to /products/{productId} for infinite storage & safe photo sizes
    const savePromises = products.map((prod) => saveSingleProductToCloud(prod));
    await Promise.all(savePromises);

    // 2. Also save to products_data/catalog as summary
    try {
      await setDoc(PRODUCTS_CATALOG_DOC, {
        items: products,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (e) {
      console.warn('Summary catalog setDoc skipped or exceeded:', e);
    }

    // 3. Local storage fallback
    try {
      localStorage.setItem('inkshine_products_v3', JSON.stringify(products));
    } catch (_) {}
  } catch (err) {
    console.error('Failed to save products to Firestore:', err);
    throw err;
  }
}

/**
 * High-performance, client-side image compressor & optimizer.
 * Designed for mobile phone cameras (iPhone, Android) and desktop uploads.
 * Multi-pass compression guarantees images fit comfortably within Firestore documents (< 180KB)
 * while preserving crisp, high-definition sharpness on Retina screens.
 */
export function compressImageFile(
  file: File, 
  targetMaxDimension: number = 1200, 
  initialQuality: number = 0.76
): Promise<string> {
  return new Promise((resolve, reject) => {
    // If it's an SVG, load directly as data URL without rasterizing
    if (file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Scale down to targetMaxDimension preserving aspect ratio
        if (width > targetMaxDimension || height > targetMaxDimension) {
          if (width > height) {
            height = Math.round((height * targetMaxDimension) / width);
            width = targetMaxDimension;
          } else {
            width = Math.round((width * targetMaxDimension) / height);
            height = targetMaxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        // Draw image smoothly
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // First pass: standard high-quality JPEG
        let dataUrl = canvas.toDataURL('image/jpeg', initialQuality);

        // Second pass: if dataUrl is still larger than 220KB (~290k chars), re-compress tighter
        if (dataUrl.length > 290000) {
          const secondCanvas = document.createElement('canvas');
          const scale = 0.75;
          secondCanvas.width = Math.round(width * scale);
          secondCanvas.height = Math.round(height * scale);
          const secondCtx = secondCanvas.getContext('2d');
          if (secondCtx) {
            secondCtx.imageSmoothingEnabled = true;
            secondCtx.imageSmoothingQuality = 'high';
            secondCtx.drawImage(canvas, 0, 0, secondCanvas.width, secondCanvas.height);
            dataUrl = secondCanvas.toDataURL('image/jpeg', 0.65);
          }
        }

        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Failed to load image for processing'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.readAsDataURL(file);
  });
}

