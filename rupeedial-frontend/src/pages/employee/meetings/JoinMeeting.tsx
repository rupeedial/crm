import { useEffect, useState } from "react";
import {
  Video,
  PhoneCall,
  Calendar,
  Clock,
  Users,
  Search,
  X,
} from "lucide-react";

interface Meeting {
  id: number;
  title: string;
  type: "video" | "audio";
  date: string;
  time: string;
  host: string;
  status: "live" | "scheduled" | "completed";
  meetingLink: string;
}

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔥 API Ready Structure
  useEffect(() => {
    // Later yaha axios.get("/api/meetings") lagega
    setTimeout(() => {
      setMeetings([
        {
          id: 1,
          title: "Bank Partner Discussion",
          type: "video",
          date: "17 Feb 2026",
          time: "3:30 PM",
          host: "Rahul Sharma",
          status: "live",
          meetingLink: "https://zoom.us/j/123456",
        },
        {
          id: 2,
          title: "Sales Review Meeting",
          type: "audio",
          date: "18 Feb 2026",
          time: "11:00 AM",
          host: "Priya Mehta",
          status: "scheduled",
          meetingLink: "https://meet.google.com/xyz",
        },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const filteredMeetings = meetings.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  const statusBadge = (status: string) => {
    switch (status) {
      case "live":
        return "bg-emerald-100 text-emerald-700";
      case "scheduled":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            CRM Meetings
          </h1>
          <p className="text-sm text-gray-500">
            Manage and join your scheduled meetings
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search meeting..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="px-5 py-4 border-b bg-gradient-to-r from-emerald-50 to-purple-50 font-medium text-gray-700">
          Upcoming & Live Meetings
        </div>

        {loading ? (
          <div className="p-6 text-center text-sm text-gray-500">
            Loading meetings...
          </div>
        ) : filteredMeetings.length === 0 ? (
          <div className="p-6 text-center text-sm text-gray-500">
            No meetings found.
          </div>
        ) : (
          <div className="divide-y">
            {filteredMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="flex justify-between items-center p-5 hover:bg-gray-50 transition"
              >
                <div className="flex items-start gap-4">
                  <div>
                    {meeting.type === "video" ? (
                      <Video className="w-6 h-6 text-emerald-600" />
                    ) : (
                      <PhoneCall className="w-6 h-6 text-purple-600" />
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {meeting.title}
                    </h3>
                    <div className="flex gap-5 text-xs text-gray-500 mt-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {meeting.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {meeting.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        Host: {meeting.host}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${statusBadge(
                      meeting.status
                    )}`}
                  >
                    {meeting.status.toUpperCase()}
                  </span>

                  {meeting.status !== "completed" && (
                    <button
                      onClick={() => setSelectedMeeting(meeting)}
                      className="bg-gradient-to-r from-emerald-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:opacity-90 transition"
                    >
                      Join Now
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      {selectedMeeting && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-[420px] p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedMeeting(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {selectedMeeting.title}
            </h3>

            <p className="text-sm text-gray-500 mb-5">
              Click below to join the meeting securely.
            </p>

            <a
              href={selectedMeeting.meetingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-gradient-to-r from-emerald-600 to-purple-600 text-white py-2 rounded-lg hover:opacity-90 transition"
            >
              Open Meeting Link
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
