import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  RotateCw,
  FlipHorizontal,
  Sun,
  Sliders,
  Crop,
  Stamp,
  Check,
  Undo2,
  Sparkles,
  Save,
  Image as ImageIcon
} from 'lucide-react';

export const ImageEditorModal: React.FC = () => {
  const {
    imageEditorModalOpen,
    setImageEditorModalOpen,
    editingProduct,
    updateProduct
  } = useApp();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Editing state
  const [brightness, setBrightness] = useState<number>(100); // 100% is normal
  const [contrast, setContrast] = useState<number>(100);
  const [saturate, setSaturate] = useState<number>(100);
  const [rotation, setRotation] = useState<number>(0); // 0, 90, 180, 270
  const [flipped, setFlipped] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<'normal' | 'vivid' | 'cool' | 'metallic' | 'grayscale'>('normal');
  const [watermark, setWatermark] = useState<string>('دبات التلوث - أصلي معتمد');
  const [watermarkPosition, setWatermarkPosition] = useState<'bottom-right' | 'top-right' | 'bottom-left' | 'center'>('bottom-right');
  const [isWatermarkEnabled, setIsWatermarkEnabled] = useState<boolean>(true);
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '4:3' | '16:9' | 'original'>('1:1');

  const [savedNotification, setSavedNotification] = useState<boolean>(false);

  // Load and draw image onto canvas
  useEffect(() => {
    if (!imageEditorModalOpen || !editingProduct || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = editingProduct.image;

    img.onload = () => {
      // Determine target canvas dimensions
      let baseWidth = 800;
      let baseHeight = 800;

      if (aspectRatio === '1:1') {
        baseWidth = 800;
        baseHeight = 800;
      } else if (aspectRatio === '4:3') {
        baseWidth = 800;
        baseHeight = 600;
      } else if (aspectRatio === '16:9') {
        baseWidth = 800;
        baseHeight = 450;
      } else {
        baseWidth = img.width || 800;
        baseHeight = img.height || 800;
      }

      // Handle 90/270 deg rotation swapping width/height
      if (rotation === 90 || rotation === 270) {
        canvas.width = baseHeight;
        canvas.height = baseWidth;
      } else {
        canvas.width = baseWidth;
        canvas.height = baseHeight;
      }

      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Apply CSS-like canvas filters
      let filterString = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%)`;
      if (selectedFilter === 'grayscale') {
        filterString += ' grayscale(100%)';
      } else if (selectedFilter === 'vivid') {
        filterString += ' saturate(140%) contrast(110%)';
      } else if (selectedFilter === 'cool') {
        filterString += ' hue-rotate(180deg) saturate(90%)';
      } else if (selectedFilter === 'metallic') {
        filterString += ' contrast(125%) saturate(70%)';
      }
      ctx.filter = filterString;

      // Transform context for rotation and flip
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      if (flipped) {
        ctx.scale(-1, 1);
      }

      // Draw image centered and scaled
      const drawW = rotation === 90 || rotation === 270 ? canvas.height : canvas.width;
      const drawH = rotation === 90 || rotation === 270 ? canvas.width : canvas.height;

      ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
      ctx.restore();

      // Draw Watermark Badge if enabled
      if (isWatermarkEnabled && watermark.trim()) {
        ctx.save();
        ctx.font = 'bold 24px "Cairo", sans-serif';
        const text = watermark.trim();
        const textMetrics = ctx.measureText(text);
        const padding = 14;
        const boxWidth = textMetrics.width + padding * 2;
        const boxHeight = 44;

        let x = canvas.width - boxWidth - 24;
        let y = canvas.height - boxHeight - 24;

        if (watermarkPosition === 'top-right') {
          x = canvas.width - boxWidth - 24;
          y = 24;
        } else if (watermarkPosition === 'bottom-left') {
          x = 24;
          y = canvas.height - boxHeight - 24;
        } else if (watermarkPosition === 'center') {
          x = (canvas.width - boxWidth) / 2;
          y = (canvas.height - boxHeight) / 2;
        }

        // Background pill
        ctx.fillStyle = 'rgba(11, 15, 23, 0.85)';
        ctx.roundRect ? ctx.roundRect(x, y, boxWidth, boxHeight, 10) : ctx.fillRect(x, y, boxWidth, boxHeight);
        ctx.fill();

        // Border
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        ctx.roundRect ? ctx.roundRect(x, y, boxWidth, boxHeight, 10) : ctx.strokeRect(x, y, boxWidth, boxHeight);
        ctx.stroke();

        // Text
        ctx.fillStyle = '#f59e0b';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, x + boxWidth - padding, y + boxHeight / 2);

        ctx.restore();
      }
    };
  }, [
    imageEditorModalOpen,
    editingProduct,
    brightness,
    contrast,
    saturate,
    rotation,
    flipped,
    selectedFilter,
    watermark,
    watermarkPosition,
    isWatermarkEnabled,
    aspectRatio
  ]);

  if (!imageEditorModalOpen || !editingProduct) return null;

  const handleSaveImageToProduct = () => {
    if (!canvasRef.current || !editingProduct) return;
    try {
      const dataUrl = canvasRef.current.toDataURL('image/jpeg', 0.92);
      updateProduct(editingProduct.id, { image: dataUrl });
      setSavedNotification(true);
      setTimeout(() => {
        setSavedNotification(false);
        setImageEditorModalOpen(false);
      }, 1200);
    } catch (e) {
      console.error(e);
      // Fallback
      setImageEditorModalOpen(false);
    }
  };

  const handleReset = () => {
    setBrightness(100);
    setContrast(100);
    setSaturate(100);
    setRotation(0);
    setFlipped(false);
    setSelectedFilter('normal');
    setAspectRatio('1:1');
    setIsWatermarkEnabled(true);
    setWatermark('دبات التلوث - أصلي معتمد');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">محرر صور دبات التلوث</h3>
              <p className="text-xs text-slate-400">
                قص الصورة، ضبط السطوع، إضافة علامة مائية، وفلاتر احترافية
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-colors"
              title="إعادة ضبط التعديلات"
            >
              <Undo2 className="w-4 h-4" />
              <span className="hidden sm:inline">إعادة ضبط</span>
            </button>

            <button
              onClick={() => setImageEditorModalOpen(false)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Workspace Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-5 overflow-y-auto max-h-[78vh]">
          {/* Canvas Preview Area (8 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-950/90 rounded-2xl p-4 border border-slate-800 min-h-[320px] relative">
            <canvas
              ref={canvasRef}
              className="max-h-[420px] max-w-full rounded-xl shadow-2xl object-contain border border-slate-700"
            />

            <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
              <span className="font-mono">{editingProduct.name}</span>
            </div>

            {savedNotification && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center gap-2 text-emerald-400 font-bold animate-in fade-in">
                <Check className="w-10 h-10 p-2 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
                <span>تم حفظ وتحديث صورة المنتج بنجاح!</span>
              </div>
            )}
          </div>

          {/* Controls Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-4 text-right">
            {/* Quick Presets / Filters */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">
                فلاتر جاهزة:
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                {[
                  { id: 'normal', name: 'أصلي' },
                  { id: 'vivid', name: 'حيوي جذاب' },
                  { id: 'metallic', name: 'معدن ستانلس' },
                  { id: 'cool', name: 'أزرق بارد' },
                  { id: 'grayscale', name: 'أبيض وأسود' }
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFilter(f.id as any)}
                    className={`py-1.5 px-2 rounded-lg text-center transition-all ${
                      selectedFilter === f.id
                        ? 'bg-amber-500 text-slate-950 font-bold shadow'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Aspect Ratio / Crop */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">
                أبعاد ومقاس الصورة (Crop Ratio):
              </label>
              <div className="grid grid-cols-4 gap-1.5 text-xs font-mono">
                {(['1:1', '4:3', '16:9', 'original'] as const).map(ratio => (
                  <button
                    key={ratio}
                    onClick={() => setAspectRatio(ratio)}
                    className={`py-1.5 rounded-lg text-center transition-all ${
                      aspectRatio === ratio
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {ratio === 'original' ? 'الأصلي' : ratio}
                  </button>
                ))}
              </div>
            </div>

            {/* Adjustments: Brightness, Contrast, Saturation */}
            <div className="space-y-3 p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs">
              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>السطوع (Brightness)</span>
                  <span className="font-mono">{brightness}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="160"
                  value={brightness}
                  onChange={e => setBrightness(Number(e.target.value))}
                  className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>التباين (Contrast)</span>
                  <span className="font-mono">{contrast}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="160"
                  value={contrast}
                  onChange={e => setContrast(Number(e.target.value))}
                  className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>تشبع الألوان (Saturation)</span>
                  <span className="font-mono">{saturate}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="200"
                  value={saturate}
                  onChange={e => setSaturate(Number(e.target.value))}
                  className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Rotate & Flip Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setRotation(prev => (prev + 90) % 360)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                <RotateCw className="w-3.5 h-3.5 text-amber-400" />
                <span>تدوير 90°</span>
              </button>

              <button
                onClick={() => setFlipped(!flipped)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                <FlipHorizontal className="w-3.5 h-3.5 text-amber-400" />
                <span>عكس أفقي</span>
              </button>
            </div>

            {/* Watermark Section */}
            <div className="space-y-2 p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                  <Stamp className="w-3.5 h-3.5 text-amber-400" />
                  <span>الشعار والعلامة المائية للمتجر</span>
                </label>
                <input
                  type="checkbox"
                  checked={isWatermarkEnabled}
                  onChange={e => setIsWatermarkEnabled(e.target.checked)}
                  className="accent-amber-500 rounded"
                />
              </div>

              {isWatermarkEnabled && (
                <div className="space-y-2 pt-1">
                  <input
                    type="text"
                    value={watermark}
                    onChange={e => setWatermark(e.target.value)}
                    placeholder="نص العلامة المائية"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />

                  <div className="flex gap-1 text-[10px]">
                    {[
                      { id: 'bottom-right', label: 'أسفل يمين' },
                      { id: 'bottom-left', label: 'أسفل يسار' },
                      { id: 'top-right', label: 'أعلى يمين' },
                      { id: 'center', label: 'وسط' }
                    ].map(pos => (
                      <button
                        key={pos.id}
                        type="button"
                        onClick={() => setWatermarkPosition(pos.id as any)}
                        className={`flex-1 py-1 rounded text-center ${
                          watermarkPosition === pos.id
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                            : 'bg-slate-900 text-slate-400'
                        }`}
                      >
                        {pos.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveImageToProduct}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>حفظ الصورة المعدلة للمنتج</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
