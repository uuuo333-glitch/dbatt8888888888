import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Video,
  Upload,
  Volume2,
  CheckCircle2,
  Car,
  Sparkles,
  Link2
} from 'lucide-react';

export const VideoPlayerModal: React.FC = () => {
  const {
    videoModalOpen,
    setVideoModalOpen,
    activeVideo,
    products,
    updateProduct,
    isOwner
  } = useApp();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadTab, setUploadTab] = useState<'watch' | 'upload'>('watch');
  const [customVideoUrl, setCustomVideoUrl] = useState('');
  const [videoTitleInput, setVideoTitleInput] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  if (!videoModalOpen || !activeVideo) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const videoBlobUrl = URL.createObjectURL(file);
    if (selectedProductId) {
      updateProduct(selectedProductId, {
        videoUrl: videoBlobUrl,
        videoTitle: file.name.replace(/\.[^/.]+$/, '')
      });
      setUploadSuccess(true);
      setTimeout(() => {
        setUploadSuccess(false);
        setUploadTab('watch');
      }, 1500);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customVideoUrl.trim() || !selectedProductId) return;

    updateProduct(selectedProductId, {
      videoUrl: customVideoUrl.trim(),
      videoTitle: videoTitleInput.trim() || 'فحص واختبار دبة التلوث بالفيديو'
    });

    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setUploadTab('watch');
      setCustomVideoUrl('');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 text-right">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                {activeVideo.title || 'فحص واختبار دبة التلوث بالفيديو'}
              </h3>
              {activeVideo.productName && (
                <p className="text-xs text-amber-400 font-mono">
                  {activeVideo.productName}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Toggle Watch / Upload */}
            <button
              onClick={() => setUploadTab(uploadTab === 'watch' ? 'upload' : 'watch')}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
            >
              <Upload className="w-3.5 h-3.5 text-amber-400" />
              <span>{uploadTab === 'watch' ? 'رفع فيديو جديد' : 'مشاهدة الفيديو'}</span>
            </button>

            <button
              onClick={() => setVideoModalOpen(false)}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4">
          {uploadTab === 'watch' ? (
            /* Watch Video Mode */
            <div className="space-y-4">
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-2xl">
                <video
                  src={activeVideo.url}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                >
                  متصفحك لا يدعم تشغيل هذا الفيديو.
                </video>
              </div>

              {/* Sound & Emissions Comparison Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-slate-950/70 rounded-2xl border border-slate-800 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Volume2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <div>
                    <span className="font-bold block text-white">
                      صوت الشكمان وتدفق الهواء:
                    </span>
                    <span className="text-[11px] text-slate-400">
                      نغمة هادئة ومطابقة للوكالة بدون طنين مزعج
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-300">
                  <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <div>
                    <span className="font-bold block text-white">
                      اختبار انبعاثات الكربون:
                    </span>
                    <span className="text-[11px] text-emerald-400 font-bold">
                      صفر دخان أسود واجتياز فوري للفحص
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Upload New Video Mode */
            <div className="space-y-4 p-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Upload className="w-4 h-4 text-amber-400" />
                <span>رفع وتعيين فيديو لدبة التلوث أو فلتر الديزل</span>
              </h4>

              <div>
                <label className="text-xs text-slate-300 block mb-1">
                  اختر المنتج لربط الفيديو معه:
                </label>
                <select
                  value={selectedProductId}
                  onChange={e => setSelectedProductId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Device Video File Upload */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="p-6 rounded-2xl border-2 border-dashed border-slate-700 hover:border-amber-500/60 bg-slate-950/60 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors text-center"
                >
                  <Video className="w-8 h-8 text-amber-400" />
                  <span className="text-xs font-bold text-white">
                    اختر ملف فيديو من جهازك (MP4 / WebM)
                  </span>
                  <span className="text-[10px] text-slate-400">
                    يمكنك رفع فيديو صوت الشكمان أو شرح التركيب
                  </span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>

                {/* Paste Direct Video Link */}
                <form
                  onSubmit={handleUrlSubmit}
                  className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3"
                >
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      أو أدخل رابط فيديو مباشر (MP4):
                    </label>
                    <input
                      type="url"
                      placeholder="https://.../video.mp4"
                      value={customVideoUrl}
                      onChange={e => setCustomVideoUrl(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      عنوان توضيحي للفيديو:
                    </label>
                    <input
                      type="text"
                      placeholder="مثال: فحص وتجربة صوت الدبة"
                      value={videoTitleInput}
                      onChange={e => setVideoTitleInput(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!customVideoUrl.trim()}
                    className="py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs transition-colors"
                  >
                    حفظ وربط الفيديو
                  </button>
                </form>
              </div>

              {uploadSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-semibold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>تم حفظ وتعيين الفيديو للمنتج بنجاح!</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
