/* ================= USER ================= */

export type UserRole =
  | "admin"
  | "employee"
  | "partner"
  | "bank_user";

/* ================= LEAD ENUMS ================= */

export type LeadStatus =
  | "NEW"
  | "CALLED"
  | "CONTACTED"
  | "VERIFIED"
  | "NON_VERIFIED"
  | "SUBMITTED"
  | "LOGGED_IN"
  | "SANCTIONED"
  | "APPROVED"
  | "REJECTED"
  | "DISBURSED"
  | "DISBURSED_CONFIRMED"
  | "PAYOUT_RELEASED";

export type LeadProbability = "HIGH" | "MEDIUM" | "LOW";

export type LoanType =
  | "personal_loan"
  | "home_loan"
  | "business_loan"
  | "car_loan"
  | "education_loan"
  | "gold_loan"
  | "lap";

/* 🔥 FIXED (NO SYNTAX ERROR) */
export type LeadSource =
  | "FACEBOOK"
  | "GOOGLE"
  | "INSTAGRAM"
  | "REFERRAL"
  | "WALK_IN"
  | "TELECALLING"
  | "WEBSITE"
  | "PARTNER"
  | "MANUAL";

/* ================= TRAYS ================= */

export enum LeadTray {
  SALES_TRAY = "sales_tray",
  COORDINATOR_TRAY = "coordinator_tray",
  BANK_TRAY = "bank_tray",
}

/* ================= MODELS ================= */

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  city?: string;
  createdAt: string; // ISO
}

/* ================= LEAD ================= */

export interface Lead {
  id: string;
  customerName: string;
  phone: string;
  email?: string;

  loanType: LoanType;
  loanAmount: number;

  city: string;
  income?: number;
  cibilScore?: number;

  source: LeadSource;
  campaignName?: string;
  adId?: string;

  status: LeadStatus;
  probability: LeadProbability;
  score: number;

  /* 🔥 AUTO ASSIGN */
  product: "PL" | "BL" | "HL" | "LAP";
  assignedTo?: string; // employeeId

  /* 🔍 VERIFICATION */
  verificationStatus?: "VERIFIED" | "NON_VERIFIED";
  verificationReason?: string;

  /* 📞 FOLLOW UP */
  nextFollowUpDate?: string; // ISO
  followUpNote?: string;
  followUpAt?: string;
  lastCalledAt?: string;
  slaMinutes?: number;

  createdAt: string; // ISO
  updatedAt: string; // ISO
}

/* ================= HISTORY ================= */

export interface LeadStatusHistory {
  status: LeadStatus;
  changedAt: string;
  changedBy: "AI" | "USER";
  reason?: string;
}

export interface LeadHistory {
  from: LeadStatus;
  to: LeadStatus;
  at: string;
  by: "AI" | "USER";
  reason?: string;
}

/* ================= TARGET ================= */

export interface EmployeeTarget {
  employeeId: string;
  month: string; // "2024-02"
  targetAmount: number;
  achievedAmount: number;
  incentiveRate: number; // %
}

/* ================= CALL LOG ================= */

export type CallType = "MANUAL" | "AUTO" | "AI";

export interface CallLog {
  id: string;
  leadId: string;
  userId: string;
  type: CallType;
  startedAt: string;
  endedAt?: string;
  duration?: number;
  recordingUrl?: string;
  outcome?: "CONNECTED" | "NO_ANSWER" | "BUSY" | "FAILED";
  notes?: string;
}
