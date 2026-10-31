import React, { useState } from 'react';
import { 
  FileText, 
  ArrowLeft, 
  Printer as PrinterIcon, 
  Search, 
  Check, 
  Copy, 
  ExternalLink, 
  Building2, 
  Phone, 
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { LEGAL_POLICIES, LegalPolicyDocument } from '../../data/legalPoliciesContent';
import { CompanyLogoMark } from '../common/CompanyLogo';

interface TermsConditionsPageProps {
  onNavigateHome: () => void;
  onOpenPrivacy: () => void;
  onOpenReturns: () => void;
}

export const TermsConditionsStandalonePage: React.FC<TermsConditionsPageProps> = ({
  onNavigateHome,
  onOpenPrivacy,
  onOpenReturns,
}) => {
  const activeDoc: LegalPolicyDocument = LEGAL_POLICIES.terms;
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = (sectionId: string) => {
    const url = `${window.location.origin}${window.location.pathname}#terms-${sectionId}`;
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
                <div className="text-[10px] text-stone-400">Terms of Service &amp; Master Agreement</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-stone-300 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-2 rounded-xl border border-white/10 transition-colors cursor-pointer"
              >
                <PrinterIcon className="w-3.5 h-3.5 text-stone-400" />
                <span>Print</span>
              </button>
              <a
                href="https://wa.me/2347030372539?text=Hello%20Silver%20%26%20Gold%20Inkshine,%20I%20have%20an%20inquiry%20regarding%20Terms%20&%20Conditions"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-black text-black bg-[#f5be38] hover:bg-[#ffd15c] px-3.5 py-2 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <span>Legal Desk</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Hero Banner with HD Press Image Background */}
        <div className="relative bg-[#0d0e14] border-b border-white/10 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-25 mix-blend-luminosity">
            <img
              src="https://cdn.hstockplus.org/uploads/public/img-1790066633477-1b16a758309b0fff.webp"
              alt="Silver & Gold Press Press Background"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#08080a] via-[#08080a]/90 to-[#08080a]" />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none z-10" />

          <div className="max-w-7xl mx-auto relative z-20 space-y-4 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-[#f5be38]/40 text-[#f5be38] text-xs font-bold uppercase tracking-wider backdrop-blur-xs shadow-sm">
              <FileText className="w-4 h-4 text-[#f5be38]" />
              <span>Commercial Master Agreement • RC 1892044</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Terms &amp; Conditions of Service
            </h1>

            <p className="text-sm sm:text-base text-stone-300 max-w-2xl leading-relaxed">
              Commercial contracts, pre-press proofing, bleed rules, payment protocols, and liability limitations governing Silver &amp; Gold Inkshine Ltd operations across Nigeria.
            </p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Sidebar Switcher & Quick Navigation */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Policy Navigator */}
              <div className="bg-[#12131a] rounded-2xl border border-white/10 p-3 space-y-2 shadow-md">
                <div className="px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-stone-400">
                  Legal Documents
                </div>
                <button
                  type="button"
                  className="w-full text-left p-3 rounded-xl bg-gradient-to-r from-[#ffd25d] to-[#f5be38] text-black font-black text-sm flex items-center justify-between shadow-md cursor-pointer"
                >
                  <span>Terms &amp; Conditions</span>
                  <Check className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 text-stone-200 font-bold text-sm flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span>Privacy Policy (NDPR)</span>
                  <ExternalLink className="w-4 h-4 text-[#f5be38]" />
                </button>
                <button
                  type="button"
                  onClick={onOpenReturns}
                  className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 text-stone-200 font-bold text-sm flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span>Refund Policy</span>
                  <ExternalLink className="w-4 h-4 text-[#f5be38]" />
                </button>
              </div>

              {/* Search Box */}
              <div className="bg-[#12131a] rounded-2xl border border-white/10 p-4 space-y-3 shadow-md">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-400">Search Terms</div>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search terms..."
                    className="w-full bg-white/5 border border-white/15 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-stone-500 focus:outline-hidden focus:border-[#f5be38]"
                  />
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Table of Contents */}
              <div className="hidden lg:block bg-[#12131a] rounded-2xl border border-white/10 p-4 space-y-3 shadow-md">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-400">Sections</div>
                <nav className="space-y-1 text-xs">
                  {activeDoc.sections.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="block px-2.5 py-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/5 transition-colors truncate"
                    >
                      {sec.title}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Corporate Box */}
              <div className="bg-gradient-to-br from-[#161722] to-[#0e0f16] rounded-2xl border border-white/10 p-4 space-y-3 text-xs text-stone-300">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Building2 className="w-4 h-4 text-[#f5be38]" />
                  <span>Incorporation Details</span>
                </div>
                <div className="space-y-1 text-[11px] text-stone-400">
                  <div><strong>Entity:</strong> Silver &amp; Gold Inkshine Ltd</div>
                  <div><strong>CAC Registry:</strong> RC 1892044</div>
                  <div><strong>Head Office:</strong> 875 Medford Okilo Rd, Opolo-Epie, Yenagoa, Bayelsa State</div>
                </div>
              </div>

            </div>

            {/* Right Main Pane */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="bg-[#12131a] rounded-3xl border border-white/10 p-6 sm:p-8 space-y-5 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5be38]/15 border border-[#f5be38]/30 text-[#f5be38] text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{activeDoc.badge}</span>
                  </div>
                  <div className="text-xs font-mono text-stone-400">
                    Last Updated: <strong className="text-white">{activeDoc.lastUpdated}</strong>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {activeDoc.title}
                </h2>

                <p className="text-sm text-stone-300 leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/10">
                  {activeDoc.summary}
                </p>

                {/* Workflow Process */}
                <div className="pt-2 pb-2">
                  <div className="text-xs font-black uppercase tracking-wider text-[#f5be38] mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#f5be38]" />
                    <span>Verified Operational Workflow &amp; Compliance Process</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { step: '01', title: 'Pre-Press File Audit', desc: 'CMYK conversion & bleed check' },
                      { step: '02', title: 'Proof Approval', desc: 'Client review & digital sign-off' },
                      { step: '03', title: 'Precision Print', desc: 'Offset & large format 3-5 day dispatch' },
                    ].map((wf, idx) => (
                      <div key={idx} className="bg-black/50 border border-white/15 rounded-2xl p-4 flex items-start gap-3.5 shadow-inner">
                        <div className="w-8 h-8 rounded-xl bg-[#f5be38]/20 border border-[#f5be38]/40 text-[#f5be38] font-mono font-black text-xs flex items-center justify-center shrink-0">
                          {wf.step}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-white text-xs sm:text-sm">{wf.title}</div>
                          <div className="text-[11px] text-stone-400 mt-0.5 leading-snug">{wf.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sections */}
              <div className="space-y-6">
                {filteredSections.map((sec) => (
                  <article
                    key={sec.id}
                    id={sec.id}
                    className="bg-[#12131a] rounded-3xl border border-white/10 p-6 sm:p-8 space-y-4 shadow-lg hover:border-[#f5be38]/30 transition-all scroll-mt-24"
                  >
                    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                      <h3 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-[#f5be38]" />
                        <span>{sec.title}</span>
                      </h3>

                      <button
                        type="button"
                        onClick={() => handleCopyLink(sec.id)}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-stone-400 hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-lg border border-white/10 transition-colors cursor-pointer"
                      >
                        {copiedId === sec.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Link</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="space-y-3 text-sm text-stone-300 leading-relaxed">
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
