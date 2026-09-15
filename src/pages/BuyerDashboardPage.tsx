import React, { useState } from 'react';
import { 
  Heart, 
  Eye, 
  Sparkles, 
  MessageSquare, 
  User, 
  MapPin, 
  GraduationCap, 
  IndianRupee, 
  ArrowRight,
  Trash2,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BUYER_DEMO_USER } from '../data/mockData';
import { ListingCard } from '../components/marketplace/ListingCard';

export const BuyerDashboardPage: React.FC = () => {
  const { 
    currentUser, 
    wishlist, 
    recentlyViewed, 
    listings, 
    navigateTo, 
    chatThreads,
    toggleWishlist 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'wishlist' | 'recent' | 'ai-recommendations' | 'messages'>('wishlist');

  // Resolved list of wishlisted items
  const wishlistedItems = listings.filter((item) => wishlist.includes(item.id));

  // Resolved list of recently viewed items
  const recentItems = listings.filter((item) => recentlyViewed.includes(item.id));

  // AI recommendations tailored specifically for Rahul's target exam: SSC CGL 2027
  const aiRecommendedItems = listings.filter((item) => item.exam === 'SSC' || item.aiScore);

  // Total savings estimated
  const totalSavings = wishlistedItems.reduce(
    (acc, item) => acc + (item.originalPrice - item.price),
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Profile Hub Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4 sm:gap-5">
          <img
            src={BUYER_DEMO_USER.avatar}
            alt={BUYER_DEMO_USER.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-white/20 shadow-md"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black">{BUYER_DEMO_USER.name}</h1>
              <span className="bg-white/20 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-white/30">
                Buyer Demo
              </span>
              <span className="bg-emerald-400/20 text-emerald-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                Verified Student
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-blue-100">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {BUYER_DEMO_USER.location}
              </span>
              <span className="flex items-center gap-1 font-semibold text-amber-300">
                <GraduationCap className="w-3.5 h-3.5" />
                Target Exam: {BUYER_DEMO_USER.targetExam}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-3 w-full md:w-auto text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/15">
            <span className="block text-xl font-black text-white">{wishlist.length}</span>
            <span className="text-[10px] uppercase font-bold text-blue-200">Wishlist</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/15">
            <span className="block text-xl font-black text-white">{recentlyViewed.length}</span>
            <span className="text-[10px] uppercase font-bold text-blue-200">Viewed</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/15">
            <span className="block text-xl font-black text-emerald-300">₹{totalSavings || 1240}</span>
            <span className="text-[10px] uppercase font-bold text-blue-200">Est. Savings</span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('wishlist')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'wishlist'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Saved Wishlist ({wishlist.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('recent')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'recent'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>Recently Viewed ({recentItems.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('ai-recommendations')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'ai-recommendations'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>AI Recommendations ({aiRecommendedItems.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('messages')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'messages'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Active Inquiries ({chatThreads.length})</span>
        </button>
      </div>

      {/* Tab Content 1: Wishlist */}
      {activeTab === 'wishlist' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-xl text-slate-900">
              Saved Books & Handwritten Notes
            </h2>
            <button
              onClick={() => navigateTo('marketplace')}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              Browse more resources &rarr;
            </button>
          </div>

          {wishlistedItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistedItems.map((item) => (
                <ListingCard key={item.id} listing={item} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto space-y-3">
              <Heart className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-800">Your wishlist is empty</h3>
              <p className="text-xs text-slate-500">
                Click the heart icon on any book or note in the marketplace to save it for later review.
              </p>
              <button
                onClick={() => navigateTo('marketplace')}
                className="bg-blue-600 text-white text-xs font-bold px-6 py-2.5 rounded-xl"
              >
                Go to Marketplace
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab Content 2: Recently Viewed */}
      {activeTab === 'recent' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-xl text-slate-900">
              Recently Inspected Resources
            </h2>
            <span className="text-xs text-slate-500">
              Browsed during this study session
            </span>
          </div>

          {recentItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentItems.map((item) => (
                <ListingCard key={item.id} listing={item} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto space-y-3">
              <Eye className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-800">No recent views</h3>
              <p className="text-xs text-slate-500">
                Start browsing textbooks and notes in the marketplace.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab Content 3: AI Recommendations */}
      {activeTab === 'ai-recommendations' && (
        <div className="space-y-6">
          {/* AI Banner */}
          <div className="bg-purple-900 text-white p-6 rounded-3xl border border-purple-800 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span className="text-xs font-bold uppercase tracking-wider text-purple-200">
                  Targeted for {BUYER_DEMO_USER.targetExam}
                </span>
              </div>
              <h3 className="text-lg font-bold">
                Smart Suggestions for Rahul Sharma
              </h3>
              <p className="text-xs text-purple-200">
                Based on your preparation timeline for SSC CGL 2027 and Kolkata campus pickup proximity.
              </p>
            </div>

            <button
              onClick={() => navigateTo('ai-assistant')}
              className="bg-white text-purple-950 font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-purple-50 transition cursor-pointer shrink-0"
            >
              Ask AI Mentor For Custom Roadmap
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiRecommendedItems.map((item) => (
              <ListingCard key={item.id} listing={item} />
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 4: Inquiries & Messages */}
      {activeTab === 'messages' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-xl text-slate-900">
              Ongoing Seller Conversations
            </h2>
            <button
              onClick={() => navigateTo('messages')}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              Open Full Chat Screen &rarr;
            </button>
          </div>

          <div className="space-y-3">
            {chatThreads.map((thread) => (
              <div
                key={thread.id}
                onClick={() => navigateTo('messages')}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-md transition cursor-pointer flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <img
                    src={thread.listingImage}
                    alt={thread.listingTitle}
                    className="w-14 h-14 rounded-xl object-cover shrink-0 border"
                  />
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 truncate">
                        {thread.otherUserName}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        • {thread.lastMessageTime}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-blue-600 truncate">
                      {thread.listingTitle} (₹{thread.listingPrice})
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {thread.lastMessage}
                    </p>
                  </div>
                </div>

                <button className="text-xs font-bold text-blue-600 bg-blue-50 px-3.5 py-2 rounded-xl shrink-0">
                  Reply
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
