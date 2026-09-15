import React from 'react';
import { Leaf, BookOpen, ShieldCheck, Sparkles, Users, Award, IndianRupee } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Our Academic Mission
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Democratizing Competitive Exam Prep Through Circular Exchange
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Every year in India, over 2.5 crore students spend hard-earned family savings buying expensive standard reference books that end up gathering dust after exams. StudySwap gives these books a second life.
        </p>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <IndianRupee className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-900">Affordability First</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Standard prep kits (UPSC, GATE, JEE) cost ₹12,000–₹25,000 when bought brand new. StudySwap lowers this barrier by 60–80% through peer-to-peer campus exchanges.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-900">AI Quality Verification</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We eliminate buyer uncertainty. Google Gemini evaluates topper handwritten notes on readability, syllabus completeness, and high-frequency exam questions before you buy.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Leaf className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-900">Zero Paper Waste</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every re-circulated book prevents new paper manufacturing emissions and deforestation. Over 12,400 kg of paper has been kept in circulation so far.
          </p>
        </div>
      </div>

      {/* Tech Stack Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl space-y-6">
        <div className="space-y-1 text-center max-w-xl mx-auto">
          <h3 className="text-xl font-bold">Engineered for Hackathon Impact</h3>
          <p className="text-xs text-slate-400">
            Full-stack modern tech stack designed for speed, security, and global scalability.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs">
          <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
            <span className="font-bold text-blue-400 block text-sm">React + Vite</span>
            <span className="text-slate-400 text-[11px]">Instant client-side interactivity</span>
          </div>
          <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
            <span className="font-bold text-purple-400 block text-sm">Gemini 3.8 Flash</span>
            <span className="text-slate-400 text-[11px]">Secure server-side AI evaluation</span>
          </div>
          <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
            <span className="font-bold text-emerald-400 block text-sm">Supabase / SQL</span>
            <span className="text-slate-400 text-[11px]">PostgreSQL relational storage</span>
          </div>
          <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
            <span className="font-bold text-cyan-400 block text-sm">OpenStreetMap</span>
            <span className="text-slate-400 text-[11px]">Campus safe handoff points</span>
          </div>
        </div>
      </div>

      <div className="text-center pt-4">
        <button
          onClick={() => navigateTo('marketplace')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-8 py-3.5 rounded-2xl shadow-md transition cursor-pointer"
        >
          Join StudySwap & Browse Resources
        </button>
      </div>
    </div>
  );
};
