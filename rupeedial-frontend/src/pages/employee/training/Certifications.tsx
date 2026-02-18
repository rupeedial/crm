import { useEffect, useState } from "react";
import {
  Award,
  Download,
  Lock,
  CheckCircle,
  Clock,
} from "lucide-react";

interface Certification {
  id: string;
  title: string;
  description: string;
  progress: number;
  status: "COMPLETED" | "IN_PROGRESS" | "LOCKED";
}

export default function CertificationsPage() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔥 API Ready (Replace with axios.get later)
    setTimeout(() => {
      setCertifications([
        {
          id: "CERT-001",
          title: "Loan Process Training",
          description:
            "Complete loan workflow & documentation training",
          progress: 100,
          status: "COMPLETED",
        },
        {
          id: "CERT-002",
          title: "Bank Login Desk SOP",
          description:
            "Understanding bank login desk process",
          progress: 60,
          status: "IN_PROGRESS",
        },
        {
          id: "CERT-003",
          title: "Advanced Sales Mastery",
          description:
            "Premium sales & conversion training",
          progress: 0,
          status: "LOCKED",
        },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const statusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-emerald-100 text-emerald-700";
      case "IN_PROGRESS":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  const progressColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-emerald-600";
      case "IN_PROGRESS":
        return "bg-purple-600";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Certifications
        </h1>
        <p className="text-sm text-gray-500">
          View and manage your completed and available certifications
        </p>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="text-center py-20 text-gray-500">
          Loading certifications...
        </div>
      ) : certifications.length === 0 ? (
        /* EMPTY STATE */
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white py-20">
          <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
            <Award className="w-7 h-7 text-emerald-600" />
          </div>

          <h3 className="text-lg font-medium text-gray-800">
            No Certifications Yet
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Complete training courses to earn certifications
          </p>
        </div>
      ) : (
        /* GRID */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-2xl border shadow-sm p-6 space-y-5 hover:shadow-md transition"
            >
              {/* TOP SECTION */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {cert.description}
                  </p>
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${statusBadge(
                    cert.status
                  )}`}
                >
                  {cert.status.replace("_", " ")}
                </span>
              </div>

              {/* PROGRESS BAR */}
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{cert.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${progressColor(
                      cert.status
                    )} h-2 rounded-full transition-all`}
                    style={{ width: `${cert.progress}%` }}
                  />
                </div>
              </div>

              {/* ACTIONS */}
              <div className="pt-2">
                {cert.status === "COMPLETED" && (
                  <button className="w-full flex items-center justify-center gap-2 text-sm bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition">
                    <Download size={16} />
                    Download Certificate
                  </button>
                )}

                {cert.status === "IN_PROGRESS" && (
                  <button className="w-full flex items-center justify-center gap-2 text-sm bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
                    <Clock size={16} />
                    Continue Course
                  </button>
                )}

                {cert.status === "LOCKED" && (
                  <div className="w-full flex items-center justify-center gap-2 text-sm bg-gray-100 text-gray-500 px-4 py-2 rounded-lg">
                    <Lock size={16} />
                    Locked
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
