import React from "react";
import { Lead } from "@/types";
import {
  TrendingUp,
  Target,
  IndianRupee,
  Activity,
  Sparkles,
} from "lucide-react";

interface Props {
  leads?: Lead[];
}

const Performance: React.FC<Props> = ({ leads = [] }) => {
  const totalLeads = leads.length;
  const logins = leads.filter(l => l.status === "LOGIN").length;
  const sanctioned = leads.filter(l => l.status === "SANCTIONED").length;
  const disbursed = leads.filter(l => l.status === "DISBURSED");

  const disbursedAmount = disbursed.reduce(
    (sum, l) => sum + (l.loanAmount || 0),
    0
  );

  const aiQualified = leads.filter(
    l => (l.score || 0) >= 85
  ).length;

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">
          Performance Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Track your productivity, conversions & revenue
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          icon={Activity}
          label="Total Leads"
          value={totalLeads}
          color="purple"
        />
        <StatCard
          icon={Target}
          label="Logins"
          value={logins}
          color="emerald"
        />
        <StatCard
          icon={TrendingUp}
          label="Sanctioned"
          value={sanctioned}
          color="amber"
        />
        <StatCard
          icon={IndianRupee}
          label="Disbursed Amount"
          value={`₹ ${disbursedAmount.toLocaleString("en-IN")}`}
          color="purple"
        />
      </div>

      {/* CONVERSION FUNNEL */}
      <div className="bg-white rounded-2xl shadow-sm border p-8">
        <h3 className="text-lg font-semibold mb-6">
          Conversion Funnel
        </h3>

        <ProgressRow
          label="Lead → Login"
          value={percent(logins, totalLeads)}
        />

        <ProgressRow
          label="Login → Sanction"
          value={percent(sanctioned, logins)}
        />

        <ProgressRow
          label="Sanction → Disburse"
          value={percent(disbursed.length, sanctioned)}
        />
      </div>

      {/* AI INSIGHT */}
      <div className="bg-emerald-600 text-white rounded-2xl p-8 flex items-center gap-6 shadow-sm">
        <div className="bg-white/20 p-3 rounded-xl">
          <Sparkles size={28} />
        </div>

        <div>
          <p className="text-sm uppercase font-semibold opacity-90">
            AI Productivity Insight
          </p>
          <p className="text-xl font-semibold mt-1">
            {aiQualified} high-quality leads identified
          </p>
          <p className="text-xs opacity-80 mt-1">
            Leads with score ≥ 85 auto-prioritized for faster conversion
          </p>
        </div>
      </div>
    </div>
  );
};

export default Performance;

/* ================= KPI CARD ================= */

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: any;
  label: string;
  value: number | string;
  color: "purple" | "emerald" | "amber";
}) {
  const colorMap = {
    purple: "bg-purple-100 text-purple-600",
    emerald: "bg-emerald-100 text-emerald-600",
    amber: "bg-amber-100 text-amber-600",
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6 flex items-center gap-4">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorMap[color]}`}
      >
        <Icon size={22} />
      </div>

      <div>
        <p className="text-xs text-gray-500 uppercase font-medium">
          {label}
        </p>
        <p className="text-xl font-semibold text-gray-900">
          {value}
        </p>
      </div>
    </div>
  );
}

/* ================= PROGRESS BAR ================= */

function ProgressRow({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm font-medium mb-2">
        <span className="text-gray-600">
          {label}
        </span>
        <span className="text-gray-900">
          {value}%
        </span>
      </div>

      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-purple-600 rounded-full transition-all"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

/* ================= HELPER ================= */

function percent(a: number, b: number) {
  if (!b) return 0;
  return Math.round((a / b) * 100);
}
