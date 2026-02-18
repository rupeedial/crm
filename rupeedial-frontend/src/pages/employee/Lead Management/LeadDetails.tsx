import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, IndianRupee } from "lucide-react";

const LeadDetails: React.FC = () => {
  const { leadId } = useParams();
  const navigate = useNavigate();

  // TEMP MOCK (baad me API se aayega)
  const lead = {
    id: leadId,
    customerName: "Shivam Kumar",
    phone: "9876543210",
    loanType: "Personal Loan",
    amount: 1400000,
    status: "LOGIN",
    bank: "HDFC BANK",
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">

      {/* HEADER */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg hover:bg-muted"
        >
          <ArrowLeft />
        </button>
        <div>
          <h1 className="text-2xl font-black">Lead Details</h1>
          <p className="text-xs text-muted-foreground">
            Lead ID: {lead.id}
          </p>
        </div>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-3xl border shadow-sm p-6 space-y-6">

        {/* CUSTOMER */}
        <div>
          <h2 className="text-xl font-bold">{lead.customerName}</h2>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Phone size={14} /> {lead.phone}
          </p>
        </div>

        {/* INFO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-muted/40 p-4 rounded-2xl">
            <p className="text-xs font-bold text-muted-foreground uppercase">
              Loan Type
            </p>
            <p className="font-semibold">{lead.loanType}</p>
          </div>

          <div className="bg-muted/40 p-4 rounded-2xl">
            <p className="text-xs font-bold text-muted-foreground uppercase">
              Amount
            </p>
            <p className="font-semibold flex items-center gap-1">
              <IndianRupee size={14} />
              {lead.amount.toLocaleString("en-IN")}
            </p>
          </div>

          <div className="bg-muted/40 p-4 rounded-2xl">
            <p className="text-xs font-bold text-muted-foreground uppercase">
              Status
            </p>
            <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600">
              {lead.status}
            </span>
          </div>
        </div>

        {/* BANK */}
        <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl">
          <p className="text-xs font-bold uppercase text-emerald-600">
            Assigned Bank
          </p>
          <p className="font-semibold">{lead.bank}</p>
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;
