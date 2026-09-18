import { Product, ProductCategory } from '../types/schema';

export interface CategoryDefinition {
  id: string; // 'all' | 'banners' | 'stationery' | 'flyers' | 'packaging' | 'signage' | 'events' | 'gifts' | 'awards' | 'paintings' | 'apparel' | 'machines'
  label: string;
  shortLabel: string;
  tagline: string;
  iconName: string;
  defaultProductCategory: ProductCategory;
}

export const STORE_CATEGORIES: CategoryDefinition[] = [
  {
    id: 'all',
    label: 'All Categories',
    shortLabel: 'All',
    tagline: 'Comprehensive Nigerian commercial print, branding and display collection',
    iconName: 'Layers',
    defaultProductCategory: 'advertising_materials',
  },
  {
    id: 'banners',
    label: 'Banners, Displays & Stands',
    shortLabel: 'Banners & Stands',
    tagline: 'Luxury rollup banners, teardrop flags, backdrop banners & advertising displays',
    iconName: 'Flag',
    defaultProductCategory: 'banners_stands',
  },
  {
    id: 'stationery',
    label: 'Business & Office Printing',
    shortLabel: 'Business & Office',
    tagline: 'Executive business cards, letterheads, presentation folders, certificates & stationery',
    iconName: 'Briefcase',
    defaultProductCategory: 'office_stationery',
  },
  {
    id: 'flyers',
    label: 'Flyers & Marketing Handbills',
    shortLabel: 'Flyers & Handbills',
    tagline: 'High-speed mass-distribution flyers, promotional leaflets & brochures',
    iconName: 'FileText',
    defaultProductCategory: 'flyers_handbills',
  },
  {
    id: 'packaging',
    label: 'Packaging, Labels & Stickers',
    shortLabel: 'Packaging & Labels',
    tagline: 'Custom rigid gift boxes, branded paper bags, vinyl stickers & shipping cartons',
    iconName: 'Package',
    defaultProductCategory: 'packaging_labels',
  },
  {
    id: 'signage',
    label: 'Signage & Company Logos in Nigeria',
    shortLabel: 'Signage & Logos',
    tagline: '3D illuminated LED channel letters, facade company logos, acrylics & pylon signs',
    iconName: 'Sparkles',
    defaultProductCategory: 'signage',
  },
  {
    id: 'events',
    label: 'Events & Exhibition Materials',
    shortLabel: 'Events & Exhibitions',
    tagline: 'Pop-up media walls, trade fair booths, conference stage backdrops & activations',
    iconName: 'Tent',
    defaultProductCategory: 'events_exhibitions',
  },
  {
    id: 'gifts',
    label: 'Corporate Gifts & Souvenirs',
    shortLabel: 'Gifts & Souvenirs',
    tagline: 'Executive VIP gift sets, customized notebooks, metal pens, tumblers & gift hampers',
    iconName: 'Gift',
    defaultProductCategory: 'gift_items_souvenirs',
  },
  {
    id: 'awards',
    label: 'Custom Awards & Plaques',
    shortLabel: 'Awards & Plaques',
    tagline: 'Diamond-cut optical crystal plaques, solid hardwood & bronze recognition trophies',
    iconName: 'Trophy',
    defaultProductCategory: 'awards',
  },
  {
    id: 'paintings',
    label: 'Canvas Paintings & Wall Art',
    shortLabel: 'Art & Paintings',
    tagline: 'Museum-grade gallery wrapped canvas prints, office art murals & framed wall portraits',
    iconName: 'Palette',
    defaultProductCategory: 'frames_wallarts',
  },
  {
    id: 'apparel',
    label: 'Custom Apparels & Uniforms',
    shortLabel: 'Apparels & Uniforms',
    tagline: 'Branded corporate polo shirts, customized embroidered caps & workplace uniforms',
    iconName: 'Shirt',
    defaultProductCategory: 'company_uniforms',
  },
  {
    id: 'machines',
    label: 'Printing Machines & Equipment',
    shortLabel: 'Machines',
    tagline: 'Nylon printing machines, industrial packaging presses & commercial print hardware',
    iconName: 'Printer',
    defaultProductCategory: 'printing_machines',
  },
];

/**
 * Maps any Product to its unified category placement tag
 */
export function getProductCategoryTag(product: Product): string {
  // If explicitly assigned via admin upload
  if (product.categoryPlacement) {
    return product.categoryPlacement;
  }

  const cat = (product.category || '').toLowerCase();
  const id = (product.id || '').toLowerCase();
  const name = (product.name || '').toLowerCase();
  const catLabel = (product.categoryLabel || '').toLowerCase();

  if (
    cat.includes('flyer') || 
    id.includes('flyer') || 
    name.includes('flyer') || 
    name.includes('handbill') ||
    catLabel.includes('flyer')
  ) {
    return 'flyers';
  }

  if (
    cat.includes('banner') || 
    cat.includes('outdoor') || 
    id.includes('banner') || 
    id.includes('rollup') || 
    id.includes('flag') || 
    name.includes('banner') || 
    name.includes('rollup') || 
    name.includes('flag') ||
    cat === 'advertising_materials'
  ) {
    return 'banners';
  }

  if (
    cat.includes('sign') || 
    id.includes('sign') || 
    id.includes('led') || 
    id.includes('channel') || 
    name.includes('sign') || 
    name.includes('logo') || 
    name.includes('channel letter')
  ) {
    return 'signage';
  }

  if (
    cat.includes('packag') || 
    cat.includes('sticker') || 
    cat.includes('label') || 
    cat.includes('bag') || 
    cat.includes('carton') || 
    cat.includes('food_packaging') ||
    id.includes('packaging') || 
    id.includes('box') || 
    id.includes('sticker') || 
    name.includes('box') || 
    name.includes('bag') || 
    name.includes('sticker') || 
    name.includes('carton')
  ) {
    return 'packaging';
  }

  if (
    cat.includes('event') || 
    id.includes('event') || 
    name.includes('event') || 
    name.includes('exhibition') || 
    name.includes('booth') || 
    name.includes('backdrop')
  ) {
    return 'events';
  }

  if (
    cat.includes('award') || 
    id.includes('award') || 
    id.includes('plaque') || 
    id.includes('trophy') || 
    name.includes('award') || 
    name.includes('plaque') || 
    name.includes('trophy')
  ) {
    return 'awards';
  }

  if (
    cat.includes('gift') || 
    cat.includes('souvenir') || 
    id.includes('gift') || 
    id.includes('notebook') || 
    name.includes('gift') || 
    name.includes('souvenir') || 
    name.includes('hamper')
  ) {
    return 'gifts';
  }

  if (
    cat.includes('frame') || 
    cat.includes('canvas') || 
    id.includes('canvas') || 
    id.includes('frame') || 
    name.includes('canvas') || 
    name.includes('painting') || 
    name.includes('mural')
  ) {
    return 'paintings';
  }

  if (
    cat.includes('apparel') || 
    cat.includes('uniform') || 
    id.includes('polo') || 
    id.includes('cap') || 
    name.includes('polo') || 
    name.includes('shirt') || 
    name.includes('uniform')
  ) {
    return 'apparel';
  }

  if (
    cat.includes('machine') || 
    id.includes('machine') || 
    name.includes('machine') || 
    name.includes('printer')
  ) {
    return 'machines';
  }

  if (
    cat.includes('stationery') || 
    cat.includes('card') || 
    cat.includes('stamp') || 
    cat.includes('book') || 
    id.includes('card') || 
    name.includes('business card') || 
    name.includes('letterhead') || 
    name.includes('certificate')
  ) {
    return 'stationery';
  }

  return 'stationery';
}
