import React from "react";
import {
  Phone,
  Clock,
  Target,
  TrendingUp,
  CheckCircle,
} from "lucide-react";

export default function Productivity() {
  /* ===== DEMO DATA (Later API se replace hoga) ===== */

  const stats = {
    callsMade: 42,
    followUps: 18,
    loginsDone: 9,
    sanctioned: 4,
    workingHours: 7.5,
  };

  const conversionRate = Math.round(
    (stats.loginsDone / stats.callsMade) * 100
  );

  const efficiencyScore =
    stats.workingHours >= 8
      ? 95
      : Math.round(
          (stats.workingHours / 8) * 100
        );

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">
          Productivity Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Daily work output & performance efficiency
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          icon={Phone}
          label="Calls Made"
          value={stats.callsMade}
          color="purple"
        />
        <StatCard
          icon={Target}
          label="Logins"
          value={stats.loginsDone}
          color="emerald"
        />
        <StatCard
          icon={TrendingUp}
          label="Sanctioned"
          value={stats.sanctioned}
          color="amber"
        />
        <StatCard
          icon={Clock}
          label="Working Hours"
          value={`${stats.workingHours}h`}
          color="purple"
        />
      </div>

      {/* PERFORMANCE SUMMARY */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Conversion */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">
            Conversion Efficiency
          </h3>

          <ProgressBar
            label="Call → Login"
            value={conversionRate}
          />

          <div className="mt-4 text-sm text-gray-500">
            {stats.loginsDone} logins from{" "}
            {stats.callsMade} calls
          </div>
        </div>

        {/* Efficiency Score */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">
            Productivity Score
          </h3>

          <div className="flex items-center gap-4">
            <div className="text-4xl font-semibold text-emerald-600">
              {efficiencyScore}%
            </div>

            <div className="text-sm text-gray-500">
              Based on working hours &
              activity consistency
            </div>
          </div>

          <div className="mt-4">
            <ProgressBar
              label="Daily Target (8h)"
              value={Math.round(
                (stats.workingHours / 8) *
                  100
              )}
            />
          </div>
        </div>
      </div>

      {/* ACTIVITY SUMMARY */}
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-6">
          Activity Breakdown
        </h3>

        <div className="grid sm:grid-cols-3 gap-6">
          <ActivityCard
            label="Follow-ups Done"
            value={stats.followUps}
          />
          <ActivityCard
            label="Successful Logins"
            value={stats.loginsDone}
          />
          <ActivityCard
            label="Cases Sanctioned"
            value={stats.sanctioned}
          />
        </div>
      </div>
    </div>
  );
}

/* ================= STAT CARD ================= */

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: any;
  label: string;
  value: string | number;
  color: "purple" | "emerald" | "amber";
}) {
  const colorMap = {
    purple:
      "bg-purple-100 text-purple-600",
    emerald:
      "bg-emerald-100 text-emerald-600",
    amber:
      "bg-amber-100 text-amber-600",
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6 flex items-center gap-4">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorMap[color]}`}
      >
        <Icon size={20} />
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

function ProgressBar({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-600">
          {label}
        </span>
        <span className="font-medium">
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

/* ================= ACTIVITY CARD ================= */

function ActivityCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 border text-center">
      <p className="text-xs text-gray-500">
        {label}
      </p>
      <p className="text-lg font-semibold text-gray-900 mt-1">
        {value}
      </p>
    </div>
  );
}
