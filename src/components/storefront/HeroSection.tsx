import React from 'react';
import { 
  ArrowRight, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface HeroSectionProps {
  onExploreProducts: () => void;
  onOpenPricingSandbox: () => void;
  onSelectProductQuickView: (productId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProducts,
  onOpenPricingSandbox,
  onSelectProductQuickView,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#07080a] text-white pt-8 pb-14 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24">
      {/* 
        Dark Sleek Minimalist UI Website Hero Background:
        - Moody dark aesthetic with dark charcoal textured backdrop
        - Soft subtle vertical silky light rays and shadows falling top-to-bottom
        - Faint subtle geometric grid lines in the center
      */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <img 
          src="/assets/hero-dark-texture.svg" 
          alt="Dark sleek minimalist hero background with vertical silky light rays and faint geometric grid" 
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Subtle depth gradient to ensure buttery seamless transition into following sections */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#07080a] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Exact Headline, Eyebrow Pill & CTAs */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-6">
            
            {/* Eyebrow Pill Badge matching the reference image */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 text-xs text-stone-300 backdrop-blur-md shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d5ea1b] animate-pulse" />
              <span className="tracking-wide">Bring your business to the best scale</span>
            </div>

            {/* The bold headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[52px] font-black tracking-tight text-white leading-[1.12] drop-shadow-sm">
              No.1 Online Printing Company in Bayelsa – Banners, Branding &amp; Digital Printing
            </h1>

            {/* Subtitle text matching reference styling */}
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
              Select from top print collections, guaranteeing precision color matching and pre-press audit. Need custom specs or large volume? Fast turnaround and nationwide doorstep delivery across Nigeria!
            </p>

            {/* Action Buttons matching screenshot exactly */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              {/* WhatsApp Button: Light Gold with WhatsApp speech bubble icon */}
              <a
                href="https://wa.me/2349028694908?text=Hello%20Silver%20%26%20Gold%20Inkshine%20Ltd%2C%20I%20would%20like%20to%20inquire%20about%20printing%20services"
                target="_blank"
                rel="noreferrer"
                id="hero-whatsapp-btn"
                className="bg-gradient-to-r from-[#ebd07f] via-[#fae8aa] to-[#dfbc5e] hover:from-[#f3de98] hover:via-[#fff1c0] hover:to-[#e8cb76] active:scale-98 text-[#1c1606] font-black text-xs sm:text-sm px-4 sm:px-5 py-3 rounded-md flex items-center gap-2 shadow-lg shadow-black/40 border border-[#fbf1be]/60 transition-all group"
              >
                {/* WhatsApp Chat Bubble Icon */}
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-4 h-4 fill-current shrink-0"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>Chat on WhatsApp Now</span>
              </a>

              {/* View Our Services: Outlined White Button */}
              <button
                onClick={onExploreProducts}
                id="hero-view-services-btn"
                className="bg-transparent hover:bg-white/10 active:scale-98 border border-white text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-md transition-all"
              >
                View Our Services
              </button>
            </div>

            {/* Quick-links / Features pill indicators */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-stone-200">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#ebd07f]" />
                <span className="font-medium">Same-Day &amp; 24hr Turnaround</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#ebd07f]" />
                <span className="font-medium">Free Bleed &amp; Pre-Press Audit</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#ebd07f]" />
                <span className="font-medium">Bayelsa &amp; Nationwide Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Column: Exact Branding Mockup Composite Suite */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-center lg:items-end">
            <div className="w-full max-w-xl relative">
              {/* Product Visual Presentation Scene */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-b from-[#14151b]/90 via-[#0a0a0d]/95 to-[#040406]/98 border border-white/15 p-3 sm:p-4 backdrop-blur-md ring-1 ring-white/10">
                
                {/* Live Composite Graphic matching the screenshot */}
                <div className="relative w-full h-[260px] sm:h-[310px] md:h-[340px] flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-[#181a22]/40 to-[#050507]/90">
                  
                  {/* Subtle Background Glow behind the mockup */}
                  <div className="absolute inset-0 bg-radial from-white/10 via-transparent to-transparent pointer-events-none" />

                  {/* SVG Illustration Representation of the exact scene: Canopy tent, Car, T-shirt, Bag, Mugs, Feather flag, Sampling Counter with Brand Ambassador, Rollup banner */}
                  <svg 
                    viewBox="0 0 760 420" 
                    className="w-full h-full object-contain filter drop-shadow-xl"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Shadow Ground Plane */}
                    <ellipse cx="380" cy="380" rx="340" ry="24" fill="#050608" opacity="0.8" />

                    {/* 1. Canopy Gazebo Tent (Center-left back) */}
                    <g id="canopy-tent" transform="translate(180, 70)">
                      {/* Tent Roof Slopes */}
                      <polygon points="120,0 30,70 210,70" fill="#00a896" />
                      <polygon points="120,0 210,70 240,65 140,0" fill="#028a7b" />
                      {/* Roof Valance Banner */}
                      <polygon points="30,70 210,70 210,88 30,88" fill="#ffffff" />
                      <text x="120" y="82" textAnchor="middle" fill="#004e38" fontSize="9.5" fontWeight="900" letterSpacing="1">
                        SILVER &amp; GOLD INKSHINE
                      </text>
                      {/* Tent Legs (Aluminum Telescopic Poles) */}
                      <line x1="35" y1="88" x2="35" y2="280" stroke="#cbd5e1" strokeWidth="4" />
                      <line x1="205" y1="88" x2="205" y2="280" stroke="#cbd5e1" strokeWidth="4" />
                      <line x1="120" y1="88" x2="120" y2="260" stroke="#94a3b8" strokeWidth="2.5" />
                      {/* Tent Peak Logo */}
                      <circle cx="120" cy="40" r="14" fill="#ffffff" />
                      <text x="120" y="45" textAnchor="middle" fill="#eab308" fontSize="12" fontWeight="900">SG</text>
                    </g>

                    {/* 2. Branded Fleet Vehicle (Under tent / Center) */}
                    <g id="branded-car" transform="translate(205, 175)">
                      {/* Car Body Base (White Modern Hatchback) */}
                      <path 
                        d="M20,130 C25,115 50,85 100,75 C140,68 180,68 200,95 L225,108 C235,115 240,125 240,135 L10,135 Z" 
                        fill="#f8fafc" 
                        stroke="#e2e8f0" 
                        strokeWidth="1.5"
                      />
                      {/* Windows */}
                      <path d="M70,82 L100,75 L150,75 L155,105 L60,105 Z" fill="#334155" opacity="0.85" />
                      <path d="M162,76 L195,95 L195,105 L162,105 Z" fill="#334155" opacity="0.85" />
                      {/* Green & Yellow Branding Swoosh Vinyl Wrap */}
                      <path 
                        d="M30,132 C70,120 110,85 180,95 C210,100 230,125 235,135 L200,135 C170,125 130,100 80,125 Z" 
                        fill="#68b611" 
                      />
                      <path 
                        d="M50,135 C90,125 130,95 190,105 C215,110 228,125 232,135 Z" 
                        fill="#d5ea1b" 
                      />
                      {/* Car Wheels */}
                      <circle cx="65" cy="140" r="22" fill="#1e293b" />
                      <circle cx="65" cy="140" r="12" fill="#94a3b8" />
                      <circle cx="195" cy="140" r="22" fill="#1e293b" />
                      <circle cx="195" cy="140" r="12" fill="#94a3b8" />
                      {/* Brand Door Logo */}
                      <rect x="105" y="112" width="56" height="15" rx="3" fill="#ffffff" opacity="0.9" />
                      <text x="133" y="123" textAnchor="middle" fill="#004e38" fontSize="6.5" fontWeight="900">SILVER &amp; GOLD</text>
                    </g>

                    {/* 3. Yellow Feather Flag Banner (Middle Right) */}
                    <g id="feather-flag" transform="translate(485, 80)">
                      {/* Flag Pole (Carbon Curve) */}
                      <path d="M5,270 L5,40 C5,15 35,5 50,5" fill="none" stroke="#475569" strokeWidth="3" />
                      {/* Vibrant Yellow Curved Fabric */}
                      <path 
                        d="M7,20 C20,10 45,5 50,5 C55,5 55,160 35,210 C20,245 8,260 8,260 Z" 
                        fill="#eab308" 
                      />
                      {/* Feather Flag Logo & Text */}
                      <circle cx="28" cy="45" r="10" fill="#ffffff" />
                      <text x="28" y="49" textAnchor="middle" fill="#004e38" fontSize="10" fontWeight="900">b</text>
                      <text 
                        x="28" 
                        y="150" 
                        textAnchor="middle" 
                        fill="#1f2937" 
                        fontSize="9" 
                        fontWeight="900" 
                        transform="rotate(-90 28 150)"
                        letterSpacing="1"
                      >
                        FEATHER FLAG BANNER
                      </text>
                    </g>

                    {/* 4. Promotional Sampling Counter Stand with Brand Ambassador Lady (Right center) */}
                    <g id="promotional-counter" transform="translate(520, 100)">
                      {/* Top Header Banner ("STAND BANNER MOCKUP") */}
                      <rect x="15" y="10" width="80" height="24" rx="3" fill="#eab308" />
                      <text x="55" y="26" textAnchor="middle" fill="#1e293b" fontSize="7" fontWeight="900">
                        STAND BANNER
                      </text>
                      <line x1="20" y1="34" x2="20" y2="120" stroke="#94a3b8" strokeWidth="2" />
                      <line x1="90" y1="34" x2="90" y2="120" stroke="#94a3b8" strokeWidth="2" />

                      {/* Smiling Brand Ambassador Figure */}
                      <g transform="translate(35, 38)">
                        {/* Head */}
                        <circle cx="20" cy="18" r="13" fill="#8d5b4c" />
                        {/* Hair */}
                        <path d="M7,16 C7,7 33,7 33,16 C33,12 30,5 20,5 C10,5 7,12 7,16 Z" fill="#1c1917" />
                        {/* White Top / Arms Crossed */}
                        <path d="M7,32 C7,32 14,28 20,28 C26,28 33,32 33,32 L36,65 L4,65 Z" fill="#ffffff" />
                        {/* Crossed Arms */}
                        <ellipse cx="20" cy="48" rx="14" ry="7" fill="#f8fafc" stroke="#e2e8f0" />
                        <rect x="12" y="44" width="16" height="7" rx="3" fill="#8d5b4c" />
                      </g>

                      {/* Counter Table Body (Yellow Curved Desk) */}
                      <path 
                        d="M10,130 C10,122 100,122 100,130 L95,220 C95,224 15,224 15,220 Z" 
                        fill="#eab308" 
                      />
                      {/* Counter Table Logo */}
                      <circle cx="55" cy="165" r="14" fill="#ffffff" />
                      <text x="55" y="170" textAnchor="middle" fill="#004e38" fontSize="12" fontWeight="900">SG</text>
                      <text x="55" y="195" textAnchor="middle" fill="#1f2937" fontSize="7" fontWeight="900" letterSpacing="0.5">
                        SILVER &amp; GOLD
                      </text>
                      <text x="55" y="204" textAnchor="middle" fill="#1f2937" fontSize="5.5" fontWeight="700">
                        INKSHINE LTD
                      </text>
                    </g>

                    {/* 5. Luxury Rollup Pull-Up Banner Stand Mockup (Far Right) */}
                    <g id="rollup-stand" transform="translate(625, 105)">
                      {/* Banner Media Face (Vibrant Yellow with Corporate Photo Mockup) */}
                      <rect x="0" y="20" width="75" height="195" rx="2" fill="#eab308" />
                      {/* Graphic Header on Banner */}
                      <circle cx="37" cy="55" r="12" fill="#ffffff" />
                      <text x="37" y="60" textAnchor="middle" fill="#004e38" fontSize="11" fontWeight="900">SG</text>
                      <text x="37" y="78" textAnchor="middle" fill="#1f2937" fontSize="6.5" fontWeight="900" letterSpacing="0.5">
                        SILVER &amp; GOLD
                      </text>
                      <text x="37" y="86" textAnchor="middle" fill="#1f2937" fontSize="5" fontWeight="700">
                        INKSHINE LTD
                      </text>
                      {/* Photo Inset Graphic at bottom of banner */}
                      <rect x="5" y="125" width="65" height="85" rx="2" fill="#d97706" />
                      <circle cx="37" cy="155" r="16" fill="#fde68a" />
                      {/* Aluminum Teardrop Base Cassette */}
                      <rect x="-8" y="215" width="91" height="18" rx="4" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
                      {/* Chrome Teardrop End-Cap */}
                      <ellipse cx="-8" cy="224" rx="4" ry="7" fill="#94a3b8" />
                      <ellipse cx="83" cy="224" rx="4" ry="7" fill="#94a3b8" />
                    </g>

                    {/* 6. Promotional Merchandise Foreground (Left & Center-Front) */}
                    {/* Branded Yellow T-Shirt */}
                    <g id="tshirt" transform="translate(145, 230)">
                      <path 
                        d="M25,15 L45,28 L65,15 L80,38 L68,48 L68,110 L22,110 L22,48 L10,38 Z" 
                        fill="#eab308" 
                      />
                      {/* Collar Cutout */}
                      <path d="M38,15 C38,24 52,24 52,15 Z" fill="#004e38" />
                      {/* T-shirt Logo */}
                      <circle cx="45" cy="46" r="6" fill="#ffffff" />
                      <text x="45" y="49" textAnchor="middle" fill="#004e38" fontSize="5" fontWeight="900">SG</text>
                      <text x="45" y="58" textAnchor="middle" fill="#1e293b" fontSize="3.5" fontWeight="800">INKSHINE</text>
                      {/* Bottom swoosh */}
                      <path d="M22,95 C45,82 68,95 68,95 L68,110 L22,110 Z" fill="#68b611" />
                    </g>

                    {/* Branded Shopping Bag */}
                    <g id="gift-bag" transform="translate(230, 245)">
                      {/* Bag Body */}
                      <polygon points="10,35 65,35 60,110 5,110" fill="#facc15" />
                      <polygon points="65,35 80,45 75,118 60,110" fill="#eab308" />
                      {/* Bag Handles */}
                      <path d="M25,35 C25,18 45,18 45,35" fill="none" stroke="#ffffff" strokeWidth="2.5" />
                      {/* Bag Logo */}
                      <circle cx="35" cy="65" r="7" fill="#ffffff" />
                      <text x="35" y="68" textAnchor="middle" fill="#004e38" fontSize="6" fontWeight="900">SG</text>
                      <text x="35" y="79" textAnchor="middle" fill="#1f2937" fontSize="4.5" fontWeight="900">INKSHINE</text>
                    </g>

                    {/* Ceramic Mugs & Caps */}
                    <g id="mugs-caps" transform="translate(310, 270)">
                      {/* White Mug with logo */}
                      <rect x="0" y="25" width="26" height="28" rx="2" fill="#ffffff" />
                      <path d="M26,30 C34,30 34,46 26,46" fill="none" stroke="#ffffff" strokeWidth="3" />
                      <circle cx="13" cy="38" r="4" fill="#68b611" />
                      {/* Water Bottle / Flask */}
                      <rect x="35" y="5" width="18" height="48" rx="3" fill="#f8fafc" />
                      <rect x="40" y="0" width="8" height="5" rx="1" fill="#cbd5e1" />
                      <rect x="35" y="20" width="18" height="8" fill="#eab308" />
                      {/* Branded Cap */}
                      <path d="M60,40 C60,25 85,25 95,38 L110,48 L85,48 Z" fill="#ffffff" />
                      <circle cx="78" cy="33" r="3" fill="#00a896" />
                    </g>

                    {/* Branded Umbrella (White & Green Panels) */}
                    <g id="umbrella" transform="translate(415, 255)">
                      <path d="M5,45 C15,10 65,10 75,45 C65,42 55,48 40,43 C25,48 15,42 5,45 Z" fill="#ffffff" />
                      <path d="M20,44 C28,20 42,20 50,44 C42,42 30,42 20,44 Z" fill="#68b611" />
                      {/* Ferrule tip and handle */}
                      <line x1="40" y1="18" x2="40" y2="70" stroke="#475569" strokeWidth="2.5" />
                      <path d="M40,70 C40,76 34,76 34,70" fill="none" stroke="#475569" strokeWidth="2.5" />
                    </g>
                  </svg>
                </div>

                {/* Tagline right below the visual matching the user's uploaded image exactly */}
                <div className="pt-3 pb-1 text-center">
                  <p className="text-white font-black text-sm sm:text-base tracking-normal drop-shadow-xs">
                    Design, Print, and Package your Business with Confidence
                  </p>
                </div>
              </div>

              {/* Interactive Quick Configure Strip below the card */}
              <div className="mt-3 flex items-center justify-between text-xs px-2 text-stone-200">
                <span className="text-stone-300 flex items-center gap-1 text-[11px] sm:text-xs">
                  <span className="w-2 h-2 rounded-full bg-[#d5ea1b] animate-ping" />
                  Popular: Luxury Teardrop Rollup Banners (₦34,500)
                </span>
                <button
                  onClick={() => onSelectProductQuickView('prod-rollup-luxury')}
                  className="font-bold text-[#d5ea1b] hover:text-white underline text-[11px] sm:text-xs flex items-center gap-1 transition-colors"
                >
                  <span>Configure Now</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
