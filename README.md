# NEXORAA — Building What Comes Next

Official platform for **NEXORAA**, an elite technology collective and research lab focused on Artificial Intelligence, Distributed Full Stack Systems, Cybersecurity, Developer Tools, and Experimental R&D.

---

## ⚡ Quick Start

### 1. Prerequisites
- **Node.js** v18+ (tested with v24)
- **npm** v9+
- *(Optional)* **MongoDB** local instance or **MongoDB Atlas** connection string (the system automatically falls back to an atomic, persistent local storage engine with zero downtime if MongoDB is not present).

---

### 2. Installation & Setup

```bash
# Clone or enter directory
cd c:\Users\ODIN\Downloads\nexoraa

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

---

### 3. Running the Platform

In terminal 1 (Backend API Server on port 5000):
```bash
cd backend
npm start
```

In terminal 2 (Vite Frontend Development Server on port 5173):
```bash
cd frontend
npm run dev
```

Visit the website at: **`http://localhost:5173`**  
API telemetry console: **`http://localhost:5000/api/system/stats`**

---

## 🔐 Admin CMS Credentials

- **Admin Login Route**: `/admin/login`
- **Default Email**: `admin@nexoraa.tech`
- **Default Password**: `nexoraa_admin_2026!`
- **JWT Expiry**: 7 Days
- **Role**: `SUPER_ADMIN` with backend-enforced RBAC

---

## 🏗️ Architecture & Philosophy

Inspired by minimalist editorial typography, negative space, and physical spring animations:
- **Design Reference Style**: Sahiko-inspired asymmetric composition, tight line-height, monospace metadata labels, controlled accents.
- **Color System**:
  - Primary Background: `#080D1D`
  - Secondary Background: `#0D1428`
  - Dark Blue: `#111A35`
  - Indigo: `#3036A6`
  - Electric Blue: `#3478F6`
  - Cyan: `#22D3EE`
  - Light Cyan: `#67E8F9`
  - Primary Text: `#F5F7FF`
  - Secondary Text: `#A7B0C5`
- **Interactive Stacked Cards**: Framer Motion physical spring physics with overlapping depth, dynamic category selection, and mobile-optimized responsiveness.
- **RAG Chatbot Engine**: Real-time context grounding on all Nexoraa projects, team members, and research papers with zero hallucination.

---

## 🚀 Projects Catalog

1. **NEXUS**: AI-Powered Team Collaboration & Autonomous Project Execution Platform
2. **NETRAAI**: National Hackathon-Winning Edge Crowd-Safety Vision Perception Framework
3. **MINDWEAVE**: Neuro-Symbolic Cognitive Intelligence Engine with Formal Theorem Proofs
4. **BRIEFBOX**: High-Throughput Autonomous Document Extraction & Vector RAG Platform
5. **XAPEXX**: Local-First Mesh Synchronization Protocol with CRDT Reconciliation

---

## 📁 Repository Structure

```
nexoraa/
├── assets/                  # High-resolution official logos and project graphics
├── backend/
│   ├── config/              # MongoDB connection & fallback manager
│   ├── controllers/         # REST API route handlers
│   ├── data/                # Seed data & persistent db.json store
│   ├── middleware/          # JWT verification & RBAC authorization
│   ├── models/              # Mongoose schema definitions
│   ├── routes/              # Express API endpoints
│   ├── services/            # Unified storage & RAG query engine
│   ├── .env                 # Environment variables
│   └── server.js            # Express application entry
├── frontend/
│   ├── public/              # Favicon, sitemap.xml, robots.txt, assets
│   ├── src/
│   │   ├── components/      # Logo, StackedCards, Navbar, Footer, Cursor, AIChatbot
│   │   ├── context/         # AuthContext, ThemeContext
│   │   ├── pages/           # Home, About, Projects, Detail, Research, Team, Join, Admin
│   │   ├── sections/        # Modular editorial sections
│   │   ├── services/        # Axios API client
│   │   ├── App.jsx          # Route definitions & preloader
│   │   ├── index.css        # Design tokens, variables & typography
│   │   └── main.jsx         # Vite entry point
│   ├── tailwind.config.js   # Tailwind custom design tokens
│   └── vite.config.js       # Vite configuration with API proxy
└── README.md
```

---

© 2026 NEXORAA TECHNOLOGY COLLECTIVE. ALL RIGHTS RESERVED.
