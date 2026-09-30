import React from 'react';
import { motion } from 'motion/react';
import { 
  Check, 
  ShieldCheck, 
  RotateCcw, 
  Headphones, 
  CreditCard, 
  MessageCircle, 
  FileText,
  Sparkles
} from 'lucide-react';

interface HowItWorksSectionProps {
  onOpenQuoteModal?: () => void;
  isStandalone?: boolean;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  onOpenQuoteModal,
  isStandalone = false
}) => {
  const WHATSAPP_LINK = 'https://wa.me/2347030372539?text=Hello%20Silver%20%26%20Gold%20Inkshine%20Ltd%2C%20I%20would%20like%20to%20start%20a%20printing%20order';

  const STEPS = [
    {
      number: '01',
      title: 'Send Your Design',
      body: 'Share your ready artwork — PDF, AI, PSD, CDR, or high-res PNG all work perfectly. Don’t have a design yet? No problem — tell us what you need and our in-house design team will create it for you.',
      checks: [
        'Accepted formats: PDF, AI, PSD, CDR, PNG, JPG',
        'Free design help available',
        'WhatsApp or file upload — whichever is easier'
      ]
    },
    {
      number: '02',
      title: 'Free Pre-Press Check & Proof',
      body: 'Before anything hits the press, we review your file for resolution, color mode, bleed margins, and fonts. We send you a digital proof to approve — nothing prints until you say "YES."',
      checks: [
        'Zero surprises',
        'No charge for this check',
        'Revisions welcome'
      ]
    },
    {
      number: '03',
      title: 'Print & Quality Control',
      body: 'Once approved, your order goes to our industrial presses: 2400 DPI offset or digital with calibrated inks. Every piece is inspected by hand before packing in our Yenagoa facility.',
      checks: [
        'Same-day dispatch on select items',
        'Bulk orders ready in 3–5 days',
        'Zero-defect standards'
      ]
    },
    {
      number: '04',
      title: 'Delivered To You',
      body: 'Packed securely with moisture-proof protection — built to travel anywhere in Nigeria. Same/next-day pickup in Yenagoa or nationwide delivery across all 36 States.',
      checks: [
        'Trackable delivery',
        'Reinforced packaging',
        'Safe arrival guaranteed'
      ]
    }
  ];

  const GUARANTEES = [
    {
      icon: CreditCard,
      title: 'No Hidden Fees',
      desc: 'Transparent pricing — what you see is what you pay'
    },
    {
      icon: RotateCcw,
      title: 'Revisions Welcome',
      desc: 'Proof included — tweak until it’s perfect'
    },
    {
      icon: ShieldCheck,
      title: 'Quality Guarantee',
      desc: 'Not satisfied? We reprint at no cost*'
    },
    {
      icon: Headphones,
      title: 'Real Support',
      desc: 'Speak directly with our team — reply in minutes'
    }
  ];

  return (
    <section className={`bg-[#1A1A1F] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10 ${isStandalone ? 'min-h-screen' : ''}`}>
      <div className="max-w-[1100px] mx-auto space-y-12">
        
        {/* Header — Centered */}
        <div className="text-center space-y-2 max-w-2xl mx-auto flex flex-col items-center">
          <div className="w-[60px] h-[3px] bg-[#D4AF37] rounded-full shadow-[0_0_12px_rgba(212,175,55,0.5)] mb-2" />
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#D4AF37] tracking-tight">
            How It Works
          </h2>
          <p className="text-sm sm:text-base text-[#C8C8CC]">
            Simple, transparent, stress-free printing in 4 steps
          </p>
        </div>

        {/* 4-Step Flow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#0F0F12] p-7 rounded-2xl border border-white/10 hover:border-[#D4AF37] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between shadow-lg group"
            >
              <div className="space-y-4">
                {/* 56px x 56px Gold Badge */}
                <div className="w-14 h-14 rounded-full bg-[#D4AF37] text-[#0F0F12] font-black text-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                  {step.number}
                </div>

                {/* H3 Title */}
                <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-[#D4AF37] transition-colors leading-tight">
                  {step.title}
                </h3>

                {/* Body Text */}
                <p className="text-xs sm:text-[13px] text-[#C8C8CC] leading-relaxed">
                  {step.body}
                </p>

                {/* Checks */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  {step.checks.map((checkText, cIdx) => (
                    <div key={cIdx} className="flex items-start gap-2 text-xs text-stone-300">
                      <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>{checkText}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Guarantee Bar — Full Width */}
        <div className="bg-[#0F0F12] p-7 sm:p-8 rounded-[10px] border border-white/10 shadow-md space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
            {GUARANTEES.map((g, gIdx) => {
              const Icon = g.icon;
              return (
                <div key={gIdx} className="space-y-1.5 flex flex-col items-center sm:items-start">
                  <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base">
                    <Icon className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>✓ {g.title}</span>
                  </div>
                  <p className="text-xs text-[#C8C8CC] leading-relaxed">
                    {g.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/10 text-center text-[11px] text-stone-500 italic">
            *Within 48 hours of delivery; applies to verified production errors
          </div>
        </div>

        {/* Final CTA — Centered */}
        <div className="text-center space-y-4 pt-2">
          <h3 className="text-xl sm:text-[22px] font-semibold text-white tracking-tight">
            Ready to Start Your Project?
          </h3>
          <p className="text-xs sm:text-sm text-[#C8C8CC] max-w-md mx-auto">
            Send your file or describe what you need — we reply on WhatsApp in minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-[#D4AF37] hover:bg-[#e5c158] text-[#0F0F12] font-black text-xs sm:text-sm px-8 py-3.5 rounded-lg shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp Now</span>
            </a>

            {onOpenQuoteModal ? (
              <button
                type="button"
                onClick={onOpenQuoteModal}
                className="w-full sm:w-auto border border-[#D4AF37] hover:bg-white/10 text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-lg transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Request Custom Quote</span>
              </button>
            ) : (
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto border border-[#D4AF37] hover:bg-white/10 text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-lg transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Request Custom Quote</span>
              </a>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
