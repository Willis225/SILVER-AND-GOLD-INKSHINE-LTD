import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface LocationMapSectionProps {
  mapUrl?: string;
  embedUrl?: string;
  onRequestQuote?: () => void;
}

const OFFICIAL_MAP_EMBED_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.799754004253!2d8.672702075019492!3d9.081998990981594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1051630150b084b5%3A0xf18b26f8ebf417f7!2sSILVER%20%26%20GOLD%20PRINTING%20HOUSE!5e0!3m2!1sen!2sng!4v1793657630467!5m2!1sen!2sng';

export const LocationMapSection: React.FC<LocationMapSectionProps> = ({
  mapUrl = 'https://maps.app.goo.gl/FHkoQGNuL8p13jnG6',
  embedUrl,
  onRequestQuote
}) => {
  const validEmbedUrl = 
    embedUrl && embedUrl.includes('google.com/maps')
      ? embedUrl
      : OFFICIAL_MAP_EMBED_URL;

  return (
    <section id="location-map-section" className="py-12 sm:py-16 bg-white text-slate-900 relative overflow-hidden border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs font-mono font-medium text-[#b8860b] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b8860b]" />
            <span>Factory &amp; Studio Location</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            Find Us on <span className="text-[#b8860b]">Google Maps</span>
          </h2>
          
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Visit our commercial production plant and design studio in Yenagoa. We welcome corporate consultations, print proof inspections, and express pickup.
          </p>
        </div>

        {/* Map Display Container */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-stone-200 bg-white shadow-lg flex flex-col hover:border-stone-300 transition-colors">
            
            {/* Google Maps iFrame */}
            <iframe
              title="Silver & Gold Inkshine Ltd Google Maps Location - Silver & Gold Printing House"
              src={validEmbedUrl}
              width="100%"
              height={400}
              style={{
                height: '400px',
                width: '100%',
                opacity: 1,
                border: 0,
                display: 'block',
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              className="w-full block bg-stone-100"
            />

            {/* Bottom Quick Bar on Map */}
            <div className="bg-[#FAF7F2] px-4 py-3.5 border-t border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-stone-700">
                <MapPin className="w-4 h-4 text-[#b8860b] shrink-0" />
                <span className="font-medium text-stone-800">No. 875 Medford Okilo Road, Opolo-Epie, Yenagoa, Bayelsa State</span>
              </div>

              <a
                href={mapUrl}
                target="_blank"
                rel="noreferrer"
                className="h-9 px-4 rounded-full bg-stone-900 hover:bg-black text-white font-bold text-xs inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-sm"
              >
                <Navigation className="w-3.5 h-3.5 text-[#f5be38]" />
                <span>Get Directions</span>
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
