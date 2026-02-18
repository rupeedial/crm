import { campaigns } from "./campaignData";

export function getCampaignSummary() {
  const totalCampaigns = campaigns.length;

  const activeCampaigns = campaigns.filter(
    (c) => c.status === "Active"
  ).length;

  const totalLeads = campaigns.reduce(
    (sum, c) => sum + c.leads,
    0
  );

  const totalDisbursed = campaigns.reduce(
    (sum, c) => sum + c.disbursedAmount,
    0
  );

  return {
    totalCampaigns,
    activeCampaigns,
    totalLeads,
    totalDisbursed,
  };
}
