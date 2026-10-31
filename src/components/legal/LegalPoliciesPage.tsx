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
  initialDocument = 'privacy',
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

  const getWorkflowSteps = (docKey: LegalDocType) => {
    if (docKey === 'terms') {
      return [
        { step: '01', title: 'Pre-Press File Audit', desc: 'CMYK conversion & 3mm bleed verification' },
        { step: '02', title: 'Proof Approval', desc: 'Client review & digital sign-off' },
        { step: '03', title: 'Precision Print', desc: 'Offset & large format 3-5 day dispatch' },
      ];
    } else if (docKey === 'privacy') {
      return [
        { step: '01', title: 'Secure SSL Upload', desc: 'Encrypted file & data transmission' },
        { step: '02', title: 'Confidential Storage', desc: 'Restricted access on secure servers' },
        { step: '03', title: 'NDPR Compliance', desc: 'Zero sharing with third parties' },
      ];
    } else {
      return [
        { step: '01', title: 'Delivery Inspection', desc: 'Verify shrink-wrapped packaging' },
        { step: '02', title: '48h Claim Window', desc: 'Report any transit or print defects' },
        { step: '03', title: 'Free Reprint', desc: 'Pre-press audit & prompt resolution' },
      ];
    }
  };

  const docsNavigation: { id: LegalDocType; label: string; icon: React.FC<{ className?: string }>; desc: string }[] = [
    {
      id: 'privacy',
      label: 'Privacy Policy',
      icon: ShieldCheck,
      desc: 'NDPR compliance, proprietary artwork security & data retention'
    },
    {
      id: 'terms',
      label: 'Terms & Conditions',
      icon: FileText,
      desc: 'Commercial contracts, pre-press proofing, bleed rules & liability'
    },
    {
      id: 'returns',
      label: 'Refund Policy',
      icon: RotateCcw,
      desc: 'Cancellations, free production reprints, claim window & refund process'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-stone-900 antialiased selection:bg-[#f5be38]/30 selection:text-black">
      {/* Top Legal Header Navigation */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 sm:px-6 lg:px-8 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Back to Storefront Button */}
          <button
            type="button"
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-700 hover:text-stone-950 bg-stone-100 hover:bg-stone-200 px-3.5 py-2 rounded-xl border border-stone-300 transition-all cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-amber-600 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Storefront</span>
          </button>

          {/* Logo & Corporate Tag */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 flex items-center justify-center">
              <CompanyLogoMark className="w-full h-full" />
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-black tracking-tight text-stone-900 flex items-center gap-1">
                <span>SILVER &amp; GOLD INKSHINE</span>
                <span className="text-[10px] font-mono text-amber-700 font-bold">RC 1892044</span>
              </div>
              <div className="text-[10px] text-stone-500">Legal &amp; NDPR 2023 Compliance Center</div>
            </div>
          </div>

          {/* Action Utilities (Print & WhatsApp Support) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-stone-950 bg-stone-100 hover:bg-stone-200 px-3 py-2 rounded-xl border border-stone-300 transition-colors cursor-pointer"
              title="Print official legal documentation"
            >
              <PrinterIcon className="w-3.5 h-3.5 text-stone-600" />
              <span>Print Document</span>
            </button>

            <a
              href="https://wa.me/2347030372539?text=Hello%20Silver%20%26%20Gold%20Inkshine%2C%20I%20have%20a%20legal%2Forder%20inquiry%20regarding%20terms%20or%20policies"
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
        <div className="absolute inset-0 bg-[radial-gradient(rgba(245,190,56,0.12)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

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

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setActiveDocKey('privacy')}
              className="h-11 px-6 rounded-xl bg-[#f5be38] hover:bg-[#ffd15c] text-stone-950 font-extrabold text-xs sm:text-sm tracking-wide uppercase shadow-sm transition-all cursor-pointer border border-amber-400"
            >
              Privacy Policy (NDPR) →
            </button>
            <button
              type="button"
              onClick={() => setActiveDocKey('terms')}
              className="h-11 px-6 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-900 font-semibold text-xs sm:text-sm tracking-wide uppercase border border-stone-300 transition-all cursor-pointer"
            >
              Terms of Service →
            </button>
          </div>
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
              This document is written in plain language — not legal camouflage. If something isn&apos;t clear, email us at <a href="mailto:orders@silverandgold.ng" className="text-amber-700 font-bold underline">orders@silverandgold.ng</a>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'No selling of personal data',
                'No behavioral advertising',
                'NDPR 2023 compliant',
                'Deletion requests honored in 30 days',
              ].map((bullet, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-bold text-stone-800">
                  <div className="w-5 h-5 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 font-black">
                    ✓
                  </div>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Main Content Area: 3-Tab Document Navigation + Reading Pane */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar: Document Switcher & Quick Navigation */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Primary Policy Switcher Tabs */}
            <div className="bg-stone-50 rounded-2xl border border-stone-200 p-2 space-y-1.5 shadow-sm">
              <div className="px-3 py-2 text-[11px] font-extrabold uppercase tracking-wider text-stone-500">
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
                        ? 'bg-gradient-to-r from-[#f5be38] to-amber-400 text-stone-950 shadow-sm font-bold border border-amber-300'
                        : 'bg-white hover:bg-stone-100 text-stone-800 border border-stone-200'
                    }`}
                  >
                    <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${isActive ? 'bg-stone-950/10 text-stone-950' : 'bg-stone-100 text-amber-700'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-black text-sm leading-tight ${isActive ? 'text-stone-950' : 'text-stone-900'}`}>
                        {item.label}
                      </div>
                      <div className={`text-[11px] mt-1 leading-snug line-clamp-2 ${isActive ? 'text-stone-900/80 font-medium' : 'text-stone-600'}`}>
                        {item.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* In-Document Quick Search */}
            <div className="bg-stone-50 rounded-2xl border border-stone-200 p-4 space-y-3 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center justify-between">
                <span>Search Document</span>
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="text-[11px] text-amber-700 hover:underline font-bold"
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
                  className="w-full bg-white border border-stone-300 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:border-amber-500 shadow-2xs"
                />
                <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              <div className="text-[11px] text-stone-500">
                Type keywords like &quot;bleed&quot;, &quot;reprint&quot;, &quot;NDPR&quot;, &quot;deposit&quot;, &quot;proof&quot;.
              </div>
            </div>

            {/* Table of Contents / Quick Jump Anchor Links */}
            <div className="hidden lg:block bg-stone-50 rounded-2xl border border-stone-200 p-4 space-y-3 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-wider text-stone-600">
                Sections in this Document
              </div>
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

            {/* Corporate Verification Box */}
            <div className="bg-gradient-to-br from-stone-900 to-stone-950 text-white rounded-2xl border border-stone-800 p-4 space-y-3 text-xs shadow-md">
              <div className="flex items-center gap-2 text-white font-bold">
                <Building2 className="w-4 h-4 text-[#f5be38]" />
                <span>Incorporation Details</span>
              </div>
              <div className="space-y-1 text-[11px] text-stone-300">
                <div><strong>Entity:</strong> Silver &amp; Gold Inkshine Ltd</div>
                <div><strong>CAC Registry:</strong> RC 1892044</div>
                <div><strong>Head Office:</strong> 875 Medford Okilo Rd, Opolo-Epie, Yenagoa, Bayelsa State</div>
                <div><strong>Phone / Desk:</strong> +234 703 037 2539</div>
              </div>
            </div>

          </div>

          {/* Right Main Pane: Comprehensive Policy Text & Workflows */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Active Document Header Card */}
            <div className="bg-stone-50 rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>{activeDoc.badge}</span>
                </div>
                <div className="text-xs font-mono text-stone-600">
                  Last Updated: <strong className="text-stone-900">{activeDoc.lastUpdated}</strong>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight">
                {activeDoc.title}
              </h2>

              <p className="text-sm text-stone-800 leading-relaxed bg-white p-4 rounded-2xl border border-stone-200 font-medium">
                {activeDoc.summary}
              </p>

              {/* Workflow & Compliance Process Diagram */}
              <div className="pt-2 pb-2">
                <div className="text-xs font-black uppercase tracking-wider text-amber-800 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>Verified Operational Workflow &amp; Compliance Process</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {getWorkflowSteps(activeDocKey).map((wf, idx) => (
                    <div key={idx} className="bg-white border border-stone-200 rounded-2xl p-4 flex items-start gap-3.5 shadow-2xs">
                      <div className="w-8 h-8 rounded-xl bg-amber-100 border border-amber-300 text-amber-900 font-mono font-black text-xs flex items-center justify-center shrink-0">
                        {wf.step}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-stone-900 text-xs sm:text-sm">{wf.title}</div>
                        <div className="text-[11px] text-stone-600 mt-0.5 leading-snug">{wf.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prominent Quick Summary Table if defined */}
              {activeDoc.quickSummaryTable && (
                <div className="pt-2">
                  <div className="text-xs font-black uppercase tracking-wider text-amber-800 mb-2.5 flex items-center gap-2">
                    <span>⚡ Quick Summary at a Glance</span>
                  </div>
                  <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-2xs">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-stone-200 bg-stone-100">
                          <th className="py-3 px-4 font-black text-stone-900">{activeDoc.quickSummaryTable.headers[0]}</th>
                          <th className="py-3 px-4 font-black text-stone-900">{activeDoc.quickSummaryTable.headers[1]}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200 text-stone-800">
                        {activeDoc.quickSummaryTable.rows.map((row, i) => (
                          <tr key={i} className="hover:bg-stone-50 transition-colors">
                            <td className="py-3 px-4 font-bold text-stone-900">{row.col1}</td>
                            <td className="py-3 px-4 text-stone-700">{row.col2}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </div>

            {/* Sections Content List */}
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
                      title="Copy anchor link to section"
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

                    {sec.subsections && sec.subsections.map((sub, sIdx) => (
                      <div key={sIdx} className="pt-3 space-y-2">
                        <h4 className="font-bold text-stone-950 text-sm sm:text-base text-amber-800">
                          {sub.subtitle}
                        </h4>
                        <div className="space-y-1.5 pl-2">
                          {sub.paragraphs.map((subP, spIdx) => (
                            <p key={spIdx} className="text-stone-800 text-sm">
                              {subP}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              ))}

              {filteredSections.length === 0 && (
                <div className="bg-stone-50 rounded-3xl border border-stone-200 p-12 text-center space-y-3">
                  <HelpCircle className="w-10 h-10 text-stone-400 mx-auto" />
                  <div className="text-stone-950 font-bold text-base">No matching legal sections found</div>
                  <p className="text-xs text-stone-600 max-w-sm mx-auto">
                    No sections matched your query &quot;{searchQuery}&quot; in {activeDoc.title}. Try searching for broader terms.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="mt-2 px-4 py-2 rounded-xl bg-[#f5be38] text-stone-950 font-bold text-xs"
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Support Callout */}
            <div className="bg-gradient-to-r from-stone-900 to-stone-950 text-white rounded-3xl border border-stone-800 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-xs font-mono font-bold text-[#f5be38] uppercase tracking-wider">
                  Need Legal Clarification or Custom Enterprise SLA?
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  Speak Directly With Our Legal &amp; Pre-Press Desk
                </h3>
              </div>
              <a
                href="https://wa.me/2347030372539?text=Hello%20Silver%20%26%20Gold%20Inkshine%2C%20I%20would%20like%20to%20discuss%20a%20commercial%20agreement%20or%20SLA"
                target="_blank"
                rel="noreferrer"
                className="h-11 px-6 rounded-xl bg-[#f5be38] hover:bg-[#ffd15c] text-stone-950 font-extrabold text-xs sm:text-sm inline-flex items-center gap-2 transition-all shadow-sm shrink-0 cursor-pointer border border-amber-400"
              >
                <Phone className="w-4 h-4" />
                <span>Chat with Legal Desk</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
