import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Phone, 
  MapPin, 
  User, 
  FileText,
  ShieldCheck
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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refCode = `SG-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(refCode);
    setIsSubmitted(true);
  };

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Silver & Gold Inkshine Ltd! I just submitted an online booking.\n\n` +
      `*Booking Ref:* ${bookingRef}\n` +
      `*Client:* ${fullName}\n` +
      `*Phone:* ${phone}\n` +
      `*Service:* ${service}\n` +
      `*Urgency:* ${urgency === '24hr' ? '24-Hour Express' : urgency === 'standard' ? 'Standard 2-3 Days' : 'Flexible'}\n` +
      `*Quantity:* ${quantity}\n` +
      `*Dimensions/Specs:* ${dimensions || 'Not specified'}\n` +
      `*Location:* ${location}\n` +
      `*Notes:* ${notes || 'None'}\n\nPlease let me know the final quote and proofing details.`
    );
    window.open(`https://wa.me/2347030372539?text=${text}`, '_blank');
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setBookingRef('');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg my-auto rounded-3xl bg-[#0e0f14] border border-[#dfbc5e]/30 shadow-2xl p-5 sm:p-7 text-white overflow-hidden"
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
            <div className="mb-5 pr-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dfbc5e]/15 border border-[#dfbc5e]/30 text-[#dfbc5e] text-xs font-bold mb-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>Instant Online Booking</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Book Your Print or Painting Order
              </h2>
              <p className="text-stone-400 text-xs sm:text-sm mt-1">
                Fast-track production with Silver &amp; Gold Inkshine Ltd. Same-day &amp; 24hr turnaround available.
              </p>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Service Selection */}
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Select Required Service / Print Item *
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs sm:text-sm focus:outline-hidden focus:border-[#dfbc5e] transition-colors"
                  required
                >
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#14151b] text-white">
                      {opt}
                    </option>
                  ))}
                </select>
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
                    className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition-all text-center flex flex-col items-center justify-center ${
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
                    className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition-all text-center flex flex-col items-center justify-center ${
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
                    className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition-all text-center flex flex-col items-center justify-center ${
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
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

              {/* Submit Button */}
              <button
                type="submit"
                id="submit-online-booking-btn"
                className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#b8860b] hover:from-[#e5c158] hover:to-[#d4af37] active:scale-98 text-black font-black text-sm tracking-wide shadow-lg shadow-[#d4af37]/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Sparkles className="w-4 h-4 fill-black" />
                <span>Confirm &amp; Reserve Production Slot</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-[#dfbc5e]" />
                <span>Silver &amp; Gold Inkshine Ltd &bull; RC 9350634 Verified Business</span>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#dfbc5e]/20 border border-[#dfbc5e] flex items-center justify-center mx-auto text-[#dfbc5e]">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-stone-300 uppercase tracking-widest">
                Booking Reference: {bookingRef}
              </span>
              <h3 className="text-2xl font-black text-white mt-2">
                Order Slot Reserved!
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm max-w-sm mx-auto mt-2">
                Thank you, <span className="text-white font-semibold">{fullName}</span>. Your request for <span className="text-[#dfbc5e] font-semibold">{service}</span> ({quantity} copies) has been logged.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-left text-xs space-y-1.5 text-stone-300">
              <div className="flex justify-between">
                <span className="text-stone-400">Timeline:</span>
                <span className="font-semibold text-white">{urgency === '24hr' ? '⚡ 24hr Express Turnaround' : 'Standard 2-3 Days'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Location:</span>
                <span className="font-semibold text-white">{location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Customer Phone:</span>
                <span className="font-semibold text-white">{phone}</span>
              </div>
            </div>

            <div className="pt-2 space-y-2.5">
              <button
                type="button"
                onClick={handleOpenWhatsApp}
                className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] active:scale-98 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-green-900/30 transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4 fill-white" />
                <span>Send Booking Details to WhatsApp Now</span>
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
