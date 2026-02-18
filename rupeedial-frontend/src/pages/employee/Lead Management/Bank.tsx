import React, { useState, useMemo } from "react";
import {
  Building2,
  IndianRupee,
  FileText,
  ShieldCheck,
} from "lucide-react";
import MCFAuditDrawer from "./components/MCFAuditDrawer";
import { Lead } from "@/types";

interface Props {
  leads?: Lead[];
}

const Bank: React.FC<Props> = ({ leads = [] }) => {
  const [selectedLead, setSelectedLead] =
    useState<Lead | null>(null);

  /* ================= FILTER BANK LEADS ================= */

  const bankLeads = useMemo(() => {
    return leads.filter(
      (lead) =>
        lead.status === "LOGGED_IN" ||
        lead.status === "SUBMITTED" ||
        lead.status === "SANCTIONED"
    );
  }, [leads]);

  const totalAmount = bankLeads.reduce(
    (sum, l) => sum + (l.loanAmount || 0),
    0
  );

  /* ================= STATUS COLOR ================= */

  const getStatusColor = (status: string) => {
    switch (status) {
      case "LOGGED_IN":
        return "bg-purple-100 text-purple-700";
      case "SUBMITTED":
        return "bg-amber-100 text-amber-700";
      case "SANCTIONED":
        return "bg-emerald-100 text-emerald-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-10">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Bank Desk
          </h1>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <ShieldCheck
              size={14}
              className="text-emerald-600"
            />
            Bank login & audit management
          </p>
        </div>

        {/* STATS */}
        <div className="flex gap-4">
          <StatCard
            label="Active Cases"
            value={bankLeads.length}
            color="purple"
          />
          <StatCard
            label="Total Amount"
            value={`₹${totalAmount.toLocaleString("en-IN")}`}
            color="emerald"
          />
        </div>
      </div>

      {/* LIST */}
      {bankLeads.length === 0 ? (
        <div className="py-32 text-center bg-white rounded-2xl border border-dashed text-gray-400 shadow-sm">
          <FileText
            size={48}
            className="mx-auto mb-4 opacity-30"
          />
          No bank assigned leads
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {bankLeads.map((lead) => (
            <div
              key={lead.id}
              className="bg-white rounded-2xl border shadow-sm hover:shadow-md transition"
            >
              <div className="p-6 space-y-5">
                {/* TOP */}
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {lead.customerName}
                    </h2>
                    <p className="text-sm text-gray-500">
                      📞 {lead.phone}
                    </p>
                  </div>

                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(
                      lead.status
                    )}`}
                  >
                    {lead.status}
                  </span>
                </div>

                {/* LOAN AMOUNT */}
                <div className="flex items-center gap-2 text-emerald-600 font-semibold text-lg">
                  <IndianRupee size={18} />
                  {lead.loanAmount?.toLocaleString("en-IN")}
                </div>

                {/* BANK INFO */}
                {lead.bankName && (
                  <div className="bg-gray-50 p-3 rounded-xl border flex items-center gap-2 text-sm text-gray-600">
                    <Building2
                      size={16}
                      className="text-purple-600"
                    />
                    <span className="font-medium">
                      {lead.bankName}
                    </span>
                  </div>
                )}

                {/* ACTION */}
                <button
                  onClick={() =>
                    setSelectedLead(lead)
                  }
                  className="w-full bg-emerald-600 text-white py-2 rounded-xl text-sm font-semibold hover:bg-emerald-700 transition"
                >
                  View Audit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* AUDIT DRAWER */}
      {selectedLead && (
        <MCFAuditDrawer
          open={true}
          audits={
            (selectedLead as any)
              .audits || []
          }
          onClose={() =>
            setSelectedLead(null)
          }
        />
      )}
    </div>
  );
};

/* ================= STAT CARD ================= */

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string | number;
  color: "purple" | "emerald";
}) {
  const colorMap = {
    purple: "text-purple-600",
    emerald: "text-emerald-600",
  };

  return (
    <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border text-center min-w-[160px]">
      <p className="text-xs text-gray-500">
        {label}
      </p>
      <p
        className={`text-xl font-semibold ${colorMap[color]}`}
      >
        {value}
      </p>
    </div>
  );
}

export default Bank;
