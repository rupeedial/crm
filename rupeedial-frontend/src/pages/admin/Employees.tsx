import { useState, useMemo } from "react";
import {
  Users,
  Search,
  Plus,
  Edit,
  UserCheck,
  UserX,
} from "lucide-react";

export default function EmployeesPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const employeesData = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@rupeedial.com",
      role: "Sales Executive",
      commission: 2,
      leads: 45,
      status: "Active",
    },
    {
      id: 2,
      name: "Anita Verma",
      email: "anita@rupeedial.com",
      role: "Telecaller",
      commission: 1.5,
      leads: 60,
      status: "Active",
    },
    {
      id: 3,
      name: "Vikas Mehta",
      email: "vikas@rupeedial.com",
      role: "Sales Manager",
      commission: 3,
      leads: 120,
      status: "Inactive",
    },
  ];

  const filteredEmployees = useMemo(() => {
    return employeesData.filter((emp) => {
      const matchSearch =
        emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.email.toLowerCase().includes(search.toLowerCase());

      const matchRole =
        roleFilter === "All" || emp.role === roleFilter;

      const matchStatus =
        statusFilter === "All" || emp.status === statusFilter;

      return matchSearch && matchRole && matchStatus;
    });
  }, [search, roleFilter, statusFilter]);

  const totalEmployees = employeesData.length;
  const activeEmployees = employeesData.filter(
    (emp) => emp.status === "Active"
  ).length;
  const inactiveEmployees = employeesData.filter(
    (emp) => emp.status === "Inactive"
  ).length;

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Users className="text-emerald-600" />
          <h1 className="text-2xl font-semibold">Employees</h1>
        </div>

        <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm">
          <Plus className="w-4 h-4" />
          Add Employee
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-white p-5 rounded-xl shadow-sm text-center">
          <p className="text-lg font-semibold">{totalEmployees}</p>
          <p className="text-sm text-gray-500">Total Employees</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm text-center">
          <p className="text-lg font-semibold text-emerald-600">
            {activeEmployees}
          </p>
          <p className="text-sm text-gray-500">Active</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm text-center">
          <p className="text-lg font-semibold text-red-600">
            {inactiveEmployees}
          </p>
          <p className="text-sm text-gray-500">Inactive</p>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white p-4 rounded-xl shadow-sm flex flex-wrap gap-4 items-center">

        <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input
            placeholder="Search employee"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-sm"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option>All</option>
          <option>Sales Executive</option>
          <option>Telecaller</option>
          <option>Sales Manager</option>
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
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Commission %</th>
              <th className="p-3 text-left">Leads Assigned</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp.id} className="border-t">
                <td className="p-3 font-medium">{emp.name}</td>
                <td className="p-3">{emp.email}</td>
                <td className="p-3">{emp.role}</td>
                <td className="p-3">{emp.commission}%</td>
                <td className="p-3">{emp.leads}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      emp.status === "Active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>
                <td className="p-3 flex gap-2">
                  <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs flex items-center gap-1">
                    <Edit className="w-3 h-3" />
                    Edit
                  </button>

                  {emp.status === "Active" ? (
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

        {filteredEmployees.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No employees found.
          </div>
        )}
      </div>
    </div>
  );
}
