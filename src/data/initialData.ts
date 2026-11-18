import { Product, ProductReview, WallpaperOption, AppTheme, MarqueeConfig, StoreContentConfig } from '../types';

export const INITIAL_WALLPAPERS: WallpaperOption[] = [
  {
    id: 'supercar_exhaust_workshop',
    name: 'ورشة العوادم الرياضية الفائقة (Supercar Exhaust Garage)',
    type: 'image',
    cssBackground: 'linear-gradient(to bottom, rgba(11, 15, 23, 0.82), rgba(11, 15, 23, 0.95)), url("/assets/aistudio/hero_exhaust_banner_1793965129999_f2d03f14.jpg")',
    previewUrl: '/assets/aistudio/hero_exhaust_banner_1793965129999_f2d03f14.jpg'
  },
  {
    id: 'video_exhaust_garage',
    name: 'خلفية فيديو حية: ورشة وتجارب عوادم السيارات',
    type: 'video',
    cssBackground: 'transparent',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    previewUrl: '/assets/aistudio/hero_exhaust_banner_1793965129999_f2d03f14.jpg'
  },
  {
    id: 'video_exhaust_flow',
    name: 'خلفية فيديو حية: تدفق واختبار انبعاثات الشكمان',
    type: 'video',
    cssBackground: 'transparent',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    previewUrl: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'carbon_stealth',
    name: 'ألياف كربون داكنة (Carbon Stealth)',
    type: 'pattern',
    cssBackground: 'radial-gradient(ellipse at top, #1e293b, #0b0f17 75%), repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 2px, transparent 2px, transparent 6px)',
    previewUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'titanium_mesh',
    name: 'شبك تيتانيوم صناعي (Titanium Mesh)',
    type: 'pattern',
    cssBackground: 'linear-gradient(135deg, #090d16 0%, #111827 50%, #030712 100%)',
    previewUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'midnight_garage',
    name: 'كراج المحركات الليلي (Midnight Garage)',
    type: 'image',
    cssBackground: 'linear-gradient(to bottom, rgba(11, 15, 23, 0.88), rgba(11, 15, 23, 0.96)), url("https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1600&q=80")',
    previewUrl: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'speed_neon',
    name: 'سرعة النيون الرياضية (Speed Neon)',
    type: 'image',
    cssBackground: 'linear-gradient(to bottom, rgba(11, 15, 23, 0.85), rgba(11, 15, 23, 0.95)), url("https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1600&q=80")',
    previewUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'desert_dunes',
    name: 'أفق الصحراء والأوف رود (Desert Dunes)',
    type: 'image',
    cssBackground: 'linear-gradient(to bottom, rgba(11, 15, 23, 0.88), rgba(11, 15, 23, 0.97)), url("https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=80")',
    previewUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80'
  }
];

export const APP_THEMES: AppTheme[] = [
  {
    id: 'amber',
    name: 'كهرماني ناري (Flame Amber)',
    primaryClass: 'text-amber-400',
    accentBg: 'bg-amber-500 hover:bg-amber-400 text-slate-950',
    accentText: 'text-amber-400',
    borderClass: 'border-amber-500/30 hover:border-amber-500/60',
    glowClass: 'glow-amber',
    primaryHex: '#f59e0b'
  },
  {
    id: 'blue',
    name: 'أزرق تيتانيوم (Titanium Blue)',
    primaryClass: 'text-sky-400',
    accentBg: 'bg-sky-500 hover:bg-sky-400 text-slate-950',
    accentText: 'text-sky-400',
    borderClass: 'border-sky-500/30 hover:border-sky-500/60',
    glowClass: 'glow-blue',
    primaryHex: '#0284c7'
  },
  {
    id: 'emerald',
    name: 'أخضر بيئي (Eco Green DPF)',
    primaryClass: 'text-emerald-400',
    accentBg: 'bg-emerald-500 hover:bg-emerald-400 text-slate-950',
    accentText: 'text-emerald-400',
    borderClass: 'border-emerald-500/30 hover:border-emerald-500/60',
    glowClass: 'glow-emerald',
    primaryHex: '#10b981'
  },
  {
    id: 'red',
    name: 'أحمر رياضي (Racing Red)',
    primaryClass: 'text-rose-400',
    accentBg: 'bg-rose-500 hover:bg-rose-400 text-white',
    accentText: 'text-rose-400',
    borderClass: 'border-rose-500/30 hover:border-rose-500/60',
    glowClass: 'glow-rose',
    primaryHex: '#f43f5e'
  },
  {
    id: 'purple',
    name: 'بنفسجي توربو (Turbo Violet)',
    primaryClass: 'text-purple-400',
    accentBg: 'bg-purple-500 hover:bg-purple-400 text-white',
    accentText: 'text-purple-400',
    borderClass: 'border-purple-500/30 hover:border-purple-500/60',
    glowClass: 'glow-purple',
    primaryHex: '#a855f7'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'sport-porsche-hjs-00',
    name: 'نظام عادم ودبة بيئة رياضية HJS تيتانيوم - بورش وجي تي والسيارات الرياضية',
    nameEn: 'Porsche GT3 & Sports Car Titanium High-Flow HJS Exhaust Cat',
    description: 'نظام عادم متطور ودبة بيئة رياضية معدنية HJS مصنوعة من التيتانيوم والكربون المعالج. تدفق غازات عادم فائق يمنح استجابة فورية للمحرك ونغمة رياضية نقية مع اجتياز الفحص الدوري بنسبة 100%.',
    fuelType: 'petrol',
    category: 'sport_cat',
    price: 3200,
    originalPrice: 3800,
    image: '/assets/aistudio/hero_exhaust_banner_1793965129999_f2d03f14.jpg',
    additionalImages: [
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
    videoTitle: 'صوت شكمان دبة التيتانيوم الرياضية على الرفع',
    oemNumber: 'HJS-9095-TITANIUM-GT',
    compatibleCars: [
      'بورش 911 كاريرا / GT3 / توربو',
      'بي إم دبليو M3 / M4 / M5',
      'مرسيدس AMG C63 / E63',
      'نيسان GTR وجميع المحركات الرياضية المعدلة'
    ],
    inStock: true,
    stockCount: 4,
    rating: 5.0,
    reviewsCount: 19,
    featured: true,
    filtrationEfficiency: '97.5% تنقية مع تدفق عادم رياضي حر'
  },
  {
    id: 'dpf-hilux-01',
    name: 'فلتر ديزل DPF وكالة - تويوتا هايلوكس وفورتشنر 2.4 / 2.8',
    nameEn: 'Toyota Hilux & Fortuner 2.8L D4D DPF Filter OEM',
    description: 'فلتر بيئة ديزل متكامل DPF عالي الجودة متوافق مع محركات الديزل 1GD-FTV و 2GD-FTV. يزيل 99.2% من جسيمات الكربون والدخان الأسود، ويجتاز الفحص الدوري بنجاح تام بدون أي لمبة فحص محرك (Check Engine).',
    fuelType: 'diesel',
    category: 'dpf_filter',
    price: 1850,
    originalPrice: 2200,
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    videoTitle: 'فحص انبعاثات وتدفق الهواء لدبة هايلوكس ديزل DPF',
    oemNumber: '25051-0E020 / 17410-0E050',
    compatibleCars: [
      'تويوتا هايلوكس ديزل (2016 - 2024)',
      'تويوتا فورتشنر ديزل (2016 - 2024)',
      'تويوتا برادو ديزل توربو 2.8 (2018 - 2024)'
    ],
    inStock: true,
    stockCount: 8,
    rating: 4.9,
    reviewsCount: 38,
    featured: true,
    filtrationEfficiency: '99.2% تصفية جزيئات الكربون والدخان'
  },
  {
    id: 'cat-patrol-02',
    name: 'دبة بيئة بنزين أصلية سيراميك - نيسان باترول V8 400 و 320 حصان',
    nameEn: 'Nissan Patrol Y62 V8 Catalytic Converter High Flow',
    description: 'دبة تلوث بنزين ثنائية مصنعة من مادة الكورديريت المطلية بالبلاتين والروديوم لتحويل الغازات السامة إلى ثاني أكسيد الكربون وبخار ماء بكفاءة قصوى لاجتياز الفحص الدوري وعزل حراري فائق.',
    fuelType: 'petrol',
    category: 'catalytic_petrol',
    price: 2450,
    originalPrice: 2800,
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    videoTitle: 'تجربة صوت شكمان باترول Y62 وقراءات حساس الأوكسجين بعد التركيب',
    oemNumber: '208A0-1LA0A / 20802-1LA0B',
    compatibleCars: [
      'نيسان باترول بطل الدروب Y62 V8 (2010 - 2024)',
      'إنفينيتي QX80 محرك 5.6 لتر',
      'نيسان أرمادا 5.6'
    ],
    inStock: true,
    stockCount: 5,
    rating: 4.8,
    reviewsCount: 29,
    featured: true,
    filtrationEfficiency: '98.8% تحويل غازات الهيدروكربون وأول أكسيد الكربون'
  },
  {
    id: 'dpf-isuzu-03',
    name: 'فلتر ديزل DPF مع مستشعر الضغط التفاضلي - إيسوزو ديماكس وشاحنات NPR',
    nameEn: 'Isuzu D-Max 3.0L & NPR Truck DPF Particulate Filter',
    description: 'دبة بيئة ديزل متطورة مصممة خصيصاً لتحمل درجات الحرارة العالية في شاحنات إيسوزو ومحركات 4JJ1 و 4JK1 مع مجاري تنظيف ذاتي عالية التحمل ومقاومة للانسداد.',
    fuelType: 'diesel',
    category: 'dpf_filter',
    price: 1980,
    originalPrice: 2350,
    image: 'https://images.unsplash.com/photo-1558441719-74e2d334e2c0?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    videoTitle: 'طريقة تركيب وفحص فلتر ديزل إيسوزو ديماكس بدون توليف',
    oemNumber: '8-98242487-0 / 8-97607738-1',
    compatibleCars: [
      'إيسوزو ديماكس ديزل توربو 2.5 / 3.0 (2012 - 2024)',
      'إيسوزو شاحنة NPR / NQR حمولة 3.5 إلى 5 طن',
      'شيفروليه كولورادو ديزل'
    ],
    inStock: true,
    stockCount: 12,
    rating: 5.0,
    reviewsCount: 44,
    featured: true,
    filtrationEfficiency: '99.5% احتجاز جزيئات الكربون السامة'
  },
  {
    id: 'cat-toyota-camry-04',
    name: 'دبة تلوث بنزين مباشرة (Direct Fit) - تويوتا كامري وأفالون وراف فور',
    nameEn: 'Toyota Camry & RAV4 2.5L Catalytic Converter Direct Fit',
    description: 'دبة بيئة تركب مكان الوكالة مباشرة مسامير بدون لحام أو قص. تتضمن فتحات حساسات الشكمان بنظام الفحص السريع ومصنوعة من الفولاذ المقاوم للصدأ 409 Stainless Steel.',
    fuelType: 'petrol',
    category: 'catalytic_petrol',
    price: 1250,
    originalPrice: 1500,
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    videoTitle: 'اختبار قراءة جهاز الكمبيوتر OBD2 بعد تركيب دبة كامري',
    oemNumber: '25051-0V030 / 17141-25010',
    compatibleCars: [
      'تويوتا كامري 2.5 (2012 - 2024)',
      'تويوتا أفالون 3.5 (2013 - 2022)',
      'تويوتا راف فور RAV4 (2013 - 2023)',
      'لكزس ES250 / ES350'
    ],
    inStock: true,
    stockCount: 14,
    rating: 4.7,
    reviewsCount: 52,
    featured: false,
    filtrationEfficiency: '97.9% كفاءة تنقية غازات العادم'
  },
  {
    id: 'dpf-ranger-05',
    name: 'فلتر ديزل DPF تيربو - فورد رينجر وإيفرست 2.0 / 3.2 ديزل',
    nameEn: 'Ford Ranger & Everest Biturbo 2.0L / 3.2L DPF Filter',
    description: 'فلتر بيئة ديزل فورد أصلي مخصص للظروف الشاقة ودرجات حرارة الخليج. يحل مشكلة امتلاء الفلتر وتحذير "Exhaust Filter Full" ويقلل استهلاك وقود الديزل.',
    fuelType: 'diesel',
    category: 'dpf_filter',
    price: 2150,
    originalPrice: 2500,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    videoTitle: 'شرح دورة التجديد الذاتي لفلتر فورد رينجر DPF Regeneration',
    oemNumber: 'EB3G-5H270-BA / JB3Z-5H270-A',
    compatibleCars: [
      'فورد رينجر ديزل توربو 3.2 و 2.0 باي توربو (2015 - 2024)',
      'فورد إيفرست ديزل (2016 - 2024)',
      'مازدا BT-50 ديزل'
    ],
    inStock: true,
    stockCount: 6,
    rating: 4.9,
    reviewsCount: 22,
    featured: false,
    filtrationEfficiency: '99.4% كفاءة مطابقة للمواصفات الأوروبية Euro 6'
  },
  {
    id: 'sport-cat-06',
    name: 'دبة بيئة رياضية 300 خلية High Flow معدنية - لكزس وجمس وشواحن التوربو',
    nameEn: '300 Cell Metallic High Flow Sport Catalytic Converter 3 Inch',
    description: 'دبة تلوث رياضية معدنية مصممة لزيادة عزم السيارة وقوة الأحصنة مع تقليل ضغط العادم الراجع (Backpressure) مع الحفاظ التام على اجتياز فحص الكربون برائحة شكمان نظيفة.',
    fuelType: 'petrol',
    category: 'sport_cat',
    price: 1650,
    originalPrice: 1950,
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
    videoTitle: 'مقارنة صوت الشكمان بين دبة الوكالة ودبة الـ 300 خلية الرياضية',
    oemNumber: 'CAT-300-SPORT-METALLIC-3IN',
    compatibleCars: [
      'شفروليه تاهو وسوبربان وسيلفرادو V8',
      'جي إم سي يوكن وسييرا 5.3 و 6.2',
      'لكزس LX570 و GX460',
      'سيارات السباق والتعديل الرياضي بمواسير 2.5 إلى 3 إنش'
    ],
    inStock: true,
    stockCount: 9,
    rating: 4.9,
    reviewsCount: 31,
    featured: true,
    filtrationEfficiency: 'تدفق هوائي أعلى بنسبة 45% مع تنقية 95%'
  },
  {
    id: 'cleaner-kit-07',
    name: 'طقم رذاذ ومحلول تنظيف دبة التلوث وفلتر الديزل DPF احترافي ألماني',
    nameEn: 'German Professional DPF & Catalytic Cleaner Flush Spray Kit',
    description: 'محلول كيميائي خاص لتنظيف دبات التلوث وفلاتر الديزل المسدودة بدون فك. يذيب الترسبات الكربونية والرماد المتراكم ويعيد كفاءة المحرك وعزم الدوران في 20 دقيقة.',
    fuelType: 'universal',
    category: 'cleaner_additive',
    price: 280,
    originalPrice: 350,
    image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    videoTitle: 'طريقة استخدام بخاخ تنظيف فلتر الديزل بدون فك الشكمان',
    oemNumber: 'DPF-CLEAN-PRO-500ML',
    compatibleCars: [
      'جميع سيارات الديزل بفلاتر DPF',
      'جميع سيارات البنزين بدبات البيئة Catalytic Converter'
    ],
    inStock: true,
    stockCount: 45,
    rating: 4.8,
    reviewsCount: 67,
    featured: false,
    filtrationEfficiency: 'إذابة 96% من ترسبات السناج والكربون المتصلب'
  },
  {
    id: 'o2-sensor-denso-08',
    name: 'حساس شكمان أوكسجين ياباني أصلي Denso - قبل وبعد دبة التلوث',
    nameEn: 'Denso OEM Upstream & Downstream Oxygen O2 Sensor',
    description: 'حساس أوكسجين أصلي ياباني لقراءة نسبة خليط الهواء والوقود ومراقبة كفاءة دبة التلوث. يقضي على إضاءة لمبة المكينة P0420 و P0430 ويضبط صرفية البنزين والديزل بدقة عالية.',
    fuelType: 'universal',
    category: 'o2_sensor',
    price: 390,
    originalPrice: 470,
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
    oemNumber: 'DENSO-234-9049 / 89467-33080',
    compatibleCars: [
      'تويوتا لاندكروزر وهايلوكس وكامري ولكزس',
      'نيسان باترول وماكسيما وألتيما',
      'هيونداي سوناتا وإلنترا وتوسان'
    ],
    inStock: true,
    stockCount: 20,
    rating: 4.9,
    reviewsCount: 35,
    featured: false
  }
];

export const INITIAL_REVIEWS: ProductReview[] = [
  {
    id: 'rev-01',
    productId: 'dpf-hilux-01',
    authorName: 'أبو فهد الشمري',
    rating: 5,
    carModel: 'تويوتا هايلوكس دبل ديزل 2020',
    date: 'منذ يومين',
    comment: 'ما شاء الله تبارك الله، كنت أعاني من لمبة الفلتر والدخان الأسود وعزم الموتر طايح. ركبت الدبة هذي وبفضل الله اختفت المشاكل تماماً واجتزت الفحص الدوري بالرياض من أول محاولة!',
    isVerified: true,
    recommend: true
  },
  {
    id: 'rev-02',
    productId: 'dpf-hilux-01',
    authorName: 'سلطان القحطاني',
    rating: 5,
    carModel: 'فورتشنر ديزل 2021',
    date: 'منذ أسبوع',
    comment: 'التعامل سريع جداً والدفع عبر واتساب أو جوجل باي كان سلس، أرسلوا لي رقم التتبع والشحنة وصلتني خميس مشيط مغلفة بإحكام.',
    isVerified: true,
    recommend: true
  },
  {
    id: 'rev-03',
    productId: 'cat-patrol-02',
    authorName: 'محمد الدوسري',
    rating: 5,
    carModel: 'نيسان باترول بلاتينيوم 400',
    date: 'منذ 3 أيام',
    comment: 'دبة ممتازة جداً فرقت في صرفية البنزين وريحة الكربون اختفت والحرارة تحت السيارة نزلت. أنصح بها وبشدة لأصحاب الباترول.',
    isVerified: true,
    recommend: true
  },
  {
    id: 'rev-04',
    productId: 'dpf-isuzu-03',
    authorName: 'م. خالد الحربي',
    rating: 5,
    carModel: 'إيسوزو ديماكس جي تي 2022',
    date: 'منذ 5 أيام',
    comment: 'جودة خيالية مقارنة بسعر الوكالة. تركب مقاس بلدها بدون أي قص، وسويت إعادة برمجة سريعة والموتر صار يطرب.',
    isVerified: true,
    recommend: true
  }
];

export const INITIAL_MARQUEE_CONFIG: MarqueeConfig = {
  enabled: true,
  speedSeconds: 28,
  pauseOnHover: true,
  sponsorText: 'برعاية يوسف الأحمدي',
  sponsorPhone: '0565911414',
  announcements: [
    {
      id: 'mq-1',
      text: 'متجر دبات التلوث الديزل والبنزين - فلاتر بيئة DPF ودبات تلوث أصلية لكافة أنواع المركبات',
      badge: 'إعلان رئيسي',
      icon: 'flame',
      active: true
    },
    {
      id: 'mq-2',
      text: 'برعاية يوسف الأحمدي | لطلب الاستشارة والمطابقة الفورية عبر الهاتف أو واتساب: 0565911414',
      badge: 'إشراف مباشر',
      icon: 'phone',
      active: true
    },
    {
      id: 'mq-3',
      text: 'الآن الدفع السريع والآمن بنقرة واحدة عبر Google Pay وواتساب أعمال',
      badge: 'جديد الدفع',
      icon: 'google_pay',
      active: true
    },
    {
      id: 'mq-4',
      text: 'اجتياز الفحص الدوري 100% والتخلص التام من روائح الكربون والدخان الأسود ولمبة المكينة',
      badge: 'فحص دوري',
      icon: 'check',
      active: true
    },
    {
      id: 'mq-5',
      text: 'شحن وتوصيل فوري سريع لكافة مدن ومناطق المملكة والخليج مع تتبع مباشر',
      badge: 'شحن سريع',
      icon: 'tag',
      active: true
    }
  ]
};

export const INITIAL_STORE_CONTENT: StoreContentConfig = {
  aboutUsTitle: 'من نحن - متجر ومعمل دبات التلوث',
  aboutUsText: 'نحن في متجر ومعمل دبات التلوث لسيارات الديزل والبنزين برعاية يوسف الأحمدي، متخصصون في توفير وتوريد فلاتر بيئة الديزل (DPF) ودبات البيئة الأصلية المطابقة لاشتراطات الفحص الدوري السعودي بنسبة 100%. نحرص على معالجة انبعاثات الكربون والدخان الأسود وحل مشكلة لمبة المحرك (Check Engine) مع استعادة عزم المحرك الكامل، ونوفر الدفع السريع والآمن عبر Google Pay وواتساب أعمال مع شحن سريع لكافة مناطق المملكة.',
  workshopTitle: 'معمل دبات التلوث المتقدم',
  workshopText: 'معمل دبات التلوث المجهز بأحدث أجهزة قياس الضغط العكسي وتصفية جزيئات الكربون والفحص الميكانيكي الدقيق لأنظمة العوادم والشكمانات، بإشراف وخبرة هندسية دقيقة بقيادة يوسف الأحمدي لضمان أعلى معايير الأداء والنقاء واجتياز الفحص الدوري.',
  workshopPoem: 'عَزْمٌ يَسِيرُ ونَقَاءٌ يَسُود .. وَصَوْتُ الشَّكْمَانِ صَافٍ كَالرُّعُود\nنَصُفِّي دُخَانَ العَادِمِ بِعَزْمٍ وإِتْقَان .. وَنُعِيدُ لِلْمَوْتَرِ هَيْبَتَهُ فِي كُلِّ مَيْدَان',
  workshopBgImage: '/assets/aistudio/hero_exhaust_banner_1793965129999_f2d03f14.jpg',
  complaintsPhone: '0565911517'
};


