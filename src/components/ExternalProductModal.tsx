import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Globe,
  Image,
  DollarSign,
  Plus,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Layers,
  Fuel
} from 'lucide-react';
import { FuelType } from '../types';

export const ExternalProductModal: React.FC = () => {
  const {
    externalImportModalOpen,
    setExternalImportModalOpen,
    importExternalProduct
  } = useApp();

  const [imageUrl, setImageUrl] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState<number>(1450);
  const [fuelType, setFuelType] = useState<FuelType>('diesel');
  const [showSuccess, setShowSuccess] = useState(false);

  // Sample quick templates from external automotive sites
  const samplePresets = [
    {
      label: 'أمازون: دبة بيئة بنزين عالمية 2.5 إنش',
      image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80',
      sourceUrl: 'https://amazon.sa/dp/B08CATSAMPLE',
      name: 'دبة بيئة معدنية 2.5 إنش مستوردة من أمازون',
      price: 1350,
      fuelType: 'petrol' as FuelType
    },
    {
      label: 'إيباي: فلتر ديزل DPF شاحنات ميتسوبيشي',
      image: 'https://images.unsplash.com/photo-1558441719-74e2d334e2c0?auto=format&fit=crop&w=800&q=80',
      sourceUrl: 'https://ebay.com/itm/DPF-MITSUBISHI-L200',
      name: 'فلتر ديزل DPF أصلي مستورد من إيباي لسيارات ميتسوبيشي L200',
      price: 1720,
      fuelType: 'diesel' as FuelType
    },
    {
      label: 'علي إكسبرس: بخاخ ومحلول تنظيف DPF',
      image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=800&q=80',
      sourceUrl: 'https://aliexpress.com/item/100500cleaner',
      name: 'محلول كيميائي لإذابة كربون فلاتر الديزل',
      price: 195,
      fuelType: 'universal' as FuelType
    }
  ];

  if (!externalImportModalOpen) return null;

  const handleApplyPreset = (preset: typeof samplePresets[0]) => {
    setImageUrl(preset.image);
    setSourceUrl(preset.sourceUrl);
    setProductName(preset.name);
    setPrice(preset.price);
    setFuelType(preset.fuelType);
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl.trim() || !price) {
      alert('يرجى وضع رابط صورة المنتج وتحديد السعر');
      return;
    }

    importExternalProduct({
      imageUrl: imageUrl.trim(),
      price: Number(price),
      name: productName.trim() || `منتج مستورد (${price} ر.س)`,
      sourceUrl: sourceUrl.trim(),
      fuelType
    });

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setExternalImportModalOpen(false);
      setImageUrl('');
      setProductName('');
      setSourceUrl('');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-auto text-right">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                إضافة منتجات من المواقع الإلكترونية (فقط الصورة في السعر)
              </h3>
              <p className="text-xs text-slate-400">
                أدخل رابط صورة المنتج والسعر لإضافته فوراً بنمط العرض السريع
              </p>
            </div>
          </div>

          <button
            onClick={() => setExternalImportModalOpen(false)}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6">
          {/* Quick Preset Buttons */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">
              نماذج جاهزة للاستيراد السريع (أمازون، إيباي، علي إكسبرس):
            </label>
            <div className="flex flex-wrap gap-2">
              {samplePresets.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyPreset(p)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-[11px] text-slate-200 font-medium transition-all hover:border-amber-500/40"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleImportSubmit} className="space-y-4">
            {/* Image URL Input */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                رابط صورة المنتج من الموقع الخارجي: *
              </label>
              <div className="relative">
                <input
                  type="url"
                  required
                  placeholder="https://example.com/product-image.jpg"
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pr-9 pl-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                />
                <Image className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
              </div>
            </div>

            {/* Price & Fuel Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  السعر في المتجر (بالريال السعودي): *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="1500"
                    value={price}
                    onChange={e => setPrice(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pr-9 pl-12 py-2.5 text-xs text-amber-400 font-bold font-mono focus:outline-none focus:border-amber-500"
                  />
                  <DollarSign className="w-4 h-4 text-amber-400 absolute right-3 top-3" />
                  <span className="text-[11px] text-slate-400 absolute left-3 top-3">ر.س</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  نوع الوقود:
                </label>
                <select
                  value={fuelType}
                  onChange={e => setFuelType(e.target.value as FuelType)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="diesel">ديزل (فلتر DPF)</option>
                  <option value="petrol">بنزين (دبة بيئة Catalytic)</option>
                  <option value="universal">شامل ديزل وبنزين</option>
                </select>
              </div>
            </div>

            {/* Source URL & Name (Optional) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">
                  رابط صفحة المنتج الأصلية (اختياري):
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={sourceUrl}
                  onChange={e => setSourceUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">
                  اسم أو وصف قصير (اختياري):
                </label>
                <input
                  type="text"
                  placeholder="مثال: دبة تلوث إيفرست مستوردة"
                  value={productName}
                  onChange={e => setProductName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* LIVE PREVIEW CARD: Demonstrating "فقط الصورة في السعر" */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold text-amber-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  معاينة المنتج بنمط "فقط الصورة في السعر":
                </span>
                <span className="text-[10px] text-slate-500">جاهز للعرض الفوري</span>
              </div>

              <div className="w-56 mx-auto rounded-2xl bg-slate-900 border border-slate-700 overflow-hidden shadow-xl">
                <div className="relative aspect-square bg-slate-950">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="معاينة"
                      className="w-full h-full object-cover"
                      onError={() => {}}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs">
                      ضع رابط الصورة أعلاه
                    </div>
                  )}

                  {/* Prominent Price Tag Overlay */}
                  <div className="absolute bottom-2.5 right-2.5 left-2.5 bg-slate-950/90 border border-amber-500/50 px-3 py-1.5 rounded-xl flex items-baseline justify-between backdrop-blur-md">
                    <span className="text-amber-400 font-mono font-black text-sm">
                      {price.toLocaleString('ar-SA')} ر.س
                    </span>
                    <span className="text-[10px] text-emerald-400 font-semibold">
                      {fuelType === 'diesel' ? 'ديزل DPF' : 'بنزين'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة المنتج للمتجر فوراً (صورة وسعر)</span>
            </button>

            {showSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>تمت إضافة المنتج بنجاح! يظهر الآن في المتجر بصورته وسعره.</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
