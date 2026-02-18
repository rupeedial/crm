import { useState } from "react";
import {
  ArrowLeft,
  BarChart3,
  TrendingUp,
  Users,
  Send,
  MousePointerClick,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AnalyticsPage() {

  const navigate = useNavigate();

  const [dateRange, setDateRange] = useState("Last 7 Days");

  /* ================= MOCK DATA ================= */

  const analytics = {
    totalCampaigns: 12,
    totalSent: 18500,
    totalDelivered: 16800,
    totalClicks: 4200,
    totalLeads: 1250,
  };

  const conversionRate = (
    (analytics.totalLeads / analytics.totalClicks) *
    100
  ).toFixed(1);

  const channelData = [
    { channel: "WhatsApp", leads: 420 },
    { channel: "SMS", leads: 210 },
    { channel: "Instagram", leads: 300 },
    { channel: "Google Ads", leads: 180 },
    { channel: "IVR", leads: 90 },
    { channel: "Missed Call", leads: 50 },
  ];

  return (
    <div className="p-6 space-y-8">

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <BarChart3 className="text-emerald-600" />
          <h1 className="text-2xl font-semibold">Campaign Analytics</h1>
        </div>

        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>This Month</option>
          <option>Custom Range</option>
        </select>
      </div>

      {/* ================= SUMMARY CARDS ================= */}
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">

        <StatCard
          title="Total Campaigns"
          value={analytics.totalCampaigns}
          icon={<TrendingUp className="w-5 h-5" />}
        />

        <StatCard
          title="Total Sent"
          value={analytics.totalSent}
          icon={<Send className="w-5 h-5" />}
        />

        <StatCard
          title="Delivered"
          value={analytics.totalDelivered}
          icon={<Users className="w-5 h-5" />}
        />

        <StatCard
          title="Clicks"
          value={analytics.totalClicks}
          icon={<MousePointerClick className="w-5 h-5" />}
        />

        <StatCard
          title="Leads"
          value={analytics.totalLeads}
          icon={<Users className="w-5 h-5" />}
        />
      </div>

      {/* ================= PERFORMANCE SECTION ================= */}
      <div className="grid lg:grid-cols-2 gap-8">

        {/* Channel Performance */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-6">
            Channel Performance (Leads)
          </h2>

          <div className="space-y-4">
            {channelData.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.channel}</span>
                  <span>{item.leads}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-emerald-500"
                    style={{
                      width: `${(item.leads / analytics.totalLeads) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm flex flex-col justify-center items-center text-center">

          <h2 className="text-lg font-semibold mb-4">
            Conversion Rate
          </h2>

          <div className="text-5xl font-bold text-emerald-600">
            {conversionRate}%
          </div>

          <p className="text-sm text-gray-500 mt-2">
            Leads / Clicks
          </p>
        </div>

      </div>

      {/* ================= CAMPAIGN TABLE ================= */}
      <div className="bg-white border rounded-2xl p-6 shadow-sm">

        <h2 className="text-lg font-semibold mb-6">
          Campaign Performance Breakdown
        </h2>

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-3 text-left">Campaign</th>
              <th className="p-3 text-left">Channel</th>
              <th className="p-3 text-left">Sent</th>
              <th className="p-3 text-left">Clicks</th>
              <th className="p-3 text-left">Leads</th>
              <th className="p-3 text-left">Conversion</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              <td className="p-3">Mumbai Loan Blast</td>
              <td className="p-3">WhatsApp</td>
              <td className="p-3">5000</td>
              <td className="p-3">1200</td>
              <td className="p-3">320</td>
              <td className="p-3 text-emerald-600 font-medium">
                26.6%
              </td>
            </tr>

            <tr className="border-t">
              <td className="p-3">Delhi SMS Drive</td>
              <td className="p-3">SMS</td>
              <td className="p-3">3000</td>
              <td className="p-3">600</td>
              <td className="p-3">140</td>
              <td className="p-3 text-emerald-600 font-medium">
                23.3%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ================= STAT CARD COMPONENT ================= */

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-semibold mt-1">{value}</p>
      </div>

      <div className="bg-emerald-100 text-emerald-600 p-3 rounded-xl">
        {icon}
      </div>
    </div>
  );
}
