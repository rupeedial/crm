import { Lead, LeadSource } from "@/types";
import { getCampaignStats } from "@/lib/campaignUtils";
import { CampaignCard } from "./CampaignCard";

interface Props {
  leads?: Lead[];   // ✅ optional
  selectedSource: LeadSource | "all";
  onSelectSource: (source: LeadSource | "all") => void;
}

export function CampaignDashboard({
  leads = [],       // ✅ default value
  selectedSource,
  onSelectSource,
}: Props) {
  const stats = getCampaignStats(leads);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Campaign Performance
        </h3>

        {selectedSource !== "all" && (
          <button
            onClick={() => onSelectSource("all")}
            className="text-sm text-blue-600"
          >
            Clear Filter
          </button>
        )}
      </div>

      {stats.length === 0 ? (
        <p className="text-sm text-gray-500">
          No campaign data yet
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((item) => (
            <CampaignCard
              key={item.source}
              {...item}
              onClick={() =>
                onSelectSource(item.source as LeadSource)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
