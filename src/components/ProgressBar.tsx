"use client";

import { useState, useEffect } from "react";
import { useCourseStore } from "@/store/courseStore";
import { Progress } from "@/components/ui/progress";

export function ProgressBar() {
  const { getCurrentCourse } = useCourseStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentCourse = getCurrentCourse();
  if (!currentCourse) return null;

  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-sm font-semibold">{currentCourse.title}</h3>
            <p className="text-xs text-muted-foreground">
              {currentCourse.progress}% Complete
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold">
              {currentCourse.progress}%
            </span>
          </div>
        </div>
        <Progress value={currentCourse.progress} className="h-2" />
      </div>
    </div>
  );
}
