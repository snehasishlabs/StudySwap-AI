# StudySwap 📚✨

[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-Frontend-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-3E82F7.svg)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E.svg)](https://supabase.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI-4285F4.svg)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **StudySwap** is an AI-powered educational marketplace that enables students to buy, sell, and exchange books, handwritten notes, and study accessories while leveraging AI for recommendations, intelligent price suggestions, and resource discovery.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Problem Statement](#problem-statement)
3. [Proposed Solution](#proposed-solution)
4. [Key Features](#key-features)
5. [AI Features](#ai-features)
6. [Technology Stack](#technology-stack)
7. [Project Architecture](#project-architecture)
8. [Demo Accounts](#demo-accounts)
9. [Installation & Local Setup](#installation--local-setup)
10. [Deployment Instructions](#deployment-instructions)
11. [Documentation](#documentation)
12. [Future Scope](#future-scope)
13. [Team Information](#team-information)
14. [License](#license)

---

## 🎯 Project Overview

Every semester, millions of students spend thousands of rupees on academic books, competitive exam guides (UPSC, NEET, JEE, GATE, SSC), and lab instruments. Simultaneously, senior students hold stacks of pristine notes and books that end up gathering dust or being sold at scrap value. 

**StudySwap** creates a vibrant peer-to-peer campus ecosystem where students can buy, sell, or barter academic resources sustainably and affordably.

---

## ⚠️ Problem Statement

- **High Financial Burden**: Academic textbooks and competitive exam bundles cost students thousands of rupees every academic year.
- **Information Asymmetry**: Finding authentic topper notes, second-hand books, or specific exam editions (e.g., latest M. Laxmikanth UPSC edition) relies on fragmented WhatsApp groups and offline bulletin boards.
- **Environmental Waste**: Tons of paper and study materials are discarded or recycled prematurely after a single exam cycle.
- **Lack of Smart Pricing**: Sellers struggle to price their used books fairly, and buyers have no way to compare notes or verify resource quality.

---

## 💡 Proposed Solution

StudySwap provides a unified, AI-driven peer-to-peer marketplace that:
1. **Connects Verified Students**: Enables secure direct chat, price negotiation, and physical handoff coordination on campus.
2. **Leverages Gemini AI**: Analyzes study notes quality, recommends high-yield book bundles, and powers an intelligent AI study companion.
3. **Implements Comparison & Analytics**: Allows side-by-side comparison of up to 3 listings with price, condition, seller rating, and completeness metrics.
4. **Promotes Sustainability**: Tracks paper saved and carbon offset for every book exchanged.

---

## ✨ Key Features

- 🛒 **Rich Marketplace**: Filter by Category (Books, Handwritten Notes, Accessories), Exam (UPSC, NEET, JEE, GATE, SSC), Price, Condition, and Location.
- 💬 **Live P2P Chat & Negotiation**: Real-time mock chat threads with interactive offer making (e.g., make an offer of ₹270 on a ₹300 book) and deal confirmation.
- ⚖️ **Side-by-Side Comparison**: Compare up to 3 study listings simultaneously across pricing, condition, pages, and ratings.
- 📦 **Add Listing Wizard**: Publish new books or handwritten notes in seconds with condition sliders and preset thumbnail generators.
- 📍 **Campus Map & Handoff**: Interactive location viewer for safe on-campus meetups (e.g., College Library, Campus Gate).
- 👤 **Dual Role Dashboards**: Dedicated views for Buyers (Wishlist, active orders, saved searches) and Sellers (Active listings, earnings, inquiry metrics, sold toggles).

---

## 🤖 AI Features

Powered by Google Gemini AI:
1. **AI Study Assistant**: Interactive study companion answering academic and resource questions.
2. **AI Note Quality Analyzer**: Evaluates handwritten notes for legibility, diagram clarity, and completeness.
3. **AI Book & Exam Recommender**: Tailored resource discovery based on target exam and syllabus gaps.
4. **Instant Semantic Search**: Intelligent multi-token search across subjects, authors, and publishers.

---

## 🛠️ Technology Stack

- **Frontend**: React 18+, Vite, TypeScript
- **Styling**: Tailwind CSS, Lucide React Icons
- **Animations**: Motion (Motion for React)
- **Backend / Database**: Supabase & PostgreSQL (Schema documented in app & DB schema viewer)
- **AI Integration**: Google Gemini API (`@google/genai`)

---

## 🏗️ Project Architecture

```text
User / Student
     │
     ▼
React Frontend (Vite + Tailwind CSS)
     │
     ├──────────► Supabase Backend / PostgreSQL Database
     │
     └──────────► Google Gemini AI Services (Analysis, Recommendations, Chat)
```

- **Frontend Layer**: Client-side single-page application with responsive layouts, modal overlays, and toast notifications.
- **Backend & Database Layer**: Relational PostgreSQL schema managing Users, Listings, Chat Threads, Messages, and Wishlists.
- **AI Service Layer**: Server-side proxy handling Gemini generative requests securely.

---

## 👥 Demo Accounts

You can switch between buyer and seller demo states instantly within the application navigation:

### 🛒 Buyer Demo
- **Name**: Rahul Sharma
- **Location**: Kolkata (Presidency / CU Campus)
- **Target Exam**: SSC CGL & UPSC Prelims

### 🏷️ Seller Demo
- **Name**: Priya Verma
- **Location**: Kolkata (College Street Academic Hub)
- **Rating**: ⭐ 4.8 (52 successful handoffs)

---

## 🚀 Installation & Local Setup

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/studyswap.git
   cd studyswap
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Fill in your Supabase and Gemini credentials.

4. **Run development server**:
   ```bash
   npm run dev
   ```

5. **Open in browser**:
   Navigate to `http://localhost:3000`.

---

## 🚢 Deployment Instructions

1. **Build for production**:
   ```bash
   npm run build
   ```
2. **Preview production build**:
   ```bash
   npm run preview
   ```
3. **Deploy**: Deploy the `dist/` output to Vercel, Netlify, or Google Cloud Run.

---

## 📂 Documentation

Detailed documentation is available in the [`docs/`](./docs) folder:
- [`ProblemStatement.md`](./docs/ProblemStatement.md)
- [`Solution.md`](./docs/Solution.md)
- [`USP.md`](./docs/USP.md)
- [`Architecture.md`](./docs/Architecture.md)
- [`FutureScope.md`](./docs/FutureScope.md)

---

## 🔭 Future Scope

- **Real-Time WebSockets**: Live multi-user chat and instant inventory status updates via Supabase Realtime.
- **AI Price Oracle**: Automated market price suggestions based on historical campus demand.
- **University Verification**: `.edu` student email verification to ensure 100% trusted campus transactions.
- **Library Barcode Scanner**: Instant listing creation by scanning book ISBN barcodes.

---

## 🏆 Team Information

- **Project Name**: StudySwap
- **Hackathon**: AI & EdTech Innovation Hackathon
- **Contributors**: Open Source Community & Engineering Team

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for more information.
