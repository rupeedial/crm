import { useEffect, useState } from "react";
import {
  BookOpen,
  CheckCircle,
  Clock,
  PlayCircle,
} from "lucide-react";

interface Lesson {
  id: number;
  title: string;
  duration: string;
  videoUrl: string;
  completed: boolean;
}

export default function CoursePlayerPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  useEffect(() => {
    // 🔥 API Ready (Replace with axios later)
    setLessons([
      {
        id: 1,
        title: "Introduction to Loan Process",
        duration: "8 min",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        completed: true,
      },
      {
        id: 2,
        title: "Customer Verification Process",
        duration: "10 min",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        completed: false,
      },
      {
        id: 3,
        title: "Document Collection",
        duration: "12 min",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        completed: false,
      },
    ]);
  }, []);

  const currentLesson = lessons[currentLessonIndex];

  const handleMarkComplete = () => {
    const updated = [...lessons];
    updated[currentLessonIndex].completed = true;
    setLessons(updated);
  };

  const progress =
    lessons.length > 0
      ? (lessons.filter((l) => l.completed).length /
          lessons.length) *
        100
      : 0;

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Loan Process Training
        </h1>
        <p className="text-sm text-gray-500">
          Watch lessons and complete your certification
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* VIDEO + CONTENT */}
        <div className="lg:col-span-2 space-y-6">
          {/* VIDEO CARD */}
          <div className="bg-black rounded-2xl overflow-hidden shadow-lg aspect-video">
            {currentLesson && (
              <video
                controls
                src={currentLesson.videoUrl}
                className="w-full h-full"
              />
            )}
          </div>

          {/* LESSON DETAILS */}
          {currentLesson && (
            <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    {currentLesson.title}
                  </h3>
                  <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                    <Clock size={14} />
                    {currentLesson.duration}
                  </p>
                </div>

                {currentLesson.completed && (
                  <span className="flex items-center gap-1 text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
                    <CheckCircle size={14} />
                    Completed
                  </span>
                )}
              </div>

              {!currentLesson.completed && (
                <button
                  onClick={handleMarkComplete}
                  className="bg-emerald-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition"
                >
                  Mark as Completed
                </button>
              )}
            </div>
          )}

          {/* COURSE PROGRESS */}
          <div className="bg-white p-6 rounded-2xl border shadow-sm">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-gray-700">
                Course Progress
              </span>
              <span className="text-purple-600 font-semibold">
                {Math.round(progress)}%
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-emerald-600 h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* SIDEBAR LESSON LIST */}
        <div className="bg-white rounded-2xl border shadow-sm p-5 space-y-4 h-fit">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <BookOpen size={18} className="text-purple-600" />
            Lessons
          </h3>

          <div className="space-y-2">
            {lessons.map((lesson, index) => {
              const isActive = index === currentLessonIndex;

              return (
                <div
                  key={lesson.id}
                  onClick={() => setCurrentLessonIndex(index)}
                  className={`p-3 rounded-xl cursor-pointer border transition ${
                    isActive
                      ? "bg-purple-50 border-purple-300"
                      : "hover:bg-gray-50 border-transparent"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          isActive
                            ? "text-purple-700"
                            : "text-gray-800"
                        }`}
                      >
                        {lesson.title}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <PlayCircle size={12} />
                        {lesson.duration}
                      </p>
                    </div>

                    {lesson.completed && (
                      <CheckCircle
                        size={16}
                        className="text-emerald-600"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
