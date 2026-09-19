import React, { useState, useRef } from 'react';
import { 
  Package, 
  Search, 
  Edit3, 
  Check, 
  Clock, 
  Plus, 
  Trash2, 
  Upload, 
  X, 
  Sparkles, 
  Tag, 
  ImageIcon, 
  ChevronDown, 
  Info, 
  CheckCircle2, 
  ExternalLink,
  FileText,
  DollarSign,
  Star,
  Images,
  Layers
} from 'lucide-react';
import { Product, ProductCategory } from '../../types/schema';
import { STORE_CATEGORIES, getProductCategoryTag } from '../../utils/categoryUtils';
import { ImageManagerModal, PRINT_IMAGE_PRESETS } from './ImageManagerModal';
import { compressImageFile, saveUploadedImageToCloud } from '../../lib/firebase';

interface ProductPricingManagerProps {
  products: Product[];
  onUpdateProduct: (productId: string, updates: Partial<Product>) => void;
  onAddProduct?: (newProduct: Product) => void;
  onDeleteProduct?: (productId: string) => void;
  onOpenStorefront?: () => void;
}

export const ProductPricingManager: React.FC<ProductPricingManagerProps> = ({
  products,
  onUpdateProduct,
  onAddProduct,
  onDeleteProduct,
  onOpenStorefront,
}) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Inline table row edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [priceInput, setPriceInput] = useState<number>(0);
  const [turnaroundInput, setTurnaroundInput] = useState<number>(1);
  const [categoryPlacementInput, setCategoryPlacementInput] = useState<string>('');

  // Comprehensive Product Edit Modal State (Renaming & Descriptions)
  const [editingProductModal, setEditingProductModal] = useState<Product | null>(null);
  const [editModalName, setEditModalName] = useState('');
  const [editModalShortDesc, setEditModalShortDesc] = useState('');
  const [editModalDesc, setEditModalDesc] = useState('');
  const [editModalPrice, setEditModalPrice] = useState<number>(0);
  const [editModalTurnaround, setEditModalTurnaround] = useState<number>(1);
  const [editModalMinQty, setEditModalMinQty] = useState<number>(1);
  const [editModalBadge, setEditModalBadge] = useState<string>('');
  const [editModalCategoryPlacement, setEditModalCategoryPlacement] = useState<string>('banners');
  const [editModalImage, setEditModalImage] = useState<string>('');

  // Direct Image Replace Modal State
  const [replacingImageProduct, setReplacingImageProduct] = useState<Product | null>(null);

  // Upload new product modal state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);

  // New product form fields
  const [newName, setNewName] = useState('');
  const [newCategoryPlacement, setNewCategoryPlacement] = useState<string>('banners_stands');
  const [newBasePrice, setNewBasePrice] = useState<number>(25000);
  const [newMinQuantity, setNewMinQuantity] = useState<number>(1);
  const [newTurnaroundDays, setNewTurnaroundDays] = useState<number>(2);
  const [newBadge, setNewBadge] = useState<string>('Best Seller');
  const [newImageUrl, setNewImageUrl] = useState<string>(PRINT_IMAGE_PRESETS[0].url);
  const [newImages, setNewImages] = useState<string[]>([]);
  const [batchUploadMode, setBatchUploadMode] = useState<boolean>(false);
  const [newDescription, setNewDescription] = useState<string>('');
  const [customImageInput, setCustomImageInput] = useState<string>('');
  const [isUploadingProductImg, setIsUploadingProductImg] = useState<boolean>(false);
  const newProductFileInputRef = useRef<HTMLInputElement>(null);

  // Edit product modal state for multiple images
  const [editModalImages, setEditModalImages] = useState<string[]>([]);
  const [isUploadingEditImages, setIsUploadingEditImages] = useState<boolean>(false);
  const editProductFileInputRef = useRef<HTMLInputElement>(null);

  const handleProductDeviceUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setIsUploadingProductImg(true);
    try {
      const uploadedUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const compressed = await compressImageFile(file, 1200, 0.76);
        uploadedUrls.push(compressed);
        const imageId = `product-img-${Date.now()}-${i}`;
        saveUploadedImageToCloud({
          id: imageId,
          name: file.name,
          dataUrl: compressed,
          uploadedAt: new Date().toISOString()
        }).catch(console.warn);
      }
      setNewImages((prev) => {
        const combined = [...prev, ...uploadedUrls];
        if (!newImageUrl || newImageUrl === PRINT_IMAGE_PRESETS[0].url) {
          setNewImageUrl(combined[0]);
        }
        return combined;
      });
    } catch (err) {
      console.error('Product image compression error:', err);
      alert('Failed to process one or more images. Please try another image file.');
    } finally {
      setIsUploadingProductImg(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleEditDeviceUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setIsUploadingEditImages(true);
    try {
      const uploadedUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const compressed = await compressImageFile(file, 1200, 0.76);
        uploadedUrls.push(compressed);
        const imageId = `edit-img-${Date.now()}-${i}`;
        saveUploadedImageToCloud({
          id: imageId,
          name: file.name,
          dataUrl: compressed,
          uploadedAt: new Date().toISOString()
        }).catch(console.warn);
      }
      setEditModalImages((prev) => {
        const combined = [...prev, ...uploadedUrls];
        if (!editModalImage && combined.length > 0) {
          setEditModalImage(combined[0]);
        }
        return combined;
      });
    } catch (err) {
      console.error('Edit image compression error:', err);
      alert('Failed to process one or more images. Please try another image file.');
    } finally {
      setIsUploadingEditImages(false);
      if (e.target) e.target.value = '';
    }
  };

  // Filter products by search and category
  const filteredProducts = products.filter((p) => {
    if (!p) return false;
    const productTag = getProductCategoryTag(p);
    const matchesCategory = categoryFilter === 'all' || productTag === categoryFilter;
    const s = String(search || '').trim().toLowerCase();
    if (!s) return matchesCategory;

    const matchesSearch =
      String(p.name || '').toLowerCase().includes(s) ||
      String(p.sku || '').toLowerCase().includes(s) ||
      String(p.categoryLabel || '').toLowerCase().includes(s) ||
      String(p.description || '').toLowerCase().includes(s);

    return matchesCategory && matchesSearch;
  });

  // Quick inline edit start
  const handleStartQuickEdit = (product: Product) => {
    setEditingId(product.id);
    setPriceInput(product.basePriceNgn);
    setTurnaroundInput(product.turnaroundDays);
    setCategoryPlacementInput(getProductCategoryTag(product));
  };

  // Quick inline edit save
  const handleSaveQuickEdit = (productId: string) => {
    const matchingCatDef = STORE_CATEGORIES.find((c) => c.id === categoryPlacementInput);
    
    onUpdateProduct(productId, {
      basePriceNgn: Number(priceInput),
      turnaroundDays: Number(turnaroundInput),
      categoryPlacement: categoryPlacementInput,
      ...(matchingCatDef ? { categoryLabel: matchingCatDef.label } : {}),
    });
    setEditingId(null);
  };

  // Open Full Edit Modal (Renaming, Descriptions, Image, Full Details)
  const handleOpenFullEdit = (product: Product) => {
    setEditingProductModal(product);
    setEditModalName(product.name);
    setEditModalShortDesc(product.shortDescription || '');
    setEditModalDesc(product.description || '');
    setEditModalPrice(product.basePriceNgn);
    setEditModalTurnaround(product.turnaroundDays);
    setEditModalMinQty(product.minQuantity || 1);
    setEditModalBadge(product.badge || '');
    setEditModalCategoryPlacement(getProductCategoryTag(product));
    setEditModalImage(product.image);
    const existingImgs = (product.images && product.images.length > 0)
      ? [...product.images]
      : (product.image ? [product.image] : []);
    setEditModalImages(existingImgs);
  };

  // Save Full Edit Modal
  const handleSaveFullEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProductModal) return;

    const matchingCatDef = STORE_CATEGORIES.find((c) => c.id === editModalCategoryPlacement);
    const finalCover = editModalImage || (editModalImages.length > 0 ? editModalImages[0] : editingProductModal.image);
    const finalImages = editModalImages.length > 0 ? editModalImages : [finalCover];

    onUpdateProduct(editingProductModal.id, {
      name: editModalName.trim() || editingProductModal.name,
      shortDescription: editModalShortDesc.trim(),
      description: editModalDesc.trim(),
      basePriceNgn: Number(editModalPrice) || editingProductModal.basePriceNgn,
      turnaroundDays: Number(editModalTurnaround) || editingProductModal.turnaroundDays,
      minQuantity: Number(editModalMinQty) || 1,
      badge: editModalBadge.trim() || undefined,
      categoryPlacement: editModalCategoryPlacement,
      image: finalCover,
      images: finalImages,
      ...(matchingCatDef ? { categoryLabel: matchingCatDef.label } : {}),
    });

    setUploadSuccessMessage(`Successfully updated details for "${editModalName}" with ${finalImages.length} photo(s)!`);
    setEditingProductModal(null);
  };

  // Handle Delete Product
  const handleDeleteProduct = (product: Product) => {
    if (!onDeleteProduct) return;
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete "${product.name}" (${product.sku}) from the catalog?`
    );
    if (confirmed) {
      onDeleteProduct(product.id);
      setUploadSuccessMessage(`Deleted "${product.name}" from catalog.`);
    }
  };

  // Handle new product submit
  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      alert('Please enter a product name');
      return;
    }

    const matchingCatDef = STORE_CATEGORIES.find((c) => c.id === newCategoryPlacement);
    const resolvedCatLabel = matchingCatDef ? matchingCatDef.label : 'Commercial Print';
    const resolvedCategory: ProductCategory = matchingCatDef ? matchingCatDef.defaultProductCategory : 'advertising_materials';

    const timestamp = Date.now();
    const slug = newName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const finalCover = newImageUrl || (newImages.length > 0 ? newImages[0] : PRINT_IMAGE_PRESETS[0].url);
    const finalImages = newImages.length > 0 ? newImages : [finalCover];

    const defaultOptionGroups = [
      {
        id: 'opt-size',
        name: 'Standard Format & Dimension',
        type: 'size' as const,
        required: true,
        options: [
          { id: 'opt-sz-std', name: 'Standard Commercial Size', code: 'STD', priceModifierType: 'fixed' as const, priceModifierValue: 0, isDefault: true },
          { id: 'opt-sz-large', name: 'Large Executive Size', code: 'LRG', priceModifierType: 'fixed' as const, priceModifierValue: 5000 },
        ]
      },
      {
        id: 'opt-material',
        name: 'Media Substrate & Coating',
        type: 'material' as const,
        required: true,
        options: [
          { id: 'opt-mat-matte', name: 'Premium Matte Finish', code: 'MATTE', priceModifierType: 'fixed' as const, priceModifierValue: 0, isDefault: true },
          { id: 'opt-mat-gloss', name: 'Ultra-Vibrant Gloss Finish', code: 'GLOSS', priceModifierType: 'fixed' as const, priceModifierValue: 1500 },
        ]
      }
    ];

    const defaultBulkPricing = [
      { minQuantity: 1, maxQuantity: 5, discountPercentage: 0, label: '1 - 5 units' },
      { minQuantity: 6, maxQuantity: 20, discountPercentage: 10, label: '6 - 20 units (10% Off)' },
      { minQuantity: 21, maxQuantity: null, discountPercentage: 20, label: '21+ units (20% Off)' },
    ];

    const defaultArtworkReqs = {
      recommendedDpi: 300,
      supportedFormats: ['PDF', 'CDR', 'AI', 'TIFF', 'PNG'],
      bleedMarginMm: 3,
      maxFileSizeMb: 50,
    };

    if (batchUploadMode && newImages.length > 1) {
      // Batch mode: create individual jobs for each uploaded photo under this category
      newImages.forEach((imgUrl, i) => {
        const itemNumber = i + 1;
        const itemTitle = `${newName.trim()} (Design #${itemNumber})`;
        const itemProduct: Product = {
          id: `prod-admin-${timestamp}-${i}`,
          sku: `SKU-${newCategoryPlacement.toUpperCase().slice(0, 3)}-${Math.floor(1000 + Math.random() * 9000)}`,
          name: itemTitle,
          slug: `${slug}-${timestamp}-${i}`,
          category: resolvedCategory,
          categoryLabel: resolvedCatLabel,
          categoryPlacement: newCategoryPlacement,
          basePriceNgn: Number(newBasePrice) || 10000,
          minQuantity: Number(newMinQuantity) || 1,
          turnaroundDays: Number(newTurnaroundDays) || 2,
          badge: newBadge.trim() || undefined,
          image: imgUrl,
          images: [imgUrl],
          shortDescription: newDescription.trim() || `Professional ${resolvedCatLabel} by Silver & Gold Inkshine Ltd with premium finishing and guaranteed factory precision.`,
          description: newDescription.trim() || `Our ${itemTitle} is produced in-house with strict color-calibration, top-grade substrates, and nationwide door-step delivery across Nigeria.`,
          optionGroups: defaultOptionGroups,
          bulkPricingTiers: defaultBulkPricing,
          artworkRequirements: defaultArtworkReqs,
        };
        onAddProduct?.(itemProduct);
      });
      setUploadSuccessMessage(`Successfully published ${newImages.length} separate jobs to "${resolvedCatLabel}"!`);
    } else {
      // Single product with multi-image gallery
      const newProduct: Product = {
        id: `prod-admin-${timestamp}`,
        sku: `SKU-${newCategoryPlacement.toUpperCase().slice(0, 3)}-${Math.floor(1000 + Math.random() * 9000)}`,
        name: newName.trim(),
        slug: `${slug}-${timestamp}`,
        category: resolvedCategory,
        categoryLabel: resolvedCatLabel,
        categoryPlacement: newCategoryPlacement,
        basePriceNgn: Number(newBasePrice) || 10000,
        minQuantity: Number(newMinQuantity) || 1,
        turnaroundDays: Number(newTurnaroundDays) || 2,
        badge: newBadge.trim() || undefined,
        image: finalCover,
        images: finalImages,
        shortDescription: newDescription.trim() || `Professional ${resolvedCatLabel} by Silver & Gold Inkshine Ltd with premium finishing and guaranteed factory precision.`,
        description: newDescription.trim() || `Our ${newName.trim()} is produced in-house with strict color-calibration, top-grade substrates, and nationwide door-step delivery across Nigeria.`,
        optionGroups: defaultOptionGroups,
        bulkPricingTiers: defaultBulkPricing,
        artworkRequirements: defaultArtworkReqs,
      };

      if (onAddProduct) {
        onAddProduct(newProduct);
      }
      setUploadSuccessMessage(`Successfully added "${newProduct.name}" with ${finalImages.length} photo(s)! Allocated to "${resolvedCatLabel}".`);
    }

    setIsUploadModalOpen(false);

    // Reset form fields
    setNewName('');
    setNewDescription('');
    setNewBasePrice(25000);
    setNewImages([]);
    setBatchUploadMode(false);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {uploadSuccessMessage && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm flex items-start justify-between gap-3 shadow-xl">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-bold">Catalog Updated Successfully!</strong>
              <p className="mt-0.5 text-emerald-300/90 leading-relaxed">{uploadSuccessMessage}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setUploadSuccessMessage(null)}
            className="text-emerald-400 hover:text-white p-1 rounded-md cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 border border-stone-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
              Product &amp; Catalog CMS Studio
            </span>
            <span className="text-xs text-stone-400 font-mono">Real-time Nigerian Naira (₦) Pricing Engine</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1.5 tracking-tight">
            Manage Products, Pricing &amp; Photography
          </h2>
          <p className="text-xs text-stone-300 max-w-2xl mt-1 leading-relaxed">
            Rename products, change descriptions, replace product images with uploaded photos or presets, adjust base prices, turnaround days, minimum order units, or delete items.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-stone-800/80 px-4 py-2.5 rounded-xl border border-stone-700 text-center">
            <span className="text-xs text-stone-400 block font-medium">Active Catalog</span>
            <span className="text-lg font-mono font-bold text-amber-400">
              {products.length} Items
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              if (categoryFilter !== 'all') {
                setNewCategoryPlacement(categoryFilter);
              }
              setIsUploadModalOpen(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 active:scale-95 text-stone-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
          >
            <Images className="w-4 h-4" />
            <span>Upload Multiple Category Photos</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by title, SKU, description, or category..."
            className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-800 focus:ring-1 focus:ring-amber-500 focus:outline-hidden"
          />
        </div>

        {/* Category Placement Filter & Direct Multi-Image Upload */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs text-stone-500 font-bold whitespace-nowrap">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs font-semibold text-stone-800 focus:ring-1 focus:ring-amber-500 cursor-pointer"
          >
            {STORE_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => {
              if (categoryFilter !== 'all') {
                setNewCategoryPlacement(categoryFilter);
              }
              setIsUploadModalOpen(true);
            }}
            className="px-3 py-1.5 rounded-lg bg-[#00473e] hover:bg-[#03554a] text-white text-xs font-bold whitespace-nowrap flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Upload multiple photos directly to this category"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Photos to {categoryFilter === 'all' ? 'Category' : (STORE_CATEGORIES.find(c => c.id === categoryFilter)?.shortLabel || 'Category')}</span>
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-stone-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase font-mono">
              <tr>
                <th className="py-3 px-4 font-bold">Product / Photo</th>
                <th className="py-3 px-4 font-bold">Category Placement</th>
                <th className="py-3 px-4 font-bold">Base Price (₦ NGN)</th>
                <th className="py-3 px-4 font-bold">Turnaround</th>
                <th className="py-3 px-4 font-bold">Min Quantity</th>
                <th className="py-3 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredProducts.map((product) => {
                const isQuickEditing = editingId === product.id;
                const currentTag = getProductCategoryTag(product);
                const matchingCat = STORE_CATEGORIES.find((c) => c.id === currentTag);

                return (
                  <tr key={product.id} className="hover:bg-stone-50/60 transition-colors">
                    {/* Product & Photo */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative group shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover bg-stone-100 border border-stone-200 cursor-pointer group-hover:opacity-80 transition-opacity"
                            onClick={() => setReplacingImageProduct(product)}
                            title="Click to replace image"
                            referrerPolicy="no-referrer"
                          />
                          <button
                            type="button"
                            onClick={() => setReplacingImageProduct(product)}
                            className="absolute inset-0 flex items-center justify-center bg-black/50 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            title="Replace Image"
                          >
                            <ImageIcon className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="max-w-xs sm:max-w-sm">
                          <p className="font-bold text-stone-900 text-xs line-clamp-1">{product.name}</p>
                          <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">{product.shortDescription}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-mono text-[10px] text-stone-400">{product.sku}</span>
                            {product.badge && (
                              <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                                {product.badge}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      {isQuickEditing ? (
                        <select
                          value={categoryPlacementInput}
                          onChange={(e) => setCategoryPlacementInput(e.target.value)}
                          className="p-1 bg-amber-50 border border-amber-300 rounded text-xs font-semibold text-stone-900"
                        >
                          {STORE_CATEGORIES.filter(c => c.id !== 'all').map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <div className="space-y-0.5">
                          <span className="inline-block px-2 py-0.5 bg-amber-100/80 text-amber-900 border border-amber-300/50 rounded text-[11px] font-bold">
                            {matchingCat?.shortLabel || product.categoryLabel}
                          </span>
                        </div>
                      )}
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4 font-mono">
                      {isQuickEditing ? (
                        <div className="flex items-center gap-1">
                          <span className="text-stone-500 font-bold">₦</span>
                          <input
                            type="number"
                            value={priceInput}
                            onChange={(e) => setPriceInput(Number(e.target.value))}
                            className="w-24 p-1 bg-amber-50 border border-amber-300 rounded text-xs font-bold text-stone-900"
                          />
                        </div>
                      ) : (
                        <span className="text-sm font-bold text-stone-900">
                          ₦{product.basePriceNgn.toLocaleString()}
                        </span>
                      )}
                    </td>

                    {/* Turnaround */}
                    <td className="py-3 px-4">
                      {isQuickEditing ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            value={turnaroundInput}
                            onChange={(e) => setTurnaroundInput(Number(e.target.value))}
                            className="w-16 p-1 bg-amber-50 border border-amber-300 rounded text-xs font-bold text-stone-900"
                          />
                          <span className="text-stone-500 text-[11px]">days</span>
                        </div>
                      ) : (
                        <span className="text-stone-700 font-medium">
                          {product.turnaroundDays} {product.turnaroundDays === 1 ? 'day' : 'days'}
                        </span>
                      )}
                    </td>

                    {/* Min Quantity */}
                    <td className="py-3 px-4">
                      <span className="text-stone-600 text-xs font-mono">
                        {product.minQuantity || 1} units
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                      {isQuickEditing ? (
                        <button
                          type="button"
                          onClick={() => handleSaveQuickEdit(product.id)}
                          className="px-3 py-1 bg-[#b8860b] hover:bg-[#996515] text-white rounded font-semibold text-xs inline-flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                        >
                          <Check className="w-3 h-3" />
                          Save
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleStartQuickEdit(product)}
                          className="px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded font-semibold text-xs transition-colors cursor-pointer"
                          title="Quick Edit Price & Turnaround"
                        >
                          Quick Edit
                        </button>
                      )}

                      {/* Full Edit / Rename & Descriptions */}
                      <button
                        type="button"
                        onClick={() => handleOpenFullEdit(product)}
                        className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded font-bold text-xs inline-flex items-center gap-1 transition-colors cursor-pointer"
                        title="Rename, change description and full product details"
                      >
                        <Edit3 className="w-3 h-3 text-[#b8860b]" />
                        <span>Rename / Details</span>
                      </button>

                      {/* Replace Image Button */}
                      <button
                        type="button"
                        onClick={() => setReplacingImageProduct(product)}
                        className="p-1 text-stone-500 hover:text-[#b8860b] hover:bg-stone-100 rounded transition-colors cursor-pointer inline-flex items-center"
                        title="Replace Image"
                      >
                        <ImageIcon className="w-4 h-4" />
                      </button>

                      {/* Delete Product Button */}
                      {onDeleteProduct && (
                        <button
                          type="button"
                          onClick={() => handleDeleteProduct(product)}
                          className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors cursor-pointer inline-flex items-center"
                          title="Delete Product from Catalog"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* FULL PRODUCT EDIT MODAL: Rename, Description, Image, Full Specs */}
      {editingProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-stone-200 flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between shrink-0">
              <div>
                <h3 className="font-bold text-base sm:text-lg flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-[#f5be38]" />
                  <span>Edit Product: {editingProductModal.name}</span>
                </h3>
                <p className="text-xs text-stone-300 mt-0.5">
                  Rename title, update descriptions, replace photos, and adjust commercial specifications.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingProductModal(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveFullEdit} className="p-6 overflow-y-auto space-y-4 flex-1">
              {/* Image Preview & Multi-Photo Management */}
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Images className="w-4 h-4 text-[#b8860b]" />
                    <span>Product Photo Gallery ({editModalImages.length} image{editModalImages.length !== 1 ? 's' : ''})</span>
                  </label>
                  <span className="text-[11px] text-stone-500">
                    Primary cover image is starred
                  </span>
                </div>

                {/* Cover Preview & Controls */}
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-stone-200 border-2 border-[#b8860b] shadow-sm shrink-0">
                    <img
                      src={editModalImage || (editModalImages[0] || '')}
                      alt={editModalName}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-0 inset-x-0 bg-stone-950/80 text-[9px] font-bold text-[#f5be38] text-center py-0.5 uppercase tracking-wide">
                      Cover
                    </span>
                  </div>

                  <div className="flex-1 w-full space-y-2">
                    <div className="flex flex-wrap gap-2">
                      <input
                        type="file"
                        ref={editProductFileInputRef}
                        onChange={handleEditDeviceUpload}
                        accept="image/*"
                        multiple
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => editProductFileInputRef.current?.click()}
                        disabled={isUploadingEditImages}
                        className="px-3 py-1.5 bg-[#00473e] hover:bg-[#03554a] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>{isUploadingEditImages ? 'Compressing & Syncing...' : 'Upload Photos (Multi-Select)'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setReplacingImageProduct(editingProductModal)}
                        className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shrink-0 cursor-pointer flex items-center gap-1.5"
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>Preset Library</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editModalImage}
                        onChange={(e) => {
                          setEditModalImage(e.target.value);
                          if (e.target.value && !editModalImages.includes(e.target.value)) {
                            setEditModalImages(prev => [e.target.value, ...prev]);
                          }
                        }}
                        placeholder="Or paste direct image URL for cover"
                        className="flex-1 px-3 py-1.5 rounded-lg border border-stone-300 text-xs focus:ring-2 focus:ring-[#b8860b]"
                      />
                    </div>
                  </div>
                </div>

                {/* Gallery Strip of Current Images */}
                {editModalImages.length > 0 && (
                  <div className="pt-2 border-t border-stone-200">
                    <p className="text-[11px] font-semibold text-stone-600 mb-2">
                      All Gallery Photos (Click star to set as main cover, trash to remove):
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {editModalImages.map((imgUrl, idx) => {
                        const isCover = imgUrl === editModalImage;
                        return (
                          <div
                            key={idx}
                            className={`relative group w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                              isCover ? 'border-[#b8860b] ring-2 ring-[#b8860b]/30' : 'border-stone-300 hover:border-stone-400'
                            }`}
                          >
                            <img src={imgUrl} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            {isCover && (
                              <span className="absolute top-1 left-1 bg-[#b8860b] text-white p-0.5 rounded-full shadow-xs">
                                <Star className="w-2.5 h-2.5 fill-current" />
                              </span>
                            )}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                              {!isCover && (
                                <button
                                  type="button"
                                  onClick={() => setEditModalImage(imgUrl)}
                                  className="p-1 bg-[#b8860b] text-white rounded hover:bg-[#d4af37] cursor-pointer"
                                  title="Set as Cover Photo"
                                >
                                  <Star className="w-3 h-3" />
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = editModalImages.filter((_, i) => i !== idx);
                                  setEditModalImages(updated);
                                  if (isCover) {
                                    setEditModalImage(updated[0] || '');
                                  }
                                }}
                                className="p-1 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
                                title="Remove this photo"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Product Name (Rename) */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Product Name / Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editModalName}
                  onChange={(e) => setEditModalName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-bold text-stone-900 focus:ring-2 focus:ring-[#b8860b] focus:outline-hidden"
                />
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Short Description (Card Summary)
                </label>
                <input
                  type="text"
                  value={editModalShortDesc}
                  onChange={(e) => setEditModalShortDesc(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs text-stone-800 focus:ring-2 focus:ring-[#b8860b]"
                />
              </div>

              {/* Full Description */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Full Detailed Description (Product Detail Page)
                </label>
                <textarea
                  rows={4}
                  value={editModalDesc}
                  onChange={(e) => setEditModalDesc(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs text-stone-800 leading-relaxed focus:ring-2 focus:ring-[#b8860b] resize-none"
                />
              </div>

              {/* Category & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Storefront Category Placement
                  </label>
                  <select
                    value={editModalCategoryPlacement}
                    onChange={(e) => setEditModalCategoryPlacement(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold bg-white focus:ring-2 focus:ring-[#b8860b]"
                  >
                    {STORE_CATEGORIES.filter(c => c.id !== 'all').map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Product Badge / Highlight
                  </label>
                  <input
                    type="text"
                    value={editModalBadge}
                    onChange={(e) => setEditModalBadge(e.target.value)}
                    placeholder="e.g. Best Seller, New, Popular"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-[#b8860b]"
                  />
                </div>
              </div>

              {/* Price, Turnaround, Min Qty */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Base Price (₦ NGN)
                  </label>
                  <input
                    type="number"
                    min="100"
                    value={editModalPrice}
                    onChange={(e) => setEditModalPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-mono font-bold focus:ring-2 focus:ring-[#b8860b]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Turnaround (Days)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={editModalTurnaround}
                    onChange={(e) => setEditModalTurnaround(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-mono font-bold focus:ring-2 focus:ring-[#b8860b]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Min Order Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={editModalMinQty}
                    onChange={(e) => setEditModalMinQty(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-mono font-bold focus:ring-2 focus:ring-[#b8860b]"
                  />
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setEditingProductModal(null)}
                  className="px-4 py-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 font-bold text-xs"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#b8860b] hover:bg-[#996515] active:scale-98 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Changes to Storefront</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Direct Image Replace Modal */}
      {replacingImageProduct && (
        <ImageManagerModal
          isOpen={true}
          onClose={() => setReplacingImageProduct(null)}
          currentImageUrl={replacingImageProduct.image}
          title={`Replace Photo: ${replacingImageProduct.name}`}
          subtitle="Upload a high-resolution photo from your device, enter a web URL, or choose a print preset."
          allowDetailsEdit={false}
          onSave={(data) => {
            onUpdateProduct(replacingImageProduct.id, {
              image: data.imageUrl,
            });
            if (editingProductModal && editingProductModal.id === replacingImageProduct.id) {
              setEditModalImage(data.imageUrl);
            }
            setReplacingImageProduct(null);
            setUploadSuccessMessage(`Replaced image for "${replacingImageProduct.name}"!`);
          }}
        />
      )}

      {/* Upload Product Modal */}
      {isUploadModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
          onClick={() => setIsUploadModalOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-stone-200 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between shrink-0">
              <div>
                <h3 className="font-bold text-base sm:text-lg flex items-center gap-2">
                  <Plus className="w-5 h-5 text-[#f5be38]" />
                  <span>Upload New Commercial Product</span>
                </h3>
                <p className="text-xs text-stone-300 mt-0.5">
                  Allocate this product to the exact category so it appears on the front end when customers click &ldquo;View Products&rdquo;.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleUploadSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Product Name / Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Luxury Velvet Rollup Banner, 3D Acrylic Logo Sign, Gold Foil Business Cards"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-bold text-stone-900 focus:ring-2 focus:ring-[#b8860b] focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Storefront Category Placement <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newCategoryPlacement}
                    onChange={(e) => setNewCategoryPlacement(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold bg-white focus:ring-2 focus:ring-[#b8860b]"
                  >
                    {STORE_CATEGORIES.filter(c => c.id !== 'all').map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Badge / Tag (Optional)
                  </label>
                  <input
                    type="text"
                    value={newBadge}
                    onChange={(e) => setNewBadge(e.target.value)}
                    placeholder="e.g. Best Seller, Top Choice, Eco-Solvent"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-[#b8860b]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Base Price (₦ NGN) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="100"
                    required
                    value={newBasePrice}
                    onChange={(e) => setNewBasePrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-mono font-bold focus:ring-2 focus:ring-[#b8860b]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Turnaround (Days)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={newTurnaroundDays}
                    onChange={(e) => setNewTurnaroundDays(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-mono font-bold focus:ring-2 focus:ring-[#b8860b]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Min Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={newMinQuantity}
                    onChange={(e) => setNewMinQuantity(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-mono font-bold focus:ring-2 focus:ring-[#b8860b]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Product Description
                </label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Describe the substrate, finishing options, sizing, and recommended commercial use..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-800 focus:ring-2 focus:ring-[#b8860b] resize-none"
                />
              </div>

              {/* Image Selection & Multi-Photo Gallery Upload */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Images className="w-4 h-4 text-[#b8860b]" />
                    <span>Product Images &amp; Gallery</span>
                    {newImages.length > 0 && (
                      <span className="px-2 py-0.5 bg-[#b8860b]/15 text-[#926c05] font-bold text-[10px] rounded-full">
                        {newImages.length} Photo{newImages.length !== 1 ? 's' : ''} Selected
                      </span>
                    )}
                  </label>
                  <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Syncs to Cloud DB across all devices</span>
                  </span>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white border border-stone-300 shadow-xs shrink-0">
                      <img src={newImageUrl || (newImages[0] || PRINT_IMAGE_PRESETS[0].url)} alt="Cover Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <span className="absolute bottom-0 inset-x-0 bg-stone-950/80 text-[8px] font-bold text-[#f5be38] text-center py-0.5 uppercase tracking-wide">
                        Cover
                      </span>
                    </div>

                    <div className="flex-1 w-full space-y-2">
                      <div className="flex flex-wrap gap-2">
                        <input
                          type="file"
                          ref={newProductFileInputRef}
                          onChange={handleProductDeviceUpload}
                          accept="image/*"
                          multiple
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => newProductFileInputRef.current?.click()}
                          disabled={isUploadingProductImg}
                          className="px-3.5 py-1.5 bg-[#00473e] hover:bg-[#03554a] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>{isUploadingProductImg ? 'Compressing & Syncing...' : 'Upload Photos from Device (Multi-Select)'}</span>
                        </button>

                        <input
                          type="text"
                          value={newImageUrl}
                          onChange={(e) => {
                            setNewImageUrl(e.target.value);
                            if (e.target.value && !newImages.includes(e.target.value)) {
                              setNewImages(prev => [e.target.value, ...prev]);
                            }
                          }}
                          placeholder="Or paste web image URL"
                          className="flex-1 min-w-[180px] px-3 py-1.5 rounded-lg border border-stone-300 text-xs focus:ring-2 focus:ring-[#b8860b]"
                        />
                      </div>
                      <p className="text-[11px] text-stone-500">
                        Select one or multiple photos from your mobile phone or laptop. Supports multiple angle shots, detailed textures, and sample variations.
                      </p>
                    </div>
                  </div>

                  {/* Multi-Photo Gallery List */}
                  {newImages.length > 0 && (
                    <div className="pt-2 border-t border-stone-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-stone-700">
                          Selected Photos ({newImages.length}):
                        </span>
                        {newImages.length > 1 && (
                          <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-medium text-stone-700 bg-white px-2.5 py-1 rounded-lg border border-stone-200">
                            <input
                              type="checkbox"
                              checked={batchUploadMode}
                              onChange={(e) => setBatchUploadMode(e.target.checked)}
                              className="rounded text-[#00473e] focus:ring-[#00473e]"
                            />
                            <span className="text-[11px] font-semibold">
                              Batch Publish: Create separate product for each photo
                            </span>
                          </label>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {newImages.map((imgUrl, idx) => {
                          const isCover = imgUrl === newImageUrl;
                          return (
                            <div
                              key={idx}
                              className={`relative group w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                                isCover ? 'border-[#b8860b] ring-2 ring-[#b8860b]/30' : 'border-stone-300'
                              }`}
                            >
                              <img src={imgUrl} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              {isCover && (
                                <span className="absolute top-0.5 left-0.5 bg-[#b8860b] text-white p-0.5 rounded-full">
                                  <Star className="w-2.5 h-2.5 fill-current" />
                                </span>
                              )}
                              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                                {!isCover && (
                                  <button
                                    type="button"
                                    onClick={() => setNewImageUrl(imgUrl)}
                                    className="p-1 bg-[#b8860b] text-white rounded hover:bg-[#d4af37] cursor-pointer"
                                    title="Set as Cover"
                                  >
                                    <Star className="w-3 h-3" />
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = newImages.filter((_, i) => i !== idx);
                                    setNewImages(updated);
                                    if (isCover) {
                                      setNewImageUrl(updated[0] || PRINT_IMAGE_PRESETS[0].url);
                                    }
                                  }}
                                  className="p-1 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
                                  title="Remove"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Preset Library Thumbnails */}
                  <div className="pt-2 border-t border-stone-200">
                    <span className="text-[11px] font-semibold text-stone-600 block mb-1.5">
                      Or pick from print presets:
                    </span>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {PRINT_IMAGE_PRESETS.slice(0, 12).map((preset, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setNewImageUrl(preset.url);
                            if (!newImages.includes(preset.url)) {
                              setNewImages(prev => [...prev, preset.url]);
                            }
                          }}
                          className={`relative aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                            newImageUrl === preset.url ? 'border-[#b8860b] ring-2 ring-[#b8860b]/30' : 'border-stone-200 opacity-70 hover:opacity-100'
                          }`}
                          title={preset.label}
                        >
                          <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#00473e] hover:bg-[#03554a] active:scale-98 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Product to Storefront</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
