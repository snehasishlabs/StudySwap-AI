import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Search, 
  Heart, 
  MessageSquare, 
  User, 
  LayoutDashboard, 
  PlusCircle, 
  Menu, 
  X, 
  ChevronDown,
  ShieldCheck,
  BrainCircuit,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    switchToBuyerDemo, 
    switchToSellerDemo, 
    currentPage, 
    navigateTo, 
    wishlist, 
    chatThreads,
    searchQuery,
    setSearchQuery,
    setSelectedExamFilter,
    setSelectedCategoryFilter
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false);

  const totalUnreadMessages = chatThreads.reduce((acc, t) => acc + t.unreadCount, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedExamFilter('All');
    setSelectedCategoryFilter('All');
    navigateTo('marketplace');
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Hackathon Demo Notice & Quick Role Bar */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-semibold bg-white/20 px-2 py-0.5 rounded-full text-[11px]">
              <Sparkles className="w-3 h-3 text-amber-300" />
              Demo Mode
            </span>
            <span className="hidden sm:inline text-blue-100">
              Active: <strong className="text-white">{currentUser.name}</strong> ({currentUser.role === 'buyer' ? 'Buyer Demo • SSC Aspirant' : 'Seller Demo • 4.8 Rating'})
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px]">
            <span className="text-blue-200 hidden md:inline">Quick Switch Demo:</span>
            <button
              id="nav-switch-buyer-btn"
              onClick={() => switchToBuyerDemo('marketplace')}
              className={`px-2.5 py-0.5 rounded-md font-medium transition cursor-pointer ${
                currentUser.role === 'buyer' 
                  ? 'bg-white text-blue-900 shadow-xs' 
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              Continue as Buyer Demo
            </button>
            <button
              id="nav-switch-seller-btn"
              onClick={() => switchToSellerDemo('seller-dashboard')}
              className={`px-2.5 py-0.5 rounded-md font-medium transition cursor-pointer ${
                currentUser.role === 'seller' 
                  ? 'bg-white text-purple-950 shadow-xs' 
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              Continue as Seller Demo
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div 
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
            id="brand-logo-btn"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  Study<span className="text-blue-600">Swap</span>
                </span>
                <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded border border-indigo-200/60 uppercase tracking-wider">
                  AI
                </span>
              </div>
              <p className="text-[10px] font-medium text-slate-500 hidden sm:block -mt-1">
                Student & Exam Marketplace
              </p>
            </div>
          </div>

          {/* Quick Search Input with Search Icon & Button */}
          <form 
            onSubmit={handleSearchSubmit} 
            className="hidden md:flex flex-1 max-w-md relative items-center"
          >
            <div className="relative w-full flex items-center">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                id="nav-search-input"
                type="text"
                placeholder="Search R.S. Aggarwal, Topper Notes, Calculator, UPSC..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100/80 hover:bg-slate-100 focus:bg-white border border-slate-200 focus:border-blue-500 text-sm rounded-full pl-10 pr-20 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
              />
              <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded-full"
                    title="Clear search"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="submit"
                  id="nav-search-submit-btn"
                  className="p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition shadow-xs flex items-center justify-center cursor-pointer"
                  title="Search marketplace"
                  aria-label="Search marketplace"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </form>

          {/* Nav Links Desktop */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              id="nav-home-link"
              onClick={() => navigateTo('home')}
              className={`hover:text-blue-600 transition cursor-pointer ${
                currentPage === 'home' ? 'text-blue-600 font-semibold' : ''
              }`}
            >
              Home
            </button>
            <button
              id="nav-marketplace-link"
              onClick={() => navigateTo('marketplace')}
              className={`hover:text-blue-600 transition cursor-pointer ${
                currentPage === 'marketplace' ? 'text-blue-600 font-semibold' : ''
              }`}
            >
              Marketplace
            </button>
            <button
              id="nav-ai-assistant-link"
              onClick={() => navigateTo('ai-assistant')}
              className={`inline-flex items-center gap-1 hover:text-indigo-600 transition cursor-pointer ${
                currentPage === 'ai-assistant' ? 'text-indigo-600 font-semibold' : ''
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              AI Assistant
            </button>
            <button
              id="nav-ai-analyzer-link"
              onClick={() => navigateTo('ai-analyzer')}
              className={`inline-flex items-center gap-1 hover:text-purple-600 transition cursor-pointer ${
                currentPage === 'ai-analyzer' ? 'text-purple-600 font-semibold' : ''
              }`}
            >
              <BrainCircuit className="w-3.5 h-3.5 text-purple-500" />
              Note Analyzer
            </button>
            <button
              id="nav-study-companion-link"
              onClick={() => navigateTo('ai-study-companion')}
              className={`inline-flex items-center gap-1 hover:text-amber-600 transition cursor-pointer ${
                currentPage === 'ai-study-companion' ? 'text-amber-600 font-semibold' : ''
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Study Companion
            </button>
          </nav>

          {/* Right Action Icons & Dashboard Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Sell Book Button */}
            <button
              id="nav-sell-btn"
              onClick={() => {
                if (currentUser.role !== 'seller') {
                  switchToSellerDemo();
                }
                navigateTo('add-listing');
              }}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold shadow-sm shadow-blue-500/20 hover:shadow-md transition cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Sell Item</span>
            </button>

            {/* Wishlist */}
            <button
              id="nav-wishlist-btn"
              onClick={() => navigateTo('wishlist')}
              className="p-2 text-slate-600 hover:text-rose-600 hover:bg-slate-100 rounded-xl relative transition cursor-pointer"
              title="Saved Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Messages */}
            <button
              id="nav-messages-btn"
              onClick={() => navigateTo('messages')}
              className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-xl relative transition cursor-pointer"
              title="Buyer & Seller Messages"
              aria-label="Messages"
            >
              <MessageSquare className="w-5 h-5" />
              {totalUnreadMessages > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalUnreadMessages}
                </span>
              )}
            </button>

            {/* User Dashboard Profile Menu */}
            <div className="relative">
              <button
                id="nav-user-menu-btn"
                onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
                className="flex items-center gap-2 p-1.5 hover:bg-slate-100 rounded-xl transition cursor-pointer border border-transparent hover:border-slate-200"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-200"
                />
                <div className="hidden xl:block text-left">
                  <p className="text-xs font-semibold text-slate-800 leading-tight">
                    {currentUser.name}
                  </p>
                  <p className="text-[10px] text-slate-500 capitalize">
                    {currentUser.role} Demo
                  </p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden xl:block" />
              </button>

              {/* Dropdown Menu */}
              {demoDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onClick={() => setDemoDropdownOpen(false)}
                >
                  <div className="p-2.5 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-slate-900">{currentUser.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold bg-blue-100 text-blue-800">
                        {currentUser.role === 'buyer' ? 'Aspirant' : 'Verified Seller'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{currentUser.collegeOrCity}</p>
                  </div>

                  <div className="py-1 text-sm text-slate-700">
                    <button
                      id="menu-dashboard-link"
                      onClick={() => navigateTo(currentUser.role === 'buyer' ? 'buyer-dashboard' : 'seller-dashboard')}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-left font-medium transition cursor-pointer"
                    >
                      <LayoutDashboard className="w-4 h-4 text-blue-600" />
                      <span>{currentUser.role === 'buyer' ? 'Buyer Dashboard' : 'Seller Dashboard'}</span>
                    </button>

                    <button
                      id="menu-profile-link"
                      onClick={() => navigateTo(currentUser.role === 'buyer' ? 'buyer-profile' : 'seller-profile')}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-left font-medium transition cursor-pointer"
                    >
                      <User className="w-4 h-4 text-indigo-600" />
                      <span>My Profile & Badges</span>
                    </button>

                    <div className="pl-6 py-1 space-y-1 text-xs">
                      <button
                        id="menu-sub-buyer-profile"
                        onClick={() => navigateTo('buyer-profile')}
                        className={`w-full text-left py-1 px-2 rounded font-medium transition ${
                          currentPage === 'buyer-profile' ? 'text-blue-600 font-bold bg-blue-50' : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        • Buyer Profile (Rahul)
                      </button>
                      <button
                        id="menu-sub-seller-profile"
                        onClick={() => navigateTo('seller-profile')}
                        className={`w-full text-left py-1 px-2 rounded font-medium transition ${
                          currentPage === 'seller-profile' ? 'text-purple-600 font-bold bg-purple-50' : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        • Seller Profile (Priya)
                      </button>
                    </div>

                    <button
                      id="menu-admin-link"
                      onClick={() => navigateTo('admin')}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-left font-medium transition cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Admin Moderation</span>
                    </button>
                  </div>

                  <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
                    <p className="px-3 py-1 font-semibold uppercase tracking-wider text-[10px] text-slate-400">
                      Switch Demo Role
                    </p>
                    <button
                      onClick={switchToBuyerDemo}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left transition cursor-pointer ${
                        currentUser.role === 'buyer' ? 'bg-blue-50 text-blue-700 font-semibold' : 'hover:bg-slate-50'
                      }`}
                    >
                      <span>Rahul (Buyer Demo)</span>
                      {currentUser.role === 'buyer' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                    </button>
                    <button
                      onClick={switchToSellerDemo}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left transition cursor-pointer ${
                        currentUser.role === 'seller' ? 'bg-purple-50 text-purple-700 font-semibold' : 'hover:bg-slate-50'
                      }`}
                    >
                      <span>Priya (Seller Demo)</span>
                      {currentUser.role === 'seller' && <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              id="nav-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
              aria-label="Toggle mobile navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              id="mobile-nav-search-input"
              type="text"
              placeholder="Search books, notes, exam, author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 border border-slate-200 text-sm rounded-xl pl-9 pr-24 py-2.5 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-slate-400 hover:text-slate-600"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="submit"
                id="mobile-search-submit-btn"
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1 cursor-pointer transition shadow-xs"
                aria-label="Search"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </button>
            </div>
          </form>

          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            <button
              onClick={() => { navigateTo('home'); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-slate-50 text-slate-800 text-left"
            >
              Home
            </button>
            <button
              onClick={() => { navigateTo('marketplace'); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-slate-50 text-slate-800 text-left"
            >
              Marketplace
            </button>
            <button
              onClick={() => { navigateTo('ai-assistant'); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-indigo-50 text-indigo-700 text-left flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              AI Assistant
            </button>
            <button
              onClick={() => { navigateTo('ai-analyzer'); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-purple-50 text-purple-700 text-left flex items-center gap-1.5"
            >
              <BrainCircuit className="w-4 h-4 text-purple-600" />
              Note Analyzer
            </button>
            <button
              onClick={() => { navigateTo('ai-study-companion'); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-amber-50 text-amber-700 text-left flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              Study Companion
            </button>
            <button
              onClick={() => { navigateTo('ai-recommender'); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-blue-50 text-blue-700 text-left"
            >
              AI Book Advisor
            </button>
            <button
              onClick={() => { navigateTo('about'); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-slate-50 text-slate-800 text-left"
            >
              About & Impact
            </button>
            <button
              onClick={() => { navigateTo('contact'); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-slate-50 text-slate-800 text-left"
            >
              Contact Support
            </button>
            <button
              onClick={() => { navigateTo('admin'); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-left"
            >
              Admin Panel
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => { switchToBuyerDemo(); setMobileMenuOpen(false); }}
              className="text-xs font-semibold text-blue-600 underline"
            >
              Buyer Demo (Rahul)
            </button>
            <button
              onClick={() => { switchToSellerDemo(); setMobileMenuOpen(false); }}
              className="text-xs font-semibold text-purple-600 underline"
            >
              Seller Demo (Priya)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
