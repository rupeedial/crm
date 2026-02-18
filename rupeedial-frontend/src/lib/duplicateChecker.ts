import { findLeadByPhone, updateLead } from "./leadStore";
import { Lead } from "@/types";

export function handleDuplicateLead(newLead: Lead) {
  const existing = findLeadByPhone(newLead.phone);

  if (!existing) {
    return {
      isDuplicate: false,
      leadToSave: newLead,
    };
  }

  // 🔁 Update existing lead
  updateLead(existing.id, {
    duplicateCount: (existing.duplicateCount || 0) + 1,
    updatedAt: new Date().toISOString(),
  });

  return {
    isDuplicate: true,
    leadToSave: {
      ...newLead,
      isDuplicate: true,
      duplicateOf: existing.id,
    },
    existingLead: existing,
  };
}
