import React from "react";
import { X, Clock, User, Building2 } from "lucide-react";

/* ================= TYPES ================= */

export interface MCFAuditItem {
  stage: string;
  remark: string;
  bankerName: string;
  bankName: string;
  updatedAt: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  audits: MCFAuditItem[];
}

/* ================= COMPONENT ================= */

const MCFAuditDrawer: React.FC<Props> = ({ open, onClose, audits }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
      <div className="w-full sm:w-[420px] bg-white h-full shadow-2xl animate-in slide-in-from-right duration-300">

        {/* HEADER */}
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="font-black text-lg">MCF Audit Timeline</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {audits.length === 0 && (
            <p className="text-sm text-muted-foreground text-center">
              No audit history available
            </p>
          )}

          {audits.map((item, index) => (
            <div key={index} className="relative pl-6">
              {/* LINE */}
              <div className="absolute left-1 top-1 bottom-0 w-[2px] bg-muted" />

              {/* DOT */}
              <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-blue-600" />

              <div className="space-y-1">
                <p className="font-bold text-sm">
                  {item.stage}
                </p>

                <p className="text-xs text-muted-foreground italic">
                  "{item.remark}"
                </p>

                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-2">
                  <span className="flex items-center gap-1">
                    <User size={12} /> {item.bankerName}
                  </span>
                  <span className="flex items-center gap-1">
                    <Building2 size={12} /> {item.bankName}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {item.updatedAt}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MCFAuditDrawer;
