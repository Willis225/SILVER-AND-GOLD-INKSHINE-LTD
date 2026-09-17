import React from 'react';
import { motion, type Variants } from 'motion/react';
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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const headlineContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0.12,
    },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(3px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const HEADLINE_WORDS = [
  "No.1", "Online", "Printing", "Company", "in", "Bayelsa", "–", "Banners,", "Branding", "&", "Digital", "Printing"
];

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
          className="w-full h-full object-cover object-center opacity-60"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Subtle warm gold ambient atmospheric light blooms */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(235,208,127,0.12)_0%,rgba(212,175,55,0.04)_45%,transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,rgba(223,188,94,0.03)_50%,transparent_70%)] blur-2xl pointer-events-none" />

      {/* Subtle depth gradient transition into following sections */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#07080a] to-transparent pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Exact Headline, Eyebrow Pill & CTAs with Smooth Entrance Animations */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 xl:col-span-6 space-y-6"
          >
            {/* Eyebrow Pill Badge with Gold Accent */}
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#ebd07f]/30 bg-[#ebd07f]/10 text-xs text-stone-200 backdrop-blur-md shadow-xs group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#ebd07f] animate-pulse" />
              <span className="tracking-wide">Bring your business to the best scale</span>
              <Sparkles className="w-3 h-3 text-[#ebd07f] opacity-80" />
            </motion.div>

            {/* The bold headline with staggered animated word entrance */}
            <motion.h1 
              variants={headlineContainerVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[52px] font-black tracking-tight text-white leading-[1.12] drop-shadow-sm flex flex-wrap"
            >
              {HEADLINE_WORDS.map((word, idx) => (
                <motion.span
                  key={idx}
                  variants={wordVariants}
                  className="inline-block mr-[0.24em] last:mr-0"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subtitle text animated appearance */}
            <motion.p 
              variants={itemVariants}
              className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal"
            >
              Select from top print collections, guaranteeing precision color matching and pre-press audit. Need custom specs or large volume? Fast turnaround and nationwide doorstep delivery across Nigeria!
            </motion.p>

            {/* Action Buttons: Gold Background with Crisp White Typography */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3.5 pt-1"
            >
              {/* WhatsApp Button: Rich Gold with White Text */}
              <a
                href="https://wa.me/2347030372539?text=Hello%20Silver%20%26%20Gold%20Inkshine%20Ltd%2C%20I%20would%20like%20to%20inquire%20about%20printing%20services"
                target="_blank"
                rel="noreferrer"
                id="hero-whatsapp-btn"
                className="relative overflow-hidden bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#b8860b] hover:from-[#e5c158] hover:via-[#fae8aa] hover:to-[#d4af37] active:scale-98 text-white font-extrabold text-xs sm:text-sm px-5 py-3.5 rounded-md flex items-center gap-2.5 shadow-lg shadow-black/50 border border-[#fae8aa]/50 transition-all group"
              >
                {/* Continuous subtle metallic light sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform pointer-events-none" />

                {/* WhatsApp Chat Bubble Icon in Pure White */}
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-4 h-4 fill-white shrink-0"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span className="text-white">Chat on WhatsApp Now</span>
              </a>

              {/* View Our Services: Transparent Button with White Border */}
              <button
                onClick={onExploreProducts}
                id="hero-view-services-btn"
                className="relative bg-transparent hover:bg-white/10 active:scale-98 border-2 border-white text-white font-bold text-xs sm:text-sm px-5 py-3.5 rounded-md transition-all shadow-md shadow-black/30 flex items-center gap-2 group backdrop-blur-xs"
              >
                <span className="text-white">View Our Services</span>
                <ArrowRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>

            {/* Quick-links / Features pill indicators with entrance animation */}
            <motion.div 
              variants={itemVariants}
              className="pt-2 flex flex-wrap items-center gap-4 text-xs text-stone-200"
            >
              <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
                <CheckCircle2 className="w-4 h-4 text-[#ebd07f] shrink-0" />
                <span className="font-medium">Same-Day &amp; 24hr Turnaround</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
                <CheckCircle2 className="w-4 h-4 text-[#ebd07f] shrink-0" />
                <span className="font-medium">Free Bleed &amp; Pre-Press Audit</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
                <CheckCircle2 className="w-4 h-4 text-[#ebd07f] shrink-0" />
                <span className="font-medium">Bayelsa &amp; Nationwide Delivery</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: 3D-feel Brand Suite Mockup Scene with Fluid Entrance */}
          <motion.div 
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 xl:col-span-6 flex flex-col items-center lg:items-end"
          >
            <div className="w-full max-w-xl relative">
              
              {/* Product Visual Presentation Scene Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-b from-[#14151b]/95 via-[#0a0a0d]/98 to-[#040406] border border-[#ebd07f]/25 p-3 sm:p-4 backdrop-blur-md ring-1 ring-[#ebd07f]/10">
                
                {/* Visual Viewport */}
                <div className="relative w-full h-[290px] sm:h-[330px] md:h-[360px] flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-[#181a22]/70 to-[#050507]/98">
                  
                  {/* Background Gold Glow */}
                  <div className="absolute inset-0 bg-radial from-[#ebd07f]/20 via-transparent to-transparent pointer-events-none" />

                  {/* 3D BRAND SUITE COMPOSITE SVG */}
                  <div className="w-full h-full flex items-center justify-center relative z-10">
                    <svg 
                      viewBox="0 0 760 420" 
                      className="w-full h-full object-contain filter drop-shadow-xl"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Shadow Ground Plane */}
                      <ellipse cx="380" cy="380" rx="340" ry="24" fill="#050608" opacity="0.8" />

                      {/* 1. Canopy Gazebo Tent in Gold & White */}
                      <g id="canopy-tent" transform="translate(180, 70)">
                        <polygon points="120,0 30,70 210,70" fill="#dfbc5e" />
                        <polygon points="120,0 210,70 240,65 140,0" fill="#c59b27" />
                        <polygon points="30,70 210,70 210,88 30,88" fill="#ffffff" />
                        <text x="120" y="82" textAnchor="middle" fill="#8c6d1f" fontSize="9.5" fontWeight="900" letterSpacing="1">
                          SILVER &amp; GOLD INKSHINE
                        </text>
                        <line x1="35" y1="88" x2="35" y2="280" stroke="#cbd5e1" strokeWidth="4" />
                        <line x1="205" y1="88" x2="205" y2="280" stroke="#cbd5e1" strokeWidth="4" />
                        <line x1="120" y1="88" x2="120" y2="260" stroke="#94a3b8" strokeWidth="2.5" />
                        <circle cx="120" cy="40" r="14" fill="#ffffff" />
                        <text x="120" y="45" textAnchor="middle" fill="#c59b27" fontSize="12" fontWeight="900">SG</text>
                      </g>

                      {/* 2. Branded Fleet Vehicle in White with Gold Wrap */}
                      <g id="branded-car" transform="translate(205, 175)">
                        <path 
                          d="M20,130 C25,115 50,85 100,75 C140,68 180,68 200,95 L225,108 C235,115 240,125 240,135 L10,135 Z" 
                          fill="#f8fafc" 
                          stroke="#e2e8f0" 
                          strokeWidth="1.5"
                        />
                        <path d="M70,82 L100,75 L150,75 L155,105 L60,105 Z" fill="#334155" opacity="0.85" />
                        <path d="M162,76 L195,95 L195,105 L162,105 Z" fill="#334155" opacity="0.85" />
                        <path 
                          d="M30,132 C70,120 110,85 180,95 C210,100 230,125 235,135 L200,135 C170,125 130,100 80,125 Z" 
                          fill="#c59b27" 
                        />
                        <path 
                          d="M50,135 C90,125 130,95 190,105 C215,110 228,125 232,135 Z" 
                          fill="#ebd07f" 
                        />
                        <circle cx="65" cy="140" r="22" fill="#1e293b" />
                        <circle cx="65" cy="140" r="12" fill="#cbd5e1" />
                        <circle cx="195" cy="140" r="22" fill="#1e293b" />
                        <circle cx="195" cy="140" r="12" fill="#cbd5e1" />
                        <rect x="105" y="112" width="56" height="15" rx="3" fill="#ffffff" opacity="0.95" />
                        <text x="133" y="123" textAnchor="middle" fill="#8c6d1f" fontSize="6.5" fontWeight="900">SILVER &amp; GOLD</text>
                      </g>

                      {/* 3. Gold Feather Flag Banner */}
                      <g id="feather-flag" transform="translate(485, 80)">
                        <path d="M5,270 L5,40 C5,15 35,5 50,5" fill="none" stroke="#64748b" strokeWidth="3" />
                        <path 
                          d="M7,20 C20,10 45,5 50,5 C55,5 55,160 35,210 C20,245 8,260 8,260 Z" 
                          fill="#dfbc5e" 
                        />
                        <circle cx="28" cy="45" r="10" fill="#ffffff" />
                        <text x="28" y="49" textAnchor="middle" fill="#b8860b" fontSize="10" fontWeight="900">b</text>
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

                      {/* 4. Promotional Sampling Counter Stand */}
                      <g id="promotional-counter" transform="translate(520, 100)">
                        <rect x="15" y="10" width="80" height="24" rx="3" fill="#dfbc5e" />
                        <text x="55" y="26" textAnchor="middle" fill="#1e293b" fontSize="7" fontWeight="900">
                          STAND BANNER
                        </text>
                        <line x1="20" y1="34" x2="20" y2="120" stroke="#94a3b8" strokeWidth="2" />
                        <line x1="90" y1="34" x2="90" y2="120" stroke="#94a3b8" strokeWidth="2" />
                        <g transform="translate(35, 38)">
                          <circle cx="20" cy="18" r="13" fill="#8d5b4c" />
                          <path d="M7,16 C7,7 33,7 33,16 C33,12 30,5 20,5 C10,5 7,12 7,16 Z" fill="#1c1917" />
                          <path d="M7,32 C7,32 14,28 20,28 C26,28 33,32 33,32 L36,65 L4,65 Z" fill="#ffffff" />
                          <ellipse cx="20" cy="48" rx="14" ry="7" fill="#f8fafc" stroke="#e2e8f0" />
                          <rect x="12" y="44" width="16" height="7" rx="3" fill="#8d5b4c" />
                        </g>
                        <path 
                          d="M10,130 C10,122 100,122 100,130 L95,220 C95,224 15,224 15,220 Z" 
                          fill="#dfbc5e" 
                        />
                        <circle cx="55" cy="165" r="14" fill="#ffffff" />
                        <text x="55" y="170" textAnchor="middle" fill="#8c6d1f" fontSize="12" fontWeight="900">SG</text>
                        <text x="55" y="195" textAnchor="middle" fill="#1f2937" fontSize="7" fontWeight="900" letterSpacing="0.5">
                          SILVER &amp; GOLD
                        </text>
                        <text x="55" y="204" textAnchor="middle" fill="#1f2937" fontSize="5.5" fontWeight="700">
                          INKSHINE LTD
                        </text>
                      </g>

                      {/* 5. Luxury Rollup Pull-Up Banner Stand Mockup */}
                      <g id="rollup-stand" transform="translate(625, 105)">
                        <rect x="0" y="20" width="75" height="195" rx="2" fill="#dfbc5e" />
                        <circle cx="37" cy="55" r="12" fill="#ffffff" />
                        <text x="37" y="60" textAnchor="middle" fill="#8c6d1f" fontSize="11" fontWeight="900">SG</text>
                        <text x="37" y="78" textAnchor="middle" fill="#1f2937" fontSize="6.5" fontWeight="900" letterSpacing="0.5">
                          SILVER &amp; GOLD
                        </text>
                        <text x="37" y="86" textAnchor="middle" fill="#1f2937" fontSize="5" fontWeight="700">
                          INKSHINE LTD
                        </text>
                        <rect x="5" y="125" width="65" height="85" rx="2" fill="#b8860b" />
                        <circle cx="37" cy="155" r="16" fill="#fae8aa" />
                        <rect x="-8" y="215" width="91" height="18" rx="4" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
                        <ellipse cx="-8" cy="224" rx="4" ry="7" fill="#94a3b8" />
                        <ellipse cx="83" cy="224" rx="4" ry="7" fill="#94a3b8" />
                      </g>

                      {/* 6. Promotional Merchandise Foreground in Gold & White */}
                      <g id="tshirt" transform="translate(145, 230)">
                        <path 
                          d="M25,15 L45,28 L65,15 L80,38 L68,48 L68,110 L22,110 L22,48 L10,38 Z" 
                          fill="#dfbc5e" 
                        />
                        <path d="M38,15 C38,24 52,24 52,15 Z" fill="#8c6d1f" />
                        <circle cx="45" cy="46" r="6" fill="#ffffff" />
                        <text x="45" y="49" textAnchor="middle" fill="#8c6d1f" fontSize="5" fontWeight="900">SG</text>
                        <text x="45" y="58" textAnchor="middle" fill="#1e293b" fontSize="3.5" fontWeight="800">INKSHINE</text>
                        <path d="M22,95 C45,82 68,95 68,95 L68,110 L22,110 Z" fill="#ebd07f" />
                      </g>

                      <g id="gift-bag" transform="translate(230, 245)">
                        <polygon points="10,35 65,35 60,110 5,110" fill="#fae8aa" />
                        <polygon points="65,35 80,45 75,118 60,110" fill="#dfbc5e" />
                        <path d="M25,35 C25,18 45,18 45,35" fill="none" stroke="#ffffff" strokeWidth="2.5" />
                        <circle cx="35" cy="65" r="7" fill="#ffffff" />
                        <text x="35" y="68" textAnchor="middle" fill="#8c6d1f" fontSize="6" fontWeight="900">SG</text>
                        <text x="35" y="79" textAnchor="middle" fill="#1f2937" fontSize="4.5" fontWeight="900">INKSHINE</text>
                      </g>

                      <g id="mugs-caps" transform="translate(310, 270)">
                        <rect x="0" y="25" width="26" height="28" rx="2" fill="#ffffff" />
                        <path d="M26,30 C34,30 34,46 26,46" fill="none" stroke="#ffffff" strokeWidth="3" />
                        <circle cx="13" cy="38" r="4" fill="#dfbc5e" />
                        <rect x="35" y="5" width="18" height="48" rx="3" fill="#f8fafc" />
                        <rect x="40" y="0" width="8" height="5" rx="1" fill="#cbd5e1" />
                        <rect x="35" y="20" width="18" height="8" fill="#dfbc5e" />
                        <path d="M60,40 C60,25 85,25 95,38 L110,48 L85,48 Z" fill="#ffffff" />
                        <circle cx="78" cy="33" r="3" fill="#dfbc5e" />
                      </g>

                      <g id="umbrella" transform="translate(415, 255)">
                        <path d="M5,45 C15,10 65,10 75,45 C65,42 55,48 40,43 C25,48 15,42 5,45 Z" fill="#ffffff" />
                        <path d="M20,44 C28,20 42,20 50,44 C42,42 30,42 20,44 Z" fill="#dfbc5e" />
                        <line x1="40" y1="18" x2="40" y2="70" stroke="#475569" strokeWidth="2.5" />
                        <path d="M40,70 C40,76 34,76 34,70" fill="none" stroke="#475569" strokeWidth="2.5" />
                      </g>
                    </svg>
                  </div>
                </div>

                {/* Tagline right below the visual with smooth entrance */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.45 }}
                  className="pt-3 pb-1 text-center flex items-center justify-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ebd07f] animate-ping" />
                  <p className="text-white font-black text-xs sm:text-sm tracking-normal drop-shadow-xs">
                    Design, Print, and Package your Business with Confidence
                  </p>
                </motion.div>
              </div>

              {/* Interactive Quick Configure Strip below the card with smooth entrance */}
              <motion.div 
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="mt-3 flex items-center justify-between text-xs px-2 text-stone-200"
              >
                <span className="text-stone-300 flex items-center gap-1 text-[11px] sm:text-xs">
                  <span className="w-2 h-2 rounded-full bg-[#ebd07f] animate-ping" />
                  Popular: Luxury Teardrop Rollup Banners (₦34,500)
                </span>
                <button
                  onClick={() => onSelectProductQuickView('prod-rollup-luxury')}
                  className="font-bold text-[#ebd07f] hover:text-white underline text-[11px] sm:text-xs flex items-center gap-1 transition-colors"
                >
                  <span>Configure Now</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
