# typing.code

A typing practice app designed specifically for me to write C++ solutions fast in Online Assessments.

---

## Features

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


## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **State & Storage**: React Context + localStorage
- **Audio**: Web Audio API


