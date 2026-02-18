import { Lead, LeadStatus, LeadSource } from "@/types";
import {
  formatCurrency,
  getLoanTypeLabel,
  getStatusLabel,
} from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Phone } from "lucide-react";
import { Tooltip } from "@/components/common/Tooltip";

/* ================= PROPS ================= */

interface Props {
  leads?: Lead[];
  selectedStatus?: LeadStatus | "all";
  selectedSource?: LeadSource | "all";
  search?: string;
  aiOnly?: boolean;
}

/* ================= COMPONENT ================= */

export function LeadsTable({
  leads = [],
  selectedStatus = "all",
  selectedSource = "all",
  search = "",
  aiOnly = false,
}: Props) {
  const filteredLeads = leads.filter((lead) => {
    const searchMatch =
      lead.customerName.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone.includes(search);

    const statusMatch =
      selectedStatus === "all" || lead.status === selectedStatus;

    const sourceMatch =
      selectedSource === "all" || lead.source === selectedSource;

    const aiMatch = !aiOnly || lead.score >= 85;

    return searchMatch && statusMatch && sourceMatch && aiMatch;
  });

  return (
    <div className="bg-card rounded-2xl shadow-card overflow-hidden">
      {/* HEADER */}
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold">Recent Leads</h3>
        <p className="text-sm text-muted-foreground">
          Showing {filteredLeads.length} lead
          {filteredLeads.length !== 1 && "s"}
        </p>
      </div>

      {/* BODY */}
      <div className="divide-y">
        {filteredLeads.map((lead) => (
          <div
            key={lead.id}
            className="flex items-center justify-between p-4 hover:bg-secondary/40 transition"
          >
            {/* LEFT */}
            <div className="space-y-0.5">
  <div className="flex items-center gap-2">
    <p className="font-medium text-foreground">
      {lead.customerName}
    </p>

    {lead.isDuplicate && (
      <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 text-xs font-semibold">
        DUPLICATE
      </span>
    )}
  </div>

  <p className="text-sm text-muted-foreground flex items-center gap-1">
    <Phone className="w-3 h-3" />
    {lead.phone}
  </p>

  <p className="text-xs text-muted-foreground">
    {getLoanTypeLabel(lead.loanType)}
  </p>

  {lead.score >= 85 && (
    <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold">
      🤖 AI Auto-Move Enabled
      <Tooltip text="High confidence lead. AI may automatically move this lead to the next stage." />
    </div>
  )}
</div>


            {/* RIGHT */}
            <div className="text-right space-y-1">
              <p className="font-semibold text-foreground">
                {formatCurrency(lead.loanAmount)}
              </p>

              <Badge variant="secondary">
                {getStatusLabel(lead.status)}
              </Badge>
            </div>
          </div>
        ))}

        {/* EMPTY STATE */}
        {filteredLeads.length === 0 && (
          <div className="p-6 text-center text-muted-foreground">
            No leads found
          </div>
        )}
      </div>
    </div>
  );
}
