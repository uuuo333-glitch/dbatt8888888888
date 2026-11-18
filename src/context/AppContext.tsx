import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  ProductReview,
  CartItem,
  User,
  CustomerUser,
  OwnerUser,
  WhatsAppOrder,
  ChatMessage,
  AppTheme,
  WallpaperOption,
  FuelType,
  ProductCategory,
  MarqueeAnnouncement,
  MarqueeConfig,
  StoreContentConfig
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_REVIEWS,
  INITIAL_WALLPAPERS,
  APP_THEMES,
  INITIAL_MARQUEE_CONFIG,
  INITIAL_STORE_CONTENT
} from '../data/initialData';

interface AppContextType {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviewsCount'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  importExternalProduct: (data: { imageUrl: string; price: number; name?: string; sourceUrl?: string; fuelType?: FuelType }) => Product;
  
  // Reviews
  reviews: ProductReview[];
  addReview: (productId: string, review: Omit<ProductReview, 'id' | 'productId' | 'date'>) => void;
  getProductReviews: (productId: string) => ProductReview[];

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  // WhatsApp Orders
  orders: WhatsAppOrder[];
  createWhatsAppOrder: (orderData: {
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    customerRegion: string;
    customerAddress: string;
    paymentMethod: WhatsAppOrder['paymentMethod'];
    orderNotes?: string;
  }) => { order: WhatsAppOrder; whatsappUrl: string; orderMessage: string };
  updateOrderStatus: (orderId: string, status: WhatsAppOrder['status']) => void;

  // Authentication
  currentUser: User | null;
  isOwner: boolean;
  loginCustomer: (email: string, password?: string) => { success: boolean; error?: string };
  registerCustomer: (customer: Omit<CustomerUser, 'id' | 'role' | 'createdAt'>) => { success: boolean; error?: string };
  loginOwner: (phone: string, pin: string) => { success: boolean; error?: string };
  logout: () => void;

  // Chat
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string, attachedProduct?: Product) => void;
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  unreadChatCount: number;
  markChatAsRead: () => void;

  // Visual Customization & Themes
  themes: AppTheme[];
  activeTheme: AppTheme;
  setActiveTheme: (theme: AppTheme) => void;
  wallpapers: WallpaperOption[];
  activeWallpaper: WallpaperOption;
  setActiveWallpaper: (wallpaper: WallpaperOption) => void;
  addCustomWallpaper: (name: string, dataUrl: string) => void;
  addCustomVideoWallpaper: (name: string, videoUrl: string) => void;
  wallpaperOpacity: number;
  setWallpaperOpacity: (val: number) => void;

  // Store Settings
  ownerWhatsappNumber: string;
  setOwnerWhatsappNumber: (num: string) => void;
  complaintsPhone: string;
  storeName: string;
  setStoreName: (name: string) => void;
  storeContent: StoreContentConfig;
  updateStoreContent: (updates: Partial<StoreContentConfig>) => void;

  // Store Marquee Announcements
  marqueeConfig: MarqueeConfig;
  updateMarqueeConfig: (updates: Partial<MarqueeConfig>) => void;
  addMarqueeAnnouncement: (announcement: Omit<MarqueeAnnouncement, 'id'>) => void;
  updateMarqueeAnnouncement: (id: string, updates: Partial<MarqueeAnnouncement>) => void;
  deleteMarqueeAnnouncement: (id: string) => void;
  resetMarqueeToDefault: () => void;

  // Google Pay
  googlePayModalOpen: boolean;
  setGooglePayModalOpen: (open: boolean) => void;
  googlePayTarget: { product?: Product; quantity?: number; isCart?: boolean } | null;
  openGooglePay: (target: { product?: Product; quantity?: number; isCart?: boolean }) => void;
  processGooglePayPayment: (details: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerAddress: string;
    customerRegion: string;
    cardLast4: string;
    cardNetwork: string;
  }) => WhatsAppOrder;

  // AI Content Generator
  aiGeneratorModalOpen: boolean;
  setAiGeneratorModalOpen: (open: boolean) => void;
  generateAiProductContent: (params: {
    carModel: string;
    fuelType?: FuelType;
    category?: ProductCategory;
    keywords?: string;
  }) => Promise<any>;

  // Filters & Search
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedFuel: FuelType | 'all';
  setSelectedFuel: (fuel: FuelType | 'all') => void;
  selectedCategory: ProductCategory | 'all';
  setSelectedCategory: (cat: ProductCategory | 'all') => void;
  minPrice: number;
  setMinPrice: (val: number) => void;
  maxPrice: number;
  setMaxPrice: (val: number) => void;
  minRating: number;
  setMinRating: (val: number) => void;
  inStockOnly: boolean;
  setInStockOnly: (val: boolean) => void;
  sortBy: 'featured' | 'rating' | 'price_asc' | 'price_desc' | 'reviews_count';
  setSortBy: (sort: 'featured' | 'rating' | 'price_asc' | 'price_desc' | 'reviews_count') => void;
  resetFilters: () => void;

  // Modals
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authModalMode: 'customer_login' | 'customer_register' | 'owner_login';
  setAuthModalMode: (mode: 'customer_login' | 'customer_register' | 'owner_login') => void;

  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;

  imageEditorModalOpen: boolean;
  setImageEditorModalOpen: (open: boolean) => void;
  editingProduct: Product | null;
  setEditingProduct: (p: Product | null) => void;

  externalImportModalOpen: boolean;
  setExternalImportModalOpen: (open: boolean) => void;

  wallpaperThemeModalOpen: boolean;
  setWallpaperThemeModalOpen: (open: boolean) => void;

  googlePreviewModalOpen: boolean;
  setGooglePreviewModalOpen: (open: boolean) => void;

  adminDashboardOpen: boolean;
  setAdminDashboardOpen: (open: boolean) => void;

  videoModalOpen: boolean;
  setVideoModalOpen: (open: boolean) => void;
  activeVideo: { url: string; title: string; productName?: string } | null;
  openVideoPlayer: (url: string, title: string, productName?: string) => void;

  productDetailModalOpen: boolean;
  setProductDetailModalOpen: (open: boolean) => void;
  activeProductDetail: Product | null;
  openProductDetail: (product: Product) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load saved products or initial
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('dabat_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Reviews
  const [reviews, setReviews] = useState<ProductReview[]>(() => {
    try {
      const saved = localStorage.getItem('dabat_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('dabat_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders
  const [orders, setOrders] = useState<WhatsAppOrder[]>(() => {
    try {
      const saved = localStorage.getItem('dabat_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Auth User
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('dabat_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Themes & Wallpapers
  const [activeTheme, setActiveThemeState] = useState<AppTheme>(() => {
    try {
      const saved = localStorage.getItem('dabat_active_theme');
      return saved ? JSON.parse(saved) : APP_THEMES[0];
    } catch {
      return APP_THEMES[0];
    }
  });

  const [wallpapers, setWallpapers] = useState<WallpaperOption[]>(() => {
    try {
      const saved = localStorage.getItem('dabat_wallpapers');
      return saved ? JSON.parse(saved) : INITIAL_WALLPAPERS;
    } catch {
      return INITIAL_WALLPAPERS;
    }
  });

  const [activeWallpaper, setActiveWallpaperState] = useState<WallpaperOption>(() => {
    try {
      const saved = localStorage.getItem('dabat_active_wallpaper');
      return saved ? JSON.parse(saved) : INITIAL_WALLPAPERS[0];
    } catch {
      return INITIAL_WALLPAPERS[0];
    }
  });

  const [wallpaperOpacity, setWallpaperOpacity] = useState<number>(() => {
    const saved = localStorage.getItem('dabat_wallpaper_opacity');
    return saved ? Number(saved) : 85;
  });

  // WhatsApp Settings
  const [ownerWhatsappNumber, setOwnerWhatsappNumber] = useState<string>(() => {
    return localStorage.getItem('dabat_whatsapp_number') || '966565911414';
  });

  const [storeName, setStoreName] = useState<string>(() => {
    return localStorage.getItem('dabat_store_name') || 'متجر دبات التلوث الديزل والبنزين';
  });

  // Store Marquee State
  const [marqueeConfig, setMarqueeConfig] = useState<MarqueeConfig>(() => {
    try {
      const saved = localStorage.getItem('dabat_marquee_config');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_MARQUEE_CONFIG;
  });

  const updateMarqueeConfig = (updates: Partial<MarqueeConfig>) => {
    setMarqueeConfig(prev => {
      const updated = { ...prev, ...updates };
      localStorage.setItem('dabat_marquee_config', JSON.stringify(updated));
      return updated;
    });
  };

  const addMarqueeAnnouncement = (announcement: Omit<MarqueeAnnouncement, 'id'>) => {
    const newItem: MarqueeAnnouncement = {
      ...announcement,
      id: `mq-${Date.now()}`
    };
    setMarqueeConfig(prev => {
      const updated = {
        ...prev,
        announcements: [...prev.announcements, newItem]
      };
      localStorage.setItem('dabat_marquee_config', JSON.stringify(updated));
      return updated;
    });
  };

  const updateMarqueeAnnouncement = (id: string, updates: Partial<MarqueeAnnouncement>) => {
    setMarqueeConfig(prev => {
      const updated = {
        ...prev,
        announcements: prev.announcements.map(a => (a.id === id ? { ...a, ...updates } : a))
      };
      localStorage.setItem('dabat_marquee_config', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteMarqueeAnnouncement = (id: string) => {
    setMarqueeConfig(prev => {
      const updated = {
        ...prev,
        announcements: prev.announcements.filter(a => a.id !== id)
      };
      localStorage.setItem('dabat_marquee_config', JSON.stringify(updated));
      return updated;
    });
  };

  const resetMarqueeToDefault = () => {
    setMarqueeConfig(INITIAL_MARQUEE_CONFIG);
    localStorage.setItem('dabat_marquee_config', JSON.stringify(INITIAL_MARQUEE_CONFIG));
  };

  // Chat
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('dabat_chat_messages');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'msg-welcome',
        sender: 'system',
        senderName: 'خدمة العملاء الذكية',
        text: 'أهلاً بك في متجر دبات التلوث الديزل والبنزين! كيف يمكننا مساعدتك اليوم بخصوص نوع سيارتك ودبة التلوث المناسبة؟',
        timestamp: 'الآن'
      }
    ];
  });

  const [unreadChatCount, setUnreadChatCount] = useState<number>(0);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  // Search & Filter Enhancements
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedFuel, setSelectedFuel] = useState<FuelType | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(3500);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'price_asc' | 'price_desc' | 'reviews_count'>('featured');

  // Google Pay State
  const [googlePayModalOpen, setGooglePayModalOpen] = useState<boolean>(false);
  const [googlePayTarget, setGooglePayTarget] = useState<{
    product?: Product;
    quantity?: number;
    isCart?: boolean;
  } | null>(null);

  // AI Content Generator State
  const [aiGeneratorModalOpen, setAiGeneratorModalOpen] = useState<boolean>(false);

  // Modals
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'customer_login' | 'customer_register' | 'owner_login'>('customer_login');
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [imageEditorModalOpen, setImageEditorModalOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [externalImportModalOpen, setExternalImportModalOpen] = useState<boolean>(false);
  const [wallpaperThemeModalOpen, setWallpaperThemeModalOpen] = useState<boolean>(false);
  const [googlePreviewModalOpen, setGooglePreviewModalOpen] = useState<boolean>(false);
  const [adminDashboardOpen, setAdminDashboardOpen] = useState<boolean>(false);
  const [videoModalOpen, setVideoModalOpen] = useState<boolean>(false);
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string; productName?: string } | null>(null);
  const [productDetailModalOpen, setProductDetailModalOpen] = useState<boolean>(false);
  const [activeProductDetail, setActiveProductDetail] = useState<Product | null>(null);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('dabat_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('dabat_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('dabat_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('dabat_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('dabat_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('dabat_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('dabat_active_theme', JSON.stringify(activeTheme));
  }, [activeTheme]);

  useEffect(() => {
    localStorage.setItem('dabat_wallpapers', JSON.stringify(wallpapers));
  }, [wallpapers]);

  useEffect(() => {
    localStorage.setItem('dabat_active_wallpaper', JSON.stringify(activeWallpaper));
  }, [activeWallpaper]);

  useEffect(() => {
    localStorage.setItem('dabat_wallpaper_opacity', String(wallpaperOpacity));
  }, [wallpaperOpacity]);

  useEffect(() => {
    localStorage.setItem('dabat_whatsapp_number', ownerWhatsappNumber);
  }, [ownerWhatsappNumber]);

  useEffect(() => {
    localStorage.setItem('dabat_store_name', storeName);
  }, [storeName]);

  useEffect(() => {
    localStorage.setItem('dabat_chat_messages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  const setActiveTheme = (theme: AppTheme) => {
    setActiveThemeState(theme);
    document.documentElement.style.setProperty('--primary-color', theme.primaryHex);
  };

  const setActiveWallpaper = (wp: WallpaperOption) => {
    setActiveWallpaperState(wp);
  };

  const addCustomWallpaper = (name: string, dataUrl: string) => {
    const newWp: WallpaperOption = {
      id: `custom-${Date.now()}`,
      name: name || 'خلفية مخصصة',
      type: 'image',
      cssBackground: `linear-gradient(to bottom, rgba(11, 15, 23, 0.85), rgba(11, 15, 23, 0.95)), url("${dataUrl}")`,
      previewUrl: dataUrl,
      isCustom: true
    };
    const updated = [newWp, ...wallpapers];
    setWallpapers(updated);
    setActiveWallpaperState(newWp);
  };

  const addCustomVideoWallpaper = (name: string, videoUrl: string) => {
    const newWp: WallpaperOption = {
      id: `custom-video-${Date.now()}`,
      name: name || 'خلفية فيديو مخصصة',
      type: 'video',
      cssBackground: 'transparent',
      videoUrl: videoUrl,
      previewUrl: '/assets/aistudio/hero_exhaust_banner_1793965129999_f2d03f14.jpg',
      isCustom: true
    };
    const updated = [newWp, ...wallpapers];
    setWallpapers(updated);
    setActiveWallpaperState(newWp);
  };

  // Store Content (About Us, Workshop, Poems, Complaints Phone)
  const [storeContent, setStoreContent] = useState<StoreContentConfig>(() => {
    try {
      const saved = localStorage.getItem('dabat_store_content');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_STORE_CONTENT;
  });

  const updateStoreContent = (updates: Partial<StoreContentConfig>) => {
    setStoreContent(prev => {
      const updated = { ...prev, ...updates };
      localStorage.setItem('dabat_store_content', JSON.stringify(updated));
      return updated;
    });
  };

  // Product Actions
  const addProduct = (productData: Omit<Product, 'id' | 'rating' | 'reviewsCount'>): Product => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 0
    };
    setProducts(prev => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
    if (activeProductDetail && activeProductDetail.id === id) {
      setActiveProductDetail(prev => (prev ? { ...prev, ...updates } : null));
    }
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    removeFromCart(id);
    if (activeProductDetail?.id === id) {
      setProductDetailModalOpen(false);
      setActiveProductDetail(null);
    }
  };

  // Quick import from external website (Shows image and price only by default)
  const importExternalProduct = (data: {
    imageUrl: string;
    price: number;
    name?: string;
    sourceUrl?: string;
    fuelType?: FuelType;
  }): Product => {
    const newProd: Product = {
      id: `ext-${Date.now()}`,
      name: data.name || `دبة تلوث مستوردة (${data.price} ر.س)`,
      nameEn: 'Imported Exhaust / Filter Unit',
      description: 'منتج مضاف سريعاً من موقع إلكتروني خارجي بمواصفات وصورة مباشرة.',
      fuelType: data.fuelType || 'universal',
      category: 'dpf_filter',
      price: data.price,
      image: data.imageUrl,
      inStock: true,
      stockCount: 10,
      rating: 4.8,
      reviewsCount: 1,
      compatibleCars: ['يرجى التأكد مع الدعم الفني عبر واتساب'],
      isExternalImport: true,
      externalSourceUrl: data.sourceUrl,
      showOnlyImageAndPrice: true,
      warrantyMonths: 12
    };

    setProducts(prev => [newProd, ...prev]);
    return newProd;
  };

  // Review Actions
  const addReview = (productId: string, reviewData: Omit<ProductReview, 'id' | 'productId' | 'date'>) => {
    const newReview: ProductReview = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      productId,
      date: 'الآن'
    };

    setReviews(prev => [newReview, ...prev]);

    // Recalculate product rating and update products state
    setProducts(prev =>
      prev.map(p => {
        if (p.id === productId) {
          const prodReviews = [...reviews.filter(r => r.productId === productId), newReview];
          const avg = prodReviews.reduce((sum, r) => sum + r.rating, 0) / prodReviews.length;
          const updatedProd = {
            ...p,
            rating: Number(avg.toFixed(1)),
            reviewsCount: prodReviews.length
          };
          return updatedProd;
        }
        return p;
      })
    );

    // Also update currently active product detail if open
    setActiveProductDetail(prev => {
      if (prev && prev.id === productId) {
        const prodReviews = [...reviews.filter(r => r.productId === productId), newReview];
        const avg = prodReviews.reduce((sum, r) => sum + r.rating, 0) / prodReviews.length;
        return {
          ...prev,
          rating: Number(avg.toFixed(1)),
          reviewsCount: prodReviews.length
        };
      }
      return prev;
    });
  };

  const getProductReviews = (productId: string) => {
    return reviews.filter(r => r.productId === productId);
  };

  // Cart Actions
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // WhatsApp Order Flow
  const createWhatsAppOrder = (orderData: {
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    customerRegion: string;
    customerAddress: string;
    paymentMethod: WhatsAppOrder['paymentMethod'];
    orderNotes?: string;
  }) => {
    const orderNumber = `DPF-${Math.floor(100000 + Math.random() * 900000)}`;
    const shippingFee = 0; // Free express shipping offer
    const total = cartTotal + shippingFee;

    const newOrder: WhatsAppOrder = {
      id: `ord-${Date.now()}`,
      orderNumber,
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      customerEmail: orderData.customerEmail,
      customerRegion: orderData.customerRegion,
      customerAddress: orderData.customerAddress,
      items: cart.map(i => ({
        productId: i.product.id,
        productName: i.product.name,
        quantity: i.quantity,
        price: i.product.price,
        image: i.product.image
      })),
      subtotal: cartTotal,
      shippingFee,
      total,
      paymentMethod: orderData.paymentMethod,
      orderNotes: orderData.orderNotes,
      status: 'pending_whatsapp',
      createdAt: new Date().toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    setOrders(prev => [newOrder, ...prev]);

    // Format WhatsApp message
    const paymentLabels: Record<WhatsAppOrder['paymentMethod'], string> = {
      google_pay: 'جوجل باي (Google Pay)',
      whatsapp_bank_transfer: 'تحويل بنكي (الراجحي / الأهلي)',
      mada_applepay: 'مدى / أبل باي',
      cash_on_delivery: 'الدفع عند الاستلام'
    };

    let itemsList = '';
    cart.forEach((item, index) => {
      itemsList += `${index + 1}. *${item.product.name}*\n   الكمية: ${item.quantity} | السعر: ${item.product.price * item.quantity} ر.س\n`;
    });

    const orderMessage = `*طلب شراء جديد - ${storeName}* 🚗💨
-----------------------------------------
*رقم الطلب:* #${orderNumber}
*التاريخ:* ${newOrder.createdAt}

*بيانات العميل:*
• الاسم: ${orderData.customerName}
• الجوال: ${orderData.customerPhone}
• المنطقة / المدينة: ${orderData.customerRegion}
• العنوان بالتفصيل: ${orderData.customerAddress}

*المنتجات المطلوبة:*
${itemsList}
-----------------------------------------
*المجموع الفرعي:* ${cartTotal} ر.س
*الشحن والتوصيل:* مجاناً 🚚
*الإجمالي النهائي:* *${total} ر.س*
*طريقة الدفع المختارة:* ${paymentLabels[orderData.paymentMethod]}
${orderData.orderNotes ? `*ملاحظات إضافية:* ${orderData.orderNotes}\n` : ''}
-----------------------------------------
أرجو تأكيد الطلب وتزويدي ببيانات الدفع والتوصيل. شكراً لكم!`;

    // Format WhatsApp URL
    const cleanPhone = ownerWhatsappNumber.replace(/\D/g, '');
    const encodedText = encodeURIComponent(orderMessage);
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedText}`;

    // Clear cart after checkout
    clearCart();

    return { order: newOrder, whatsappUrl, orderMessage };
  };

  const updateOrderStatus = (orderId: string, status: WhatsAppOrder['status']) => {
    setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, status } : o)));
  };

  // Google Pay Actions
  const openGooglePay = (target: { product?: Product; quantity?: number; isCart?: boolean }) => {
    setGooglePayTarget(target);
    setGooglePayModalOpen(true);
  };

  const processGooglePayPayment = (details: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerAddress: string;
    customerRegion: string;
    cardLast4: string;
    cardNetwork: string;
  }): WhatsAppOrder => {
    const orderNumber = `GPAY-${Math.floor(100000 + Math.random() * 900000)}`;
    const items = googlePayTarget?.isCart
      ? cart.map(i => ({
          productId: i.product.id,
          productName: i.product.name,
          quantity: i.quantity,
          price: i.product.price,
          image: i.product.image
        }))
      : googlePayTarget?.product
      ? [
          {
            productId: googlePayTarget.product.id,
            productName: googlePayTarget.product.name,
            quantity: googlePayTarget.quantity || 1,
            price: googlePayTarget.product.price,
            image: googlePayTarget.product.image
          }
        ]
      : [];

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal;

    const newOrder: WhatsAppOrder = {
      id: `ord-gpay-${Date.now()}`,
      orderNumber,
      customerName: details.customerName,
      customerPhone: details.customerPhone,
      customerEmail: details.customerEmail,
      customerRegion: details.customerRegion,
      customerAddress: details.customerAddress,
      items,
      subtotal,
      shippingFee: 0,
      total,
      paymentMethod: 'google_pay',
      googlePayDetails: {
        cardLast4: details.cardLast4,
        cardNetwork: details.cardNetwork,
        authCode: `AUTH-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        payerEmail: details.customerEmail
      },
      status: 'confirmed',
      createdAt: new Date().toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    setOrders(prev => [newOrder, ...prev]);

    if (googlePayTarget?.isCart) {
      clearCart();
    }

    return newOrder;
  };

  // AI Content Generator Action
  const generateAiProductContent = async (params: {
    carModel: string;
    fuelType?: FuelType;
    category?: ProductCategory;
    keywords?: string;
  }) => {
    try {
      const res = await fetch('/api/gemini/generate-product-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('AI endpoint failed, using client-side fallback generator', e);
    }

    const fuelLabel = params.fuelType === 'diesel' ? 'ديزل DPF' : 'بنزين Catalytic';
    return {
      title: `دبة تلوث وفلتر بيئة ${fuelLabel} وكالة - ${params.carModel || 'أصلي'}`,
      titleEn: `OEM ${fuelLabel} High Performance Exhaust for ${params.carModel || 'Universal'}`,
      description: `دبة تلوث وفلتر بيئي متكامل عالي الكفاءة مخصص لسيارات ${params.carModel || 'الديزل والبنزين'}. تقضي على الدخان الأسود وانبعاثات الكربون الضارة وتضمن اجتياز الفحص الدوري بنسبة 100% بدون أي لمبة فحص محرك (Check Engine).`,
      oemNumber: `OEM-${Math.floor(10000 + Math.random() * 90000)}-${params.fuelType === 'diesel' ? 'DPF' : 'CAT'}`,
      filtrationEfficiency: '99.4% تصفية جزيئات الكربون والدخان',
      suggestedPrice: params.fuelType === 'diesel' ? 1850 : 1450,
      seoKeywords: `دبات تلوث ${params.carModel}, فلتر ديزل DPF, فحص دوري, كربون شكمان`,
      isAiGenerated: true,
      source: 'smart_fallback'
    };
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedFuel('all');
    setSelectedCategory('all');
    setMinPrice(0);
    setMaxPrice(3500);
    setMinRating(0);
    setInStockOnly(false);
    setSortBy('featured');
  };

  // Auth Operations
  const isOwner = currentUser?.role === 'owner';

  // Customer Login strictly via Email
  const loginCustomer = (email: string) => {
    if (!email || !email.includes('@')) {
      return { success: false, error: 'يرجى إدخال بريد إلكتروني صحيح' };
    }
    const customer: CustomerUser = {
      id: `cust-${Date.now()}`,
      role: 'customer',
      email: email.trim().toLowerCase(),
      fullName: email.split('@')[0],
      phone: '',
      region: 'الرياض',
      city: 'الرياض',
      address: 'العنوان الافتراضي',
      createdAt: new Date().toISOString()
    };
    setCurrentUser(customer);
    setAuthModalOpen(false);
    return { success: true };
  };

  // Customer Registration strictly collecting Name, Address, Region, Phone, Email
  const registerCustomer = (data: Omit<CustomerUser, 'id' | 'role' | 'createdAt'>) => {
    if (!data.fullName || !data.email || !data.phone || !data.region || !data.address) {
      return { success: false, error: 'يرجى ملء جميع الحقول المطلوبة (الاسم، العنوان، المنطقة، رقم الهاتف، البريد)' };
    }
    const newCustomer: CustomerUser = {
      ...data,
      id: `cust-${Date.now()}`,
      role: 'customer',
      createdAt: new Date().toISOString()
    };
    setCurrentUser(newCustomer);
    setAuthModalOpen(false);
    return { success: true };
  };

  // Store Owner Login strictly via Mobile Phone
  const loginOwner = (phone: string, pin: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 9) {
      return { success: false, error: 'يرجى إدخال رقم جوال صحيح للمالك (مثال: 0551234567)' };
    }
    // PIN simulation (accept 1234 or any 4 digits for demo verification)
    if (pin && pin.length < 4) {
      return { success: false, error: 'رمز التحقق للمالك يجب أن يتكون من 4 أرقام على الأقل' };
    }

    const owner: OwnerUser = {
      id: 'owner-admin',
      role: 'owner',
      phone: cleanPhone,
      name: 'مالك المتجر (مدير النظام)',
      whatsappNumber: cleanPhone.startsWith('966') ? cleanPhone : `966${cleanPhone.replace(/^0/, '')}`
    };

    setCurrentUser(owner);
    setOwnerWhatsappNumber(owner.whatsappNumber);
    setAuthModalOpen(false);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // Chat Actions
  const sendChatMessage = (text: string, attachedProduct?: Product) => {
    if (!text.trim() && !attachedProduct) return;

    const senderRole = isOwner ? 'owner' : 'customer';
    const senderName = isOwner
      ? 'مالك المتجر'
      : (currentUser as CustomerUser)?.fullName || 'عميل المتجر';

    const newMsg: ChatMessage = {
      id: `chat-${Date.now()}`,
      sender: senderRole,
      senderName,
      senderEmail: (currentUser as CustomerUser)?.email,
      senderPhone: currentUser?.phone,
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
      attachedProduct: attachedProduct
        ? {
            id: attachedProduct.id,
            name: attachedProduct.name,
            price: attachedProduct.price,
            image: attachedProduct.image
          }
        : undefined
    };

    setChatMessages(prev => [...prev, newMsg]);

    // If customer sent message, simulate friendly auto-reply if owner is not actively chatting
    if (senderRole === 'customer') {
      setTimeout(() => {
        const autoReplies = [
          'شكراً لرسالتك! جاري فحص استفسارك ورقم هيكل أو موديل السيارة والرد عليك في الحال.',
          'أهلاً بك! دبات التلوث وفلاتر الديزل لدينا أصلية وتجتاز الفحص الدوري 100%. يمكنك أيضاً التواصل المباشر عبر واتساب المتجر.',
          'تم استلام استفسارك! هل تبحث عن فلتر ديزل DPF أم دبة بيئة بنزين؟ يرجى تزويدنا بموديل سيارتك وسنة الصنع.'
        ];
        const randomReply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
        const replyMsg: ChatMessage = {
          id: `reply-${Date.now()}`,
          sender: 'owner',
          senderName: 'الدعم الفني والمالك',
          text: randomReply,
          timestamp: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages(prev => [...prev, replyMsg]);
        if (!isChatOpen) {
          setUnreadChatCount(prev => prev + 1);
        }
      }, 1200);
    }
  };

  const markChatAsRead = () => {
    setUnreadChatCount(0);
  };

  const openVideoPlayer = (url: string, title: string, productName?: string) => {
    setActiveVideo({ url, title, productName });
    setVideoModalOpen(true);
  };

  const openProductDetail = (product: Product) => {
    setActiveProductDetail(product);
    setProductDetailModalOpen(true);
  };

  return (
    <AppContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        importExternalProduct,
        reviews,
        addReview,
        getProductReviews,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
        orders,
        createWhatsAppOrder,
        updateOrderStatus,
        currentUser,
        isOwner,
        loginCustomer,
        registerCustomer,
        loginOwner,
        logout,
        chatMessages,
        sendChatMessage,
        isChatOpen,
        setIsChatOpen,
        unreadChatCount,
        markChatAsRead,
        themes: APP_THEMES,
        activeTheme,
        setActiveTheme,
        wallpapers,
        activeWallpaper,
        setActiveWallpaper,
        addCustomWallpaper,
        addCustomVideoWallpaper,
        wallpaperOpacity,
        setWallpaperOpacity,
        ownerWhatsappNumber,
        setOwnerWhatsappNumber,
        complaintsPhone: storeContent.complaintsPhone || '0565911517',
        storeName,
        setStoreName,
        storeContent,
        updateStoreContent,
        // Google Pay
        googlePayModalOpen,
        setGooglePayModalOpen,
        googlePayTarget,
        openGooglePay,
        processGooglePayPayment,
        // AI Generator
        aiGeneratorModalOpen,
        setAiGeneratorModalOpen,
        generateAiProductContent,
        // Enhanced Search & Filters
        searchTerm,
        setSearchTerm,
        selectedFuel,
        setSelectedFuel,
        selectedCategory,
        setSelectedCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        minRating,
        setMinRating,
        inStockOnly,
        setInStockOnly,
        sortBy,
        setSortBy,
        resetFilters,
        authModalOpen,
        setAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        cartOpen,
        setCartOpen,
        imageEditorModalOpen,
        setImageEditorModalOpen,
        editingProduct,
        setEditingProduct,
        externalImportModalOpen,
        setExternalImportModalOpen,
        wallpaperThemeModalOpen,
        setWallpaperThemeModalOpen,
        googlePreviewModalOpen,
        setGooglePreviewModalOpen,
        adminDashboardOpen,
        setAdminDashboardOpen,
        videoModalOpen,
        setVideoModalOpen,
        activeVideo,
        openVideoPlayer,
        productDetailModalOpen,
        setProductDetailModalOpen,
        activeProductDetail,
        openProductDetail,
        marqueeConfig,
        updateMarqueeConfig,
        addMarqueeAnnouncement,
        updateMarqueeAnnouncement,
        deleteMarqueeAnnouncement,
        resetMarqueeToDefault
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
