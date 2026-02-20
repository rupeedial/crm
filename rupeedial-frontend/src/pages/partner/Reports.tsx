import { useState } from "react";
import {
  BarChart3,
  Calendar,
  Download,
  IndianRupee,
  TrendingUp,
  FileText,
} from "lucide-react";

interface MonthlyReport {
  month: string;
  leads: number;
  disbursement: number;
  commission: number;
}

export default function PartnerReports() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const reports: MonthlyReport[] = [
    { month: "January 2025", leads: 45, disbursement: 1200000, commission: 48000 },
    { month: "February 2025", leads: 52, disbursement: 1450000, commission: 58000 },
    { month: "March 2025", leads: 60, disbursement: 1700000, commission: 72000 },
    { month: "April 2025", leads: 39, disbursement: 980000, commission: 39000 },
  ];

  const totalLeads = reports.reduce((sum, r) => sum + r.leads, 0);
  const totalDisbursement = reports.reduce((sum, r) => sum + r.disbursement, 0);
  const totalCommission = reports.reduce((sum, r) => sum + r.commission, 0);

  return (
    <div className="p-6 space-y-8">

      {/* HEADER */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-green-700" />
            Reports
          </h1>
          <p className="text-sm text-slate-500">
            Track your performance and earnings
          </p>
        </div>

        <button className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-800 transition">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border">
          <p className="text-sm text-slate-500">Total Leads</p>
          <h2 className="text-2xl font-bold mt-2">{totalLeads}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border">
          <p className="text-sm text-slate-500">Total Disbursement</p>
          <h2 className="text-2xl font-bold mt-2">
            ₹{totalDisbursement.toLocaleString()}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border">
          <p className="text-sm text-slate-500">Total Commission</p>
          <h2 className="text-2xl font-bold text-green-700 mt-2">
            ₹{totalCommission.toLocaleString()}
          </h2>
        </div>
      </div>

      {/* DATE FILTER */}
      <div className="bg-white p-5 rounded-xl shadow-sm border flex flex-wrap gap-4 items-end">
        <div>
          <label className="text-xs text-slate-500 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            From
          </label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="mt-1 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-600 outline-none"
          />
        </div>

        <div>
          <label className="text-xs text-slate-500 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            To
          </label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="mt-1 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-600 outline-none"
          />
        </div>

        <button className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-800 transition">
          Apply Filter
        </button>
      </div>

      {/* REPORT TABLE */}
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-green-50 text-slate-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Month</th>
              <th className="px-6 py-3">Leads</th>
              <th className="px-6 py-3">Disbursement</th>
              <th className="px-6 py-3">Commission</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {reports.map((report, index) => (
              <tr key={index} className="hover:bg-green-50 transition">
                <td className="px-6 py-4 font-medium flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-400" />
                  {report.month}
                </td>

                <td className="px-6 py-4">
                  {report.leads}
                </td>

                <td className="px-6 py-4">
                  ₹{report.disbursement.toLocaleString()}
                </td>

                <td className="px-6 py-4 font-semibold text-green-700">
                  ₹{report.commission.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PERFORMANCE NOTE */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
        <TrendingUp className="w-5 h-5 text-green-700 mt-1" />
        <div className="text-sm text-slate-700">
          Your commission increased by <span className="font-semibold text-green-700">18%</span> compared to last month. Keep pushing!
        </div>
      </div>

    </div>
  );
}
