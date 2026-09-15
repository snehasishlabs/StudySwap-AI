import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Maximize2, 
  RefreshCw, 
  IndianRupee, 
  Check, 
  ShieldCheck,
  Bot
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FloatingChatbox: React.FC = () => {
  const { 
    chatThreads, 
    activeThreadId, 
    activeChatThreadId,
    setActiveThreadId,
    setActiveChatThreadId,
    sendMessage, 
    sendChatMessage,
    acceptOffer,
    currentUser, 
    navigateTo, 
    currentPage,
    switchToBuyerDemo,
    switchToSellerDemo
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'peer' | 'ai'>('peer');
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentId = activeChatThreadId || activeThreadId || chatThreads[0]?.id;
  const activeThread = chatThreads.find((t) => t.id === currentId) || chatThreads[0];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, activeThread?.messages, isTyping]);

  // If already on the full messages page, hide floating widget to keep UI clean
  if (currentPage === 'messages') {
    return null;
  }

  const sendMsg = (content: string, isOffer?: boolean, amount?: number) => {
    if (!activeThread) return;
    if (typeof sendMessage === 'function') {
      sendMessage(activeThread.id, content, isOffer, amount);
    } else if (typeof sendChatMessage === 'function') {
      sendChatMessage(activeThread.id, content, isOffer, amount);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeThread) return;
    sendMsg(inputText);
    setInputText('');

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 1300);
  };

  const handleQuickPrompt = (prompt: string) => {
    sendMsg(prompt);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 1300);
  };

  const isCurrentUserSeller = currentUser.id === activeThread?.sellerId;
  const otherName = isCurrentUserSeller 
    ? (activeThread?.buyerName || 'Rahul Sharma') 
    : (activeThread?.sellerName || activeThread?.otherUserName || 'Priya Verma');
  const otherAvatar = isCurrentUserSeller 
    ? (activeThread?.buyerAvatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100') 
    : (activeThread?.sellerAvatar || activeThread?.otherUserAvatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100');
  const otherCollege = isCurrentUserSeller 
    ? (activeThread?.buyerCollege || 'Presidency University') 
    : (activeThread?.sellerCollege || 'Calcutta University');

  const totalUnread = chatThreads.reduce((acc, t) => acc + (t.unreadCount || 0), 0);

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Minimized Floating Button */}
      {!isOpen && (
        <button
          id="btn-open-floating-chatbox"
          onClick={() => setIsOpen(true)}
          className="relative group flex items-center gap-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-4 py-3 rounded-full shadow-xl shadow-blue-500/25 transition-all transform hover:scale-105 cursor-pointer border border-blue-400/30"
          aria-label="Open Chatbox"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
          </div>
          <span className="text-xs font-extrabold tracking-wide hidden sm:inline">
            Chatbox
          </span>
          {totalUnread > 0 && (
            <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {totalUnread}
            </span>
          )}
        </button>
      )}

      {/* Expanded Floating Chatbox Window */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[380px] h-[520px] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white p-3.5 flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative shrink-0">
                <img
                  src={otherAvatar}
                  alt={otherName}
                  className="w-8 h-8 rounded-xl object-cover ring-1 ring-white/30"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-slate-900"></span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-xs truncate">{otherName}</h4>
                  <span className="text-[9px] bg-blue-500/30 text-blue-200 px-1.5 py-0.2 rounded font-semibold">
                    {currentUser.role === 'buyer' ? 'Seller' : 'Buyer'}
                  </span>
                </div>
                <p className="text-[10px] text-slate-300 truncate">{otherCollege}</p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {/* Demo switch button */}
              <button
                onClick={() => {
                  if (currentUser.role === 'buyer') {
                    switchToSellerDemo();
                  } else {
                    switchToBuyerDemo();
                  }
                }}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition"
                title={`Switch active demo role (Current: ${currentUser.name})`}
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>

              {/* Expand to full messages page */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigateTo('messages');
                }}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition"
                title="Open Full Messages Page"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>

              {/* Close / Minimize */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition"
                title="Minimize Chatbox"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Listing Context Banner */}
          {activeThread && (
            <div className="bg-blue-50/70 border-b border-blue-100 px-3 py-2 flex items-center justify-between gap-2 text-xs shrink-0">
              <div className="min-w-0 flex items-center gap-2">
                <img
                  src={activeThread.listingImage}
                  alt={activeThread.listingTitle}
                  className="w-7 h-7 rounded-md object-cover shrink-0"
                />
                <span className="font-semibold text-slate-800 truncate text-[11px]">
                  {activeThread.listingTitle}
                </span>
              </div>
              <span className="font-bold text-blue-700 shrink-0 text-xs">
                ₹{activeThread.listingPrice}
              </span>
            </div>
          )}

          {/* Messages Stream */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2.5 bg-slate-50/50 text-xs">
            {activeThread?.messages.map((msg) => {
              const isMe = msg.senderId === currentUser.id;
              const text = msg.content || msg.text || '';
              const offerPrice = msg.offerAmount || msg.offerPrice;
              const isAccepted = msg.offerStatus === 'accepted';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} space-y-0.5`}
                >
                  <div
                    className={`max-w-[85%] p-2.5 rounded-2xl leading-relaxed shadow-xs ${
                      isMe
                        ? 'bg-blue-600 text-white rounded-tr-xs'
                        : 'bg-white text-slate-900 border border-slate-200 rounded-tl-xs'
                    }`}
                  >
                    {offerPrice && (
                      <div
                        className={`mb-1.5 p-2 rounded-lg text-[11px] flex items-center justify-between gap-2 ${
                          isAccepted
                            ? isMe ? 'bg-emerald-700 text-white' : 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                            : isMe ? 'bg-blue-700 text-white' : 'bg-amber-50 text-amber-900 border border-amber-200'
                        }`}
                      >
                        <span className="font-bold">Offer: ₹{offerPrice}</span>
                        {!isMe && !isAccepted && (
                          <button
                            onClick={() => {
                              if (typeof acceptOffer === 'function') {
                                acceptOffer(activeThread.id, msg.id, offerPrice);
                              }
                            }}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] px-2 py-0.5 rounded transition cursor-pointer"
                          >
                            Accept
                          </button>
                        )}
                      </div>
                    )}
                    <p className="whitespace-pre-line text-xs">{text}</p>
                  </div>
                  <span className="text-[9px] text-slate-400 px-1">
                    {msg.timestamp || 'Just now'}
                  </span>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-slate-400 text-[10px] italic px-1 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                <span>{otherName} is typing a reply...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="p-2 bg-slate-100 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto shrink-0">
            {(currentUser.role === 'buyer'
              ? ['Available for campus pickup?', 'Would you accept ₹270?', 'Can meet at Gate 2 at 4 PM']
              : ['Yes, book is ready!', 'Can meet outside Coffee House.', 'All solutions intact.']
            ).map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickPrompt(chip)}
                className="text-[11px] bg-white text-slate-700 hover:text-blue-600 border border-slate-200 px-2 py-1 rounded-lg transition whitespace-nowrap cursor-pointer shrink-0 font-medium"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0">
            <input
              type="text"
              placeholder={`Message ${otherName}...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold p-2 rounded-xl transition cursor-pointer shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
