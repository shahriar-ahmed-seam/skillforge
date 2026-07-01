"use client";

import { useState, useEffect } from "react";
import { useCourseStore } from "@/store/courseStore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Sparkles, Loader2, Zap } from "lucide-react";
import { generateLessonContent } from "@/app/actions/generateLesson";
import { QuizCard } from "./QuizCard";

export function ContentArea() {
  const { currentLesson, markLessonComplete, updateLessonContent, getCurrentCourse } = useCourseStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [demo, setDemo] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="text-center space-y-6">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Loader2 className="h-10 w-10 text-muted-foreground animate-spin" />
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const currentCourse = getCurrentCourse();

  const hasGeneratedContent = currentLesson?.content && 
    currentLesson.content.length > 100 && 
    !currentLesson.content.includes("This lesson will be generated");

  const handleGenerateLesson = async () => {
    if (!currentLesson || !currentCourse) return;

    setIsGenerating(true);
    try {
      // Find the chapter this lesson belongs to
      const chapter = currentCourse.chapters.find((ch) =>
        ch.lessons.some((l) => l.id === currentLesson.id)
      );

      if (!chapter) return;

      const result = await generateLessonContent(chapter.title, currentLesson.title);
      
      if (result.success && result.content) {
        updateLessonContent(currentLesson.id, result.content);
        setDemo(result.demo);
      } else {
        console.error("Failed to generate lesson:", "error" in result ? result.error : "unknown");
      }
    } catch (error) {
      console.error("Error generating lesson:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!currentLesson) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="text-center space-y-6">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <svg
              className="h-10 w-10 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome to SkillForge</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Select a lesson from the sidebar to begin your learning journey,
              or generate a new course to get started.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{currentLesson.title}</h1>
        <div className="flex items-center gap-3">
          {currentLesson.completed && (
            <div className="flex items-center gap-2 text-green-500">
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-sm font-medium">Completed</span>
            </div>
          )}
          {demo && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400 ring-1 ring-inset ring-amber-500/20">
              <Zap className="h-3 w-3" /> Demo content
            </span>
          )}
        </div>
      </div>

      {!hasGeneratedContent ? (
        <div className="text-center py-12 space-y-6">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Ready to Learn?</h3>
            <p className="text-muted-foreground mb-6">
              Generate detailed lesson content using AI
            </p>
            <Button
              onClick={handleGenerateLesson}
              disabled={isGenerating}
              size="lg"
              className="gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Generating Lesson...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Generate Lesson
                </>
              )}
            </Button>
          </div>
        </div>
      ) : (
        <>
          <article className="prose-lesson max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{currentLesson.content}</ReactMarkdown>
          </article>

          <div className="mt-12 pt-6 border-t space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                {currentLesson.completed
                  ? "You've completed this lesson"
                  : "Mark as complete when you're done"}
              </div>
              {!currentLesson.completed && (
                <Button
                  onClick={() => markLessonComplete(currentLesson.id)}
                  className="gap-2"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Mark as Complete
                </Button>
              )}
            </div>

            {!showQuiz ? (
              <Button
                onClick={() => setShowQuiz(true)}
                variant="outline"
                className="w-full gap-2"
                size="lg"
              >
                <Sparkles className="h-5 w-5" />
                Take Quiz
              </Button>
            ) : (
              <QuizCard
                lessonTitle={currentLesson.title}
                lessonContent={currentLesson.content}
                onClose={() => setShowQuiz(false)}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
