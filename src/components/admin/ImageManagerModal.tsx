import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Upload, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  Check, 
  Sparkles, 
  RefreshCw,
  AlertCircle,
  Database,
  Cloud,
  CheckCircle2
} from 'lucide-react';
import { 
  compressImageFile, 
  saveUploadedImageToCloud, 
  subscribeUploadedImages, 
  CloudUploadedImage 
} from '../../lib/firebase';

export interface PresetImage {
  url: string;
  label: string;
  category?: string;
}

export const PRINT_IMAGE_PRESETS: PresetImage[] = [
  // Official Inkshine Showcase Photos
  {
    label: 'Inkshine Showcase 1 (Rollups & Displays)',
    category: 'banners',
    url: 'https://cdn.hstockplus.org/uploads/public/img-1789638023483-0654f1a516c4673a.webp'
  },
  {
    label: 'Inkshine Showcase 2 (Stationery & Print)',
    category: 'branding',
    url: 'https://cdn.hstockplus.org/uploads/public/img-1789638121027-6ecd906745a42aaa.webp'
  },
  {
    label: 'Inkshine Showcase 3 (Custom Corporate Gifts)',
    category: 'stationery',
    url: 'https://cdn.hstockplus.org/uploads/public/img-1789638161792-fdf550c93a995761.webp'
  },
  {
    label: 'Inkshine Showcase 4 (Executive Awards & Plaques)',
    category: 'awards',
    url: 'https://cdn.hstockplus.org/uploads/public/img-1789638184148-5858e68459451c46.webp'
  },
  {
    label: 'Inkshine Showcase 5 (Packaging & Boxes)',
    category: 'packaging',
    url: 'https://cdn.hstockplus.org/uploads/public/img-1789638210286-d54286b63f154e3c.webp'
  },
  {
    label: 'Inkshine Showcase 6 (Signages & Large Formats)',
    category: 'displays',
    url: 'https://cdn.hstockplus.org/uploads/public/img-1789638255572-4a3ec89bf3a4c4fa.webp'
  },
  {
    label: 'Inkshine Showcase 7 (Events & Souvenirs)',
    category: 'gifts',
    url: 'https://cdn.hstockplus.org/uploads/public/img-1789638283912-8e755036c7f5a300.webp'
  },

  // Banners & Displays
  {
    label: 'Luxury Teardrop Rollup Stand',
    category: 'banners',
    url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=80'
  },
  {
    label: 'Standard Rollup Banner Silver Base',
    category: 'banners',
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80'
  },
  {
    label: 'Outdoor Teardrop Flying Flag',
    category: 'banners',
    url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1000&q=80'
  },
  {
    label: 'Backdrop Exhibition Pop-up Wall',
    category: 'banners',
    url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80'
  },

  // Awards & Plaques
  {
    label: 'Executive Crystal Glass Award',
    category: 'awards',
    url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80'
  },
  {
    label: 'Hand-Carved Wooden & Gold Plaque',
    category: 'awards',
    url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80'
  },
  {
    label: 'Beveled Acrylic Achievement Trophy',
    category: 'awards',
    url: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=1000&q=80'
  },

  // Packaging & Boxes
  {
    label: 'Custom Rigid Gift Box with Foil',
    category: 'packaging',
    url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1000&q=80'
  },
  {
    label: 'Kraft Paper Shopping Bag with Rope Handles',
    category: 'packaging',
    url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80'
  },
  {
    label: 'Die-Cut Folding Product Carton',
    category: 'packaging',
    url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=1000&q=80'
  },
  {
    label: 'Matte Vinyl Roll Labels & Stickers',
    category: 'packaging',
    url: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=1000&q=80'
  },

  // Corporate Stationery & Books
  {
    label: 'Corporate Annual Report Booklets',
    category: 'stationery',
    url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80'
  },
  {
    label: 'Luxury Business Cards with Gold Edge Foil',
    category: 'stationery',
    url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80'
  },
  {
    label: 'Custom Presentation Folders & Document Wallets',
    category: 'stationery',
    url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1000&q=80'
  },

  // Branded Gifts & Apparels
  {
    label: 'Laser-Engraved Stainless Steel Flasks',
    category: 'gifts',
    url: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=80'
  },
  {
    label: 'Executive Leather Notebook & Pen Set',
    category: 'gifts',
    url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80'
  },
  {
    label: 'High-Density Embroidered Polo Shirts',
    category: 'gifts',
    url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80'
  },

  // Signage & Outdoor
  {
    label: '3D Brushed Gold Metal Signage Lettering',
    category: 'signage',
    url: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1000&q=80'
  },
  {
    label: 'Illuminated Acrylic LED Storefront Lightbox',
    category: 'signage',
    url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1000&q=80'
  }
];

export interface ImageManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentImageUrl: string;
  title: string;
  subtitle?: string;
  currentTitle?: string;
  currentDescription?: string;
  allowDetailsEdit?: boolean;
  onSave: (data: { imageUrl: string; title?: string; description?: string }) => void;
}

export const ImageManagerModal: React.FC<ImageManagerModalProps> = ({
  isOpen,
  onClose,
  currentImageUrl,
  title,
  subtitle = 'Replace existing image or select from high-resolution print presets.',
  currentTitle = '',
  currentDescription = '',
  allowDetailsEdit = false,
  onSave,
}) => {
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>(currentImageUrl);
  const [editedTitle, setEditedTitle] = useState<string>(currentTitle);
  const [editedDescription, setEditedDescription] = useState<string>(currentDescription);
  const [customUrlInput, setCustomUrlInput] = useState<string>('');
  const [activePresetCategory, setActivePresetCategory] = useState<string>('all');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isCloudSaving, setIsCloudSaving] = useState<boolean>(false);
  const [cloudImages, setCloudImages] = useState<CloudUploadedImage[]>([]);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Subscribe to real-time cloud uploaded images across all devices
  useEffect(() => {
    if (!isOpen) return;
    const unsubscribe = subscribeUploadedImages(
      (imgs) => setCloudImages(imgs),
      (err) => console.warn('Could not load cloud images:', err)
    );
    return () => unsubscribe();
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle local image file upload, optimize/compress, and save to Cloud DB
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorNotice('Please choose a valid image file (JPG, PNG, WebP, SVG).');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setErrorNotice('Image file size must be less than 20MB.');
      return;
    }

    setIsUploading(true);
    setErrorNotice(null);
    setSuccessNotice(null);

    try {
      // 1. High quality multi-step compression optimized for Firestore document size
      const optimizedUrl = await compressImageFile(file, 1200, 0.76);
      setSelectedImageUrl(optimizedUrl);

      // 2. Immediately persist to Firestore `uploaded_images` collection so all devices can access it
      const imageId = `img-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      await saveUploadedImageToCloud({
        id: imageId,
        name: file.name,
        dataUrl: optimizedUrl,
        uploadedAt: new Date().toISOString()
      });

      setSuccessNotice('Image compressed & uploaded to Cloud Database! Available across all devices.');
      setIsUploading(false);
    } catch (err) {
      console.error('Image processing error:', err);
      setErrorNotice('Failed to process image. Please try another image.');
      setIsUploading(false);
    }
  };

  const handleApplyCustomUrl = () => {
    if (!customUrlInput.trim()) return;
    try {
      new URL(customUrlInput);
      setSelectedImageUrl(customUrlInput.trim());
      setCustomUrlInput('');
      setErrorNotice(null);
      setSuccessNotice('Web image applied to preview.');
    } catch {
      setErrorNotice('Please enter a valid web URL starting with https://');
    }
  };

  const handleSave = async () => {
    if (!selectedImageUrl) {
      setErrorNotice('Please select or upload an image.');
      return;
    }

    setIsCloudSaving(true);
    try {
      await onSave({
        imageUrl: selectedImageUrl,
        ...(allowDetailsEdit ? { title: editedTitle.trim(), description: editedDescription.trim() } : {})
      });
      onClose();
    } catch (err) {
      console.error('Error saving image:', err);
      setErrorNotice('Could not save image. Please check your connection.');
      setIsCloudSaving(false);
    }
  };

  const filteredPresets = activePresetCategory === 'all'
    ? PRINT_IMAGE_PRESETS
    : PRINT_IMAGE_PRESETS.filter((p) => p.category === activePresetCategory);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-stone-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base sm:text-lg flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#f5be38]" />
                <span>{title}</span>
              </h3>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                <Database className="w-2.5 h-2.5" />
                <span>Cloud Synced</span>
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">{subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-stone-900">
          {errorNotice && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorNotice}</span>
            </div>
          )}

          {successNotice && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successNotice}</span>
            </div>
          )}

          {/* Top: Current / Selected Image Preview */}
          <div className="flex flex-col sm:flex-row gap-5 items-center p-4 bg-stone-50 rounded-2xl border border-stone-200">
            <div className="w-36 h-36 rounded-xl overflow-hidden bg-white border border-stone-300 shadow-sm shrink-0 flex items-center justify-center relative group">
              <img
                src={selectedImageUrl}
                alt="Preview"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[11px] font-bold">
                Active Preview
              </div>
            </div>

            <div className="flex-1 space-y-3 w-full">
              <div className="flex items-center gap-2 text-xs font-bold text-stone-700 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#b8860b]" />
                <span>Upload Custom Image or Enter Link</span>
              </div>

              {/* Upload Local File Button */}
              <div className="flex flex-wrap gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/png,image/jpeg,image/webp,image/svg+xml"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="px-4 py-2 bg-[#00473e] hover:bg-[#03554a] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>{isUploading ? 'Reading file...' : 'Upload From Computer'}</span>
                </button>

                {selectedImageUrl !== currentImageUrl && (
                  <button
                    type="button"
                    onClick={() => setSelectedImageUrl(currentImageUrl)}
                    className="px-3 py-2 bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Revert to Original</span>
                  </button>
                )}
              </div>

              {/* Enter Web URL */}
              <div className="flex gap-2 pt-1">
                <div className="relative flex-1">
                  <LinkIcon className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    placeholder="https://example.com/banner-photo.jpg"
                    value={customUrlInput}
                    onChange={(e) => setCustomUrlInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleApplyCustomUrl();
                      }
                    }}
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#b8860b]"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleApplyCustomUrl}
                  className="px-3 py-1.5 bg-stone-800 hover:bg-stone-900 text-white rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* Details Editing (Rename and Change Description) */}
          {allowDetailsEdit && (
            <div className="space-y-3 p-4 bg-amber-50/50 rounded-2xl border border-amber-200/60">
              <div className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <span>Rename &amp; Update Description</span>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-600 mb-1">
                  Item Title / Name
                </label>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  placeholder="e.g. Luxury Teardrop Rollup Stand"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 focus:ring-2 focus:ring-[#b8860b]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-600 mb-1">
                  Description / Caption
                </label>
                <textarea
                  rows={2}
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  placeholder="Brief description that appears on the website..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-900 focus:ring-2 focus:ring-[#b8860b] resize-none"
                />
              </div>
            </div>
          )}

          {/* Cloud Uploads Gallery (Synced across all devices) */}
          {cloudImages.length > 0 && (
            <div className="space-y-2 p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200/70">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-950 uppercase tracking-wider">
                  <Cloud className="w-4 h-4 text-emerald-600" />
                  <span>Cloud Uploads from All Devices ({cloudImages.length})</span>
                </div>
                <span className="text-[11px] text-emerald-700 font-medium">Click to select</span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-36 overflow-y-auto p-1">
                {cloudImages.map((img) => {
                  const isSelected = selectedImageUrl === img.dataUrl;
                  return (
                    <div
                      key={img.id}
                      onClick={() => {
                        setSelectedImageUrl(img.dataUrl);
                        setSuccessNotice(`Selected cloud image: ${img.name || 'Device photo'}`);
                      }}
                      className={`group relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all aspect-square ${
                        isSelected
                          ? 'border-emerald-600 ring-2 ring-emerald-500/50 shadow-md scale-95'
                          : 'border-emerald-200 hover:border-emerald-400 bg-white'
                      }`}
                      title={img.name || 'Cloud upload'}
                    >
                      <img
                        src={img.dataUrl}
                        alt={img.name || 'Cloud upload'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-emerald-600/60 flex items-center justify-center text-white">
                          <Check className="w-5 h-5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Preset Stock Photography Gallery */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Or Select from Print Image Presets
              </span>

              {/* Category Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {['all', 'banners', 'awards', 'packaging', 'stationery', 'gifts', 'signage'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActivePresetCategory(cat)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold capitalize transition-colors cursor-pointer ${
                      activePresetCategory === cat
                        ? 'bg-[#b8860b] text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5 max-h-56 overflow-y-auto p-1">
              {filteredPresets.map((preset, index) => {
                const isSelected = selectedImageUrl === preset.url;
                return (
                  <div
                    key={index}
                    onClick={() => setSelectedImageUrl(preset.url)}
                    className={`group relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all aspect-square ${
                      isSelected
                        ? 'border-[#00473e] ring-2 ring-[#00473e]/40 shadow-md scale-95'
                        : 'border-stone-200 hover:border-stone-400 hover:shadow-xs'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-[#00473e]/50 flex items-center justify-center text-white">
                        <Check className="w-6 h-6 stroke-[3]" />
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-1.5 text-center">
                      <span className="text-[10px] text-white font-medium line-clamp-1">
                        {preset.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 font-bold text-xs cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isCloudSaving}
            className="px-6 py-2 rounded-xl bg-[#00473e] hover:bg-[#03554a] active:scale-98 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {isCloudSaving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Saving to Cloud Database...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>Save &amp; Update Image Across All Devices</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
