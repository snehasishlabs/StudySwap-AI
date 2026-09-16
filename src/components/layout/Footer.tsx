import React from 'react';
import { BookOpen, Sparkles, Heart, Shield, Leaf, Database, Terminal, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EXAM_CATEGORIES } from '../../data/mockData';
import { ThemeToggleButton } from '../common/ThemeToggleButton';

export const Footer: React.FC = () => {
  const { navigateTo, setSelectedExamFilter } = useApp();

  const handleExamClick = (examId: string) => {
    setSelectedExamFilter(examId as any);
    navigateTo('marketplace');
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sustainability & Impact Banner */}
        <div className="bg-gradient-to-r from-blue-900/60 via-indigo-900/60 to-purple-900/60 border border-blue-700/40 rounded-3xl p-6 sm:p-8 mb-16 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg flex items-center gap-2">
                  Circular Student Economy Impact
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Eco-Verified
                  </span>
                </h4>
                <p className="text-slate-300 text-sm mt-0.5">
                  Every pre-owned book and shared handwritten note saves student money and stops paper wastage.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 text-center w-full md:w-auto">
              <div className="bg-slate-800/60 rounded-xl px-4 py-3 border border-slate-700/60">
                <span className="block text-xl sm:text-2xl font-black text-white">₹14.8L+</span>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">Student Savings</span>
              </div>
              <div className="bg-slate-800/60 rounded-xl px-4 py-3 border border-slate-700/60">
                <span className="block text-xl sm:text-2xl font-black text-emerald-400">12,400 kg</span>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">Paper Saved</span>
              </div>
              <div className="bg-slate-800/60 rounded-xl px-4 py-3 border border-slate-700/60">
                <span className="block text-xl sm:text-2xl font-black text-cyan-400">2,950+</span>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">Books Exchanged</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-black text-2xl text-white tracking-tight">
                Study<span className="text-blue-400">Swap</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              The premier AI-powered marketplace built by students, for students. Buy, sell, and exchange verified reference books, topper handwritten notes, and exam prep gear smarter.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="bg-slate-800 text-blue-300 px-2.5 py-1 rounded-md border border-slate-700">
                OpenStreetMap Geolocation
              </span>
              <span className="bg-slate-800 text-purple-300 px-2.5 py-1 rounded-md border border-slate-700">
                Gemini 3.8 Flash AI
              </span>
              <span className="bg-slate-800 text-cyan-300 px-2.5 py-1 rounded-md border border-slate-700">
                Supabase / PostgreSQL
              </span>
            </div>
          </div>

          {/* Exam Hubs */}
          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Competitive Exams
            </h5>
            <ul className="space-y-2 text-sm text-slate-400">
              {EXAM_CATEGORIES.slice(0, 5).map(exam => (
                <li key={exam.id}>
                  <button
                    onClick={() => handleExamClick(exam.id)}
                    className="hover:text-blue-400 transition cursor-pointer text-left"
                  >
                    {exam.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              More Exams
            </h5>
            <ul className="space-y-2 text-sm text-slate-400">
              {EXAM_CATEGORIES.slice(5).map(exam => (
                <li key={exam.id}>
                  <button
                    onClick={() => handleExamClick(exam.id)}
                    className="hover:text-blue-400 transition cursor-pointer text-left"
                  >
                    {exam.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => navigateTo('marketplace')}
                  className="text-blue-400 font-medium hover:underline transition cursor-pointer"
                >
                  View All Marketplace &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* AI Features & Platform */}
          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              AI & Architecture
            </h5>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => navigateTo('ai-assistant')}
                  className="hover:text-indigo-400 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  SwapGuru AI Assistant
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('ai-analyzer')}
                  className="hover:text-purple-400 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  AI Note Analyzer
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('ai-recommender')}
                  className="hover:text-cyan-400 transition cursor-pointer"
                >
                  AI Book Advisor
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('db-schema')}
                  className="hover:text-emerald-400 transition flex items-center gap-1.5 cursor-pointer text-emerald-400/90 font-medium"
                >
                  <Database className="w-3.5 h-3.5" />
                  Supabase DB Schema
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('admin')}
                  className="hover:text-slate-200 transition cursor-pointer"
                >
                  Trust & Moderation
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & Theme Switcher */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} StudySwap Platform. Built for Student Success & Zero Waste.</p>
          <div className="flex items-center gap-5 flex-wrap">
            <button onClick={() => navigateTo('about')} className="hover:text-slate-300">About Us</button>
            <button onClick={() => navigateTo('contact')} className="hover:text-slate-300">Contact & Support</button>
            <button onClick={() => navigateTo('db-schema')} className="hover:text-slate-300">Database Specs</button>
            <div className="flex items-center gap-2 border-l border-slate-700 pl-4">
              <span className="text-slate-400 font-medium">Theme:</span>
              <ThemeToggleButton showLabel={true} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
