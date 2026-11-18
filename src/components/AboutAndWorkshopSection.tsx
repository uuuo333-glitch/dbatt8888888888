import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Flame,
  ShieldCheck,
  Phone,
  Edit,
  Check,
  X,
  Sparkles,
  Wrench,
  AlertCircle,
  MessageSquareQuote,
  Layers,
  Image as ImageIcon
} from 'lucide-react';

export const AboutAndWorkshopSection: React.FC = () => {
  const {
    storeContent,
    updateStoreContent,
    isOwner,
    complaintsPhone
  } = useApp();

  // Edit states for owner
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [aboutTitleInput, setAboutTitleInput] = useState(storeContent.aboutUsTitle);
  const [aboutTextInput, setAboutTextInput] = useState(storeContent.aboutUsText);

  const [isEditingWorkshop, setIsEditingWorkshop] = useState(false);
  const [workshopTitleInput, setWorkshopTitleInput] = useState(storeContent.workshopTitle);
  const [workshopTextInput, setWorkshopTextInput] = useState(storeContent.workshopText);
  const [workshopPoemInput, setWorkshopPoemInput] = useState(storeContent.workshopPoem);
  const [workshopBgInput, setWorkshopBgInput] = useState(storeContent.workshopBgImage);
  const [complaintsPhoneInput, setComplaintsPhoneInput] = useState(storeContent.complaintsPhone || '0565911517');

  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  const handleSaveAbout = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreContent({
      aboutUsTitle: aboutTitleInput.trim() || storeContent.aboutUsTitle,
      aboutUsText: aboutTextInput.trim() || storeContent.aboutUsText
    });
    setIsEditingAbout(false);
    setSavedNotice('تم حفظ وتحديث نص "من نحن" بنجاح!');
    setTimeout(() => setSavedNotice(null), 3000);
  };

  const handleSaveWorkshop = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreContent({
      workshopTitle: workshopTitleInput.trim() || storeContent.workshopTitle,
      workshopText: workshopTextInput.trim() || storeContent.workshopText,
      workshopPoem: workshopPoemInput.trim() || storeContent.workshopPoem,
      workshopBgImage: workshopBgInput.trim() || storeContent.workshopBgImage,
      complaintsPhone: complaintsPhoneInput.trim() || storeContent.complaintsPhone
    });
    setIsEditingWorkshop(false);
    setSavedNotice('تم حفظ وتحديث بيانات "معمل دبات التلوث والشعر" بنجاح!');
    setTimeout(() => setSavedNotice(null), 3000);
  };

  return (
    <section className="my-14 space-y-8 text-right font-['Cairo',sans-serif]">
      {savedNotice && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center justify-between">
          <span>{savedNotice}</span>
          <button onClick={() => setSavedNotice(null)} className="text-emerald-400">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 1. قسم: من نحن (About Us) */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 backdrop-blur-md shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Flame className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                {storeContent.aboutUsTitle}
              </h3>
              <span className="text-[11px] text-amber-400 font-bold block">
                برعاية يوسف الأحمدي • خدمة معتمدة بالمملكة
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Complaints Phone Direct Action */}
            <a
              href={`tel:${complaintsPhone || '0565911517'}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold transition-colors"
              title="رقم الشكاوى والاقتراحات"
            >
              <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
              <span>رقم الشكاوى:</span>
              <span className="font-mono text-white">{complaintsPhone || '0565911517'}</span>
            </a>

            {/* Owner Edit Button */}
            {isOwner && (
              <button
                onClick={() => {
                  setAboutTitleInput(storeContent.aboutUsTitle);
                  setAboutTextInput(storeContent.aboutUsText);
                  setIsEditingAbout(!isEditingAbout);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>{isEditingAbout ? 'إلغاء التعديل' : 'تعديل من نحن (للمالك)'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Edit Form or Text Display */}
        {isEditingAbout ? (
          <form onSubmit={handleSaveAbout} className="space-y-3">
            <div>
              <label className="text-xs text-slate-300 block mb-1">عنوان القسم:</label>
              <input
                type="text"
                value={aboutTitleInput}
                onChange={e => setAboutTitleInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-300 block mb-1">نص من نحن التفصيلي:</label>
              <textarea
                rows={5}
                value={aboutTextInput}
                onChange={e => setAboutTextInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white leading-relaxed focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow"
              >
                حفظ التعديل
              </button>
              <button
                type="button"
                onClick={() => setIsEditingAbout(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs"
              >
                إلغاء
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
              {storeContent.aboutUsText}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <div>
                  <span className="font-bold text-white block">اجتياز الفحص الدوري 100%</span>
                  <span className="text-[10px] text-slate-400">مطابقة دقيقة للمواصفات السعودية</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center gap-2.5">
                <Phone className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <div>
                  <span className="font-bold text-white block">إشراف: يوسف الأحمدي</span>
                  <a href="tel:0565911414" className="text-[10px] text-amber-400 font-mono underline block">
                    جوال ومحادثة: 0565911414
                  </a>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center gap-2.5">
                <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                <div>
                  <span className="font-bold text-white block">رقم الشكاوى والاقتراحات</span>
                  <a href={`tel:${complaintsPhone || '0565911517'}`} className="text-[10px] text-rose-400 font-mono underline block">
                    هاتف: {complaintsPhone || '0565911517'}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. قسم: معمل دبات التلوث مع خلفية الصورة والشعر */}
      <div
        className="relative overflow-hidden rounded-3xl border border-amber-500/40 p-6 sm:p-10 shadow-2xl text-white"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(11, 15, 23, 0.88), rgba(11, 15, 23, 0.96)), url("${storeContent.workshopBgImage || '/assets/aistudio/hero_exhaust_banner_1793965129999_f2d03f14.jpg'}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-500/20 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20 flex-shrink-0">
                <Wrench className="w-6 h-6 text-slate-950" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold border border-amber-500/30">
                  فحص هندسي ومعايرة متقدمة
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                  {storeContent.workshopTitle}
                </h3>
              </div>
            </div>

            {/* Owner Edit Button */}
            {isOwner && (
              <button
                onClick={() => {
                  setWorkshopTitleInput(storeContent.workshopTitle);
                  setWorkshopTextInput(storeContent.workshopText);
                  setWorkshopPoemInput(storeContent.workshopPoem);
                  setWorkshopBgInput(storeContent.workshopBgImage);
                  setComplaintsPhoneInput(storeContent.complaintsPhone || '0565911517');
                  setIsEditingWorkshop(!isEditingWorkshop);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow self-start sm:self-auto"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>{isEditingWorkshop ? 'إلغاء التعديل' : 'تعديل المعمل والشعر (للمالك)'}</span>
              </button>
            )}
          </div>

          {/* Edit Form or Visual Display */}
          {isEditingWorkshop ? (
            <form onSubmit={handleSaveWorkshop} className="space-y-4 bg-slate-950/90 p-5 rounded-2xl border border-slate-700">
              <div>
                <label className="text-xs text-slate-300 block mb-1">عنوان المعمل:</label>
                <input
                  type="text"
                  value={workshopTitleInput}
                  onChange={e => setWorkshopTitleInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">شعر / شعار معمل دبات التلوث:</label>
                <textarea
                  rows={3}
                  value={workshopPoemInput}
                  onChange={e => setWorkshopPoemInput(e.target.value)}
                  placeholder="اكتب أبيات الشعر أو الشعار الخاص بالمعمل..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-amber-300 font-bold leading-relaxed focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">وصف معمل دبات التلوث:</label>
                <textarea
                  rows={4}
                  value={workshopTextInput}
                  onChange={e => setWorkshopTextInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white leading-relaxed focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 block mb-1">رابط صورة خلفية المعمل:</label>
                  <input
                    type="text"
                    value={workshopBgInput}
                    onChange={e => setWorkshopBgInput(e.target.value)}
                    placeholder="/assets/aistudio/hero_exhaust_banner_1793965129999_f2d03f14.jpg"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">رقم الشكاوى والاقتراحات:</label>
                  <input
                    type="text"
                    value={complaintsPhoneInput}
                    onChange={e => setComplaintsPhoneInput(e.target.value)}
                    placeholder="0565911517"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow"
                >
                  حفظ البيانات وتحديث المعمل
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingWorkshop(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs"
                >
                  إلغاء
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {/* شعر معمل دبات التلوث المميز */}
              <div className="relative p-5 sm:p-7 rounded-2xl bg-slate-950/80 border border-amber-500/40 shadow-inner">
                <div className="flex items-center gap-2 mb-2 text-amber-400 text-xs font-bold">
                  <MessageSquareQuote className="w-4 h-4 text-amber-400" />
                  <span>شعر وشعار معمل دبات التلوث:</span>
                </div>
                <blockquote className="text-base sm:text-lg font-black text-amber-200 leading-loose whitespace-pre-line tracking-wide drop-shadow">
                  {storeContent.workshopPoem}
                </blockquote>
              </div>

              {/* تفاصيل المعمل */}
              <p className="text-slate-200 text-sm leading-relaxed max-w-4xl whitespace-pre-line">
                {storeContent.workshopText}
              </p>

              {/* نقاط القوة في المعمل */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-amber-400 font-bold block mb-0.5">معايرة الضغط العكسي</span>
                  <span className="text-[10px] text-slate-400">Backpressure Sensor Test</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-0.5">تصفية السناج والدخان</span>
                  <span className="text-[10px] text-slate-400">99.5% DPF Soot Elimination</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-sky-400 font-bold block mb-0.5">فحص خلايا البلاتين</span>
                  <span className="text-[10px] text-slate-400">Platinum Coating Check</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-white font-bold block mb-0.5">إشراف يوسف الأحمدي</span>
                  <span className="text-[10px] text-amber-400 font-mono">0565911414</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
