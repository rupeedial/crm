import { Lead } from "@/types";

export const filterLeadsByRole = (
  leads: Lead[],
  role: "admin" | "employee" | "partner",
  userId: string
) => {
  if (role === "admin") return leads;

  if (role === "employee") {
    return leads.filter(l => l.assignedEmployeeId === userId);
  }

  if (role === "partner") {
    return leads.filter(l => l.assignedPartnerId === userId);
  }

  return [];
};
