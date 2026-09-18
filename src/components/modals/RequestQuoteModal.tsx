import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2, 
  FileText, 
  Sparkles,
  ExternalLink,
  MessageCircle,
  Copy,
  Check
} from 'lucide-react';

interface RequestQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory?: (categoryKey: string) => void;
}

export const RequestQuoteModal: React.FC<RequestQuoteModalProps> = ({
  isOpen,
  onClose,
  onSelectCategory
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedQuoteId, setSubmittedQuoteId] = useState<string | null>(null);
  const [copiedQuote, setCopiedQuote] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !privacyAgreed) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `QT-SG-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedQuoteId(generatedId);
      setIsSubmitting(false);
    }, 600);
  };

  const resetForm = () => {
    setSubmittedQuoteId(null);
    setFullName('');
    setPhone('');
    setEmail('');
    setAddress('');
    setDescription('');
    setUploadedFile(null);
    setPrivacyAgreed(false);
  };

  const quickCategories = [
    {
      title: 'Courier Bags (A4 Size)',
      categoryKey: 'packaging_cartons',
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80',
    },
    {
      title: 'Snapper Frames',
      categoryKey: 'frames_wall_arts',
      image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=400&q=80',
    },
    {
      title: 'Wall Pictures & Photo Frames',
      categoryKey: 'frames_wall_arts',
      image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80',
    },
    {
      title: 'Promotional Tables and Counters',
      categoryKey: 'outdoor_displays',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=400&q=80',
    },
  ];

  const whatsappInquiryText = encodeURIComponent(
    `Hello Silver & Gold Inkshine Ltd, I would like to request a custom print quote.\n` +
    `Name: ${fullName || 'Valued Client'}\n` +
    `Phone: ${phone || 'Not provided'}\n` +
    `Email: ${email || 'Not provided'}\n` +
    `Job Specs: ${description || 'Custom print inquiry'}\n` +
    `Delivery: ${address || 'Nationwide'}`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-3 sm:p-6 md:py-10 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-10 md:p-12 space-y-10">
          
          {/* Header Section (Exact from screenshot) */}
          <div className="text-center space-y-2 max-w-xl mx-auto pt-2">
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Tell Us About Your Print Job
            </h1>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Our team is ready to help. Send your print-ready file today and receive the best quote for your job from <strong className="text-stone-900 font-bold">Silver &amp; Gold Inkshine Ltd.</strong>
            </p>
          </div>

          {/* Submitted State View */}
          {submittedQuoteId ? (
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center space-y-5">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-black text-stone-900">
                  Quote Request Submitted Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                  Thank you, <span className="font-bold text-stone-800">{fullName || 'Valued Client'}</span>. Your quote request reference is <span className="font-bold text-[#00473e]">{submittedQuoteId}</span>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-stone-200 text-left text-xs space-y-2 max-w-md mx-auto text-stone-700">
                <div className="flex justify-between border-b border-stone-100 pb-1.5">
                  <span className="text-stone-500">Reference:</span>
                  <span className="font-bold text-stone-900">{submittedQuoteId}</span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-1.5">
                  <span className="text-stone-500">Contact:</span>
                  <span className="font-medium text-stone-900">{email} {phone ? `• ${phone}` : ''}</span>
                </div>
                {uploadedFile && (
                  <div className="flex justify-between border-b border-stone-100 pb-1.5">
                    <span className="text-stone-500">Attached Artwork:</span>
                    <span className="font-medium text-stone-900 truncate max-w-[200px]">{uploadedFile.name}</span>
                  </div>
                )}
                <div className="pt-1 text-stone-500 text-[11px]">
                  Our pre-press estimator will review your specs and email or WhatsApp you an official proforma invoice with volume discounts within 1–2 hours.
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={`https://wa.me/2347030372539?text=${encodeURIComponent(
                    `Hello Silver & Gold Inkshine Ltd, I just submitted Quote Ref: ${submittedQuoteId}. Name: ${fullName}, Email: ${email}. Please check my specs.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#00473e] hover:bg-[#03362e] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white stroke-none" />
                  <span>Forward to WhatsApp Desk Now</span>
                </a>

                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full sm:w-auto px-5 py-3 rounded-lg border border-stone-300 hover:bg-stone-100 text-stone-700 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  Submit Another Quote
                </button>
              </div>
            </div>
          ) : (
            /* Main Form (Exact structure from user screenshot) */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center sm:text-left">
                <h2 className="text-sm sm:text-base font-extrabold text-[#008060] tracking-tight flex items-center justify-center sm:justify-start gap-1.5">
                  <span>Request a Quote</span>
                </h2>
              </div>

              {/* 2-Column Fields (Full Name & Phone Number) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-stone-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-3.5 py-2.5 rounded-xs border border-stone-300 focus:outline-hidden focus:border-[#008060] focus:ring-1 focus:ring-[#008060] text-stone-900 text-xs sm:text-sm placeholder:text-stone-400 bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-stone-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 08012345678"
                    className="w-full px-3.5 py-2.5 rounded-xs border border-stone-300 focus:outline-hidden focus:border-[#008060] focus:ring-1 focus:ring-[#008060] text-stone-900 text-xs sm:text-sm placeholder:text-stone-400 bg-white"
                  />
                </div>
              </div>

              {/* 2-Column Fields (Email Address * & Address) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-stone-700">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xs border border-stone-300 focus:outline-hidden focus:border-[#008060] focus:ring-1 focus:ring-[#008060] text-stone-900 text-xs sm:text-sm placeholder:text-stone-400 bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-stone-700">
                    Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="City, State or Delivery Address"
                    className="w-full px-3.5 py-2.5 rounded-xs border border-stone-300 focus:outline-hidden focus:border-[#008060] focus:ring-1 focus:ring-[#008060] text-stone-900 text-xs sm:text-sm placeholder:text-stone-400 bg-white"
                  />
                </div>
              </div>

              {/* Textarea: Describe what you want to print, Quantity and Delivery Date */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-stone-700">
                  Describe what you want to print, Quantity and Delivery Date
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. 5 units Luxury Rollup Banners (85x200cm), 1000 pcs Branded Courier Bags, delivery to Ikeja before Friday..."
                  className="w-full px-3.5 py-2.5 rounded-xs border border-stone-300 focus:outline-hidden focus:border-[#008060] focus:ring-1 focus:ring-[#008060] text-stone-900 text-xs sm:text-sm placeholder:text-stone-400 bg-white resize-y"
                />
              </div>

              {/* File Upload Box (Dashed border, exact styling from screenshot) */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-stone-700">
                  File Upload
                </label>
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-stone-300 hover:border-[#008060] rounded-xs p-6 sm:p-8 text-center cursor-pointer transition-colors bg-stone-50/50 hover:bg-stone-50 group"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept=".pdf,.png,.jpg,.jpeg,.ai,.cdr,.psd,.tiff,.zip"
                    onChange={handleFileChange}
                  />
                  
                  {uploadedFile ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                        <FileText className="w-5 h-5" />
                      </div>
                      <p className="font-bold text-xs text-stone-900">{uploadedFile.name}</p>
                      <p className="text-[11px] text-stone-500">
                        {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB • Click to replace file
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-stone-100 text-stone-500 group-hover:text-[#008060] flex items-center justify-center transition-colors">
                        <Upload className="w-5 h-5" />
                      </div>
                      <p className="text-xs sm:text-sm text-stone-700 font-medium">
                        Drop your file here or <span className="text-[#008060] font-bold">click here to upload</span>
                      </p>
                      <p className="text-[11px] text-stone-400">
                        You can upload up to 1 files.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Privacy Policy Checkbox */}
              <div className="space-y-2 pt-1">
                <div className="text-xs font-semibold text-stone-700">
                  Privacy Policy <span className="text-red-500">*</span>
                </div>
                <label className="flex items-start gap-2.5 text-xs text-stone-600 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={privacyAgreed}
                    onChange={(e) => setPrivacyAgreed(e.target.checked)}
                    className="mt-0.5 rounded-xs border-stone-300 text-[#008060] focus:ring-[#008060]"
                  />
                  <span>I allow this website to collect and store the submitted data.</span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || !privacyAgreed || !email}
                  className="px-6 py-2 rounded-xs border border-stone-300 hover:bg-stone-100 disabled:opacity-50 text-stone-800 font-medium text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>

              {/* Note about 1 file upload */}
              <p className="text-[11px] sm:text-xs text-stone-500 leading-relaxed pt-1">
                <strong className="text-stone-700 font-bold">Note:</strong> This form accepts only one file upload. If you have more files to send, kindly click the WhatsApp button below and send them to us directly on WhatsApp
              </p>

              {/* Dark Green WhatsApp Button (Exact from screenshot) */}
              <div className="text-center pt-2">
                <a
                  href={`https://wa.me/2347030372539?text=${whatsappInquiryText}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xs bg-[#00473e] hover:bg-[#03362e] text-white font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white stroke-none" />
                  <span>Chat with us on WhatsApp</span>
                </a>
              </div>
            </form>
          )}

          {/* ========================================================= */}
          {/* Middle Contact Badges Row (Exact from user screenshot)    */}
          {/* ========================================================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-stone-200 text-xs sm:text-[13px] text-stone-700">
            {/* Left: Hours */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#008060] flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="space-y-0.5 leading-snug">
                <div>Mon – Fri: <strong className="text-stone-900 font-bold">8:00 am – 5:00 pm.</strong></div>
                <div>Saturday: <strong className="text-stone-900 font-bold">10:00 am – 4:00 pm.</strong></div>
                <div>Sunday: <strong className="text-stone-900 font-bold">Closed.</strong></div>
              </div>
            </div>

            {/* Right: Address, Phone & Email */}
            <div className="space-y-2.5">
              {/* Head Office */}
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 text-[#008060] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div className="leading-snug">
                  <strong className="text-stone-900 font-bold">Head Office:</strong>{' '}
                  <span>7 George St, off Apata Street, Somolu, Lagos 100231, Lagos.</span>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 text-[#008060] shrink-0">
                  <Phone className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div>
                  <strong className="text-stone-900 font-bold">Phone No:</strong>{' '}
                  <a href="tel:+2349028694908" className="hover:text-[#008060] transition-colors">
                    +2349028694908
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 text-[#008060] shrink-0">
                  <Mail className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div>
                  <strong className="text-stone-900 font-bold">Email Us:</strong>{' '}
                  <a 
                    href="mailto:orders@silverandgold.ng" 
                    className="underline text-[#008060] hover:text-[#00473e] transition-colors"
                  >
                    orders@silverandgold.ng
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* Interactive Google Map Section                            */}
          {/* ========================================================= */}
          <div className="space-y-2">
            <div className="rounded-xl overflow-hidden border border-stone-200 shadow-xs relative bg-stone-100">
              <iframe
                title="Silver & Gold Printing House Location"
                src="https://maps.google.com/maps?q=9.081999,8.675277&hl=en&z=16&output=embed"
                width="100%"
                height="240"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full block"
              />
              <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-md shadow-xs border border-stone-200 text-[11px] leading-tight">
                <p className="font-bold text-stone-900">Silver &amp; Gold Printing House</p>
                <p className="text-stone-500">Commercial Press &amp; Production Facility</p>
              </div>
            </div>

            {/* Direct Google Maps Action Bar */}
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-stone-600 font-mono text-[11px] truncate max-w-full sm:max-w-xs">
                <MapPin className="w-3.5 h-3.5 text-[#b8860b] shrink-0" />
                <span className="truncate">https://maps.app.goo.gl/FHkoQGNuL8p13jnG6</span>
              </div>
              <a
                href="https://maps.app.goo.gl/FHkoQGNuL8p13jnG6"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#b8860b] hover:bg-[#996515] text-white text-xs font-bold transition-colors shrink-0 ml-auto"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* ========================================================= */}
          {/* Products by Category (Exact 4 Cards from Screenshot)      */}
          {/* ========================================================= */}
          <div className="space-y-4 pt-2">
            <h3 className="text-center font-bold text-sm sm:text-base text-stone-900">
              Products by Category
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {quickCategories.map((cat, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    onClose();
                    onSelectCategory?.(cat.categoryKey);
                  }}
                  className="group flex flex-col items-center text-center p-3 rounded-xl border border-stone-200 hover:border-[#008060] hover:shadow-md transition-all bg-white cursor-pointer"
                >
                  <div className="w-full h-24 sm:h-28 rounded-lg overflow-hidden bg-stone-50 flex items-center justify-center p-2 mb-2">
                    <img 
                      src={cat.image} 
                      alt={cat.title} 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="font-bold text-[11px] sm:text-xs text-stone-800 group-hover:text-[#008060] leading-tight">
                    {cat.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
