import React, { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import MCFAuditDrawer, { MCFAuditItem } from "./components/MCFAuditDrawer";
import { Clock, FileText, X } from "lucide-react";

/* ================= TYPES ================= */

type MCFStage = "LOGIN" | "IN_PROCESS" | "SANCTIONED" | "DISBURSED";

interface MCFLead {
  id: string;
  leadId: string;
  customerName: string;
  loanType: string;
  amount: number;
  bankName: string;
  bankerName: string;
  stage: MCFStage;
  remark?: string;
  audits: MCFAuditItem[];
}

/* ================= COMPONENT ================= */

const BankMCF: React.FC = () => {
  const location = useLocation();

  // ✅ SAFE PARSE
  const stateLead = location.state as any;

  const convertedLead: MCFLead | null = stateLead
    ? {
        id: crypto.randomUUID(),
        leadId: stateLead.leadId || "NA",
        customerName: stateLead.customerName || "NA",
        loanType: stateLead.loanType || "NA",
        amount: stateLead.amount || 0,
        bankName: stateLead.bankName || "NA",
        bankerName: stateLead.bankerName || "NA",
        stage: "LOGIN",
        remark: "",
        audits: [],
      }
    : null;

  const [leads, setLeads] = useState<MCFLead[]>(
    convertedLead ? [convertedLead] : []
  );

  const [selected, setSelected] = useState<MCFLead | null>(null);
  const [remark, setRemark] = useState("");
  const [auditOpen, setAuditOpen] = useState(false);
  const [auditData, setAuditData] = useState<MCFAuditItem[]>([]);

  /* ================= STAGE FLOW ================= */

  const nextStage = (stage: MCFStage): MCFStage | null => {
    if (stage === "LOGIN") return "IN_PROCESS";
    if (stage === "IN_PROCESS") return "SANCTIONED";
    if (stage === "SANCTIONED") return "DISBURSED";
    return null;
  };

  const moveStage = (next: MCFStage) => {
    if (!selected) return;

    const newAudit: MCFAuditItem = {
      stage: next.replace("_", " "),
      remark,
      bankerName: selected.bankerName,
      bankName: selected.bankName,
      updatedAt: new Date().toLocaleString("en-IN"),
    };

    setLeads(prev =>
      prev.map(l =>
        l.id === selected.id
          ? {
              ...l,
              stage: next,
              remark,
              audits: [...l.audits, newAudit],
            }
          : l
      )
    );

    setSelected(null);
    setRemark("");
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Bank MCF Track & Audit</h1>
        <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
          <Clock size={14} className="text-blue-600" />
          Login → Process → Sanction → Disbursement
        </p>
      </div>

      {/* EMPTY STATE */}
      {leads.length === 0 && (
        <div className="bg-white rounded-2xl border shadow-sm p-10 text-center text-gray-400">
          No MCF cases found
        </div>
      )}

      {/* TABLE */}
      {leads.length > 0 && (
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          <div className="grid grid-cols-6 gap-4 px-6 py-4 bg-gray-100 text-xs font-bold uppercase">
            <div>Customer</div>
            <div>Bank</div>
            <div>Stage</div>
            <div>Amount</div>
            <div>Remark</div>
            <div></div>
          </div>

          {leads.map((lead) => (
            <div
              key={lead.id}
              className="grid grid-cols-6 gap-4 px-6 py-5 border-t items-center"
            >
              <div>
                <p className="font-semibold">{lead.customerName}</p>
                <p className="text-xs text-gray-400">{lead.leadId}</p>
              </div>

              <div>
                <p className="font-semibold">{lead.bankName}</p>
                <p className="text-xs text-gray-400">{lead.bankerName}</p>
              </div>

              <div>
                <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-bold">
                  {lead.stage.replace("_", " ")}
                </span>
              </div>

              <div className="font-semibold">
                ₹{lead.amount.toLocaleString("en-IN")}
              </div>

              <div className="text-xs text-gray-400">
                {lead.remark || "—"}
              </div>

              <div className="flex justify-end gap-2">
                {nextStage(lead.stage) && (
                  <button
                    onClick={() => setSelected(lead)}
                    className="text-xs bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
                  >
                    Update
                  </button>
                )}

                <button
                  onClick={() => {
                    setAuditData(lead.audits);
                    setAuditOpen(true);
                  }}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <FileText size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* UPDATE MODAL */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl w-full max-w-lg">

            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="font-bold text-lg">
                Move to {nextStage(selected.stage)?.replace("_", " ")}
              </h2>
              <button onClick={() => setSelected(null)}>
                <X />
              </button>
            </div>

            <div className="p-6">
              <textarea
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                placeholder="Enter banker remark..."
                className="w-full border rounded-xl px-4 py-3 text-sm"
              />
            </div>

            <div className="p-6 flex gap-4">
              <button
                onClick={() => setSelected(null)}
                className="flex-1 bg-gray-200 py-3 rounded-xl text-sm font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => moveStage(nextStage(selected.stage)!)}
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl text-sm font-bold"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AUDIT DRAWER */}
      <MCFAuditDrawer
        open={auditOpen}
        audits={auditData}
        onClose={() => setAuditOpen(false)}
      />
    </div>
  );
};

export default BankMCF;
