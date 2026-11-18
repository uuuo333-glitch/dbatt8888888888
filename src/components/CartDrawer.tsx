import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import {
  X,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Copy,
  ExternalLink,
  ShoppingBag
} from 'lucide-react';
import { WhatsAppOrder } from '../types';

export const CartDrawer: React.FC = () => {
  const {
    cartOpen,
    setCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
    cartCount,
    createWhatsAppOrder,
    openGooglePay,
    currentUser,
    ownerWhatsappNumber,
    storeName
  } = useApp();

  // Customer form fields (prefilled if customer user exists)
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerRegion, setCustomerRegion] = useState('الرياض');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<WhatsAppOrder['paymentMethod']>('whatsapp_bank_transfer');
  const [orderNotes, setOrderNotes] = useState('');
  
  // Order completed state
  const [completedOrderData, setCompletedOrderData] = useState<{
    order: WhatsAppOrder;
    whatsappUrl: string;
    orderMessage: string;
  } | null>(null);

  const [copiedMessage, setCopiedMessage] = useState(false);

  useEffect(() => {
    if (currentUser && currentUser.role === 'customer') {
      setCustomerName(currentUser.fullName || '');
      setCustomerPhone(currentUser.phone || '');
      setCustomerRegion(currentUser.region || 'الرياض');
      setCustomerAddress(currentUser.address || '');
    }
  }, [currentUser]);

  if (!cartOpen) return null;

  const handleCheckoutWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      alert('يرجى كتابة الاسم ورقم الجوال والعنوان بالتفصيل للمتابعة');
      return;
    }

    const result = createWhatsAppOrder({
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerRegion,
      customerAddress: customerAddress.trim(),
      paymentMethod,
      orderNotes: orderNotes.trim()
    });

    // Fire celebratory confetti!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    setCompletedOrderData(result);

    // Automatically open WhatsApp in new tab
    window.open(result.whatsappUrl, '_blank');
  };

  const handleCopyOrderText = () => {
    if (completedOrderData) {
      navigator.clipboard.writeText(completedOrderData.orderMessage);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-r border-slate-800 shadow-2xl flex flex-col justify-between">
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">سلة المشتريات</h3>
                <span className="text-xs text-slate-400">
                  {cartCount} قطع مضافة
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setCartOpen(false);
                setCompletedOrderData(null);
              }}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
            {completedOrderData ? (
              /* Success Checkout Screen */
              <div className="space-y-4 text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-white">
                    تم إنشاء طلبك بنجاح!
                  </h4>
                  <p className="text-xs text-amber-400 font-mono font-bold">
                    رقم الطلب: #{completedOrderData.order.orderNumber}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto pt-1">
                    تم تجهيز رسالة الطلب مع كامل البيانات. إذا لم تفتح محادثة واتساب تلقائياً، اضغط على الزر أدناه:
                  </p>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-right space-y-1 text-xs">
                  <span className="text-slate-400 block">إجمالي الطلب:</span>
                  <span className="text-amber-400 font-mono font-bold text-base">
                    {completedOrderData.order.total.toLocaleString('ar-SA')} ر.س
                  </span>
                  <span className="text-[11px] text-emerald-400 block">
                    ✓ الشحن مجاني لجميع مناطق المملكة
                  </span>
                </div>

                <div className="space-y-2 pt-2">
                  <a
                    href={completedOrderData.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl transition-all"
                  >
                    <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                    <span>فتح محادثة واتساب الآن للتأكيد والدفع</span>
                  </a>

                  <button
                    onClick={handleCopyOrderText}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                  >
                    <Copy className="w-4 h-4 text-amber-400" />
                    <span>{copiedMessage ? 'تم نسخ نص الطلب!' : 'نسخ نص رسالة الطلب'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setCompletedOrderData(null);
                      setCartOpen(false);
                    }}
                    className="w-full text-center text-xs text-slate-400 hover:text-white pt-2"
                  >
                    العودة للتسوق
                  </button>
                </div>
              </div>
            ) : cart.length === 0 ? (
              /* Empty Cart */
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-800/80 text-slate-500 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-sm font-bold text-white">السلة فارغة حالياً</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  تصفح فلاتر الديزل DPF ودبات بيئة البنزين وأضف الدبة المناسبة لسيارتك
                </p>
                <button
                  onClick={() => setCartOpen(false)}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                >
                  تصفح المنتجات
                </button>
              </div>
            ) : (
              /* Cart Items List & WhatsApp Checkout Form */
              <>
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-300">المنتجات المختارة:</h4>
                  {cart.map(item => (
                    <div
                      key={item.product.id}
                      className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center gap-3"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-14 h-14 rounded-lg object-cover bg-slate-900 border border-slate-800 flex-shrink-0"
                      />

                      <div className="flex-1 min-w-0 text-right">
                        <h5 className="text-xs font-bold text-white truncate">
                          {item.product.name}
                        </h5>
                        <div className="text-[11px] text-amber-400 font-mono font-bold mt-0.5">
                          {item.product.price.toLocaleString('ar-SA')} ر.س
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
                            <button
                              onClick={() => updateCartQuantity(item.product.id, -1)}
                              className="px-2 py-0.5 text-slate-400 hover:text-white hover:bg-slate-800"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 py-0.5 text-xs font-bold text-white font-mono">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.product.id, 1)}
                              className="px-2 py-0.5 text-slate-400 hover:text-white hover:bg-slate-800"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-slate-500 hover:text-rose-400 p-1"
                            title="حذف من السلة"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Customer Checkout Information Form */}
                <form id="whatsapp-checkout-form" onSubmit={handleCheckoutWhatsApp} className="space-y-3 pt-3 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white">بيانات التوصيل والتأكيد:</h4>
                    <span className="text-[10px] text-emerald-400">
                      طلب عبر واتساب أعمال
                    </span>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      الاسم الكامل: *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="اسم المستلم"
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      رقم الجوال (واتساب للتواصل والشحن): *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="05XXXXXXXX"
                      value={customerPhone}
                      onChange={e => setCustomerPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">
                        المنطقة / المدينة: *
                      </label>
                      <select
                        value={customerRegion}
                        onChange={e => setCustomerRegion(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="الرياض">الرياض</option>
                        <option value="جدة">جدة</option>
                        <option value="مكة المكرمة">مكة المكرمة</option>
                        <option value="المدينة المنورة">المدينة المنورة</option>
                        <option value="الدمام والشرقية">الدمام والشرقية</option>
                        <option value="القصيم وبريدة">القصيم وبريدة</option>
                        <option value="عسير وأبها">عسير وأبها</option>
                        <option value="تبوك">تبوك</option>
                        <option value="حائل">حائل</option>
                        <option value="جازان">جازان</option>
                        <option value="نجران">نجران</option>
                        <option value="الحدود الشمالية">الحدود الشمالية</option>
                        <option value="الجوف">الجوف</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">
                        طريقة الدفع المفضلة:
                      </label>
                      <select
                        value={paymentMethod}
                        onChange={e => setPaymentMethod(e.target.value as any)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="whatsapp_bank_transfer">تحويل بنكي (الراجحي/الأهلي)</option>
                        <option value="mada_applepay">مدى / أبل باي</option>
                        <option value="cash_on_delivery">الدفع عند الاستلام</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      العنوان بالتفصيل والحي: *
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="اسم الحي، الشارع، أو علامة مميزة لتوصيل الشحنة"
                      value={customerAddress}
                      onChange={e => setCustomerAddress(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      ملاحظة إضافية أو موديل السيارة (اختياري):
                    </label>
                    <input
                      type="text"
                      placeholder="مثال: يرجى التأكد أنها تطابق فورد رينجر 2021 ديزل"
                      value={orderNotes}
                      onChange={e => setOrderNotes(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Drawer Footer & WhatsApp Button */}
          {!completedOrderData && cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950/80 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>المجموع الفرعي:</span>
                  <span className="font-mono text-white font-bold">
                    {cartTotal.toLocaleString('ar-SA')} ر.س
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-emerald-400" />
                    الشحن والتوصيل السريع:
                  </span>
                  <span className="text-emerald-400 font-bold">مجاناً 🚚</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-1 border-t border-slate-800">
                  <span>الإجمالي النهائي:</span>
                  <span className="text-amber-400 font-mono text-lg font-black">
                    {cartTotal.toLocaleString('ar-SA')} ر.س
                  </span>
                </div>
              </div>

              {/* Google Pay 1-Click Fast Payment */}
              <button
                type="button"
                onClick={() => {
                  setCartOpen(false);
                  openGooglePay({ isCart: true });
                }}
                className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-black text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <span className="font-semibold text-slate-800 text-base tracking-tight">Google</span>
                <span className="font-black text-slate-950 text-base">Pay</span>
                <span className="text-slate-400 mx-1">|</span>
                <span>دفع فوري سريع بنقرة واحدة</span>
              </button>

              <button
                type="submit"
                form="whatsapp-checkout-form"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-black text-xs sm:text-sm shadow-xl shadow-emerald-950 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                <span>إتمام الطلب والدفع عبر واتساب أعمال (0565911414)</span>
              </button>

              <p className="text-[10px] text-center text-slate-400">
                🔒 فحص دوري معتمد 100% • برعاية يوسف الأحمدي
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
