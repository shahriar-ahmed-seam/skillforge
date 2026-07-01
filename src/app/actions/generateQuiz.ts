"use server";

import { generateObject } from "ai";
import { quizSchema, type Quiz } from "@/lib/schemas";
import { model, forceDemo } from "@/lib/ai";
import { demoQuiz } from "@/lib/demo";

export type { Quiz };

export type GenerateQuizResult =
  | { success: true; data: Quiz; demo: boolean }
  | { success: false; error: string };

export async function generateQuiz(
  lessonTitle: string,
  lessonContent: string
): Promise<GenerateQuizResult> {
  if (forceDemo) {
    return { success: true, data: demoQuiz(lessonTitle), demo: true };
  }

  try {
    const result = await generateObject({
      model,
      schema: quizSchema,
      prompt: `You are an expert educator creating a quiz for students. Based on the following lesson, create exactly 3 multiple-choice questions to test understanding.

**Lesson Title**: ${lessonTitle}

**Lesson Content**:
${lessonContent.substring(0, 2000)}

Create questions that:
- Test key concepts from the lesson
- Have one clearly correct answer
- Include plausible distractors (wrong answers)
- Cover different aspects of the topic
- Are appropriate difficulty for someone learning this topic

Each question must have exactly 4 options and indicate which index (0-3) is correct.`,
    });

    return { success: true, data: result.object, demo: false };
  } catch (error) {
    console.warn("Quiz generation fell back to demo mode:", error);
    return { success: true, data: demoQuiz(lessonTitle), demo: true };
  }
}
