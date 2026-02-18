import { useState } from "react";
import {
  CheckCircle,
  XCircle,
  Award,
  RotateCcw,
} from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Can one lead be sent to multiple lenders?",
    options: ["Yes", "No"],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "What is required before lender submission?",
    options: [
      "Lead Verification",
      "Customer Payment",
      "Admin Approval",
      "None",
    ],
    correctAnswer: 0,
  },
  {
    id: 3,
    question: "Minimum income required for most banks?",
    options: [
      "₹10,000",
      "₹20,000",
      "₹30,000+",
      "No income needed",
    ],
    correctAnswer: 2,
  },
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] =
    useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleNext = () => {
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 1);
    }

    setSelectedOption(null);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
  };

  const percentage = Math.round(
    (score / questions.length) * 100
  );
  const passed = percentage >= 60;

  if (showResult) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-white p-10 rounded-2xl shadow-sm border text-center space-y-6 w-[420px]">
          <div className="mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-emerald-50">
            {passed ? (
              <Award
                size={40}
                className="text-emerald-600"
              />
            ) : (
              <XCircle
                size={40}
                className="text-red-500"
              />
            )}
          </div>

          <h2 className="text-xl font-semibold text-gray-900">
            {passed
              ? "Congratulations!"
              : "Better Luck Next Time"}
          </h2>

          <p className="text-gray-500">
            You scored {score} out of {questions.length}
          </p>

          <div
            className={`text-lg font-semibold ${
              passed
                ? "text-emerald-600"
                : "text-red-500"
            }`}
          >
            {percentage}% {passed ? "Passed" : "Failed"}
          </div>

          <button
            onClick={handleRestart}
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition"
          >
            <RotateCcw size={16} />
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  const progress =
    ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-2xl border shadow-sm p-8 space-y-6">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Certification Quiz
            </h1>
            <p className="text-sm text-gray-500">
              Question {currentQuestion + 1} of{" "}
              {questions.length}
            </p>
          </div>

          <span className="text-sm font-medium text-purple-600">
            {Math.round(progress)}% Complete
          </span>
        </div>

        {/* PROGRESS BAR */}
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* QUESTION */}
        <h2 className="text-lg font-medium text-gray-800">
          {questions[currentQuestion].question}
        </h2>

        {/* OPTIONS */}
        <div className="space-y-3">
          {questions[currentQuestion].options.map(
            (option, index) => (
              <button
                key={index}
                onClick={() => setSelectedOption(index)}
                className={`w-full text-left border rounded-lg px-4 py-3 transition ${
                  selectedOption === index
                    ? "border-purple-500 bg-purple-50"
                    : "hover:bg-gray-50"
                }`}
              >
                {option}
              </button>
            )
          )}
        </div>

        {/* NEXT BUTTON */}
        <button
          onClick={handleNext}
          disabled={selectedOption === null}
          className="w-full bg-emerald-600 text-white py-3 rounded-lg disabled:opacity-50 hover:bg-emerald-700 transition"
        >
          {currentQuestion + 1 === questions.length
            ? "Finish Quiz"
            : "Next Question"}
        </button>
      </div>
    </div>
  );
}
