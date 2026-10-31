import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ArrowLeft, 
  Printer as PrinterIcon, 
  Search, 
  Check, 
  Copy, 
  ExternalLink, 
  Building2, 
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { LEGAL_POLICIES, LegalPolicyDocument } from '../../data/legalPoliciesContent';
import { CompanyLogoMark } from '../common/CompanyLogo';

interface PrivacyPolicyPageProps {
  onNavigateHome: () => void;
  onOpenTerms: () => void;
  onOpenReturns: () => void;
}

export const PrivacyPolicyStandalonePage: React.FC<PrivacyPolicyPageProps> = ({
  onNavigateHome,
  onOpenTerms,
  onOpenReturns,
}) => {
  const activeDoc: LegalPolicyDocument = LEGAL_POLICIES.privacy;
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = (sectionId: string) => {
    const url = `${window.location.origin}${window.location.pathname}#privacy-${sectionId}`;
    navigator.clipboard.writeText(url);
    setCopiedId(sectionId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredSections = activeDoc.sections.filter((sec) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return sec.title.toLowerCase().includes(query) || sec.content.some((p) => p.toLowerCase().includes(query));
  });

  return (
    <div className="min-h-screen bg-white text-stone-900 antialiased selection:bg-[#f5be38]/30 selection:text-black flex flex-col justify-between">
      <div>
        {/* Top Sticky Header */}
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 sm:px-6 lg:px-8 py-3.5 shadow-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-700 hover:text-stone-950 bg-stone-100 hover:bg-stone-200 px-3.5 py-2 rounded-xl border border-stone-300 transition-all cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 text-amber-600 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Storefront</span>
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 flex items-center justify-center">
                <CompanyLogoMark className="w-full h-full" />
              </div>
              <div className="hidden sm:block">
                <div className="text-xs font-black tracking-tight text-stone-900 flex items-center gap-1">
                  <span>SILVER &amp; GOLD INKSHINE</span>
                  <span className="text-[10px] font-mono text-amber-700 font-bold">RC 1892044</span>
                </div>
                <div className="text-[10px] text-stone-500">NDPR Data Privacy Center</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-stone-950 bg-stone-100 hover:bg-stone-200 px-3 py-2 rounded-xl border border-stone-300 transition-colors cursor-pointer"
              >
                <PrinterIcon className="w-3.5 h-3.5 text-stone-600" />
                <span>Print</span>
              </button>
              <a
                href="https://wa.me/2347030372539?text=Hello%20Silver%20%26%20Gold%20Inkshine,%20I%20have%20a%20privacy%20inquiry"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-black text-stone-950 bg-[#f5be38] hover:bg-[#ffd15c] px-3.5 py-2 rounded-xl shadow-xs transition-colors cursor-pointer border border-amber-400"
              >
                <span>Legal Desk</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* SaaS Reference Hero Banner (Pure White Background) */}
        <div className="relative bg-white border-b border-stone-200 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden text-center">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(245,190,56,0.1)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

          <div className="max-w-3xl mx-auto relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
              <span>NDPR 2023 Compliant • Last updated - {activeDoc.lastUpdated}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-950 tracking-tight leading-[1.1]">
              We take your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-800">privacy seriously.</span>
            </h1>

            <p className="text-stone-700 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-medium">
              {activeDoc.summary}
            </p>
          </div>
        </div>

        {/* Featured Security Showcase Row (White Background) */}
        <div className="bg-stone-50 border-b border-stone-200 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Security Padlock Image Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden bg-white border border-stone-200 shadow-xl p-4 sm:p-6 flex flex-col items-center">
                <img
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
                  alt="Secure Data Encryption Padlock"
                  className="w-full aspect-[4/3] object-cover rounded-2xl shadow-inner"
                />
                <div className="mt-4 w-full bg-amber-50 rounded-xl p-3 border border-amber-200 flex items-center justify-between">
                  <span className="text-xs font-black text-stone-950">NDPR 2023 Compliant</span>
                  <span className="text-[11px] font-mono text-amber-800 font-bold">Nigeria Data Protection Act</span>
                </div>
              </div>
            </div>

            {/* Right: Your Data Belongs to You */}
            <div className="lg:col-span-7 space-y-5">
              <h2 className="text-3xl sm:text-4xl font-black text-stone-950 tracking-tight">
                Your data belongs to you. Not to us.
              </h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-medium">
                Silver &amp; Gold Inkshine Ltd does not sell your personal data or client artwork files. We do not use client orders for advertising. We collect only what we need to deliver your commercial print runs and keep your corporate account secure.
              </p>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                This document is written in plain language — not legal camouflage. If something isn&apos;t clear, email us at <a href="mailto:inkshineltd@gmail.com" className="text-amber-700 font-bold underline">inkshineltd@gmail.com</a>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  'No selling of personal data',
                  'No behavioral advertising',
                  'NDPR 2023 compliant',
                  'Deletion requests honored in 30 days',
                ].map((bullet, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-bold text-stone-800">
                    <div className="w-5 h-5 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-900 font-black">
                      ✓
                    </div>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Sidebar Switcher */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-stone-50 rounded-2xl border border-stone-200 p-3 space-y-2 shadow-sm">
                <div className="px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-stone-500">
                  Legal Documents
                </div>
                <button
                  type="button"
                  onClick={onOpenTerms}
                  className="w-full text-left p-3 rounded-xl bg-white hover:bg-stone-100 text-stone-800 font-bold text-sm flex items-center justify-between border border-stone-200 transition-colors cursor-pointer"
                >
                  <span>Terms &amp; Conditions</span>
                  <ExternalLink className="w-4 h-4 text-amber-700" />
                </button>
                <button
                  type="button"
                  className="w-full text-left p-3 rounded-xl bg-gradient-to-r from-[#f5be38] to-amber-400 text-stone-950 font-black text-sm flex items-center justify-between shadow-sm cursor-pointer border border-amber-400"
                >
                  <span>Privacy Policy (NDPR)</span>
                  <Check className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onOpenReturns}
                  className="w-full text-left p-3 rounded-xl bg-white hover:bg-stone-100 text-stone-800 font-bold text-sm flex items-center justify-between border border-stone-200 transition-colors cursor-pointer"
                >
                  <span>Refund Policy</span>
                  <ExternalLink className="w-4 h-4 text-amber-700" />
                </button>
              </div>

              {/* Search */}
              <div className="bg-stone-50 rounded-2xl border border-stone-200 p-4 space-y-3 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-600">Search Privacy Policy</div>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search privacy terms..."
                    className="w-full bg-white border border-stone-300 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:border-amber-500"
                  />
                  <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* TOC */}
              <div className="hidden lg:block bg-stone-50 rounded-2xl border border-stone-200 p-4 space-y-3 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-600">Sections</div>
                <nav className="space-y-1 text-xs">
                  {activeDoc.sections.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="block px-2.5 py-1.5 rounded-lg text-stone-700 hover:text-stone-950 hover:bg-stone-200/60 transition-colors truncate font-medium"
                    >
                      {sec.title}
                    </a>
                  ))}
                </nav>
              </div>

            </div>

            {/* Right Main Pane */}
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-6">
                {filteredSections.map((sec) => (
                  <article
                    key={sec.id}
                    id={sec.id}
                    className="bg-stone-50 rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-4 shadow-sm hover:border-amber-400 transition-all scroll-mt-24"
                  >
                    <div className="flex items-center justify-between gap-4 border-b border-stone-200 pb-3">
                      <h3 className="text-lg sm:text-xl font-black text-stone-950 tracking-tight flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-amber-600" />
                        <span>{sec.title}</span>
                      </h3>

                      <button
                        type="button"
                        onClick={() => handleCopyLink(sec.id)}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-stone-700 hover:text-stone-950 bg-white hover:bg-stone-100 px-2.5 py-1 rounded-lg border border-stone-300 transition-colors cursor-pointer"
                      >
                        {copiedId === sec.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-700 font-bold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-stone-500" />
                            <span>Copy Link</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="space-y-3 text-sm text-stone-800 leading-relaxed font-normal">
                      {sec.content.map((paragraph, pIdx) => (
                        <p key={pIdx}>{paragraph}</p>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
