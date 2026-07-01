"use client";

import { Cpu, BrainCircuit } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-background/60">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground md:flex-row">
          <span className="flex items-center gap-2" suppressHydrationWarning>
            © {currentYear} SkillForge
            <span className="text-border">•</span>
            <span className="flex items-center gap-1">
              Built with <BrainCircuit className="h-3.5 w-3.5 text-violet-400" /> for curious minds
            </span>
          </span>

          <span className="flex items-center gap-2">
            <Cpu className="h-4 w-4" />
            Powered by
            <a
              href="https://ollama.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-foreground hover:underline"
            >
              Ollama
            </a>
            <span className="text-border">•</span>
            <span className="rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary">
              v1.0.0
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
