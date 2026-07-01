"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Loader2 } from "lucide-react";
import { generateSyllabus } from "@/app/actions/generateSyllabus";
import { useCourseStore } from "@/store/courseStore";
import type { CourseStructure } from "@/types/course";

export function CourseGenerator() {
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addCourse } = useCourseStore();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!topic.trim()) {
      setError("Please enter a topic");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const result = await generateSyllabus(topic);

      if (!result.success) {
        setError(result.error);
        return;
      }

      // Transform the syllabus into a full course structure
      const courseData: CourseStructure = {
        id: `course-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Unique ID
        title: result.data.courseTitle,
        description: result.data.description,
        createdAt: Date.now(),
        progress: 0,
        chapters: result.data.chapters.map((chapter) => ({
          id: chapter.id,
          title: chapter.title,
          lessons: [
            {
              id: `${chapter.id}-lesson-1`,
              title: "Introduction",
              content: `# ${chapter.title}\n\nThis lesson will be generated with detailed content.`,
              completed: false,
            },
          ],
        })),
      };

      addCourse(courseData);
      setTopic("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Generate New Course
        </CardTitle>
        <CardDescription>
          Enter any topic and AI will create a structured course for you
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="e.g., Learn Python, Advanced React Patterns, Machine Learning Basics"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={isGenerating}
              className="text-lg"
            />
          </div>

          {error && (
            <div className="p-4 rounded-md bg-destructive/10 border border-destructive/20 space-y-3">
              <p className="font-semibold text-sm text-destructive">❌ {error}</p>
              
              {(error.includes("not found") || error.includes("Failed to fetch") || error.includes("ECONNREFUSED")) && (
                <div className="text-xs space-y-2 bg-card p-3 rounded border">
                  <p className="font-semibold">🔧 Setup Required:</p>
                  
                  <div className="space-y-2">
                    <p className="font-medium">1. Install Ollama</p>
                    <ul className="list-disc list-inside ml-2 space-y-1 text-muted-foreground">
                      <li>Download from <a href="https://ollama.ai" target="_blank" className="underline text-primary">ollama.ai</a></li>
                      <li>Run the installer</li>
                      <li>Ollama will start automatically</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="font-medium">2. Download Model</p>
                    <div className="bg-muted p-2 rounded font-mono text-xs">
                      ollama pull llama3.2
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="font-medium">3. Verify Installation</p>
                    <div className="bg-muted p-2 rounded font-mono text-xs">
                      ollama list
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground pt-2">
                    See <code className="bg-muted px-1 rounded">OLLAMA_SETUP.md</code> for detailed instructions
                  </p>
                </div>
              )}
            </div>
          )}

          <Button
            type="submit"
            disabled={isGenerating || !topic.trim()}
            className="w-full gap-2"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Generating Course...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Generate Course
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 p-4 rounded-lg bg-muted/50 space-y-2">
          <h4 className="text-sm font-semibold">💡 Try these topics:</h4>
          <div className="flex flex-wrap gap-2">
            {["Python Programming", "Web Development", "Data Science", "Machine Learning"].map(
              (suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  size="sm"
                  onClick={() => setTopic(suggestion)}
                  disabled={isGenerating}
                >
                  {suggestion}
                </Button>
              )
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
