import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  X, 
  RotateCcw, 
  LayoutGrid, 
  List, 
  Sparkles, 
  Star,
  Scale,
  BookOpen,
  PenTool,
  Wrench,
  UserCheck,
  Tag,
  Package
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EXAM_CATEGORIES } from '../data/mockData';
import { ListingCard } from '../components/marketplace/ListingCard';
import { AiResourceDiscoveryBar } from '../components/ai/AiResourceDiscoveryBar';
import { StudyBundlesSection } from '../components/marketplace/StudyBundlesSection';
import { ItemCondition } from '../types';

export const MarketplacePage: React.FC = () => {
  const { 
    listings, 
    searchQuery, 
    setSearchQuery, 
    selectedExamFilter, 
    setSelectedExamFilter,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    comparisonList,
    setIsCompareModalOpen,
  } = useApp();

  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedCondition, setSelectedCondition] = useState<ItemCondition | 'All'>('All');
  const [minRating, setMinRating] = useState<number>(0);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('All');
  const [selectedNotesSubject, setSelectedNotesSubject] = useState<string>('All');
  const [selectedCreator, setSelectedCreator] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(2500);
  const [minAiScore, setMinAiScore] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'ai-score' | 'rating'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [activeMarketTab, setActiveMarketTab] = useState<'all' | 'bundles'>('all');
  const [showAiDiscovery, setShowAiDiscovery] = useState(true);

  // Available locations
  const locations = useMemo(() => {
    const locs = new Set(listings.map(l => l.sellerLocation.split(',')[0].trim()));
    return ['All', ...Array.from(locs)];
  }, [listings]);

  // Available subjects for notes
  const notesSubjects = useMemo(() => {
    const subs = new Set(
      listings
        .filter(l => l.category === 'Handwritten Notes' || l.subject)
        .map(l => l.subject)
        .filter(Boolean)
    );
    return ['All', ...Array.from(subs)];
  }, [listings]);

  // Available creators for notes
  const noteCreators = useMemo(() => {
    const creators = new Set(
      listings
        .map(l => l.creator)
        .filter((c): c is string => Boolean(c))
    );
    return ['All', ...Array.from(creators)];
  }, [listings]);

  // Available study accessories subcategories
  const accessorySubCategories = useMemo(() => {
    return ['All', 'Calculators', 'Stationery', 'Lab Equipment', 'Desk & Reading Stands'];
  }, []);

  // Filter logic
  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      // Search query - multi-token matching across all fields
      if (searchQuery.trim()) {
        const tokens = searchQuery.toLowerCase().trim().split(/\s+/).filter(Boolean);
        const searchableText = [
          item.title,
          item.description,
          item.subject,
          item.exam,
          item.category,
          item.creator,
          item.author,
          item.publisher,
          item.sellerName,
          item.sellerLocation,
          item.subCategory,
          item.condition
        ].filter(Boolean).join(' ').toLowerCase();

        const matchesAllTokens = tokens.every((token) => searchableText.includes(token));
        if (!matchesAllTokens) {
          return false;
        }
      }

      // Category
      if (selectedCategoryFilter !== 'All' && item.category !== selectedCategoryFilter) {
        return false;
      }

      // Exam
      if (selectedExamFilter !== 'All' && item.exam !== selectedExamFilter) {
        return false;
      }

      // Location
      if (selectedLocation !== 'All' && !item.sellerLocation.includes(selectedLocation)) {
        return false;
      }

      // Condition filter
      if (selectedCondition !== 'All') {
        if (selectedCondition === 'New') {
          if (item.condition !== 'New') return false;
        } else if (selectedCondition === 'Used - Like New' || selectedCondition === 'Like New') {
          if (item.condition !== 'Used - Like New' && item.condition !== 'Like New' && item.condition !== 'Excellent') return false;
        } else if (selectedCondition === 'Used - Good' || selectedCondition === 'Good') {
          if (item.condition !== 'Used - Good' && item.condition !== 'Good') return false;
        } else if (selectedCondition === 'Used - Fair' || selectedCondition === 'Fair') {
          if (item.condition !== 'Used - Fair' && item.condition !== 'Fair' && item.condition !== 'Acceptable' && item.condition !== 'Used - Acceptable') return false;
        } else if (selectedCondition === 'Acceptable' || selectedCondition === 'Used - Acceptable') {
          if (item.condition !== 'Acceptable' && item.condition !== 'Used - Acceptable') return false;
        } else if (item.condition !== selectedCondition) {
          return false;
        }
      }

      // Seller Rating filter
      if (minRating > 0 && item.sellerRating < minRating) {
        return false;
      }

      // Study Accessories Sub-Category
      if (selectedSubCategory !== 'All') {
        if (item.subCategory !== selectedSubCategory) {
          return false;
        }
      }

      // Notes Subject
      if (selectedNotesSubject !== 'All') {
        if (item.subject !== selectedNotesSubject) {
          return false;
        }
      }

      // Notes Creator
      if (selectedCreator !== 'All') {
        if (item.creator !== selectedCreator) {
          return false;
        }
      }

      // Price limit
      if (item.price > maxPrice) {
        return false;
      }

      // Min AI score
      if (minAiScore > 0) {
        const score = typeof item.aiScore === 'object' ? item.aiScore?.overall : item.aiScore;
        if (!score || score < minAiScore) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'ai-score') {
        const scoreA = typeof a.aiScore === 'object' ? (a.aiScore?.overall || 0) : (a.aiScore || 0);
        const scoreB = typeof b.aiScore === 'object' ? (b.aiScore?.overall || 0) : (b.aiScore || 0);
        return scoreB - scoreA;
      }
      if (sortBy === 'rating') return b.sellerRating - a.sellerRating;
      return 0; // default featured
    });
  }, [
    listings,
    searchQuery,
    selectedCategoryFilter,
    selectedExamFilter,
    selectedLocation,
    selectedCondition,
    minRating,
    selectedSubCategory,
    selectedNotesSubject,
    selectedCreator,
    maxPrice,
    minAiScore,
    sortBy,
  ]);

  // Check if search matches exist across all listings regardless of current filters
  const globalSearchMatches = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const tokens = searchQuery.toLowerCase().trim().split(/\s+/).filter(Boolean);
    return listings.filter((item) => {
      const searchableText = [
        item.title,
        item.description,
        item.subject,
        item.exam,
        item.category,
        item.creator,
        item.author,
        item.publisher,
        item.sellerName,
        item.sellerLocation,
        item.subCategory,
        item.condition
      ].filter(Boolean).join(' ').toLowerCase();
      return tokens.every((token) => searchableText.includes(token));
    });
  }, [listings, searchQuery]);

  const handleMarketplaceQuickSearch = (term: string) => {
    setSearchQuery(term);
    setSelectedExamFilter('All');
    setSelectedCategoryFilter('All');
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedExamFilter('All');
    setSelectedCategoryFilter('All');
    setSelectedLocation('All');
    setSelectedCondition('All');
    setMinRating(0);
    setSelectedSubCategory('All');
    setSelectedNotesSubject('All');
    setSelectedCreator('All');
    setMaxPrice(2500);
    setMinAiScore(0);
    setSortBy('featured');
  };

  const activeFilterCount = [
    searchQuery.trim() ? 1 : 0,
    selectedCategoryFilter !== 'All' ? 1 : 0,
    selectedExamFilter !== 'All' ? 1 : 0,
    selectedLocation !== 'All' ? 1 : 0,
    selectedCondition !== 'All' ? 1 : 0,
    minRating > 0 ? 1 : 0,
    selectedSubCategory !== 'All' ? 1 : 0,
    selectedNotesSubject !== 'All' ? 1 : 0,
    selectedCreator !== 'All' ? 1 : 0,
    maxPrice < 2500 ? 1 : 0,
    minAiScore > 0 ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <div id="marketplace-page-root" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
            Student Resource Exchange
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Explore StudySwap Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-blue-100">
            Advanced filters for item condition, seller ratings, note creators, subjects, and study accessories.
          </p>
        </div>
      </div>

      {/* Flagship Conversational AI Resource Discovery */}
      {showAiDiscovery && (
        <AiResourceDiscoveryBar
          onApplyIntent={(exam, category, keyword) => {
            if (exam && exam !== 'All') setSelectedExamFilter(exam);
            if (category && category !== 'All') setSelectedCategoryFilter(category);
            if (keyword) setSearchQuery(keyword);
          }}
        />
      )}

      {/* Main Mode Switcher: Single Listings vs Curated Bundles */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3 flex-wrap">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveMarketTab('all')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
              activeMarketTab === 'all'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Individual Listings ({listings.length})</span>
          </button>

          <button
            onClick={() => setActiveMarketTab('bundles')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
              activeMarketTab === 'bundles'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Package className="w-3.5 h-3.5 text-purple-400" />
            <span>Curated Study Bundles (Save up to 66%)</span>
          </button>
        </div>

        <button
          onClick={() => setShowAiDiscovery(!showAiDiscovery)}
          className="text-xs font-bold text-slate-500 hover:text-blue-600 flex items-center gap-1.5 transition cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>{showAiDiscovery ? 'Hide AI Discovery' : 'Show AI Discovery'}</span>
        </button>
      </div>

      {activeMarketTab === 'bundles' ? (
        <div className="py-2">
          <StudyBundlesSection />
        </div>
      ) : (
        <>
          {/* Control Bar: Search with Search Icon & Button, Compare Button & Mobile Filter Toggle */}
      <div className="space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
          {/* Search Bar with Search Icon & Submit Button */}
          <div className="relative flex-1">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const gridEl = document.getElementById('marketplace-listings-grid');
                if (gridEl) {
                  gridEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="relative w-full flex items-center"
            >
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                id="marketplace-search-input"
                type="text"
                placeholder="Search books (Laxmikanth, Verma), topper notes, exams (UPSC, NEET), accessories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-26 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-2xs"
              />
              <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                {searchQuery && (
                  <button
                    type="button"
                    id="btn-clear-search-input"
                    onClick={() => setSearchQuery('')}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer"
                    title="Clear search"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="submit"
                  id="btn-marketplace-search-submit"
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shadow-xs cursor-pointer"
                  title="Search marketplace"
                  aria-label="Search"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search</span>
                </button>
              </div>
            </form>
          </div>

        {/* Controls: Compare Button, Filters trigger, Sort, View mode */}
        <div className="flex items-center gap-2.5 justify-between md:justify-end flex-wrap">
          {/* Compare Listings trigger */}
          <button
            id="btn-toolbar-compare"
            onClick={() => setIsCompareModalOpen(true)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-xs border ${
              comparisonList.length > 0
                ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Compare ({comparisonList.length}/3)</span>
          </button>

          {/* Mobile Filter Button */}
          <button
            id="btn-toggle-mobile-filters"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-slate-100 text-slate-800 rounded-xl text-xs font-bold border border-slate-200 hover:bg-slate-200 transition cursor-pointer"
          >
            <Filter className="w-3.5 h-3.5 text-blue-600" />
            <span>Filters ({activeFilterCount})</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
            <span className="hidden sm:inline text-slate-400">Sort:</span>
            <select
              id="select-sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label="Sort listings by"
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="featured">Featured / Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="ai-score">AI Score (Notes)</option>
              <option value="rating">Top Seller Rating</option>
            </select>
          </div>

          {/* Grid / List View Toggle */}
          <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              id="btn-view-grid"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition cursor-pointer ${
                viewMode === 'grid' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Grid View"
              aria-label="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              id="btn-view-list"
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition cursor-pointer ${
                viewMode === 'list' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Compact View"
              aria-label="Compact View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

        {/* Quick Search Tag Chips */}
        <div className="flex items-center gap-1.5 flex-wrap text-xs text-slate-500 px-1">
          <span className="font-semibold text-slate-600 flex items-center gap-1">
            <Search className="w-3 h-3 text-blue-600" />
            Popular Searches:
          </span>
          {[
            'M. Laxmikanth',
            'H.C. Verma',
            'NCERT Biology',
            'Casio FX-991EX',
            'Handwritten Notes',
            'R.S. Aggarwal',
            'Lucent GK',
            'Drafter'
          ].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleMarketplaceQuickSearch(tag)}
              className="inline-flex items-center gap-1 bg-white hover:bg-blue-50 hover:text-blue-700 text-slate-600 px-2.5 py-1 rounded-full border border-slate-200 shadow-2xs text-[11px] font-medium transition cursor-pointer"
            >
              <span>{tag}</span>
            </button>
          ))}
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-[11px] text-red-600 hover:text-red-700 underline font-medium ml-1 cursor-pointer"
            >
              Clear search query
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Advanced Sidebar Filters + Listings Results */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Filter Sidebar */}
        <aside
          id="marketplace-filter-sidebar"
          className={`lg:block ${
            mobileFilterOpen ? 'block' : 'hidden'
          } bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-sm text-slate-900">Advanced Filters</h3>
            </div>
            {activeFilterCount > 0 && (
              <button
                id="btn-reset-filters"
                onClick={resetFilters}
                className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Reset ({activeFilterCount})
              </button>
            )}
          </div>

          {/* 1. Category Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Resource Category
            </label>
            <div className="space-y-1">
              {(['All', 'Books', 'Handwritten Notes', 'Study Accessories'] as const).map((cat) => (
                <button
                  key={cat}
                  id={`filter-cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setSelectedCategoryFilter(cat)}
                  className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center justify-between ${
                    selectedCategoryFilter === cat
                      ? 'bg-blue-50 text-blue-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{cat}</span>
                  {selectedCategoryFilter === cat && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Item Condition Filter (Advanced) */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Item Condition
            </label>
            <div className="flex flex-col gap-1">
              {[
                { label: 'All Conditions', value: 'All' },
                { label: 'New (Unused/Sealed)', value: 'New' },
                { label: 'Used - Like New', value: 'Used - Like New' },
                { label: 'Used - Good', value: 'Used - Good' },
                { label: 'Used - Fair', value: 'Used - Fair' },
              ].map((cond) => (
                <button
                  key={cond.value}
                  id={`filter-condition-${cond.value.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setSelectedCondition(cond.value as any)}
                  className={`py-1.5 px-2.5 rounded-xl text-xs font-medium border text-left flex items-center justify-between transition cursor-pointer ${
                    selectedCondition === cond.value
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs font-semibold'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span>{cond.label}</span>
                  {selectedCondition === cond.value && <span className="text-white text-xs">✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Seller Rating Filter (Advanced) */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Seller Rating
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { label: 'All Ratings', min: 0 },
                { label: '3+ Stars', min: 3 },
                { label: '4+ Stars', min: 4 },
                { label: '4.5+ Stars', min: 4.5 },
              ].map((ratingOption) => (
                <button
                  key={ratingOption.min}
                  id={`filter-rating-${ratingOption.min}`}
                  onClick={() => setMinRating(ratingOption.min)}
                  className={`py-1.5 px-2 rounded-xl text-xs font-medium border text-center transition cursor-pointer flex items-center justify-center space-x-1 ${
                    minRating === ratingOption.min
                      ? 'bg-amber-500 text-white border-amber-500 shadow-xs font-bold'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {ratingOption.min > 0 && <Star className="w-3 h-3 fill-current" />}
                  <span>{ratingOption.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Handwritten Notes Sub-Categories: Subject & Creator */}
          <div className="space-y-3 pt-3 border-t border-slate-100 bg-indigo-50/40 p-3 rounded-2xl border border-indigo-100/60">
            <div className="flex items-center space-x-1.5 text-indigo-900 font-bold text-xs">
              <PenTool className="w-3.5 h-3.5 text-indigo-600" />
              <span>Handwritten Notes Filters</span>
            </div>

            {/* Notes by Subject */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-600 block">
                Filter by Subject
              </label>
              <select
                id="select-notes-subject"
                value={selectedNotesSubject}
                onChange={(e) => setSelectedNotesSubject(e.target.value)}
                aria-label="Filter handwritten notes by subject"
                className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {notesSubjects.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub === 'All' ? 'All Subjects' : sub}
                  </option>
                ))}
              </select>
            </div>

            {/* Notes by Creator */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-600 block">
                Filter by Creator
              </label>
              <select
                id="select-notes-creator"
                value={selectedCreator}
                onChange={(e) => setSelectedCreator(e.target.value)}
                aria-label="Filter handwritten notes by creator"
                className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {noteCreators.map((creator) => (
                  <option key={creator} value={creator}>
                    {creator === 'All' ? 'All Note Creators' : creator}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 5. Study Accessories Sub-Categories */}
          <div className="space-y-2 pt-3 border-t border-slate-100 bg-blue-50/40 p-3 rounded-2xl border border-blue-100/60">
            <div className="flex items-center space-x-1.5 text-blue-900 font-bold text-xs">
              <Wrench className="w-3.5 h-3.5 text-blue-600" />
              <span>Study Accessories Sub-types</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {accessorySubCategories.map((subCat) => (
                <button
                  key={subCat}
                  id={`filter-accessory-${subCat.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setSelectedSubCategory(subCat)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer border ${
                    selectedSubCategory === subCat
                      ? 'bg-blue-600 text-white border-blue-600 font-semibold'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {subCat}
                </button>
              ))}
            </div>
          </div>

          {/* 6. Target Exam Filter */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Target Exam
            </label>
            <select
              id="select-exam-filter"
              value={selectedExamFilter}
              onChange={(e) => setSelectedExamFilter(e.target.value as any)}
              aria-label="Filter by target exam"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="All">All Exams ({listings.length} items)</option>
              {EXAM_CATEGORIES.map((exam) => (
                <option key={exam.id} value={exam.id}>
                  {exam.name}
                </option>
              ))}
            </select>
          </div>

          {/* 7. Location Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Campus / City
            </label>
            <select
              id="select-location-filter"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              aria-label="Filter by campus or city"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc === 'All' ? 'All Locations (Kolkata & Zones)' : loc}
                </option>
              ))}
            </select>
          </div>

          {/* 8. Price Range Slider */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold uppercase tracking-wider text-slate-500">
                Max Price
              </label>
              <span className="font-extrabold text-blue-600">₹{maxPrice}</span>
            </div>
            <input
              id="input-price-range"
              type="range"
              min={50}
              max={2500}
              step={50}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              aria-label="Maximum price range slider"
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>₹50</span>
              <span>₹1,250</span>
              <span>₹2,500</span>
            </div>
          </div>

          {/* 9. AI Note Quality Score Filter */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold uppercase tracking-wider text-purple-600 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-purple-600" />
                Min AI Score
              </label>
              <span className="font-extrabold text-purple-700">{minAiScore > 0 ? `${minAiScore}+` : 'Any'}</span>
            </div>
            <div className="flex gap-1.5">
              {[0, 85, 90, 95].map((score) => (
                <button
                  key={score}
                  id={`filter-ai-score-${score}`}
                  onClick={() => setMinAiScore(score)}
                  className={`flex-1 py-1 text-xs rounded-lg font-bold border transition cursor-pointer ${
                    minAiScore === score
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {score === 0 ? 'All' : `${score}+`}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Listings Display Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Active Filter Pills Bar */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 font-medium">Applied Filters:</span>
              {selectedExamFilter !== 'All' && (
                <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-semibold border border-blue-200">
                  Exam: {selectedExamFilter}
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-blue-900" 
                    onClick={() => setSelectedExamFilter('All')} 
                  />
                </span>
              )}
              {selectedCategoryFilter !== 'All' && (
                <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full font-semibold border border-indigo-200">
                  Category: {selectedCategoryFilter}
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-indigo-900" 
                    onClick={() => setSelectedCategoryFilter('All')} 
                  />
                </span>
              )}
              {selectedCondition !== 'All' && (
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-semibold border border-emerald-200">
                  Condition: {selectedCondition}
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-emerald-900" 
                    onClick={() => setSelectedCondition('All')} 
                  />
                </span>
              )}
              {minRating > 0 && (
                <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 px-2.5 py-1 rounded-full font-semibold border border-amber-200">
                  Rating: {minRating}+ ★
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-amber-950" 
                    onClick={() => setMinRating(0)} 
                  />
                </span>
              )}
              {selectedSubCategory !== 'All' && (
                <span className="inline-flex items-center gap-1 bg-sky-50 text-sky-700 px-2.5 py-1 rounded-full font-semibold border border-sky-200">
                  Accessory: {selectedSubCategory}
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-sky-900" 
                    onClick={() => setSelectedSubCategory('All')} 
                  />
                </span>
              )}
              {selectedNotesSubject !== 'All' && (
                <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full font-semibold border border-purple-200">
                  Subject: {selectedNotesSubject}
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-purple-900" 
                    onClick={() => setSelectedNotesSubject('All')} 
                  />
                </span>
              )}
              {selectedCreator !== 'All' && (
                <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-800 px-2.5 py-1 rounded-full font-semibold border border-indigo-200">
                  Creator: {selectedCreator}
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-indigo-950" 
                    onClick={() => setSelectedCreator('All')} 
                  />
                </span>
              )}
              {selectedLocation !== 'All' && (
                <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full font-semibold">
                  Location: {selectedLocation}
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-slate-900" 
                    onClick={() => setSelectedLocation('All')} 
                  />
                </span>
              )}
              {minAiScore > 0 && (
                <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full font-semibold border border-purple-200">
                  AI Score: {minAiScore}+
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-purple-900" 
                    onClick={() => setMinAiScore(0)} 
                  />
                </span>
              )}
              <button
                id="btn-clear-all-filters"
                onClick={resetFilters}
                className="text-slate-500 hover:text-slate-800 underline font-medium cursor-pointer ml-1"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Results Count & Meta */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Showing <strong>{filteredListings.length}</strong> study resources</span>
            <span>Average student savings: <strong>~65%</strong></span>
          </div>

          {/* Smart Search Notification when items exist in other exams/categories */}
          {filteredListings.length === 0 && globalSearchMatches.length > 0 && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/90 rounded-2xl p-4.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-slate-800 shadow-xs">
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-blue-950">
                    Found {globalSearchMatches.length} matching resources across other categories!
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Your active filters ({selectedExamFilter !== 'All' ? `Exam: ${selectedExamFilter}` : ''} {selectedCategoryFilter !== 'All' ? `Category: ${selectedCategoryFilter}` : ''}) filtered these out.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedExamFilter('All');
                  setSelectedCategoryFilter('All');
                  setSelectedCondition('All');
                  setSelectedLocation('All');
                  setSelectedSubCategory('All');
                  setSelectedNotesSubject('All');
                  setSelectedCreator('All');
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition shadow-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Show All {globalSearchMatches.length} Matches</span>
              </button>
            </div>
          )}

          {/* Listings Grid or Empty State */}
          {filteredListings.length > 0 ? (
            <div
              id="marketplace-listings-grid"
              className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                  : 'grid-cols-1'
              }`}
            >
              {filteredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 space-y-4 max-w-md mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <Search className="w-7 h-7" />
              </div>
              {searchQuery ? (
                <>
                  <h3 className="text-lg font-bold text-slate-900">
                    No resources found for &quot;{searchQuery}&quot;
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Try checking for typos or searching by author name (e.g. Laxmikanth, H.C. Verma), exam (e.g. UPSC, NEET, JEE), or category.
                  </p>
                  <div className="flex items-center justify-center gap-2 pt-2">
                    <button
                      id="btn-reset-filters-empty"
                      onClick={() => setSearchQuery('')}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-1.5"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Clear Search</span>
                    </button>
                    <button
                      onClick={resetFilters}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs px-5 py-2.5 rounded-xl transition cursor-pointer"
                    >
                      Reset All Filters
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-bold text-slate-900">No resources match your filters</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    We couldn&apos;t find items matching your condition, rating, or sub-category criteria. Try relaxing your filters or resetting them.
                  </p>
                  <button
                    id="btn-reset-filters-empty"
                    onClick={resetFilters}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-6 py-2.5 rounded-xl transition cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
        </>
      )}
    </div>
  );
};
