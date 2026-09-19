import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, 
  Check, 
  RotateCcw, 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  Sparkles,
  Save,
  Upload,
  Database,
  Image as ImageIcon,
  Loader2
} from 'lucide-react';
import { WebsiteContent } from '../../types/websiteContent';
import { compressImageFile } from '../../lib/firebase';

interface PageTextManagerProps {
  content: WebsiteContent;
  onSaveContent: (content: WebsiteContent) => void;
  onResetToDefaults?: () => void;
}

export const PageTextManager: React.FC<PageTextManagerProps> = ({
  content,
  onSaveContent,
  onResetToDefaults,
}) => {
  const [formData, setFormData] = useState<WebsiteContent>({ ...content });
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isUploadingBg, setIsUploadingBg] = useState(false);
  const bgFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFormData({ ...content });
  }, [content]);

  const handleChange = (field: keyof WebsiteContent, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setSavedSuccess(false);
  };

  const handleBgFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingBg(true);
    try {
      const compressed = await compressImageFile(file, 1920, 0.85);
      handleChange('heroBackgroundImage', compressed);
    } catch (err) {
      console.error('Error compressing background image:', err);
      alert('Failed to process image. Please choose another image file.');
    } finally {
      setIsUploadingBg(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveContent(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const handleReset = () => {
    const confirmReset = window.confirm('Are you sure you want to reset all website text to original factory defaults?');
    if (confirmReset && onResetToDefaults) {
      onResetToDefaults();
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 text-stone-900 pb-10">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00473e]/10 text-[#00473e] font-bold text-[10px] uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5" />
              <span>Storefront Copywriting &amp; Descriptions</span>
            </div>
            <div className="inline-flex items-center gap-1 text-[10px] bg-emerald-50 border border-emerald-200 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">
              <Database className="w-3 h-3 text-emerald-600" />
              <span>Live Cloud Database (Syncs All Devices)</span>
            </div>
          </div>
          <h2 className="text-xl font-black text-stone-900 tracking-tight">
            Manage Website Headings &amp; Descriptions
          </h2>
          <p className="text-xs text-stone-600 mt-1 max-w-xl">
            Update headlines, descriptions, company details, and contact information across the storefront. Changes are saved immediately.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {onResetToDefaults && (
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              title="Revert all text to defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
          )}

          <button
            type="submit"
            className="px-6 py-2.5 bg-[#00473e] hover:bg-[#03554a] active:scale-98 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save All Text Changes</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-800 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>All text changes have been saved and applied to the live storefront!</span>
        </div>
      )}

      {/* Section 1: Hero Section Copy */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-base text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <Sparkles className="w-4 h-4 text-[#b8860b]" />
          <span>1. Top Hero Section Copy</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Eyebrow Label
            </label>
            <input
              type="text"
              value={formData.heroEyebrow}
              onChange={(e) => handleChange('heroEyebrow', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-stone-50 rounded-xl border border-stone-300 text-xs text-stone-900 font-semibold focus:ring-2 focus:ring-[#b8860b]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Main Headline
            </label>
            <input
              type="text"
              value={formData.heroHeadline}
              onChange={(e) => handleChange('heroHeadline', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-stone-50 rounded-xl border border-stone-300 text-xs text-stone-900 font-semibold focus:ring-2 focus:ring-[#b8860b]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
            Subheadline
          </label>
          <input
            type="text"
            value={formData.heroSubheadline}
            onChange={(e) => handleChange('heroSubheadline', e.target.value)}
            className="w-full px-3.5 py-2.5 bg-stone-50 rounded-xl border border-stone-300 text-xs text-stone-900 font-medium focus:ring-2 focus:ring-[#b8860b]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
            Hero Narrative Description
          </label>
          <textarea
            rows={3}
            value={formData.heroDescription}
            onChange={(e) => handleChange('heroDescription', e.target.value)}
            className="w-full px-3.5 py-2.5 bg-stone-50 rounded-xl border border-stone-300 text-xs text-stone-900 leading-relaxed focus:ring-2 focus:ring-[#b8860b] resize-none"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
              Hero / Home Page Background Texture &amp; Image
            </label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                ref={bgFileInputRef}
                onChange={handleBgFileUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => bgFileInputRef.current?.click()}
                disabled={isUploadingBg}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
              >
                {isUploadingBg ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Compressing...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Image from Device</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <input
              type="text"
              value={formData.heroBackgroundImage || '/homepage-bg.jpg'}
              onChange={(e) => handleChange('heroBackgroundImage', e.target.value)}
              placeholder="/homepage-bg.jpg or https://..."
              className="w-full px-3.5 py-2.5 bg-stone-50 rounded-xl border border-stone-300 text-xs text-stone-900 font-mono focus:ring-2 focus:ring-[#b8860b]"
            />
            {formData.heroBackgroundImage && (
              <div className="flex items-center gap-2 shrink-0">
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-stone-300 shadow-xs bg-stone-900">
                  <img
                    src={formData.heroBackgroundImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleChange('heroBackgroundImage', '/homepage-bg.jpg')}
                  className="text-[11px] text-stone-500 hover:text-red-600 underline font-medium"
                >
                  Reset texture
                </button>
              </div>
            )}
          </div>
          <p className="text-[11px] text-stone-500 mt-1">
            Upload any image or banner from your phone/computer. It will be saved directly into the database and shown on all devices immediately.
          </p>
        </div>
      </div>

      {/* Section 2: Top Services Showcase Section */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-base text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <FileText className="w-4 h-4 text-[#00473e]" />
          <span>2. Top-Quality Printing Services Showcase Section</span>
        </h3>

        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
            Showcase Title
          </label>
          <input
            type="text"
            value={formData.showcaseTitle}
            onChange={(e) => handleChange('showcaseTitle', e.target.value)}
            className="w-full px-3.5 py-2.5 bg-stone-50 rounded-xl border border-stone-300 text-xs text-stone-900 font-semibold focus:ring-2 focus:ring-[#b8860b]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
            Showcase Subtitle / Description
          </label>
          <textarea
            rows={2}
            value={formData.showcaseDescription}
            onChange={(e) => handleChange('showcaseDescription', e.target.value)}
            className="w-full px-3.5 py-2.5 bg-stone-50 rounded-xl border border-stone-300 text-xs text-stone-900 leading-relaxed focus:ring-2 focus:ring-[#b8860b] resize-none"
          />
        </div>
      </div>

      {/* Section 3: Why Choose Us Section */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-base text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <FileText className="w-4 h-4 text-[#b8860b]" />
          <span>3. &quot;Why Businesses Choose Us&quot; Section</span>
        </h3>

        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
            Section Title
          </label>
          <input
            type="text"
            value={formData.whyChooseTitle}
            onChange={(e) => handleChange('whyChooseTitle', e.target.value)}
            className="w-full px-3.5 py-2.5 bg-stone-50 rounded-xl border border-stone-300 text-xs text-stone-900 font-semibold focus:ring-2 focus:ring-[#b8860b]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
            Section Narrative Description
          </label>
          <textarea
            rows={3}
            value={formData.whyChooseDescription}
            onChange={(e) => handleChange('whyChooseDescription', e.target.value)}
            className="w-full px-3.5 py-2.5 bg-stone-50 rounded-xl border border-stone-300 text-xs text-stone-900 leading-relaxed focus:ring-2 focus:ring-[#b8860b] resize-none"
          />
        </div>
      </div>

      {/* Section 4: Brand & Contact Info */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-base text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <Building2 className="w-4 h-4 text-[#00473e]" />
          <span>4. Brand Legal Name, Contacts &amp; Google Link</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-stone-400" />
              <span>Company Legal Name</span>
            </label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-stone-50 rounded-xl border border-stone-300 text-xs text-stone-900 font-bold focus:ring-2 focus:ring-[#b8860b]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-stone-400" />
              <span>Orders / Support Email</span>
            </label>
            <input
              type="email"
              value={formData.contactEmail}
              onChange={(e) => handleChange('contactEmail', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-stone-50 rounded-xl border border-stone-300 text-xs text-stone-900 font-semibold focus:ring-2 focus:ring-[#b8860b]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-stone-400" />
              <span>Official Phone Number / WhatsApp</span>
            </label>
            <input
              type="text"
              value={formData.contactPhone}
              onChange={(e) => handleChange('contactPhone', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-stone-50 rounded-xl border border-stone-300 text-xs text-stone-900 font-semibold focus:ring-2 focus:ring-[#b8860b]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
              <span>Google Preferred Source Link</span>
            </label>
            <input
              type="url"
              value={formData.googlePreferredSourceUrl}
              onChange={(e) => handleChange('googlePreferredSourceUrl', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-stone-50 rounded-xl border border-stone-300 text-xs text-stone-900 font-mono focus:ring-2 focus:ring-[#b8860b]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              <span>Google Maps Link (Map Line)</span>
            </label>
            <input
              type="url"
              value={formData.googleMapsUrl || 'https://maps.app.goo.gl/FHkoQGNuL8p13jnG6'}
              onChange={(e) => handleChange('googleMapsUrl', e.target.value)}
              placeholder="https://maps.app.goo.gl/FHkoQGNuL8p13jnG6"
              className="w-full px-3.5 py-2.5 bg-stone-50 rounded-xl border border-stone-300 text-xs text-stone-900 font-mono focus:ring-2 focus:ring-[#b8860b]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              <span>Google Maps Embed URL</span>
            </label>
            <input
              type="url"
              value={formData.googleMapsEmbedUrl || 'https://maps.google.com/maps?q=9.081999,8.675277&hl=en&z=16&output=embed'}
              onChange={(e) => handleChange('googleMapsEmbedUrl', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-stone-50 rounded-xl border border-stone-300 text-xs text-stone-900 font-mono focus:ring-2 focus:ring-[#b8860b]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-stone-400" />
            <span>Operational Address / Press Facility</span>
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
            className="w-full px-3.5 py-2.5 bg-stone-50 rounded-xl border border-stone-300 text-xs text-stone-900 focus:ring-2 focus:ring-[#b8860b]"
          />
        </div>
      </div>

      {/* Floating Save Bar */}
      <div className="sticky bottom-6 z-30 bg-stone-900 text-white p-4 rounded-2xl shadow-2xl border border-stone-700 flex items-center justify-between">
        <div className="text-xs text-stone-300">
          Remember to save changes so they reflect on the live storefront.
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-[#b8860b] hover:bg-[#996515] active:scale-98 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>
    </form>
  );
};
