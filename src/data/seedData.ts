import { Product, ShippingZone } from '../types/schema';

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'prod-360-photo-booth',
    sku: 'EVT-360-BOOTH-01',
    name: '360 Photo Booth Hire in Lagos, Nigeria',
    slug: '360-photo-booth-hire-in-lagos-nigeria',
    category: 'events_exhibitions',
    categoryLabel: 'Events & Exhibitions',
    categoryPlacement: 'events',
    shortDescription: 'Book a 360 Photo Booth for weddings, birthdays, corporate events, parties and brand activations in Lagos.',
    description: 'Book a 360 Photo Booth for weddings, birthdays, corporate events, parties and brand activations in Lagos. Create entertaining 360° slow-motion videos with personalized event names, logos, hashtags and custom video overlays. Includes full technical event setup, attendant crew, LED ring lighting, and instant guest download kiosk.',
    basePriceNgn: 1000,
    minQuantity: 1,
    turnaroundDays: 1,
    badge: 'Trending',
    image: '/photo-booth-360-hire.jpg',
    images: ['/photo-booth-360-hire.jpg'],
    optionGroups: [
      {
        id: 'opt-duration',
        name: 'Event Rental Duration',
        type: 'turnaround',
        required: true,
        options: [
          { id: 'd-3hrs', name: '3 Hours Standard Activation', code: '3HRS', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'd-5hrs', name: '5 Hours Half-Day Coverage', code: '5HRS', priceModifierType: 'fixed', priceModifierValue: 50000 },
          { id: 'd-fullday', name: 'Full Day Corporate Summit Coverage', code: 'FULLDAY', priceModifierType: 'fixed', priceModifierValue: 120000 },
        ],
      },
    ],
    bulkPricingTiers: [
      { minQuantity: 1, maxQuantity: 2, discountPercentage: 0, label: 'Standard Rate' },
      { minQuantity: 3, maxQuantity: null, discountPercentage: 10, label: 'Multi-Day (10% off)' },
    ],
    artworkRequirements: {
      recommendedDpi: 300,
      supportedFormats: ['PNG', 'PDF', 'AI'],
      bleedMarginMm: 0,
      maxFileSizeMb: 50,
    },
  },
  {
    id: 'prod-3d-signs-lagos',
    sku: 'SGN-3D-EXT-01',
    name: '3D Signs in Lagos Nigeria | Custom 3D Signage for Businesses',
    slug: '3d-signs-in-lagos-nigeria-custom-signage',
    category: 'signages',
    categoryLabel: 'Signages',
    categoryPlacement: 'signage',
    shortDescription: 'Bold, professional 3D acrylic signs, 3D channel letters and illuminated exterior signage that gives your brand a strong physical presence.',
    description: 'Whether you need 3D logo signs, 3D acrylic signs, 3D wall signs, 3D shop signs, 3D letter signs or illuminated 3D signage, we help you create a bold, professional and attractive sign that gives your brand a strong physical presence. To order, simply send design to WhatsApp (+234 703 037 2539) / email: hello@silverandgoldinkshine.com or request design help from our team. We will print and ship to your doorstep anywhere within Nigeria.',
    basePriceNgn: 70000,
    minQuantity: 1,
    turnaroundDays: 4,
    badge: 'Popular',
    image: '/3d-signs-lagos.jpg',
    images: ['/3d-signs-lagos.jpg'],
    optionGroups: [
      {
        id: 'opt-sign-material',
        name: 'Signage Material & Finish',
        type: 'material',
        required: true,
        options: [
          { id: 'sm-acrylic', name: 'Cast Acrylic 3D Box Lettering', code: 'ACRYLIC', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'sm-alucobond', name: 'Alucobond Backing Tray + 3D Acrylic', code: 'ALUCOBOND', priceModifierType: 'fixed', priceModifierValue: 25000 },
          { id: 'sm-stainless', name: 'Brushed Gold Stainless Steel 3D', code: 'GOLD_STEEL', priceModifierType: 'fixed', priceModifierValue: 45000 },
        ],
      },
      {
        id: 'opt-lighting',
        name: 'Illumination',
        type: 'finishing',
        required: true,
        options: [
          { id: 'l-none', name: 'Non-Illuminated (Direct Wall Mounted)', code: 'NON_ILLUM', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'l-led-face', name: 'Face-Lit High-Intensity Samsung LED', code: 'FACE_LIT', priceModifierType: 'fixed', priceModifierValue: 30000 },
          { id: 'l-halo', name: 'Warm Halo Backlit (Executive Glow)', code: 'HALO_LIT', priceModifierType: 'fixed', priceModifierValue: 35000 },
        ],
      },
    ],
    bulkPricingTiers: [
      { minQuantity: 1, maxQuantity: null, discountPercentage: 0, label: 'Bespoke Fabrication' },
    ],
    artworkRequirements: {
      recommendedDpi: 300,
      supportedFormats: ['CDR', 'AI', 'PDF', 'DXF'],
      bleedMarginMm: 10,
      maxFileSizeMb: 100,
    },
  },
  {
    id: 'prod-exercise-books',
    sku: 'BOK-EXC-4060-01',
    name: '40 and 60 Leaves Exercise Books Printing',
    slug: '40-and-60-leaves-exercise-books-printing',
    category: 'books_magazines',
    categoryLabel: 'Books & Magazines',
    categoryPlacement: 'stationery',
    shortDescription: 'Custom branded school exercise books and corporate writing notebooks with full-color laminated covers.',
    description: 'To order for your notebooks and school exercise books printing, send your design to WhatsApp (+234 703 037 2539) / email: hello@silverandgoldinkshine.com or request design help from our team. We will print and ship to your doorstep anywhere within Nigeria. Includes 250gsm full-color gloss laminated card cover, sharp feint ruled inner pages, and heavy-duty staple binding.',
    basePriceNgn: 399,
    minQuantity: 100,
    turnaroundDays: 3,
    badge: 'School Special',
    image: '/exercise-books-40-60.jpg',
    images: ['/exercise-books-40-60.jpg'],
    optionGroups: [
      {
        id: 'opt-leaf-count',
        name: 'Leaf Count',
        type: 'size',
        required: true,
        options: [
          { id: 'l-40', name: '40 Leaves (80 Pages)', code: '40L', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'l-60', name: '60 Leaves (120 Pages)', code: '60L', priceModifierType: 'fixed', priceModifierValue: 80 },
          { id: 'l-80', name: '80 Leaves (160 Pages)', code: '80L', priceModifierType: 'fixed', priceModifierValue: 150 },
        ],
      },
    ],
    bulkPricingTiers: [
      { minQuantity: 100, maxQuantity: 499, discountPercentage: 0, label: '100 - 499 units' },
      { minQuantity: 500, maxQuantity: 1999, discountPercentage: 10, label: '500+ (10% bulk off)' },
      { minQuantity: 2000, maxQuantity: null, discountPercentage: 20, label: '2,000+ (20% school off)' },
    ],
    artworkRequirements: {
      recommendedDpi: 300,
      supportedFormats: ['PDF', 'CDR', 'AI', 'PNG'],
      bleedMarginMm: 3,
      maxFileSizeMb: 50,
    },
  },
  {
    id: 'prod-a1-poster',
    sku: 'ADV-PST-A1-01',
    name: 'A1 Poster',
    slug: 'a1-poster-printing-nigeria',
    category: 'advertising_materials',
    categoryLabel: 'Advertising Materials',
    categoryPlacement: 'banners',
    shortDescription: 'Create your own A1 Poster with sharp, professional print quality. Perfect for events, retail & décor.',
    description: 'Create your own A1 Poster with sharp, professional print quality. Perfect for events, retail & décor. Fast delivery, order today! Printed on 250gsm premium art paper with vivid CMYK inks that resist fading.',
    basePriceNgn: 1500,
    minQuantity: 1,
    turnaroundDays: 1,
    badge: 'Express 24H',
    image: '/a1-poster-printing.jpg',
    images: ['/a1-poster-printing.jpg'],
    optionGroups: [
      {
        id: 'opt-paper-finish',
        name: 'Paper Finish',
        type: 'finishing',
        required: true,
        options: [
          { id: 'pf-gloss', name: 'Vibrant Gloss Lamination', code: 'GLOSS', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'pf-matte', name: 'Executive Satin Matte Lamination', code: 'MATTE', priceModifierType: 'fixed', priceModifierValue: 200 },
        ],
      },
    ],
    bulkPricingTiers: [
      { minQuantity: 1, maxQuantity: 10, discountPercentage: 0, label: '1 - 10 copies' },
      { minQuantity: 11, maxQuantity: 50, discountPercentage: 15, label: '11 - 50 (15% off)' },
      { minQuantity: 51, maxQuantity: null, discountPercentage: 25, label: '50+ (25% off)' },
    ],
    artworkRequirements: {
      recommendedDpi: 300,
      supportedFormats: ['PDF', 'TIFF', 'PNG', 'CDR'],
      bleedMarginMm: 3,
      maxFileSizeMb: 50,
    },
  },
  {
    id: 'prod-foot-mat',
    sku: 'GFT-MAT-01',
    name: 'Foot Mat in Lagos, Nigeria – Custom Branded Door & Entrance Mats',
    slug: 'custom-branded-foot-mat-nigeria',
    category: 'gift_items_souvenirs',
    categoryLabel: 'Gift Items & Souvenirs',
    categoryPlacement: 'gifts',
    shortDescription: 'Heavy-duty rubber-backed entrance foot mat with high-definition custom logo branding for corporate offices and residences.',
    description: 'Heavy-duty rubber-backed entrance foot mat with high-definition custom logo branding for corporate offices and residences. Durable weather-resistant scraper fibers with non-slip backing.',
    basePriceNgn: 10000,
    minQuantity: 1,
    turnaroundDays: 3,
    badge: 'Popular',
    image: '/custom-branded-foot-mat.jpg',
    images: ['/custom-branded-foot-mat.jpg'],
    optionGroups: [],
    bulkPricingTiers: [],
    artworkRequirements: { recommendedDpi: 300, supportedFormats: ['PDF', 'AI'], bleedMarginMm: 5, maxFileSizeMb: 50 },
  },
  {
    id: 'prod-center-rug',
    sku: 'FRM-RUG-01',
    name: 'Custom Branded Center Rug Printing',
    slug: 'custom-branded-center-rug-printing',
    category: 'frames_wallarts',
    categoryLabel: 'Frames & Wall Arts',
    categoryPlacement: 'paintings',
    shortDescription: 'Luxury custom printed center rugs for corporate boardrooms, VIP reception lounges, and upscale interiors.',
    description: 'Luxury custom printed center rugs for corporate boardrooms, VIP reception lounges, and upscale interiors. Rich dye-sublimation print with anti-slip rubberized underlay.',
    basePriceNgn: 100000,
    minQuantity: 1,
    turnaroundDays: 5,
    badge: 'Luxury',
    image: '/custom-branded-center-rug.jpg',
    images: ['/custom-branded-center-rug.jpg'],
    optionGroups: [],
    bulkPricingTiers: [],
    artworkRequirements: { recommendedDpi: 300, supportedFormats: ['PDF', 'AI'], bleedMarginMm: 10, maxFileSizeMb: 80 },
  },
  {
    id: 'prod-keychain',
    sku: 'GFT-KEY-01',
    name: 'Key Holder & Keychain Printing in Lagos, Nigeria – Custom Branded Keyholders',
    slug: 'key-holder-keychain-printing-lagos',
    category: 'gift_items_souvenirs',
    categoryLabel: 'Gift Items & Souvenirs',
    categoryPlacement: 'gifts',
    shortDescription: 'Custom acrylic, leather, and metal keyholders with laser engraving or full-color print for event souvenirs and corporate branding.',
    description: 'Custom acrylic, leather, and metal keyholders with laser engraving or full-color print for event souvenirs and corporate branding. Long-lasting chrome split-ring hardware.',
    basePriceNgn: 1000,
    minQuantity: 50,
    turnaroundDays: 2,
    badge: 'Souvenir',
    image: '/keychain-keyholder-printing.jpg',
    images: ['/keychain-keyholder-printing.jpg'],
    optionGroups: [],
    bulkPricingTiers: [],
    artworkRequirements: { recommendedDpi: 300, supportedFormats: ['PDF', 'CDR'], bleedMarginMm: 2, maxFileSizeMb: 30 },
  },
  {
    id: 'prod-water-bottle',
    sku: 'GFT-BOT-01',
    name: 'Custom Branded Water Bottle Printing in Lagos, Nigeria – Custom & Personalized Bottles',
    slug: 'custom-branded-water-bottle-printing',
    category: 'gift_items_souvenirs',
    categoryLabel: 'Gift Items & Souvenirs',
    categoryPlacement: 'gifts',
    shortDescription: 'Stainless steel insulated vacuum flasks and sports water bottles with laser etching or UV rotary print.',
    description: 'Stainless steel insulated vacuum flasks and sports water bottles with laser etching or UV rotary print. Keeps beverages hot for 12 hours and cold for 24 hours.',
    basePriceNgn: 3500,
    minQuantity: 20,
    turnaroundDays: 3,
    badge: 'Best Value',
    image: '/custom-branded-water-bottle.jpg',
    images: ['/custom-branded-water-bottle.jpg'],
    optionGroups: [],
    bulkPricingTiers: [],
    artworkRequirements: { recommendedDpi: 300, supportedFormats: ['PDF', 'AI'], bleedMarginMm: 2, maxFileSizeMb: 40 },
  },
  {
    id: 'prod-rollup-luxury',
    sku: 'BNR-RL-LUX-01',
    name: 'Luxury Rollup Banner (Broad Base)',
    slug: 'luxury-rollup-banner-broad-base',
    category: 'advertising_materials',
    categoryLabel: 'Advertising Materials',
    shortDescription: 'Heavy-duty tear-drop aluminum cassette with photo-grade high resolution print on Solite or Flex.',
    description: 'Our top-tier Luxury Roll-Up Banner is the gold standard for executive corporate events, trade shows, bank banking halls, and product launches in Nigeria. Built with a weighted teardrop chrome-plated aluminum cassette that requires no fold-out feet, offering an ultra-sleek, stable freestanding profile.',
    basePriceNgn: 34500,
    minQuantity: 1,
    turnaroundDays: 2,
    badge: 'Best Seller',
    image: '/luxury-rollup-banner-stand.jpg',
    images: ['/luxury-rollup-banner-stand.jpg'],
    optionGroups: [
      {
        id: 'opt-size',
        name: 'Display Dimension',
        type: 'size',
        required: true,
        options: [
          { id: 's-std', name: '33" x 81" (85cm x 205cm) Standard', code: 'STD_33x81', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 's-wide', name: '47" x 81" (120cm x 205cm) Wide Executive', code: 'WIDE_47x81', priceModifierType: 'fixed', priceModifierValue: 12000 },
          { id: 's-giant', name: '59" x 81" (150cm x 205cm) Giant Backdrop', code: 'GIANT_59x81', priceModifierType: 'fixed', priceModifierValue: 24000 },
        ],
      },
      {
        id: 'opt-material',
        name: 'Media Substrate & Coating',
        type: 'material',
        required: true,
        options: [
          { id: 'm-solite-matte', name: 'Solite Satin Matte (Anti-Glare, High Res)', code: 'SOLITE_MATTE', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'm-solite-gloss', name: 'Solite Vibrant Gloss (High Contrast)', code: 'SOLITE_GLOSS', priceModifierType: 'fixed', priceModifierValue: 1500 },
          { id: 'm-backlit', name: 'Backlit Translucent Film', code: 'BACKLIT_FILM', priceModifierType: 'fixed', priceModifierValue: 4500 },
        ],
      },
      {
        id: 'opt-base',
        name: 'Cassette Hardware Quality',
        type: 'base_stand',
        required: true,
        options: [
          { id: 'b-lux-silver', name: 'Luxury Teardrop Silver Aluminum + Padded Bag', code: 'LUX_SILVER', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'b-lux-black', name: 'Luxury Midnight Matte Black Aluminum + Padded Bag', code: 'LUX_BLACK', priceModifierType: 'fixed', priceModifierValue: 3500 },
        ],
      },
      {
        id: 'opt-finishing',
        name: 'Protective Over-Laminate',
        type: 'finishing',
        required: false,
        options: [
          { id: 'f-none', name: 'Standard UV Cured (No Extra Lam)', code: 'NONE', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'f-lam-matte', name: 'Scratch-Resistant Matte Lamination', code: 'LAM_MATTE', priceModifierType: 'fixed', priceModifierValue: 2500 },
        ],
      },
    ],
    bulkPricingTiers: [
      { minQuantity: 1, maxQuantity: 2, discountPercentage: 0, label: '1 - 2 units' },
      { minQuantity: 3, maxQuantity: 5, discountPercentage: 8, label: '3 - 5 units (8% off)' },
      { minQuantity: 6, maxQuantity: 15, discountPercentage: 14, label: '6 - 15 units (14% off)' },
      { minQuantity: 16, maxQuantity: null, discountPercentage: 22, label: '16+ units (22% bulk)' },
    ],
    artworkRequirements: {
      recommendedDpi: 300,
      supportedFormats: ['PDF', 'CDR', 'AI', 'TIFF', 'PNG'],
      bleedMarginMm: 50, // 50mm bottom bleed for cassette roller mechanism
      maxFileSizeMb: 75,
    },
  },
  {
    id: 'prod-standard-rollup',
    sku: 'BNR-RL-STD-02',
    name: 'Standard Rollup Banner (Slim Footed)',
    slug: 'standard-rollup-banner-slim-base',
    category: 'advertising_materials',
    categoryLabel: 'Advertising Materials',
    shortDescription: 'Cost-effective aluminum cassette with dual twist-out stabilizing feet, including travel case.',
    description: 'Perfect for retail point-of-sale, church events, campus programs, and quick promotional pop-ups across Nigeria. Easy to set up in 45 seconds.',
    basePriceNgn: 24500,
    minQuantity: 1,
    turnaroundDays: 1,
    badge: 'Popular',
    image: '/standard-rollup-banner-slim-footed.jpg',
    images: ['/standard-rollup-banner-slim-footed.jpg'],
    optionGroups: [
      {
        id: 'opt-size',
        name: 'Display Dimension',
        type: 'size',
        required: true,
        options: [
          { id: 's-std', name: '33" x 81" (85cm x 205cm)', code: 'STD_33x81', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 's-mini', name: 'A3 Desktop Mini Rollup (Tabletop)', code: 'MINI_A3', priceModifierType: 'fixed', priceModifierValue: -15000 },
        ],
      },
      {
        id: 'opt-material',
        name: 'Substrate',
        type: 'material',
        required: true,
        options: [
          { id: 'm-solite', name: 'Solite High Resolution Vinyl', code: 'SOLITE', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'm-flex', name: 'Standard 440gsm Flex Banner', code: 'FLEX_440', priceModifierType: 'fixed', priceModifierValue: -2000 },
        ],
      },
    ],
    bulkPricingTiers: [
      { minQuantity: 1, maxQuantity: 4, discountPercentage: 0, label: '1 - 4 units' },
      { minQuantity: 5, maxQuantity: 10, discountPercentage: 10, label: '5 - 10 units (10% off)' },
      { minQuantity: 11, maxQuantity: 25, discountPercentage: 18, label: '11 - 25 units (18% off)' },
      { minQuantity: 26, maxQuantity: null, discountPercentage: 25, label: '26+ units (25% off)' },
    ],
    artworkRequirements: {
      recommendedDpi: 300,
      supportedFormats: ['PDF', 'CDR', 'AI', 'PNG'],
      bleedMarginMm: 50,
      maxFileSizeMb: 60,
    },
  },
  {
    id: 'prod-business-cards',
    sku: 'STN-BC-MAT-01',
    name: 'Premium Matte Laminated Business Cards (Pack of 100)',
    slug: 'premium-matte-business-cards-100',
    category: 'cards_invitations',
    categoryLabel: 'Cards & Invitations',
    shortDescription: '400gsm artboard with velvety double-sided matte lamination and optional spot UV gloss.',
    description: 'Make an unforgettable first impression in corporate boardrooms and business network meetings across Lagos and Abuja. Ultra-thick card stock precision trimmed with square or rounded edges.',
    basePriceNgn: 18500,
    minQuantity: 1, // 1 pack = 100 cards
    turnaroundDays: 3,
    badge: 'Essential',
    image: '/premium-matte-business-cards.jpg',
    images: ['/premium-matte-business-cards.jpg'],
    optionGroups: [
      {
        id: 'opt-corner',
        name: 'Corner Cut',
        type: 'finishing',
        required: true,
        options: [
          { id: 'c-sharp', name: 'Classic Sharp 90° Corners', code: 'SHARP', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'c-round', name: 'Radius Rounded Corners (4 edges)', code: 'ROUND', priceModifierType: 'fixed', priceModifierValue: 2000 },
        ],
      },
      {
        id: 'opt-special-fx',
        name: 'Luxury Finishing Accents',
        type: 'finishing',
        required: false,
        options: [
          { id: 'fx-matte', name: 'Standard Full Matte Both Sides', code: 'MATTE_STD', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'fx-spot-uv', name: 'Spot Gloss UV on Logo & Accents', code: 'SPOT_UV', priceModifierType: 'fixed', priceModifierValue: 7500 },
          { id: 'fx-gold-foil', name: 'Gold / Silver Metallic Foil Stamping', code: 'FOIL_STAMP', priceModifierType: 'fixed', priceModifierValue: 12000 },
        ],
      },
    ],
    bulkPricingTiers: [
      { minQuantity: 1, maxQuantity: 2, discountPercentage: 0, label: '1 - 2 packs (100-200 pcs)' },
      { minQuantity: 3, maxQuantity: 5, discountPercentage: 12, label: '3 - 5 packs (12% off)' },
      { minQuantity: 6, maxQuantity: 10, discountPercentage: 20, label: '6 - 10 packs (20% off)' },
      { minQuantity: 11, maxQuantity: null, discountPercentage: 30, label: '11+ packs (30% off)' },
    ],
    artworkRequirements: {
      recommendedDpi: 350,
      supportedFormats: ['PDF', 'AI', 'CDR', 'PSD'],
      bleedMarginMm: 3,
      maxFileSizeMb: 50,
    },
  },
  {
    id: 'prod-paper-bags',
    sku: 'PKG-BAG-MED-01',
    name: 'Custom Branded Kraft & Art Paper Gift Bags (50 pcs)',
    slug: 'custom-branded-paper-gift-bags-50',
    category: 'packaging_labels',
    categoryLabel: 'Packaging & Labels',
    shortDescription: 'Reinforced bottom with rope handles, printed full-color with your corporate identity.',
    description: 'High-visibility branding for corporate souvenirs, VIP event hampers, retail boutiques, and annual general meetings. Available in crisp white art paper or organic eco kraft.',
    basePriceNgn: 45000,
    minQuantity: 1, // 1 pack = 50 pcs
    turnaroundDays: 5,
    badge: 'Branding Hit',
    image: '/kraft-art-paper-gift-bags.jpg',
    images: ['/kraft-art-paper-gift-bags.jpg'],
    optionGroups: [
      {
        id: 'opt-bag-size',
        name: 'Bag Dimension',
        type: 'size',
        required: true,
        options: [
          { id: 'b-med', name: 'Medium (A4 size: 10" x 13" x 4")', code: 'MED_A4', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'b-lrg', name: 'Large Souvenir (14" x 16" x 5")', code: 'LRG_A3', priceModifierType: 'fixed', priceModifierValue: 14000 },
        ],
      },
      {
        id: 'opt-paper-type',
        name: 'Paper Type',
        type: 'material',
        required: true,
        options: [
          { id: 'p-art-matte', name: '250gsm Art Paper + Matte Lamination', code: 'ART_MATTE', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'p-kraft', name: '220gsm Organic Brown Kraft Paper', code: 'KRAFT_NATURAL', priceModifierType: 'fixed', priceModifierValue: -3000 },
        ],
      },
    ],
    bulkPricingTiers: [
      { minQuantity: 1, maxQuantity: 2, discountPercentage: 0, label: '50 - 100 pcs' },
      { minQuantity: 3, maxQuantity: 5, discountPercentage: 15, label: '150 - 250 pcs (15% off)' },
      { minQuantity: 6, maxQuantity: null, discountPercentage: 25, label: '300+ pcs (25% off)' },
    ],
    artworkRequirements: {
      recommendedDpi: 300,
      supportedFormats: ['PDF', 'AI', 'CDR'],
      bleedMarginMm: 5,
      maxFileSizeMb: 50,
    },
  },
  {
    id: 'prod-teardrop-flying-banner',
    sku: 'BNR-FLY-TDR-01',
    name: 'Teardrop Flying Feather Banner (Outdoor Flag)',
    slug: 'teardrop-flying-feather-banner-flag',
    category: 'advertising_materials',
    categoryLabel: 'Advertising Materials',
    shortDescription: 'Wind-resistant 3.5m outdoor pole with cross-base and water-weight bag for maximum outdoor visibility.',
    description: 'High-impact outdoor marketing for petrol stations, corporate headquarters, car dealerships, and sports festivals. 100% weather-resistant sublimated flag knit polyester.',
    basePriceNgn: 42000,
    minQuantity: 1,
    turnaroundDays: 2,
    badge: 'Outdoor King',
    image: '/teardrop-flying-feather-banner.jpg',
    images: ['/teardrop-flying-feather-banner.jpg'],
    optionGroups: [
      {
        id: 'opt-flag-height',
        name: 'Pole Height',
        type: 'size',
        required: true,
        options: [
          { id: 'h-3m', name: '3.0 Meters (Standard)', code: '3M', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'h-4m', name: '4.2 Meters (Towering)', code: '4M', priceModifierType: 'fixed', priceModifierValue: 8500 },
        ],
      },
      {
        id: 'opt-flag-base',
        name: 'Anchor Base',
        type: 'base_stand',
        required: true,
        options: [
          { id: 'b-cross', name: 'Cross Base + Heavy Water Weight Ring', code: 'CROSS_WATER', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'b-spike', name: 'Ground Lawn Spike (for soft turf/beach)', code: 'SPIKE', priceModifierType: 'fixed', priceModifierValue: -2000 },
        ],
      },
    ],
    bulkPricingTiers: [
      { minQuantity: 1, maxQuantity: 2, discountPercentage: 0, label: '1 - 2 units' },
      { minQuantity: 3, maxQuantity: 6, discountPercentage: 10, label: '3 - 6 units (10% off)' },
      { minQuantity: 7, maxQuantity: null, discountPercentage: 20, label: '7+ units (20% off)' },
    ],
    artworkRequirements: {
      recommendedDpi: 300,
      supportedFormats: ['PDF', 'AI', 'CDR'],
      bleedMarginMm: 20,
      maxFileSizeMb: 50,
    },
  },
  {
    id: 'prod-corporate-polo',
    sku: 'APP-POL-EMB-01',
    name: 'Executive Embroidered Corporate Polo Shirts (10 pcs)',
    slug: 'executive-embroidered-corporate-polo-shirts',
    category: 'apparels',
    categoryLabel: 'Apparels',
    shortDescription: '220gsm heavy combed pique cotton with high-density precision embroidery on chest and sleeve.',
    description: 'Elevate staff appearance for trade delegations, retail branch personnel, exhibitions, and casual corporate Fridays. Non-fade reactive dyes pre-shrunk for tropical durability.',
    basePriceNgn: 58000,
    minQuantity: 1, // 1 pack = 10 pcs
    turnaroundDays: 4,
    badge: 'Staff Favorite',
    image: '/executive-embroidered-polo-shirts.jpg',
    images: ['/executive-embroidered-polo-shirts.jpg'],
    optionGroups: [
      {
        id: 'opt-apparel-fabric',
        name: 'Fabric Grade',
        type: 'material',
        required: true,
        options: [
          { id: 'f-pique', name: 'Premium Heavy Pique Cotton (220gsm)', code: 'PIQUE_220', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'f-dryfit', name: 'Active Breathable Dri-Fit Poly', code: 'DRI_FIT', priceModifierType: 'fixed', priceModifierValue: -3000 },
        ],
      },
      {
        id: 'opt-branding-method',
        name: 'Branding Method',
        type: 'finishing',
        required: true,
        options: [
          { id: 'b-embroidery', name: 'Direct High-Stitch Embroidery (Left Chest)', code: 'EMB_CHEST', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'b-dtf-full', name: 'DTF Full Color HD Print (Chest + Back)', code: 'DTF_FRONT_BACK', priceModifierType: 'fixed', priceModifierValue: 8000 },
        ],
      },
    ],
    bulkPricingTiers: [
      { minQuantity: 1, maxQuantity: 2, discountPercentage: 0, label: '10 - 20 pcs' },
      { minQuantity: 3, maxQuantity: 5, discountPercentage: 12, label: '30 - 50 pcs (12% off)' },
      { minQuantity: 6, maxQuantity: null, discountPercentage: 22, label: '60+ pcs (22% off)' },
    ],
    artworkRequirements: {
      recommendedDpi: 300,
      supportedFormats: ['AI', 'PDF', 'PNG'],
      bleedMarginMm: 0,
      maxFileSizeMb: 30,
    },
  },
  {
    id: 'prod-acrylic-3d-sign',
    sku: 'SIG-ACR-LED-01',
    name: '3D Cast Acrylic Corporate Reception Signage',
    slug: '3d-acrylic-reception-signage',
    category: 'signage',
    categoryLabel: 'Signage',
    shortDescription: 'Laser-cut 10mm cast acrylic letters with brushed gold/silver face and LED halo backlight.',
    description: 'Transform your office lobby into a commanding corporate headquarters. Precision cut with diamond-polished bevel edges, supplied with stainless steel standoff bolts.',
    basePriceNgn: 95000,
    minQuantity: 1,
    turnaroundDays: 5,
    badge: 'Executive',
    image: '/3d-cast-acrylic-reception-signage.jpg',
    images: ['/3d-cast-acrylic-reception-signage.jpg'],
    optionGroups: [
      {
        id: 'opt-sign-width',
        name: 'Sign Dimensions',
        type: 'size',
        required: true,
        options: [
          { id: 'w-3ft', name: '3ft x 2ft Reception Board', code: '3x2', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'w-5ft', name: '5ft x 3ft Executive Wall Logo', code: '5x3', priceModifierType: 'fixed', priceModifierValue: 45000 },
        ],
      },
      {
        id: 'opt-lighting',
        name: 'Illumination',
        type: 'finishing',
        required: true,
        options: [
          { id: 'l-none', name: 'Non-Illuminated (Solid Acrylic + Standoffs)', code: 'NON_LIT', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'l-warm-halo', name: 'Warm White 3000K LED Halo Backlit', code: 'HALO_WARM', priceModifierType: 'fixed', priceModifierValue: 35000 },
          { id: 'l-cool-halo', name: 'Pure White 6000K LED Halo Backlit', code: 'HALO_COOL', priceModifierType: 'fixed', priceModifierValue: 35000 },
        ],
      },
    ],
    bulkPricingTiers: [
      { minQuantity: 1, maxQuantity: 1, discountPercentage: 0, label: 'Single Sign' },
      { minQuantity: 2, maxQuantity: 4, discountPercentage: 10, label: '2 - 4 branch signs (10% off)' },
      { minQuantity: 5, maxQuantity: null, discountPercentage: 18, label: '5+ nationwide branches (18% off)' },
    ],
    artworkRequirements: {
      recommendedDpi: 300,
      supportedFormats: ['AI', 'CDR', 'DXF', 'PDF'],
      bleedMarginMm: 0,
      maxFileSizeMb: 50,
    },
  },
  {
    id: 'prod-executive-leather-notebook',
    sku: 'GFT-NOTE-LTH-01',
    name: 'Hardcover Executive Leatherette Journal & Pen Set (25 pcs)',
    slug: 'hardcover-executive-leather-journal-pen-set',
    category: 'gifts_souvenirs',
    categoryLabel: 'Gifts & Souvenirs',
    shortDescription: 'Debossed / gold-foiled thermal PU leather notebook with ribbon marker and metal laser-engraved pen.',
    description: 'The preferred corporate year-end gift and AGM conference souvenir in Nigeria. Includes custom-printed inner color tip-in pages featuring company profile and executive foreword.',
    basePriceNgn: 62500,
    minQuantity: 1, // 1 pack = 25 units
    turnaroundDays: 4,
    badge: 'AGM Hit',
    image: '/executive-leatherette-journal-pen-set.jpg',
    images: ['/executive-leatherette-journal-pen-set.jpg'],
    optionGroups: [
      {
        id: 'opt-cover-color',
        name: 'Cover Leatherette Tone',
        type: 'material',
        required: true,
        options: [
          { id: 'c-navy', name: 'Midnight Navy Blue', code: 'NAVY', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'c-black', name: 'Executive Pitch Black', code: 'BLACK', priceModifierType: 'fixed', priceModifierValue: 0 },
          { id: 'c-tan', name: 'Cognac Saddle Tan', code: 'TAN', priceModifierType: 'fixed', priceModifierValue: 2000 },
        ],
      },
      {
        id: 'opt-branding-accent',
        name: 'Cover Customization Accent',
        type: 'finishing',
        required: true,
        options: [
          { id: 'a-blind-deboss', name: 'Deep Blind Heated Deboss (Subtle Elegance)', code: 'DEBOSS', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'a-gold-foil', name: 'Mirror Metallic Gold Foil Stamping', code: 'GOLD_FOIL', priceModifierType: 'fixed', priceModifierValue: 4500 },
        ],
      },
    ],
    bulkPricingTiers: [
      { minQuantity: 1, maxQuantity: 2, discountPercentage: 0, label: '25 - 50 sets' },
      { minQuantity: 3, maxQuantity: 8, discountPercentage: 12, label: '75 - 200 sets (12% off)' },
      { minQuantity: 9, maxQuantity: null, discountPercentage: 20, label: '225+ sets (20% off)' },
    ],
    artworkRequirements: {
      recommendedDpi: 300,
      supportedFormats: ['PDF', 'AI', 'CDR'],
      bleedMarginMm: 3,
      maxFileSizeMb: 40,
    },
  },
  {
    id: 'prod-stickers-labels-vinyl',
    sku: 'STK-LBL-VIN-01',
    name: 'Custom Die-Cut Vinyl Stickers & Product Bottle Labels (Pack of 200)',
    slug: 'custom-die-cut-vinyl-stickers-labels-200',
    category: 'stickers_labels',
    categoryLabel: 'Stickers & Labels',
    shortDescription: 'Waterproof gloss or matte self-adhesive vinyl with digital optical laser contour cut.',
    description: 'Precision contour-cut stickers and product jar/bottle labels engineered for cosmetics, food packaging, beverage bottles, beverage cups, and brand swag.',
    basePriceNgn: 19500,
    minQuantity: 1,
    turnaroundDays: 2,
    badge: 'Waterproof',
    image: '/product-packaging-labels-stickers.jpg',
    images: ['/product-packaging-labels-stickers.jpg'],
    optionGroups: [
      {
        id: 'opt-sticker-substrate',
        name: 'Sticker Material',
        type: 'material',
        required: true,
        options: [
          { id: 'mat-white-gloss', name: 'White Waterproof Gloss Vinyl', code: 'WHITE_GLOSS', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'mat-clear-trans', name: 'Transparent Clear Waterproof Vinyl', code: 'CLEAR_VINYL', priceModifierType: 'fixed', priceModifierValue: 3500 },
          { id: 'mat-metallic-gold', name: 'Reflective Metallic Gold Foil Vinyl', code: 'GOLD_FOIL_VINYL', priceModifierType: 'fixed', priceModifierValue: 6000 },
        ],
      },
      {
        id: 'opt-sticker-size',
        name: 'Label Diameter / Dimension',
        type: 'size',
        required: true,
        options: [
          { id: 'sz-2inch', name: '2" x 2" (50mm x 50mm)', code: '2X2', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'sz-3inch', name: '3" x 3" (75mm x 75mm)', code: '3X3', priceModifierType: 'fixed', priceModifierValue: 4500 },
          { id: 'sz-4inch', name: '4" x 4" (100mm x 100mm)', code: '4X4', priceModifierType: 'fixed', priceModifierValue: 9000 },
        ],
      },
    ],
    bulkPricingTiers: [
      { minQuantity: 1, maxQuantity: 2, discountPercentage: 0, label: '200 - 400 pcs' },
      { minQuantity: 3, maxQuantity: 5, discountPercentage: 12, label: '600 - 1,000 pcs (12% off)' },
      { minQuantity: 6, maxQuantity: null, discountPercentage: 22, label: '1,200+ pcs (22% off)' },
    ],
    artworkRequirements: {
      recommendedDpi: 300,
      supportedFormats: ['PDF', 'AI', 'CDR', 'PNG'],
      bleedMarginMm: 2,
      maxFileSizeMb: 40,
    },
  },
  {
    id: 'prod-flyers-handbills-a5',
    sku: 'FLY-A5-GLS-01',
    name: 'A5 Gloss Double-Sided Marketing Flyers & Handbills (Pack of 500)',
    slug: 'a5-gloss-double-sided-flyers-handbills-500',
    category: 'flyers_handbills',
    categoryLabel: 'Flyer & Handbills',
    shortDescription: '150gsm vibrant gloss art paper printed full-color front and back with high-speed Heidelberg offset.',
    description: 'The highest-ROI promotional tool for church programs, real estate developments, product sales launches, medical outreach, and political sensitization rallies across Bayelsa and Nigeria.',
    basePriceNgn: 32000,
    minQuantity: 1,
    turnaroundDays: 2,
    badge: 'High Impact',
    image: '/brochures-event-programs-flyers.jpg',
    images: ['/brochures-event-programs-flyers.jpg'],
    optionGroups: [
      {
        id: 'opt-flyer-size',
        name: 'Flyer Size Format',
        type: 'size',
        required: true,
        options: [
          { id: 'sz-a5', name: 'A5 (148mm x 210mm) Standard Handbill', code: 'A5_STD', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'sz-a6', name: 'A6 (105mm x 148mm) Pocket Mini Flyer', code: 'A6_MINI', priceModifierType: 'fixed', priceModifierValue: -7000 },
          { id: 'sz-a4', name: 'A4 (210mm x 297mm) Large Leaflet / Menu', code: 'A4_LRG', priceModifierType: 'fixed', priceModifierValue: 18000 },
        ],
      },
      {
        id: 'opt-flyer-paper',
        name: 'Art Paper Weight',
        type: 'material',
        required: true,
        options: [
          { id: 'pp-150gsm', name: '150gsm Premium Gloss Art Paper', code: '150_GLOSS', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'pp-250gsm', name: '250gsm Heavy Art Cardstock (Durable)', code: '250_CARD', priceModifierType: 'fixed', priceModifierValue: 9500 },
        ],
      },
    ],
    bulkPricingTiers: [
      { minQuantity: 1, maxQuantity: 1, discountPercentage: 0, label: '500 pcs' },
      { minQuantity: 2, maxQuantity: 4, discountPercentage: 10, label: '1,000 - 2,000 pcs (10% off)' },
      { minQuantity: 5, maxQuantity: null, discountPercentage: 20, label: '2,500+ pcs (20% off)' },
    ],
    artworkRequirements: {
      recommendedDpi: 300,
      supportedFormats: ['PDF', 'AI', 'CDR', 'TIFF'],
      bleedMarginMm: 3,
      maxFileSizeMb: 50,
    },
  },
  {
    id: 'prod-office-stationery-suite',
    sku: 'STN-OFF-CORP-01',
    name: 'Executive Corporate Letterheads & Presentation Folders Suite (100 Sets)',
    slug: 'executive-corporate-letterheads-folders-suite',
    category: 'office_stationery',
    categoryLabel: 'Office Stationery & Branding',
    shortDescription: '120gsm conqueror-feel bond letterheads with luxury 350gsm matte-laminated die-cut presentation pocket folders.',
    description: 'Give your tenders, legal agreements, corporate contracts, and executive proposals an authoritative presence. Includes 100 A4 official letterheads, matching DL envelopes, and 100 pocket folders with die-cut business card slots.',
    basePriceNgn: 48000,
    minQuantity: 1,
    turnaroundDays: 3,
    badge: 'C-Suite Pack',
    image: '/executive-letterheads-folders.jpg',
    images: ['/executive-letterheads-folders.jpg'],
    optionGroups: [
      {
        id: 'opt-stationery-paper',
        name: 'Paper Grade',
        type: 'material',
        required: true,
        options: [
          { id: 'pp-royal-bond', name: '120gsm Royal Executive Bright White Bond', code: 'BOND_120', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'pp-linen-tex', name: '120gsm Textured Linen Watermarked Paper', code: 'LINEN_120', priceModifierType: 'fixed', priceModifierValue: 8000 },
        ],
      },
      {
        id: 'opt-stationery-finishing',
        name: 'Folder Finishing',
        type: 'finishing',
        required: true,
        options: [
          { id: 'f-matte-lam', name: 'Velvet Matte Lamination with Card Slot', code: 'MATTE_POCKET', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'f-gold-emboss', name: 'Matte Lamination + Gold Foil Seal Logo', code: 'GOLD_FOIL_POCKET', priceModifierType: 'fixed', priceModifierValue: 12000 },
        ],
      },
    ],
    bulkPricingTiers: [
      { minQuantity: 1, maxQuantity: 2, discountPercentage: 0, label: '100 - 200 sets' },
      { minQuantity: 3, maxQuantity: 5, discountPercentage: 12, label: '300 - 500 sets (12% off)' },
      { minQuantity: 6, maxQuantity: null, discountPercentage: 20, label: '600+ sets (20% off)' },
    ],
    artworkRequirements: {
      recommendedDpi: 300,
      supportedFormats: ['PDF', 'AI', 'CDR'],
      bleedMarginMm: 3,
      maxFileSizeMb: 50,
    },
  },
  {
    id: 'prod-books-magazines-annual',
    sku: 'BOK-MAG-ANN-01',
    name: 'Corporate Annual Report & Company Profile Magazine (50 Copies)',
    slug: 'corporate-annual-report-company-profile-magazine',
    category: 'books_magazines',
    categoryLabel: 'Books & Magazines',
    shortDescription: 'Square-spine perfect binding, 300gsm matte-laminated cover with 135gsm silk inner pages.',
    description: 'Showcase company performance, ministerial achievements, audited accounts, and corporate social investments. Machine-folded, spine-creased, and heat-bound with zero page detachment.',
    basePriceNgn: 75000,
    minQuantity: 1,
    turnaroundDays: 4,
    badge: 'AGM Standard',
    image: '/corporate-annual-report-magazine.jpg',
    images: ['/corporate-annual-report-magazine.jpg'],
    optionGroups: [
      {
        id: 'opt-book-pages',
        name: 'Total Page Extent',
        type: 'size',
        required: true,
        options: [
          { id: 'pg-16', name: '16 Pages (Cover + 12 Inners)', code: '16_PAGES', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'pg-32', name: '32 Pages (Cover + 28 Inners)', code: '32_PAGES', priceModifierType: 'fixed', priceModifierValue: 24000 },
          { id: 'pg-64', name: '64 Pages (Comprehensive Annual Report)', code: '64_PAGES', priceModifierType: 'fixed', priceModifierValue: 52000 },
        ],
      },
      {
        id: 'opt-book-binding',
        name: 'Binding Style',
        type: 'finishing',
        required: true,
        options: [
          { id: 'bd-perfect', name: 'Thermal Perfect Bound (Square Spine)', code: 'PERFECT_BIND', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'bd-saddle', name: 'Dual Heavy-Duty Saddle Stitching (Stapled)', code: 'SADDLE_STITCH', priceModifierType: 'fixed', priceModifierValue: -5000 },
        ],
      },
    ],
    bulkPricingTiers: [
      { minQuantity: 1, maxQuantity: 2, discountPercentage: 0, label: '50 - 100 copies' },
      { minQuantity: 3, maxQuantity: 5, discountPercentage: 15, label: '150 - 250 copies (15% off)' },
      { minQuantity: 6, maxQuantity: null, discountPercentage: 25, label: '300+ copies (25% off)' },
    ],
    artworkRequirements: {
      recommendedDpi: 300,
      supportedFormats: ['PDF', 'AI', 'INDD'],
      bleedMarginMm: 3,
      maxFileSizeMb: 80,
    },
  },
  {
    id: 'prod-stamps-seals-corporate',
    sku: 'SMP-CORP-SEAL-01',
    name: 'Shiny Self-Inking Company Stamp & Heavy-Duty CAC Embossing Seal',
    slug: 'shiny-self-inking-stamp-embossing-seal',
    category: 'stamps_seals',
    categoryLabel: 'Company Stamps & Seals',
    shortDescription: 'Laser-etched rubber die with 10,000 impressions + stainless steel cast desk embossing seal.',
    description: 'Official CAC corporate governance requirement for executing deed agreements, certifying board resolutions, authenticating financial invoices, and stamping bank checks.',
    basePriceNgn: 26500,
    minQuantity: 1,
    turnaroundDays: 1,
    badge: 'Legal Ready',
    image: '/company-stamp-cac-seal.jpg',
    images: ['/company-stamp-cac-seal.jpg'],
    optionGroups: [
      {
        id: 'opt-stamp-device',
        name: 'Hardware Package',
        type: 'material',
        required: true,
        options: [
          { id: 'dev-stamp-only', name: 'Shiny Self-Inking Dater / Logo Stamp Only', code: 'STAMP_ONLY', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'dev-seal-only', name: 'Cast Steel Desk Embossing Seal Only', code: 'SEAL_ONLY', priceModifierType: 'fixed', priceModifierValue: 4500 },
          { id: 'dev-both-combo', name: 'Executive Dual Combo (Stamp + Embossing Seal)', code: 'COMBO_BOTH', priceModifierType: 'fixed', priceModifierValue: 14000 },
        ],
      },
      {
        id: 'opt-ink-color',
        name: 'Stamp Ink Color',
        type: 'finishing',
        required: true,
        options: [
          { id: 'ink-blue', name: 'Official Royal Blue', code: 'BLUE', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'ink-black', name: 'Executive Black', code: 'BLACK', priceModifierType: 'fixed', priceModifierValue: 0 },
          { id: 'ink-red', name: 'Urgent Audit Red', code: 'RED', priceModifierType: 'fixed', priceModifierValue: 0 },
        ],
      },
    ],
    bulkPricingTiers: [
      { minQuantity: 1, maxQuantity: 2, discountPercentage: 0, label: '1 - 2 sets' },
      { minQuantity: 3, maxQuantity: 6, discountPercentage: 12, label: '3 - 6 branch sets (12% off)' },
      { minQuantity: 7, maxQuantity: null, discountPercentage: 20, label: '7+ sets (20% off)' },
    ],
    artworkRequirements: {
      recommendedDpi: 600,
      supportedFormats: ['PDF', 'AI', 'CDR', 'PNG'],
      bleedMarginMm: 0,
      maxFileSizeMb: 30,
    },
  },
  {
    id: 'prod-banners-stands-combo',
    sku: 'DISP-BNS-01',
    name: 'Executive Roll-up Banner Stand & Aluminum X-Frame Display',
    slug: 'executive-rollup-banner-stand-x-frame',
    category: 'banners_stands',
    categoryLabel: 'Banners & Stands',
    shortDescription: 'Heavyweight anti-curl Solite media mounted on premium retractable aluminum cassette with travel carry case.',
    description: 'The preferred display stand for conference entrances, bank reception lobbies, corporate roadshows, and church programs throughout Bayelsa State.',
    basePriceNgn: 29500,
    minQuantity: 1,
    turnaroundDays: 1,
    badge: 'Popular',
    image: '/executive-rollup-x-frame-display.jpg',
    images: ['/executive-rollup-x-frame-display.jpg'],
    optionGroups: [
      {
        id: 'opt-stand-type',
        name: 'Hardware Configuration',
        type: 'base_stand',
        required: true,
        options: [
          { id: 'sb-broad-base', name: 'Luxury Broad Base Roll-Up (85cm x 205cm)', code: 'BROAD_BASE', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'sb-slim-base', name: 'Standard Slim Foot Roll-Up (85cm x 205cm)', code: 'SLIM_BASE', priceModifierType: 'fixed', priceModifierValue: -5000 },
          { id: 'sb-giant-base', name: 'Giant Backdrop Roll-Up (150cm x 205cm)', code: 'GIANT_BASE', priceModifierType: 'fixed', priceModifierValue: 26000 },
          { id: 'sb-x-banner', name: 'Collapsible X-Banner Stand (60cm x 160cm)', code: 'X_FRAME', priceModifierType: 'fixed', priceModifierValue: -12000 },
        ],
      },
    ],
    bulkPricingTiers: [
      { minQuantity: 1, maxQuantity: 2, discountPercentage: 0, label: '1 - 2 stands' },
      { minQuantity: 3, maxQuantity: 5, discountPercentage: 10, label: '3 - 5 stands (10% off)' },
      { minQuantity: 6, maxQuantity: null, discountPercentage: 20, label: '6+ stands (20% off)' },
    ],
    artworkRequirements: {
      recommendedDpi: 300,
      supportedFormats: ['PDF', 'CDR', 'AI', 'PNG'],
      bleedMarginMm: 50,
      maxFileSizeMb: 60,
    },
  },
  {
    id: 'prod-outdoor-teardrop-flag',
    sku: 'DISP-OUT-FLAG-01',
    name: 'Teardrop & Feather Flying Banner (Outdoor Wind Flag)',
    slug: 'teardrop-feather-flying-flag-banner',
    category: 'outdoor_displays',
    categoryLabel: 'Outdoor Displays',
    shortDescription: 'All-weather dye-sublimation tension polyester flag with 360° rotating aluminum fiberglass pole & water-base.',
    description: 'Engineered for high outdoor wind resistance in coastal Bayelsa. Features vibrant double-sided dye penetration, heavy-duty fillable water or sand tank base, and UV-resistant inks.',
    basePriceNgn: 42000,
    minQuantity: 1,
    turnaroundDays: 2,
    badge: 'Heavy Duty',
    image: '/teardrop-feather-flying-banner.jpg',
    images: ['/teardrop-feather-flying-banner.jpg'],
    optionGroups: [
      {
        id: 'opt-flag-shape',
        name: 'Flag Shape & Height',
        type: 'size',
        required: true,
        options: [
          { id: 'flag-3m', name: '3.2 Meter Medium Teardrop Flag', code: 'FLAG_3M', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'flag-4m', name: '4.2 Meter Large Feather Flag', code: 'FLAG_4M', priceModifierType: 'fixed', priceModifierValue: 9000 },
          { id: 'flag-5m', name: '5.2 Meter Jumbo Roadside Banner', code: 'FLAG_5M', priceModifierType: 'fixed', priceModifierValue: 18000 },
        ],
      },
      {
        id: 'opt-flag-base',
        name: 'Ground Base Type',
        type: 'base_stand',
        required: true,
        options: [
          { id: 'base-cross-water', name: 'Steel Cross Base + 15L Water Weight Ring', code: 'CROSS_WATER', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'base-ground-spike', name: 'Ground Spike for Grass & Lawn', code: 'SPIKE', priceModifierType: 'fixed', priceModifierValue: -2000 },
          { id: 'base-heavy-plate', name: 'Solid 12kg Square Steel Base Plate', code: 'HEAVY_PLATE', priceModifierType: 'fixed', priceModifierValue: 8000 },
        ],
      },
    ],
    bulkPricingTiers: [
      { minQuantity: 1, maxQuantity: 2, discountPercentage: 0, label: '1 - 2 units' },
      { minQuantity: 3, maxQuantity: 6, discountPercentage: 12, label: '3 - 6 units (12% off)' },
      { minQuantity: 7, maxQuantity: null, discountPercentage: 22, label: '7+ units (22% off)' },
    ],
    artworkRequirements: {
      recommendedDpi: 300,
      supportedFormats: ['PDF', 'AI', 'CDR'],
      bleedMarginMm: 20,
      maxFileSizeMb: 50,
    },
  },
  {
    id: 'prod-signage-3d-led-letters',
    sku: 'DISP-SGN-3D-01',
    name: '3D Illuminated LED Channel Letter Signboard (Exterior & Reception)',
    slug: '3d-illuminated-led-channel-letters-signage',
    category: 'signages',
    categoryLabel: 'Signages',
    shortDescription: 'Custom laser-cut acrylic faces with waterproof Samsung LED modules and brushed aluminum casing.',
    description: 'Transform your storefront or office building in Yenagoa with prestigious 3D glowing letters. Fully waterproof IP67 rating with automated day/night photocell sensor.',
    basePriceNgn: 145000,
    minQuantity: 1,
    turnaroundDays: 5,
    badge: 'Premium Sign',
    image: '/3d-illuminated-led-channel-letters.jpg',
    images: ['/3d-illuminated-led-channel-letters.jpg'],
    optionGroups: [
      {
        id: 'opt-illumination-style',
        name: 'Lighting Mode',
        type: 'material',
        required: true,
        options: [
          { id: 'lit-face', name: 'Front-Lit Glow (Bright Acrylic Face)', code: 'FRONT_LIT', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'lit-halo', name: 'Halo Back-Lit Floating Glow (Wall Reflection)', code: 'HALO_LIT', priceModifierType: 'fixed', priceModifierValue: 18000 },
          { id: 'lit-dual', name: 'Dual Illumination (Front + Halo Glow)', code: 'DUAL_LIT', priceModifierType: 'fixed', priceModifierValue: 32000 },
        ],
      },
    ],
    bulkPricingTiers: [
      { minQuantity: 1, maxQuantity: 1, discountPercentage: 0, label: 'Single installation' },
      { minQuantity: 2, maxQuantity: null, discountPercentage: 10, label: '2+ branch locations (10% off)' },
    ],
    artworkRequirements: {
      recommendedDpi: 300,
      supportedFormats: ['PDF', 'AI', 'DWG', 'CDR'],
      bleedMarginMm: 0,
      maxFileSizeMb: 50,
    },
  },
  {
    id: 'prod-events-popup-wall',
    sku: 'DISP-EVT-POP-01',
    name: 'Magnetic Curved Pop-Up Exhibition Media Backdrop Wall (3x3m)',
    slug: 'magnetic-curved-popup-media-wall-backdrop',
    category: 'events_exhibitions',
    categoryLabel: 'Events & Exhibitions',
    shortDescription: 'Heavy-duty aircraft aluminum accordion frame with magnetic graphic panels and wheeled trolley podium case.',
    description: 'The definitive photo backdrop and press-wall solution for government conferences, corporate summits, and high-profile exhibitions in Bayelsa.',
    basePriceNgn: 185000,
    minQuantity: 1,
    turnaroundDays: 3,
    badge: 'Exhibition Grade',
    image: '/magnetic-curved-popup-backdrop.jpg',
    images: ['/magnetic-curved-popup-backdrop.jpg'],
    optionGroups: [
      {
        id: 'opt-wall-size',
        name: 'Backdrop Dimension',
        type: 'size',
        required: true,
        options: [
          { id: 'pop-3x3', name: '3x3 Grid (2.3m High x 2.6m Curved Arc)', code: 'POP_3X3', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'pop-3x4', name: '3x4 Grid (2.3m High x 3.4m Wide Exhibition Arc)', code: 'POP_3X4', priceModifierType: 'fixed', priceModifierValue: 35000 },
        ],
      },
      {
        id: 'opt-wall-lights',
        name: 'Spotlight Accessories',
        type: 'material',
        required: false,
        options: [
          { id: 'lights-none', name: 'Standard Kit (No LED Spotlight)', code: 'NO_LIGHTS', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'lights-pair', name: 'Pair of Overhead Warm LED Stage Spotlights', code: 'LED_LIGHTS', priceModifierType: 'fixed', priceModifierValue: 15000 },
        ],
      },
    ],
    bulkPricingTiers: [
      { minQuantity: 1, maxQuantity: 1, discountPercentage: 0, label: '1 unit' },
      { minQuantity: 2, maxQuantity: null, discountPercentage: 12, label: '2+ setups (12% off)' },
    ],
    artworkRequirements: {
      recommendedDpi: 300,
      supportedFormats: ['PDF', 'AI', 'TIFF'],
      bleedMarginMm: 25,
      maxFileSizeMb: 100,
    },
  },
  {
    id: 'prod-frames-floating-canvas',
    sku: 'DISP-FRM-ART-01',
    name: 'Executive Floating Canvas & Beveled Acrylic Gallery Wall Art',
    slug: 'executive-floating-canvas-acrylic-wall-art',
    category: 'frames_wallarts',
    categoryLabel: 'Frames & Wall Arts',
    shortDescription: 'Museum-grade Giclée canvas stretched on kiln-dried timber with outer floating shadowbox frame.',
    description: 'Adorn boardrooms, executive suites, hotels, and modern homes with archival-grade canvas wall decor and photo crystal acrylic float mounts.',
    basePriceNgn: 38000,
    minQuantity: 1,
    turnaroundDays: 2,
    badge: 'Artisan Finish',
    image: '/floating-canvas-acrylic-wall-art.jpg',
    images: ['/floating-canvas-acrylic-wall-art.jpg'],
    optionGroups: [
      {
        id: 'opt-frame-size',
        name: 'Artwork Dimension',
        type: 'size',
        required: true,
        options: [
          { id: 'art-24x36', name: '24" x 36" (60cm x 90cm) Executive Size', code: 'ART_24x36', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'art-30x48', name: '30" x 48" (75cm x 120cm) Boardroom Statement', code: 'ART_30x48', priceModifierType: 'fixed', priceModifierValue: 22000 },
          { id: 'art-16x24', name: '16" x 24" (40cm x 60cm) Desktop / Hallway', code: 'ART_16x24', priceModifierType: 'fixed', priceModifierValue: -12000 },
        ],
      },
      {
        id: 'opt-frame-finish',
        name: 'Frame Molding Style',
        type: 'finishing',
        required: true,
        options: [
          { id: 'frm-black', name: 'Deep Midnight Floating Shadowbox Frame', code: 'BLACK_FLOAT', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'frm-gold', name: 'Brushed Royal Gold Composite Frame', code: 'GOLD_FLOAT', priceModifierType: 'fixed', priceModifierValue: 4000 },
          { id: 'frm-natural', name: 'Scandinavian Warm Oak Natural Wood', code: 'OAK_FLOAT', priceModifierType: 'fixed', priceModifierValue: 5000 },
        ],
      },
    ],
    bulkPricingTiers: [
      { minQuantity: 1, maxQuantity: 2, discountPercentage: 0, label: '1 - 2 frames' },
      { minQuantity: 3, maxQuantity: 6, discountPercentage: 15, label: '3 - 6 hotel suites (15% off)' },
      { minQuantity: 7, maxQuantity: null, discountPercentage: 25, label: '7+ units (25% off)' },
    ],
    artworkRequirements: {
      recommendedDpi: 300,
      supportedFormats: ['JPG', 'PNG', 'PDF', 'TIFF'],
      bleedMarginMm: 40,
      maxFileSizeMb: 50,
    },
  },
  {
    id: 'prod-awards-crystal-plaque',
    sku: 'DISP-AWD-CRY-01',
    name: 'Precision Laser-Etched Optical Crystal Plaque & Wooden Trophy',
    slug: 'laser-etched-optical-crystal-award-plaque',
    category: 'awards',
    categoryLabel: 'Awards',
    shortDescription: 'Flawless optical K9 crystal with 3D subsurface laser engraving and satin-lined luxury presentation box.',
    description: 'Reward excellence and honor leadership with commemorative recognition plaques and corporate long-service trophies.',
    basePriceNgn: 32000,
    minQuantity: 1,
    turnaroundDays: 2,
    badge: 'VIP Tribute',
    image: '/crystal-glass-award-plaque.jpg',
    images: ['/crystal-glass-award-plaque.jpg'],
    optionGroups: [
      {
        id: 'opt-award-material',
        name: 'Trophy Medium & Form',
        type: 'material',
        required: true,
        options: [
          { id: 'awd-crystal-ice', name: 'Faceted Diamond Iceberg Crystal (22cm)', code: 'CRYSTAL_ICE', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'awd-wood-crystal', name: 'Rich Mahogany Wood + Crystal Column Trophy', code: 'WOOD_CRYSTAL', priceModifierType: 'fixed', priceModifierValue: 6500 },
          { id: 'awd-metal-star', name: 'Heavy Cast Metal Gold Star on Solid Marble Base', code: 'GOLD_STAR', priceModifierType: 'fixed', priceModifierValue: 12000 },
        ],
      },
    ],
    bulkPricingTiers: [
      { minQuantity: 1, maxQuantity: 3, discountPercentage: 0, label: '1 - 3 awards' },
      { minQuantity: 4, maxQuantity: 10, discountPercentage: 12, label: '4 - 10 recipients (12% off)' },
      { minQuantity: 11, maxQuantity: null, discountPercentage: 22, label: '11+ ceremony bulk (22% off)' },
    ],
    artworkRequirements: {
      recommendedDpi: 600,
      supportedFormats: ['PDF', 'AI', 'CDR'],
      bleedMarginMm: 0,
      maxFileSizeMb: 25,
    },
  },
  {
    id: 'prod-machines-ecosolvent-printer',
    sku: 'DISP-MCH-ECO-01',
    name: 'Industrial Large Format Eco-Solvent Digital Banner & Vinyl Printer (1.8m)',
    slug: 'industrial-large-format-ecosolvent-banner-printer',
    category: 'printing_machines',
    categoryLabel: 'Printing Machines',
    shortDescription: 'High-speed 1.8m dual XP600 / i3200 printhead digital plotter with intelligent infrared drying heater.',
    description: 'Commercial-grade large format digital printing engine for roll-up flex banners, SAV car stickers, canvas, and backlit films. Includes RIP software, starter CMYK inks, and factory installation support across Bayelsa.',
    basePriceNgn: 4850000,
    minQuantity: 1,
    turnaroundDays: 5,
    badge: 'Equipment',
    image: '/industrial-large-format-printer.jpg',
    images: ['/industrial-large-format-printer.jpg'],
    optionGroups: [
      {
        id: 'opt-printhead-config',
        name: 'Printhead Configuration',
        type: 'material',
        required: true,
        options: [
          { id: 'head-xp600-dual', name: 'Dual XP600 Printheads (Photo Quality 1440 DPI)', code: 'DUAL_XP600', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'head-i3200-dual', name: 'Dual Epson i3200-E1 Heads (High Production Speed)', code: 'DUAL_I3200', priceModifierType: 'fixed', priceModifierValue: 850000 },
        ],
      },
    ],
    bulkPricingTiers: [
      { minQuantity: 1, maxQuantity: null, discountPercentage: 0, label: 'Direct Factory Distribution' },
    ],
    artworkRequirements: {
      recommendedDpi: 300,
      supportedFormats: ['TIFF', 'PDF', 'PSD'],
      bleedMarginMm: 0,
      maxFileSizeMb: 100,
    },
  },
  {
    id: 'prod-wedding-acrylic-suite',
    sku: 'DISP-WED-ACR-01',
    name: 'Royal Foil-Stamped Frosted Acrylic Wedding Invitation Suite & Welcome Easel',
    slug: 'royal-acrylic-wedding-invitation-welcome-easel',
    category: 'wedding',
    categoryLabel: 'Wedding',
    shortDescription: '2mm frosted crystal acrylic with mirror gold hot-stamping foil, wax-sealed envelopes, and matching entry easel board.',
    description: 'Create unforgettable grandeur for your special day in Bayelsa. Complete luxury wedding stationery suite including invitations, RSVP cards, table numbers, and custom entrance welcome signs.',
    basePriceNgn: 45000,
    minQuantity: 1,
    turnaroundDays: 3,
    badge: 'Celebration VIP',
    image: '/frosted-acrylic-wedding-invitation.jpg',
    images: ['/frosted-acrylic-wedding-invitation.jpg'],
    optionGroups: [
      {
        id: 'opt-wedding-pack',
        name: 'Stationery Package',
        type: 'material',
        required: true,
        options: [
          { id: 'wed-invite-set', name: 'Pack of 50 Frosted Acrylic Cards + Velvet Envelopes', code: 'INVITE_50', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'wed-combo-easel', name: 'Pack of 100 Cards + Acrylic Entrance Welcome Easel', code: 'INVITE_100_EASEL', priceModifierType: 'fixed', priceModifierValue: 45000 },
        ],
      },
    ],
    bulkPricingTiers: [
      { minQuantity: 1, maxQuantity: 2, discountPercentage: 0, label: '1 - 2 packs' },
      { minQuantity: 3, maxQuantity: null, discountPercentage: 15, label: '3+ sets (15% bulk off)' },
    ],
    artworkRequirements: {
      recommendedDpi: 300,
      supportedFormats: ['PDF', 'AI', 'CDR', 'PNG'],
      bleedMarginMm: 3,
      maxFileSizeMb: 40,
    },
  },
  {
    id: 'prod-carport-tensile-canopy',
    sku: 'DISP-CRP-TEN-01',
    name: 'Heavy-Duty Galvanized Steel Tensile Fabric Carport & Entrance Canopy',
    slug: 'heavy-duty-galvanized-steel-tensile-carport-canopy',
    category: 'carports',
    categoryLabel: 'Carports',
    shortDescription: 'Curved cantilever structural steel frame with Serge Ferrari 902S2 waterproof & UV heat-blocking architectural membrane.',
    description: 'Engineered specifically for residential compounds, bank parking lots, and corporate offices in Yenagoa and across the Niger Delta. Provides 100% waterproof rain shield and blocks 98% solar UV radiation.',
    basePriceNgn: 380000,
    minQuantity: 1,
    turnaroundDays: 7,
    badge: 'Structural',
    image: '/carport-tensile-canopy.jpg',
    images: ['/carport-tensile-canopy.jpg'],
    optionGroups: [
      {
        id: 'opt-carport-size',
        name: 'Parking Capacity & Bay Size',
        type: 'size',
        required: true,
        options: [
          { id: 'bay-single', name: 'Single Vehicle Bay (3.0m x 5.5m)', code: 'BAY_1', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'bay-double', name: 'Double Vehicle Bay Cantilever (5.5m x 5.5m)', code: 'BAY_2', priceModifierType: 'fixed', priceModifierValue: 240000 },
          { id: 'bay-triple', name: 'Triple Executive Bay (8.0m x 5.5m)', code: 'BAY_3', priceModifierType: 'fixed', priceModifierValue: 490000 },
        ],
      },
      {
        id: 'opt-membrane-color',
        name: 'Tensile Fabric Shade',
        type: 'material',
        required: true,
        options: [
          { id: 'color-cream', name: 'Executive Architectural Off-White / Cream', code: 'CREAM', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'color-grey', name: 'Cool Slate Grey High-Reflective', code: 'GREY', priceModifierType: 'fixed', priceModifierValue: 0 },
          { id: 'color-blue', name: 'Deep Royal Corporate Blue', code: 'BLUE', priceModifierType: 'fixed', priceModifierValue: 0 },
        ],
      },
    ],
    bulkPricingTiers: [
      { minQuantity: 1, maxQuantity: 1, discountPercentage: 0, label: 'Single site installation' },
      { minQuantity: 2, maxQuantity: null, discountPercentage: 10, label: '2+ multi-car bays (10% off)' },
    ],
    artworkRequirements: {
      recommendedDpi: 300,
      supportedFormats: ['PDF', 'DWG', 'AI'],
      bleedMarginMm: 0,
      maxFileSizeMb: 30,
    },
  },
  {
    id: 'prod-custom-apparels-caps',
    sku: 'BRD-APP-CAPS-01',
    name: 'Custom Branded Polo Shirts & Structured Baseball Caps (Pack of 20 Sets)',
    slug: 'custom-branded-polo-shirts-baseball-caps-set',
    category: 'custom_apparels_caps',
    categoryLabel: 'Custom Apparels & Caps',
    shortDescription: 'Heavyweight 220gsm pique cotton polo with matched 6-panel structured brushed cotton caps featuring high-density 3D embroidery.',
    description: 'Equip your team, campaign, or event with matching corporate polo shirts and baseball caps. Machine-washable colorfast fabric with custom front embroidery and side sleeve brand print.',
    basePriceNgn: 98000,
    minQuantity: 1,
    turnaroundDays: 3,
    badge: 'Top Seller',
    image: '/polo-shirts-baseball-caps-bundle.jpg',
    images: ['/polo-shirts-baseball-caps-bundle.jpg'],
    optionGroups: [
      {
        id: 'opt-polo-fabric',
        name: 'Fabric & Cap Tone',
        type: 'material',
        required: true,
        options: [
          { id: 'app-navy', name: 'Executive Navy Blue Polo + Navy Caps', code: 'NAVY_SET', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'app-black', name: 'Stealth Jet Black Polo + Black Caps', code: 'BLACK_SET', priceModifierType: 'fixed', priceModifierValue: 0 },
          { id: 'app-white', name: 'Bright White Polo + Kelly Green Caps', code: 'WHITE_GREEN_SET', priceModifierType: 'fixed', priceModifierValue: 0 },
        ],
      },
      {
        id: 'opt-polo-customization',
        name: 'Embroidery & Print Placement',
        type: 'finishing',
        required: true,
        options: [
          { id: 'emb-chest-cap', name: 'Left Chest Embroidery + Cap Front Monogram', code: 'STD_EMB', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'emb-all-over', name: 'Dual Chest & Back Print + 3D Puffed Cap Embroidery', code: 'PREM_EMB', priceModifierType: 'fixed', priceModifierValue: 18000 },
        ],
      },
    ],
    bulkPricingTiers: [
      { minQuantity: 1, maxQuantity: 2, discountPercentage: 0, label: '20 - 40 sets' },
      { minQuantity: 3, maxQuantity: 5, discountPercentage: 10, label: '60 - 100 sets (10% off)' },
      { minQuantity: 6, maxQuantity: null, discountPercentage: 20, label: '120+ bulk team sets (20% off)' },
    ],
    artworkRequirements: {
      recommendedDpi: 300,
      supportedFormats: ['AI', 'PDF', 'PNG', 'CDR'],
      bleedMarginMm: 0,
      maxFileSizeMb: 30,
    },
  },
  {
    id: 'prod-company-uniforms',
    sku: 'BRD-UNI-CORP-01',
    name: 'Executive Corporate Staff Uniform Shirts & Industrial Workwear (Pack of 10)',
    slug: 'executive-corporate-staff-uniforms-industrial-workwear',
    category: 'company_uniforms',
    categoryLabel: 'Company Uniforms',
    shortDescription: 'Wrinkle-resistant cotton blend executive button-downs and heavy-duty 3M reflective twill safety overalls.',
    description: 'Designed for corporate offices, oil & gas contractors, logistics teams, and hospitality establishments in Bayelsa. Tailored with precision stitching, reinforced seam pockets, and embroidered corporate emblems.',
    basePriceNgn: 75000,
    minQuantity: 1,
    turnaroundDays: 4,
    badge: 'Workplace Pro',
    image: '/staff-uniform-shirts-workwear.jpg',
    images: ['/staff-uniform-shirts-workwear.jpg'],
    optionGroups: [
      {
        id: 'opt-uniform-type',
        name: 'Uniform Type',
        type: 'material',
        required: true,
        options: [
          { id: 'uni-corporate-shirt', name: 'Oxford Button-Down Office Staff Shirts', code: 'OXFORD_SHIRTS', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'uni-safety-coverall', name: 'Heavy-Duty 100% Cotton Boilersuit Overalls (Hi-Vis)', code: 'SAFETY_OVERALL', priceModifierType: 'fixed', priceModifierValue: 35000 },
          { id: 'uni-medical-scrub', name: 'Clinical Anti-Microbial Medical Scrubs Pack', code: 'MED_SCRUBS', priceModifierType: 'fixed', priceModifierValue: -10000 },
        ],
      },
    ],
    bulkPricingTiers: [
      { minQuantity: 1, maxQuantity: 2, discountPercentage: 0, label: '10 - 20 sets' },
      { minQuantity: 3, maxQuantity: 6, discountPercentage: 12, label: '30 - 60 sets (12% off)' },
      { minQuantity: 7, maxQuantity: null, discountPercentage: 22, label: '70+ company-wide (22% off)' },
    ],
    artworkRequirements: {
      recommendedDpi: 300,
      supportedFormats: ['AI', 'PDF', 'CDR'],
      bleedMarginMm: 0,
      maxFileSizeMb: 30,
    },
  },
  {
    id: 'prod-gift-items-souvenirs',
    sku: 'BRD-GFT-SOUV-01',
    name: 'Branded Stainless Steel Vacuum Flask & Ceramic Coffee Mug Gift Set (Pack of 25)',
    slug: 'branded-vacuum-flask-ceramic-mug-gift-set',
    category: 'gift_items_souvenirs',
    categoryLabel: 'Gift Items & Souvenirs',
    shortDescription: 'Double-walled temperature-retaining thermal flask with laser-engraved monogram and full-wrap ceramic mugs.',
    description: 'The hallmark corporate gift and anniversary souvenir for clients, executive retreats, and weddings. Supplied in silk-cushioned executive presentation boxes.',
    basePriceNgn: 87500,
    minQuantity: 1,
    turnaroundDays: 3,
    badge: 'Client Favorite',
    image: '/vacuum-flask-coffee-mug-set.jpg',
    images: ['/vacuum-flask-coffee-mug-set.jpg'],
    optionGroups: [
      {
        id: 'opt-gift-packaging',
        name: 'Presentation Packaging',
        type: 'finishing',
        required: true,
        options: [
          { id: 'box-executive-silk', name: 'Luxury Silk-Lined Magnetic Gift Box with Ribbon', code: 'SILK_BOX', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'box-standard-kraft', name: 'Eco Kraft Carrier Window Box', code: 'KRAFT_BOX', priceModifierType: 'fixed', priceModifierValue: -12000 },
        ],
      },
    ],
    bulkPricingTiers: [
      { minQuantity: 1, maxQuantity: 2, discountPercentage: 0, label: '25 - 50 sets' },
      { minQuantity: 3, maxQuantity: 5, discountPercentage: 12, label: '75 - 125 sets (12% off)' },
      { minQuantity: 6, maxQuantity: null, discountPercentage: 20, label: '150+ souvenir bulk (20% off)' },
    ],
    artworkRequirements: {
      recommendedDpi: 300,
      supportedFormats: ['PDF', 'AI', 'CDR', 'PNG'],
      bleedMarginMm: 2,
      maxFileSizeMb: 35,
    },
  },
  {
    id: 'prod-food-packaging',
    sku: 'BRD-FOD-PCK-01',
    name: 'Custom Printed Food Boxes, Takeout Bowls & Greaseproof Paper (Pack of 500)',
    slug: 'custom-printed-food-takeout-boxes-greaseproof-paper',
    category: 'food_packaging',
    categoryLabel: 'Food Packaging',
    shortDescription: 'FDA-approved food-grade kraft paperboard with leak-proof PE coating and eco-friendly soy-based inks.',
    description: 'Ideal for restaurants, fast-food outlets, bakeries, and cloud kitchens in Yenagoa and Port Harcourt. Moisture-resistant, heat-retaining, and microwave-safe.',
    basePriceNgn: 45000,
    minQuantity: 1,
    turnaroundDays: 3,
    badge: 'Food Grade',
    image: '/custom-printed-food-boxes.jpg',
    images: ['/custom-printed-food-boxes.jpg'],
    optionGroups: [
      {
        id: 'opt-food-container',
        name: 'Box Style',
        type: 'size',
        required: true,
        options: [
          { id: 'f-burger-clam', name: 'Clamshell Burger & Snack Boxes (Pack of 500)', code: 'BURGER_500', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'f-meal-handle', name: 'Meal Takeout Box with Carry Handle (Pack of 500)', code: 'HANDLE_500', priceModifierType: 'fixed', priceModifierValue: 16000 },
          { id: 'f-pastry-window', name: 'Bakery Cake / Pastry Box with Clear Window', code: 'WINDOW_500', priceModifierType: 'fixed', priceModifierValue: 12000 },
        ],
      },
    ],
    bulkPricingTiers: [
      { minQuantity: 1, maxQuantity: 2, discountPercentage: 0, label: '500 - 1,000 units' },
      { minQuantity: 3, maxQuantity: 6, discountPercentage: 15, label: '1,500 - 3,000 units (15% off)' },
      { minQuantity: 7, maxQuantity: null, discountPercentage: 25, label: '3,500+ commercial bulk (25% off)' },
    ],
    artworkRequirements: {
      recommendedDpi: 300,
      supportedFormats: ['PDF', 'AI', 'CDR'],
      bleedMarginMm: 3,
      maxFileSizeMb: 40,
    },
  },
  {
    id: 'prod-packaging-shipping-cartons',
    sku: 'BRD-PKG-CRT-01',
    name: 'Heavy-Duty Corrugated Shipping Cartons & E-Commerce Mailer Boxes (Pack of 100)',
    slug: 'heavy-duty-corrugated-shipping-cartons-mailer-boxes',
    category: 'packaging_shipping_cartons',
    categoryLabel: 'Packaging and Shipping Cartons',
    shortDescription: 'Double-wall 5-ply kraft fluted corrugated board with flexographic corporate logo branding.',
    description: 'Protect your merchandise in transit across Nigeria. High-burst strength fluted walls prevent crush damage during nationwide interstate courier freight.',
    basePriceNgn: 54000,
    minQuantity: 1,
    turnaroundDays: 3,
    badge: 'High Strength',
    image: '/corrugated-shipping-cartons-mailer-boxes.jpg',
    images: ['/corrugated-shipping-cartons-mailer-boxes.jpg'],
    optionGroups: [
      {
        id: 'opt-carton-size',
        name: 'Carton Dimensions',
        type: 'size',
        required: true,
        options: [
          { id: 'sz-medium-carton', name: 'Medium Master Box (40cm x 30cm x 25cm)', code: 'MED_CARTON', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'sz-large-carton', name: 'Large Freight Box (60cm x 40cm x 40cm)', code: 'LRG_CARTON', priceModifierType: 'fixed', priceModifierValue: 28000 },
          { id: 'sz-mailer-diecut', name: 'Die-Cut Self-Locking Mailer Box (30cm x 22cm x 10cm)', code: 'MAILER_BOX', priceModifierType: 'fixed', priceModifierValue: -6000 },
        ],
      },
    ],
    bulkPricingTiers: [
      { minQuantity: 1, maxQuantity: 2, discountPercentage: 0, label: '100 - 200 boxes' },
      { minQuantity: 3, maxQuantity: 5, discountPercentage: 12, label: '300 - 500 boxes (12% off)' },
      { minQuantity: 6, maxQuantity: null, discountPercentage: 22, label: '600+ factory cartons (22% off)' },
    ],
    artworkRequirements: {
      recommendedDpi: 300,
      supportedFormats: ['PDF', 'AI', 'CDR'],
      bleedMarginMm: 5,
      maxFileSizeMb: 30,
    },
  },
  {
    id: 'prod-paper-bags-tags',
    sku: 'BRD-BAG-TAG-01',
    name: 'Luxury Kraft Shopping Carrier Bags & Embossed Clothing Swing Tags (Pack of 250)',
    slug: 'luxury-kraft-shopping-carrier-bags-clothing-swing-tags',
    category: 'paper_bags_tags',
    categoryLabel: 'Paper Bags & Tags',
    shortDescription: '250gsm premium white or brown kraft carrier bags with braided cotton rope handles and matching foil-accented tags.',
    description: 'Essential for luxury fashion boutiques, retail stores, jewelry houses, and corporate gifting. Strong cardboard reinforced base and turn-top handles.',
    basePriceNgn: 62000,
    minQuantity: 1,
    turnaroundDays: 3,
    badge: 'Boutique Grade',
    image: '/luxury-kraft-shopping-carrier-bags.jpg',
    images: ['/luxury-kraft-shopping-carrier-bags.jpg'],
    optionGroups: [
      {
        id: 'opt-bag-finish',
        name: 'Material & Handle Tone',
        type: 'material',
        required: true,
        options: [
          { id: 'bag-kraft-brown', name: 'Earthy Brown Natural Ribbed Kraft + Cotton Cord', code: 'BROWN_KRAFT', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'bag-white-luxury', name: 'Luxury Snow White Coated Paper + Satin Ribbon', code: 'WHITE_SATIN', priceModifierType: 'fixed', priceModifierValue: 14000 },
        ],
      },
    ],
    bulkPricingTiers: [
      { minQuantity: 1, maxQuantity: 2, discountPercentage: 0, label: '250 - 500 bags' },
      { minQuantity: 3, maxQuantity: 5, discountPercentage: 12, label: '750 - 1,250 bags (12% off)' },
      { minQuantity: 6, maxQuantity: null, discountPercentage: 22, label: '1,500+ retail bulk (22% off)' },
    ],
    artworkRequirements: {
      recommendedDpi: 300,
      supportedFormats: ['PDF', 'AI', 'CDR', 'PNG'],
      bleedMarginMm: 3,
      maxFileSizeMb: 35,
    },
  },
  {
    id: 'prod-vehicle-branding',
    sku: 'BRD-VEH-WRAP-01',
    name: 'Commercial Fleet Vehicle Branding & One-Way Vision Perforated Window Vinyl',
    slug: 'commercial-fleet-vehicle-branding-vinyl-wrap',
    category: 'vehicle_branding',
    categoryLabel: 'Vehicle Branding',
    shortDescription: 'Cast air-release bubble-free vinyl with UV gloss protective overlaminate for delivery vans, buses, and corporate SUVs.',
    description: 'Turn company trucks, staff buses, and delivery tricycles into moving billboards. Weather-resistant against intense tropical sun and coastal rain in Bayelsa.',
    basePriceNgn: 125000,
    minQuantity: 1,
    turnaroundDays: 2,
    badge: 'High Visibility',
    image: '/commercial-fleet-vehicle-branding.jpg',
    images: ['/commercial-fleet-vehicle-branding.jpg'],
    optionGroups: [
      {
        id: 'opt-wrap-coverage',
        name: 'Branding Coverage',
        type: 'material',
        required: true,
        options: [
          { id: 'cov-doors-panels', name: 'Partial Wrap: Both Front Doors + Rear Tailgate', code: 'PARTIAL_WRAP', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'cov-full-wrap', name: 'Full Vehicle Wrap (Complete Body Shell + Roof)', code: 'FULL_WRAP', priceModifierType: 'fixed', priceModifierValue: 145000 },
          { id: 'cov-oneway-vision', name: 'Perforated One-Way Vision Rear Window Glass Graphic', code: 'ONE_WAY_GLASS', priceModifierType: 'fixed', priceModifierValue: -65000 },
        ],
      },
    ],
    bulkPricingTiers: [
      { minQuantity: 1, maxQuantity: 1, discountPercentage: 0, label: '1 vehicle' },
      { minQuantity: 2, maxQuantity: 4, discountPercentage: 10, label: '2 - 4 fleet vehicles (10% off)' },
      { minQuantity: 5, maxQuantity: null, discountPercentage: 20, label: '5+ nationwide fleet (20% off)' },
    ],
    artworkRequirements: {
      recommendedDpi: 300,
      supportedFormats: ['AI', 'PDF', 'TIFF', 'CDR'],
      bleedMarginMm: 50,
      maxFileSizeMb: 100,
    },
  },
  {
    id: 'prod-packages',
    sku: 'BRD-PKG-SUITE-01',
    name: 'Complete Startup Corporate Identity Launch Bundle & Branding Package',
    slug: 'complete-startup-corporate-identity-branding-package',
    category: 'packages',
    categoryLabel: 'Packages',
    shortDescription: 'All-inclusive suite: 500 Business Cards + 200 Letterheads + 2 Luxury Roll-Up Banners + 20 Branded Polo Shirts + 100 Stickers.',
    description: 'The definitive launch kit for new businesses, NGOs, oil service contractors, and legal chambers in Nigeria. Save 35% compared to purchasing items individually.',
    basePriceNgn: 198000,
    minQuantity: 1,
    turnaroundDays: 4,
    badge: 'Complete Suite (35% Off)',
    image: '/startup-corporate-identity-bundle.jpg',
    images: ['/startup-corporate-identity-bundle.jpg'],
    optionGroups: [
      {
        id: 'opt-bundle-tier',
        name: 'Identity Package Tier',
        type: 'material',
        required: true,
        options: [
          { id: 'pkg-startup-kit', name: 'Standard Corporate Launch Kit (Cards + Letterheads + 2 Banners + 20 Polos)', code: 'STARTUP_KIT', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'pkg-executive-mega', name: 'Executive Enterprise Suite (+ 3D Office Signboard + 50 Hardcover Journals)', code: 'ENTERPRISE_KIT', priceModifierType: 'fixed', priceModifierValue: 180000 },
        ],
      },
    ],
    bulkPricingTiers: [
      { minQuantity: 1, maxQuantity: 1, discountPercentage: 0, label: 'Single complete package' },
      { minQuantity: 2, maxQuantity: null, discountPercentage: 10, label: '2+ multi-branch packs (10% off)' },
    ],
    artworkRequirements: {
      recommendedDpi: 300,
      supportedFormats: ['PDF', 'AI', 'CDR'],
      bleedMarginMm: 3,
      maxFileSizeMb: 100,
    },
  },
];

export const NIGERIAN_SHIPPING_ZONES: ShippingZone[] = [
  {
    id: 'zone-bayelsa',
    name: 'Bayelsa State (Yenagoa & Environs)',
    region: 'Bayelsa State',
    states: ['Yenagoa Central', 'Amarata', 'Biogbolo', 'Kpansia', 'Opolo', 'Swali', 'Tombia', 'Otuoke'],
    baseFeeNgn: 2500,
    estimatedDays: 'Same-Day / 1 Business Day Express',
    expressAvailable: true,
    expressFeeNgn: 4000,
  },
  {
    id: 'zone-lagos-mainland',
    name: 'Lagos Mainland',
    region: 'Lagos State',
    states: ['Ikeja', 'Yaba', 'Surulere', 'Maryland', 'Gbagada', 'Oshodi', 'Magodo'],
    baseFeeNgn: 3000,
    estimatedDays: '1–2 Business Days',
    expressAvailable: true,
    expressFeeNgn: 5500,
  },
  {
    id: 'zone-lagos-island',
    name: 'Lagos Island & Coastal Corridor',
    region: 'Lagos State',
    states: ['Victoria Island', 'Ikoyi', 'Lekki Phase 1', 'Chevron', 'Ajah', 'Sangotedo'],
    baseFeeNgn: 4000,
    estimatedDays: '1–2 Business Days',
    expressAvailable: true,
    expressFeeNgn: 7000,
  },
  {
    id: 'zone-abuja-fct',
    name: 'Abuja Federal Capital Territory',
    region: 'North Central',
    states: ['Central Business District', 'Maitama', 'Wuse', 'Garki', 'Asokoro', 'Gwarinpa'],
    baseFeeNgn: 6500,
    estimatedDays: '2–3 Business Days (Air Express / Hub)',
    expressAvailable: true,
    expressFeeNgn: 11000,
  },
  {
    id: 'zone-ph-rivers',
    name: 'Port Harcourt & South-South Oil Hubs',
    region: 'South-South',
    states: ['Rivers (Port Harcourt)', 'Delta (Warri, Asaba)', 'Akwa Ibom (Uyo)', 'Edo (Benin City)'],
    baseFeeNgn: 6500,
    estimatedDays: '2–4 Business Days',
    expressAvailable: false,
  },
  {
    id: 'zone-southwest',
    name: 'South-West Regional Interstate',
    region: 'South-West',
    states: ['Oyo (Ibadan)', 'Ogun (Abeokuta, Sagamu)', 'Osun (Osogbo)', 'Ondo', 'Ekiti'],
    baseFeeNgn: 4500,
    estimatedDays: '2–3 Business Days',
    expressAvailable: false,
  },
  {
    id: 'zone-nationwide-other',
    name: 'Interstate Hubs & Rest of Nigeria',
    region: 'Nationwide Express',
    states: ['Enugu', 'Anambra (Onitsha)', 'Kano', 'Kaduna', 'Jos', 'Calabar', 'Other States'],
    baseFeeNgn: 7500,
    estimatedDays: '3–5 Business Days via GIG Logistics / DHL / Peace Mass Hub',
    expressAvailable: false,
  },
];

export const POSTGRESQL_DDL_SCHEMA = `
-- =========================================================================
-- RollUp Prints NG: Production Relational Database Schema (PostgreSQL 15+)
-- Designed for high-concurrency custom print configuration & bulk matrices
-- =========================================================================

-- 1. EXTENSIONS & ENUMS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE order_status_enum AS ENUM (
  'pending_payment',
  'artwork_review',
  'in_production',
  'ready_for_dispatch',
  'out_for_delivery',
  'delivered',
  'cancelled'
);

CREATE TYPE payment_status_enum AS ENUM (
  'pending',
  'paid',
  'failed',
  'refunded'
);

CREATE TYPE artwork_submission_enum AS ENUM (
  'direct_upload',
  'hire_designer',
  'send_later_whatsapp'
);

-- 2. CATEGORIES
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PRODUCTS
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  sku VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  short_description TEXT,
  description TEXT,
  base_price_ngn NUMERIC(12, 2) NOT NULL,
  min_quantity INT NOT NULL DEFAULT 1,
  turnaround_days INT NOT NULL DEFAULT 2,
  is_active BOOLEAN DEFAULT TRUE,
  image_url TEXT,
  artwork_requirements JSONB NOT NULL DEFAULT '{"recommendedDpi": 300, "supportedFormats": ["PDF","CDR","AI"], "bleedMarginMm": 5}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PRODUCT OPTION GROUPS (e.g. Size, Material, Stand, Lamination)
CREATE TABLE product_option_groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL, -- 'size', 'material', 'finishing', 'base_stand'
  is_required BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0
);

-- 5. PRINT OPTIONS (Variants & Value Modifiers)
CREATE TABLE print_options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID NOT NULL REFERENCES product_option_groups(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(50) NOT NULL,
  price_modifier_type VARCHAR(20) DEFAULT 'fixed', -- 'fixed', 'percentage', 'multiplier'
  price_modifier_value NUMERIC(12, 2) DEFAULT 0.00,
  is_default BOOLEAN DEFAULT FALSE,
  display_order INT DEFAULT 0
);

-- 6. BULK PRICING TIERS MATRIX
CREATE TABLE bulk_pricing_tiers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  min_quantity INT NOT NULL,
  max_quantity INT, -- NULL means infinity
  discount_percentage NUMERIC(5, 2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. SHIPPING ZONES & NIGERIAN LOGISTICS
CREATE TABLE shipping_zones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  region VARCHAR(100) NOT NULL,
  covered_states JSONB NOT NULL,
  base_fee_ngn NUMERIC(12, 2) NOT NULL,
  estimated_days VARCHAR(50) NOT NULL,
  express_available BOOLEAN DEFAULT FALSE,
  express_fee_ngn NUMERIC(12, 2) DEFAULT 0.00
);

-- 8. CUSTOMERS
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  company_name VARCHAR(150),
  default_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. ORDERS
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number VARCHAR(50) NOT NULL UNIQUE, -- e.g. "RUP-2026-8942"
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  customer_details JSONB NOT NULL,
  shipping_zone_id UUID REFERENCES shipping_zones(id),
  subtotal_ngn NUMERIC(12, 2) NOT NULL,
  shipping_fee_ngn NUMERIC(12, 2) NOT NULL,
  discount_ngn NUMERIC(12, 2) DEFAULT 0.00,
  grand_total_ngn NUMERIC(12, 2) NOT NULL,
  payment_gateway VARCHAR(30) DEFAULT 'paystack', -- 'paystack', 'flutterwave'
  payment_status payment_status_enum DEFAULT 'pending',
  payment_reference VARCHAR(100),
  order_status order_status_enum DEFAULT 'pending_payment',
  tracking_number VARCHAR(100),
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. ORDER ITEMS & ARTWORK LINKING
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  product_name VARCHAR(255) NOT NULL,
  selected_options JSONB NOT NULL, -- Storing exact snapshot of specifications
  quantity INT NOT NULL,
  unit_price_ngn NUMERIC(12, 2) NOT NULL,
  total_price_ngn NUMERIC(12, 2) NOT NULL,
  artwork_submission_type artwork_submission_enum DEFAULT 'direct_upload',
  artwork_file_url TEXT,
  artwork_file_format VARCHAR(20),
  artwork_file_size_mb NUMERIC(6, 2),
  artwork_bleed_confirmed BOOLEAN DEFAULT FALSE,
  turnaround_estimate VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. INDEXES FOR PRODUCTION QUERY PERFORMANCE
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(order_status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);
CREATE INDEX idx_order_items_order ON order_items(order_id);
`;

export interface ClientLogo {
  name: string;
  category: string;
  badge: string;
}

export const CLIENT_LOGOS: ClientLogo[] = [
  { name: 'Access Bank Plc', category: 'Commercial Banking', badge: 'Tier-1 Bank' },
  { name: 'Flutterwave', category: 'Fintech & Payments', badge: 'Tech Unicorn' },
  { name: 'Dangote Industries', category: 'Conglomerate & Manufacturing', badge: 'Corporate' },
  { name: 'MTN Nigeria', category: 'Telecommunications', badge: 'Telco' },
  { name: 'University of Lagos', category: 'Higher Education & Research', badge: 'Academic' },
  { name: 'Oando Clean Energy', category: 'Energy & Infrastructure', badge: 'Energy' },
  { name: 'Leadway Assurance', category: 'Insurance & Pension', badge: 'Finance' },
  { name: 'Redeemed Christian Church (RCCG)', category: 'Faith-Based Conventions', badge: 'Annual Events' },
];

export interface GoogleReview {
  id: string;
  author: string;
  avatar?: string;
  initial?: string;
  initialBg?: string;
  rating: number;
  date: string;
  review: string;
  verifiedOrder?: string;
  city?: string;
}

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: 'rev-1',
    author: 'Ariyo Marvelous',
    avatar: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    date: '5 months ago',
    review: 'I printed a rollup banner for my office campaign and the result was excellent. The design was clear, the stand was solid, and delivery was right on schedule without any delays.',
    verifiedOrder: 'Roll-Up Banner Stand',
    city: 'Nigeria',
  },
  {
    id: 'rev-2',
    author: 'Olumide Tos',
    initial: 'O',
    initialBg: 'bg-[#5b21b6]',
    rating: 5,
    date: '2 years ago',
    review: 'The establishment offered impeccably maintained merchandise. The layout was thoughtfully organized, customer care was top-notch and print output exceeded our expectations.',
    verifiedOrder: 'Corporate Merchandise & Print',
    city: 'Nigeria',
  },
  {
    id: 'rev-3',
    author: 'John Success',
    avatar: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    date: '3 years ago',
    review: 'I ordered for Flex Banner material, SAV sticker material and ABS. I received free shipping because it was my first large order and everything was in perfect condition.',
    verifiedOrder: 'Flex Banner, SAV Sticker & ABS',
    city: 'Nigeria',
  },
  {
    id: 'rev-4',
    author: 'Micheal Johnson',
    avatar: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    date: '3 years ago',
    review: '"I had a wonderful experience got my Promotional/promo table in time and I would highly recommend this business to anyone looking for reliable branding in Lagos."',
    verifiedOrder: 'Promotional / Promo Table',
    city: 'Lagos, Nigeria',
  },
  {
    id: 'rev-5',
    author: 'Mack Charmness',
    initial: 'M',
    initialBg: 'bg-[#166534]',
    rating: 5,
    date: '4 years ago',
    review: '"I was skeptical because their prices were so much cheaper than the other printers I looked at, but I got my Gazebo canopy tent delivered in 3 days and the quality blew me away."',
    verifiedOrder: 'Gazebo Canopy Tent',
    city: 'Nigeria',
  },
];

export interface CompletedJob {
  id: string;
  title: string;
  category: string;
  client: string;
  specs: string;
  imageUrl: string;
  location: string;
}

export const COMPLETED_JOBS: CompletedJob[] = [
  {
    id: 'job-1',
    title: 'Eko Convention Tech Summit Banners',
    category: 'Rollup Banners',
    client: 'Fintech Week Africa',
    specs: 'Broad Base Teardrop Aluminum | Solite Anti-Glare Film | 85x205cm',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=700&q=80',
    location: 'Victoria Island, Lagos',
  },
  {
    id: 'job-2',
    title: 'Executive Reception 3D Cast Sign',
    category: 'Corporate Signage',
    client: 'Venture Capital Partners',
    specs: '10mm Beveled Acrylic | Mirror Gold Face | Warm LED Halo',
    imageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=700&q=80',
    location: 'Ikoyi, Lagos',
  },
  {
    id: 'job-3',
    title: 'Luxury Kraft VIP Souvenir Hampers',
    category: 'Packaging',
    client: 'Annual Energy Symposium',
    specs: '250gsm Artboard | Matte Lamination | Gold Foil Deboss',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=700&q=80',
    location: 'Abuja CBD',
  },
  {
    id: 'job-4',
    title: 'Corporate Staff Pique Polos',
    category: 'Apparels',
    client: 'Leading Commercial Bank',
    specs: '220gsm Heavy Pique Cotton | 12,000 Stitch Precision Chest Embroidery',
    imageUrl: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=700&q=80',
    location: 'Nationwide Branches',
  },
];

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export const PRINT_FAQS: FaqItem[] = [
  {
    question: 'How fast can I receive my roll-up banners in Lagos or Abuja?',
    answer: 'Standard roll-up banner production takes 1–2 business days. For urgent corporate events in Lagos, we offer Same-Day / Next-Day Express Dispatch. For Abuja, Port Harcourt, and other states, direct location delivery to your address takes 2–3 business days upon your request.',
    category: 'Turnaround & Delivery',
  },
  {
    question: 'What file formats do you accept for print-ready artwork?',
    answer: 'We accept high-resolution PDF (preferred), CorelDraw (.CDR converted to curves), Adobe Illustrator (.AI), Adobe Photoshop (.PSD), and high-res PNG/TIFF at 300 DPI in CMYK color mode.',
    category: 'Artwork & Pre-Press',
  },
  {
    question: 'What if I do not have a design file ready right now?',
    answer: 'No problem! You can select "Hire Our Graphic Experts" during product customization to have our in-house pre-press team craft a bespoke corporate design for you, or select "Send Print-Ready File Later" to complete your checkout and forward your artwork via WhatsApp or email.',
    category: 'Artwork & Pre-Press',
  },
  {
    question: 'What is the difference between Luxury Broad Base and Standard Roll-up Banners?',
    answer: 'Luxury Roll-up Banners feature a weighted, teardrop-shaped solid aluminum cassette that requires no flip-out stabilizing feet, offering an executive, sleek profile favored by banks and VIP exhibitions. Standard Roll-up Banners feature two twist-out feet at the base, making them lightweight and budget-friendly for retail promos.',
    category: 'Product Specifications',
  },
  {
    question: 'How do I make payment for my order?',
    answer: 'Payments are made via WhatsApp transfer. Once you choose the product you want, message us directly on WhatsApp. Silver & Gold Inkshine Ltd will review your job and forward our official company account number for you to make payment.',
    category: 'Payments & Billing',
  },
  {
    question: 'Do you deliver nationwide across all 36 Nigerian states?',
    answer: 'Yes! We ship nationwide from our central production press in Somolu & Ikeja, Lagos. Parcels are safely packaged in heavy-duty padded travel sleeves and cartons to guarantee zero damage during interstate transit.',
    category: 'Turnaround & Delivery',
  },
];

