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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-start justify-center p-3 sm:p-6 md:py-10 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-[#0e0f14] text-stone-100 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/10 overflow-hidden my-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#181824] hover:bg-[#202030] text-stone-400 hover:text-white flex items-center justify-center border border-white/10 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-10 md:p-12 space-y-10">
          
          {/* Header Section (Exact from screenshot) */}
          <div className="text-center space-y-2 max-w-xl mx-auto pt-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Tell Us About Your Print Job
            </h1>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
              Our team is ready to help. Send your print-ready file today and receive the best quote for your job from <strong className="text-white font-bold">Silver &amp; Gold Inkshine Ltd.</strong>
            </p>
          </div>

          {/* Submitted State View */}
          {submittedQuoteId ? (
            <div className="bg-[#14151e] border border-[#f5be38]/30 rounded-2xl p-6 sm:p-8 text-center space-y-5">
              <div className="w-14 h-14 rounded-full bg-[#f5be38]/15 text-[#f5be38] flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-black text-white">
                  Quote Request Submitted Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto">
                  Thank you, <span className="font-bold text-white">{fullName || 'Valued Client'}</span>. Your quote request reference is <span className="font-bold text-[#f5be38]">{submittedQuoteId}</span>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#181824] border border-white/10 text-left text-xs space-y-2 max-w-md mx-auto text-stone-300">
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="text-stone-400">Reference:</span>
                  <span className="font-bold text-white">{submittedQuoteId}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="text-stone-400">Contact:</span>
                  <span className="font-medium text-white">{email} {phone ? `• ${phone}` : ''}</span>
                </div>
                {uploadedFile && (
                  <div className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-stone-400">Attached Artwork:</span>
                    <span className="font-medium text-white truncate max-w-[200px]">{uploadedFile.name}</span>
                  </div>
                )}
                <div className="pt-1 text-stone-400 text-[11px]">
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
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#f5be38] hover:bg-[#ffd15c] text-black font-extrabold text-xs sm:text-sm shadow-[0_0_20px_rgba(245,190,56,0.25)] transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-black stroke-none" />
                  <span>Forward to WhatsApp Desk Now</span>
                </a>

                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full sm:w-auto px-5 py-3 rounded-full border border-white/10 hover:bg-white/5 text-stone-300 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  Submit Another Quote
                </button>
              </div>
            </div>
          ) : (
            /* Main Form (Exact structure from user screenshot) */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center sm:text-left">
                <h2 className="text-sm sm:text-base font-extrabold text-[#f5be38] tracking-tight flex items-center justify-center sm:justify-start gap-1.5">
                  <span>Request a Quote</span>
                </h2>
              </div>

              {/* 2-Column Fields (Full Name & Phone Number) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-stone-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-white/10 focus:outline-hidden focus:border-[#f5be38] focus:ring-1 focus:ring-[#f5be38] text-white text-xs sm:text-sm placeholder:text-stone-500 bg-[#181824]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-stone-300">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 08012345678"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-white/10 focus:outline-hidden focus:border-[#f5be38] focus:ring-1 focus:ring-[#f5be38] text-white text-xs sm:text-sm placeholder:text-stone-500 bg-[#181824]"
                  />
                </div>
              </div>

              {/* 2-Column Fields (Email Address * & Address) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-stone-300">
                    Email Address <span className="text-[#f5be38]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-white/10 focus:outline-hidden focus:border-[#f5be38] focus:ring-1 focus:ring-[#f5be38] text-white text-xs sm:text-sm placeholder:text-stone-500 bg-[#181824]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-stone-300">
                    Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="City, State or Delivery Address"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-white/10 focus:outline-hidden focus:border-[#f5be38] focus:ring-1 focus:ring-[#f5be38] text-white text-xs sm:text-sm placeholder:text-stone-500 bg-[#181824]"
                  />
                </div>
              </div>

              {/* Textarea: Describe what you want to print, Quantity and Delivery Date */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-stone-300">
                  Describe what you want to print, Quantity and Delivery Date
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. 5 units Luxury Rollup Banners (85x200cm), 1000 pcs Branded Courier Bags, delivery to Yenagoa before Friday..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-white/10 focus:outline-hidden focus:border-[#f5be38] focus:ring-1 focus:ring-[#f5be38] text-white text-xs sm:text-sm placeholder:text-stone-500 bg-[#181824] resize-y"
                />
              </div>

              {/* File Upload Box (Dashed border, exact styling from screenshot) */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-stone-300">
                  File Upload
                </label>
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-white/15 hover:border-[#f5be38] rounded-xl p-6 sm:p-8 text-center cursor-pointer transition-colors bg-[#14151e] hover:bg-[#181824] group"
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
                      <div className="w-10 h-10 rounded-full bg-[#f5be38]/20 text-[#f5be38] flex items-center justify-center">
                        <FileText className="w-5 h-5" />
                      </div>
                      <p className="font-bold text-xs text-white">{uploadedFile.name}</p>
                      <p className="text-[11px] text-stone-400">
                        {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB • Click to replace file
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-white/5 text-stone-400 group-hover:text-[#f5be38] flex items-center justify-center transition-colors">
                        <Upload className="w-5 h-5" />
                      </div>
                      <p className="text-xs sm:text-sm text-stone-300 font-medium">
                        Drop your file here or <span className="text-[#f5be38] font-bold">click here to upload</span>
                      </p>
                      <p className="text-[11px] text-stone-500">
                        You can upload up to 1 files.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Privacy Policy Checkbox */}
              <div className="space-y-2 pt-1">
                <div className="text-xs font-semibold text-stone-300">
                  Privacy Policy <span className="text-[#f5be38]">*</span>
                </div>
                <label className="flex items-start gap-2.5 text-xs text-stone-400 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={privacyAgreed}
                    onChange={(e) => setPrivacyAgreed(e.target.checked)}
                    className="mt-0.5 rounded-xs accent-[#f5be38]"
                  />
                  <span>I allow this website to collect and store the submitted data.</span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || !privacyAgreed || !email}
                  className="px-8 py-3 rounded-full bg-[#f5be38] hover:bg-[#ffd15c] disabled:opacity-50 text-black font-extrabold text-xs sm:text-sm shadow-[0_0_20px_rgba(245,190,56,0.25)] transition-all cursor-pointer"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>

              {/* Note about 1 file upload */}
              <p className="text-[11px] sm:text-xs text-stone-500 leading-relaxed pt-1">
                <strong className="text-stone-300 font-bold">Note:</strong> This form accepts only one file upload. If you have more files to send, kindly click the WhatsApp button below and send them to us directly on WhatsApp
              </p>

              {/* WhatsApp Button */}
              <div className="text-center pt-2">
                <a
                  href={`https://wa.me/2347030372539?text=${whatsappInquiryText}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#f5be38]/15 hover:bg-[#f5be38]/25 text-[#f5be38] border border-[#f5be38]/40 font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-[#f5be38] stroke-none" />
                  <span>Chat with us on WhatsApp</span>
                </a>
              </div>
            </form>
          )}

          {/* ========================================================= */}
          {/* Middle Contact Badges Row (Exact from user screenshot)    */}
          {/* ========================================================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10 text-xs sm:text-[13px] text-stone-300">
            {/* Left: Hours */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#f5be38]/10 text-[#f5be38] flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="space-y-0.5 leading-snug">
                <div>Mon – Fri: <strong className="text-white font-bold">8:00 am – 5:00 pm.</strong></div>
                <div>Saturday: <strong className="text-white font-bold">10:00 am – 4:00 pm.</strong></div>
                <div>Sunday: <strong className="text-white font-bold">Closed.</strong></div>
              </div>
            </div>

            {/* Right: Address, Phone & Email */}
            <div className="space-y-2.5">
              {/* Head Office */}
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 text-[#f5be38] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div className="leading-snug">
                  <strong className="text-white font-bold">Head Office:</strong>{' '}
                  <span className="text-stone-300">No. 875 Medford Okilo Road (Mbiama-Yenagoa Road), Opolo-Epie, directly opposite Pepperoni, Yenagoa, Bayelsa State, Nigeria.</span>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 text-[#f5be38] shrink-0">
                  <Phone className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div>
                  <strong className="text-white font-bold">Phone No:</strong>{' '}
                  <a href="tel:+2347030372539" className="text-stone-300 hover:text-[#f5be38] transition-colors">
                    +234 703 037 2539
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 text-[#f5be38] shrink-0">
                  <Mail className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div>
                  <strong className="text-white font-bold">Email Us:</strong>{' '}
                  <a 
                    href="mailto:orders@silverandgold.ng" 
                    className="underline text-[#f5be38] hover:text-[#ffd15c] transition-colors"
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
          <div>
            <div className="rounded-xl overflow-hidden border border-white/10 shadow-xs relative bg-[#181824]">
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
            </div>
          </div>

          {/* ========================================================= */}
          {/* Products by Category (Exact 4 Cards from Screenshot)      */}
          {/* ========================================================= */}
          <div className="space-y-4 pt-2">
            <h3 className="text-center font-bold text-sm sm:text-base text-white">
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
                  className="group flex flex-col items-center text-center p-3 rounded-2xl border border-white/10 hover:border-[#f5be38] hover:shadow-[0_0_20px_rgba(245,190,56,0.15)] transition-all bg-[#14151e] hover:bg-[#181824] cursor-pointer"
                >
                  <div className="w-full h-24 sm:h-28 rounded-xl overflow-hidden bg-black/40 flex items-center justify-center p-2 mb-2 border border-white/5">
                    <img 
                      src={cat.image} 
                      alt={cat.title} 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="font-bold text-[11px] sm:text-xs text-stone-200 group-hover:text-[#f5be38] leading-tight">
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
