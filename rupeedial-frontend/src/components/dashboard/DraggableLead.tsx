import { useDraggable } from "@dnd-kit/core";
import { Lead } from "@/types";
import { formatCurrency } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Phone, Sparkles } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  lead: Lead;
}

export function DraggableLead({ lead }: Props) {
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: lead.id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const getProbabilityVariant = () => {
    if (lead.probability === "high") return "success";
    if (lead.probability === "medium") return "warning";
    return "destructive";
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-card rounded-xl p-4 shadow-card border border-border hover:shadow-lg transition cursor-grab active:cursor-grabbing"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-semibold text-foreground">
            {lead.customerName}
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <Phone className="w-3 h-3" />
            {lead.phone}
          </p>
        </div>

        <div className="flex items-center gap-1 text-sm font-bold">
          <Sparkles className="w-4 h-4 text-amber-500" />
          {lead.score}
        </div>
      </div>

      {/* Amount */}
      <p className="text-lg font-bold mb-2">
        {formatCurrency(lead.loanAmount)}
      </p>

      {/* Probability */}
      <Badge variant={getProbabilityVariant()}>
        {lead.probability.toUpperCase()} PROB
      </Badge>
    </div>
  );
}
