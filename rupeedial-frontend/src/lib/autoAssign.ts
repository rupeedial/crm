import { AUTO_ASSIGN_RULES } from "./autoAssignRules";
import { Lead } from "@/types";

/* ================= AUTO ASSIGN ================= */

export function autoAssignLead(lead: Lead): Lead {
  // 1️⃣ Find matching rules (city + product)
  const matchedRules = AUTO_ASSIGN_RULES.filter((rule) => {
    const cityMatch =
      !rule.city ||
      rule.city.toLowerCase() === lead.city?.toLowerCase();

    const productMatch =
      !rule.product || rule.product === lead.product;

    return cityMatch && productMatch;
  });

  // 2️⃣ Pick highest priority rule
  const bestRule = matchedRules
    .sort((a, b) => b.priority - a.priority)[0];

  // 3️⃣ Assign from rule
  if (bestRule) {
    return {
      ...lead,
      assignedTo: bestRule.assignedTo,
    };
  }

  // 4️⃣ Fallback – Round Robin
  return {
    ...lead,
    assignedTo: getFallbackTelecaller(),
  };
}

/* ================= FALLBACK (ROUND ROBIN) ================= */

const TELECALLERS = ["emp-1", "emp-2", "emp-3"];
let lastIndex = 0;

function getFallbackTelecaller(): string {
  const user = TELECALLERS[lastIndex];
  lastIndex = (lastIndex + 1) % TELECALLERS.length;
  return user;
}
