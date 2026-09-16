/**
 * Database & Domain Schema for RollUp Prints NG
 * Comprehensive print e-commerce data models supporting dynamic pricing,
 * custom print specifications, multi-format artwork uploads, and nationwide shipping.
 */

export type ProductCategory = 
  | 'advertising_materials'
  | 'stickers_labels'
  | 'flyers_handbills'
  | 'cards_invitations'
  | 'office_stationery'
  | 'books_magazines'
  | 'stamps_seals'
  | 'banners_stands'
  | 'outdoor_displays'
  | 'signages'
  | 'events_exhibitions'
  | 'frames_wallarts'
  | 'awards'
  | 'printing_machines'
  | 'wedding'
  | 'carports'
  | 'custom_apparels_caps'
  | 'company_uniforms'
  | 'gift_items_souvenirs'
  | 'food_packaging'
  | 'packaging_shipping_cartons'
  | 'paper_bags_tags'
  | 'vehicle_branding'
  | 'packages'
  | 'banners_displays'
  | 'packaging_labels'
  | 'corporate_stationery'
  | 'apparels'
  | 'signage'
  | 'gifts_souvenirs';

export interface PrintOption {
  id: string;
  name: string;
  code: string;
  priceModifierType: 'fixed' | 'percentage' | 'multiplier';
  priceModifierValue: number; // e.g., +2000 NGN or +15%
  description?: string;
  isDefault?: boolean;
}

export interface PrintOptionGroup {
  id: string;
  name: string; // e.g., "Banner Size", "Material Type", "Lamination Finishing", "Base Type"
  type: 'size' | 'material' | 'finishing' | 'base_stand' | 'turnaround';
  required: boolean;
  options: PrintOption[];
}

export interface BulkWrappedPricingTier {
  minQuantity: number;
  maxQuantity: number | null; // null represents Infinity
  discountPercentage: number; // e.g. 5, 10, 15, 25
  label: string; // e.g. "1 - 5 units", "6 - 15 units", "16 - 50 units", "50+ units"
}

export interface ArtworkRequirements {
  recommendedDpi: number;
  supportedFormats: string[]; // ['PDF', 'CDR', 'AI', 'PNG', 'TIFF']
  bleedMarginMm: number;
  maxFileSizeMb: number;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  category: ProductCategory;
  categoryLabel: string;
  description: string;
  shortDescription: string;
  basePriceNgn: number;
  minQuantity: number;
  turnaroundDays: number;
  badge?: string;
  image: string;
  optionGroups: PrintOptionGroup[];
  bulkPricingTiers: BulkWrappedPricingTier[];
  artworkRequirements: ArtworkRequirements;
}

export type ArtworkSubmissionType = 
  | 'direct_upload' 
  | 'hire_designer' 
  | 'send_later_whatsapp';

export interface ArtworkUpload {
  id: string;
  type: ArtworkSubmissionType;
  fileName?: string;
  fileFormat?: 'pdf' | 'cdr' | 'ai' | 'png' | 'psd' | 'tiff' | 'jpeg';
  fileSizeMb?: number;
  fileUrl?: string;
  notes?: string;
  bleedConfirmed?: boolean;
  uploadedAt: string;
}

export interface ShippingZone {
  id: string;
  name: string;
  region: string;
  states: string[];
  baseFeeNgn: number;
  estimatedDays: string;
  expressAvailable: boolean;
  expressFeeNgn?: number;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  selectedOptions: {
    groupName: string;
    optionName: string;
    modifierValue: number;
  }[];
  quantity: number;
  unitPriceNgn: number;
  totalPriceNgn: number;
  artwork: ArtworkUpload;
  turnaroundEstimate: string;
}

export type OrderStatus = 
  | 'pending_payment'
  | 'artwork_review'
  | 'in_production'
  | 'ready_for_dispatch'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  deliveryAddress: string;
  city: string;
  state: string;
  landmark?: string;
  companyName?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: CustomerDetails;
  items: OrderItem[];
  subtotalNgn: number;
  shippingFeeNgn: number;
  discountNgn: number;
  grandTotalNgn: number;
  paymentGateway: 'paystack' | 'flutterwave' | 'bank_transfer';
  paymentStatus: PaymentStatus;
  paymentReference?: string;
  orderStatus: OrderStatus;
  shippingZoneId: string;
  trackingNumber?: string;
  productionNotes?: string;
}

/**
 * Dynamic Pricing Calculation Algorithm
 */
export function calculateDynamicPrice(
  productOrBasePrice: Product | number,
  optionsOrQuantity: PrintOption[] | number,
  quantityOrOptionMap?: number | Record<string, string>,
  bulkTiersArg?: BulkWrappedPricingTier[]
): {
  unitPriceBeforeDiscount: number;
  unitPriceAfterDiscount: number;
  discountPercentage: number;
  subtotal: number;
  savingsNgn: number;
  grandTotalNgn: number;
  bulkDiscountPercentage: number;
  unitPriceNgn: number;
} {
  let basePrice = 0;
  let activeOptions: PrintOption[] = [];
  let quantity = 1;
  let bulkTiers: BulkWrappedPricingTier[] = [];

  // Check if first argument is a Product object
  if (typeof productOrBasePrice === 'object' && productOrBasePrice !== null) {
    const product = productOrBasePrice as Product;
    basePrice = product.basePriceNgn;
    quantity = typeof optionsOrQuantity === 'number' ? optionsOrQuantity : 1;
    const optionMap = (typeof quantityOrOptionMap === 'object' ? quantityOrOptionMap : {}) as Record<string, string>;

    product.optionGroups.forEach((group) => {
      const optId = optionMap[group.id];
      const opt = group.options.find((o) => o.id === optId) || group.options.find((o) => o.isDefault) || group.options[0];
      if (opt) activeOptions.push(opt);
    });

    bulkTiers = product.bulkPricingTiers;
  } else {
    // Legacy positional arguments: basePrice, selectedOptions, quantity, bulkTiers
    basePrice = productOrBasePrice as number;
    activeOptions = (optionsOrQuantity as PrintOption[]) || [];
    quantity = (quantityOrOptionMap as number) || 1;
    bulkTiers = bulkTiersArg || [];
  }

  // 1. Calculate unit price with option modifiers
  let unitPrice = basePrice;
  let percentageModifier = 0;

  for (const opt of activeOptions) {
    if (opt.priceModifierType === 'fixed') {
      unitPrice += opt.priceModifierValue;
    } else if (opt.priceModifierType === 'percentage') {
      percentageModifier += opt.priceModifierValue;
    } else if (opt.priceModifierType === 'multiplier') {
      unitPrice *= opt.priceModifierValue;
    }
  }

  if (percentageModifier > 0) {
    unitPrice += (basePrice * percentageModifier) / 100;
  }

  // 2. Find matching bulk volume discount tier
  let discountPercentage = 0;
  for (const tier of bulkTiers) {
    if (quantity >= tier.minQuantity) {
      if (tier.maxQuantity === null || quantity <= tier.maxQuantity) {
        discountPercentage = tier.discountPercentage;
        break;
      }
    }
  }

  const unitPriceAfterDiscount = Math.round(unitPrice * (1 - discountPercentage / 100));
  const subtotal = unitPriceAfterDiscount * quantity;
  const originalSubtotal = unitPrice * quantity;
  const savingsNgn = originalSubtotal - subtotal;

  return {
    unitPriceBeforeDiscount: Math.round(unitPrice),
    unitPriceAfterDiscount,
    discountPercentage,
    subtotal,
    savingsNgn,
    grandTotalNgn: subtotal,
    bulkDiscountPercentage: discountPercentage,
    unitPriceNgn: unitPriceAfterDiscount,
  };
}
