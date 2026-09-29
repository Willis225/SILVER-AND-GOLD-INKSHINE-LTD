import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Plus, 
  Upload, 
  Video, 
  Image as ImageIcon, 
  Trash2, 
  ExternalLink, 
  Check, 
  X, 
  Sparkles,
  Film
} from 'lucide-react';
import { openDB } from 'idb';

export interface RecentJobMediaItem {
  id: string;
  type: 'video' | 'image';
  title: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  badge?: string;
  isCustom?: boolean;
}

const STORAGE_KEY = 'inkshine_recent_jobs_media_v2';
const DB_NAME = 'inkshine_recent_jobs_db';
const DB_STORE = 'videos_and_images';

// Initial preloaded recent jobs with video & photos
const DEFAULT_MEDIA_ITEMS: RecentJobMediaItem[] = [
  {
    id: 'job-v1',
    type: 'video',
    title: 'Commercial Printing & Workshop Reel',
    mediaUrl: 'https://www.kapwing.com/w/JxRjisdMGT',
    thumbnailUrl: 'https://cdn.hstockplus.org/uploads/public/img-1790091847996-3aa2bb1c6a4e12cd.webp',
    badge: 'Video Tour',
  },
  {
    id: 'job-v2',
    type: 'video',
    title: 'Large Format Banner Production',
    mediaUrl: 'https://plain-weur-prod-public.komododecks.com/202609/27/TEkrPEfKgNUoailKXbQ9/image.jpg',
    thumbnailUrl: '/magnetic-curved-popup-backdrop.jpg',
    badge: 'Exhibition',
  },
  {
    id: 'job-v3',
    type: 'image',
    title: '3D Illuminated Channel Letters',
    mediaUrl: '/3d-illuminated-led-channel-letters.jpg',
    thumbnailUrl: '/3d-illuminated-led-channel-letters.jpg',
    badge: '3D Signage',
  },
  {
    id: 'job-v4',
    type: 'image',
    title: 'Fleet Vehicle Branding',
    mediaUrl: '/commercial-fleet-vehicle-branding.jpg',
    thumbnailUrl: '/commercial-fleet-vehicle-branding.jpg',
    badge: 'Vehicle Wrap',
  }
];

async function getIndexedDb() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(DB_STORE)) {
        db.createObjectStore(DB_STORE);
      }
    }
  });
}

export const RecentJobsMediaBox: React.FC = () => {
  const [items, setItems] = useState<RecentJobMediaItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {
        console.warn('Could not parse recent jobs from localStorage', e);
      }
    }
    return DEFAULT_MEDIA_ITEMS;
  });

  const [activeItemId, setActiveItemId] = useState<string>(() => items[0]?.id || 'job-v1');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadType, setUploadType] = useState<'video' | 'image'>('video');
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadBadge, setUploadBadge] = useState('');
  const [uploadUrl, setUploadUrl] = useState('');
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessingUpload, setIsProcessingUpload] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Hydrate blobs from IndexedDB
  useEffect(() => {
    async function loadBlobs() {
      try {
        const db = await getIndexedDb();
        const allKeys = await db.getAllKeys(DB_STORE);
        if (allKeys.length > 0) {
          setItems(prevItems => {
            return prevItems.map(item => {
              if (item.mediaUrl.startsWith('idb://')) {
                const key = item.mediaUrl.replace('idb://', '');
                // Will be resolved on request or stored as base64 / blob URL
                return item;
              }
              return item;
            });
          });
        }
      } catch (err) {
        console.warn('Could not load from IndexedDB', err);
      }
    }
    loadBlobs();
  }, []);

  // Save items state to localStorage
  const saveItems = (newItems: RecentJobMediaItem[]) => {
    setItems(newItems);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
    } catch (e) {
      console.warn('Could not save recent jobs to localStorage', e);
    }
  };

  const activeItem = useMemo(() => {
    return items.find(it => it.id === activeItemId) || items[0];
  }, [items, activeItemId]);

  // Source info resolution
  const mediaSourceInfo = useMemo(() => {
    if (!activeItem) return null;
    const url = (activeItem.mediaUrl || '').trim();

    if (url.includes('kapwing.com')) {
      const match = url.match(/kapwing\.com\/(?:w|e|videos)\/([a-zA-Z0-9_-]+)/);
      const id = match ? match[1] : 'JxRjisdMGT';
      return {
        type: 'kapwing' as const,
        embedUrl: `https://www.kapwing.com/e/${id}?autoplay=true`,
        shareUrl: `https://www.kapwing.com/w/${id}`
      };
    }

    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      let ytId = '';
      if (url.includes('youtu.be/')) {
        ytId = url.split('youtu.be/')[1]?.split('?')[0] || '';
      } else if (url.includes('v=')) {
        ytId = url.split('v=')[1]?.split('&')[0] || '';
      }
      return {
        type: 'youtube' as const,
        embedUrl: `https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=1`
      };
    }

    if (url.includes('vimeo.com')) {
      const match = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
      const id = match ? match[1] : '';
      return {
        type: 'vimeo' as const,
        embedUrl: `https://player.vimeo.com/video/${id}?autoplay=1&muted=1&loop=1`
      };
    }

    if (activeItem.type === 'video' || url.match(/\.(mp4|webm|mov|ogg|m4v)($|\?)/i) || url.startsWith('blob:') || url.startsWith('data:video')) {
      return {
        type: 'direct_video' as const,
        src: url
      };
    }

    return {
      type: 'image' as const,
      src: url
    };
  }, [activeItem]);

  const handleTogglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  const handleToggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const isVid = file.type.startsWith('video/') || file.name.match(/\.(mp4|webm|mov|ogg|m4v)$/i);
      setUploadType(isVid ? 'video' : 'image');
      const objUrl = URL.createObjectURL(file);
      setFilePreview(objUrl);
    }
  };

  const handleAddMedia = async () => {
    if (!selectedFile && !uploadUrl.trim()) return;

    setIsProcessingUpload(true);
    let finalUrl = uploadUrl.trim();

    try {
      if (selectedFile) {
        // Read file as Data URL or save in IndexedDB
        if (selectedFile.size < 8 * 1024 * 1024) {
          // Under 8MB: Convert to Data URL for instant fast playback & permanence
          const reader = new FileReader();
          finalUrl = await new Promise((resolve, reject) => {
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(selectedFile);
          });
        } else {
          // Store larger files as Blobs in IndexedDB
          const db = await getIndexedDb();
          const fileId = `job-media-${Date.now()}`;
          await db.put(DB_STORE, selectedFile, fileId);
          finalUrl = URL.createObjectURL(selectedFile);
        }
      }

      const newItem: RecentJobMediaItem = {
        id: `job-${Date.now()}`,
        type: uploadType,
        title: uploadTitle.trim() || (uploadType === 'video' ? 'Recent Job Video' : 'Recent Job Photo'),
        badge: uploadBadge.trim() || (uploadType === 'video' ? 'Recent Job' : 'Completed'),
        mediaUrl: finalUrl,
        thumbnailUrl: uploadType === 'image' ? finalUrl : undefined,
        isCustom: true
      };

      const newItems = [newItem, ...items];
      saveItems(newItems);
      setActiveItemId(newItem.id);
      setIsUploadModalOpen(false);

      // Reset fields
      setUploadTitle('');
      setUploadBadge('');
      setUploadUrl('');
      setSelectedFile(null);
      setFilePreview(null);
    } catch (err) {
      console.error('Failed to process upload', err);
    } finally {
      setIsProcessingUpload(false);
    }
  };

  const handleDeleteItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const remaining = items.filter(it => it.id !== id);
    if (remaining.length === 0) {
      saveItems(DEFAULT_MEDIA_ITEMS);
      setActiveItemId(DEFAULT_MEDIA_ITEMS[0].id);
    } else {
      saveItems(remaining);
      if (activeItemId === id) {
        setActiveItemId(remaining[0].id);
      }
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Header Bar: Clean & Minimal - NO address & NO clutter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-6 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-md">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5be38]/10 border border-[#f5be38]/30 text-[#f5be38] text-[11px] font-black uppercase tracking-wider">
            <Film className="w-3 h-3 text-[#f5be38]" />
            <span>RECENT JOBS</span>
          </div>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
            Recent Jobs &amp; Production Videos
          </h3>
        </div>

        {/* Upload Button right on the box */}
        <button
          type="button"
          onClick={() => setIsUploadModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-[#f5be38] hover:bg-[#ffd15c] text-black font-extrabold text-xs sm:text-sm shadow-[0_0_20px_rgba(245,190,56,0.35)] transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
        >
          <Upload className="w-4 h-4 stroke-[2.5]" />
          <span>Upload Video / Photo</span>
        </button>
      </div>

      {/* Main Video & Media Stage Box */}
      <div className="relative w-full rounded-3xl overflow-hidden bg-[#0a0a0f] border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.9)] group">
        
        {/* Aspect Ratio Box */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] lg:aspect-[24/10] w-full overflow-hidden flex items-center justify-center bg-black">
          
          {mediaSourceInfo?.type === 'kapwing' ? (
            <iframe
              src={mediaSourceInfo.embedUrl}
              title={activeItem?.title || "Recent Job Video"}
              className="w-full h-full border-0"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          ) : mediaSourceInfo?.type === 'youtube' || mediaSourceInfo?.type === 'vimeo' ? (
            <iframe
              src={mediaSourceInfo.embedUrl}
              title={activeItem?.title || "Recent Job Video"}
              className="w-full h-full border-0"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          ) : mediaSourceInfo?.type === 'direct_video' ? (
            <div className="relative w-full h-full flex items-center justify-center bg-black">
              <video
                ref={videoRef}
                src={mediaSourceInfo.src}
                className="w-full h-full object-contain"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {/* Video Play/Pause & Mute Overlay Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10 z-20">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleTogglePlay}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>
                  <button
                    type="button"
                    onClick={handleToggleMute}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>

                <div className="text-xs font-bold text-white px-3 py-1 rounded-lg bg-white/10">
                  {activeItem?.title}
                </div>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center bg-black">
              <img
                src={mediaSourceInfo?.src || activeItem?.mediaUrl}
                alt={activeItem?.title}
                className="w-full h-full object-contain"
              />
            </div>
          )}

          {/* Active Item Pill Tag */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black bg-black/80 text-[#f5be38] border border-[#f5be38]/40 backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {activeItem?.badge || 'Recent Job'}
            </span>
          </div>

        </div>

      </div>

      {/* Thumbnails Row: Instant Switcher */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-1">
        {items.map(item => {
          const isActive = item.id === activeItemId;
          const isItemVideo = item.type === 'video' || item.mediaUrl.includes('kapwing') || item.mediaUrl.includes('youtube') || item.mediaUrl.match(/\.(mp4|webm|mov)$/i);

          return (
            <div
              key={item.id}
              onClick={() => setActiveItemId(item.id)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border ${
                isActive 
                  ? 'border-[#f5be38] ring-2 ring-[#f5be38]/50 shadow-[0_0_20px_rgba(245,190,56,0.3)] scale-[1.02]' 
                  : 'border-white/10 hover:border-white/40 bg-[#121218] opacity-80 hover:opacity-100'
              }`}
            >
              <div className="relative aspect-[16/10] bg-[#1a1a24] overflow-hidden">
                <img
                  src={item.thumbnailUrl || (isItemVideo ? '/magnetic-curved-popup-backdrop.jpg' : item.mediaUrl)}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors" />

                {/* Video Play Icon Indicator */}
                {isItemVideo && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                    </div>
                  </div>
                )}

                {/* Delete button if custom */}
                {item.isCustom && (
                  <button
                    type="button"
                    onClick={(e) => handleDeleteItem(item.id, e)}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/80 hover:bg-rose-600 text-stone-300 hover:text-white transition-colors z-10 cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Minimal Title Banner */}
              <div className="p-2.5 bg-[#0f0f14] flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-white truncate">
                  {item.title}
                </span>
                <span className="text-[10px] font-bold text-[#f5be38] uppercase shrink-0">
                  {item.badge || (isItemVideo ? 'Video' : 'Photo')}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {isUploadModalOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
            onClick={() => setIsUploadModalOpen(false)}
          >
            <div 
              className="relative w-full max-w-lg rounded-3xl bg-[#121218] border border-white/15 p-6 sm:p-8 text-white shadow-2xl space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f5be38]/10 text-[#f5be38] text-xs font-black">
                  <Upload className="w-3.5 h-3.5" />
                  <span>UPLOAD RECENT JOB</span>
                </div>
                <h3 className="text-xl font-black text-white tracking-tight">
                  Add Video or Photo to Recent Jobs Box
                </h3>
              </div>

              {/* Media Type Selector */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setUploadType('video')}
                  className={`p-3 rounded-2xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                    uploadType === 'video'
                      ? 'bg-[#f5be38] text-black border-[#f5be38] shadow-md'
                      : 'bg-white/5 border-white/10 text-stone-300 hover:bg-white/10'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  <span>Job Video</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUploadType('image')}
                  className={`p-3 rounded-2xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                    uploadType === 'image'
                      ? 'bg-[#f5be38] text-black border-[#f5be38] shadow-md'
                      : 'bg-white/5 border-white/10 text-stone-300 hover:bg-white/10'
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>Job Photo</span>
                </button>
              </div>

              {/* Drag & Drop / File Input Box */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="relative border-2 border-dashed border-white/20 hover:border-[#f5be38] rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer bg-white/[0.02] hover:bg-white/[0.05] transition-all group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={uploadType === 'video' ? 'video/mp4,video/webm,video/ogg,video/quicktime' : 'image/jpeg,image/png,image/webp'}
                  className="hidden"
                  onChange={handleFileChange}
                />
                
                {filePreview ? (
                  <div className="w-full text-center space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>{selectedFile?.name || 'File Selected'}</span>
                    </div>
                    <p className="text-[11px] text-stone-400">Click to choose a different file</p>
                  </div>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-2xl bg-white/5 group-hover:bg-[#f5be38]/20 flex items-center justify-center text-stone-300 group-hover:text-[#f5be38] transition-colors">
                      <Upload className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold text-white">
                      Click to browse {uploadType === 'video' ? 'video file (MP4, WebM, MOV)' : 'image file (JPG, PNG)'}
                    </p>
                    <p className="text-[11px] text-stone-400">
                      Direct upload to your recent jobs media box
                    </p>
                  </>
                )}
              </div>

              {/* Or Paste Video Link */}
              <div className="space-y-3">
                <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                  Or Paste Video URL (Kapwing, YouTube, Vimeo, MP4)
                </div>
                <input
                  type="text"
                  placeholder="https://www.kapwing.com/w/... or https://youtube.com/..."
                  value={uploadUrl}
                  onChange={(e) => setUploadUrl(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-stone-500 text-xs focus:outline-none focus:border-[#f5be38] transition-colors"
                />
              </div>

              {/* Optional Short Label */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-stone-300">Job Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Rollup Banner Production"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-stone-500 text-xs focus:outline-none focus:border-[#f5be38]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-stone-300">Badge Label</label>
                  <input
                    type="text"
                    placeholder="e.g. Video / Recent Job"
                    value={uploadBadge}
                    onChange={(e) => setUploadBadge(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-stone-500 text-xs focus:outline-none focus:border-[#f5be38]"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-stone-300 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={(!selectedFile && !uploadUrl.trim()) || isProcessingUpload}
                  onClick={handleAddMedia}
                  className="px-6 py-2.5 rounded-xl bg-[#f5be38] hover:bg-[#ffd15c] disabled:opacity-50 text-black font-extrabold text-xs shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isProcessingUpload ? (
                    <>
                      <span className="w-3 h-3 rounded-full border-2 border-black border-t-transparent animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 stroke-[3]" />
                      <span>Add to Recent Jobs Box</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
