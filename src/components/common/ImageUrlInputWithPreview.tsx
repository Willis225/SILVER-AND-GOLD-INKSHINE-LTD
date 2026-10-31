import React, { useState, useEffect, useRef } from 'react';
import { 
  Link as LinkIcon, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Eye, 
  X, 
  ExternalLink,
  Sparkles,
  Maximize2,
  Copy,
  Check
} from 'lucide-react';
import { processExternalImageUrl, getGoogleImagesSearchUrl, getPinterestSearchUrl } from '../../services/imageSearchService';

interface ImageUrlInputWithPreviewProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  searchContext?: string;
  categoryKey?: string;
  showHelperLinks?: boolean;
  compact?: boolean;
  required?: boolean;
  className?: string;
  id?: string;
}

export const ImageUrlInputWithPreview: React.FC<ImageUrlInputWithPreviewProps> = ({
  value,
  onChange,
  label = 'Image URL / Web Link',
  placeholder = 'Paste image address (e.g. https://... from Pinterest, Google, Imgur, Unsplash, or any website)',
  helperText = 'The system displays this image directly from the link with zero storage needed.',
  searchContext = 'Print design commercial product',
  categoryKey,
  showHelperLinks = true,
  compact = false,
  required = false,
  className = '',
  id
}) => {
  const [inputValue, setInputValue] = useState<string>(value || '');
  const [previewUrl, setPreviewUrl] = useState<string>(value || '');
  const [imageStatus, setImageStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [objectFit, setObjectFit] = useState<'cover' | 'contain'>('cover');
  const [copied, setCopied] = useState<boolean>(false);
  const debounceTimerRef = useRef<any>(null);

  // Sync internal state when prop value changes
  useEffect(() => {
    if (value !== inputValue) {
      setInputValue(value || '');
      setPreviewUrl(value || '');
      if (value) {
        validateAndTestUrl(value);
      } else {
        setImageStatus('idle');
        setImageDimensions(null);
        setErrorMessage(null);
      }
    }
  }, [value]);

  const validateAndTestUrl = (rawUrl: string) => {
    const trimmed = rawUrl.trim();
    if (!trimmed) {
      setImageStatus('idle');
      setImageDimensions(null);
      setErrorMessage(null);
      setPreviewUrl('');
      return;
    }

    const processed = processExternalImageUrl(trimmed);
    if (!processed.valid) {
      setImageStatus('error');
      setErrorMessage(processed.error || 'Please enter a valid URL starting with http:// or https://');
      setImageDimensions(null);
      return;
    }

    setPreviewUrl(processed.cleanUrl);
    // Begin testing image loading
    setImageStatus('loading');
    setErrorMessage(null);

    const testImg = new Image();
    testImg.referrerPolicy = 'no-referrer';

    testImg.onload = () => {
      setImageStatus('success');
      setImageDimensions({ width: testImg.naturalWidth, height: testImg.naturalHeight });
      setErrorMessage(null);
    };

    testImg.onerror = () => {
      setImageStatus('error');
      setErrorMessage(
        'Could not load image from this URL. Please verify it is a direct image link (e.g., right-click photo > "Copy image address").'
      );
      setImageDimensions(null);
    };

    testImg.src = processed.cleanUrl;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setInputValue(newVal);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      const processed = processExternalImageUrl(newVal.trim());
      const finalUrl = processed.valid ? processed.cleanUrl : newVal.trim();
      onChange(finalUrl);
      validateAndTestUrl(finalUrl);
    }, 250);
  };

  const handleClear = () => {
    setInputValue('');
    onChange('');
    setImageStatus('idle');
    setImageDimensions(null);
    setErrorMessage(null);
  };

  const handleCopyLink = () => {
    if (!inputValue) return;
    navigator.clipboard.writeText(inputValue).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  const googleImagesUrl = getGoogleImagesSearchUrl(searchContext);
  const pinterestUrl = getPinterestSearchUrl(searchContext);

  return (
    <div className={`space-y-2.5 ${className}`} id={id}>
      {/* Label and Helper Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
          <LinkIcon className="w-3.5 h-3.5 text-[#b8860b]" />
          <span>{label}</span>
          {required && <span className="text-red-500">*</span>}
        </label>

        {showHelperLinks && (
          <div className="flex items-center gap-2">
            <a
              href={googleImagesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-bold text-blue-700 hover:text-blue-900 flex items-center gap-0.5 hover:underline"
              title="Open Google Images to find and copy image address"
            >
              <span>Google Images</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <span className="text-stone-300">•</span>
            <a
              href={pinterestUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-bold text-rose-700 hover:text-rose-900 flex items-center gap-0.5 hover:underline"
              title="Open Pinterest to find design mockups and copy image address"
            >
              <span>Pinterest</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        )}
      </div>

      {/* Input Field Row */}
      <div className="relative flex items-center">
        <div className="absolute left-3 text-stone-400 pointer-events-none">
          <LinkIcon className="w-4 h-4" />
        </div>
        <input
          type="url"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`w-full pl-9 pr-20 py-2.5 bg-white rounded-xl border text-xs font-medium text-stone-900 transition-all focus:outline-hidden focus:ring-2 ${
            imageStatus === 'error'
              ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
              : imageStatus === 'success'
              ? 'border-emerald-400 focus:border-emerald-600 focus:ring-emerald-200'
              : 'border-stone-300 focus:border-[#b8860b] focus:ring-amber-200'
          }`}
        />

        {/* Right side controls */}
        <div className="absolute right-2 flex items-center gap-1">
          {inputValue && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 text-stone-400 hover:text-stone-700 rounded-md cursor-pointer transition-colors"
              title="Clear input"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {inputValue && (
            <button
              type="button"
              onClick={handleCopyLink}
              className="p-1 text-stone-400 hover:text-stone-700 rounded-md cursor-pointer transition-colors"
              title="Copy URL"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      </div>

      {/* Helper text */}
      {helperText && !errorMessage && (
        <p className="text-[11px] text-stone-500 leading-relaxed">
          {helperText}
        </p>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-semibold">{errorMessage}</span>
            <p className="mt-0.5 text-[11px] text-red-600">
              Tip: Right-click the image in your browser and select <strong>"Copy Image Address"</strong> (or <em>"Copy Image Link"</em>).
            </p>
          </div>
        </div>
      )}

      {/* LIVE IMAGE PREVIEW CARD */}
      {inputValue && (
        <div className="rounded-2xl border border-stone-200 bg-stone-50/90 overflow-hidden shadow-xs p-3 transition-all">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-[#b8860b]" />
                <span>Live Image Preview</span>
              </span>

              {imageStatus === 'loading' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                  <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                  <span>Loading preview...</span>
                </span>
              )}

              {imageStatus === 'success' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Verified Image Link</span>
                  {imageDimensions && (
                    <span className="font-mono font-normal text-emerald-700 ml-1">
                      ({imageDimensions.width} × {imageDimensions.height}px)
                    </span>
                  )}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setObjectFit(prev => prev === 'cover' ? 'contain' : 'cover')}
                className="px-2 py-0.5 bg-white border border-stone-200 text-stone-600 hover:text-stone-900 rounded text-[10px] font-medium transition-colors cursor-pointer"
                title="Toggle fit mode"
              >
                Fit: {objectFit}
              </button>
            </div>
          </div>

          {/* Image Canvas Box */}
          <div className={`w-full rounded-xl overflow-hidden bg-stone-900/5 border border-stone-200/80 flex items-center justify-center relative ${compact ? 'h-36' : 'h-48 sm:h-56'}`}>
            {imageStatus === 'loading' && (
              <div className="flex flex-col items-center justify-center gap-2 text-stone-500">
                <RefreshCw className="w-6 h-6 animate-spin text-[#b8860b]" />
                <span className="text-xs">Fetching image from web address...</span>
              </div>
            )}

            {imageStatus === 'error' && (
              <div className="p-4 text-center text-stone-400 space-y-1">
                <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
                <p className="text-xs font-semibold text-stone-600">Image cannot be loaded from this link</p>
                <p className="text-[11px] text-stone-400 max-w-sm">Please check the link or try right-clicking the image and copying the image address directly.</p>
              </div>
            )}

            {imageStatus === 'success' && (
              <img
                src={previewUrl || inputValue}
                alt="URL Preview"
                className={`w-full h-full transition-all duration-300 ${
                  objectFit === 'contain' ? 'object-contain p-2' : 'object-cover'
                }`}
                referrerPolicy="no-referrer"
                onError={() => {
                  setImageStatus('error');
                  setErrorMessage('Failed to display image in browser. Please check if link allows external embedding.');
                }}
              />
            )}
          </div>

          <div className="mt-2 flex items-center justify-between text-[11px] text-stone-500">
            <span className="truncate max-w-[80%] font-mono text-[10px] text-stone-400" title={inputValue}>
              {inputValue}
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Zero Platform Storage
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
