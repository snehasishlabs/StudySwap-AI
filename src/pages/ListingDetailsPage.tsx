import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Sparkles, 
  Tag, 
  CheckCircle2, 
  IndianRupee, 
  MessageSquare, 
  Navigation, 
  BookOpen, 
  UserCheck, 
  AlertCircle,
  Truck,
  Building2,
  Calendar,
  Scale
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { ListingCard } from '../components/marketplace/ListingCard';
import { OpenStreetMapModal } from '../components/common/OpenStreetMapModal';
import { NegotiateModal } from '../components/common/NegotiateModal';

export const ListingDetailsPage: React.FC = () => {
  const { 
    selectedListingId, 
    listings, 
    navigateTo, 
    wishlist, 
    toggleWishlist, 
    startInquiryChat, 
    showToast,
    currentUser,
    comparisonList,
    toggleComparison,
    setIsCompareModalOpen
  } = useApp();

  const rawListing = listings.find((l) => l.id === selectedListingId) || listings[0];
  const listing = React.useMemo(() => {
    if (!rawListing) return rawListing;
    if (!rawListing.aiAnalysis && typeof rawListing.aiScore === 'object' && rawListing.aiScore) {
      const s = rawListing.aiScore as any;
      return {
        ...rawListing,
        aiAnalysis: {
          overallScore: s.overall || 90,
          metrics: {
            readability: s.legibility || 94,
            completeness: s.completeness || 92,
            organization: s.structure || 93,
            topicCoverage: s.diagramAccuracy || 91,
            visualClarity: s.legibility || 94,
          },
          summary: rawListing.description,
          strengths: ['Clear handwriting and structured notes', 'High-yield exam topics highlighted with mindmaps'],
          recommendations: ['Review formula summary sheets before exam day'],
          estimatedStudyHoursSaved: 35,
          badgeEarned: `Verified AI Notes (${s.overall || 90}+)`,
        }
      };
    }
    return rawListing;
  }, [rawListing]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [osmModalOpen, setOsmModalOpen] = useState(false);
  const [negotiateModalOpen, setNegotiateModalOpen] = useState(false);
  const [reservedSuccess, setReservedSuccess] = useState(false);

  if (!listing) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <p className="text-slate-600">Listing not found.</p>
        <button
          onClick={() => navigateTo('marketplace')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold"
        >
          Return to Marketplace
        </button>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(listing.id);
  const discountPercent = Math.round(
    ((listing.originalPrice - listing.price) / listing.originalPrice) * 100
  );

  const handleInstantReserve = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
    });
    setReservedSuccess(true);
    showToast(`Successfully placed reservation for "${listing.title}"! Seller has been notified.`, 'success');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Listing link copied to clipboard!', 'info');
  };

  const similarListings = listings
    .filter((l) => l.id !== listing.id && (l.exam === listing.exam || l.category === listing.category))
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Back button & Breadcrumbs */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('marketplace')}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-600 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition cursor-pointer"
            title="Share Resource"
          >
            <Share2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => toggleWishlist(listing.id)}
            className={`p-2 rounded-xl border transition cursor-pointer ${
              isWishlisted
                ? 'bg-rose-50 text-rose-600 border-rose-200'
                : 'bg-white text-slate-600 border-slate-200 hover:text-rose-600'
            }`}
            title="Save to Wishlist"
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Top Showcase: Gallery + Purchase Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Gallery (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-4/3 rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-md">
            <img
              src={listing.images[selectedImageIndex] || listing.images[0]}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
            {/* Condition pill */}
            <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-md">
              Condition: {listing.condition}
            </div>

            {/* AI badge */}
            {listing.aiScore && (
              <div className="absolute top-4 right-4 bg-purple-700/90 backdrop-blur-md text-white font-extrabold text-xs px-3 py-1.5 rounded-xl shadow-md border border-purple-300/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>AI Quality Score: {typeof listing.aiScore === 'object' ? (listing.aiScore as any).overall : listing.aiScore}/100</span>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {listing.images.length > 1 && (
            <div className="flex gap-3">
              {listing.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition cursor-pointer ${
                    selectedImageIndex === idx
                      ? 'border-blue-600 ring-2 ring-blue-100'
                      : 'border-slate-200 hover:border-slate-400 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Description Block */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="font-extrabold text-slate-900 text-lg">Resource Description</h3>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {listing.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block font-medium">Edition / Year</span>
                <span className="font-bold text-slate-800">{listing.editionOrYear || '2023-2024'}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block font-medium">Delivery Mode</span>
                <span className="font-bold text-slate-800">{listing.deliveryOption}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block font-medium">Verified Student</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  ID Verified
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Purchase & Seller Info (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Price & Purchase Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-lg space-y-6">
            {/* Category & Exam Tag */}
            <div className="flex items-center gap-2">
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                {listing.exam}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {listing.category} • {listing.subject}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
              {listing.title}
            </h1>

            {/* Price section */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  StudySwap Price
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-3xl font-black text-slate-900">
                    ₹{listing.price}
                  </span>
                  <span className="text-sm text-slate-400 line-through">
                    ₹{listing.originalPrice}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block bg-emerald-100 text-emerald-800 font-extrabold text-xs px-2.5 py-1 rounded-full">
                  Save {discountPercent}% (₹{listing.originalPrice - listing.price})
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">vs New Retail MRP</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={() => setNegotiateModalOpen(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-md shadow-blue-500/20 transition cursor-pointer flex items-center justify-center gap-2"
              >
                <IndianRupee className="w-4 h-4" />
                <span>Make an Offer / Negotiate Price</span>
              </button>

              <button
                onClick={() => startInquiryChat(listing.id, `Hi ${listing.sellerName}, is "${listing.title}" still available for pickup?`)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 px-6 rounded-2xl transition cursor-pointer flex items-center justify-center gap-2 text-sm"
              >
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <span>Message Seller Directly</span>
              </button>

              {!reservedSuccess ? (
                <button
                  onClick={handleInstantReserve}
                  className="w-full border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold py-2.5 px-4 rounded-2xl transition cursor-pointer text-xs flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Hold & Reserve Item for Free</span>
                </button>
              ) : (
                <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-2xl text-xs text-emerald-900 font-semibold text-center">
                  🎉 Item Reserved! Proceed to chat to coordinate handoff.
                </div>
              )}

              {/* Compare Button */}
              <div className="flex gap-2 pt-1">
                <button
                  id={`btn-toggle-compare-detail-${listing.id}`}
                  onClick={() => toggleComparison(listing.id)}
                  className={`flex-1 py-2.5 px-3 rounded-xl font-semibold text-xs transition flex items-center justify-center gap-1.5 border ${
                    comparisonList.includes(listing.id)
                      ? 'bg-blue-50 text-blue-700 border-blue-300'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Scale className="w-3.5 h-3.5 text-blue-600" />
                  <span>{comparisonList.includes(listing.id) ? 'In Comparison List (Remove)' : 'Add to Compare'}</span>
                </button>

                {comparisonList.length > 0 && (
                  <button
                    id="btn-view-comparison-modal"
                    onClick={() => setIsCompareModalOpen(true)}
                    className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold text-xs transition flex items-center gap-1 shadow-sm"
                  >
                    <span>View Table ({comparisonList.length}/3)</span>
                  </button>
                )}
              </div>
            </div>

            {/* Campus Meetup Point & OpenStreetMap Trigger */}
            <div className="pt-4 border-t border-slate-100 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  Campus Meetup Location
                </span>
                <button
                  onClick={() => setOsmModalOpen(true)}
                  className="font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Navigation className="w-3 h-3" />
                  OpenStreetMap
                </button>
              </div>

              <div 
                onClick={() => setOsmModalOpen(true)}
                className="p-3.5 bg-blue-50/70 hover:bg-blue-50 border border-blue-200/80 rounded-2xl cursor-pointer transition flex items-center justify-between group"
              >
                <div className="space-y-0.5">
                  <p className="font-bold text-xs text-blue-950 group-hover:text-blue-700 transition">
                    {listing.pickupLocation}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Safe public campus zone • Coordinates: {listing.coordinates.lat}, {listing.coordinates.lng}
                  </p>
                </div>
                <Navigation className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition shrink-0" />
              </div>
            </div>
          </div>

          {/* Seller Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Verified Seller
              </span>
              <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                Trust Score {listing.sellerTrustScore}%
              </span>
            </div>

            <div className="flex items-center gap-3.5">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80"
                alt={listing.sellerName}
                className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-100"
              />
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-sm text-slate-900">{listing.sellerName}</h4>
                  <ShieldCheck className="w-4 h-4 text-blue-600" title="Verified Student" />
                </div>
                <p className="text-xs text-slate-500">{listing.sellerLocation}</p>
                <div className="flex items-center gap-2 mt-1 text-xs">
                  <span className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {listing.sellerRating} Rating
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500 font-medium">142 items sold</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigateTo('seller-profile')}
              className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl transition cursor-pointer border border-slate-200"
            >
              View Full Seller Profile & Reviews &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* AI Note Analyzer Quality Breakdown (If Handwritten Note) */}
      {listing.aiAnalysis && (
        <div className="bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-800/60 pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 text-xs font-bold px-3 py-1 rounded-full border border-purple-500/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>AI Note Analyzer Deep Evaluation</span>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white">
                Quality & Readability Verification
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Automated multi-factor evaluation using Google Gemini 3.8 Flash.
              </p>
            </div>

            <div className="bg-purple-800/50 border border-purple-400/30 px-6 py-3 rounded-2xl text-center shrink-0">
              <span className="text-[10px] uppercase font-bold text-purple-200 block">Overall AI Score</span>
              <span className="text-3xl sm:text-4xl font-black text-amber-300">
                {listing.aiAnalysis.overallScore}/100
              </span>
            </div>
          </div>

          {/* 4 Dimension Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/80 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-semibold">1. Readability</span>
                <span className="font-bold text-emerald-400">{listing.aiAnalysis.metrics.readability}%</span>
              </div>
              <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-400 h-full rounded-full" 
                  style={{ width: `${listing.aiAnalysis.metrics.readability}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-400 block">Legibility of handwriting & diagrams</span>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/80 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-semibold">2. Completeness</span>
                <span className="font-bold text-blue-400">{listing.aiAnalysis.metrics.completeness}%</span>
              </div>
              <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-400 h-full rounded-full" 
                  style={{ width: `${listing.aiAnalysis.metrics.completeness}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-400 block">Formulas, syllabus breadth & derivations</span>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/80 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-semibold">3. Organization</span>
                <span className="font-bold text-purple-400">{listing.aiAnalysis.metrics.organization}%</span>
              </div>
              <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-purple-400 h-full rounded-full" 
                  style={{ width: `${listing.aiAnalysis.metrics.organization}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-400 block">Indices, flowcharts & mindmap logic</span>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/80 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-semibold">4. Topic Coverage</span>
                <span className="font-bold text-amber-400">{listing.aiAnalysis.metrics.topicCoverage}%</span>
              </div>
              <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-amber-400 h-full rounded-full" 
                  style={{ width: `${listing.aiAnalysis.metrics.topicCoverage}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-400 block">Exam-specific recurring PYQs coverage</span>
            </div>
          </div>

          {/* Strengths & Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-700 space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Verified Strengths
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {listing.aiAnalysis.strengths.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-700 space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                AI Study Recommendations
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {listing.aiAnalysis.recommendations.map((r, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Similar Listings Section */}
      {similarListings.length > 0 && (
        <div className="space-y-6 pt-8 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-xl text-slate-900">
              Other Recommended {listing.exam} Resources
            </h3>
            <button
              onClick={() => navigateTo('marketplace')}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              Browse All &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {similarListings.map((sim) => (
              <ListingCard key={sim.id} listing={sim} />
            ))}
          </div>
        </div>
      )}

      {/* OpenStreetMap Modal */}
      <OpenStreetMapModal
        isOpen={osmModalOpen}
        onClose={() => setOsmModalOpen(false)}
        title={listing.title}
        locationName={listing.sellerLocation}
        pickupPoint={listing.pickupLocation}
        lat={listing.coordinates.lat}
        lng={listing.coordinates.lng}
      />

      {/* Negotiation Counter-Offer Modal */}
      <NegotiateModal
        listing={listing}
        isOpen={negotiateModalOpen}
        onClose={() => setNegotiateModalOpen(false)}
      />
    </div>
  );
};
