import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Phone,
  MessageCircle,
  Share2,
  Copy,
  Check,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export const SocialShareBar: React.FC = () => {
  const { storeName, ownerWhatsappNumber } = useApp();
  const [copiedLink, setCopiedLink] = useState(false);

  const phone = '0565911414';
  const sponsorName = 'يوسف الأحمدي';

  const socialLinks = [
    {
      name: 'واتساب أعمال',
      icon: '💬',
      url: `https://wa.me/966565911414?text=${encodeURIComponent('السلام عليكم ورحمة الله، استفسار بخصوص دبات التلوث مع يوسف الأحمدي.')}`,
      color: 'bg-emerald-600 hover:bg-emerald-500 text-white'
    },
    {
      name: 'اتصال هاتفي',
      icon: '📞',
      url: `tel:${phone}`,
      color: 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold'
    },
    {
      name: 'سناب شات',
      icon: '👻',
      url: 'https://www.snapchat.com/add/dabat.store',
      color: 'bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold'
    },
    {
      name: 'تيك توك',
      icon: '🎵',
      url: 'https://www.tiktok.com/@dabat.ksa',
      color: 'bg-slate-900 hover:bg-slate-800 text-white border border-slate-700'
    },
    {
      name: 'إنستغرام',
      icon: '📸',
      url: 'https://instagram.com/dabat.filters',
      color: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white'
    },
    {
      name: 'منصة إكس (تويتر)',
      icon: '✖️',
      url: 'https://x.com/dabat_sa',
      color: 'bg-black hover:bg-slate-900 text-white border border-slate-700'
    },
    {
      name: 'يوتيوب',
      icon: '▶️',
      url: 'https://youtube.com/@dabat-sa',
      color: 'bg-red-600 hover:bg-red-500 text-white'
    }
  ];

  const handleShareStore = () => {
    if (navigator.share) {
      navigator.share({
        title: `${storeName} - برعاية يوسف الأحمدي`,
        text: 'متجر دبات التلوث الديزل والبنزين - فلاتر بيئة DPF ودبات تلوث أصلية معتمدة للفحص الدوري.',
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="w-full bg-slate-950/90 border-y border-slate-800 py-3.5 px-4 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-right">
        {/* Sponsorship & Contact Heading */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center text-sm font-bold">
            YA
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">برعاية وإشراف:</span>
              <span className="text-xs font-black text-amber-400">
                {sponsorName}
              </span>
              <span className="text-slate-600">•</span>
              <a
                href={`tel:${phone}`}
                className="text-xs font-mono font-black text-white hover:text-amber-400 transition-colors flex items-center gap-1"
                dir="ltr"
              >
                <Phone className="w-3 h-3 text-emerald-400" />
                {phone}
              </a>
              <span className="text-slate-600">•</span>
              <a
                href="tel:0565911517"
                className="text-xs font-mono font-bold text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1"
                dir="ltr"
                title="رقم الشكاوى 0565911517"
              >
                <span>الشكاوى:</span>
                <span>0565911517</span>
              </a>
            </div>
            <p className="text-[10px] text-slate-500">
              تابعنا وتواصل معنا عبر جميع منصات التواصل الاجتماعي • شكاوى: 0565911517
            </p>
          </div>
        </div>

        {/* Social Links List */}
        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          {socialLinks.map((s, idx) => (
            <a
              key={idx}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs transition-all shadow-sm ${s.color}`}
              title={s.name}
            >
              <span>{s.icon}</span>
              <span className="hidden sm:inline font-semibold text-[11px]">{s.name}</span>
            </a>
          ))}

          <button
            onClick={handleShareStore}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
            title="مشاركة رابط المتجر"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-amber-400" />}
            <span className="text-[11px]">{copiedLink ? 'تم النسخ!' : 'مشاركة المتجر'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
