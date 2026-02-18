import { Lead } from "@/types";
import { formatCurrency, getLoanTypeLabel, getStatusLabel } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  lead: Lead | null;
  onClose: () => void;
}

const getCleanPhone = (phone: string) =>
  phone.replace(/\D/g, "");

export function LeadDetailModal({ lead, onClose }: Props) {
  if (!lead) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-card rounded-xl w-full max-w-md p-6 shadow-lg">
        {/* HEADER */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold">Lead Details</h3>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>

        {/* ACTION BUTTONS */}
<div className="flex gap-3 mt-6">
  {/* CALL */}
  <Button
    className="flex-1 gap-2"
    onClick={() =>
      window.open(`tel:${getCleanPhone(lead.phone)}`)
    }
  >
    <Phone className="w-4 h-4" />
    Call
  </Button>

  {/* WHATSAPP */}
  <Button
    variant="outline"
    className="flex-1 gap-2"
    onClick={() =>
      window.open(
        `https://wa.me/91${getCleanPhone(lead.phone)}`,
        "_blank"
      )
    }
  >
    <MessageCircle className="w-4 h-4" />
    WhatsApp
  </Button>
</div>


        {/* BODY */}
        <div className="space-y-3 text-sm">
          <p>
            <b>Name:</b> {lead.customerName}
          </p>
          <p>
            <b>Phone:</b> {lead.phone}
          </p>
          <p>
            <b>City:</b> {lead.city}
          </p>
          <p>
            <b>Loan Type:</b> {getLoanTypeLabel(lead.loanType)}
          </p>
          <p>
            <b>Loan Amount:</b> {formatCurrency(lead.loanAmount)}
          </p>

          <div className="flex items-center gap-2">
            <b>Status:</b>
            <Badge variant="secondary">
              {getStatusLabel(lead.status)}
            </Badge>
          </div>

          <p>
            <b>AI Score:</b> {lead.score}
          </p>

          {lead.score >= 85 && (
            <p className="text-emerald-600 text-xs font-semibold">
              🤖 AI Auto-Move Enabled
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
