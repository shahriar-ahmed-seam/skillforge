import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HERO_IMAGE, CTA_IMAGE, STEP_IMAGE, TOPIC_CARDS } from "@/lib/images";
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
  Star,
} from "lucide-react";

const FEATURES = [
  { icon: Wand2, title: "Syllabus in seconds", body: "Type any topic and get a coherent, progressive course outline — from first principles to real projects." },
  { icon: BookOpen, title: "In-depth lessons", body: "Every lesson is written on demand with explanations, examples and code blocks, in clean, readable markdown." },
  { icon: Trophy, title: "Adaptive quizzes", body: "Auto-generated checks with instant feedback, explanations and a little confetti for a perfect run." },
  { icon: Layers, title: "Unlimited courses", body: "Build a personal library. Progress and completion persist right in your browser." },
  { icon: Cpu, title: "Local-first AI", body: "Runs against your own Ollama (gemma3:4b) — private, offline and free. No tokens, no metering." },
  { icon: ShieldCheck, title: "Works anywhere", body: "A built-in demo mode keeps every feature interactive even with no model connected." },
];

const STEPS = [
  { n: "01", title: "Name a topic", body: "“Rust ownership”, “Baroque music”, “Kubernetes” — anything you're curious about." },
  { n: "02", title: "Forge the course", body: "A structured syllabus of chapters and lessons appears in seconds." },
  { n: "03", title: "Learn & test", body: "Read a lesson, then take a quiz to lock the knowledge in." },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Ambient aurora so glass elements refract colour everywhere */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 aurora opacity-70" />
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 grid-overlay opacity-60" />

      <div className="relative z-10">
      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-2xl glass px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/30">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-semibold tracking-tight">SkillForge</span>
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
      <section className="relative flex min-h-screen items-center px-6 pb-16 pt-28">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={HERO_IMAGE.src}
            alt="A bright, sunlit library full of books"
            className="h-full w-full object-cover animate-kenburns"
          />
          {/* Cinematic depth without hiding the 4K image */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/45 via-black/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <div className="max-w-2xl animate-fade-up rounded-[28px] glass p-8 shadow-2xl sm:p-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-violet-500" />
              Powered by your local LLM · gemma3:4b
            </div>
            <h1 className="font-display text-5xl font-semibold leading-[1.03] tracking-tight sm:text-7xl">
              Learn anything,
              <br />
              <span className="gradient-text">one topic at a time.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              SkillForge turns a single sentence into a complete curriculum —
              syllabus, in-depth lessons and quizzes — generated on demand and
              yours to keep. A calm, focused place to study.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/dashboard">
                <Button size="lg" className="h-12 gap-2 px-7 text-base">
                  <Sparkles className="h-5 w-5" /> Start learning free
                </Button>
              </Link>
              <a href="#topics">
                <Button size="lg" variant="outline" className="h-12 gap-2 border-black/10 bg-white/60 px-7 text-base backdrop-blur">
                  Browse topics
                </Button>
              </a>
            </div>
            <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span>No sign-up · runs offline · full demo built in</span>
            </div>
          </div>
        </div>

        <span className="absolute bottom-4 right-4 text-[11px] text-white/70 drop-shadow">
          Photo:{" "}
          <a href={HERO_IMAGE.creditUrl} target="_blank" rel="noreferrer" className="underline">
            {HERO_IMAGE.credit}
          </a>{" "}
          / Unsplash
        </span>
      </section>

      {/* POPULAR TOPICS */}
      <section id="topics" className="relative mx-auto max-w-6xl px-6 py-24">
        <div className="mb-12 text-center">
          <p className="eyebrow">A universe of subjects</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight">Where will you start?</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            These are just examples — type literally anything and SkillForge will build the course.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TOPIC_CARDS.map((t) => (
            <Link
              key={t.title}
              href="/dashboard"
              className="group relative overflow-hidden rounded-2xl border border-border shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={t.image}
                  alt={t.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <h3 className="font-display text-2xl font-semibold">{t.title}</h3>
                  <p className="text-sm text-white/85">{t.blurb}</p>
                </div>
                <span className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-violet-600 opacity-0 shadow transition-opacity group-hover:opacity-100">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS (split with image) */}
      <section className="relative overflow-hidden py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-xl ring-1 ring-white/40">
              <img
                src={STEP_IMAGE.src}
                alt="An open notebook on a sunlit desk"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -right-4 hidden rounded-2xl glass px-6 py-5 sm:block">
              <p className="font-display text-3xl font-semibold text-violet-600">3 steps</p>
              <p className="text-sm text-muted-foreground">to a new skill</p>
            </div>
          </div>
          <div>
            <p className="eyebrow">How it works</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight">
              From curiosity to a course
            </h2>
            <div className="mt-8 space-y-4">
              {STEPS.map((s) => (
                <div key={s.n} className="flex gap-4 rounded-2xl glass-panel p-4">
                  <span className="font-display text-3xl font-bold text-violet-400">{s.n}</span>
                  <div>
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                    <p className="text-sm text-muted-foreground">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative mx-auto max-w-6xl px-6 py-24">
        <div className="mb-12 text-center">
          <p className="eyebrow">Features</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight">Everything a real course needs</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl glass p-6 transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-violet-500/25 to-fuchsia-500/25 text-violet-600 ring-1 ring-inset ring-white/40 backdrop-blur">
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
        <div className="relative overflow-hidden rounded-3xl border border-border shadow-xl">
          <img
            src={CTA_IMAGE.src}
            alt="A warm study desk with a laptop and coffee"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/40" />
          <div className="relative max-w-xl p-10 sm:p-16">
            <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Curiosity in. <span className="gradient-text">Mastery out.</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Your next skill is one sentence away. Open the studio and forge your first course.
            </p>
            <Link href="/dashboard">
              <Button size="lg" className="mt-8 h-12 gap-2 px-7 text-base">
                <BookOpen className="h-5 w-5" /> Open the studio
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-sm text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} SkillForge · MIT licensed</span>
          <span>
            Built with Next.js &amp; Ollama · imagery from{" "}
            <a href="https://unsplash.com" target="_blank" rel="noreferrer" className="underline">
              Unsplash
            </a>
          </span>
        </div>
      </footer>
      </div>
    </main>
  );
}
