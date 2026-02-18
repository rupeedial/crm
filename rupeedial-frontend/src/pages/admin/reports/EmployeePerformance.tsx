import { Lead } from "@/types";

export function getEmployeeStats(leads: Lead[]) {
  const map: Record<string, any> = {};

  leads.forEach((l) => {
    if (!l.assignedTo) return;

    if (!map[l.assignedTo]) {
      map[l.assignedTo] = {
        total: 0,
        verified: 0,
        disbursed: 0,
        overdue: 0,
      };
    }

    map[l.assignedTo].total++;

    if (l.status === "VERIFIED" || l.status === "DOCS_COLLECTED")
      map[l.assignedTo].verified++;

    if (l.status === "DISBURSED")
      map[l.assignedTo].disbursed++;

    if (l.followUpAt && l.slaMinutes) {
      const due =
        new Date(l.followUpAt).getTime() +
        l.slaMinutes * 60 * 1000;
      if (Date.now() > due) map[l.assignedTo].overdue++;
    }
  });

  return map;
}
