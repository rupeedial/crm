import { useState } from "react";
import {
  MessageCircle,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface Ticket {
  id: string;
  subject: string;
  category: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED";
  createdAt: string;
}

export default function Support() {
  const [tickets, setTickets] =
    useState<Ticket[]>([
      {
        id: "T-001",
        subject:
          "Unable to move lead to Login Desk",
        category: "Lead Issue",
        priority: "HIGH",
        status: "IN_PROGRESS",
        createdAt: new Date().toISOString(),
      },
    ]);

  const [showForm, setShowForm] =
    useState(false);

  const [form, setForm] = useState({
    subject: "",
    category: "General",
    priority: "MEDIUM",
  });

  /* ================= CREATE TICKET ================= */

  const createTicket = () => {
    if (!form.subject) return;

    const newTicket: Ticket = {
      id: `T-${Date.now()}`,
      subject: form.subject,
      category: form.category,
      priority:
        form.priority as any,
      status: "OPEN",
      createdAt:
        new Date().toISOString(),
    };

    setTickets([
      newTicket,
      ...tickets,
    ]);

    setForm({
      subject: "",
      category: "General",
      priority: "MEDIUM",
    });

    setShowForm(false);
  };

  /* ================= STATUS COLOR ================= */

  const getStatusColor = (
    status: string
  ) => {
    switch (status) {
      case "OPEN":
        return "bg-purple-100 text-purple-700";
      case "IN_PROGRESS":
        return "bg-amber-100 text-amber-700";
      case "RESOLVED":
        return "bg-emerald-100 text-emerald-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getPriorityColor = (
    priority: string
  ) => {
    switch (priority) {
      case "HIGH":
        return "text-red-600";
      case "MEDIUM":
        return "text-amber-600";
      case "LOW":
        return "text-emerald-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-10">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Support Center
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Raise issues & track resolution
          </p>
        </div>

        <button
          onClick={() =>
            setShowForm(true)
          }
          className="bg-emerald-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-emerald-700 transition flex items-center gap-2"
        >
          <Plus size={16} />
          New Ticket
        </button>
      </div>

      {/* CREATE FORM */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-4">
          <h3 className="font-semibold text-lg">
            Raise Support Ticket
          </h3>

          <input
            type="text"
            placeholder="Subject"
            value={form.subject}
            onChange={(e) =>
              setForm({
                ...form,
                subject:
                  e.target.value,
              })
            }
            className="w-full border rounded-xl px-4 py-2 text-sm"
          />

          <div className="grid md:grid-cols-2 gap-4">
            <select
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category:
                    e.target.value,
                })
              }
              className="border rounded-xl px-4 py-2 text-sm"
            >
              <option>
                General
              </option>
              <option>
                Lead Issue
              </option>
              <option>
                Login Desk
              </option>
              <option>
                Bank Submission
              </option>
            </select>

            <select
              value={form.priority}
              onChange={(e) =>
                setForm({
                  ...form,
                  priority:
                    e.target.value,
                })
              }
              className="border rounded-xl px-4 py-2 text-sm"
            >
              <option value="LOW">
                Low
              </option>
              <option value="MEDIUM">
                Medium
              </option>
              <option value="HIGH">
                High
              </option>
            </select>
          </div>

          <div className="flex gap-3">
            <button
              onClick={createTicket}
              className="bg-emerald-600 text-white px-6 py-2 rounded-xl text-sm font-semibold"
            >
              Submit Ticket
            </button>

            <button
              onClick={() =>
                setShowForm(false)
              }
              className="border px-6 py-2 rounded-xl text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* TICKET LIST */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b text-sm font-semibold text-gray-700 flex items-center gap-2">
          <MessageCircle size={16} />
          My Support Tickets
        </div>

        {tickets.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            No tickets raised yet
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-4 text-left">
                  Ticket ID
                </th>
                <th>Subject</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>

            <tbody>
              {tickets.map((t) => (
                <tr
                  key={t.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-4 font-medium">
                    {t.id}
                  </td>
                  <td>
                    {t.subject}
                  </td>
                  <td>
                    {t.category}
                  </td>
                  <td
                    className={`font-semibold ${getPriorityColor(
                      t.priority
                    )}`}
                  >
                    {t.priority}
                  </td>
                  <td>
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(
                        t.status
                      )}`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td>
                    {new Date(
                      t.createdAt
                    ).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
