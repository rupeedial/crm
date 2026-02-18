export interface Lead {
  id: string;
  customerName: string;
  phone: string;
  loanAmount?: number;

  status: "LEAD" | "LOGIN" | "NON_VERIFIED" | "DISBURSED";

  assignedTo?: string;

  // ✅ NEW
  campaignId: string;
  campaignName: string;

    isDuplicate?: boolean;
  duplicateOf?: string; // existing lead id
  duplicateCount?: number;

  createdAt?: string;
  followUpAt?: string;
  slaMinutes?: number;
}
