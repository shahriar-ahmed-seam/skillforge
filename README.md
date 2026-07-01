<div align="center">

# 🎓 SkillForge

### AI-native learning studio — type any topic, get a whole course.

Syllabus, in-depth lessons and quizzes, generated on demand. Local-first with **Ollama**, with a full **hosted demo mode** so it works anywhere.

[**▶ Live Demo**](https://skillforge-seam.vercel.app) · [Report a bug](https://github.com/shahriar-ahmed-seam/skillforge/issues) · [Request a feature](https://github.com/shahriar-ahmed-seam/skillforge/issues)

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white) ![Ollama](https://img.shields.io/badge/Ollama-gemma3:4b-000?logo=ollama) ![License](https://img.shields.io/badge/license-MIT-green)

</div>

---

## Overview

SkillForge turns a single sentence into a complete, structured learning experience. Enter a topic — *“Rust ownership”*, *“Baroque music”*, *“Kubernetes networking”* — and it generates:

1. **A syllabus** — a coherent sequence of chapters that build from fundamentals to real projects.
2. **Lessons** — detailed markdown lessons written on demand, with examples and code blocks.
3. **Quizzes** — auto-generated multiple-choice checks with instant feedback and explanations.

Everything can run **entirely on your own machine** via [Ollama](https://ollama.com) — private, offline and free. When no local model is available (like the hosted demo), SkillForge transparently falls back to **demo mode** so every feature stays interactive.

## Features

- 🪄 **On-demand course generation** from any topic, with a type-safe structure (Zod).
- 📖 **Rich lessons** rendered as clean, readable markdown (GFM).
- 🏆 **Adaptive quizzes** with scoring, explanations, and a confetti burst on a perfect run.
- 📚 **Unlimited personal library** — courses, progress and completion persist in the browser.
- 🔒 **Local-first & private** — runs against your Ollama (`gemma3:4b` by default). No API keys, no metering.
- 🌐 **Runs anywhere** — built-in demo mode keeps the deployed site fully functional.
- 🎨 **Cinematic, responsive UI** — custom design system, dark by default, glassmorphism and aurora gradients.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router, Server Actions) |
| Language | TypeScript |
| AI | Ollama via the Vercel AI SDK (`generateObject`, `streamText`) |
| Validation | Zod schemas for every generated structure |
| State | Zustand (with `localStorage` persistence) |
| UI | Tailwind CSS + Radix primitives + lucide-react |

## Getting started

```bash
git clone https://github.com/shahriar-ahmed-seam/skillforge.git
cd skillforge
npm install
```

### Run with local AI (recommended)

Install [Ollama](https://ollama.com) and pull the default model:

```bash
ollama pull gemma3:4b
```

Then start the dev server:

```bash
npm run dev
```

Open <http://localhost:3000>. See [OLLAMA_SETUP.md](OLLAMA_SETUP.md) for models and troubleshooting.

### Run without AI (demo mode)

No Ollama? It still works. SkillForge auto-detects that the model is unreachable and serves curated demo content, so you can explore the full flow.

## Configuration

All settings are optional (see [`.env.example`](.env.example)):

| Variable | Default | Description |
| --- | --- | --- |
| `OLLAMA_BASE_URL` | `http://localhost:11434/v1` | Ollama OpenAI-compatible endpoint |
| `OLLAMA_MODEL` | `gemma3:4b` | Local model used for generation |
| `AI_MODE` | `auto` | `auto` (try Ollama, fall back to demo), `ollama` (always local), or `demo` (always demo) |

On Vercel, `AI_MODE` defaults to `demo` automatically.

## How it works

```
 User topic
     │
     ▼
 Server Action ──▶ lib/ai.ts ──▶ Ollama (gemma3:4b)   ✅ available → real content
     │                                    │
     │                                    ✗ unreachable
     ▼                                    ▼
 Zod-validated result           lib/demo.ts (curated fallback)
     │
     ▼
 Zustand store (persisted) ──▶ React UI (sidebar, lesson, quiz)
```

## Project structure

```
src/
├── app/
│   ├── actions/            # Server actions (syllabus, lesson, quiz)
│   ├── dashboard/          # The learning studio
│   ├── page.tsx            # Cinematic landing page
│   └── globals.css         # Design system + prose styling
├── components/             # Header, Sidebar, ContentArea, QuizCard, ...
│   └── ui/                 # Radix-based primitives
├── lib/
│   ├── ai.ts               # Ollama provider + mode selection
│   ├── demo.ts             # Deterministic fallback content
│   ├── images.ts           # Curated Unsplash imagery + attribution
│   └── schemas.ts          # Zod schemas & types
├── store/courseStore.ts    # Zustand state (persisted)
└── types/course.ts         # Core domain types
```

## Deploy

Deploys to **Vercel** as-is. On the hosted build `AI_MODE` defaults to `demo`, so the live site is fully interactive without a backend.

```bash
vercel --prod
```

To point a deployment at a *remote* Ollama, set `OLLAMA_BASE_URL` and `AI_MODE=ollama` in the project's environment variables.

## Credits

- Local inference by [Ollama](https://ollama.com)
- Imagery from [Unsplash](https://unsplash.com)

## License

MIT © [Shahriar Ahmed](https://github.com/shahriar-ahmed-seam)
