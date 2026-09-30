import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Check, 
  Upload, 
  FileText, 
  Clock, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  MessageCircle, 
  Send, 
  X, 
  AlertCircle, 
  CheckCircle2, 
  ExternalLink,
  Tag,
  Truck,
  HelpCircle,
  Building2,
  Phone
} from 'lucide-react';
import { CompanyLogoMark } from '../common/CompanyLogo';

interface BookOnlinePageProps {
  onNavigateHome: () => void;
  onOpenPolicies?: (docKey?: 'terms' | 'privacy' | 'returns') => void;
  onOpenCustomQuote?: () => void;
  initialProductType?: string;
}

export const BookOnlinePage: React.FC<BookOnlinePageProps> = ({
  onNavigateHome,
  onOpenPolicies,
  onOpenCustomQuote,
  initialProductType
}) => {
  // Form State
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  
  const [productType, setProductType] = useState(initialProductType || 'Business Cards');
  const [quantity, setQuantity] = useState('100');
  const [dimensions, setDimensions] = useState('');
  const [materialFinish, setMaterialFinish] = useState('Standard (Uncoated)');
  const [deadline, setDeadline] = useState('Standard 3–5 Days');

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [needDesignHelp, setNeedDesignHelp] = useState(false);
  const [designHelpDetails, setDesignHelpDetails] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Validation State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // FAQ Accordion State
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(prev => prev === index ? null : index);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).slice(0, 5);
      setUploadedFiles(prev => [...prev, ...filesArray].slice(0, 5));
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = 'Please enter your full name';
    if (!whatsappNumber.trim()) newErrors.whatsappNumber = 'Please enter your WhatsApp number';
    if (!productType) newErrors.productType = 'Please select a product or service';
    if (!quantity || parseInt(quantity, 10) < 1) newErrors.quantity = 'Please specify a valid quantity';
    if (!deadline) newErrors.deadline = 'Please select when you need your order';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      const firstErrorEl = document.querySelector('.has-error');
      if (firstErrorEl) {
        firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    // Format Files info
    let filesSummary = 'Will send via WhatsApp chat';
    if (needDesignHelp) {
      filesSummary = `Need Design Help: ${designHelpDetails.trim() || 'Details requested in notes'}`;
    } else if (uploadedFiles.length > 0) {
      filesSummary = uploadedFiles.map(f => `${f.name} (${(f.size / (1024 * 1024)).toFixed(1)}MB)`).join(', ');
    }

    // Build the exact WhatsApp pre-fill message template
    const whatsappMessage = 
`NEW ORDER REQUEST — Silver & Gold Inkshine

Name: ${fullName.trim()}
Business: ${businessName.trim() || 'N/A'}
WhatsApp: ${whatsappNumber.trim()}
Email: ${emailAddress.trim() || 'N/A'}

PRODUCT: ${productType}
QTY: ${quantity}
SIZE: ${dimensions.trim() || 'Standard'}
FINISH: ${materialFinish}
DEADLINE: ${deadline}

FILES: ${filesSummary}
NOTES: ${specialInstructions.trim() || 'None'}

Please review and send quote & proof. Thank you!`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/2347030372539?text=${encodedMessage}`;

    setSubmitSuccess(true);
    setIsSubmitting(false);

    // Open WhatsApp in a new window/tab
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 400);
  };

  const FAQS = [
    {
      question: 'What file format should I send?',
      answer: 'PDF is preferred — AI, PSD, CDR, PNG (300DPI+), and JPG all work. Need help? We’ll guide you and check your file for free before printing.'
    },
    {
      question: 'Do I pay before or after the proof?',
      answer: 'You pay ONLY after approving the digital proof — zero risk. Once you say YES to the proof, production begins immediately.'
    },
    {
      question: 'Can I change my mind after sending?',
      answer: 'Yes — before proof approval = 100% full refund. After approval = no cash refund because custom manufacturing is already in motion, but we provide revisions and discount reprints.'
    },
    {
      question: 'How do I pay?',
      answer: 'Bank transfer, Mobile Money, or WhatsApp Payment — all secure and instant. Verified corporate account details are sent with your official proforma quote.'
    },
    {
      question: 'Do you deliver to my state?',
      answer: 'Yes — all 36 States across Nigeria. Bayelsa pickup or same-day express delivery in Yenagoa. Outside Bayelsa = 3–5 business days doorstep transit.'
    },
    {
      question: 'What if I don’t have a design yet?',
      answer: 'No problem — check the "I need design help" box on the order form and describe what you want. Our in-house design team will create it for you.'
    }
  ];

  const PRICING_GUIDE = [
    {
      title: 'Business Cards',
      price: 'From ₦12,000 / 100 pcs',
      bullets: ['Premium 300gsm Art Card', 'Gloss or Matte Lamination', 'Vibrant Double-Sided CMYK']
    },
    {
      title: 'A4 Flyers',
      price: 'From ₦8,500 / 500 pcs',
      bullets: ['130gsm / 150gsm Gloss', 'Full Color High-Speed Print', 'Bulk Discounts Available']
    },
    {
      title: '3×6ft Flex Banner',
      price: 'From ₦15,000',
      bullets: ['High-Res Heavy Vinyl', 'Reinforced Hemmed & Eyelets', '2–3 Day Turnaround']
    },
    {
      title: 'Roll-Up Stand',
      price: 'From ₦35,000',
      bullets: ['Anti-Curl Photographic Film', 'Aluminium Base Frame', 'Padded Carry Bag Included']
    },
    {
      title: 'Custom Apparel',
      price: 'From ₦4,500 / Shirt',
      bullets: ['Direct-to-Film (DTF) / Screen', 'Durable & Wash-Resistant', 'Bulk Corporate Pricing']
    },
    {
      title: 'Signage & More',
      price: 'Custom Quote',
      bullets: ['3D Illuminated Letters', 'Product Packaging & Bags', 'Acrylic & Crystal Plaques']
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F0F12] text-stone-200 antialiased selection:bg-[#D4AF37]/30 selection:text-white">
      
      {/* Top Floating Navigation Header */}
      <div className="sticky top-0 z-40 bg-[#0F0F12]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 lg:px-8 py-3.5 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Back to Home */}
          <button
            type="button"
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-300 hover:text-white bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-xl border border-white/10 transition-all cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-[#D4AF37] group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Storefront</span>
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 flex items-center justify-center">
              <CompanyLogoMark className="w-full h-full" />
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-black tracking-tight text-white flex items-center gap-1.5">
                <span>SILVER &amp; GOLD INKSHINE LTD</span>
                <span className="text-[10px] font-mono text-[#D4AF37] font-bold px-1.5 py-0.5 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/30">RC 1892044</span>
              </div>
            </div>
          </div>

          {/* Quick Direct WhatsApp */}
          <a
            href="https://wa.me/2347030372539?text=Hello%20Silver%20%26%20Gold%20Inkshine%2C%20I%20have%20an%20order%20question"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-black text-black bg-[#D4AF37] hover:bg-[#e5c158] px-3.5 py-2 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-black" />
            <span className="hidden xs:inline">WhatsApp Help</span>
          </a>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1 — PAGE HERO                                                     */}
      {/* Background: #0F0F12 with Right-Side Overlay Graphic (Faded on Left)       */}
      {/* ========================================================================= */}
      <section className="relative bg-[#0F0F12] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 overflow-hidden">
        
        {/* RIGHT-SIDE BACKGROUND OVERLAY: Left side smoothly faded, right side unfaded & crisp */}
        <div className="absolute top-0 right-0 bottom-0 w-full sm:w-2/3 lg:w-1/2 pointer-events-none select-none z-0 overflow-hidden">
          <div className="relative w-full h-full">
            {/* Background Graphic Imagery */}
            <img
              src="https://kommodo.ai/i/MoNH6zpXs6l1MjdaNFOe"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.includes('startup-corporate-identity-bundle')) {
                  target.src = '/startup-corporate-identity-bundle.jpg';
                }
              }}
              alt="Silver & Gold Inkshine commercial printing materials showcase"
              className="w-full h-full object-cover object-center opacity-45 lg:opacity-65 scale-105"
            />
            {/* Horizontal Left-to-Right Fade Gradient: Ensures left side seamlessly melts into #0F0F12 while right side stays visible */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F12] via-[#0F0F12]/80 to-transparent" />
            {/* Top & Bottom Edge Blends */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F12] via-transparent to-[#0F0F12]" />
            {/* Radial Gold Ambient Accent */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[radial-gradient(circle,rgba(212,175,55,0.15)_0%,transparent_70%)] blur-2xl" />
          </div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10 space-y-6">
          
          {/* Gold Accent Line */}
          <div className="w-[60px] h-[3px] bg-[#D4AF37] rounded-full shadow-[0_0_12px_rgba(212,175,55,0.5)]" />

          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Online Printing Desk</span>
          </div>

          {/* H1 Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] max-w-3xl">
            Place Your Order Online
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-[#C8C8CC] leading-relaxed font-normal max-w-2xl">
            Simple, Fast &amp; Secure — From File to Finished Print in 4 Steps
          </p>

          {/* Body Text */}
          <p className="text-sm sm:text-base text-[#E8E8EA] leading-relaxed font-normal max-w-2xl pt-1">
            Select your product, upload your design, and confirm your details. We review everything and reply with confirmation &amp; timeline — usually within minutes.
          </p>

          {/* 4 Trust Strip Pillars */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl">
            {[
              'Free Pre-Press Check on Every Order',
              'Digital Proof Before Printing',
              'Bayelsa Same-Day / Nationwide 3–5 Days',
              'Zero-Defect Quality Guarantee'
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-xs text-xs font-semibold text-stone-200"
              >
                <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-[#D4AF37] stroke-[3]" />
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2 — ORDER FORM MAIN CONTENT                                       */}
      {/* Background: #1A1A1F, Centered Max-Width 720px Card                        */}
      {/* ========================================================================= */}
      <section className="bg-[#1A1A1F] py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-[720px] mx-auto">
          
          <div className="bg-[#0F0F12] rounded-[16px] p-6 sm:p-10 border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.8)] space-y-8">
            
            <form onSubmit={handleSubmitOrder} className="space-y-8">

                {/* ── 1. YOUR DETAILS ── */}
                <div className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#D4AF37] tracking-tight border-b border-white/10 pb-3">
                    Your Details
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Full Name */}
                    <div className={`space-y-1.5 ${errors.fullName ? 'has-error' : ''}`}>
                      <label className="block text-xs font-bold text-white">
                        Full Name <span className="text-[#D4AF37]">*</span>
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (errors.fullName) setErrors(prev => ({ ...prev, fullName: '' }));
                        }}
                        placeholder="Enter your full name"
                        className={`w-full bg-[#1A1A1F] border rounded-[6px] p-3 text-xs text-white placeholder:text-stone-500 focus:outline-hidden ${
                          errors.fullName ? 'border-rose-500 focus:border-rose-500' : 'border-[#2A2A30] focus:border-[#D4AF37]'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-[11px] text-rose-400 font-medium flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Business / Organization Name */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-white">
                        Business/Organization Name <span className="text-stone-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="Your company or brand name"
                        className="w-full bg-[#1A1A1F] border border-[#2A2A30] rounded-[6px] p-3 text-xs text-white placeholder:text-stone-500 focus:outline-hidden focus:border-[#D4AF37]"
                      />
                    </div>

                    {/* WhatsApp Number */}
                    <div className={`space-y-1.5 ${errors.whatsappNumber ? 'has-error' : ''}`}>
                      <label className="block text-xs font-bold text-white">
                        WhatsApp Number <span className="text-[#D4AF37]">*</span>
                      </label>
                      <input
                        type="tel"
                        value={whatsappNumber}
                        onChange={(e) => {
                          setWhatsappNumber(e.target.value);
                          if (errors.whatsappNumber) setErrors(prev => ({ ...prev, whatsappNumber: '' }));
                        }}
                        placeholder="+234 700 000 0000"
                        className={`w-full bg-[#1A1A1F] border rounded-[6px] p-3 text-xs text-white placeholder:text-stone-500 focus:outline-hidden ${
                          errors.whatsappNumber ? 'border-rose-500 focus:border-rose-500' : 'border-[#2A2A30] focus:border-[#D4AF37]'
                        }`}
                      />
                      <p className="text-[11px] text-[#C8C8CC]">
                        We reply fastest here — confirmation, updates &amp; delivery info
                      </p>
                      {errors.whatsappNumber && (
                        <p className="text-[11px] text-rose-400 font-medium flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.whatsappNumber}
                        </p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-white">
                        Email Address <span className="text-stone-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full bg-[#1A1A1F] border border-[#2A2A30] rounded-[6px] p-3 text-xs text-white placeholder:text-stone-500 focus:outline-hidden focus:border-[#D4AF37]"
                      />
                    </div>

                  </div>
                </div>

                {/* ── 2. ORDER DETAILS ── */}
                <div className="space-y-4 pt-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#D4AF37] tracking-tight border-b border-white/10 pb-3">
                    Order Details
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Product / Service Type */}
                    <div className={`space-y-1.5 ${errors.productType ? 'has-error' : ''}`}>
                      <label className="block text-xs font-bold text-white">
                        Product / Service Type <span className="text-[#D4AF37]">*</span>
                      </label>
                      <select
                        value={productType}
                        onChange={(e) => setProductType(e.target.value)}
                        className="w-full bg-[#1A1A1F] border border-[#2A2A30] rounded-[6px] p-3 text-xs text-white focus:outline-hidden focus:border-[#D4AF37] cursor-pointer"
                      >
                        <option value="Business Cards">Business Cards</option>
                        <option value="Flyers & Handbills">Flyers &amp; Handbills</option>
                        <option value="Banners & Roll-Ups">Banners &amp; Roll-Ups</option>
                        <option value="Signage & 3D Letters">Signage &amp; 3D Letters</option>
                        <option value="Packaging & Labels">Packaging &amp; Labels</option>
                        <option value="Branded Apparel">Branded Apparel</option>
                        <option value="Corporate Gifts & Souvenirs">Corporate Gifts &amp; Souvenirs</option>
                        <option value="Awards & Plaques">Awards &amp; Plaques</option>
                        <option value="Other / Custom Project">Other / Custom Project</option>
                      </select>
                    </div>

                    {/* Quantity */}
                    <div className={`space-y-1.5 ${errors.quantity ? 'has-error' : ''}`}>
                      <label className="block text-xs font-bold text-white">
                        Quantity <span className="text-[#D4AF37]">*</span>
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => {
                          setQuantity(e.target.value);
                          if (errors.quantity) setErrors(prev => ({ ...prev, quantity: '' }));
                        }}
                        placeholder="e.g. 500"
                        className={`w-full bg-[#1A1A1F] border rounded-[6px] p-3 text-xs text-white placeholder:text-stone-500 focus:outline-hidden ${
                          errors.quantity ? 'border-rose-500 focus:border-rose-500' : 'border-[#2A2A30] focus:border-[#D4AF37]'
                        }`}
                      />
                      {errors.quantity && (
                        <p className="text-[11px] text-rose-400 font-medium flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.quantity}
                        </p>
                      )}
                    </div>

                    {/* Size / Dimensions */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-white">
                        Size / Dimensions <span className="text-stone-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={dimensions}
                        onChange={(e) => setDimensions(e.target.value)}
                        placeholder="e.g. A4, 3ft x 6ft, 8.5cm x 5.5cm"
                        className="w-full bg-[#1A1A1F] border border-[#2A2A30] rounded-[6px] p-3 text-xs text-white placeholder:text-stone-500 focus:outline-hidden focus:border-[#D4AF37]"
                      />
                      <p className="text-[11px] text-[#C8C8CC]">
                        If unsure, leave blank — we’ll recommend standard sizes
                      </p>
                    </div>

                    {/* Material / Finish */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-white">
                        Material / Finish <span className="text-stone-400 font-normal">(Optional)</span>
                      </label>
                      <select
                        value={materialFinish}
                        onChange={(e) => setMaterialFinish(e.target.value)}
                        className="w-full bg-[#1A1A1F] border border-[#2A2A30] rounded-[6px] p-3 text-xs text-white focus:outline-hidden focus:border-[#D4AF37] cursor-pointer"
                      >
                        <option value="Standard (Uncoated)">Standard (Uncoated)</option>
                        <option value="Gloss Lamination">Gloss Lamination</option>
                        <option value="Matte Lamination">Matte Lamination</option>
                        <option value="Premium Heavy Stock">Premium Heavy Stock</option>
                        <option value="Waterproof / Vinyl">Waterproof / Vinyl</option>
                        <option value="I will confirm after review">I will confirm after review</option>
                      </select>
                    </div>

                    {/* Deadline */}
                    <div className={`space-y-1.5 sm:col-span-2 ${errors.deadline ? 'has-error' : ''}`}>
                      <label className="block text-xs font-bold text-white">
                        Deadline / When Do You Need It? <span className="text-[#D4AF37]">*</span>
                      </label>
                      <select
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="w-full bg-[#1A1A1F] border border-[#2A2A30] rounded-[6px] p-3 text-xs text-white focus:outline-hidden focus:border-[#D4AF37] cursor-pointer"
                      >
                        <option value="Same-Day (Bayelsa Only — File Before 10AM)">Same-Day (Bayelsa Only — File Before 10AM)</option>
                        <option value="Next-Day">Next-Day</option>
                        <option value="2–3 Days">2–3 Days</option>
                        <option value="Standard 3–5 Days">Standard 3–5 Days</option>
                        <option value="Flexible — No Rush">Flexible — No Rush</option>
                      </select>
                    </div>

                  </div>
                </div>

                {/* ── 3. UPLOAD YOUR ARTWORK ── */}
                <div className="space-y-4 pt-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#D4AF37] tracking-tight border-b border-white/10 pb-3">
                    Upload Your Design / File
                  </h2>

                  {/* Drop Zone */}
                  <label className="block border-2 border-dashed border-[#D4AF37] rounded-[8px] p-8 text-center cursor-pointer bg-white/[0.02] hover:bg-[#D4AF37]/10 transition-colors">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] mb-1">
                        <Upload className="w-6 h-6" />
                      </div>
                      <div className="font-bold text-white text-sm">
                        Click to Upload or Drag &amp; Drop Your Files Here
                      </div>
                      <div className="text-xs text-[#C8C8CC]">
                        Accepted: PDF, AI, PSD, CDR, PNG, JPG • Max: 5 Files
                      </div>
                      <div className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#D4AF37] bg-black/40 px-3.5 py-1.5 rounded-lg border border-[#D4AF37]/30">
                        <span>Select Files →</span>
                      </div>
                    </div>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.ai,.psd,.cdr,.png,.jpg,.jpeg"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  {/* Uploaded Files List */}
                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <div className="text-xs font-bold text-[#D4AF37]">Selected Files ({uploadedFiles.length}/5):</div>
                      <div className="space-y-1.5">
                        {uploadedFiles.map((file, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-[#1A1A1F] border border-white/10 text-xs text-white">
                            <div className="flex items-center gap-2 truncate">
                              <FileText className="w-4 h-4 text-[#D4AF37] shrink-0" />
                              <span className="truncate">{file.name}</span>
                              <span className="text-[10px] text-stone-400">({(file.size / 1024).toFixed(0)} KB)</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(idx)}
                              className="text-stone-400 hover:text-rose-400 p-1"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Need Design Help Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-3 p-3.5 rounded-xl bg-[#1A1A1F] border border-white/10 cursor-pointer hover:bg-white/5 transition-colors">
                      <input
                        type="checkbox"
                        checked={needDesignHelp}
                        onChange={(e) => setNeedDesignHelp(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-white/20 text-[#D4AF37] focus:ring-[#D4AF37] cursor-pointer"
                      />
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-white">
                          I don’t have ready artwork — I need design help
                        </div>
                        <div className="text-[11px] text-[#C8C8CC]">
                          Our in-house graphic design team will prepare a custom layout for you.
                        </div>
                      </div>
                    </label>

                    {needDesignHelp && (
                      <div className="mt-3 space-y-1.5 animate-in fade-in duration-200">
                        <label className="block text-xs font-bold text-white">
                          Tell us what you need designed:
                        </label>
                        <textarea
                          rows={3}
                          value={designHelpDetails}
                          onChange={(e) => setDesignHelpDetails(e.target.value)}
                          placeholder="Describe your design, include logo, brand colors, text content, photos or references..."
                          className="w-full bg-[#1A1A1F] border border-[#2A2A30] rounded-[6px] p-3 text-xs text-white placeholder:text-stone-500 focus:outline-hidden focus:border-[#D4AF37]"
                        />
                      </div>
                    )}
                  </div>

                </div>

                {/* ── 4. SPECIAL INSTRUCTIONS ── */}
                <div className="space-y-4 pt-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#D4AF37] tracking-tight border-b border-white/10 pb-3">
                    Special Instructions
                  </h2>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-white">
                      Any Extra Details? <span className="text-stone-400 font-normal">(Optional)</span>
                    </label>
                    <textarea
                      rows={4}
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      placeholder="Special requests, delivery address in Bayelsa or across Nigeria, finishing notes, references..."
                      className="w-full bg-[#1A1A1F] border border-[#2A2A30] rounded-[6px] p-3 text-xs text-white placeholder:text-stone-500 focus:outline-hidden focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* ── 5. SUBMIT BUTTON & POLICY NOTICE ── */}
                <div className="pt-4 space-y-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-[8px] bg-[#D4AF37] hover:bg-[#e5c158] text-black font-extrabold text-base sm:text-lg flex items-center justify-center gap-3 shadow-[0_4px_20px_rgba(212,175,55,0.3)] transition-all duration-200 active:scale-[0.99] cursor-pointer"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-black shrink-0">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                    <span>Send Order Request via WhatsApp</span>
                  </button>

                  {submitSuccess && (
                    <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                      <span>WhatsApp launched with your completed order request. We reply in minutes!</span>
                    </div>
                  )}

                  <div className="text-center text-xs text-[#C8C8CC] space-y-1">
                    <p>
                      By submitting, you agree to our{' '}
                      <button
                        type="button"
                        onClick={() => onOpenPolicies?.('terms')}
                        className="text-[#D4AF37] hover:underline font-semibold"
                      >
                        Terms of Service
                      </button>
                      {' '}&amp;{' '}
                      <button
                        type="button"
                        onClick={() => onOpenPolicies?.('returns')}
                        className="text-[#D4AF37] hover:underline font-semibold"
                      >
                        Refund Policy
                      </button>
                    </p>
                    <p className="text-[11px] text-stone-400">
                      Files reviewed within minutes • Digital proof sent before any printing begins
                    </p>
                  </div>
                </div>

              </form>

            </div>
          </div>
        </section>

      {/* ========================================================================= */}
      {/* SECTION 3 — HOW IT WORKS (Order Flow)                                     */}
      {/* ========================================================================= */}
      <section className="bg-[#0F0F12] py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-5xl mx-auto space-y-10">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#D4AF37] tracking-tight">
              What Happens Next?
            </h2>
            <p className="text-sm sm:text-base text-[#C8C8CC]">
              No surprises, no hidden steps
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className="bg-[#1A1A1F] rounded-2xl p-6 border border-white/10 space-y-3 relative">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-black font-black text-base flex items-center justify-center shadow-md">
                01
              </div>
              <h3 className="text-lg font-bold text-white">You Send</h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Complete the form above. Upload files or describe your project. Click send.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#1A1A1F] rounded-2xl p-6 border border-white/10 space-y-3 relative">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-black font-black text-base flex items-center justify-center shadow-md">
                02
              </div>
              <h3 className="text-lg font-bold text-white">We Review</h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                We check your file, confirm pricing, and reply with: exact cost, production time, and digital preview.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#1A1A1F] rounded-2xl p-6 border border-white/10 space-y-3 relative">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-black font-black text-base flex items-center justify-center shadow-md">
                03
              </div>
              <h3 className="text-lg font-bold text-white">You Approve</h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Check the proof. Confirm details. Make payment via bank transfer or mobile money.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-[#1A1A1F] rounded-2xl p-6 border border-white/10 space-y-3 relative">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-black font-black text-base flex items-center justify-center shadow-md">
                04
              </div>
              <h3 className="text-lg font-bold text-white">We Deliver</h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Print → Quality Check → Pack → Delivered. Bayelsa same-day / Nationwide 3–5 days.
              </p>
            </div>

          </div>

          <div className="text-center pt-4 space-y-3">
            <div className="text-xs text-stone-400">Prefer to chat directly?</div>
            <a
              href="https://wa.me/2347030372539?text=Hello%20Silver%20%26%20Gold%20Inkshine%2C%20I%20would%20like%20to%20discuss%20an%20order%20directly"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all cursor-pointer"
            >
              <span>Chat on WhatsApp Now</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
            </a>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4 — PRICING QUICK GUIDE                                           */}
      {/* ========================================================================= */}
      <section className="bg-[#1A1A1F] py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-5xl mx-auto space-y-10">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#D4AF37] tracking-tight">
              Starting Price Guide
            </h2>
            <p className="text-sm sm:text-base text-[#C8C8CC]">
              Exact quote sent after review
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRICING_GUIDE.map((card, idx) => (
              <div 
                key={idx}
                className="bg-[#0F0F12] rounded-2xl p-6 border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 space-y-3 shadow-md"
              >
                <h3 className="text-lg font-bold text-white">{card.title}</h3>
                <div className="text-base font-extrabold text-[#D4AF37]">{card.price}</div>
                <ul className="space-y-1.5 pt-2 text-xs text-stone-300 border-t border-white/10">
                  {card.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center text-xs text-stone-400 space-y-1 pt-2">
            <p className="text-stone-300 font-medium">All prices include free pre-press review &amp; digital proof</p>
            <p>Final quote confirmed before payment</p>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5 — FAQ (Ordering Help)                                           */}
      {/* ========================================================================= */}
      <section className="bg-[#0F0F12] py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-3xl mx-auto space-y-10">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#D4AF37] tracking-tight">
              Common Questions
            </h2>
            <p className="text-xs sm:text-sm text-[#C8C8CC]">
              Quick answers to help you order with confidence
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#1A1A1F] rounded-xl border border-white/10 overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-white font-bold text-sm hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                    )}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-4 sm:px-5 pb-4 text-xs sm:text-sm text-stone-300 leading-relaxed border-t border-white/5 pt-3">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
};
