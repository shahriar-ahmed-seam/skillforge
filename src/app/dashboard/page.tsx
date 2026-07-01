"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ContentArea } from "@/components/ContentArea";
import { ProgressBar } from "@/components/ProgressBar";
import { CourseGenerator } from "@/components/CourseGenerator";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCourseStore } from "@/store/courseStore";
import { Menu, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showGenerator, setShowGenerator] = useState(false);
  const { getCurrentCourse, courses } = useCourseStore();

  const currentCourse = getCurrentCourse();

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <Header />
      
      {/* Progress Bar */}
      <ProgressBar />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "w-80" : "w-0"
          } transition-all duration-300 overflow-hidden border-r bg-muted/20`}
        >
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              
              {courses.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowGenerator(!showGenerator)}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  {showGenerator ? "Hide" : "New Course"}
                </Button>
              )}
            </div>

            {!currentCourse || showGenerator ? (
              <div className="py-12">
                <CourseGenerator />
              </div>
            ) : (
              <ContentArea />
            )}
          </div>
        </main>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
