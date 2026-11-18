import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StoreMarquee } from './StoreMarquee';
import {
  ShoppingBag,
  Palette,
  Search,
  User,
  ShieldCheck,
  Globe,
  SlidersHorizontal,
  Flame,
  Fuel,
  LogOut,
  PlusCircle,
  Menu,
  X,
  PhoneCall,
  Sparkles,
  Phone,
  CreditCard
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    storeName,
    cartCount,
    setCartOpen,
    currentUser,
    isOwner,
    setAuthModalOpen,
    setAuthModalMode,
    logout,
    setWallpaperThemeModalOpen,
    setGooglePreviewModalOpen,
    setAdminDashboardOpen,
    setExternalImportModalOpen,
    setAiGeneratorModalOpen,
    openGooglePay,
    selectedFuel,
    setSelectedFuel
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      {/* 1. Moving Marquee Announcement Ribbon */}
      <StoreMarquee />

      {/* 2. Top Info & SEO / Sponsor Strip */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Sponsorship & Inspection Pass */}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-amber-400 font-bold">
              <span>برعاية: يوسف الأحمدي</span>
              <a
                href="tel:0565911414"
                className="text-white hover:text-amber-400 font-mono text-xs mr-1 underline decoration-amber-500"
                dir="ltr"
              >
                0565911414
              </a>
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden md:inline text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              اجتياز الفحص الدوري المعتمد 100%
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            {/* Complaints Phone */}
            <span className="flex items-center gap-1 text-rose-400 font-bold">
              <span>الشكاوى:</span>
              <a
                href="tel:0565911517"
                className="text-white hover:text-rose-300 font-mono text-xs underline"
                dir="ltr"
              >
                0565911517
              </a>
            </span>
          </div>

          {/* Quick Tools: Google Pay for customers, and Owner-Only Admin Tools */}
          <div className="flex items-center gap-2.5">
            {/* Google Pay badge trigger (Customer + Owner) */}
            <button
              onClick={() => openGooglePay({ isCart: true })}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white text-slate-950 font-bold text-[11px] shadow-sm hover:bg-slate-100 transition-colors"
              title="دفع سريع وآمن عبر Google Pay"
            >
              <span className="font-semibold text-slate-700">Google</span>
              <span className="font-black text-slate-950">Pay</span>
            </button>

            {/* STRICTLY OWNER-ONLY (Hidden from customers as requested) */}
            {isOwner && (
              <>
                <span className="text-slate-600 hidden sm:inline">|</span>

                {/* AI Generator button */}
                <button
                  onClick={() => setAiGeneratorModalOpen(true)}
                  className="flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 text-amber-300 border border-amber-500/40 text-[11px] font-bold transition-all shadow-sm"
                  title="خاص بالمالك: توليد العناوين والوصف بالذكاء الاصطناعي (Gemini AI)"
                >
                  <Sparkles className="w-3 h-3 text-amber-400 animate-spin" />
                  <span>الذكاء الاصطناعي (للمالك)</span>
                </button>

                {/* Google SEO SERP Preview */}
                <button
                  onClick={() => setGooglePreviewModalOpen(true)}
                  className="flex items-center gap-1 text-sky-400 hover:text-sky-300 transition-colors font-medium bg-sky-950/40 px-2 py-0.5 rounded border border-sky-500/20 text-[11px]"
                  title="خاص بالمالك: معاينة ظهور المنتجات في بحث Google"
                >
                  <Globe className="w-3 h-3 text-sky-400" />
                  <span>ظهور في Google</span>
                </button>

                {/* Wallpapers / Themes */}
                <button
                  onClick={() => setWallpaperThemeModalOpen(true)}
                  className="hidden sm:flex items-center gap-1 text-slate-300 hover:text-amber-400 transition-colors text-[11px]"
                  title="خاص بالمالك: تغيير الثيم والخلفيات"
                >
                  <Palette className="w-3 h-3 text-amber-400" />
                  <span>الثيم والخلفيات</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 3. Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20 border border-amber-400/30 flex-shrink-0">
              <Flame className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                  <span>دبات التلوث</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">
                    ديزل & بنزين
                  </span>
                </h1>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400">
                برعاية يوسف الأحمدي • 0565911414 • دفع Google Pay وواتساب أعمال
              </p>
            </div>
          </div>

          {/* Quick Fuel Selection Tabs in Header */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setSelectedFuel('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedFuel === 'all'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              الكل
            </button>
            <button
              onClick={() => setSelectedFuel('diesel')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedFuel === 'diesel'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              🛢️ فلاتر ديزل DPF
            </button>
            <button
              onClick={() => setSelectedFuel('petrol')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedFuel === 'petrol'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              ⛽ دبات بيئة بنزين
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* ONLY VISIBLE TO STORE OWNER (Hidden from customers as requested!) */}
            {isOwner && (
              <button
                onClick={() => setExternalImportModalOpen(true)}
                className="hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30 text-xs font-bold transition-all shadow-sm"
                title="خاص بالمالك: إضافة منتج من المواقع بالصورة والسعر"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>إضافة منتج (صورة وسعر)</span>
              </button>
            )}

            {/* Owner Admin Badge & Button */}
            {isOwner && (
              <button
                onClick={() => setAdminDashboardOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-xs font-bold shadow-lg shadow-amber-500/20 hover:brightness-110 transition-all"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>لوحة المالك</span>
              </button>
            )}

            {/* Cart Trigger */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white transition-all"
              title="سلة المشتريات والدفع"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Auth Buttons */}
            {currentUser ? (
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5">
                <div className="flex flex-col text-right">
                  <span className="text-xs font-semibold text-slate-200 max-w-[90px] truncate">
                    {isOwner ? 'المالك' : (currentUser as any).fullName || 'العميل'}
                  </span>
                  <span className="text-[10px] text-amber-400 font-mono">
                    {isOwner ? '0565911414' : (currentUser as any).email?.split('@')[0]}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="text-slate-400 hover:text-rose-400 p-1 transition-colors"
                  title="تسجيل الخروج"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setAuthModalMode('customer_login');
                    setAuthModalOpen(true);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/70 text-xs font-semibold transition-all"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>دخول العميل</span>
                </button>

                <button
                  onClick={() => {
                    setAuthModalMode('owner_login');
                    setAuthModalOpen(true);
                  }}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold transition-all"
                  title="الدخول برقم الجوال المالك فقط"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>دخول المالك</span>
                </button>
              </div>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-right">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs text-amber-400 font-bold">
              <span>برعاية يوسف الأحمدي</span>
              <a href="tel:0565911414" className="font-mono text-white underline">0565911414</a>
            </div>

            <button
              onClick={() => {
                openGooglePay({ isCart: true });
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-2 rounded-lg bg-white text-slate-950 text-xs font-bold"
            >
              <span>دفع سريع عبر Google Pay</span>
              <span className="font-black">GPay</span>
            </button>

            {/* OWNER-ONLY BUTTONS IN MOBILE DRAWER */}
            {isOwner && (
              <>
                <button
                  onClick={() => {
                    setAiGeneratorModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 p-2 rounded-lg bg-slate-800 text-amber-300 text-xs font-bold"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>مساعد الذكاء الاصطناعي (خاص بالمالك)</span>
                </button>

                <button
                  onClick={() => {
                    setExternalImportModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 p-2 rounded-lg bg-slate-800 text-amber-400 text-xs font-bold"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>إضافة منتج من المواقع (صورة وسعر فقط) - خاص بالمالك</span>
                </button>

                <button
                  onClick={() => {
                    setGooglePreviewModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 p-2 rounded-lg bg-slate-800 text-sky-400 text-xs"
                >
                  <Globe className="w-4 h-4 text-sky-400" />
                  <span>معاينة ظهور المنتجات في بحث Google (للمالك)</span>
                </button>

                <button
                  onClick={() => {
                    setWallpaperThemeModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 p-2 rounded-lg bg-slate-800 text-slate-200 text-xs"
                >
                  <Palette className="w-4 h-4 text-amber-400" />
                  <span>تغيير الثيم والخلفيات (للمالك)</span>
                </button>
              </>
            )}

            <div className="pt-2 border-t border-slate-800 text-xs text-rose-300 font-bold flex items-center justify-between">
              <span>رقم الشكاوى:</span>
              <a href="tel:0565911517" className="font-mono text-white underline">0565911517</a>
            </div>

            {!currentUser && (
              <button
                onClick={() => {
                  setAuthModalMode('owner_login');
                  setAuthModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 p-2 rounded-lg bg-amber-500/20 text-amber-400 text-xs font-bold"
              >
                <PhoneCall className="w-4 h-4" />
                <span>دخول المالك برقم الجوال</span>
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
