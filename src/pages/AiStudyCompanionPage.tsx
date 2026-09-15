import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  BookOpen, 
  GraduationCap, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  IndianRupee, 
  ShieldCheck, 
  Star, 
  Copy, 
  Volume2, 
  VolumeX, 
  RefreshCw, 
  Lightbulb, 
  Compass, 
  Layers, 
  Tag, 
  FileText,
  BookmarkPlus
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EXAM_CATEGORIES } from '../data/mockData';
import { ExamCategory, Listing } from '../types';

interface CompanionMessage {
  id: string;
  sender: 'user' | 'companion';
  text: string;
  timestamp: string;
  recommendedListings?: {
    id: string;
    title: string;
    price: number;
    originalPrice: number;
    category: string;
    exam: string;
    sellerName: string;
    sellerRating: number;
    whyRecommended: string;
    savings: string;
  }[];
  studyRoadmap?: {
    phase: string;
    focus: string;
    hoursPerDay: number;
    milestones: string[];
  }[];
}

export const AiStudyCompanionPage: React.FC = () => {
  const { currentUser, navigateTo, listings, showToast } = useApp();

  const [selectedExam, setSelectedExam] = useState<ExamCategory>(
    (currentUser.targetExam?.includes('UPSC') ? 'UPSC' : 'SSC') as ExamCategory
  );
  const [activeViewMode, setActiveViewMode] = useState<'chat' | 'planner' | 'discovery'>('chat');
  const [messages, setMessages] = useState<CompanionMessage[]>([
    {
      id: 'welcome-1',
      sender: 'companion',
      text: `Namaste **${currentUser.name}**! I am your **AI Study Companion** on StudySwap.

I don't just chat — I evaluate exam syllabi, craft realistic week-by-week study timetables, and discover verified second-hand textbooks and topper notes from seniors near your campus so you can clear **${selectedExam}** without spending thousands.

What would you like to plan today?`,
      timestamp: 'Just now',
      recommendedListings: [
        {
          id: 'listing-2',
          title: 'SSC CGL Reasoning & Aptitude Handwritten Master Notes',
          price: 250,
          originalPrice: 500,
          category: 'Handwritten Notes',
          exam: 'SSC',
          sellerName: 'Priya Verma',
          sellerRating: 4.8,
          whyRecommended: 'Scored 92/100 by Gemini Note Analyzer with complete formula shortcuts and 5-year PYQ patterns.',
          savings: '50% Off Retail',
        },
        {
          id: 'listing-1',
          title: 'Quantitative Aptitude for Competitive Examinations (R.S. Aggarwal)',
          price: 320,
          originalPrice: 750,
          category: 'Books',
          exam: 'SSC',
          sellerName: 'Priya Verma',
          sellerRating: 4.8,
          whyRecommended: 'Essential foundation textbook for arithmetic, ratio, and algebra shortcuts.',
          savings: '57% Off Retail',
        },
      ],
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Study planner states
  const [planWeeks, setPlanWeeks] = useState(12);
  const [dailyHours, setDailyHours] = useState(5);
  const [focusSubject, setFocusSubject] = useState('Quantitative Aptitude & Reasoning');
  const [generatedPlan, setGeneratedPlan] = useState<any | null>(null);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);

  // Conversational Quick Prompts
  const quickPrompts = [
    'I am preparing for SSC CGL and need Reasoning notes.',
    'Suggest the best books under ₹500 for UPSC Polity.',
    'Find handwritten notes for NEET Biology.',
    'Create a 90-day timetable for SSC with weekly targets.',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Speech readout using browser speech synthesis
  const toggleSpeech = (text: string) => {
    if (!('speechSynthesis' in window)) {
      showToast('Text-to-speech not supported in this browser.', 'info');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const cleanText = text.replace(/[*_#`]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleSendMessage = async (textToSend: string) => {
    const text = textToSend || inputQuery;
    if (!text.trim() || isLoading) return;

    const userMessage: CompanionMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/companion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          exam: selectedExam,
          studyTimeline: `${planWeeks} weeks`,
          budget: 'Student budget',
          history: messages.slice(-8),
        }),
      });

      if (res.ok) {
        const json = await res.json();
        const data = json.data;

        // Map relevant listings from current catalog
        const matchingListings = listings
          .filter((l) => l.exam === selectedExam || text.toLowerCase().includes(l.subject.toLowerCase()))
          .slice(0, 2)
          .map((l) => ({
            id: l.id,
            title: l.title,
            price: l.price,
            originalPrice: l.originalPrice,
            category: l.category,
            exam: l.exam,
            sellerName: l.sellerName,
            sellerRating: l.sellerRating,
            whyRecommended: `Matches ${selectedExam} high-frequency syllabus. Saved ₹${l.originalPrice - l.price} vs MRP.`,
            savings: `${Math.round(((l.originalPrice - l.price) / l.originalPrice) * 100)}% Off`,
          }));

        const companionReply: CompanionMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'companion',
          text: data.reply || 'Here are my recommendations for your preparation:',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          recommendedListings: matchingListings.length > 0 ? matchingListings : undefined,
          studyRoadmap: data.studyPlan,
        };

        setMessages((prev) => [...prev, companionReply]);
      } else {
        throw new Error('API failed');
      }
    } catch {
      // High fidelity heuristic mentor response
      const fallbackListings = listings.slice(0, 2).map((l) => ({
        id: l.id,
        title: l.title,
        price: l.price,
        originalPrice: l.originalPrice,
        category: l.category,
        exam: l.exam,
        sellerName: l.sellerName,
        sellerRating: l.sellerRating,
        whyRecommended: 'Certified by StudySwap AI with verified topper question coverage.',
        savings: `${Math.round(((l.originalPrice - l.price) / l.originalPrice) * 100)}% Off`,
      }));

      const companionReply: CompanionMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'companion',
        text: `Here is your strategic recommendation for **${selectedExam}**:

1. **Foundational Textbooks**: Prioritize high-yield concept books over bulky multi-volume sets. Buying pre-owned on StudySwap saves ~60% with zero loss in syllabus relevance.
2. **AI-Scored Handwritten Notes**: Use notes with AI Quality Score > 90 to grasp shortcut formulas and 5-year PYQ patterns in half the time.
3. **Weekly Timetable**: Dedicate the first 4 weeks to fundamental theory, weeks 5-8 to timed chapterwise quizzes, and the final month to full-length test series.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedListings: fallbackListings,
        studyRoadmap: [
          {
            phase: 'Phase 1: Conceptual Foundation (Weeks 1-4)',
            focus: 'Core chapters and formula derivation notes',
            hoursPerDay: 4,
            milestones: ['Complete standard textbook theory', 'Review topper handwritten formula cheat-sheets'],
          },
          {
            phase: 'Phase 2: PYQ Solving & Sectional Speed (Weeks 5-8)',
            focus: '10+ years solved papers with timed accuracy drills',
            hoursPerDay: 5,
            milestones: ['Solve 600+ previous year questions', 'Maintain accuracy > 85%'],
          },
          {
            phase: 'Phase 3: Full Length Mocks (Weeks 9-12)',
            focus: 'Full syllabus simulation tests + revision sheets',
            hoursPerDay: 6,
            milestones: ['Take 12 full length simulated tests', 'Review error notebook before exam'],
          },
        ],
      };

      setMessages((prev) => [...prev, companionReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateStudyPlan = async () => {
    setIsGeneratingPlan(true);
    try {
      const res = await fetch('/api/ai/companion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Generate a detailed ${planWeeks}-week study plan for ${selectedExam} focusing on ${focusSubject}. Daily available study time is ${dailyHours} hours. Include week-by-week goals, textbook recommendations, and mock test strategy.`,
          exam: selectedExam,
          studyTimeline: `${planWeeks} weeks`,
        }),
      });

      if (res.ok) {
        const json = await res.json();
        setGeneratedPlan(json.data);
        showToast('Study Plan generated with Gemini 3.8!', 'success');
      } else {
        throw new Error('Fallback');
      }
    } catch {
      setGeneratedPlan({
        reply: `Tailored ${planWeeks}-Week Study Timetable for ${selectedExam}`,
        studyPlan: [
          {
            phase: `Weeks 1 to ${Math.round(planWeeks / 3)}: Concept Mastery`,
            focus: `Comprehensive coverage of foundational ${focusSubject} concepts`,
            hoursPerDay: dailyHours,
            milestones: [
              'Complete theory modules using pre-owned standard reference books',
              'Summarize formulas into 2-page pocket revision sheets',
            ],
          },
          {
            phase: `Weeks ${Math.round(planWeeks / 3) + 1} to ${Math.round((planWeeks * 2) / 3)}: Speed & PYQs`,
            focus: 'Chapterwise question solving and speed arithmetic drills',
            hoursPerDay: dailyHours,
            milestones: [
              'Solve past 7 years solved papers',
              'Achieve average solve time under 50 seconds per question',
            ],
          },
          {
            phase: `Weeks ${Math.round((planWeeks * 2) / 3) + 1} to ${planWeeks}: Mock Test Sprint`,
            focus: 'Full length mock tests and 48-hour exam revision',
            hoursPerDay: dailyHours + 1,
            milestones: [
              'Attempt 2 full length mocks every week under real exam conditions',
              'Deep dive analysis of incorrect answers',
            ],
          },
        ],
      });
      showToast('Study Plan customized for your schedule!', 'success');
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('Copied to clipboard!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Flagship Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-950 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-200 text-xs font-bold px-3.5 py-1.5 rounded-full border border-blue-400/30">
              <Sparkles className="w-3.5 h-3.5 text-blue-300" />
              <span>Flagship AI Feature • Powered by Google Gemini 3.8</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              AI Study Companion & Academic Mentor
            </h1>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Your personalized academic advisor. Ask anything about competitive exam preparation, get instant syllabus book recommendations with live marketplace listings, and build custom study timetables.
            </p>
          </div>

          {/* Exam Switcher Quick Control */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 space-y-2 shrink-0">
            <span className="text-xs text-blue-200 font-semibold uppercase tracking-wider block">
              Active Preparation Focus:
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {(['SSC', 'UPSC', 'NEET', 'JEE', 'GATE', 'Banking'] as ExamCategory[]).map((exam) => (
                <button
                  key={exam}
                  onClick={() => setSelectedExam(exam)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    selectedExam === exam
                      ? 'bg-white text-blue-900 shadow-md font-black'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {exam}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Feature Mode Tabs */}
        <div className="relative z-10 mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveViewMode('chat')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
              activeViewMode === 'chat'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>AI Mentor Chat & Listing Discovery</span>
          </button>

          <button
            onClick={() => setActiveViewMode('planner')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
              activeViewMode === 'planner'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>Study Plan & Timetable Generator</span>
          </button>

          <button
            onClick={() => {
              navigateTo('marketplace');
              showToast(`Showing verified resources for ${selectedExam}`, 'info');
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 bg-purple-600/80 hover:bg-purple-600 text-white transition cursor-pointer ml-auto"
          >
            <span>Explore {selectedExam} Marketplace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Workspace based on Tab */}
      {activeViewMode === 'chat' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Container (3 Cols) */}
          <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col h-[680px] overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <span>SwapGuru AI Co-Pilot</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </h2>
                  <p className="text-xs text-slate-500">
                    Online • Tailored for {selectedExam} Aspirants
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setMessages([
                    {
                      id: Date.now().toString(),
                      sender: 'companion',
                      text: `Chat reset. I am ready to advise you on books, notes, and study plans for **${selectedExam}**!`,
                      timestamp: 'Just now',
                    },
                  ]);
                }}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium transition cursor-pointer"
                title="Restart conversation"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset Chat</span>
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'companion' && (
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 mt-1">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-2xl rounded-2xl p-4 sm:p-5 text-sm space-y-3 leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none shadow-md shadow-blue-500/10'
                        : 'bg-slate-50 border border-slate-200/80 text-slate-800 rounded-bl-none shadow-xs'
                    }`}
                  >
                    {/* Message Text with simple formatting */}
                    <div className="whitespace-pre-line text-xs sm:text-sm">
                      {msg.text}
                    </div>

                    {/* Speech read button for AI */}
                    {msg.sender === 'companion' && (
                      <div className="flex items-center gap-3 pt-2 border-t border-slate-200/60 text-xs text-slate-500">
                        <button
                          onClick={() => toggleSpeech(msg.text)}
                          className="flex items-center gap-1 hover:text-blue-600 transition cursor-pointer"
                        >
                          {isSpeaking ? (
                            <>
                              <VolumeX className="w-3.5 h-3.5 text-rose-500" />
                              <span className="text-rose-600 font-semibold">Stop Audio</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                              <span>Listen Advice</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => copyToClipboard(msg.text)}
                          className="flex items-center gap-1 hover:text-blue-600 transition cursor-pointer ml-auto"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </button>
                      </div>
                    )}

                    {/* Embedded Recommended StudySwap Listings */}
                    {msg.recommendedListings && msg.recommendedListings.length > 0 && (
                      <div className="pt-2 space-y-2.5">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Recommended Pre-Owned Resources on StudySwap:</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {msg.recommendedListings.map((item) => (
                            <div
                              key={item.id}
                              className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs space-y-2 flex flex-col justify-between"
                            >
                              <div className="space-y-1">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    {item.category}
                                  </span>
                                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    {item.savings}
                                  </span>
                                </div>
                                <h4 className="font-bold text-xs text-slate-900 line-clamp-2">
                                  {item.title}
                                </h4>
                                <p className="text-[11px] text-slate-500 italic">
                                  "{item.whyRecommended}"
                                </p>
                              </div>

                              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                                <div>
                                  <span className="text-sm font-black text-slate-900">₹{item.price}</span>
                                  <span className="text-[10px] text-slate-400 line-through ml-1">
                                    ₹{item.originalPrice}
                                  </span>
                                </div>

                                <button
                                  onClick={() => navigateTo('listing-details', item.id)}
                                  className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1"
                                >
                                  <span>View</span>
                                  <ArrowRight className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Embedded Study Roadmap Preview */}
                    {msg.studyRoadmap && msg.studyRoadmap.length > 0 && (
                      <div className="pt-3 space-y-2 border-t border-slate-200">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-purple-700 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Generated Milestone Timeline:</span>
                        </div>

                        <div className="space-y-2">
                          {msg.studyRoadmap.map((p, idx) => (
                            <div key={idx} className="bg-white p-2.5 rounded-xl border border-slate-200 text-xs space-y-1">
                              <div className="flex justify-between font-bold text-slate-900">
                                <span>{p.phase}</span>
                                <span className="text-purple-600 font-semibold">{p.hoursPerDay} hrs/day</span>
                              </div>
                              <p className="text-[11px] text-slate-500">{p.focus}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 items-center text-slate-400 text-xs animate-pulse">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                    <Sparkles className="w-4 h-4 animate-spin" />
                  </div>
                  <span>AI Study Companion is analyzing syllabus and marketplace catalog...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Chips */}
            <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center gap-2 overflow-x-auto">
              <span className="text-[11px] font-bold text-slate-400 shrink-0">Try asking:</span>
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(prompt)}
                  className="bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs px-3 py-1.5 rounded-xl border border-slate-200/80 whitespace-nowrap transition cursor-pointer shrink-0 font-medium"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputQuery);
              }}
              className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder={`Ask anything about ${selectedExam} books, syllabus, or study timetables...`}
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                disabled={isLoading}
                className="flex-1 bg-slate-100 hover:bg-slate-50 focus:bg-white text-slate-900 text-sm px-4 py-2.5 rounded-xl border border-transparent focus:border-blue-500 focus:outline-none transition"
              />

              <button
                type="submit"
                disabled={isLoading || !inputQuery.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white p-2.5 rounded-xl transition cursor-pointer shadow-md shadow-blue-500/20"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Side Panel: Live Resource Matcher & Shortcuts (1 Col) */}
          <div className="space-y-6">
            {/* Quick Stats Box */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Compass className="w-4 h-4 text-blue-600" />
                <span>Preparation Advisor</span>
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Target Exam</span>
                  <strong className="text-slate-900">{selectedExam}</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Avg Retail Book Cost</span>
                  <strong className="text-slate-900">₹4,200</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">StudySwap Cost</span>
                  <strong className="text-emerald-600">₹1,450 (65% Saved)</strong>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500">Available Notes</span>
                  <strong className="text-purple-600">18 Topper Copies</strong>
                </div>
              </div>

              <button
                onClick={() => {
                  navigateTo('marketplace');
                  showToast('Filtering for topper handwritten notes', 'info');
                }}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Browse {selectedExam} Notes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Topper Note Quality Guarantee */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-5 rounded-3xl border border-purple-200/80 space-y-3">
              <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-purple-950">AI Quality Guarantee</h4>
              <p className="text-xs text-purple-900/80 leading-relaxed">
                All handwritten notes on StudySwap are verified across 5 dimensions: <strong>Readability</strong>, <strong>Organization</strong>, <strong>Completeness</strong>, <strong>Topic Coverage</strong>, and <strong>Visual Clarity</strong>.
              </p>
              <button
                onClick={() => navigateTo('ai-analyzer')}
                className="inline-flex items-center gap-1 text-xs font-bold text-purple-700 hover:text-purple-900 transition cursor-pointer"
              >
                <span>Test Note Analyzer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Planner View Mode */
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-8">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl font-black text-slate-900">
              Personalized {selectedExam} Study Timetable Generator
            </h2>
            <p className="text-sm text-slate-600">
              Input your timeline and available hours. Gemini generates phased weekly milestones, syllabus priorities, and pairs you with pre-owned books from StudySwap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Preparation Timeline</label>
              <select
                value={planWeeks}
                onChange={(e) => setPlanWeeks(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={4}>4 Weeks (Crash Sprint)</option>
                <option value={8}>8 Weeks (Targeted Revision)</option>
                <option value={12}>12 Weeks (3-Month Standard)</option>
                <option value={24}>24 Weeks (Comprehensive 6-Month)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Daily Study Bandwidth</label>
              <select
                value={dailyHours}
                onChange={(e) => setDailyHours(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={3}>3 Hours / day (Working Professional / College)</option>
                <option value={5}>5 Hours / day (Full-time Student)</option>
                <option value={8}>8 Hours / day (Intensive Prep)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Priority Subject</label>
              <input
                type="text"
                value={focusSubject}
                onChange={(e) => setFocusSubject(e.target.value)}
                placeholder="e.g. Reasoning, Quantitative Aptitude"
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-start">
            <button
              onClick={handleGenerateStudyPlan}
              disabled={isGeneratingPlan}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isGeneratingPlan ? 'Generating Timetable...' : 'Generate AI Study Plan'}</span>
            </button>
          </div>

          {generatedPlan && (
            <div className="space-y-6 pt-6 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-slate-900">{generatedPlan.reply}</h3>
                <button
                  onClick={() => copyToClipboard(JSON.stringify(generatedPlan, null, 2))}
                  className="text-xs text-blue-600 font-bold flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Export Roadmap</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {generatedPlan.studyPlan?.map((phase: any, index: number) => (
                  <div key={index} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                        Phase {index + 1}
                      </span>
                      <span className="bg-blue-100 text-blue-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                        {phase.hoursPerDay} hrs/day
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-slate-900">{phase.phase}</h4>
                    <p className="text-xs text-slate-600">{phase.focus}</p>

                    <div className="space-y-1.5 pt-2 border-t border-slate-200">
                      <span className="text-[11px] font-bold text-slate-500">Key Milestones:</span>
                      {phase.milestones?.map((m: string, i: number) => (
                        <div key={i} className="flex items-start gap-1.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{m}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
