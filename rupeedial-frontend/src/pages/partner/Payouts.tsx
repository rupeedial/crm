import { useState } from "react";
import {
  IndianRupee,
  Clock,
  CheckCircle,
  Search,
  Filter,
} from "lucide-react";

interface PayoutItem {
  id: number;
  amount: number;
  reference: string;
  date: string;
  status: "Paid" | "Pending" | "Processing";
}

export default function Payouts() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const payouts: PayoutItem[] = [
    {
      id: 1,
      amount: 75000,
      reference: "RD-TRX-98231",
      date: "20 Feb 2026",
      status: "Paid",
    },
    {
      id: 2,
      amount: 30000,
      reference: "RD-TRX-98212",
      date: "18 Feb 2026",
      status: "Processing",
    },
    {
      id: 3,
      amount: 12000,
      reference: "RD-TRX-98199",
      date: "15 Feb 2026",
      status: "Pending",
    },
  ];

  const filtered = payouts.filter((item) => {
    const matchesSearch = item.reference
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter =
      filter === "All" || item.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Payouts
        </h1>
        <p className="text-sm text-slate-500">
          Track all commission payouts & settlements
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid md:grid-cols-4 gap-4">

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <p className="text-sm text-slate-500">Total Earnings</p>
          <h2 className="text-xl font-bold text-green-700">₹1.17 L</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <p className="text-sm text-slate-500">Paid</p>
          <h2 className="text-xl font-bold text-green-600">₹75,000</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <p className="text-sm text-slate-500">Processing</p>
          <h2 className="text-xl font-bold text-yellow-600">₹30,000</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <p className="text-sm text-slate-500">Pending</p>
          <h2 className="text-xl font-bold text-red-500">₹12,000</h2>
        </div>

      </div>

      {/* SEARCH + FILTER */}
      <div className="bg-white p-4 rounded-xl shadow-sm border flex flex-col md:flex-row gap-4 md:items-center md:justify-between">

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search transaction ID..."
            className="pl-9 pr-4 py-2 border rounded-lg w-full text-sm focus:ring-2 focus:ring-green-600 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <select
            className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-600 outline-none"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>All</option>
            <option>Paid</option>
            <option>Processing</option>
            <option>Pending</option>
          </select>
        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-green-50 text-slate-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Transaction ID</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-green-50 transition">
                <td className="px-6 py-4 font-medium text-slate-800">
                  {item.reference}
                </td>

                <td className="px-6 py-4 font-semibold text-green-700">
                  ₹{item.amount.toLocaleString()}
                </td>

                <td className="px-6 py-4 text-slate-500">
                  {item.date}
                </td>

                <td className="px-6 py-4">
                  {item.status === "Paid" && (
                    <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 flex items-center gap-1 w-fit">
                      <CheckCircle className="w-3 h-3" />
                      Paid
                    </span>
                  )}

                  {item.status === "Processing" && (
                    <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700 flex items-center gap-1 w-fit">
                      <Clock className="w-3 h-3" />
                      Processing
                    </span>
                  )}

                  {item.status === "Pending" && (
                    <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-600 w-fit">
                      Pending
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="p-6 text-center text-slate-500">
            No payout records found
          </div>
        )}
      </div>

    </div>
  );
}
