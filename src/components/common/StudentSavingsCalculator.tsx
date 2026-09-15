import React, { useState } from 'react';
import { IndianRupee, Calculator, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';

export const StudentSavingsCalculator: React.FC = () => {
  const [numBooks, setNumBooks] = useState<number>(5);
  const [avgOriginalPrice, setAvgOriginalPrice] = useState<number>(650);

  const totalOriginalCost = numBooks * avgOriginalPrice;
  // Estimated marketplace price is roughly 38% of original (62% savings)
  const estimatedMarketplaceCost = Math.round(totalOriginalCost * 0.38);
  const totalSavings = totalOriginalCost - estimatedMarketplaceCost;
  const percentageSaved = Math.round((totalSavings / totalOriginalCost) * 100);

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-blue-900/40 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left column: Controls */}
        <div className="lg:col-span-6 space-y-5">
          <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 text-xs font-bold px-3 py-1 rounded-full border border-blue-500/30">
            <Calculator className="w-3.5 h-3.5 text-blue-400" />
            <span>Interactive Student Savings Calculator</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Calculate How Much You Save Every Semester
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Standard textbooks and coaching notes drain student budgets. See how much cash you keep in your pocket by switching to pre-owned verified campus resources on StudySwap.
          </p>

          <div className="space-y-4 pt-2">
            {/* Slider 1: Number of Books */}
            <div className="space-y-2 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="font-semibold text-slate-200">Number of Study Books / Notes Required:</span>
                <span className="font-black text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-lg border border-cyan-800">
                  {numBooks} Books & Notes
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                value={numBooks}
                onChange={(e) => setNumBooks(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>1 Book</span>
                <span>10 Books</span>
                <span>25 Books</span>
              </div>
            </div>

            {/* Slider 2: Average Original Retail Price */}
            <div className="space-y-2 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="font-semibold text-slate-200">Average Retail Price per Item:</span>
                <span className="font-black text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-lg border border-emerald-800">
                  ₹{avgOriginalPrice}
                </span>
              </div>
              <input
                type="range"
                min="200"
                max="2000"
                step="50"
                value={avgOriginalPrice}
                onChange={(e) => setAvgOriginalPrice(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>₹200 (Notes)</span>
                <span>₹1,000 (Standard Text)</span>
                <span>₹2,000 (UPSC Set)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Results Card */}
        <div className="lg:col-span-6 bg-gradient-to-br from-slate-900/90 to-blue-950/90 rounded-3xl p-6 sm:p-8 border border-blue-500/30 shadow-xl space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Retail Cost</span>
              <span className="text-lg font-bold text-slate-300 line-through">₹{totalOriginalCost.toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">StudySwap Cost</span>
              <span className="text-2xl font-black text-cyan-400">₹{estimatedMarketplaceCost.toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl">
              <div>
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block">Your Net Savings</span>
                <span className="text-3xl sm:text-4xl font-black text-emerald-400">₹{totalSavings.toLocaleString()}</span>
              </div>
              <div className="text-right">
                <span className="text-2xl sm:text-3xl font-black text-emerald-300 bg-emerald-500/20 px-3 py-1.5 rounded-xl border border-emerald-500/40 inline-block">
                  {percentageSaved}% OFF
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
            <p className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Enough savings to buy a full online mock test series or coaching subscription!</span>
            </p>
            <p className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Zero delivery fee when utilizing campus meetup points at metro stations & colleges.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
