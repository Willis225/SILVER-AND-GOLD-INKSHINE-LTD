import React from 'react';
import { X, BookOpen, Clock, Tag, ArrowRight, Phone } from 'lucide-react';

export interface PostItem {
  id: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  content?: string[];
}

interface RecentPostModalProps {
  post: PostItem | null;
  isOpen: boolean;
  onClose: () => void;
  onContactSupport?: () => void;
}

export const RecentPostModal: React.FC<RecentPostModalProps> = ({
  post,
  isOpen,
  onClose,
  onContactSupport,
}) => {
  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#14141c] text-white rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#101017]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#f5be38]" />
            <span className="text-xs font-bold text-[#f5be38] uppercase tracking-wider">{post.date}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 max-h-[75vh] overflow-y-auto space-y-5">
          <h2 className="text-xl md:text-2xl font-black text-white leading-snug">
            {post.title}
          </h2>

          <div className="flex items-center gap-4 text-xs text-stone-400 pb-3 border-b border-white/10">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#f5be38]" />
              {post.readTime}
            </span>
            <span className="flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-[#f5be38]" />
              Silver &amp; Gold Inkshine Press Guide
            </span>
          </div>

          <div className="text-sm text-stone-300 leading-relaxed space-y-4">
            <p className="font-semibold text-stone-100 bg-[#f5be38]/10 p-4 rounded-xl border border-[#f5be38]/30">
              {post.excerpt}
            </p>

            <p>
              In Nigeria’s fast-moving commercial markets across Lagos, Abuja, Port Harcourt, and regional commerce centers, high-impact printing requires the right balance of material selection, substrate durability, and crisp visual prepress work.
            </p>

            <h3 className="text-base font-bold text-white mt-4">Key Considerations &amp; Technical Standards:</h3>
            <ul className="list-disc pl-5 space-y-2 text-stone-300">
              <li><strong className="text-white">Artwork Resolution:</strong> Ensure designs are exported at 300 DPI in CMYK format with at least 3mm–5mm bleed margin to avoid edge cropping.</li>
              <li><strong className="text-white">Substrate Selection:</strong> Match paper weight and coating to the intended lifespan (e.g. 150gsm gloss art for mass handbills, 300gsm card with matte lamination for executive presentation).</li>
              <li><strong className="text-white">Color Management:</strong> Digital press output and offset lithography render colors with subtle differences; pre-press proofs safeguard brand consistency.</li>
              <li><strong className="text-white">Protective Packaging:</strong> Industrial shrink-wrapping and moisture-proof cartons ensure safe transit without edge damage.</li>
            </ul>

            <p>
              Our press facilities in Lagos and Bayelsa operate high-speed industrial presses, 360 activation booths, eco-solvent large format machines, and automated finishing lines ready to fulfill orders for SMBs and enterprise clients.
            </p>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-stone-400">Need specific machine specifications or bespoke print consultation?</span>
            <a
              href="https://wa.me/2347030372539?text=Hello%20Silver%20and%20Gold%20Inkshine,%20I%20am%20reading%20your%20guide%20and%20need%20expert%20consultation"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#f5be38] hover:bg-[#ffd15c] text-black font-extrabold text-xs rounded-xl shadow-md transition-colors"
            >
              <span>Chat on WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
