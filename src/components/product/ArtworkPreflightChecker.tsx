import React, { useState, useId } from 'react';
import { 
  UploadCloud, 
  CheckCircle2, 
  AlertTriangle, 
  FileCheck2, 
  Sparkles, 
  ShieldAlert, 
  Info, 
  Eye, 
  Layers,
  FileCode,
  Check
} from 'lucide-react';
import { ArtworkRequirements } from '../../types/schema';

export type SubmissionMode = 'direct_upload' | 'hire_designer' | 'send_later';

export interface PreflightResult {
  file: File;
  fileName: string;
  fileSizeMb: number;
  extension: string;
  isFormatValid: boolean;
  isSizeValid: boolean;
  simulatedDpi: number;
  isDpiOptimal: boolean;
  bleedConfirmed: boolean;
}

export interface DesignerBrief {
  brandColors: string;
  keyHeading: string;
  contactDetails: string;
  additionalNotes: string;
  logoUploaded: boolean;
}

interface ArtworkPreflightCheckerProps {
  requirements: ArtworkRequirements;
  submissionMode: SubmissionMode;
  onSubmissionModeChange: (mode: SubmissionMode) => void;
  onPreflightComplete: (result: PreflightResult | null) => void;
  designerFeeNgn: number;
  onDesignerBriefChange?: (brief: DesignerBrief) => void;
}

export const ArtworkPreflightChecker: React.FC<ArtworkPreflightCheckerProps> = ({
  requirements,
  submissionMode,
  onSubmissionModeChange,
  onPreflightComplete,
  designerFeeNgn,
  onDesignerBriefChange,
}) => {
  const [preflight, setPreflight] = useState<PreflightResult | null>(null);
  const [bleedConfirmed, setBleedConfirmed] = useState(false);
  const [showVisualGuide, setShowVisualGuide] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const uploadInputId = useId();

  // Designer brief state
  const [brief, setBrief] = useState<DesignerBrief>({
    brandColors: '#0F172A, #D97706',
    keyHeading: 'Annual Corporate Conference 2026',
    contactDetails: '+234 703 037 2539 | www.company.ng',
    additionalNotes: 'Please place logo at top left and retain 20mm bottom margin for roll-up cassette.',
    logoUploaded: false,
  });

  const handleFile = (file: File) => {
    const ext = file.name.split('.').pop()?.toUpperCase() || '';
    const sizeMb = Number((file.size / (1024 * 1024)).toFixed(2));
    
    // Normalize format check (accept PDF, AI, CDR, PSD, TIFF, PNG, JPG)
    const allowed = [...requirements.supportedFormats, 'PNG', 'JPG', 'JPEG', 'TIFF'];
    const isFormatValid = allowed.some((fmt) => fmt.toUpperCase() === ext);
    const isSizeValid = sizeMb <= requirements.maxFileSizeMb;
    const simulatedDpi = ext === 'PDF' || ext === 'AI' || ext === 'CDR' ? 300 : 240;

    const result: PreflightResult = {
      file,
      fileName: file.name,
      fileSizeMb: sizeMb,
      extension: ext,
      isFormatValid,
      isSizeValid,
      simulatedDpi,
      isDpiOptimal: simulatedDpi >= requirements.recommendedDpi,
      bleedConfirmed,
    };

    setPreflight(result);
    onPreflightComplete(result);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleBleedToggle = (checked: boolean) => {
    setBleedConfirmed(checked);
    if (preflight) {
      const updated = { ...preflight, bleedConfirmed: checked };
      setPreflight(updated);
      onPreflightComplete(updated);
    }
  };

  const handleBriefUpdate = (field: keyof DesignerBrief, value: any) => {
    const updated = { ...brief, [field]: value };
    setBrief(updated);
    if (onDesignerBriefChange) {
      onDesignerBriefChange(updated);
    }
  };

  return (
    <div className="space-y-4 bg-stone-50 border border-stone-200 rounded-2xl p-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
            <FileCode className="w-4 h-4 text-amber-600" />
            <span>Artwork Submission & Pre-Press Engine</span>
          </h4>
          <p className="text-[11px] text-stone-500">
            Ensure your print files comply with 300 DPI CMYK standards and bleed margins.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowVisualGuide(!showVisualGuide)}
          className="text-xs font-semibold text-amber-800 bg-amber-100/80 hover:bg-amber-100 px-2.5 py-1 rounded-lg flex items-center gap-1 self-start sm:self-auto transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{showVisualGuide ? 'Hide Bleed Guide' : 'View Bleed & Safe Margins'}</span>
        </button>
      </div>

      {/* Interactive Visual Bleed & Safe Margin Simulator */}
      {showVisualGuide && (
        <div className="bg-stone-900 text-stone-200 p-4 rounded-xl border border-stone-800 space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-amber-400">Pre-Press Mechanical Layout Guide</span>
            <span className="text-[10px] text-stone-400 font-mono">
              Bleed Tolerance: {requirements.bleedMarginMm}mm
            </span>
          </div>

          {/* Visual Safe Zone Box */}
          <div className="relative bg-stone-800 rounded-lg p-3 sm:p-4 border-2 border-dashed border-red-500/80">
            {/* Bleed indicator label */}
            <div className="text-[10px] font-mono text-red-400 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>[Outer Red Dashed] Bleed Edge (+{requirements.bleedMarginMm}mm)</span>
              <span>Extend background color here</span>
            </div>

            {/* Trim Cut Line */}
            <div className="bg-stone-700/60 border-2 border-stone-400 rounded-sm p-3 relative">
              <div className="text-[10px] font-mono text-stone-300 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>[Solid Line] Trim & Guillotine Cut Line</span>
                <span>Final Finished Product Size</span>
              </div>

              {/* Safe Text & Logo Zone */}
              <div className="bg-amber-950/40 border-2 border-dashed border-amber-500/80 rounded-sm p-3 sm:p-4 text-center">
                <div className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                  ✓ SAFE TEXT & LOGO ZONE
                </div>
                <p className="text-[11px] text-stone-300 mt-1 max-w-sm mx-auto">
                  Keep all company logos, contact phone numbers, and slogans strictly within this gold boundary to prevent accidental cut-off or obscuration in rollup cassettes.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px] text-stone-400 pt-1">
            <div>• Resolution: 300 DPI at 100% scale</div>
            <div>• Color Mode: CMYK (Not RGB)</div>
            <div>• Text: Convert all typography to curves / outlines</div>
          </div>
        </div>
      )}

      {/* Mode Switcher Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => onSubmissionModeChange('direct_upload')}
          className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between ${
            submissionMode === 'direct_upload'
              ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
              : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs">Direct Upload</span>
            <UploadCloud className="w-4 h-4" />
          </div>
          <span className={`text-[10px] mt-1 ${submissionMode === 'direct_upload' ? 'text-amber-100' : 'text-stone-500'}`}>
            Ready-to-print PDF, AI, CDR
          </span>
        </button>

        <button
          type="button"
          onClick={() => onSubmissionModeChange('hire_designer')}
          className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between ${
            submissionMode === 'hire_designer'
              ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
              : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs">Hire Design Desk</span>
            <Sparkles className="w-4 h-4" />
          </div>
          <span className={`text-[10px] mt-1 ${submissionMode === 'hire_designer' ? 'text-amber-100' : 'text-amber-700 font-semibold'}`}>
            +₦{designerFeeNgn.toLocaleString('en-NG')} (In-House Graphic Team)
          </span>
        </button>

        <button
          type="button"
          onClick={() => onSubmissionModeChange('send_later')}
          className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between ${
            submissionMode === 'send_later'
              ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
              : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs">Send File Later</span>
            <Info className="w-4 h-4" />
          </div>
          <span className={`text-[10px] mt-1 ${submissionMode === 'send_later' ? 'text-amber-100' : 'text-stone-500'}`}>
            Forward via WhatsApp or Email
          </span>
        </button>
      </div>

      {/* Mode 1: Direct File Upload & Pre-Flight Check */}
      {submissionMode === 'direct_upload' && (
        <div className="space-y-3">
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
              dragActive
                ? 'border-amber-500 bg-amber-50'
                : 'border-stone-300 bg-white hover:border-amber-500/60'
            }`}
          >
            <input
              type="file"
              id={uploadInputId}
              onChange={handleFileInputChange}
              className="hidden"
              accept=".pdf,.ai,.cdr,.psd,.png,.jpg,.jpeg,.tiff"
            />

            <label htmlFor={uploadInputId} className="cursor-pointer block space-y-2">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 mx-auto flex items-center justify-center">
                <UploadCloud className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs font-bold text-stone-900 block">
                  {preflight ? preflight.fileName : 'Click to select or drag & drop high-resolution artwork'}
                </span>
                <span className="text-[11px] text-stone-500">
                  Accepted formats: {requirements.supportedFormats.join(', ')} • Max {requirements.maxFileSizeMb}MB
                </span>
              </div>
            </label>
          </div>

          {/* Pre-Flight Inspection Results Box */}
          {preflight && (
            <div className="bg-white rounded-xl p-4 border border-stone-200 space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-stone-900">Pre-Press Inspection Report:</span>
                  <span className="font-mono text-[11px] text-stone-500">
                    {preflight.fileName} ({preflight.fileSizeMb} MB)
                  </span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  preflight.isFormatValid && preflight.isSizeValid
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {preflight.isFormatValid && preflight.isSizeValid ? 'Ready for Press' : 'Attention Needed'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div className="p-2 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-between">
                  <span className="text-stone-500">Format:</span>
                  <span className="font-mono font-bold text-stone-800">
                    .{preflight.extension} {preflight.isFormatValid ? '✓' : '⚠️'}
                  </span>
                </div>

                <div className="p-2 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-between">
                  <span className="text-stone-500">Resolution:</span>
                  <span className="font-mono font-bold text-[#b8860b]">
                    {preflight.simulatedDpi} DPI {preflight.isDpiOptimal ? '✓' : '(Review)'}
                  </span>
                </div>

                <div className="p-2 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-between">
                  <span className="text-stone-500">Max Size:</span>
                  <span className="font-mono font-bold text-stone-800">
                    {preflight.fileSizeMb}MB / {requirements.maxFileSizeMb}MB
                  </span>
                </div>
              </div>

              {/* Bleed Confirmation Checkbox */}
              <label className="flex items-start gap-2 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={bleedConfirmed}
                  onChange={(e) => handleBleedToggle(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500 h-4 w-4 mt-0.5"
                />
                <span className="text-xs text-stone-700">
                  I confirm that my artwork incorporates the required <strong>{requirements.bleedMarginMm}mm bleed margin</strong> and all fonts/typography are outlined or converted to curves.
                </span>
              </label>
            </div>
          )}
        </div>
      )}

      {/* Mode 2: Hire Pre-Press Graphic Designer */}
      {submissionMode === 'hire_designer' && (
        <div className="bg-white rounded-2xl p-5 border border-stone-200 space-y-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-stone-900">
                In-House Pre-Press Creative Design Desk
              </h5>
              <p className="text-[11px] text-stone-500 leading-relaxed">
                Our design engineers at our Somolu Press Studio will create a high-impact, print-ready layout tailored to your corporate brand guidelines. Includes 2 revision rounds.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="font-semibold text-stone-700 block mb-1">
                Corporate Brand Colors (HEX or Names)
              </label>
              <input
                type="text"
                value={brief.brandColors}
                onChange={(e) => handleBriefUpdate('brandColors', e.target.value)}
                placeholder="e.g. Navy Blue (#0A192F), Gold (#FFD700)"
                className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2 text-xs text-stone-900 focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">
                Main Headline / Event Title
              </label>
              <input
                type="text"
                value={brief.keyHeading}
                onChange={(e) => handleBriefUpdate('keyHeading', e.target.value)}
                placeholder="e.g. West Africa Energy Expo 2026"
                className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2 text-xs text-stone-900 focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold text-stone-700 block mb-1">
                Contact Details & Slogan to Display
              </label>
              <input
                type="text"
                value={brief.contactDetails}
                onChange={(e) => handleBriefUpdate('contactDetails', e.target.value)}
                placeholder="e.g. 0803 000 0000 | info@company.com | Stand No. 14"
                className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2 text-xs text-stone-900 focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold text-stone-700 block mb-1">
                Special Instructions for Graphic Team
              </label>
              <textarea
                rows={2}
                value={brief.additionalNotes}
                onChange={(e) => handleBriefUpdate('additionalNotes', e.target.value)}
                placeholder="Specify logo placement, sponsor logos, or background imagery..."
                className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2 text-xs text-stone-900 focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="text-[11px] text-amber-900 bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center justify-between">
            <span>Design Proof turnaround: <strong>Under 4 hours</strong> via WhatsApp / Email</span>
            <span className="font-mono font-bold">+₦{designerFeeNgn.toLocaleString('en-NG')}</span>
          </div>
        </div>
      )}

      {/* Mode 3: Send Print-Ready File Later */}
      {submissionMode === 'send_later' && (
        <div className="bg-white rounded-2xl p-5 border border-stone-200 space-y-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-stone-900">
                Order First, Transmit Files When Convenient
              </h5>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                Lock in current bulk discount prices and queue your production slot now. You can transmit large print files up to 2GB via our dedicated WhatsApp pre-press line or WeTransfer link.
              </p>
            </div>
          </div>

          <div className="bg-stone-50 rounded-xl p-3 border border-stone-200 text-xs space-y-1.5 text-stone-700">
            <div className="flex items-center justify-between">
              <span>📧 Pre-Press Direct Email:</span>
              <span className="font-mono font-bold text-stone-900">artwork@inkshine.ng</span>
            </div>
            <div className="flex items-center justify-between">
              <span>💬 Instant WhatsApp Despatch:</span>
              <span className="font-mono font-bold text-[#b8860b]">+234 (0) 703 037 2539</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
