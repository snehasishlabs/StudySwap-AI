import React from 'react';
import { X, Check, Sparkles, Star, MapPin, ShieldCheck, ArrowRight, Trash2, Scale, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CompareModal: React.FC = () => {
  const {
    comparisonList,
    removeFromComparison,
    clearComparison,
    isCompareModalOpen,
    setIsCompareModalOpen,
    listings,
    navigateTo,
    startInquiryChat,
  } = useApp();

  if (!isCompareModalOpen) return null;

  const comparedListings = listings.filter(item => comparisonList.includes(item.id));

  return (
    <div
      id="compare-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsCompareModalOpen(false);
      }}
    >
      <div
        id="compare-modal-content"
        className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-sm">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight">Compare Study Resources</h2>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-white/20 text-white">
                  {comparedListings.length} of 3 items
                </span>
              </div>
              <p className="text-xs text-blue-100">
                Compare price, condition, seller credibility, and AI Note Analyzer metrics side-by-side
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {comparedListings.length > 0 && (
              <button
                id="btn-clear-comparison"
                onClick={clearComparison}
                className="hidden sm:inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-100 hover:text-white hover:bg-white/10 rounded-lg transition"
              >
                <Trash2 className="w-3.5 h-3.5 mr-1" />
                Clear all
              </button>
            )}
            <button
              id="btn-close-compare-modal"
              onClick={() => setIsCompareModalOpen(false)}
              className="p-2 rounded-xl text-blue-100 hover:text-white hover:bg-white/10 transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto overflow-x-auto flex-1 bg-slate-50">
          {comparedListings.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Scale className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">No listings selected for comparison</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
                Browse the marketplace and click the &quot;Compare&quot; button on up to 3 listings to view their price, condition, and AI analysis side by side.
              </p>
              <button
                id="btn-browse-marketplace-from-compare"
                onClick={() => {
                  setIsCompareModalOpen(false);
                  navigateTo('marketplace');
                }}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition inline-flex items-center space-x-2 shadow-sm"
              >
                <span>Browse Marketplace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="min-w-[620px]">
              {/* Comparison Table */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-100/70">
                      <th className="w-1/4 p-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Feature / Metric
                      </th>
                      {comparedListings.map((item) => (
                        <th key={item.id} className="w-1/4 p-4 text-left relative bg-white border-l border-slate-200">
                          <button
                            id={`btn-remove-compare-${item.id}`}
                            onClick={() => removeFromComparison(item.id)}
                            className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-500 rounded-md hover:bg-red-50 transition"
                            title="Remove from comparison"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <div className="aspect-[4/3] w-full rounded-lg overflow-hidden bg-slate-100 mb-3 border border-slate-100">
                            <img
                              src={item.images[0]}
                              alt={item.title}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <span className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 mb-1">
                            {item.exam} • {item.category}
                          </span>
                          <h4 className="font-bold text-slate-900 text-sm line-clamp-2 leading-snug">
                            {item.title}
                          </h4>
                        </th>
                      ))}
                      {/* Empty slot placeholders if fewer than 3 */}
                      {Array.from({ length: 3 - comparedListings.length }).map((_, index) => (
                        <th key={`empty-${index}`} className="w-1/4 p-4 text-center border-l border-slate-200 bg-slate-50/50">
                          <div className="h-full flex flex-col items-center justify-center py-10 text-slate-400">
                            <div className="w-10 h-10 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center mb-2">
                              <span className="text-sm font-semibold">+</span>
                            </div>
                            <span className="text-xs font-medium">Slot available</span>
                            <span className="text-[11px] text-slate-400">Add another item</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200 text-sm">
                    {/* Price & Savings */}
                    <tr className="hover:bg-slate-50/60 transition">
                      <td className="p-4 font-semibold text-slate-700 bg-slate-50/40">
                        Price &amp; Discount
                      </td>
                      {comparedListings.map((item) => {
                        const discount = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);
                        return (
                          <td key={item.id} className="p-4 border-l border-slate-200">
                            <div className="flex items-baseline space-x-2">
                              <span className="text-xl font-bold text-slate-900">₹{item.price}</span>
                              <span className="text-xs text-slate-400 line-through">₹{item.originalPrice}</span>
                            </div>
                            <div className="mt-1">
                              <span className="inline-flex items-center text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                                Save {discount}% (₹{item.originalPrice - item.price})
                              </span>
                            </div>
                          </td>
                        );
                      })}
                      {Array.from({ length: 3 - comparedListings.length }).map((_, i) => (
                        <td key={i} className="p-4 border-l border-slate-200 bg-slate-50/20 text-slate-300 text-center">—</td>
                      ))}
                    </tr>

                    {/* Condition */}
                    <tr className="hover:bg-slate-50/60 transition">
                      <td className="p-4 font-semibold text-slate-700 bg-slate-50/40">
                        Item Condition
                      </td>
                      {comparedListings.map((item) => {
                        let badgeColor = 'bg-slate-100 text-slate-700 border-slate-200';
                        if (item.condition === 'New') {
                          badgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                        } else if (item.condition === 'Used - Like New' || item.condition === 'Like New') {
                          badgeColor = 'bg-blue-50 text-blue-700 border-blue-200';
                        } else if (item.condition === 'Used - Good' || item.condition === 'Good') {
                          badgeColor = 'bg-amber-50 text-amber-700 border-amber-200';
                        } else if (item.condition === 'Used - Fair' || item.condition === 'Fair') {
                          badgeColor = 'bg-orange-50 text-orange-700 border-orange-200';
                        }

                        return (
                          <td key={item.id} className="p-4 border-l border-slate-200">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border ${badgeColor}`}>
                              {item.condition}
                            </span>
                            {item.editionOrYear && (
                              <p className="text-xs text-slate-500 mt-1">{item.editionOrYear}</p>
                            )}
                          </td>
                        );
                      })}
                      {Array.from({ length: 3 - comparedListings.length }).map((_, i) => (
                        <td key={i} className="p-4 border-l border-slate-200 bg-slate-50/20 text-slate-300 text-center">—</td>
                      ))}
                    </tr>

                    {/* Seller Rating & Verification */}
                    <tr className="hover:bg-slate-50/60 transition">
                      <td className="p-4 font-semibold text-slate-700 bg-slate-50/40">
                        Seller Rating &amp; Trust
                      </td>
                      {comparedListings.map((item) => (
                        <td key={item.id} className="p-4 border-l border-slate-200">
                          <div className="flex items-center space-x-1.5">
                            <div className="flex items-center text-amber-500">
                              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                              <span className="ml-1 font-bold text-slate-800 text-sm">{item.sellerRating.toFixed(1)}</span>
                            </div>
                            <span className="text-xs text-slate-400">/ 5.0</span>
                          </div>
                          <div className="mt-1 flex items-center space-x-1 text-xs text-blue-700">
                            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                            <span className="font-medium">{item.sellerName}</span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            Trust Score: <strong className="text-slate-700">{item.sellerTrustScore}%</strong>
                          </div>
                        </td>
                      ))}
                      {Array.from({ length: 3 - comparedListings.length }).map((_, i) => (
                        <td key={i} className="p-4 border-l border-slate-200 bg-slate-50/20 text-slate-300 text-center">—</td>
                      ))}
                    </tr>

                    {/* AI Note Analyzer Score */}
                    <tr className="hover:bg-slate-50/60 transition bg-indigo-50/20">
                      <td className="p-4 font-semibold text-slate-700 bg-slate-50/40">
                        <div className="flex items-center space-x-1.5 text-indigo-700">
                          <Sparkles className="w-4 h-4" />
                          <span>AI Note Score</span>
                        </div>
                      </td>
                      {comparedListings.map((item) => {
                        const scoreVal = item.aiScore ? (typeof item.aiScore === 'object' ? (item.aiScore as any).overall : item.aiScore) : 0;
                        return (
                        <td key={item.id} className="p-4 border-l border-slate-200">
                          {item.aiScore ? (
                            <div>
                              <div className="flex items-center space-x-2">
                                <div className="px-2 py-0.5 rounded-md bg-purple-600 text-white font-bold text-xs">
                                  {scoreVal}/100
                                </div>
                                <span className="text-xs font-semibold text-purple-900">
                                  {scoreVal >= 90 ? 'Gold Certified' : 'Silver Certified'}
                                </span>
                              </div>
                              {item.aiAnalysis && (
                                <div className="mt-2 space-y-1 text-[11px] text-slate-600 bg-white/70 p-2 rounded border border-purple-100">
                                  <div className="flex justify-between">
                                    <span>Readability:</span>
                                    <span className="font-semibold text-purple-700">{item.aiAnalysis.metrics.readability}%</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Completeness:</span>
                                    <span className="font-semibold text-purple-700">{item.aiAnalysis.metrics.completeness}%</span>
                                  </div>
                                  <div className="text-[10px] text-emerald-700 font-medium mt-1">
                                    ✓ Saves ~{item.aiAnalysis.estimatedStudyHoursSaved} hrs study time
                                  </div>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="text-xs text-slate-400 italic">
                              Standard Published Resource
                              <p className="text-[11px] text-slate-400 not-italic mt-0.5">
                                (AI analyzer evaluates handwritten notes)
                              </p>
                            </div>
                          )}
                        </td>
                      );
                      })}
                      {Array.from({ length: 3 - comparedListings.length }).map((_, i) => (
                        <td key={i} className="p-4 border-l border-slate-200 bg-slate-50/20 text-slate-300 text-center">—</td>
                      ))}
                    </tr>

                    {/* Sub-Category / Creator */}
                    <tr className="hover:bg-slate-50/60 transition">
                      <td className="p-4 font-semibold text-slate-700 bg-slate-50/40">
                        Subject &amp; Creator
                      </td>
                      {comparedListings.map((item) => (
                        <td key={item.id} className="p-4 border-l border-slate-200">
                          <p className="font-medium text-slate-800 text-xs">{item.subject}</p>
                          {item.creator && (
                            <p className="text-[11px] text-indigo-700 font-medium mt-0.5">
                              By {item.creator}
                            </p>
                          )}
                          {item.subCategory && (
                            <span className="inline-block mt-1 text-[11px] px-2 py-0.5 bg-slate-100 text-slate-700 rounded">
                              {item.subCategory}
                            </span>
                          )}
                        </td>
                      ))}
                      {Array.from({ length: 3 - comparedListings.length }).map((_, i) => (
                        <td key={i} className="p-4 border-l border-slate-200 bg-slate-50/20 text-slate-300 text-center">—</td>
                      ))}
                    </tr>

                    {/* Pickup Location */}
                    <tr className="hover:bg-slate-50/60 transition">
                      <td className="p-4 font-semibold text-slate-700 bg-slate-50/40">
                        Pickup Location
                      </td>
                      {comparedListings.map((item) => (
                        <td key={item.id} className="p-4 border-l border-slate-200">
                          <div className="flex items-start space-x-1.5 text-xs text-slate-600">
                            <MapPin className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span>{item.pickupLocation}</span>
                          </div>
                          <span className="inline-block mt-1.5 text-[11px] font-medium text-slate-500">
                            {item.deliveryOption || 'Campus Meetup'}
                          </span>
                        </td>
                      ))}
                      {Array.from({ length: 3 - comparedListings.length }).map((_, i) => (
                        <td key={i} className="p-4 border-l border-slate-200 bg-slate-50/20 text-slate-300 text-center">—</td>
                      ))}
                    </tr>

                    {/* Action Buttons */}
                    <tr className="bg-slate-50/80">
                      <td className="p-4 font-semibold text-slate-700">Actions</td>
                      {comparedListings.map((item) => (
                        <td key={item.id} className="p-4 border-l border-slate-200 space-y-2">
                          <button
                            id={`btn-view-details-compare-${item.id}`}
                            onClick={() => {
                              setIsCompareModalOpen(false);
                              navigateTo('listing-details', item.id);
                            }}
                            className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition flex items-center justify-center space-x-1.5 shadow-sm"
                          >
                            <span>View Full Details</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                          <button
                            id={`btn-chat-compare-${item.id}`}
                            onClick={() => {
                              setIsCompareModalOpen(false);
                              startInquiryChat(item.id, `Hi ${item.sellerName}, I am interested in ${item.title} that I compared on StudySwap.`);
                            }}
                            className="w-full py-2 px-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold transition"
                          >
                            Chat / Make Offer
                          </button>
                        </td>
                      ))}
                      {Array.from({ length: 3 - comparedListings.length }).map((_, i) => (
                        <td key={i} className="p-4 border-l border-slate-200 text-center text-slate-400 text-xs">
                          Add listing from search or marketplace
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>AI Note Analyzer reviews handwriting quality, formula coverage, and clarity algorithms.</span>
          </div>
          <button
            id="btn-close-modal-bottom"
            onClick={() => setIsCompareModalOpen(false)}
            className="px-4 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
