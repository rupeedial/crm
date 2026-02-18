import { PIPELINE_CONFIG } from "@/lib/mockData";
import { Lead, LeadStatus } from "@/types";
import { formatCurrency } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface Props {
  leads: Lead[];
  selectedStage: LeadStatus | "all";
  onStageClick: (stage: LeadStatus | "all") => void;
}

export function PipelineView({
  leads,
  selectedStage,
  onStageClick,
}: Props) {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-card">
      <h3 className="text-lg font-semibold mb-4">Loan Pipeline</h3>

      <div className="flex gap-4 overflow-x-auto">
        {/* ALL */}
        <button
          onClick={() => onStageClick("all")}
          className={cn(
            "min-w-[140px] rounded-xl p-4 border text-left",
            selectedStage === "all"
              ? "border-primary bg-primary/10"
              : "border-border"
          )}
        >
          <p className="text-sm text-muted-foreground">All Leads</p>
          <p className="text-2xl font-bold">{leads.length}</p>
        </button>

        {/* STAGES */}
        {PIPELINE_CONFIG.map((stage) => {
          const stageLeads = leads.filter(
            (l) => l.status === stage.id
          );

          const totalValue = stageLeads.reduce(
            (sum, l) => sum + (l.loanAmount ?? 0),
            0
          );

          return (
            <button
              key={stage.id}
              onClick={() => onStageClick(stage.id)}
              className={cn(
                "min-w-[160px] rounded-xl p-4 border text-left transition",
                selectedStage === stage.id
                  ? "border-primary bg-primary/10"
                  : "border-border hover:bg-secondary/40"
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${stage.color}`}
                />
                <span className="text-sm font-medium">
                  {stage.label}
                </span>
              </div>

              <p className="text-2xl font-bold">
                {stageLeads.length}
              </p>
              <p className="text-sm text-muted-foreground">
                {formatCurrency(totalValue)}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
