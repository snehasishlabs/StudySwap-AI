import React, { useState } from 'react';
import { 
  Package, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  IndianRupee, 
  ShieldCheck, 
  Star, 
  PlusCircle, 
  BookOpen, 
  FileText, 
  Tag, 
  MessageSquare,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { STUDY_BUNDLES } from '../../data/mockData';
import { StudyBundle, ExamCategory } from '../../types';

export const StudyBundlesSection: React.FC = () => {
  const { navigateTo, startInquiryChat, showToast } = useApp();
  const [selectedBundleExam, setSelectedBundleExam] = useState<string>('All');
  const [expandedBundleId, setExpandedBundleId] = useState<string | null>('bundle-ssc-1');

  const filteredBundles = STUDY_BUNDLES.filter((b) => {
    if (selectedBundleExam === 'All') return true;
    return b.exam === selectedBundleExam;
  });

  const handleInquireBundle = (bundle: StudyBundle) => {
    startInquiryChat(
      bundle.id,
      `Hello ${bundle.sellerName}! I am interested in purchasing your "${bundle.title}" for ₹${bundle.bundlePrice}. Are all items available for campus meetup?`,
      bundle.bundlePrice
    );
    navigateTo('messages');
    showToast(`Opened inquiry for ${bundle.title}!`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full border border-purple-200">
            <Package className="w-3.5 h-3.5 text-purple-600" />
            <span>Curated Exam Bundles • Save up to 66%</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1.5">
            Complete Prep Study Bundles
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Get the full starter kit in one package: standard textbooks + topper handwritten notes + solved PYQ banks.
          </p>
        </div>

        {/* Filter by Exam */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto">
          {['All', 'SSC', 'UPSC', 'NEET', 'GATE'].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedBundleExam(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                selectedBundleExam === tab
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Bundles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBundles.map((bundle) => {
          const isExpanded = expandedBundleId === bundle.id;

          return (
            <div
              key={bundle.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between"
            >
              {/* Bundle Card Top */}
              <div>
                {/* Image & Pill Header */}
                <div className="relative h-44 overflow-hidden bg-slate-900">
                  <img
                    src={bundle.image}
                    alt={bundle.title}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  {/* Badges Overlay */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="bg-purple-600 text-white text-[11px] font-black px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                      {bundle.exam} Bundle
                    </span>
                    {bundle.popularBadge && (
                      <span className="bg-amber-400 text-amber-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs">
                        {bundle.popularBadge}
                      </span>
                    )}
                  </div>

                  {/* Savings pill */}
                  <div className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
                    {bundle.savingsPercent}% OFF
                  </div>

                  {/* Bottom title overlay */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="font-black text-lg text-white leading-tight">
                      {bundle.title}
                    </h3>
                    <p className="text-xs text-slate-200 truncate mt-0.5">
                      {bundle.subtitle}
                    </p>
                  </div>
                </div>

                {/* Bundle Content Details */}
                <div className="p-5 space-y-4">
                  {/* Seller info row */}
                  <div className="flex items-center justify-between py-2 border-b border-slate-100 text-xs">
                    <div className="flex items-center gap-2">
                      <img
                        src={bundle.sellerAvatar}
                        alt={bundle.sellerName}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <div>
                        <span className="font-bold text-slate-900 block">{bundle.sellerName}</span>
                        <span className="text-[10px] text-purple-600 font-semibold">{bundle.sellerBadge}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{bundle.sellerRating}</span>
                    </div>
                  </div>

                  {/* Included Items List */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span>Includes {bundle.items.length} Curated Study Items:</span>
                      <button
                        onClick={() => setExpandedBundleId(isExpanded ? null : bundle.id)}
                        className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-[11px] cursor-pointer"
                      >
                        <span>{isExpanded ? 'Hide Items' : 'View All Items'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      {bundle.items.slice(0, isExpanded ? bundle.items.length : 2).map((item, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/70 text-xs flex items-start justify-between gap-2"
                        >
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5">
                              <span className="bg-blue-100 text-blue-800 text-[9px] font-black px-1.5 py-0.5 rounded">
                                {item.category}
                              </span>
                              <strong className="text-slate-900 font-semibold">{item.title}</strong>
                            </div>
                            <p className="text-[10px] text-slate-500">{item.condition} • {item.description}</p>
                          </div>
                          <span className="text-slate-400 line-through text-[11px] shrink-0">
                            ₹{item.originalPrice}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing and Action Footer */}
              <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-900">₹{bundle.bundlePrice}</span>
                    <span className="text-xs text-slate-400 line-through">
                      ₹{bundle.totalOriginalPrice}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-600">
                    Saves ₹{bundle.totalOriginalPrice - bundle.bundlePrice} instantly
                  </span>
                </div>

                <button
                  onClick={() => handleInquireBundle(bundle)}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition cursor-pointer flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Buy / Inquire Bundle</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
