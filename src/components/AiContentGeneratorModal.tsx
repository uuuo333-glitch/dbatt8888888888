import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Sparkles,
  Wand2,
  Copy,
  Check,
  Plus,
  Car,
  Fuel,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { FuelType, ProductCategory } from '../types';

export const AiContentGeneratorModal: React.FC = () => {
  const {
    aiGeneratorModalOpen,
    setAiGeneratorModalOpen,
    generateAiProductContent,
    addProduct
  } = useApp();

  const [carModel, setCarModel] = useState('تويوتا هايلوكس 2.8 ديزل 2022');
  const [fuelType, setFuelType] = useState<FuelType>('diesel');
  const [category, setCategory] = useState<ProductCategory>('dpf_filter');
  const [keywords, setKeywords] = useState('اجتياز الفحص الدوري، معتمد مطابق للمواصفات، تصفية الدخان والكربون');
  
  const [isLoading, setIsLoading] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<any>(null);
  const [copiedTitle, setCopiedTitle] = useState(false);
  const [copiedDesc, setCopiedDesc] = useState(false);
  const [addedToStoreSuccess, setAddedToStoreSuccess] = useState(false);

  if (!aiGeneratorModalOpen) return null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!carModel.trim()) return;

    setIsLoading(true);
    try {
      const res = await generateAiProductContent({
        carModel: carModel.trim(),
        fuelType,
        category,
        keywords: keywords.trim()
      });
      setGeneratedResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddDirectlyToStore = () => {
    if (!generatedResult) return;

    const sampleImagesByFuel: Record<FuelType, string> = {
      diesel: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
      petrol: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
      universal: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80'
    };

    addProduct({
      name: generatedResult.title || `دبة تلوث ${carModel}`,
      nameEn: generatedResult.titleEn,
      description: generatedResult.description || '',
      fuelType,
      category,
      price: generatedResult.suggestedPrice || 1750,
      originalPrice: (generatedResult.suggestedPrice || 1750) + 300,
      image: sampleImagesByFuel[fuelType] || sampleImagesByFuel.diesel,
      oemNumber: generatedResult.oemNumber,
      compatibleCars: [carModel],
      inStock: true,
      stockCount: 10,
      filtrationEfficiency: generatedResult.filtrationEfficiency,
      warrantyMonths: generatedResult.warrantyMonths || 24
    });

    setAddedToStoreSuccess(true);
    setTimeout(() => {
      setAddedToStoreSuccess(false);
      setAiGeneratorModalOpen(false);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 text-right">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-slate-950 shadow-lg shadow-amber-500/20">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base sm:text-lg">
                  مساعد الذكاء الاصطناعي لكتابة العناوين والوصف
                </h3>
                <span className="text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/40 px-2 py-0.5 rounded-full font-bold">
                  Gemini 3.8 Flash AI
                </span>
              </div>
              <p className="text-xs text-slate-400">
                توليد عناوين جذابة لمحركات البحث، أوصاف تسويقية، ومواصفات مطابقة للفحص الدوري
              </p>
            </div>
          </div>

          <button
            onClick={() => setAiGeneratorModalOpen(false)}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto max-h-[78vh]">
          {/* Input Form */}
          <form onSubmit={handleGenerate} className="space-y-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Car className="w-4 h-4 text-amber-400" />
              <span>معلومات السيارة والقطعة المراد توليد وصف لها:</span>
            </h4>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">
                اسم السيارة والموديل وسنة الصنع: *
              </label>
              <input
                type="text"
                required
                placeholder="مثال: تويوتا هايلوكس 2.8 ديزل دبل 2022 أو نيسان باترول فتك V8"
                value={carModel}
                onChange={e => setCarModel(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">
                  نوع الوقود:
                </label>
                <select
                  value={fuelType}
                  onChange={e => setFuelType(e.target.value as FuelType)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="diesel">ديزل (فلتر DPF)</option>
                  <option value="petrol">بنزين (دبة بيئة Catalytic)</option>
                  <option value="universal">شامل ديزل وبنزين</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">
                  تصنيف القطعة:
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as ProductCategory)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="dpf_filter">فلاتر ديزل DPF</option>
                  <option value="catalytic_petrol">دبات بيئة بنزين OEM</option>
                  <option value="sport_cat">دبات رياضية 300 خلية High Flow</option>
                  <option value="o2_sensor">حساس أوكسجين وشكمان</option>
                  <option value="cleaner_additive">بخاخ ومنظف كربون DPF</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">
                كلمات إضافية ترغب بتركيز الذكاء الاصطناعي عليها:
              </label>
              <input
                type="text"
                placeholder="مثال: اجتياز الفحص الدوري، تخفيض صوت الشكمان، مطابقة أصلية للمركبة"
                value={keywords}
                onChange={e => setKeywords(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 hover:brightness-110 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>جاري الكتابة والتوليد بواسطة الذكاء الاصطناعي...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>توليد العنوان والوصف بالذكاء الاصطناعي فوراً</span>
                </>
              )}
            </button>
          </form>

          {/* Generated Result Output */}
          {generatedResult && (
            <div className="space-y-4 p-5 rounded-2xl bg-slate-950 border border-amber-500/30 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>المحتوى المقترح من الذكاء الاصطناعي:</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">
                  {generatedResult.source === 'gemini-3.8-flash' ? '✓ عبر Gemini 3.8 Flash' : '✓ ذكاء اصطناعي مدمج'}
                </span>
              </div>

              {/* Title Result */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>العنوان التسويقي (عنوان المنتج في المتجر وGoogle):</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedResult.title);
                      setCopiedTitle(true);
                      setTimeout(() => setCopiedTitle(false), 2000);
                    }}
                    className="flex items-center gap-1 text-[11px] text-amber-400 hover:underline"
                  >
                    {copiedTitle ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedTitle ? 'تم النسخ' : 'نسخ العنوان'}</span>
                  </button>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-sm font-bold text-white leading-relaxed">
                  {generatedResult.title}
                </div>
                {generatedResult.titleEn && (
                  <span className="text-[10px] text-slate-500 font-mono block">
                    {generatedResult.titleEn}
                  </span>
                )}
              </div>

              {/* Description Result */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>الوصف المقنع والمميزات:</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedResult.description);
                      setCopiedDesc(true);
                      setTimeout(() => setCopiedDesc(false), 2000);
                    }}
                    className="flex items-center gap-1 text-[11px] text-amber-400 hover:underline"
                  >
                    {copiedDesc ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedDesc ? 'تم النسخ' : 'نسخ الوصف'}</span>
                  </button>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  {generatedResult.description}
                </div>
              </div>

              {/* Specs Pills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {generatedResult.oemNumber && (
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">رقم OEM المقترح:</span>
                    <span className="font-mono text-white font-bold">{generatedResult.oemNumber}</span>
                  </div>
                )}

                {generatedResult.suggestedPrice && (
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">السعر المقترح:</span>
                    <span className="font-mono text-amber-400 font-bold">{generatedResult.suggestedPrice} ر.س</span>
                  </div>
                )}

                {generatedResult.filtrationEfficiency && (
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">كفاءة الفلترة:</span>
                    <span className="text-emerald-400 font-bold truncate block">{generatedResult.filtrationEfficiency}</span>
                  </div>
                )}

                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">فحص وتوافق:</span>
                  <span className="text-amber-400 font-bold">مطابق 100%</span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={handleAddDirectlyToStore}
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة المنتج فوراً إلى المتجر بهذا المحتوى</span>
                </button>
              </div>

              {addedToStoreSuccess && (
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>تمت إضافة المنتج بنجاح إلى قائمة المنتجات!</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
