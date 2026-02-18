import { Lead } from "@/types";
import { assignLead } from "@/lib/leadAssignment";
import { employeeIds } from "@/lib/mockEmployees";

const assignedTo = assignLead(employeeIds);

export function createCampaignLead({
  name,
  mobile,
  product,
  city,
  campaignName,
  source,
  adName
}: {
  name: string;
  mobile: string;
  product: "PL" | "BL" | "HL" | "LAP";
  city: string;
  campaignName: string;
  source: "FACEBOOK" | "INSTAGRAM" | "GOOGLE_ADS";
  adName?: string;
}): Lead {
  return {
    id: crypto.randomUUID(),
    name,
    mobile,
    product,
    city,
    source,
    campaignName,
    adName,
    status: "NEW",
    assignedTo,
    createdAt: new Date().toISOString()
  };
}
