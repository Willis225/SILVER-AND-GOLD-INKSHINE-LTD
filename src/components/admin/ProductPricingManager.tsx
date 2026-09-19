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
  DollarSign
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
  const [newCategoryPlacement, setNewCategoryPlacement] = useState<string>('banners');
  const [newBasePrice, setNewBasePrice] = useState<number>(25000);
  const [newMinQuantity, setNewMinQuantity] = useState<number>(1);
  const [newTurnaroundDays, setNewTurnaroundDays] = useState<number>(2);
  const [newBadge, setNewBadge] = useState<string>('Best Seller');
  const [newImageUrl, setNewImageUrl] = useState<string>(PRINT_IMAGE_PRESETS[0].url);
  const [newDescription, setNewDescription] = useState<string>('');
  const [customImageInput, setCustomImageInput] = useState<string>('');
  const [isUploadingProductImg, setIsUploadingProductImg] = useState<boolean>(false);
  const newProductFileInputRef = useRef<HTMLInputElement>(null);

  const handleProductDeviceUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingProductImg(true);
    try {
      const compressed = await compressImageFile(file, 1200, 0.76);
      setNewImageUrl(compressed);
      const imageId = `product-img-${Date.now()}`;
      saveUploadedImageToCloud({
        id: imageId,
        name: file.name,
        dataUrl: compressed,
        uploadedAt: new Date().toISOString()
      }).catch(console.warn);
    } catch (err) {
      console.error('Product image compression error:', err);
      alert('Failed to process image. Please try another image file.');
    } finally {
      setIsUploadingProductImg(false);
    }
  };

  // Filter products by search and category
  const filteredProducts = products.filter((p) => {
    const productTag = getProductCategoryTag(p);
    const matchesCategory = categoryFilter === 'all' || productTag === categoryFilter;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.categoryLabel.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());

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
  };

  // Save Full Edit Modal
  const handleSaveFullEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProductModal) return;

    const matchingCatDef = STORE_CATEGORIES.find((c) => c.id === editModalCategoryPlacement);

    onUpdateProduct(editingProductModal.id, {
      name: editModalName.trim() || editingProductModal.name,
      shortDescription: editModalShortDesc.trim(),
      description: editModalDesc.trim(),
      basePriceNgn: Number(editModalPrice) || editingProductModal.basePriceNgn,
      turnaroundDays: Number(editModalTurnaround) || editingProductModal.turnaroundDays,
      minQuantity: Number(editModalMinQty) || 1,
      badge: editModalBadge.trim() || undefined,
      categoryPlacement: editModalCategoryPlacement,
      image: editModalImage || editingProductModal.image,
      ...(matchingCatDef ? { categoryLabel: matchingCatDef.label } : {}),
    });

    setUploadSuccessMessage(`Successfully updated details for "${editModalName}"!`);
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
      image: newImageUrl || PRINT_IMAGE_PRESETS[0].url,
      shortDescription: newDescription.trim() || `Professional ${resolvedCatLabel} by Silver & Gold Inkshine Ltd with premium finishing and guaranteed factory precision.`,
      description: newDescription.trim() || `Our ${newName.trim()} is produced in-house with strict color-calibration, top-grade substrates, and nationwide door-step delivery across Nigeria.`,
      optionGroups: [
        {
          id: 'opt-size',
          name: 'Standard Format & Dimension',
          type: 'size',
          required: true,
          options: [
            { id: 'opt-sz-std', name: 'Standard Commercial Size', code: 'STD', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
            { id: 'opt-sz-large', name: 'Large Executive Size', code: 'LRG', priceModifierType: 'fixed', priceModifierValue: 5000 },
          ]
        },
        {
          id: 'opt-material',
          name: 'Media Substrate & Coating',
          type: 'material',
          required: true,
          options: [
            { id: 'opt-mat-matte', name: 'Premium Matte Finish', code: 'MATTE', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
            { id: 'opt-mat-gloss', name: 'Ultra-Vibrant Gloss Finish', code: 'GLOSS', priceModifierType: 'fixed', priceModifierValue: 1500 },
          ]
        }
      ],
      bulkPricingTiers: [
        { minQuantity: 1, maxQuantity: 5, discountPercentage: 0, label: '1 - 5 units' },
        { minQuantity: 6, maxQuantity: 20, discountPercentage: 10, label: '6 - 20 units (10% Off)' },
        { minQuantity: 21, maxQuantity: null, discountPercentage: 20, label: '21+ units (20% Off)' },
      ],
      artworkRequirements: {
        recommendedDpi: 300,
        supportedFormats: ['PDF', 'CDR', 'AI', 'TIFF', 'PNG'],
        bleedMarginMm: 3,
        maxFileSizeMb: 50,
      }
    };

    if (onAddProduct) {
      onAddProduct(newProduct);
    }

    setUploadSuccessMessage(`Successfully added "${newProduct.name}"! Allocated to "${resolvedCatLabel}".`);
    setIsUploadModalOpen(false);

    // Reset form fields
    setNewName('');
    setNewDescription('');
    setNewBasePrice(25000);
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
            onClick={() => setIsUploadModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 active:scale-95 text-stone-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
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

        {/* Category Placement Filter */}
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
              {/* Image Preview & Replace */}
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-4">
                <img
                  src={editModalImage}
                  alt={editModalName}
                  className="w-16 h-16 rounded-lg object-cover bg-stone-200 border border-stone-300 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1">
                  <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Product Photography
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editModalImage}
                      onChange={(e) => setEditModalImage(e.target.value)}
                      placeholder="Image URL or upload"
                      className="flex-1 px-3 py-1.5 rounded-lg border border-stone-300 text-xs focus:ring-2 focus:ring-[#b8860b]"
                    />
                    <button
                      type="button"
                      onClick={() => setReplacingImageProduct(editingProductModal)}
                      className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shrink-0 cursor-pointer"
                    >
                      Change Photo
                    </button>
                  </div>
                </div>
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

              {/* Image Selection */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Product Image (Photo)
                  </label>
                  <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Syncs to Cloud DB across all devices</span>
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 items-center p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-white border border-stone-300 shadow-xs shrink-0">
                    <img src={newImageUrl} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>

                  <div className="flex-1 w-full space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="file"
                        ref={newProductFileInputRef}
                        onChange={handleProductDeviceUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => newProductFileInputRef.current?.click()}
                        disabled={isUploadingProductImg}
                        className="px-3 py-1.5 bg-[#00473e] hover:bg-[#03554a] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>{isUploadingProductImg ? 'Compressing & Syncing...' : 'Upload Photo from Device'}</span>
                      </button>

                      <input
                        type="text"
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        placeholder="Or paste web image URL"
                        className="flex-1 px-3 py-1.5 rounded-lg border border-stone-300 text-xs focus:ring-2 focus:ring-[#b8860b]"
                      />
                    </div>
                    <p className="text-[11px] text-stone-500">
                      Upload any JPG/PNG from your mobile or laptop. Automatically compressed and synced to all devices.
                    </p>
                  </div>
                </div>

                {/* Preset Thumbnails */}
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 pt-2">
                  {PRINT_IMAGE_PRESETS.slice(0, 12).map((preset, idx) => (
                    <div
                      key={idx}
                      onClick={() => setNewImageUrl(preset.url)}
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
