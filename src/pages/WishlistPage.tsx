import React from 'react';
import { Heart, ArrowRight, BookOpen, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ListingCard } from '../components/marketplace/ListingCard';

export const WishlistPage: React.FC = () => {
  const { wishlist, listings, navigateTo } = useApp();

  const wishlistedItems = listings.filter((item) => wishlist.includes(item.id));
  const totalOriginal = wishlistedItems.reduce((acc, l) => acc + l.originalPrice, 0);
  const totalCurrent = wishlistedItems.reduce((acc, l) => acc + l.price, 0);
  const totalSaved = totalOriginal - totalCurrent;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-white" />
            <span className="text-xs font-bold uppercase tracking-wider text-rose-200">
              Personal Study Bookmark
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Saved Study Materials ({wishlistedItems.length})
          </h1>
          <p className="text-xs sm:text-sm text-purple-100">
            Keep track of second-hand textbooks, topper summaries, and accessories you intend to buy.
          </p>
        </div>

        {wishlistedItems.length > 0 && (
          <div className="bg-white/15 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center shrink-0">
            <span className="text-[10px] uppercase font-bold text-rose-200 block">Potential Savings</span>
            <span className="text-2xl font-black text-amber-300">₹{totalSaved}</span>
            <span className="text-[10px] text-white/80 block">vs MRP: ₹{totalOriginal}</span>
          </div>
        )}
      </div>

      {wishlistedItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistedItems.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-lg text-slate-900">Your wishlist is empty</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Browse through verified books and topper handwritten notes in the marketplace and click the heart icon to save them.
          </p>
          <button
            onClick={() => navigateTo('marketplace')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition cursor-pointer"
          >
            Explore Marketplace Listings
          </button>
        </div>
      )}
    </div>
  );
};
