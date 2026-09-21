import React, { useState, useRef, useMemo } from 'react';
import { 
  Upload, 
  Images, 
  Image as ImageIcon, 
  FolderTree, 
  Plus, 
  Trash2, 
  Star, 
  Check, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink, 
  Layers, 
  Search, 
  Filter, 
  RefreshCw, 
  X, 
  SlidersHorizontal, 
  Edit3, 
  Grid, 
  List, 
  Eye, 
  EyeOff,
  Sparkles, 
  AlertCircle,
  Database,
  ArrowUpRight,
  ChevronDown,
  Cloud,
  Smartphone,
  CheckCheck,
  Lock,
  Link as LinkIcon
} from 'lucide-react';
import { Product, ProductCategory } from '../../types/schema';
import { STORE_CATEGORIES, CategoryDefinition, getProductCategoryTag } from '../../utils/categoryUtils';
import { 
  compressImageFile, 
  saveUploadedImageToCloud, 
  saveSingleProductToCloud,
  subscribeUploadedImages, 
  CloudUploadedImage 
} from '../../lib/firebase';
import { lockProductImage } from '../../lib/imageLockRegistry';
import { 
  searchOnlineProductImages, 
  SearchResultImage, 
  processExternalImageUrl,
  getGoogleImagesSearchUrl,
  getPinterestSearchUrl
} from '../../services/imageSearchService';
import { ImageManagerModal } from './ImageManagerModal';
import { ImageUrlInputWithPreview } from '../common/ImageUrlInputWithPreview';

interface CategoryAdminProps {
  products: Product[];
  onAddProduct?: (newProduct: Product) => void;
  onUpdateProduct: (productId: string, updates: Partial<Product>) => void;
  onDeleteProduct?: (productId: string) => void;
  onOpenStorefront?: (categoryKey?: string) => void;
  initialCategoryKey?: string;
}

interface StagedPhotoItem {
  id: string;
  dataUrl: string;
  fileName: string;
  title: string;
  isCover: boolean;
  priceNgn: number;
  hidePrice?: boolean;
}

export const CategoryAdmin: React.FC<CategoryAdminProps> = ({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onOpenStorefront,
  initialCategoryKey = 'advertising_materials',
}) => {
  // 1. Category Selection
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string>(
    initialCategoryKey !== 'all' ? initialCategoryKey : 'advertising_materials'
  );
  const [categorySearchQuery, setCategorySearchQuery] = useState<string>('');
  
  // 2. Multi-Image Upload Staging
  const [stagedPhotos, setStagedPhotos] = useState<StagedPhotoItem[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgressText, setUploadProgressText] = useState<string>('');
  const [dragOver, setDragOver] = useState<boolean>(false);
  const multiFileInputRef = useRef<HTMLInputElement>(null);
  const appendFileInputRef = useRef<HTMLInputElement>(null);
  const replaceFileInputRef = useRef<HTMLInputElement>(null);
  const [targetProductForAppend, setTargetProductForAppend] = useState<Product | null>(null);
  const [targetProductForReplace, setTargetProductForReplace] = useState<Product | null>(null);

  // 3. Publishing Mode
  // 'batch' = each photo becomes its own product/job in this category
  // 'single_gallery' = all photos merged into 1 product with multi-photo gallery
  // 'append' = append photos to an existing product in this category
  const [uploadMode, setUploadMode] = useState<'batch' | 'single_gallery' | 'append'>('batch');

  // Single gallery configuration state
  const [singleGalleryTitle, setSingleGalleryTitle] = useState<string>('');
  const [singleGalleryDescription, setSingleGalleryDescription] = useState<string>('');
  const [singleGalleryPrice, setSingleGalleryPrice] = useState<number>(25000);
  const [singleGalleryHidePrice, setSingleGalleryHidePrice] = useState<boolean>(false);
  const [singleGalleryTurnaround, setSingleGalleryTurnaround] = useState<number>(2);
  const [singleGalleryMinQty, setSingleGalleryMinQty] = useState<number>(1);
  const [singleGalleryBadge, setSingleGalleryBadge] = useState<string>('Featured Job');

  // Common batch configuration state
  const [batchBasePrice, setBatchBasePrice] = useState<number>(20000);
  const [batchHidePrice, setBatchHidePrice] = useState<boolean>(false);
  const [batchNamingPrefix, setBatchNamingPrefix] = useState<string>('');
  const [batchTurnaroundDays, setBatchTurnaroundDays] = useState<number>(2);
  const [batchMinQty, setBatchMinQty] = useState<number>(1);

  // Auto-Fetch Online Category Photos State (Option 2)
  const [isAutoFetchModalOpen, setIsAutoFetchModalOpen] = useState<boolean>(false);
  const [autoFetchQuery, setAutoFetchQuery] = useState<string>('');
  const [isAutoSearching, setIsAutoSearching] = useState<boolean>(false);
  const [autoSearchResults, setAutoSearchResults] = useState<SearchResultImage[]>([]);
  const [selectedAutoPhotos, setSelectedAutoPhotos] = useState<SearchResultImage[]>([]);
  const [pinterestInputUrl, setPinterestInputUrl] = useState<string>('');

  // Direct URL Image Link Staging Modal & Active Product Image Manager
  const [isUrlLinkModalOpen, setIsUrlLinkModalOpen] = useState<boolean>(false);
  const [activeProductForImageManager, setActiveProductForImageManager] = useState<Product | null>(null);

  // Notifications
  const [toastMessage, setToastMessage] = useState<{ title: string; desc: string } | null>(null);

  // Cloud & Mobile Phone Uploads Library
  const [cloudLibraryImages, setCloudLibraryImages] = useState<CloudUploadedImage[]>([]);
  const [isCloudGalleryOpen, setIsCloudGalleryOpen] = useState<boolean>(false);
  const [selectedCloudIds, setSelectedCloudIds] = useState<string[]>([]);

  // Subscribe to real-time cloud uploaded images across all devices (phone, laptop, tablet)
  React.useEffect(() => {
    const unsubscribe = subscribeUploadedImages((images) => {
      setCloudLibraryImages(images || []);
    });
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  // Filter categories
  const filteredCategories = useMemo(() => {
    const list = STORE_CATEGORIES.filter((c) => c.id !== 'all');
    if (!categorySearchQuery.trim()) return list;
    const q = String(categorySearchQuery || '').trim().toLowerCase();
    return list.filter((c) => 
      String(c.label || '').toLowerCase().includes(q) || 
      String(c.tagline || '').toLowerCase().includes(q)
    );
  }, [categorySearchQuery]);

  // Current active category definition
  const currentCategoryDef = useMemo(() => {
    return STORE_CATEGORIES.find((c) => c.id === selectedCategoryKey) || STORE_CATEGORIES[1];
  }, [selectedCategoryKey]);

  // Products belonging to the currently active category
  const categoryProducts = useMemo(() => {
    return products.filter((p) => {
      const tag = getProductCategoryTag(p);
      return tag === selectedCategoryKey;
    });
  }, [products, selectedCategoryKey]);

  // Count products by category for badges
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of products) {
      const tag = getProductCategoryTag(p);
      counts[tag] = (counts[tag] || 0) + 1;
    }
    return counts;
  }, [products]);

  const showToast = (title: string, desc: string) => {
    setToastMessage({ title, desc });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Open Auto-Fetch Modal & load initial online results for this category
  const handleOpenAutoFetchModal = async () => {
    setIsAutoFetchModalOpen(true);
    const query = currentCategoryDef.label;
    setAutoFetchQuery(query);
    setSelectedAutoPhotos([]);
    setIsAutoSearching(true);
    try {
      const results = await searchOnlineProductImages(query, currentCategoryDef.id);
      setAutoSearchResults(results);
    } catch (err) {
      console.warn('Error fetching online images for category:', err);
    } finally {
      setIsAutoSearching(false);
    }
  };

  // Perform search with custom query keywords
  const handleSearchAutoFetch = async (queryText?: string) => {
    const q = queryText !== undefined ? queryText : autoFetchQuery;
    setIsAutoSearching(true);
    try {
      const results = await searchOnlineProductImages(q, currentCategoryDef.id);
      setAutoSearchResults(results);
    } catch (err) {
      console.warn('Error searching online images:', err);
    } finally {
      setIsAutoSearching(false);
    }
  };

  // Stage selected online photos into the staging area
  const handleStageAutoPhotos = (photosToStage: SearchResultImage[]) => {
    if (photosToStage.length === 0) return;
    const newItems: StagedPhotoItem[] = photosToStage.map((photo, idx) => ({
      id: `auto-${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 6)}`,
      dataUrl: photo.url,
      fileName: `${photo.title || 'Online Photo'}.jpg`,
      title: photo.title || `${currentCategoryDef.label} Project #${stagedPhotos.length + idx + 1}`,
      isCover: stagedPhotos.length === 0 && idx === 0,
      priceNgn: batchBasePrice || 20000,
    }));
    setStagedPhotos((prev) => [...prev, ...newItems]);
    setIsAutoFetchModalOpen(false);
    showToast(
      'Photos Staged from Online Search',
      `Added ${photosToStage.length} online photo(s) to staging area for "${currentCategoryDef.label}". Ready to publish!`
    );
  };

  // Apply custom Pinterest / Web URL to staged photos
  const handleApplyPinterestUrl = () => {
    if (!pinterestInputUrl.trim()) return;
    const processed = processExternalImageUrl(pinterestInputUrl);
    if (!processed.valid) {
      alert(processed.error || 'Please enter a valid web image URL.');
      return;
    }

    const newItem: StagedPhotoItem = {
      id: `url-${Date.now()}`,
      dataUrl: processed.cleanUrl,
      fileName: `${processed.source} Image`,
      title: `${currentCategoryDef.label} (${processed.source})`,
      isCover: stagedPhotos.length === 0,
      priceNgn: batchBasePrice || 20000,
    };
    setStagedPhotos((prev) => [...prev, newItem]);
    setPinterestInputUrl('');
    setIsAutoFetchModalOpen(false);
    showToast(
      `${processed.source} Image Added`,
      `Added photo from ${processed.source} to staging area. Ready to publish!`
    );
  };

  // Stage a photo from a direct image link with preview
  const handleStageFromUrl = (url: string) => {
    const processed = processExternalImageUrl(url);
    const cleanUrl = processed.valid ? processed.cleanUrl : url;
    const newItem: StagedPhotoItem = {
      id: `url-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      dataUrl: cleanUrl,
      fileName: `${processed.source || 'Web'} Image`,
      title: `${currentCategoryDef.label} Project #${stagedPhotos.length + 1}`,
      isCover: stagedPhotos.length === 0,
      priceNgn: batchBasePrice || 20000,
    };
    setStagedPhotos((prev) => [...prev, newItem]);
    setIsUrlLinkModalOpen(false);
    showToast(
      'Image Link Staged',
      `Added image link with zero storage quota needed. Ready to publish!`
    );
  };

  // Handle saving image from ImageManagerModal directly into an active product
  const handleProductImageManagerSave = async (data: { imageUrl: string; title?: string; description?: string }) => {
    if (!activeProductForImageManager) return;
    const existingImages = activeProductForImageManager.images || [activeProductForImageManager.image];
    const updatedImages = [data.imageUrl, ...existingImages.filter((img) => img !== data.imageUrl)];
    
    const updatedProd: Product = {
      ...activeProductForImageManager,
      image: data.imageUrl,
      images: updatedImages,
      ...(data.title ? { name: data.title } : {}),
      ...(data.description ? { shortDescription: data.description } : {}),
    };

    // Permanently lock image in registry
    lockProductImage(updatedProd.id, updatedProd.image, updatedProd.images, updatedProd.name, true);

    onUpdateProduct(activeProductForImageManager.id, {
      image: data.imageUrl,
      images: updatedImages,
      ...(data.title ? { name: data.title } : {}),
      ...(data.description ? { shortDescription: data.description } : {}),
    });

    await saveSingleProductToCloud(updatedProd);

    showToast(
      'Photo Replaced & Locked',
      `"${updatedProd.name}" now displays your image link directly. Zero platform storage used!`
    );
    setActiveProductForImageManager(null);
  };

  // Stage selected photos from the Cloud / Mobile uploads gallery
  const handleStageCloudPhotos = (cloudPhotos: CloudUploadedImage[]) => {
    if (!cloudPhotos || cloudPhotos.length === 0) return;

    const newStaged: StagedPhotoItem[] = cloudPhotos.map((img, i) => {
      const cleanName = (img.name || 'Cloud Photo')
        .replace(/\.[^/.]+$/, '')
        .replace(/[-_]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      const formattedTitle = cleanName.length > 3
        ? cleanName.charAt(0).toUpperCase() + cleanName.slice(1)
        : `${currentCategoryDef.shortLabel} Work #${stagedPhotos.length + i + 1}`;

      return {
        id: img.id || `cloud-staged-${Date.now()}-${i}`,
        dataUrl: img.dataUrl,
        fileName: img.name || 'Cloud Upload.jpg',
        title: formattedTitle,
        isCover: stagedPhotos.length === 0 && i === 0,
        priceNgn: batchBasePrice,
      };
    });

    setStagedPhotos((prev) => [...prev, ...newStaged]);
    setIsCloudGalleryOpen(false);
    setSelectedCloudIds([]);
    showToast(
      'Phone & Cloud Uploads Staged',
      `Added ${newStaged.length} photo(s) from your Cloud Database to "${currentCategoryDef.label}". Ready to publish!`
    );
  };

  // Process multiple image files from input or drag-and-drop
  const processFiles = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    // Safe validation supporting iPhone HEIC/HEIF, camera uploads, and standard images
    const fileArray: File[] = Array.from(files).filter((f: any): f is File => {
      if (!f) return false;
      if (typeof f.type === 'string' && f.type.startsWith('image/')) return true;
      return /\.(jpe?g|png|webp|heic|heif|gif|svg|bmp|tiff?)$/i.test(f.name || '');
    });
    
    if (fileArray.length === 0) {
      alert('Please select valid image files (JPG, PNG, WEBP, HEIC).');
      setIsUploading(false);
      return;
    }

    const newStaged: StagedPhotoItem[] = [];
    const totalFiles = fileArray.length;

    try {
      for (let i = 0; i < totalFiles; i++) {
        const file = fileArray[i];
        setUploadProgressText(`Optimizing & saving to Cloud Database (${i + 1} of ${totalFiles}): "${file.name.slice(0, 24)}..."`);
        
        // Multi-pass mobile-optimized compression (<120KB, crystal clear Retina clarity)
        const compressedDataUrl = await compressImageFile(file, 1080, 0.78);
        
        // Push to cloud background storage with retry for mobile devices
        const imageId = `cat-img-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
        await saveUploadedImageToCloud({
          id: imageId,
          name: file.name,
          dataUrl: compressedDataUrl,
          uploadedAt: new Date().toISOString()
        });

        // Generate clean title from file name
        const cleanName = file.name
          .replace(/\.[^/.]+$/, '')
          .replace(/[-_]/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();

        const formattedTitle = cleanName.length > 3
          ? cleanName.charAt(0).toUpperCase() + cleanName.slice(1)
          : `${currentCategoryDef.shortLabel} Work #${stagedPhotos.length + i + 1}`;

        newStaged.push({
          id: imageId,
          dataUrl: compressedDataUrl,
          fileName: file.name,
          title: formattedTitle,
          isCover: stagedPhotos.length === 0 && i === 0,
          priceNgn: batchBasePrice,
        });
      }

      setStagedPhotos((prev) => [...prev, ...newStaged]);
      
      // Auto-populate single gallery title if not filled
      if (!singleGalleryTitle) {
        setSingleGalleryTitle(`${currentCategoryDef.label} Portfolio Collection`);
      }

      showToast(
        'Saved to Cloud & Staged Across All Devices',
        `Successfully optimized and saved ${newStaged.length} image(s) to Cloud Database for "${currentCategoryDef.label}".`
      );
    } catch (err) {
      console.error('Error processing multiple category images:', err);
      alert('Error reading or uploading image files. Please check connection and try again.');
    } finally {
      setIsUploading(false);
      setUploadProgressText('');
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files) {
      processFiles(e.dataTransfer.files);
    }
  };

  // Set a specific staged photo as primary cover
  const handleSetCoverPhoto = (id: string) => {
    setStagedPhotos((prev) =>
      prev.map((item) => ({
        ...item,
        isCover: item.id === id,
      }))
    );
  };

  // Remove a staged photo
  const handleRemoveStagedPhoto = (id: string) => {
    setStagedPhotos((prev) => {
      const next = prev.filter((item) => item.id !== id);
      if (next.length > 0 && !next.some((p) => p.isCover)) {
        next[0].isCover = true;
      }
      return next;
    });
  };

  // Append new photos directly to an existing product
  const handleAppendToExistingProduct = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !targetProductForAppend) return;

    setIsUploading(true);
    const fileArray: File[] = Array.from(files).filter((f: any): f is File => {
      if (!f) return false;
      if (typeof f.type === 'string' && f.type.startsWith('image/')) return true;
      return /\.(jpe?g|png|webp|heic|heif|gif|svg|bmp|tiff?)$/i.test(f.name || '');
    });
    const newImageUrls: string[] = [];

    try {
      for (let i = 0; i < fileArray.length; i++) {
        const file = fileArray[i];
        setUploadProgressText(`Optimizing & syncing photo ${i + 1} of ${fileArray.length}...`);
        const compressed = await compressImageFile(file, 1080, 0.78);
        newImageUrls.push(compressed);
        
        await saveUploadedImageToCloud({
          id: `prod-extra-${Date.now()}-${i}`,
          name: file.name,
          dataUrl: compressed,
          uploadedAt: new Date().toISOString(),
        });
      }

      const existingImages = targetProductForAppend.images || [targetProductForAppend.image];
      const mergedImages = Array.from(new Set([...existingImages, ...newImageUrls]));

      const updatedProd: Product = {
        ...targetProductForAppend,
        images: mergedImages,
        image: mergedImages[0], // ensure valid cover
      };

      // Permanently lock images in registry
      lockProductImage(updatedProd.id, updatedProd.image, updatedProd.images, updatedProd.name, true);

      onUpdateProduct(targetProductForAppend.id, {
        images: mergedImages,
        image: mergedImages[0],
      });

      // Synchronize with Firestore cloud so all devices see the new photos
      saveSingleProductToCloud(updatedProd).catch((err) =>
        console.warn('Cloud sync error for updated product:', err)
      );

      showToast(
        'Product Gallery Expanded & Permanently Locked',
        `Added ${newImageUrls.length} new photo(s) to "${targetProductForAppend.name}". Photos are locked and will not change until you update them.`
      );
      setTargetProductForAppend(null);
    } catch (err) {
      console.error('Error appending photos to product:', err);
      alert('Failed to upload photos to product. Please check connection and try again.');
    } finally {
      setIsUploading(false);
      setUploadProgressText('');
    }
  };

  // Replace primary cover photo of an existing product and lock it permanently
  const handleReplaceProductCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !targetProductForReplace) return;

    setIsUploading(true);
    setUploadProgressText(`Optimizing & locking new cover photo for "${targetProductForReplace.name}"...`);
    try {
      const compressed = await compressImageFile(file, 1080, 0.78);
      const existingImages = targetProductForReplace.images || [targetProductForReplace.image];
      const updatedImages = [compressed, ...existingImages.filter((img) => img !== compressed)];

      const updatedProd: Product = {
        ...targetProductForReplace,
        image: compressed,
        images: updatedImages,
      };

      // Permanently lock image in registry
      lockProductImage(updatedProd.id, updatedProd.image, updatedProd.images, updatedProd.name, true);

      onUpdateProduct(targetProductForReplace.id, {
        image: compressed,
        images: updatedImages,
      });

      await saveSingleProductToCloud(updatedProd);

      showToast(
        'Cover Photo Replaced & Permanently Locked',
        `"${targetProductForReplace.name}" now has your new photo locked in place. It will not change until you change it again.`
      );
      setTargetProductForReplace(null);
    } catch (err) {
      console.error('Error replacing cover photo:', err);
      alert('Failed to replace cover photo. Please check connection and try again.');
    } finally {
      setIsUploading(false);
      setUploadProgressText('');
      if (e.target) e.target.value = '';
    }
  };

  // Execute Publishing of Staged Photos to the Category
  const handlePublishStagedPhotos = () => {
    if (stagedPhotos.length === 0) {
      alert('Please upload at least one image first.');
      return;
    }

    const resolvedCategory: ProductCategory = currentCategoryDef.defaultProductCategory;
    const resolvedCatLabel = currentCategoryDef.label;

    if (uploadMode === 'batch') {
      // 1. Batch Publish Mode: each photo creates a distinct product/job
      stagedPhotos.forEach((photo, idx) => {
        const timestamp = Date.now() + idx;
        const itemTitle = batchNamingPrefix.trim()
          ? `${batchNamingPrefix.trim()} - Work #${idx + 1}`
          : photo.title || `${resolvedCatLabel} Sample #${idx + 1}`;

        const slug = itemTitle
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

        const newProduct: Product = {
          id: `prod-${timestamp}`,
          sku: `SKU-${selectedCategoryKey.toUpperCase().slice(0, 3)}-${Math.floor(1000 + Math.random() * 9000)}`,
          name: itemTitle,
          slug: `${slug}-${timestamp}`,
          category: resolvedCategory,
          categoryLabel: resolvedCatLabel,
          categoryPlacement: selectedCategoryKey,
          basePriceNgn: Number(photo.priceNgn) || batchBasePrice || 20000,
          hidePrice: photo.hidePrice !== undefined ? photo.hidePrice : batchHidePrice,
          minQuantity: batchMinQty || 1,
          turnaroundDays: batchTurnaroundDays || 2,
          badge: 'Latest Project',
          image: photo.dataUrl,
          images: [photo.dataUrl],
          shortDescription: `Custom high-precision ${resolvedCatLabel} produced in-house by Silver & Gold Inkshine Ltd with premium commercial finishing.`,
          description: `Engineered with strict color-calibration, certified substrates, and nationwide doorstep delivery across Nigeria. Suitable for corporate, event, and industrial requirements.`,
          optionGroups: [
            {
              id: `opt-size-${timestamp}`,
              name: 'Dimensions / Standard Size',
              type: 'size',
              required: true,
              options: [
                { id: `sz-std-${timestamp}`, name: 'Standard Commercial Size', code: 'STD', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
                { id: `sz-lrg-${timestamp}`, name: 'Large Premium Extent', code: 'LRG', priceModifierType: 'fixed', priceModifierValue: 5000 },
              ],
            },
            {
              id: `opt-lam-${timestamp}`,
              name: 'Protective Finishing',
              type: 'finishing',
              required: true,
              options: [
                { id: `lm-gls-${timestamp}`, name: 'High-Gloss Lamination', code: 'GLOSS', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
                { id: `lm-mat-${timestamp}`, name: 'Matte Anti-Glare Finish', code: 'MATTE', priceModifierType: 'fixed', priceModifierValue: 1500 },
              ],
            },
          ],
          bulkPricingTiers: [
            { minQuantity: 1, maxQuantity: 5, discountPercentage: 0, label: '1 - 5 units' },
            { minQuantity: 6, maxQuantity: 20, discountPercentage: 10, label: '6 - 20 units (10% off)' },
            { minQuantity: 21, maxQuantity: null, discountPercentage: 18, label: '21+ units (18% off)' },
          ],
          artworkRequirements: {
            recommendedDpi: 300,
            supportedFormats: ['PDF', 'CDR', 'AI', 'PNG', 'TIFF'],
            bleedMarginMm: 3,
            maxFileSizeMb: 80,
          },
        };

        if (onAddProduct) {
          // Lock image permanently in registry
          lockProductImage(newProduct.id, newProduct.image, newProduct.images, newProduct.name, true);
          onAddProduct(newProduct);
        }
        // Securely sync to Cloud Firestore across all devices
        saveSingleProductToCloud(newProduct).catch((err) =>
          console.warn('Failed to save new product to cloud:', err)
        );
      });

      showToast(
        'Batch Published & Permanently Locked!',
        `Successfully published ${stagedPhotos.length} separate items under "${resolvedCatLabel}". Photos are locked and will not change automatically!`
      );
    } else {
      // 2. Single Gallery Mode: merge all photos into 1 product
      const timestamp = Date.now();
      const coverPhoto = stagedPhotos.find((p) => p.isCover)?.dataUrl || stagedPhotos[0].dataUrl;
      const allImages = stagedPhotos.map((p) => p.dataUrl);

      const title = singleGalleryTitle.trim() || `${resolvedCatLabel} Complete Collection`;
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const newProduct: Product = {
        id: `prod-${timestamp}`,
        sku: `SKU-${selectedCategoryKey.toUpperCase().slice(0, 3)}-${Math.floor(1000 + Math.random() * 9000)}`,
        name: title,
        slug: `${slug}-${timestamp}`,
        category: resolvedCategory,
        categoryLabel: resolvedCatLabel,
        categoryPlacement: selectedCategoryKey,
        basePriceNgn: Number(singleGalleryPrice) || 25000,
        hidePrice: singleGalleryHidePrice,
        minQuantity: singleGalleryMinQty || 1,
        turnaroundDays: singleGalleryTurnaround || 2,
        badge: singleGalleryBadge.trim() || 'Multi-Photo Showcase',
        image: coverPhoto,
        images: allImages,
        shortDescription: singleGalleryDescription.trim() || `Comprehensive ${resolvedCatLabel} showcase featuring ${allImages.length} high-resolution views and finishes.`,
        description: singleGalleryDescription.trim() || `Explore our complete craftsmanship in ${resolvedCatLabel}. Every piece is printed in-house using heavy-duty industrial presses, certified color gamut, and flawless finishing.`,
        optionGroups: [
          {
            id: `opt-spec-${timestamp}`,
            name: 'Specification / Style',
            type: 'material',
            required: true,
            options: [
              { id: `sp-1-${timestamp}`, name: 'Standard Edition', code: 'STD', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
              { id: `sp-2-${timestamp}`, name: 'Heavy-Duty Luxury Edition', code: 'LUX', priceModifierType: 'fixed', priceModifierValue: 8000 },
            ],
          },
        ],
        bulkPricingTiers: [
          { minQuantity: 1, maxQuantity: 5, discountPercentage: 0, label: '1 - 5 units' },
          { minQuantity: 6, maxQuantity: null, discountPercentage: 12, label: '6+ units (12% off)' },
        ],
        artworkRequirements: {
          recommendedDpi: 300,
          supportedFormats: ['PDF', 'CDR', 'AI', 'PNG', 'TIFF'],
          bleedMarginMm: 3,
          maxFileSizeMb: 80,
        },
      };

      if (onAddProduct) {
        // Lock gallery images permanently in registry
        lockProductImage(newProduct.id, newProduct.image, newProduct.images, newProduct.name, true);
        onAddProduct(newProduct);
      }
      // Securely sync to Cloud Firestore across all devices
      saveSingleProductToCloud(newProduct).catch((err) =>
        console.warn('Failed to save gallery product to cloud:', err)
      );

      showToast(
        'Product Gallery Created & Permanently Locked!',
        `Successfully published "${title}" with an interactive gallery of ${allImages.length} photos under "${resolvedCatLabel}"!`
      );
    }

    // Reset staged area
    setStagedPhotos([]);
    setSingleGalleryTitle('');
    setSingleGalleryDescription('');
    setBatchNamingPrefix('');
  };

  return (
    <div className="space-y-6 text-stone-900 pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 max-w-md p-4 bg-stone-950 text-white rounded-2xl shadow-2xl border border-amber-500/40 flex items-start gap-3 animate-in fade-in slide-in-from-top-3">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">{toastMessage.title}</h4>
            <p className="text-xs text-stone-200 mt-0.5 leading-relaxed">{toastMessage.desc}</p>
          </div>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-stone-400 hover:text-white p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Hidden file input for appending to specific product */}
      <input
        type="file"
        ref={appendFileInputRef}
        onChange={handleAppendToExistingProduct}
        accept="image/*"
        multiple
        className="hidden"
      />

      {/* Hidden file input for replacing cover photo of a specific product */}
      <input
        type="file"
        ref={replaceFileInputRef}
        onChange={handleReplaceProductCover}
        accept="image/*"
        className="hidden"
      />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-950 text-white p-6 sm:p-8 rounded-3xl border border-stone-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-black uppercase tracking-wider">
                <FolderTree className="w-3.5 h-3.5" />
                <span>Categories Admin Studio</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                <Images className="w-3.5 h-3.5 text-emerald-400" />
                <span>Bulk Multi-Image Upload Enabled</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-800 text-stone-300 text-[11px] font-mono">
                <Database className="w-3 h-3 text-emerald-400" />
                <span>Syncs to All 22 Categories</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Category Image &amp; Multi-Photo Manager
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Select any of your 22 store categories and upload multiple photos at once. Publish high-resolution sample jobs, multi-angle galleries, and client portfolios that appear immediately on your live website.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {onOpenStorefront && (
              <button
                type="button"
                onClick={() => onOpenStorefront(selectedCategoryKey)}
                className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 active:scale-95 text-stone-950 font-black rounded-xl text-xs sm:text-sm transition-all shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>View "{currentCategoryDef.shortLabel}" on Storefront</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout: Left (Categories Selector) + Right (Upload & Gallery Manager) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ========================================================= */}
        {/* LEFT COLUMN: 22 Categories Selector (lg:col-span-4) */}
        {/* ========================================================= */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-stone-200 shadow-xs p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                <FolderTree className="w-4 h-4 text-[#b8860b]" />
                <span>Store Categories (22)</span>
              </h3>
              <p className="text-[11px] text-stone-500">Pick a category to manage its photos</p>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 font-mono text-xs font-bold">
              {filteredCategories.length}
            </span>
          </div>

          {/* Quick Category Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={categorySearchQuery}
              onChange={(e) => setCategorySearchQuery(e.target.value)}
              placeholder="Find category (e.g. Wedding, Awards)..."
              className="w-full pl-8 pr-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:ring-2 focus:ring-[#b8860b] focus:outline-hidden"
            />
            {categorySearchQuery && (
              <button
                type="button"
                onClick={() => setCategorySearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Categories List */}
          <div className="space-y-1 max-h-[640px] overflow-y-auto pr-1">
            {filteredCategories.map((cat) => {
              const count = categoryCounts[cat.id] || 0;
              const isSelected = selectedCategoryKey === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategoryKey(cat.id);
                    setStagedPhotos([]);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? 'bg-amber-50 border-2 border-[#b8860b] shadow-xs'
                      : 'hover:bg-stone-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                        isSelected
                          ? 'bg-[#b8860b] text-white'
                          : 'bg-stone-100 text-stone-600 group-hover:bg-stone-200'
                      }`}
                    >
                      {cat.shortLabel.charAt(0)}
                    </span>
                    <div className="min-w-0">
                      <p
                        className={`text-xs font-bold truncate ${
                          isSelected ? 'text-stone-900' : 'text-stone-700 group-hover:text-stone-900'
                        }`}
                      >
                        {cat.label}
                      </p>
                      <p className="text-[10px] text-stone-400 truncate max-w-[190px]">
                        {cat.tagline}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold shrink-0 ml-1 ${
                      isSelected
                        ? 'bg-[#b8860b] text-white'
                        : count > 0
                        ? 'bg-stone-100 text-stone-700'
                        : 'bg-stone-50 text-stone-400'
                    }`}
                  >
                    {count} item{count !== 1 ? 's' : ''}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: Multi-Image Upload & Category Studio (lg:col-span-8) */}
        {/* ========================================================= */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Active Category Header Card */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[10px] font-mono font-bold uppercase">
                  Current Category
                </span>
                <span className="text-xs text-[#b8860b] font-bold">
                  {categoryProducts.length} Active Product{categoryProducts.length !== 1 ? 's' : ''} / Portfolios
                </span>
              </div>
              <h3 className="text-xl font-black text-stone-900 mt-1">
                {currentCategoryDef.label}
              </h3>
              <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                {currentCategoryDef.tagline}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setIsUrlLinkModalOpen(true)}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                title="Add photo via direct web image link with live preview (zero storage quota)"
              >
                <LinkIcon className="w-4 h-4" />
                <span>Add by Image Link (No Storage)</span>
              </button>

              <button
                type="button"
                onClick={() => setIsCloudGalleryOpen(true)}
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                title="View and stage photos saved from phone or other devices"
              >
                <Cloud className="w-4 h-4 text-emerald-400" />
                <span>Phone &amp; Cloud Uploads ({cloudLibraryImages.length})</span>
              </button>

              <button
                type="button"
                onClick={handleOpenAutoFetchModal}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 rounded-xl text-xs font-black flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                title="Auto-fetch matching photos for this category (Option 2)"
              >
                <Sparkles className="w-4 h-4" />
                <span>Auto-Fetch Category Photos</span>
              </button>

              <button
                type="button"
                onClick={() => multiFileInputRef.current?.click()}
                disabled={isUploading}
                className="px-4 py-2 bg-[#00473e] hover:bg-[#03554a] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-60"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Multiple Photos</span>
              </button>
            </div>
          </div>

          {/* Drag and Drop Zone for Multiple Images */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all bg-stone-50/70 ${
              dragOver
                ? 'border-[#b8860b] bg-amber-50/50 scale-[1.01]'
                : 'border-stone-300 hover:border-stone-400'
            }`}
          >
            <input
              type="file"
              ref={multiFileInputRef}
              onChange={handleFileInputChange}
              accept="image/*"
              multiple
              className="hidden"
            />

            <div className="max-w-md mx-auto space-y-3">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#b8860b]/15 text-[#b8860b] flex items-center justify-center shadow-xs">
                <Images className="w-7 h-7" />
              </div>

              <div>
                <h4 className="font-black text-base text-stone-900">
                  Drag &amp; Drop Multiple Photos Here
                </h4>
                <p className="text-xs text-stone-500 mt-1">
                  Or click below to select 1, 5, 10, or 20+ images from your phone gallery or computer.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setIsCloudGalleryOpen(true)}
                  className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-900 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <Cloud className="w-4 h-4 text-emerald-600" />
                  <span>Phone &amp; Cloud Uploads ({cloudLibraryImages.length})</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenAutoFetchModal}
                  className="px-5 py-2.5 bg-[#b8860b] hover:bg-[#996515] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Auto-Fetch Matching Online Photos (Option 2)</span>
                </button>

                <button
                  type="button"
                  onClick={() => multiFileInputRef.current?.click()}
                  disabled={isUploading}
                  className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <Upload className="w-4 h-4 text-amber-400" />
                  <span>{isUploading ? 'Optimizing Images...' : 'Select Multiple Images from Device'}</span>
                </button>
              </div>

              {isUploading && (
                <div className="pt-2 text-xs font-semibold text-[#00473e] flex items-center justify-center gap-2 animate-pulse">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>{uploadProgressText || 'Compressing & uploading high-resolution photos...'}</span>
                </div>
              )}

              <p className="text-[11px] text-stone-400">
                Supports JPG, PNG, WEBP. Automatically optimized to high-resolution web standards.
              </p>
            </div>
          </div>

          {/* Staged Uploads Panel (If photos selected) */}
          {stagedPhotos.length > 0 && (
            <div className="bg-white p-5 rounded-2xl border-2 border-[#b8860b]/50 shadow-md space-y-5 animate-in fade-in slide-in-from-top-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <h4 className="font-black text-stone-900 text-sm">
                      {stagedPhotos.length} Photo{stagedPhotos.length !== 1 ? 's' : ''} Ready to Publish to "{currentCategoryDef.shortLabel}"
                    </h4>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Choose how these photos should appear in this category.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setStagedPhotos([])}
                  className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All Staged Photos</span>
                </button>
              </div>

              {/* Upload Mode Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setUploadMode('batch')}
                  className={`p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                    uploadMode === 'batch'
                      ? 'border-[#b8860b] bg-amber-50/50 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black text-stone-900">
                      Mode A: Batch Publish Separate Items
                    </span>
                    <span className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                      uploadMode === 'batch' ? 'border-[#b8860b] bg-[#b8860b]' : 'border-stone-300'
                    }`}>
                      {uploadMode === 'batch' && <Check className="w-2.5 h-2.5 text-white" />}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-relaxed">
                    Each uploaded photo creates its own distinct design/product card in this category. Ideal for multiple portfolio jobs.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setUploadMode('single_gallery')}
                  className={`p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                    uploadMode === 'single_gallery'
                      ? 'border-[#b8860b] bg-amber-50/50 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black text-stone-900">
                      Mode B: Single Product Multi-Photo Gallery
                    </span>
                    <span className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                      uploadMode === 'single_gallery' ? 'border-[#b8860b] bg-[#b8860b]' : 'border-stone-300'
                    }`}>
                      {uploadMode === 'single_gallery' && <Check className="w-2.5 h-2.5 text-white" />}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-relaxed">
                    Combines all {stagedPhotos.length} photos into ONE product with an interactive multi-photo carousel &amp; thumbnail viewer.
                  </p>
                </button>
              </div>

              {/* Mode-Specific Settings */}
              {uploadMode === 'batch' ? (
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                  <h5 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                    Batch Configuration for all {stagedPhotos.length} Photos:
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-stone-600 mb-1">
                        Default Base Price (₦ NGN)
                      </label>
                      <input
                        type="number"
                        value={batchBasePrice}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setBatchBasePrice(val);
                          setStagedPhotos((prev) => prev.map((p) => ({ ...p, priceNgn: val })));
                        }}
                        className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-stone-600 mb-1">
                        Turnaround (Days)
                      </label>
                      <input
                        type="number"
                        value={batchTurnaroundDays}
                        onChange={(e) => setBatchTurnaroundDays(Number(e.target.value))}
                        className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-stone-600 mb-1">
                        Min Quantity (Units)
                      </label>
                      <input
                        type="number"
                        value={batchMinQty}
                        onChange={(e) => setBatchMinQty(Number(e.target.value))}
                        className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  {/* Hide Price on Storefront Toggle (Batch) */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-amber-50/70 border border-amber-200">
                    <div className="flex items-start gap-2.5">
                      <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${batchHidePrice ? 'bg-amber-600 text-white shadow-xs' : 'bg-stone-200 text-stone-600'}`}>
                        {batchHidePrice ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-stone-900">
                            Hide Price on Storefront
                          </span>
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-200 text-amber-900">
                            {batchHidePrice ? 'Active: "Price on Request"' : 'Off: Numeric Price Visible'}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-600 mt-0.5 leading-relaxed">
                          Recommended when paper and material costs fluctuate. Storefront displays <span className="font-semibold text-amber-900">"Price on Request"</span> with a direct WhatsApp quote button.
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0 self-end sm:self-center">
                      <input
                        type="checkbox"
                        checked={batchHidePrice}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setBatchHidePrice(checked);
                          setStagedPhotos((prev) => prev.map((p) => ({ ...p, hidePrice: checked })));
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-stone-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 mb-1">
                      Batch Naming Prefix (Optional)
                    </label>
                    <input
                      type="text"
                      value={batchNamingPrefix}
                      onChange={(e) => setBatchNamingPrefix(e.target.value)}
                      placeholder={`e.g., "Executive ${currentCategoryDef.shortLabel}" (Will append Work #1, #2...)`}
                      className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                    />
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                  <h5 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                    Multi-Photo Gallery Product Details:
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-stone-600 mb-1">
                        Product / Portfolio Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={singleGalleryTitle}
                        onChange={(e) => setSingleGalleryTitle(e.target.value)}
                        placeholder={`e.g. Luxury ${currentCategoryDef.shortLabel} Collection`}
                        className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-stone-600 mb-1">
                        Base Price (₦ NGN) {singleGalleryHidePrice && <span className="text-amber-700 font-normal">(Internal reference)</span>} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        value={singleGalleryPrice}
                        onChange={(e) => setSingleGalleryPrice(Number(e.target.value))}
                        className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-mono font-bold"
                      />
                    </div>
                  </div>

                  {/* Hide Price on Storefront Toggle (Single Gallery) */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-amber-50/70 border border-amber-200">
                    <div className="flex items-start gap-2.5">
                      <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${singleGalleryHidePrice ? 'bg-amber-600 text-white shadow-xs' : 'bg-stone-200 text-stone-600'}`}>
                        {singleGalleryHidePrice ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-stone-900">
                            Hide Price on Storefront
                          </span>
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-200 text-amber-900">
                            {singleGalleryHidePrice ? 'Active: "Price on Request"' : 'Off: Numeric Price Visible'}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-600 mt-0.5 leading-relaxed">
                          Keeps pricing flexible when raw material rates fluctuate. Buyers can immediately request an official quote.
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0 self-end sm:self-center">
                      <input
                        type="checkbox"
                        checked={singleGalleryHidePrice}
                        onChange={(e) => setSingleGalleryHidePrice(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-stone-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 mb-1">
                      Description / Specifications
                    </label>
                    <textarea
                      rows={2}
                      value={singleGalleryDescription}
                      onChange={(e) => setSingleGalleryDescription(e.target.value)}
                      placeholder="Highlight materials, finishing, and applications..."
                      className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                    />
                  </div>
                </div>
              )}

              {/* Photo Preview Grid with Cover Selection & Remove */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-700">
                    Uploaded Photos ({stagedPhotos.length}) – Click star to choose primary cover:
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {stagedPhotos.map((photo, idx) => (
                    <div
                      key={photo.id}
                      className={`relative group rounded-xl overflow-hidden border-2 transition-all bg-stone-100 ${
                        photo.isCover
                          ? 'border-[#b8860b] ring-2 ring-[#b8860b]/30'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div className="aspect-square">
                        <img
                          src={photo.dataUrl}
                          alt={photo.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {photo.isCover && (
                        <span className="absolute top-1 left-1 bg-[#b8860b] text-white px-1.5 py-0.5 rounded-full text-[9px] font-bold flex items-center gap-0.5 shadow-sm">
                          <Star className="w-2.5 h-2.5 fill-current" />
                          <span>Cover</span>
                        </span>
                      )}

                      <div className="p-1.5 bg-white border-t border-stone-200 space-y-1">
                        <p className="text-[10px] font-bold text-stone-800 truncate" title={photo.title}>
                          {photo.title}
                        </p>
                        {uploadMode === 'batch' && (
                          <button
                            type="button"
                            onClick={() => {
                              setStagedPhotos((prev) =>
                                prev.map((p) => {
                                  if (p.id !== photo.id) return p;
                                  const currentHidden = p.hidePrice !== undefined ? p.hidePrice : batchHidePrice;
                                  return { ...p, hidePrice: !currentHidden };
                                })
                              );
                            }}
                            className={`w-full py-0.5 px-1 rounded text-[9px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors ${
                              (photo.hidePrice !== undefined ? photo.hidePrice : batchHidePrice)
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200'
                            }`}
                            title="Toggle whether price is hidden on storefront for this item"
                          >
                            {(photo.hidePrice !== undefined ? photo.hidePrice : batchHidePrice) ? (
                              <>
                                <EyeOff className="w-2.5 h-2.5" />
                                <span>Price Hidden</span>
                              </>
                            ) : (
                              <>
                                <Eye className="w-2.5 h-2.5" />
                                <span>₦{(photo.priceNgn || batchBasePrice).toLocaleString()}</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>

                      {/* Action buttons overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                        {!photo.isCover && (
                          <button
                            type="button"
                            onClick={() => handleSetCoverPhoto(photo.id)}
                            className="p-1.5 bg-[#b8860b] text-white rounded-lg hover:bg-[#d4af37] cursor-pointer"
                            title="Set as Cover Photo"
                          >
                            <Star className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveStagedPhoto(photo.id)}
                          className="p-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer"
                          title="Remove Photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Publish Action Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-stone-200">
                <span className="text-xs text-stone-500 font-medium">
                  Destination: <strong className="text-stone-900">{currentCategoryDef.label}</strong>
                </span>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setStagedPhotos([])}
                    className="px-4 py-2 border border-stone-300 text-stone-700 hover:bg-stone-50 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handlePublishStagedPhotos}
                    className="flex-1 sm:flex-none px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 active:scale-95 text-stone-950 font-black rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>
                      {uploadMode === 'batch'
                        ? `Publish All ${stagedPhotos.length} Items to Category`
                        : `Publish Multi-Photo Product to Category`}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* CATEGORY PRODUCT GALLERY LIST (Currently live in this category) */}
          {/* ========================================================= */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
              <div>
                <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#b8860b]" />
                  <span>Existing Products in "{currentCategoryDef.label}" ({categoryProducts.length})</span>
                </h4>
                <p className="text-[11px] text-stone-500">
                  Manage photos, add additional gallery shots, or delete works from this category.
                </p>
              </div>

              {onOpenStorefront && categoryProducts.length > 0 && (
                <button
                  type="button"
                  onClick={() => onOpenStorefront(selectedCategoryKey)}
                  className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>Preview in Storefront</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {categoryProducts.length === 0 ? (
              <div className="py-12 text-center space-y-3 bg-stone-50 rounded-xl border border-dashed border-stone-200">
                <div className="w-12 h-12 rounded-full bg-stone-200/70 text-stone-500 flex items-center justify-center mx-auto">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-bold text-stone-800 text-sm">No Products or Photos in this Category Yet</h5>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1">
                    Use the multi-photo upload area above to upload and publish images directly into {currentCategoryDef.label}.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => multiFileInputRef.current?.click()}
                  className="px-4 py-2 bg-[#00473e] hover:bg-[#03554a] text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload First Photos Now</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categoryProducts.map((prod) => {
                  const galleryImages = prod.images && prod.images.length > 0 ? prod.images : [prod.image];
                  const hasMultiple = galleryImages.length > 1;

                  return (
                    <div
                      key={prod.id}
                      className="p-4 rounded-xl border border-stone-200 hover:border-stone-300 bg-stone-50/50 transition-all flex flex-col justify-between gap-3 group"
                    >
                      <div className="flex gap-3 items-start">
                        {/* Primary Image */}
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-stone-200 border border-stone-300 shrink-0">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          {/* Locked Badge */}
                          <span 
                            className="absolute top-1 left-1 bg-emerald-950/90 border border-emerald-400/60 text-[8px] font-extrabold text-emerald-200 px-1 py-0.5 rounded shadow-xs flex items-center gap-0.5 pointer-events-none"
                            title="Image locked in local storage and protected from cloud resets"
                          >
                            <Lock className="w-2.5 h-2.5 text-emerald-300" />
                            <span>Locked</span>
                          </span>

                          {hasMultiple && (
                            <span className="absolute bottom-0 inset-x-0 bg-stone-950/80 text-[9px] font-bold text-amber-300 text-center py-0.5">
                              {galleryImages.length} Photos
                            </span>
                          )}
                        </div>

                        {/* Title & Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-mono font-bold text-stone-400">
                              {prod.sku}
                            </span>
                            {prod.badge && (
                              <span className="px-1.5 py-0.2 bg-amber-100 text-amber-900 rounded text-[9px] font-bold">
                                {prod.badge}
                              </span>
                            )}
                          </div>

                          <h5 className="font-bold text-stone-900 text-xs mt-0.5 truncate" title={prod.name}>
                            {prod.name}
                          </h5>

                          {prod.hidePrice ? (
                            <div className="flex items-center gap-1.5 mt-1">
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                                <EyeOff className="w-3 h-3" /> Price Hidden (On Request)
                              </span>
                              <span className="text-[10px] text-stone-400 font-mono line-through">
                                ₦{(prod.basePriceNgn ?? 0).toLocaleString()}
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 mt-1">
                              <p className="text-xs font-mono font-black text-amber-700">
                                ₦{(prod.basePriceNgn ?? 0).toLocaleString()}
                              </p>
                              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                                Visible
                              </span>
                            </div>
                          )}

                          {/* Gallery Thumbnail Strip */}
                          {hasMultiple && (
                            <div className="flex items-center gap-1 mt-1.5 overflow-x-auto">
                              {galleryImages.slice(0, 4).map((img, i) => (
                                <img
                                  key={i}
                                  src={img}
                                  alt={`Thumb ${i}`}
                                  className="w-6 h-6 rounded object-cover border border-stone-300 shrink-0"
                                  referrerPolicy="no-referrer"
                                />
                              ))}
                              {galleryImages.length > 4 && (
                                <span className="text-[9px] text-stone-500 font-bold">
                                  +{galleryImages.length - 4}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Bar */}
                      <div className="flex items-center justify-between pt-2 border-t border-stone-200 text-xs">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setActiveProductForImageManager(prod)}
                            className="bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 px-2.5 py-1 rounded-lg font-bold text-[11px] flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
                            title="Replace photo using image link, online search, or file upload"
                          >
                            <LinkIcon className="w-3 h-3 text-amber-700" />
                            <span>Change Photo / Link</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setTargetProductForAppend(prod);
                              appendFileInputRef.current?.click();
                            }}
                            className="text-[#00473e] hover:text-[#03554a] font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                            title="Add more angle photos to this product's gallery"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Photos</span>
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* 1-Click Price Visibility Toggle */}
                          <button
                            type="button"
                            onClick={() => {
                              const nextHide = !prod.hidePrice;
                              if (onUpdateProduct) {
                                onUpdateProduct(prod.id, { hidePrice: nextHide });
                              }
                              saveSingleProductToCloud({ ...prod, hidePrice: nextHide }).catch((err) =>
                                console.warn('Failed to update product hidePrice in cloud:', err)
                              );
                              showToast(
                                nextHide ? 'Price Hidden from Storefront' : 'Price Made Visible on Storefront',
                                `"${prod.name}" now ${nextHide ? 'displays "Price on Request"' : `displays ₦${(prod.basePriceNgn ?? 0).toLocaleString()}`} on all devices.`
                              );
                            }}
                            className={`px-2 py-1 rounded-lg text-[10.5px] font-bold flex items-center gap-1 cursor-pointer transition-colors border ${
                              prod.hidePrice
                                ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300'
                                : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-300'
                            }`}
                            title={prod.hidePrice ? 'Click to make price visible on storefront' : 'Click to hide price from storefront'}
                          >
                            {prod.hidePrice ? <Eye className="w-3 h-3 text-amber-800" /> : <EyeOff className="w-3 h-3 text-stone-500" />}
                            <span>{prod.hidePrice ? 'Show Price' : 'Hide Price'}</span>
                          </button>

                          {onDeleteProduct && (
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm(`Delete "${prod.name}" from this category?`)) {
                                  onDeleteProduct(prod.id);
                                  showToast('Product Removed', `Deleted "${prod.name}" from ${currentCategoryDef.label}.`);
                                }
                              }}
                              className="text-stone-400 hover:text-red-600 p-1 cursor-pointer transition-colors"
                              title="Delete from category"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Auto-Fetch Online Category Photos Modal (Option 2) */}
      {isAutoFetchModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
          onClick={() => setIsAutoFetchModalOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-stone-200 flex flex-col animate-in fade-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-gradient-to-r from-amber-50/80 to-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#b8860b]/15 text-[#b8860b] flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-stone-900 flex items-center gap-2">
                    <span>Auto-Fetch Photos: {currentCategoryDef.label}</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold">Option 2</span>
                  </h3>
                  <p className="text-xs text-stone-500">
                    Find high-resolution commercial print &amp; mockup photos online, or stage Pinterest inspiration.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsAutoFetchModalOpen(false)}
                className="p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
              {/* Search Bar & Preset Tags */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={autoFetchQuery}
                      onChange={(e) => setAutoFetchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleSearchAutoFetch();
                        }
                      }}
                      placeholder={`Search print photos for ${currentCategoryDef.label}...`}
                      className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#b8860b] focus:outline-hidden"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSearchAutoFetch()}
                    disabled={isAutoSearching}
                    className="px-4 py-2 bg-[#b8860b] hover:bg-[#996515] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
                  >
                    {isAutoSearching ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                    <span>{isAutoSearching ? 'Searching...' : 'Search'}</span>
                  </button>
                </div>

                {/* Quick Query Suggestions & Direct Google/Pinterest Shortcuts */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-bold text-stone-500 mr-1">Quick Ideas:</span>
                    {[
                      currentCategoryDef.label,
                      `${currentCategoryDef.shortLabel} mockup`,
                      `${currentCategoryDef.shortLabel} design`,
                      'corporate branding printing',
                      'luxury packaging mockup',
                    ].map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setAutoFetchQuery(preset);
                          handleSearchAutoFetch(preset);
                        }}
                        className="px-2.5 py-1 bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-900 rounded-lg text-[11px] font-medium transition-colors cursor-pointer"
                      >
                        {preset}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <a
                      href={getGoogleImagesSearchUrl(autoFetchQuery || currentCategoryDef.label)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-[10px] font-bold flex items-center gap-1 shadow-2xs transition-colors"
                      title="Open Google Images in new tab for this category"
                    >
                      <ExternalLink className="w-3 h-3 text-blue-600" />
                      <span>Google Images ↗</span>
                    </a>
                    <a
                      href={getPinterestSearchUrl(autoFetchQuery || currentCategoryDef.label)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 rounded-lg text-[10px] font-bold flex items-center gap-1 shadow-2xs transition-colors"
                      title="Open Pinterest in new tab for inspiration"
                    >
                      <ExternalLink className="w-3 h-3 text-rose-600" />
                      <span>Pinterest ↗</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Paste Direct Image Link with Live Preview Box */}
              <div className="p-3 bg-amber-50/50 border border-amber-200/80 rounded-xl space-y-2">
                <label className="block text-[11px] font-bold text-amber-950">
                  Or Paste an Image URL Directly (Preview &amp; Zero Storage Used):
                </label>
                <ImageUrlInputWithPreview
                  onSelectUrl={(url) => {
                    handleStageFromUrl(url);
                    setIsAutoFetchModalOpen(false);
                  }}
                  searchKeywords={currentCategoryDef.label}
                  placeholder="Paste image address from Google Images, Pinterest, or any website..."
                />
              </div>

              {/* Search Results Grid */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-stone-900 text-xs flex items-center gap-2">
                    <span>Matching Commercial Photography ({autoSearchResults.length})</span>
                    {isAutoSearching && <RefreshCw className="w-3 h-3 text-[#b8860b] animate-spin" />}
                  </h4>
                  {autoSearchResults.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        const top4 = autoSearchResults.slice(0, 4);
                        setSelectedAutoPhotos(top4);
                      }}
                      className="text-[11px] text-[#b8860b] hover:underline font-bold cursor-pointer"
                    >
                      Select Top 4 Matches
                    </button>
                  )}
                </div>

                {isAutoSearching ? (
                  <div className="py-12 text-center text-stone-400 space-y-2">
                    <RefreshCw className="w-8 h-8 mx-auto animate-spin text-[#b8860b]" />
                    <p className="text-xs font-semibold">Auto-fetching print &amp; mockup photos across online sources...</p>
                  </div>
                ) : autoSearchResults.length === 0 ? (
                  <div className="py-12 text-center text-stone-400 border-2 border-dashed border-stone-200 rounded-2xl">
                    <ImageIcon className="w-8 h-8 mx-auto text-stone-300 mb-2" />
                    <p className="text-xs font-bold text-stone-600">No matching online photos found.</p>
                    <p className="text-[11px] text-stone-400 mt-1">Try another keyword or paste a direct image URL above.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[420px] overflow-y-auto p-1">
                    {autoSearchResults.map((item) => {
                      const isSelected = selectedAutoPhotos.some((p) => p.url === item.url);

                      return (
                        <div
                          key={item.id}
                          onClick={() => {
                            if (isSelected) {
                              setSelectedAutoPhotos(selectedAutoPhotos.filter((p) => p.url !== item.url));
                            } else {
                              setSelectedAutoPhotos([...selectedAutoPhotos, item]);
                            }
                          }}
                          className={`group relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                            isSelected
                              ? 'border-[#b8860b] ring-2 ring-[#b8860b]/30 shadow-md scale-[0.99]'
                              : 'border-stone-200 hover:border-stone-400 hover:shadow-xs'
                          }`}
                        >
                          <div className="aspect-square bg-stone-100 relative overflow-hidden">
                            <img
                              src={item.thumbnail || (item as any).thumbnailUrl || item.url}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              referrerPolicy="no-referrer"
                              loading="lazy"
                            />
                            {/* Source badge */}
                            <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/70 text-white font-mono text-[9px] uppercase tracking-wider backdrop-blur-xs">
                              {item.source}
                            </span>
                            {/* Checkmark indicator */}
                            <div
                              className={`absolute top-1.5 right-1.5 w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                                isSelected ? 'bg-[#b8860b] text-white shadow-xs' : 'bg-white/80 text-stone-400 border border-stone-300'
                              }`}
                            >
                              <Check className="w-3 h-3" />
                            </div>
                          </div>

                          <div className="p-2 bg-white">
                            <p className="text-[11px] font-bold text-stone-900 truncate" title={item.title}>
                              {item.title}
                            </p>
                            <div className="flex items-center justify-between text-[10px] text-stone-400 mt-0.5">
                              <span className="truncate">{item.domain || item.category || item.source}</span>
                              {item.license && <span className="font-mono uppercase">{item.license}</span>}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
              <div className="text-xs text-stone-600">
                <span className="font-bold text-stone-900">{selectedAutoPhotos.length}</span> photo{selectedAutoPhotos.length !== 1 ? 's' : ''} selected
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsAutoFetchModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 rounded-xl text-xs font-bold text-stone-700 bg-white hover:bg-stone-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleStageAutoPhotos(selectedAutoPhotos)}
                  disabled={selectedAutoPhotos.length === 0}
                  className="px-5 py-2 bg-[#b8860b] hover:bg-[#996515] disabled:opacity-40 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Stage {selectedAutoPhotos.length} Selected Photo{selectedAutoPhotos.length !== 1 ? 's' : ''}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: PHONE & CLOUD UPLOADED IMAGES GALLERY */}
      {isCloudGalleryOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            {/* Header */}
            <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-900 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Cloud className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-base">Phone &amp; Cloud Uploads Gallery</h3>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                      Synced in Firestore
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 mt-0.5">
                    All photos uploaded from mobile phones, tablets, or computers are stored securely and remain saved across all devices.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsCloudGalleryOpen(false);
                  setSelectedCloudIds([]);
                }}
                className="p-2 text-stone-400 hover:text-white rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body content */}
            <div className="p-5 overflow-y-auto space-y-4 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-emerald-50 border border-emerald-200/80 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-emerald-950">
                      Cross-Device Image Persistence
                    </h4>
                    <p className="text-[11px] text-emerald-800 mt-0.5">
                      {cloudLibraryImages.length} image(s) currently saved in your Cloud Database. Select any photo below to stage it directly in "{currentCategoryDef.label}".
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => multiFileInputRef.current?.click()}
                    className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload New Photo</span>
                  </button>
                </div>
              </div>

              {cloudLibraryImages.length === 0 ? (
                <div className="py-16 text-center border-2 border-dashed border-stone-200 rounded-2xl space-y-3">
                  <Cloud className="w-10 h-10 mx-auto text-stone-300" />
                  <p className="text-xs font-bold text-stone-700">No photos in cloud database yet.</p>
                  <p className="text-[11px] text-stone-400 max-w-sm mx-auto">
                    Upload any photo from your phone or device — it will be compressed, saved to Firestore, and displayed here automatically.
                  </p>
                  <button
                    type="button"
                    onClick={() => multiFileInputRef.current?.click()}
                    className="px-4 py-2 bg-[#00473e] hover:bg-[#03554a] text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload Photo from This Device</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[460px] overflow-y-auto p-1">
                  {cloudLibraryImages.map((img) => {
                    const isSelected = selectedCloudIds.includes(img.id);

                    return (
                      <div
                        key={img.id}
                        onClick={() => {
                          if (isSelected) {
                            setSelectedCloudIds(selectedCloudIds.filter((id) => id !== img.id));
                          } else {
                            setSelectedCloudIds([...selectedCloudIds, img.id]);
                          }
                        }}
                        className={`group relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                          isSelected
                            ? 'border-emerald-600 ring-2 ring-emerald-500/30 shadow-md scale-[0.99]'
                            : 'border-stone-200 hover:border-stone-400 hover:shadow-xs'
                        }`}
                      >
                        <div className="aspect-square bg-stone-100 relative overflow-hidden">
                          <img
                            src={img.dataUrl}
                            alt={img.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                          {/* Device Badge */}
                          <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/75 text-white font-sans text-[9px] font-bold flex items-center gap-1 backdrop-blur-xs">
                            {img.deviceType === 'phone' ? (
                              <Smartphone className="w-2.5 h-2.5 text-emerald-400" />
                            ) : (
                              <Cloud className="w-2.5 h-2.5 text-amber-400" />
                            )}
                            <span className="capitalize">{img.deviceType || 'Cloud'}</span>
                          </span>

                          {/* Checkmark Selection */}
                          <div
                            className={`absolute top-1.5 right-1.5 w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                              isSelected ? 'bg-emerald-600 text-white shadow-xs' : 'bg-white/80 text-stone-400 border border-stone-300'
                            }`}
                          >
                            <Check className="w-3 h-3" />
                          </div>
                        </div>

                        <div className="p-2 bg-white">
                          <p className="text-[11px] font-bold text-stone-900 truncate" title={img.name}>
                            {img.name}
                          </p>
                          <p className="text-[10px] text-stone-400 mt-0.5">
                            {img.uploadedAt ? new Date(img.uploadedAt).toLocaleDateString() : 'Cloud saved'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
              <div className="text-xs text-stone-600">
                <span className="font-bold text-stone-900">{selectedCloudIds.length}</span> of{' '}
                {cloudLibraryImages.length} photo(s) selected
              </div>

              <div className="flex items-center gap-2">
                {cloudLibraryImages.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedCloudIds.length === cloudLibraryImages.length) {
                        setSelectedCloudIds([]);
                      } else {
                        setSelectedCloudIds(cloudLibraryImages.map((c) => c.id));
                      }
                    }}
                    className="text-xs font-bold text-stone-600 hover:text-stone-900 px-3 py-2 cursor-pointer"
                  >
                    {selectedCloudIds.length === cloudLibraryImages.length ? 'Deselect All' : 'Select All'}
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setIsCloudGalleryOpen(false);
                    setSelectedCloudIds([]);
                  }}
                  className="px-4 py-2 border border-stone-300 rounded-xl text-xs font-bold text-stone-700 bg-white hover:bg-stone-50 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const selectedPhotos = cloudLibraryImages.filter((c) => selectedCloudIds.includes(c.id));
                    handleStageCloudPhotos(selectedPhotos);
                  }}
                  disabled={selectedCloudIds.length === 0}
                  className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 disabled:opacity-40 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer transition-all"
                >
                  <CheckCheck className="w-4 h-4" />
                  <span>Stage {selectedCloudIds.length} Selected into Category</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Direct Image Link Staging Modal */}
      {isUrlLinkModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <LinkIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-black text-sm text-stone-900">
                    Add Photo via Direct Link
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    Target Category: {currentCategoryDef.label}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsUrlLinkModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 p-1.5 rounded-lg hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              Paste any Google Images, Pinterest, or direct image link below. You can preview and test it before adding. 
              The image displays directly from the link, <strong>bypassing storage limits entirely</strong>.
            </p>

            <ImageUrlInputWithPreview
              onSelectUrl={(url) => {
                handleStageFromUrl(url);
              }}
              searchKeywords={currentCategoryDef.label}
              placeholder="Paste image link here (e.g. https://... or https://i.pinimg.com/...)"
            />

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setIsUrlLinkModalOpen(false)}
                className="px-4 py-2 border border-stone-300 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Manager Modal for Active Product Photo Replacement */}
      {activeProductForImageManager && (
        <ImageManagerModal
          isOpen={!!activeProductForImageManager}
          onClose={() => setActiveProductForImageManager(null)}
          currentImageUrl={activeProductForImageManager.image}
          title={activeProductForImageManager.name}
          currentTitle={activeProductForImageManager.name}
          currentDescription={activeProductForImageManager.shortDescription}
          categoryKey={activeProductForImageManager.categoryPlacement || selectedCategoryKey}
          allowDetailsEdit={true}
          onSave={handleProductImageManagerSave}
        />
      )}
    </div>
  );
};
