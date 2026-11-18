import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Lock,
  ArrowRight,
  Download,
  Copy,
  Check,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import { WhatsAppOrder } from '../types';

export const GooglePayModal: React.FC = () => {
  const {
    googlePayModalOpen,
    setGooglePayModalOpen,
    googlePayTarget,
    cart,
    cartTotal,
    processGooglePayPayment,
    currentUser,
    storeName
  } = useApp();

  const [customerName, setCustomerName] = useState((currentUser as any)?.fullName || 'محمد العتيبي');
  const [customerEmail, setCustomerEmail] = useState((currentUser as any)?.email || 'uuuo333@gmail.com');
  const [customerPhone, setCustomerPhone] = useState((currentUser as any)?.phone || '0551234567');
  const [customerAddress, setCustomerAddress] = useState((currentUser as any)?.address || 'الرياض - حي النرجس - شارع الملك سلمان');
  const [customerRegion, setCustomerRegion] = useState((currentUser as any)?.region || 'الرياض');
  
  const [selectedCard, setSelectedCard] = useState<'card1' | 'card2' | 'card3'>('card1');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<WhatsAppOrder | null>(null);
  const [copiedReceipt, setCopiedReceipt] = useState(false);

  if (!googlePayModalOpen) return null;

  // Determine items and total
  const isCartCheckout = googlePayTarget?.isCart;
  const items = isCartCheckout
    ? cart
    : googlePayTarget?.product
    ? [{ product: googlePayTarget.product, quantity: googlePayTarget.quantity || 1 }]
    : [];

  const subtotal = isCartCheckout
    ? cartTotal
    : googlePayTarget?.product
    ? googlePayTarget.product.price * (googlePayTarget.quantity || 1)
    : 0;

  const total = subtotal;

  const cardsList = [
    { id: 'card1', network: 'Mastercard', last4: '4242', bank: 'بنك الراجحي - بطاقة مدى الرقمية' },
    { id: 'card2', network: 'Visa', last4: '8821', bank: 'البنك الأهلي السعودي - فيزا بلاتينيوم' },
    { id: 'card3', network: 'Mada', last4: '1092', bank: 'بنك الإنماء - مدى Apple/Google Pay' }
  ];

  const handlePayNow = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const activeCard = cardsList.find(c => c.id === selectedCard) || cardsList[0];

    setTimeout(() => {
      const order = processGooglePayPayment({
        customerName: customerName.trim() || 'عميل Google Pay',
        customerEmail: customerEmail.trim() || 'uuuo333@gmail.com',
        customerPhone: customerPhone.trim() || '0551234567',
        customerAddress: customerAddress.trim() || 'الرياض',
        customerRegion,
        cardLast4: activeCard.last4,
        cardNetwork: activeCard.network
      });

      setIsProcessing(false);
      setCompletedOrder(order);

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }, 1400);
  };

  const handleCopyReceipt = () => {
    if (completedOrder) {
      const receiptText = `إيصال دفع Google Pay - ${storeName}
رقم الطلب: #${completedOrder.orderNumber}
المرجع: ${completedOrder.googlePayDetails?.authCode}
المبلغ المدفوع: ${completedOrder.total} ر.س
الحساب: ${completedOrder.customerEmail}
البطاقة: ${completedOrder.googlePayDetails?.cardNetwork} •••• ${completedOrder.googlePayDetails?.cardLast4}
التاريخ: ${completedOrder.createdAt}
حالة الدفع: مؤكد وناجح عبر Google Pay 100%`;
      navigator.clipboard.writeText(receiptText);
      setCopiedReceipt(true);
      setTimeout(() => setCopiedReceipt(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 text-right">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col">
        {/* Google Pay Branded Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Google Pay Official Badge Style */}
            <div className="px-3 py-1.5 rounded-xl bg-white flex items-center gap-1.5 shadow-md">
              <span className="font-bold text-slate-800 text-xs tracking-tight">Google</span>
              <span className="font-black text-slate-900 text-xs">Pay</span>
            </div>
            <div>
              <h3 className="font-bold text-white text-sm sm:text-base">
                الدفع السريع والآمن عبر Google Pay
              </h3>
              <p className="text-[11px] text-slate-400">
                مشفر ومحمي بتقنية Google وحماية المشتري 100%
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setGooglePayModalOpen(false);
              setCompletedOrder(null);
            }}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto max-h-[80vh]">
          {completedOrder ? (
            /* Successful Payment Receipt Screen */
            <div className="space-y-4 text-center py-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <h4 className="text-xl font-black text-white">
                  تم الدفع بنجاح عبر Google Pay!
                </h4>
                <p className="text-xs text-amber-400 font-mono font-bold">
                  رقم إيصال الطلب: #{completedOrder.orderNumber}
                </p>
                <p className="text-xs text-slate-300 max-w-sm mx-auto pt-1">
                  تم استلام دفعتك وتأكيد طلب دبة التلوث فورا. جاري تجهيز الشحنة والتوصيل إلى عنوانك.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-right space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">حساب Google المستخدم:</span>
                  <span className="font-mono text-white">{completedOrder.customerEmail}</span>
                </div>

                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">طريقة الدفع:</span>
                  <span className="text-white font-medium">
                    Google Pay ({completedOrder.googlePayDetails?.cardNetwork} •••• {completedOrder.googlePayDetails?.cardLast4})
                  </span>
                </div>

                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">كود التحقق البنكي:</span>
                  <span className="font-mono text-emerald-400 font-bold">
                    {completedOrder.googlePayDetails?.authCode}
                  </span>
                </div>

                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">العنوان المسجل:</span>
                  <span className="text-white">{completedOrder.customerRegion} - {completedOrder.customerAddress}</span>
                </div>

                <div className="flex justify-between pt-1 font-bold text-sm">
                  <span className="text-white">المبلغ الإجمالي المدفوع:</span>
                  <span className="text-amber-400 font-mono font-black text-base">
                    {completedOrder.total.toLocaleString('ar-SA')} ر.س
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleCopyReceipt}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-colors"
                >
                  <Copy className="w-4 h-4 text-amber-400" />
                  <span>{copiedReceipt ? 'تم نسخ بيانات الإيصال!' : 'نسخ إيصال الدفع'}</span>
                </button>

                <button
                  onClick={() => {
                    setGooglePayModalOpen(false);
                    setCompletedOrder(null);
                  }}
                  className="w-full py-2.5 text-xs text-slate-400 hover:text-white"
                >
                  إغلاق ومتابعة التسوق
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form with Google Pay Sheet */
            <form onSubmit={handlePayNow} className="space-y-5">
              {/* Items summary */}
              <div className="p-3.5 bg-slate-950/70 rounded-2xl border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span>ملخص الطلب:</span>
                  <span className="font-mono text-amber-400 font-bold">
                    {items.length} منتج
                  </span>
                </div>

                <div className="space-y-2 max-h-36 overflow-y-auto divide-y divide-slate-800/80">
                  {items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-2 pt-2 first:pt-0 text-xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={item.product.image}
                          alt=""
                          className="w-9 h-9 rounded-lg object-cover flex-shrink-0 bg-slate-900 border border-slate-800"
                        />
                        <div className="min-w-0">
                          <span className="font-medium text-white truncate block max-w-xs">
                            {item.product.name}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            الكمية: {item.quantity}
                          </span>
                        </div>
                      </div>
                      <span className="font-mono text-amber-400 font-bold flex-shrink-0">
                        {(item.product.price * item.quantity).toLocaleString('ar-SA')} ر.س
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline text-xs font-bold text-white">
                  <span>المبلغ المطلوب دفعه:</span>
                  <span className="text-amber-400 font-mono text-lg font-black">
                    {total.toLocaleString('ar-SA')} ر.س
                  </span>
                </div>
              </div>

              {/* Google Account Selector */}
              <div className="p-3 bg-slate-950/50 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">الحساب المرتبط بـ Google Pay:</span>
                  <span className="text-emerald-400 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    متصل
                  </span>
                </div>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={e => setCustomerEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Saved Cards in Google Wallet */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  اختر البطاقة المحفوظة في محفظة Google:
                </label>
                <div className="space-y-2">
                  {cardsList.map(card => {
                    const isSelected = selectedCard === card.id;
                    return (
                      <div
                        key={card.id}
                        onClick={() => setSelectedCard(card.id as any)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-slate-800/90 border-amber-500 shadow-md ring-1 ring-amber-500/30'
                            : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-amber-400">
                            <CreditCard className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-white block">
                              {card.network} •••• {card.last4}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {card.bank}
                            </span>
                          </div>
                        </div>

                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-amber-500 bg-amber-500' : 'border-slate-600'
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Details */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">الاسم الكامل:</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">رقم الجوال:</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={e => setCustomerPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-[11px] text-slate-400 block mb-1">عنوان التوصيل:</label>
                  <input
                    type="text"
                    required
                    value={customerAddress}
                    onChange={e => setCustomerAddress(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Official Google Pay Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-black text-sm shadow-xl flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                    <span>جاري معالجة الدفع عبر Google Pay...</span>
                  </div>
                ) : (
                  <>
                    <span className="font-bold text-base tracking-tight text-slate-800">Google</span>
                    <span className="font-black text-base text-slate-950">Pay</span>
                    <span className="mx-1.5 text-slate-300">|</span>
                    <span>ادفع الآن ({total.toLocaleString('ar-SA')} ر.س)</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 text-center">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>حماية مشتريات Google Pay وتشفير كامل للبيانات</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
