import { useState } from "react";
import {
  ArrowLeft,
  Search,
  Eye,
  Edit,
  Pause,
  Trash2,
  Megaphone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CampaignList() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filterChannel, setFilterChannel] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: "Mumbai Personal Loan Blast",
      channel: "WhatsApp",
      status: "Active",
      sent: 1200,
      leads: 240,
      date: "13 Feb 2026",
    },
    {
      id: 2,
      name: "Delhi Home Loan Campaign",
      channel: "SMS",
      status: "Paused",
      sent: 850,
      leads: 110,
      date: "10 Feb 2026",
    },
    {
      id: 3,
      name: "Gold Loan Insta Ads",
      channel: "Instagram",
      status: "Completed",
      sent: 5000,
      leads: 620,
      date: "05 Feb 2026",
    },
  ]);

  /* ================= FILTER LOGIC ================= */

  const filteredCampaigns = campaigns.filter((c) => {
    return (
      (filterChannel === "All" || c.channel === filterChannel) &&
      (filterStatus === "All" || c.status === filterStatus) &&
      c.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  /* ================= STATUS BADGE ================= */

  const statusColor = (status) => {
    if (status === "Active") return "bg-emerald-100 text-emerald-700";
    if (status === "Paused") return "bg-yellow-100 text-yellow-700";
    if (status === "Completed") return "bg-gray-200 text-gray-700";
    return "";
  };

  /* ================= ACTIONS ================= */

  const pauseCampaign = (id) => {
    setCampaigns(
      campaigns.map((c) =>
        c.id === id ? { ...c, status: "Paused" } : c
      )
    );
  };

  const deleteCampaign = (id) => {
    setCampaigns(campaigns.filter((c) => c.id !== id));
  };

  return (
    <div className="p-6 space-y-8">

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <Megaphone className="text-emerald-600" />
          <h1 className="text-2xl font-semibold">Campaign List</h1>
        </div>

        <button
          onClick={() => navigate("/dashboard/admin/campaign/configure")}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-700"
        >
          + Create Campaign
        </button>
      </div>

      {/* ================= FILTERS ================= */}
      <div className="bg-white border rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-4 md:items-center md:justify-between">

        <div className="flex items-center gap-3 w-full md:w-1/3">
          <Search className="text-gray-400 w-4 h-4" />
          <input
            placeholder="Search campaign..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div className="flex gap-3">
          <select
            value={filterChannel}
            onChange={(e) => setFilterChannel(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option>All</option>
            <option>WhatsApp</option>
            <option>SMS</option>
            <option>Instagram</option>
            <option>Google Ads</option>
            <option>IVR</option>
            <option>Missed Call</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option>All</option>
            <option>Active</option>
            <option>Paused</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">

        {filteredCampaigns.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No campaigns found.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-4 text-left">Campaign</th>
                <th className="p-4 text-left">Channel</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Sent</th>
                <th className="p-4 text-left">Leads</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredCampaigns.map((c) => (
                <tr key={c.id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-4 font-medium">{c.name}</td>
                  <td className="p-4">{c.channel}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${statusColor(
                        c.status
                      )}`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4">{c.sent}</td>
                  <td className="p-4">{c.leads}</td>
                  <td className="p-4">{c.date}</td>

                  <td className="p-4 flex justify-center gap-3">
                    <Eye className="w-4 h-4 cursor-pointer text-gray-500 hover:text-emerald-600" />
                    <Edit className="w-4 h-4 cursor-pointer text-gray-500 hover:text-blue-600" />
                    <Pause
                      onClick={() => pauseCampaign(c.id)}
                      className="w-4 h-4 cursor-pointer text-gray-500 hover:text-yellow-600"
                    />
                    <Trash2
                      onClick={() => deleteCampaign(c.id)}
                      className="w-4 h-4 cursor-pointer text-gray-500 hover:text-red-600"
                    />
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
