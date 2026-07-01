import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HERO_IMAGE, CTA_IMAGE } from "@/lib/images";
import {
  ArrowRight,
  BookOpen,
  Sparkles,
  Cpu,
  ShieldCheck,
  Trophy,
  Layers,
  Wand2,
  GraduationCap,
  Github,
} from "lucide-react";

const FEATURES = [
  {
    icon: Wand2,
    title: "Syllabus in seconds",
    body: "Type any topic and get a coherent, progressive course outline — from first principles to real projects.",
  },
  {
    icon: BookOpen,
    title: "In-depth lessons",
    body: "Every lesson is written on demand with explanations, examples and code blocks, rendered in clean markdown.",
  },
  {
    icon: Trophy,
    title: "Adaptive quizzes",
    body: "Auto-generated multiple-choice checks with instant feedback, explanations and confetti for a perfect run.",
  },
  {
    icon: Layers,
    title: "Unlimited courses",
    body: "Build a personal library. Progress, completion and lessons persist locally in your browser.",
  },
  {
    icon: Cpu,
    title: "Local-first AI",
    body: "Runs against your own Ollama (gemma3:4b) — private, offline, and free. No tokens, no metering.",
  },
  {
    icon: ShieldCheck,
    title: "Works anywhere",
    body: "A built-in demo mode keeps every feature interactive even when no local model is connected.",
  },
];

const STEPS = [
  { n: "01", title: "Name a topic", body: "“Rust ownership”, “Baroque music”, “Kubernetes” — anything at all." },
  { n: "02", title: "Forge the course", body: "A structured syllabus of chapters and lessons appears instantly." },
  { n: "03", title: "Learn & test", body: "Open a lesson, read, then take a quiz to lock the knowledge in." },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-2xl glass px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/30">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="text-lg font-bold tracking-tight">SkillForge</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/shahriar-ahmed-seam/skillforge"
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:flex"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
            <Link href="/dashboard">
              <Button className="gap-2">
                Launch app <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative flex min-h-screen items-center justify-center px-6 pt-24">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url(${HERO_IMAGE.src})` }}
          />
          <div className="absolute inset-0 aurora opacity-80" />
          <div className="absolute inset-0 grid-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        </div>

        <div className="mx-auto max-w-4xl text-center animate-fade-up">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-violet-300" />
            Powered by your local LLM · gemma3:4b
          </div>
          <h1 className="text-balance text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl">
            Any topic.
            <br />
            <span className="gradient-text">A whole course.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
            SkillForge turns a single sentence into a structured curriculum —
            syllabus, deep lessons and quizzes — generated on demand and yours to keep.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/dashboard">
              <Button size="lg" className="h-12 gap-2 px-7 text-base">
                <Sparkles className="h-5 w-5" />
                Start learning free
              </Button>
            </Link>
            <a href="#how">
              <Button size="lg" variant="outline" className="h-12 gap-2 border-white/15 px-7 text-base">
                See how it works
              </Button>
            </a>
          </div>
          <p className="mt-6 text-xs text-muted-foreground/70">
            No sign-up · runs offline with Ollama · full demo mode built in
          </p>
        </div>

        <span className="absolute bottom-5 right-5 text-[11px] text-muted-foreground/50">
          Photo:{" "}
          <a href={HERO_IMAGE.creditUrl} target="_blank" rel="noreferrer" className="underline">
            {HERO_IMAGE.credit}
          </a>{" "}
          / Unsplash
        </span>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="relative mx-auto max-w-6xl px-6 py-24">
        <div className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">How it works</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight">Three steps to a new skill</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="relative overflow-hidden rounded-2xl glass p-7">
              <span className="text-5xl font-black text-white/10">{s.n}</span>
              <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">Features</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight">Everything a real course needs</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl glass p-6 transition-all hover:-translate-y-1 hover:border-violet-400/30"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 text-violet-300 ring-1 ring-inset ring-white/10">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative mx-auto max-w-6xl px-6 pb-28">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 p-10 sm:p-16">
          <div
            className="absolute inset-0 -z-10 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${CTA_IMAGE.src})` }}
          />
          <div className="absolute inset-0 -z-10 aurora" />
          <div className="absolute inset-0 -z-10 bg-background/60" />
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Curiosity in. <span className="gradient-text">Mastery out.</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Your next skill is one sentence away. Open the studio and forge your first course.
            </p>
            <Link href="/dashboard">
              <Button size="lg" className="mt-8 h-12 gap-2 px-7 text-base">
                <BookOpen className="h-5 w-5" />
                Open the studio
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/60 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-sm text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} SkillForge · MIT licensed</span>
          <span>
            Built with Next.js & Ollama · imagery from{" "}
            <a href="https://unsplash.com" target="_blank" rel="noreferrer" className="underline">
              Unsplash
            </a>
          </span>
        </div>
      </footer>
    </main>
  );
}
