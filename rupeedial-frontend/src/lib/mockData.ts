import { Lead, LeadStatus } from "@/types";

export const employeeTargets: EmployeeTarget[] = [
  {
    employeeId: "2",
    month: "2024-02",
    targetAmount: 10000000, // ₹1 Cr
    achievedAmount: 8500000, // ₹85L
    incentiveRate: 1.5,
  },
];


/* ================= LEADS ================= */

export const mockData = {
  leads: [],
  campaigns: [],
};

export const mockLeads: Lead[] = [
  {
    id: "L001",
    customerName: "Vikram Singh",
    phone: "+91 99887 76655",
    loanType: "home_loan",
    loanAmount: 5000000,
    city: "Mumbai",
    source: "facebook",
    status: "new",
    probability: "high",
    score: 92,

    nextFollowUpDate: new Date(), // 🔥 TODAY
    followUpNote: "Call again in evening",

    createdAt: new Date(),
    updatedAt: new Date(),

    statusHistory: [

      {
        status: "new",
        changedAt: new Date(),
        changedBy: "user",
        reason: "Lead created",
      },
    ],
  },
];

/* ================= PIPELINE CONFIG ================= */

export const PIPELINE_CONFIG: {
  id: LeadStatus;
  label: string;
  color: string;
}[] = [
  { id: "new", label: "New Lead", color: "bg-blue-500" },
  { id: "contacted", label: "Contacted", color: "bg-indigo-500" },
  { id: "documents_collected", label: "Docs Collected", color: "bg-purple-500" },
  { id: "logged_in", label: "Logged In", color: "bg-pink-500" },
  { id: "sanctioned", label: "Sanctioned", color: "bg-orange-500" },
  { id: "disbursed", label: "Disbursed", color: "bg-emerald-500" },
  { id: "disbursed_confirmed", label: "Confirmed", color: "bg-teal-500" },
  { id: "counted", label: "Counted", color: "bg-cyan-500" },
  { id: "payout_released", label: "Payout Done", color: "bg-green-600" },
];

/* ================= HELPERS ================= */

export const formatCurrency = (amount: number) => {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
  return `₹${amount}`;
};

export const getLoanTypeLabel = (type: string) =>
  ({
    home_loan: "Home Loan",
    personal_loan: "Personal Loan",
    business_loan: "Business Loan",
    car_loan: "Car Loan",
    lap: "LAP",
  }[type] || type);

export const getStatusLabel = (status: LeadStatus) =>
  ({
    new: "New Lead",
    contacted: "Contacted",
    documents_collected: "Docs Collected",
    logged_in: "Logged In",
    sanctioned: "Sanctioned",
    disbursed: "Disbursed",
    disbursed_confirmed: "Confirmed",
    counted: "Counted",
    payout_released: "Payout Released",
  }[status]);
