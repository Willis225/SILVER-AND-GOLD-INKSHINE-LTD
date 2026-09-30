import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Upload, 
  Video, 
  Image as ImageIcon, 
  Trash2, 
  Plus, 
  Check, 
  X, 
  Film,
  Edit3,
  Maximize2,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { openDB } from 'idb';

export interface RecentJobMediaBoxItem {
  id: string;
  type: 'video' | 'image';
  mediaUrl: string;
  thumbnailUrl?: string;
  isCustom?: boolean;
}

const STORAGE_KEY = 'inkshine_recent_jobs_media_grid_v4';
const DB_NAME = 'inkshine_recent_jobs_db';
const DB_STORE = 'videos_and_images';

// Initial 4 default recent completed job slots (2 lines × 2 boxes = 4 boxes)
const DEFAULT_4_BOXES: RecentJobMediaBoxItem[] = [
  {
    id: 'box-1',
    type: 'video',
    mediaUrl: 'https://www.kapwing.com/w/JxRjisdMGT',
    thumbnailUrl: 'https://cdn.hstockplus.org/uploads/public/img-1790091847996-3aa2bb1c6a4e12cd.webp',
  },
  {
    id: 'box-2',
    type: 'image',
    mediaUrl: '/magnetic-curved-popup-backdrop.jpg',
    thumbnailUrl: '/magnetic-curved-popup-backdrop.jpg',
  },
  {
    id: 'box-3',
    type: 'image',
    mediaUrl: '/3d-illuminated-led-channel-letters.jpg',
    thumbnailUrl: '/3d-illuminated-led-channel-letters.jpg',
  },
  {
    id: 'box-4',
    type: 'image',
    mediaUrl: '/commercial-fleet-vehicle-branding.jpg',
    thumbnailUrl: '/commercial-fleet-vehicle-branding.jpg',
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

function resolveMediaInfo(url: string, type: 'video' | 'image') {
  const cleanUrl = (url || '').trim();

  if (cleanUrl.includes('kapwing.com')) {
    const match = cleanUrl.match(/kapwing\.com\/(?:w|e|videos)\/([a-zA-Z0-9_-]+)/);
    const id = match ? match[1] : 'JxRjisdMGT';
    return {
      type: 'kapwing' as const,
      embedUrl: `https://www.kapwing.com/e/${id}?autoplay=true`,
      shareUrl: `https://www.kapwing.com/w/${id}`
    };
  }

  if (cleanUrl.includes('youtube.com') || cleanUrl.includes('youtu.be')) {
    let ytId = '';
    if (cleanUrl.includes('youtu.be/')) {
      ytId = cleanUrl.split('youtu.be/')[1]?.split('?')[0] || '';
    } else if (cleanUrl.includes('v=')) {
      ytId = cleanUrl.split('v=')[1]?.split('&')[0] || '';
    }
    return {
      type: 'youtube' as const,
      embedUrl: `https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=1`
    };
  }

  if (cleanUrl.includes('vimeo.com')) {
    const match = cleanUrl.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
    const id = match ? match[1] : '';
    return {
      type: 'vimeo' as const,
      embedUrl: `https://player.vimeo.com/video/${id}?autoplay=1&muted=1&loop=1`
    };
  }

  if (type === 'video' || cleanUrl.match(/\.(mp4|webm|mov|ogg|m4v)($|\?)/i) || cleanUrl.startsWith('blob:') || cleanUrl.startsWith('data:video')) {
    return {
      type: 'direct_video' as const,
      src: cleanUrl
    };
  }

  return {
    type: 'image' as const,
    src: cleanUrl
  };
}

interface RecentJobsMediaBoxProps {
  allowUpload?: boolean;
}

export const RecentJobsMediaBox: React.FC<RecentJobsMediaBoxProps> = ({ allowUpload = true }) => {
  const [boxes, setBoxes] = useState<RecentJobMediaBoxItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length === 4) return parsed;
        }
      } catch (e) {
        console.warn('Could not parse recent jobs grid from localStorage', e);
      }
    }
    return DEFAULT_4_BOXES;
  });

  // Modal State for editing a specific box slot
  const [editingBoxIndex, setEditingBoxIndex] = useState<number | null>(null);
  const [uploadMediaType, setUploadMediaType] = useState<'video' | 'image'>('video');
  const [mediaInputUrl, setMediaInputUrl] = useState('');
  const [selectedUploadFile, setSelectedUploadFile] = useState<File | null>(null);
  const [uploadFilePreview, setUploadFilePreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Fullscreen Lightbox Modal
  const [expandedBox, setExpandedBox] = useState<RecentJobMediaBoxItem | null>(null);

  // Individual Video Player Controls state
  const [playingStates, setPlayingStates] = useState<Record<string, boolean>>({});
  const [mutedStates, setMutedStates] = useState<Record<string, boolean>>({});
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  // Save to LocalStorage
  const persistBoxes = (newBoxes: RecentJobMediaBoxItem[]) => {
    setBoxes(newBoxes);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newBoxes));
    } catch (e) {
      console.warn('Could not save recent jobs grid to localStorage', e);
    }
  };

  const handleOpenEditModal = (index: number) => {
    const current = boxes[index];
    setEditingBoxIndex(index);
    setUploadMediaType(current.type || 'video');
    setMediaInputUrl(current.mediaUrl || '');
    setSelectedUploadFile(null);
    setUploadFilePreview(null);
  };

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedUploadFile(file);
      const isVid = file.type.startsWith('video/') || file.name.match(/\.(mp4|webm|mov|ogg|m4v)$/i);
      setUploadMediaType(isVid ? 'video' : 'image');
      const objUrl = URL.createObjectURL(file);
      setUploadFilePreview(objUrl);
    }
  };

  const handleSaveBoxMedia = async () => {
    if (editingBoxIndex === null) return;
    if (!selectedUploadFile && !mediaInputUrl.trim()) return;

    setIsProcessing(true);
    let finalUrl = mediaInputUrl.trim();

    try {
      if (selectedUploadFile) {
        if (selectedUploadFile.size < 8 * 1024 * 1024) {
          const reader = new FileReader();
          finalUrl = await new Promise((resolve, reject) => {
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(selectedUploadFile);
          });
        } else {
          const db = await getIndexedDb();
          const fileId = `job-media-box-${editingBoxIndex}-${Date.now()}`;
          await db.put(DB_STORE, selectedUploadFile, fileId);
          finalUrl = URL.createObjectURL(selectedUploadFile);
        }
      }

      const updated = [...boxes];
      updated[editingBoxIndex] = {
        ...updated[editingBoxIndex],
        type: uploadMediaType,
        mediaUrl: finalUrl,
        thumbnailUrl: uploadMediaType === 'image' ? finalUrl : undefined,
        isCustom: true
      };

      persistBoxes(updated);
      setEditingBoxIndex(null);
    } catch (err) {
      console.error('Failed to update box media', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResetToDefaults = () => {
    persistBoxes(DEFAULT_4_BOXES);
    setEditingBoxIndex(null);
  };

  const togglePlay = (boxId: string) => {
    const videoEl = videoRefs.current[boxId];
    if (videoEl) {
      if (videoEl.paused) {
        videoEl.play().then(() => {
          setPlayingStates(prev => ({ ...prev, [boxId]: true }));
        }).catch(() => {});
      } else {
        videoEl.pause();
        setPlayingStates(prev => ({ ...prev, [boxId]: false }));
      }
    }
  };

  const toggleMute = (boxId: string) => {
    const videoEl = videoRefs.current[boxId];
    if (videoEl) {
      videoEl.muted = !videoEl.muted;
      setMutedStates(prev => ({ ...prev, [boxId]: videoEl.muted }));
    }
  };

  return (
    <div className="w-full space-y-6 bg-[#08080c] rounded-3xl p-5 sm:p-7 lg:p-8 border border-white/15 shadow-2xl">
      
      {/* Top Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[10px] sm:text-[11px] font-black uppercase tracking-widest">
            <Film className="w-3 h-3 text-[#f5be38]" />
            <span>RECENT JOBS &amp; PRODUCTION SHOWCASE</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Completed Projects &amp; Live Fabrication
          </h3>
        </div>

        {/* Action Button to Edit or Reset */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleOpenEditModal(0)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-stone-200 text-black font-extrabold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Add / Replace Job Media</span>
          </button>
        </div>
      </div>

      {/* 
        ========================================================================
        4 BOXES IN 2 LINES (2 Columns × 2 Rows on Desktop & Tablet)
        Each box seamlessly hosts Video or High-Res Completed Job Photos
        ========================================================================
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
        {boxes.map((box, idx) => {
          const media = resolveMediaInfo(box.mediaUrl, box.type);
          const isDirectVideo = media.type === 'direct_video';
          const isIframeVideo = media.type === 'kapwing' || media.type === 'youtube' || media.type === 'vimeo';
          const isVideo = isDirectVideo || isIframeVideo || box.type === 'video';

          return (
            <motion.div
              key={box.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative rounded-2xl overflow-hidden bg-[#0d0e14] border border-white/15 hover:border-white/40 shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Media Stage Aspect Ratio */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black overflow-hidden flex items-center justify-center">
                
                {/* Embed Iframe Video */}
                {isIframeVideo ? (
                  <iframe
                    src={media.embedUrl}
                    title={`Recent Job Media ${idx + 1}`}
                    className="w-full h-full border-0 bg-black"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                  />
                ) : isDirectVideo ? (
                  <div className="relative w-full h-full flex items-center justify-center bg-black">
                    <video
                      ref={el => { videoRefs.current[box.id] = el; }}
                      src={media.src}
                      className="w-full h-full object-cover bg-black cursor-pointer"
                      autoPlay
                      loop
                      muted={mutedStates[box.id] !== false}
                      playsInline
                      onClick={() => togglePlay(box.id)}
                    />

                    {/* Direct Video Controls Bar */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 opacity-90 group-hover:opacity-100 transition-opacity z-10">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => togglePlay(box.id)}
                          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                        >
                          {playingStates[box.id] === false ? <Play className="w-3.5 h-3.5 fill-white" /> : <Pause className="w-3.5 h-3.5 fill-white" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleMute(box.id)}
                          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                        >
                          {mutedStates[box.id] === false ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div 
                    className="relative w-full h-full flex items-center justify-center bg-black cursor-pointer group/img"
                    onClick={() => setExpandedBox(box)}
                  >
                    <img
                      src={media.src || box.thumbnailUrl || '/magnetic-curved-popup-backdrop.jpg'}
                      alt={`Recent Job Production ${idx + 1}`}
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover/img:bg-black/10 transition-colors" />
                    
                    {/* Zoom / Fullscreen Hover Icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity pointer-events-none">
                      <div className="w-10 h-10 rounded-full bg-black/80 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-lg">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                )}

              </div>

            </motion.div>
          );
        })}
      </div>

      {/* 
        ========================================================================
        MODAL: EDIT / REPLACE MEDIA IN SELECTED BOX
        Allows pasting a video URL (YouTube/Vimeo/Kapwing/MP4) or uploading file
        ========================================================================
      */}
      <AnimatePresence>
        {editingBoxIndex !== null && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in"
            onClick={() => setEditingBoxIndex(null)}
          >
            <div 
              className="relative w-full max-w-lg rounded-3xl bg-[#0e0f16] border border-white/20 p-6 sm:p-8 text-white shadow-2xl space-y-5"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Modal */}
              <button
                type="button"
                onClick={() => setEditingBoxIndex(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/15 text-stone-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f5be38]/15 border border-[#f5be38]/30 text-[#f5be38] text-[11px] font-black">
                  <Film className="w-3.5 h-3.5" />
                  <span>EDIT JOB BOX #{editingBoxIndex + 1}</span>
                </div>
                <h3 className="text-xl font-black text-white tracking-tight">
                  Add Video or Photo to Job Box
                </h3>
                <p className="text-xs text-stone-400">
                  Paste a direct video link (YouTube, Vimeo, Kapwing, MP4) or upload a photo/video file from your computer.
                </p>
              </div>

              {/* Media Type Selector */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setUploadMediaType('video')}
                  className={`p-3 rounded-2xl border text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    uploadMediaType === 'video'
                      ? 'bg-white text-black border-white shadow-md'
                      : 'bg-white/5 text-stone-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  <span>Video (Link or File)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setUploadMediaType('image')}
                  className={`p-3 rounded-2xl border text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    uploadMediaType === 'image'
                      ? 'bg-white text-black border-white shadow-md'
                      : 'bg-white/5 text-stone-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>Photo / Image</span>
                </button>
              </div>

              {/* Option A: Paste URL */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-stone-300">
                  Paste Video or Image URL:
                </label>
                <input
                  type="url"
                  value={mediaInputUrl}
                  onChange={(e) => {
                    setMediaInputUrl(e.target.value);
                    setSelectedUploadFile(null);
                    setUploadFilePreview(null);
                  }}
                  placeholder="https://www.youtube.com/watch?v=... or https://...image.jpg"
                  className="w-full bg-black border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-stone-500 focus:outline-hidden focus:border-[#f5be38]"
                />
              </div>

              {/* Option B: Upload File */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-stone-300">
                  Or Upload from Device:
                </label>
                <label className="border-2 border-dashed border-white/20 hover:border-[#f5be38] rounded-2xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer bg-black/40 hover:bg-black/60 transition-colors">
                  <Upload className="w-6 h-6 text-stone-400" />
                  <span className="text-xs font-bold text-stone-300">
                    {selectedUploadFile ? selectedUploadFile.name : 'Click to browse MP4 video or JPG/PNG photo'}
                  </span>
                  <input
                    type="file"
                    accept="video/*,image/*"
                    onChange={handleFileSelection}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Preview if any */}
              {uploadFilePreview && (
                <div className="p-2 bg-black rounded-xl border border-white/10 text-center">
                  <span className="text-[11px] text-emerald-400 font-bold">✓ File loaded and ready to apply</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleResetToDefaults}
                  className="text-xs text-stone-400 hover:text-white underline cursor-pointer"
                >
                  Reset to Original
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingBoxIndex(null)}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-stone-200 text-xs font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveBoxMedia}
                    disabled={isProcessing || (!mediaInputUrl.trim() && !selectedUploadFile)}
                    className="px-5 py-2.5 rounded-xl bg-[#f5be38] hover:bg-[#ffd15c] text-black font-black text-xs shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1.5"
                  >
                    {isProcessing ? <span>Saving...</span> : <span>Apply to Job Box</span>}
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Lightbox / Fullscreen Modal */}
      <AnimatePresence>
        {expandedBox && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in"
            onClick={() => setExpandedBox(null)}
          >
            <div className="relative max-w-4xl max-h-[85vh] rounded-3xl overflow-hidden bg-black border border-white/20 p-2">
              <button
                type="button"
                onClick={() => setExpandedBox(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/80 text-white hover:bg-white hover:text-black transition-colors z-20 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <img
                src={expandedBox.mediaUrl}
                alt="Enlarged Recent Job"
                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
              />
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
