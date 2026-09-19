import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  onSnapshot, 
  getDocFromServer,
  enableIndexedDbPersistence
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
    console.log('Firebase Firestore connection verified.');
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client appears offline, check network configuration.');
    }
  }
}

// Call on startup
validateFirebaseConnection();

// Document paths
const WEBSITE_CONTENT_DOC = doc(db, 'website_content', 'current');
const PRODUCTS_CATALOG_DOC = doc(db, 'products_data', 'catalog');

/**
 * Realtime subscriber for Website CMS Content
 * Immediately notifies on changes from any device (phone, laptop, tablet).
 */
export function subscribeWebsiteContent(
  onUpdate: (content: WebsiteContent) => void,
  onError?: (err: any) => void
) {
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
 * Realtime subscriber for Products Catalog
 * Syncs product prices, descriptions, and uploaded images across all devices.
 */
export function subscribeProducts(
  onUpdate: (products: Product[]) => void,
  onError?: (err: any) => void
) {
  return onSnapshot(
    PRODUCTS_CATALOG_DOC,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        if (data && Array.isArray(data.items) && data.items.length > 0) {
          onUpdate(data.items as Product[]);
        }
      }
    },
    (err) => {
      console.error('Error listening to product catalog changes:', err);
      onError?.(err);
    }
  );
}

/**
 * Save Products Catalog to Cloud Database
 */
export async function saveProductsToCloud(products: Product[]): Promise<void> {
  try {
    await setDoc(PRODUCTS_CATALOG_DOC, {
      items: products,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    // Local storage fallback
    try {
      localStorage.setItem('inkshine_products_v3', JSON.stringify(products));
    } catch (_) {}
  } catch (err) {
    console.error('Failed to save products to Firestore:', err);
    throw err;
  }
}

/**
 * Client-side image compressor & optimizer.
 * Compresses local uploaded files into high-quality, web-optimized JPEG/WebP data URIs
 * that comfortably fit in Firestore documents (< 600KB) and load instantly across all devices.
 */
export function compressImageFile(
  file: File, 
  maxDimension: number = 1600, 
  quality: number = 0.82
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
        let { width, height } = img;

        // Scale down to maxDimension preserving aspect ratio
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
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

        // Convert to web-friendly JPEG
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      img.onerror = () => reject(new Error('Failed to load image for processing'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.readAsDataURL(file);
  });
}
