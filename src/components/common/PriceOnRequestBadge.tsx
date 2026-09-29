import React from 'react';
import { Tag } from 'lucide-react';

interface PriceOnRequestBadgeProps {
  theme?: 'light' | 'dark' | 'gold' | 'glass';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  showIcon?: boolean;
}

export const PriceOnRequestBadge: React.FC<PriceOnRequestBadgeProps> = ({
  theme = 'light',
  size = 'sm',
  className = '',
  showIcon = false,
}) => {
  const sizeClasses = {
    xs: 'px-2.5 py-0.5 text-[10px] gap-1',
    sm: 'px-3 py-1 text-xs gap-1.5',
    md: 'px-3.5 py-1.5 text-xs sm:text-sm gap-2',
    lg: 'px-4 py-2 text-sm sm:text-base gap-2.5',
  }[size];

  const themeClasses = {
    light: 'bg-amber-50/90 border border-amber-300 text-amber-950 shadow-2xs',
    dark: 'bg-[#f5be38]/15 border border-[#f5be38]/35 text-[#f5be38] shadow-2xs',
    gold: 'bg-gradient-to-r from-[#f5be38] to-[#e5ab20] text-black font-black shadow-md border border-[#ffd56b]',
    glass: 'bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xs',
  }[theme];

  return (
    <span
      className={`inline-flex items-center rounded-full font-black tracking-wider uppercase select-none transition-all ${sizeClasses} ${themeClasses} ${className}`}
    >
      {showIcon ? (
        <Tag className="w-3 h-3 shrink-0 text-current opacity-80" />
      ) : (
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${theme === 'gold' ? 'bg-black' : theme === 'dark' ? 'bg-[#f5be38]' : 'bg-amber-600'} animate-pulse`} />
      )}
      <span>Price on Request</span>
    </span>
  );
};
