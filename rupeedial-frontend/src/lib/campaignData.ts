export interface Campaign {
  id: number;
  name: string;
  status: "Active" | "Paused" | "Draft";
  channel: "WhatsApp" | "SMS" | "Email";
  leads: number;
  conversions: number;
  disbursedAmount: number;
}

export const campaigns: Campaign[] = [
  {
    id: 1,
    name: "Personal Loan WhatsApp",
    status: "Active",
    channel: "WhatsApp",
    leads: 420,
    conversions: 78,
    disbursedAmount: 1850000,
  },
  {
    id: 2,
    name: "Business Loan SMS",
    status: "Paused",
    channel: "SMS",
    leads: 310,
    conversions: 42,
    disbursedAmount: 920000,
  },
  {
    id: 3,
    name: "Home Loan Email",
    status: "Draft",
    channel: "Email",
    leads: 0,
    conversions: 0,
    disbursedAmount: 0,
  },
];
