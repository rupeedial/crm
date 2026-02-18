export function getCampaignStats(leads: Lead[]) {
  const map: Record<string, any> = {};

  leads.forEach((l) => {
    if (!l.campaignName) return;

    if (!map[l.campaignName]) {
      map[l.campaignName] = {
        total: 0,
        verified: 0,
        disbursed: 0,
      };
    }

    map[l.campaignName].total++;

    if (l.status === "VERIFIED") map[l.campaignName].verified++;
    if (l.status === "DISBURSED") map[l.campaignName].disbursed++;
  });

  return map;
}
