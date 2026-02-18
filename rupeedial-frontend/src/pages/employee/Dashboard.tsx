import { useMemo } from "react";
import { Link } from "react-router-dom";

import CampaignPerformanceTable from "@/components/dashboard/CampaignPerformanceTable";
import { StatCard } from "@/components/dashboard/StatCard";
import { LeadsTable } from "@/components/dashboard/LeadsTable";
import { CommissionSimulator } from "@/components/dashboard/CommissionSimulator";
import { EmployeeTargetCard } from "@/components/dashboard/EmployeeTargetCard";
import { AIInsightsCard } from "@/components/dashboard/AIInsightsCard";
import { PerformanceSnapshot } from "@/components/dashboard/PerformanceSnapshot";
import SLAHeatmap from "@/components/dashboard/SLAHeatmap";
import DailyCallStats from "@/components/dashboard/DailyCallStats";

import NewLeadsTodayWidget from "./dashboard-widgets/NewLeadsTodayWidget";
import TelecallerQueueWidget from "./dashboard-widgets/TelecallerQueueWidget";
import TodayCallbacksWidget from "./dashboard-widgets/TodayCallbacksWidget";
import OverdueLeadsWidget from "./dashboard-widgets/OverdueLeadsWidget";

import {
  FileText,
  TrendingUp,
  IndianRupee,
  Target,
  CheckCircle,
  Phone,
  Megaphone,
  Users,
} from "lucide-react";

import {
  formatCurrency,
  employeeTargets,
  mockLeads,
} from "@/lib/mockData";

import { getCampaignSummary } from "@/lib/campaignSummary";
import { getTodayCallStats } from "@/lib/callAnalytics";
import { useAuth } from "@/context/AuthContext";
import { useCallMonitor } from "@/context/CallMonitorContext";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function EmployeeDashboard() {
  const { user, loading } = useAuth();
  const { callLogs } = useCallMonitor();

  if (loading) return <div className="p-6">Loading dashboard...</div>;
  if (!user) return <div className="p-6">User not found</div>;

  const leads = useMemo(() => {
    return mockLeads.filter((l) => l.assignedTo === user.id);
  }, [user.id]);

  const campaignStats = getCampaignSummary();
  const callStats = getTodayCallStats(callLogs || [], user.id);

  const target = useMemo(() => {
    return (
      employeeTargets.find((t) => t.employeeId === user.id) || null
    );
  }, [user.id]);

  const achievedPercent =
    target
      ? Math.round(
          (target.achievedAmount / target.targetAmount) * 100
        )
      : 0;

  return (
    <div className="min-h-screen bg-[#f6fdf9] p-8 space-y-10">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#0f172a]">
            Good Morning, {user.name} 👋
          </h1>
          <p className="text-gray-500">
            Here’s your activity overview
          </p>
        </div>

        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* TELECALLER WIDGETS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <NewLeadsTodayWidget />
        <TelecallerQueueWidget />
        <TodayCallbacksWidget />
        <OverdueLeadsWidget />
      </div>

      {/* KPI STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="My Active Leads"
          value={leads.length}
          icon={<FileText className="text-[#16a34a]" />}
        />

        <StatCard
          title="Calls Today"
          value={callStats.totalCalls}
          icon={<Phone className="text-[#15803d]" />}
        />

        <StatCard
          title="Connected"
          value={callStats.connected}
          icon={<CheckCircle className="text-[#22c55e]" />}
        />

        <StatCard
          title="My Commission"
          value={formatCurrency(target?.achievedAmount || 0)}
          icon={<IndianRupee className="text-[#7c3aed]" />}
        />
      </div>

      {/* TARGET + CALL STATS */}
      <div className="grid lg:grid-cols-3 gap-8">

        <Card className="p-8 rounded-2xl shadow-md border bg-white lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <Target className="text-[#16a34a]" />
              <div>
                <h3 className="font-semibold text-gray-800">
                  Monthly Target
                </h3>
                <p className="text-sm text-gray-500">
                  Current Month
                </p>
              </div>
            </div>

            {target && (
              <div className="text-right">
                <p className="font-bold text-gray-800">
                  {formatCurrency(target.achievedAmount)} /{" "}
                  {formatCurrency(target.targetAmount)}
                </p>
                <p className="text-sm text-[#16a34a]">
                  {achievedPercent}% achieved
                </p>
              </div>
            )}
          </div>

          <Progress
            value={achievedPercent}
            className="bg-gray-200 [&>div]:bg-gradient-to-r [&>div]:from-[#16a34a] [&>div]:to-[#7c3aed]"
          />

          <div className="mt-6">
            <SLAHeatmap leads={leads} />
          </div>
        </Card>

        <Card className="p-6 rounded-2xl shadow-md border bg-white">
          <DailyCallStats stats={callStats} />
        </Card>
      </div>

      {/* AI INSIGHTS */}
      <Card className="p-6 rounded-2xl shadow-md border bg-white">
        <AIInsightsCard />
      </Card>

      {/* CAMPAIGN SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Campaigns"
          value={campaignStats.totalCampaigns}
          icon={<Megaphone className="text-[#16a34a]" />}
        />

        <StatCard
          title="Active Campaigns"
          value={campaignStats.activeCampaigns}
          icon={<Megaphone className="text-[#15803d]" />}
        />

        <StatCard
          title="Campaign Leads"
          value={campaignStats.totalLeads}
          icon={<Users className="text-[#22c55e]" />}
        />

        <StatCard
          title="Est. Disbursal"
          value={`₹${(
            campaignStats.totalDisbursed / 100000
          ).toFixed(1)}L`}
          icon={<IndianRupee className="text-[#7c3aed]" />}
        />
      </div>

      {/* MAIN SECTION */}
      <div className="grid lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 space-y-8">
          <Card className="p-6 rounded-2xl shadow-md border bg-white">
            <CampaignPerformanceTable leads={leads} />
          </Card>

          <Card className="p-6 rounded-2xl shadow-md border bg-white">
            <LeadsTable leads={leads} />
          </Card>
        </div>

        <div className="space-y-8">

          <Card className="p-6 rounded-2xl shadow-md border bg-white">
            <CommissionSimulator />
          </Card>

          <Card className="p-6 rounded-2xl shadow-md border bg-white">
            <PerformanceSnapshot />
          </Card>

          <Card className="p-6 rounded-2xl shadow-md border bg-white">
            <h3 className="font-semibold text-gray-800 mb-4">
              Quick Actions
            </h3>

            <div className="space-y-3">
              <Button
                asChild
                className="w-full justify-start bg-[#16a34a] hover:bg-[#15803d]"
              >
                <Link to="/dashboard/employee/upload-lead">
                  <FileText className="w-4 h-4 mr-2" />
                  Add New Lead
                </Link>
              </Button>

              <Button
                asChild
                className="w-full justify-start bg-[#7c3aed] hover:bg-[#6d28d9]"
              >
                <Link to="/dashboard/employee/telecaller">
                  <Phone className="w-4 h-4 mr-2" />
                  Start Calling
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full justify-start border-[#16a34a] text-[#16a34a]"
              >
                <Link to="/dashboard/employee/performance">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Performance
                </Link>
              </Button>
            </div>
          </Card>

        </div>
      </div>

    </div>
  );
}
