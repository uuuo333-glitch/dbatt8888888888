import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Flame,
  ShieldCheck,
  Phone,
  MessageCircle,
  Globe,
  Truck,
  RotateCcw,
  Sparkles,
  Award,
  CreditCard,
  Share2
} from 'lucide-react';

export const Footer: React.FC = () => {
  const {
    storeName,
    ownerWhatsappNumber,
    setGooglePreviewModalOpen,
    setWallpaperThemeModalOpen,
    setSelectedFuel,
    openGooglePay,
    isOwner,
    complaintsPhone
  } = useApp();

  const phone = '0565911414';
  const sponsor = 'يوسف الأحمدي';

  const handleWhatsAppChat = () => {
    window.open(`https://wa.me/966565911414?text=${encodeURIComponent('السلام عليكم ورحمة الله، تواصل بخصوص دبات التلوث مع يوسف الأحمدي.')}`, '_blank');
  };

  return (
    <footer className="mt-20 border-t border-slate-800 bg-slate-950/95 text-slate-400 text-xs text-right relative backdrop-blur-md">
      {/* Trust & Features Strip */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white block">اجتياز الفحص الدوري</span>
              <span className="text-[11px] text-slate-400">كفاءة معتمدة واختفاء الدخان</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white text-slate-950 shadow">
              <CreditCard className="w-5 h-5 text-slate-900" />
            </div>
            <div>
              <span className="font-bold text-white block">دفع فوري Google Pay</span>
              <span className="text-[11px] text-slate-400">شراء آمن ومحمي بنقرة واحدة</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white block">شحن سريع لكافة المدن</span>
              <span className="text-[11px] text-slate-400">توصيل لباب المنزل أو الورشة</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white block">طلب وتنسيق واتساب</span>
              <span className="text-[11px] text-slate-400">برعاية يوسف الأحمدي 0565911414</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info & Sponsorship */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 shadow-md">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">
                  دبات التلوث الديزل والبنزين
                </h3>
                <span className="text-[10px] text-amber-400 font-bold block">
                  برعاية: {sponsor}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              المتجر المتخصص لتوفير فلاتر بيئة الديزل DPF ودبات التلوث البنزين المعتمدة للفحص الدوري بجودة وكالة وأفضل الأسعار، مع الدفع المباشر عبر Google Pay وواتساب أعمال.
            </p>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={`tel:${phone}`}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>اتصال مباشر: {phone}</span>
              </a>

              <button
                onClick={handleWhatsAppChat}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>واتساب أعمال (0565911414)</span>
              </button>

              <a
                href={`tel:${complaintsPhone || '0565911517'}`}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold text-xs transition-colors"
              >
                <Phone className="w-4 h-4 text-rose-400" />
                <span>رقم الشكاوى: {complaintsPhone || '0565911517'}</span>
              </a>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white text-sm">أقسام المنتجات:</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setSelectedFuel('diesel')}
                  className="hover:text-amber-400 transition-colors"
                >
                  فلاتر ديزل DPF (هايلوكس، فورد، إيسوزو)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedFuel('petrol')}
                  className="hover:text-amber-400 transition-colors"
                >
                  دبات بيئة بنزين Catalytic Converters
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedFuel('all')}
                  className="hover:text-amber-400 transition-colors"
                >
                  دبات رياضية High Flow 300 خلية
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedFuel('all')}
                  className="hover:text-amber-400 transition-colors"
                >
                  حساسات الشكمان والأوكسجين O2 Sensors
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedFuel('all')}
                  className="hover:text-amber-400 transition-colors"
                >
                  بخاخات ومنظفات كربون DPF الألمانية
                </button>
              </li>
            </ul>
          </div>

          {/* SEO Car Models Index */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white text-sm">توافق دبات التلوث:</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              دبة هايلوكس ديزل 2.4 و 2.8 • دبة باترول بلاتينيوم فتك • فلاتر ديزل إيسوزو ديماكس وشاحنات NPR • دبة فورد رينجر وإيفرست • دبة لاندكروزر ديزل V8 • دبة تويوتا كامري وأفالون • دبة جمس يوكن وتاهو وسيلفرادو • بورش GT3 والسيارات الرياضية.
            </p>
          </div>

          {/* All Social Media Programs & Contact Channels */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white text-sm">قنوات التواصل والشكاوى:</h4>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              <a href="https://wa.me/966565911414" target="_blank" rel="noreferrer" className="p-1.5 bg-slate-900 rounded-lg hover:text-emerald-400 transition-colors">
                💬 واتساب أعمال
              </a>
              <a href="https://www.snapchat.com/add/dabat.store" target="_blank" rel="noreferrer" className="p-1.5 bg-slate-900 rounded-lg hover:text-yellow-400 transition-colors">
                👻 سناب شات
              </a>
              <a href="https://www.tiktok.com/@dabat.ksa" target="_blank" rel="noreferrer" className="p-1.5 bg-slate-900 rounded-lg hover:text-white transition-colors">
                🎵 تيك توك
              </a>
              <a href="https://instagram.com/dabat.filters" target="_blank" rel="noreferrer" className="p-1.5 bg-slate-900 rounded-lg hover:text-pink-400 transition-colors">
                📸 إنستغرام
              </a>
              <a href="https://x.com/dabat_sa" target="_blank" rel="noreferrer" className="p-1.5 bg-slate-900 rounded-lg hover:text-white transition-colors">
                ✖️ منصة إكس
              </a>
              <a href="https://youtube.com/@dabat-sa" target="_blank" rel="noreferrer" className="p-1.5 bg-slate-900 rounded-lg hover:text-red-400 transition-colors">
                ▶️ يوتيوب
              </a>
            </div>

            {/* ONLY VISIBLE TO STORE OWNER (Hidden from customers as requested) */}
            {isOwner && (
              <div className="flex flex-col gap-1.5 pt-2">
                <button
                  onClick={() => setGooglePreviewModalOpen(true)}
                  className="text-right text-xs text-sky-400 hover:underline flex items-center gap-1"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>محاكي ظهور المنتجات في بحث Google (للمالك)</span>
                </button>

                <button
                  onClick={() => setWallpaperThemeModalOpen(true)}
                  className="text-right text-xs text-amber-400 hover:underline"
                >
                  تغيير ثيم وخلفيات المتجر (للمالك)
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom copyright & Complaints phone */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {storeName} • برعاية يوسف الأحمدي (0565911414) • رقم الشكاوى (0565911517).</p>
          <div className="flex items-center gap-3 text-[11px]">
            <span>الدفع عبر Google Pay وواتساب</span>
            <span>•</span>
            <span>اجتياز الفحص الدوري 100%</span>
            <span>•</span>
            <span>معمل دبات التلوث</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
