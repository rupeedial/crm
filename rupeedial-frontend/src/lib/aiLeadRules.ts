import { LeadStatus } from "@/types";

const PIPELINE_ORDER: LeadStatus[] = [
  "new",
  "contacted",
  "documents_collected",
  "logged_in",
  "sanctioned",
  "disbursed",
  "disbursed_confirmed",
  "counted",
  "payout_released",
];

export function getNextStatus(
  current: LeadStatus
): LeadStatus | null {
  const index = PIPELINE_ORDER.indexOf(current);
  if (index === -1 || index === PIPELINE_ORDER.length - 1) {
    return null;
  }
  return PIPELINE_ORDER[index + 1];
}

export function shouldAutoMove(score: number): boolean {
  return score >= 85;
}
