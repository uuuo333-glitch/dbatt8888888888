import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  MessageCircle,
  PlusCircle,
  Video,
  Award,
  CreditCard,
  Phone
} from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const {
    setSelectedFuel,
    isOwner,
    setExternalImportModalOpen,
    ownerWhatsappNumber,
    openVideoPlayer,
    openGooglePay,
    setAiGeneratorModalOpen
  } = useApp();

  const handleOpenGeneralWhatsApp = () => {
    const clean = ownerWhatsappNumber.replace(/\D/g, '');
    const text = encodeURIComponent('السلام عليكم ورحمة الله، أود الاستفسار عن دبة التلوث المناسبة لسيارتي مع يوسف الأحمدي.');
    window.open(`https://wa.me/${clean}?text=${text}`, '_blank');
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/90 via-slate-950/95 to-slate-900/90 shadow-2xl p-6 sm:p-10 mb-8 backdrop-blur-md">
      {/* Glow backgrounds */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left Column: Headings & Value Props */}
        <div className="flex-1 text-right space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
              <Sparkles className="w-4 h-4" />
              <span>المتجر الأول المتخصص في أنظمة عوادم وفلاتر البيئة</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black">
              <span>برعاية: يوسف الأحمدي</span>
              <a href="tel:0565911414" className="font-mono text-white underline" dir="ltr">0565911414</a>
            </div>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            متجر <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500">دبات التلوث</span> لسيارات الديزل والبنزين
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            فلاتر بيئة ديزل <span className="text-amber-400 font-bold">DPF</span> ودبات تلوث بنزين سيراميكية ومعدنية أصلية. تخلص نهائياً من الدخان الأسود ورائحة الكربون ولمبة فحص المحرك، مع <span className="text-white font-semibold underline decoration-amber-500">اجتياز الفحص الدوري السعودي 100%</span> والدفع المباشر عبر Google Pay وواتساب أعمال.
          </p>

          {/* Key Advantages Grid (Notice: No warranties as requested) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div className="text-right">
                <span className="block text-xs font-bold text-white">فحص دوري معتمد 100%</span>
                <span className="block text-[10px] text-slate-400">إلغاء لمبة المكينة فوراً</span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="px-2 py-0.5 rounded bg-white text-slate-950 font-black text-[10px] shadow-sm">
                GPay
              </div>
              <div className="text-right">
                <span className="block text-xs font-bold text-white">دفع سريع Google Pay</span>
                <span className="block text-[10px] text-slate-400">بنقرة واحدة وآمن</span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 col-span-2 sm:col-span-1">
              <MessageCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div className="text-right">
                <span className="block text-xs font-bold text-white">طلب وتنسيق واتساب</span>
                <span className="block text-[10px] text-slate-400">تواصل مباشر 0565911414</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button
              onClick={() => setSelectedFuel('diesel')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <span>تصفح فلاتر الديزل DPF</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => setSelectedFuel('petrol')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-sm transition-all"
            >
              <span>دبات بيئة البنزين</span>
            </button>

            {/* Google Pay Fast Checkout CTA */}
            <button
              onClick={() => openGooglePay({ isCart: true })}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-black text-xs shadow-md transition-all"
            >
              <span className="font-semibold text-slate-800">Google</span>
              <span className="font-black text-slate-950">Pay</span>
              <span className="text-[11px] font-bold text-slate-700">شراء سريع</span>
            </button>

            <button
              onClick={handleOpenGeneralWhatsApp}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 font-semibold text-xs transition-all"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>استشارة واتساب: 0565911414</span>
            </button>

            {/* ONLY VISIBLE TO STORE OWNER (Hidden from customers) */}
            {isOwner && (
              <button
                onClick={() => setExternalImportModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-3 rounded-xl bg-sky-950/30 hover:bg-sky-950/50 text-sky-400 border border-sky-500/30 font-bold text-xs transition-all"
                title="خاص بالمالك: إضافة منتجات من المواقع الإلكترونية"
              >
                <PlusCircle className="w-4 h-4" />
                <span>إضافة منتج من المواقع (للمالك)</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Visual Showcase using the uploaded asset! */}
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 shadow-2xl group">
            <img
              src="/assets/aistudio/hero_exhaust_banner_1793965129999_f2d03f14.jpg"
              alt="نظام عادم ودبة بيئة رياضية مركبة"
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            {/* Video overlay trigger */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <button
                onClick={() =>
                  openVideoPlayer(
                    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
                    'فحص واختبار دبة التلوث وفلتر الديزل DPF',
                    'نظام عادم ودبة بيئة بورش GT3 HJS'
                  )
                }
                className="w-14 h-14 rounded-full bg-amber-500/90 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-xl shadow-amber-500/40 transition-transform transform hover:scale-110 mb-2"
                title="شاهد تجربة الفحص والصوت بالفيديو"
              >
                <Video className="w-7 h-7 fill-slate-950 ml-0.5" />
              </button>
              <span className="text-xs font-bold text-white drop-shadow">
                شاهد بالفيديو: تجربة تصفية الدخان وصوت الشكمان
              </span>
              <span className="text-[10px] text-amber-400 mt-1 font-bold">
                ورشة متخصصة • برعاية يوسف الأحمدي 🚗🔊
              </span>
            </div>

            <div className="p-3 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">كفاءة الفلترة المعتمدة:</span>
              <span className="font-mono text-emerald-400 font-bold">99.2% تصفية كربون</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
