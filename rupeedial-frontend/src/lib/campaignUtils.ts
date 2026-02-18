import { Lead } from "@/types";

export interface CampaignStat {
  source: string;
  totalLeads: number;
  converted: number;
  disbursedAmount: number;
}

export const getCampaignStats = (
  leads: Lead[] = []   // ✅ DEFAULT VALUE
): CampaignStat[] => {
  const map: Record<string, CampaignStat> = {};

  leads.forEach((lead) => {
    const key = lead.source || "Unknown";

    if (!map[key]) {
      map[key] = {
        source: key,
        totalLeads: 0,
        converted: 0,
        disbursedAmount: 0,
      };
    }

    map[key].totalLeads += 1;

    if (
      lead.status === "disbursed" ||
      lead.status === "disbursed_confirmed"
    ) {
      map[key].converted += 1;
      map[key].disbursedAmount += lead.loanAmount || 0;
    }
  });

  return Object.values(map);
};
