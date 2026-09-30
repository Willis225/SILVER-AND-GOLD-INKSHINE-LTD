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
  Layers,
  Award,
  Zap,
  CheckSquare,
  Building2,
  Calendar,
  CreditCard,
  Briefcase,
  HelpCircle,
  Package,
  Printer
} from 'lucide-react';
import { CompanyLogoMark } from '../common/CompanyLogo';

interface CustomQuotePageProps {
  onNavigateHome: () => void;
  onOpenBookOnline?: () => void;
  onOpenPolicies?: (docKey?: 'terms' | 'privacy' | 'returns') => void;
  initialCategory?: string;
}

export const CustomQuotePage: React.FC<CustomQuotePageProps> = ({
  onNavigateHome,
  onOpenBookOnline,
  onOpenPolicies,
  initialCategory
}) => {
  // Form State
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  
  const [category, setCategory] = useState(initialCategory || 'Business & Stationery');
  const [projectScale, setProjectScale] = useState('Medium — Batch / 1–50 Units');
  const [timeline, setTimeline] = useState('⏱️ Standard — 3–5 Business Days');
  const [description, setDescription] = useState('');
  const [specialRequirements, setSpecialRequirements] = useState('');
  const [budgetRange, setBudgetRange] = useState('₦50,000 – ₦200,000');

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Accordion State
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(prev => prev === index ? null : index);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).slice(0, 8);
      setUploadedFiles(prev => [...prev, ...filesArray].slice(0, 8));
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = 'Please enter your full name';
    if (!whatsappNumber.trim()) newErrors.whatsappNumber = 'Please enter your WhatsApp number';
    if (!category) newErrors.category = 'Please select a primary category';
    if (!timeline) newErrors.timeline = 'Please select a timeline';
    if (!description.trim()) newErrors.description = 'Please describe your project requirements';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      const firstErrorEl = document.querySelector('.has-error');
      if (firstErrorEl) {
        firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    let filesSummary = 'Will send via WhatsApp chat';
    if (uploadedFiles.length > 0) {
      filesSummary = uploadedFiles.map(f => `${f.name} (${(f.size / (1024 * 1024)).toFixed(1)}MB)`).join(', ');
    }

    const whatsappMessage = 
`NEW CUSTOM QUOTE — Silver & Gold Inkshine

👤 Name: ${fullName.trim()}
🏢 Organization: ${organization.trim() || 'N/A'}
📞 WhatsApp: ${whatsappNumber.trim()}
📧 Email: ${emailAddress.trim() || 'N/A'}

📦 Project: ${category}
📈 Scale: ${projectScale}
⏰ Timeline: ${timeline}

📝 Description:
${description.trim()}

📁 Files: ${filesSummary}
💰 Budget: ${budgetRange}
📌 Special Notes: ${specialRequirements.trim() || 'None'}

Please review and send detailed quote. Thank you!`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/2347030372539?text=${encodedMessage}`;

    setSubmitSuccess(true);
    setIsSubmitting(false);

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 400);
  };

  const scrollToForm = () => {
    const formEl = document.getElementById('quote-form-section');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const FAQS = [
    {
      q: 'How long until I get my quote?',
      a: 'Most quotes within 1–2 hours during business hours. Complex or large projects same day.'
    },
    {
      q: 'Is this free? Do I have to buy?',
      a: '100% free and no obligation. You decide after reviewing — no pressure.'
    },
    {
      q: 'Can I adjust details after the quote?',
      a: 'Yes — quantities, materials, or deadlines can be updated. We send a revised quote instantly.'
    },
    {
      q: 'What if I don’t have a design yet?',
      a: 'Tell us what you need in the description — our design team creates it for you. Design fee credited to your order on approval.'
    },
    {
      q: 'How long is the quote valid?',
      a: '7 days from sent date. Locked pricing once deposit paid.'
    },
    {
      q: 'Can I visit your facility to discuss in person?',
      a: 'Yes — Opolo-Epie, Yenagoa. Mon–Sat 8AM–6PM. Or we can do a video call via WhatsApp.'
    },
    {
      q: 'Do you handle tender or institutional requests?',
      a: 'Yes — we’re fully CAC registered and supply government, schools, and corporate bodies. Formal quotations and invoices available on request.'
    }
  ];

  const POPULAR_PROJECTS = [
    {
      title: 'Full Event Branding',
      desc: 'Banners, backdrops, souvenirs, signage — one package price'
    },
    {
      title: 'Company Rebrand',
      desc: 'Business cards, letterheads, signage, gifts — unified rollout'
    },
    {
      title: 'Product Packaging Line',
      desc: 'Boxes, labels, inserts — matching design across sizes'
    },
    {
      title: 'School/Institution',
      desc: 'Uniforms, ID cards, certificates, banners, awards'
    },
    {
      title: 'Government/Corporate',
      desc: 'Tenders, bulk supplies, official documents, plaques'
    },
    {
      title: 'Merchandise Line',
      desc: 'T-shirts, caps, mugs, bags — consistent quality across items'
    },
    {
      title: 'Large-Format',
      desc: 'Building wraps, stage backdrops, outdoor billboards'
    },
    {
      title: 'Ongoing Partner',
      desc: 'Monthly/quarterly printing needs — dedicated account pricing'
    }
  ];

  const QUOTE_INCLUDES = [
    {
      title: 'Itemized Price Breakdown',
      desc: 'Materials • Production • Finishing • Delivery — all listed separately'
    },
    {
      title: 'Timeline & Schedule',
      desc: 'Production days • Ready date • Delivery estimate • Milestones for large jobs'
    },
    {
      title: 'Free Digital Proof',
      desc: 'Visual preview • Color check • Layout approval • Revisions included before print'
    },
    {
      title: 'Material Options',
      desc: 'Standard vs Premium • Finish choices • Bulk pricing tiers • Alternative suggestions'
    },
    {
      title: 'Payment Plan Available',
      desc: 'Split payments on large orders • Deposit + balance • Secure local payment methods'
    },
    {
      title: 'Validity Period',
      desc: 'Quote valid for 7 days • Price locks once confirmed • No last-minute hikes'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F0F12] text-stone-200 antialiased selection:bg-[#D4AF37]/30 selection:text-white">
      
      {/* Top Floating Navigation Header */}
      <div className="relative z-20 bg-[#0F0F12]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 lg:px-8 py-3.5 shadow-lg">
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

          {/* Direct WhatsApp Quick Chat */}
          <a
            href="https://wa.me/2347030372539?text=Hello%20Silver%20%26%20Gold%20Inkshine%2C%20I%20would%20like%20to%20request%20a%20custom%20quote"
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
      {/* Background: #0F0F12, Padding: 80px 24px 40px                              */}
      {/* ========================================================================= */}
      <section className="relative bg-[#0F0F12] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 overflow-hidden">
        
        {/* Right-Side Ambient Background Overlay with smooth left-side fade */}
        <div className="absolute top-0 right-0 bottom-0 w-full sm:w-2/3 lg:w-1/2 pointer-events-none select-none z-0 overflow-hidden">
          <div className="relative w-full h-full">
            <img
              src="/advertising-materials-portfolio.jpg"
              alt="Silver & Gold Inkshine custom print projects showcase"
              className="w-full h-full object-cover object-center opacity-40 lg:opacity-55 scale-105"
            />
            {/* Horizontal Left-to-Right Fade */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F12] via-[#0F0F12]/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F12] via-transparent to-[#0F0F12]" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[radial-gradient(circle,rgba(212,175,55,0.15)_0%,transparent_70%)] blur-2xl" />
          </div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10 space-y-6">
          
          {/* Gold Accent Line */}
          <div className="w-[60px] h-[3px] bg-[#D4AF37] rounded-full shadow-[0_0_12px_rgba(212,175,55,0.5)]" />

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bespoke &amp; Enterprise Estimates</span>
          </div>

          {/* H1 Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] max-w-3xl">
            Get a Free Custom Quote
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-[#C8C8CC] leading-relaxed font-normal max-w-2xl">
            Unique Projects, Bulk Orders, Bespoke Branding — Tailored Pricing Just For You
          </p>

          {/* Body */}
          <p className="text-sm sm:text-base text-[#E8E8EA] leading-relaxed font-normal max-w-2xl pt-1">
            One-size-fits-all doesn’t work for every project. Tell us exactly what you need, and we’ll send a detailed, transparent quote within 1–2 hours. No hidden fees, no obligation.
          </p>

          {/* Trust Strip */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl">
            {[
              'No Obligation • 100% Free',
              'Detailed Breakdown — Price, Timeline, Materials',
              'Digital Proof Included Before Any Payment',
              'Nationwide Delivery Included Where Applicable'
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
      {/* SECTION 2 — QUOTE REQUEST FORM                                            */}
      {/* Background: #1A1A1F, Padding: 60px 24px, Max-width 720px Card              */}
      {/* ========================================================================= */}
      <section id="quote-form-section" className="bg-[#1A1A1F] py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-[720px] mx-auto">
          
          <div className="bg-[#0F0F12] rounded-[12px] p-6 sm:p-10 border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.8)] space-y-8">
            
            <form onSubmit={handleSubmitQuote} className="space-y-8">

              {/* ── YOUR DETAILS ── */}
              <div className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-[#D4AF37] tracking-tight border-b border-white/10 pb-3">
                  Who Are We Helping?
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
                      placeholder="Your full name"
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
                      Business / Organization Name
                    </label>
                    <input
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder="Company, School, Church, Agency — if applicable"
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
                      Fastest reply — we send quotes &amp; updates here
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
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      placeholder="your@email.com — for file copies or formal quotes"
                      className="w-full bg-[#1A1A1F] border border-[#2A2A30] rounded-[6px] p-3 text-xs text-white placeholder:text-stone-500 focus:outline-hidden focus:border-[#D4AF37]"
                    />
                  </div>

                </div>
              </div>

              {/* ── PROJECT TYPE ── */}
              <div className="space-y-4 pt-2">
                <h2 className="text-xl sm:text-2xl font-bold text-[#D4AF37] tracking-tight border-b border-white/10 pb-3">
                  What Are You Creating?
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  {/* Primary Category */}
                  <div className={`space-y-1.5 ${errors.category ? 'has-error' : ''}`}>
                    <label className="block text-xs font-bold text-white">
                      Primary Category <span className="text-[#D4AF37]">*</span>
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-[#1A1A1F] border border-[#2A2A30] rounded-[6px] p-3 text-xs text-white focus:outline-hidden focus:border-[#D4AF37] cursor-pointer"
                    >
                      <option value="Business & Stationery">Business &amp; Stationery</option>
                      <option value="Banners, Events & Displays">Banners, Events &amp; Displays</option>
                      <option value="Packaging & Labels">Packaging &amp; Labels</option>
                      <option value="Branded Clothing & Merchandise">Branded Clothing &amp; Merchandise</option>
                      <option value="Signage — Indoor & Outdoor">Signage — Indoor &amp; Outdoor</option>
                      <option value="Corporate Gifts & Souvenirs">Corporate Gifts &amp; Souvenirs</option>
                      <option value="Awards, Plaques & Trophies">Awards, Plaques &amp; Trophies</option>
                      <option value="Large-Format / Fleet Wrap">Large-Format / Fleet Wrap</option>
                      <option value="Full Branding Package">Full Branding Package</option>
                      <option value="Something Else — Describe Below">Something Else — Describe Below</option>
                    </select>
                  </div>

                  {/* Project Scale */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-white">
                      Project Scale
                    </label>
                    <select
                      value={projectScale}
                      onChange={(e) => setProjectScale(e.target.value)}
                      className="w-full bg-[#1A1A1F] border border-[#2A2A30] rounded-[6px] p-3 text-xs text-white focus:outline-hidden focus:border-[#D4AF37] cursor-pointer"
                    >
                      <option value="Small — Single Item / Sample">Small — Single Item / Sample</option>
                      <option value="Medium — Batch / 1–50 Units">Medium — Batch / 1–50 Units</option>
                      <option value="Large — Bulk / 50–500 Units">Large — Bulk / 50–500 Units</option>
                      <option value="Enterprise — 500+ Units / Ongoing Contract">Enterprise — 500+ Units / Ongoing Contract</option>
                    </select>
                  </div>

                  {/* Timeline */}
                  <div className={`space-y-1.5 ${errors.timeline ? 'has-error' : ''}`}>
                    <label className="block text-xs font-bold text-white">
                      Timeline <span className="text-[#D4AF37]">*</span>
                    </label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full bg-[#1A1A1F] border border-[#2A2A30] rounded-[6px] p-3 text-xs text-white focus:outline-hidden focus:border-[#D4AF37] cursor-pointer"
                    >
                      <option value="⚡ Urgent — Same-Day / Next-Day">⚡ Urgent — Same-Day / Next-Day</option>
                      <option value="⏱️ Standard — 3–5 Business Days">⏱️ Standard — 3–5 Business Days</option>
                      <option value="📅 Planned — 1–2 Weeks Out">📅 Planned — 1–2 Weeks Out</option>
                      <option value="🗓️ Flexible — No Fixed Deadline">🗓️ Flexible — No Fixed Deadline</option>
                    </select>
                  </div>

                </div>
              </div>

              {/* ── PROJECT DETAILS ── */}
              <div className="space-y-4 pt-2">
                <h2 className="text-xl sm:text-2xl font-bold text-[#D4AF37] tracking-tight border-b border-white/10 pb-3">
                  Tell Us More
                </h2>

                {/* Description */}
                <div className={`space-y-1.5 ${errors.description ? 'has-error' : ''}`}>
                  <label className="block text-xs font-bold text-white">
                    Full Project Description <span className="text-[#D4AF37]">*</span>
                  </label>
                  <textarea
                    rows={6}
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      if (errors.description) setErrors(prev => ({ ...prev, description: '' }));
                    }}
                    placeholder={`• What exactly do you need printed or produced?\n• Approximate size, dimensions, or quantity?\n• Preferred materials or finish?\n• Any specific colors, logos, or branding to match?\n• Who is this for and how will it be used?\n• Deadline or event date?`}
                    className={`w-full bg-[#1A1A1F] border rounded-[6px] p-3 text-xs text-white placeholder:text-stone-500 focus:outline-hidden leading-relaxed ${
                      errors.description ? 'border-rose-500 focus:border-rose-500' : 'border-[#2A2A30] focus:border-[#D4AF37]'
                    }`}
                  />
                  {errors.description && (
                    <p className="text-[11px] text-rose-400 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.description}
                    </p>
                  )}
                </div>

                {/* Upload Zone */}
                <div className="space-y-2 pt-1">
                  <label className="block text-xs font-bold text-white">
                    Reference Files / Designs
                  </label>
                  <label className="block border-2 border-dashed border-[#D4AF37]/70 rounded-[8px] p-6 text-center cursor-pointer bg-white/[0.02] hover:bg-[#D4AF37]/10 transition-colors">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37]">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div className="font-bold text-white text-xs sm:text-sm">
                        Click or Drag &amp; Drop Reference Files
                      </div>
                      <div className="text-[11px] text-[#C8C8CC]">
                        Accepted: PDF, AI, PSD, CDR, PNG, JPG • Max 8 Files
                      </div>
                      <div className="text-[11px] text-[#D4AF37] font-medium">
                        No design yet? Just describe above — we’ll create it for you
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

                  {/* Uploaded Files */}
                  {uploadedFiles.length > 0 && (
                    <div className="space-y-1.5 pt-2">
                      <div className="text-xs font-bold text-[#D4AF37]">Selected Files ({uploadedFiles.length}/8):</div>
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
                            className="text-stone-400 hover:text-rose-400 p-1 cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Special Requirements */}
                <div className="space-y-1.5 pt-2">
                  <label className="block text-xs font-bold text-white">
                    Special Requirements
                  </label>
                  <textarea
                    rows={3}
                    value={specialRequirements}
                    onChange={(e) => setSpecialRequirements(e.target.value)}
                    placeholder="Delivery location? Budget range? Previous design to match? Special packaging? Installation needed? Anything else we should know?"
                    className="w-full bg-[#1A1A1F] border border-[#2A2A30] rounded-[6px] p-3 text-xs text-white placeholder:text-stone-500 focus:outline-hidden focus:border-[#D4AF37]"
                  />
                </div>

              </div>

              {/* ── BUDGET RANGE (Optional) ── */}
              <div className="space-y-4 pt-2">
                <h2 className="text-xl sm:text-2xl font-bold text-[#D4AF37] tracking-tight border-b border-white/10 pb-3">
                  Approximate Budget <span className="text-stone-400 text-sm font-normal">(Optional)</span>
                </h2>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-white">
                    Helps Us Match Solutions
                  </label>
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full bg-[#1A1A1F] border border-[#2A2A30] rounded-[6px] p-3 text-xs text-white focus:outline-hidden focus:border-[#D4AF37] cursor-pointer"
                  >
                    <option value="Under ₦10,000">Under ₦10,000</option>
                    <option value="₦10,000 – ₦50,000">₦10,000 – ₦50,000</option>
                    <option value="₦50,000 – ₦200,000">₦50,000 – ₦200,000</option>
                    <option value="₦200,000 – ₦1,000,000+">₦200,000 – ₦1,000,000+</option>
                    <option value="Prefer Not to Say — Send Best Options">Prefer Not to Say — Send Best Options</option>
                  </select>
                </div>
              </div>

              {/* ── SUBMIT BUTTON & POLICY NOTICE ── */}
              <div className="pt-4 space-y-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-[8px] bg-[#D4AF37] hover:bg-[#e5c158] text-black font-extrabold text-base sm:text-lg flex items-center justify-center gap-3 shadow-[0_4px_20px_rgba(212,175,55,0.3)] transition-all duration-200 active:scale-[0.99] cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-black shrink-0">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>Send Quote Request via WhatsApp</span>
                </button>

                {submitSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>WhatsApp launched with your custom quote specifications. We reply in 1–2 hours!</span>
                  </div>
                )}

                <div className="text-center text-xs text-[#C8C8CC] space-y-1">
                  <p>
                    We review and reply within 1–2 hours during business hours
                  </p>
                  <p>
                    By submitting, you agree to our{' '}
                    <button
                      type="button"
                      onClick={() => onOpenPolicies?.('terms')}
                      className="text-[#D4AF37] hover:underline font-semibold cursor-pointer"
                    >
                      Terms
                    </button>
                    {' '}&amp;{' '}
                    <button
                      type="button"
                      onClick={() => onOpenPolicies?.('privacy')}
                      className="text-[#D4AF37] hover:underline font-semibold cursor-pointer"
                    >
                      Privacy Policy
                    </button>
                  </p>
                  <p className="text-[11px] text-stone-400">
                    No commitment — quote is valid for 7 days
                  </p>
                </div>
              </div>

            </form>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3 — WHAT HAPPENS NEXT                                             */}
      {/* Background: #0F0F12, Padding: 60px 24px                                   */}
      {/* ========================================================================= */}
      <section className="bg-[#0F0F12] py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-5xl mx-auto space-y-10">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#D4AF37] tracking-tight">
              From Request to Quote — 3 Simple Steps
            </h2>
            <p className="text-sm sm:text-base text-[#C8C8CC]">
              Transparent, Fast, No Surprises
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Step 1 */}
            <div className="bg-[#1A1A1F] rounded-2xl p-7 border border-white/10 space-y-3 relative shadow-md">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37] text-black font-black text-lg flex items-center justify-center shadow-md">
                01
              </div>
              <h3 className="text-xl font-bold text-white">You Describe</h3>
              <p className="text-xs sm:text-sm text-[#C8C8CC] leading-relaxed">
                Fill in the form above. Attach files or describe your vision. Click send — we receive it instantly.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#1A1A1F] rounded-2xl p-7 border border-white/10 space-y-3 relative shadow-md">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37] text-black font-black text-lg flex items-center justify-center shadow-md">
                02
              </div>
              <h3 className="text-xl font-bold text-white">We Calculate</h3>
              <p className="text-xs sm:text-sm text-[#C8C8CC] leading-relaxed">
                Our team reviews: materials, quantity, production time, packaging, and delivery. You get a full breakdown — not just one number.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#1A1A1F] rounded-2xl p-7 border border-white/10 space-y-3 relative shadow-md">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37] text-black font-black text-lg flex items-center justify-center shadow-md">
                03
              </div>
              <h3 className="text-xl font-bold text-white">You Decide</h3>
              <p className="text-xs sm:text-sm text-[#C8C8CC] leading-relaxed">
                Quote sent via WhatsApp. Review, ask questions, tweak details. Approve → proof → print → deliver. No pressure, no obligation.
              </p>
            </div>

          </div>

          {/* Bottom CTA */}
          <div className="text-center pt-4 space-y-3">
            <div className="text-xs text-stone-400">Want to discuss live instead?</div>
            <a
              href="https://wa.me/2347030372539?text=Hello%20Silver%20%26%20Gold%20Inkshine%2C%20I%20would%20like%20to%20discuss%20a%20custom%20quote%20live"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all cursor-pointer"
            >
              <span>Chat on WhatsApp Now →</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
            </a>
            <p className="text-[11px] text-stone-400">Reply in minutes — 8AM–6PM Mon–Sat</p>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4 — WHAT YOUR QUOTE INCLUDES                                      */}
      {/* Background: #1A1A1F, Padding: 60px 24px                                   */}
      {/* ========================================================================= */}
      <section className="bg-[#1A1A1F] py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-6xl mx-auto space-y-10">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#D4AF37] tracking-tight">
              Every Quote Comes With
            </h2>
            <p className="text-sm sm:text-base text-[#C8C8CC]">
              No hidden extras — this is standard
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {QUOTE_INCLUDES.map((item, idx) => (
              <div 
                key={idx}
                className="bg-[#0F0F12] rounded-2xl p-6 border border-white/10 hover:border-[#D4AF37]/50 transition-all space-y-3 shadow-md"
              >
                <div className="flex items-center gap-2 text-[#D4AF37]">
                  <div className="w-6 h-6 rounded-full bg-[#D4AF37]/15 flex items-center justify-center">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#C8C8CC] leading-relaxed pl-8">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center text-xs sm:text-sm text-[#D4AF37] font-semibold pt-2">
            Bulk orders 500+ units automatically qualify for discounted pricing
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5 — POPULAR CUSTOM PROJECTS                                       */}
      {/* Background: #0F0F12, Padding: 60px 24px                                   */}
      {/* ========================================================================= */}
      <section className="bg-[#0F0F12] py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-5xl mx-auto space-y-10">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#D4AF37] tracking-tight">
              Common Custom Requests
            </h2>
            <p className="text-sm sm:text-base text-[#C8C8CC]">
              If you see yours, mention it in the description
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {POPULAR_PROJECTS.map((proj, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setDescription(prev => prev ? `${prev}\n• Project Type: ${proj.title}` : `• Project Type: ${proj.title}\n`);
                  scrollToForm();
                }}
                className="bg-[#1A1A1F] rounded-xl p-5 border border-white/10 hover:border-[#D4AF37] hover:bg-white/[0.03] transition-all cursor-pointer space-y-1.5 group"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm sm:text-base font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                    ▢ {proj.title}
                  </span>
                  <span className="text-xs text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity">
                    Select →
                  </span>
                </div>
                <p className="text-xs text-[#C8C8CC] leading-relaxed">
                  {proj.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center pt-4 space-y-3">
            <p className="text-xs sm:text-sm text-[#C8C8CC]">
              Don’t see what you need? Just describe it — we handle bespoke projects every day.
            </p>
            <button
              type="button"
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#e5c158] text-black font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              <span>Start Your Quote Request →</span>
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6 — FAQ — QUOTE HELP                                              */}
      {/* Background: #1A1A1F, Padding: 60px 24px                                   */}
      {/* ========================================================================= */}
      <section className="bg-[#1A1A1F] py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-3xl mx-auto space-y-10">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#D4AF37] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-[#C8C8CC]">
              Clear answers to common custom quote inquiries
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#0F0F12] rounded-xl border border-white/10 overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-white font-bold text-xs sm:text-sm hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
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
                        <div className="px-4 sm:px-5 pb-4 text-xs sm:text-sm text-[#C8C8CC] leading-relaxed border-t border-white/5 pt-3">
                          {faq.a}
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
