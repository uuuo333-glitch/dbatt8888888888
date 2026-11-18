import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Palette,
  Image,
  Upload,
  Check,
  Sparkles,
  Sun,
  Eye,
  Sliders,
  Layers,
  Video
} from 'lucide-react';
import { WallpaperOption, AppTheme } from '../types';

export const WallpaperThemeModal: React.FC = () => {
  const {
    wallpaperThemeModalOpen,
    setWallpaperThemeModalOpen,
    wallpapers,
    activeWallpaper,
    setActiveWallpaper,
    addCustomWallpaper,
    themes,
    activeTheme,
    setActiveTheme,
    wallpaperOpacity,
    setWallpaperOpacity,
    addCustomVideoWallpaper
  } = useApp();

  const [customUrl, setCustomUrl] = useState('');
  const [customVideoUrl, setCustomVideoUrl] = useState('');
  const [customName, setCustomName] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  if (!wallpaperThemeModalOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        addCustomWallpaper(file.name.replace(/\.[^/.]+$/, ''), reader.result);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 2000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCustomUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl.trim()) return;

    addCustomWallpaper(customName.trim() || 'خلفية مخصصة', customUrl.trim());
    setCustomUrl('');
    setCustomName('');
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 text-right">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">تخصيص الثيم والخلفيات</h3>
              <p className="text-xs text-slate-400">
                اختر ألوان المتجر، خلفيات الشاشة، أو ارفع خلفيتك المفضلة
              </p>
            </div>
          </div>

          <button
            onClick={() => setWallpaperThemeModalOpen(false)}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto max-h-[75vh]">
          {/* Section 1: Color Themes */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>ألوان الثيم الرئيسي للمتجر:</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {themes.map(th => {
                const isSelected = activeTheme.id === th.id;
                return (
                  <button
                    key={th.id}
                    onClick={() => setActiveTheme(th)}
                    className={`p-3 rounded-2xl border text-right transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-slate-800 border-amber-500 shadow-lg shadow-amber-500/10 scale-[1.02]'
                        : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-4 h-4 rounded-full flex-shrink-0 shadow-sm"
                        style={{ backgroundColor: th.primaryHex }}
                      />
                      <span className="text-xs font-bold text-white">{th.name}</span>
                    </div>

                    {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Wallpaper Gallery */}
          <div className="space-y-3 pt-3 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                <Image className="w-4 h-4 text-amber-400" />
                <span>اختر خلفية واجهة المتجر:</span>
              </h4>
              <span className="text-[11px] text-slate-400">
                {wallpapers.length} خلفيات متوفرة
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {wallpapers.map(wp => {
                const isSelected = activeWallpaper.id === wp.id;
                return (
                  <div
                    key={wp.id}
                    onClick={() => setActiveWallpaper(wp)}
                    className={`group relative rounded-2xl overflow-hidden border cursor-pointer transition-all aspect-video ${
                      isSelected
                        ? 'border-amber-500 ring-2 ring-amber-500/40 shadow-xl scale-[1.02]'
                        : 'border-slate-800 hover:border-slate-700 opacity-80 hover:opacity-100'
                    }`}
                  >
                    {wp.previewUrl ? (
                      <img
                        src={wp.previewUrl}
                        alt={wp.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div
                        className="w-full h-full"
                        style={{ background: wp.cssBackground }}
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent p-2 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        {wp.type === 'video' ? (
                          <span className="px-1.5 py-0.5 rounded-md bg-red-600/90 text-white text-[9px] font-bold flex items-center gap-1 shadow">
                            <Video className="w-2.5 h-2.5" />
                            <span>خلفية فيديو</span>
                          </span>
                        ) : (
                          <span />
                        )}
                        {isSelected && (
                          <span className="p-1 rounded-full bg-amber-500 text-slate-950">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-bold text-white truncate drop-shadow">
                        {wp.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Wallpaper Opacity Slider */}
          <div className="space-y-2 p-3.5 bg-slate-950/70 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-semibold flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                تعتيم الخلفية لقراءة أوضح للمنتجات:
              </span>
              <span className="font-mono text-amber-400 font-bold">{wallpaperOpacity}%</span>
            </div>
            <input
              type="range"
              min="40"
              max="98"
              value={wallpaperOpacity}
              onChange={e => setWallpaperOpacity(Number(e.target.value))}
              className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Section 4: Upload Custom Wallpaper from User Device */}
          <div className="space-y-3 pt-3 border-t border-slate-800">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Upload className="w-4 h-4 text-sky-400" />
              <span>رفع خلفية مخصصة من جهازك:</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Local File Upload */}
              <label className="p-4 rounded-2xl border-2 border-dashed border-slate-700 hover:border-amber-500/50 bg-slate-950/50 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors text-center">
                <Upload className="w-6 h-6 text-amber-400" />
                <span className="text-xs font-bold text-slate-200">
                  صورة من جهازك
                </span>
                <span className="text-[10px] text-slate-500">
                  JPG / PNG عالية الدقة
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {/* Paste Image URL */}
              <form
                onSubmit={handleCustomUrlSubmit}
                className="p-3 bg-slate-950/50 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-2"
              >
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">
                    رابط صورة خلفية:
                  </label>
                  <input
                    type="url"
                    placeholder="https://.../photo.jpg"
                    value={customUrl}
                    onChange={e => setCustomUrl(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!customUrl.trim()}
                  className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white font-bold text-xs border border-slate-700 transition-colors"
                >
                  تطبيق صورة
                </button>
              </form>

              {/* Paste Video Wallpaper URL */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!customVideoUrl.trim()) return;
                  addCustomVideoWallpaper('خلفية فيديو حية مخصصة', customVideoUrl.trim());
                  setCustomVideoUrl('');
                  setUploadSuccess(true);
                  setTimeout(() => setUploadSuccess(false), 2500);
                }}
                className="p-3 bg-slate-950/50 rounded-2xl border border-red-500/30 flex flex-col justify-between space-y-2"
              >
                <div>
                  <label className="text-[11px] text-amber-400 font-bold block mb-1 flex items-center gap-1">
                    <Video className="w-3 h-3 text-red-400" />
                    <span>رابط خلفية فيديو (MP4):</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://.../video.mp4"
                    value={customVideoUrl}
                    onChange={e => setCustomVideoUrl(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!customVideoUrl.trim()}
                  className="py-1.5 px-3 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-bold text-xs transition-colors shadow"
                >
                  تطبيق كخلفية فيديو
                </button>
              </form>
            </div>

            {uploadSuccess && (
              <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-semibold flex items-center justify-center gap-2">
                <Check className="w-4 h-4" />
                <span>تم تعيين خلفيتك المخصصة بنجاح!</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex justify-end">
          <button
            onClick={() => setWallpaperThemeModalOpen(false)}
            className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors"
          >
            تم والحفظ
          </button>
        </div>
      </div>
    </div>
  );
};
