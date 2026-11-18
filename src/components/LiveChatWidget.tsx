import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  PhoneCall,
  User,
  ShieldCheck,
  Fuel,
  ExternalLink,
  MessageCircle
} from 'lucide-react';

export const LiveChatWidget: React.FC = () => {
  const {
    chatMessages,
    sendChatMessage,
    isChatOpen,
    setIsChatOpen,
    unreadChatCount,
    markChatAsRead,
    ownerWhatsappNumber,
    isOwner,
    currentUser,
    activeProductDetail
  } = useApp();

  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const quickInquiries = [
    'هل دبة التلوث تضمن نجاح الفحص الدوري 100%؟',
    'ما هي الدبة المناسبة لسيارة تويوتا هايلوكس ديزل؟',
    'كم يستغرق الشحن لموقعي وكيف يتم الدفع في واتساب؟',
    'هل الدبة تركب مباشرة مسامير بدون لحام أو قص؟'
  ];

  useEffect(() => {
    if (isChatOpen) {
      markChatAsRead();
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isChatOpen, chatMessages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sendChatMessage(inputText, activeProductDetail || undefined);
    setInputText('');
  };

  const handleQuickSend = (text: string) => {
    sendChatMessage(text, activeProductDetail || undefined);
  };

  const handleOpenWhatsAppChat = () => {
    const clean = ownerWhatsappNumber.replace(/\D/g, '');
    const text = encodeURIComponent('السلام عليكم، أود التحدث مع الدعم الفني لمتجر دبات التلوث بخصوص منتج.');
    window.open(`https://wa.me/${clean}?text=${text}`, '_blank');
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-5 left-5 z-40 flex items-center gap-2">
        {!isChatOpen && (
          <button
            onClick={() => setIsChatOpen(true)}
            className="relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs shadow-2xl shadow-amber-500/30 transition-all transform hover:scale-105"
          >
            <div className="relative">
              <MessageSquare className="w-5 h-5 fill-slate-950" />
              {unreadChatCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-600 text-white font-mono text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-ping">
                  {unreadChatCount}
                </span>
              )}
            </div>
            <span>دردشة مباشرة مع الدعم الفني</span>
          </button>
        )}
      </div>

      {/* Floating Chat Modal */}
      {isChatOpen && (
        <div className="fixed bottom-5 left-5 z-50 w-[90vw] sm:w-96 max-h-[580px] h-[520px] bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200 text-right">
          {/* Header */}
          <div className="p-3.5 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
                  DPF
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-900" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1">
                  <span>الدعم الفني لدبات التلوث</span>
                  {isOwner && (
                    <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.2 rounded font-bold">
                      أنت المالك
                    </span>
                  )}
                </h4>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  متواجدون للرد المباشر
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleOpenWhatsAppChat}
                className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
                title="نقل المحادثة لواتساب"
              >
                <MessageCircle className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsChatOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Complaints & Supervisor bar */}
          <div className="px-3.5 py-1.5 bg-slate-900/90 border-b border-slate-800 text-[10px] text-slate-300 flex items-center justify-between">
            <span className="text-amber-400 font-bold">إشراف: يوسف الأحمدي (0565911414)</span>
            <a href="tel:0565911517" className="text-rose-400 font-bold hover:underline flex items-center gap-1">
              <span>الشكاوى:</span>
              <span className="font-mono">0565911517</span>
            </a>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-950/70">
            {chatMessages.map(msg => {
              const isMe = isOwner
                ? msg.sender === 'owner'
                : msg.sender === 'customer';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    isMe ? 'items-end' : 'items-start'
                  } space-y-1`}
                >
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 px-1">
                    <span>{msg.senderName}</span>
                    <span>•</span>
                    <span className="font-mono">{msg.timestamp}</span>
                  </div>

                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                      isMe
                        ? 'bg-amber-500 text-slate-950 font-medium rounded-br-none shadow-md'
                        : 'bg-slate-800 text-slate-100 rounded-bl-none border border-slate-700/80 shadow'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {/* Attached product preview if available */}
                    {msg.attachedProduct && (
                      <div className="mt-2 pt-2 border-t border-slate-700/40 flex items-center gap-2 bg-slate-900/60 p-1.5 rounded-lg">
                        <img
                          src={msg.attachedProduct.image}
                          alt=""
                          className="w-8 h-8 rounded object-cover"
                        />
                        <div className="text-[10px] text-right truncate">
                          <span className="block font-bold text-white truncate">
                            {msg.attachedProduct.name}
                          </span>
                          <span className="font-mono text-amber-400 font-bold">
                            {msg.attachedProduct.price} ر.س
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick inquiries chips */}
          <div className="p-2 bg-slate-900/90 border-t border-slate-800 flex gap-1.5 overflow-x-auto text-[10px] no-scrollbar">
            {quickInquiries.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleQuickSend(q)}
                className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 flex-shrink-0 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Input */}
          <form
            onSubmit={handleSend}
            className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="اكتب استفسارك هنا لمندوب المتجر..."
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold transition-all shadow-md"
            >
              <Send className="w-4 h-4 rotate-180" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
