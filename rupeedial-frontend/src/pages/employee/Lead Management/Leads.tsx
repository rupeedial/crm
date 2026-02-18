import React, { useMemo } from "react";
import { Lead } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { getTodayCallbacks } from "@/utils/followup";
import { isOverdue, minutesLate } from "@/utils/sla";
import {
  Phone,
  Clock,
  AlertCircle,
  CheckCircle,
  User,
  Eye,
} from "lucide-react";

interface Props {
  leads?: Lead[];
}

/* ================= DEMO FALLBACK ================= */

const demoLeads: any[] = [
  {
    id: "L-001",
    customerName: "Amit Verma",
    phone: "9876543210",
    status: "NEW",
    assignedTo: 1,
    followUpAt: new Date(Date.now() - 15 * 60000), // overdue
  },
  {
    id: "L-002",
    customerName: "Priya Singh",
    phone: "9123456780",
    status: "FOLLOW_UP",
    assignedTo: 1,
    followUpAt: new Date(Date.now() + 30 * 60000),
  },
  {
    id: "L-003",
    customerName: "Rohit Mehta",
    phone: "9988776655",
    status: "VERIFIED",
    assignedTo: 1,
  },
];

export default function LeadsPage({ leads = [] }: Props) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        Loading leads...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 text-red-500 bg-gray-50 min-h-screen">
        User not found
      </div>
    );
  }

  /* ================= DATA ================= */

  // 🔥 If no backend leads, show demo
  const finalLeads =
    leads.length > 0 ? leads : demoLeads;

  const myLeads = finalLeads.filter(
    (lead) => lead.assignedTo === user.id
  );

  const todayCallbacks = myLeads.filter(
    (lead) => lead.followUpAt
  );

  const overdueCount = myLeads.filter((l) =>
    l.followUpAt ? isOverdue(l) : false
  ).length;

  const statusColor = (status: string) => {
    switch (status) {
      case "NEW":
        return "bg-purple-100 text-purple-700";
      case "FOLLOW_UP":
        return "bg-amber-100 text-amber-700";
      case "VERIFIED":
        return "bg-emerald-100 text-emerald-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            My Leads
          </h1>
          <p className="text-sm text-gray-500">
            Welcome back, {user.name}
          </p>
        </div>

        <div className="bg-white px-4 py-2 rounded-xl border text-sm text-gray-600">
          Employee ID: {user.id}
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border p-5 shadow-sm">
          <p className="text-xs text-gray-500">
            Total Assigned Leads
          </p>
          <p className="text-xl font-semibold mt-1">
            {myLeads.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl border p-5 shadow-sm">
          <p className="text-xs text-gray-500">
            Today Callbacks
          </p>
          <p className="text-xl font-semibold text-purple-600 mt-1">
            {todayCallbacks.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl border p-5 shadow-sm">
          <p className="text-xs text-gray-500">
            Overdue Follow-ups
          </p>
          <p className="text-xl font-semibold text-red-500 mt-1">
            {overdueCount}
          </p>
        </div>
      </div>

      {/* LEADS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {myLeads.map((lead) => (
          <div
            key={lead.id}
            className="bg-white rounded-2xl border shadow-sm p-5 space-y-4 hover:shadow-md transition"
          >
            {/* TOP */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {lead.customerName}
                </h3>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                  <Phone size={12} />
                  {lead.phone}
                </p>
              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full ${statusColor(
                  lead.status
                )}`}
              >
                {lead.status}
              </span>
            </div>

            {/* SLA */}
            {lead.followUpAt && (
              <>
                {isOverdue(lead) ? (
                  <span className="inline-flex items-center gap-1 text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full">
                    <AlertCircle size={12} />
                    Overdue {minutesLate(lead)} min
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full">
                    <CheckCircle size={12} />
                    On Time
                  </span>
                )}
              </>
            )}

            {/* ACTIONS */}
            <div className="flex gap-3 pt-2">
              <button className="flex-1 bg-emerald-600 text-white py-2 rounded-lg text-sm hover:bg-emerald-700 transition">
                Call
              </button>

              <button className="flex-1 border text-purple-600 border-purple-200 py-2 rounded-lg text-sm hover:bg-purple-50 transition flex items-center justify-center gap-1">
                <Eye size={14} />
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
