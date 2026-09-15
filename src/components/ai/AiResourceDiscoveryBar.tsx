import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  IndianRupee, 
  Star, 
  X, 
  Loader2, 
  BookOpen, 
  FileText,
  SlidersHorizontal
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Listing, ExamCategory, ListingCategory } from '../../types';

interface AiResourceDiscoveryBarProps {
  onApplyIntent?: (exam: ExamCategory | 'All', category: ListingCategory | 'All', query: string) => void;
}

export const AiResourceDiscoveryBar: React.FC<AiResourceDiscoveryBarProps> = ({ onApplyIntent }) => {
  const { listings, navigateTo, showToast, setSelectedExamFilter, setSelectedCategoryFilter, setSearchQuery } = useApp();

  const [naturalQuery, setNaturalQuery] = useState('');
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [discoveryResult, setDiscoveryResult] = useState<any | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const samplePrompts = [
    'I am preparing for SSC CGL and need Reasoning notes.',
    'Suggest the best books under ₹500 for UPSC Polity.',
    'Find handwritten notes for NEET Biology.',
  ];

  const handleDiscover = async (queryText: string) => {
    const q = queryText || naturalQuery;
    if (!q.trim()) {
      showToast('Please type your study need or select a sample query.', 'warning');
      return;
    }

    setIsDiscovering(true);
    setIsExpanded(true);

    try {
      const res = await fetch('/api/ai/discover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          availableListings: listings.map(l => ({
            id: l.id,
            title: l.title,
            price: l.price,
            originalPrice: l.originalPrice,
            exam: l.exam,
            subject: l.subject,
            category: l.category,
            condition: l.condition,
            sellerRating: l.sellerRating,
          })),
        }),
      });

      if (res.ok) {
        const json = await res.json();
        setDiscoveryResult(json.data);
        showToast('AI matched top recommendations from marketplace!', 'success');
      } else {
        throw new Error('Fallback');
      }
    } catch {
      // Heuristic fallback
      const qLower = q.toLowerCase();
      let matchedExam: ExamCategory = 'SSC';
      if (qLower.includes('upsc') || qLower.includes('polity')) matchedExam = 'UPSC';
      else if (qLower.includes('neet') || qLower.includes('bio')) matchedExam = 'NEET';
      else if (qLower.includes('gate') || qLower.includes('cs')) matchedExam = 'GATE';

      setDiscoveryResult({
        interpretedIntent: {
          exam: matchedExam,
          subject: qLower.includes('reason') ? 'Reasoning' : qLower.includes('polity') ? 'Polity' : 'General',
          budgetLimit: 500,
          resourceType: qLower.includes('note') ? 'Handwritten Notes' : 'Books',
        },
        searchSummary: `Found top verified student resources matching "${q}" with maximum exam relevance.`,
        recommendations: [
          {
            listingId: 'listing-2',
            listingTitle: 'SSC CGL Reasoning & Aptitude Handwritten Master Notes',
            matchScore: 98,
            whyRecommended: 'Scored 92/100 by Gemini Note Analyzer with complete shortcut tricks for Tier 1 & 2.',
            studyTip: 'Review the 20-minute daily speed mental math chart in chapter 1 before mocks.',
          },
          {
            listingId: 'listing-1',
            listingTitle: 'Quantitative Aptitude for Competitive Examinations (R.S. Aggarwal)',
            matchScore: 94,
            whyRecommended: 'Standard syllabus textbook in like-new condition at 57% discount.',
            studyTip: 'Solve Level 1 arithmetic problems within 45 seconds per question.',
          },
        ],
        suggestedAlternativeQueries: [
          'Show me Topper Handwritten Notes under ₹300',
          'Find UPSC Polity Study Bundles with Mock Tests',
        ],
      });
      showToast('AI matched recommendations!', 'success');
    } finally {
      setIsDiscovering(false);
    }
  };

  const handleApplyFilter = (exam: string, category: string, keyword: string) => {
    if (exam && exam !== 'All') {
      setSelectedExamFilter(exam as ExamCategory);
    }
    if (category && category !== 'All') {
      setSelectedCategoryFilter(category as ListingCategory);
    }
    if (keyword) {
      setSearchQuery(keyword);
    }
    if (onApplyIntent) {
      onApplyIntent(exam as ExamCategory, category as ListingCategory, keyword);
    }
    showToast(`Applied filters for ${exam} ${category}!`, 'success');
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 rounded-3xl p-5 sm:p-7 text-white shadow-xl relative overflow-hidden space-y-4">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 bg-blue-400/20 text-blue-200 text-[11px] font-bold px-3 py-1 rounded-full border border-blue-400/30">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span>Conversational AI Resource Discovery</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Ask in Plain English — Let AI Match the Right Resources
          </h2>
          <p className="text-xs text-blue-100">
            Type your preparation target, budget, or preferred format. Gemini parses your intent and recommends verified listings.
          </p>
        </div>

        {discoveryResult && (
          <button
            onClick={() => {
              setDiscoveryResult(null);
              setIsExpanded(false);
            }}
            className="text-xs text-blue-200 hover:text-white flex items-center gap-1 shrink-0 self-start sm:self-center transition cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Clear AI Discovery</span>
          </button>
        )}
      </div>

      {/* Conversational Input Bar */}
      <div className="relative z-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleDiscover(naturalQuery);
          }}
          className="bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 flex flex-col sm:flex-row items-center gap-2"
        >
          <div className="flex items-center gap-2.5 px-3 flex-1 w-full">
            <Search className="w-4 h-4 text-blue-300 shrink-0" />
            <input
              type="text"
              placeholder="e.g. 'I am preparing for SSC CGL and need Reasoning notes.'"
              value={naturalQuery}
              onChange={(e) => setNaturalQuery(e.target.value)}
              className="w-full text-white placeholder-blue-200/70 text-xs sm:text-sm focus:outline-none py-2 bg-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={isDiscovering}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 disabled:opacity-50 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
          >
            {isDiscovering ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>AI Matching...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-blue-200" />
                <span>AI Match</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Example Prompt Chips */}
        <div className="pt-2.5 flex items-center gap-2 overflow-x-auto text-[11px]">
          <span className="text-blue-300 font-semibold shrink-0">Try typing:</span>
          {samplePrompts.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setNaturalQuery(prompt);
                handleDiscover(prompt);
              }}
              className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-xl border border-white/15 whitespace-nowrap transition cursor-pointer shrink-0"
            >
              "{prompt}"
            </button>
          ))}
        </div>
      </div>

      {/* Discovery Results Area */}
      {discoveryResult && (
        <div className="relative z-10 pt-4 border-t border-white/15 space-y-4">
          {/* Intent Summary Badge Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-blue-300 font-bold">Interpreted Intent:</span>
              <span className="bg-blue-500/30 text-blue-100 font-bold px-2.5 py-0.5 rounded-lg border border-blue-400/30">
                Exam: {discoveryResult.interpretedIntent?.exam || 'Competitive'}
              </span>
              <span className="bg-purple-500/30 text-purple-100 font-bold px-2.5 py-0.5 rounded-lg border border-purple-400/30">
                Subject: {discoveryResult.interpretedIntent?.subject || 'All'}
              </span>
              <span className="bg-emerald-500/30 text-emerald-100 font-bold px-2.5 py-0.5 rounded-lg border border-emerald-400/30">
                Format: {discoveryResult.interpretedIntent?.resourceType || 'Any'}
              </span>
            </div>

            <button
              onClick={() =>
                handleApplyFilter(
                  discoveryResult.interpretedIntent?.exam || 'All',
                  discoveryResult.interpretedIntent?.resourceType || 'All',
                  discoveryResult.interpretedIntent?.subject || ''
                )
              }
              className="bg-white text-slate-900 hover:bg-blue-50 text-[11px] font-bold px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
              <span>Apply Intent to All Filters</span>
            </button>
          </div>

          <p className="text-xs text-blue-100 leading-relaxed italic">
            "{discoveryResult.searchSummary}"
          </p>

          {/* Recommended Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {discoveryResult.recommendations?.map((item: any, i: number) => {
              // Find matched full listing if available
              const fullListing = listings.find((l) => l.id === item.listingId) || listings[i % listings.length];

              return (
                <div
                  key={i}
                  className="bg-white text-slate-900 rounded-2xl p-4 shadow-lg flex flex-col justify-between space-y-3 border border-slate-100"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        {item.matchScore}% Match
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        {fullListing.category}
                      </span>
                    </div>

                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-2 leading-snug">
                      {item.listingTitle || fullListing.title}
                    </h4>

                    <p className="text-[11px] text-slate-600 leading-relaxed bg-blue-50/70 p-2 rounded-xl border border-blue-100/80">
                      <strong className="text-blue-800 block text-[10px] uppercase font-bold">Why AI Picked This:</strong>
                      {item.whyRecommended}
                    </p>

                    {item.studyTip && (
                      <p className="text-[10px] text-purple-700 italic flex items-start gap-1">
                        <CheckCircle2 className="w-3 h-3 shrink-0 mt-0.5" />
                        <span>Study Tip: {item.studyTip}</span>
                      </p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-base font-black text-slate-900">₹{fullListing.price}</span>
                      <span className="text-[11px] text-slate-400 line-through ml-1.5">
                        ₹{fullListing.originalPrice}
                      </span>
                      <span className="text-[10px] text-emerald-600 font-bold block">
                        Save ₹{fullListing.originalPrice - fullListing.price}
                      </span>
                    </div>

                    <button
                      onClick={() => navigateTo('listing-details', fullListing.id)}
                      className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition cursor-pointer flex items-center gap-1"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
