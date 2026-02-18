export function aiVerifyLead(lead: any) {
  if (lead.income < 15000) return false;
  return true;
}