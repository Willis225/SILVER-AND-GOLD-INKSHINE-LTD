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
    <div className="space-y-4 bg-[#121217] border border-white/10 rounded-2xl p-5 shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
            <FileCode className="w-4 h-4 text-[#f5be38]" />
            <span>Artwork Submission &amp; Pre-Press Engine</span>
          </h4>
          <p className="text-[11px] text-stone-400">
            Ensure your print files comply with 300 DPI CMYK standards and bleed margins.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowVisualGuide(!showVisualGuide)}
          className="text-xs font-bold text-[#f5be38] bg-[#f5be38]/10 hover:bg-[#f5be38]/20 border border-[#f5be38]/30 px-3 py-1.5 rounded-lg flex items-center gap-1.5 self-start sm:self-auto transition-colors cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{showVisualGuide ? 'Hide Bleed Guide' : 'View Bleed & Safe Margins'}</span>
        </button>
      </div>

      {/* Interactive Visual Bleed & Safe Margin Simulator */}
      {showVisualGuide && (
        <div className="bg-[#08080a] text-stone-200 p-4 rounded-xl border border-white/10 space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#f5be38]">Pre-Press Mechanical Layout Guide</span>
            <span className="text-[10px] text-stone-400 font-mono">
              Bleed Tolerance: {requirements.bleedMarginMm}mm
            </span>
          </div>

          {/* Visual Safe Zone Box */}
          <div className="relative bg-[#121217] rounded-lg p-3 sm:p-4 border-2 border-dashed border-red-500/80">
            {/* Bleed indicator label */}
            <div className="text-[10px] font-mono text-red-400 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>[Outer Red Dashed] Bleed Edge (+{requirements.bleedMarginMm}mm)</span>
              <span>Extend background color here</span>
            </div>

            {/* Trim Cut Line */}
            <div className="bg-black/60 border-2 border-stone-600 rounded-sm p-3 relative">
              <div className="text-[10px] font-mono text-stone-300 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>[Solid Line] Trim &amp; Guillotine Cut Line</span>
                <span>Final Finished Product Size</span>
              </div>

              {/* Safe Text & Logo Zone */}
              <div className="bg-[#f5be38]/10 border-2 border-dashed border-[#f5be38]/80 rounded-sm p-3 sm:p-4 text-center">
                <div className="text-[10px] font-mono text-[#f5be38] font-bold uppercase tracking-wider">
                  ✓ SAFE TEXT &amp; LOGO ZONE
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
          className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between cursor-pointer ${
            submissionMode === 'direct_upload'
              ? 'bg-[#f5be38] text-black border-[#f5be38] shadow-md font-bold'
              : 'bg-[#181822] text-stone-300 border-white/10 hover:bg-white/5'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs">Direct Upload</span>
            <UploadCloud className="w-4 h-4" />
          </div>
          <span className={`text-[10px] mt-1 ${submissionMode === 'direct_upload' ? 'text-black/80 font-semibold' : 'text-stone-400'}`}>
            Ready-to-print PDF, AI, CDR
          </span>
        </button>

        <button
          type="button"
          onClick={() => onSubmissionModeChange('hire_designer')}
          className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between cursor-pointer ${
            submissionMode === 'hire_designer'
              ? 'bg-[#f5be38] text-black border-[#f5be38] shadow-md font-bold'
              : 'bg-[#181822] text-stone-300 border-white/10 hover:bg-white/5'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs">Hire Design Desk</span>
            <Sparkles className="w-4 h-4" />
          </div>
          <span className={`text-[10px] mt-1 ${submissionMode === 'hire_designer' ? 'text-black/80 font-bold' : 'text-[#f5be38] font-bold'}`}>
            Design Assistance Upon Request
          </span>
        </button>

        <button
          type="button"
          onClick={() => onSubmissionModeChange('send_later')}
          className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between cursor-pointer ${
            submissionMode === 'send_later'
              ? 'bg-[#f5be38] text-black border-[#f5be38] shadow-md font-bold'
              : 'bg-[#181822] text-stone-300 border-white/10 hover:bg-white/5'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs">Send File Later</span>
            <Info className="w-4 h-4" />
          </div>
          <span className={`text-[10px] mt-1 ${submissionMode === 'send_later' ? 'text-black/80 font-semibold' : 'text-stone-400'}`}>
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
            className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer ${
              dragActive
                ? 'border-[#f5be38] bg-[#f5be38]/10'
                : 'border-white/15 bg-[#181822] hover:border-[#f5be38]/50'
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
              <div className="w-12 h-12 rounded-full bg-[#f5be38]/20 text-[#f5be38] mx-auto flex items-center justify-center border border-[#f5be38]/30">
                <UploadCloud className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs font-bold text-white block">
                  {preflight ? preflight.fileName : 'Click to select or drag & drop high-resolution artwork'}
                </span>
                <span className="text-[11px] text-stone-400">
                  Accepted formats: {requirements.supportedFormats.join(', ')} • Max {requirements.maxFileSizeMb}MB
                </span>
              </div>
            </label>
          </div>

          {/* Pre-Flight Inspection Results Box */}
          {preflight && (
            <div className="bg-[#181822] rounded-xl p-4 border border-white/10 space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">Pre-Press Inspection Report:</span>
                  <span className="font-mono text-[11px] text-stone-400">
                    {preflight.fileName} ({preflight.fileSizeMb} MB)
                  </span>
                </div>
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-black ${
                  preflight.isFormatValid && preflight.isSizeValid
                    ? 'bg-[#f5be38] text-black shadow-xs'
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  {preflight.isFormatValid && preflight.isSizeValid ? 'Ready for Press' : 'Attention Needed'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-[#121217] border border-white/10 flex items-center justify-between">
                  <span className="text-stone-400">Format:</span>
                  <span className="font-mono font-bold text-white">
                    .{preflight.extension} {preflight.isFormatValid ? '✓' : '⚠️'}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-[#121217] border border-white/10 flex items-center justify-between">
                  <span className="text-stone-400">Resolution:</span>
                  <span className="font-mono font-bold text-[#f5be38]">
                    {preflight.simulatedDpi} DPI {preflight.isDpiOptimal ? '✓' : '(Review)'}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-[#121217] border border-white/10 flex items-center justify-between">
                  <span className="text-stone-400">Max Size:</span>
                  <span className="font-mono font-bold text-white">
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
                  className="rounded accent-[#f5be38] h-4 w-4 mt-0.5 cursor-pointer"
                />
                <span className="text-xs text-stone-300">
                  I confirm that my artwork incorporates the required <strong className="text-white">{requirements.bleedMarginMm}mm bleed margin</strong> and all fonts/typography are outlined or converted to curves.
                </span>
              </label>
            </div>
          )}
        </div>
      )}

      {/* Mode 2: Hire Pre-Press Graphic Designer */}
      {submissionMode === 'hire_designer' && (
        <div className="bg-[#181822] rounded-2xl p-5 border border-white/10 space-y-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-[#f5be38]/20 text-[#f5be38] shrink-0 border border-[#f5be38]/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white">
                In-House Pre-Press Creative Design Desk
              </h5>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                Our design engineers at our Somolu Press Studio will create a high-impact, print-ready layout tailored to your corporate brand guidelines. Includes 2 revision rounds.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="font-semibold text-stone-300 block mb-1">
                Corporate Brand Colors (HEX or Names)
              </label>
              <input
                type="text"
                value={brief.brandColors}
                onChange={(e) => handleBriefUpdate('brandColors', e.target.value)}
                placeholder="e.g. Navy Blue (#0A192F), Gold (#FFD700)"
                className="w-full bg-[#121217] border border-white/15 rounded-xl p-2.5 text-xs text-white placeholder:text-stone-500 focus:outline-hidden focus:border-[#f5be38]"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-300 block mb-1">
                Main Headline / Event Title
              </label>
              <input
                type="text"
                value={brief.keyHeading}
                onChange={(e) => handleBriefUpdate('keyHeading', e.target.value)}
                placeholder="e.g. West Africa Energy Expo 2026"
                className="w-full bg-[#121217] border border-white/15 rounded-xl p-2.5 text-xs text-white placeholder:text-stone-500 focus:outline-hidden focus:border-[#f5be38]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold text-stone-300 block mb-1">
                Contact Details &amp; Slogan to Display
              </label>
              <input
                type="text"
                value={brief.contactDetails}
                onChange={(e) => handleBriefUpdate('contactDetails', e.target.value)}
                placeholder="e.g. 0803 000 0000 | info@company.com | Stand No. 14"
                className="w-full bg-[#121217] border border-white/15 rounded-xl p-2.5 text-xs text-white placeholder:text-stone-500 focus:outline-hidden focus:border-[#f5be38]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold text-stone-300 block mb-1">
                Special Instructions for Graphic Team
              </label>
              <textarea
                rows={2}
                value={brief.additionalNotes}
                onChange={(e) => handleBriefUpdate('additionalNotes', e.target.value)}
                placeholder="Specify logo placement, sponsor logos, or background imagery..."
                className="w-full bg-[#121217] border border-white/15 rounded-xl p-2.5 text-xs text-white placeholder:text-stone-500 focus:outline-hidden focus:border-[#f5be38]"
              />
            </div>
          </div>

          <div className="text-[11px] text-[#f5be38] bg-[#f5be38]/10 border border-[#f5be38]/30 rounded-xl p-3 flex items-center justify-between font-bold">
            <span>Design Proof turnaround: <strong className="text-white">Under 4 hours</strong> via WhatsApp / Email</span>
            <span className="text-xs font-black text-white uppercase tracking-wider">Price on Request</span>
          </div>
        </div>
      )}

      {/* Mode 3: Send Print-Ready File Later */}
      {submissionMode === 'send_later' && (
        <div className="bg-[#181822] rounded-2xl p-5 border border-white/10 space-y-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-[#f5be38]/20 text-[#f5be38] shrink-0 border border-[#f5be38]/30">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white">
                Order First, Transmit Files When Convenient
              </h5>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                Lock in current bulk discount prices and queue your production slot now. You can transmit large print files up to 2GB via our dedicated WhatsApp pre-press line or WeTransfer link.
              </p>
            </div>
          </div>

          <div className="bg-[#121217] rounded-xl p-3 border border-white/10 text-xs space-y-2 text-stone-300">
            <div className="flex items-center justify-between">
              <span>📧 Pre-Press Direct Email:</span>
              <span className="font-mono font-bold text-white">artwork@inkshine.ng</span>
            </div>
            <div className="flex items-center justify-between">
              <span>💬 Instant WhatsApp Despatch:</span>
              <span className="font-mono font-bold text-[#f5be38]">+234 (0) 703 037 2539</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
