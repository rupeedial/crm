import React, { useState, useMemo } from "react";
import {
  ArrowRight,
  UserCheck,
  FileText,
  Building2,
  IndianRupee,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ================= TYPES ================= */

type SalesStage = "SALES_FIELD" | "MOVED_TO_MCF";

interface SalesFieldLead {
  id: string;
  customerName: string;
  leadId: string;
  loanType: string;
  amount: number;
  bankerName: string;
  bankName: string;
  stage: SalesStage;
  createdAt: string;
}

/* ================= MOCK DATA ================= */

const MOCK_SALES_FIELD: SalesFieldLead[] = [
  {
    id: "1",
    customerName: "SHIVAM KUMAR",
    leadId: "RD-C-2024-00189",
    loanType: "Personal Loan",
    amount: 1400000,
    bankerName: "Amit Singh",
    bankName: "HDFC BANK",
    stage: "SALES_FIELD",
    createdAt: new Date().toISOString(),
  },
];

/* ================= COMPONENT ================= */

const SalesField: React.FC = () => {
  const [leads, setLeads] =
    useState<SalesFieldLead[]>(MOCK_SALES_FIELD);

  const navigate = useNavigate();

  /* ================= MOVE TO MCF ================= */

  const moveToMCF = (lead: SalesFieldLead) => {
    setLeads((prev) =>
      prev.map((l) =>
        l.id === lead.id
          ? { ...l, stage: "MOVED_TO_MCF" }
          : l
      )
    );

    navigate("/dashboard/employee/bank-mcf", {
      state: {
        leadId: lead.leadId,
        customerName: lead.customerName,
        bankName: lead.bankName,
        bankerName: lead.bankerName,
        amount: lead.amount,
        loanType: lead.loanType,
      },
    });
  };

  const activeLeads = useMemo(
    () =>
      leads.filter(
        (l) => l.stage === "SALES_FIELD"
      ),
    [leads]
  );

  const totalAmount = activeLeads.reduce(
    (sum, l) => sum + l.amount,
    0
  );

  /* ================= UI ================= */

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-10">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Sales Field Desk
          </h1>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <UserCheck
              size={14}
              className="text-emerald-600"
            />
            Post-login verification & banker coordination
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-4">
          <StatCard
            label="Active Cases"
            value={activeLeads.length}
            color="purple"
          />
          <StatCard
            label="Total Amount"
            value={`₹${totalAmount.toLocaleString("en-IN")}`}
            color="emerald"
          />
        </div>
      </div>

      {/* LEADS GRID */}
      {activeLeads.length === 0 ? (
        <div className="py-32 text-center bg-white rounded-2xl border border-dashed text-gray-400 shadow-sm">
          <FileText
            size={48}
            className="mx-auto mb-4 opacity-30"
          />
          No cases pending in Sales Field
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {activeLeads.map((lead) => (
            <div
              key={lead.id}
              className="bg-white rounded-2xl border shadow-sm hover:shadow-md transition"
            >
              <div className="p-6 space-y-5">
                {/* Lead ID */}
                <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
                  {lead.leadId}
                </span>

                {/* Name */}
                <h2 className="text-xl font-semibold text-gray-900">
                  {lead.customerName}
                </h2>

                {/* Loan Type */}
                <p className="text-sm text-gray-500">
                  {lead.loanType}
                </p>

                {/* Amount */}
                <div className="flex items-center gap-2 text-emerald-600 font-semibold text-lg">
                  <IndianRupee size={18} />
                  {lead.amount.toLocaleString("en-IN")}
                </div>

                {/* Bank Info */}
                <div className="bg-gray-50 p-4 rounded-xl space-y-2 border">
                  <div className="flex items-center gap-2 text-sm">
                    <Building2
                      size={16}
                      className="text-purple-600"
                    />
                    <span className="font-medium">
                      {lead.bankName}
                    </span>
                  </div>

                  <div className="text-xs text-gray-500">
                    Banker:{" "}
                    <span className="font-medium text-gray-700">
                      {lead.bankerName}
                    </span>
                  </div>
                </div>
              </div>

              {/* ACTION */}
              <div className="px-6 py-4 bg-gray-50 flex justify-end rounded-b-2xl border-t">
                <button
                  onClick={() =>
                    moveToMCF(lead)
                  }
                  className="bg-emerald-600 text-white px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-emerald-700 transition"
                >
                  Move to Bank MCF
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
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
    <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border text-center min-w-[150px]">
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

export default SalesField;
