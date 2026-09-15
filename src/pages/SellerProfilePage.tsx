import React, { useState } from 'react';
import { 
  Star, 
  ShieldCheck, 
  MapPin, 
  Award, 
  Truck,
  Zap,
  Sparkles,
  MessageSquare,
  CheckCircle2,
  Calendar,
  IndianRupee,
  ShoppingBag,
  ArrowUpRight,
  Filter,
  Check,
  Tag
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SELLER_DEMO_USER, MOCK_REVIEWS } from '../data/mockData';
import { ListingCard } from '../components/marketplace/ListingCard';
import { Badge } from '../types';

export const SellerProfilePage: React.FC = () => {
  const { listings, navigateTo, startInquiryChat, currentUser, switchToSellerDemo } = useApp();
  const [activeTab, setActiveTab] = useState<'active' | 'past' | 'reviews' | 'badges'>('active');

  // Filter listings by Priya
  const allPriyaListings = listings.filter(
    (l) => l.sellerId === 'user_priya' || l.sellerName === 'Priya Verma'
  );

  const activeListings = allPriyaListings.filter((l) => l.status === 'available' || l.status === 'active');
  const pastListings = allPriyaListings.filter((l) => l.status === 'sold');

  // Reviews for Priya
  const sellerReviews = MOCK_REVIEWS.filter(
    (r) => r.sellerId === 'user_priya' || r.role === 'seller_review'
  );

  // Helper to render badge icons
  const renderBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
      case 'Award':
        return <Award className="w-5 h-5 text-amber-600" />;
      case 'Truck':
        return <Truck className="w-5 h-5 text-blue-600" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-purple-600" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-indigo-600" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-blue-600" />;
    }
  };

  const badges = SELLER_DEMO_USER.badges || [];

  return (
    <div id="seller-profile-root" className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-5">
          <div className="relative">
            <img
              src={SELLER_DEMO_USER.avatar}
              alt={SELLER_DEMO_USER.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover ring-4 ring-purple-100 shadow-md"
            />
            <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-white" title="Online now">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{SELLER_DEMO_USER.name}</h1>
              <span className="bg-purple-100 text-purple-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                Student Seller
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Student
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{SELLER_DEMO_USER.location}</span>
              <span className="text-slate-300">•</span>
              <span className="text-blue-700 font-medium">{SELLER_DEMO_USER.collegeOrCity}</span>
            </p>

            <div className="flex items-center gap-3 pt-1 text-xs flex-wrap">
              <div className="flex items-center gap-1 text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200/60">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{SELLER_DEMO_USER.rating} Rating</span>
                <span className="text-slate-400 font-normal">({SELLER_DEMO_USER.reviewCount} Reviews)</span>
              </div>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="text-slate-700 font-semibold bg-slate-100 px-2 py-0.5 rounded-lg">
                {SELLER_DEMO_USER.booksSold || 142} Materials Sold
              </span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200/60">
                {SELLER_DEMO_USER.trustScore}% Trust Score
              </span>
            </div>
          </div>
        </div>

        {/* Profile Action & Member Info */}
        <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col items-stretch gap-2.5">
          <button
            id="btn-message-seller-profile"
            onClick={() => startInquiryChat('listing-1', `Hi ${SELLER_DEMO_USER.name}, I am interested in your listed study materials.`)}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center justify-center space-x-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Send Direct Inquiry</span>
          </button>

          {currentUser.role !== 'seller' && (
            <button
              id="btn-simulate-as-seller"
              onClick={switchToSellerDemo}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition text-center"
            >
              Switch Role to Priya (Demo)
            </button>
          )}

          <div className="text-[11px] text-slate-400 text-center sm:text-right md:text-center mt-1">
            Student Member since {SELLER_DEMO_USER.memberSince}
          </div>
        </div>
      </div>

      {/* Bio & Academic Credential Bar */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          About Seller & Academic Background
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          {SELLER_DEMO_USER.bio}
        </p>
        <div className="flex items-center gap-2 pt-1 text-xs text-indigo-700 font-semibold">
          <Award className="w-4 h-4 text-indigo-600" />
          <span>Qualified Exam: {SELLER_DEMO_USER.targetExam}</span>
        </div>
      </div>

      {/* Profile Section Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-1 overflow-x-auto">
        <button
          id="tab-reputation"
          onClick={() => setActiveTab('badges')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer flex items-center space-x-2 ${
            activeTab === 'badges'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Reputation & Badges</span>
        </button>

        <button
          id="tab-active-listings"
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer flex items-center space-x-2 ${
            activeTab === 'active'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Current Listings ({activeListings.length})</span>
        </button>

        <button
          id="tab-past-listings"
          onClick={() => setActiveTab('past')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer flex items-center space-x-2 ${
            activeTab === 'past'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>Past & Sold Listings ({pastListings.length})</span>
        </button>

        <button
          id="tab-seller-reviews"
          onClick={() => setActiveTab('reviews')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer flex items-center space-x-2 ${
            activeTab === 'reviews'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Star className="w-4 h-4" />
          <span>Reviews History ({sellerReviews.length})</span>
        </button>
      </div>

      {/* Tab 1: Current / Active Listings */}
      {activeTab === 'active' && (
        <div id="seller-active-listings-content" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-lg text-slate-900">
              Active Study Materials for Sale ({activeListings.length})
            </h3>
            <span className="text-xs text-slate-500">Available for campus pickup & verified handoff</span>
          </div>

          {activeListings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeListings.map((item) => (
                <ListingCard key={item.id} listing={item} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
              <p className="text-xs text-slate-500">No active listings at this moment.</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Past / Sold Listings */}
      {activeTab === 'past' && (
        <div id="seller-past-listings-content" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">
                Past & Sold Listings ({pastListings.length})
              </h3>
              <p className="text-xs text-slate-500">Completed study resource exchanges and handoffs</p>
            </div>
            <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
              100% Exchange Success Rate
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pastListings.map((item) => (
              <div
                key={item.id}
                id={`past-listing-${item.id}`}
                className="bg-white rounded-2xl p-4 border border-slate-200 flex gap-4 items-center shadow-xs"
              >
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale-50"
                  />
                  <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
                    <span className="text-[10px] font-black text-white uppercase tracking-wider bg-rose-600 px-1.5 py-0.5 rounded">
                      SOLD
                    </span>
                  </div>
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <span className="font-bold text-slate-700">{item.exam}</span>
                    <span>•</span>
                    <span>{item.category}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 truncate">
                    {item.title}
                  </h4>
                  <div className="flex items-baseline gap-2 text-xs">
                    <span className="font-extrabold text-slate-900">Sold for ₹{item.price}</span>
                    <span className="text-slate-400 line-through">₹{item.originalPrice}</span>
                  </div>
                  <p className="text-[11px] text-emerald-600 font-medium">
                    ✓ Handed off at {item.pickupLocation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Earned Badges & Reputation Breakdown */}
      {activeTab === 'badges' && (
        <div id="seller-badges-content" className="space-y-6">
          {/* 4 Pillars of Seller Reputation */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600">
                  Student Trust Engine
                </span>
                <h3 className="font-black text-xl text-slate-900">
                  Seller Reputation Score Breakdown
                </h3>
              </div>
              <div className="bg-emerald-50 text-emerald-800 text-xs font-black px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5 self-start sm:self-auto">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Overall Trust Index: 98 / 100</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {/* Pillar 1: Ratings */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">1. Ratings</span>
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                </div>
                <div className="text-2xl font-black text-slate-900">4.8 / 5.0</div>
                <p className="text-[11px] text-slate-500">48 verified peer reviews (96% 5-star)</p>
              </div>

              {/* Pillar 2: Successful Sales */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">2. Successful Sales</span>
                  <ShoppingBag className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-2xl font-black text-slate-900">28 Books & Notes</div>
                <p className="text-[11px] text-slate-500">100% completed campus handoffs</p>
              </div>

              {/* Pillar 3: Response Time */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">3. Response Time</span>
                  <Zap className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-2xl font-black text-slate-900">&lt; 2 Hours</div>
                <p className="text-[11px] text-slate-500">Quick chat replies across sessions</p>
              </div>

              {/* Pillar 4: Verification Status */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">4. Verification</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-sm font-black text-emerald-700">Verified Campus ID</div>
                <p className="text-[11px] text-slate-500">Presidency University Enrolment</p>
              </div>
            </div>
          </div>

          {/* Seller Reputation Tier Progression */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <h4 className="font-bold text-sm text-slate-900">
              Seller Reputation Tier Badges
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl border border-emerald-200 bg-emerald-50/50 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-black text-emerald-800">New Seller</span>
                  <span className="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-1.5 py-0.5 rounded">Unlocked</span>
                </div>
                <p className="text-[11px] text-slate-600">Joined & identity verified</p>
              </div>

              <div className="p-3.5 rounded-2xl border border-blue-200 bg-blue-50/50 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-black text-blue-800">Trusted Seller</span>
                  <span className="text-[10px] bg-blue-200 text-blue-900 font-bold px-1.5 py-0.5 rounded">Unlocked</span>
                </div>
                <p className="text-[11px] text-slate-600">5+ sales & &lt;2hr response</p>
              </div>

              <div className="p-3.5 rounded-2xl border border-purple-200 bg-purple-50/50 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-black text-purple-800">Top Seller</span>
                  <span className="text-[10px] bg-purple-200 text-purple-900 font-bold px-1.5 py-0.5 rounded">Unlocked</span>
                </div>
                <p className="text-[11px] text-slate-600">20+ sales & 4.8+ rating</p>
              </div>

              <div className="p-3.5 rounded-2xl border border-indigo-200 bg-indigo-50/50 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-black text-indigo-800">Verified Seller</span>
                  <span className="text-[10px] bg-indigo-200 text-indigo-900 font-bold px-1.5 py-0.5 rounded">Active</span>
                </div>
                <p className="text-[11px] text-slate-600">Official student ID checks passed</p>
              </div>
            </div>
          </div>

          {/* Specific Earned Badges */}
          <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 p-6 rounded-3xl border border-purple-100 space-y-1.5">
            <h3 className="font-black text-lg text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-600" />
              <span>Earned Seller & Community Badges</span>
            </h3>
            <p className="text-xs text-slate-600">
              Badges earned through verified campus identity, punctuality, high review marks, and note quality analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {badges.map((badge: Badge) => (
              <div
                key={badge.id}
                id={`badge-card-${badge.id}`}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3 hover:border-purple-300 transition"
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center">
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
                  <span className="text-purple-700 font-semibold uppercase tracking-wider text-[10px]">
                    {badge.category} Perk
                  </span>
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Reviews History */}
      {activeTab === 'reviews' && (
        <div id="seller-reviews-content" className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-black text-xl text-slate-900">
                History of Reviews Received
              </h3>
              <p className="text-xs text-slate-500">
                Feedback from fellow campus students who purchased books and notes from Priya
              </p>
            </div>
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-2xl">
              <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
              <span className="font-black text-amber-800 text-sm">4.8 / 5.0</span>
              <span className="text-xs text-amber-700 font-medium">({sellerReviews.length} Verified Reviews)</span>
            </div>
          </div>

          <div className="space-y-4 divide-y divide-slate-100">
            {sellerReviews.map((rev) => (
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
                      <span className="text-[10px] text-blue-600 font-medium">{rev.reviewerExam}</span>
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
                  <span>Item: <strong className="text-slate-600">{rev.listingTitle}</strong></span>
                  <span>{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
