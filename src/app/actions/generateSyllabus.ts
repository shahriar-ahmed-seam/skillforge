"use server";

import { generateObject } from "ai";
import { syllabusSchema, type Syllabus } from "@/lib/schemas";
import { model, forceDemo } from "@/lib/ai";
import { demoSyllabus } from "@/lib/demo";

export type GenerateSyllabusResult =
  | { success: true; data: Syllabus; demo: boolean }
  | { success: false; error: string };

export async function generateSyllabus(
  topic: string
): Promise<GenerateSyllabusResult> {
  if (forceDemo) {
    return { success: true, data: demoSyllabus(topic), demo: true };
  }

  try {
    const result = await generateObject({
      model,
      schema: syllabusSchema,
      prompt: `You are an expert course designer. Create a comprehensive course syllabus for the topic: "${topic}".

The syllabus should include:
- A compelling course title
- A clear description of what students will learn
- 4-6 well-structured chapters that progress from basics to advanced topics
- Each chapter should have a clear, descriptive title

Make the course practical and structured for effective learning.`,
    });

    return { success: true, data: result.object, demo: false };
  } catch (error) {
    // Local Ollama unreachable (e.g. hosted demo) — fall back gracefully.
    console.warn("Syllabus generation fell back to demo mode:", error);
    return { success: true, data: demoSyllabus(topic), demo: true };
  }
}
