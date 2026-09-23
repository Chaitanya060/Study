# Interview Prep — Chaitanya Kishore

A personal, **frontend-only React** website to prepare for startup & MNC interviews.
Built with **Vite + React + React Router**. No backend required — ready to deploy on **Vercel**.

## Pages

| Page | What it has |
| --- | --- |
| **Notes** | 24 topic buttons covering the full interview syllabus — Java, Python, Data Structures, Algorithms, DBMS/SQL, MongoDB/NoSQL, OS, Networks, HTML, CSS, JavaScript, React, Spring Boot, Hibernate/JPA, Microservices, REST, AWS/Cloud, Docker & DevOps, Linux, SDLC/Agile, System Design, Git, Testing, Cyber Security. Clean, easy-to-read notes from basic → advanced, with a per-topic search box. |
| **Q&A** | Interview questions & answers for every one of those topics, basic → advanced. **Java, Python & AWS** have a **Download PDF** button (top-right) that downloads that topic's Q&A as a PDF. |
| **OOP Concept** | A dedicated page explaining Object-Oriented Programming the easy way — with real-life examples — plus its own Notes and Q&A tabs (with a PDF download). |
| **HR & Intro** | A ready self-introduction (short + full version) — written fresh, not from the resume — plus common HR questions with sample answers. |
| **Projects** | Your 3 resume projects with likely interviewer questions from basic → advanced. |

## Design

- **Glassmorphism** — frosted translucent panels (`backdrop-filter: blur`) over an animated background.
- **Flowing-water background** — softly drifting color blobs + an animated gradient wash.
- **Fully responsive** — a mobile hamburger menu, wrapping topic pills, and fluid type; looks right on phones.
- Smooth fade/slide animations, and it respects `prefers-reduced-motion`.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build      # output goes to /dist
npm run preview    # preview the production build
```

## Deploy to Vercel (easiest way)

**Option A — GitHub + Vercel dashboard (recommended)**
1. Push this `interview-prep` folder to a GitHub repo.
2. Go to https://vercel.com → **Add New → Project** → import the repo.
3. Vercel auto-detects Vite. Confirm:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**. Done — you get a live URL.

**Option B — Vercel CLI**
```bash
npm i -g vercel
vercel          # first time: follow prompts
vercel --prod   # deploy to production
```

> `vercel.json` is already included with an SPA rewrite so routes like `/notes`,
> `/qa`, `/hr`, `/projects` work on refresh/direct-link.

## Edit the content

All content lives in plain data files — no need to touch the UI code:

- `src/data/notes.js` — notes per topic
- `src/data/qa.js` — Q&A per topic (`download: true` shows the PDF button)
- `src/data/importedQA.json` — full interview banks (Java 222, Python 108, Spring 135, AWS 129 Qs) imported from the prep PDFs, grouped by section; these override the curated lists on the Q&A page.
- `src/data/importedHR.json` — 55 HR / career-gap questions (shown on the HR page).
- `src/data/oop.js` — the dedicated OOP page (intro, notes, questions)
- `src/data/hr.js` — self intro + curated HR questions
- `src/data/projects.js` — projects + questions

To add a new topic, just add an object to the array — the buttons and pages update automatically.
