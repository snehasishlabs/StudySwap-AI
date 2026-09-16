import React, { createContext, useContext, useState, useEffect } from 'react';
import { Listing, UserProfile, ChatThread, Message, ExamCategory, ListingCategory } from '../types';
import { BUYER_DEMO_USER, SELLER_DEMO_USER, INITIAL_LISTINGS, SAMPLE_CHAT_THREADS } from '../data/mockData';

export type PageName = 
  | 'home' 
  | 'marketplace' 
  | 'listing-details' 
  | 'buyer-dashboard' 
  | 'seller-dashboard' 
  | 'add-listing' 
  | 'wishlist' 
  | 'messages' 
  | 'ai-assistant' 
  | 'ai-analyzer' 
  | 'ai-recommender' 
  | 'ai-study-companion'
  | 'buyer-profile' 
  | 'seller-profile' 
  | 'about' 
  | 'contact' 
  | 'admin'
  | 'db-schema';

export type ThemeMode = 'light' | 'dark' | 'sepia';

interface ToastInfo {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

interface AppContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  currentUser: UserProfile;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  switchToBuyerDemo: (destination?: PageName) => void;
  switchToSellerDemo: (destination?: PageName) => void;
  currentPage: PageName;
  navigateTo: (page: PageName, listingId?: string) => void;
  selectedListingId: string | null;
  setSelectedListingId: (id: string | null) => void;
  listings: Listing[];
  addListing: (newListing: Omit<Listing, 'id' | 'createdAt' | 'views' | 'inquiryCount'>) => void;
  markAsSold: (listingId: string) => void;
  wishlist: string[];
  toggleWishlist: (listingId: string) => void;
  recentlyViewed: string[];
  addToRecentlyViewed: (listingId: string) => void;
  chatThreads: ChatThread[];
  activeThreadId: string | null;
  setActiveThreadId: (id: string | null) => void;
  activeChatThreadId: string | null;
  setActiveChatThreadId: (id: string | null) => void;
  sendMessage: (threadId: string, content: string, isOffer?: boolean, offerAmount?: number) => void;
  sendChatMessage: (threadId: string, content: string, isOffer?: boolean, offerAmount?: number) => void;
  startInquiryChat: (listingId: string, messageText: string, offerAmount?: number) => void;
  acceptOffer: (threadId: string, messageId?: string, offerAmount?: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedExamFilter: ExamCategory | 'All';
  setSelectedExamFilter: (exam: ExamCategory | 'All') => void;
  selectedCategoryFilter: ListingCategory | 'All';
  setSelectedCategoryFilter: (category: ListingCategory | 'All') => void;
  // Compare Listings feature
  comparisonList: string[];
  toggleComparison: (listingId: string) => void;
  removeFromComparison: (listingId: string) => void;
  clearComparison: () => void;
  isCompareModalOpen: boolean;
  setIsCompareModalOpen: (open: boolean) => void;
  // DB Schema modal
  isDbSchemaModalOpen: boolean;
  setIsDbSchemaModalOpen: (open: boolean) => void;
  toasts: ToastInfo[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile>(BUYER_DEMO_USER);
  const [currentPage, setCurrentPage] = useState<PageName>('home');
  const [selectedListingId, setSelectedListingId] = useState<string | null>('listing-1');
  const [listings, setListings] = useState<Listing[]>(INITIAL_LISTINGS);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [chatThreads, setChatThreads] = useState<ChatThread[]>(SAMPLE_CHAT_THREADS);
  const [activeThreadId, setActiveThreadId] = useState<string | null>('thread-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExamFilter, setSelectedExamFilter] = useState<ExamCategory | 'All'>('All');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<ListingCategory | 'All'>('All');
  const [comparisonList, setComparisonList] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);
  const [isDbSchemaModalOpen, setIsDbSchemaModalOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  const toggleComparison = (listingId: string) => {
    setComparisonList(prev => {
      if (prev.includes(listingId)) {
        showToast('Removed from comparison', 'info');
        return prev.filter(id => id !== listingId);
      }
      if (prev.length >= 3) {
        showToast('You can compare up to 3 listings at a time.', 'warning');
        return prev;
      }
      showToast(`Added to comparison (${prev.length + 1}/3)`, 'success');
      return [...prev, listingId];
    });
  };

  const removeFromComparison = (listingId: string) => {
    setComparisonList(prev => prev.filter(id => id !== listingId));
    showToast('Removed from comparison', 'info');
  };

  const clearComparison = () => {
    setComparisonList([]);
    showToast('Cleared comparison list', 'info');
  };

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('studyswap_theme');
      if (saved === 'dark' || saved === 'sepia' || saved === 'light') {
        return saved;
      }
      if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch {
      // ignore
    }
    return 'light';
  });

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('studyswap_theme', newTheme);
    } catch {
      // ignore
    }
    const label = newTheme === 'dark' ? 'Night Study Mode (Dark)' : newTheme === 'sepia' ? 'Warm Eye-Care Mode (Paper)' : 'Daylight Mode (Light)';
    showToast(`Switched theme to ${label}`, 'info');
  };

  const toggleTheme = () => {
    const nextTheme: ThemeMode = theme === 'light' ? 'dark' : theme === 'dark' ? 'sepia' : 'light';
    setTheme(nextTheme);
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.classList.remove('dark', 'theme-sepia');
      if (theme === 'dark') {
        root.classList.add('dark');
      } else if (theme === 'sepia') {
        root.classList.add('theme-sepia');
      }
    }
  }, [theme]);

  const navigateTo = (page: PageName, listingId?: string) => {
    if (listingId) {
      setSelectedListingId(listingId);
      addToRecentlyViewed(listingId);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const switchToBuyerDemo = (destination?: PageName) => {
    setCurrentUser(BUYER_DEMO_USER);
    if (destination) {
      navigateTo(destination);
    } else {
      navigateTo('marketplace');
    }
    showToast('Active Role: Buyer Demo (Rahul Sharma) • Ready to browse resources', 'success');
  };

  const switchToSellerDemo = (destination?: PageName) => {
    setCurrentUser(SELLER_DEMO_USER);
    if (destination) {
      navigateTo(destination);
    } else {
      navigateTo('seller-dashboard');
    }
    showToast('Active Role: Seller Demo (Priya Verma) • Ready to manage listings', 'success');
  };

  const toggleWishlist = (id: string) => {
    setWishlist(prev => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Removed from wishlist', 'info');
        return prev.filter(item => item !== id);
      } else {
        showToast('Saved to wishlist!', 'success');
        return [...prev, id];
      }
    });
  };

  const addToRecentlyViewed = (id: string) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(item => item !== id);
      return [id, ...filtered].slice(0, 8);
    });
    // Increment listing view count
    setListings(prev =>
      prev.map(item => (item.id === id ? { ...item, views: item.views + 1 } : item))
    );
  };

  const addListing = (newListingData: Omit<Listing, 'id' | 'createdAt' | 'views' | 'inquiryCount'>) => {
    const newId = `listing-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const fullListing: Listing = {
      ...newListingData,
      id: newId,
      createdAt: 'Just now',
      views: 1,
      inquiryCount: 0,
    };
    setListings(prev => [fullListing, ...prev]);
    showToast('Listing published successfully! Visible to all students.', 'success');
    navigateTo('marketplace');
  };

  const markAsSold = (listingId: string) => {
    setListings(prev =>
      prev.map(item => {
        if (item.id === listingId) {
          const newStatus = item.status === 'sold' ? 'active' : 'sold';
          return { ...item, status: newStatus };
        }
        return item;
      })
    );
    showToast('Listing status updated successfully!', 'success');
  };

  const sendMessage = (threadId: string, content: string, isOffer?: boolean, offerAmount?: number) => {
    if (!content.trim()) return;

    // Find the thread
    const targetThread = chatThreads.find(t => t.id === threadId) || chatThreads[0];
    const actualThreadId = targetThread?.id || threadId;

    // Dynamically calculate receiver and sender details
    const isCurrentUserSeller = currentUser.id === targetThread?.sellerId;
    const receiverId = isCurrentUserSeller 
      ? (targetThread?.buyerId || 'user_rahul') 
      : (targetThread?.sellerId || 'user_priya');
    const receiverName = isCurrentUserSeller 
      ? (targetThread?.buyerName || 'Rahul Sharma') 
      : (targetThread?.sellerName || 'Priya Verma');
    const receiverAvatar = isCurrentUserSeller 
      ? (targetThread?.buyerAvatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80')
      : (targetThread?.sellerAvatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80');

    const newMsg: Message = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      receiverId,
      listingId: targetThread?.listingId || selectedListingId || 'listing-1',
      listingTitle: targetThread?.listingTitle || 'Study Resource',
      listingPrice: targetThread?.listingPrice || 300,
      content: content.trim(),
      text: content.trim(),
      timestamp: 'Just now',
      isOffer: Boolean(isOffer || offerAmount),
      offerAmount,
      offerPrice: offerAmount,
      offerStatus: (isOffer || offerAmount) ? 'pending' : undefined,
      read: true,
    };

    setChatThreads(prev =>
      prev.map(thread => {
        if (thread.id === actualThreadId) {
          return {
            ...thread,
            lastMessage: content.trim(),
            lastMessageTime: 'Just now',
            messages: [...thread.messages, newMsg],
          };
        }
        return thread;
      })
    );

    showToast(isOffer ? `Offer of ₹${offerAmount} sent!` : 'Message sent!', 'success');

    // Simulate realistic student counterparty response in demo mode after 1.2s
    setTimeout(() => {
      let replyContent = '';
      if (isOffer && offerAmount) {
        if (currentUser.role === 'buyer') {
          replyContent = `Hi ${currentUser.name}! I accept your offer of ₹${offerAmount}. When can you meet at the campus library / gate to pick up "${targetThread?.listingTitle || 'the book'}"?`;
        } else {
          replyContent = `Thank you ${currentUser.name}! Offer of ₹${offerAmount} agreed. I'll bring cash for the handoff.`;
        }
      } else {
        const lower = content.toLowerCase();
        if (lower.includes('meet') || lower.includes('time') || lower.includes('where') || lower.includes('gate') || lower.includes('today')) {
          replyContent = currentUser.role === 'buyer' 
            ? `I will be right outside the college library until 5:00 PM today. Let me know when you arrive!`
            : `Sounds great, I can meet you right outside College Street Coffee House / Gate 2 tomorrow!`;
        } else if (lower.includes('condition') || lower.includes('edition') || lower.includes('page') || lower.includes('solution') || lower.includes('notes')) {
          replyContent = `Yes! All pages, solved examples, and mind-maps are in pristine condition. You are welcome to inspect it before completing the handoff.`;
        } else {
          replyContent = currentUser.role === 'buyer'
            ? `Got your message, ${currentUser.name}! Happy to coordinate. Let me know what time works best for you.`
            : `Thanks ${currentUser.name}! I received your message and will confirm the meetup details shortly.`;
        }
      }

      const replyMsg: Message = {
        id: `reply-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        senderId: receiverId,
        senderName: receiverName,
        senderAvatar: receiverAvatar,
        receiverId: currentUser.id,
        listingId: targetThread?.listingId || 'listing-1',
        listingTitle: targetThread?.listingTitle || 'Study Resource',
        listingPrice: targetThread?.listingPrice || 300,
        content: replyContent,
        text: replyContent,
        timestamp: 'Just now',
        read: false,
      };

      setChatThreads(threads =>
        threads.map(thread => {
          if (thread.id === actualThreadId) {
            return {
              ...thread,
              lastMessage: replyContent,
              lastMessageTime: 'Just now',
              unreadCount: (thread.unreadCount || 0) + 1,
              messages: [...thread.messages, replyMsg],
            };
          }
          return thread;
        })
      );
    }, 1200);
  };

  const startInquiryChat = (listingId: string, messageText: string, offerAmount?: number) => {
    const listing = listings.find(l => l.id === listingId);
    if (!listing) return;

    // Check if thread already exists
    const existingThread = chatThreads.find(t => t.listingId === listingId);
    if (existingThread) {
      sendMessage(existingThread.id, messageText, Boolean(offerAmount), offerAmount);
      setActiveThreadId(existingThread.id);
      navigateTo('messages');
      return;
    }

    const newThreadId = `thread-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const newMsg: Message = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      receiverId: listing.sellerId,
      listingId: listing.id,
      listingTitle: listing.title,
      listingPrice: listing.price,
      content: messageText,
      text: messageText,
      timestamp: 'Just now',
      isOffer: Boolean(offerAmount),
      offerAmount,
      offerPrice: offerAmount,
      offerStatus: offerAmount ? 'pending' : undefined,
      read: true,
    };

    const newThread: ChatThread = {
      id: newThreadId,
      listingId: listing.id,
      listingTitle: listing.title,
      listingImage: listing.images[0] || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
      listingPrice: listing.price,
      buyerId: currentUser.id,
      buyerName: currentUser.name,
      buyerAvatar: currentUser.avatar,
      buyerCollege: currentUser.collegeOrCity,
      sellerId: listing.sellerId,
      sellerName: listing.sellerName,
      sellerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      sellerCollege: listing.campusOrLocation,
      otherUserId: listing.sellerId,
      otherUserName: listing.sellerName,
      otherUserAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      otherUserRating: listing.sellerRating,
      lastMessage: messageText,
      lastMessageTime: 'Just now',
      unreadCount: 0,
      messages: [newMsg],
    };

    setChatThreads(prev => [newThread, ...prev]);
    setActiveThreadId(newThreadId);
    // increment inquiry count on listing
    setListings(prev =>
      prev.map(l => (l.id === listingId ? { ...l, inquiryCount: l.inquiryCount + 1 } : l))
    );
    showToast('Inquiry conversation created!', 'success');
    navigateTo('messages');
  };

  const acceptOffer = (threadId: string, messageId?: string, offerAmount?: number) => {
    const thread = chatThreads.find(t => t.id === threadId);
    const amount = offerAmount || 270;

    const confirmationMsg: Message = {
      id: `accept-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      receiverId: currentUser.role === 'buyer' ? 'user_priya' : 'user_rahul',
      listingId: thread?.listingId || 'listing-1',
      listingTitle: thread?.listingTitle || 'Study Resource',
      listingPrice: thread?.listingPrice || 300,
      content: `🎉 Deal Confirmed! Offer of ₹${amount} accepted. Let's meet at the campus gate for the physical handoff.`,
      text: `🎉 Deal Confirmed! Offer of ₹${amount} accepted. Let's meet at the campus gate for the physical handoff.`,
      timestamp: 'Just now',
      read: true,
    };

    setChatThreads(prev =>
      prev.map(t => {
        if (t.id === threadId) {
          const updatedMessages = t.messages.map(msg => {
            if (!messageId || msg.id === messageId || (msg.isOffer && msg.offerStatus === 'pending')) {
              return { ...msg, offerStatus: 'accepted' as const };
            }
            return msg;
          });
          return {
            ...t,
            lastMessage: `🎉 Deal Confirmed! Offer of ₹${amount} accepted.`,
            lastMessageTime: 'Just now',
            messages: [...updatedMessages, confirmationMsg],
          };
        }
        return t;
      })
    );
    showToast(`Offer of ₹${amount} accepted! Coordinate campus pickup.`, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchToBuyerDemo,
        switchToSellerDemo,
        currentPage,
        navigateTo,
        selectedListingId,
        setSelectedListingId,
        listings,
        addListing,
        markAsSold,
        wishlist,
        toggleWishlist,
        recentlyViewed,
        addToRecentlyViewed,
        chatThreads,
        activeThreadId,
        setActiveThreadId,
        activeChatThreadId: activeThreadId,
        setActiveChatThreadId: setActiveThreadId,
        sendMessage,
        sendChatMessage: sendMessage,
        startInquiryChat,
        acceptOffer,
        searchQuery,
        setSearchQuery,
        selectedExamFilter,
        setSelectedExamFilter,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        comparisonList,
        toggleComparison,
        removeFromComparison,
        clearComparison,
        isCompareModalOpen,
        setIsCompareModalOpen,
        isDbSchemaModalOpen,
        setIsDbSchemaModalOpen,
        toasts,
        showToast,
        dismissToast,
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
