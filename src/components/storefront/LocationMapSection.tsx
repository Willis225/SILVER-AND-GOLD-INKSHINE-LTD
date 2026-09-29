import React from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Navigation
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

  return (
    <section id="location-map-section" className="py-16 sm:py-24 bg-[#08080a] text-white relative overflow-hidden border-t border-white/10 bg-grid-pattern">
      {/* Subtle silver ambient glow background */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-black tracking-widest uppercase">
            <MapPin className="w-3.5 h-3.5 text-white" />
            <span>Official Factory &amp; Operations Map</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
            Find Us on <span className="text-white drop-shadow-sm">Google Maps</span>
          </h2>
          
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
            Visit our commercial production plant and design studio. We welcome corporate consultations, print proofs, and offer direct delivery to your location upon request.
          </p>
        </motion.div>

        {/* Interactive Google Map Display */}
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-[#121217] shadow-2xl min-h-[400px] sm:min-h-[480px] flex flex-col hover:border-white/30 transition-colors">
              {/* Google Maps iFrame */}
              <iframe
                title="Silver & Gold Inkshine Ltd Google Maps Location"
                src={embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '440px' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full flex-1 block filter contrast-105"
              />

              {/* Bottom Quick Bar on Map */}
              <div className="bg-[#0e1017] p-3 sm:px-4 border-t border-white/10 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-stone-300 text-xs">
                  <MapPin className="w-4 h-4 text-white shrink-0" />
                  <span className="text-stone-300 font-medium">Commercial Press Complex • Bayelsa State &amp; Nigeria</span>
                </div>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-stone-200 text-black font-extrabold text-xs transition-all shadow-md active:scale-95 cursor-pointer shrink-0"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </motion.a>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
