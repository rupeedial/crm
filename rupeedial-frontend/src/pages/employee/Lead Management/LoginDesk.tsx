import React, { useMemo, useState } from "react";
import { Lead } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { getTodayCallbacks } from "@/utils/followup";
import { isOverdue, minutesLate } from "@/utils/sla";
import { updateLeadStatus } from "@/lib/leadStore";
import {
  Search,
  ArrowRightCircle,
} from "lucide-react";

interface Props {
  leads?: Lead[];
}

export default function Leads({ leads = [] }: Props) {
  const { user, loading } = useAuth();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("ALL");
  const [refresh, setRefresh] = useState(false);

  if (loading)
    return <div className="p-6">Loading...</div>;
  if (!user)
    return (
      <div className="p-6 text-red-500">
        User not found
      </div>
    );

  /* ================= USER LEADS ================= */

  const myLeads = leads.filter(
    (lead) => lead.assignedTo === user.id
  );

  const todayCallbacks = getTodayCallbacks(
    myLeads,
    user.id
  );

  const overdueCount = myLeads.filter(
    (lead) =>
      lead.followUpAt && isOverdue(lead)
  ).length;

  const filteredLeads = useMemo(() => {
    return myLeads.filter((lead) => {
      const matchSearch =
        lead.customerName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        lead.phone.includes(search);

      const matchStatus =
        statusFilter === "ALL" ||
        lead.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [myLeads, search, statusFilter, refresh]);

  /* ================= MOVE TO LOGIN ================= */

  const handleSendToLogin = (
    leadId: string
  ) => {
    updateLeadStatus(leadId, "LOGIN");
    setRefresh(!refresh);
  };

  /* ================= STATUS COLOR ================= */

  const getStatusColor = (status: string) => {
    switch (status) {
      case "NEW":
        return "bg-purple-100 text-purple-700";
      case "FOLLOWUP":
        return "bg-amber-100 text-amber-700";
      case "LOGIN":
        return "bg-emerald-100 text-emerald-700";
      case "REJECTED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            My Leads
          </h1>
          <p className="text-sm text-gray-500">
            Welcome back, {user.name}
          </p>
        </div>

        <div className="flex gap-4">
          <StatCard
            label="Total"
            value={myLeads.length}
            color="purple"
          />
          <StatCard
            label="Follow-ups"
            value={todayCallbacks.length}
            color="amber"
          />
          <StatCard
            label="Overdue"
            value={overdueCount}
            color="red"
          />
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border flex flex-wrap gap-4">
        <div className="flex items-center gap-2 border rounded-xl px-3 py-2 w-80 focus-within:ring-2 focus-within:ring-purple-500">
          <Search
            size={16}
            className="text-gray-400"
          />
          <input
            type="text"
            placeholder="Search name or phone..."
            className="outline-none text-sm w-full"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <select
          className="border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option value="ALL">
            All Status
          </option>
          <option value="NEW">
            New
          </option>
          <option value="FOLLOWUP">
            Follow-up
          </option>
          <option value="LOGIN">
            Login
          </option>
          <option value="REJECTED">
            Rejected
          </option>
        </select>
      </div>

      {/* EMPTY STATE */}
      {filteredLeads.length === 0 && (
        <div className="bg-white border border-dashed rounded-2xl py-20 text-center text-gray-400">
          No leads found.
        </div>
      )}

      {/* LEADS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredLeads.map((lead) => (
          <div
            key={lead.id}
            className="bg-white rounded-2xl border shadow-sm p-6 space-y-4 hover:shadow-md transition"
          >
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold text-lg">
                  {lead.customerName}
                </h3>
                <p className="text-sm text-gray-500">
                  📞 {lead.phone}
                </p>
              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(
                  lead.status
                )}`}
              >
                {lead.status}
              </span>
            </div>

            {lead.loanAmount && (
              <p className="text-sm font-semibold text-emerald-600">
                ₹
                {lead.loanAmount.toLocaleString()}
              </p>
            )}

            {lead.followUpAt &&
              (isOverdue(lead) ? (
                <span className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full font-medium">
                  ⏱ Overdue{" "}
                  {minutesLate(lead)} min
                </span>
              ) : (
                <span className="text-xs bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full font-medium">
                  On Time
                </span>
              ))}

            {lead.status === "FOLLOWUP" && (
              <button
                onClick={() =>
                  handleSendToLogin(
                    lead.id
                  )
                }
                className="w-full mt-3 bg-purple-600 text-white py-2 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-purple-700 transition"
              >
                <ArrowRightCircle
                  size={16}
                />
                Send to Login Desk
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= STAT CARD ================= */

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: "purple" | "amber" | "red";
}) {
  const colorMap = {
    purple: "text-purple-600",
    amber: "text-amber-600",
    red: "text-red-600",
  };

  return (
    <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border text-center min-w-[120px]">
      <p className="text-xs text-gray-500">
        {label}
      </p>
      <p
        className={`text-xl font-semibold ${colorMap[color]}`}
      >
        {value}
      </p>
    </div>
  );
}
