/**
 * Deterministic, topic-aware demo content.
 *
 * When no local LLM is reachable (e.g. the hosted Vercel demo) SkillForge falls
 * back to these generators so every feature still works end-to-end. The output
 * is templated but genuinely useful and adapts to whatever topic the user types.
 */

import type { Syllabus } from "@/lib/schemas";
import type { Quiz } from "@/lib/schemas";

function titleCase(input: string): string {
  return input
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const CHAPTER_ARCS = [
  { suffix: "Foundations", blurb: "core vocabulary, mental models and the lay of the land" },
  { suffix: "Core Concepts", blurb: "the essential building blocks you will reuse everywhere" },
  { suffix: "Hands-On Practice", blurb: "applying the ideas to realistic, worked examples" },
  { suffix: "Patterns & Techniques", blurb: "the reusable approaches practitioners rely on" },
  { suffix: "Real-World Projects", blurb: "putting everything together into something shippable" },
  { suffix: "Mastery & Next Steps", blurb: "edge cases, best practices and where to go next" },
];

export function demoSyllabus(topic: string): Syllabus {
  const clean = titleCase(topic);
  return {
    courseTitle: `${clean}: From Zero to Confident`,
    description: `A structured, hands-on path through ${clean}. You'll move from first principles to real projects, building intuition and practical skill at every step.`,
    chapters: CHAPTER_ARCS.map((arc, i) => ({
      id: `ch-${i + 1}`,
      title: `${clean} ${arc.suffix}`,
    })),
  };
}

export function demoLesson(chapterTitle: string, lessonTitle: string): string {
  const topic = chapterTitle.replace(
    /\s+(Foundations|Core Concepts|Hands-On Practice|Patterns & Techniques|Real-World Projects|Mastery & Next Steps)$/,
    ""
  );
  return `# ${lessonTitle}

> Part of **${chapterTitle}**

## Overview

Welcome to this lesson on **${lessonTitle}**. By the end you'll understand not just *what* the ideas are, but *why* they matter and *how* to apply them to ${topic}.

## Key ideas

- **Start from intuition.** Every concept in ${topic} is easier once you can picture it. We'll build that picture first.
- **Then formalize.** Once the intuition is solid, we attach precise definitions and terminology.
- **Finally, practice.** Understanding sticks when you *use* it, so each section ends with something to try.

## A worked example

Imagine you're applying ${lessonTitle.toLowerCase()} in a real project. A typical workflow looks like this:

\`\`\`text
1. Identify the problem you're actually solving
2. Choose the simplest approach that could work
3. Implement a small version and test your assumptions
4. Iterate — refine based on what you learned
\`\`\`

This loop is deliberately small. Shipping something imperfect and improving it beats waiting for a perfect plan.

## Why it matters

Mastering **${lessonTitle}** unlocks the rest of ${topic}. It's one of those ideas that shows up again and again, so time invested here compounds.

## Key takeaways

1. ${lessonTitle} is best learned intuition-first, then formalized.
2. Small, testable iterations beat big up-front plans.
3. The concept generalizes across the whole field of ${topic}.

*Ready to check your understanding? Take the quiz below.*`;
}

export function demoQuiz(lessonTitle: string): Quiz {
  return {
    questions: [
      {
        question: `What is the recommended way to start learning about "${lessonTitle}"?`,
        options: [
          "Memorize every formal definition first",
          "Build intuition first, then formalize",
          "Skip the basics and jump to advanced topics",
          "Avoid practicing until you understand everything",
        ],
        correctIndex: 1,
        explanation:
          "Building intuition first makes the formal definitions far easier to absorb and remember.",
      },
      {
        question: "Which workflow does the lesson recommend for applying a new concept?",
        options: [
          "Plan perfectly, then implement once",
          "Implement small, test, and iterate",
          "Copy someone else's solution exactly",
          "Wait until you feel fully ready",
        ],
        correctIndex: 1,
        explanation:
          "Small, testable iterations let you learn from real feedback instead of guessing up front.",
      },
      {
        question: "Why is this lesson described as high-leverage?",
        options: [
          "It is rarely used in practice",
          "It only matters for experts",
          "The concept reappears throughout the field, so it compounds",
          "It replaces the need to learn anything else",
        ],
        correctIndex: 2,
        explanation:
          "Foundational concepts show up repeatedly, so understanding them pays off across the whole subject.",
      },
    ],
  };
}
