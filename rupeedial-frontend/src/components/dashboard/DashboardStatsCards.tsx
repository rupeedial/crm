import { StatCard } from "./StatCard";
import {
  Users,
  PhoneCall,
  CheckCircle,
  LogIn,
  IndianRupee,
  Megaphone,
} from "lucide-react";
import { Lead } from "@/types";

interface Props {
  leads?: Lead[];
}

export function DashboardStatsCards({ leads = [] }: Props) {
  /* ================= SAFE COUNTS ================= */
  const today = new Date().toDateString();

  const activeCampaigns = new Set(
    leads.map((l) => l.campaignName).filter(Boolean)
  ).size;

  const todayLeads = leads.filter(
    (l) => new Date(l.createdAt).toDateString() === today
  ).length;

  const todayFollowUps = leads.filter(
    (l) =>
      l.followUpAt &&
      new Date(l.followUpAt).toDateString() === today
  ).length;

  const todayApproved = leads.filter(
    (l) =>
      l.status === "APPROVED" &&
      l.updatedAt &&
      new Date(l.updatedAt).toDateString() === today
  ).length;

  const todayLogin = leads.filter(
    (l) =>
      l.status === "LOGIN" &&
      l.updatedAt &&
      new Date(l.updatedAt).toDateString() === today
  ).length;

  const todayDisbursed = leads.filter(
    (l) =>
      l.status === "DISBURSED" &&
      l.updatedAt &&
      new Date(l.updatedAt).toDateString() === today
  ).length;

  /* ================= UI ================= */
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
      <StatCard
        title="Active Campaigns"
        value={activeCampaigns}
        icon={<Megaphone />}
      />

      <StatCard
        title="Today Leads"
        value={todayLeads}
        icon={<Users />}
      />

      <StatCard
        title="Today Follow-ups"
        value={todayFollowUps}
        icon={<PhoneCall />}
      />

      <StatCard
        title="Today Approved"
        value={todayApproved}
        icon={<CheckCircle />}
      />

      <StatCard
        title="Today Login"
        value={todayLogin}
        icon={<LogIn />}
      />

      <StatCard
        title="Today Disbursed"
        value={todayDisbursed}
        icon={<IndianRupee />}
      />
    </div>
  );
}
