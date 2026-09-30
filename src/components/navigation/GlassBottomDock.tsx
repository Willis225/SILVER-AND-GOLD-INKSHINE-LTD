import React from 'react';
import { Calendar, Info, Layers, Sparkles } from 'lucide-react';

interface GlassBottomDockProps {
  onOpenBookOnline: () => void;
  onOpenInfo: () => void;
  onOpenCatalog: () => void;
  activeModal?: 'book' | 'info' | 'catalog' | null;
}

export const GlassBottomDock: React.FC<GlassBottomDockProps> = () => {
  // Mobile downside buttons removed per user directive
  return null;
};
