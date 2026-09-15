import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  HelpCircle, 
  Loader2, 
  Bot, 
  User, 
  RotateCcw,
  IndianRupee,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
}

export const AiAssistantPage: React.FC = () => {
  const { currentUser, navigateTo, listings } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'assistant',
      text: `Hello ${currentUser.name}! I am **SwapGuru**, your AI Study & Exam Resource Mentor powered by Google Gemini.\n\nWhether you need syllabus roadmaps for **${currentUser.targetExam || 'Competitive Exams'}**, advice on which book edition to purchase, or help negotiating second-hand note prices, I'm here to assist you. What are you preparing for today?`,
      time: 'Just now',
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Best books for SSC CGL Quantitative Aptitude under ₹500?',
    'Is R.S. Aggarwal sufficient for SSC or should I buy Kiran PYQ?',
    'How should I verify handwritten notes before buying on campus?',
    'Suggest a 3-month preparation timetable for UPSC Prelims.',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (userText: string) => {
    if (!userText.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          context: `User: ${currentUser.name}, Role: ${currentUser.role}, Target Exam: ${currentUser.targetExam || 'SSC/UPSC'}, City: ${currentUser.location}. Active marketplace listings include R.S. Aggarwal Quant (₹300), Priya's Handwritten Notes (₹250), Lucent GK (₹180), Casio fx-991EX (₹450).`,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const botMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: data.reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error('API response not ok');
      }
    } catch {
      // Fallback response for offline or rate-limit
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: `For **${currentUser.targetExam || 'competitive exams'}**, here is the recommended textbook sequence:\n\n1. **Core Concept Mastery**: Start with standard foundation books (e.g., *R.S. Aggarwal Quantitative Aptitude* or *M. Laxmikanth Indian Polity*). You can find verified pre-owned copies on StudySwap for ₹250–₹350 instead of paying ₹800 retail.\n2. **Topper Handwritten Notes**: Pair concepts with structured revision summaries (check out Priya Verma's 92-scored reasoning notes on our marketplace).\n3. **PYQ Practice**: 15+ years chapter-wise solved papers are non-negotiable for speed.\n\nWould you like me to recommend specific subject books or check listings near Kolkata?`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        sender: 'assistant',
        text: `Chat reset. How can I help with your study plan today, ${currentUser.name}?`,
        time: 'Just now',
      },
    ]);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-900 via-indigo-950 to-slate-900 rounded-3xl p-6 text-white shadow-xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 shadow-md font-black">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black">SwapGuru AI Study Mentor</h1>
              <span className="bg-cyan-400/20 text-cyan-300 text-[11px] font-bold px-2 py-0.5 rounded-full border border-cyan-400/30">
                Gemini 3.8 Flash
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Instant academic book roadmaps, syllabus breakdowns, and marketplace buyer advice
            </p>
          </div>
        </div>

        <button
          onClick={handleResetChat}
          className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition cursor-pointer"
          title="Reset Conversation"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Main Chat Container */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm flex flex-col h-[600px] overflow-hidden">
        {/* Messages Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-indigo-100 text-indigo-700'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white shadow-xs rounded-tr-xs'
                    : 'bg-slate-100 text-slate-800 border border-slate-200/70 rounded-tl-xs whitespace-pre-line'
                }`}
              >
                {msg.text}
                <div
                  className={`text-[10px] mt-1.5 text-right font-medium ${
                    msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                  }`}
                >
                  {msg.time}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-slate-100 border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-600 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                <span>SwapGuru is analyzing syllabus & study resources...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center gap-2 overflow-x-auto">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
            Suggested:
          </span>
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="text-xs bg-white text-slate-700 hover:text-blue-600 hover:border-blue-300 border border-slate-200 px-3 py-1.5 rounded-xl transition whitespace-nowrap cursor-pointer shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(input);
          }}
          className="p-4 bg-white border-t border-slate-200 flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask SwapGuru anything about syllabus, books, or exam strategy..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold p-3 rounded-2xl transition shadow-md shadow-blue-500/20 cursor-pointer shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
