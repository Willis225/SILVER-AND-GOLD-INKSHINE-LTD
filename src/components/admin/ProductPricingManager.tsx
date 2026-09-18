import React, { useState } from 'react';
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
  ExternalLink
} from 'lucide-react';
import { Product, ProductCategory } from '../../types/schema';
import { STORE_CATEGORIES, getProductCategoryTag } from '../../utils/categoryUtils';

interface ProductPricingManagerProps {
  products: Product[];
  onUpdateProduct: (productId: string, updates: Partial<Product>) => void;
  onAddProduct?: (newProduct: Product) => void;
  onDeleteProduct?: (productId: string) => void;
}

// Preset visual photography templates for rapid admin publishing
const PRESET_IMAGES = [
  { label: 'Rollup Banner Stand', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80', cat: 'banners' },
  { label: 'Teardrop Flag Banner', url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80', cat: 'banners' },
  { label: 'Business Cards (Gold Foil)', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80', cat: 'stationery' },
  { label: 'Marketing Flyers & Handbills', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80', cat: 'flyers' },
  { label: 'Luxury Packaging Box', url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80', cat: 'packaging' },
  { label: 'Product Stickers & Labels', url: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=800&q=80', cat: 'packaging' },
  { label: '3D Illuminated LED Signage', url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80', cat: 'signage' },
  { label: 'Crystal Recognition Award', url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=80', cat: 'awards' },
  { label: 'Corporate VIP Gift Set', url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80', cat: 'gifts' },
  { label: 'Gallery Canvas Painting', url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80', cat: 'paintings' },
  { label: 'Branded Corporate Polo', url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80', cat: 'apparel' },
];

export const ProductPricingManager: React.FC<ProductPricingManagerProps> = ({
  products,
  onUpdateProduct,
  onAddProduct,
  onDeleteProduct,
}) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [priceInput, setPriceInput] = useState<number>(0);
  const [turnaroundInput, setTurnaroundInput] = useState<number>(1);
  const [categoryPlacementInput, setCategoryPlacementInput] = useState<string>('');

  // Upload modal state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);

  // New product form fields
  const [newName, setNewName] = useState('');
  const [newCategoryPlacement, setNewCategoryPlacement] = useState<string>('banners');
  const [newBasePrice, setNewBasePrice] = useState<number>(25000);
  const [newMinQuantity, setNewMinQuantity] = useState<number>(1);
  const [newTurnaroundDays, setNewTurnaroundDays] = useState<number>(2);
  const [newBadge, setNewBadge] = useState<string>('Best Seller');
  const [newImageUrl, setNewImageUrl] = useState<string>(PRESET_IMAGES[0].url);
  const [newDescription, setNewDescription] = useState<string>('');
  const [customImageInput, setCustomImageInput] = useState<string>('');

  // Filter products by search and category
  const filteredProducts = products.filter((p) => {
    const productTag = getProductCategoryTag(p);
    const matchesCategory = categoryFilter === 'all' || productTag === categoryFilter;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.categoryLabel.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleStartEdit = (product: Product) => {
    setEditingId(product.id);
    setPriceInput(product.basePriceNgn);
    setTurnaroundInput(product.turnaroundDays);
    setCategoryPlacementInput(getProductCategoryTag(product));
  };

  const handleSaveEdit = (productId: string) => {
    const matchingCatDef = STORE_CATEGORIES.find((c) => c.id === categoryPlacementInput);
    
    onUpdateProduct(productId, {
      basePriceNgn: Number(priceInput),
      turnaroundDays: Number(turnaroundInput),
      categoryPlacement: categoryPlacementInput,
      ...(matchingCatDef ? { categoryLabel: matchingCatDef.label } : {}),
    });
    setEditingId(null);
  };

  // Image upload handler from local disk
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setNewImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle uploading product
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
      image: newImageUrl || PRESET_IMAGES[0].url,
      shortDescription: newDescription.trim() || `Professional ${resolvedCatLabel} by Silver & Gold Inkshine Ltd with premium finishing and guaranteed factory precision.`,
      description: newDescription.trim() || `Our ${newName.trim()} is produced in-house at our Bayelsa manufacturing and print facility with strict color-calibration, top-grade substrates, and nationwide door-step delivery.`,
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

    setUploadSuccessMessage(`Successfully uploaded "${newProduct.name}"! It is allocated to "${resolvedCatLabel}". When customers click "View Products" on that category, it will display this product directly.`);
    setIsUploadModalOpen(false);

    // Reset form fields
    setNewName('');
    setNewDescription('');
    setNewBasePrice(25000);
  };

  return (
    <div className="space-y-6">
      {/* Upload Confirmation Toast */}
      {uploadSuccessMessage && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm flex items-start justify-between gap-3 shadow-xl">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-bold">Product Uploaded &amp; Allocated!</strong>
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
              Product Categories &amp; Upload Portal
            </span>
            <span className="text-xs text-stone-400 font-mono">Real-time Nigerian Naira (₦) Pricing Engine</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1.5 tracking-tight">
            Commercial Product Upload &amp; Category Allocator
          </h2>
          <p className="text-xs text-stone-300 max-w-2xl mt-1 leading-relaxed">
            Upload new products and choose the exact category where they will appear (e.g. Banners &amp; Displays, Business &amp; Office Printing, Packaging, Signage, Flyers, Awards). When a customer clicks <em>&ldquo;View Products&rdquo;</em>, they are taken directly to that category offer alone.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-stone-800/80 px-4 py-2.5 rounded-xl border border-stone-700 text-center">
            <span className="text-xs text-stone-400 block font-medium">Active SKUs</span>
            <span className="text-lg font-mono font-bold text-amber-400">
              {products.length} Products
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsUploadModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 active:scale-95 text-stone-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Upload New Product</span>
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
            placeholder="Search products by title, SKU, or category label..."
            className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-800 focus:ring-1 focus:ring-amber-500"
          />
        </div>

        {/* Category Placement Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs text-stone-500 font-bold whitespace-nowrap">Filter by Placement:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs font-semibold text-stone-800 focus:ring-1 focus:ring-amber-500"
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
                <th className="py-3 px-4 font-bold">Product / SKU</th>
                <th className="py-3 px-4 font-bold">Category Placement</th>
                <th className="py-3 px-4 font-bold">Base Price (₦ NGN)</th>
                <th className="py-3 px-4 font-bold">Turnaround</th>
                <th className="py-3 px-4 font-bold">Min Quantity</th>
                <th className="py-3 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredProducts.map((product) => {
                const isEditing = editingId === product.id;
                const currentTag = getProductCategoryTag(product);
                const matchingCat = STORE_CATEGORIES.find((c) => c.id === currentTag);

                return (
                  <tr key={product.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover bg-stone-100 border border-stone-200 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-stone-900 text-xs">{product.name}</p>
                          <span className="font-mono text-[10px] text-stone-400 block">{product.sku}</span>
                          {product.badge && (
                            <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                              {product.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      {isEditing ? (
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
                          <span className="text-[10px] text-stone-500 block font-mono">
                            Allocated: {currentTag}
                          </span>
                        </div>
                      )}
                    </td>

                    <td className="py-3 px-4 font-mono">
                      {isEditing ? (
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

                    <td className="py-3 px-4">
                      {isEditing ? (
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
                          {product.turnaroundDays} {product.turnaroundDays === 1 ? 'business day' : 'business days'}
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <span className="text-stone-600 text-xs font-mono">
                        {product.minQuantity || 1} units
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right space-x-2">
                      {isEditing ? (
                        <button
                          type="button"
                          onClick={() => handleSaveEdit(product.id)}
                          className="px-3 py-1 bg-[#b8860b] hover:bg-[#996515] text-white rounded font-semibold text-xs inline-flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                        >
                          <Check className="w-3 h-3" />
                          Save
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleStartEdit(product)}
                          className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded font-semibold text-xs inline-flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3 h-3" />
                          Edit
                        </button>
                      )}

                      {onDeleteProduct && product.id.startsWith('prod-admin-') && (
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
                              onDeleteProduct(product.id);
                            }
                          }}
                          className="px-2 py-1 text-red-600 hover:bg-red-50 rounded text-xs transition-colors cursor-pointer"
                          title="Delete uploaded product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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

      {/* Upload Product Modal */}
      {isUploadModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
          onClick={() => setIsUploadModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-2xl bg-stone-900 border border-stone-700 text-stone-100 rounded-2xl shadow-2xl p-6 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">Upload New Product</h3>
                  <p className="text-xs text-stone-400">
                    Assign product to a specific category (Banners, Office, Packaging, Signage, Flyers, etc.)
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1.5 rounded-lg bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleUploadSubmit} className="space-y-4 pt-4">
              {/* Product Title */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Deluxe Teardrop Outdoor Banner Stand, A5 Gloss Handbills, Luxury Rigid Box"
                  className="w-full px-3.5 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-xs sm:text-sm text-white placeholder:text-stone-500 focus:outline-hidden focus:border-amber-400"
                />
              </div>

              {/* Category Placement Selection (CRITICAL) */}
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1.5">
                <label className="block text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Choose Where This Product Will Be (Category Allocation) *</span>
                </label>
                <p className="text-[11px] text-stone-300">
                  When a customer clicks <strong>&ldquo;View Products&rdquo;</strong> on this category section, it will take them exactly to this category alone.
                </p>
                <select
                  value={newCategoryPlacement}
                  onChange={(e) => setNewCategoryPlacement(e.target.value)}
                  className="w-full px-3 py-2.5 bg-stone-900 border border-amber-500/50 rounded-xl text-xs sm:text-sm font-bold text-amber-300 focus:outline-hidden focus:border-amber-400 cursor-pointer"
                >
                  {STORE_CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label} ({cat.shortLabel})
                    </option>
                  ))}
                </select>
              </div>

              {/* Price, Turnaround, Min Quantity Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">
                    Base Price (₦ NGN) *
                  </label>
                  <input
                    type="number"
                    required
                    min="100"
                    value={newBasePrice}
                    onChange={(e) => setNewBasePrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-xs font-mono font-bold text-amber-400 focus:outline-hidden focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">
                    Turnaround (Days) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="30"
                    value={newTurnaroundDays}
                    onChange={(e) => setNewTurnaroundDays(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-xs font-bold text-white focus:outline-hidden focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">
                    Min Order Qty *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={newMinQuantity}
                    onChange={(e) => setNewMinQuantity(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-xs font-bold text-white focus:outline-hidden focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Badge & Short Description */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">
                    Product Badge (Optional)
                  </label>
                  <input
                    type="text"
                    value={newBadge}
                    onChange={(e) => setNewBadge(e.target.value)}
                    placeholder="e.g. Best Seller, New Arrival, 24hr Express"
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-xs text-white placeholder:text-stone-500 focus:outline-hidden focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">
                    Technical Specs Summary
                  </label>
                  <input
                    type="text"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="e.g. 440gsm Heavyweight Flex with Teardrop Aluminum Base"
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-xl text-xs text-white placeholder:text-stone-500 focus:outline-hidden focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Product Image Selection */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-stone-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                    <span>Product Image Preview &amp; Upload</span>
                  </span>
                  <span className="text-[10px] text-stone-400">Choose preset or upload file</span>
                </label>

                {/* Preview Box */}
                <div className="flex items-center gap-3 p-3 bg-stone-800/80 rounded-xl border border-stone-700">
                  <img
                    src={newImageUrl}
                    alt="Preview"
                    className="w-16 h-16 rounded-lg object-cover bg-stone-900 border border-stone-600 shrink-0"
                  />
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <label className="px-3 py-1.5 bg-stone-700 hover:bg-stone-600 text-stone-200 text-xs font-semibold rounded-lg cursor-pointer flex items-center gap-1.5 transition-colors">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload From Computer</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileChange}
                          className="hidden"
                        />
                      </label>
                      <span className="text-[11px] text-stone-400">or enter image URL below</span>
                    </div>

                    <input
                      type="url"
                      value={customImageInput}
                      onChange={(e) => {
                        setCustomImageInput(e.target.value);
                        if (e.target.value.startsWith('http')) {
                          setNewImageUrl(e.target.value);
                        }
                      }}
                      placeholder="Paste image URL (https://...)"
                      className="w-full px-2.5 py-1.5 bg-stone-900 border border-stone-700 rounded-lg text-xs text-white placeholder:text-stone-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Quick Presets Carousel */}
                <div>
                  <span className="text-[11px] text-stone-400 block mb-1">Quick Select Category Template Image:</span>
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {PRESET_IMAGES.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setNewImageUrl(preset.url)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                          newImageUrl === preset.url
                            ? 'bg-amber-500 text-stone-950 font-bold'
                            : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-3 border-t border-stone-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
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
