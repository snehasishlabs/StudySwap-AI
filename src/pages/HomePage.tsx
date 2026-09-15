import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  BookOpen, 
  FileText, 
  Headphones, 
  Compass, 
  Star, 
  CheckCircle2, 
  IndianRupee, 
  TrendingUp, 
  Zap, 
  Users,
  MapPin,
  Layers,
  Award,
  ChevronRight,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EXAM_CATEGORIES } from '../data/mockData';
import { ListingCard } from '../components/marketplace/ListingCard';
import { SustainabilityImpactSection } from '../components/marketplace/SustainabilityImpactSection';
import { StudentSavingsCalculator } from '../components/common/StudentSavingsCalculator';
import { ListingCategory, ExamCategory } from '../types';

export const HomePage: React.FC = () => {
  const { 
    listings, 
    navigateTo, 
    switchToBuyerDemo, 
    switchToSellerDemo, 
    currentUser,
    searchQuery,
    setSearchQuery,
    setSelectedExamFilter,
    setSelectedCategoryFilter
  } = useApp();

  const [activeCategoryTab, setActiveCategoryTab] = useState<ListingCategory | 'All'>('All');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedExamFilter('All');
    setSelectedCategoryFilter('All');
    navigateTo('marketplace');
  };

  const handleQuickSearch = (term: string) => {
    setSearchQuery(term);
    setSelectedExamFilter('All');
    setSelectedCategoryFilter('All');
    navigateTo('marketplace');
  };

  const handleCategoryClick = (examId: ExamCategory) => {
    setSelectedExamFilter(examId);
    navigateTo('marketplace');
  };

  const handleTabClick = (tab: ListingCategory | 'All') => {
    setActiveCategoryTab(tab);
    setSelectedCategoryFilter(tab);
  };

  const filteredFeaturedListings = listings.filter(item => {
    if (activeCategoryTab === 'All') return true;
    return item.category === activeCategoryTab;
  });

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12 sm:pb-20 bg-gradient-to-b from-blue-50/70 via-indigo-50/40 to-slate-50">
        {/* Subtle decorative background circles */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-400/10 blur-3xl" />
          <div className="absolute top-20 -right-32 w-96 h-96 rounded-full bg-purple-400/15 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-xs font-bold px-3.5 py-1.5 rounded-full border border-blue-200/80 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>India's 1st AI-Assisted Student Exchange Network</span>
            </div>

            {/* Exact Required Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Buy, Sell & Exchange Study Resources <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Smarter</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Connect directly with verified students and exam toppers near your campus. Second-hand standard textbooks, AI-evaluated handwritten notes, and study gear at 60–80% off retail prices.
            </p>

            {/* Main Search Bar */}
            <div className="max-w-2xl mx-auto space-y-2.5">
              <form 
                onSubmit={handleHeroSearch} 
                className="bg-white p-2 rounded-2xl shadow-xl shadow-blue-900/5 border border-slate-200/90 flex flex-col sm:flex-row items-center gap-2"
              >
                <div className="flex items-center gap-3 px-3 flex-1 w-full relative">
                  <Search className="w-5 h-5 text-blue-600 shrink-0" />
                  <input
                    id="hero-search-input"
                    type="text"
                    placeholder="Search books (R.S. Aggarwal, Lucent), topper notes, exams..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-slate-900 placeholder-slate-400 text-sm focus:outline-none py-2 bg-transparent pr-7"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 text-slate-400 hover:text-slate-600 p-1"
                      aria-label="Clear search text"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  id="hero-search-submit-btn"
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-md shadow-blue-500/20 transition cursor-pointer flex items-center justify-center gap-2 shrink-0"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Resources</span>
                </button>
              </form>

              {/* Popular quick searches with Search icons */}
              <div className="flex items-center justify-center flex-wrap gap-1.5 text-xs text-slate-500 pt-1">
                <span className="font-semibold text-slate-600 mr-1 flex items-center gap-1">
                  <Search className="w-3 h-3 text-blue-600" />
                  Popular:
                </span>
                {[
                  'M. Laxmikanth',
                  'H.C. Verma',
                  'NCERT Biology',
                  'Casio FX-991EX',
                  'Handwritten Notes',
                  'R.S. Aggarwal'
                ].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => handleQuickSearch(term)}
                    className="inline-flex items-center gap-1 bg-white/80 hover:bg-white text-slate-700 hover:text-blue-600 px-2.5 py-1 rounded-full border border-slate-200/80 shadow-2xs transition text-[11px] font-medium cursor-pointer"
                  >
                    <span>{term}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Two Demo-Entry Buttons */}
            <div className="pt-2 max-w-xl mx-auto">
              <div className="bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xl shadow-blue-950/5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-500">
                    Instant Platform Access • Choose Your Demo Role
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    No Sign Up Required
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    id="hero-buyer-demo-btn"
                    onClick={() => switchToBuyerDemo('marketplace')}
                    className="w-full group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm sm:text-base px-5 py-3.5 rounded-xl shadow-md shadow-blue-600/20 hover:shadow-lg transition cursor-pointer flex items-center justify-center gap-2.5 text-center"
                  >
                    <BookOpen className="w-4 h-4 text-blue-200 group-hover:scale-110 transition shrink-0" />
                    <span>Continue as Buyer Demo</span>
                  </button>

                  <button
                    id="hero-seller-demo-btn"
                    onClick={() => switchToSellerDemo('seller-dashboard')}
                    className="w-full group bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white font-bold text-sm sm:text-base px-5 py-3.5 rounded-xl shadow-md shadow-purple-600/20 hover:shadow-lg transition cursor-pointer flex items-center justify-center gap-2.5 text-center"
                  >
                    <Star className="w-4 h-4 fill-amber-300 text-amber-300 group-hover:scale-110 transition shrink-0" />
                    <span>Continue as Seller Demo</span>
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5 px-0.5">
                  <span>Browse 1,200+ textbooks & notes</span>
                  <span>List materials & earn money</span>
                </div>
              </div>
            </div>

            {/* Trust highlights */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-semibold text-slate-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Student Sellers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>AI Note Quality Scoring</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>Campus Safe Handoffs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <IndianRupee className="w-4 h-4 text-amber-600" />
                <span>Average 68% Cost Savings</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Exam Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Targeted Preparation
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Competitive Exam Categories
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Select your target exam to explore dedicated syllabi books, topper summaries, and mock test compilations.
            </p>
          </div>

          <button
            onClick={() => navigateTo('marketplace')}
            className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700 transition cursor-pointer shrink-0"
          >
            <span>Explore All 9 Exams</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 9 Exam Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
          {EXAM_CATEGORIES.map((exam) => (
            <button
              key={exam.id}
              onClick={() => handleCategoryClick(exam.id as ExamCategory)}
              className="bg-white hover:bg-blue-50/70 border border-slate-200/80 hover:border-blue-300 rounded-2xl p-3.5 text-center transition-all duration-200 shadow-xs hover:shadow-md group cursor-pointer flex flex-col items-center justify-between min-h-[110px]"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-100 to-indigo-100 text-blue-700 flex items-center justify-center font-black text-sm group-hover:scale-110 group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white transition">
                {exam.id.slice(0, 3)}
              </div>
              <div className="mt-2">
                <span className="font-bold text-xs text-slate-900 block group-hover:text-blue-600 transition truncate">
                  {exam.id}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  {exam.count}+ items
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Listings Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
              Handpicked Deals
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Study Resources
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Top-rated standard books and AI-certified topper handwritten notes available for immediate pickup.
            </p>
          </div>

          {/* Listing Category Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl overflow-x-auto">
            {(['All', 'Books', 'Handwritten Notes', 'Study Accessories'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  activeCategoryTab === tab
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFeaturedListings.slice(0, 8).map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>

        {/* View all button */}
        <div className="mt-10 text-center">
          <button
            onClick={() => navigateTo('marketplace')}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-8 py-3.5 rounded-2xl shadow-md transition cursor-pointer"
          >
            <span>Browse All {listings.length} Marketplace Listings</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="bg-gradient-to-b from-indigo-900 via-slate-900 to-slate-950 text-white py-16 sm:py-24 rounded-3xl mx-4 sm:mx-8 px-6 sm:px-12 shadow-2xl relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full border border-indigo-500/30 uppercase tracking-wider">
              Powered by Google Gemini 3.8
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              AI Built Specifically For Academic Resources
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              No more guessing note quality or buying useless pirated PDFs. Our intelligent models evaluate, verify, and match the exact resources you need to clear your exam.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: AI Note Analyzer */}
            <div className="bg-slate-800/70 border border-slate-700/80 rounded-3xl p-6 flex flex-col justify-between hover:border-purple-500/60 transition group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30 group-hover:scale-110 transition">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl text-white">AI Note Analyzer</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Upload or paste handwritten notes before listing or buying. Analyzes <strong>Readability</strong>, <strong>Completeness</strong>, <strong>Organization</strong>, and <strong>Topic Coverage</strong> with an instant 0–100 quality score.
                </p>

                <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-700 text-xs space-y-2">
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Readability & Handwriting:</span>
                    <strong className="text-emerald-400">94/100</strong>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-emerald-400 h-full w-[94%]" />
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Topic & Formula Coverage:</span>
                    <strong className="text-purple-400">92/100</strong>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-purple-400 h-full w-[92%]" />
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigateTo('ai-analyzer')}
                className="mt-6 w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Analyze Notes Now</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Feature 2: AI Book Recommendation System */}
            <div className="bg-slate-800/70 border border-slate-700/80 rounded-3xl p-6 flex flex-col justify-between hover:border-blue-500/60 transition group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30 group-hover:scale-110 transition">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl text-white">AI Book Recommendation</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Enter your target Exam (e.g. SSC CGL or UPSC) and Subject. Gemini generates a targeted high-yield syllabus roadmap, must-read textbooks, and budget savings calculation.
                </p>

                <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-700 text-xs space-y-1.5">
                  <div className="text-[11px] text-blue-300 font-bold uppercase">Sample Recommendation:</div>
                  <p className="text-white font-semibold truncate">R.S. Aggarwal Quant + Kiran Solved PYQs</p>
                  <p className="text-slate-400 text-[11px]">Saves ~62% cost on StudySwap with 90-day timetable.</p>
                </div>
              </div>

              <button
                onClick={() => navigateTo('ai-recommender')}
                className="mt-6 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Get Book Roadmap</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Feature 3: SwapGuru AI Study Assistant */}
            <div className="bg-slate-800/70 border border-slate-700/80 rounded-3xl p-6 flex flex-col justify-between hover:border-cyan-500/60 transition group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30 group-hover:scale-110 transition">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl text-white">AI Study Assistant</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Interactive 24/7 exam advisor "SwapGuru". Ask which edition of Laxmikanth to pick, how to split syllabus across months, or negotiate fair book prices with sellers.
                </p>

                <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-700 text-xs space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-cyan-300 font-bold">Online & Responsive:</span>
                  </div>
                  <p className="text-slate-300 italic text-[11px]">
                    "Rahul, for SSC CGL Quant, start with arithmetic ratio & percentage shortcuts..."
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigateTo('ai-assistant')}
                className="mt-6 w-full py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Chat with SwapGuru</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How StudySwap Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Simple 3-Step Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How StudySwap Works
          </h2>
          <p className="text-sm text-slate-500">
            Designed to make exchanging study materials fast, transparent, and student-safe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs relative flex flex-col items-start space-y-4">
            <span className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 font-extrabold flex items-center justify-center text-base border border-blue-200">
              01
            </span>
            <h3 className="font-bold text-lg text-slate-900">List or Discover Resources</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Sellers upload photos and details of cleared-exam books or notes in 60 seconds. Buyers search and filter by exam, subject, city, and budget.
            </p>
            <div className="text-xs font-semibold text-blue-600">
              ✓ Free listing & zero seller fee
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs relative flex flex-col items-start space-y-4">
            <span className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 font-extrabold flex items-center justify-center text-base border border-purple-200">
              02
            </span>
            <h3 className="font-bold text-lg text-slate-900">AI Quality & Score Verification</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our Gemini Note Analyzer scores readability and syllabus coverage so buyers get verified high-yield material, not incomplete random pages.
            </p>
            <div className="text-xs font-semibold text-purple-600">
              ✓ 90+ Score Gold Certification
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs relative flex flex-col items-start space-y-4">
            <span className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 font-extrabold flex items-center justify-center text-base border border-emerald-200">
              03
            </span>
            <h3 className="font-bold text-lg text-slate-900">Campus Handoff or Delivery</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Chat directly, negotiate price, and arrange a safe physical meetup at college gates, metro stations, or opt for courier shipping.
            </p>
            <div className="text-xs font-semibold text-emerald-600">
              ✓ OpenStreetMap campus points
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Impact Counter */}
      <SustainabilityImpactSection />

      {/* Student Savings Calculator Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
        <StudentSavingsCalculator />
      </section>

      {/* Testimonials */}
      <section className="bg-slate-100/70 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Student Community
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Loved by Aspirants Across India
            </h2>
            <p className="text-sm text-slate-500">
              Real feedback from students who cleared prelims, saved money, and passed on their study materials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Review 1 */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "I was struggling to afford new UPSC standard books which cost ₹8,000+. On StudySwap, I got Laxmikanth, Spectrum History, and Shankar IAS notes for ₹2,400 total directly from a candidate at College Street!"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Sneha M."
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-xs text-slate-900">Sneha Mukherjee</h4>
                  <p className="text-[11px] text-slate-500">UPSC CSE Aspirant • Kolkata</p>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "After clearing SSC CGL Tier 1, I sold all my quantitative books and self-made reasoning notes in just 4 days. Priya's notes had an AI score of 92 which gave buyers instant confidence."
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Arjun K."
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-xs text-slate-900">Arjun Karmakar</h4>
                  <p className="text-[11px] text-slate-500">SSC CGL Qualified • Delhi</p>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "The campus meetup feature using OpenStreetMap is so convenient. Met the seller right outside Jadavpur University 8B stand, inspected the Casio fx-991EX calculator, and paid ₹450!"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                  alt="Tanmoy S."
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-xs text-slate-900">Tanmoy Sen</h4>
                  <p className="text-[11px] text-slate-500">GATE CS Aspirant • Kolkata</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-black">
              Ready to clear your exams without breaking the bank?
            </h3>
            <p className="text-blue-100 text-sm max-w-xl">
              Join thousands of students buying and selling verified study material today.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => navigateTo('marketplace')}
              className="bg-white text-blue-900 hover:bg-blue-50 font-bold text-sm px-6 py-3 rounded-xl shadow-md transition cursor-pointer"
            >
              Browse Marketplace
            </button>
            <button
              onClick={() => {
                switchToSellerDemo();
                navigateTo('add-listing');
              }}
              className="bg-purple-900/60 hover:bg-purple-900 text-white font-bold text-sm px-6 py-3 rounded-xl border border-white/20 transition cursor-pointer"
            >
              Post a Listing
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
