import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Sparkles, 
  ExternalLink, 
  MessageCircle, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  CheckCircle2,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { CompanyLogoMark } from '../common/CompanyLogo';

interface HowItWorksPageProps {
  onNavigateHome: () => void;
  onOpenQuoteModal?: () => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({
  onNavigateHome,
  onOpenQuoteModal
}) => {
  const WHATSAPP_LINK = 'https://wa.me/2347030372539?text=Hello%20Silver%20%26%20Gold%20Inkshine%20Ltd%2C%20I%20have%20an%20inquiry%20regarding%20how%20ordering%20works';

  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setExpandedFaq(prev => prev === index ? null : index);
  };

  const STEPS = [
    {
      num: '01',
      title: 'Submit Artwork or Brief',
      desc: 'Upload your ready-to-print file (PDF, AI, CDR, PNG) or consult our design team to create professional artwork from scratch.'
    },
    {
      num: '02',
      title: 'Free Pre-Press Audit',
      desc: 'Our pressmasters review your file for resolution, CMYK profile, 3mm bleed margins, and font embedding before plate burning.'
    },
    {
      num: '03',
      title: 'Precision Production',
      desc: 'We print using industrial-grade offset, digital, and large-format UV presses with daily color calibration at our Yenagoa plant.'
    },
    {
      num: '04',
      title: 'Secure Delivery',
      desc: 'Finished orders are shrink-wrapped in padded corrugated cartons and dispatched for same-day pickup or nationwide express delivery.'
    }
  ];

  const FAQS = [
    {
      q: 'How do I place an order on the website?',
      a: 'Browse our catalog, select your product and specifications, upload your artwork or choose to submit later via WhatsApp, and proceed to checkout or request an instant quote.'
    },
    {
      q: 'What file formats are accepted?',
      a: 'We accept High-Resolution Print PDF, Adobe Illustrator (.AI), CorelDRAW (.CDR with converted curves), Adobe Photoshop (.PSD), and high-res PNG/TIFF (minimum 300 DPI).'
    },
    {
      q: 'How long does nationwide delivery take?',
      a: 'Standard production takes 3–5 business days. Express logistics carriers deliver directly to your doorstep in Lagos, Abuja, Port Harcourt, Bayelsa, and all 36 States within 2–4 days after dispatch.'
    },
    {
      q: 'What is your reprinting policy if there is a defect?',
      a: 'We offer a 100% Zero-Defect Guarantee. If a print defect or transit damage occurs due to our oversight, we reprint and dispatch replacement copies immediately at no additional charge.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#08080a] text-stone-200 antialiased selection:bg-[#f5be38]/30 selection:text-white flex flex-col justify-between">
      <div>
        {/* Top Sticky Header */}
        <div className="sticky top-0 z-50 bg-[#0c0d12]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 lg:px-8 py-3.5 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-300 hover:text-white bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-xl border border-white/10 transition-all cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 text-[#f5be38] group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Storefront</span>
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 flex items-center justify-center">
                <CompanyLogoMark className="w-full h-full" />
              </div>
              <div className="hidden sm:block">
                <div className="text-xs font-black tracking-tight text-white flex items-center gap-1">
                  <span>SILVER &amp; GOLD INKSHINE</span>
                  <span className="text-[10px] font-mono text-[#f5be38] font-bold">RC 1892044</span>
                </div>
                <div className="text-[10px] text-stone-400">Ordering Guide &amp; FAQs</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-black text-black bg-[#f5be38] hover:bg-[#ffd15c] px-3.5 py-2 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <span>WhatsApp Desk</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="relative bg-[#0d0e14] border-b border-white/10 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden text-center">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(245,190,56,0.08)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

          <div className="max-w-3xl mx-auto relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[#f5be38] text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-[#f5be38] animate-pulse" />
              <span>Step-by-Step Commercial Guide</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              How It Works <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f5be38] via-amber-200 to-white">&amp; FAQ</span>
            </h1>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
              Everything you need to know about placing commercial print runs, submitting artwork files, and tracking your order nationwide.
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

        {/* 4 Steps Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-[#08080a]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, idx) => (
              <div key={idx} className="bg-[#12131a] rounded-3xl border border-white/10 p-6 sm:p-8 space-y-4 shadow-xl">
                <div className="w-12 h-12 rounded-2xl bg-[#f5be38]/20 border border-[#f5be38]/40 text-[#f5be38] font-mono font-black text-sm flex items-center justify-center">
                  {step.num}
                </div>
                <h3 className="text-lg font-black text-white">{step.title}</h3>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-[#050508] rounded-3xl border border-white/10 my-8">
          <div className="text-center space-y-3 mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Frequently Asked Questions</h2>
            <p className="text-stone-400 text-xs sm:text-sm">Click any question below to expand.</p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isExpanded = expandedFaq === idx;
              return (
                <div key={idx} className="bg-[#12131a] border border-white/10 rounded-2xl overflow-hidden shadow-md">
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-4 text-left font-bold text-sm sm:text-base text-white flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#f5be38]/20 text-[#f5be38] font-mono text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span>{faq.q}</span>
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-[#f5be38] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-stone-400 shrink-0" />
                    )}
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-6 pb-5 pt-1 text-xs sm:text-sm text-stone-300 leading-relaxed border-t border-white/5"
                      >
                        <p>{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
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
