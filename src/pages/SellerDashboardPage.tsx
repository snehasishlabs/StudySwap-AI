import React, { useState } from 'react';
import { 
  Package, 
  CheckCircle2, 
  IndianRupee, 
  TrendingUp, 
  PlusCircle, 
  Star, 
  Eye, 
  MessageSquare, 
  ShieldCheck, 
  MapPin, 
  Edit, 
  Trash2, 
  ArrowUpRight,
  Sparkles,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SELLER_DEMO_USER } from '../data/mockData';

export const SellerDashboardPage: React.FC = () => {
  const { listings, markAsSold, navigateTo, chatThreads } = useApp();

  const [activeTab, setActiveTab] = useState<'active' | 'sold' | 'inquiries'>('active');

  // Priya's listings (or listings where sellerId === 'user_priya')
  const sellerListings = listings.filter(
    (l) => l.sellerId === 'user_priya' || l.sellerName === 'Priya Verma'
  );

  const activeItems = sellerListings.filter((l) => l.status === 'active');
  const soldItems = sellerListings.filter((l) => l.status === 'sold');

  const totalViews = sellerListings.reduce((acc, l) => acc + l.views, 0);
  const totalInquiries = sellerListings.reduce((acc, l) => acc + l.inquiryCount, 0);
  const totalActiveValue = activeItems.reduce((acc, l) => acc + l.price, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Seller Overview Banner */}
      <div className="bg-gradient-to-r from-purple-800 via-indigo-800 to-blue-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4 sm:gap-5">
          <img
            src={SELLER_DEMO_USER.avatar}
            alt={SELLER_DEMO_USER.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-white/20 shadow-md"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black">{SELLER_DEMO_USER.name}</h1>
              <span className="bg-white/20 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-white/30">
                Seller Demo
              </span>
              <span className="bg-amber-400 text-amber-950 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                4.8 Rating (48 Reviews)
              </span>
            </div>
            <p className="text-xs text-purple-100 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" />
              {SELLER_DEMO_USER.location} • {SELLER_DEMO_USER.collegeOrCity}
            </p>
            <p className="text-[11px] text-emerald-300 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Student Seller • Trust Score 98%
            </p>
          </div>
        </div>

        {/* Quick Add Listing CTA */}
        <button
          onClick={() => navigateTo('add-listing')}
          className="bg-white hover:bg-purple-50 text-purple-900 font-extrabold px-5 py-3 rounded-2xl shadow-lg transition flex items-center gap-2 text-sm cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-purple-700" />
          <span>Post New Book / Note</span>
        </button>
      </div>

      {/* 4 Performance Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Revenue
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">
            ₹{SELLER_DEMO_USER.totalEarnings?.toLocaleString() || '38,450'}
          </p>
          <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            142 items successfully sold
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Active Inventory
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">
            {activeItems.length}
          </p>
          <p className="text-[11px] text-slate-500 font-medium">
            ₹{totalActiveValue} total value in listings
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Listing Views
            </span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">
            {totalViews}
          </p>
          <p className="text-[11px] text-indigo-600 font-semibold">
            High student discovery rate
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Buyer Inquiries
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">
            {totalInquiries}
          </p>
          <p className="text-[11px] text-purple-600 font-semibold">
            {chatThreads.length} active chats ongoing
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('active')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
            activeTab === 'active'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Active Listings ({activeItems.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('sold')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
            activeTab === 'sold'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Sold Items ({soldItems.length + 142})</span>
        </button>

        <button
          onClick={() => setActiveTab('inquiries')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
            activeTab === 'inquiries'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Inquiries ({totalInquiries})</span>
        </button>
      </div>

      {/* Tab Content: Active Listings */}
      {activeTab === 'active' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-xl text-slate-900">
              Manage Active Inventory
            </h2>
            <button
              onClick={() => navigateTo('add-listing')}
              className="text-xs font-bold text-purple-600 hover:underline flex items-center gap-1"
            >
              <PlusCircle className="w-4 h-4" />
              Add Resource
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {activeItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-purple-300 transition"
              >
                <div className="flex items-start sm:items-center gap-4 min-w-0">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shrink-0 border"
                  />
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="bg-purple-50 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-purple-200">
                        {item.exam}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {item.category} • {item.subject}
                      </span>
                      {item.aiScore && (
                        <span className="bg-purple-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-300" />
                          AI Score {item.aiScore}
                        </span>
                      )}
                    </div>

                    <h3 
                      onClick={() => navigateTo('listing-details', item.id)}
                      className="font-bold text-sm sm:text-base text-slate-900 hover:text-purple-600 transition cursor-pointer truncate"
                    >
                      {item.title}
                    </h3>

                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="font-extrabold text-slate-900 text-sm">
                        ₹{item.price}{' '}
                        <span className="line-through text-slate-400 text-xs font-normal">
                          ₹{item.originalPrice}
                        </span>
                      </span>
                      <span>{item.views} Views</span>
                      <span>{item.inquiryCount} Inquiries</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => navigateTo('listing-details', item.id)}
                    className="p-2 text-slate-500 hover:text-purple-600 hover:bg-slate-100 rounded-xl transition"
                    title="View Listing"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => markAsSold(item.id)}
                    className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs px-3.5 py-2 rounded-xl border border-emerald-200 transition cursor-pointer flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Mark as Sold</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Sold Items */}
      {activeTab === 'sold' && (
        <div className="space-y-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-900 flex items-center justify-between">
            <span className="font-bold">
              🎉 142 Items Successfully Re-homed to Students!
            </span>
            <span>Total Circular Student Savings: ₹92,400+</span>
          </div>

          <div className="space-y-3">
            {soldItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-4 opacity-75 hover:opacity-100 transition"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-xs text-slate-800">{item.title}</h4>
                    <span className="text-[11px] text-slate-500">Sold for ₹{item.price}</span>
                  </div>
                </div>

                <button
                  onClick={() => markAsSold(item.id)}
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  Reactivate Listing
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Inquiries */}
      {activeTab === 'inquiries' && (
        <div className="space-y-4">
          <h2 className="font-extrabold text-xl text-slate-900">
            Recent Student Inquiries & Negotiations
          </h2>
          <div className="space-y-3">
            {chatThreads.map((thread) => (
              <div
                key={thread.id}
                onClick={() => navigateTo('messages')}
                className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-purple-300 shadow-xs transition cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={thread.otherUserAvatar}
                    alt={thread.otherUserName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900">{thread.otherUserName}</span>
                      <span className="text-[10px] text-slate-400">{thread.lastMessageTime}</span>
                    </div>
                    <p className="text-xs text-purple-700 font-medium">Re: {thread.listingTitle}</p>
                    <p className="text-xs text-slate-500 italic">"{thread.lastMessage}"</p>
                  </div>
                </div>

                <button className="bg-purple-50 text-purple-700 font-bold text-xs px-3.5 py-1.5 rounded-xl">
                  Open Chat
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
