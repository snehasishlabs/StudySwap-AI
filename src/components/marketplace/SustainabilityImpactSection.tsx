import React, { useState } from 'react';
import { Leaf, TreePine, FileText, IndianRupee, Wind, RefreshCw, Calculator, Sparkles, CheckCircle2 } from 'lucide-react';
import { SUSTAINABILITY_METRICS } from '../../data/mockData';

export const SustainabilityImpactSection: React.FC = () => {
  const [calculatorBooks, setCalculatorBooks] = useState<number>(4);

  // Dynamic calculations per book reused:
  // ~5 kg paper saved per standard textbook set
  // ~0.08 trees saved per book
  // ~2.5 kg CO2 emission prevented per book reused
  // ~₹300 saved on average per student purchase
  const userPaperSaved = (calculatorBooks * 5).toFixed(0);
  const userTreesSaved = (calculatorBooks * 0.083).toFixed(1);
  const userCo2Saved = (calculatorBooks * 2.5).toFixed(1);
  const userRupeesSaved = (calculatorBooks * 320).toLocaleString('en-IN');

  return (
    <section id="sustainability-impact-counter" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden space-y-10">
        {/* Glow decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-teal-400/10 blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-white/10 pb-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-xs font-black px-3.5 py-1.5 rounded-full border border-emerald-500/30">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>Eco-Education & Circular Campus Economy</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Sustainability & Carbon Impact Counter
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
              Every textbook, spiral note, and calculator recirculated on StudySwap keeps paper mills idle and saves trees while making exam prep affordable.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/15 text-xs text-emerald-200 font-medium flex items-center gap-2 shrink-0">
            <RefreshCw className="w-4 h-4 text-emerald-400 animate-spin-slow" />
            <span>Audited Live Across 12 Indian Campuses</span>
          </div>
        </div>

        {/* 5 Real-Time Impact Counters */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 relative z-10">
          {/* Books Recirculated */}
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 space-y-2 hover:bg-white/15 transition">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-300">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-white block tracking-tight">
                {SUSTAINABILITY_METRICS.booksReused.toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block">
                Books Recirculated
              </span>
            </div>
            <p className="text-[11px] text-slate-300">Prevented from ending up in landfill waste</p>
          </div>

          {/* Paper / Water Saved */}
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 space-y-2 hover:bg-white/15 transition">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center text-teal-300">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-white block tracking-tight">
                {(SUSTAINABILITY_METRICS.waterSavedLiters / 100000).toFixed(1)} Lakh L
              </span>
              <span className="text-xs font-bold text-teal-300 uppercase tracking-wider block">
                Water & Paper Conserved
              </span>
            </div>
            <p className="text-[11px] text-slate-300">{SUSTAINABILITY_METRICS.waterSavedLiters.toLocaleString('en-IN')} L water saved in paper mills</p>
          </div>

          {/* Trees Saved */}
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 space-y-2 hover:bg-white/15 transition">
            <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center text-green-300">
              <TreePine className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-white block tracking-tight">
                {SUSTAINABILITY_METRICS.treesSaved.toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-bold text-green-300 uppercase tracking-wider block">
                Mature Trees Saved
              </span>
            </div>
            <p className="text-[11px] text-slate-300">Calculated on standard paper lifecycle</p>
          </div>

          {/* CO2 Prevented */}
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 space-y-2 hover:bg-white/15 transition">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center text-sky-300">
              <Wind className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-white block tracking-tight">
                {(SUSTAINABILITY_METRICS.co2SavedKg / 1000).toFixed(1)} Tons
              </span>
              <span className="text-xs font-bold text-sky-300 uppercase tracking-wider block">
                CO2 Emissions Averted
              </span>
            </div>
            <p className="text-[11px] text-slate-300">{SUSTAINABILITY_METRICS.co2SavedKg.toLocaleString('en-IN')} kg emissions reduced</p>
          </div>

          {/* Student INR Saved */}
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 space-y-2 hover:bg-white/15 transition col-span-2 md:col-span-1">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-300">
              <IndianRupee className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-amber-400 block tracking-tight">
                ₹{(SUSTAINABILITY_METRICS.moneySavedRupees / 100000).toFixed(1)}L+
              </span>
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                Student Wallet Savings
              </span>
            </div>
            <p className="text-[11px] text-slate-300">Directly retained by aspirant families</p>
          </div>
        </div>

        {/* Interactive Student Carbon & Savings Calculator */}
        <div className="bg-black/30 backdrop-blur-lg p-6 sm:p-8 rounded-3xl border border-white/15 space-y-6 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Calculator className="w-4 h-4" />
              </div>
              <h3 className="text-base sm:text-lg font-black text-white">
                Interactive Student Eco-Calculator: Calculate Your Personal Impact
              </h3>
            </div>
            <span className="text-xs text-emerald-300 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Simulate donating or buying pre-loved materials
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-emerald-200">
              <span>If you swap or pass on books:</span>
              <span className="text-base font-black text-white bg-emerald-600/60 px-3 py-1 rounded-xl">
                {calculatorBooks} Study Books / Notes
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={25}
              value={calculatorBooks}
              onChange={(e) => setCalculatorBooks(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer h-2 bg-emerald-950 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>1 Book (Single Subject)</span>
              <span>12 Books (Yearly Syllabus)</span>
              <span>25 Books (Full Exam Cycle)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center space-y-1">
              <span className="text-xl sm:text-2xl font-black text-emerald-300 block">{userPaperSaved} kg</span>
              <span className="text-[11px] text-slate-300">Paper Conserved</span>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center space-y-1">
              <span className="text-xl sm:text-2xl font-black text-green-300 block">{userTreesSaved}</span>
              <span className="text-[11px] text-slate-300">Trees Protected</span>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center space-y-1">
              <span className="text-xl sm:text-2xl font-black text-sky-300 block">{userCo2Saved} kg</span>
              <span className="text-[11px] text-slate-300">CO2 Emissions Prevented</span>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center space-y-1">
              <span className="text-xl sm:text-2xl font-black text-amber-300 block">₹{userRupeesSaved}</span>
              <span className="text-[11px] text-slate-300">Estimated Money Saved</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
