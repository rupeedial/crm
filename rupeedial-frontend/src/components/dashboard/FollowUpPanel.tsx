import { useState } from "react";
import { Lead } from "@/types";
import { formatCurrency } from "@/lib/mockData";
import { LeadDetailModal } from "./LeadDetailModal";

type TabType = "today" | "overdue" | "future" | null;

interface Props {
  leads: Lead[];
}

export function FollowUpPanel({ leads }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>(null);
const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const safeLeads = leads ?? [];

  const todayLeads = safeLeads.filter((l) => {
    if (!l.nextFollowUpDate) return false;
    const d = new Date(l.nextFollowUpDate);
    d.setHours(0, 0, 0, 0);
    return d.getTime() === today.getTime();
  });

  const overdueLeads = safeLeads.filter((l) => {
    if (!l.nextFollowUpDate) return false;
    const d = new Date(l.nextFollowUpDate);
    d.setHours(0, 0, 0, 0);
    return d < today;
  });

  const futureLeads = safeLeads.filter((l) => {
    if (!l.nextFollowUpDate) return false;
    const d = new Date(l.nextFollowUpDate);
    d.setHours(0, 0, 0, 0);
    return d > today;
  });

  const getActiveLeads = () => {
    if (activeTab === "today") return todayLeads;
    if (activeTab === "overdue") return overdueLeads;
    if (activeTab === "future") return futureLeads;
    return [];
  };

  return (
    <div className="bg-card rounded-2xl shadow-card p-6">
      <h3 className="text-lg font-semibold mb-4">Follow Up</h3>

      {/* COUNTERS */}
      <div className="flex gap-6 text-sm mb-4">
        <button
          onClick={() => setActiveTab("today")}
          className={`font-medium ${
            activeTab === "today" ? "text-blue-600" : ""
          }`}
        >
          Today <b>{todayLeads.length}</b>
        </button>

        <button
          onClick={() => setActiveTab("overdue")}
          className={`font-medium ${
            activeTab === "overdue" ? "text-red-600" : ""
          }`}
        >
          Past Overdue <b>{overdueLeads.length}</b>
        </button>

        <button
          onClick={() => setActiveTab("future")}
          className={`font-medium ${
            activeTab === "future" ? "text-emerald-600" : ""
          }`}
        >
          Future Request <b>{futureLeads.length}</b>
        </button>
      </div>

      {/* LEADS LIST */}
      {activeTab && (
        <div className="divide-y border rounded-lg">
          {getActiveLeads().map((lead) => (
            <div
           key={lead.id}
  onClick={() => setSelectedLead(lead)}
  className="p-3 hover:bg-secondary/40 cursor-pointer transition"
>
              <p className="font-medium">{lead.customerName}</p>
              <p className="text-xs text-muted-foreground">
                {lead.phone} • {formatCurrency(lead.loanAmount)}
              </p>
            </div>
          ))}


{selectedLead && (
  <LeadDetailModal
    lead={selectedLead}
    onClose={() => setSelectedLead(null)}
  />
)}
          {getActiveLeads().length === 0 && (
            <div className="p-4 text-center text-muted-foreground">
              No follow-ups found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
