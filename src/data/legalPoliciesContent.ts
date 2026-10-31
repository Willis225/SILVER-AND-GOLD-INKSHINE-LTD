export interface LegalPolicySection {
  id: string;
  title: string;
  content: string[];
  subsections?: {
    subtitle: string;
    paragraphs: string[];
  }[];
}

export interface LegalPolicySummaryTableRow {
  col1: string;
  col2: string;
}

export interface LegalPolicyDocument {
  id: 'terms' | 'privacy' | 'returns';
  title: string;
  badge: string;
  lastUpdated: string;
  summary: string;
  quickSummaryTable?: {
    headers: [string, string];
    rows: LegalPolicySummaryTableRow[];
  };
  sections: LegalPolicySection[];
}

export const LEGAL_POLICIES: Record<'terms' | 'privacy' | 'returns', LegalPolicyDocument> = {
  terms: {
    id: 'terms',
    title: 'Terms & Conditions of Service',
    badge: 'Commercial Master Agreement',
    lastUpdated: 'September 2026',
    summary: 'These Terms and Conditions govern all commercial printing, brand fabrication, signage installation, and merchandise manufacturing engagements with Silver & Gold Inkshine Ltd (RC 1892044). By placing an order, submitting artwork, or approving a pre-press digital proof, you accept and agree to be legally bound by these terms.',
    sections: [
      {
        id: 'acceptance',
        title: '1. Acceptance & Contract Formation',
        content: [
          'Silver & Gold Inkshine Ltd ("the Company", "we", "us", or "our") is a duly registered corporate commercial printing and brand manufacturing corporation under the Companies and Allied Matters Act of the Federal Republic of Nigeria (RC 1892044), operating its head press plant at No. 875 Medford Okilo Road (Mbiama-Yenagoa Road), Opolo-Epie, Yenagoa, Bayelsa State.',
          'These Terms & Conditions constitute a legally binding agreement between Silver & Gold Inkshine Ltd and the client (whether an individual, SME, multinational enterprise, corporate entity, governmental agency, or religious organization).',
          'A binding commercial contract is formed when you (a) submit an order via our online portal, WhatsApp business channel, or physical press desk; (b) approve a digital or hardcopy pre-press proof; or (c) make a deposit or full payment for requested production services.'
        ]
      },
      {
        id: 'quotations-pricing',
        title: '2. Quotations, Custom Specifications & Pricing Protocol',
        content: [
          'All storefront rates, sandbox calculators, and written quotations reflect commercial raw material costs, currency fluctuations, import duties on specialty media (such as Solite film, SAV vinyl, teardrop banner cassettes, acrylic sheets, and UV inks), and factory machine capacity.',
          'Official quotations are valid for fourteen (14) calendar days from the date of issuance unless explicitly stated otherwise in writing. The Company reserves the right to adjust quotations if job parameters (such as dimensional sizing, paper grammage, finishing lamination, or quantity) are altered after the initial quote.',
          'For bespoke or enterprise architectural jobs (including metal 3D illuminated letters, highway pylons, custom event structures, and container wraps), on-site structural assessments may be required before final billing.'
        ]
      },
      {
        id: 'artwork-prepress',
        title: '3. Artwork Submission, Bleed Margin & Pre-Press Audit',
        content: [
          'Clients are required to provide production-ready artwork in standard commercial formats: High-Resolution Print PDF, Adobe Illustrator (.AI), CorelDRAW (.CDR with converted curves), Adobe Photoshop (.PSD), or TIFF (minimum 300 DPI at 100% physical scale for offset prints; minimum 150 DPI for large format billboards).',
          'Color Standards: All digital designs must be converted to the CMYK (Cyan, Magenta, Yellow, Key Black) color space. The Company is not responsible for hue or saturation shifts resulting from files submitted in RGB or Pantone spot colors without explicit color-matching briefs.',
          'Bleed and Safe Area: Offset print documents (flyers, business cards, brochures, magazines) must include a minimum of 3mm bleed on all four edges, with critical text and logos kept at least 5mm inside the final trim line to prevent trimming clipping.',
          'Free Pre-Press Audit: Every file uploaded to our system undergoes a pre-flight evaluation for resolution, font embedding, bleed integrity, and color mode before plate burning or digital RIP processing.'
        ]
      },
      {
        id: 'proof-approval',
        title: '4. Digital Proofing & Client Production Approval',
        content: [
          'Before commencing full-run offset printing or industrial fabrication, Silver & Gold Inkshine Ltd provides a digital pre-press proof (via PDF or high-resolution preview) or an optional physical sample for high-volume jobs.',
          'The client is solely responsible for proofreading and thoroughly verifying all aspects of the proof, including spelling, telephone numbers, addresses, dates, layout alignment, barcodes, QR codes, and graphical content.',
          'Production commences strictly upon receipt of formal client approval (via electronic confirmation, email, WhatsApp sign-off, or physical proof signature). Once approval is granted, the Company accepts no liability for errors that were present in the approved proof.'
        ]
      },
      {
        id: 'turnaround-delivery',
        title: '5. Production Timelines, Express Turnaround & Dispatch',
        content: [
          'Standard production timelines range between 24 to 48 hours for digital and roll-up banner jobs, and 3 to 5 working days for high-volume offset runs (magazines, product boxes, hardcover books, custom packaging). Express 24-hour priority manufacturing is available upon request.',
          'Production lead times commence only after both artwork approval and agreed deposit/payment clearance have occurred.',
          'Delivery Logistics: We facilitate prompt nationwide dispatch across Bayelsa State, Port Harcourt, Delta State, Lagos, Abuja, and all 36 Nigerian States via verified logistics carriers (including GIG Logistics, DHL, Peace Mass Transit, and local doorstep motorcycle/van couriers).',
          'Risk of Loss: Title and risk of loss transfer to the client upon handoff to the designated third-party carrier or direct collection from our press premises. We securely package all jobs with heavy-duty waterproof shrink-wrap and reinforced corrugated boxing.'
        ]
      },
      {
        id: 'payment-invoicing',
        title: '6. Payment Terms, Proforma Invoicing & Financial Policy',
        content: [
          'Standard commercial orders require a minimum upfront commitment of 70% to 100% prior to plate making, media extrusion, or printing initiation, with any outstanding balance payable before final dispatch or collection.',
          'Corporate Accounts: Verified corporate institutions, educational bodies, and government ministries with signed Service Level Agreements (SLAs) may qualify for 30-day net payment terms subject to credit approval.',
          'Official Documentation: Every transaction is backed by verifiable fiscal documentation, including Proforma Invoices, Official Receipts, and Tax Invoices indicating applicable Value Added Tax (VAT) and Company Registration Number RC 1892044.'
        ]
      },
      {
        id: 'intellectual-property',
        title: '7. Intellectual Property Rights & Artwork Indemnification',
        content: [
          'The client warrants and certifies that they own or possess all necessary intellectual property licenses, trademark authorizations, and copyright permissions for all images, logos, copy, and trademarks submitted for production.',
          'The client agrees to fully indemnify, defend, and hold harmless Silver & Gold Inkshine Ltd, its directors, and staff against any legal claims, copyright infringement lawsuits, statutory fines, or damages arising from materials produced at the client\'s instruction.',
          'The Company retains copyright over original creative concept drafts, 3D structural blueprints, and branding guidelines generated in-house until full design fees are settled.'
        ]
      },
      {
        id: 'cancellation-liability',
        title: '8. Cancellation, Machine Tolerances & Limitation of Liability',
        content: [
          'Orders canceled after pre-press proof generation but prior to plate burning or material cutting will incur a standard administrative and pre-flight charge. Orders canceled after printing or substrate cutting has commenced cannot be refunded.',
          'Industry Production Tolerances: Commercial printing inherently involves minor mechanical variations. An industry-standard margin of +/- 1.5mm on trimming and up to 5% variance on color density across distinct production runs is recognized and accepted.',
          'Limitation of Liability: The Company\'s maximum cumulative financial liability for any claim arising from an order is strictly limited to the monetary value paid by the client for the specific defective item.',
          'Force Majeure: Neither party shall be liable for delivery failures or production stoppages resulting from acts of God, extreme flooding, national electrical grid collapse, civil unrest, or statutory import embargoes.'
        ]
      },
      {
        id: 'governing-law',
        title: '9. Dispute Resolution & Nigerian Governing Law',
        content: [
          'These Terms and Conditions are governed by and construed in accordance with the substantive laws of the Federal Republic of Nigeria.',
          'In the event of any disagreement, the parties agree to first seek an amicable resolution through direct executive consultation. Where unresolved within twenty-one (21) days, disputes shall be submitted to the exclusive jurisdiction of the competent courts in Bayelsa State, Nigeria.'
        ]
      }
    ]
  },
  privacy: {
    id: 'privacy',
    title: 'Privacy Policy',
    badge: 'NDPR Compliant • Silver & Gold Inkshine Ltd',
    lastUpdated: '30 September 2026',
    summary: 'Silver & Gold Inkshine Ltd (“we”, “us”, “our”) is committed to protecting your privacy and the security of your personal information. This Privacy Policy explains what information we collect, how we use it, and your rights regarding your data when you visit our website at silver-and-gold-inkshine-ltd.vercel.app and use our printing and related services.',
    sections: [
      {
        id: 'introduction',
        title: '1. Introduction',
        content: [
          'Silver & Gold Inkshine Ltd (“we”, “us”, “our”) is committed to protecting your privacy and the security of your personal information. This Privacy Policy explains what information we collect, how we use it, and your rights regarding your data when you visit our website at silver-and-gold-inkshine-ltd.vercel.app and use our printing and related services.',
          'By using our website or services, you agree to the practices described in this Policy. If you do not agree, please do not use our site or services.'
        ]
      },
      {
        id: 'information-we-collect',
        title: '2. Information We Collect',
        content: [
          'We collect only the information necessary to provide and improve our services:'
        ],
        subsections: [
          {
            subtitle: '2.1 Information You Provide Directly',
            paragraphs: [
              '• Contact details: Full name, business/organization name, WhatsApp number, email address, physical address',
              '• Project details: Product type, quantity, size, specifications, deadlines, and special instructions',
              '• Files & artwork: Designs, images, logos, and documents you send us for printing',
              '• Payment information: Bank transfer details, transaction references — we do not store full card numbers or sensitive financial credentials',
              '• Communications: Messages sent via WhatsApp, contact forms, email, or in-person inquiries'
            ]
          },
          {
            subtitle: '2.2 Information Collected Automatically',
            paragraphs: [
              '• Technical data: IP address, browser type, device type, pages visited, time spent on site',
              '• Usage patterns: How you navigate our site, links clicked, and service categories viewed',
              '• Cookies: We use basic cookies to improve your experience — see Section 6 below'
            ]
          },
          {
            subtitle: '2.3 Information You Choose Not to Provide',
            paragraphs: [
              'You may browse our site without sharing personal details. However, certain information is required to process orders, send quotes, or deliver products — if withheld, we may be unable to provide the requested service.'
            ]
          }
        ]
      },
      {
        id: 'how-we-use-information',
        title: '3. How We Use Your Information',
        content: [
          'We use your information only for these purposes:',
          '✅ To process, produce, and deliver your printing orders',
          '✅ To respond to your inquiries, quotes, and support requests',
          '✅ To send order updates, proofs, and delivery notifications via WhatsApp or email',
          '✅ To verify your identity and prevent fraud or unauthorized transactions',
          '✅ To improve our website, services, and customer experience',
          '✅ To send important service announcements and policy updates',
          '✅ To comply with legal and regulatory obligations',
          'We will never sell, rent, or lease your personal information to third parties for marketing purposes.'
        ]
      },
      {
        id: 'how-we-share-information',
        title: '4. How We Share Your Information',
        content: [
          'Your privacy is important to us. We share your data only when necessary:',
          '• Service Providers: Trusted third parties who assist us — delivery/courier partners, payment processors, hosting platforms — bound by strict confidentiality agreements',
          '• Legal Requirements: When required by law, court order, or government authority',
          '• Business Transfer: In the event of a merger, sale, or transfer of our business — you will be notified and given clear choices',
          '• With Your Consent: When you explicitly agree — for example, to feature your completed project in our portfolio',
          'We do not share your files, designs, or creative work without your explicit permission.'
        ]
      },
      {
        id: 'data-security-storage',
        title: '5. Data Security & Storage',
        content: [
          '• All personal information is stored securely with restricted access — only authorized staff who need it to serve you may access it',
          '• Files are retained only as long as needed: active orders = kept until delivery + 90 days; completed orders = archived securely then deleted unless you request otherwise',
          '• We use encrypted connections (HTTPS) throughout our website',
          '• Payment transactions are processed through secure, compliant channels',
          '• No method of transmission over the internet is 100% secure — but we continuously apply industry-standard safeguards to protect your data'
        ]
      },
      {
        id: 'cookies-tracking',
        title: '6. Cookies & Tracking',
        content: [
          '• We use basic cookies to remember your preferences and improve site functionality',
          '• You may disable cookies in your browser settings — some features may be limited',
          '• We do not currently use third-party advertising or marketing tracking cookies'
        ]
      },
      {
        id: 'your-rights',
        title: '7. Your Rights',
        content: [
          'Under the Nigerian Data Protection Regulations (NDPR) and applicable laws, you have the right to:',
          '• Access — Request a copy of all personal information we hold about you',
          '• Correction — Ask us to update or correct inaccurate information',
          '• Deletion — Request removal of your data — we will comply unless legal obligations require us to retain certain records',
          '• Withdraw Consent — Opt out of communications at any time — simply reply “STOP” or message us via WhatsApp',
          '• Data Portability — Request your data in a usable, transferable format',
          'To exercise any of these rights, contact us at:',
          '📞 +234 703 037 2539',
          '💬 Chat on WhatsApp — fastest response'
        ]
      },
      {
        id: 'childrens-privacy',
        title: '8. Children’s Privacy',
        content: [
          'Our website and services are intended for business and adult customers. We do not knowingly collect personal information from children under 18. If we become aware that a child has provided personal data, we will delete it immediately.'
        ]
      },
      {
        id: 'third-party-links',
        title: '9. Third-Party Links',
        content: [
          'Our website may contain links to external sites such as Google Maps, payment portals, or social media. We are not responsible for the privacy practices or content of those sites — we encourage you to review their privacy policies separately.'
        ]
      },
      {
        id: 'updates-to-policy',
        title: '10. Updates to This Policy',
        content: [
          'We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. The “Effective Date” at the top will change, and material updates will be posted prominently on this page. Continued use of our services after changes constitutes acceptance of the revised Policy.'
        ]
      },
      {
        id: 'contact-us',
        title: '11. Contact Us',
        content: [
          'For questions, concerns, or requests regarding your privacy or this policy:',
          'Silver & Gold Inkshine Ltd',
          'No. 875 Medford Okilo Road',
          'Opolo-Epie, Yenagoa',
          'Bayelsa State, Nigeria',
          '📞 +234 703 037 2539 / 0905 594 7639',
          '💬 WhatsApp: +234 703 037 2539',
          '📧 inkshineltd@gmail.com'
        ]
      }
    ]
  },
  returns: {
    id: 'returns',
    title: 'Refund Policy',
    badge: 'Fair & Industry-Standard • Silver & Gold Inkshine Ltd',
    lastUpdated: '30 September 2026',
    summary: 'This Refund Policy explains our rules for refunds, cancellations, and reprints. By placing an order with Silver & Gold Inkshine Ltd, you agree to the terms below. Printing is custom-made for you — so our policy differs from standard retail. We balance your rights with our business fairness.',
    quickSummaryTable: {
      headers: ['Situation', 'What Happens'],
      rows: [
        { col1: 'Cancel before proof', col2: '✅ Full refund' },
        { col1: 'Cancel after approval', col2: '⚠️ Store credit only' },
        { col1: 'Our printing error', col2: '✅ Free reprint or refund' },
        { col1: 'Your file/design error', col2: '⚠️ Discounted reprint' },
        { col1: 'Claim window', col2: '⏱️ 48 hours after delivery' },
        { col1: 'Refund processing', col2: '5–7 business days' }
      ]
    },
    sections: [
      {
        id: 'introduction',
        title: '1. Introduction',
        content: [
          'This Refund Policy explains our rules for refunds, cancellations, and reprints. By placing an order with Silver & Gold Inkshine Ltd, you agree to the terms below.',
          'Printing is custom-made for you — so our policy differs from standard retail. We balance your rights with our business fairness.'
        ]
      },
      {
        id: 'order-cancellation',
        title: '2. Order Cancellation — Before Printing',
        content: [],
        subsections: [
          {
            subtitle: '✅ Full Refund',
            paragraphs: [
              'You get 100% refund if:',
              '• You cancel before we send your digital proof for approval',
              '• We haven’t started any production work',
              '• Payment made via bank transfer, mobile money, or WhatsApp payment'
            ]
          },
          {
            subtitle: '⚠️ Partial / No Refund',
            paragraphs: [
              '• After proof approval: No cash refund — your order is already in production',
              '• If you cancel after we’ve started setup/printing: We may offer store credit for 70–80% of your payment, at our discretion',
              '• Rush/same-day orders: Cannot be cancelled once confirmed'
            ]
          }
        ]
      },
      {
        id: 'production-errors',
        title: '3. Our Responsibility — Production Errors',
        content: [
          'If the finished product does not match the approved proof or has production defects:'
        ],
        subsections: [
          {
            subtitle: '✅ What We Offer — Your Choice',
            paragraphs: [
              '• Free reprint with corrected specifications — fastest resolution',
              '• Partial refund (50–80%) if only part of the order is affected',
              '• Full refund — only if reprint is impossible or we fail to meet agreed timeline by more than 5 business days'
            ]
          },
          {
            subtitle: 'Examples Covered — No Extra Cost',
            paragraphs: [
              '• Colors differ noticeably from approved digital proof',
              '• Blurry text, streaks, smudges, or ink errors',
              '• Wrong size, quantity, or material supplied',
              '• Damage caused by poor packaging (reported within 48 hours)',
              '• Misspelling or layout error we introduced after you approved'
            ]
          },
          {
            subtitle: 'How to Claim',
            paragraphs: [
              '• Notify us within 48 hours of delivery/pickup',
              '• Send clear photos + description via WhatsApp',
              '• Keep the defective items — we may need to inspect them'
            ]
          }
        ]
      },
      {
        id: 'customer-files',
        title: '4. Your Responsibility — Customer-Provided Files',
        content: [
          'We print exactly the file you approve. These cases are not eligible for cash refund:',
          '• Low-resolution images, blurriness, or pixelation in your file',
          '• Colors shifting slightly from what you see on your screen (every monitor displays differently — we print to industry-standard CMYK)',
          '• Missing bleed, incorrect margins, or layout issues in your design',
          '• Typos, misspellings, or wrong details in your approved artwork',
          '• Order quantity/size mistake you confirmed',
          '• Change of mind after approval'
        ],
        subsections: [
          {
            subtitle: '✅ What We Can Do',
            paragraphs: [
              '• We offer discounted reprint at cost price — fast turnaround',
              '• We can help fix your file for a small design fee',
              '• No refunds once printed — but we will help you get it right next time'
            ]
          }
        ]
      },
      {
        id: 'delivery-timelines',
        title: '5. Delivery & Timelines',
        content: [
          '• Bayelsa Same-Day/Next-Day: If we miss confirmed slot → priority reprint or partial refund',
          '• Nationwide Delivery: 3–5 business days — delays by courier are not our fault, but we will assist you to follow up',
          '• Unclaimed orders: If you fail to receive/pick up and don’t notify us → no refund; re-delivery at your cost'
        ]
      },
      {
        id: 'payment-refund-process',
        title: '6. Payment Refund Process',
        content: [
          '• Refunds processed within 5–7 business days of agreement',
          '• Method: Same way you paid — bank transfer, mobile money, or wallet reversal',
          '• Bank transfer delays beyond our control are not our responsibility',
          '• No cash refunds to third parties — only to the original payer'
        ]
      },
      {
        id: 'special-custom-items',
        title: '7. Special & Custom Items',
        content: [
          '• Custom design services: Non-refundable once design is delivered',
          '• Bulk/wholesale orders: 50% deposit is non-refundable after approval',
          '• Personalized items: No return or exchange possible — each is unique',
          '• Digital proofs/designs: Final files are yours — no refund once sent'
        ]
      },
      {
        id: 'contact-us',
        title: '8. How to Contact Us',
        content: [
          'All refund/claim requests via WhatsApp for fastest service:',
          '📞 +234 703 037 2539 / 0905 594 7639',
          '📧 inkshineltd@gmail.com',
          '📍 Silver & Gold Inkshine Ltd',
          'Opolo-Epie, Yenagoa, Bayelsa State'
        ]
      }
    ]
  }
};
