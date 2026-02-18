import { useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  Video,
  PlusCircle,
  Link,
  Timer,
  X,
} from "lucide-react";

interface MeetingForm {
  title: string;
  date: string;
  time: string;
  duration: string;
  participants: string[];
  meetingType: "Training" | "Internal" | "Client";
  meetingLink: string;
}

export default function ScheduleMeetingPage() {
  const [form, setForm] = useState<MeetingForm>({
    title: "",
    date: "",
    time: "",
    duration: "",
    participants: [],
    meetingType: "Internal",
    meetingLink: "",
  });

  const [participantInput, setParticipantInput] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: any = {};

    if (!form.title.trim()) newErrors.title = "Meeting title required";
    if (!form.date) newErrors.date = "Date required";
    if (!form.time) newErrors.time = "Time required";
    if (!form.duration.trim()) newErrors.duration = "Duration required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddParticipant = () => {
    if (participantInput.trim()) {
      setForm({
        ...form,
        participants: [...form.participants, participantInput.trim()],
      });
      setParticipantInput("");
    }
  };

  const handleRemoveParticipant = (name: string) => {
    setForm({
      ...form,
      participants: form.participants.filter((p) => p !== name),
    });
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);

    // 🔥 Future API Integration
    // await axios.post("/api/meetings", form)

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);

      setForm({
        title: "",
        date: "",
        time: "",
        duration: "",
        participants: [],
        meetingType: "Internal",
        meetingLink: "",
      });
    }, 800);
  };

  const inputStyle =
    "w-full border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-500 transition";

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Schedule Meeting
        </h1>
        <p className="text-sm text-gray-500">
          Create and manage CRM meetings
        </p>
      </div>

      {/* SUCCESS MESSAGE */}
      {success && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-xl text-sm">
          ✅ Meeting scheduled successfully!
        </div>
      )}

      {/* FORM CARD */}
      <div className="bg-white rounded-2xl shadow-sm border p-8 max-w-4xl space-y-8">
        {/* TITLE */}
        <div>
          <label className="text-sm font-medium flex items-center gap-2 mb-2">
            <Video size={16} className="text-purple-600" />
            Meeting Title
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            className={`${inputStyle} ${
              errors.title ? "border-red-400" : ""
            }`}
          />
          {errors.title && (
            <p className="text-xs text-red-500 mt-1">
              {errors.title}
            </p>
          )}
        </div>

        {/* DATE TIME DURATION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="text-sm font-medium flex items-center gap-2 mb-2">
              <Calendar size={16} className="text-purple-600" />
              Date
            </label>
            <input
              type="date"
              value={form.date}
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
              className={`${inputStyle} ${
                errors.date ? "border-red-400" : ""
              }`}
            />
          </div>

          <div>
            <label className="text-sm font-medium flex items-center gap-2 mb-2">
              <Clock size={16} className="text-purple-600" />
              Time
            </label>
            <input
              type="time"
              value={form.time}
              onChange={(e) =>
                setForm({ ...form, time: e.target.value })
              }
              className={`${inputStyle} ${
                errors.time ? "border-red-400" : ""
              }`}
            />
          </div>

          <div>
            <label className="text-sm font-medium flex items-center gap-2 mb-2">
              <Timer size={16} className="text-purple-600" />
              Duration
            </label>
            <input
              type="text"
              placeholder="Ex: 45 mins"
              value={form.duration}
              onChange={(e) =>
                setForm({ ...form, duration: e.target.value })
              }
              className={`${inputStyle} ${
                errors.duration ? "border-red-400" : ""
              }`}
            />
          </div>
        </div>

        {/* PARTICIPANTS */}
        <div>
          <label className="text-sm font-medium flex items-center gap-2 mb-2">
            <Users size={16} className="text-purple-600" />
            Participants
          </label>

          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={participantInput}
              onChange={(e) => setParticipantInput(e.target.value)}
              className={`${inputStyle} flex-1`}
              placeholder="Enter participant name"
            />
            <button
              onClick={handleAddParticipant}
              className="bg-purple-600 text-white px-4 rounded-lg text-sm hover:bg-purple-700 transition"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {form.participants.map((p, i) => (
              <span
                key={i}
                className="bg-emerald-50 text-emerald-700 text-xs px-3 py-1 rounded-full flex items-center gap-2"
              >
                {p}
                <button
                  onClick={() => handleRemoveParticipant(p)}
                  className="text-red-400 hover:text-red-600"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* MEETING TYPE */}
        <div>
          <label className="text-sm font-medium mb-2 block">
            Meeting Type
          </label>
          <select
            value={form.meetingType}
            onChange={(e) =>
              setForm({
                ...form,
                meetingType: e.target.value as any,
              })
            }
            className={inputStyle}
          >
            <option value="Internal">Internal</option>
            <option value="Training">Training</option>
            <option value="Client">Client</option>
          </select>
        </div>

        {/* MEETING LINK */}
        <div>
          <label className="text-sm font-medium flex items-center gap-2 mb-2">
            <Link size={16} className="text-purple-600" />
            Meeting Link
          </label>
          <input
            type="text"
            placeholder="https://zoom.us/..."
            value={form.meetingLink}
            onChange={(e) =>
              setForm({ ...form, meetingLink: e.target.value })
            }
            className={inputStyle}
          />
        </div>

        {/* ACTION BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-emerald-600 text-white py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-emerald-700 transition disabled:opacity-60"
        >
          <PlusCircle size={18} />
          {loading ? "Scheduling..." : "Schedule Meeting"}
        </button>
      </div>
    </div>
  );
}
