import React, { useEffect } from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { DbSchemaModal } from './components/common/DbSchemaModal';
import { CompareModal } from './components/common/CompareModal';
import { CompareFloatingBar } from './components/common/CompareFloatingBar';
import { FloatingChatbox } from './components/ai/FloatingChatbox';

import { HomePage } from './pages/HomePage';
import { MarketplacePage } from './pages/MarketplacePage';
import { ListingDetailsPage } from './pages/ListingDetailsPage';
import { BuyerDashboardPage } from './pages/BuyerDashboardPage';
import { SellerDashboardPage } from './pages/SellerDashboardPage';
import { AddListingPage } from './pages/AddListingPage';
import { AiAssistantPage } from './pages/AiAssistantPage';
import { AiNoteAnalyzerPage } from './pages/AiNoteAnalyzerPage';
import { AiBookRecommenderPage } from './pages/AiBookRecommenderPage';
import { AiStudyCompanionPage } from './pages/AiStudyCompanionPage';
import { MessagesPage } from './pages/MessagesPage';
import { WishlistPage } from './pages/WishlistPage';
import { BuyerProfilePage } from './pages/BuyerProfilePage';
import { SellerProfilePage } from './pages/SellerProfilePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPanelPage } from './pages/AdminPanelPage';

export function AppContent() {
  const { currentPage, setIsDbSchemaModalOpen, theme } = useApp();

  // Scroll to top on page transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (currentPage === 'db-schema') {
      setIsDbSchemaModalOpen(true);
    }
  }, [currentPage, setIsDbSchemaModalOpen]);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'marketplace':
        return <MarketplacePage />;
      case 'listing-details':
        return <ListingDetailsPage />;
      case 'buyer-dashboard':
        return <BuyerDashboardPage />;
      case 'seller-dashboard':
        return <SellerDashboardPage />;
      case 'add-listing':
        return <AddListingPage />;
      case 'ai-assistant':
        return <AiAssistantPage />;
      case 'ai-analyzer':
        return <AiNoteAnalyzerPage />;
      case 'ai-recommender':
        return <AiBookRecommenderPage />;
      case 'ai-study-companion':
        return <AiStudyCompanionPage />;
      case 'messages':
        return <MessagesPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'buyer-profile':
        return <BuyerProfilePage />;
      case 'seller-profile':
        return <SellerProfilePage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'admin':
        return <AdminPanelPage />;
      case 'db-schema':
        return <MarketplacePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 selection:bg-blue-600 selection:text-white ${
      theme === 'dark' 
        ? 'bg-slate-950 text-slate-100' 
        : theme === 'sepia' 
        ? 'bg-[#fbf7ee] text-[#3e2f20]' 
        : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Top Main Navigation */}
      <Navbar />

      {/* Main Routed Page Content */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Global Toast Notifications */}
      <ToastContainer />

      {/* Supabase / PostgreSQL Schema Modal */}
      <DbSchemaModal />

      {/* Compare Listings Modal & Floating Bar */}
      <CompareModal />
      <CompareFloatingBar />

      {/* Floating Chatbox Widget */}
      {currentPage !== 'messages' && <FloatingChatbox />}
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
