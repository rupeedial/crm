import { Lead, LeadStatus } from "@/types";

interface AIMoveResult {
  autoMove: boolean;
  suggestedStatus: LeadStatus | null;
  reason: string;
}

/**
 * 🤖 AI PIPELINE ENGINE (STAGE AWARE)
 */
export const getAIMoveStatus = (
  lead: Lead,
  targetStatus: LeadStatus
): AIMoveResult => {
  const { status, score } = lead;

  /* ========= RULES ========= */

  // NEW → CONTACTED
  if (status === "new" && score >= 85 && targetStatus === "contacted") {
    return {
      autoMove: true,
      suggestedStatus: "contacted",
      reason: "Score ≥ 85 → Auto contacted",
    };
  }

  // CONTACTED → DOCS
  if (
    status === "contacted" &&
    score >= 90 &&
    targetStatus === "documents_collected"
  ) {
    return {
      autoMove: true,
      suggestedStatus: "documents_collected",
      reason: "Strong follow-up confidence",
    };
  }

  // DOCS → LOGGED IN
  if (
    status === "documents_collected" &&
    score >= 92 &&
    targetStatus === "logged_in"
  ) {
    return {
      autoMove: true,
      suggestedStatus: "logged_in",
      reason: "All documents verified",
    };
  }

  // LOGGED IN → SANCTIONED
  if (
    status === "logged_in" &&
    score >= 94 &&
    targetStatus === "sanctioned"
  ) {
    return {
      autoMove: true,
      suggestedStatus: "sanctioned",
      reason: "Bank eligibility matched",
    };
  }

  // SANCTIONED → DISBURSED
  if (
    status === "sanctioned" &&
    score >= 96 &&
    targetStatus === "disbursed"
  ) {
    return {
      autoMove: true,
      suggestedStatus: "disbursed",
      reason: "Final approval success",
    };
  }

  /* ========= SUGGEST ONLY ========= */

  if (score >= 85) {
    return {
      autoMove: false,
      suggestedStatus: targetStatus,
      reason: "AI suggests move (manual approval required)",
    };
  }

  /* ========= NO AI ========= */
  return {
    autoMove: false,
    suggestedStatus: null,
    reason: "AI confidence too low",
  };
};
