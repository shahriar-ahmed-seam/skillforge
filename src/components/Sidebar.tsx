"use client";

import { useCourseStore } from "@/store/courseStore";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Trash2, BookOpen } from "lucide-react";
import { Lesson } from "@/types/course";

export function Sidebar() {
  const { courses, currentCourseId, setCurrentCourse, deleteCourse, getCurrentCourse, setCurrentLesson, currentLesson } = useCourseStore();
  const currentCourse = getCurrentCourse();

  const handleLessonClick = (lesson: Lesson) => {
    setCurrentLesson(lesson);
  };

  const handleCourseSwitch = (courseId: string) => {
    setCurrentCourse(courseId);
  };

  const handleDeleteCourse = (courseId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent switching to course when deleting
    if (confirm("Are you sure you want to delete this course?")) {
      deleteCourse(courseId);
    }
  };

  if (courses.length === 0) {
    return (
      <div className="p-6">
        <div className="text-center space-y-4 py-12">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <BookOpen className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">No Courses Yet</h3>
            <p className="text-sm text-muted-foreground">
              Generate a course to get started
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto">
      <div className="p-6">
        {/* My Courses Header */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-1">My Courses</h2>
          <p className="text-xs text-muted-foreground">{courses.length} course{courses.length !== 1 ? 's' : ''}</p>
        </div>

        {/* Course List */}
        <div className="space-y-2 mb-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                course.id === currentCourseId
                  ? "bg-primary/10 border-primary"
                  : "hover:bg-muted border-border"
              }`}
              onClick={() => handleCourseSwitch(course.id)}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate">{course.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">
                      {course.progress}%
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 hover:bg-destructive hover:text-destructive-foreground"
                  onClick={(e) => handleDeleteCourse(course.id, e)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Current Course Details */}
        {currentCourse && (
          <>
            <div className="border-t pt-4 mb-4">
              <h3 className="text-sm font-semibold mb-1">Current Course</h3>
              <p className="text-xs text-muted-foreground mb-4">
                {currentCourse.description}
              </p>
            </div>

            <Accordion type="multiple" className="space-y-2">
              {currentCourse.chapters.map((chapter, chapterIndex) => (
                <AccordionItem
                  key={chapter.id}
                  value={chapter.id}
                  className="border rounded-lg px-4"
                >
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3 text-left">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                        {chapterIndex + 1}
                      </span>
                      <span className="font-semibold">{chapter.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="ml-11 space-y-1 pt-2">
                      {chapter.lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          onClick={() => handleLessonClick(lesson)}
                          className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center gap-2 group ${
                            currentLesson?.id === lesson.id
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-muted"
                          }`}
                        >
                          {lesson.completed ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                          ) : (
                            <Circle className="h-4 w-4 flex-shrink-0" />
                          )}
                          <span className="text-sm">{lesson.title}</span>
                        </button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </>
        )}
      </div>
    </div>
  );
}
