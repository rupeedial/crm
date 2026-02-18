import { Lead } from "@/types";

/* ===============================
   GET DUE TIME (FOLLOWUP + SLA)
================================ */

export function getDueTime(lead: Lead): number | null {
  if (!lead.followUpAt) return null;

  const follow = new Date(lead.followUpAt).getTime();
  const sla = (lead.slaMinutes || 0) * 60 * 1000;

  return follow + sla;
}

/* ===============================
   IS OVERDUE
================================ */

export function isOverdue(lead: Lead): boolean {
  const due = getDueTime(lead);
  if (!due) return false;

  return Date.now() > due;
}

/* ===============================
   MINUTES LATE
================================ */

export function minutesLate(lead: Lead): number {
  const due = getDueTime(lead);
  if (!due) return 0;

  const diff = Date.now() - due;
  return diff > 0 ? Math.floor(diff / 60000) : 0;
}

/* ===============================
   MINUTES REMAINING
================================ */

export function minutesRemaining(lead: Lead): number {
  const due = getDueTime(lead);
  if (!due) return 0;

  const diff = due - Date.now();
  return diff > 0 ? Math.floor(diff / 60000) : 0;
}

/* ===============================
   SLA STATUS
================================ */

export function getSLAStatus(
  lead: Lead
): "NO_FOLLOWUP" | "ON_TIME" | "DUE_SOON" | "OVERDUE" {
  if (!lead.followUpAt) return "NO_FOLLOWUP";

  if (isOverdue(lead)) return "OVERDUE";

  const remaining = minutesRemaining(lead);

  if (remaining <= 15) return "DUE_SOON";

  return "ON_TIME";
}

/* ===============================
   SLA COLOR CLASS (UI USE)
================================ */

export function getSLAColor(lead: Lead): string {
  const status = getSLAStatus(lead);

  switch (status) {
    case "OVERDUE":
      return "bg-red-100 text-red-700";
    case "DUE_SOON":
      return "bg-amber-100 text-amber-700";
    case "ON_TIME":
      return "bg-green-100 text-green-700";
    default:
      return "bg-slate-100 text-slate-600";
  }
}

/* ===============================
   HUMAN READABLE TIME
================================ */

export function getHumanSLAText(lead: Lead): string {
  const status = getSLAStatus(lead);

  if (status === "NO_FOLLOWUP") return "No Follow-up";

  if (status === "OVERDUE")
    return `Overdue ${minutesLate(lead)} min`;

  if (status === "DUE_SOON")
    return `Due in ${minutesRemaining(lead)} min`;

  return "On Time";
}
