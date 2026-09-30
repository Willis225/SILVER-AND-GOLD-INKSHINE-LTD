import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles, 
  Printer, 
  MapPin, 
  Clock, 
  Phone, 
  CheckCircle2, 
  ExternalLink,
  Building2,
  Award,
  Layers,
  Check,
  Truck,
  Users,
  MessageCircle,
  FileCheck2,
  Cpu,
  Target,
  Eye,
  HeartHandshake
} from 'lucide-react';
import { CompanyLogoMark } from '../common/CompanyLogo';

interface AboutUsPageProps {
  onNavigateHome: () => void;
  onOpenQuoteModal?: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({
  onNavigateHome,
  onOpenQuoteModal
}) => {
  const WHATSAPP_LINK = 'https://wa.me/2347030372539?text=Hello%20Silver%20%26%20Gold%20Inkshine%20Ltd%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20printing%20services';
  const MAPS_LINK = 'https://maps.google.com/maps?q=9.081999,8.675277&hl=en&z=16';

  return (
    <div className="min-h-screen bg-[#09090d] text-stone-200 antialiased selection:bg-[#D4AF37]/30 selection:text-white">
      
      {/* Top Floating Navigation Header */}
      <div className="sticky top-0 z-40 bg-[#0c0d12]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 lg:px-8 py-3.5 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Back to Home */}
          <button
            type="button"
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-300 hover:text-white bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-xl border border-white/10 transition-all cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-[#D4AF37] group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Storefront</span>
          </button>

          {/* Logo & Subtitle */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 flex items-center justify-center">
              <CompanyLogoMark className="w-full h-full" />
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-black tracking-tight text-white flex items-center gap-1.5">
                <span>SILVER &amp; GOLD INKSHINE LTD</span>
                <span className="text-[10px] font-mono text-[#D4AF37] font-bold px-1.5 py-0.5 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/30">RC 1892044</span>
              </div>
            </div>
          </div>

          {/* Quick WhatsApp Action */}
          <div className="flex items-center gap-2">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-black text-black bg-[#D4AF37] hover:bg-[#e5c158] px-3.5 py-2 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <span>Chat on WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1 — HERO BANNER (Who We Are)                                      */}
      {/* ========================================================================= */}
      <section className="relative bg-[#0F0F12] pt-16 pb-14 sm:pt-20 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 overflow-hidden">
        {/* Subtle Decorative Geometric Backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 sm:w-[500px] h-96 sm:h-[500px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.12)_0%,transparent_70%)] blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
          {/* Decorative Gold Accent Line */}
          <div className="w-[60px] h-[3px] bg-[#D4AF37] rounded-full shadow-[0_0_12px_rgba(212,175,55,0.5)]" />

          {/* H1 Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            Who We Are
          </h1>

          {/* Lead Paragraph 1 */}
          <p className="text-base sm:text-lg text-[#E8E8EA] max-w-3xl leading-relaxed font-normal">
            <strong className="text-white font-bold">Silver &amp; Gold Inkshine Ltd</strong> is Yenagoa and Bayelsa’s premier full-service commercial printing press — proudly serving businesses, government bodies, schools, churches, event planners, and growing brands across all 36 States of Nigeria.
          </p>

          {/* Lead Paragraph 2 */}
          <p className="text-base sm:text-lg text-[#E8E8EA] max-w-3xl leading-relaxed font-normal">
            Born from a simple belief: quality printing should never require traveling out of state. We built our facility right here in Opolo-Epie, Yenagoa, to bring world-class standards home — so local businesses can look world-class without leaving Bayelsa.
          </p>

          {/* Lead Paragraph 3 */}
          <p className="text-sm sm:text-base text-stone-300 max-w-3xl leading-relaxed font-normal pt-1">
            From a single idea to a full production floor with industrial offset, digital, and large-format UV presses, our mission has stayed the same: help Nigerian brands look professional, advertise better, and print with confidence.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2 — OUR STORY (Two Column Layout)                                 */}
      {/* ========================================================================= */}
      <section className="bg-[#1A1A1F] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Column 1: Text */}
          <div className="lg:col-span-7 space-y-5">
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#D4AF37] tracking-tight">
              Our Story — More Than Ink on Paper
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#E8E8EA] leading-relaxed font-normal">
              <p>
                It started with a gap: businesses in Bayelsa were sending designs to Lagos, Port Harcourt, and beyond — waiting weeks, paying extra for shipping, and still risking damage in transit. We knew our state deserved better.
              </p>

              <p>
                In 2021, we opened our doors with one goal: match the best standards in the country, right here at home.
              </p>

              <p>
                Today, we operate from our purpose-built complex on Medford Okilo Road, opposite Pepperoni in Opolo-Epie. Our team combines skilled press operators, graphic designers, and finishing specialists — people who live and work right here in Yenagoa. Every banner, business card, sign, and box we produce isn’t just a job — it’s proof that excellence lives in Bayelsa.
              </p>

              <p>
                We’ve grown from serving local startups to being trusted by banks, tech companies, energy leaders, and government institutions — but our heart remains the same: serve every client, big or small, with the same care and precision.
              </p>
            </div>
          </div>

          {/* Column 2: Facility & Team Imagery */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end space-y-3">
            <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)] border border-white/20 group">
              <img
                src="/industrial-large-format-printer.jpg"
                alt="Silver & Gold Inkshine commercial printing facility — Yenagoa, Bayelsa"
                className="w-full aspect-[4/3] object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
              
              {/* Gold Top Badge */}
              <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] text-[11px] font-black">
                <Sparkles className="w-3.5 h-3.5" />
                <span>1,200 SQM PRESS FLOOR</span>
              </div>

              {/* Bottom Caption Bar */}
              <div className="absolute bottom-3 left-3 right-3 text-xs font-bold text-white bg-black/80 backdrop-blur-md p-3 rounded-xl border border-white/15">
                <div className="flex items-center gap-1.5 text-[#D4AF37] text-[11px] uppercase tracking-wider font-extrabold mb-0.5">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Yenagoa Commercial Press Plant</span>
                </div>
                <span className="text-stone-300 font-medium text-[11px]">875 Medford Okilo Rd, Opolo-Epie Complex • Offset, UV &amp; Digital</span>
              </div>
            </div>

            <div className="w-full max-w-md grid grid-cols-2 gap-2.5">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                <div className="text-[10px] text-stone-400 font-bold uppercase">Press Capacity</div>
                <div className="text-xs font-black text-[#D4AF37]">50,000+ Prints / Day</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-center">
                <div className="text-[10px] text-stone-400 font-bold uppercase">Color Calibration</div>
                <div className="text-xs font-black text-white">2400 DPI CMYK</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3 — OUR PROMISE (Icon Feature Grid)                              */}
      {/* ========================================================================= */}
      <section className="bg-[#0F0F12] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#D4AF37] tracking-tight">
              Our Standard — What Makes Us Different
            </h2>
            <p className="text-sm sm:text-base text-[#C8C8CC]">
              Your order carries our name — that’s why we treat yours like our own.
            </p>
          </div>

          {/* 6 Cards Grid (3 cols desktop, 1 col mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="bg-[#1A1A1F] p-7 rounded-[10px] border border-white/10 hover:border-[#D4AF37] hover:-translate-y-1 transition-all duration-400 space-y-3 shadow-md group">
              <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37]">
                <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-[#D4AF37] transition-colors">
                Zero-Defect Guarantee
              </h3>
              <p className="text-xs sm:text-sm text-[#C8C8CC] leading-relaxed">
                If it’s not perfect, we reprint it — no questions, no extra cost.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#1A1A1F] p-7 rounded-[10px] border border-white/10 hover:border-[#D4AF37] hover:-translate-y-1 transition-all duration-400 space-y-3 shadow-md group">
              <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37]">
                <FileCheck2 className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-[#D4AF37] transition-colors">
                Free Pre-Press Audit
              </h3>
              <p className="text-xs sm:text-sm text-[#C8C8CC] leading-relaxed">
                Every file checked: resolution, bleed, color, layout — we catch issues before they print.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#1A1A1F] p-7 rounded-[10px] border border-white/10 hover:border-[#D4AF37] hover:-translate-y-1 transition-all duration-400 space-y-3 shadow-md group">
              <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37]">
                <Target className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-[#D4AF37] transition-colors">
                2400 DPI Precision
              </h3>
              <p className="text-xs sm:text-sm text-[#C8C8CC] leading-relaxed">
                Industrial-grade presses, color-calibrated daily — sharp, vibrant, consistent every time.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-[#1A1A1F] p-7 rounded-[10px] border border-white/10 hover:border-[#D4AF37] hover:-translate-y-1 transition-all duration-400 space-y-3 shadow-md group">
              <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37]">
                <MessageCircle className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-[#D4AF37] transition-colors">
                Real People, Real Support
              </h3>
              <p className="text-xs sm:text-sm text-[#C8C8CC] leading-relaxed">
                You speak directly with our team — reply in minutes on WhatsApp. No chatbots.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-[#1A1A1F] p-7 rounded-[10px] border border-white/10 hover:border-[#D4AF37] hover:-translate-y-1 transition-all duration-400 space-y-3 shadow-md group">
              <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37]">
                <Truck className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-[#D4AF37] transition-colors">
                Packed to Travel
              </h3>
              <p className="text-xs sm:text-sm text-[#C8C8CC] leading-relaxed">
                Moisture-proof, reinforced packaging — arrives safely anywhere in Nigeria.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-[#1A1A1F] p-7 rounded-[10px] border border-white/10 hover:border-[#D4AF37] hover:-translate-y-1 transition-all duration-400 space-y-3 shadow-md group">
              <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37]">
                <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-[#D4AF37] transition-colors">
                CAC Registered &amp; Certified
              </h3>
              <p className="text-xs sm:text-sm text-[#C8C8CC] leading-relaxed">
                Fully accredited commercial printing corporation (RC 1892044) — legitimate, reliable, accountable.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4 — OUR FACILITY (Equipment & Capabilities)                       */}
      {/* ========================================================================= */}
      <section className="bg-[#1A1A1F] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text & Capabilities Checklist */}
          <div className="lg:col-span-7 space-y-5">
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#D4AF37] tracking-tight">
              Our Facility — Built for Excellence
            </h2>

            <p className="text-sm sm:text-base text-[#E8E8EA] leading-relaxed">
              We don’t outsource. Everything happens right here, under one roof — so we control the quality, the timeline, and the price.
            </p>

            <div className="space-y-3 pt-2">
              {[
                { title: 'Modern Offset Presses', desc: 'for bulk runs with unmatched consistency' },
                { title: 'High-Speed Digital & UV Flatbed', desc: 'vibrant colors on paper, plastic, wood, metal' },
                { title: 'Large-Format Roll-to-Roll', desc: 'banners up to 3.2m wide, no seams' },
                { title: 'Computerised Cutting & Finishing', desc: 'precision trimming, laminating, folding, binding' },
                { title: 'Dedicated Quality Control Station', desc: 'every order inspected before packing' },
              ].map((cap, cIdx) => (
                <div key={cIdx} className="flex items-start gap-3 text-xs sm:text-sm text-stone-200">
                  <span className="text-[#D4AF37] font-black text-sm shrink-0 mt-0.5">✓</span>
                  <div>
                    <strong className="text-white font-bold">{cap.title}</strong> — <span className="text-[#C8C8CC]">{cap.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image Row Gallery */}
          <div className="lg:col-span-5 space-y-3">
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl overflow-hidden border border-white/15 bg-black">
                <img
                  src="/industrial-large-format-printer.jpg"
                  alt="Press floor / machines at work"
                  className="w-full h-28 sm:h-32 object-cover hover:scale-105 transition-transform"
                />
              </div>
              <div className="rounded-xl overflow-hidden border border-white/15 bg-black">
                <img
                  src="/advertising-materials-portfolio.jpg"
                  alt="Finishing & quality control station"
                  className="w-full h-28 sm:h-32 object-cover hover:scale-105 transition-transform"
                />
              </div>
              <div className="rounded-xl overflow-hidden border border-white/15 bg-black">
                <img
                  src="/corrugated-shipping-cartons-mailer-boxes.jpg"
                  alt="Packing area with ready orders"
                  className="w-full h-28 sm:h-32 object-cover hover:scale-105 transition-transform"
                />
              </div>
            </div>
            <div className="p-3.5 bg-black/40 rounded-xl border border-white/10 text-xs text-stone-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>1,200 sqm purpose-built commercial press complex in Yenagoa</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5 — MISSION, VISION & VALUES                                      */}
      {/* ========================================================================= */}
      <section className="bg-[#0F0F12] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Mission */}
          <div className="bg-[#1A1A1F] p-8 rounded-2xl border border-white/10 space-y-3 shadow-md">
            <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37]">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-semibold text-[#F0D775]">
              Mission
            </h3>
            <p className="text-xs sm:text-sm text-[#C8C8CC] leading-relaxed">
              To deliver premium, reliable, and affordable printing solutions that empower every business and organisation to shine — locally and nationwide.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-[#1A1A1F] p-8 rounded-2xl border border-white/10 space-y-3 shadow-md">
            <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37]">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-semibold text-[#F0D775]">
              Vision
            </h3>
            <p className="text-xs sm:text-sm text-[#C8C8CC] leading-relaxed">
              To become Nigeria’s most trusted printing partner — known for quality, speed, and integrity — and to position Yenagoa as a commercial production hub for the entire region.
            </p>
          </div>

          {/* Core Values */}
          <div className="bg-[#1A1A1F] p-8 rounded-2xl border border-white/10 space-y-3 shadow-md">
            <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37]">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-semibold text-[#F0D775]">
              Core Values
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-[#C8C8CC]">
              <li>• <strong className="text-white">Excellence in Every Detail</strong> — We don’t cut corners</li>
              <li>• <strong className="text-white">Speed Without Compromise</strong> — Fast turnaround &amp; fine quality</li>
              <li>• <strong className="text-white">Integrity Always</strong> — Transparent pricing, honest timelines</li>
              <li>• <strong className="text-white">Community First</strong> — Investing in our people &amp; home</li>
              <li>• <strong className="text-white">Continuous Growth</strong> — Upgrading our standards yearly</li>
            </ul>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6 — MEET THE TEAM                                                 */}
      {/* ========================================================================= */}
      <section className="bg-[#1A1A1F] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#D4AF37] tracking-tight">
              Meet The Team
            </h2>
            <p className="text-sm sm:text-base text-[#C8C8CC]">
              &quot;Every print job carries our name — that’s why we treat yours like our own.&quot;
            </p>
          </div>

          {/* 4 Team Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Team 1 */}
            <div className="bg-[#0F0F12] p-6 rounded-2xl border border-white/10 text-center space-y-4 shadow-md flex flex-col items-center">
              <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-[#D4AF37] p-1 bg-black shadow-md flex items-center justify-center">
                <CompanyLogoMark className="w-16 h-16" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-white">
                  Founder &amp; Management
                </h4>
                <p className="text-xs text-[#C8C8CC] mt-0.5">
                  Strategic direction, quality oversight &amp; client relations
                </p>
              </div>
            </div>

            {/* Team 2 */}
            <div className="bg-[#0F0F12] p-6 rounded-2xl border border-white/10 text-center space-y-4 shadow-md flex flex-col items-center">
              <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-[#D4AF37] p-1 bg-black shadow-md flex items-center justify-center">
                <Cpu className="w-12 h-12 text-[#D4AF37]" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-white">
                  Design Studio
                </h4>
                <p className="text-xs text-[#C8C8CC] mt-0.5">
                  Layout, branding, file prep &amp; artwork refinement
                </p>
              </div>
            </div>

            {/* Team 3 */}
            <div className="bg-[#0F0F12] p-6 rounded-2xl border border-white/10 text-center space-y-4 shadow-md flex flex-col items-center">
              <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-[#D4AF37] p-1 bg-black shadow-md flex items-center justify-center">
                <Printer className="w-12 h-12 text-[#D4AF37]" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-white">
                  Press Floor
                </h4>
                <p className="text-xs text-[#C8C8CC] mt-0.5">
                  Machine operators with 10+ combined years of experience
                </p>
              </div>
            </div>

            {/* Team 4 */}
            <div className="bg-[#0F0F12] p-6 rounded-2xl border border-white/10 text-center space-y-4 shadow-md flex flex-col items-center">
              <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-[#D4AF37] p-1 bg-black shadow-md flex items-center justify-center">
                <Truck className="w-12 h-12 text-[#D4AF37]" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-white">
                  Finishing &amp; Logistics
                </h4>
                <p className="text-xs text-[#C8C8CC] mt-0.5">
                  Lamination, binding, protection &amp; nationwide dispatch
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7 — VISIT US (Location Block)                                     */}
      {/* ========================================================================= */}
      <section className="bg-[#0F0F12] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#D4AF37] tracking-tight">
            Visit Our Press
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Address Info */}
            <div className="lg:col-span-6 bg-[#1A1A1F] p-6 sm:p-8 rounded-2xl border border-white/10 space-y-5 shadow-lg">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">Silver &amp; Gold Inkshine Ltd</h3>
                <p className="text-xs sm:text-sm text-[#E8E8EA] leading-relaxed">
                  No. 875 Medford Okilo Road (Mbiama–Yenagoa Road), Opolo-Epie, directly opposite Pepperoni, Yenagoa, Bayelsa State, Nigeria.
                </p>
              </div>

              <div className="space-y-2 text-xs sm:text-sm text-[#C8C8CC] border-t border-white/10 pt-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#D4AF37]" />
                  <span><strong>Hours:</strong> Monday – Saturday, 8:00 AM – 6:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Same-Day Pickup Available in Yenagoa</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#D4AF37]" />
                  <span>Nationwide Delivery: 3–5 Business Days</span>
                </div>
              </div>

              <div className="space-y-2 text-xs sm:text-sm text-[#C8C8CC] border-t border-white/10 pt-4">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  <a href="tel:+2347030372539" className="text-white hover:text-[#D4AF37] font-bold">
                    +234 703 037 2539
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
                  <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="text-[#D4AF37] hover:underline font-bold">
                    Chat on WhatsApp — Reply in Minutes
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#D4AF37] hover:bg-[#D4AF37] text-white hover:text-black font-bold text-xs transition-all shadow-xs cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Get Directions on Google Maps</span>
                </a>
              </div>
            </div>

            {/* Right: Map Embed */}
            <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-white/15 shadow-lg bg-black h-[320px] sm:h-[360px]">
              <iframe
                title="Google Maps - Silver & Gold Inkshine Ltd"
                src="https://maps.google.com/maps?q=9.081999,8.675277&hl=en&z=16&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full block"
              />
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8 — FINAL CTA (Full Width)                                        */}
      {/* ========================================================================= */}
      <section className="bg-[#1A1A1F] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-center border-b border-white/10">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-white tracking-tight">
            Ready to Shine?
          </h2>

          <p className="text-sm sm:text-base text-[#C8C8CC] leading-relaxed">
            Your brand deserves the best impression. Let’s make it real.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            {/* Primary Gold WhatsApp */}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-[#D4AF37] hover:bg-[#e5c158] text-[#0F0F12] font-black text-xs sm:text-sm px-8 py-3.5 rounded-lg shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp Now</span>
            </a>

            {/* Secondary Outline Custom Quote */}
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

          <div className="pt-4 text-xs text-stone-400 font-semibold tracking-wider">
            CAC Registered • RC Certified (RC 1892044)
          </div>
        </div>
      </section>

    </div>
  );
};
