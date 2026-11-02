import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface LocationMapSectionProps {
  mapUrl?: string;
  embedUrl?: string;
  onRequestQuote?: () => void;
}

export const LocationMapSection: React.FC<LocationMapSectionProps> = ({
  mapUrl = 'https://maps.app.goo.gl/FHkoQGNuL8p13jnG6',
  embedUrl,
  onRequestQuote
}) => {
  // Guaranteed valid Google Maps embed URL for Bayelsa, Nigeria
  const validEmbedUrl = 
    embedUrl && embedUrl.includes('google.com/maps') && !embedUrl.includes('9.081999')
      ? embedUrl
      : 'https://maps.google.com/maps?q=No.+875+Medford+Okilo+Road,+Opolo-Epie,+Yenagoa,+Bayelsa+State,+Nigeria&t=&z=15&ie=UTF8&iwloc=&output=embed';

  return (
    <section id="location-map-section" className="py-12 sm:py-16 bg-[#08080a] text-white relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs font-mono font-medium text-[#d4af37] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
            <span>Factory &amp; Studio Location</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Find Us on <span className="text-[#f5be38]">Google Maps</span>
          </h2>
          
          <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
            Visit our commercial production plant and design studio in Yenagoa. We welcome corporate consultations, print proof inspections, and express pickup.
          </p>
        </div>

        {/* Map Display Container */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-white shadow-lg flex flex-col hover:border-white/25 transition-colors">
            
            {/* Google Maps iFrame with explicit height: 350px, width: 100%, opacity: 1 */}
            <iframe
              title="Silver & Gold Inkshine Ltd Google Maps Location - Bayelsa, Nigeria"
              src={validEmbedUrl}
              width="100%"
              height={350}
              style={{
                height: '350px',
                width: '100%',
                opacity: 1,
                border: 0,
                display: 'block',
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full block bg-stone-100"
            />

            {/* Bottom Quick Bar on Map */}
            <div className="bg-[#0b0c12] px-4 py-3.5 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-stone-300">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span className="font-medium text-stone-300">No. 875 Medford Okilo Road, Opolo-Epie, Yenagoa, Bayelsa State</span>
              </div>

              <a
                href={mapUrl}
                target="_blank"
                rel="noreferrer"
                className="h-9 px-4 rounded-full bg-white hover:bg-stone-200 text-black font-bold text-xs inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-sm"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
