import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  MapPin, 
  Sparkles, 
  IndianRupee, 
  CheckCircle2, 
  Clock, 
  User, 
  ArrowUpRight,
  ShieldCheck,
  Building2,
  Search,
  RefreshCw,
  MessageSquare,
  AlertCircle,
  BookOpen,
  Check,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ChatThread } from '../types';

export const MessagesPage: React.FC = () => {
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
    showToast,
    switchToBuyerDemo,
    switchToSellerDemo
  } = useApp();

  const currentActiveId = activeChatThreadId || activeThreadId || chatThreads[0]?.id;
  const activeThread = chatThreads.find((t) => t.id === currentActiveId) || chatThreads[0];

  const [inputText, setInputText] = useState('');
  const [offerInput, setOfferInput] = useState('');
  const [isOfferMode, setIsOfferMode] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeThread?.messages, isTyping]);

  // Unified send message helper
  const sendMsg = (threadId: string, content: string, isOffer?: boolean, amount?: number) => {
    if (typeof sendMessage === 'function') {
      sendMessage(threadId, content, isOffer, amount);
    } else if (typeof sendChatMessage === 'function') {
      sendChatMessage(threadId, content, isOffer, amount);
    }
  };

  // Unified select thread helper
  const selectThread = (threadId: string) => {
    if (typeof setActiveChatThreadId === 'function') {
      setActiveChatThreadId(threadId);
    }
    if (typeof setActiveThreadId === 'function') {
      setActiveThreadId(threadId);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    if (isOfferMode && offerInput) {
      const parsed = parseFloat(offerInput);
      if (!isNaN(parsed) && parsed > 0) {
        sendMsg(activeThread.id, inputText, true, parsed);
        setOfferInput('');
        setIsOfferMode(false);
      } else {
        sendMsg(activeThread.id, inputText);
      }
    } else {
      sendMsg(activeThread.id, inputText);
    }

    setInputText('');
    
    // Show temporary typing indicator for simulated peer reply
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 1300);
  };

  const handleQuickPrompt = (prompt: string) => {
    sendMsg(activeThread.id, prompt);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 1300);
  };

  const handleAcceptDeal = (price: number, messageId?: string) => {
    if (typeof acceptOffer === 'function') {
      acceptOffer(activeThread.id, messageId, price);
    } else {
      sendMsg(
        activeThread.id,
        `🎉 Offer of ₹${price} accepted! Let's meet at the campus gate / College Street for handoff.`
      );
      showToast(`Accepted offer of ₹${price}!`, 'success');
    }
  };

  // Resolve thread participant details relative to current demo user
  const getParticipant = (thread: ChatThread) => {
    const isCurrentUserSeller = currentUser.id === thread.sellerId;
    const name = isCurrentUserSeller 
      ? (thread.buyerName || 'Rahul Sharma') 
      : (thread.sellerName || thread.otherUserName || 'Priya Verma');
    const avatar = isCurrentUserSeller 
      ? (thread.buyerAvatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80') 
      : (thread.sellerAvatar || thread.otherUserAvatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80');
    const roleBadge = isCurrentUserSeller ? 'Buyer (Aspirant)' : 'Verified Student Seller';
    const college = isCurrentUserSeller 
      ? (thread.buyerCollege || 'Presidency University') 
      : (thread.sellerCollege || 'Calcutta University');
    return { name, avatar, roleBadge, college };
  };

  const filteredThreads = chatThreads.filter((t) => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    const p = getParticipant(t);
    return (
      t.listingTitle.toLowerCase().includes(q) ||
      p.name.toLowerCase().includes(q) ||
      p.college.toLowerCase().includes(q)
    );
  });

  const activeParticipant = activeThread ? getParticipant(activeThread) : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">
      {/* Demo Switcher Bar & Live Chat Status */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 rounded-2xl p-4 text-white shadow-md flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-blue-300">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs uppercase font-bold tracking-wider text-blue-400">
                Active Demo Identity
              </span>
              <span className="text-xs bg-blue-500/20 text-blue-200 px-2 py-0.5 rounded-full border border-blue-400/20 font-semibold">
                {currentUser.role === 'buyer' ? 'Buyer Account' : 'Seller Account'}
              </span>
            </div>
            <p className="text-sm font-bold text-white">
              {currentUser.name} <span className="font-normal text-slate-300 text-xs">({currentUser.collegeOrCity})</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-300 hidden sm:inline">Test both sides of the chat:</span>
          {currentUser.role === 'buyer' ? (
            <button
              onClick={() => switchToSellerDemo('messages')}
              className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Switch to Seller Demo (Priya)</span>
            </button>
          ) : (
            <button
              onClick={() => switchToBuyerDemo('messages')}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Switch to Buyer Demo (Rahul)</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Chat Layout Container */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[680px]">
        {/* Left Sidebar: Threads (4 cols) */}
        <div className="lg:col-span-4 border-r border-slate-200/80 flex flex-col bg-slate-50/50">
          <div className="p-4 border-b border-slate-200 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <span>Conversations</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                  {filteredThreads.length}
                </span>
              </h2>
              <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Instant Peer Chat
              </span>
            </div>

            {/* Thread Search Box */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by book or student..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full bg-slate-100 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="overflow-y-auto flex-1 divide-y divide-slate-100">
            {filteredThreads.map((thread) => {
              const isSelected = thread.id === activeThread?.id;
              const participant = getParticipant(thread);
              const lastMsg = thread.messages[thread.messages.length - 1];
              const displayLastText = lastMsg ? (lastMsg.content || lastMsg.text) : thread.lastMessage;

              return (
                <div
                  key={thread.id}
                  onClick={() => selectThread(thread.id)}
                  className={`p-4 cursor-pointer transition flex items-start gap-3 ${
                    isSelected ? 'bg-blue-50/90 border-l-4 border-blue-600 shadow-xs' : 'hover:bg-slate-100/70'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={participant.avatar}
                      alt={participant.name}
                      className="w-11 h-11 rounded-2xl object-cover ring-2 ring-white"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-bold text-xs text-slate-900 truncate">
                        {participant.name}
                      </h4>
                      <span className="text-[10px] text-slate-400 shrink-0 font-medium">
                        {thread.lastMessageTime || 'Just now'}
                      </span>
                    </div>

                    <p className="text-[11px] font-medium text-slate-500 truncate">
                      {participant.college}
                    </p>

                    <p className="text-xs font-semibold text-blue-600 truncate mt-0.5">
                      {thread.listingTitle}
                    </p>

                    <p className="text-xs text-slate-600 truncate mt-0.5">
                      {displayLastText}
                    </p>
                  </div>
                </div>
              );
            })}

            {filteredThreads.length === 0 && (
              <div className="p-8 text-center text-slate-400 text-xs">
                No matching conversations found.
              </div>
            )}
          </div>
        </div>

        {/* Right Main Chat (8 cols) */}
        <div className="lg:col-span-8 flex flex-col h-[680px] bg-white">
          {activeThread && activeParticipant ? (
            <>
              {/* Chat Header with Listing context & Counterparty Profile */}
              <div className="p-4 border-b border-slate-200 bg-white flex items-center justify-between gap-4 shrink-0 shadow-xs">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative shrink-0">
                    <img
                      src={activeThread.listingImage}
                      alt={activeThread.listingTitle}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-slate-900 truncate">
                        {activeThread.listingTitle}
                      </h3>
                      <button
                        onClick={() => navigateTo('listing-details', activeThread.listingId)}
                        className="text-xs text-blue-600 hover:text-blue-800 flex items-center shrink-0"
                        title="View Listing Details"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5 flex-wrap">
                      <span>
                        Listed Price: <strong className="text-slate-900 font-bold">₹{activeThread.listingPrice}</strong>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        {activeParticipant.name} ({activeParticipant.roleBadge})
                      </span>
                      <span>•</span>
                      <span className="text-slate-500">{activeParticipant.college}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigateTo('listing-details', activeThread.listingId)}
                  className="hidden sm:inline-flex bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl transition cursor-pointer shrink-0 items-center gap-1"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Item Details</span>
                </button>
              </div>

              {/* Messages Stream Content */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/50">
                {activeThread.messages.map((msg) => {
                  const isMe = msg.senderId === currentUser.id;
                  const messageText = msg.content || msg.text || '';
                  const offerPrice = msg.offerAmount || msg.offerPrice;
                  const isAccepted = msg.offerStatus === 'accepted';

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} space-y-1`}
                    >
                      <div className="flex items-center gap-2 px-1">
                        {!isMe && (
                          <span className="text-[11px] font-bold text-slate-700">
                            {msg.senderName || activeParticipant.name}
                          </span>
                        )}
                        <span className="text-[10px] text-slate-400 font-medium">
                          {msg.timestamp || 'Just now'}
                        </span>
                      </div>

                      <div
                        className={`max-w-[85%] sm:max-w-[75%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                          isMe
                            ? 'bg-blue-600 text-white rounded-tr-xs'
                            : 'bg-white text-slate-900 border border-slate-200 rounded-tl-xs'
                        }`}
                      >
                        {/* Offer Snippet Card if message has offer */}
                        {offerPrice && (
                          <div
                            className={`mb-2.5 p-3 rounded-xl text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 ${
                              isAccepted
                                ? isMe ? 'bg-emerald-700 text-white border border-emerald-500' : 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                                : isMe ? 'bg-blue-700 text-white border border-blue-500' : 'bg-amber-50 text-amber-900 border border-amber-200'
                            }`}
                          >
                            <div>
                              <div className="flex items-center gap-1.5 font-bold">
                                <IndianRupee className="w-3.5 h-3.5" />
                                <span>Proposed Offer: ₹{offerPrice}</span>
                                {isAccepted && (
                                  <span className="bg-emerald-500 text-white text-[10px] px-1.5 py-0.2 rounded font-bold uppercase">
                                    Accepted
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] opacity-80 block mt-0.5">
                                Original Listed Price: ₹{activeThread.listingPrice}
                              </span>
                            </div>

                            {!isMe && !isAccepted && (
                              <button
                                onClick={() => handleAcceptDeal(offerPrice, msg.id)}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg transition cursor-pointer flex items-center justify-center gap-1 shadow-sm shrink-0"
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>Accept ₹{offerPrice}</span>
                              </button>
                            )}
                          </div>
                        )}

                        <p className="whitespace-pre-line">{messageText}</p>
                      </div>
                    </div>
                  );
                })}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center gap-2 text-slate-400 text-xs italic px-2 py-1 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span>{activeParticipant.name} is typing a reply...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Negotiation & Campus Presets */}
              <div className="p-2.5 bg-slate-100/80 border-t border-slate-200 flex items-center gap-2 overflow-x-auto">
                <span className="text-[10px] uppercase font-bold text-slate-500 shrink-0">
                  Quick Reply:
                </span>
                {(currentUser.role === 'buyer'
                  ? [
                      'Is ₹270 acceptable for campus meetup?',
                      'Can we meet at Presidency College Gate 2?',
                      'Can I inspect the notes today at 4:30 PM?',
                      'Are all chapter formulas & solutions intact?',
                    ]
                  : [
                      'Yes, available for campus meetup tomorrow!',
                      'I can meet outside College Street Coffee House.',
                      'All pages, solved formulas, and charts are intact.',
                      'Deal accepted! I will bring the book.',
                    ]
                ).map((preset, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickPrompt(preset)}
                    className="text-xs bg-white text-slate-700 hover:text-blue-600 hover:border-blue-300 border border-slate-200 px-3 py-1.5 rounded-xl transition whitespace-nowrap cursor-pointer shrink-0 font-medium"
                  >
                    {preset}
                  </button>
                ))}
              </div>

              {/* Offer Proposal Bar (Toggleable) */}
              {isOfferMode && (
                <div className="px-4 py-2 bg-amber-50 border-t border-amber-200 flex items-center gap-3">
                  <span className="text-xs font-bold text-amber-900 flex items-center gap-1 shrink-0">
                    <IndianRupee className="w-3.5 h-3.5 text-amber-600" />
                    Offer Price:
                  </span>
                  <input
                    type="number"
                    placeholder="e.g. 260"
                    value={offerInput}
                    onChange={(e) => setOfferInput(e.target.value)}
                    className="w-28 px-3 py-1 text-xs bg-white border border-amber-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  <span className="text-[11px] text-amber-700">
                    (Original listed: ₹{activeThread.listingPrice})
                  </span>
                  <button
                    onClick={() => setIsOfferMode(false)}
                    className="ml-auto text-xs text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              )}

              {/* Chat Input Form */}
              <form onSubmit={handleSend} className="p-3.5 bg-white border-t border-slate-200 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsOfferMode(!isOfferMode)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1 shrink-0 cursor-pointer border ${
                    isOfferMode
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                  }`}
                  title="Make an Offer or Counter-Offer"
                >
                  <IndianRupee className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Offer</span>
                </button>

                <input
                  type="text"
                  placeholder={
                    isOfferMode
                      ? `Type message with your ₹${offerInput || '...'} offer...`
                      : `Message ${activeParticipant.name} directly...`
                  }
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold px-4 py-2.5 rounded-xl transition shadow-sm cursor-pointer flex items-center gap-1.5 text-xs sm:text-sm shrink-0"
                >
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-slate-400 space-y-2">
              <MessageSquare className="w-8 h-8 text-slate-300" />
              <p className="text-sm">Select a conversation to start chatting.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
