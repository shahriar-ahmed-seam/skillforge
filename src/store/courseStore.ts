import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CourseStructure, Lesson } from '@/types/course';

interface CourseState {
  courses: CourseStructure[]; // All courses
  currentCourseId: string | null; // Active course ID
  currentLesson: Lesson | null;
  
  // Course management
  addCourse: (course: CourseStructure) => void;
  deleteCourse: (courseId: string) => void;
  setCurrentCourse: (courseId: string) => void;
  getCurrentCourse: () => CourseStructure | null;
  
  // Lesson management
  setCurrentLesson: (lesson: Lesson) => void;
  updateLessonContent: (lessonId: string, content: string) => void;
  markLessonComplete: (lessonId: string) => void;
  
  // Progress calculation
  calculateProgress: (courseId: string) => number;
}

export const useCourseStore = create<CourseState>()(
  persist(
    (set, get) => ({
      courses: [],
      currentCourseId: null,
      currentLesson: null,
      
      addCourse: (course) => set((state) => {
        const newCourses = [course, ...state.courses]; // Add to beginning (newest first)
        return {
          courses: newCourses,
          currentCourseId: course.id,
        };
      }),
      
      deleteCourse: (courseId) => set((state) => {
        const newCourses = state.courses.filter((c) => c.id !== courseId);
        const newCurrentId = state.currentCourseId === courseId
          ? (newCourses[0]?.id || null)
          : state.currentCourseId;
        
        return {
          courses: newCourses,
          currentCourseId: newCurrentId,
          currentLesson: newCurrentId === state.currentCourseId ? state.currentLesson : null,
        };
      }),
      
      setCurrentCourse: (courseId) => set({
        currentCourseId: courseId,
        currentLesson: null, // Reset lesson when switching courses
      }),
      
      getCurrentCourse: () => {
        const state = get();
        return state.courses.find((c) => c.id === state.currentCourseId) || null;
      },
      
      setCurrentLesson: (lesson) => set({ currentLesson: lesson }),
      
      updateLessonContent: (lessonId, content) => set((state) => {
        const currentCourse = state.courses.find((c) => c.id === state.currentCourseId);
        if (!currentCourse) return state;
        
        const updatedCourse = {
          ...currentCourse,
          chapters: currentCourse.chapters.map((chapter) => ({
            ...chapter,
            lessons: chapter.lessons.map((lesson) =>
              lesson.id === lessonId ? { ...lesson, content } : lesson
            ),
          })),
        };
        
        // Recalculate progress
        updatedCourse.progress = get().calculateProgress(updatedCourse.id);
        
        const updatedCourses = state.courses.map((c) =>
          c.id === state.currentCourseId ? updatedCourse : c
        );
        
        // Update current lesson if it's the one being updated
        const updatedCurrentLesson = state.currentLesson?.id === lessonId
          ? { ...state.currentLesson, content }
          : state.currentLesson;
        
        return {
          courses: updatedCourses,
          currentLesson: updatedCurrentLesson,
        };
      }),
      
      markLessonComplete: (lessonId) => set((state) => {
        const currentCourse = state.courses.find((c) => c.id === state.currentCourseId);
        if (!currentCourse) return state;
        
        const updatedCourse = {
          ...currentCourse,
          chapters: currentCourse.chapters.map((chapter) => ({
            ...chapter,
            lessons: chapter.lessons.map((lesson) =>
              lesson.id === lessonId ? { ...lesson, completed: true } : lesson
            ),
          })),
        };
        
        // Recalculate progress
        updatedCourse.progress = get().calculateProgress(updatedCourse.id);
        
        const updatedCourses = state.courses.map((c) =>
          c.id === state.currentCourseId ? updatedCourse : c
        );
        
        return {
          courses: updatedCourses,
        };
      }),
      
      calculateProgress: (courseId) => {
        const state = get();
        const course = state.courses.find((c) => c.id === courseId);
        if (!course) return 0;
        
        const totalLessons = course.chapters.reduce(
          (acc, chapter) => acc + chapter.lessons.length,
          0
        );
        
        const completedLessons = course.chapters.reduce(
          (acc, chapter) =>
            acc + chapter.lessons.filter((lesson) => lesson.completed).length,
          0
        );
        
        return totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100);
      },
    }),
    {
      name: 'skillforge-courses', // localStorage key
    }
  )
);
