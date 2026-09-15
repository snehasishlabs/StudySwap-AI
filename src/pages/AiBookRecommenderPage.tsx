import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Search, 
  ArrowRight, 
  IndianRupee, 
  CheckCircle2, 
  Layers, 
  Calendar,
  Loader2,
  TrendingDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EXAM_CATEGORIES } from '../data/mockData';
import { ExamCategory } from '../types';

export const AiBookRecommenderPage: React.FC = () => {
  const { navigateTo, setSearchQuery, setSelectedExamFilter } = useApp();

  const [exam, setExam] = useState<ExamCategory>('SSC');
  const [subject, setSubject] = useState('Quantitative Aptitude & Reasoning');
  const [stage, setStage] = useState('Intermediate (Cleared basics, targeting speed)');
  const [budget, setBudget] = useState('₹600');
  const [isLoading, setIsLoading] = useState(false);

  const [recommendations, setRecommendations] = useState<any | null>({
    exam: 'SSC CGL 2027',
    subject: 'Quantitative Aptitude',
    books: [
      {
        title: 'Quantitative Aptitude for Competitive Examinations',
        author: 'Dr. R.S. Aggarwal',
        importance: 'Primary Core Textbook',
        retailPrice: 750,
        studySwapPrice: 300,
        whyRecommended: 'The gold standard for formula definitions, arithmetic speed shortcuts, and chapter-wise progressive problem levels.',
      },
      {
        title: 'SSC Mathematics Chapterwise Solved Papers (1999-Present)',
        author: 'Kiran Publication',
        importance: 'Must-Have PYQ Compendium',
        retailPrice: 650,
        studySwapPrice: 280,
        whyRecommended: 'Essential for recognizing repeating question patterns across SSC CGL, CHSL, and CPO shifts.',
      },
      {
        title: 'Advance Maths for General Competitions',
        author: 'Rakesh Yadav',
        importance: 'Geometry & Trigonometry Mastery',
        retailPrice: 550,
        studySwapPrice: 220,
        whyRecommended: 'Best visual diagrams and bilingual shortcut tricks for coordinate geometry and mensuration.',
      },
    ],
    highYieldTopics: [
      'Percentage, Profit & Loss (3-4 questions per shift)',
      'Time, Speed & Distance / Train problems',
      'Algebra & Trigonometric Identities',
      'Data Interpretation (Bar Graphs & Pie Charts)',
    ],
    handwrittenNotesAdvice:
      'Buy verified handwritten formula sheets for daily morning 15-minute formula drills rather than making notes from scratch, saving ~40 hours of prep time.',
    totalRetailCost: 1950,
    totalStudySwapCost: 800,
    totalSavings: 1150,
  });

  const handleRecommend = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/recommend-books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exam,
          subject,
          stage,
          budget,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setRecommendations(data);
      } else {
        throw new Error('API failed');
      }
    } catch {
      // Fallback
      setRecommendations({
        exam,
        subject,
        books: [
          {
            title: `Standard Core Guide for ${exam}`,
            author: 'Leading Academic Author',
            importance: 'Primary Syllabus Backbone',
            retailPrice: 650,
            studySwapPrice: 250,
            whyRecommended: `Covers 100% of ${subject} requirements for ${exam} with chapter end mock questions.`,
          },
          {
            title: '15-Year Solved Previous Year Question Bank',
            author: 'Exam Board Compendium',
            importance: 'Speed & Accuracy Drill',
            retailPrice: 550,
            studySwapPrice: 200,
            whyRecommended: 'Replicates real exam weightage and negative marking traps.',
          },
        ],
        highYieldTopics: [
          'High frequency core fundamentals',
          'Syllabus chapters with 35%+ mark weightage',
          'Previous 5 years recurring question patterns',
        ],
        handwrittenNotesAdvice:
          'Complement textbooks with pre-owned topper notes on StudySwap for rapid last-month revision.',
        totalRetailCost: 1200,
        totalStudySwapCost: 450,
        totalSavings: 750,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchBookInMarketplace = (bookTitle: string) => {
    setSearchQuery(bookTitle.split(' ')[0]);
    setSelectedExamFilter(exam);
    navigateTo('marketplace');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-200 text-xs font-bold px-3 py-1 rounded-full border border-blue-400/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>AI Curriculum & Budget Advisor</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            AI Book & Resource Recommender
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
            Get personalized textbook recommendations, PYQ compilations, and exact budget cost-comparisons tailored to your target exam.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-center shrink-0">
          <span className="text-[10px] uppercase font-bold text-blue-200 block">Average Savings</span>
          <span className="text-2xl font-black text-emerald-300">~62% Saved</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column (4 cols) */}
        <form
          onSubmit={handleRecommend}
          className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-5"
        >
          <h2 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>Your Prep Profile</span>
          </h2>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Target Exam
            </label>
            <select
              value={exam}
              onChange={(e) => setExam(e.target.value as any)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {EXAM_CATEGORIES.map((ex) => (
                <option key={ex.id} value={ex.id}>
                  {ex.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Subject / Paper
            </label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Preparation Stage
            </label>
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Beginner (Starting from scratch)">Beginner (Starting from scratch)</option>
              <option value="Intermediate (Cleared basics, targeting speed)">Intermediate (Targeting speed)</option>
              <option value="Advanced (Final 60 days mock test revision)">Advanced (Mock test revision)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Max Resource Budget
            </label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Under ₹500">Under ₹500 (Economy)</option>
              <option value="₹500 - ₹1,000">₹500 - ₹1,000 (Standard)</option>
              <option value="₹1,000 - ₹2,000">₹1,000 - ₹2,000 (Comprehensive)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-md shadow-blue-500/20 text-xs flex items-center justify-center gap-2 transition cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating Roadmap...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Smart Recommendation</span>
              </>
            )}
          </button>
        </form>

        {/* Recommendations Result (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {recommendations && (
            <div className="space-y-6">
              {/* Savings Summary Banner */}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 text-white shadow-md flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-emerald-200 text-xs font-bold uppercase">
                    Cost Savings Breakdown
                  </span>
                  <h3 className="text-xl font-bold">
                    Buy on StudySwap vs New Retail MRP
                  </h3>
                  <p className="text-xs text-emerald-100">
                    Retail: ₹{recommendations.totalRetailCost} • StudySwap: <strong>₹{recommendations.totalStudySwapCost}</strong>
                  </p>
                </div>

                <div className="text-right bg-white/10 px-4 py-2 rounded-2xl border border-white/20">
                  <span className="text-2xl sm:text-3xl font-black text-amber-300">
                    ₹{recommendations.totalSavings}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-emerald-100 block">Total Saved</span>
                </div>
              </div>

              {/* Recommended Books List */}
              <div className="space-y-4">
                <h3 className="font-extrabold text-lg text-slate-900">
                  Recommended Textbooks & Compendiums
                </h3>

                <div className="space-y-3">
                  {recommendations.books.map((b: any, idx: number) => (
                    <div
                      key={idx}
                      className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs hover:border-blue-300 transition space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
                            {b.importance}
                          </span>
                          <h4 className="font-bold text-base text-slate-900 mt-1">
                            {b.title}
                          </h4>
                          <p className="text-xs text-slate-500">by {b.author}</p>
                        </div>

                        <div className="text-left sm:text-right shrink-0">
                          <div className="flex sm:flex-col items-baseline sm:items-end gap-2 sm:gap-0">
                            <span className="text-lg font-black text-slate-900">
                              ₹{b.studySwapPrice}
                            </span>
                            <span className="text-xs text-slate-400 line-through">
                              ₹{b.retailPrice} MRP
                            </span>
                          </div>
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 mt-0.5 inline-block">
                            Save {Math.round(((b.retailPrice - b.studySwapPrice) / b.retailPrice) * 100)}%
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
                        {b.whyRecommended}
                      </p>

                      <div className="flex justify-end pt-1">
                        <button
                          onClick={() => handleSearchBookInMarketplace(b.title)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition cursor-pointer"
                        >
                          <Search className="w-3.5 h-3.5" />
                          <span>Check Marketplace Availability for "{b.author}" &rarr;</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* High-Yield Topics */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
                <h4 className="font-bold text-sm uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600" />
                  High-Yield Scoring Topics for {exam}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {recommendations.highYieldTopics.map((topic: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl text-xs text-slate-700 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
