export interface Lesson {
  id: string;
  title: string;
  content: string;
  completed: boolean;
}

export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface CourseStructure {
  id: string; // Unique ID for each course
  title: string;
  description: string;
  chapters: Chapter[];
  createdAt: number; // Timestamp
  progress: number; // 0-100
}
