import React from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import {
  Star,
  ShoppingBag,
  MessageCircle,
  Video,
  Edit3,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  compactOnlyImageAndPrice?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  compactOnlyImageAndPrice = false
}) => {
  const {
    addToCart,
    openProductDetail,
    openVideoPlayer,
    openGooglePay,
    isOwner,
    setEditingProduct,
    setImageEditorModalOpen,
    ownerWhatsappNumber
  } = useApp();

  const isOnlyImageAndPrice = compactOnlyImageAndPrice || product.showOnlyImageAndPrice;

  const handleQuickWhatsAppInquiry = (e: React.MouseEvent) => {
    e.stopPropagation();
    const cleanPhone = ownerWhatsappNumber.replace(/\D/g, '');
    const msg = `*استفسار وطلب دبة تلوث - ${product.name}*
• برعاية يوسف الأحمدي (0565911414)
----------------------------------------
• رمز المنتج: ${product.id}
• السعر: ${product.price} ر.س
• نوع الوقود: ${product.fuelType === 'diesel' ? 'ديزل DPF' : product.fuelType === 'petrol' ? 'بنزين' : 'شامل'}
${product.oemNumber ? `• رقم القطعة OEM: ${product.oemNumber}\n` : ''}
أود التأكد من توفرها وتنسيق الشحن والدفع. شكراً!`;

    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleQuickGooglePay = (e: React.MouseEvent) => {
    e.stopPropagation();
    openGooglePay({ product, quantity: 1 });
  };

  const handleOpenPhotoEditor = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingProduct(product);
    setImageEditorModalOpen(true);
  };

  const handlePlayVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.videoUrl) {
      openVideoPlayer(product.videoUrl, product.videoTitle || 'فحص واختبار دبة التلوث', product.name);
    }
  };

  return (
    <div
      onClick={() => openProductDetail(product)}
      className="group relative flex flex-col rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-amber-500/50 shadow-lg hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 overflow-hidden cursor-pointer backdrop-blur-sm"
    >
      {/* Top Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-950">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30 pointer-events-none" />

        {/* Fuel Badge */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
          {product.fuelType === 'diesel' && (
            <span className="px-2.5 py-1 rounded-lg bg-amber-500/90 text-slate-950 text-[11px] font-black shadow-md flex items-center gap-1 backdrop-blur-sm">
              <span>🛢️</span>
              <span>ديزل DPF</span>
            </span>
          )}

          {product.fuelType === 'petrol' && (
            <span className="px-2.5 py-1 rounded-lg bg-sky-500/90 text-slate-950 text-[11px] font-black shadow-md flex items-center gap-1 backdrop-blur-sm">
              <span>⛽</span>
              <span>بنزين Catalytic</span>
            </span>
          )}

          {product.fuelType === 'universal' && (
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/90 text-slate-950 text-[11px] font-black shadow-md flex items-center gap-1 backdrop-blur-sm">
              <span>✨</span>
              <span>شامل ديزل وبنزين</span>
            </span>
          )}

          {product.isExternalImport && (
            <span className="px-2 py-0.5 rounded bg-purple-500/80 text-white text-[10px] font-medium flex items-center gap-1 shadow">
              <ExternalLink className="w-2.5 h-2.5" />
              مستورد
            </span>
          )}
        </div>

        {/* Media Overlay Badges: Video & Photo Edit for Owner */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.videoUrl && (
            <button
              onClick={handlePlayVideo}
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-amber-400 border border-slate-700/80 shadow-lg transition-all"
              title="مشاهدة فيديو الفحص واختبار صوت العادم"
            >
              <Video className="w-4 h-4" />
            </button>
          )}

          {/* Owner Photo Edit trigger directly on image */}
          {isOwner && (
            <button
              onClick={handleOpenPhotoEditor}
              className="p-2 rounded-xl bg-slate-900/90 hover:bg-amber-500 hover:text-slate-950 text-white border border-amber-500/40 shadow-lg transition-all"
              title="تعديل صورة المنتج في محرر الصور"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Prominent Price Floating Tag */}
        <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between">
          <div className="bg-slate-950/90 border border-amber-500/40 px-3 py-1.5 rounded-xl shadow-xl backdrop-blur-md flex items-baseline gap-1.5">
            <span className="text-amber-400 font-mono text-lg font-black tracking-tight">
              {product.price.toLocaleString('ar-SA')}
            </span>
            <span className="text-[11px] text-slate-300 font-bold">ر.س</span>

            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-[10px] text-slate-500 line-through mr-1 font-mono">
                {product.originalPrice} ر.س
              </span>
            )}
          </div>

          {/* Average star rating and count */}
          <div className="bg-slate-950/80 border border-slate-800 px-2 py-1 rounded-lg flex items-center gap-1 text-[11px] text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold">{product.rating.toFixed(1)}</span>
            <span className="text-slate-400 text-[10px]">({product.reviewsCount})</span>
          </div>
        </div>
      </div>

      {/* Body: Product details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        {isOnlyImageAndPrice ? (
          /* Minimalist Mode: user requested "يظهر فقط الصورة في السعر" */
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-white line-clamp-1 group-hover:text-amber-400 transition-colors">
                {product.name}
              </h3>
            </div>
            <p className="text-[11px] text-slate-400">
              نمط العرض السريع (الصورة والسعر)
            </p>
          </div>
        ) : (
          /* Full Rich Details */
          <div className="space-y-2.5">
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                {product.name}
              </h3>
              {product.nameEn && (
                <span className="text-[10px] text-slate-400 font-mono block truncate mt-0.5">
                  {product.nameEn}
                </span>
              )}
            </div>

            {/* Quick Specs chips (Notice: Warranties completely removed as requested) */}
            <div className="flex flex-wrap gap-1.5 text-[10px]">
              {product.filtrationEfficiency && (
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                  {product.filtrationEfficiency}
                </span>
              )}
              <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                فحص دوري 100%
              </span>
              {product.oemNumber && (
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/50 font-mono">
                  OEM: {product.oemNumber.split('/')[0]}
                </span>
              )}
            </div>

            {/* Compatible Cars snippet */}
            {product.compatibleCars && product.compatibleCars.length > 0 && (
              <p className="text-[11px] text-slate-400 line-clamp-1">
                <span className="text-slate-500">التوافق: </span>
                {product.compatibleCars.join(' ، ')}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons: Google Pay, Add to Cart & WhatsApp Order */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2">
          {/* Row 1: Add to Cart and WhatsApp */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-all"
              title="إضافة المنتج للسلة"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
              <span>أضف للسلة</span>
            </button>

            <button
              onClick={handleQuickWhatsAppInquiry}
              className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
              title="طلب عبر واتساب أعمال"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white text-emerald-600" />
              <span>واتساب</span>
            </button>
          </div>

          {/* Row 2: Google Pay Fast Checkout Button */}
          <button
            onClick={handleQuickGooglePay}
            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-black text-xs shadow-md transition-all"
            title="شراء فوري عبر Google Pay"
          >
            <span className="font-semibold text-slate-800">Google</span>
            <span className="font-black text-slate-950">Pay</span>
            <span className="text-[11px] text-slate-600 font-bold mr-1">دفع فوري سريع</span>
          </button>
        </div>
      </div>
    </div>
  );
};
