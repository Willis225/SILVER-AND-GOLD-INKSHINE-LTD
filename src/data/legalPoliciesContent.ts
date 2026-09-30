export interface LegalPolicySection {
  id: string;
  title: string;
  content: string[];
  subsections?: {
    subtitle: string;
    paragraphs: string[];
  }[];
}

export interface LegalPolicyDocument {
  id: 'terms' | 'privacy' | 'returns';
  title: string;
  badge: string;
  lastUpdated: string;
  summary: string;
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
    title: 'Corporate Privacy Policy',
    badge: 'NDPR & NDPA 2023 Compliant',
    lastUpdated: 'September 2026',
    summary: 'Silver & Gold Inkshine Ltd is committed to safeguarding the privacy, confidentiality, and proprietary design assets of our individual and corporate clients. This policy details how we collect, process, protect, and manage your personal and corporate information in strict compliance with the Nigeria Data Protection Act (NDPA 2023) and the Nigeria Data Protection Regulation (NDPR).',
    sections: [
      {
        id: 'data-collection',
        title: '1. Information We Collect',
        content: [
          'We collect information necessary to fulfill commercial print manufacturing, pre-press auditing, customer billing, and nationwide dispatch operations:',
          '• Contact Information: Full name, company / institutional designation, official email address, telephone numbers, and WhatsApp contact details.',
          '• Delivery & Logistics Data: Physical delivery address, landmark directions, recipient contact person, and preferred regional transport terminal.',
          '• Design & Production Assets: Vector graphics, logos, brand typography, marketing copy, high-resolution photographs, and specialized printing briefs submitted for production.',
          '• Transactional & Invoicing Records: Bank transfer reference details, transaction slips, purchase orders, withholding tax certificates, and order history.'
        ]
      },
      {
        id: 'data-usage',
        title: '2. Lawful Basis & Purpose of Data Processing',
        content: [
          'We process your personal and corporate information under the lawful bases of contractual necessity, statutory compliance, and legitimate commercial interests:',
          '• Contract Execution: Conducting pre-flight file verification, RIP machine processing, printing, binding, laser cutting, and fabrication.',
          '• Order Communication: Providing real-time production updates, digital proof approvals, dispatch tracking codes, and delivery confirmation via SMS, phone, or WhatsApp.',
          '• Fiscal Accounting: Generating proforma invoices, tax receipts, delivery notes, and complying with statutory Federal Inland Revenue Service (FIRS) audit mandates.',
          '• Service Quality Improvement: Monitoring customer satisfaction, website performance, and print longevity feedback.'
        ]
      },
      {
        id: 'asset-confidentiality',
        title: '3. Artwork Confidentiality & Proprietary Security',
        content: [
          'We treat all client design files, corporate manuscripts, election campaign collaterals, confidential corporate annual reports, security certificates, and proprietary product packaging as strictly confidential.',
          'Our pre-press servers, RIP workstations, and digital archives are protected by enterprise firewall encryption, role-based operator permissions, and restricted physical access.',
          'We never sell, rent, license, or publicly leak customer design files, corporate databases, or mailing lists to any third party under any circumstance.'
        ]
      },
      {
        id: 'third-party-sharing',
        title: '4. Third-Party Disclosures & Courier Partners',
        content: [
          'We disclose only the minimal necessary data to vetted third parties under strict confidentiality agreements:',
          '• Logistics & Courier Services: Sharing shipping addresses and recipient phone numbers with reputable transit partners (such as GIG Logistics, DHL, Peace Mass Transit, and certified local riders) solely to execute doorstep or terminal delivery.',
          '• Statutory Authorities: Disclosing transaction documentation when strictly required by Nigerian law, court subpoenas, or law enforcement investigations.'
        ]
      },
      {
        id: 'retention-archival',
        title: '5. Artwork Retention, Archival & Deletion Protocol',
        content: [
          'To facilitate effortless repeat orders and brand consistency, we maintain a secure encrypted archive of approved production files for twenty-four (24) months.',
          'Clients may at any time request the immediate permanent deletion of their archived design files, company assets, or personal records from our digital storage systems by writing to privacy@silverandgold.ng.',
          'Financial and tax transaction logs are retained for the statutory period mandated by Nigerian accounting regulations.'
        ]
      },
      {
        id: 'user-rights',
        title: '6. Your Rights Under the NDPA 2023',
        content: [
          'Under the Nigeria Data Protection Act 2023, you possess comprehensive rights regarding your personal information, including:',
          '• The right to access and obtain a copy of your personal data held in our systems.',
          '• The right to rectify inaccurate, outdated, or incomplete personal or corporate records.',
          '• The right to withdraw consent for marketing communications or promotional showcase features.',
          '• The right to lodge a complaint with the Nigeria Data Protection Commission (NDPC) if you believe your data has been handled improperly.'
        ]
      },
      {
        id: 'dpo-contact',
        title: '7. Data Protection Officer (DPO) Contact',
        content: [
          'For inquiries, data access requests, or privacy concerns, please contact our Data Protection Officer at:',
          'Silver & Gold Inkshine Ltd — Legal & Data Compliance Desk',
          'No. 875 Medford Okilo Road (Mbiama-Yenagoa Road), Opolo-Epie, Yenagoa, Bayelsa State, Nigeria.',
          'Email: privacy@silverandgold.ng | Telephone / WhatsApp: +234 703 037 2539'
        ]
      }
    ]
  },
  returns: {
    id: 'returns',
    title: 'Return, Reprint & Refund Policy',
    badge: '100% Quality Guarantee',
    lastUpdated: 'September 2026',
    summary: 'At Silver & Gold Inkshine Ltd, we hold our craftsmanship to the highest industrial printing standards. Every job includes an automated pre-press audit and multi-stage quality control. This policy outlines our clear, fair, and fast procedures for reprints, returns, and refunds in the rare event of a manufacturing discrepancy.',
    sections: [
      {
        id: 'guarantee-commitment',
        title: '1. Our 100% Quality Assurance Guarantee',
        content: [
          'We stand behind every print job produced at our press plant. If an order suffers from a verified manufacturing fault or fails to match the specifications confirmed in the approved digital proof, we commit to rectifying the issue promptly at zero additional cost to the client.',
          'Our primary remedy for any verified production defect is an immediate priority reprint expedited through our production queue.'
        ]
      },
      {
        id: 'claim-window',
        title: '2. Claim Notification Window & Reporting Procedure',
        content: [
          'Due to the custom and perishable nature of personalized print materials, all claims regarding missing items, print defects, or transport damage must be reported within seventy-two (72) hours of physical delivery or collection.',
          'How to File a Claim:',
          '1. Send a detailed message via WhatsApp (+234 703 037 2539) or email (orders@silverandgold.ng) with your Order ID / Proforma number.',
          '2. Provide clear, well-lit photographs and/or a short video showing the affected items, highlighting the specific defect across multiple samples in the batch.',
          '3. Our Quality Assurance Manager will inspect the evidence against your signed digital proof and issue a resolution within twenty-four (24) business hours.'
        ]
      },
      {
        id: 'covered-defects',
        title: '3. Issues Covered by Free Expedited Reprint Guarantee',
        content: [
          'The Company provides a 100% free expedited reprint for the following verified manufacturing and assembly defects:',
          '• Severe color banding, mechanical ink smearing, or missing print passes caused by printer head failure.',
          '• Plate misalignment or double-imaging on offset press runs.',
          '• Incorrect paper stock, substrate, or grammage noticeably divergent from the approved quotation.',
          '• Trimming errors exceeding acceptable industry tolerance (+/- 1.5mm) that slice into safe-zone graphics or text.',
          '• Defective structural hardware (e.g., jammed rollup banner springs, broken banner base feet, peeling laminations, cracked acrylic awards prior to customer transit).',
          '• Total job misprints where the finished work does not match the approved digital proof file.'
        ]
      },
      {
        id: 'non-covered-scenarios',
        title: '4. Exclusions & Situations Not Eligible for Return/Reprint',
        content: [
          'Because commercial print materials are customized to client-specific branding and cannot be resold, returns, reprints, or refunds cannot be granted under the following circumstances:',
          '• Customer-Approved Typographical Errors: Spelling mistakes, incorrect phone numbers, wrong dates, or grammatical errors that were visible in the client-approved proof.',
          '• Low-Resolution or Blurry Source Artwork: Pixelation or degradation resulting from client-supplied low-DPI raster images (e.g. 72 DPI web screenshots or low-quality camera photos).',
          '• Standard RGB to CMYK Shifts: Minor color differences that naturally occur when digital RGB screen colors (which emit light) are converted to physical CMYK process inks (which reflect light).',
          '• Client Change of Mind: Modifications requested after production has commenced, including date changes, venue alterations, or cancelled events.',
          '• Unauthorized Third-Party Mishandling: Physical damage caused by customer mishandling, outdoor exposure to storms beyond specified weather ratings, or improper storage after delivery.'
        ]
      },
      {
        id: 'resolution-refunds',
        title: '5. Resolution Hierarchy: Reprint, Store Credit & Refunds',
        content: [
          'When a defect claim is verified and validated by our Quality Control Desk, the following resolution protocol applies:',
          '1. Tier 1 (Default): Priority Factory Reprint — The affected quantity is placed on our express press queue and reprinted immediately with free delivery.',
          '2. Tier 2: Store Credit — If a reprint timeline cannot meet an impending event deadline, a 100% store credit voucher is credited to the client\'s account for future print orders.',
          '3. Tier 3: Commercial Refund — If the Company is unable to reprint the job or fulfill the contracted specifications, a direct monetary refund for the affected items will be processed via electronic bank transfer within three to five (3–5) business days.'
        ]
      },
      {
        id: 'return-logistics',
        title: '6. Defective Item Return Logistics',
        content: [
          'To prevent fraudulent claims and support factory quality audits, the Company may require the client to surrender or return the defective batch to our Yenagoa press plant or designated logistics hub.',
          'Where the return is mandated by our QA team for inspection, Silver & Gold Inkshine Ltd will cover the return courier shipping costs.'
        ]
      }
    ]
  }
};
