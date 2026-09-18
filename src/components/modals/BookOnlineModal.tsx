import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  Phone, 
  MapPin, 
  User, 
  FileText,
  ShieldCheck,
  Download,
  Share2,
  Copy,
  Check,
  ExternalLink,
  Edit3,
  Layers,
  Zap,
  Printer,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Building2,
  HelpCircle
} from 'lucide-react';

interface BookOnlineModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

const SERVICE_CATEGORIES = [
  { id: 'banners', label: 'Banners & Flex', example: 'Large Format Flex Banner (10x4 ft)' },
  { id: 'signage', label: '3D Signage', example: '3D Backlight Channel Letter Sign' },
  { id: 'murals', label: 'Art & Murals', example: 'Textured Canvas Painting (4x3 ft)' },
  { id: 'stands', label: 'Rollup Stands', example: 'Luxury Teardrop / Roll-up Stand' },
  { id: 'awards', label: 'Award Plaques', example: 'Crystal & Cast Bronze Award Plaque' },
  { id: 'packaging', label: 'Packaging', example: 'Rigid Gift Box with Gold Foil' },
  { id: 'stationery', label: 'Stationery', example: '600gsm Triplex Gold Foil Cards' },
  { id: 'custom', label: 'Custom Job', example: 'Custom Architectural / Event Print' },
];

const SERVICE_OPTIONS = [
  'Large Format Printing & Banners',
  '3D Backlight & Channel Letter Signboards',
  'Roll-Up & Feather Flag Stands',
  'Canvas Art, Paintings & Wall Murals',
  'Custom Acrylic & Wooden Award Plaques',
  'Luxury Business Cards & Stationery',
  'Branded Packaging Boxes & Labels',
  'Vehicle & Fleet Branding',
  'Corporate Promotional Gift Items',
];

const QUICK_SUGGESTIONS = [
  'Large Format Banners',
  '3D Backlight Signboard',
  'Canvas Painting & Mural',
  'Roll-Up Banner Stand',
  'Custom Award Plaque',
  'Luxury Packaging Box',
  'Gold Foil Business Cards'
];

export const BookOnlineModal: React.FC<BookOnlineModalProps> = ({
  isOpen,
  onClose,
  preselectedService = '',
}) => {
  // Wizard step state: 1 = Service & Specs, 2 = Contact & Confirmation
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  // Form states
  const [service, setService] = useState(preselectedService || 'Large Format Printing & Banners');
  const [urgency, setUrgency] = useState<'24hr' | 'standard' | 'flexible'>('24hr');
  const [quantity, setQuantity] = useState('1');
  const [dimensions, setDimensions] = useState('');
  const [notes, setNotes] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Yenagoa, Bayelsa State');

  // Submission & Slip states
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [orderImageUrl, setOrderImageUrl] = useState<string | null>(null);
  const [orderImageBlob, setOrderImageBlob] = useState<Blob | null>(null);
  const [copiedImage, setCopiedImage] = useState(false);
  const [isGeneratingSlip, setIsGeneratingSlip] = useState(false);
  const [canWebShareFile, setCanWebShareFile] = useState(false);

  // Sync preselectedService
  useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
    }
  }, [preselectedService, isOpen]);

  // Check Web Share file support
  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'canShare' in navigator && 'share' in navigator) {
      setCanWebShareFile(true);
    }
  }, []);

  // Compute estimated delivery text
  const getEstimatedCompletion = () => {
    const now = new Date();
    if (urgency === '24hr') {
      const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      return `Tomorrow by ${tomorrow.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (urgency === 'standard') {
      const inTwoDays = new Date(now.getTime() + 48 * 60 * 60 * 1000);
      return `${inTwoDays.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}`;
    }
    return 'Project Schedule / As Agreed';
  };

  if (!isOpen) return null;

  // Helper to wrap text nicely on canvas
  const renderWrappedText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ): number => {
    const words = text.split(' ');
    let line = '';
    let currentY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line.trim(), x, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim(), x, currentY);
    return currentY + lineHeight;
  };

  // Generate an official digital Production Order Placed image
  const generateSlipImage = (refCode: string, dateStr: string): Promise<{ dataUrl: string; blob: Blob }> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 1000;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        resolve({ dataUrl: '', blob: new Blob() });
        return;
      }

      // 1. Background
      const bgGrad = ctx.createLinearGradient(0, 0, 800, 1000);
      bgGrad.addColorStop(0, '#090a0f');
      bgGrad.addColorStop(0.5, '#12141d');
      bgGrad.addColorStop(1, '#06070a');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 800, 1000);

      // Ambient gold glow
      const glowGrad = ctx.createRadialGradient(720, 90, 10, 720, 90, 300);
      glowGrad.addColorStop(0, 'rgba(212, 175, 55, 0.22)');
      glowGrad.addColorStop(1, 'rgba(212, 175, 55, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, 800, 450);

      // 2. Gold Border Frame
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 3;
      ctx.strokeRect(20, 20, 760, 960);

      ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)';
      ctx.lineWidth = 1;
      ctx.strokeRect(26, 26, 748, 948);

      // Corner gold squares
      const drawCorner = (x: number, y: number) => {
        ctx.fillStyle = '#d4af37';
        ctx.fillRect(x - 5, y - 5, 10, 10);
      };
      drawCorner(20, 20);
      drawCorner(780, 20);
      drawCorner(20, 980);
      drawCorner(780, 980);

      // 3. Header: Brand & Registration
      ctx.fillStyle = '#dfbc5e';
      ctx.font = 'bold 30px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('SILVER & GOLD INKSHINE LTD', 400, 78);

      ctx.fillStyle = '#a8a29e';
      ctx.font = '600 13px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText('RC 9350634 • ULTRA-FINISH PRINTING & BRANDING FACTORY', 400, 104);

      // Divider
      ctx.strokeStyle = 'rgba(223, 188, 94, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(55, 124);
      ctx.lineTo(745, 124);
      ctx.stroke();

      // Official Badge Banner
      ctx.fillStyle = '#221c0e';
      ctx.beginPath();
      ctx.roundRect(200, 138, 400, 38, 19);
      ctx.fill();
      ctx.strokeStyle = '#dfbc5e';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#ffd700';
      ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('★ OFFICIAL PRODUCTION JOB TICKET ★', 400, 162);

      // 4. Booking Reference Bar
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, monospace';
      ctx.fillText(`JOB REF: ${refCode}`, 400, 212);

      ctx.fillStyle = '#9ca3af';
      ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText(`Date Logged: ${dateStr} • Status: RESERVED FOR PRODUCTION`, 400, 234);

      // 5. Order Table Section
      const startY = 265;
      ctx.fillStyle = '#141722';
      ctx.beginPath();
      ctx.roundRect(45, startY, 710, 580, 16);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Field items
      const urgencyLabel = urgency === '24hr' 
        ? '⚡ 24-Hour Priority Express Turnaround' 
        : urgency === 'standard' 
        ? 'Standard Production (2-3 Business Days)' 
        : 'Project / Flexible Timeline';

      const fields = [
        { label: 'CLIENT NAME', value: fullName || 'Valued Customer' },
        { label: 'WHATSAPP NUMBER', value: phone || 'Provided on chat' },
        { label: 'REQUIRED SERVICE / ITEM', value: service },
        { label: 'PRODUCTION SPEED', value: urgencyLabel },
        { label: 'ESTIMATED READINESS', value: getEstimatedCompletion() },
        { label: 'QUANTITY / UNITS', value: `${quantity} ${Number(quantity) > 1 ? 'copies / units' : 'copy / unit'}` },
        { label: 'DIMENSIONS / SPECS', value: dimensions || 'Standard factory spec / to be confirmed on proof' },
        { label: 'DELIVERY / PICKUP', value: location || 'Swali, Yenagoa Workshop' },
        { label: 'ARTWORK / FINISHING', value: notes || 'None specified. Direct consultation requested via WhatsApp.' },
      ];

      let rowY = startY + 36;
      ctx.textAlign = 'left';

      fields.forEach((field, i) => {
        // Label
        ctx.fillStyle = '#dfbc5e';
        ctx.font = 'bold 12px -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.fillText(`• ${field.label}`, 70, rowY);

        // Value
        ctx.fillStyle = field.label === 'REQUIRED SERVICE / ITEM' ? '#ffffff' : '#f3f4f6';
        ctx.font = field.label === 'REQUIRED SERVICE / ITEM' 
          ? 'bold 15px -apple-system, BlinkMacSystemFont, sans-serif' 
          : '14px -apple-system, BlinkMacSystemFont, sans-serif';
        
        rowY = renderWrappedText(ctx, field.value, 70, rowY + 20, 660, 20);
        rowY += 10;

        // Divider except last
        if (i < fields.length - 1 && rowY < startY + 560) {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
          ctx.beginPath();
          ctx.moveTo(70, rowY - 3);
          ctx.lineTo(730, rowY - 3);
          ctx.stroke();
        }
      });

      // 6. Security Seal & Production Stamp
      ctx.save();
      ctx.translate(635, 765);
      ctx.rotate(-0.12);
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.roundRect(-80, -32, 160, 64, 10);
      ctx.stroke();
      ctx.fillStyle = '#22c55e';
      ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('SLOT CONFIRMED', 0, -8);
      ctx.font = '10px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText('INKSHINE FACTORY', 0, 10);
      ctx.fillText('DIRECT DISPATCH', 0, 23);
      ctx.restore();

      // 7. Footer Information
      ctx.textAlign = 'center';
      ctx.fillStyle = '#dfbc5e';
      ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText('Silver & Gold Inkshine Ltd • Swali, Yenagoa, Bayelsa State', 400, 880);

      ctx.fillStyle = '#9ca3af';
      ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText('WhatsApp Hotline: +234 703 037 2539 • High Precision Heidelberg & Roland Press', 400, 902);

      // Simulated Job Ticket Barcode
      ctx.fillStyle = '#ffffff';
      const barcodeY = 925;
      for (let b = 180; b < 620; b += 6) {
        const barWidth = (b % 4 === 0) ? 4 : (b % 3 === 0) ? 2 : 1;
        ctx.fillRect(b, barcodeY, barWidth, 22);
      }

      const dataUrl = canvas.toDataURL('image/png');
      canvas.toBlob((blob) => {
        resolve({ dataUrl, blob: blob || new Blob() });
      }, 'image/png');
    });
  };

  // Build the complete WhatsApp message text containing EVERYTHING filled out
  const buildWhatsAppMessage = (refCode: string, dateStr: string): string => {
    const urgencyText = urgency === '24hr' 
      ? '⚡ 24-Hour Express Production' 
      : urgency === 'standard' 
      ? 'Standard 2-3 Days' 
      : 'Project / Flexible Schedule';

    return (
      `*NEW PRODUCTION ORDER PLACED* 🛎️\n` +
      `*Silver & Gold Inkshine Ltd (RC 9350634)*\n` +
      `────────────────────────\n` +
      `📋 *Job Reference:* ${refCode}\n` +
      `👤 *Client Name:* ${fullName}\n` +
      `📞 *Client Phone:* ${phone}\n` +
      `🛠️ *Required Service / Item:* ${service}\n` +
      `⚡ *Timeline:* ${urgencyText} (${getEstimatedCompletion()})\n` +
      `🔢 *Quantity:* ${quantity} ${Number(quantity) > 1 ? 'copies / units' : 'copy / unit'}\n` +
      `📐 *Dimensions / Specs:* ${dimensions || 'Standard Factory Spec / To discuss'}\n` +
      `📍 *Location:* ${location}\n` +
      `📝 *Finishing / Artwork Notes:* ${notes || 'None specified'}\n` +
      `📅 *Date Logged:* ${dateStr}\n` +
      `────────────────────────\n\n` +
      `Hello Silver & Gold Inkshine! I just completed this booking on your portal. ` +
      `I am ready for review, proofing, and final quotation.`
    );
  };

  // Primary Action: Submit, Generate Slip Image, and send directly to WhatsApp
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!service.trim() || !fullName.trim() || !phone.trim()) return;

    setIsGeneratingSlip(true);
    const refCode = `SG-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    }) + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setBookingRef(refCode);

    // 1. Generate digital order slip image
    const { dataUrl, blob } = await generateSlipImage(refCode, dateStr);
    setOrderImageUrl(dataUrl);
    setOrderImageBlob(blob);

    // 2. Try copying image to clipboard for instant pasting (Ctrl+V) into WhatsApp
    if (typeof navigator !== 'undefined' && navigator.clipboard && typeof ClipboardItem !== 'undefined' && blob) {
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        setCopiedImage(true);
      } catch {
        // Fallback gracefully if clipboard permission restricted
      }
    }

    // 3. Immediately open WhatsApp with ALL details filled out
    const message = buildWhatsAppMessage(refCode, dateStr);
    const whatsappUrl = `https://wa.me/2347030372539?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    setIsGeneratingSlip(false);
    setIsSubmitted(true);
  };

  // One-click download order placed image
  const handleDownloadImage = () => {
    if (!orderImageUrl) return;
    const link = document.createElement('a');
    link.href = orderImageUrl;
    link.download = `SilverGold_Order_${bookingRef || 'Slip'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy image to clipboard manually
  const handleCopyImageToClipboard = async () => {
    if (!orderImageBlob) return;
    try {
      if (navigator.clipboard && typeof ClipboardItem !== 'undefined') {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': orderImageBlob })
        ]);
        setCopiedImage(true);
        setTimeout(() => setCopiedImage(false), 3000);
      }
    } catch {
      handleDownloadImage();
    }
  };

  // Web Share image directly to WhatsApp or apps
  const handleShareSlipImage = async () => {
    if (!orderImageBlob) return;
    try {
      const file = new File([orderImageBlob], `SilverGold_Order_${bookingRef}.png`, { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `Silver & Gold Inkshine Order - ${bookingRef}`,
          text: `Here is my production order slip for ${service} (${bookingRef}).`,
        });
      } else {
        handleDownloadImage();
      }
    } catch {
      // User cancelled
    }
  };

  const handleOpenWhatsAppAgain = () => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB') + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const message = buildWhatsAppMessage(bookingRef, dateStr);
    window.open(`https://wa.me/2347030372539?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setCurrentStep(1);
    setBookingRef('');
    setOrderImageUrl(null);
    setOrderImageBlob(null);
    setCopiedImage(false);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 xs:p-4 sm:p-5 bg-black/60 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[94vh] flex flex-col my-auto rounded-2xl sm:rounded-3xl bg-white border border-stone-200 shadow-2xl text-stone-900 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="relative border-b border-stone-200 px-5 sm:px-7 py-4 flex items-center justify-between bg-stone-50/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-300/80 flex items-center justify-center text-amber-700 shadow-xs">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black tracking-tight text-stone-900">
                  Silver &amp; Gold Inkshine
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-extrabold tracking-wider uppercase border border-amber-300">
                  <BadgeCheck className="w-3 h-3 text-amber-700" /> RC 9350634
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-stone-500 font-medium">
                Official Factory Production Reservation &bull; Swali, Yenagoa
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 transition-all active:scale-95 cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isSubmitted ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto flex-1">
            
            {/* LEFT COLUMN: Confidence-Building Real-Time Live Job Ticket */}
            <div className="lg:col-span-5 bg-stone-50/90 border-b lg:border-b-0 lg:border-r border-stone-200 p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-[11px] font-bold">
                    <Sparkles className="w-3 h-3 text-amber-700" />
                    <span>Live Job Ticket Preview</span>
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-stone-500">
                    STATUS: DRAFTING
                  </span>
                </div>

                {/* Ticket Card Container */}
                <div className="rounded-2xl bg-white border border-amber-200/90 p-4 space-y-3.5 shadow-sm">
                  {/* Ticket Header */}
                  <div className="border-b border-stone-200 pb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-widest text-amber-700 font-black">
                        Job Ticket
                      </span>
                      <span className="text-[11px] font-mono font-bold text-stone-700">
                        SG-RESERVE
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-stone-900 mt-1 line-clamp-2">
                      {service || 'Select or enter your service'}
                    </h4>
                  </div>

                  {/* Dynamic Ticket Attributes */}
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-stone-500 font-medium">Quantity</span>
                      <span className="font-semibold text-stone-900">
                        {quantity || 1} {Number(quantity) > 1 ? 'copies / units' : 'copy / unit'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-stone-500 font-medium">Dimensions</span>
                      <span className="font-semibold text-stone-900 truncate max-w-[140px]">
                        {dimensions || 'Standard Factory Spec'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-stone-500 font-medium">Speed</span>
                      <span className="font-bold text-amber-800 flex items-center gap-1">
                        {urgency === '24hr' && <Zap className="w-3 h-3 text-amber-600" />}
                        {urgency === '24hr' ? '⚡ 24hr Express' : urgency === 'standard' ? 'Standard 2-3 Days' : 'Project Schedule'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-stone-500 font-medium">Estimated Ready</span>
                      <span className="font-semibold text-emerald-700">
                        {getEstimatedCompletion()}
                      </span>
                    </div>

                    {fullName && (
                      <div className="flex justify-between items-center pt-1 border-t border-stone-100">
                        <span className="text-stone-500 font-medium">Client</span>
                        <span className="font-semibold text-stone-900 truncate max-w-[140px]">
                          {fullName}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Trust Guarantee Badges */}
                <div className="mt-4 space-y-2 text-xs text-stone-600">
                  <div className="flex items-center gap-2 text-[11px]">
                    <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Direct Factory Price &bull; No middleman markups</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Free Proof Review via WhatsApp before printing</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px]">
                    <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>24/7 Production line ready for urgent rush orders</span>
                  </div>
                </div>
              </div>

              {/* Assistance Callout */}
              <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-500">
                <span className="flex items-center gap-1 font-medium text-stone-700">
                  <Building2 className="w-3.5 h-3.5 text-amber-600" /> Swali Workshop
                </span>
                <span className="font-mono font-semibold text-stone-800">
                  +234 703 037 2539
                </span>
              </div>
            </div>

            {/* RIGHT COLUMN: Easy-to-use Form with Clear Visual Hierarchy */}
            <div className="lg:col-span-7 bg-white p-5 sm:p-7 flex flex-col justify-between">
              
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-stone-900">
                    {currentStep === 1 ? '1. What Are We Printing?' : '2. Contact & Confirm'}
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {currentStep === 1 
                      ? 'Select or type your exact project requirements below' 
                      : 'Provide your WhatsApp details so we can dispatch your job ticket'}
                  </p>
                </div>

                {/* Step Pill Switcher */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-stone-100 border border-stone-200">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      currentStep === 1 
                        ? 'bg-amber-400 text-stone-950 shadow-xs' 
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Specs
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (service.trim()) setCurrentStep(2);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      currentStep === 2 
                        ? 'bg-amber-400 text-stone-950 shadow-xs' 
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Contact
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {currentStep === 1 ? (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    {/* Service / Item Input */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor="service-custom-input" className="block text-xs font-bold text-stone-800 uppercase tracking-wide">
                          Service or Print Item *
                        </label>
                        <span className="text-[11px] text-amber-700 flex items-center gap-1 font-semibold">
                          <Edit3 className="w-3 h-3" /> Fully Editable
                        </span>
                      </div>

                      {/* Open Text Field with Datalist */}
                      <div className="relative">
                        <input
                          id="service-custom-input"
                          type="text"
                          list="services-datalist"
                          value={service}
                          onChange={(e) => setService(e.target.value)}
                          placeholder="e.g. 3D Backlight Signage, Custom Oil Canvas Painting, Flex Banners..."
                          className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-sm focus:outline-hidden focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all font-medium placeholder:text-stone-400"
                          required
                        />
                        <datalist id="services-datalist">
                          {SERVICE_OPTIONS.map((opt) => (
                            <option key={opt} value={opt} />
                          ))}
                        </datalist>
                      </div>

                      {/* Quick-Pick Tags */}
                      <div className="mt-2 flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] text-stone-500 font-semibold flex items-center gap-1">
                          <Layers className="w-2.5 h-2.5 text-amber-600" /> Quick Picks:
                        </span>
                        {QUICK_SUGGESTIONS.map((suggestion) => (
                          <button
                            key={suggestion}
                            type="button"
                            onClick={() => setService(suggestion)}
                            className={`px-2.5 py-1 rounded-lg text-xs transition-all cursor-pointer ${
                              service === suggestion
                                ? 'bg-amber-400 text-stone-950 font-bold border border-amber-500 shadow-xs'
                                : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200'
                            }`}
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Urgency & Timeline Selection */}
                    <div>
                      <label className="block text-xs font-bold text-stone-800 uppercase tracking-wide mb-1.5">
                        Production Turnaround Speed
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setUrgency('24hr')}
                          className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center flex flex-col items-center justify-center cursor-pointer ${
                            urgency === '24hr'
                              ? 'border-amber-500 bg-amber-50 text-amber-950 shadow-xs ring-1 ring-amber-500'
                              : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-300 hover:bg-stone-100'
                          }`}
                        >
                          <span className="flex items-center gap-1 text-sm font-extrabold text-amber-900">
                            <Zap className="w-3.5 h-3.5 text-amber-600" /> 24hr Express
                          </span>
                          <span className="text-[10px] text-stone-500 font-normal mt-0.5">Priority Press</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setUrgency('standard')}
                          className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center flex flex-col items-center justify-center cursor-pointer ${
                            urgency === 'standard'
                              ? 'border-amber-500 bg-amber-50 text-amber-950 shadow-xs ring-1 ring-amber-500'
                              : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-300 hover:bg-stone-100'
                          }`}
                        >
                          <span className="text-sm font-extrabold text-stone-900">2 - 3 Days</span>
                          <span className="text-[10px] text-stone-500 font-normal mt-0.5">Standard Factory</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setUrgency('flexible')}
                          className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center flex flex-col items-center justify-center cursor-pointer ${
                            urgency === 'flexible'
                              ? 'border-amber-500 bg-amber-50 text-amber-950 shadow-xs ring-1 ring-amber-500'
                              : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-300 hover:bg-stone-100'
                          }`}
                        >
                          <span className="text-sm font-extrabold text-stone-900">Bulk Project</span>
                          <span className="text-[10px] text-stone-500 font-normal mt-0.5">Custom Timeline</span>
                        </button>
                      </div>
                    </div>

                    {/* Quantity & Dimensions */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-stone-800 uppercase tracking-wide mb-1">
                          Quantity / Copies *
                        </label>
                        <div className="flex items-center">
                          <button
                            type="button"
                            onClick={() => setQuantity(Math.max(1, Number(quantity || 1) - 1).toString())}
                            className="px-3 py-2.5 rounded-l-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-sm border border-r-0 border-stone-300 active:scale-95"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="w-full py-2.5 text-center bg-white border-y border-stone-300 text-stone-900 text-sm font-bold focus:outline-hidden focus:border-amber-500"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setQuantity((Number(quantity || 1) + 1).toString())}
                            className="px-3 py-2.5 rounded-r-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-sm border border-l-0 border-stone-300 active:scale-95"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-800 uppercase tracking-wide mb-1">
                          Dimensions / Specs
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 5x7 ft, A4, 33x81 in"
                          value={dimensions}
                          onChange={(e) => setDimensions(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-sm focus:outline-hidden focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                        />
                      </div>
                    </div>

                    {/* Next Button for Step 1 */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (!service.trim()) return;
                          setCurrentStep(2);
                        }}
                        className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-600 active:scale-98 text-stone-950 font-black text-sm tracking-wide shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
                      >
                        <span>Continue to Contact &amp; Dispatch</span>
                        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                      </button>
                    </div>
                  </div>
                ) : (
                  /* STEP 2: Contact Information & WhatsApp Confirmation */
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-stone-800 uppercase tracking-wide mb-1">
                          Your Full Name *
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            placeholder="e.g. Praise Brown"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-sm focus:outline-hidden focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-800 uppercase tracking-wide mb-1">
                          WhatsApp Phone *
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-amber-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="tel"
                            placeholder="080 1234 5678"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-sm focus:outline-hidden focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Delivery / Workshop Pickup */}
                    <div>
                      <label className="block text-xs font-bold text-stone-800 uppercase tracking-wide mb-1">
                        Delivery City / Pickup Location
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="e.g. Swali, Yenagoa, Bayelsa State"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-sm focus:outline-hidden focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                        />
                      </div>
                    </div>

                    {/* Artwork & Finishing Notes */}
                    <div>
                      <label className="block text-xs font-bold text-stone-800 uppercase tracking-wide mb-1">
                        Artwork &amp; Finishing Instructions (Optional)
                      </label>
                      <div className="relative">
                        <FileText className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                        <textarea
                          rows={2}
                          placeholder="Mention custom colors, eyelets, gloss/matte lamination, or if you already have artwork ready..."
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-stone-50 border border-stone-300 text-stone-900 text-xs sm:text-sm focus:outline-hidden focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 resize-none"
                        />
                      </div>
                    </div>

                    {/* Step 2 Action Buttons */}
                    <div className="pt-2 space-y-2">
                      <button
                        type="submit"
                        id="submit-online-booking-btn"
                        disabled={isGeneratingSlip || !fullName.trim() || !phone.trim()}
                        className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-600 active:scale-98 text-stone-950 font-black text-sm tracking-wide shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                      >
                        {isGeneratingSlip ? (
                          <>
                            <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                            <span>Formatting Order Slip &amp; Opening WhatsApp...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 fill-stone-950" />
                            <span>Confirm &amp; Reserve Production Slot</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="w-full py-2 text-xs text-stone-600 hover:text-stone-900 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" /> Back to Specs
                      </button>
                    </div>

                    <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 text-center">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                      <span>Transfers all details directly to WhatsApp with digital order slip</span>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        ) : (
          /* Confirmation Screen: Order Placed with Digital Order Slip Image */
          <div className="p-6 sm:p-8 space-y-5 max-h-[85vh] overflow-y-auto bg-white">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-600 shadow-md shadow-emerald-500/10">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="mt-3">
                <span className="px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-xs font-mono font-bold text-amber-900 uppercase tracking-wider">
                  Booking Ref: {bookingRef}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-stone-900 mt-2">
                  Order Placed &amp; Dispatched!
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm max-w-md mx-auto mt-1.5 font-medium">
                  We have picked up all details and opened WhatsApp. Your official <span className="text-amber-800 font-bold">Production Job Slip</span> has been generated below.
                </p>
              </div>
            </div>

            {/* Generated Order Slip Image Card */}
            {orderImageUrl && (
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4 text-center space-y-3 shadow-md max-w-xl mx-auto">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-1.5 text-xs text-amber-800 font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Official Production Job Slip (PNG)</span>
                  </div>
                  {copiedImage && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                      <Check className="w-3.5 h-3.5" /> Copied to Clipboard!
                    </span>
                  )}
                </div>

                {/* High-definition Image Preview */}
                <div className="relative rounded-xl overflow-hidden border border-stone-200 max-h-72 sm:max-h-80 bg-stone-100 flex items-center justify-center p-2">
                  <img 
                    src={orderImageUrl} 
                    alt={`Order Slip ${bookingRef}`} 
                    className="w-full h-auto object-contain max-h-72 sm:max-h-80 rounded-lg shadow-sm"
                  />
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={handleDownloadImage}
                    className="py-2.5 px-3 rounded-xl bg-white hover:bg-stone-100 text-stone-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-stone-200 shadow-xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-600" />
                    <span>Download Image</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyImageToClipboard}
                    className="py-2.5 px-3 rounded-xl bg-white hover:bg-stone-100 text-stone-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-stone-200 shadow-xs cursor-pointer"
                  >
                    {copiedImage ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-amber-600" />
                        <span>Copy Image (Ctrl+V)</span>
                      </>
                    )}
                  </button>
                </div>

                {canWebShareFile && (
                  <button
                    type="button"
                    onClick={handleShareSlipImage}
                    className="w-full py-2.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5 text-amber-700" />
                    <span>Share Slip Image Directly to WhatsApp</span>
                  </button>
                )}
              </div>
            )}

            {/* Structured Summary Recap */}
            <div className="max-w-xl mx-auto p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-2 text-stone-700">
              <div className="flex justify-between">
                <span className="text-stone-500 font-medium">Print Item / Service:</span>
                <span className="font-bold text-amber-800 text-right max-w-[240px] truncate">{service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 font-medium">Quantity &amp; Specs:</span>
                <span className="font-semibold text-stone-900">{quantity} units {dimensions ? `(${dimensions})` : ''}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 font-medium">Turnaround Speed:</span>
                <span className="font-bold text-emerald-700">{urgency === '24hr' ? '⚡ 24hr Express' : 'Standard 2-3 Days'} ({getEstimatedCompletion()})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 font-medium">Client Contact:</span>
                <span className="font-semibold text-stone-900">{fullName} &bull; {phone}</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="max-w-xl mx-auto space-y-2 pt-2">
              <button
                type="button"
                onClick={handleOpenWhatsAppAgain}
                className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] active:scale-98 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4 fill-white" />
                <span>Re-open WhatsApp Chat With Order Details</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="w-full py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900 font-medium text-xs border border-stone-200 transition-colors cursor-pointer"
              >
                Close &amp; Return to Storefront
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
