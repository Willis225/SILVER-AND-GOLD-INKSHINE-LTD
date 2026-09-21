import { Product } from '../types/schema';
import { SAMPLE_PRODUCTS } from './seedData';
import { applyImageLocksToProducts } from '../lib/imageLockRegistry';

/**
 * Complete catalog products for all homepage showcase sections.
 * Guarantees that any product displayed or clicked on the homepage
 * exists with identical title, price, image, and category in the catalog.
 */
export const HOMEPAGE_SHOWCASE_PRODUCTS: Product[] = [
  // 1. Annual Reports, Handbooks & Catalogues (Books & Magazines)
  {
    id: 'showcase-annual-reports',
    sku: 'BOK-ANN-REP-01',
    name: 'Annual Reports, Handbooks & Catalogues Printing',
    slug: 'annual-reports-handbooks-catalogues-printing',
    category: 'books_magazines',
    categoryLabel: 'Books & Magazines',
    categoryPlacement: 'stationery',
    shortDescription: 'Corporate Annual Reports, Financial Statements, Student Handbooks & Commercial Product Catalogues.',
    description: 'Engineered for banks, PLCs, government parastatals, churches, and academic institutions across Nigeria. High-definition 300 DPI CMYK printing, 300gsm matte-laminated cover, optional spot UV or gold foil accents, and square-spine PUR perfect or saddle-stitch binding.',
    basePriceNgn: 10000,
    minQuantity: 20,
    turnaroundDays: 3,
    badge: 'AGM Standard',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    optionGroups: [
      {
        id: 'opt-book-pages',
        name: 'Page Extent',
        type: 'size',
        required: true,
        options: [
          { id: 'pg-16', name: '16 Pages (Cover + 12 Inners)', code: '16_PAGES', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'pg-32', name: '32 Pages (Cover + 28 Inners)', code: '32_PAGES', priceModifierType: 'fixed', priceModifierValue: 8000 },
          { id: 'pg-64', name: '64 Pages (Comprehensive Report)', code: '64_PAGES', priceModifierType: 'fixed', priceModifierValue: 18000 },
        ],
      },
      {
        id: 'opt-binding',
        name: 'Binding Style',
        type: 'finishing',
        required: true,
        options: [
          { id: 'bd-perfect', name: 'Thermal Perfect Bound (Square Spine)', code: 'PERFECT', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'bd-saddle', name: 'Heavy-Duty Saddle Stitch (Stapled)', code: 'SADDLE', priceModifierType: 'fixed', priceModifierValue: -2000 },
        ],
      },
    ],
    bulkPricingTiers: [
      { minQuantity: 20, maxQuantity: 50, discountPercentage: 0, label: '20 - 50 copies' },
      { minQuantity: 51, maxQuantity: 100, discountPercentage: 10, label: '51 - 100 copies (10% off)' },
      { minQuantity: 101, maxQuantity: null, discountPercentage: 20, label: '100+ copies (20% off)' },
    ],
    artworkRequirements: {
      recommendedDpi: 300,
      supportedFormats: ['PDF', 'AI', 'INDD', 'CDR'],
      bleedMarginMm: 3,
      maxFileSizeMb: 80,
    },
  },

  // 2. Business Cards Printing in Lagos (Cards & Invitations)
  {
    id: 'stationery-business-cards',
    sku: 'STN-BC-LAG-01',
    name: 'Business Cards Printing in Lagos – Custom & Premium Cards',
    slug: 'business-cards-printing-in-lagos-custom-premium-cards',
    category: 'cards_invitations',
    categoryLabel: 'Cards & Invitations',
    categoryPlacement: 'stationery',
    shortDescription: 'Premium 400gsm artboard business cards with velvety matte lamination, spot UV, or metallic foil stamping.',
    description: 'Leave an unforgettable impression across Lagos and Nigeria with executive business cards. Precision trimmed with crisp sharp corners or elegant rounded corners, printed on ultra-heavy 400gsm artboard with double-sided protective matte lamination.',
    basePriceNgn: 20000,
    minQuantity: 100,
    turnaroundDays: 2,
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    optionGroups: [
      {
        id: 'opt-corner',
        name: 'Corner Style',
        type: 'finishing',
        required: true,
        options: [
          { id: 'c-sharp', name: 'Classic Sharp 90° Corners', code: 'SHARP', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'c-round', name: 'Smooth Rounded Corners', code: 'ROUND', priceModifierType: 'fixed', priceModifierValue: 2000 },
        ],
      },
      {
        id: 'opt-finish',
        name: 'Finishing Effect',
        type: 'finishing',
        required: false,
        options: [
          { id: 'f-matte', name: 'Matte Laminated (Both Sides)', code: 'MATTE', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'f-spot-uv', name: 'Raised Spot Gloss UV on Logo', code: 'SPOT_UV', priceModifierType: 'fixed', priceModifierValue: 6000 },
          { id: 'f-gold-foil', name: 'Metallic Gold Foil Stamped Accent', code: 'GOLD_FOIL', priceModifierType: 'fixed', priceModifierValue: 10000 },
        ],
      },
    ],
    bulkPricingTiers: [
      { minQuantity: 100, maxQuantity: 200, discountPercentage: 0, label: '100 - 200 pcs' },
      { minQuantity: 300, maxQuantity: 500, discountPercentage: 12, label: '300 - 500 pcs (12% off)' },
      { minQuantity: 600, maxQuantity: null, discountPercentage: 25, label: '600+ pcs (25% off)' },
    ],
    artworkRequirements: {
      recommendedDpi: 350,
      supportedFormats: ['PDF', 'AI', 'CDR', 'PSD'],
      bleedMarginMm: 3,
      maxFileSizeMb: 50,
    },
  },

  // 3. Premium Plastic Business Cards
  {
    id: 'stationery-plastic-cards',
    sku: 'STN-BC-PLS-01',
    name: 'Premium Plastic Business Cards',
    slug: 'premium-plastic-business-cards',
    category: 'cards_invitations',
    categoryLabel: 'Cards & Invitations',
    categoryPlacement: 'stationery',
    shortDescription: 'Frosted, transparent or solid PVC plastic business cards that are completely waterproof and tear-proof.',
    description: 'Ultra-durable, premium polymer plastic cards designed to last for years. Available in translucent frosted, optical clear, or solid white PVC with rounded corners.',
    basePriceNgn: 48000,
    minQuantity: 100,
    turnaroundDays: 4,
    badge: 'VIP Choice',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    optionGroups: [
      {
        id: 'opt-pvc-type',
        name: 'Plastic Material',
        type: 'material',
        required: true,
        options: [
          { id: 'pvc-frosted', name: 'Translucent Frosted PVC', code: 'FROSTED', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'pvc-clear', name: 'Crystal Clear Transparent', code: 'CLEAR', priceModifierType: 'fixed', priceModifierValue: 4000 },
          { id: 'pvc-white', name: 'Solid White Gloss PVC', code: 'WHITE', priceModifierType: 'fixed', priceModifierValue: 0 },
        ],
      },
    ],
    bulkPricingTiers: [
      { minQuantity: 100, maxQuantity: 200, discountPercentage: 0, label: '100 pcs' },
      { minQuantity: 300, maxQuantity: null, discountPercentage: 15, label: '300+ pcs (15% off)' },
    ],
    artworkRequirements: {
      recommendedDpi: 350,
      supportedFormats: ['PDF', 'AI', 'CDR'],
      bleedMarginMm: 3,
      maxFileSizeMb: 50,
    },
  },

  // 4. Certificate Printing in Lagos
  {
    id: 'stationery-certificates',
    sku: 'STN-CERT-01',
    name: 'Certificate Printing in Lagos – Professional Award & Academic Certificates',
    slug: 'certificate-printing-in-lagos-professional-award-academic',
    category: 'office_stationery',
    categoryLabel: 'Office Stationery & Corporate Branding',
    categoryPlacement: 'stationery',
    shortDescription: 'High-definition academic certificates, completion diplomas, and corporate award citations on 300gsm textured conqueror board with metallic gold foil seal.',
    description: 'Standard academic diplomas, executive certificates, and corporate training citations. Precision printed on archival-grade 300gsm ivory card or textured conqueror stock, with optional embossed metallic foil seals.',
    basePriceNgn: 1000,
    minQuantity: 10,
    turnaroundDays: 2,
    badge: 'Accredited',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    optionGroups: [
      {
        id: 'opt-cert-stock',
        name: 'Card Stock',
        type: 'material',
        required: true,
        options: [
          { id: 'cs-artcard', name: '300gsm Heavy Gloss Art Card', code: 'ART_CARD', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'cs-conqueror', name: '300gsm Textured Ivory Conqueror Board', code: 'CONQUEROR', priceModifierType: 'fixed', priceModifierValue: 450 },
        ],
      },
    ],
    bulkPricingTiers: [
      { minQuantity: 10, maxQuantity: 50, discountPercentage: 0, label: '10 - 50 pcs' },
      { minQuantity: 51, maxQuantity: 200, discountPercentage: 15, label: '51 - 200 pcs (15% off)' },
      { minQuantity: 201, maxQuantity: null, discountPercentage: 25, label: '201+ pcs (25% off)' },
    ],
    artworkRequirements: {
      recommendedDpi: 300,
      supportedFormats: ['PDF', 'AI', 'CDR'],
      bleedMarginMm: 3,
      maxFileSizeMb: 50,
    },
  },

  // 5. Book Printing in Lagos Nigeria
  {
    id: 'stationery-book-printing',
    sku: 'BOK-PRINT-LAG-01',
    name: 'Book Printing in Lagos Nigeria',
    slug: 'book-printing-in-lagos-nigeria',
    category: 'books_magazines',
    categoryLabel: 'Books & Magazines',
    categoryPlacement: 'stationery',
    shortDescription: 'Paperback and hardcover book publishing, novel printing, educational textbooks, and manuals with thermal PUR perfect binding.',
    description: 'Commercial book printing in Lagos for authors, publishers, educational institutions, and corporate bodies. Premium gloss or matte laminated full-color covers, 80gsm bond or 100gsm cream book paper, with durable spine binding.',
    basePriceNgn: 2400,
    minQuantity: 50,
    turnaroundDays: 5,
    badge: 'Publishing',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    optionGroups: [
      {
        id: 'opt-book-cover',
        name: 'Cover Finishing',
        type: 'finishing',
        required: true,
        options: [
          { id: 'cvr-gloss', name: 'High-Gloss Laminated Card Cover', code: 'GLOSS', priceModifierType: 'fixed', priceModifierValue: 0, isDefault: true },
          { id: 'cvr-matte', name: 'Velvet Matte Laminated Card Cover', code: 'MATTE', priceModifierType: 'fixed', priceModifierValue: 200 },
        ],
      },
    ],
    bulkPricingTiers: [
      { minQuantity: 50, maxQuantity: 100, discountPercentage: 0, label: '50 - 100 copies' },
      { minQuantity: 101, maxQuantity: 300, discountPercentage: 15, label: '101 - 300 copies (15% off)' },
      { minQuantity: 301, maxQuantity: null, discountPercentage: 25, label: '300+ copies (25% off)' },
    ],
    artworkRequirements: {
      recommendedDpi: 300,
      supportedFormats: ['PDF', 'AI', 'INDD'],
      bleedMarginMm: 3,
      maxFileSizeMb: 80,
    },
  },

  // 6. Nylon Printing Machine in Nigeria
  {
    id: 'showcase-nylon-printer',
    sku: 'MCH-NYLON-01',
    name: 'Nylon Printing Machine in Nigeria | Buy Packaging Printer',
    slug: 'nylon-printing-machine-in-nigeria-buy-packaging-printer',
    category: 'printing_machines',
    categoryLabel: 'Printing Machines',
    categoryPlacement: 'machines',
    shortDescription: 'Industrial flexographic and screen printing equipment for polythene bags, nylon packaging, and pouches.',
    description: 'Commercial flexographic and screen nylon printing setup for small and medium manufacturing enterprises in Nigeria. High ink transfer efficiency, rapid solvent-evaporation drying, and easy registration controls.',
    basePriceNgn: 24000,
    minQuantity: 1,
    turnaroundDays: 3,
    badge: 'Industrial',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    optionGroups: [],
    bulkPricingTiers: [],
    artworkRequirements: {
      recommendedDpi: 300,
      supportedFormats: ['PDF', 'CDR'],
      bleedMarginMm: 0,
      maxFileSizeMb: 50,
    },
  },

  // 7. Teardrop Banners
  {
    id: 'showcase-teardrop-banners',
    sku: 'BAN-TEAR-01',
    name: 'Teardrop Banners',
    slug: 'teardrop-banners',
    category: 'banners_stands',
    categoryLabel: 'Banners & Stands',
    categoryPlacement: 'banners',
    shortDescription: 'Aerodynamic teardrop flag banner with flexible fibreglass pole, cross base, and water weight bag for outdoor advertising.',
    description: 'High-visibility outdoor and event branding banner. Engineered with UV-resistant dye-sublimation print on knitted polyester, weather-resistant flexible pole assembly, and ground-spike or indoor water-bag base.',
    basePriceNgn: 70000,
    minQuantity: 1,
    turnaroundDays: 2,
    badge: 'Outdoor Special',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    optionGroups: [],
    bulkPricingTiers: [
      { minQuantity: 1, maxQuantity: 2, discountPercentage: 0, label: '1 - 2 units' },
      { minQuantity: 3, maxQuantity: null, discountPercentage: 10, label: '3+ units (10% off)' },
    ],
    artworkRequirements: {
      recommendedDpi: 150,
      supportedFormats: ['PDF', 'CDR', 'AI'],
      bleedMarginMm: 5,
      maxFileSizeMb: 60,
    },
  },

  // 8. Souvenirs Bags
  {
    id: 'showcase-souvenir-bags',
    sku: 'BAG-SOUV-01',
    name: 'Souvenirs Bags',
    slug: 'souvenirs-bags',
    category: 'paper_bags_tags',
    categoryLabel: 'Paper Bags & Tags',
    categoryPlacement: 'packaging',
    shortDescription: 'Custom branded carrier gift bags for wedding souvenirs, corporate AGM hampers, and birthdays.',
    description: 'High-strength paper carrier bags with reinforced base cardboard, rope handles, and brilliant full-color photographic printing with glossy or matte protective film.',
    basePriceNgn: 1300,
    minQuantity: 50,
    turnaroundDays: 3,
    badge: 'Event Essential',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    optionGroups: [],
    bulkPricingTiers: [
      { minQuantity: 50, maxQuantity: 100, discountPercentage: 0, label: '50 - 100 pcs' },
      { minQuantity: 101, maxQuantity: null, discountPercentage: 15, label: '100+ pcs (15% off)' },
    ],
    artworkRequirements: {
      recommendedDpi: 300,
      supportedFormats: ['PDF', 'AI', 'CDR'],
      bleedMarginMm: 3,
      maxFileSizeMb: 50,
    },
  },

  // 9. Luxury Rollup Banner Stand
  {
    id: 'showcase-luxury-rollup',
    sku: 'BAN-LUX-01',
    name: 'Luxury Rollup Banner Stand (Teardrop Chrome Base)',
    slug: 'luxury-rollup-banner-stand-teardrop-chrome-base',
    category: 'banners_stands',
    categoryLabel: 'Banners & Stands',
    categoryPlacement: 'banners',
    shortDescription: 'Executive chrome teardrop cassette with premium anti-curl Solite media for corporate events.',
    description: 'The definitive corporate rollup display in Nigeria. Solid cast-aluminum teardrop cassette with mirror-finished chrome end caps, anti-curl photographic Solite substrate, and padded carrying case.',
    basePriceNgn: 34500,
    minQuantity: 1,
    turnaroundDays: 1,
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    optionGroups: [],
    bulkPricingTiers: [
      { minQuantity: 1, maxQuantity: 2, discountPercentage: 0, label: '1 - 2 stands' },
      { minQuantity: 3, maxQuantity: null, discountPercentage: 10, label: '3+ stands (10% off)' },
    ],
    artworkRequirements: {
      recommendedDpi: 200,
      supportedFormats: ['PDF', 'AI', 'CDR', 'PSD'],
      bleedMarginMm: 5,
      maxFileSizeMb: 60,
    },
  },

  // 10. Waterbase Poster Signs
  {
    id: 'display-waterbase-poster',
    sku: 'BAN-WTR-01',
    name: 'Waterbase Poster Signs',
    slug: 'waterbase-poster-signs',
    category: 'banners_stands',
    categoryLabel: 'Banners & Stands',
    categoryPlacement: 'banners',
    shortDescription: 'Heavy-duty pavement waterbase sign with dual-sided snap frames and high-tension springs.',
    description: 'Heavyweight outdoor pavement display board with water or sand-fillable wheeled base. Withstands gusty wind conditions with dual high-tension steel coil springs and protective anti-glare PVC sheets.',
    basePriceNgn: 170000,
    minQuantity: 1,
    turnaroundDays: 3,
    badge: 'Windproof',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    optionGroups: [],
    bulkPricingTiers: [],
    artworkRequirements: { recommendedDpi: 200, supportedFormats: ['PDF', 'CDR'], bleedMarginMm: 3, maxFileSizeMb: 50 },
  },

  // 11. Instagram Frame
  {
    id: 'display-instagram-frame',
    sku: 'BAN-IGF-01',
    name: 'Instagram Frame',
    slug: 'instagram-frame',
    category: 'banners_stands',
    categoryLabel: 'Banners & Stands',
    categoryPlacement: 'banners',
    shortDescription: 'Life-size social media photo selfie cutout board for events, birthdays, weddings and brand activations.',
    description: 'Rigid 5mm foam board cutout featuring custom usernames, profile avatars, hashtags, and like counters. Perfect for engaging guests and capturing viral moments at corporate and private celebrations.',
    basePriceNgn: 25000,
    minQuantity: 1,
    turnaroundDays: 1,
    badge: 'Party Favorite',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    optionGroups: [],
    bulkPricingTiers: [],
    artworkRequirements: { recommendedDpi: 200, supportedFormats: ['PDF', 'AI'], bleedMarginMm: 3, maxFileSizeMb: 50 },
  },

  // 12. Giant Pole Feather Flag Banner 5.5m
  {
    id: 'display-giant-pole-flag',
    sku: 'BAN-POLE-55M',
    name: 'Giant Pole Feather Flag Banner 5.5m',
    slug: 'giant-pole-feather-flag-banner-5-5m',
    category: 'banners_stands',
    categoryLabel: 'Banners & Stands',
    categoryPlacement: 'banners',
    shortDescription: 'Massive 5.5-meter outdoor flag banner with interlocking telescopic aluminum pole and heavy base.',
    description: 'Maximum outdoor visibility for estate development sites, car dealerships, gas stations, and mega conventions. Highly visible from hundreds of meters away.',
    basePriceNgn: 160000,
    minQuantity: 1,
    turnaroundDays: 3,
    badge: 'Mega Impact',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80',
    optionGroups: [],
    bulkPricingTiers: [],
    artworkRequirements: { recommendedDpi: 150, supportedFormats: ['PDF', 'CDR'], bleedMarginMm: 5, maxFileSizeMb: 60 },
  },

  // 13. Advertisement Backdrop Banner
  {
    id: 'display-backdrop-banner',
    sku: 'BAN-BKD-01',
    name: 'Advertisement Backdrop Banner',
    slug: 'advertisement-backdrop-banner',
    category: 'banners_stands',
    categoryLabel: 'Banners & Stands',
    categoryPlacement: 'banners',
    shortDescription: 'Expansive 8ft x 8ft / 10ft x 10ft red-carpet media step-and-repeat backdrop with telescopic stand.',
    description: 'Standard red-carpet photo call backdrop banner. Non-reflective matte vinyl printing prevents camera flash glare while rendering sponsor logos with immaculate clarity.',
    basePriceNgn: 180000,
    minQuantity: 1,
    turnaroundDays: 2,
    badge: 'Red Carpet',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    optionGroups: [],
    bulkPricingTiers: [],
    artworkRequirements: { recommendedDpi: 150, supportedFormats: ['PDF', 'AI', 'CDR'], bleedMarginMm: 5, maxFileSizeMb: 70 },
  },

  // 14. Drawstring Bag Printing
  {
    id: 'gift-drawstring-bag',
    sku: 'GFT-DRW-01',
    name: 'Drawstring Bag Printing',
    slug: 'drawstring-bag-printing',
    category: 'gift_items_souvenirs',
    categoryLabel: 'Gift Items & Souvenirs',
    categoryPlacement: 'gifts',
    shortDescription: 'Lightweight waterproof polyester or organic cotton cinch backpack with full-color screen print.',
    description: 'High-utility souvenir bag for sports tournaments, school sports days, campus student welcome packs, and marathon events across Nigeria.',
    basePriceNgn: 2000,
    minQuantity: 25,
    turnaroundDays: 3,
    badge: 'Sport & Casual',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    optionGroups: [],
    bulkPricingTiers: [],
    artworkRequirements: { recommendedDpi: 300, supportedFormats: ['PDF', 'AI'], bleedMarginMm: 3, maxFileSizeMb: 40 },
  },

  // 15. Custom Pop Socket Phone Holder
  {
    id: 'gift-pop-socket',
    sku: 'GFT-POP-01',
    name: 'Custom Pop Socket Phone Holder',
    slug: 'custom-pop-socket-phone-holder',
    category: 'gift_items_souvenirs',
    categoryLabel: 'Gift Items & Souvenirs',
    categoryPlacement: 'gifts',
    shortDescription: 'Collapsible mobile grip and stand with full-color UV epoxy dome logo branding.',
    description: 'Affordable, high-retention corporate merchandise. Sticks firmly to any smartphone case, providing a comfortable grip and desk stand.',
    basePriceNgn: 1999,
    minQuantity: 50,
    turnaroundDays: 2,
    badge: 'Tech Swag',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    optionGroups: [],
    bulkPricingTiers: [],
    artworkRequirements: { recommendedDpi: 300, supportedFormats: ['PDF', 'AI'], bleedMarginMm: 2, maxFileSizeMb: 30 },
  },

  // 16. Custom Jute Bag Printing in Nigeria
  {
    id: 'gift-jute-bag',
    sku: 'GFT-JUT-01',
    name: 'Custom Jute Bag Printing in Nigeria',
    slug: 'custom-jute-bag-printing-in-nigeria',
    category: 'paper_bags_tags',
    categoryLabel: 'Paper Bags & Tags',
    categoryPlacement: 'gifts',
    shortDescription: 'Eco-friendly natural burlap jute tote bag with cotton padded handles and laminated inner lining.',
    description: 'Sustainable, premium conference carrier bag. Highly durable natural burlap woven fiber with waterproof interior lamination.',
    basePriceNgn: 3500,
    minQuantity: 30,
    turnaroundDays: 3,
    badge: 'Eco Premium',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    optionGroups: [],
    bulkPricingTiers: [],
    artworkRequirements: { recommendedDpi: 300, supportedFormats: ['PDF', 'AI'], bleedMarginMm: 3, maxFileSizeMb: 40 },
  },

  // 17. Custom Wristband Printing in Lagos
  {
    id: 'gift-wristband',
    sku: 'GFT-WRS-01',
    name: 'Custom Wristband Printing in Lagos, Nigeria – Silicone, Fabric & Rubber Bands',
    slug: 'custom-wristband-printing-in-lagos-nigeria-silicone-fabric',
    category: 'gift_items_souvenirs',
    categoryLabel: 'Gift Items & Souvenirs',
    categoryPlacement: 'gifts',
    shortDescription: 'Debossed, color-filled, or screen-printed silicone rubber and festival woven fabric wristbands.',
    description: 'Access control and promotional wristbands for parties, youth camps, conferences, and charity awareness campaigns.',
    basePriceNgn: 1200,
    minQuantity: 100,
    turnaroundDays: 2,
    badge: 'Event Access',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    optionGroups: [],
    bulkPricingTiers: [],
    artworkRequirements: { recommendedDpi: 300, supportedFormats: ['PDF', 'AI'], bleedMarginMm: 2, maxFileSizeMb: 30 },
  },

  // 18. Design and Print custom branded pouch Packaging in Lagos
  {
    id: 'pkg-pouch-packaging',
    sku: 'PKG-PCH-01',
    name: 'Design and Print custom branded pouch Packaging in Lagos',
    slug: 'design-and-print-custom-branded-pouch-packaging-in-lagos',
    category: 'packaging_shipping_cartons',
    categoryLabel: 'Packaging and Shipping Cartons',
    categoryPlacement: 'packaging',
    shortDescription: 'Food-grade resealable stand-up zip lock aluminum foil and kraft pouches for food, spices, and cosmetics.',
    description: 'High-barrier airtight barrier pouches for food snacks, chin-chin, coffee, seasonings, herbs, and beauty products.',
    basePriceNgn: 85,
    minQuantity: 500,
    turnaroundDays: 5,
    badge: 'Food Grade',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    optionGroups: [],
    bulkPricingTiers: [],
    artworkRequirements: { recommendedDpi: 300, supportedFormats: ['PDF', 'AI'], bleedMarginMm: 3, maxFileSizeMb: 50 },
  },

  // 19. Custom Woven Labels
  {
    id: 'pkg-woven-labels',
    sku: 'PKG-WVN-01',
    name: 'Custom Woven Labels',
    slug: 'custom-woven-labels',
    category: 'stickers_labels',
    categoryLabel: 'Stickers & Labels',
    categoryPlacement: 'packaging',
    shortDescription: 'High-density damask woven fabric neck tags and seam care labels for fashion brands and tailors.',
    description: 'Ultra-fine thread damask woven labels that do not scratch skin. End-folded, center-folded, or heat-sealed.',
    basePriceNgn: 85,
    minQuantity: 500,
    turnaroundDays: 4,
    badge: 'Fashion Essential',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
    optionGroups: [],
    bulkPricingTiers: [],
    artworkRequirements: { recommendedDpi: 300, supportedFormats: ['PDF', 'AI'], bleedMarginMm: 2, maxFileSizeMb: 30 },
  },

  // 20. Ice Cream Cups
  {
    id: 'pkg-ice-cream-cups',
    sku: 'PKG-ICM-01',
    name: 'Ice Cream Cups',
    slug: 'ice-cream-cups',
    category: 'food_packaging',
    categoryLabel: 'Food Packaging',
    categoryPlacement: 'packaging',
    shortDescription: 'Leak-proof poly-coated paper dessert and yogurt tubs with optional dome lids.',
    description: 'Heavy-duty PE lined cardboard cups designed for frozen desserts, artisan ice cream, gelato, and parfaits.',
    basePriceNgn: 900,
    minQuantity: 100,
    turnaroundDays: 3,
    badge: 'Food Safe',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    optionGroups: [],
    bulkPricingTiers: [],
    artworkRequirements: { recommendedDpi: 300, supportedFormats: ['PDF', 'AI'], bleedMarginMm: 3, maxFileSizeMb: 40 },
  },

  // 21. Custom Paper Bags (A3 size)
  {
    id: 'pkg-paper-bags-a3',
    sku: 'PKG-PBG-A3',
    name: 'Custom Paper Bags (A3 size)',
    slug: 'custom-paper-bags-a3-size',
    category: 'paper_bags_tags',
    categoryLabel: 'Paper Bags & Tags',
    categoryPlacement: 'packaging',
    shortDescription: 'Extra-large A3 boutique shopping bags with reinforced bottom card and thick rope handles.',
    description: 'Premium retail packaging for clothing boutiques, luxury shoeboxes, and corporate event gifts.',
    basePriceNgn: 1000,
    minQuantity: 100,
    turnaroundDays: 3,
    badge: 'Boutique',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    optionGroups: [],
    bulkPricingTiers: [],
    artworkRequirements: { recommendedDpi: 300, supportedFormats: ['PDF', 'AI'], bleedMarginMm: 3, maxFileSizeMb: 50 },
  },

  // 22. A3 Poster
  {
    id: 'event-a3-poster',
    sku: 'EVT-PST-A3',
    name: 'A3 Poster',
    slug: 'a3-poster',
    category: 'flyers_handbills',
    categoryLabel: 'Flyer & Handbill Printing',
    categoryPlacement: 'events',
    shortDescription: 'Vibrant 150gsm / 250gsm gloss art poster printing for concert announcements, church conferences, and product promos.',
    description: 'High-definition color art paper posters with UV-gloss protective coating.',
    basePriceNgn: 370,
    minQuantity: 50,
    turnaroundDays: 2,
    badge: 'Promo Special',
    image: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&w=800&q=80',
    optionGroups: [],
    bulkPricingTiers: [],
    artworkRequirements: { recommendedDpi: 300, supportedFormats: ['PDF', 'AI'], bleedMarginMm: 3, maxFileSizeMb: 40 },
  },

  // 23. POS Banners
  {
    id: 'event-pos-banners',
    sku: 'EVT-POS-01',
    name: 'POS Banners',
    slug: 'pos-banners',
    category: 'banners_stands',
    categoryLabel: 'Banners & Stands',
    categoryPlacement: 'events',
    shortDescription: 'Point-of-sale counter stands, tabletop mini rollups, and shelf-talkers for supermarket displays.',
    description: 'Compact point-of-sale branding items that draw customer eyes directly to promotional pricing at payment counters.',
    basePriceNgn: 4900,
    minQuantity: 5,
    turnaroundDays: 1,
    badge: 'Retail POS',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    optionGroups: [],
    bulkPricingTiers: [],
    artworkRequirements: { recommendedDpi: 300, supportedFormats: ['PDF', 'AI'], bleedMarginMm: 3, maxFileSizeMb: 40 },
  },

  // 24. Wall Pictures & Photo Frames
  {
    id: 'event-wall-frames',
    sku: 'EVT-WLL-01',
    name: 'Wall Pictures & Photo Frames',
    slug: 'wall-pictures-photo-frames',
    category: 'frames_wallarts',
    categoryLabel: 'Frames & Wall Arts',
    categoryPlacement: 'events',
    shortDescription: 'Museum-grade wrapped canvas prints, floating wooden frames, and acrylic wall plaques.',
    description: 'Transform memories, corporate mission statements, or executive portraits into stunning gallery wall art.',
    basePriceNgn: 10000,
    minQuantity: 1,
    turnaroundDays: 3,
    badge: 'Interior Art',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    optionGroups: [],
    bulkPricingTiers: [],
    artworkRequirements: { recommendedDpi: 300, supportedFormats: ['PDF', 'AI', 'JPEG'], bleedMarginMm: 10, maxFileSizeMb: 60 },
  },

  // 25. Spin To Win Wheel
  {
    id: 'event-spin-wheel',
    sku: 'EVT-SPN-01',
    name: 'Spin To Win Wheel',
    slug: 'spin-to-win-wheel',
    category: 'events_exhibitions',
    categoryLabel: 'Events & Exhibitions',
    categoryPlacement: 'events',
    shortDescription: 'Interactive lucky draw prize wheel with clicker pointer and sturdy tripod stand for brand activations.',
    description: 'Guaranteed crowd magnet for exhibition booths, supermarket activations, trade fairs, and roadshows across Nigeria.',
    basePriceNgn: 175000,
    minQuantity: 1,
    turnaroundDays: 2,
    badge: 'Crowd Magnet',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    optionGroups: [],
    bulkPricingTiers: [],
    artworkRequirements: { recommendedDpi: 200, supportedFormats: ['PDF', 'AI'], bleedMarginMm: 5, maxFileSizeMb: 50 },
  },

  // 26. 3D Signs in Lagos Nigeria
  {
    id: 'signage-3d-signs',
    sku: 'SGN-3D-EXT-01',
    name: '3D Signs in Lagos Nigeria | Custom 3D Signage for Businesses',
    slug: '3d-signs-in-lagos-nigeria-custom-signage',
    category: 'signages',
    categoryLabel: 'Signages',
    categoryPlacement: 'signage',
    shortDescription: 'Bold, professional 3D acrylic signs, 3D channel letters and illuminated exterior signage that gives your brand a strong physical presence.',
    description: 'Whether you need 3D logo signs, 3D acrylic signs, 3D wall signs, 3D shop signs, 3D letter signs or illuminated 3D signage, we help you create a bold, professional and attractive sign that gives your brand a strong physical presence.',
    basePriceNgn: 70000,
    minQuantity: 1,
    turnaroundDays: 4,
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&w=800&q=80',
    optionGroups: [],
    bulkPricingTiers: [],
    artworkRequirements: { recommendedDpi: 300, supportedFormats: ['PDF', 'AI', 'CDR', 'DWG'], bleedMarginMm: 0, maxFileSizeMb: 70 },
  },

  // 27. Logo Signage in Lagos Nigeria
  {
    id: 'signage-logo-signs',
    sku: 'SGN-LGO-01',
    name: 'Logo Signage in Lagos Nigeria | Custom Business Logo Signs',
    slug: 'logo-signage-in-lagos-nigeria-custom-business-logo-signs',
    category: 'signages',
    categoryLabel: 'Signages',
    categoryPlacement: 'signage',
    shortDescription: 'Custom laser-cut acrylic and brushed aluminum office reception logo signs.',
    description: 'Elevate your reception wall and office entrance with precision laser-profiled logo emblems mounted on standoffs.',
    basePriceNgn: 37000,
    minQuantity: 1,
    turnaroundDays: 3,
    badge: 'Corporate Standard',
    image: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&w=800&q=80',
    optionGroups: [],
    bulkPricingTiers: [],
    artworkRequirements: { recommendedDpi: 300, supportedFormats: ['PDF', 'AI', 'CDR'], bleedMarginMm: 0, maxFileSizeMb: 50 },
  },

  // 28. Directional Signage in Lagos Nigeria
  {
    id: 'signage-directional',
    sku: 'SGN-DIR-01',
    name: 'Directional Signage in Lagos Nigeria | Custom Wayfinding Signs',
    slug: 'directional-signage-in-lagos-nigeria-custom-wayfinding-signs',
    category: 'signages',
    categoryLabel: 'Signages',
    categoryPlacement: 'signage',
    shortDescription: 'Wayfinding, floor directory, and safety exit signage systems for estates, plazas, hospitals, and corporate towers.',
    description: 'Architectural grade modular wayfinding boards made with aluminum composite panel (ACP) or reflective acrylic.',
    basePriceNgn: 27000,
    minQuantity: 1,
    turnaroundDays: 3,
    badge: 'Wayfinding',
    image: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&w=800&q=80',
    optionGroups: [],
    bulkPricingTiers: [],
    artworkRequirements: { recommendedDpi: 300, supportedFormats: ['PDF', 'AI'], bleedMarginMm: 0, maxFileSizeMb: 50 },
  },

  // 29. Electronic Digital Signage in Lagos Nigeria
  {
    id: 'signage-digital-display',
    sku: 'SGN-DGT-01',
    name: 'Electronic Digital Signage in Lagos Nigeria | Digital Display Signs',
    slug: 'electronic-digital-signage-in-lagos-nigeria-digital-display-signs',
    category: 'signages',
    categoryLabel: 'Signages',
    categoryPlacement: 'signage',
    shortDescription: 'Commercial high-brightness P2.5, P3, and P4 indoor and outdoor LED billboard video display screens.',
    description: 'Full-color ultra-bright LED electronic advertising screens with wireless content management and weatherproof IP65 rating.',
    basePriceNgn: 2400000,
    minQuantity: 1,
    turnaroundDays: 7,
    badge: 'Commercial LED',
    image: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&w=800&q=80',
    optionGroups: [],
    bulkPricingTiers: [],
    artworkRequirements: { recommendedDpi: 150, supportedFormats: ['MP4', 'PDF', 'JPEG'], bleedMarginMm: 0, maxFileSizeMb: 100 },
  },

  // 30. Customized Branded Crystal Glass Award Plaque
  {
    id: 'award-crystal-plaque',
    sku: 'AWD-CRY-01',
    name: 'Customized Branded Crystal Glass Award Plaque Printing in Lagos | Custom Award Plaques',
    slug: 'customized-branded-crystal-glass-award-plaque-printing-in-lagos',
    category: 'awards',
    categoryLabel: 'Awards',
    categoryPlacement: 'awards',
    shortDescription: 'Hand-polished K9 optical crystal plaques with 3D internal laser etching or surface UV color printing.',
    description: 'Prestigious merit awards for government valedictory summits, annual general meetings, and employee milestone honors.',
    basePriceNgn: 34000,
    minQuantity: 1,
    turnaroundDays: 2,
    badge: 'Excellence',
    image: 'https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&w=800&q=80',
    optionGroups: [],
    bulkPricingTiers: [],
    artworkRequirements: { recommendedDpi: 300, supportedFormats: ['PDF', 'AI'], bleedMarginMm: 0, maxFileSizeMb: 40 },
  },

  // 31. Wooden Award Plaque
  {
    id: 'award-wooden-plaque',
    sku: 'AWD-WOD-01',
    name: 'Wooden Award Plaque',
    slug: 'wooden-award-plaque',
    category: 'awards',
    categoryLabel: 'Awards',
    categoryPlacement: 'awards',
    shortDescription: 'Rich polished mahogany finish wooden plaque with gold or silver engraved metallic plate.',
    description: 'Classic and dignified corporate plaques for staff appreciation, military honors, and church fellowship citations.',
    basePriceNgn: 16500,
    minQuantity: 1,
    turnaroundDays: 2,
    badge: 'Classic',
    image: 'https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&w=800&q=80',
    optionGroups: [],
    bulkPricingTiers: [],
    artworkRequirements: { recommendedDpi: 300, supportedFormats: ['PDF', 'AI'], bleedMarginMm: 0, maxFileSizeMb: 40 },
  },

  // 32. Custom Branded Acrylic Award Plaque
  {
    id: 'award-acrylic-plaque',
    sku: 'AWD-ACR-01',
    name: 'Custom Branded Acrylic Award Plaque Printing in Lagos',
    slug: 'custom-branded-acrylic-award-plaque-printing-in-lagos',
    category: 'awards',
    categoryLabel: 'Awards',
    categoryPlacement: 'awards',
    shortDescription: 'Clear 15mm cast acrylic freestanding awards with diamond-polished beveled edges.',
    description: 'Modern aesthetic recognition trophies with direct high-definition UV white and full-color backing.',
    basePriceNgn: 24000,
    minQuantity: 1,
    turnaroundDays: 2,
    badge: 'Modern',
    image: 'https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&w=800&q=80',
    optionGroups: [],
    bulkPricingTiers: [],
    artworkRequirements: { recommendedDpi: 300, supportedFormats: ['PDF', 'AI'], bleedMarginMm: 0, maxFileSizeMb: 40 },
  },

  // 33. Custom Engraved Star Award Trophy & Medals
  {
    id: 'award-star-trophy',
    sku: 'AWD-STR-01',
    name: 'Custom Engraved Star Award Trophy & Medals',
    slug: 'custom-engraved-star-award-trophy-medals',
    category: 'awards',
    categoryLabel: 'Awards',
    categoryPlacement: 'awards',
    shortDescription: 'Gold-plated cast metal star trophy atop a solid black marble base with personalized engraving.',
    description: 'Award outstanding performance in entertainment, sports, corporate sales, and academic excellence.',
    basePriceNgn: 18500,
    minQuantity: 1,
    turnaroundDays: 2,
    badge: 'Star Performer',
    image: 'https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&w=800&q=80',
    optionGroups: [],
    bulkPricingTiers: [],
    artworkRequirements: { recommendedDpi: 300, supportedFormats: ['PDF', 'AI'], bleedMarginMm: 0, maxFileSizeMb: 40 },
  },

  // 34. Custom Branded Center Rug Printing
  {
    id: 'sidebar-prod-2',
    sku: 'FRM-RUG-01',
    name: 'Custom Branded Center Rug Printing',
    slug: 'custom-branded-center-rug-printing',
    category: 'frames_wallarts',
    categoryLabel: 'Frames & Wall Arts',
    categoryPlacement: 'paintings',
    shortDescription: 'High-definition personalized floor rugs and corporate reception center carpets with anti-skid backing.',
    description: 'Bespoke high-density plush pile center rugs printed with family crests, corporate logos, or bespoke interior motifs.',
    basePriceNgn: 100000,
    minQuantity: 1,
    turnaroundDays: 4,
    badge: 'Luxury Decor',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    optionGroups: [],
    bulkPricingTiers: [],
    artworkRequirements: { recommendedDpi: 200, supportedFormats: ['PDF', 'JPEG', 'TIFF'], bleedMarginMm: 5, maxFileSizeMb: 80 },
  },

  // 35. Foot Mat in Lagos, Nigeria
  {
    id: 'sidebar-prod-1',
    sku: 'GFT-MAT-01',
    name: 'Foot Mat in Lagos, Nigeria – Custom Branded Door & Entrance Mats',
    slug: 'foot-mat-in-lagos-nigeria-custom-branded-door-entrance-mats',
    category: 'gift_items_souvenirs',
    categoryLabel: 'Gift Items & Souvenirs',
    categoryPlacement: 'gifts',
    shortDescription: 'Heavy-duty non-slip custom doormats for offices, residential homes, and retail stores.',
    description: 'Weatherproof entrance doormats with deep fiber bristles that scrape dirt and moisture while displaying your brand greeting.',
    basePriceNgn: 10000,
    minQuantity: 1,
    turnaroundDays: 2,
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=800&q=80',
    optionGroups: [],
    bulkPricingTiers: [],
    artworkRequirements: { recommendedDpi: 200, supportedFormats: ['PDF', 'AI'], bleedMarginMm: 3, maxFileSizeMb: 40 },
  },

  // 36. Key Holder & Keychain Printing
  {
    id: 'sidebar-prod-3',
    sku: 'GFT-KEY-01',
    name: 'Key Holder & Keychain Printing in Lagos, Nigeria – Custom Branded Keyholders',
    slug: 'key-holder-keychain-printing-in-lagos-nigeria',
    category: 'gift_items_souvenirs',
    categoryLabel: 'Gift Items & Souvenirs',
    categoryPlacement: 'gifts',
    shortDescription: 'Acrylic, metal, and leather keyholders printed with full-color logos for weddings and corporate souvenirs.',
    description: 'High-utility everyday carry gift item with durable stainless steel split ring and brilliant UV print.',
    basePriceNgn: 1000,
    minQuantity: 50,
    turnaroundDays: 2,
    badge: 'Souvenir Favorite',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    optionGroups: [],
    bulkPricingTiers: [],
    artworkRequirements: { recommendedDpi: 300, supportedFormats: ['PDF', 'AI'], bleedMarginMm: 2, maxFileSizeMb: 30 },
  },

  // 37. Custom Branded Water Bottle Printing
  {
    id: 'sidebar-prod-4',
    sku: 'GFT-BOT-01',
    name: 'Custom Branded Water Bottle Printing in Lagos, Nigeria – Custom & Personalized Bottles',
    slug: 'custom-branded-water-bottle-printing-in-lagos-nigeria',
    category: 'gift_items_souvenirs',
    categoryLabel: 'Gift Items & Souvenirs',
    categoryPlacement: 'gifts',
    shortDescription: 'Insulated stainless steel vacuum flasks and BPA-free sports drink bottles with 360° rotary UV print.',
    description: 'Keep beverages hot for 12 hours or ice cold for 24 hours. Full cylindrical rotary branding with laser engraving.',
    basePriceNgn: 3500,
    minQuantity: 20,
    turnaroundDays: 2,
    badge: 'Corporate Gift',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
    optionGroups: [],
    bulkPricingTiers: [],
    artworkRequirements: { recommendedDpi: 300, supportedFormats: ['PDF', 'AI'], bleedMarginMm: 2, maxFileSizeMb: 40 },
  },
];

/**
 * Normalizes any category tag (e.g. shorthand 'stationery', 'banners', 'packaging', 'annual_reports')
 * to its exact key in SCREENSHOT_CATEGORIES.
 */
export function normalizeCategoryKey(key: any): string {
  const k = String(key || '').toLowerCase().trim();
  if (k === 'stationery' || k === 'office') return 'office_stationery';
  if (k === 'cards' || k === 'business_cards') return 'cards_invitations';
  if (k === 'books' || k === 'magazines' || k === 'annual_reports' || k === 'handbooks') return 'books_magazines';
  if (k === 'banners' || k === 'stands') return 'banners_stands';
  if (k === 'gifts' || k === 'gifts_promotional' || k === 'souvenirs') return 'gift_items_souvenirs';
  if (k === 'packaging') return 'packaging_shipping_cartons';
  if (k === 'bags' || k === 'paper_bags') return 'paper_bags_tags';
  if (k === 'food') return 'food_packaging';
  if (k === 'stickers' || k === 'labels') return 'stickers_labels';
  if (k === 'events' || k === 'exhibitions') return 'events_exhibitions';
  if (k === 'signage' || k === 'signs') return 'signages';
  if (k === 'awards' || k === 'plaques') return 'awards';
  if (k === 'frames' || k === 'wallarts' || k === 'canvas') return 'frames_wallarts';
  if (k === 'machines') return 'printing_machines';
  if (k === 'flyers') return 'flyers_handbills';
  if (k === 'apparels' || k === 'caps') return 'custom_apparels_caps';
  return k;
}

/**
 * Ensures that any products array always contains every single homepage showcase product
 * and seed sample product, while strictly preserving all custom products and photos uploaded
 * from mobile phones or desktop computers.
 */
export function ensureCompleteCatalog(baseProducts: Product[]): Product[] {
  const existingMap = new Map<string, Product>();
  
  // 1. First insert all base products (user edits, phone uploads, and Firestore documents take highest priority)
  (baseProducts || []).forEach((p) => {
    if (p && p.id) {
      existingMap.set(p.id, p);
    }
  });

  // 2. Add any seed products from SAMPLE_PRODUCTS not yet present
  (SAMPLE_PRODUCTS || []).forEach((sp) => {
    if (sp && sp.id && !existingMap.has(sp.id)) {
      existingMap.set(sp.id, sp);
    }
  });

  // 3. Ensure every showcase product is present
  HOMEPAGE_SHOWCASE_PRODUCTS.forEach((hp) => {
    if (hp && hp.id && !existingMap.has(hp.id)) {
      existingMap.set(hp.id, hp);
    }
  });

  return applyImageLocksToProducts(Array.from(existingMap.values()));
}
