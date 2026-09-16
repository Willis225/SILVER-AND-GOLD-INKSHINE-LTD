import React from 'react';

interface CompanyLogoProps {
  className?: string;
  size?: number | string;
  variant?: 'full' | 'mark' | 'horizontal';
  showText?: boolean;
  lightMode?: boolean;
}

/**
 * Official Silver & Gold Inkshine Ltd Company Emblem
 * Recreated accurately with metallic gradients, 3D relief bevels, and circular aperture.
 */
export const CompanyLogoMark: React.FC<{ className?: string; size?: number | string }> = ({ 
  className = "w-10 h-10", 
  size 
}) => {
  return (
    <svg
      viewBox="0 0 1000 1050"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Silver & Gold Inkshine Emblem"
    >
      <defs>
        {/* Silver Brushed Gradient */}
        <linearGradient id="silver-face-grad" x1="100" y1="100" x2="600" y2="900" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#d8dde3" />
          <stop offset="22%" stopColor="#f8fafc" />
          <stop offset="38%" stopColor="#cbd5e1" />
          <stop offset="55%" stopColor="#94a3b8" />
          <stop offset="72%" stopColor="#e2e8f0" />
          <stop offset="88%" stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>

        {/* Silver 3D Bevel/Extrusion Gradient */}
        <linearGradient id="silver-bevel-grad" x1="400" y1="700" x2="670" y2="950" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="45%" stopColor="#64748b" />
          <stop offset="85%" stopColor="#475569" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>

        {/* Gold Metallic Face Gradient */}
        <linearGradient id="gold-face-grad" x1="380" y1="50" x2="980" y2="920" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="18%" stopColor="#fef08a" />
          <stop offset="35%" stopColor="#facc15" />
          <stop offset="52%" stopColor="#eab308" />
          <stop offset="75%" stopColor="#fef08a" />
          <stop offset="90%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#eab308" />
        </linearGradient>

        {/* Gold 3D Bevel Edge Gradient */}
        <linearGradient id="gold-bevel-grad" x1="700" y1="800" x2="770" y2="970" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#a16207" />
          <stop offset="40%" stopColor="#854d0e" />
          <stop offset="75%" stopColor="#713f12" />
          <stop offset="100%" stopColor="#452308" />
        </linearGradient>

        {/* Soft Drop Shadow Filter for realism */}
        <filter id="logo-depth-shadow" x="-8%" y="-8%" width="120%" height="120%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="3" dy="12" stdDeviation="15" floodOpacity="0.18" floodColor="#0f172a" />
        </filter>
      </defs>

      <g filter="url(#logo-depth-shadow)">
        {/* ==================================================================== */}
        {/* 1. SILVER HALF (Left/Bottom Monogram Component)                      */}
        {/* ==================================================================== */}

        {/* Silver 3D Extrusion Bevel Underlayer */}
        <path
          d="M 390,990 
             C 490,985 580,930 655,835 
             C 670,810 670,760 635,715 
             C 610,680 550,600 480,520
             L 510,545
             C 580,630 645,710 665,765
             C 690,830 650,900 580,950
             C 510,995 430,1005 385,995
             Z"
          fill="url(#silver-bevel-grad)"
          opacity="0.95"
        />

        {/* Silver Main Metallic Face */}
        <path
          d="M 272,58 
             C 272,58 135,160 48,340 
             C 0,440 2,570 35,675 
             C 75,800 142,888 144,888
             L 142,670
             C 142,670 178,670 180,670
             C 182,720 200,810 240,885
             C 300,980 410,1000 535,975
             C 625,950 675,870 660,780
             C 645,720 570,620 485,530
             C 380,420 215,310 215,220
             C 215,165 245,105 272,58
             Z"
          fill="url(#silver-face-grad)"
        />

        {/* ==================================================================== */}
        {/* 2. GOLD HALF (Top/Right Nib & Wing Monogram Component)              */}
        {/* ==================================================================== */}

        {/* Gold 3D Extrusion Bevel Underlayer on Lower Point */}
        <path
          d="M 760,970
             L 700,815
             L 735,805
             L 775,935
             Z"
          fill="url(#gold-bevel-grad)"
        />

        {/* Gold Main Metallic Face with Eye Aperture */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M 470,2
             C 410,2 355,50 360,135
             C 365,190 415,225 440,240
             C 520,290 620,380 690,470
             C 760,560 765,680 725,785
             C 715,810 700,815 700,815
             L 760,970
             C 830,860 920,720 970,550
             C 1010,400 980,240 910,130
             L 790,80
             L 735,155
             C 715,130 670,70 600,30
             C 560,8 510,2 470,2
             Z
             M 760,255
             A 36,36 0 1,0 760,254.99
             Z"
          fill="url(#gold-face-grad)"
        />
      </g>
    </svg>
  );
};

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  className = "",
  size = 40,
  variant = 'horizontal',
  showText = true,
  lightMode = false
}) => {
  if (variant === 'mark' || !showText) {
    return <CompanyLogoMark size={size} className={className} />;
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative shrink-0 flex items-center justify-center">
        <CompanyLogoMark size={size} />
      </div>
      <div>
        <div className="text-base sm:text-xl font-black tracking-tight leading-none flex items-center gap-1 sm:gap-1.5">
          <span className="text-[#d8dce2] drop-shadow-[0_1px_1px_rgba(255,255,255,0.15)] font-black">
            SILVER
          </span>
          <span className="text-stone-400 font-semibold text-xs sm:text-sm">&amp;</span>
          <span className="text-[#f5be38] drop-shadow-[0_1px_2px_rgba(245,190,56,0.25)] font-black">
            GOLD
          </span>
        </div>
        <div className="text-[9.5px] sm:text-[11px] font-extrabold tracking-[0.24em] text-white leading-none mt-1 drop-shadow-xs">
          INKSHINE LTD
        </div>
      </div>
    </div>
  );
};

export default CompanyLogo;
