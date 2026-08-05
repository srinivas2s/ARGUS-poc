# ARGUS — Agentic Relational Graph for Unified Safeguarding

> *An Autonomous AI-Powered Investigative Intelligence Platform for Child Protection Investigators*

---

![ARGUS System Interface](https://img.shields.io/badge/CLASSIFICATION-TOP%20SECRET%20%2F%20AIR--GAPPED-000000?style=for-the-badge&logo=shield&logoColor=white)
![AI Intelligence](https://img.shields.io/badge/ENGINE-AUTONOMOUS%20MULTI--AGENT-222222?style=for-the-badge)

### Technology Stack & AI Engine Badges
![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-000000?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React_18-000000?style=for-the-badge&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-000000?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-000000?style=for-the-badge&logo=framer&logoColor=white)
![Neo4j](https://img.shields.io/badge/Neo4j_Graph-000000?style=for-the-badge&logo=neo4j&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI_GPT--4o-000000?style=for-the-badge&logo=openai&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini_3.6-000000?style=for-the-badge&logo=google&logoColor=white)
![Anthropic Claude](https://img.shields.io/badge/Claude_3.5-000000?style=for-the-badge&logo=anthropic&logoColor=white)
![DeepSeek](https://img.shields.io/badge/DeepSeek_R1-000000?style=for-the-badge&logo=matrix&logoColor=white)

---

## Executive Summary

**ARGUS** (*Agentic Relational Graph for Unified Safeguarding*) is an advanced, autonomous digital intelligence platform designed to empower child protection investigators in digital crime divisions. 

Unlike conventional AI chatbots, ARGUS **behaves as an active digital co-investigator**. It continuously observes incoming forensic telemetry, remembers cross-platform data entities, correlates non-obvious relationships, generates probabilistic hypotheses, logs step-by-step agentic operations, and produces court-ready intelligence briefs under human-in-the-loop governance.

---

## Visual & Design Language

Inspired by **Palantir Gotham**, **Interpol Intelligence Systems**, **Jarvis**, and **Cybersecurity Operation Centers (SOC)**:

- **Background**: `#000000` *(Pitch Black with Tactical Cyan Cyber-Grid Backdrop)*
- **Cards & Panels**: `rgba(15, 23, 42, 0.75)` *(Glassmorphic Dark Slate with `backdrop-filter: blur(14px)`)*
- **Borders**: `rgba(30, 41, 59, 0.8)` *(Glowing Cyber Borders)*
- **Primary Accent**: `#00E5FF` *(Cyan Cyber Glow)*
- **Secondary Accent**: `#FF006E` *(Hot Pink Threat Risk Alert)*
- **Tertiary Accent**: `#8B5CF6` *(Purple Intelligence Accent)*
- **Text & Muted**: `#F8FAFC` *(High-Contrast White)* & `#94A3B8` *(Tactical Slate)*

---

## System Architecture & Workflow

```
                        ┌─────────────────────────────────────────┐
                        │      ARGUS SYSTEM CORE ARCHITECTURE     │
                        └────────────────────┬────────────────────┘
                                             │
      ┌──────────────────────────────────────┼──────────────────────────────────────┐
      │                                      │                                      │
┌─────▼──────────────┐             ┌─────────▼───────────┐                ┌─────────▼───────────┐
│ MULTI-MODAL DATA   │             │   RELATIONAL GRAPH  │                │   LIVING NOTEBOOK   │
│ INGESTION ENGINE   │             │   NEO4J MATRIX      │                │   AGENTIC AUDIT LOG │
│ • EXIF Metadata    │             │ • 9 Entity Classes  │                │ • Sub-Agent Steps   │
│ • Steganography LSB│ ──────────► │ • 6 Link Types      │ ─────────────► │ • Risk Recalculation│
│ • Cell Tower Pings │             │ • Vector Topologies │                │ • Officer Sign-off  │
│ • Chat Transcripts │             └─────────────────────┘                └─────────────────────┘
└────────────────────┘                                                              │
                                                                                    │
                                                                          ┌─────────▼───────────┐
                                                                          │  EXPLAINABLE AI &   │
                                                                          │  REPORT GENERATOR   │
                                                                          │ • Supervisor Sign-off│
                                                                          │ • PDF Intel Brief   │
                                                                          └─────────────────────┘
```

---

## Key Feature Modules

### 1. Animated Hero Landing Page (`/`)
- Glowing radar sweep animation with title, subtitle, security badge, and direct call-to-action button to enter the **Tactical War Room**.

### 2. Global Command Layout (`/layout`)
- **Top Header**: Real-time IST & UTC clocks, active case switcher (`CASE-2026-KL-8942`), dynamic threat score pill (`89.4% HIGH THREAT`), active AI provider pill (`Gemini 3.6 Flash`).
- **Sidebar**: Glowing navigation items with live notification counts and air-gapped status indicators.

### 3. Command Dashboard (`/dashboard`)
- **6 Key Metric Cards**: Active Investigations (14), High-Risk Alerts (7), Connected Entities (342), Synthetic Media Detections (19), Timeline Events (1,280), Evidence Items (84).
- **Threat Velocity & Risk Elevation Chart**: Recharts area graph depicting composite risk elevation over time.
- **Relational Entity Matrix**: Bar chart mapping active graph nodes by entity category.
- **High-Threat Suspect Quick-Peek**: Cards highlighting primary targets Anil M. (`@shadow_net_99`) and Rashid K. (`@dark_harbor`).

### 4. Tactical War Room (`/war-room`)
- The main operational command center combining:
  - **Evidence Inventory Panel**: Raw forensic files, hashes, and CSAM severity ratings.
  - **Selected Node Inspector**: Deep metadata attribute breakdown.
  - **Interactive Relational Graph Canvas**: Zoomable SVG node-edge canvas with live entity filtering.
  - **Timeline Scrubber**: Real-time event sequence playback.
  - **Living Notebook Stream**: Real-time audit log of sub-agent activity.
  - **Composite Threat Level Gauge**: Real-time 89.4% risk score alert.

### 5. Categorized Clue Board (`/clues`)
- Organized grid grouped across **8 Forensic Categories**:
  1. **Suspects**: Dark web handles, NLP stylometry fingerprints.
  2. **Locations**: BSSID cell tower triangulation, regional district overlays.
  3. **Aliases**: Handles across Telegram, Instagram, Matrix, and Discord.
  4. **Accounts**: ProtonMail relays, darknet group channels (`ShieldVault`).
  5. **Conversations**: Multilingual chat transcripts with grooming keyword flags.
  6. **Metadata**: LSB steganography ciphers embedded in image files.
  7. **Devices**: Apple iPhone 14 Pro hardware serials, eSIM profiles in regional divisions.
  8. **Patterns**: Nighttime activity spikes (22:00 IST - 01:30 IST).

### 6. Dynamic Connection Map (`/connections`)
- Visual graph canvas mapping **9 Entity Types**:
  - `Person`, `Victim`, `Device`, `Account`, `Location`, `Vehicle`, `Image`, `Audio`, `Video`
- Directional links covering **6 Relationship Types**:
  - `Owns`, `Uploaded`, `Contacted`, `Shared`, `Located at`, `Connected with`

### 7. Timeline Reconstruction Engine (`/timeline`)
- Time-ordered digital footprint scrubber tracing events:
  - **10:25 PM**: Instagram account `@shadow_net_99` created.
  - **10:42 PM**: Flagged message detected.
  - **11:08 PM**: Cell tower location identified in central junction.
  - **11:21 PM**: Secondary Telegram admin handle discovered.
  - **11:35 PM**: Risk score escalated to 89.4% CRITICAL.

### 8. Living Investigation Notebook (`/notebook`) — *Core Highlight*
- Continuous audit ledger tracking every autonomous sub-agent operation:
  - **08:10 PM**: Image entered into system (`EVID-9921.png`).
  - **08:12 PM**: EXIF metadata extracted (GPS coordinates).
  - **08:15 PM**: Facial biometric matching initiated against Interpol & offender registries.
  - **08:17 PM**: Additional account identified (`@dark_harbor`).
  - **08:20 PM**: Timeline updated with 5 new timestamps.
  - **08:24 PM**: Risk score recalculated (89.4%).
  - **08:30 PM**: Senior supervisor review requested.
- Allows manual officer note injection and JSON audit ledger export.

### 9. AI Hypothesis Engine (`/hypotheses`)
- Probabilistic hypothesis cards with confidence ratings and reasoning chains:
  - **Hypothesis A** (Confidence: **91%**): *Suspect A (@shadow_net_99) and Suspect B (@dark_harbor) are the same individual.*
  - **Hypothesis B** (Confidence: **82%**): *Victim location shifted between two timestamps via transit corridor.*
  - **Hypothesis C** (Confidence: **88%**): *Coordinated network of 5 bot accounts distributing encrypted media links.*
- Includes investigator **Validate** and **Reject** controls.

### 10. Official Case Report Generator (`/reports`)
- Generates a full printable intelligence brief with Executive Summary, Timeline, Connections, Evidence, Clues, Hypotheses, Risk Assessment, and Tactical Interception Directives.

### 11. Autonomous Watchtower Mode (`/watchtower`)
- Real-time simulation stream firing automated event pings, relationship discovery updates, and live threat scoring with play/pause controls.

### 12. Explainable AI (XAI) & Auditability (`/explainable-ai`)
- Human-in-the-Loop governance dashboard showing step-by-step reasoning traces, input/output vectors, attributed evidence sources, and official supervisor approval sign-offs.

### 13. Model-Independent AI Orchestration Layer (`/settings`)
- Abstracted model switcher supporting **7 AI Engine Providers**:
  - **OpenAI** (`gpt-4o`, `o3-mini`)
  - **Google Gemini** (`gemini-3.6-flash`, `gemini-1.5-pro`)
  - **Anthropic Claude** (`claude-3-5-sonnet`)
  - **DeepSeek** (`deepseek-r1-full`)
  - **Meta Llama** (`llama-3.3-70b-instruct`)
  - **Mistral** (`mistral-large-2407`)
  - **Local Models** (`ollama/llama3.2-vision:11b-q8` for air-gapped secure deployment)
- Configurable API keys, temperature sliders, memory architectures (Hybrid Neo4j + Vector DB), and tool permissions.

---

## Tech Stack & Dependencies

| Layer | Technology | Badge Logo |
|---|---|---|
| **Framework** | Next.js 14+ (App Router) | ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white) |
| **Language** | TypeScript | ![TypeScript](https://img.shields.io/badge/TypeScript-000000?style=flat-square&logo=typescript&logoColor=white) |
| **UI Library** | React 18 | ![React](https://img.shields.io/badge/React-000000?style=flat-square&logo=react&logoColor=white) |
| **Styling** | Tailwind CSS + Custom Cyber Glow | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-000000?style=flat-square&logo=tailwindcss&logoColor=white) |
| **Animations** | Framer Motion | ![Framer Motion](https://img.shields.io/badge/Framer_Motion-000000?style=flat-square&logo=framer&logoColor=white) |
| **Graph Visualization** | SVG Interactive Matrix / `@xyflow/react` | ![Neo4j](https://img.shields.io/badge/Graph_Engine-000000?style=flat-square&logo=neo4j&logoColor=white) |
| **Charts & Metrics** | Recharts | ![Recharts](https://img.shields.io/badge/Recharts-000000?style=flat-square&logo=chartdotjs&logoColor=white) |
| **AI Orchestration** | OpenAI / Gemini / Claude / DeepSeek / Local | ![AI Providers](https://img.shields.io/badge/Multi--Model-000000?style=flat-square&logo=openai&logoColor=white) |

---

## Installation & Setup Instructions

### Prerequisites
- Node.js `v18+` or `v20+`
- npm or yarn

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Launch Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the live ARGUS command center interface.

---

## Project Folder Structure

```
argus-poc/
├── README.md                      # System documentation & guide
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
├── public/                        # Cyber iconography assets
└── src/
    ├── app/                       # Next.js App Router views
    │   ├── page.tsx               # Hero Landing Page
    │   ├── dashboard/page.tsx     # Command Dashboard
    │   ├── war-room/page.tsx      # Tactical War Room
    │   ├── clues/page.tsx         # Categorized Clue Board
    │   ├── connections/page.tsx   # Dynamic Connection Map
    │   ├── timeline/page.tsx      # Timeline Reconstruction Engine
    │   ├── notebook/page.tsx      # Living Investigation Notebook
    │   ├── hypotheses/page.tsx    # AI Hypothesis Engine
    │   ├── reports/page.tsx       # Official Case Report Generator
    │   ├── watchtower/page.tsx    # Autonomous Watchtower Mode
    │   ├── explainable-ai/page.tsx# XAI & Auditability Dashboard
    │   ├── settings/page.tsx      # AI Orchestration Settings
    │   └── globals.css            # Cyber grid, glassmorphism, neon glows
    ├── components/                # Reusable UI & Layout Components
    │   ├── layout/                # Header & Sidebar
    │   └── graph/                 # Interactive Canvas Graph
    ├── lib/                       # Data models & state engine
    │   ├── mockData.ts            # Child protection investigation dataset
    │   ├── store.ts               # Reactive state manager
    │   └── ai-orchestrator.ts     # Multi-provider model abstraction
    ├── types/                     # TypeScript interfaces
    │   ├── index.ts               # Entity, Clue, Hypothesis, XAI types
    │   └── jsx.d.ts               # Global JSX & module type declarations
    ├── agents/                    # Sub-agent orchestration modules
    ├── memory/                    # Hybrid memory abstraction
    ├── graph/                     # Graph services
    ├── plugins/                   # Forensic plugin registries
    ├── timeline/                  # Timeline services
    ├── reports/                   # Report rendering services
    ├── clues/                     # Clue matrix services
    ├── notebook/                  # Audit ledger services
    ├── settings/                  # Config services
    └── dashboard/                 # Metric calculation services
```

---

## Security & Air-Gapped Compliance

- **Air-Gapped Deployment Ready**: ARGUS can run entirely offline using local LLMs (Ollama / vLLM) for high-security environments.
- **Human-in-the-Loop Governance**: High-risk actions and risk score recalculations require explicit supervisor sign-off.
- **Immutable Operational Audit Trail**: Every sub-agent operation is logged sequentially in the Living Notebook.

---

## License & Credits

Developed for Child Protection & Cyber Crime Investigation Divisions.
