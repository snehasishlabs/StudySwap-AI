import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  GraduationCap, 
  ShieldCheck, 
  Star, 
  Sparkles,
  Award,
  ArrowRight,
  Heart,
  CheckCircle2,
  Users,
  Check,
  Clock,
  BookOpen
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BUYER_DEMO_USER, MOCK_REVIEWS } from '../data/mockData';
import { Badge } from '../types';
import { ListingCard } from '../components/marketplace/ListingCard';

export const BuyerProfilePage: React.FC = () => {
  const { navigateTo, wishlist, recentlyViewed, listings, currentUser, switchToBuyerDemo } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'badges' | 'reviews' | 'wishlist'>('overview');

  // Reviews received by Rahul Sharma as a buyer
  const buyerReviews = MOCK_REVIEWS.filter(
    (r) => r.buyerId === 'user_rahul' || r.role === 'buyer_review'
  );

  // Wishlisted listings
  const wishlistedListings = listings.filter((l) => wishlist.includes(l.id));

  // Helper to render badge icons
  const renderBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
      case 'Star':
        return <Star className="w-5 h-5 text-amber-500" />;
      case 'Users':
        return <Users className="w-5 h-5 text-blue-600" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-5 h-5 text-teal-600" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-purple-600" />;
      default:
        return <Award className="w-5 h-5 text-indigo-600" />;
    }
  };

  const badges = BUYER_DEMO_USER.badges || [];

  return (
    <div id="buyer-profile-root" className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-5">
          <div className="relative">
            <img
              src={BUYER_DEMO_USER.avatar}
              alt={BUYER_DEMO_USER.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-blue-50 shadow-md"
            />
            <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center text-white" title="Student Aspirant">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{BUYER_DEMO_USER.name}</h1>
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                Buyer Demo
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Student
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{BUYER_DEMO_USER.location}</span>
              <span className="text-slate-300">•</span>
              <span className="text-blue-600 font-medium">{BUYER_DEMO_USER.collegeOrCity}</span>
            </p>

            <div className="flex items-center gap-3 pt-1 text-xs flex-wrap">
              <span className="flex items-center gap-1 text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-200/60">
                <GraduationCap className="w-3.5 h-3.5" />
                Target: {BUYER_DEMO_USER.targetExam}
              </span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="flex items-center gap-1 text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200/60">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                4.9 Buyer Rating ({BUYER_DEMO_USER.reviewCount} Reviews)
              </span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200/60">
                96% Trust Score
              </span>
            </div>
          </div>
        </div>

        {/* Member Since Box */}
        <div className="w-full sm:w-auto bg-slate-50 p-4 rounded-2xl border border-slate-100 text-left sm:text-right space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Member Since
          </span>
          <span className="font-bold text-slate-800 text-sm block">{BUYER_DEMO_USER.joinedDate}</span>
          <span className="text-xs text-emerald-600 font-semibold block">
            100% On-Time Campus Meetups
          </span>
          {currentUser.role !== 'buyer' && (
            <button
              id="btn-switch-to-buyer"
              onClick={switchToBuyerDemo}
              className="mt-2 text-xs font-bold text-blue-600 hover:underline block"
            >
              Switch Role to Rahul &rarr;
            </button>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-1 overflow-x-auto">
        <button
          id="tab-buyer-overview"
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer flex items-center space-x-2 ${
            activeTab === 'overview'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Academic Overview</span>
        </button>

        <button
          id="tab-buyer-badges"
          onClick={() => setActiveTab('badges')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer flex items-center space-x-2 ${
            activeTab === 'badges'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Earned Badges ({badges.length})</span>
        </button>

        <button
          id="tab-buyer-reviews"
          onClick={() => setActiveTab('reviews')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer flex items-center space-x-2 ${
            activeTab === 'reviews'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Star className="w-4 h-4" />
          <span>Seller Reviews ({buyerReviews.length})</span>
        </button>

        <button
          id="tab-buyer-wishlist"
          onClick={() => setActiveTab('wishlist')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer flex items-center space-x-2 ${
            activeTab === 'wishlist'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Saved Wishlist ({wishlistedListings.length})</span>
        </button>
      </div>

      {/* Tab 1: Academic Overview */}
      {activeTab === 'overview' && (
        <div id="buyer-overview-content" className="space-y-6">
          {/* Target Exam Focus Box */}
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-6 border border-blue-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Target Exam Academic Journey</span>
              </h3>
              <span className="text-xs bg-blue-600 text-white font-bold px-3 py-1 rounded-full">
                SSC CGL 2027 & WBPSC
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {BUYER_DEMO_USER.bio}
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              <button
                id="btn-nav-recommender-profile"
                onClick={() => navigateTo('ai-recommender')}
                className="text-xs font-bold text-blue-700 bg-white border border-blue-200 px-3 py-2 rounded-xl hover:bg-blue-50 transition cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <span>Get SSC 2027 Book Recommendations</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                id="btn-nav-assistant-profile"
                onClick={() => navigateTo('ai-assistant')}
                className="text-xs font-bold text-purple-700 bg-white border border-purple-200 px-3 py-2 rounded-xl hover:bg-purple-50 transition cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <span>Consult SwapGuru AI Mentor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Activity Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center space-y-1">
              <span className="text-3xl font-black text-slate-900">{wishlist.length}</span>
              <span className="text-xs text-slate-500 font-medium block">Saved in Wishlist</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center space-y-1">
              <span className="text-3xl font-black text-emerald-600">₹3,450</span>
              <span className="text-xs text-slate-500 font-medium block">Estimated Money Saved</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center space-y-1">
              <span className="text-3xl font-black text-indigo-600">{recentlyViewed.length}</span>
              <span className="text-xs text-slate-500 font-medium block">Resources Inspected</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Earned Badges & Reputation */}
      {activeTab === 'badges' && (
        <div id="buyer-badges-content" className="space-y-6">
          {/* 3 Pillars of Buyer Reputation */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-600">
                  Student Trust & Community System
                </span>
                <h3 className="font-black text-xl text-slate-900">
                  Buyer Reputation Score Breakdown
                </h3>
              </div>
              <div className="bg-emerald-50 text-emerald-800 text-xs font-black px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5 self-start sm:self-auto">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Peer Trust Index: 99 / 100</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {/* Pillar 1: Rating */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">1. Buyer Rating</span>
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                </div>
                <div className="text-2xl font-black text-slate-900">4.9 / 5.0</div>
                <p className="text-[11px] text-slate-500">Punctual campus meetups & respectful interactions</p>
              </div>

              {/* Pillar 2: Total Purchases */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">2. Total Purchases</span>
                  <BookOpen className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-2xl font-black text-slate-900">14 Orders</div>
                <p className="text-[11px] text-slate-500">Books, Handwritten notes & study guides</p>
              </div>

              {/* Pillar 3: Community Contributions */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">3. Contributions</span>
                  <Users className="w-4 h-4 text-teal-600" />
                </div>
                <div className="text-2xl font-black text-slate-900">19 Actions</div>
                <p className="text-[11px] text-slate-500">Verified seller reviews & group study shares</p>
              </div>
            </div>
          </div>

          {/* Buyer Reputation Tier Badges */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <h4 className="font-bold text-sm text-slate-900">
              Buyer Reputation Tier Badges
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl border border-emerald-200 bg-emerald-50/50 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-black text-emerald-800">Active Learner</span>
                  <span className="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-1.5 py-0.5 rounded">Unlocked</span>
                </div>
                <p className="text-[11px] text-slate-600">Actively acquiring study resources</p>
              </div>

              <div className="p-3.5 rounded-2xl border border-blue-200 bg-blue-50/50 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-black text-blue-800">Top Buyer</span>
                  <span className="text-[10px] bg-blue-200 text-blue-900 font-bold px-1.5 py-0.5 rounded">Unlocked</span>
                </div>
                <p className="text-[11px] text-slate-600">10+ completed campus purchases</p>
              </div>

              <div className="p-3.5 rounded-2xl border border-teal-200 bg-teal-50/50 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-black text-teal-800">Community Contributor</span>
                  <span className="text-[10px] bg-teal-200 text-teal-900 font-bold px-1.5 py-0.5 rounded">Unlocked</span>
                </div>
                <p className="text-[11px] text-slate-600">Leaves helpful feedback & reviews</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 via-teal-50 to-indigo-50 p-6 rounded-3xl border border-blue-100 space-y-1.5">
            <h3 className="font-black text-lg text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" />
              <span>Earned Student Badges ({badges.length})</span>
            </h3>
            <p className="text-xs text-slate-600">
              Honors awarded for verified university credentials, prompt campus meetups, and polite community exchanges.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {badges.map((badge: Badge) => (
              <div
                key={badge.id}
                id={`badge-card-${badge.id}`}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3 hover:border-blue-300 transition"
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                    {renderBadgeIcon(badge.icon)}
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                    Earned {badge.dateEarned}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-slate-900">{badge.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {badge.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-blue-700 font-semibold uppercase tracking-wider text-[10px]">
                    {badge.category} Badge
                  </span>
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Reviews Received by Rahul */}
      {activeTab === 'reviews' && (
        <div id="buyer-reviews-content" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-black text-xl text-slate-900">
                Reviews Received from Campus Sellers
              </h3>
              <p className="text-xs text-slate-500">
                Endorsements from sellers who exchanged materials with Rahul
              </p>
            </div>
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-2xl">
              <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
              <span className="font-black text-amber-800 text-sm">4.9 / 5.0</span>
              <span className="text-xs text-amber-700 font-medium">({buyerReviews.length} Seller Reviews)</span>
            </div>
          </div>

          <div className="space-y-4 divide-y divide-slate-100">
            {buyerReviews.map((rev) => (
              <div key={rev.id} className="pt-4 first:pt-0 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.reviewerAvatar}
                      alt={rev.reviewerName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <span className="font-bold text-xs text-slate-900 block">{rev.reviewerName}</span>
                      <span className="text-[10px] text-purple-600 font-medium">{rev.reviewerExam}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(Math.floor(rev.rating))].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                  &ldquo;{rev.comment}&rdquo;
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Resource: <strong className="text-slate-600">{rev.listingTitle}</strong></span>
                  <span>{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Wishlist & Saved */}
      {activeTab === 'wishlist' && (
        <div id="buyer-wishlist-content" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-lg text-slate-900">
              Saved Study Resources ({wishlistedListings.length})
            </h3>
            <button
              onClick={() => navigateTo('marketplace')}
              className="text-xs text-blue-600 font-bold hover:underline"
            >
              Browse more in Marketplace &rarr;
            </button>
          </div>

          {wishlistedListings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistedListings.map((item) => (
                <ListingCard key={item.id} listing={item} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 space-y-3">
              <Heart className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-700">No items saved yet</p>
              <p className="text-xs text-slate-400">Click the heart icon on any listing to save it here for later.</p>
              <button
                onClick={() => navigateTo('marketplace')}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
              >
                Go to Marketplace
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
