import React, { useState } from 'react';
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
  Save
} from 'lucide-react';
import { WebsiteContent } from '../../types/websiteContent';

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

  const handleChange = (field: keyof WebsiteContent, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setSavedSuccess(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveContent(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
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
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00473e]/10 text-[#00473e] font-bold text-[10px] uppercase tracking-wider mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Storefront Copywriting &amp; Descriptions</span>
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
