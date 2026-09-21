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
  CheckCircle2,
  Search,
  Globe,
  Download
} from 'lucide-react';
import { 
  compressImageFile, 
  saveUploadedImageToCloud, 
  subscribeUploadedImages, 
  CloudUploadedImage 
} from '../../lib/firebase';
import { 
  searchOnlineProductImages, 
  SearchResultImage, 
  processExternalImageUrl,
  getGoogleImagesSearchUrl,
  getPinterestSearchUrl
} from '../../services/imageSearchService';
import { ImageUrlInputWithPreview } from '../common/ImageUrlInputWithPreview';

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
  categoryKey?: string;
  allowDetailsEdit?: boolean;
  autoFetchOnOpen?: boolean;
  onSave: (data: { imageUrl: string; title?: string; description?: string }) => void;
}

export const ImageManagerModal: React.FC<ImageManagerModalProps> = ({
  isOpen,
  onClose,
  currentImageUrl,
  title,
  subtitle = 'Provide an image link, auto-fetch online photos, or upload from your device.',
  currentTitle = '',
  currentDescription = '',
  categoryKey,
  allowDetailsEdit = false,
  autoFetchOnOpen = false,
  onSave,
}) => {
  const [activeTab, setActiveTab] = useState<'url_link' | 'auto_fetch' | 'upload' | 'cloud' | 'presets'>(
    autoFetchOnOpen ? 'auto_fetch' : 'url_link'
  );
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>(currentImageUrl);
  const [editedTitle, setEditedTitle] = useState<string>(currentTitle);
  const [editedDescription, setEditedDescription] = useState<string>(currentDescription);
  
  // Custom URL / Direct Link Input
  const [customUrlInput, setCustomUrlInput] = useState<string>(currentImageUrl || '');

  // Online Image Auto-Fetch State (Option 2)
  const [searchQuery, setSearchQuery] = useState<string>(currentTitle || title);
  const [isSearchingOnline, setIsSearchingOnline] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<SearchResultImage[]>([]);
  const [selectedSourceFilter, setSelectedSourceFilter] = useState<string>('all');

  // Presets & Local Uploads State
  const [activePresetCategory, setActivePresetCategory] = useState<string>('all');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isCloudSaving, setIsCloudSaving] = useState<boolean>(false);
  const [cloudImages, setCloudImages] = useState<CloudUploadedImage[]>([]);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedImageUrl(currentImageUrl);
      setEditedTitle(currentTitle);
      setEditedDescription(currentDescription);
      const initialQuery = currentTitle || title;
      setSearchQuery(initialQuery);
      setErrorNotice(null);
      setSuccessNotice(null);

      // Trigger automated image search based on product title and category
      handleTriggerOnlineSearch(initialQuery, categoryKey);
    }
  }, [isOpen, currentImageUrl, currentTitle, title, categoryKey]);

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

  // Automated search function
  const handleTriggerOnlineSearch = async (queryText?: string, catKey?: string) => {
    const q = queryText !== undefined ? queryText : searchQuery;
    setIsSearchingOnline(true);
    setErrorNotice(null);
    try {
      const results = await searchOnlineProductImages(q, catKey || categoryKey);
      setSearchResults(results);
      if (results.length === 0) {
        setErrorNotice('No matching images found for this query. Try different keywords.');
      }
    } catch (err) {
      console.warn('Error fetching online images:', err);
      setErrorNotice('Could not connect to image service. You can use preset photos or upload directly.');
    } finally {
      setIsSearchingOnline(false);
    }
  };

  // Handle local image file upload, optimize/compress, and save to Cloud DB
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Mobile photo validation (handles iPhone HEIC and missing MIME types)
    const isValidImage = (file.type && file.type.startsWith('image/')) || /\.(jpe?g|png|webp|heic|heif|gif|svg|tiff?)$/i.test(file.name || '');
    if (!isValidImage) {
      setErrorNotice('Please choose a valid image file (JPG, PNG, WebP, HEIC, SVG).');
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setErrorNotice('Image file size must be less than 50MB.');
      return;
    }

    setIsUploading(true);
    setErrorNotice(null);
    setSuccessNotice(null);

    try {
      const optimizedUrl = await compressImageFile(file, 1080, 0.78);
      setSelectedImageUrl(optimizedUrl);

      const imageId = `img-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      await saveUploadedImageToCloud({
        id: imageId,
        name: file.name,
        dataUrl: optimizedUrl,
        uploadedAt: new Date().toISOString()
      });

      setSuccessNotice('Photo optimized & securely saved to Cloud Database! Available across all devices.');
      setIsUploading(false);
    } catch (err) {
      console.error('Image processing error:', err);
      setErrorNotice('Failed to process image. Please try another image.');
      setIsUploading(false);
    }
  };

  // Apply custom web or Pinterest URL
  const handleApplyCustomUrl = () => {
    if (!customUrlInput.trim()) return;
    const processed = processExternalImageUrl(customUrlInput);
    if (!processed.valid) {
      setErrorNotice(processed.error || 'Please enter a valid URL starting with https://');
      return;
    }

    setSelectedImageUrl(processed.cleanUrl);
    setCustomUrlInput('');
    setErrorNotice(null);
    setSuccessNotice(`${processed.source} image successfully applied to preview!`);
  };

  const handleSave = async () => {
    if (!selectedImageUrl) {
      setErrorNotice('Please select or upload an image.');
      return;
    }

    setIsCloudSaving(true);
    try {
      // 1. Permanently track and store replaced/selected photo in IndexedDB & Cloud repository
      const imageId = `img-saved-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      await saveUploadedImageToCloud({
        id: imageId,
        name: editedTitle.trim() || currentTitle || title || 'Saved Job Photo',
        dataUrl: selectedImageUrl,
        uploadedAt: new Date().toISOString(),
        category: categoryKey
      }).catch(console.warn);

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

  const filteredSearchResults = selectedSourceFilter === 'all'
    ? searchResults
    : selectedSourceFilter === 'web'
    ? searchResults.filter(r => r.source.toLowerCase().includes('web') || r.source.toLowerCase().includes('google'))
    : searchResults.filter(r => r.source.toLowerCase().includes(selectedSourceFilter.toLowerCase()));

  const filteredPresets = activePresetCategory === 'all'
    ? PRINT_IMAGE_PRESETS
    : PRINT_IMAGE_PRESETS.filter((p) => p.category === activePresetCategory);

  const googleImagesUrl = getGoogleImagesSearchUrl(searchQuery || currentTitle || title);
  const pinterestUrl = getPinterestSearchUrl(searchQuery || currentTitle || title);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[94vh] overflow-hidden shadow-2xl border border-stone-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base sm:text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#f5be38]" />
                <span>{title}</span>
              </h3>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-[#f5be38] border border-amber-500/30 text-[10px] font-bold">
                <Globe className="w-2.5 h-2.5" />
                <span>Auto-Fetch &amp; Upload</span>
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

        {/* Tab Navigation */}
        <div className="px-6 pt-3 border-b border-stone-200 bg-stone-50 flex items-center gap-2 overflow-x-auto shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('url_link')}
            className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer shrink-0 ${
              activeTab === 'url_link'
                ? 'border-[#00473e] text-[#00473e]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Image Link / URL</span>
            <span className="px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-extrabold">RECOMMENDED</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('auto_fetch')}
            className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer shrink-0 ${
              activeTab === 'auto_fetch'
                ? 'border-[#b8860b] text-[#b8860b]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Auto-Fetch Online</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('presets')}
            className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer shrink-0 ${
              activeTab === 'presets'
                ? 'border-stone-800 text-stone-800'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Curated Presets</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer shrink-0 ${
              activeTab === 'upload'
                ? 'border-stone-700 text-stone-700'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload From Computer</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('cloud')}
            className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer shrink-0 ${
              activeTab === 'cloud'
                ? 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Cloud className="w-3.5 h-3.5" />
            <span>Cloud Library ({cloudImages.length})</span>
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
            <div className="w-32 h-32 rounded-xl overflow-hidden bg-white border border-stone-300 shadow-sm shrink-0 flex items-center justify-center relative group">
              <img
                src={selectedImageUrl}
                alt="Preview"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold">
                Active Selection
              </div>
            </div>

            <div className="flex-1 space-y-2 w-full">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Active Selected Photo
                </span>
                {selectedImageUrl !== currentImageUrl && (
                  <button
                    type="button"
                    onClick={() => setSelectedImageUrl(currentImageUrl)}
                    className="px-2.5 py-1 bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-lg text-[11px] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Revert</span>
                  </button>
                )}
              </div>
              <p className="text-xs text-stone-500 line-clamp-1 break-all">
                {selectedImageUrl}
              </p>
              <div className="pt-1 flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-semibold">
                  <Check className="w-3.5 h-3.5" />
                  <span>Ready to Save to Storefront &amp; Catalog</span>
                </span>
              </div>
            </div>
          </div>

          {/* TAB 1: DIRECT IMAGE URL / LINK (ZERO STORAGE) */}
          {activeTab === 'url_link' && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <LinkIcon className="w-4 h-4 text-emerald-700" />
                    <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                      Direct Image Link (Zero Storage Quota Required)
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-100/90 px-2 py-0.5 rounded-full">
                    No uploads • No quota limits
                  </span>
                </div>
                <p className="text-xs text-emerald-900/80">
                  Provide any public web image URL (Google Images, Pinterest, Imgur, Dropbox, Google Drive, or any website). 
                  The site loads and displays the photo directly from the link with instant live preview.
                </p>
              </div>

              <ImageUrlInputWithPreview
                initialUrl={selectedImageUrl.startsWith('http') ? selectedImageUrl : ''}
                onSelectUrl={(url) => {
                  setSelectedImageUrl(url);
                  setErrorNotice(null);
                  setSuccessNotice('Image link validated and ready to save!');
                }}
                searchKeywords={title || currentTitle}
              />
            </div>
          )}

          {/* TAB 2: AUTO-FETCH ONLINE IMAGES (Option 2) */}
          {activeTab === 'auto_fetch' && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#b8860b]" />
                    <span className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                      Auto-Fetch Matching Images by Title &amp; Category
                    </span>
                  </div>
                  <span className="text-[11px] text-amber-800 font-medium">
                    Option 2 Enabled
                  </span>
                </div>

                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleTriggerOnlineSearch();
                        }
                      }}
                      placeholder="e.g. Rollup Banner Stand, Luxury Business Card, Acrylic Award"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-amber-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#b8860b]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleTriggerOnlineSearch()}
                    disabled={isSearchingOnline}
                    className="px-4 py-2 bg-[#b8860b] hover:bg-[#996515] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer shrink-0"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>{isSearchingOnline ? 'Searching...' : 'Search Online'}</span>
                  </button>
                </div>

                {/* Quick Google & Pinterest Search Actions + Source Filter Chips */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="flex items-center gap-1.5 overflow-x-auto">
                    <span className="text-[11px] font-bold text-amber-900 mr-1">Source:</span>
                    {[
                      { id: 'all', label: 'All Online' },
                      { id: 'web', label: 'Google & Live Web' },
                      { id: 'curated', label: 'Curated Studio' },
                      { id: 'openverse', label: 'Openverse' },
                      { id: 'wiki', label: 'Wikimedia' }
                    ].map((filter) => (
                      <button
                        key={filter.id}
                        type="button"
                        onClick={() => setSelectedSourceFilter(filter.id)}
                        className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold transition-colors cursor-pointer ${
                          selectedSourceFilter === filter.id
                            ? 'bg-[#00473e] text-white'
                            : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                        }`}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>

                  {/* Direct Google & Pinterest External Links */}
                  <div className="flex items-center gap-1.5">
                    <a
                      href={googleImagesUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-[10px] font-bold flex items-center gap-1 shadow-2xs transition-colors"
                      title="Open Google Images in new tab for this item, right click to copy image address"
                    >
                      <Globe className="w-3 h-3 text-blue-600" />
                      <span>Google Images ↗</span>
                    </a>
                    <a
                      href={pinterestUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 rounded-lg text-[10px] font-bold flex items-center gap-1 shadow-2xs transition-colors"
                      title="Open Pinterest in new tab for design ideas & mockups"
                    >
                      <LinkIcon className="w-3 h-3 text-rose-600" />
                      <span>Pinterest ↗</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Grid of Results */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-stone-700">
                    Found {filteredSearchResults.length} Live Online Photography Results:
                  </span>
                  {filteredSearchResults.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        if (filteredSearchResults[0]) {
                          setSelectedImageUrl(filteredSearchResults[0].url);
                          setSuccessNotice(`Auto-selected top match: "${filteredSearchResults[0].title}"`);
                        }
                      }}
                      className="text-[11px] font-bold text-[#b8860b] hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Select Best Match</span>
                    </button>
                  )}
                </div>

                {isSearchingOnline ? (
                  <div className="py-12 flex flex-col items-center justify-center text-stone-500 space-y-2">
                    <RefreshCw className="w-6 h-6 animate-spin text-[#b8860b]" />
                    <p className="text-xs font-medium">Scanning live web &amp; Google commercial index for "{searchQuery}"...</p>
                  </div>
                ) : filteredSearchResults.length === 0 ? (
                  <div className="py-8 text-center text-stone-500 text-xs bg-stone-50 rounded-xl border border-stone-200">
                    No images found for "{searchQuery}". Try modifying the keywords above or use "Google Images ↗" to find and copy any link.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-72 overflow-y-auto p-1">
                    {filteredSearchResults.map((img) => {
                      const isSelected = selectedImageUrl === img.url;
                      return (
                        <div
                          key={img.id}
                          onClick={() => {
                            setSelectedImageUrl(img.url);
                            setSuccessNotice(`Selected: ${img.title}`);
                          }}
                          className={`group relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all flex flex-col bg-white shadow-xs ${
                            isSelected
                              ? 'border-[#b8860b] ring-2 ring-[#b8860b]/40 shadow-md scale-98'
                              : 'border-stone-200 hover:border-stone-400 hover:shadow-md'
                          }`}
                        >
                          <div className="aspect-4/3 w-full bg-stone-100 overflow-hidden relative">
                            <img
                              src={img.thumbnail || img.url}
                              alt={img.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              referrerPolicy="no-referrer"
                              loading="lazy"
                            />
                            <div className="absolute top-1 left-1 z-10 px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-stone-900/80 backdrop-blur-xs text-[#dfbc5e]">
                              {img.source}
                            </div>
                            {isSelected && (
                              <div className="absolute inset-0 bg-[#b8860b]/50 flex items-center justify-center text-white z-20">
                                <Check className="w-6 h-6 stroke-[3]" />
                              </div>
                            )}
                          </div>
                          <div className="p-2">
                            <div className="text-[11px] font-bold text-stone-900 line-clamp-1" title={img.title}>
                              {img.title}
                            </div>
                            <div className="text-[10px] text-stone-400 mt-0.5 flex items-center justify-between">
                              <span className="truncate">{img.domain || img.source}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: UPLOAD FROM DEVICE */}
          {activeTab === 'upload' && (
            <div className="space-y-4 p-5 bg-stone-50 rounded-2xl border border-stone-200 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-stone-900">Upload Image File from Your Device</h4>
                <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto">
                  Select any high-resolution photo (JPG, PNG, WebP) from your phone or computer. It will automatically compress and sync to your Cloud Database.
                </p>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="px-6 py-2.5 bg-[#00473e] hover:bg-[#03554a] text-white rounded-xl text-xs font-bold transition-all shadow-sm inline-flex items-center gap-2 cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>{isUploading ? 'Compressing & Syncing...' : 'Browse Device Files'}</span>
              </button>
            </div>
          )}

          {/* TAB 4: CLOUD LIBRARY */}
          {activeTab === 'cloud' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Cloud Uploads from All Devices ({cloudImages.length})
                </span>
                <span className="text-[11px] text-emerald-700 font-medium">Click to select</span>
              </div>

              {cloudImages.length === 0 ? (
                <div className="py-8 text-center text-stone-500 text-xs bg-stone-50 rounded-xl border border-stone-200">
                  No cloud photos uploaded yet. Use the "Upload From Computer" tab to upload your first photo.
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5 max-h-60 overflow-y-auto p-1">
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
                            : 'border-stone-200 hover:border-emerald-400 bg-white'
                        }`}
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
              )}
            </div>
          )}

          {/* TAB 5: PRESETS */}
          {activeTab === 'presets' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Curated Commercial Presets
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

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5 max-h-60 overflow-y-auto p-1">
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
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-[#00473e]/60 flex items-center justify-center text-white">
                          <Check className="w-5 h-5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

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
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={isCloudSaving || !selectedImageUrl}
            className="px-6 py-2.5 rounded-xl bg-[#b8860b] hover:bg-[#996515] active:scale-98 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isCloudSaving ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Saving to Cloud...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>Save Selected Photo</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
