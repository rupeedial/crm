import { useEffect, useState } from "react";
import {
  PlayCircle,
  Calendar,
  Clock,
  Video,
  Search,
  Filter,
  X,
} from "lucide-react";

interface Recording {
  id: string;
  title: string;
  date: string;
  duration: string;
  meetingType: string;
  videoUrl: string;
}

export default function RecordingsPage() {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedRecording, setSelectedRecording] =
    useState<Recording | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔥 API Ready
  useEffect(() => {
    setTimeout(() => {
      setRecordings([
        {
          id: "REC-001",
          title: "Loan Process Training",
          date: "01 Feb 2026",
          duration: "45 mins",
          meetingType: "Training",
          videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        },
        {
          id: "REC-002",
          title: "Bank Login Desk SOP",
          date: "28 Jan 2026",
          duration: "30 mins",
          meetingType: "Internal",
          videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const filteredRecordings = recordings.filter((rec) => {
    const matchesSearch = rec.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesType =
      selectedType === "All" || rec.meetingType === selectedType;

    return matchesSearch && matchesType;
  });

  const typeBadgeColor = (type: string) => {
    switch (type) {
      case "Training":
        return "bg-emerald-100 text-emerald-700";
      case "Internal":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Meeting Recordings
        </h1>
        <p className="text-sm text-gray-500">
          Watch past meetings, trainings & CRM discussions
        </p>
      </div>

      {/* SEARCH + FILTER */}
      <div className="bg-white p-4 rounded-2xl border shadow-sm flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex items-center gap-2 border rounded-lg px-3 py-2 w-full md:w-80 focus-within:ring-2 focus-within:ring-purple-500">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search recordings..."
            className="outline-none text-sm w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter size={16} className="text-purple-600" />
          <select
            className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-500"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Training">Training</option>
            <option value="Internal">Internal</option>
            <option value="Client">Client</option>
          </select>
        </div>
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="py-20 text-center text-gray-500">
          Loading recordings...
        </div>
      ) : filteredRecordings.length === 0 ? (
        <div className="py-24 text-center bg-white rounded-2xl border border-dashed text-gray-400">
          <Video size={48} className="mx-auto mb-4 opacity-30" />
          No recordings found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRecordings.map((rec) => (
            <div
              key={rec.id}
              className="bg-white rounded-2xl border shadow-sm hover:shadow-md transition p-6 space-y-4"
            >
              {/* TOP */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    {rec.title}
                  </h3>
                  <p className="text-xs text-gray-400">
                    ID: {rec.id}
                  </p>
                </div>
                <Video className="text-purple-600" />
              </div>

              {/* META */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  {rec.date}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  {rec.duration}
                </div>
              </div>

              {/* TYPE BADGE */}
              <span
                className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${typeBadgeColor(
                  rec.meetingType
                )}`}
              >
                {rec.meetingType}
              </span>

              {/* ACTION BUTTON (PRIMARY GREEN) */}
              <button
                onClick={() => setSelectedRecording(rec)}
                className="w-full mt-4 bg-emerald-600 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-emerald-700 transition"
              >
                <PlayCircle size={18} />
                Play Recording
              </button>
            </div>
          ))}
        </div>
      )}

      {/* VIDEO MODAL */}
      {selectedRecording && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-[95%] md:w-[750px] p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedRecording(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-purple-600"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {selectedRecording.title}
            </h3>

            <video
              controls
              className="w-full rounded-lg mb-4 border"
              src={selectedRecording.videoUrl}
            />

            <button
              onClick={() => setSelectedRecording(null)}
              className="w-full border py-2 rounded-lg text-sm text-gray-600 hover:bg-purple-50 hover:text-purple-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
