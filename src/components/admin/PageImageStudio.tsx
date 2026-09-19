import React, { useState, useRef } from 'react';
import { 
  Image as ImageIcon, 
  Upload, 
  Trash2, 
  Edit3, 
  Search, 
  Filter, 
  Plus, 
  Check, 
  ExternalLink, 
  Sparkles, 
  Layers,
  ArrowRight,
  Eye,
  RefreshCw,
  Database,
  Loader2
} from 'lucide-react';
import { Product } from '../../types/schema';
import { HeroSlideItem, ShowcaseServiceItem } from '../../types/websiteContent';
import { ImageManagerModal } from './ImageManagerModal';
import { compressImageFile, saveUploadedImageToCloud } from '../../lib/firebase';

interface PageImageStudioProps {
  heroSlides: HeroSlideItem[];
  onUpdateHeroSlides: (slides: HeroSlideItem[]) => void;
  products: Product[];
  onUpdateProduct: (productId: string, updates: Partial<Product>) => void;
  onDeleteProduct?: (productId: string) => void;
  onAddProduct?: (newProduct: Product) => void;
  showcaseServices: ShowcaseServiceItem[];
  onUpdateShowcaseServices: (services: ShowcaseServiceItem[]) => void;
  onOpenStorefront?: () => void;
}

type MediaFilter = 'all' | 'hero' | 'showcase' | 'products';

interface ActiveEditItem {
  type: 'hero' | 'showcase' | 'product';
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  badge?: string;
  category?: string;
}

export const PageImageStudio: React.FC<PageImageStudioProps> = ({
  heroSlides,
  onUpdateHeroSlides,
  products,
  onUpdateProduct,
  onDeleteProduct,
  onAddProduct,
  showcaseServices,
  onUpdateShowcaseServices,
  onOpenStorefront
}) => {
  const [activeFilter, setActiveFilter] = useState<MediaFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editingItem, setEditingItem] = useState<ActiveEditItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New item modal states
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);
  const [newTargetSection, setNewTargetSection] = useState<'hero' | 'showcase'>('hero');
  const [newTitle, setNewTitle] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');
  const [newBadge, setNewBadge] = useState<string>('');
  const [newImageUrl, setNewImageUrl] = useState<string>('https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80');
  const [isUploadingMediaImg, setIsUploadingMediaImg] = useState<boolean>(false);
  const mediaFileInputRef = useRef<HTMLInputElement>(null);

  const handleMediaFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingMediaImg(true);
    try {
      const compressed = await compressImageFile(file, 1200, 0.76);
      setNewImageUrl(compressed);
      const imageId = `media-img-${Date.now()}`;
      saveUploadedImageToCloud({
        id: imageId,
        name: file.name,
        dataUrl: compressed,
        uploadedAt: new Date().toISOString()
      }).catch(console.warn);
    } catch (err) {
      console.error('Media upload error:', err);
      alert('Failed to process image. Please try another image file.');
    } finally {
      setIsUploadingMediaImg(false);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Compile unified media list for display
  const allMediaItems: ActiveEditItem[] = [
    ...heroSlides.map((s) => ({
      type: 'hero' as const,
      id: s.id,
      name: s.title,
      description: s.caption,
      imageUrl: s.imageUrl,
      badge: s.badge || 'Hero Slide',
      category: s.category
    })),
    ...showcaseServices.map((sc) => ({
      type: 'showcase' as const,
      id: sc.id,
      name: sc.title,
      description: sc.description || sc.price,
      imageUrl: sc.imageUrl,
      badge: 'Showcase',
      category: sc.category
    })),
    ...products.map((p) => ({
      type: 'product' as const,
      id: p.id,
      name: p.name,
      description: p.description,
      imageUrl: p.image,
      badge: p.badge || 'Product',
      category: p.category
    }))
  ];

  // Filtering
  const filteredItems = allMediaItems.filter((item) => {
    const matchesFilter = 
      activeFilter === 'all' ||
      (activeFilter === 'hero' && item.type === 'hero') ||
      (activeFilter === 'showcase' && item.type === 'showcase') ||
      (activeFilter === 'products' && item.type === 'product');

    const sq = String(searchQuery || '').trim().toLowerCase();
    const matchesSearch = 
      !sq ||
      String(item.name || '').toLowerCase().includes(sq) ||
      String(item.description || '').toLowerCase().includes(sq) ||
      (item.category && String(item.category).toLowerCase().includes(sq));

    return matchesFilter && matchesSearch;
  });

  // Handle replace / edit save
  const handleSaveEdit = (data: { imageUrl: string; title?: string; description?: string }) => {
    if (!editingItem) return;

    if (editingItem.type === 'hero') {
      const next = heroSlides.map((s) => 
        s.id === editingItem.id 
          ? { 
              ...s, 
              imageUrl: data.imageUrl, 
              ...(data.title ? { title: data.title } : {}),
              ...(data.description ? { caption: data.description } : {})
            } 
          : s
      );
      onUpdateHeroSlides(next);
      showToast(`Updated Hero Slide: ${data.title || editingItem.name}`);
    } else if (editingItem.type === 'showcase') {
      const next = showcaseServices.map((sc) => 
        sc.id === editingItem.id 
          ? { 
              ...sc, 
              imageUrl: data.imageUrl, 
              ...(data.title ? { title: data.title } : {}),
              ...(data.description ? { description: data.description } : {})
            } 
          : sc
      );
      onUpdateShowcaseServices(next);
      showToast(`Updated Showcase Service: ${data.title || editingItem.name}`);
    } else if (editingItem.type === 'product') {
      onUpdateProduct(editingItem.id, {
        image: data.imageUrl,
        ...(data.title ? { name: data.title } : {}),
        ...(data.description ? { description: data.description } : {})
      });
      showToast(`Updated Product: ${data.title || editingItem.name}`);
    }

    setEditingItem(null);
  };

  // Handle delete image / card
  const handleDelete = (item: ActiveEditItem) => {
    const confirmDelete = window.confirm(`Are you sure you want to remove "${item.name}" from the website?`);
    if (!confirmDelete) return;

    if (item.type === 'hero') {
      if (heroSlides.length <= 1) {
        alert('You must keep at least one slide in the hero slider.');
        return;
      }
      onUpdateHeroSlides(heroSlides.filter((s) => s.id !== item.id));
      showToast(`Removed hero slide: ${item.name}`);
    } else if (item.type === 'showcase') {
      if (showcaseServices.length <= 1) {
        alert('You must keep at least one service in the showcase.');
        return;
      }
      onUpdateShowcaseServices(showcaseServices.filter((sc) => sc.id !== item.id));
      showToast(`Removed showcase service: ${item.name}`);
    } else if (item.type === 'product') {
      if (onDeleteProduct) {
        onDeleteProduct(item.id);
        showToast(`Deleted product: ${item.name}`);
      }
    }
  };

  // Handle create new slide or service
  const handleAddNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newId = `custom-${Date.now()}`;

    if (newTargetSection === 'hero') {
      const newSlide: HeroSlideItem = {
        id: newId,
        title: newTitle.trim(),
        caption: newDescription.trim() || 'Premium quality print solutions nationwide.',
        badge: newBadge.trim() || 'New Arrival',
        imageUrl: newImageUrl,
        category: 'banners',
        aspectRatio: '16/9'
      };
      onUpdateHeroSlides([...heroSlides, newSlide]);
      showToast(`Added new slide: "${newTitle}" to Hero Slider!`);
    } else {
      const newService: ShowcaseServiceItem = {
        id: newId,
        title: newTitle.trim(),
        price: newBadge.trim() || '₦25,000 / unit',
        description: newDescription.trim() || 'High definition full-color commercial printing.',
        imageUrl: newImageUrl,
        category: 'banners_stands'
      };
      onUpdateShowcaseServices([...showcaseServices, newService]);
      showToast(`Added new service: "${newTitle}" to Showcase!`);
    }

    setIsAddingNew(false);
    setNewTitle('');
    setNewDescription('');
    setNewBadge('');
  };

  return (
    <div className="space-y-6 text-stone-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 px-4 py-3 bg-[#00473e] text-white rounded-xl shadow-xl flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-top-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Welcome Banner for Media Studio */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-950 text-white p-6 sm:p-8 rounded-3xl border border-stone-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#b8860b]/20 border border-[#b8860b]/40 text-[#f5be38] text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Full Storefront Image Control</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[11px] font-bold">
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span>Cloud Database Live Sync (All Devices)</span>
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Website Image &amp; Content Studio
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Upload, replace, and edit images on your live website. When you upload or save an image, it automatically synchronizes to the cloud database and appears across all devices instantly.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setIsAddingNew(true)}
              className="px-4 py-2.5 bg-[#00473e] hover:bg-[#03554a] active:scale-98 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Image / Slide</span>
            </button>

            {onOpenStorefront && (
              <button
                type="button"
                onClick={() => onOpenStorefront()}
                className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>View Live Site</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {[
            { id: 'all', label: `All Images (${allMediaItems.length})` },
            { id: 'hero', label: `Hero Slides (${heroSlides.length})` },
            { id: 'showcase', label: `Showcase Services (${showcaseServices.length})` },
            { id: 'products', label: `Product Catalog (${products.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id as MediaFilter)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search images, titles, or descriptions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-[#b8860b] focus:outline-hidden"
          />
        </div>
      </div>

      {/* Media Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredItems.map((item) => (
          <div
            key={`${item.type}-${item.id}`}
            className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
          >
            {/* Image Box */}
            <div className="relative w-full h-48 sm:h-52 bg-stone-100 overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />

              {/* Section Badge */}
              <div className="absolute top-2.5 left-2.5">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-xs ${
                  item.type === 'hero' 
                    ? 'bg-[#b8860b] text-white' 
                    : item.type === 'showcase' 
                    ? 'bg-[#00473e] text-white' 
                    : 'bg-stone-800 text-white'
                }`}>
                  {item.type === 'hero' ? 'Hero Slide' : item.type === 'showcase' ? 'Showcase' : 'Product'}
                </span>
              </div>

              {/* Hover Quick Replace Button */}
              <button
                type="button"
                onClick={() => setEditingItem(item)}
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-bold cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>Change Image</span>
              </button>
            </div>

            {/* Content Details */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h4 className="font-bold text-sm text-stone-900 line-clamp-1 group-hover:text-[#b8860b] transition-colors">
                  {item.name}
                </h4>
                <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Card Action Buttons */}
              <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setEditingItem(item)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  title="Replace Image, Rename, or Change Description"
                >
                  <Edit3 className="w-3.5 h-3.5 text-[#b8860b]" />
                  <span>Edit &amp; Replace</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(item)}
                  className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  title="Remove from website"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="p-12 text-center bg-white rounded-2xl border border-stone-200">
          <ImageIcon className="w-10 h-10 text-stone-300 mx-auto mb-2" />
          <h4 className="font-bold text-stone-700 text-sm">No media items found</h4>
          <p className="text-xs text-stone-500 mt-1">Try adjusting your filter or search query.</p>
        </div>
      )}

      {/* Edit & Replace Modal */}
      {editingItem && (
        <ImageManagerModal
          isOpen={true}
          onClose={() => setEditingItem(null)}
          currentImageUrl={editingItem.imageUrl}
          title={`Edit: ${editingItem.name}`}
          subtitle="Replace the image photo, rename the title, or update the description."
          currentTitle={editingItem.name}
          currentDescription={editingItem.description}
          allowDetailsEdit={true}
          onSave={handleSaveEdit}
        />
      )}

      {/* Add New Slide / Showcase Service Modal */}
      {isAddingNew && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
          onClick={() => setIsAddingNew(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-base flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#f5be38]" />
                <span>Add New Visual Card to Website</span>
              </h3>
              <button 
                onClick={() => setIsAddingNew(false)}
                className="text-stone-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddNewItem} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Target Section</label>
                <select
                  value={newTargetSection}
                  onChange={(e) => setNewTargetSection(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 font-semibold"
                >
                  <option value="hero">Hero Main Banner Slider (Top of page)</option>
                  <option value="showcase">Top-Quality Services Showcase Carousel</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Title / Name *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Executive Roll-up Banners with Aluminium Base"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                >
                </input>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Badge / Price Tag</label>
                <input
                  type="text"
                  value={newBadge}
                  onChange={(e) => setNewBadge(e.target.value)}
                  placeholder="e.g. ₦34,500 each or Best Seller"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Description / Subtitle</label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Describe key specs, material finish, or turnaround..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 resize-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-bold text-stone-700">Media Image (Upload or URL) *</label>
                  <div>
                    <input
                      type="file"
                      ref={mediaFileInputRef}
                      onChange={handleMediaFileUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => mediaFileInputRef.current?.click()}
                      disabled={isUploadingMediaImg}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold cursor-pointer disabled:opacity-50"
                    >
                      {isUploadingMediaImg ? (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin" />
                          <span>Compressing...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-3 h-3" />
                          <span>Upload from Device</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <input
                  type="text"
                  required
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="https://... or uploaded image data"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 font-mono text-xs"
                />
                {newImageUrl && (
                  <div className="mt-2 w-full h-24 rounded-xl overflow-hidden border border-stone-200 bg-stone-100">
                    <img
                      src={newImageUrl}
                      alt="Media preview"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="px-4 py-2 border border-stone-300 rounded-xl font-bold text-stone-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00473e] text-white rounded-xl font-bold shadow-md hover:bg-[#03554a]"
                >
                  Publish to Storefront
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
