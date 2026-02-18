import { Lead } from "@/types";

export function getTodayCallbacks(leads: Lead[], employeeId: string) {
  const now = new Date();
  return leads.filter((l) => {
    if (!l.followUpAt) return false;
    if (l.assignedTo !== employeeId) return false;

    const f = new Date(l.followUpAt);
    return (
      f.toDateString() === now.toDateString() &&
      l.status !== "DISBURSED"
    );
  });
}
