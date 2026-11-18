import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ReviewsSection } from './ReviewsSection';
import {
  X,
  Star,
  ShoppingBag,
  MessageCircle,
  Video,
  Edit3,
  ShieldCheck,
  CheckCircle,
  Car,
  Fuel,
  Share2,
  Check,
  CreditCard
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    productDetailModalOpen,
    setProductDetailModalOpen,
    activeProductDetail,
    addToCart,
    ownerWhatsappNumber,
    openVideoPlayer,
    openGooglePay,
    isOwner,
    setEditingProduct,
    setImageEditorModalOpen
  } = useApp();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (!productDetailModalOpen || !activeProductDetail) return null;

  const product = activeProductDetail;
  const currentImg = selectedImage || product.image;
  const allImages = [product.image, ...(product.additionalImages || [])];

  const handleWhatsAppOrder = () => {
    const clean = ownerWhatsappNumber.replace(/\D/g, '');
    const msg = `*طلب شراء دبة تلوث - ${product.name}*
• برعاية يوسف الأحمدي (0565911414)
----------------------------------------
• رمز المنتج: ${product.id}
• السعر: ${product.price} ر.س
• الكمية: ${quantity}
• الإجمالي: ${product.price * quantity} ر.س
• نوع الوقود: ${product.fuelType === 'diesel' ? 'ديزل DPF' : 'بنزين'}
${product.oemNumber ? `• رقم القطعة OEM: ${product.oemNumber}\n` : ''}
أرجو تأكيد توفر المنتج وتزويدي ببيانات التوصيل والشحن. شكراً!`;

    window.open(`https://wa.me/${clean}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleGooglePay = () => {
    openGooglePay({ product, quantity });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 text-right">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-auto">
        {/* Close button */}
        <button
          onClick={() => setProductDetailModalOpen(false)}
          className="absolute top-4 left-4 z-20 p-2 rounded-full bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-5 sm:p-8 space-y-8 max-h-[85vh] overflow-y-auto">
          {/* Main Top Grid: Gallery & Buying Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Gallery Column */}
            <div className="space-y-4">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                <img
                  src={currentImg}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                {/* Fuel tag */}
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 rounded-xl bg-amber-500 text-slate-950 text-xs font-black shadow-md flex items-center gap-1.5">
                    <Fuel className="w-3.5 h-3.5" />
                    {product.fuelType === 'diesel'
                      ? 'ديزل DPF'
                      : product.fuelType === 'petrol'
                      ? 'بنزين Catalytic'
                      : 'ديزل & بنزين'}
                  </span>
                </div>

                {/* Video Play action if available */}
                {product.videoUrl && (
                  <button
                    onClick={() =>
                      openVideoPlayer(
                        product.videoUrl!,
                        product.videoTitle || 'فحص واختبار دبة التلوث',
                        product.name
                      )
                    }
                    className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/90 hover:bg-amber-500 hover:text-slate-950 text-amber-400 border border-amber-500/40 text-xs font-bold shadow-lg transition-all"
                  >
                    <Video className="w-4 h-4" />
                    <span>تشغيل فيديو التجربة والصوت</span>
                  </button>
                )}

                {/* Owner Photo Edit */}
                {isOwner && (
                  <button
                    onClick={() => {
                      setEditingProduct(product);
                      setImageEditorModalOpen(true);
                    }}
                    className="absolute top-3 left-3 p-2 rounded-xl bg-slate-950/90 text-white hover:bg-amber-500 hover:text-slate-950 border border-slate-700 text-xs transition-colors"
                    title="تعديل الصورة في محرر الصور (قص، سطوع، فلاتر)"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                        currentImg === img
                          ? 'border-amber-500 scale-95 shadow-md shadow-amber-500/20'
                          : 'border-slate-800 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Buying & Specs Column */}
            <div className="space-y-5 text-right">
              <div>
                <div className="flex items-center justify-between mb-2">
                  {/* PROMINENT AVERAGE RATING DISPLAY IN PRODUCT PAGE */}
                  <div className="flex items-center gap-2 text-amber-400 text-xs bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20">
                    <span className="font-bold text-slate-300">متوسط التقييم:</span>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star
                          key={s}
                          className={`w-4 h-4 ${
                            s <= Math.round(product.rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-black text-sm text-amber-400">{product.rating.toFixed(1)} من 5</span>
                    <span className="text-slate-400 text-[11px]">({product.reviewsCount} مراجعة)</span>
                  </div>

                  <button
                    onClick={handleCopyLink}
                    className="text-slate-400 hover:text-slate-200 text-xs flex items-center gap-1"
                    title="نسخ رابط المنتج"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                    <span>{copiedLink ? 'تم النسخ' : 'مشاركة'}</span>
                  </button>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {product.name}
                </h2>

                {product.nameEn && (
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    {product.nameEn}
                  </p>
                )}
              </div>

              {/* Price Box */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-400 block mb-0.5">السعر شامل الضريبة</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-amber-400 font-mono">
                      {product.price.toLocaleString('ar-SA')}
                    </span>
                    <span className="text-sm font-bold text-slate-300">ر.س</span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-sm text-slate-500 line-through mr-2 font-mono">
                        {product.originalPrice} ر.س
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-left">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                    <CheckCircle className="w-3.5 h-3.5" />
                    متوفر للتوصيل الفوري
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300">وصف ومميزات الدبة:</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Technical badges (Notice: NO warranties, removed as requested) */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {product.filtrationEfficiency && (
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                    <span className="text-slate-400 text-[11px] block">كفاءة الفلترة:</span>
                    <span className="font-bold text-emerald-400">{product.filtrationEfficiency}</span>
                  </div>
                )}

                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-400 text-[11px] block">الفحص الدوري:</span>
                  <span className="font-bold text-amber-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    اجتياز معتمد 100%
                  </span>
                </div>

                {product.oemNumber && (
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 col-span-2">
                    <span className="text-slate-400 text-[11px] block">رقم القطعة OEM:</span>
                    <span className="font-mono text-slate-200 text-xs">{product.oemNumber}</span>
                  </div>
                )}
              </div>

              {/* Compatible Vehicles */}
              {product.compatibleCars && product.compatibleCars.length > 0 && (
                <div className="space-y-1.5 p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <h5 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-amber-400" />
                    <span>المركبات المتوافقة:</span>
                  </h5>
                  <ul className="text-xs text-slate-300 space-y-1 pr-4 list-disc">
                    {product.compatibleCars.map((car, idx) => (
                      <li key={idx}>{car}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quantity & CTA Buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400">الكمية:</span>
                  <div className="flex items-center bg-slate-950 border border-slate-700 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 text-slate-400 hover:text-white hover:bg-slate-800"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 text-xs font-bold text-white font-mono">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1 text-slate-400 hover:text-white hover:bg-slate-800"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Primary Buy Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* Google Pay Direct Button */}
                  <button
                    onClick={handleGooglePay}
                    className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-black text-xs shadow-md transition-all"
                  >
                    <span className="font-semibold text-slate-800">Google</span>
                    <span className="font-black text-slate-950">Pay</span>
                    <span className="text-[11px] font-bold text-slate-700">دفع فوري</span>
                  </button>

                  <button
                    onClick={() => {
                      addToCart(product, quantity);
                    }}
                    className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all"
                  >
                    <ShoppingBag className="w-4 h-4 text-amber-400" />
                    <span>أضف للسلة</span>
                  </button>

                  <button
                    onClick={handleWhatsAppOrder}
                    className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-black text-xs shadow-lg transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                    <span>طلب واتساب (0565911414)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Customer Reviews System */}
          <ReviewsSection productId={product.id} productName={product.name} />
        </div>
      </div>
    </div>
  );
};
