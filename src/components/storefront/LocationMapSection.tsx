import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  ExternalLink, 
  Navigation, 
  Clock, 
  Phone, 
  Copy, 
  Check, 
  ShieldCheck,
  Truck
} from 'lucide-react';

interface LocationMapSectionProps {
  mapUrl?: string;
  embedUrl?: string;
  onRequestQuote?: () => void;
}

export const LocationMapSection: React.FC<LocationMapSectionProps> = ({
  mapUrl = 'https://maps.app.goo.gl/FHkoQGNuL8p13jnG6',
  embedUrl = 'https://maps.google.com/maps?q=9.081999,8.675277&hl=en&z=16&output=embed',
  onRequestQuote
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(mapUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="location-map-section" className="py-16 sm:py-24 bg-[#08080a] text-white relative overflow-hidden border-t border-white/10 bg-grid-pattern">
      {/* Subtle gold ambient glow background */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#f5be38]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#f5be38]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f5be38]/15 border border-[#f5be38]/30 text-[#f5be38] text-xs font-black tracking-widest uppercase">
            <MapPin className="w-3.5 h-3.5 text-[#f5be38] animate-bounce" />
            <span>Official Factory &amp; Operations Map</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
            Find Us on <span className="text-[#f5be38] drop-shadow-sm">Google Maps</span>
          </h2>
          
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
            Visit our commercial production plant, design studio, and dispatch center. We serve walk-in consultations, corporate print proofs, and provide 3–5 day express delivery across Nigeria.
          </p>
        </motion.div>

        {/* Map Container & Interactive Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left / Top on Mobile: Interactive Google Map Display */}
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 flex flex-col"
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-[#121217] shadow-2xl flex-1 min-h-[360px] sm:min-h-[420px] flex flex-col hover:border-[#f5be38]/40 transition-colors">
              
              {/* Top Floating Badge Bar over the map */}
              <div className="absolute top-3 left-3 right-3 sm:right-auto z-20 flex items-center justify-between gap-2 bg-[#0c0d14]/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15 shadow-xl">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#f5be38]/20 border border-[#f5be38]/30 flex items-center justify-center text-[#f5be38] shrink-0">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-white flex items-center gap-1.5">
                      <span>Silver &amp; Gold Inkshine Ltd</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div className="text-[11px] text-stone-400">
                      Live GPS Verified Location
                    </div>
                  </div>
                </div>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#f5be38] hover:bg-[#ffd15c] text-black text-xs font-bold transition-all shadow-md shrink-0 cursor-pointer"
                >
                  <span>Open Full Map</span>
                  <ExternalLink className="w-3.5 h-3.5 text-black" />
                </motion.a>
              </div>

              {/* Google Maps iFrame */}
              <iframe
                title="Silver & Gold Inkshine Ltd Google Maps Location"
                src={embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '380px' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full flex-1 block filter contrast-105"
              />

              {/* Bottom Quick Bar on Map */}
              <div className="bg-[#0e1017] p-3 sm:px-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-stone-300 font-mono text-[11px] sm:text-xs truncate max-w-full sm:max-w-md">
                  <span className="text-[#f5be38] font-bold shrink-0">Map Line:</span>
                  <span className="text-stone-200 truncate select-all">{mapUrl}</span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={handleCopyLink}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-200 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </motion.button>

                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#f5be38] hover:bg-[#ffd15c] text-black font-extrabold text-xs transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get Directions</span>
                  </motion.a>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right Column: Address Details & Contact Channels */}
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex flex-col gap-4"
          >
            
            {/* Primary Location Card */}
            <div className="p-5 sm:p-6 rounded-3xl bg-[#121217] border border-white/10 backdrop-blur-md space-y-4 shadow-xl">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#f5be38]/20 border border-[#f5be38]/30 flex items-center justify-center text-[#f5be38] shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-extrabold text-white text-base">
                    Factory &amp; Head Office
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    Silver &amp; Gold Inkshine Ltd Commercial Press Complex, Bayelsa State &amp; Lagos Regional Hub, Nigeria.
                  </p>
                </div>
              </div>

              {/* Direct Map Line Box */}
              <div className="p-3 rounded-2xl bg-black/60 border border-[#f5be38]/25 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-[#f5be38] font-bold">
                  <span className="flex items-center gap-1">
                    <Navigation className="w-3 h-3" />
                    Direct Google Maps Line
                  </span>
                  <span className="text-[10px] text-stone-400">1-Click Access</span>
                </div>
                
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#ffd15c] hover:text-white transition-colors break-all group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate">{mapUrl}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#f5be38] shrink-0" />
                  </div>
                </a>
              </div>

              {/* Operating Hours */}
              <div className="pt-2 border-t border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-200">
                  <Clock className="w-4 h-4 text-[#f5be38] shrink-0" />
                  <span>Press Working Hours</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-stone-300">
                  <div className="bg-[#181822] p-2.5 rounded-xl border border-white/5">
                    <div className="text-stone-400 text-[11px]">Mon – Friday</div>
                    <div className="font-bold text-white">8:00 AM – 6:00 PM</div>
                  </div>
                  <div className="bg-[#181822] p-2.5 rounded-xl border border-white/5">
                    <div className="text-stone-400 text-[11px]">Saturday</div>
                    <div className="font-bold text-white">9:00 AM – 4:00 PM</div>
                  </div>
                </div>
              </div>

              {/* Courier & Delivery Feature */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#f5be38]/10 border border-[#f5be38]/25 text-xs text-stone-200">
                <Truck className="w-4 h-4 text-[#f5be38] shrink-0" />
                <span className="leading-snug">
                  Doorstep delivery available across all 36 Nigerian states &amp; FCT Abuja in 3–5 working days.
                </span>
              </div>
            </div>

            {/* Quick Action Buttons Card */}
            <div className="p-4 rounded-3xl bg-[#121217] border border-white/10 flex flex-col gap-2.5 shadow-xl">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://wa.me/2347030372539?text=Hello%20Silver%20%26%20Gold%20Inkshine%2C%20I%20saw%20your%20Google%20Maps%20location%20and%20would%20like%20to%20place%20a%20print%20order."
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
              >
                <span>Chat with Operations on WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </motion.a>

              <div className="grid grid-cols-2 gap-2">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="tel:+2347030372539"
                  className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-stone-200 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-white/10 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-[#f5be38]" />
                  <span>Call Direct</span>
                </motion.a>

                {onRequestQuote && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={onRequestQuote}
                    className="py-2.5 px-3 rounded-xl bg-[#f5be38] hover:bg-[#ffd15c] text-black font-extrabold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer shadow-md active:scale-98"
                  >
                    <span>Instant Quote</span>
                  </motion.button>
                )}
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
