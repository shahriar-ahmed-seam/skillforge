"use server";

import { streamText } from "ai";
import { model, forceDemo } from "@/lib/ai";
import { demoLesson } from "@/lib/demo";

export type GenerateLessonResult =
  | { success: true; content: string; demo: boolean }
  | { success: false; error: string };

export async function generateLessonContent(
  chapterTitle: string,
  lessonTitle: string
): Promise<GenerateLessonResult> {
  if (forceDemo) {
    return { success: true, content: demoLesson(chapterTitle, lessonTitle), demo: true };
  }

  try {
    const result = await streamText({
      model,
      prompt: `You are an expert professor teaching a lesson. Write a detailed, comprehensive markdown lesson for:

**Chapter**: ${chapterTitle}
**Lesson**: ${lessonTitle}

The lesson should include:
- Clear explanations with examples
- Code snippets where appropriate (using markdown code blocks)
- Important concepts highlighted
- Practical applications
- Key takeaways at the end

Write in an engaging, educational style. Use proper markdown formatting including headings (##, ###), lists, and code blocks.`,
    });

    let fullText = "";
    for await (const textPart of result.textStream) {
      fullText += textPart;
    }

    if (!fullText.trim()) {
      return { success: true, content: demoLesson(chapterTitle, lessonTitle), demo: true };
    }

    return { success: true, content: fullText, demo: false };
  } catch (error) {
    console.warn("Lesson generation fell back to demo mode:", error);
    return { success: true, content: demoLesson(chapterTitle, lessonTitle), demo: true };
  }
}
