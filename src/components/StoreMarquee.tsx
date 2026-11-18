import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Flame,
  Bell,
  Phone,
  Sparkles,
  CheckCircle2,
  Tag,
  Settings,
  CreditCard,
  Volume2,
  ChevronLeft
} from 'lucide-react';
import { MarqueeAnnouncement } from '../types';

export const StoreMarquee: React.FC = () => {
  const {
    marqueeConfig,
    isOwner,
    setAdminDashboardOpen
  } = useApp();

  const [isPaused, setIsPaused] = useState(false);

  if (!marqueeConfig || !marqueeConfig.enabled) {
    return null;
  }

  // Filter only active announcements
  const activeAnnouncements = marqueeConfig.announcements.filter(a => a.active);

  if (activeAnnouncements.length === 0) {
    return null;
  }

  const renderIcon = (icon?: MarqueeAnnouncement['icon']) => {
    switch (icon) {
      case 'flame':
        return <Flame className="w-3.5 h-3.5 text-amber-300 animate-pulse flex-shrink-0" />;
      case 'phone':
        return <Phone className="w-3 h-3 text-emerald-300 flex-shrink-0" />;
      case 'google_pay':
        return (
          <span className="inline-flex items-center px-1.5 py-0.2 rounded bg-white text-slate-950 text-[10px] font-black tracking-tight flex-shrink-0">
            GPay
          </span>
        );
      case 'check':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 flex-shrink-0" />;
      case 'sparkles':
        return <Sparkles className="w-3.5 h-3.5 text-amber-200 flex-shrink-0" />;
      case 'tag':
      default:
        return <Tag className="w-3 h-3 text-sky-300 flex-shrink-0" />;
    }
  };

  const animationDuration = `${marqueeConfig.speedSeconds || 28}s`;

  return (
    <div
      className="relative w-full bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 text-slate-950 overflow-hidden shadow-md border-b border-amber-400/40 select-none z-30"
      onMouseEnter={() => marqueeConfig.pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => marqueeConfig.pauseOnHover && setIsPaused(false)}
    >
      <div className="flex items-center h-9 sm:h-10 px-2 sm:px-3">
        {/* Fixed Title Label on Right/Start in RTL */}
        <div className="z-10 bg-slate-950 text-amber-400 px-2.5 py-1 rounded-lg text-xs font-black flex items-center gap-1.5 flex-shrink-0 shadow-lg border border-amber-500/30">
          <Bell className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
          <span className="hidden sm:inline">إعلانات المتجر</span>
          <span className="sm:hidden">إعلان</span>
        </div>

        {/* Continuous Marquee Ticker */}
        <div className="overflow-hidden whitespace-nowrap flex-1 flex mx-2 relative mask-gradient">
          <div
            className="inline-flex items-center gap-8 text-xs font-black tracking-wide text-white drop-shadow"
            style={{
              animation: `marquee ${animationDuration} linear infinite`,
              animationPlayState: isPaused ? 'paused' : 'running'
            }}
          >
            {/* Render twice for continuous loop effect */}
            {[...activeAnnouncements, ...activeAnnouncements].map((ann, idx) => (
              <div
                key={`${ann.id}-${idx}`}
                className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full hover:bg-black/10 transition-colors"
              >
                {renderIcon(ann.icon)}

                {ann.badge && (
                  <span className="px-1.5 py-0.5 rounded-md bg-slate-950/80 text-amber-300 border border-amber-400/30 text-[10px] font-extrabold flex-shrink-0">
                    {ann.badge}
                  </span>
                )}

                <span className="text-white text-xs sm:text-[13px] font-bold">
                  {ann.text}
                </span>

                <span className="text-amber-200/60 text-xs mr-2">✦</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions & Sponsor Container */}
        <div className="z-10 flex items-center gap-1.5 flex-shrink-0">
          {/* Owner Quick Edit Marquee Button */}
          {isOwner && (
            <button
              onClick={() => setAdminDashboardOpen(true)}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-2 py-1 rounded-lg text-[10px] font-black flex items-center gap-1 shadow transition-transform active:scale-95"
              title="تعديل نصوص وسرعة الشريط من لوحة التحكم"
            >
              <Settings className="w-3 h-3 text-slate-950" />
              <span className="hidden md:inline">تعديل الشريط</span>
            </button>
          )}

          {/* Direct Phone / Sponsor link */}
          <a
            href={`tel:${marqueeConfig.sponsorPhone || '0565911414'}`}
            className="bg-slate-950/90 hover:bg-slate-900 text-amber-400 px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 shadow-lg border border-amber-500/30 transition-all hover:scale-105"
            title={`اتصال مباشر: ${marqueeConfig.sponsorPhone || '0565911414'}`}
          >
            <Phone className="w-3 h-3 text-amber-400" />
            <span className="hidden lg:inline text-slate-200">
              {marqueeConfig.sponsorText || 'برعاية يوسف الأحمدي'}:
            </span>
            <span className="font-mono text-white font-black">
              {marqueeConfig.sponsorPhone || '0565911414'}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};
