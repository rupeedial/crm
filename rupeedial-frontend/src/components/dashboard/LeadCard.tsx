import { Badge } from "@/components/ui/badge";
import { Lead } from "@/types";
import { formatCurrency, getLoanTypeLabel } from "@/lib/mockData";
import { Phone, MapPin, Sparkles } from "lucide-react";
import { StatusTimeline } from "./StatusTimeline";

export function LeadCard({ lead }: { lead: Lead }) {
  return (
    <div className="bg-card rounded-xl p-4 shadow-card border">
      <div className="flex justify-between mb-2">
        <div>
          <h4 className="font-semibold">{lead.customerName}</h4>
          <p className="text-sm text-muted-foreground">
            {getLoanTypeLabel(lead.loanType)}
          </p>

          {lead.score >= 85 && (
            <span className="text-xs text-emerald-600 font-semibold">
              🤖 AI Auto-Move Enabled
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span className="font-bold">{lead.score}</span>
        </div>
      </div>

      <div className="text-sm text-muted-foreground flex gap-3 mb-2">
        <span className="flex gap-1 items-center">
          <Phone className="w-3 h-3" /> {lead.phone}
        </span>
        <span className="flex gap-1 items-center">
          <MapPin className="w-3 h-3" /> {lead.city}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <span className="font-bold">
          {formatCurrency(lead.loanAmount)}
        </span>
        <Badge>{lead.probability.toUpperCase()}</Badge>
      </div>

      <StatusTimeline lead={lead} />
    </div>
  );
}
