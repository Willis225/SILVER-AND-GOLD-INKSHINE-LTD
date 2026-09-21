/**
 * Image Search Service for Automated Online Image Fetching (Option 2)
 * Searches public commercial image repositories (Openverse, Wikimedia, Curated Print Collections, and Google Custom Search)
 * tailored to product titles, categories, and print inspiration (including Pinterest-style product mockups).
 */

export interface SearchResultImage {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  source: 'Google / Live Web' | 'Openverse' | 'Wikimedia' | 'Curated Collection' | 'Pinterest Direct';
  domain?: string;
  category?: string;
  aspectRatio?: string;
}

/**
 * Generates direct Google Images search URL for convenient browser browsing
 */
export function getGoogleImagesSearchUrl(query: string): string {
  const cleanQ = sanitizeSearchQuery(query);
  return `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(cleanQ + ' print design mockup commercial')}`;
}

/**
 * Generates direct Pinterest search URL for design inspiration
 */
export function getPinterestSearchUrl(query: string): string {
  const cleanQ = sanitizeSearchQuery(query);
  return `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(cleanQ + ' print packaging design mockup')}`;
}

// Clean query helper to extract the core product name (strips regional / boilerplate phrases)
export function sanitizeSearchQuery(title: string, category?: string): string {
  let q = title
    .replace(/in lagos\b/gi, '')
    .replace(/in nigeria\b/gi, '')
    .replace(/design and print\b/gi, '')
    .replace(/customized\b/gi, '')
    .replace(/customised\b/gi, '')
    .replace(/printing company\b/gi, '')
    .replace(/– silicone, fabric & rubber bands/gi, '')
    .replace(/[|\-–]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // If query is too long, take the first 4-5 meaningful words
  const words = q.split(' ').filter(w => w.length > 1);
  if (words.length > 5) {
    q = words.slice(0, 4).join(' ');
  }

  if (!q && category) {
    q = category.replace(/_/g, ' ');
  }

  return q || 'printing product';
}

// Curated high-resolution print & branding mockups across all 15 store categories
export const CURATED_PRINT_GALLERY: Record<string, Array<{ title: string; url: string }>> = {
  cards_invitations: [
    {
      title: 'Luxury Gold Foil Embossed Business Cards',
      url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80'
    },
    {
      title: 'Matte Laminated Soft Touch Business Cards',
      url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80'
    },
    {
      title: 'Minimalist Elegant Corporate Business Cards',
      url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80'
    },
    {
      title: 'Gold Foil Border Wedding Invitation Suite',
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80'
    }
  ],
  banners_stands: [
    {
      title: 'Luxury Teardrop Rollup Banner Stand',
      url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=80'
    },
    {
      title: 'Retractable Aluminum Rollup Display Banner',
      url: 'https://cdn.hstockplus.org/uploads/public/img-1789638023483-0654f1a516c4673a.webp'
    },
    {
      title: 'Exhibition Pop-Up Backdrop Wall',
      url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80'
    },
    {
      title: 'Outdoor Teardrop Flying Feather Flag',
      url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1000&q=80'
    }
  ],
  gift_items_souvenirs: [
    {
      title: 'Branded Drawstring Bag & Corporate Gift Set',
      url: 'https://cdn.hstockplus.org/uploads/public/img-1789638283912-8e755036c7f5a300.webp'
    },
    {
      title: 'Custom Pop Socket & Smart Phone Accessories',
      url: 'https://cdn.hstockplus.org/uploads/public/img-1789638121027-6ecd906745a42aaa.webp'
    },
    {
      title: 'Laser Engraved Thermal Water Flask & Coffee Mug',
      url: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=80'
    },
    {
      title: 'Executive Leather Bound Notebook & Ballpoint Pen',
      url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80'
    }
  ],
  packaging_shipping_cartons: [
    {
      title: 'Custom Printed Matte Stand-Up Zipper Pouch',
      url: 'https://cdn.hstockplus.org/uploads/public/img-1789638210286-d54286b63f154e3c.webp'
    },
    {
      title: 'Luxury Rigid Product Packaging Box with Gold Stamp',
      url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1000&q=80'
    },
    {
      title: 'Kraft Paper Boutique Shopping Bag with Ribbon Handles',
      url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80'
    },
    {
      title: 'Corrugated E-commerce Shipping Mailing Box',
      url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=1000&q=80'
    }
  ],
  stickers_labels: [
    {
      title: 'Custom Die-Cut Waterproof Vinyl Stickers',
      url: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=1000&q=80'
    },
    {
      title: 'Roll Labels with Metallic Foil Finish',
      url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80'
    },
    {
      title: 'Transparent Clear Vinyl Product Jar Labels',
      url: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1000&q=80'
    }
  ],
  signages: [
    {
      title: '3D Illuminated LED Channel Letter Storefront Signage',
      url: 'https://cdn.hstockplus.org/uploads/public/img-1789638255572-4a3ec89bf3a4c4fa.webp'
    },
    {
      title: 'Corporate Acrylic Reception Wall Sign with Standoffs',
      url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1000&q=80'
    },
    {
      title: 'Brushed Gold Architectural 3D Metal Sign',
      url: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1000&q=80'
    },
    {
      title: 'Illuminated LED Storefront Lightbox Sign',
      url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1000&q=80'
    }
  ],
  awards: [
    {
      title: 'Custom Laser-Etched Crystal Glass Recognition Plaque',
      url: 'https://cdn.hstockplus.org/uploads/public/img-1789638184148-5858e68459451c46.webp'
    },
    {
      title: 'Executive Mahogany Wooden Award Plaque with Gold Foil',
      url: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=1000&q=80'
    },
    {
      title: 'Beveled Clear Acrylic Diamond Achievement Trophy',
      url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80'
    },
    {
      title: 'Engraved Star Trophy and Medals Set',
      url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1000&q=80'
    }
  ],
  events_exhibitions: [
    {
      title: 'Exhibition Trade Show Booth Backdrop & Promotional Table',
      url: 'https://cdn.hstockplus.org/uploads/public/img-1789638023483-0654f1a516c4673a.webp'
    },
    {
      title: 'A3 Glossy Event Poster & Promotional Flyer',
      url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=80'
    },
    {
      title: 'Interactive Prize Spin Wheel & Activation Setup',
      url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80'
    }
  ],
  custom_apparels_caps: [
    {
      title: 'Custom Embroidered Corporate Polo Shirt',
      url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80'
    },
    {
      title: 'Custom Screen Printed Cotton T-Shirt',
      url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80'
    },
    {
      title: '3D Embroidered Trucker & Baseball Cap',
      url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1000&q=80'
    }
  ],
  books_magazines: [
    {
      title: 'Perfect Bound Annual Report & Company Profile Brochure',
      url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80'
    },
    {
      title: 'Saddle Stitched Full Color Magazine & Booklet',
      url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1000&q=80'
    }
  ],
  flyers_handbills: [
    {
      title: 'A5 Double-Sided Gloss Art Paper Marketing Flyer',
      url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=80'
    },
    {
      title: 'Trifold Corporate Sales Brochure',
      url: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&w=1000&q=80'
    }
  ]
};

/**
 * Searches online image repositories based on product title and category.
 */
export async function searchOnlineProductImages(
  title: string,
  categoryKey?: string,
  customQuery?: string
): Promise<SearchResultImage[]> {
  const query = customQuery?.trim() || sanitizeSearchQuery(title, categoryKey);
  const results: SearchResultImage[] = [];
  const seenUrls = new Set<string>();

  // 1. Live Online Web Search (Google & Web Index)
  try {
    const webApiRes = await fetch(`/api/search-images?q=${encodeURIComponent(query)}`);
    if (webApiRes.ok) {
      const data = await webApiRes.json();
      const webResults = (data.results || []) as Array<{
        id: string;
        title: string;
        url: string;
        thumbnail: string;
        source: string;
        domain?: string;
      }>;
      webResults.forEach((item) => {
        if (item.url && !seenUrls.has(item.url)) {
          seenUrls.add(item.url);
          results.push({
            id: item.id || `web-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            title: item.title || `${query} Photo`,
            url: item.url,
            thumbnail: item.thumbnail || item.url,
            source: 'Google / Live Web',
            domain: item.domain || 'Live Web',
            category: categoryKey
          });
        }
      });
    }
  } catch (webErr) {
    console.warn('Live web image search notice (falling back to curated/open sources):', webErr);
  }

  // 2. Check Curated High-Definition Commercial Print Collection matching category or keywords
  const matchedCategoryKey = categoryKey || 'cards_invitations';
  const curatedList = CURATED_PRINT_GALLERY[matchedCategoryKey] || [];
  
  curatedList.forEach((item, idx) => {
    if (!seenUrls.has(item.url)) {
      seenUrls.add(item.url);
      results.push({
        id: `curated-${matchedCategoryKey}-${idx}`,
        title: item.title,
        url: item.url,
        thumbnail: item.url,
        source: 'Curated Collection',
        domain: 'Unsplash Studio',
        category: matchedCategoryKey
      });
    }
  });

  // Also check if any other curated items match query words
  const queryLower = query.toLowerCase();
  Object.entries(CURATED_PRINT_GALLERY).forEach(([catKey, items]) => {
    if (catKey !== matchedCategoryKey) {
      items.forEach((item, idx) => {
        if (item.title.toLowerCase().includes(queryLower) && !seenUrls.has(item.url)) {
          seenUrls.add(item.url);
          results.push({
            id: `curated-${catKey}-${idx}`,
            title: item.title,
            url: item.url,
            thumbnail: item.url,
            source: 'Curated Collection',
            domain: 'Unsplash Studio',
            category: catKey
          });
        }
      });
    }
  });

  // 3. Query Openverse API (Over 700M CC-licensed commercial photos and designs)
  try {
    const openverseQuery = `${query} print mockup`;
    const ovRes = await fetch(
      `https://api.openverse.org/v1/images/?q=${encodeURIComponent(openverseQuery)}&page_size=8`,
      { headers: { Accept: 'application/json' } }
    );

    if (ovRes.ok) {
      const data = await ovRes.json();
      const list = data.results || [];
      list.forEach((item: any) => {
        if (item.url && !seenUrls.has(item.url)) {
          seenUrls.add(item.url);
          results.push({
            id: `ov-${item.id}`,
            title: item.title || `${query} Photo`,
            url: item.url,
            thumbnail: item.thumbnail || item.url,
            source: 'Openverse',
            category: categoryKey
          });
        }
      });
    }
  } catch (err) {
    console.warn('Openverse search notice:', err);
  }

  // 3. Query Wikimedia Commons high-resolution images
  try {
    const wikiRes = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages&generator=search&gsrsearch=${encodeURIComponent(query + ' printing')}&gsrlimit=6&pithumbsize=800`
    );

    if (wikiRes.ok) {
      const wikiData = await wikiRes.json();
      const pages = Object.values(wikiData.query?.pages || {}) as any[];
      pages.forEach((page) => {
        const imgUrl = page.thumbnail?.source;
        if (imgUrl && !seenUrls.has(imgUrl)) {
          seenUrls.add(imgUrl);
          results.push({
            id: `wiki-${page.pageid}`,
            title: page.title || `${query} Sample`,
            url: imgUrl,
            thumbnail: imgUrl,
            source: 'Wikimedia',
            category: categoryKey
          });
        }
      });
    }
  } catch (err) {
    console.warn('Wikimedia search notice:', err);
  }

  return results;
}

/**
 * Validates and converts Pinterest / Web / Google / Cloud image URLs so they load reliably
 */
export function processExternalImageUrl(inputUrl: string): {
  valid: boolean;
  cleanUrl: string;
  source: 'Pinterest' | 'Web' | 'Google';
  error?: string;
} {
  let trimmed = inputUrl.trim();
  if (!trimmed) {
    return { valid: false, cleanUrl: '', source: 'Web', error: 'Please provide an image link' };
  }

  // Prepend https:// if protocol omitted (e.g. i.pinimg.com/... or images.unsplash.com/...)
  if (!/^https?:\/\//i.test(trimmed) && !trimmed.startsWith('//') && !trimmed.startsWith('data:')) {
    trimmed = 'https://' + trimmed;
  }

  try {
    const parsed = new URL(trimmed);

    // 1. Check if user copied a Google Images search result link (contains ?imgurl=...)
    if (parsed.hostname.includes('google.') && parsed.searchParams.has('imgurl')) {
      const directImg = parsed.searchParams.get('imgurl');
      if (directImg) {
        return {
          valid: true,
          cleanUrl: decodeURIComponent(directImg),
          source: 'Google'
        };
      }
    }

    // 2. Direct Pinterest image CDN (i.pinimg.com/originals/... or /736x/...)
    if (parsed.hostname.includes('pinimg.com')) {
      return {
        valid: true,
        cleanUrl: trimmed,
        source: 'Pinterest'
      };
    }

    // 3. Dropbox direct raw link conversion
    if (parsed.hostname.includes('dropbox.com')) {
      parsed.searchParams.set('raw', '1');
      parsed.searchParams.delete('dl');
      return {
        valid: true,
        cleanUrl: parsed.toString(),
        source: 'Web'
      };
    }

    // 4. Google Drive direct view link conversion
    if (parsed.hostname.includes('drive.google.com')) {
      const match = parsed.pathname.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        return {
          valid: true,
          cleanUrl: `https://drive.google.com/uc?export=view&id=${match[1]}`,
          source: 'Web'
        };
      }
    }

    // 5. Standard direct image or web URL
    return {
      valid: true,
      cleanUrl: trimmed,
      source: parsed.hostname.includes('pinterest.com') ? 'Pinterest' : 'Web'
    };
  } catch {
    return {
      valid: false,
      cleanUrl: '',
      source: 'Web',
      error: 'Invalid URL format. Please make sure the link starts with http:// or https://'
    };
  }
}
