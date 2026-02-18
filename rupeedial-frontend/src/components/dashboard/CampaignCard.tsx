import { formatCurrency } from "@/lib/mockData";

interface Props {
  source: string;
  totalLeads: number;
  converted: number;
  disbursedAmount: number;
  onClick?: () => void;
}

export function CampaignCard({
  source,
  totalLeads,
  converted,
  disbursedAmount,
  onClick,
}: Props) {
  return (
    <div
      onClick={onClick}
      className="bg-card rounded-xl p-5 shadow-card border cursor-pointer hover:shadow-lg transition"
    >
      <h4 className="font-semibold capitalize">{source}</h4>

      <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
        <div>
          <p className="text-muted-foreground">Leads</p>
          <p className="font-bold">{totalLeads}</p>
        </div>

        <div>
          <p className="text-muted-foreground">Conversion</p>
          <p className="font-bold">
            {totalLeads === 0
              ? 0
              : Math.round((converted / totalLeads) * 100)}
            %
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">Disbursed</p>
          <p className="font-bold">
            ₹{Math.round(disbursedAmount / 100000)} L
          </p>
        </div>
      </div>
    </div>
  );
}
