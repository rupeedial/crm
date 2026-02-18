import { useState, useMemo } from "react";
import {
  Percent,
  Search,
  Download,
  CheckCircle,
} from "lucide-react";

export default function CommissionPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const commissionsData = [
    {
      id: 1,
      partner: "Rahul Sharma",
      product: "Personal Loan",
      amount: 500000,
      commission: 7500,
      status: "Pending",
      date: "2026-02-10",
    },
    {
      id: 2,
      partner: "Anita Verma",
      product: "Home Loan",
      amount: 2500000,
      commission: 25000,
      status: "Paid",
      date: "2026-02-08",
    },
    {
      id: 3,
      partner: "Vikas Mehta",
      product: "Business Loan",
      amount: 800000,
      commission: 12000,
      status: "Pending",
      date: "2026-02-05",
    },
  ];

  const filteredData = useMemo(() => {
    return commissionsData.filter((item) => {
      const matchSearch =
        item.partner.toLowerCase().includes(search.toLowerCase()) ||
        item.product.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [search, statusFilter]);

  const totalCommission = commissionsData.reduce(
    (sum, item) => sum + item.commission,
    0
  );

  const pendingCommission = commissionsData
    .filter((item) => item.status === "Pending")
    .reduce((sum, item) => sum + item.commission, 0);

  const paidCommission = commissionsData
    .filter((item) => item.status === "Paid")
    .reduce((sum, item) => sum + item.commission, 0);

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex items-center gap-3">
        <Percent className="text-emerald-600" />
        <h1 className="text-2xl font-semibold">Commissions</h1>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-white p-5 rounded-xl shadow-sm text-center">
          <p className="text-lg font-semibold">₹ {totalCommission}</p>
          <p className="text-sm text-gray-500">Total Commission</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm text-center">
          <p className="text-lg font-semibold text-yellow-600">
            ₹ {pendingCommission}
          </p>
          <p className="text-sm text-gray-500">Pending</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm text-center">
          <p className="text-lg font-semibold text-emerald-600">
            ₹ {paidCommission}
          </p>
          <p className="text-sm text-gray-500">Paid</p>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white p-4 rounded-xl shadow-sm flex flex-wrap gap-4 items-center">

        <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input
            placeholder="Search partner or product"
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
          <option>Pending</option>
          <option>Paid</option>
        </select>

        <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">Partner</th>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Loan Amount</th>
              <th className="p-3 text-left">Commission</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-3">{item.partner}</td>
                <td className="p-3">{item.product}</td>
                <td className="p-3">₹ {item.amount}</td>
                <td className="p-3 font-medium">
                  ₹ {item.commission}
                </td>
                <td className="p-3">{item.date}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      item.status === "Paid"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="p-3">
                  {item.status === "Pending" && (
                    <button className="flex items-center gap-1 bg-emerald-600 text-white px-3 py-1 rounded-lg text-xs">
                      <CheckCircle className="w-3 h-3" />
                      Mark Paid
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredData.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No commission records found.
          </div>
        )}
      </div>
    </div>
  );
}
