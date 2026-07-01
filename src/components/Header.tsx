"use client";

import Link from "next/link";
import { GraduationCap, Github, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/25">
            <GraduationCap className="h-5 w-5" />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-bold">SkillForge</span>
            <span className="text-[11px] text-muted-foreground">AI-native learning studio</span>
          </div>
        </Link>

        <div className="flex items-center gap-1">
          <Link href="/">
            <Button variant="ghost" size="icon" title="Home">
              <Home className="h-5 w-5" />
            </Button>
          </Link>
          <a
            href="https://github.com/shahriar-ahmed-seam/skillforge"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="ghost" size="icon" title="View on GitHub">
              <Github className="h-5 w-5" />
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}
