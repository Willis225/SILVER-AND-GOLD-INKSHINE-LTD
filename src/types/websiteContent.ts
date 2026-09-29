/**
 * Dynamic Website Content CMS Schema & Defaults
 * Allows full admin control over hero carousel, showcase services, text copy, and media.
 */

export interface HeroSlideItem {
  id: string;
  title: string;
  badge: string;
  caption: string;
  imageUrl: string;
  category: string;
  aspectRatio?: string;
}

export interface ShowcaseServiceItem {
  id: string;
  title: string;
  price: string;
  imageUrl: string;
  category: string;
  badge?: string;
  description?: string;
}

export interface WebsiteContent {
  // Hero Section
  heroHeadline: string;
  heroSubheadline: string;
  heroEyebrow: string;
  heroDescription: string;
  heroBackgroundImage?: string;
  heroSlides: HeroSlideItem[];

  // Services Showcase Section
  showcaseTitle: string;
  showcaseDescription: string;
  showcaseServices: ShowcaseServiceItem[];

  // Why Choose Us Section
  whyChooseTitle: string;
  whyChooseDescription: string;

  // Company Information & Contacts
  companyName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  googlePreferredSourceUrl: string;
  googleMapsUrl: string;
  googleMapsEmbedUrl: string;
}

export const DEFAULT_HERO_SLIDES: HeroSlideItem[] = [
  {
    id: 'slide-1',
    title: 'Showcase 1 - Silver & Gold Inkshine Ltd',
    badge: 'Featured',
    caption: 'Commercial print and brand presentation showcase.',
    imageUrl: 'https://cdn.hstockplus.org/uploads/public/img-1789638023483-0654f1a516c4673a.webp',
    category: 'banners',
    aspectRatio: '16/9'
  },
  {
    id: 'slide-2',
    title: 'Showcase 2 - Silver & Gold Inkshine Ltd',
    badge: 'High Quality',
    caption: 'Commercial print and brand presentation showcase.',
    imageUrl: 'https://cdn.hstockplus.org/uploads/public/img-1789638121027-6ecd906745a42aaa.webp',
    category: 'branding',
    aspectRatio: '16/9'
  },
  {
    id: 'slide-3',
    title: 'Showcase 3 - Silver & Gold Inkshine Ltd',
    badge: 'Popular',
    caption: 'Commercial print and brand presentation showcase.',
    imageUrl: 'https://cdn.hstockplus.org/uploads/public/img-1789638161792-fdf550c93a995761.webp',
    category: 'stationery',
    aspectRatio: '16/9'
  },
  {
    id: 'slide-4',
    title: 'Showcase 4 - Silver & Gold Inkshine Ltd',
    badge: 'Finest Print',
    caption: 'Commercial print and brand presentation showcase.',
    imageUrl: 'https://cdn.hstockplus.org/uploads/public/img-1789638184148-5858e68459451c46.webp',
    category: 'awards',
    aspectRatio: '16/9'
  },
  {
    id: 'slide-5',
    title: 'Showcase 5 - Silver & Gold Inkshine Ltd',
    badge: 'Best Seller',
    caption: 'Commercial print and brand presentation showcase.',
    imageUrl: 'https://cdn.hstockplus.org/uploads/public/img-1789638210286-d54286b63f154e3c.webp',
    category: 'packaging',
    aspectRatio: '16/9'
  },
  {
    id: 'slide-6',
    title: 'Showcase 6 - Silver & Gold Inkshine Ltd',
    badge: 'Premium Finish',
    caption: 'Commercial print and brand presentation showcase.',
    imageUrl: 'https://cdn.hstockplus.org/uploads/public/img-1789638255572-4a3ec89bf3a4c4fa.webp',
    category: 'displays',
    aspectRatio: '16/9'
  },
  {
    id: 'slide-7',
    title: 'Showcase 7 - Silver & Gold Inkshine Ltd',
    badge: 'Excellence',
    caption: 'Commercial print and brand presentation showcase.',
    imageUrl: 'https://cdn.hstockplus.org/uploads/public/img-1789638283912-8e755036c7f5a300.webp',
    category: 'gifts',
    aspectRatio: '16/9'
  }
];

export const DEFAULT_SHOWCASE_SERVICES: ShowcaseServiceItem[] = [
  {
    id: 'showcase-annual-reports',
    title: 'Annual Reports, Handbooks & Catalogues Printing',
    price: 'Price on Request',
    imageUrl: '/annual-reports-handbooks-catalogues.jpg',
    category: 'books_magazines',
    description: 'Crisp color fidelity with perfect square-spine PUR binding for corporate institutions.'
  },
  {
    id: 'showcase-luxury-rollup',
    title: 'Luxury Rollup Banner Stand Printing',
    price: 'Price on Request',
    imageUrl: '/luxury-rollup-banner-stand.jpg',
    category: 'banners_stands',
    description: 'Heavy aluminium teardrop base with photographic anti-curl Solite media.'
  },
  {
    id: 'showcase-brochures-flyers',
    title: 'Brochures, Event Programs & Flyers Printing',
    price: 'Price on Request',
    imageUrl: '/brochures-event-programs-flyers.jpg',
    category: 'flyers_handbills',
    description: 'High-speed digital printing on 150gsm/250gsm gloss art paper.'
  },
  {
    id: 'showcase-premium-stickers',
    title: 'Custom Product Packaging Labels & Stickers',
    price: 'Price on Request',
    imageUrl: '/product-packaging-labels-stickers.jpg',
    category: 'stickers_labels',
    description: 'Waterproof vinyl, clear transparent, or foil stamped with precision contour cutting.'
  }
];

export const DEFAULT_WEBSITE_CONTENT: WebsiteContent = {
  heroHeadline: '#1 Online Printing Company in Bayelsa',
  heroSubheadline: 'Banners • Branding • Digital Printing',
  heroEyebrow: 'Bring your business to the best scale',
  heroDescription: 'Select from top print collections, guaranteeing precision color matching and pre-press audit. Need custom specs or large volume? Fast turnaround and nationwide doorstep delivery across Nigeria!',
  heroBackgroundImage: 'https://cdn.hstockplus.org/uploads/public/img-1790066633477-1b16a758309b0fff.webp',
  heroSlides: DEFAULT_HERO_SLIDES,
  showcaseTitle: 'Top-Quality Printing Services',
  showcaseDescription: 'Engineered on industrial press equipment with laser-sharp registration, vibrant CMYK color balance, and rapid nationwide delivery.',
  showcaseServices: DEFAULT_SHOWCASE_SERVICES,
  whyChooseTitle: 'Bayelsa & Nigeria’s Fast, Affordable, and Reliable Online Printing Company',
  whyChooseDescription: 'Choose SILVER & GOLD INKSHINE LTD because we make printing simple, affordable and reliable for businesses, schools, churches, event planners, product owners and corporate organisations across Nigeria. We understand that customers want quality work without wasting money, delaying their events or struggling with poor finishing — and that is exactly what we deliver.',
  companyName: 'Silver & Gold Inkshine Ltd',
  contactEmail: 'orders@silverandgold.ng',
  contactPhone: '+234 703 037 2539',
  address: 'No. 875 Medford Okilo Road (Mbiama-Yenagoa Road), Opolo-Epie, directly opposite Pepperoni, Yenagoa, Bayelsa State, Nigeria',
  googlePreferredSourceUrl: 'https://share.google/5obB8jqnby72M5IDG',
  googleMapsUrl: 'https://maps.app.goo.gl/FHkoQGNuL8p13jnG6',
  googleMapsEmbedUrl: 'https://maps.google.com/maps?q=9.081999,8.675277&hl=en&z=16&output=embed'
};

const STORAGE_KEY = 'inkshine_website_content_v5';

export function loadSavedWebsiteContent(): WebsiteContent {
  try {
    let saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      saved = localStorage.getItem('inkshine_website_content_v4') || localStorage.getItem('inkshine_website_content_v3') || localStorage.getItem('inkshine_website_content_v2');
    }
    if (saved) {
      const parsed = JSON.parse(saved);

      // Preserve existing user-saved hero slides with absolute priority
      const heroSlides = (Array.isArray(parsed.heroSlides) && parsed.heroSlides.length > 0)
        ? parsed.heroSlides
        : DEFAULT_HERO_SLIDES;

      const heroHeadline = parsed.heroHeadline || DEFAULT_WEBSITE_CONTENT.heroHeadline;
      const heroSubheadline = parsed.heroSubheadline || DEFAULT_WEBSITE_CONTENT.heroSubheadline;
      const heroEyebrow = parsed.heroEyebrow || DEFAULT_WEBSITE_CONTENT.heroEyebrow;
      const heroDescription = parsed.heroDescription || DEFAULT_WEBSITE_CONTENT.heroDescription;

      const hasOldMapUrl = parsed.googleMapsUrl === 'https://maps.app.goo.gl/LSvreepfyxDCE4246';
      const resolvedMapUrl = (!parsed.googleMapsUrl || hasOldMapUrl)
        ? DEFAULT_WEBSITE_CONTENT.googleMapsUrl
        : parsed.googleMapsUrl;
      const resolvedEmbedUrl = (!parsed.googleMapsEmbedUrl || hasOldMapUrl)
        ? DEFAULT_WEBSITE_CONTENT.googleMapsEmbedUrl
        : parsed.googleMapsEmbedUrl;

      const mergedContent: WebsiteContent = {
        ...DEFAULT_WEBSITE_CONTENT,
        ...parsed,
        heroHeadline,
        heroSubheadline,
        heroEyebrow,
        heroDescription,
        heroBackgroundImage: (!parsed.heroBackgroundImage || 
                              parsed.heroBackgroundImage === '/homepage-bg.jpg' || 
                              parsed.heroBackgroundImage === '/7aa493911d023086a5442472c889df70.jpg' ||
                              parsed.heroBackgroundImage === '/hero-banner-main.webp' ||
                              parsed.heroBackgroundImage.includes('unsplash'))
          ? DEFAULT_WEBSITE_CONTENT.heroBackgroundImage
          : parsed.heroBackgroundImage,
        heroSlides,
        showcaseServices: Array.isArray(parsed.showcaseServices) && parsed.showcaseServices.length > 0 
          ? parsed.showcaseServices 
          : DEFAULT_SHOWCASE_SERVICES,
        googleMapsUrl: resolvedMapUrl,
        googleMapsEmbedUrl: resolvedEmbedUrl,
      };

      return mergedContent;
    }
  } catch (e) {
    console.error('Error loading saved website content:', e);
  }
  return DEFAULT_WEBSITE_CONTENT;
}

export function saveWebsiteContent(content: WebsiteContent): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  } catch (e) {
    console.error('Error saving website content:', e);
  }
}

export function resetWebsiteContentToDefaults(): WebsiteContent {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Error resetting website content:', e);
  }
  return DEFAULT_WEBSITE_CONTENT;
}
