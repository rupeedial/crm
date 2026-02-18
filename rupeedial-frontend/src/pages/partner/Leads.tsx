import { useState, useMemo } from "react";
import {
  Users,
  Search,
  Eye,
} from "lucide-react";

export default function AllLeadsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [productFilter, setProductFilter] = useState("All");

  const leadsData = [
    {
      id: 1,
      name: "Rahul Sharma",
      phone: "9876543210",
      product: "Personal Loan",
      amount: 500000,
      source: "Facebook",
      assignedTo: "Amit",
      status: "New",
    },
    {
      id: 2,
      name: "Anita Verma",
      phone: "9123456789",
      product: "Home Loan",
      amount: 2500000,
      source: "Google Ads",
      assignedTo: "Neha",
      status: "Approved",
    },
    {
      id: 3,
      name: "Vikas Mehta",
      phone: "9988776655",
      product: "Business Loan",
      amount: 800000,
      source: "WhatsApp",
      assignedTo: "Rahul",
      status: "Rejected",
    },
  ];

  const filteredLeads = useMemo(() => {
    return leadsData.filter((lead) => {
      const matchSearch =
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.phone.includes(search);

      const matchStatus =
        statusFilter === "All" || lead.status === statusFilter;

      const matchProduct =
        productFilter === "All" || lead.product === productFilter;

      return matchSearch && matchStatus && matchProduct;
    });
  }, [search, statusFilter, productFilter]);

  const totalLeads = leadsData.length;
  const newLeads = leadsData.filter(l => l.status === "New").length;
  const approvedLeads = leadsData.filter(l => l.status === "Approved").length;
  const rejectedLeads = leadsData.filter(l => l.status === "Rejected").length;

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-emerald-100 text-emerald-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      case "New":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex items-center gap-3">
        <Users className="text-emerald-600" />
        <h1 className="text-2xl font-semibold">All Leads</h1>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="bg-white p-5 rounded-xl shadow-sm text-center">
          <p className="text-lg font-semibold">{totalLeads}</p>
          <p className="text-sm text-gray-500">Total Leads</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm text-center">
          <p className="text-lg font-semibold text-yellow-600">
            {newLeads}
          </p>
          <p className="text-sm text-gray-500">New</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm text-center">
          <p className="text-lg font-semibold text-emerald-600">
            {approvedLeads}
          </p>
          <p className="text-sm text-gray-500">Approved</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm text-center">
          <p className="text-lg font-semibold text-red-600">
            {rejectedLeads}
          </p>
          <p className="text-sm text-gray-500">Rejected</p>
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
          value={productFilter}
          onChange={(e) => setProductFilter(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option>All</option>
          <option>Personal Loan</option>
          <option>Home Loan</option>
          <option>Business Loan</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option>All</option>
          <option>New</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">Lead Name</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Loan Amount</th>
              <th className="p-3 text-left">Source</th>
              <th className="p-3 text-left">Assigned To</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="border-t">
                <td className="p-3 font-medium">{lead.name}</td>
                <td className="p-3">{lead.phone}</td>
                <td className="p-3">{lead.product}</td>
                <td className="p-3">
                  ₹ {lead.amount.toLocaleString()}
                </td>
                <td className="p-3">{lead.source}</td>
                <td className="p-3">{lead.assignedTo}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${getStatusColor(
                      lead.status
                    )}`}
                  >
                    {lead.status}
                  </span>
                </td>
                <td className="p-3">
                  <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    View
                  </button>
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

      {/* PAGINATION MOCK */}
      <div className="flex justify-end gap-2 text-sm">
        <button className="px-3 py-1 bg-gray-200 rounded-lg">
          Previous
        </button>
        <button className="px-3 py-1 bg-emerald-600 text-white rounded-lg">
          1
        </button>
        <button className="px-3 py-1 bg-gray-200 rounded-lg">
          Next
        </button>
      </div>

    </div>
  );
}
