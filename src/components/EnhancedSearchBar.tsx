import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  SlidersHorizontal,
  X,
  Fuel,
  Star,
  Check,
  RotateCcw,
  Sparkles,
  TrendingUp,
  Package,
  Layers,
  DollarSign
} from 'lucide-react';
import { ProductCategory, FuelType } from '../types';

export const EnhancedSearchBar: React.FC = () => {
  const {
    products,
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
    openProductDetail
  } = useApp();

  const [isFocused, setIsFocused] = useState(false);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Close autocomplete on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Popular related search suggestion chips
  const relatedSearchSuggestions = [
    { label: 'هايلوكس ديزل DPF', query: 'هايلوكس' },
    { label: 'باترول بلاتينيوم V8', query: 'باترول' },
    { label: 'فورد رينجر باي توربو', query: 'رينجر' },
    { label: 'إيسوزو ديماكس 3.0', query: 'إيسوزو' },
    { label: 'دبة بيئة كامري', query: 'كامري' },
    { label: 'دبة رياضية 300 خلية', query: 'رياضية' },
    { label: 'حساس أوكسجين دينسو', query: 'حساس' },
    { label: 'بخاخ تنظيف DPF', query: 'تنظيف' }
  ];

  // Autocomplete matching queries
  const autocompletePredictions = [
    'دبة تلوث تويوتا هايلوكس ديزل DPF',
    'دبة بيئة نيسان باترول V8',
    'فلتر ديزل إيسوزو ديماكس 3.0',
    'دبة بيئة تويوتا كامري وأفالون',
    'فلتر بيئة فورد رينجر توربو',
    'دبة بيئة رياضية 300 خلية معدنية',
    'حساس شكمان أوكسجين ياباني Denso',
    'محلول وبخاخ تنظيف فلتر ديزل DPF'
  ].filter(item =>
    searchTerm.trim() ? item.toLowerCase().includes(searchTerm.toLowerCase().trim()) : false
  );

  // Matching preview products inside dropdown
  const matchedProducts = searchTerm.trim()
    ? products
        .filter(p =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
          p.oemNumber?.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
          p.compatibleCars?.some(c => c.toLowerCase().includes(searchTerm.toLowerCase().trim()))
        )
        .slice(0, 4)
    : [];

  const handleSelectQuery = (query: string) => {
    setSearchTerm(query);
    setIsFocused(false);
  };

  const handlePricePreset = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  const hasActiveFilters =
    minPrice > 0 ||
    maxPrice < 3500 ||
    minRating > 0 ||
    inStockOnly ||
    selectedCategory !== 'all' ||
    selectedFuel !== 'all' ||
    searchTerm.trim().length > 0;

  return (
    <div className="space-y-3 mb-6" ref={containerRef}>
      {/* Search Input Bar with Filter Toggle */}
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="ابحث باسم السيارة (هايلوكس، باترول، رينجر...)، أو رقم القطعة OEM، أو نوع الوقود..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            className="w-full bg-slate-900/90 border border-slate-700/80 rounded-2xl pr-11 pl-10 py-3 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all shadow-inner backdrop-blur-md"
          />
          <Search className="w-5 h-5 text-amber-400 absolute right-3.5 top-3.5" />

          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute left-3.5 top-3 text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Autocomplete & Instant Matches Dropdown */}
          {isFocused && (searchTerm.trim().length > 0 || autocompletePredictions.length > 0) && (
            <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden text-right divide-y divide-slate-800 animate-in fade-in duration-150">
              {/* Query completions */}
              {autocompletePredictions.length > 0 && (
                <div className="p-2 space-y-1">
                  <span className="text-[10px] text-slate-400 px-2 block font-semibold">
                    إكمال الاستعلام التلقائي:
                  </span>
                  {autocompletePredictions.map((pred, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectQuery(pred)}
                      className="w-full flex items-center justify-between p-2 rounded-xl text-xs text-slate-200 hover:bg-slate-800 hover:text-amber-400 text-right transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Search className="w-3.5 h-3.5 text-slate-500" />
                        <span>{pred}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">بحث</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Product Matches Direct Snippets */}
              {matchedProducts.length > 0 && (
                <div className="p-2 space-y-1 bg-slate-950/60">
                  <span className="text-[10px] text-slate-400 px-2 block font-semibold">
                    منتجات مطابقة مباشرة:
                  </span>
                  {matchedProducts.map(p => (
                    <div
                      key={p.id}
                      onClick={() => {
                        openProductDetail(p);
                        setIsFocused(false);
                      }}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-800 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={p.image}
                          alt=""
                          className="w-8 h-8 rounded-lg object-cover bg-slate-900 border border-slate-800 flex-shrink-0"
                        />
                        <div className="truncate text-right">
                          <span className="text-xs font-bold text-white block truncate">
                            {p.name}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {p.fuelType === 'diesel' ? 'ديزل DPF' : 'بنزين'}
                          </span>
                        </div>
                      </div>
                      <span className="text-amber-400 font-mono font-bold text-xs flex-shrink-0">
                        {p.price.toLocaleString('ar-SA')} ر.س
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Filter Toggle Button */}
        <button
          onClick={() => setFilterPanelOpen(!filterPanelOpen)}
          className={`flex items-center gap-2 px-4 py-3 rounded-2xl border text-xs sm:text-sm font-bold transition-all ${
            filterPanelOpen || hasActiveFilters
              ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20'
              : 'bg-slate-900/90 text-slate-200 border-slate-700 hover:border-slate-600'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline">تصفية النتائج</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
          )}
        </button>
      </div>

      {/* Related Search Suggestions Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar text-right">
        <span className="text-slate-400 flex items-center gap-1 ml-1 flex-shrink-0 text-[11px]">
          <TrendingUp className="w-3 h-3 text-amber-400" />
          <span>بحث شائع:</span>
        </span>
        {relatedSearchSuggestions.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setSearchTerm(item.query)}
            className={`px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-all ${
              searchTerm === item.query
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Advanced Filter Drawer / Accordion Panel */}
      {filterPanelOpen && (
        <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/95 border border-slate-700/80 shadow-2xl backdrop-blur-md space-y-4 text-right animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-amber-400" />
              <span>تصفية نتائج البحث حسب السعر، الفئة، والتقييم:</span>
            </h4>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-xs text-amber-400 hover:underline"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة ضبط كل الفلاتر</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* 1. Price Filter (تصفية حسب السعر) */}
            <div className="space-y-2.5 p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200 flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                  <span>نطاق السعر (ر.س):</span>
                </span>
                <span className="font-mono text-amber-400 font-bold">
                  {minPrice} - {maxPrice} ر.س
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="3500"
                step="50"
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />

              {/* Price Presets */}
              <div className="flex gap-1.5 text-[10px]">
                <button
                  type="button"
                  onClick={() => handlePricePreset(0, 500)}
                  className="flex-1 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300"
                >
                  أقل من 500
                </button>
                <button
                  type="button"
                  onClick={() => handlePricePreset(500, 1500)}
                  className="flex-1 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300"
                >
                  500 - 1500
                </button>
                <button
                  type="button"
                  onClick={() => handlePricePreset(1500, 3500)}
                  className="flex-1 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300"
                >
                  أكثر من 1500
                </button>
              </div>
            </div>

            {/* 2. Fuel & Category Filter (تصفية حسب الفئة) */}
            <div className="space-y-2 p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
              <span className="font-bold text-slate-200 text-xs flex items-center gap-1">
                <Fuel className="w-3.5 h-3.5 text-amber-400" />
                <span>نوع الوقود والتصنيف:</span>
              </span>

              <div className="grid grid-cols-2 gap-1.5 text-xs">
                <button
                  onClick={() => setSelectedFuel('all')}
                  className={`py-1.5 px-2 rounded-lg text-center ${
                    selectedFuel === 'all'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-300'
                  }`}
                >
                  الكل
                </button>
                <button
                  onClick={() => setSelectedFuel('diesel')}
                  className={`py-1.5 px-2 rounded-lg text-center ${
                    selectedFuel === 'diesel'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-300'
                  }`}
                >
                  🛢️ ديزل DPF
                </button>
                <button
                  onClick={() => setSelectedFuel('petrol')}
                  className={`py-1.5 px-2 rounded-lg text-center ${
                    selectedFuel === 'petrol'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-300'
                  }`}
                >
                  ⛽ بنزين
                </button>
                <label className="flex items-center gap-1.5 px-2 py-1 bg-slate-900 rounded-lg text-[11px] text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={e => setInStockOnly(e.target.checked)}
                    className="accent-amber-500 rounded"
                  />
                  <span>المتوفر فقط</span>
                </label>
              </div>
            </div>

            {/* 3. Rating & Sorting (تصفية حسب التقييم والترتيب) */}
            <div className="space-y-2 p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs">
              <div>
                <label className="text-slate-400 text-[11px] block mb-1">
                  الحد الأدنى لتقييم العملاء:
                </label>
                <select
                  value={minRating}
                  onChange={e => setMinRating(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white"
                >
                  <option value={0}>جميع التقييمات</option>
                  <option value={4}>4 نجوم فأعلى (★★★★☆)</option>
                  <option value={4.5}>4.5 نجوم فأعلى (★★★★★)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 text-[11px] block mb-1">
                  ترتيب النتائج حسب:
                </label>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white"
                >
                  <option value="featured">المميز أولاً</option>
                  <option value="rating">الأعلى تقييماً</option>
                  <option value="price_asc">السعر: من الأقل للأعلى</option>
                  <option value="price_desc">السعر: من الأعلى للأقل</option>
                  <option value="reviews_count">الأكثر مراجعات</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
