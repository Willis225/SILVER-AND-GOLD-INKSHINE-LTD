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
    id: 'advertising_materials',
    label: 'Advertising Materials',
    shortLabel: 'Advertising Materials',
    tagline: 'Promotional posters, marketing collateral, point-of-sale displays and brand billboards',
    iconName: 'Megaphone',
    defaultProductCategory: 'advertising_materials',
  },
  {
    id: 'awards',
    label: 'Awards',
    shortLabel: 'Awards',
    tagline: 'Diamond-cut crystal awards, wooden plaques, recognition trophies and medals',
    iconName: 'Trophy',
    defaultProductCategory: 'awards',
  },
  {
    id: 'banners_stands',
    label: 'Banners & Stands',
    shortLabel: 'Banners & Stands',
    tagline: 'Luxury rollup banners, teardrop flags, backdrop banners and display stands',
    iconName: 'Flag',
    defaultProductCategory: 'banners_stands',
  },
  {
    id: 'books_magazines',
    label: 'Books & Magazines',
    shortLabel: 'Books & Magazines',
    tagline: 'Annual reports, school exercise books, catalogs, magazines and corporate brochures',
    iconName: 'BookOpen',
    defaultProductCategory: 'books_magazines',
  },
  {
    id: 'cards_invitations',
    label: 'Cards & Invitations',
    shortLabel: 'Cards & Invitations',
    tagline: 'Executive business cards, plastic ID cards, luxury wedding cards and VIP passes',
    iconName: 'CreditCard',
    defaultProductCategory: 'cards_invitations',
  },
  {
    id: 'carports',
    label: 'Carports',
    shortLabel: 'Carports',
    tagline: 'Custom tensile carports, branded vehicle shades and weather canopy structures',
    iconName: 'Car',
    defaultProductCategory: 'carports',
  },
  {
    id: 'custom_apparels_caps',
    label: 'Custom Apparels & Caps',
    shortLabel: 'Custom Apparels & Caps',
    tagline: 'Branded corporate polo shirts, custom t-shirts, embroidered caps and workplace uniforms',
    iconName: 'Shirt',
    defaultProductCategory: 'custom_apparels_caps',
  },
  {
    id: 'events_exhibitions',
    label: 'Events & Exhibitions',
    shortLabel: 'Events & Exhibitions',
    tagline: '360 photo booth rentals, exhibition trade booths, media backdrops and event spin wheels',
    iconName: 'Tent',
    defaultProductCategory: 'events_exhibitions',
  },
  {
    id: 'flyers_handbills',
    label: 'Flyer & Handbill Printing',
    shortLabel: 'Flyer & Handbills',
    tagline: 'High-speed mass-distribution flyers, promotional leaflets, handbills and folded brochures',
    iconName: 'FileText',
    defaultProductCategory: 'flyers_handbills',
  },
  {
    id: 'food_packaging',
    label: 'Food Packaging',
    shortLabel: 'Food Packaging',
    tagline: 'Branded takeaway food packs, ice cream cups, burger boxes, snack paper and greaseproof wraps',
    iconName: 'Utensils',
    defaultProductCategory: 'food_packaging',
  },
  {
    id: 'frames_wallarts',
    label: 'Frames & Wall Arts',
    shortLabel: 'Frames & Wall Arts',
    tagline: 'Gallery wrapped canvas prints, floating acrylic frames, executive portraits and wall arts',
    iconName: 'Palette',
    defaultProductCategory: 'frames_wallarts',
  },
  {
    id: 'gift_items_souvenirs',
    label: 'Gift Items & Souvenirs',
    shortLabel: 'Gift Items & Souvenirs',
    tagline: 'Custom umbrellas, VIP gift sets, branded mugs, water bottles, keychains and metal pens',
    iconName: 'Gift',
    defaultProductCategory: 'gift_items_souvenirs',
  },
  {
    id: 'office_stationery',
    label: 'Office Stationery & Corporate Branding',
    shortLabel: 'Office Stationery',
    tagline: 'Executive letterheads, presentation folders, envelopes, self-inking stamps and notepads',
    iconName: 'Briefcase',
    defaultProductCategory: 'office_stationery',
  },
  {
    id: 'outdoor_displays',
    label: 'Outdoor Displays',
    shortLabel: 'Outdoor Displays',
    tagline: 'Outdoor billboards, highway flex banners, directional signs and lamp post displays',
    iconName: 'Compass',
    defaultProductCategory: 'outdoor_displays',
  },
  {
    id: 'packages',
    label: 'Packages',
    shortLabel: 'Packages',
    tagline: 'Corporate branding starter bundles, complete event packaging kits and bulk discount combos',
    iconName: 'Boxes',
    defaultProductCategory: 'packages',
  },
  {
    id: 'packaging_shipping_cartons',
    label: 'Packaging and Shipping Cartons',
    shortLabel: 'Packaging & Shipping Cartons',
    tagline: 'Corrugated cartons, heavy-duty shipping boxes, courier mailers and custom product boxes',
    iconName: 'Package',
    defaultProductCategory: 'packaging_shipping_cartons',
  },
  {
    id: 'paper_bags_tags',
    label: 'Paper Bags & Tags',
    shortLabel: 'Paper Bags & Tags',
    tagline: 'Luxury retail paper shopping bags, boutique tote bags, clothing hang tags and gift bags',
    iconName: 'ShoppingBag',
    defaultProductCategory: 'paper_bags_tags',
  },
  {
    id: 'printing_machines',
    label: 'Printing Machines',
    shortLabel: 'Printing Machines',
    tagline: 'Commercial nylon printing machines, industrial packaging presses, heat presses and equipment',
    iconName: 'Printer',
    defaultProductCategory: 'printing_machines',
  },
  {
    id: 'signages',
    label: 'Signages',
    shortLabel: 'Signages',
    tagline: '3D illuminated LED channel letters, facade company logo signage, neon signs and pylons',
    iconName: 'Sparkles',
    defaultProductCategory: 'signages',
  },
  {
    id: 'stickers_labels',
    label: 'Stickers & Labels',
    shortLabel: 'Stickers & Labels',
    tagline: 'Die-cut vinyl stickers, waterproof bottle labels, roll stickers and gold foil seals',
    iconName: 'Tag',
    defaultProductCategory: 'stickers_labels',
  },
  {
    id: 'vehicle_branding',
    label: 'Vehicle Branding',
    shortLabel: 'Vehicle Branding',
    tagline: 'Commercial fleet wraps, delivery bus decals, car wraps, truck vinyl and magnetic signs',
    iconName: 'Truck',
    defaultProductCategory: 'vehicle_branding',
  },
  {
    id: 'wedding',
    label: 'Wedding',
    shortLabel: 'Wedding',
    tagline: 'Royal wedding programs, order of service, invitation suites, wedding souvenirs and signage',
    iconName: 'Heart',
    defaultProductCategory: 'wedding',
  },
];

/**
 * Maps any Product to its unified category placement tag (one of the 22 canonical keys)
 */
export function getProductCategoryTag(product: Product): string {
  if (!product) return 'advertising_materials';
  // If explicitly assigned via admin upload
  if (product.categoryPlacement && typeof product.categoryPlacement === 'string') {
    const cp = product.categoryPlacement.toLowerCase();
    if (cp === 'banners') return 'banners_stands';
    if (cp === 'stationery') return 'office_stationery';
    if (cp === 'flyers') return 'flyers_handbills';
    if (cp === 'packaging') return 'packaging_shipping_cartons';
    if (cp === 'signage') return 'signages';
    if (cp === 'events') return 'events_exhibitions';
    if (cp === 'gifts') return 'gift_items_souvenirs';
    if (cp === 'awards') return 'awards';
    if (cp === 'paintings') return 'frames_wallarts';
    if (cp === 'apparel') return 'custom_apparels_caps';
    if (cp === 'machines') return 'printing_machines';
    return product.categoryPlacement;
  }

  const cat = String(product.category || '').toLowerCase();
  const id = String(product.id || '').toLowerCase();
  const name = String(product.name || '').toLowerCase();
  const catLabel = String(product.categoryLabel || '').toLowerCase();

  if (cat === 'wedding' || name.includes('wedding') || name.includes('bridal') || id.includes('wedding')) {
    return 'wedding';
  }

  if (cat === 'carports' || name.includes('carport') || id.includes('carport')) {
    return 'carports';
  }

  if (cat === 'vehicle_branding' || name.includes('vehicle') || name.includes('car wrap') || name.includes('fleet')) {
    return 'vehicle_branding';
  }

  if (cat === 'packages' || name.includes('package') || name.includes('starter pack') || name.includes('combo bundle')) {
    return 'packages';
  }

  if (cat === 'outdoor_displays' || name.includes('billboard') || name.includes('outdoor flex')) {
    return 'outdoor_displays';
  }

  if (cat === 'food_packaging' || name.includes('food pack') || name.includes('ice cream cup') || name.includes('takeaway')) {
    return 'food_packaging';
  }

  if (cat === 'paper_bags_tags' || name.includes('paper bag') || name.includes('hang tag') || name.includes('tote bag')) {
    return 'paper_bags_tags';
  }

  if (cat === 'packaging_shipping_cartons' || cat.includes('carton') || name.includes('carton') || name.includes('shipping box')) {
    return 'packaging_shipping_cartons';
  }

  if (
    cat.includes('flyer') || 
    id.includes('flyer') || 
    name.includes('flyer') || 
    name.includes('handbill') ||
    catLabel.includes('flyer')
  ) {
    return 'flyers_handbills';
  }

  if (
    cat.includes('banner') || 
    id.includes('banner') || 
    id.includes('rollup') || 
    id.includes('flag') || 
    name.includes('banner') || 
    name.includes('rollup') || 
    name.includes('flag')
  ) {
    return 'banners_stands';
  }

  if (
    cat.includes('sign') || 
    id.includes('sign') || 
    id.includes('led') || 
    id.includes('channel') || 
    name.includes('sign') || 
    name.includes('channel letter')
  ) {
    return 'signages';
  }

  if (cat.includes('sticker') || cat.includes('label') || name.includes('sticker') || name.includes('label')) {
    return 'stickers_labels';
  }

  if (
    cat.includes('event') || 
    id.includes('event') || 
    name.includes('event') || 
    name.includes('exhibition') || 
    name.includes('booth') || 
    name.includes('backdrop') ||
    name.includes('photo booth')
  ) {
    return 'events_exhibitions';
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
    name.includes('souvenir') || 
    name.includes('keychain') || 
    name.includes('umbrella')
  ) {
    return 'gift_items_souvenirs';
  }

  if (
    cat.includes('frame') || 
    cat.includes('canvas') || 
    id.includes('canvas') || 
    id.includes('frame') || 
    name.includes('canvas') || 
    name.includes('wall art') || 
    name.includes('mural')
  ) {
    return 'frames_wallarts';
  }

  if (
    cat.includes('apparel') || 
    cat.includes('cap') || 
    id.includes('polo') || 
    id.includes('cap') || 
    name.includes('polo') || 
    name.includes('t-shirt') || 
    name.includes('cap')
  ) {
    return 'custom_apparels_caps';
  }

  if (
    cat.includes('machine') || 
    id.includes('machine') || 
    name.includes('machine') || 
    name.includes('printer') ||
    name.includes('press')
  ) {
    return 'printing_machines';
  }

  if (
    cat.includes('book') || 
    cat.includes('magazine') || 
    name.includes('book') || 
    name.includes('magazine') || 
    name.includes('annual report') || 
    name.includes('handbook')
  ) {
    return 'books_magazines';
  }

  if (
    cat.includes('card') || 
    name.includes('business card') || 
    name.includes('invitation') || 
    name.includes('plastic card')
  ) {
    return 'cards_invitations';
  }

  if (
    cat.includes('stationery') || 
    cat.includes('office') || 
    name.includes('letterhead') || 
    name.includes('stamp') || 
    name.includes('envelope')
  ) {
    return 'office_stationery';
  }

  if (cat.includes('advertising') || name.includes('advertising')) {
    return 'advertising_materials';
  }

  return 'advertising_materials';
}
