import { Lead } from "@/types";

export function getCampaignPerformance(leads: Lead[]) {
  const map: Record<string, any> = {};

  leads.forEach((lead) => {
    if (!map[lead.campaignId]) {
      map[lead.campaignId] = {
        campaignId: lead.campaignId,
        campaignName: lead.campaignName,
        total: 0,
        verified: 0,
        nonVerified: 0,
        pending: 0,
        followUps: 0,
      };
    }

    const c = map[lead.campaignId];
    c.total++;

    if (lead.status === "VERIFIED" || lead.status === "LOGIN") {
      c.verified++;
    } else if (lead.status === "NON_VERIFIED") {
      c.nonVerified++;
    } else {
      c.pending++;
    }

    if (lead.followUpAt) {
      c.followUps++;
    }
  });

  return Object.values(map).map((c: any) => ({
    ...c,
    conversion: c.total
      ? Math.round((c.verified / c.total) * 100)
      : 0,
  }));
}
