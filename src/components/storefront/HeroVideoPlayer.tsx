import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Upload, 
  Link as LinkIcon, 
  Check, 
  Film,
  Sparkles,
  ExternalLink,
  X,
  FileVideo,
  RefreshCw
} from 'lucide-react';

interface HeroVideoPlayerProps {
  initialVideoUrl?: string;
  posterUrl?: string;
  className?: string;
}

// User-provided official video from Kapwing
const DEFAULT_VIDEO_URL = "https://www.kapwing.com/w/JxRjisdMGT";
const DEFAULT_POSTER = "https://cdn.hstockplus.org/uploads/public/img-1790091847996-3aa2bb1c6a4e12cd.webp";

export const HeroVideoPlayer: React.FC<HeroVideoPlayerProps> = ({
  initialVideoUrl = DEFAULT_VIDEO_URL,
  posterUrl = DEFAULT_POSTER,
  className = ""
}) => {
  const [videoUrl, setVideoUrl] = useState<string>(initialVideoUrl);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const [urlSuccess, setUrlSuccess] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync with prop updates
  useEffect(() => {
    if (initialVideoUrl) {
      setVideoUrl(initialVideoUrl);
    }
  }, [initialVideoUrl]);

  // Detect URL type (Kapwing, YouTube, Vimeo, or Direct HTML5 Video)
  const videoSourceInfo = useMemo(() => {
    const url = (videoUrl || DEFAULT_VIDEO_URL).trim();

    // 1. Kapwing
    if (url.includes('kapwing.com')) {
      const match = url.match(/kapwing\.com\/(?:w|e|videos)\/([a-zA-Z0-9_-]+)/);
      const id = match ? match[1] : 'JxRjisdMGT';
      return {
        type: 'kapwing' as const,
        embedUrl: `https://www.kapwing.com/e/${id}?autoplay=true`,
        shareUrl: `https://www.kapwing.com/w/${id}`,
        id
      };
    }

    // 2. YouTube
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

    // 3. Vimeo
    if (url.includes('vimeo.com')) {
      const match = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
      const id = match ? match[1] : '';
      return {
        type: 'vimeo' as const,
        embedUrl: `https://player.vimeo.com/video/${id}?autoplay=1&muted=1&loop=1`
      };
    }

    // 4. Standard direct video file (MP4, WebM, Blob, etc.)
    return {
      type: 'direct' as const,
      src: url
    };
  }, [videoUrl]);

  // Handle local video file upload / drop
  const handleProcessFile = (file: File) => {
    if (file && (file.type.startsWith('video/') || file.name.match(/\.(mp4|webm|mov|m4v|ogg)$/i))) {
      const objectUrl = URL.createObjectURL(file);
      setVideoUrl(objectUrl);
      setIsVideoLoaded(true);
      setShowConfigModal(false);
      setIsDraggingOver(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
  };

  // Drag & drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
  };

  // Handle setting custom video URL
  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      setVideoUrl(inputUrl.trim());
      setUrlSuccess(true);
      setTimeout(() => {
        setUrlSuccess(false);
        setShowConfigModal(false);
      }, 1000);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative w-full h-[210px] xs:h-[235px] sm:h-[265px] md:h-[285px] lg:h-[295px] rounded-xl overflow-hidden bg-black border border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.7)] flex flex-col justify-between ${className}`}
    >
      
      {/* Hidden file input for custom video upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="video/mp4,video/webm,video/ogg,video/quicktime"
        className="hidden"
      />

      {/* Drag and Drop Active Overlay */}
      {isDraggingOver && (
        <div className="absolute inset-0 z-50 bg-[#f5be38]/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-black text-center animate-pulse">
          <FileVideo className="w-16 h-16 text-black mb-3" />
          <h4 className="text-xl font-black">Drop Video File to Play</h4>
          <p className="text-xs font-bold text-stone-900 mt-1">Supports MP4, WebM, MOV</p>
        </div>
      )}

      {/* RENDER VIDEO OR EMBED */}
      {videoSourceInfo.type === 'kapwing' ? (
        <div className="absolute inset-0 w-full h-full bg-[#050508] flex flex-col items-center justify-center">
          <iframe
            key={iframeKey}
            src={videoSourceInfo.embedUrl}
            title="Silver & Gold Inkshine Video Showcase"
            className="w-full h-full border-0 absolute inset-0 z-10"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            allowFullScreen
          />
        </div>
      ) : videoSourceInfo.type === 'youtube' || videoSourceInfo.type === 'vimeo' ? (
        <div className="absolute inset-0 w-full h-full bg-black">
          <iframe
            src={videoSourceInfo.embedUrl}
            title="Silver & Gold Inkshine Video"
            className="w-full h-full border-0 absolute inset-0 z-10"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          />
        </div>
      ) : (
        /* Direct HTML5 video */
        <>
          <video
            ref={videoRef}
            src={videoSourceInfo.src}
            poster={posterUrl}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onLoadedData={() => setIsVideoLoaded(true)}
            className="absolute inset-0 w-full h-full object-cover object-center cursor-pointer"
            onClick={togglePlay}
          />

          {/* Center Play button if paused */}
          <div 
            className="relative z-20 flex-1 flex items-center justify-center cursor-pointer pointer-events-auto"
            onClick={togglePlay}
          >
            <AnimatePresence>
              {!isPlaying && (
                <motion.button
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  type="button"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#f5be38]/90 hover:bg-[#f5be38] text-black flex items-center justify-center shadow-[0_0_30px_rgba(245,190,56,0.6)] border-2 border-white transition-transform hover:scale-110 cursor-pointer"
                  aria-label="Play video"
                >
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current translate-x-0.5" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom video controls for direct HTML5 video */}
          <div className="relative z-20 p-3 sm:p-4 flex items-center justify-between gap-3 text-white bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={togglePlay}
                className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 flex items-center justify-center transition-colors cursor-pointer"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#f5be38]" /> : <Play className="w-3.5 h-3.5 text-[#f5be38] translate-x-0.5" />}
              </button>

              <button
                type="button"
                onClick={toggleMute}
                className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 flex items-center justify-center transition-colors cursor-pointer"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-stone-300" /> : <Volume2 className="w-3.5 h-3.5 text-[#f5be38]" />}
              </button>
            </div>

            <button
              type="button"
              onClick={handleFullscreen}
              className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Fullscreen"
            >
              <Maximize2 className="w-3.5 h-3.5 text-stone-200" />
            </button>
          </div>
        </>
      )}

      {/* Floating Header Controls */}
      <div className="relative z-20 p-2.5 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 border border-[#f5be38]/40 backdrop-blur-md text-[10px] font-bold text-white shadow-md pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
          <span className="tracking-wider uppercase text-[#f5be38]">OFFICIAL VIDEO REEL</span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          {videoSourceInfo.type === 'kapwing' && (
            <>
              <button
                type="button"
                onClick={() => setIframeKey((k) => k + 1)}
                className="p-1.5 rounded-full bg-black/80 hover:bg-black border border-white/20 text-white text-xs backdrop-blur-md transition-colors shadow-md"
                title="Reload video"
              >
                <RefreshCw className="w-3.5 h-3.5 text-stone-300" />
              </button>
              
              <a
                href={videoSourceInfo.shareUrl}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded-full bg-black/80 hover:bg-black border border-white/20 text-white text-xs backdrop-blur-md transition-colors shadow-md flex items-center gap-1 font-semibold"
                title="Open video in Kapwing"
              >
                <span>Watch</span>
                <ExternalLink className="w-3 h-3 text-[#f5be38]" />
              </a>
            </>
          )}

          <button
            type="button"
            onClick={() => setShowConfigModal(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 hover:bg-[#f5be38] text-white hover:text-black border border-white/20 hover:border-[#f5be38] backdrop-blur-md text-xs font-semibold transition-all shadow-md cursor-pointer"
            title="Change or upload video"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload / Swap</span>
          </button>
        </div>
      </div>

      {/* Video Source Configuration Modal */}
      <AnimatePresence>
        {showConfigModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 bg-black/95 backdrop-blur-md p-5 sm:p-6 flex flex-col justify-center items-center text-center space-y-4"
          >
            <button
              type="button"
              onClick={() => setShowConfigModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1.5 max-w-sm">
              <div className="w-12 h-12 rounded-2xl bg-[#f5be38]/20 border border-[#f5be38] flex items-center justify-center mx-auto text-[#f5be38]">
                <Film className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-white">Video Showcase Manager</h3>
              <p className="text-xs text-stone-400">
                Upload your video file directly or enter a link (Kapwing, YouTube, MP4).
              </p>
            </div>

            {/* Video URL Form */}
            <form onSubmit={handleSaveUrl} className="w-full max-w-sm space-y-3">
              <div className="relative">
                <input
                  type="url"
                  placeholder="https://www.kapwing.com/w/JxRjisdMGT"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-stone-500 text-xs focus:outline-none focus:border-[#f5be38]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-3 rounded-xl bg-[#f5be38] hover:bg-[#eab308] text-black font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {urlSuccess ? <Check className="w-4 h-4 text-black" /> : <LinkIcon className="w-4 h-4" />}
                  <span>{urlSuccess ? "Applied!" : "Apply Link"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2.5 px-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-white/20"
                >
                  <Upload className="w-4 h-4 text-[#f5be38]" />
                  <span>Choose Video</span>
                </button>
              </div>

              {/* Reset to Default */}
              <button
                type="button"
                onClick={() => {
                  setVideoUrl(DEFAULT_VIDEO_URL);
                  setShowConfigModal(false);
                }}
                className="text-[11px] text-stone-400 hover:text-white underline pt-1 cursor-pointer"
              >
                Reset to Kapwing video
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
