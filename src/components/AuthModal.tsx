import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Phone,
  Mail,
  User,
  MapPin,
  Lock,
  ShieldAlert,
  CheckCircle2,
  AlertCircle,
  Crown,
  KeyRound
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    authModalOpen,
    setAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    loginCustomer,
    registerCustomer,
    loginOwner
  } = useApp();

  // Owner Login Fields
  const [ownerPhone, setOwnerPhone] = useState('0551234567');
  const [ownerPin, setOwnerPin] = useState('1234');

  // Customer Login Fields
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPassword, setCustomerPassword] = useState('');

  // Customer Register Fields (strictly includes name, address, region, phone, email)
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regRegion, setRegRegion] = useState('الرياض');
  const [regAddress, setRegAddress] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  if (!authModalOpen) return null;

  const handleOwnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const res = loginOwner(ownerPhone, ownerPin);
    if (!res.success) {
      setErrorMessage(res.error || 'فشل تسجيل دخول المالك');
    }
  };

  const handleCustomerLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const res = loginCustomer(customerEmail, customerPassword);
    if (!res.success) {
      setErrorMessage(res.error || 'فشل تسجيل الدخول');
    }
  };

  const handleCustomerRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const res = registerCustomer({
      fullName: regFullName,
      email: regEmail,
      phone: regPhone,
      region: regRegion,
      city: regRegion,
      address: regAddress
    });
    if (!res.success) {
      setErrorMessage(res.error || 'يرجى إكمال جميع الحقول');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-auto">
        {/* Header Tabs */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {authModalMode === 'owner_login' ? (
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Crown className="w-5 h-5" />
              </div>
            ) : (
              <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <User className="w-5 h-5" />
              </div>
            )}
            <div>
              <h3 className="font-bold text-white text-sm sm:text-base">
                {authModalMode === 'owner_login'
                  ? 'تسجيل دخول المالك (برقم الجوال)'
                  : authModalMode === 'customer_login'
                  ? 'تسجيل دخول العميل (بالإيميل)'
                  : 'إنشاء حساب عميل جديد'}
              </h3>
              <p className="text-[11px] text-slate-400">
                {authModalMode === 'owner_login'
                  ? 'مخصص لمالك وإدارة المتجر فقط'
                  : 'لتتبع الطلبات وسرعة الشراء عبر واتساب'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setAuthModalOpen(false)}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Selector between Customer & Owner */}
        <div className="p-3 bg-slate-950/40 border-b border-slate-800 flex gap-1">
          <button
            onClick={() => {
              setErrorMessage('');
              setAuthModalMode('customer_login');
            }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              authModalMode === 'customer_login'
                ? 'bg-slate-800 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            دخول العملاء (إيميل)
          </button>

          <button
            onClick={() => {
              setErrorMessage('');
              setAuthModalMode('customer_register');
            }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              authModalMode === 'customer_register'
                ? 'bg-slate-800 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            تسجيل عميل جديد
          </button>

          <button
            onClick={() => {
              setErrorMessage('');
              setAuthModalMode('owner_login');
            }}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
              authModalMode === 'owner_login'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-amber-400/80 hover:text-amber-400'
            }`}
          >
            المالك (جوال) 👑
          </button>
        </div>

        {/* Modal Form Body */}
        <div className="p-5 sm:p-6 space-y-4">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* MODE 1: OWNER LOGIN STRICTLY VIA MOBILE PHONE */}
          {authModalMode === 'owner_login' && (
            <form onSubmit={handleOwnerSubmit} className="space-y-4">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2.5">
                <Crown className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-bold block">دخول المالك برقم الجوال فقط</span>
                  <span className="text-[11px] text-slate-300">
                    بموجب إعدادات الأمان، المالك يدخل برقم الجوال المسجل ورمز التحقق للتحكم الكامل بالمنتجات والطلبات ومحرر الصور.
                  </span>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1 font-medium">
                  رقم جوال المالك:
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="05XXXXXXXX"
                    value={ownerPhone}
                    onChange={e => setOwnerPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pr-10 pl-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                  <Phone className="w-4 h-4 text-amber-400 absolute right-3.5 top-3" />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1 font-medium">
                  رمز أمان المالك (PIN):
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="رمز التحقق (الافتراضي: 1234)"
                    value={ownerPin}
                    onChange={e => setOwnerPin(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pr-10 pl-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                  <KeyRound className="w-4 h-4 text-amber-400 absolute right-3.5 top-3" />
                </div>
                <span className="text-[10px] text-slate-500 block mt-1">
                  * للتجربة يمكنك استخدام الرمز: 1234
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
              >
                <Crown className="w-4 h-4" />
                <span>دخول المالك للوحة التحكم</span>
              </button>
            </form>
          )}

          {/* MODE 2: CUSTOMER LOGIN STRICTLY VIA EMAIL */}
          {authModalMode === 'customer_login' && (
            <form onSubmit={handleCustomerLoginSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-slate-300 block mb-1 font-medium">
                  البريد الإلكتروني للعميل:
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={customerEmail}
                    onChange={e => setCustomerEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pr-10 pl-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1 font-medium">
                  كلمة المرور:
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={customerPassword}
                    onChange={e => setCustomerPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pr-10 pl-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all"
              >
                تسجيل الدخول بالإيميل
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setAuthModalMode('customer_register')}
                  className="text-xs text-amber-400 hover:underline"
                >
                  ليس لديك حساب بعد؟ اضغط هنا للتسجيل
                </button>
              </div>
            </form>
          )}

          {/* MODE 3: CUSTOMER REGISTRATION STRICTLY WITH NAME, ADDRESS, REGION, PHONE, EMAIL */}
          {authModalMode === 'customer_register' && (
            <form onSubmit={handleCustomerRegisterSubmit} className="space-y-3">
              <div>
                <label className="text-xs text-slate-300 block mb-1 font-medium">
                  الاسم الكامل للعميل: *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="محمد عبدالله"
                    value={regFullName}
                    onChange={e => setRegFullName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pr-9 pl-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1 font-medium">
                  البريد الإلكتروني: *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="client@gmail.com"
                    value={regEmail}
                    onChange={e => setRegEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pr-9 pl-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-slate-300 block mb-1 font-medium">
                    رقم الهاتف: *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="05XXXXXXXX"
                      value={regPhone}
                      onChange={e => setRegPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pr-8 pl-2 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                    />
                    <Phone className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5" />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1 font-medium">
                    المنطقة / المدينة: *
                  </label>
                  <select
                    value={regRegion}
                    onChange={e => setRegRegion(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="الرياض">الرياض</option>
                    <option value="جدة">جدة</option>
                    <option value="مكة المكرمة">مكة المكرمة</option>
                    <option value="المدينة المنورة">المدينة المنورة</option>
                    <option value="المنطقة الشرقية (الدمام/الخبر)">الشرقية</option>
                    <option value="القصيم">القصيم</option>
                    <option value="عسير (أبها/خميس مشيط)">عسير</option>
                    <option value="تبوك">تبوك</option>
                    <option value="حائل">حائل</option>
                    <option value="جازان">جازان</option>
                    <option value="نجران">نجران</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1 font-medium">
                  العنوان بالتفصيل: *
                </label>
                <div className="relative">
                  <textarea
                    required
                    rows={2}
                    placeholder="الحي، اسم الشارع، رقم المبنى لاستلام شحنات الدبات"
                    value={regAddress}
                    onChange={e => setRegAddress(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pr-9 pl-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                  <MapPin className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1 font-medium">
                  كلمة المرور:
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="اختر كلمة مرور"
                    value={regPassword}
                    onChange={e => setRegPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pr-9 pl-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all mt-2"
              >
                إتمام التسجيل وحفظ العنوان
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
