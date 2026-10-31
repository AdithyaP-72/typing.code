# 🏎️ DSA TypeRacer

A typing practice app designed specifically for competitive programmers and interview candidates to build raw muscle memory for writing C++ solutions fast in Online Assessments (OAs).

Instead of random prose, you type real, compact, human-written C++ DSA solutions (Blind 75, Striver's A2Z, NeetCode 150) under real typing metrics.

---

## ✨ Features

- **LeetCode / Monaco Editor Mechanics**:
  - **Lenient Mode (Default)**: Mistakes are highlighted in red without abruptly halting your cursor, preserving your typing flow.
  - **Auto-Indent**: Hitting `Enter` automatically positions your cursor at the exact indentation of the next line — zero manual spacebar spamming.
  - **Auto-Closing Brackets & Overtype**: Handles `()`, `{}`, `[]`, and `""` with Monaco-style overtype.
  - **Tab Handling**: Tab inserts 4 spaces.
- **End Session Anytime**: Stop at any point during a problem with `Ctrl + Enter` or the "End Session" button to inspect your instant WPM, accuracy, and speed curve.
- **136 Curated C++ Solutions**:
  - Blind 75, Striver's A2Z DSA sheet, and NeetCode 150.
  - Formatted in realistic competitive-programming style: compact syntax (`for(int i=0;i<n;i++)`, `unordered_map<int,int> mp;`, `a=a+2;`), short variables (`n, m, i, j, k, ans, res, mp, dq`), and zero comments.
- **Offline Audio Feedback**:
  - Synthesized mechanical key click sounds via the browser Web Audio API (zero audio file dependencies).
- **Client-Side Persistence**:
  - All metrics, personal bests, and streaks are persisted in `localStorage`. No backend or database required.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or pnpm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/dsa-typeracer.git
cd dsa-typeracer

# Install dependencies
npm install

# Start local dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🌐 Deploy to Vercel

### Option 1: Vercel CLI

```bash
npm i -g vercel
vercel
```

### Option 2: GitHub Integration

1. Push this repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import your repository.
4. Framework preset: **Vite**.
5. Click **Deploy**.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **State & Storage**: React Context + localStorage
- **Audio**: Web Audio API (synthesized click and chime sounds)

---

## 📄 License

MIT License — Feel free to use and modify for your personal practice.
