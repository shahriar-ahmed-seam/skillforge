import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const title = "SkillForge — AI-native learning, on any topic";
const description =
  "Type any topic and SkillForge forges a complete course: a structured syllabus, in-depth lessons and auto-generated quizzes. Local-first with Ollama, with a full hosted demo.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "AI learning",
    "course generator",
    "Ollama",
    "local LLM",
    "education",
    "Next.js",
    "gemma",
  ],
  authors: [{ name: "Shahriar Ahmed" }],
  openGraph: { title, description, type: "website", siteName: "SkillForge" },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#0a0a14",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
