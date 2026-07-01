import { createOpenAI } from "@ai-sdk/openai";

/**
 * Central AI configuration.
 *
 * SkillForge talks to a local Ollama server through its OpenAI-compatible
 * endpoint. Everything is env-driven so the same code runs:
 *   • locally  → against Ollama (gemma3:4b by default)
 *   • on Vercel → in demo mode, since a hosted function cannot reach your
 *                 machine's localhost Ollama.
 *
 * Env vars (all optional):
 *   OLLAMA_BASE_URL  default http://localhost:11434/v1
 *   OLLAMA_MODEL     default gemma3:4b
 *   AI_MODE          "auto" (default) | "ollama" | "demo"
 *
 * In "auto" mode the server actions try Ollama first and transparently fall
 * back to curated demo content if it is unreachable — so the deployed site is
 * always fully interactive.
 */

export const OLLAMA_BASE_URL =
  process.env.OLLAMA_BASE_URL ?? "http://localhost:11434/v1";

export const OLLAMA_MODEL = process.env.OLLAMA_MODEL ?? "gemma3:4b";

export type AiMode = "auto" | "ollama" | "demo";

export const AI_MODE: AiMode =
  (process.env.AI_MODE as AiMode) ??
  // Default to demo when deployed (no local Ollama), auto otherwise.
  (process.env.VERCEL ? "demo" : "auto");

const ollamaProvider = createOpenAI({
  baseURL: OLLAMA_BASE_URL,
  apiKey: "ollama", // Ollama ignores the key but the SDK requires one.
});

export const model = ollamaProvider(OLLAMA_MODEL);

/** True when we should not even attempt to reach Ollama. */
export const forceDemo = AI_MODE === "demo";
