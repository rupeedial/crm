import { Lead, LeadSource } from "@/types";

interface Props {
  source: LeadSource;
  leads: Lead[];
  onClick?: () => void;
}

export function CampaignSourceCard({ source, leads, onClick }: Props) {
  const total = leads.length;
  const disbursed = leads.filter(l => l.status === "disbursed").length;

  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-card rounded-xl p-4 shadow hover:shadow-lg transition border"
    >
      <p className="text-sm capitalize text-muted-foreground">{source}</p>

      <p className="text-2xl font-bold">{total}</p>

      <p className="text-xs text-emerald-600">
        Disbursed: {disbursed}
      </p>

      <p className="text-xs text-muted-foreground mt-1">
        Click to view details →
      </p>
    </div>
  );
}
