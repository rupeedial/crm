import { Lead } from "@/types";
import {
  isOverdue,
  minutesRemaining,
  getSLAStatus,
} from "@/utils/sla";

/* ==========================================
   SMART AUTO DIAL PRIORITY ENGINE
========================================== */

export function getNextAutoDialLead(
  leads: Lead[],
  userId: string,
  selectedCampaign: string = "ALL"
): Lead | null {
  if (!leads || leads.length === 0) return null;

  /* ================= FILTER ELIGIBLE ================= */

  const eligible = leads.filter((l) => {
    if (l.assignedTo !== userId) return false;
    if (!["LEAD", "VERIFIED"].includes(l.status)) return false;

    if (selectedCampaign !== "ALL") {
      if (l.campaignId !== selectedCampaign) return false;
    }

    return true;
  });

  if (eligible.length === 0) return null;

  /* ================= PRIORITY SORT ================= */

  const sorted = eligible.sort((a, b) => {
    const aStatus = getSLAStatus(a);
    const bStatus = getSLAStatus(b);

    // 1️⃣ OVERDUE first
    if (aStatus === "OVERDUE" && bStatus !== "OVERDUE")
      return -1;
    if (bStatus === "OVERDUE" && aStatus !== "OVERDUE")
      return 1;

    // 2️⃣ DUE SOON second
    if (aStatus === "DUE_SOON" && bStatus !== "DUE_SOON")
      return -1;
    if (bStatus === "DUE_SOON" && aStatus !== "DUE_SOON")
      return 1;

    // 3️⃣ AI Score High first
    const aScore = a.score || 0;
    const bScore = b.score || 0;
    if (aScore !== bScore) return bScore - aScore;

    // 4️⃣ Higher Loan Amount first
    const aAmount = a.loanAmount || 0;
    const bAmount = b.loanAmount || 0;
    if (aAmount !== bAmount) return bAmount - aAmount;

    // 5️⃣ Oldest created first
    return (
      new Date(a.createdAt || 0).getTime() -
      new Date(b.createdAt || 0).getTime()
    );
  });

  return sorted[0] || null;
}
