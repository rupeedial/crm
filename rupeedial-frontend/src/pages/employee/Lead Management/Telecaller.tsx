import React, { useState, useMemo } from "react";
import {
  Sparkles,
  ArrowRight,
  XCircle,
  Phone,
  Filter,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getSLAStatus } from "@/utils/sla";
import { updateLeadStatus } from "@/lib/leadStore";
import { Lead, LeadStatus } from "@/types";

/* ================= CONSTANTS ================= */

const NON_VERIFY_REASONS = [
  "Wrong Number",
  "Not Interested",
  "Not Eligible",
  "Fake Lead",
  "Call Not Connected",
];

const Telecaller = ({ leads = [] }: { leads?: Lead[] }) => {
  const { user, loading } = useAuth();

  const [selectedCampaign, setSelectedCampaign] =
    useState("ALL");

  const [nonVerifyMap, setNonVerifyMap] =
    useState<Record<string, string>>({});

  const [refresh, setRefresh] =
    useState(false);

  if (loading)
    return <div className="p-8">Loading...</div>;

  if (!user)
    return (
      <div className="p-8 text-red-500">
        User not found
      </div>
    );

  /* ================= FILTERED LEADS ================= */

  const freshLeads = useMemo(() => {
    return leads.filter((l) => {
      if (l.status !== "NEW") return false;
      if (l.assignedTo !== user.id)
        return false;
      if (selectedCampaign === "ALL")
        return true;
      return (
        l.campaignName === selectedCampaign
      );
    });
  }, [
    leads,
    user.id,
    selectedCampaign,
    refresh,
  ]);

  /* ================= VERIFIED ================= */

  const handleVerified = (
    leadId: string
  ) => {
    updateLeadStatus(
      leadId,
      "LOGGED_IN" as LeadStatus
    );
    setRefresh(!refresh);
  };

  /* ================= NON VERIFIED ================= */

  const handleNonVerified = (
    leadId: string
  ) => {
    const reason =
      nonVerifyMap[leadId];
    if (!reason) return;

    updateLeadStatus(
      leadId,
      "NON_VERIFIED"
    );

    setNonVerifyMap((prev) => ({
      ...prev,
      [leadId]: "",
    }));

    setRefresh(!refresh);
  };

  /* ================= UI ================= */

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Telecaller Desk
          </h1>
          <p className="text-sm text-gray-500">
            Call & verify assigned leads
          </p>
        </div>

        <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border text-center">
          <p className="text-xs text-gray-500">
            Fresh Leads
          </p>
          <p className="text-xl font-semibold text-purple-600">
            {freshLeads.length}
          </p>
        </div>
      </div>

      {/* FILTER */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border flex items-center gap-4">
        <Filter
          size={16}
          className="text-gray-400"
        />
        <select
          value={selectedCampaign}
          onChange={(e) =>
            setSelectedCampaign(
              e.target.value
            )
          }
          className="border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
        >
          <option value="ALL">
            All Campaigns
          </option>
          {[...new Set(
            leads.map(
              (l) =>
                l.campaignName
            )
          )].map(
            (campaign) =>
              campaign && (
                <option
                  key={campaign}
                  value={campaign}
                >
                  {campaign}
                </option>
              )
          )}
        </select>
      </div>

      {/* LEADS GRID */}
      {freshLeads.length === 0 ? (
        <div className="bg-white border border-dashed rounded-2xl py-20 text-center text-gray-400">
          No fresh leads available
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {freshLeads.map((lead) => {
            const slaStatus =
              getSLAStatus(lead);

            return (
              <div
                key={lead.id}
                className="bg-white rounded-2xl border shadow-sm p-6 space-y-5 hover:shadow-md transition"
              >
                {/* TOP */}
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {lead.customerName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      📞 {lead.phone}
                    </p>
                  </div>

                  {lead.score &&
                    lead.score >= 85 && (
                      <div className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium flex items-center gap-1">
                        <Sparkles size={14} />
                        HOT
                      </div>
                    )}
                </div>

                {/* SLA */}
                {slaStatus ===
                  "OVERDUE" && (
                  <div className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full inline-block font-medium">
                    ⚠ SLA Overdue
                  </div>
                )}

                {/* CALL BUTTON */}
                <button className="w-full bg-purple-600 text-white py-2 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-purple-700 transition">
                  <Phone size={16} />
                  Call Customer
                </button>

                {/* VERIFIED */}
                <button
                  onClick={() =>
                    handleVerified(
                      lead.id
                    )
                  }
                  className="w-full bg-emerald-600 text-white py-2 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-emerald-700 transition"
                >
                  <ArrowRight size={14} />
                  Verified → Login Desk
                </button>

                {/* NON VERIFIED SELECT */}
                <select
                  value={
                    nonVerifyMap[
                      lead.id
                    ] || ""
                  }
                  onChange={(e) =>
                    setNonVerifyMap(
                      (prev) => ({
                        ...prev,
                        [lead.id]:
                          e.target.value,
                      })
                    )
                  }
                  className="w-full border rounded-xl p-2 text-sm focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">
                    Select Non-Verified Reason
                  </option>
                  {NON_VERIFY_REASONS.map(
                    (r) => (
                      <option
                        key={r}
                        value={r}
                      >
                        {r}
                      </option>
                    )
                  )}
                </select>

                {/* NON VERIFIED BUTTON */}
                <button
                  disabled={
                    !nonVerifyMap[
                      lead.id
                    ]
                  }
                  onClick={() =>
                    handleNonVerified(
                      lead.id
                    )
                  }
                  className="w-full bg-red-600 disabled:bg-red-300 text-white py-2 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-red-700 transition"
                >
                  <XCircle size={14} />
                  Mark as Non-Verified
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Telecaller;
