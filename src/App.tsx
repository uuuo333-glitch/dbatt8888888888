/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { ImageEditorModal } from './components/ImageEditorModal';
import { ExternalProductModal } from './components/ExternalProductModal';
import { WallpaperThemeModal } from './components/WallpaperThemeModal';
import { GoogleSearchPreviewModal } from './components/GoogleSearchPreviewModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { LiveChatWidget } from './components/LiveChatWidget';
import { Footer } from './components/Footer';
import { EnhancedSearchBar } from './components/EnhancedSearchBar';
import { SocialShareBar } from './components/SocialShareBar';
import { GooglePayModal } from './components/GooglePayModal';
import { AiContentGeneratorModal } from './components/AiContentGeneratorModal';
import { AboutAndWorkshopSection } from './components/AboutAndWorkshopSection';
import {
  Filter,
  Grid,
  Search
} from 'lucide-react';
import { ProductCategory } from './types';

const StorefrontContent: React.FC = () => {
  const {
    products,
    searchTerm,
    setSearchTerm,
    selectedFuel,
    setSelectedFuel,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    maxPrice,
    minRating,
    inStockOnly,
    sortBy,
    resetFilters,
    isOwner,
    activeWallpaper,
    wallpaperOpacity,
    setExternalImportModalOpen
  } = useApp();

  // Display mode toggle: Full Rich Card vs "فقط الصورة في السعر"
  const [showOnlyImageAndPriceMode, setShowOnlyImageAndPriceMode] = useState<boolean>(false);

  // Categories list
  const categoryFilters: { id: ProductCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'كافة التصنيفات' },
    { id: 'dpf_filter', label: 'فلاتر ديزل DPF' },
    { id: 'catalytic_petrol', label: 'دبات بيئة بنزين' },
    { id: 'sport_cat', label: 'دبات رياضية High Flow' },
    { id: 'o2_sensor', label: 'حساسات شكمان وأوكسجين' },
    { id: 'cleaner_additive', label: 'منظفات وبخاخات DPF' }
  ];

  // Filter products based on search, fuel type, category, price, rating, stock, and sorting
  const filteredProducts = products
    .filter(product => {
      // Search query match
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase().trim();
        const matchName = product.name.toLowerCase().includes(term);
        const matchEn = product.nameEn?.toLowerCase().includes(term);
        const matchOem = product.oemNumber?.toLowerCase().includes(term);
        const matchCars = product.compatibleCars?.some(c => c.toLowerCase().includes(term));
        const matchDesc = product.description.toLowerCase().includes(term);
        if (!matchName && !matchEn && !matchOem && !matchCars && !matchDesc) {
          return false;
        }
      }

      // Fuel Type filter
      if (selectedFuel !== 'all') {
        if (product.fuelType !== 'universal' && product.fuelType !== selectedFuel) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'all') {
        if (product.category !== selectedCategory) {
          return false;
        }
      }

      // Price range
      if (product.price < minPrice || product.price > maxPrice) {
        return false;
      }

      // Min Rating
      if (minRating > 0 && product.rating < minRating) {
        return false;
      }

      // Stock status
      if (inStockOnly && !product.inStock) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'price_asc') {
        return a.price - b.price;
      }
      if (sortBy === 'price_desc') {
        return b.price - a.price;
      }
      if (sortBy === 'reviews_count') {
        return b.reviewsCount - a.reviewsCount;
      }
      return 0;
    });

  return (
    <div className="relative min-h-screen text-slate-100 flex flex-col font-['Cairo',sans-serif]">
      {/* Dynamic Background Wallpaper Layer: Supports Videos, Images, and Patterns */}
      {activeWallpaper.type === 'video' && activeWallpaper.videoUrl ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          key={activeWallpaper.videoUrl}
          className="fixed inset-0 w-full h-full object-cover pointer-events-none z-0 transition-opacity duration-700"
          src={activeWallpaper.videoUrl}
          style={{ filter: 'brightness(0.5)' }}
        />
      ) : (
        <div
          className="fixed inset-0 pointer-events-none z-0 transition-all duration-700 bg-cover bg-center bg-fixed"
          style={{
            background: activeWallpaper.cssBackground,
            filter: activeWallpaper.type === 'image' ? 'brightness(0.7)' : 'none'
          }}
        />
      )}

      {/* Dark Opacity Overlay for Optimal Text Readability */}
      <div
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-300"
        style={{
          backgroundColor: '#0b0f17',
          opacity: wallpaperOpacity / 100
        }}
      />

      {/* Main Content Layer */}
      <div className="relative z-10 flex flex-col flex-1">
        <Header />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
          {/* Hero Showcase */}
          <HeroBanner />

          {/* Social Channels & Share Bar */}
          <SocialShareBar />

          {/* Enhanced Search & Auto-Suggest System */}
          <EnhancedSearchBar />

          {/* Catalog Controls & Filters */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs no-scrollbar">
                <span className="text-slate-400 flex items-center gap-1 ml-1 flex-shrink-0">
                  <Filter className="w-3.5 h-3.5 text-amber-400" />
                  <span>التصنيف:</span>
                </span>
                {categoryFilters.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                        : 'bg-slate-950/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* View Mode Toggle: Standard vs "فقط الصورة في السعر" */}
              <div className="flex items-center gap-2 self-end md:self-auto flex-shrink-0">
                <button
                  onClick={() => setShowOnlyImageAndPriceMode(!showOnlyImageAndPriceMode)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    showOnlyImageAndPriceMode
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                      : 'bg-slate-950/80 text-slate-300 border-slate-700 hover:text-white'
                  }`}
                  title="تفعيل نمط العرض السريع (يظهر فقط الصورة في السعر)"
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span>نمط: الصورة والسعر فقط</span>
                </button>
              </div>
            </div>

            {/* Results count & active filter tags */}
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <div className="flex flex-wrap items-center gap-2">
                <span>
                  عرض <strong className="text-white font-mono">{filteredProducts.length}</strong> من أصل {products.length} دبة تلوث
                </span>
                {selectedFuel !== 'all' && (
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[11px]">
                    وقود: {selectedFuel === 'diesel' ? 'ديزل DPF' : 'بنزين'}
                  </span>
                )}
                {selectedCategory !== 'all' && (
                  <span className="px-2 py-0.5 rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/20 text-[11px]">
                    {categoryFilters.find(c => c.id === selectedCategory)?.label}
                  </span>
                )}
                {searchTerm && (
                  <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 text-[11px]">
                    بحث: "{searchTerm}"
                  </span>
                )}
                {minRating > 0 && (
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[11px]">
                    ★ {minRating}+ نجوم
                  </span>
                )}
                {inStockOnly && (
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[11px]">
                    المتوفر فقط
                  </span>
                )}
              </div>

              {(selectedFuel !== 'all' || selectedCategory !== 'all' || searchTerm || minRating > 0 || inStockOnly) && (
                <button
                  onClick={resetFilters}
                  className="text-amber-400 hover:underline text-[11px] font-semibold"
                >
                  إعادة ضبط الفلاتر
                </button>
              )}
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 px-4 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">
                  لم يتم العثور على دبات تلوث مطابقة لبحثك
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  تأكد من كتابة اسم السيارة أو رقم القطعة OEM، أو تواصل معنا مباشرة عبر واتساب للمساعدة في إيجاد الدبة المناسبة لسيارتك.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2 pt-2">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                >
                  عرض جميع المنتجات
                </button>

                {/* Strictly hidden from customers: only visible to Store Owner */}
                {isOwner && (
                  <button
                    onClick={() => setExternalImportModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs border border-slate-700"
                  >
                    إضافة دبة من المواقع (صورة وسعر)
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div
              className={`grid gap-5 sm:gap-6 ${
                showOnlyImageAndPriceMode
                  ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              }`}
            >
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  compactOnlyImageAndPrice={showOnlyImageAndPriceMode}
                />
              ))}
            </div>
          )}
          {/* Bottom Section: من نحن & معمل دبات التلوث مع خلفية الصورة والشعر */}
          <AboutAndWorkshopSection />
        </main>

        <Footer />
      </div>

      {/* Interactive Modals */}
      <ProductDetailModal />
      <CartDrawer />
      <AuthModal />
      <ImageEditorModal />
      <ExternalProductModal />
      <WallpaperThemeModal />
      <GoogleSearchPreviewModal />
      <AdminDashboardModal />
      <VideoPlayerModal />
      <LiveChatWidget />
      <GooglePayModal />
      <AiContentGeneratorModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <StorefrontContent />
    </AppProvider>
  );
}
