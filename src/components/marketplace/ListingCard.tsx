import React from 'react';
import { Heart, Star, MapPin, Sparkles, ShieldCheck, Tag, ArrowUpRight, Scale, Check } from 'lucide-react';
import { Listing } from '../../types';
import { useApp } from '../../context/AppContext';

interface ListingCardProps {
  listing: Listing;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const { wishlist, toggleWishlist, navigateTo, comparisonList, toggleComparison } = useApp();
  const isWishlisted = wishlist.includes(listing.id);
  const isCompared = comparisonList.includes(listing.id);

  const discountPercent = Math.round(
    ((listing.originalPrice - listing.price) / listing.originalPrice) * 100
  );

  const getConditionStyle = (cond: string) => {
    switch (cond) {
      case 'New':
        return 'bg-emerald-50 text-emerald-800 border-emerald-300';
      case 'Used - Like New':
      case 'Like New':
      case 'Excellent':
        return 'bg-blue-50 text-blue-700 border-blue-200/80';
      case 'Used - Good':
      case 'Good':
        return 'bg-amber-50 text-amber-700 border-amber-200/80';
      case 'Used - Fair':
      case 'Fair':
      case 'Used - Acceptable':
      case 'Acceptable':
        return 'bg-orange-50 text-orange-700 border-orange-200/80';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200/80';
    }
  };

  return (
    <div 
      id={`listing-card-${listing.id}`}
      className={`group bg-white rounded-2xl border ${
        isCompared ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-md' : 'border-slate-200/80 hover:border-blue-300 shadow-xs hover:shadow-xl'
      } transition-all duration-300 flex flex-col overflow-hidden relative cursor-pointer`}
      onClick={() => navigateTo('listing-details', listing.id)}
    >
      {/* Image Container */}
      <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
        <img
          src={listing.images[0] || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600'}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 pointer-events-none">
          <div className="flex flex-wrap gap-1.5">
            <span className="bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
              {listing.exam}
            </span>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border backdrop-blur-md ${getConditionStyle(listing.condition)}`}>
              {listing.condition}
            </span>
          </div>

          {/* Action buttons (Wishlist + Compare) */}
          <div className="flex items-center space-x-1.5 pointer-events-auto">
            <button
              id={`compare-btn-${listing.id}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleComparison(listing.id);
              }}
              title={isCompared ? 'Remove from compare' : 'Add to compare (up to 3)'}
              aria-label={isCompared ? 'Remove from compare' : 'Compare listing'}
              className={`h-8 px-2 rounded-full text-xs font-semibold backdrop-blur-md shadow-md transition flex items-center space-x-1 ${
                isCompared
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-white/90 text-slate-700 hover:text-blue-600 hover:bg-white'
              }`}
            >
              {isCompared ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span className="text-[11px]">Compare</span>
                </>
              ) : (
                <>
                  <Scale className="w-3.5 h-3.5" />
                  <span className="text-[11px] hidden sm:inline">Compare</span>
                </>
              )}
            </button>

            {/* Wishlist Button */}
            <button
              id={`wishlist-btn-${listing.id}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(listing.id);
              }}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:text-rose-600 hover:bg-white flex items-center justify-center shadow-md transition transform active:scale-90"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* AI Quality Score Badge for Notes */}
        {listing.aiScore != null && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-gradient-to-r from-purple-700/90 to-indigo-700/90 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-xl shadow-md border border-purple-300/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>
              AI Score {typeof listing.aiScore === 'object' ? (listing.aiScore as any).overall : listing.aiScore}/100
            </span>
          </div>
        )}

        {/* Sold Overlay */}
        {listing.status === 'sold' && (
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center">
            <span className="bg-rose-600 text-white font-black text-sm uppercase tracking-widest px-4 py-1.5 rounded-xl shadow-lg transform -rotate-6">
              SOLD OUT
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Subject Tag */}
          <div className="flex items-center gap-1 text-xs text-slate-500 mb-1.5 font-medium flex-wrap">
            <Tag className="w-3 h-3 text-blue-500 shrink-0" />
            <span className="truncate">{listing.category} • {listing.subject}</span>
            {listing.subCategory && (
              <span className="ml-1 text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-normal">
                {listing.subCategory}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-blue-600 transition line-clamp-2">
            {listing.title}
          </h3>

          {/* Description Snippet */}
          <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
            {listing.description}
          </p>

          {listing.creator && (
            <div className="mt-1.5 text-[11px] text-indigo-700 font-medium">
              Notes by: <span className="font-semibold">{listing.creator}</span>
            </div>
          )}
        </div>

        {/* Bottom Metadata & Price */}
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-2.5">
          {/* Location & Seller Info */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1 truncate max-w-[65%]">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{listing.sellerLocation}</span>
            </div>
            <div className="flex items-center gap-1 font-semibold text-slate-700">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{listing.sellerRating.toFixed(1)}</span>
              {listing.isVerifiedSeller && (
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" title="Verified Student Seller" />
              )}
            </div>
          </div>

          {/* Price & Action Row */}
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-slate-900">
                ₹{listing.price}
              </span>
              <span className="text-xs text-slate-400 line-through">
                ₹{listing.originalPrice}
              </span>
              {discountPercent > 0 && (
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            <span className="text-xs font-semibold text-blue-600 group-hover:translate-x-0.5 transition flex items-center gap-0.5">
              Details
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
