import { Lead, LeadStatus } from "@/types";

const STORAGE_KEY = "rupeedial_leads";

/* ================= GET ALL ================= */

export function getAllLeads(): Lead[] {
  return JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "[]"
  );
}

/* ================= SAVE ALL ================= */

export function saveAllLeads(leads: Lead[]) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(leads)
  );
}

/* ================= SAVE SINGLE ================= */

export function saveLead(newLead: Lead) {
  const leads = getAllLeads();
  leads.push(newLead);
  saveAllLeads(leads);
}

/* ================= UPDATE STATUS ================= */

export function updateLeadStatus(
  leadId: string,
  newStatus: LeadStatus
) {
  const leads = getAllLeads();

  const updated = leads.map((lead) =>
    lead.id === leadId
      ? { ...lead, status: newStatus }
      : lead
  );

  saveAllLeads(updated);
}
