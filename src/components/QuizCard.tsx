"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Loader2, Trophy, X, CheckCircle, XCircle } from "lucide-react";
import { generateQuiz, type Quiz } from "@/app/actions/generateQuiz";
import confetti from "canvas-confetti";

interface QuizCardProps {
  lessonTitle: string;
  lessonContent: string;
  onClose: () => void;
}

export function QuizCard({ lessonTitle, lessonContent, onClose }: QuizCardProps) {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateQuiz = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const result = await generateQuiz(lessonTitle, lessonContent);

      if (result.success) {
        setQuiz(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate quiz");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);

    const correctCount = quiz?.questions.filter(
      (q, idx) => selectedAnswers[idx] === q.correctIndex
    ).length || 0;

    const totalQuestions = quiz?.questions.length || 0;

    if (correctCount === totalQuestions) {
      // Perfect score - trigger confetti!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setQuiz(null);
  };

  const correctCount = quiz?.questions.filter(
    (q, idx) => selectedAnswers[idx] === q.correctIndex
  ).length || 0;

  const totalQuestions = quiz?.questions.length || 0;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Quiz Time!
            </CardTitle>
            <CardDescription>
              Test your knowledge of {lessonTitle}
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {!quiz ? (
          <div className="text-center py-8 space-y-4">
            <p className="text-muted-foreground">
              Ready to test your understanding?
            </p>
            <Button
              onClick={handleGenerateQuiz}
              disabled={isGenerating}
              className="gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating Questions...
                </>
              ) : (
                "Generate Quiz"
              )}
            </Button>
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </div>
        ) : (
          <>
            {quiz.questions.map((question, qIdx) => (
              <div key={qIdx} className="space-y-3">
                <div className="flex items-start gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold flex-shrink-0">
                    {qIdx + 1}
                  </span>
                  <div className="flex-1">
                    <h4 className="font-medium mb-3">{question.question}</h4>
                    <RadioGroup
                      value={selectedAnswers[qIdx]?.toString()}
                      onValueChange={(value) =>
                        setSelectedAnswers({ ...selectedAnswers, [qIdx]: parseInt(value) })
                      }
                      disabled={submitted}
                    >
                      {question.options.map((option, optIdx) => {
                        const isSelected = selectedAnswers[qIdx] === optIdx;
                        const isCorrect = optIdx === question.correctIndex;
                        const showResult = submitted && isSelected;

                        return (
                          <div
                            key={optIdx}
                            className={`flex items-center space-x-2 p-3 rounded-md border ${
                              showResult
                                ? isCorrect
                                  ? "border-green-500 bg-green-50 dark:bg-green-950"
                                  : "border-red-500 bg-red-50 dark:bg-red-950"
                                : "border-border"
                            }`}
                          >
                            <RadioGroupItem value={optIdx.toString()} id={`q${qIdx}-opt${optIdx}`} />
                            <Label
                              htmlFor={`q${qIdx}-opt${optIdx}`}
                              className="flex-1 cursor-pointer"
                            >
                              {option}
                            </Label>
                            {showResult && (
                              isCorrect ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <XCircle className="h-4 w-4 text-red-600" />
                              )
                            )}
                          </div>
                        );
                      })}
                    </RadioGroup>
                    {submitted && (
                      <p className="mt-2 text-sm text-muted-foreground">
                        💡 {question.explanation}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-4 border-t space-y-4">
              {submitted ? (
                <>
                  <div className="text-center p-6 rounded-lg bg-muted">
                    <h3 className="text-2xl font-bold mb-2">
                      {correctCount === totalQuestions
                        ? "🎉 Perfect Score!"
                        : `Score: ${correctCount}/${totalQuestions}`}
                    </h3>
                    <p className="text-muted-foreground">
                      {correctCount === totalQuestions
                        ? "Outstanding! You've mastered this lesson!"
                        : correctCount >= totalQuestions * 0.7
                        ? "Great job! You're doing well!"
                        : "Keep practicing! Review the lesson and try again."}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleReset} variant="outline" className="flex-1">
                      Try Another Quiz
                    </Button>
                    <Button onClick={onClose} className="flex-1">
                      Continue Learning
                    </Button>
                  </div>
                </>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={Object.keys(selectedAnswers).length !== totalQuestions}
                  className="w-full"
                >
                  Submit Answers
                </Button>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
