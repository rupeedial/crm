import { useState } from "react";
import {
  LifeBuoy,
  PlusCircle,
  Search,
  MessageCircle,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

interface Ticket {
  id: number;
  subject: string;
  category: string;
  createdOn: string;
  status: "Open" | "In Progress" | "Resolved";
}

export default function PartnerSupport() {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  const tickets: Ticket[] = [
    {
      id: 1,
      subject: "Payout not received",
      category: "Finance",
      createdOn: "12 Feb 2025",
      status: "Open",
    },
    {
      id: 2,
      subject: "Lead status update issue",
      category: "Leads",
      createdOn: "10 Feb 2025",
      status: "In Progress",
    },
    {
      id: 3,
      subject: "Unable to upload document",
      category: "KYC",
      createdOn: "05 Feb 2025",
      status: "Resolved",
    },
  ];

  const filteredTickets = tickets.filter((t) =>
    t.subject.toLowerCase().includes(search.toLowerCase())
  );

  const statusBadge = (status: string) => {
    if (status === "Resolved")
      return (
        <span className="flex items-center gap-1 text-green-700 bg-green-100 px-2 py-1 rounded text-xs">
          <CheckCircle className="w-3 h-3" /> Resolved
        </span>
      );
    if (status === "In Progress")
      return (
        <span className="flex items-center gap-1 text-yellow-700 bg-yellow-100 px-2 py-1 rounded text-xs">
          <Clock className="w-3 h-3" /> In Progress
        </span>
      );
    return (
      <span className="flex items-center gap-1 text-red-700 bg-red-100 px-2 py-1 rounded text-xs">
        <AlertCircle className="w-3 h-3" /> Open
      </span>
    );
  };

  return (
    <div className="p-6 space-y-8">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <LifeBuoy className="w-6 h-6 text-green-700" />
            Support Center
          </h1>
          <p className="text-sm text-slate-500">
            Raise and track your support requests
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-800 transition"
        >
          <PlusCircle className="w-4 h-4" />
          Raise Ticket
        </button>
      </div>

      {/* SEARCH */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search tickets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-green-600 outline-none"
        />
      </div>

      {/* TICKETS TABLE */}
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-green-50 text-slate-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Ticket ID</th>
              <th className="px-6 py-3">Subject</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Created On</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filteredTickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-green-50 transition">
                <td className="px-6 py-4 font-medium">#{ticket.id}</td>
                <td className="px-6 py-4 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-green-700" />
                  {ticket.subject}
                </td>
                <td className="px-6 py-4">{ticket.category}</td>
                <td className="px-6 py-4">{ticket.createdOn}</td>
                <td className="px-6 py-4">
                  {statusBadge(ticket.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredTickets.length === 0 && (
          <div className="p-6 text-center text-sm text-slate-500">
            No tickets found.
          </div>
        )}
      </div>

      {/* RAISE TICKET MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 space-y-4">
            <h2 className="text-lg font-semibold text-slate-800">
              Raise Support Ticket
            </h2>

            <input
              type="text"
              placeholder="Subject"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-600 outline-none"
            />

            <select className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-600 outline-none">
              <option>Select Category</option>
              <option>Finance</option>
              <option>Leads</option>
              <option>KYC</option>
              <option>Technical</option>
            </select>

            <textarea
              rows={4}
              placeholder="Describe your issue..."
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-600 outline-none"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg text-sm border"
              >
                Cancel
              </button>
              <button className="px-4 py-2 rounded-lg text-sm bg-green-700 text-white hover:bg-green-800">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
