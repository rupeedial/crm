import { useState, useMemo } from "react";
import {
  Users,
  Search,
  Download,
  Trash2,
  Filter,
} from "lucide-react";

export default function AudiencePage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [cityFilter, setCityFilter] = useState("All");
  const [selectedLeads, setSelectedLeads] = useState([]);

  const leadsData = [
    {
      id: 1,
      name: "Rahul Sharma",
      phone: "9876543210",
      city: "Mumbai",
      source: "Facebook",
      status: "New",
    },
    {
      id: 2,
      name: "Anita Verma",
      phone: "9123456780",
      city: "Delhi",
      source: "Google",
      status: "Contacted",
    },
    {
      id: 3,
      name: "Vikas Mehta",
      phone: "9988776655",
      city: "Mumbai",
      source: "WhatsApp",
      status: "Qualified",
    },
    {
      id: 4,
      name: "Priya Singh",
      phone: "9000011122",
      city: "Pune",
      source: "Instagram",
      status: "New",
    },
  ];

  const filteredLeads = useMemo(() => {
    return leadsData.filter((lead) => {
      const matchSearch =
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.phone.includes(search);

      const matchStatus =
        statusFilter === "All" || lead.status === statusFilter;

      const matchCity =
        cityFilter === "All" || lead.city === cityFilter;

      return matchSearch && matchStatus && matchCity;
    });
  }, [search, statusFilter, cityFilter]);

  const toggleSelect = (id) => {
    setSelectedLeads((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedLeads.length === filteredLeads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(filteredLeads.map((lead) => lead.id));
    }
  };

  const deleteSelected = () => {
    alert("Selected Leads Deleted (Demo)");
    setSelectedLeads([]);
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex items-center gap-3">
        <Users className="text-emerald-600" />
        <h1 className="text-2xl font-semibold">Audience</h1>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm text-center">
          <p className="text-lg font-semibold">{leadsData.length}</p>
          <p className="text-sm text-gray-500">Total Leads</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm text-center">
          <p className="text-lg font-semibold">
            {leadsData.filter((l) => l.status === "New").length}
          </p>
          <p className="text-sm text-gray-500">New Leads</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm text-center">
          <p className="text-lg font-semibold">
            {leadsData.filter((l) => l.status === "Qualified").length}
          </p>
          <p className="text-sm text-gray-500">Qualified</p>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white p-4 rounded-xl shadow-sm flex flex-wrap gap-4 items-center">

        <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input
            placeholder="Search by name or phone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-sm"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option>All</option>
          <option>New</option>
          <option>Contacted</option>
          <option>Qualified</option>
        </select>

        <select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option>All</option>
          <option>Mumbai</option>
          <option>Delhi</option>
          <option>Pune</option>
        </select>

        <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg text-sm">
          <Filter className="w-4 h-4" />
          More Filters
        </button>

        <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm">
          <Download className="w-4 h-4" />
          Export
        </button>

        {selectedLeads.length > 0 && (
          <button
            onClick={deleteSelected}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            <Trash2 className="w-4 h-4" />
            Delete Selected
          </button>
        )}
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3">
                <input
                  type="checkbox"
                  onChange={selectAll}
                  checked={
                    selectedLeads.length === filteredLeads.length &&
                    filteredLeads.length > 0
                  }
                />
              </th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">City</th>
              <th className="p-3 text-left">Source</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="border-t">
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedLeads.includes(lead.id)}
                    onChange={() => toggleSelect(lead.id)}
                  />
                </td>
                <td className="p-3">{lead.name}</td>
                <td className="p-3">{lead.phone}</td>
                <td className="p-3">{lead.city}</td>
                <td className="p-3">{lead.source}</td>
                <td className="p-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs">
                    {lead.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredLeads.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No leads found.
          </div>
        )}
      </div>
    </div>
  );
}
