# System Architecture

## Architectural Blueprint

```text
       ┌────────────────────────────────────────────────────────┐
       │                     Student / User                     │
       └──────────────────────────┬─────────────────────────────┘
                                  │ HTTPS / Web Interface
                                  ▼
       ┌────────────────────────────────────────────────────────┐
       │            React Frontend (Vite + Tailwind)            │
       │  • Single Page Application (SPA)                       │
       │  • Client State Management & Local Storage Persistence │
       │  • Responsive Component Tree                           │
       └──────────┬──────────────────────────────────┬──────────┘
                  │                                  │
                  │ REST / Query                     │ AI Prompt / SDK
                  ▼                                  ▼
       ┌──────────────────────┐           ┌─────────────────────┐
       │   Supabase Backend   │           │  Google Gemini API  │
       │  • PostgreSQL DB     │           │  • Note Analysis    │
       │  • Relational Schema │           │  • AI Recommender   │
       │  • Auth & Policies   │           │  • Study Companion  │
       └──────────────────────┘           └─────────────────────┘
```

## Layer Descriptions

1. **Presentation Layer (Frontend)**:
   - Built with React 18, TypeScript, and Tailwind CSS.
   - Component architecture organized into common UI elements, marketplace widgets, dashboard panels, and AI assistants.

2. **Backend & Persistence Layer**:
   - Supabase providing a robust PostgreSQL relational database storing Listings, Users, Chat Threads, Messages, and Wishlists.

3. **Intelligence Layer (AI)**:
   - Google Gemini SDK (`@google/genai`) powering semantic search, study note evaluations, and intelligent book recommendations.
