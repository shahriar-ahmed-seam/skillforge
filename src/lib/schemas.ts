import { z } from "zod";

// Schema for individual lesson
export const lessonSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  completed: z.boolean().default(false),
});

// Schema for chapter
export const chapterSchema = z.object({
  id: z.string(),
  title: z.string(),
  lessons: z.array(lessonSchema),
});

// Schema for complete course structure
export const courseSchema = z.object({
  courseTitle: z.string(),
  description: z.string(),
  chapters: z.array(chapterSchema),
});

// Schema for syllabus generation (without lesson content)
export const syllabusSchema = z.object({
  courseTitle: z.string().describe("The title of the course"),
  description: z.string().describe("A brief description of what the course covers"),
  chapters: z.array(
    z.object({
      id: z.string().describe("Unique identifier for the chapter"),
      title: z.string().describe("The chapter title"),
    })
  ).describe("Array of chapters in the course"),
});

// Schema for an auto-generated quiz
export const quizSchema = z.object({
  questions: z
    .array(
      z.object({
        question: z.string().describe("The quiz question"),
        options: z.array(z.string()).length(4).describe("Four possible answers"),
        correctIndex: z
          .number()
          .min(0)
          .max(3)
          .describe("Index of the correct answer (0-3)"),
        explanation: z
          .string()
          .describe("Brief explanation of why the answer is correct"),
      })
    )
    .length(3)
    .describe("Exactly 3 multiple-choice questions"),
});

// Type exports
export type Lesson = z.infer<typeof lessonSchema>;
export type Chapter = z.infer<typeof chapterSchema>;
export type Course = z.infer<typeof courseSchema>;
export type Syllabus = z.infer<typeof syllabusSchema>;
export type Quiz = z.infer<typeof quizSchema>;
