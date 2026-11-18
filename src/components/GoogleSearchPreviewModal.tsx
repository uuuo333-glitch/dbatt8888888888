import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Globe,
  Search,
  CheckCircle2,
  Copy,
  ExternalLink,
  Star,
  Sparkles,
  Smartphone,
  Monitor,
  Code
} from 'lucide-react';

export const GoogleSearchPreviewModal: React.FC = () => {
  const {
    googlePreviewModalOpen,
    setGooglePreviewModalOpen,
    products,
    storeName
  } = useApp();

  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || '');
  const [deviceView, setDeviceView] = useState<'desktop' | 'mobile'>('desktop');
  const [copiedJsonLd, setCopiedJsonLd] = useState(false);

  if (!googlePreviewModalOpen) return null;

  const activeProduct = products.find(p => p.id === selectedProductId) || products[0];

  // Schema.org Product JSON-LD representation
  const jsonLdData = activeProduct
    ? {
        '@context': 'https://schema.org/',
        '@type': 'Product',
        name: activeProduct.name,
        image: [activeProduct.image, ...(activeProduct.additionalImages || [])],
        description: activeProduct.description,
        sku: activeProduct.id,
        mpn: activeProduct.oemNumber || activeProduct.id,
        brand: {
          '@type': 'Brand',
          name: 'متجر دبات التلوث الديزل والبنزين'
        },
        offers: {
          '@type': 'Offer',
          url: window.location.href,
          priceCurrency: 'SAR',
          price: activeProduct.price,
          priceValidUntil: '2027-12-31',
          itemCondition: 'https://schema.org/NewCondition',
          availability: activeProduct.inStock
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
          seller: {
            '@type': 'Organization',
            name: storeName
          }
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: activeProduct.rating,
          reviewCount: Math.max(1, activeProduct.reviewsCount),
          bestRating: '5',
          worstRating: '1'
        }
      }
    : null;

  const handleCopyJsonLd = () => {
    if (jsonLdData) {
      navigator.clipboard.writeText(JSON.stringify(jsonLdData, null, 2));
      setCopiedJsonLd(true);
      setTimeout(() => setCopiedJsonLd(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 text-right">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                محاكي ظهور المنتجات في بحث جوجل (Google Search & Rich Snippets)
              </h3>
              <p className="text-xs text-slate-400">
                معاينة كيفية ظهور متجرك ومنتجاتك بالنجوم والأسعار في نتائج Google
              </p>
            </div>
          </div>

          <button
            onClick={() => setGooglePreviewModalOpen(false)}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto max-h-[78vh]">
          {/* Controls: Product Selector & Device View */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <div className="flex-1">
              <label className="text-[11px] text-slate-400 block mb-1">
                اختر المنتج للمعاينة في جوجل:
              </label>
              <select
                value={selectedProductId}
                onChange={e => setSelectedProductId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                {products.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.price} ر.س)
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 self-end sm:self-auto">
              <button
                onClick={() => setDeviceView('desktop')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  deviceView === 'desktop'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>كمبيوتر</span>
              </button>

              <button
                onClick={() => setDeviceView('mobile')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  deviceView === 'mobile'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>جوال</span>
              </button>
            </div>
          </div>

          {/* REALISTIC GOOGLE SERP PREVIEW CARD */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-sky-400" />
              <span>معاينة نتيجة البحث في جوجل:</span>
            </span>

            {/* Google Search Result Box */}
            <div
              className={`mx-auto bg-white text-slate-900 rounded-2xl p-4 sm:p-5 shadow-2xl border border-slate-300 transition-all font-sans text-right ${
                deviceView === 'mobile' ? 'max-w-sm' : 'w-full'
              }`}
              dir="rtl"
            >
              {/* Google Search Bar Simulation */}
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100 text-xs text-gray-500">
                <Search className="w-3.5 h-3.5 text-gray-400" />
                <span>دبة تلوث {activeProduct?.fuelType === 'diesel' ? 'ديزل DPF' : 'بنزين'} فحص دوري الرياض</span>
              </div>

              {/* Favicon & Breadcrumb */}
              <div className="flex items-center gap-2 mb-1 text-xs text-gray-600">
                <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-[10px] text-white font-bold">
                  DPF
                </div>
                <div className="flex flex-col text-right">
                  <span className="font-semibold text-gray-800 text-[11px] leading-tight">
                    {storeName}
                  </span>
                  <span className="text-[10px] text-gray-500 truncate" dir="ltr">
                    https://dabat-store.sa › products › {activeProduct?.id}
                  </span>
                </div>
              </div>

              {/* SERP Title */}
              <h4 className="text-base sm:text-lg font-medium text-[#1a0dab] hover:underline cursor-pointer leading-snug mb-1">
                {activeProduct?.name} - فحص دوري معتمد 100% | متجر دبات التلوث
              </h4>

              {/* Rich Snippets Row (Rating + Price + Stock) */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600 mb-2">
                <div className="flex items-center gap-1 text-amber-600 font-bold">
                  <span className="text-xs">التقييم: {activeProduct?.rating.toFixed(1)}</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} className="w-3 h-3 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-gray-500 text-[11px]">
                    ({activeProduct?.reviewsCount} تقييم)
                  </span>
                </div>
                <span>·</span>
                <span className="font-semibold text-emerald-700">
                  السعر: {activeProduct?.price.toLocaleString('ar-SA')} ر.س
                </span>
                <span>·</span>
                <span className="text-emerald-600 font-medium">متوفر في المخزون (In Stock)</span>
              </div>

              {/* SERP Snippet Description */}
              <p className="text-xs sm:text-sm text-[#4d5156] leading-relaxed line-clamp-2">
                اشتري الآن <strong className="text-gray-900">{activeProduct?.name}</strong> بأفضل الأسعار. كفاءة فلترة عالية ومطابقة معتمدة، طلب مباشر ودفع عبر Google Pay وواتساب أعمال برعاية يوسف الأحمدي 0565911414 مع شحن سريع لجميع مدن المملكة.
              </p>

              {/* Rich snippet sitelinks */}
              <div className="mt-3 pt-2.5 border-t border-gray-100 flex flex-wrap gap-2 text-xs text-[#1a0dab]">
                <span className="hover:underline cursor-pointer">فلاتر ديزل DPF</span>
                <span>•</span>
                <span className="hover:underline cursor-pointer">دبات بيئة بنزين</span>
                <span>•</span>
                <span className="hover:underline cursor-pointer">طلب عبر واتساب</span>
              </div>
            </div>
          </div>

          {/* Schema.org JSON-LD Structured Data Section */}
          <div className="space-y-2 p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Code className="w-4 h-4" />
                <span>بيانات Schema.org المنظمة (JSON-LD) المضمنة تلقائياً:</span>
              </span>

              <button
                onClick={handleCopyJsonLd}
                className="flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition-colors"
              >
                <Copy className="w-3.5 h-3.5 text-amber-400" />
                <span>{copiedJsonLd ? 'تم النسخ!' : 'نسخ كود Schema'}</span>
              </button>
            </div>

            <pre className="p-3 bg-slate-900 rounded-xl text-[11px] font-mono text-emerald-400 overflow-x-auto max-h-48 border border-slate-800/80" dir="ltr">
              {JSON.stringify(jsonLdData, null, 2)}
            </pre>
          </div>

          {/* SEO Checklist */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
            <h5 className="text-xs font-bold text-white">
              جاهزية المتجر لمحركات البحث (SEO Checklist):
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>كود Schema.org Product و AutoPartsStore مضمن</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>وسوم OpenGraph و Twitter Cards مجهزة بالكامل</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>عناوين ووصف عربي مطابق لمعايير محرك بحث Google</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>توافق تام مع الهواتف الذكية وسرعة تحميل فائقة</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
