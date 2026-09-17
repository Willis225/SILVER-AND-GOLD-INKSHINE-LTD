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
  Layers
} from 'lucide-react';

interface BookOnlineModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

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
  const [service, setService] = useState(preselectedService || SERVICE_OPTIONS[0]);
  const [urgency, setUrgency] = useState<'24hr' | 'standard' | 'flexible'>('24hr');
  const [quantity, setQuantity] = useState('1');
  const [dimensions, setDimensions] = useState('');
  const [notes, setNotes] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Yenagoa, Bayelsa State');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [orderImageUrl, setOrderImageUrl] = useState<string | null>(null);
  const [orderImageBlob, setOrderImageBlob] = useState<Blob | null>(null);
  const [copiedImage, setCopiedImage] = useState(false);
  const [isGeneratingSlip, setIsGeneratingSlip] = useState(false);
  const [canWebShareFile, setCanWebShareFile] = useState(false);

  // Hidden canvas ref for generating high-res order slip
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sync preselectedService whenever it changes
  useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
    }
  }, [preselectedService, isOpen]);

  // Check if browser supports Web Share with files
  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'canShare' in navigator && 'share' in navigator) {
      setCanWebShareFile(true);
    }
  }, []);

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
      canvas.height = 980;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        resolve({ dataUrl: '', blob: new Blob() });
        return;
      }

      // 1. Background
      const bgGrad = ctx.createLinearGradient(0, 0, 800, 980);
      bgGrad.addColorStop(0, '#0c0d12');
      bgGrad.addColorStop(0.5, '#12141c');
      bgGrad.addColorStop(1, '#08090d');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 800, 980);

      // Ambient gold glow at top right
      const glowGrad = ctx.createRadialGradient(720, 80, 10, 720, 80, 260);
      glowGrad.addColorStop(0, 'rgba(212, 175, 55, 0.18)');
      glowGrad.addColorStop(1, 'rgba(212, 175, 55, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, 800, 400);

      // 2. Gold Border Frame
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 3;
      ctx.strokeRect(20, 20, 760, 940);

      ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
      ctx.lineWidth = 1;
      ctx.strokeRect(26, 26, 748, 928);

      // Corner gold accents
      const drawCorner = (x: number, y: number) => {
        ctx.fillStyle = '#d4af37';
        ctx.fillRect(x - 5, y - 5, 10, 10);
      };
      drawCorner(20, 20);
      drawCorner(780, 20);
      drawCorner(20, 960);
      drawCorner(780, 960);

      // 3. Header: Brand & Registration
      ctx.fillStyle = '#dfbc5e';
      ctx.font = 'bold 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('SILVER & GOLD INKSHINE LTD', 400, 75);

      ctx.fillStyle = '#a8a29e';
      ctx.font = '600 13px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText('RC 9350634 • ULTRA-FINISH PRINTING & BRANDING FACTORY', 400, 100);

      // Divider
      ctx.strokeStyle = 'rgba(223, 188, 94, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(60, 120);
      ctx.lineTo(740, 120);
      ctx.stroke();

      // Official Badge Banner
      ctx.fillStyle = '#221c0e';
      ctx.beginPath();
      ctx.roundRect(220, 135, 360, 36, 18);
      ctx.fill();
      ctx.strokeStyle = '#dfbc5e';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#ffd700';
      ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('★ OFFICIAL PRODUCTION ORDER SLIP ★', 400, 158);

      // 4. Booking Reference Bar
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 22px -apple-system, BlinkMacSystemFont, monospace';
      ctx.fillText(`JOB REF: ${refCode}`, 400, 205);

      ctx.fillStyle = '#9ca3af';
      ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText(`Logged: ${dateStr} • Status: RESERVED FOR PRODUCTION`, 400, 226);

      // 5. Order Table Section
      const startY = 260;
      ctx.fillStyle = '#141722';
      ctx.beginPath();
      ctx.roundRect(50, startY, 700, 560, 16);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Field items
      const urgencyLabel = urgency === '24hr' 
        ? '⚡ 24-Hour Express Turnaround' 
        : urgency === 'standard' 
        ? 'Standard 2-3 Days' 
        : 'Project / Flexible Schedule';

      const fields = [
        { label: 'CUSTOMER NAME', value: fullName || 'Valued Customer' },
        { label: 'WHATSAPP NUMBER', value: phone || 'Provided on chat' },
        { label: 'REQUIRED SERVICE / ITEM', value: service },
        { label: 'PRODUCTION SPEED', value: urgencyLabel },
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
        ctx.fillText(`• ${field.label}`, 75, rowY);

        // Value
        ctx.fillStyle = field.label === 'REQUIRED SERVICE / ITEM' ? '#ffffff' : '#f3f4f6';
        ctx.font = field.label === 'REQUIRED SERVICE / ITEM' 
          ? 'bold 15px -apple-system, BlinkMacSystemFont, sans-serif' 
          : '14px -apple-system, BlinkMacSystemFont, sans-serif';
        
        rowY = renderWrappedText(ctx, field.value, 75, rowY + 20, 650, 20);
        rowY += 12;

        // Divider except last
        if (i < fields.length - 1 && rowY < startY + 540) {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
          ctx.beginPath();
          ctx.moveTo(75, rowY - 4);
          ctx.lineTo(725, rowY - 4);
          ctx.stroke();
        }
      });

      // 6. Security Seal & Production Watermark Stamp
      ctx.save();
      ctx.translate(620, 750);
      ctx.rotate(-0.14);
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
      ctx.fillText('Silver & Gold Inkshine Ltd • Swali, Yenagoa, Bayelsa State', 400, 860);

      ctx.fillStyle = '#9ca3af';
      ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText('Direct WhatsApp Hotline: +234 703 037 2539 • High Precision Digital Press', 400, 882);

      // Simulated Job Ticket Barcode
      ctx.fillStyle = '#ffffff';
      const barcodeY = 910;
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
      `⚡ *Timeline:* ${urgencyText}\n` +
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

  // Primary Action: Submit, Generate Slip Image, and send directly to WhatsApp!
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

    // 2. Try copying image to clipboard for instantaneous paste (Ctrl+V) into WhatsApp
    if (typeof navigator !== 'undefined' && navigator.clipboard && typeof ClipboardItem !== 'undefined' && blob) {
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        setCopiedImage(true);
      } catch {
        // Clipboard write can be restricted in some browsers; handle gracefully
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

  // Web Share image directly to WhatsApp or phone apps
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
      // User cancelled or unsupported
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
    setBookingRef('');
    setOrderImageUrl(null);
    setOrderImageBlob(null);
    setCopiedImage(false);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg my-auto rounded-3xl bg-[#0e0f14] border border-[#dfbc5e]/40 shadow-2xl p-5 sm:p-7 text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient background accents */}
        <div className="absolute -top-24 -right-24 w-52 h-52 bg-[#dfbc5e]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-52 h-52 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-all active:scale-95 cursor-pointer z-10"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header */}
            <div className="mb-4 pr-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dfbc5e]/15 border border-[#dfbc5e]/30 text-[#dfbc5e] text-xs font-bold mb-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>Instant Production Booking</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Book Your Print or Painting Order
              </h2>
              <p className="text-stone-400 text-xs sm:text-sm mt-1">
                Fill out your job details below. When you confirm, everything is instantly formatted and sent directly to our official WhatsApp with a digital order slip!
              </p>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              {/* Editable Service Selection */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="service-custom-input" className="block text-xs font-semibold text-stone-200">
                    Select Required Service / Print Item * <span className="text-[#dfbc5e] font-normal">(Editable)</span>
                  </label>
                  <span className="text-[11px] text-stone-400 flex items-center gap-1">
                    <Edit3 className="w-3 h-3 text-[#dfbc5e]" /> Type anything or pick
                  </span>
                </div>

                {/* Direct Editable Text Input */}
                <div className="relative">
                  <input
                    id="service-custom-input"
                    type="text"
                    list="services-datalist"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    placeholder="e.g. 3D Backlight Signage, Custom Oil Canvas Painting, Banners..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/20 text-white text-xs sm:text-sm focus:outline-hidden focus:border-[#dfbc5e] focus:ring-1 focus:ring-[#dfbc5e] transition-all"
                    required
                  />
                  <datalist id="services-datalist">
                    {SERVICE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt} />
                    ))}
                  </datalist>
                </div>

                {/* Quick-Pick Suggestion Chips */}
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] text-stone-400 font-semibold flex items-center gap-1">
                    <Layers className="w-2.5 h-2.5 text-[#dfbc5e]" /> Popular:
                  </span>
                  {QUICK_SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => setService(suggestion)}
                      className={`px-2 py-0.5 rounded-md text-[11px] transition-all cursor-pointer ${
                        service === suggestion
                          ? 'bg-[#dfbc5e] text-black font-extrabold shadow-sm'
                          : 'bg-white/10 hover:bg-white/20 text-stone-300'
                      }`}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>

              {/* Urgency Pill Selector */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Target Completion Timeline
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setUrgency('24hr')}
                    className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition-all text-center flex flex-col items-center justify-center cursor-pointer ${
                      urgency === '24hr'
                        ? 'border-[#dfbc5e] bg-[#dfbc5e]/20 text-[#ebd07f] shadow-sm'
                        : 'border-white/10 bg-white/5 text-stone-300 hover:border-white/20'
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#dfbc5e]" /> 24hr Express
                    </span>
                    <span className="text-[10px] text-stone-400 font-normal mt-0.5">Priority Press</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setUrgency('standard')}
                    className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition-all text-center flex flex-col items-center justify-center cursor-pointer ${
                      urgency === 'standard'
                        ? 'border-[#dfbc5e] bg-[#dfbc5e]/20 text-[#ebd07f] shadow-sm'
                        : 'border-white/10 bg-white/5 text-stone-300 hover:border-white/20'
                    }`}
                  >
                    <span>2 - 3 Days</span>
                    <span className="text-[10px] text-stone-400 font-normal mt-0.5">Standard</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setUrgency('flexible')}
                    className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition-all text-center flex flex-col items-center justify-center cursor-pointer ${
                      urgency === 'flexible'
                        ? 'border-[#dfbc5e] bg-[#dfbc5e]/20 text-[#ebd07f] shadow-sm'
                        : 'border-white/10 bg-white/5 text-stone-300 hover:border-white/20'
                    }`}
                  >
                    <span>Bulk / Project</span>
                    <span className="text-[10px] text-stone-400 font-normal mt-0.5">Custom timeline</span>
                  </button>
                </div>
              </div>

              {/* Quantity & Dimensions */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Quantity / Copies *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs sm:text-sm focus:outline-hidden focus:border-[#dfbc5e]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Dimensions (e.g. 5x7 ft, A4)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 33x81 in, 10x4 ft"
                    value={dimensions}
                    onChange={(e) => setDimensions(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs sm:text-sm focus:outline-hidden focus:border-[#dfbc5e]"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-0.5">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Praise Brown"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs sm:text-sm focus:outline-hidden focus:border-[#dfbc5e]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-[#dfbc5e] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="080 1234 5678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs sm:text-sm focus:outline-hidden focus:border-[#dfbc5e]"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Delivery / Pickup Location */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Delivery City / Pickup Location
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Swali, Yenagoa, Bayelsa State"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs sm:text-sm focus:outline-hidden focus:border-[#dfbc5e]"
                  />
                </div>
              </div>

              {/* Project Specifics / Artwork Notes */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Artwork &amp; Finishing Instructions
                </label>
                <div className="relative">
                  <FileText className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                  <textarea
                    rows={2}
                    placeholder="Mention custom colors, eyelets, lamination, or if you need design help..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs sm:text-sm focus:outline-hidden focus:border-[#dfbc5e] resize-none"
                  />
                </div>
              </div>

              {/* Direct Submit & WhatsApp Launcher Button */}
              <button
                type="submit"
                id="submit-online-booking-btn"
                disabled={isGeneratingSlip}
                className="w-full mt-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#b8860b] hover:from-[#e5c158] hover:to-[#d4af37] active:scale-98 text-black font-black text-sm tracking-wide shadow-lg shadow-[#d4af37]/25 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-75"
              >
                {isGeneratingSlip ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Preparing Order Slip &amp; WhatsApp...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 fill-black" />
                    <span>Confirm &amp; Reserve Production Slot</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-[#dfbc5e]" />
                <span>Picks up all filled details &bull; Sends directly to official WhatsApp</span>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Screen: Order Placed with Digital Order Slip Image */
          <div className="py-2 space-y-4 max-h-[82vh] overflow-y-auto pr-1">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-[#25D366]/20 border border-[#25D366] flex items-center justify-center mx-auto text-[#25D366]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="mt-2.5">
                <span className="px-3 py-1 rounded-full bg-[#dfbc5e]/20 border border-[#dfbc5e]/40 text-xs font-mono font-bold text-[#dfbc5e] uppercase tracking-wider">
                  Booking Ref: {bookingRef}
                </span>
                <h3 className="text-2xl font-black text-white mt-2">
                  Order Placed &amp; Sent to WhatsApp!
                </h3>
                <p className="text-stone-300 text-xs sm:text-sm max-w-sm mx-auto mt-1">
                  We have picked up everything you filled out and opened WhatsApp for you. Below is your official <span className="text-[#dfbc5e] font-semibold">Production Order Slip Image</span>.
                </p>
              </div>
            </div>

            {/* Generated Order Slip Image Card */}
            {orderImageUrl && (
              <div className="rounded-2xl border border-[#dfbc5e]/40 bg-[#12131a] p-3 text-center space-y-2.5 shadow-xl">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-1.5 text-xs text-[#dfbc5e] font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Official Order Slip Image</span>
                  </div>
                  {copiedImage && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                      <Check className="w-3 h-3" /> Copied to Clipboard!
                    </span>
                  )}
                </div>

                {/* Image Preview with Aspect Ratio Container */}
                <div className="relative rounded-xl overflow-hidden border border-white/10 max-h-60 sm:max-h-72 bg-black/60 flex items-center justify-center">
                  <img 
                    src={orderImageUrl} 
                    alt={`Order Slip ${bookingRef}`} 
                    className="w-full h-auto object-contain max-h-60 sm:max-h-72"
                  />
                </div>

                {/* Slip Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleDownloadImage}
                    className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#dfbc5e]" />
                    <span>Download Image</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyImageToClipboard}
                    className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedImage ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#dfbc5e]" />
                        <span>Copy Image</span>
                      </>
                    )}
                  </button>
                </div>

                {canWebShareFile && (
                  <button
                    type="button"
                    onClick={handleShareSlipImage}
                    className="w-full py-2 px-3 rounded-xl bg-[#dfbc5e]/20 hover:bg-[#dfbc5e]/30 border border-[#dfbc5e]/40 text-[#dfbc5e] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share Slip Image Directly to WhatsApp</span>
                  </button>
                )}
              </div>
            )}

            {/* Quick summary recap */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-left text-xs space-y-1.5 text-stone-300">
              <div className="flex justify-between">
                <span className="text-stone-400">Service / Item:</span>
                <span className="font-semibold text-[#dfbc5e] text-right max-w-[200px] truncate">{service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Quantity &amp; Specs:</span>
                <span className="font-semibold text-white">{quantity} units {dimensions ? `(${dimensions})` : ''}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Turnaround Speed:</span>
                <span className="font-semibold text-emerald-400">{urgency === '24hr' ? '⚡ 24hr Express' : 'Standard 2-3 Days'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Client / Phone:</span>
                <span className="font-semibold text-white">{fullName} &bull; {phone}</span>
              </div>
            </div>

            {/* WhatsApp & Close Controls */}
            <div className="pt-1 space-y-2">
              <button
                type="button"
                onClick={handleOpenWhatsAppAgain}
                className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] active:scale-98 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-green-900/30 transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4 fill-white" />
                <span>Re-open WhatsApp Chat With Order</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white font-medium text-xs transition-colors cursor-pointer"
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

