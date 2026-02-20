import { StatCard } from "@/components/dashboard/StatCard";
import { PartnerLeaderboard } from "@/components/dashboard/PartnerLeaderboard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, getLoanTypeLabel } from "@/lib/mockData";

import {
  FileText,
  CheckCircle,
  IndianRupee,
  Trophy,
  Clock,
  ArrowRight,
  TrendingUp,
  Plus,
} from "lucide-react";

const recentDisbursements = [
  {
    id: 1,
    customer: "Vikram Singh",
    amount: 5000000,
    loanType: "home_loan",
    date: "20 Feb 2024",
    commission: 75000,
  },
  {
    id: 2,
    customer: "Rahul Gupta",
    amount: 2000000,
    loanType: "business_loan",
    date: "18 Feb 2024",
    commission: 30000,
  },
  {
    id: 3,
    customer: "Anita Desai",
    amount: 800000,
    loanType: "car_loan",
    date: "15 Feb 2024",
    commission: 12000,
  },
];

const pendingPayouts = [
  { id: 1, amount: 75000, status: "processing", expectedDate: "25 Feb 2024" },
  { id: 2, amount: 30000, status: "approved", expectedDate: "22 Feb 2024" },
];

export default function PartnerDashboard() {
  const totalPending = pendingPayouts.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Welcome back, Amit 👋
          </h1>
          <p className="text-slate-500 mt-1">
            Here’s what’s happening with your business today.
          </p>
        </div>

        <div className="flex gap-3">
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Lead
          </Button>
          <Button variant="outline">
            View Reports
          </Button>
        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Active Leads"
          value={18}
          change="↑ 3 this week"
          changeType="positive"
          icon={<FileText className="w-6 h-6 text-green-600" />}
        />

        <StatCard
          title="Disbursed Cases"
          value={12}
          change="This month"
          changeType="positive"
          icon={<CheckCircle className="w-6 h-6 text-green-600" />}
        />

        <StatCard
          title="Total Commission"
          value={formatCurrency(675000)}
          change="+18% growth"
          changeType="positive"
          icon={<IndianRupee className="w-6 h-6 text-green-600" />}
        />

        <StatCard
          title="Current Rank"
          value="#1"
          change="Top Performer"
          changeType="positive"
          icon={<Trophy className="w-6 h-6 text-green-600" />}
        />
      </div>

      {/* ================= PERFORMANCE PROGRESS ================= */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg text-slate-800">
            Monthly Target Progress
          </h3>
          <Badge variant="success">
            <TrendingUp className="w-4 h-4 mr-1" />
            75% Achieved
          </Badge>
        </div>

        <div className="w-full bg-slate-200 rounded-full h-3">
          <div className="bg-green-600 h-3 rounded-full w-[75%]" />
        </div>

        <div className="flex justify-between mt-3 text-sm text-slate-500">
          <span>₹9,00,000 Target</span>
          <span>₹6,75,000 Achieved</span>
        </div>
      </Card>

      {/* ================= DISBURSEMENT + PAYOUT ================= */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Disbursements */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-slate-800">
              Recent Disbursements
            </h3>
            <Button variant="ghost" size="sm">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="space-y-4">
            {recentDisbursements.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition"
              >
                <div>
                  <p className="font-medium text-slate-800">
                    {item.customer}
                  </p>
                  <p className="text-sm text-slate-500">
                    {getLoanTypeLabel(item.loanType)} • {item.date}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-slate-800">
                    {formatCurrency(item.amount)}
                  </p>
                  <p className="text-sm text-green-600 font-medium">
                    +{formatCurrency(item.commission)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Pending Payouts */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-slate-800">
              Pending Payouts
            </h3>
            <Badge variant="warning">
              {pendingPayouts.length} Pending
            </Badge>
          </div>

          <div className="space-y-4">
            {pendingPayouts.map((payout) => (
              <div
                key={payout.id}
                className="flex justify-between items-center p-4 rounded-xl bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      payout.status === "approved"
                        ? "bg-green-100"
                        : "bg-yellow-100"
                    }`}
                  >
                    {payout.status === "approved" ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Clock className="w-5 h-5 text-yellow-600" />
                    )}
                  </div>

                  <div>
                    <p className="font-bold text-slate-800">
                      {formatCurrency(payout.amount)}
                    </p>
                    <p className="text-sm text-slate-500">
                      Expected: {payout.expectedDate}
                    </p>
                  </div>
                </div>

                <Badge
                  variant={
                    payout.status === "approved"
                      ? "success"
                      : "warning"
                  }
                >
                  {payout.status}
                </Badge>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-6 p-4 rounded-xl bg-green-50 border border-green-200">
            <div className="flex justify-between items-center">
              <span className="font-medium text-green-700">
                Total Pending
              </span>
              <span className="text-xl font-bold text-green-700">
                {formatCurrency(totalPending)}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* ================= LEADERBOARD ================= */}
      <PartnerLeaderboard />
    </div>
  );
}