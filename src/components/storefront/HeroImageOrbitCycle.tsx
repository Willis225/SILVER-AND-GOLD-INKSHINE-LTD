import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flag, 
  Tag, 
  FileText, 
  Megaphone, 
  Package, 
  Shirt, 
  Signpost, 
  Award,
  Sparkles,
  Printer
} from 'lucide-react';

interface ProductPoint {
  id: string;
  name: string;
  actionText: string;
  subtitle: string;
  icon: React.FC<{ className?: string }>;
  angleDeg: number; // Angle in degrees (-90 is top 12 o'clock)
}

const ORBIT_PRODUCTS: ProductPoint[] = [
  {
    id: 'banners',
    name: 'Print Banners',
    actionText: 'Roll-Ups & Backdrops',
    subtitle: 'Heavy Duty Flex',
    icon: Flag,
    angleDeg: -90, // Top center
  },
  {
    id: 'stickers',
    name: 'Print Stickers',
    actionText: 'Vinyl & Bottle Labels',
    subtitle: 'Waterproof Die-Cut',
    icon: Tag,
    angleDeg: -45, // Top right
  },
  {
    id: 'stationery',
    name: 'Business Cards',
    actionText: 'Cards & Letterheads',
    subtitle: 'Corporate Identity',
    icon: FileText,
    angleDeg: 0, // Right center
  },
  {
    id: 'flyers',
    name: 'Print Flyers',
    actionText: 'Promo Handbills',
    subtitle: 'Bulk Discounts',
    icon: Megaphone,
    angleDeg: 45, // Bottom right
  },
  {
    id: 'packaging',
    name: 'Print Packaging',
    actionText: 'Custom Cartons & Boxes',
    subtitle: 'Industrial Board',
    icon: Package,
    angleDeg: 90, // Bottom center
  },
  {
    id: 'apparels',
    name: 'Custom Apparels',
    actionText: 'Branded T-Shirts & Caps',
    subtitle: 'Screen & DTF',
    icon: Shirt,
    angleDeg: 135, // Bottom left
  },
  {
    id: 'signage',
    name: '3D Signages',
    actionText: 'Shop Signs & Acrylics',
    subtitle: 'Illuminated Letters',
    icon: Signpost,
    angleDeg: 180, // Left center
  },
  {
    id: 'awards',
    name: 'Awards & Plaques',
    actionText: 'Crystal Plaques & Gifts',
    subtitle: 'Precision Engraved',
    icon: Award,
    angleDeg: 225, // Top left
  },
];

export const HeroImageOrbitCycle: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance the light point from one product point to the next
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % ORBIT_PRODUCTS.length);
    }, 2800);

    return () => clearInterval(timer);
  }, [isPaused]);

  const activeProduct = ORBIT_PRODUCTS[activeIndex];

  // Aspect-fit ellipse radius for orbit (X and Y radius around the rectangular card)
  // Responsive radii: Card is approx 380px wide by 450px tall
  const rx = 205; // horizontal radius in px
  const ry = 245; // vertical radius in px

  // Calculate current light point Cartesian position
  const activeRad = (activeProduct.angleDeg * Math.PI) / 180;
  const lightX = Math.round(Math.cos(activeRad) * rx);
  const lightY = Math.round(Math.sin(activeRad) * ry);

  return (
    <div 
      className="relative w-full max-w-[480px] flex items-center justify-center select-none py-6 sm:py-8 scale-[0.82] sm:scale-95 lg:scale-100 origin-center transition-transform duration-300"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ========================================================================= */}
      {/* 1. Orbit Background Circle & Animated Glowing Light Tracks                 */}
      {/* ========================================================================= */}
      
      {/* Ambient background glow following the cycle */}
      <div 
        className="absolute w-[440px] h-[520px] rounded-[48%] pointer-events-none transition-all duration-700 blur-3xl opacity-30"
        style={{
          background: `radial-gradient(circle at ${50 + (lightX / rx) * 35}% ${50 + (lightY / ry) * 35}%, rgba(245,190,56,0.35), transparent 70%)`
        }}
      />

      {/* SVG Elliptical Orbital Path Behind the Image */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible -z-10"
        viewBox="-240 -280 480 560"
      >
        <defs>
          <linearGradient id="orbitGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f5be38" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#f5be38" stopOpacity="0.8" />
          </linearGradient>

          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Base faint orbital ring */}
        <ellipse 
          cx="0" 
          cy="0" 
          rx={rx} 
          ry={ry} 
          fill="none" 
          stroke="rgba(255, 255, 255, 0.12)" 
          strokeWidth="1.5"
          strokeDasharray="4 6"
        />

        {/* Dynamic bright orbit segment that follows the path */}
        <ellipse 
          cx="0" 
          cy="0" 
          rx={rx} 
          ry={ry} 
          fill="none" 
          stroke="url(#orbitGoldGrad)" 
          strokeWidth="2"
          strokeDasharray="60 220"
          className="animate-spin"
          style={{ animationDuration: '24s', transformOrigin: 'center' }}
          opacity="0.6"
        />

        {/* Connecting beacon beam from center frame to active light point */}
        <line
          x1="0"
          y1="0"
          x2={lightX}
          y2={lightY}
          stroke="rgba(245, 190, 56, 0.25)"
          strokeWidth="1.5"
          strokeDasharray="2 3"
        />
      </svg>

      {/* ========================================================================= */}
      {/* 2. Central Portrait Image Frame                                           */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-[340px] sm:max-w-[380px]">
        <div className="relative rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(245,190,56,0.18)] bg-black border border-white/20 hover:border-[#f5be38]/50 ring-1 ring-[#f5be38]/20 transition-all duration-500 group">
          
          {/* Portrait Image Stage */}
          <div className="relative aspect-[1145/1374] overflow-hidden bg-black flex items-center justify-center">
            <img
              src="/inkshine-brand-portrait.png"
              alt="Silver & Gold Inkshine"
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              loading="eager"
            />

            {/* Subtle specular light sweep on hover */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute inset-0 -translate-x-[150%] skew-x-[-25deg] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-[150%]" />
            </div>

            {/* Subtle bottom dark vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            {/* In-Frame Live Highlighting Indicator Floating Badge */}
            <div className="absolute bottom-3 left-3 right-3 z-20 pointer-events-none">
              <motion.div 
                key={activeProduct.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="p-2 sm:p-2.5 rounded-2xl bg-black/85 backdrop-blur-md border border-[#f5be38]/40 shadow-xl flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#ffd700] via-[#f5be38] to-[#d49710] flex items-center justify-center shadow-[0_0_12px_rgba(245,190,56,0.6)] shrink-0">
                    <activeProduct.icon className="w-3.5 h-3.5 text-black" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[12px] font-black text-white leading-tight tracking-wide">
                        {activeProduct.name}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f5be38] animate-ping" />
                    </div>
                    <p className="text-[10px] text-stone-300 font-medium leading-tight">
                      {activeProduct.actionText}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-1 px-2 py-1 rounded-lg bg-[#f5be38]/15 border border-[#f5be38]/40 text-[10px] font-black text-[#f5be38] uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-[#f5be38]" />
                  <span>Highlighting</span>
                </div>
              </motion.div>
            </div>

          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. Orbiting Traveling Light Point (Moves From Point to Point)              */}
      {/* ========================================================================= */}
      <motion.div
        animate={{
          x: lightX,
          y: lightY,
        }}
        transition={{
          type: "spring",
          stiffness: 65,
          damping: 15,
          mass: 0.9,
        }}
        className="absolute z-30 pointer-events-none -ml-3 -mt-3 w-6 h-6 flex items-center justify-center"
      >
        {/* Outer glowing pulsing halo */}
        <span className="absolute w-10 h-10 rounded-full bg-[#f5be38]/30 blur-md animate-ping" />
        
        {/* Core luminous radiant light point */}
        <span className="relative w-4 h-4 rounded-full bg-gradient-to-r from-white via-[#ffd700] to-[#f5be38] shadow-[0_0_15px_#f5be38,0_0_30px_#ffffff,0_0_45px_#f5be38]" />
        
        {/* Micro white core spark */}
        <span className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_5px_#ffffff]" />
      </motion.div>

      {/* ========================================================================= */}
      {/* 4. Product Stations Around the Orbit (Lights up & writes out the name)     */}
      {/* ========================================================================= */}
      {ORBIT_PRODUCTS.map((prod, index) => {
        const isActive = index === activeIndex;
        const rad = (prod.angleDeg * Math.PI) / 180;
        const posX = Math.round(Math.cos(rad) * rx);
        const posY = Math.round(Math.sin(rad) * ry);
        const Icon = prod.icon;

        // Position pill label based on angle direction
        const isRightSide = posX > 10;
        const isLeftSide = posX < -10;
        const isTop = posY < -80;
        const isBottom = posY > 80;

        return (
          <div
            key={prod.id}
            onClick={() => setActiveIndex(index)}
            className="absolute z-20 cursor-pointer group"
            style={{
              transform: `translate(${posX}px, ${posY}px)`,
              marginLeft: '-14px',
              marginTop: '-14px',
            }}
          >
            {/* The Orbital Waypoint Node */}
            <div className="relative flex items-center justify-center w-7 h-7">
              {/* Active Golden Aura Wave */}
              {isActive && (
                <span className="absolute inset-0 rounded-full bg-[#f5be38] animate-ping opacity-60 pointer-events-none" />
              )}

              {/* Waypoint circle button */}
              <div 
                className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300 shadow-md ${
                  isActive 
                    ? 'bg-gradient-to-br from-[#ffd700] to-[#e5a820] border-white text-black scale-125 shadow-[0_0_18px_#f5be38]' 
                    : 'bg-[#121217] border-white/20 text-stone-300 hover:border-[#f5be38] hover:text-[#f5be38] hover:scale-110'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black font-bold' : ''}`} />
              </div>
            </div>

            {/* Dynamic Product Banner Tag Appearing When Light Reaches This Point */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ 
                    opacity: 0, 
                    scale: 0.8,
                    x: isRightSide ? -10 : isLeftSide ? 10 : 0,
                    y: isTop ? 10 : isBottom ? -10 : 0,
                  }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    x: 0,
                    y: 0,
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className={`absolute z-30 pointer-events-none whitespace-nowrap ${
                    isTop 
                      ? 'bottom-full mb-2 left-1/2 -translate-x-1/2' 
                      : isBottom 
                      ? 'top-full mt-2 left-1/2 -translate-x-1/2' 
                      : isRightSide 
                      ? 'left-full ml-2.5 top-1/2 -translate-y-1/2' 
                      : 'right-full mr-2.5 top-1/2 -translate-y-1/2'
                  }`}
                >
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/90 backdrop-blur-md border border-[#f5be38] shadow-[0_0_20px_rgba(245,190,56,0.4)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f5be38] animate-pulse" />
                    <span className="text-xs font-black text-white tracking-wide">
                      {prod.name}
                    </span>
                    <span className="text-[10px] text-[#f5be38] font-bold border-l border-white/20 pl-1.5">
                      {prod.actionText}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        );
      })}

    </div>
  );
};
