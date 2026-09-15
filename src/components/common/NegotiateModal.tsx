import React, { useState } from 'react';
import { X, Send, Sparkles, AlertCircle, IndianRupee } from 'lucide-react';
import { Listing } from '../../types';
import { useApp } from '../../context/AppContext';

interface NegotiateModalProps {
  listing: Listing;
  isOpen: boolean;
  onClose: () => void;
}

export const NegotiateModal: React.FC<NegotiateModalProps> = ({ listing, isOpen, onClose }) => {
  const { startInquiryChat, currentUser } = useApp();
  const [offerPrice, setOfferPrice] = useState(
    Math.round(listing.price * 0.9)
  );
  const [message, setMessage] = useState(
    `Hi ${listing.sellerName}, I am interested in "${listing.title}". Would you accept ₹${Math.round(listing.price * 0.9)} if I pick it up directly?`
  );

  if (!isOpen) return null;

  const handlePercentageClick = (discountPercent: number) => {
    const discounted = Math.round(listing.price * (1 - discountPercent / 100));
    setOfferPrice(discounted);
    setMessage(
      `Hi ${listing.sellerName}, would you consider ₹${discounted} (${discountPercent}% off listed price) for a quick campus handoff?`
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startInquiryChat(listing.id, message, offerPrice);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              <IndianRupee className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Make an Offer / Inquire</h3>
              <p className="text-xs text-slate-500">Negotiate directly with {listing.sellerName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-white/80 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Item Snippet */}
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <img
              src={listing.images[0]}
              alt={listing.title}
              className="w-12 h-12 rounded-xl object-cover"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-xs text-slate-800 truncate">{listing.title}</h4>
              <p className="text-xs text-slate-500">
                Listed Price: <strong className="text-slate-900">₹{listing.price}</strong>{' '}
                <span className="line-through text-slate-400">₹{listing.originalPrice}</span>
              </p>
            </div>
          </div>

          {/* Quick Offer Discounts */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-2">
              Quick Counter-Offer Presets:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[10, 15, 20].map((pct) => {
                const calculated = Math.round(listing.price * (1 - pct / 100));
                return (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => handlePercentageClick(pct)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition text-center cursor-pointer ${
                      offerPrice === calculated
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <div>₹{calculated}</div>
                    <div className="text-[10px] font-normal opacity-80">{pct}% off</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Offer Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Your Proposed Price (₹):
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-bold">₹</span>
              <input
                type="number"
                min={1}
                max={listing.price}
                value={offerPrice}
                onChange={(e) => setOfferPrice(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 text-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Polite counter-offers within 10-20% have an 85% acceptance rate.
            </p>
          </div>

          {/* Message Text */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Message to Seller:
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Suggest meetup time, campus pickup gate, or ask about book condition..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition cursor-pointer"
          >
            <Send className="w-4 h-4" />
            Send Offer & Message
          </button>
        </form>
      </div>
    </div>
  );
};
