import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Sparkles, 
  ExternalLink, 
  MessageCircle, 
  Building2, 
  CheckCircle2, 
  Printer, 
  Layers,
  Award,
  Image as ImageIcon
} from 'lucide-react';
import { CompanyLogoMark } from '../common/CompanyLogo';

interface PortfoliosPageProps {
  onNavigateHome: () => void;
  onOpenQuoteModal?: () => void;
}

export const PortfoliosPage: React.FC<PortfoliosPageProps> = ({
  onNavigateHome,
  onOpenQuoteModal
}) => {
  const WHATSAPP_LINK = 'https://wa.me/2347030372539?text=Hello%20Silver%20%26%20Gold%20Inkshine%20Ltd%2C%20I%20would%20like%20to%20view%20more%20portfolio%20samples%20or%20start%20a%20project';

  const PORTFOLIO_ITEMS = [
    {
      title: 'Corporate AGM Annual Reports & Folders',
      category: 'Stationery & Publishing',
      client: 'Multinational Energy Corporation',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=80',
      desc: 'Hardcover annual reports with gold foil stamping and velvet-laminated presentation folders.'
    },
    {
      title: '3D Illuminated Acrylic LED Storefront Signs',
      category: 'Signage & Branding',
      client: 'Commercial Retail Bank Branch',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80',
      desc: 'Samsung LED face-lit 3D channel letters with Alucobond composite backing trays.'
    },
    {
      title: 'Luxury Kraft Shopping Bags & Hang Tags',
      category: 'Packaging & Retail',
      client: 'Boutique Fashion House',
      image: '/luxury-kraft-shopping-carrier-bags.jpg',
      desc: 'Heavyweight art card carrier bags with cotton rope handles and custom gold embossed tags.'
    },
    {
      title: 'Exhibition Backdrops & Teardrop Flags',
      category: 'Displays & Events',
      client: 'Bayelsa State Trade Summit',
      image: '/luxury-rollup-banner-stand.jpg',
      desc: '3.2m seamless media backdrops and wind-resistant outdoor teardrop flying banners.'
    },
    {
      title: 'Direct-to-Film (DTF) Branded Staff Polos',
      category: 'Custom Apparels',
      client: 'Corporate Logistics Enterprise',
      image: '/executive-embroidered-polo-shirts.jpg',
      desc: 'Premium cotton-blend polo shirts featuring high-density embroidery and vibrant DTF prints.'
    },
    {
      title: 'Crystal Engraved Trophies & Plaques',
      category: 'Awards & Souvenirs',
      client: 'University Convocation Ceremony',
      image: '/book-printing-lagos.jpg',
      desc: 'Optically clear laser-etched crystal awards and wooden executive recognition plaques.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#08080a] text-stone-200 antialiased selection:bg-[#f5be38]/30 selection:text-white flex flex-col justify-between">
      <div>


        {/* Hero Banner */}
        <div className="relative bg-[#0d0e14] border-b border-white/10 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden text-center">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(245,190,56,0.08)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

          <div className="max-w-3xl mx-auto relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[#f5be38] text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-[#f5be38] animate-pulse" />
              <span>Our Completed Projects &amp; Gallery</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f5be38] via-amber-200 to-white">Portfolios</span>
            </h1>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
              Explore recent commercial print runs, corporate branding rollouts, 3D illuminated signages, and luxury packaging produced at our Yenagoa press plant.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={onOpenQuoteModal}
                className="h-11 px-6 rounded-xl bg-[#f5be38] hover:bg-[#ffd15c] text-black font-extrabold text-xs sm:text-sm tracking-wide uppercase shadow-md transition-all cursor-pointer"
              >
                Request Custom Quote →
              </button>
            </div>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-[#08080a]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PORTFOLIO_ITEMS.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-[#12131a] rounded-3xl border border-white/10 overflow-hidden shadow-xl group hover:border-[#f5be38]/50 transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-black/50">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md text-[#f5be38] text-[10px] font-black uppercase tracking-wider border border-[#f5be38]/30">
                    {item.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="text-[11px] font-mono text-stone-400 font-bold">{item.client}</div>
                  <h3 className="text-xl font-black text-white group-hover:text-[#f5be38] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#040406] border-t border-white/15 text-stone-300 py-8 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs sm:text-sm font-medium text-stone-300">
            &copy; {new Date().getFullYear()} <strong className="text-white font-bold">SILVER &amp; GOLD INKSHINE LTD</strong> (RC 1892044). All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
