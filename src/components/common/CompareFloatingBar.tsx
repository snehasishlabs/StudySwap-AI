import React from 'react';
import { Scale, X, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CompareFloatingBar: React.FC = () => {
  const {
    comparisonList,
    clearComparison,
    removeFromComparison,
    setIsCompareModalOpen,
    listings,
  } = useApp();

  if (comparisonList.length === 0) return null;

  const selectedItems = listings.filter(item => comparisonList.includes(item.id));

  return (
    <aside
      id="compare-floating-bar"
      aria-label="Comparison dock"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-2xl bg-slate-900/95 backdrop-blur-md text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700/80 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="flex items-center space-x-3 overflow-hidden">
        <div className="w-9 h-9 rounded-xl bg-blue-600/30 text-blue-400 flex items-center justify-center flex-shrink-0 border border-blue-500/30">
          <Scale className="w-5 h-5" />
        </div>
        <div className="hidden sm:block flex-shrink-0">
          <p className="text-xs font-semibold text-white leading-tight">Compare Listings</p>
          <p className="text-[11px] text-slate-400">
            {selectedItems.length} of 3 selected
          </p>
        </div>

        {/* Selected items miniature thumbnails */}
        <div className="flex items-center space-x-2 overflow-x-auto py-0.5">
          {selectedItems.map((item) => (
            <div
              key={item.id}
              className="relative group flex items-center space-x-1.5 bg-slate-800 border border-slate-700 rounded-lg pr-2 pl-1 py-1 flex-shrink-0"
            >
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-6 h-6 rounded object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="text-xs font-medium text-slate-200 truncate max-w-[100px]">
                ₹{item.price}
              </span>
              <button
                id={`btn-remove-floating-compare-${item.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromComparison(item.id);
                }}
                className="text-slate-400 hover:text-white p-0.5 rounded transition"
                title="Remove"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-2 flex-shrink-0">
        <button
          id="btn-clear-floating-compare"
          onClick={clearComparison}
          className="text-xs text-slate-400 hover:text-slate-200 px-2 py-1.5 rounded transition hidden xs:inline-block"
        >
          Clear
        </button>

        <button
          id="btn-open-compare-modal"
          onClick={() => setIsCompareModalOpen(true)}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-md transition flex items-center space-x-1.5"
        >
          <span>Compare ({selectedItems.length})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
