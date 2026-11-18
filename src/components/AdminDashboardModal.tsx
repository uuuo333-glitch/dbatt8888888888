import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Plus,
  Trash2,
  Edit,
  SlidersHorizontal,
  Package,
  ShoppingBag,
  MessageSquare,
  Settings,
  Phone,
  Video,
  Image as ImageIcon,
  CheckCircle2,
  ExternalLink,
  Crown,
  Search,
  Check,
  Send,
  Fuel,
  Sparkles,
  Bot,
  Bell,
  Eye,
  RefreshCw,
  Flame,
  Tag
} from 'lucide-react';
import { Product, FuelType, ProductCategory, MarqueeAnnouncement } from '../types';

export const AdminDashboardModal: React.FC = () => {
  const {
    adminDashboardOpen,
    setAdminDashboardOpen,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    chatMessages,
    sendChatMessage,
    ownerWhatsappNumber,
    setOwnerWhatsappNumber,
    storeName,
    setStoreName,
    setEditingProduct,
    setImageEditorModalOpen,
    setExternalImportModalOpen,
    setGooglePreviewModalOpen,
    setWallpaperThemeModalOpen,
    setAiGeneratorModalOpen,
    generateAiProductContent,
    marqueeConfig,
    updateMarqueeConfig,
    addMarqueeAnnouncement,
    updateMarqueeAnnouncement,
    deleteMarqueeAnnouncement,
    resetMarqueeToDefault,
    storeContent,
    updateStoreContent
  } = useApp();

  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'chat' | 'marquee' | 'settings'>('products');

  // New / Edit Product Form State
  const [isEditingFormOpen, setIsEditingFormOpen] = useState(false);
  const [selectedProductToEdit, setSelectedProductToEdit] = useState<Product | null>(null);

  const [formName, setFormName] = useState('');
  const [formFuelType, setFormFuelType] = useState<FuelType>('diesel');
  const [formCategory, setFormCategory] = useState<ProductCategory>('dpf_filter');
  const [formPrice, setFormPrice] = useState<number>(1850);
  const [formOriginalPrice, setFormOriginalPrice] = useState<number>(2200);
  const [formImage, setFormImage] = useState('');
  const [formVideoUrl, setFormVideoUrl] = useState('');
  const [formOemNumber, setFormOemNumber] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formCompatibleCars, setFormCompatibleCars] = useState('');
  const [formStockCount, setFormStockCount] = useState<number>(10);
  const [formFiltration, setFormFiltration] = useState('99.2% تصفية كربون');
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiSuccessMessage, setAiSuccessMessage] = useState('');

  // Marquee Editor Form State
  const [newAnnounceText, setNewAnnounceText] = useState('');
  const [newAnnounceBadge, setNewAnnounceBadge] = useState('إعلان حصري');
  const [newAnnounceIcon, setNewAnnounceIcon] = useState<MarqueeAnnouncement['icon']>('flame');
  const [editingAnnounceId, setEditingAnnounceId] = useState<string | null>(null);
  const [editingAnnounceText, setEditingAnnounceText] = useState('');
  const [editingAnnounceBadge, setEditingAnnounceBadge] = useState('');
  const [marqueeSuccessMsg, setMarqueeSuccessMsg] = useState('');

  // Quick reply in admin chat
  const [adminReplyText, setAdminReplyText] = useState('');
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  if (!adminDashboardOpen) return null;

  const handleAiAutoFill = async () => {
    setIsAiGenerating(true);
    setAiSuccessMessage('');
    try {
      const result = await generateAiProductContent({
        carModel: formCompatibleCars.trim() || formName.trim() || 'هايلوكس ديزل 2024',
        fuelType: formFuelType,
        category: formCategory,
        keywords: formDescription || 'دبة تلوث فحص دوري واجتياز الفحص'
      });
      if (result) {
        if (result.nameAr) setFormName(result.nameAr);
        if (result.description) setFormDescription(result.description);
        if (result.oemNumber && !formOemNumber) setFormOemNumber(result.oemNumber);
        if (result.compatibleCars && result.compatibleCars.length > 0) {
          setFormCompatibleCars(result.compatibleCars.join(' ، '));
        }
        if (result.suggestedPriceSar) {
          setFormPrice(result.suggestedPriceSar);
          setFormOriginalPrice(Math.round(result.suggestedPriceSar * 1.2));
        }
        if (result.filtrationEfficiency) {
          setFormFiltration(result.filtrationEfficiency);
        }
        setAiSuccessMessage('✨ تم توليد العنوان والوصف والمواصفات بنجاح بالذكاء الاصطناعي!');
        setTimeout(() => setAiSuccessMessage(''), 4000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleOpenAddProduct = () => {
    setSelectedProductToEdit(null);
    setFormName('');
    setFormFuelType('diesel');
    setFormCategory('dpf_filter');
    setFormPrice(1750);
    setFormOriginalPrice(2100);
    setFormImage('https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80');
    setFormVideoUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
    setFormOemNumber('OEM-DPF-2024');
    setFormDescription('دبة تلوث وفلتر ديزل عالي الجودة مطابق للمواصفات واجتياز الفحص الدوري.');
    setFormCompatibleCars('تويوتا هايلوكس، فورتشنر، لاندكروزر');
    setFormStockCount(10);
    setFormFiltration('99% تصفية السناج والدخان');
    setIsEditingFormOpen(true);
  };

  const handleOpenEditProduct = (p: Product) => {
    setSelectedProductToEdit(p);
    setFormName(p.name);
    setFormFuelType(p.fuelType);
    setFormCategory(p.category);
    setFormPrice(p.price);
    setFormOriginalPrice(p.originalPrice || p.price);
    setFormImage(p.image);
    setFormVideoUrl(p.videoUrl || '');
    setFormOemNumber(p.oemNumber || '');
    setFormDescription(p.description);
    setFormCompatibleCars(p.compatibleCars?.join(' ، ') || '');
    setFormStockCount(p.stockCount || 5);
    setFormFiltration(p.filtrationEfficiency || '');
    setIsEditingFormOpen(true);
  };

  const handleSaveProductForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formImage.trim()) return;

    const carsList = formCompatibleCars
      .split(/[,،\n]/)
      .map(c => c.trim())
      .filter(Boolean);

    if (selectedProductToEdit) {
      updateProduct(selectedProductToEdit.id, {
        name: formName.trim(),
        fuelType: formFuelType,
        category: formCategory,
        price: Number(formPrice),
        originalPrice: Number(formOriginalPrice),
        image: formImage.trim(),
        videoUrl: formVideoUrl.trim() || undefined,
        oemNumber: formOemNumber.trim() || undefined,
        description: formDescription.trim(),
        compatibleCars: carsList,
        stockCount: Number(formStockCount),
        filtrationEfficiency: formFiltration.trim() || undefined
      });
    } else {
      addProduct({
        name: formName.trim(),
        fuelType: formFuelType,
        category: formCategory,
        price: Number(formPrice),
        originalPrice: Number(formOriginalPrice),
        image: formImage.trim(),
        videoUrl: formVideoUrl.trim() || undefined,
        oemNumber: formOemNumber.trim() || undefined,
        description: formDescription.trim(),
        compatibleCars: carsList,
        inStock: true,
        stockCount: Number(formStockCount),
        filtrationEfficiency: formFiltration.trim() || undefined
      });
    }

    setIsEditingFormOpen(false);
  };

  const handleAdminChatReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminReplyText.trim()) return;
    sendChatMessage(adminReplyText.trim());
    setAdminReplyText('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 text-right">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base sm:text-lg">
                  لوحة تحكم مالك المتجر
                </h3>
                <span className="text-[10px] bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full font-black">
                  دخول مصرح برقم الجوال
                </span>
              </div>
              <p className="text-xs text-slate-400">
                إدارة منتجات الديزل والبنزين، طلبات الواتساب، الدردشة المباشرة، والإعدادات
              </p>
            </div>
          </div>

          <button
            onClick={() => setAdminDashboardOpen(false)}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dashboard Tabs Navigation */}
        <div className="p-3 bg-slate-950/60 border-b border-slate-800 flex gap-2 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all flex-shrink-0 ${
              activeTab === 'products'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>المنتجات والمخزون ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all flex-shrink-0 ${
              activeTab === 'orders'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>طلبات واتساب أعمال ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all flex-shrink-0 ${
              activeTab === 'chat'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>صندوق الدردشة المباشرة ({chatMessages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('marquee')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all flex-shrink-0 ${
              activeTab === 'marquee'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Bell className="w-4 h-4 text-amber-400" />
            <span>شريط الإعلانات ({marqueeConfig.announcements.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all flex-shrink-0 ${
              activeTab === 'settings'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>إعدادات الواتساب والمتجر</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* TAB 1: PRODUCTS MANAGEMENT */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">
                    قائمة دبات التلوث وفلاتر الديزل والبنزين
                  </h4>
                  <span className="text-xs text-slate-400">
                    ({products.length} منتج مسجل)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setExternalImportModalOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sky-950/60 hover:bg-sky-900 text-sky-400 border border-sky-500/30 text-xs font-semibold"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>إضافة من المواقع (صورة وسعر)</span>
                  </button>

                  <button
                    onClick={handleOpenAddProduct}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>إضافة منتج جديد</span>
                  </button>
                </div>
              </div>

              {/* Products Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/60">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-3">المنتج والصورة</th>
                      <th className="p-3">نوع الوقود</th>
                      <th className="p-3">السعر</th>
                      <th className="p-3">المخزون</th>
                      <th className="p-3">التقييم</th>
                      <th className="p-3 text-center">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-200">
                    {products.map(p => (
                      <tr key={p.id} className="hover:bg-slate-900/40 transition-colors">
                        <td className="p-3">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={p.image}
                              alt=""
                              className="w-10 h-10 rounded-lg object-cover bg-slate-900 border border-slate-800 flex-shrink-0"
                            />
                            <div className="min-w-0">
                              <span className="font-bold block truncate max-w-xs text-white">
                                {p.name}
                              </span>
                              {p.oemNumber && (
                                <span className="text-[10px] text-slate-500 font-mono">
                                  OEM: {p.oemNumber}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="p-3">
                          {p.fuelType === 'diesel' ? (
                            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[11px] font-semibold">
                              🛢️ ديزل DPF
                            </span>
                          ) : p.fuelType === 'petrol' ? (
                            <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 text-[11px] font-semibold">
                              ⛽ بنزين
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-semibold">
                              شامل
                            </span>
                          )}
                        </td>

                        <td className="p-3 font-mono font-bold text-amber-400 text-sm">
                          {p.price.toLocaleString('ar-SA')} ر.س
                        </td>

                        <td className="p-3">
                          <span className="font-mono text-emerald-400 font-bold">
                            {p.stockCount} قطعة
                          </span>
                        </td>

                        <td className="p-3">
                          <span className="text-amber-400 font-bold">
                            {p.rating.toFixed(1)} ★
                          </span>
                          <span className="text-slate-500 text-[10px] mr-1">
                            ({p.reviewsCount})
                          </span>
                        </td>

                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            {/* Photo Editor */}
                            <button
                              onClick={() => {
                                setEditingProduct(p);
                                setImageEditorModalOpen(true);
                              }}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                              title="تعديل الصورة في محرر الصور (قص، سطوع، مائية)"
                            >
                              <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                            </button>

                            {/* Edit Info */}
                            <button
                              onClick={() => handleOpenEditProduct(p)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                              title="تعديل البيانات والسعر"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => {
                                if (confirm(`هل أنت متأكد من حذف المنتج: ${p.name}؟`)) {
                                  deleteProduct(p.id);
                                }
                              }}
                              className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                              title="حذف المنتج"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: INCOMING WHATSAPP ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white">
                  سجل طلبات الشراء الواردة عبر واتساب أعمال
                </h4>
                <span className="text-xs text-slate-400 font-mono">
                  إجمالي الطلبات: {orders.length}
                </span>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-12 bg-slate-950/60 rounded-2xl border border-dashed border-slate-800 text-slate-400 text-xs">
                  لا توجد طلبات واردة حالياً. عند قيام أي عميل بطلب دبة تلوث، سيظهر طلبه هنا فوراً مع كامل بياناته.
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map(order => (
                    <div
                      key={order.id}
                      className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                            #{order.orderNumber}
                          </span>
                          <span className="text-xs font-bold text-white">
                            العميل: {order.customerName}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {order.customerPhone}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <select
                            value={order.status}
                            onChange={e => updateOrderStatus(order.id, e.target.value as any)}
                            className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white"
                          >
                            <option value="pending_whatsapp">بانتظار التأكيد في واتساب</option>
                            <option value="confirmed">تم استلام الدفع والتأكيد</option>
                            <option value="processing">قيد تجهيز الدبة</option>
                            <option value="shipped">تم الشحن وإرسال البوليصة</option>
                            <option value="delivered">تم التسليم بنجاح</option>
                          </select>

                          {/* Direct WhatsApp chat with customer */}
                          <a
                            href={`https://wa.me/${order.customerPhone.replace(/\D/g, '')}?text=${encodeURIComponent(`السلام عليكم أخ ${order.customerName}، بخصوص طلبك رقم #${order.orderNumber} من متجر دبات التلوث.`)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                            title="مراسلة العميل عبر واتساب"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>

                      {/* Items & Address */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-slate-400 block mb-1">المنتجات المطلوبة:</span>
                          <ul className="space-y-1">
                            {order.items.map((it, idx) => (
                              <li key={idx} className="flex justify-between text-slate-200">
                                <span>{it.quantity}x {it.productName}</span>
                                <span className="font-mono text-amber-400">{it.price * it.quantity} ر.س</span>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-2 pt-2 border-t border-slate-800 flex justify-between font-bold text-white">
                            <span>الإجمالي النهائي:</span>
                            <span className="font-mono text-amber-400">{order.total.toLocaleString('ar-SA')} ر.س</span>
                          </div>
                        </div>

                        <div className="space-y-1 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                          <span className="text-slate-400 block">عنوان الشحن:</span>
                          <p className="text-white font-medium">
                            {order.customerRegion} - {order.customerAddress}
                          </p>
                          {order.orderNotes && (
                            <p className="text-amber-400 text-[11px] pt-1">
                              ملاحظة العميل: {order.orderNotes}
                            </p>
                          )}
                          <span className="text-[10px] text-slate-500 font-mono block pt-1">
                            تاريخ الطلب: {order.createdAt}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: LIVE CHAT INBOX */}
          {activeTab === 'chat' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white">
                  صندوق رسائل الدردشة المباشرة مع العملاء
                </h4>
                <span className="text-xs text-slate-400">
                  يمكنك الرد هنا مباشرة كمالك المتجر
                </span>
              </div>

              <div className="h-72 overflow-y-auto p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                {chatMessages.map(m => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${
                      m.sender === 'owner' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <span className="text-[10px] text-slate-400 mb-0.5">
                      {m.senderName} ({m.timestamp})
                    </span>
                    <div
                      className={`max-w-md p-3 rounded-2xl text-xs ${
                        m.sender === 'owner'
                          ? 'bg-amber-500 text-slate-950 font-medium'
                          : 'bg-slate-800 text-white border border-slate-700'
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Admin reply input */}
              <form onSubmit={handleAdminChatReply} className="flex gap-2">
                <input
                  type="text"
                  placeholder="اكتب ردك كمالك المتجر..."
                  value={adminReplyText}
                  onChange={e => setAdminReplyText(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  disabled={!adminReplyText.trim()}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold text-xs flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4 rotate-180" />
                  <span>إرسال الرد</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: STORE SETTINGS & WHATSAPP CONFIG */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-xl mx-auto">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>إعدادات واتساب أعمال لاستقبال الطلبات:</span>
                </h4>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">
                    رقم الواتساب أعمال (مع مفتاح الدولة بدون +):
                  </label>
                  <input
                    type="text"
                    value={ownerWhatsappNumber}
                    onChange={e => setOwnerWhatsappNumber(e.target.value)}
                    placeholder="966565911414"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                  />
                  <span className="text-[10px] text-amber-400 block mt-1">
                    الرقم المعتمد: 0565911414 (966565911414) - برعاية يوسف الأحمدي. عند إتمام العميل للطلب في السلة، ستصلك رسالة الطلب مباشرة على هذا الرقم.
                  </span>
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">
                    اسم المتجر المعروض:
                  </label>
                  <input
                    type="text"
                    value={storeName}
                    onChange={e => setStoreName(e.target.value)}
                <div>
                  <label className="text-xs text-rose-300 font-bold block mb-1">
                    رقم هاتف الشكاوى والاقتراحات المعتمد:
                  </label>
                  <input
                    type="text"
                    value={storeContent.complaintsPhone}
                    onChange={e => updateStoreContent({ complaintsPhone: e.target.value })}
                    placeholder="0565911517"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-rose-500"
                  />
                  <span className="text-[10px] text-slate-400 block mt-1">
                    الرقم المعروض للعملاء للشكاوى المباشرة: 0565911517
                  </span>
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1 font-bold">
                    نص "من نحن" أسفل الصفحة (قابل للتعديل):
                  </label>
                  <textarea
                    rows={3}
                    value={storeContent.aboutUsText}
                    onChange={e => updateStoreContent({ aboutUsText: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white leading-relaxed focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-amber-400 block mb-1 font-bold">
                    شعر / شعار "معمل دبات التلوث" (أسفل الصفحة):
                  </label>
                  <textarea
                    rows={2}
                    value={storeContent.workshopPoem}
                    onChange={e => updateStoreContent({ workshopPoem: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-amber-300 font-bold leading-relaxed focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1 font-bold">
                    نص وتفاصيل "معمل دبات التلوث":
                  </label>
                  <textarea
                    rows={3}
                    value={storeContent.workshopText}
                    onChange={e => updateStoreContent({ workshopText: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white leading-relaxed focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSettingsSuccess(true);
                    setTimeout(() => setSettingsSuccess(false), 2000);
                  }}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                >
                  حفظ الإعدادات والنصوص
                </button>

                {settingsSuccess && (
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>تم حفظ الإعدادات بنجاح!</span>
                  </div>
                )}
              </div>

              {/* Quick links to Theme, Marquee & SEO */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => setActiveTab('marquee')}
                  className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-amber-500/30 text-right text-xs"
                >
                  <span className="font-bold text-amber-400 block mb-0.5">📢 شريط الإعلانات المتحرك</span>
                  <span className="text-slate-400 text-[10px]">تعديل نصوص وسرعة إعلانات الشريط</span>
                </button>

                <button
                  onClick={() => {
                    setAdminDashboardOpen(false);
                    setWallpaperThemeModalOpen(true);
                  }}
                  className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-right text-xs"
                >
                  <span className="font-bold text-white block mb-0.5">تخصيص الثيم والخلفيات</span>
                  <span className="text-slate-400 text-[10px]">تغيير ألوان ورفع خلفية للمتجر</span>
                </button>

                <button
                  onClick={() => {
                    setAdminDashboardOpen(false);
                    setGooglePreviewModalOpen(true);
                  }}
                  className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-right text-xs"
                >
                  <span className="font-bold text-sky-400 block mb-0.5">محاكي بحث جوجل</span>
                  <span className="text-slate-400 text-[10px]">فحص Schema و Rich Snippets</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB: STORE MARQUEE CUSTOMIZER */}
          {activeTab === 'marquee' && (
            <div className="space-y-6">
              {/* Header & Quick stats */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Bell className="w-4 h-4 text-amber-400" />
                      <span>تخصيص الشريط العلوي المتحرك (Store Marquee)</span>
                    </h4>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      marqueeConfig.enabled
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}>
                      {marqueeConfig.enabled ? 'مفعل ويعمل حالياً' : 'معطل'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    يمكنك كتابة وتعديل إعلانات متجرك، التحكم بسرعة الحركة، إضافة شارات وعروض مميزة.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateMarqueeConfig({ enabled: !marqueeConfig.enabled })}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      marqueeConfig.enabled
                        ? 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                    }`}
                  >
                    <span>{marqueeConfig.enabled ? 'إيقاف الشريط مؤقتاً' : 'تفعيل الشريط'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('هل ترغب باستعادة قائمة الإعلانات الافتراضية للمتجر؟')) {
                        resetMarqueeToDefault();
                        setMarqueeSuccessMsg('تمت استعادة الإعلانات الافتراضية بنجاح!');
                        setTimeout(() => setMarqueeSuccessMsg(''), 3000);
                      }
                    }}
                    className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="استعادة الإعلانات الافتراضية"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Real-time Preview Banner */}
              <div className="space-y-2">
                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  <span>معاينة حية للشريط أعلى المتجر الآن:</span>
                </span>
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-amber-500/30 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 p-2.5 text-xs text-white">
                  <div className="flex items-center justify-between">
                    <span className="bg-slate-950 text-amber-400 px-2 py-0.5 rounded font-black text-[11px] ml-2 flex-shrink-0">
                      معاينة الإعلان
                    </span>
                    <div className="overflow-hidden whitespace-nowrap flex-1 flex">
                      <div className="animate-[marquee_28s_linear_infinite] font-bold text-[12px] flex items-center gap-6">
                        {marqueeConfig.announcements
                          .filter(a => a.active)
                          .map((a, i) => (
                            <span key={i} className="inline-flex items-center gap-1.5">
                              {a.badge && (
                                <span className="bg-slate-950/80 text-amber-300 text-[10px] px-1.5 py-0.5 rounded">
                                  {a.badge}
                                </span>
                              )}
                              <span>{a.text}</span>
                              <span className="text-amber-200/60">✦</span>
                            </span>
                          ))}
                      </div>
                    </div>
                    <span className="bg-slate-950/90 text-amber-400 px-2 py-0.5 rounded text-[10px] font-mono mr-2 flex-shrink-0">
                      {marqueeConfig.sponsorPhone}
                    </span>
                  </div>
                </div>
              </div>

              {/* General Controls (Speed, Sponsor, Pause on hover) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs">
                {/* Speed Setting */}
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">
                    سرعة حركة الشريط:
                  </label>
                  <select
                    value={marqueeConfig.speedSeconds}
                    onChange={e => updateMarqueeConfig({ speedSeconds: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  >
                    <option value={16}>سريع جداً (16 ثانية)</option>
                    <option value={24}>سريع معتدل (24 ثانية)</option>
                    <option value={28}>طبيعي وموصى به (28 ثانية)</option>
                    <option value={38}>هادئ ومريح للقراءة (38 ثانية)</option>
                    <option value={50}>بطيء جداً (50 ثانية)</option>
                  </select>
                </div>

                {/* Sponsor Name */}
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">
                    نص الرعاية والإشراف:
                  </label>
                  <input
                    type="text"
                    value={marqueeConfig.sponsorText}
                    onChange={e => updateMarqueeConfig({ sponsorText: e.target.value })}
                    placeholder="برعاية يوسف الأحمدي"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Sponsor Phone */}
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">
                    رقم الهاتف للاتصال السريع:
                  </label>
                  <input
                    type="text"
                    value={marqueeConfig.sponsorPhone}
                    onChange={e => updateMarqueeConfig({ sponsorPhone: e.target.value })}
                    placeholder="0565911414"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Add New Announcement Card */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Plus className="w-3.5 h-3.5 text-amber-400" />
                  <span>إضافة إعلان جديد إلى الشريط:</span>
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 text-xs">
                  <div className="sm:col-span-6">
                    <input
                      type="text"
                      placeholder="اكتب نص الإعلان هنا (مثال: عروض خاصة على دبات تويوتا ونيسان اليوم...)"
                      value={newAnnounceText}
                      onChange={e => setNewAnnounceText(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <input
                      type="text"
                      placeholder="شارة الإعلان (مثال: خصم خاص)"
                      value={newAnnounceBadge}
                      onChange={e => setNewAnnounceBadge(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="sm:col-span-3 flex gap-2">
                    <select
                      value={newAnnounceIcon}
                      onChange={e => setNewAnnounceIcon(e.target.value as any)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2 py-2 text-white text-xs"
                    >
                      <option value="flame">🔥 لهب / حرق</option>
                      <option value="phone">📞 هاتف / اتصال</option>
                      <option value="google_pay">💳 Google Pay</option>
                      <option value="check">✅ فحص دوري</option>
                      <option value="sparkles">✨ تميز</option>
                      <option value="tag">🏷️ عرض / خصم</option>
                    </select>

                    <button
                      type="button"
                      disabled={!newAnnounceText.trim()}
                      onClick={() => {
                        if (!newAnnounceText.trim()) return;
                        addMarqueeAnnouncement({
                          text: newAnnounceText.trim(),
                          badge: newAnnounceBadge.trim() || undefined,
                          icon: newAnnounceIcon,
                          active: true
                        });
                        setNewAnnounceText('');
                        setNewAnnounceBadge('إعلان مميز');
                        setMarqueeSuccessMsg('تمت إضافة الإعلان بنجاح إلى شريط المتجر!');
                        setTimeout(() => setMarqueeSuccessMsg(''), 3000);
                      }}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold flex-shrink-0 transition-colors shadow"
                    >
                      إضافة
                    </button>
                  </div>
                </div>

                {marqueeSuccessMsg && (
                  <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 border border-emerald-500/30">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{marqueeSuccessMsg}</span>
                  </div>
                )}
              </div>

              {/* Current Announcements List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">
                    قائمة الإعلانات المسجلة ({marqueeConfig.announcements.length}):
                  </span>
                  <span className="text-slate-400">
                    يمكنك تفعيل أو تعطيل أي إعلان بنقرة واحدة
                  </span>
                </div>

                <div className="space-y-2">
                  {marqueeConfig.announcements.map((ann, idx) => (
                    <div
                      key={ann.id}
                      className={`p-3 rounded-2xl border transition-all ${
                        ann.active
                          ? 'bg-slate-950/80 border-slate-700/80'
                          : 'bg-slate-950/40 border-slate-800/40 opacity-60'
                      }`}
                    >
                      {editingAnnounceId === ann.id ? (
                        /* Inline Edit Mode */
                        <div className="space-y-2">
                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 text-xs">
                            <input
                              type="text"
                              value={editingAnnounceText}
                              onChange={e => setEditingAnnounceText(e.target.value)}
                              className="sm:col-span-8 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                            />
                            <input
                              type="text"
                              value={editingAnnounceBadge}
                              onChange={e => setEditingAnnounceBadge(e.target.value)}
                              placeholder="الشارة"
                              className="sm:col-span-4 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                            />
                          </div>
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                updateMarqueeAnnouncement(ann.id, {
                                  text: editingAnnounceText.trim() || ann.text,
                                  badge: editingAnnounceBadge.trim() || undefined
                                });
                                setEditingAnnounceId(null);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                            >
                              حفظ التعديل
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingAnnounceId(null)}
                              className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs"
                            >
                              إلغاء
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* Normal View */
                        <div className="flex items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="font-mono text-slate-500 text-[10px] w-4">
                              #{idx + 1}
                            </span>

                            {ann.badge && (
                              <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold flex-shrink-0">
                                {ann.badge}
                              </span>
                            )}

                            <span className="text-white font-medium truncate">
                              {ann.text}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 flex-shrink-0">
                            {/* Toggle Active */}
                            <button
                              type="button"
                              onClick={() => updateMarqueeAnnouncement(ann.id, { active: !ann.active })}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                                ann.active
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  : 'bg-slate-800 text-slate-400 border border-slate-700'
                              }`}
                            >
                              {ann.active ? 'مفعل' : 'معطل'}
                            </button>

                            {/* Edit Button */}
                            <button
                              type="button"
                              onClick={() => {
                                setEditingAnnounceId(ann.id);
                                setEditingAnnounceText(ann.text);
                                setEditingAnnounceBadge(ann.badge || '');
                              }}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                              title="تعديل الإعلان"
                            >
                              <Edit className="w-3.5 h-3.5 text-amber-400" />
                            </button>

                            {/* Delete Button */}
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm('هل أنت متأكد من حذف هذا الإعلان من الشريط؟')) {
                                  deleteMarqueeAnnouncement(ann.id);
                                }
                              }}
                              className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                              title="حذف الإعلان"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal for Adding / Editing Product */}
        {isEditingFormOpen && (
          <div className="absolute inset-0 bg-slate-950/95 z-50 p-6 overflow-y-auto flex flex-col justify-between animate-in fade-in">
            <div className="space-y-4 max-w-2xl mx-auto w-full">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h4 className="text-base font-bold text-white">
                  {selectedProductToEdit ? 'تعديل بيانات المنتج' : 'إضافة دبة تلوث / فلتر جديد'}
                </h4>
                <button
                  onClick={() => setIsEditingFormOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* AI Generation Helper */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-purple-500/15 to-sky-500/15 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      مساعد الذكاء الاصطناعي (Gemini AI)
                    </span>
                    <span className="text-[10px] text-slate-400">
                      كتابة عنوان تسويقي، وصف تقني، أرقام OEM، ونسبة التصفية تلقائياً
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    disabled={isAiGenerating}
                    onClick={handleAiAutoFill}
                    className="flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isAiGenerating ? 'جاري التوليد...' : 'توليد تلقائي'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditingFormOpen(false);
                      setAiGeneratorModalOpen(true);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 border border-sky-500/30 text-xs font-medium"
                  >
                    لوحة AI الكاملة
                  </button>
                </div>
              </div>

              {aiSuccessMessage && (
                <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{aiSuccessMessage}</span>
                </div>
              )}

              <form id="product-admin-form" onSubmit={handleSaveProductForm} className="space-y-4 text-xs">
                <div>
                  <label className="text-slate-300 block mb-1">اسم المنتج كاملاً: *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={e => setFormName(e.target.value)}
                    placeholder="مثال: دبة تلوث وفلتر بيئة ديزل DPF تويوتا هايلوكس 2016-2024"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 block mb-1">نوع الوقود: *</label>
                    <select
                      value={formFuelType}
                      onChange={e => setFormFuelType(e.target.value as FuelType)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    >
                      <option value="diesel">ديزل (فلتر DPF)</option>
                      <option value="petrol">بنزين (دبة بيئة Catalytic)</option>
                      <option value="universal">شامل ديزل وبنزين</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1">التصنيف:</label>
                    <select
                      value={formCategory}
                      onChange={e => setFormCategory(e.target.value as ProductCategory)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    >
                      <option value="dpf_filter">فلاتر ديزل DPF</option>
                      <option value="catalytic_petrol">دبات بيئة بنزين</option>
                      <option value="sport_cat">دبات رياضية High Flow</option>
                      <option value="o2_sensor">حساسات أوكسجين وشكمان</option>
                      <option value="cleaner_additive">منظفات وبخاخات DPF</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 block mb-1">السعر (ر.س): *</label>
                    <input
                      type="number"
                      required
                      value={formPrice}
                      onChange={e => setFormPrice(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-amber-400 font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1">السعر الأصلي قبل الخصم:</label>
                    <input
                      type="number"
                      value={formOriginalPrice}
                      onChange={e => setFormOriginalPrice(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">رابط صورة المنتج: *</label>
                  <input
                    type="url"
                    required
                    value={formImage}
                    onChange={e => setFormImage(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">رابط الفيديو (رفع فيديو / تجربة الصوت):</label>
                  <input
                    type="url"
                    placeholder="https://.../video.mp4"
                    value={formVideoUrl}
                    onChange={e => setFormVideoUrl(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">رقم القطعة OEM:</label>
                  <input
                    type="text"
                    value={formOemNumber}
                    onChange={e => setFormOemNumber(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">المركبات المتوافقة (مفصولة بفاصلة):</label>
                  <input
                    type="text"
                    value={formCompatibleCars}
                    onChange={e => setFormCompatibleCars(e.target.value)}
                    placeholder="تويوتا هايلوكس ديزل 2016-2024، فورتشنر ديزل"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">الوصف والمميزات:</label>
                  <textarea
                    rows={3}
                    value={formDescription}
                    onChange={e => setFormDescription(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </form>

              <div className="flex gap-2 pt-2 border-t border-slate-800">
                <button
                  type="submit"
                  form="product-admin-form"
                  className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                >
                  حفظ المنتج في المتجر
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingFormOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
