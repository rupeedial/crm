import { Lead } from "@/types";
import { getStatusLabel } from "@/lib/mockData";

export function StatusTimeline({ lead }: { lead: Lead }) {
  if (!lead.statusHistory?.length) return null;

  return (
    <div className="mt-3 border-t pt-2 space-y-1">
      <p className="text-xs font-semibold text-muted-foreground">
        Status History
      </p>

      {lead.statusHistory
        .slice()
        .reverse()
        .map((h, i) => (
          <div key={i} className="flex justify-between text-xs">
            <span>
              {getStatusLabel(h.status)} {h.changedBy === "ai" && "🤖"}
            </span>
            <span className="text-muted-foreground">
              {new Date(h.changedAt).toLocaleString()}
            </span>
          </div>
        ))}
    </div>
  );
}
