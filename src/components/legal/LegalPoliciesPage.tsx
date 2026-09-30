import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  RotateCcw, 
  ArrowLeft, 
  Printer as PrinterIcon, 
  Search, 
  Check, 
  Copy, 
  ExternalLink, 
  Building2, 
  Phone, 
  Mail, 
  HelpCircle,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { LEGAL_POLICIES, LegalPolicyDocument } from '../../data/legalPoliciesContent';
import { CompanyLogoMark } from '../common/CompanyLogo';

export type LegalDocType = 'terms' | 'privacy' | 'returns';

interface LegalPoliciesPageProps {
  initialDocument?: LegalDocType;
  onNavigateHome: () => void;
  onOpenContact?: () => void;
}

export const LegalPoliciesPage: React.FC<LegalPoliciesPageProps> = ({
  initialDocument = 'terms',
  onNavigateHome,
  onOpenContact
}) => {
  const [activeDocKey, setActiveDocKey] = useState<LegalDocType>(initialDocument);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (initialDocument) {
      setActiveDocKey(initialDocument);
    }
  }, [initialDocument]);

  const activeDoc: LegalPolicyDocument = LEGAL_POLICIES[activeDocKey];

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = (sectionId: string) => {
    const url = `${window.location.origin}${window.location.pathname}#${activeDocKey}-${sectionId}`;
    navigator.clipboard.writeText(url);
    setCopiedId(sectionId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter sections by search query
  const filteredSections = activeDoc.sections.filter((sec) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const matchesTitle = sec.title.toLowerCase().includes(query);
    const matchesContent = sec.content.some((p) => p.toLowerCase().includes(query));
    return matchesTitle || matchesContent;
  });

  const docsNavigation: { id: LegalDocType; label: string; icon: React.FC<{ className?: string }>; desc: string }[] = [
    {
      id: 'terms',
      label: 'Terms & Conditions',
      icon: FileText,
      desc: 'Commercial contracts, pre-press proofing, bleed rules & liability'
    },
    {
      id: 'privacy',
      label: 'Privacy Policy',
      icon: ShieldCheck,
      desc: 'NDPR compliance, proprietary artwork security & data retention'
    },
    {
      id: 'returns',
      label: 'Refund Policy',
      icon: RotateCcw,
      desc: 'Cancellations, free production reprints, claim window & refund process'
    }
  ];

  return (
    <div className="min-h-screen bg-[#08080a] text-stone-200 antialiased selection:bg-[#f5be38]/30 selection:text-white">
      {/* Top Legal Header Navigation */}
      <div className="relative z-20 bg-[#0c0d12]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 lg:px-8 py-3.5 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Back to Storefront Button */}
          <button
            type="button"
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-300 hover:text-white bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-xl border border-white/10 transition-all cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-[#f5be38] group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Storefront</span>
          </button>

          {/* Logo & Corporate Tag */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 flex items-center justify-center">
              <CompanyLogoMark className="w-full h-full" />
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-black tracking-tight text-white flex items-center gap-1">
                <span>SILVER &amp; GOLD INKSHINE</span>
                <span className="text-[10px] font-mono text-[#f5be38] font-bold">RC 1892044</span>
              </div>
              <div className="text-[10px] text-stone-400">Legal &amp; Regulatory Compliance Center</div>
            </div>
          </div>

          {/* Action Utilities (Print & WhatsApp Support) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-stone-300 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-2 rounded-xl border border-white/10 transition-colors cursor-pointer"
              title="Print official legal documentation"
            >
              <PrinterIcon className="w-3.5 h-3.5 text-stone-400" />
              <span>Print Document</span>
            </button>

            <a
              href="https://wa.me/2347030372539?text=Hello%20Silver%20%26%20Gold%20Inkshine%2C%20I%20have%20a%20legal%2Forder%20inquiry%20regarding%20terms%20or%20policies"
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

      {/* Hero Banner with Golden Accents */}
      <div className="relative bg-[#0d0e14] border-b border-white/10 py-10 sm:py-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(245,190,56,0.12)_0%,transparent_70%)] blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-4 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5be38]/10 border border-[#f5be38]/30 text-[#f5be38] text-[11px] font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Official Corporate Governance • RC 1892044</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Policies &amp; Legal Framework
          </h1>

          <p className="text-sm sm:text-base text-stone-300 max-w-2xl leading-relaxed">
            Transparent commercial agreements, quality assurance standards, artwork privacy protections, and return protocols governing Silver &amp; Gold Inkshine Ltd operations across Nigeria.
          </p>
        </div>
      </div>

      {/* Main Content Area: 3-Tab Document Navigation + Reading Pane */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar: Document Switcher & Quick Navigation */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Primary Policy Switcher Tabs */}
            <div className="bg-[#12131a] rounded-2xl border border-white/10 p-2 space-y-1.5 shadow-md">
              <div className="px-3 py-2 text-[11px] font-extrabold uppercase tracking-wider text-stone-400">
                Select Policy Document
              </div>

              {docsNavigation.map((item) => {
                const Icon = item.icon;
                const isActive = activeDocKey === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveDocKey(item.id);
                      setSearchQuery('');
                      window.scrollTo({ top: 220, behavior: 'smooth' });
                    }}
                    className={`w-full text-left p-3.5 rounded-xl transition-all flex items-start gap-3 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-[#ffd25d] to-[#f5be38] text-black shadow-md'
                        : 'bg-white/5 hover:bg-white/10 text-stone-200'
                    }`}
                  >
                    <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${isActive ? 'bg-black/10 text-black' : 'bg-white/10 text-[#f5be38]'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-black text-sm leading-tight ${isActive ? 'text-black' : 'text-white'}`}>
                        {item.label}
                      </div>
                      <div className={`text-[11px] mt-1 leading-snug line-clamp-2 ${isActive ? 'text-black/80 font-medium' : 'text-stone-400'}`}>
                        {item.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* In-Document Quick Search */}
            <div className="bg-[#12131a] rounded-2xl border border-white/10 p-4 space-y-3 shadow-md">
              <div className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center justify-between">
                <span>Search Document</span>
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="text-[11px] text-[#f5be38] hover:underline"
                  >
                    Reset
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${activeDoc.title}...`}
                  className="w-full bg-white/5 border border-white/15 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-stone-500 focus:outline-hidden focus:border-[#f5be38]"
                />
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              <div className="text-[11px] text-stone-500">
                Type keywords like &quot;bleed&quot;, &quot;reprint&quot;, &quot;NDPR&quot;, &quot;deposit&quot;, &quot;proof&quot;.
              </div>
            </div>

            {/* Table of Contents / Quick Jump Anchor Links */}
            <div className="hidden lg:block bg-[#12131a] rounded-2xl border border-white/10 p-4 space-y-3 shadow-md">
              <div className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Sections in this Document
              </div>
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

            {/* Corporate Verification Box */}
            <div className="bg-gradient-to-br from-[#161722] to-[#0e0f16] rounded-2xl border border-white/10 p-4 space-y-3 text-xs text-stone-300">
              <div className="flex items-center gap-2 text-white font-bold">
                <Building2 className="w-4 h-4 text-[#f5be38]" />
                <span>Incorporation Details</span>
              </div>
              <div className="space-y-1 text-[11px] text-stone-400">
                <div><strong>Entity:</strong> Silver &amp; Gold Inkshine Ltd</div>
                <div><strong>CAC Registry:</strong> RC 1892044</div>
                <div><strong>Head Office:</strong> 875 Medford Okilo Rd, Opolo-Epie, Yenagoa, Bayelsa State</div>
                <div><strong>Phone / Desk:</strong> +234 703 037 2539</div>
              </div>
            </div>

          </div>

          {/* Right Main Pane: Comprehensive Policy Text */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Active Document Header Card */}
            <div className="bg-[#12131a] rounded-3xl border border-white/10 p-6 sm:p-8 space-y-4 shadow-xl">
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

              {/* Prominent Quick Summary Table if defined */}
              {activeDoc.quickSummaryTable && (
                <div className="pt-2">
                  <div className="text-xs font-black uppercase tracking-wider text-[#f5be38] mb-2.5 flex items-center gap-2">
                    <span>⚡ Quick Summary at a Glance</span>
                  </div>
                  <div className="overflow-x-auto rounded-2xl border border-white/15 bg-black/40">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                          <th className="py-3 px-4 font-black text-white">{activeDoc.quickSummaryTable.headers[0]}</th>
                          <th className="py-3 px-4 font-black text-white">{activeDoc.quickSummaryTable.headers[1]}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {activeDoc.quickSummaryTable.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-white/5 transition-colors">
                            <td className="py-2.5 px-4 font-bold text-stone-200">{row.col1}</td>
                            <td className="py-2.5 px-4 text-stone-300">{row.col2}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Sections Accordion / Cards */}
            <div className="space-y-5">
              {filteredSections.length === 0 ? (
                <div className="bg-[#12131a] rounded-3xl border border-white/10 p-8 text-center space-y-3">
                  <HelpCircle className="w-8 h-8 text-stone-400 mx-auto" />
                  <div className="font-bold text-white text-base">No matching sections found</div>
                  <p className="text-xs text-stone-400">
                    No policy clause matched &quot;{searchQuery}&quot;. Try searching for another keyword.
                  </p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl"
                  >
                    Clear Search
                  </button>
                </div>
              ) : (
                filteredSections.map((section) => (
                  <div
                    key={section.id}
                    id={section.id}
                    className="bg-[#12131a] rounded-3xl border border-white/10 p-6 sm:p-7 space-y-3.5 shadow-md scroll-mt-24 transition-all hover:border-white/20"
                  >
                    <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                      <h3 className="text-base sm:text-lg font-black text-white">
                        {section.title}
                      </h3>
                      <button
                        type="button"
                        onClick={() => handleCopyLink(section.id)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white text-xs flex items-center gap-1 transition-colors cursor-pointer"
                        title="Copy direct section link"
                      >
                        {copiedId === section.id ? (
                          <span className="text-emerald-400 flex items-center gap-1 text-[11px] font-bold">
                            <Check className="w-3.5 h-3.5" /> Copied
                          </span>
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <div className="space-y-3 text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
                      {section.content.map((paragraph, pIdx) => (
                        <p key={pIdx} className="text-stone-300">
                          {paragraph}
                        </p>
                      ))}

                      {section.subsections && (
                        <div className="pt-2 space-y-3">
                          {section.subsections.map((sub, sIdx) => (
                            <div key={sIdx} className="bg-white/5 p-3.5 rounded-xl space-y-1.5">
                              <div className="font-bold text-white text-xs sm:text-sm">
                                {sub.subtitle}
                              </div>
                              {sub.paragraphs.map((p, subPIdx) => (
                                <p key={subPIdx} className="text-xs text-stone-300">
                                  {p}
                                </p>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Bottom Support & Inquiries Box */}
            <div className="bg-gradient-to-r from-[#181926] to-[#12131c] rounded-3xl border border-white/15 p-6 sm:p-8 space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-lg font-black text-white">Have Questions About These Policies?</h4>
                  <p className="text-xs text-stone-400 max-w-md">
                    Our compliance desk and commercial print production directors are available to answer inquiries regarding institutional SLAs, enterprise volume contracts, and proof verification.
                  </p>
                </div>
                <a
                  href="https://wa.me/2347030372539?text=Hello%20Silver%20%26%20Gold%20Inkshine%2C%20I%20have%20an%20inquiry%20regarding%20commercial%20terms%20or%20policies"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-xl bg-white hover:bg-stone-200 text-black font-extrabold text-xs flex items-center gap-2 shadow-md transition-all shrink-0 cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Contact Compliance Desk</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
