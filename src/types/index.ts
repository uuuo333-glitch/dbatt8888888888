export type FuelType = 'diesel' | 'petrol' | 'universal';

export type ProductCategory = 
  | 'dpf_filter'        // فلاتر ديزل DPF
  | 'catalytic_petrol'  // دبات بيئة بنزين
  | 'o2_sensor'         // حساسات شكمان وأوكسجين
  | 'cleaner_additive'  // منظفات وبخاخات DPF
  | 'sport_cat'         // دبات رياضية عالية التدفق
  | 'muffler_pipe';     // مواسير وملحقات عادم

export interface ProductReview {
  id: string;
  productId: string;
  authorName: string;
  rating: number; // 1 to 5
  carModel: string;
  date: string;
  comment: string;
  isVerified: boolean;
  recommend: boolean;
}

export interface Product {
  id: string;
  name: string;
  nameEn?: string;
  description: string;
  fuelType: FuelType;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  image: string;
  additionalImages?: string[];
  videoUrl?: string; // Video file or link for sound/exhaust testing
  videoTitle?: string;
  oemNumber?: string;
  compatibleCars: string[]; // List of compatible cars (e.g., تويوتا هايلوكس ديزل 2016-2024)
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewsCount: number;
  featured?: boolean;
  filtrationEfficiency?: string; // e.g. "99% إزالة الجسيمات والدخان"
  warrantyMonths?: number; // e.g. 12
  isExternalImport?: boolean; // Imported from external website
  externalSourceUrl?: string;
  showOnlyImageAndPrice?: boolean; // يظهر فقط الصورة في السعر
}

export interface CustomerUser {
  id: string;
  role: 'customer';
  email: string;
  fullName: string;
  phone: string;
  region: string;
  city: string;
  address: string;
  createdAt: string;
}

export interface OwnerUser {
  id: string;
  role: 'owner';
  phone: string;
  name: string;
  whatsappNumber: string;
}

export type User = CustomerUser | OwnerUser;

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WhatsAppOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerRegion: string;
  customerAddress: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  subtotal: number;
  shippingFee: number;
  total: number;
  paymentMethod: 'whatsapp_bank_transfer' | 'mada_applepay' | 'google_pay' | 'cash_on_delivery';
  googlePayDetails?: {
    cardLast4: string;
    cardNetwork: string;
    authCode: string;
    payerEmail: string;
  };
  orderNotes?: string;
  status: 'pending_whatsapp' | 'confirmed' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
}

export interface SearchFilters {
  searchTerm: string;
  fuelType: FuelType | 'all';
  category: ProductCategory | 'all';
  minPrice: number;
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
  sortBy: 'featured' | 'rating' | 'price_asc' | 'price_desc' | 'reviews_count';
}

export interface AiGeneratedProductContent {
  title: string;
  titleEn?: string;
  description: string;
  oemNumber?: string;
  filtrationEfficiency?: string;
  warrantyMonths?: number;
  suggestedPrice?: number;
  seoKeywords?: string;
  isAiGenerated?: boolean;
  source?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'customer' | 'owner' | 'system';
  senderName: string;
  senderEmail?: string;
  senderPhone?: string;
  text: string;
  timestamp: string;
  attachedProduct?: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
}

export interface AppTheme {
  id: 'amber' | 'blue' | 'emerald' | 'red' | 'purple';
  name: string;
  primaryClass: string;
  accentBg: string;
  accentText: string;
  borderClass: string;
  glowClass: string;
  primaryHex: string;
}

export interface WallpaperOption {
  id: string;
  name: string;
  type: 'pattern' | 'image' | 'gradient' | 'video';
  cssBackground: string;
  previewUrl?: string;
  videoUrl?: string;
  isCustom?: boolean;
}

export interface StoreContentConfig {
  aboutUsTitle: string;
  aboutUsText: string;
  workshopTitle: string;
  workshopText: string;
  workshopPoem: string;
  workshopBgImage: string;
  complaintsPhone: string;
}


export interface MarqueeAnnouncement {
  id: string;
  text: string;
  badge?: string;
  icon?: 'flame' | 'phone' | 'google_pay' | 'check' | 'sparkles' | 'tag';
  active: boolean;
}

export interface MarqueeConfig {
  enabled: boolean;
  speedSeconds: number; // e.g. 25 seconds
  pauseOnHover: boolean;
  announcements: MarqueeAnnouncement[];
  sponsorText: string;
  sponsorPhone: string;
}

