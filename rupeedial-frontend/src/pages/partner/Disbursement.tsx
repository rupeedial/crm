import { useState } from "react";
import {
  IndianRupee,
  CheckCircle,
  Clock,
  Search,
  Filter,
} from "lucide-react";

interface DisbursementItem {
  id: number;
  customer: string;
  product: string;
  amount: number;
  commission: number;
  date: string;
  status: "Approved" | "Processing";
}

export default function Disbursement() {
  const [search, setSearch] = useState("");

  const data: DisbursementItem[] = [
    {
      id: 1,
      customer: "Rahul Sharma",
      product: "Home Loan",
      amount: 4500000,
      commission: 75000,
      date: "18 Feb 2026",
      status: "Approved",
    },
    {
      id: 2,
      customer: "Amit Verma",
      product: "Business Loan",
      amount: 2200000,
      commission: 30000,
      date: "15 Feb 2026",
      status: "Processing",
    },
    {
      id: 3,
      customer: "Neha Patel",
      product: "Car Loan",
      amount: 800000,
      commission: 12000,
      date: "12 Feb 2026",
      status: "Approved",
    },
  ];

  const filtered = data.filter((item) =>
    item.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Disbursements
        </h1>
        <p className="text-sm text-slate-500">
          Track all approved and processing loan disbursements
        </p>
      </div>

      {/* ================= SUMMARY CARDS ================= */}
      <div className="grid md:grid-cols-4 gap-4">

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-slate-500">Total Disbursed</p>
              <h2 className="text-xl font-bold text-green-700">₹75.5 L</h2>
            </div>
            <IndianRupee className="text-green-600" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-slate-500">This Month</p>
              <h2 className="text-xl font-bold text-green-700">₹18.2 L</h2>
            </div>
            <CheckCircle className="text-green-600" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-slate-500">Processing</p>
              <h2 className="text-xl font-bold text-yellow-600">2 Cases</h2>
            </div>
            <Clock className="text-yellow-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-slate-500">Total Commission</p>
              <h2 className="text-xl font-bold text-green-700">₹1.17 L</h2>
            </div>
            <IndianRupee className="text-green-600" />
          </div>
        </div>
      </div>

      {/* ================= SEARCH + FILTER ================= */}
      <div className="bg-white p-4 rounded-xl shadow-sm border flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search customer..."
            className="pl-9 pr-4 py-2 border rounded-lg w-full text-sm focus:ring-2 focus:ring-green-600 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-green-700 text-white rounded-lg text-sm hover:bg-green-800 transition">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-green-50 text-slate-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Loan Amount</th>
              <th className="px-6 py-3">Commission</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-green-50 transition">
                <td className="px-6 py-4 font-medium text-slate-800">
                  {item.customer}
                </td>
                <td className="px-6 py-4">{item.product}</td>
                <td className="px-6 py-4 font-semibold text-green-700">
                  ₹{item.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-green-700 font-medium">
                  ₹{item.commission.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-slate-500">{item.date}</td>
                <td className="px-6 py-4">
                  {item.status === "Approved" ? (
                    <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                      Approved
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                      Processing
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="p-6 text-center text-slate-500">
            No disbursement records found
          </div>
        )}
      </div>
    </div>
  );
}
