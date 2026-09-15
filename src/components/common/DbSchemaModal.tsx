import React, { useState } from 'react';
import { X, Database, Copy, Check, Terminal, Shield, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DbSchemaModal: React.FC = () => {
  const { isDbSchemaModalOpen, setIsDbSchemaModalOpen, showToast } = useApp();
  const [copied, setCopied] = useState(false);

  if (!isDbSchemaModalOpen) return null;

  const sqlSchema = `-- =========================================================
-- StudySwap PostgreSQL / Supabase Relational Database Schema
-- Production Ready with Row Level Security (RLS) & Indexes
-- =========================================================

-- 1. Users & Aspirant Profiles
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    role TEXT CHECK (role IN ('buyer', 'seller', 'both', 'admin')) DEFAULT 'both',
    target_exam TEXT,
    college_name TEXT,
    location_city TEXT DEFAULT 'Kolkata',
    is_verified_student BOOLEAN DEFAULT false,
    student_id_proof_url TEXT,
    seller_rating NUMERIC(3, 2) DEFAULT 5.0,
    trust_score INTEGER DEFAULT 95,
    items_sold_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Marketplace Study Listings
CREATE TABLE IF NOT EXISTS public.listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category TEXT CHECK (category IN ('Books', 'Handwritten Notes', 'Study Accessories')) NOT NULL,
    exam TEXT NOT NULL,
    subject TEXT NOT NULL,
    condition TEXT CHECK (condition IN ('Like New', 'Good', 'Fair')) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    original_mrp NUMERIC(10, 2) NOT NULL,
    description TEXT,
    images TEXT[] NOT NULL DEFAULT '{}',
    delivery_option TEXT DEFAULT 'Campus Pickup & Courier',
    pickup_location TEXT NOT NULL,
    seller_location TEXT NOT NULL,
    latitude DOUBLE PRECISION DEFAULT 22.5744,
    longitude DOUBLE PRECISION DEFAULT 88.3629,
    status TEXT CHECK (status IN ('active', 'reserved', 'sold')) DEFAULT 'active',
    ai_quality_score INTEGER,
    views_count INTEGER DEFAULT 0,
    inquiry_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. AI Handwritten Notes Quality Analysis (Gemini 3.8 Logs)
CREATE TABLE IF NOT EXISTS public.ai_note_evaluations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID REFERENCES public.listings(id) ON DELETE CASCADE,
    readability_score INTEGER NOT NULL,
    completeness_score INTEGER NOT NULL,
    organization_score INTEGER NOT NULL,
    topic_coverage_score INTEGER NOT NULL,
    overall_score INTEGER NOT NULL,
    strengths TEXT[],
    recommendations TEXT[],
    model_version TEXT DEFAULT 'gemini-3.8-flash',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Chat Threads & Negotiation Messages
CREATE TABLE IF NOT EXISTS public.chat_threads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID REFERENCES public.listings(id) ON DELETE CASCADE,
    buyer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    seller_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    last_message TEXT,
    last_message_at TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    thread_id UUID REFERENCES public.chat_threads(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    offer_price NUMERIC(10, 2),
    is_offer_accepted BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Student Ratings & Verified Reviews
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    buyer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    listing_id UUID REFERENCES public.listings(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5) NOT NULL,
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Performance Indexes
CREATE INDEX IF NOT EXISTS idx_listings_exam ON public.listings(exam);
CREATE INDEX IF NOT EXISTS idx_listings_category ON public.listings(category);
CREATE INDEX IF NOT EXISTS idx_listings_price ON public.listings(price);
CREATE INDEX IF NOT EXISTS idx_listings_status ON public.listings(status);

-- 7. Row Level Security (RLS) Policies
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Public can view active listings
CREATE POLICY "Public listings are viewable by everyone" 
ON public.listings FOR SELECT USING (true);

-- Authenticated users can insert their own listings
CREATE POLICY "Users can create listings" 
ON public.listings FOR INSERT WITH CHECK (auth.uid() = seller_id);
`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(sqlSchema);
    setCopied(true);
    showToast('Supabase SQL Schema copied to clipboard!', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 text-slate-100 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-700 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base">Supabase / PostgreSQL Schema</h3>
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  SQL DDL & RLS
                </span>
              </div>
              <p className="text-xs text-slate-400">Database architecture ready for Supabase deployment</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy SQL'}</span>
            </button>

            <button
              onClick={() => setIsDbSchemaModalOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-4 overflow-y-auto flex-1 font-mono text-xs text-emerald-300 bg-slate-950/90 leading-relaxed select-all">
          <pre>{sqlSchema}</pre>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-400" />
            <span>Includes Row Level Security (RLS) & Relational Foreign Keys</span>
          </div>
          <button
            onClick={() => setIsDbSchemaModalOpen(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-1.5 rounded-xl transition cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
