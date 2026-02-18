import { useState, useMemo } from "react";
import {
  Users,
  Search,
  Plus,
  Eye,
  UserCheck,
  UserX,
} from "lucide-react";

export default function PartnersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const partnersData = [
    {
      id: 1,
      name: "Kuber Finserve",
      email: "kuber@partner.com",
      phone: "9876543210",
      leads: 120,
      disbursal: 4500000,
      commission: 85000,
      status: "Active",
    },
    {
      id: 2,
      name: "Sharma Associates",
      email: "sharma@partner.com",
      phone: "9123456789",
      leads: 80,
      disbursal: 2800000,
      commission: 52000,
      status: "Active",
    },
    {
      id: 3,
      name: "Finance Hub",
      email: "hub@partner.com",
      phone: "9988776655",
      leads: 40,
      disbursal: 1200000,
      commission: 21000,
      status: "Inactive",
    },
  ];

  const filteredPartners = useMemo(() => {
    return partnersData.filter((partner) => {
      const matchSearch =
        partner.name.toLowerCase().includes(search.toLowerCase()) ||
        partner.email.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "All" || partner.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [search, statusFilter]);

  const totalPartners = partnersData.length;
  const activePartners = partnersData.filter(
    (p) => p.status === "Active"
  ).length;

  const totalDisbursal = partnersData.reduce(
    (sum, p) => sum + p.disbursal,
    0
  );

  const totalCommission = partnersData.reduce(
    (sum, p) => sum + p.commission,
    0
  );

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Users className="text-emerald-600" />
          <h1 className="text-2xl font-semibold">Partners</h1>
        </div>

        <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm">
          <Plus className="w-4 h-4" />
          Add Partner
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="bg-white p-5 rounded-xl shadow-sm text-center">
          <p className="text-lg font-semibold">{totalPartners}</p>
          <p className="text-sm text-gray-500">Total Partners</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm text-center">
          <p className="text-lg font-semibold text-emerald-600">
            {activePartners}
          </p>
          <p className="text-sm text-gray-500">Active</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm text-center">
          <p className="text-lg font-semibold">
            ₹ {totalDisbursal.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">Total Disbursal</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm text-center">
          <p className="text-lg font-semibold text-emerald-600">
            ₹ {totalCommission.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">Commission Paid</p>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white p-4 rounded-xl shadow-sm flex flex-wrap gap-4 items-center">

        <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input
            placeholder="Search partner"
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
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">Partner Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Leads</th>
              <th className="p-3 text-left">Disbursal</th>
              <th className="p-3 text-left">Commission</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredPartners.map((partner) => (
              <tr key={partner.id} className="border-t">
                <td className="p-3 font-medium">{partner.name}</td>
                <td className="p-3">{partner.email}</td>
                <td className="p-3">{partner.phone}</td>
                <td className="p-3">{partner.leads}</td>
                <td className="p-3">
                  ₹ {partner.disbursal.toLocaleString()}
                </td>
                <td className="p-3 text-emerald-600 font-medium">
                  ₹ {partner.commission.toLocaleString()}
                </td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      partner.status === "Active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {partner.status}
                  </span>
                </td>
                <td className="p-3 flex gap-2">
                  <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    View
                  </button>

                  {partner.status === "Active" ? (
                    <button className="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-xs flex items-center gap-1">
                      <UserX className="w-3 h-3" />
                      Disable
                    </button>
                  ) : (
                    <button className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-lg text-xs flex items-center gap-1">
                      <UserCheck className="w-3 h-3" />
                      Activate
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredPartners.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No partners found.
          </div>
        )}
      </div>
    </div>
  );
}
