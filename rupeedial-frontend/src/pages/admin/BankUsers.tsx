import { useState, useMemo } from "react";
import {
  Building2,
  Search,
  Plus,
  UserCheck,
  UserX,
  Eye,
} from "lucide-react";

export default function BankUsersPage() {
  const [search, setSearch] = useState("");
  const [bankFilter, setBankFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const bankUsersData = [
    {
      id: 1,
      name: "Amit Singh",
      email: "amit@hdfc.com",
      bank: "HDFC Bank",
      role: "Credit Manager",
      approvals: true,
      status: "Active",
    },
    {
      id: 2,
      name: "Neha Kapoor",
      email: "neha@icici.com",
      bank: "ICICI Bank",
      role: "Loan Officer",
      approvals: false,
      status: "Active",
    },
    {
      id: 3,
      name: "Rohit Jain",
      email: "rohit@sbi.com",
      bank: "SBI",
      role: "Underwriter",
      approvals: true,
      status: "Inactive",
    },
  ];

  const filteredUsers = useMemo(() => {
    return bankUsersData.filter((user) => {
      const matchSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

      const matchBank =
        bankFilter === "All" || user.bank === bankFilter;

      const matchStatus =
        statusFilter === "All" || user.status === statusFilter;

      return matchSearch && matchBank && matchStatus;
    });
  }, [search, bankFilter, statusFilter]);

  const totalUsers = bankUsersData.length;
  const activeUsers = bankUsersData.filter(
    (u) => u.status === "Active"
  ).length;
  const approvalUsers = bankUsersData.filter(
    (u) => u.approvals
  ).length;

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Building2 className="text-emerald-600" />
          <h1 className="text-2xl font-semibold">Bank Users</h1>
        </div>

        <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm">
          <Plus className="w-4 h-4" />
          Add Bank User
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-white p-5 rounded-xl shadow-sm text-center">
          <p className="text-lg font-semibold">{totalUsers}</p>
          <p className="text-sm text-gray-500">Total Bank Users</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm text-center">
          <p className="text-lg font-semibold text-emerald-600">
            {activeUsers}
          </p>
          <p className="text-sm text-gray-500">Active Users</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm text-center">
          <p className="text-lg font-semibold text-blue-600">
            {approvalUsers}
          </p>
          <p className="text-sm text-gray-500">
            Approval Access
          </p>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white p-4 rounded-xl shadow-sm flex flex-wrap gap-4 items-center">

        <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input
            placeholder="Search bank user"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-sm"
          />
        </div>

        <select
          value={bankFilter}
          onChange={(e) => setBankFilter(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option>All</option>
          <option>HDFC Bank</option>
          <option>ICICI Bank</option>
          <option>SBI</option>
        </select>

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
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Bank</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Approval Access</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-3 font-medium">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.bank}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3">
                  {user.approvals ? (
                    <span className="text-emerald-600 font-medium">
                      Yes
                    </span>
                  ) : (
                    <span className="text-gray-500">No</span>
                  )}
                </td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      user.status === "Active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-3 flex gap-2">
                  <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    View
                  </button>

                  {user.status === "Active" ? (
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

        {filteredUsers.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No bank users found.
          </div>
        )}
      </div>
    </div>
  );
}
