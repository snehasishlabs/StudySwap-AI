import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Users, 
  Package, 
  Sparkles, 
  Database, 
  Activity,
  ArrowRight,
  TrendingUp,
  BarChart3,
  Search,
  Calendar,
  IndianRupee,
  BookOpen,
  BellRing,
  ShieldAlert,
  Flame,
  Check,
  Ban,
  Trash2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SPAM_ALERTS } from '../data/mockData';
import { SpamAlertItem } from '../types';

export const AdminPanelPage: React.FC = () => {
  const { listings, showToast, navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState<'analytics' | 'moderation' | 'verifications'>('analytics');

  // Spam alerts state
  const [spamAlerts, setSpamAlerts] = useState<SpamAlertItem[]>(SPAM_ALERTS);

  // Verifications state
  const [pendingVerifications, setPendingVerifications] = useState([
    {
      id: 'v1',
      name: 'Aniket Roy',
      college: 'Jadavpur University',
      idProof: 'Roll #JU/EE/2024/042 (Verified Photo ID)',
      targetExam: 'GATE Engineering Sciences',
      status: 'pending',
    },
    {
      id: 'v2',
      name: 'Debasmita Sengupta',
      college: 'Presidency University',
      idProof: 'Student ID #PU/HIST/2023/118',
      targetExam: 'WBPSC WBCS Executive',
      status: 'pending',
    },
    {
      id: 'v3',
      name: 'Vikramaditya Joshi',
      college: 'IIT Kharagpur',
      idProof: 'Student ID #IITKGP/ME/2023/882',
      targetExam: 'GATE Mechanical',
      status: 'pending',
    }
  ]);

  const handleApprove = (id: string, name: string) => {
    setPendingVerifications((prev) => prev.filter((p) => p.id !== id));
    showToast(`Approved seller verification for ${name}! Trust badge assigned.`, 'success');
  };

  const handleReject = (id: string, name: string) => {
    setPendingVerifications((prev) => prev.filter((p) => p.id !== id));
    showToast(`Rejected verification for ${name}. Notification sent.`, 'info');
  };

  const handleDismissSpam = (id: string) => {
    setSpamAlerts((prev) => prev.filter((a) => a.id !== id));
    showToast('Spam flag cleared after administrative review.', 'success');
  };

  const handleTakedownListing = (id: string, title: string) => {
    setSpamAlerts((prev) => prev.filter((a) => a.id !== id));
    showToast(`Listing "${title}" removed for policy violations.`, 'error');
  };

  const handleBanSeller = (id: string, seller: string) => {
    setSpamAlerts((prev) => prev.filter((a) => a.id !== id));
    showToast(`Vendor account ${seller} has been banned from StudySwap.`, 'error');
  };

  // Top In-Demand Books
  const topInDemandBooks = [
    { rank: 1, title: 'Indian Polity by M. Laxmikanth (7th Ed)', exam: 'UPSC', avgPrice: 380, mrp: 995, demand: 'Extreme', inquiriesThisWeek: 420 },
    { rank: 2, title: 'Quantitative Aptitude by R.S. Aggarwal', exam: 'SSC / Banking', avgPrice: 220, mrp: 750, demand: 'Very High', inquiriesThisWeek: 310 },
    { rank: 3, title: 'NEET Biology Fingertips (MTG)', exam: 'NEET', avgPrice: 290, mrp: 850, demand: 'High', inquiriesThisWeek: 265 },
    { rank: 4, title: 'Concepts of Physics (Vol 1 & 2) H.C. Verma', exam: 'JEE / NEET', avgPrice: 240, mrp: 680, demand: 'High', inquiriesThisWeek: 240 },
    { rank: 5, title: 'GATE Computer Science Made Easy Notes', exam: 'GATE', avgPrice: 350, mrp: 950, demand: 'Surging', inquiriesThisWeek: 195 },
  ];

  // Price trends by exam
  const examPriceTrends = [
    { exam: 'UPSC CSE', avgResale: 360, avgMrp: 920, savings: 61, totalExchanged: 1420 },
    { exam: 'SSC CGL', avgResale: 190, avgMrp: 540, savings: 65, totalExchanged: 2180 },
    { exam: 'GATE Engineering', avgResale: 310, avgMrp: 880, savings: 65, totalExchanged: 940 },
    { exam: 'NEET Medical', avgResale: 260, avgMrp: 760, savings: 66, totalExchanged: 1350 },
    { exam: 'Banking (IBPS/SBI)', avgResale: 180, avgMrp: 490, savings: 63, totalExchanged: 1120 },
  ];

  // High Demand Search Keywords
  const highDemandKeywords = [
    { tag: 'Laxmikanth Polity 7th', count: '1,420 searches', trend: '+45%' },
    { tag: 'Biology Handwritten Flowcharts', count: '1,180 searches', trend: '+88%' },
    { tag: 'Casio fx-991EX', count: '940 searches', trend: '+32%' },
    { tag: 'Reasoning RS Aggarwal', count: '890 searches', trend: '+20%' },
    { tag: 'Spectrum Modern History', count: '760 searches', trend: '+54%' },
    { tag: 'GATE CSE PYQ Solved', count: '630 searches', trend: '+41%' },
  ];

  // Seasonal Exam Demand Alerts
  const seasonalAlerts = [
    {
      id: 'season-1',
      title: 'UPSC Prelims Countdown (~75 Days Remaining)',
      urgency: 'high',
      description: 'Massive surge in student demand for Polity, Modern History summary notes, and 25-Year PYQ compilations across College Street and Delhi Mukherjee Nagar hubs.',
      actionNeeded: 'Incentivize qualifying seniors to list quick-revision maps & mock test series.'
    },
    {
      id: 'season-2',
      title: 'NEET 2025 Revision Phase Approaching',
      urgency: 'high',
      description: 'High search velocity for NCERT extract notes and MTG Fingertips. Over 300 students set wishlist alerts for Biology diagrams.',
      actionNeeded: 'Promote curated Medical Foundation Study Bundles.'
    },
    {
      id: 'season-3',
      title: 'GATE 2025 Calculator & PYQ Surge',
      urgency: 'medium',
      description: 'Scientific calculators (Casio ClassWiz) and Made Easy postal modules experiencing 2.4x search spikes from engineering campuses.',
      actionNeeded: 'Feature Study Accessories & Hardware category.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 text-xs font-bold px-3 py-1 rounded-full border border-blue-500/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>StudySwap Core Intelligence & Oversight</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Admin Intelligence & Marketplace Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Monitor real-time demand trends, review automated AI spam flags, and audit student campus credentials.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('db-schema')}
            className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-4 py-2.5 rounded-xl border border-white/20 flex items-center gap-2 transition cursor-pointer"
          >
            <Database className="w-4 h-4 text-emerald-400" />
            <span>Supabase Schema</span>
          </button>
        </div>
      </div>

      {/* Top High-Level KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Total Catalog Listings
          </span>
          <span className="text-2xl font-black text-slate-900 block">{listings.length}</span>
          <span className="text-[11px] text-emerald-600 font-semibold">100% active verified items</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Registered Aspirants
          </span>
          <span className="text-2xl font-black text-slate-900 block">12,480</span>
          <span className="text-[11px] text-blue-600 font-semibold">+240 this week across Kolkata</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Flagged Spam Risk
          </span>
          <span className="text-2xl font-black text-rose-600 block">{spamAlerts.length}</span>
          <span className="text-[11px] text-rose-500 font-semibold">Pending moderator review</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Student Savings Index
          </span>
          <span className="text-2xl font-black text-emerald-600 block">₹28.4 Lakh</span>
          <span className="text-[11px] text-slate-500 font-medium">Retained by aspirant families</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'analytics'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Marketplace Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('moderation')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'moderation'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-rose-500" />
          <span>AI Spam & Fraud Intelligence ({spamAlerts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('verifications')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'verifications'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>Student ID Audits ({pendingVerifications.length})</span>
        </button>
      </div>

      {/* Tab 1: Marketplace Analytics */}
      {activeTab === 'analytics' && (
        <div className="space-y-8">
          {/* Seasonal Exam Demand Alerts */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <BellRing className="w-4 h-4 text-amber-500" />
              <span>Seasonal Exam Demand Alerts</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {seasonalAlerts.map((alert) => (
                <div 
                  key={alert.id}
                  className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-5 space-y-2.5 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider bg-amber-200 text-amber-900 px-2 py-0.5 rounded">
                        High Demand Velocity
                      </span>
                      <Flame className="w-4 h-4 text-amber-600" />
                    </div>
                    <h4 className="font-bold text-sm text-slate-900">{alert.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {alert.description}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-amber-200/60 text-[11px] text-amber-900 font-semibold">
                    💡 Action: {alert.actionNeeded}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top In-Demand Books & Price Trends */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top In-Demand Books */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <h3 className="font-extrabold text-sm text-slate-900">
                    Top In-Demand Books (Ranked by Inquiries)
                  </h3>
                </div>
                <span className="text-[11px] text-slate-400 font-semibold">Past 7 Days</span>
              </div>

              <div className="space-y-3">
                {topInDemandBooks.map((item) => (
                  <div 
                    key={item.rank}
                    className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-black text-xs flex items-center justify-center shrink-0">
                        #{item.rank}
                      </span>
                      <div className="min-w-0">
                        <h4 className="font-bold text-slate-900 truncate">{item.title}</h4>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500">
                          <span className="font-semibold text-blue-600">{item.exam}</span>
                          <span>•</span>
                          <span>Avg Resale: ₹{item.avgPrice} (MRP ₹{item.mrp})</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="inline-block bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded text-[10px]">
                        {item.demand}
                      </span>
                      <span className="block text-[10px] text-slate-400 mt-0.5">
                        {item.inquiriesThisWeek} asks
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Average Price Trends by Exam Category */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <IndianRupee className="w-4 h-4 text-emerald-600" />
                  <h3 className="font-extrabold text-sm text-slate-900">
                    Price Trends by Exam Category
                  </h3>
                </div>
                <span className="text-[11px] text-emerald-600 font-semibold">Average 64% Discount</span>
              </div>

              <div className="space-y-3">
                {examPriceTrends.map((trend) => (
                  <div key={trend.exam} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">{trend.exam}</span>
                      <span className="font-extrabold text-emerald-700">
                        {trend.savings}% Student Discount
                      </span>
                    </div>

                    {/* Progress Bar of Savings */}
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-emerald-500 h-2 rounded-full" 
                        style={{ width: `${trend.savings}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>Avg Resale: ₹{trend.avgResale} (Orig: ₹{trend.avgMrp})</span>
                      <span>{trend.totalExchanged} items recirculated</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* High Demand Search Keywords */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-purple-600" />
                <h3 className="font-extrabold text-sm text-slate-900">
                  High-Demand Student Search Keywords (Real-Time Queries)
                </h3>
              </div>
              <span className="text-xs text-purple-600 font-bold">Top Aspirant Trends</span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {highDemandKeywords.map((kw) => (
                <div 
                  key={kw.tag}
                  className="bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-2xl px-4 py-2.5 flex items-center gap-2.5 text-xs transition"
                >
                  <span className="font-bold text-purple-950">{kw.tag}</span>
                  <span className="text-[10px] text-purple-600 font-semibold bg-purple-200/60 px-2 py-0.5 rounded-full">
                    {kw.count}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-extrabold bg-emerald-100 px-1.5 py-0.5 rounded">
                    {kw.trend}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: AI Spam & Fraud Intelligence */}
      {activeTab === 'moderation' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-rose-50 via-red-50 to-orange-50 p-6 rounded-3xl border border-rose-200 space-y-1.5">
            <h3 className="font-black text-lg text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              <span>Automated AI Spam & Listing Integrity Alerts</span>
            </h3>
            <p className="text-xs text-slate-600">
              The AI heuristic engine flags commercial resellers, low-resolution note scans, and outdated syllabus uploads before they reach aspirants.
            </p>
          </div>

          {spamAlerts.length > 0 ? (
            <div className="space-y-4">
              {spamAlerts.map((alert) => (
                <div 
                  key={alert.id}
                  className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-rose-100 text-rose-800 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        Risk Score: {alert.riskScore} / 100
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        Reported {alert.reportedAt}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600">
                      Seller: <strong className="text-slate-900">{alert.sellerName}</strong>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="font-black text-base text-slate-900">
                      {alert.listingTitle}
                    </h4>
                    <p className="text-xs text-rose-700 bg-rose-50/70 p-3 rounded-xl border border-rose-100">
                      <strong>AI Flag Reason:</strong> {alert.flagReason}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => handleDismissSpam(alert.id)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Dismiss Flag</span>
                    </button>

                    <button
                      onClick={() => handleTakedownListing(alert.id, alert.listingTitle)}
                      className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Takedown Listing</span>
                    </button>

                    <button
                      onClick={() => handleBanSeller(alert.id, alert.sellerName)}
                      className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5"
                    >
                      <Ban className="w-3.5 h-3.5" />
                      <span>Ban Seller</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 text-xs text-slate-500 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-sm text-slate-900">All Flagged Listings Resolved</h4>
              <p>Zero suspicious or spam postings detected in the current queue.</p>
            </div>
          )}

          {/* Active Guardrails Monitor */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Active Automated Marketplace Guardrails</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="font-bold text-slate-800 block">Copyright & PDF Anti-Piracy</span>
                <span className="text-emerald-600 font-semibold">Active & Monitoring</span>
                <p className="text-slate-500 text-[11px]">Blocks illicit publisher PDF watermarks.</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="font-bold text-slate-800 block">AI Note Legibility Floor</span>
                <span className="text-purple-600 font-semibold">Minimum Score 70</span>
                <p className="text-slate-500 text-[11px]">Unreadable scans rejected before publication.</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="font-bold text-slate-800 block">Fair Price Banding</span>
                <span className="text-blue-600 font-semibold">Max 85% of MRP</span>
                <p className="text-slate-500 text-[11px]">Prevents price gouging of pre-owned books.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Student ID Verifications */}
      {activeTab === 'verifications' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
          <div>
            <h3 className="font-extrabold text-base text-slate-900">
              Pending Student ID Verifications ({pendingVerifications.length})
            </h3>
            <p className="text-xs text-slate-500">
              Only verified university students receive the "Verified Seller" trust badge.
            </p>
          </div>

          {pendingVerifications.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {pendingVerifications.map((item) => (
                <div key={item.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{item.name}</h4>
                    <p className="text-xs text-slate-500">{item.college} • {item.targetExam}</p>
                    <span className="inline-block text-[11px] bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-md font-medium mt-1">
                      {item.idProof}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleApprove(item.id, item.name)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve Student</span>
                    </button>

                    <button
                      onClick={() => handleReject(item.id, item.name)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2 rounded-xl transition cursor-pointer"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-slate-500">
              ✓ All pending student ID applications have been audited.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
