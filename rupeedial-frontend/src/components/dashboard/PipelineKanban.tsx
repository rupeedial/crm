import { useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { PIPELINE_CONFIG } from "@/lib/mockData";
import { Lead, LeadStatus } from "@/types";
import { DraggableLead } from "./DraggableLead";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { getAIMoveStatus } from "@/lib/aiEngine";
import { isAIEnabled } from "@/lib/aiSettings";
import { useAuth } from "@/context/AuthContext";

interface Props {
  leads: Lead[];
  onStatusChange: (leadId: string, status: LeadStatus) => void;
}

export default function PipelineKanban({ leads, onStatusChange }: Props) {
  const { role } = useAuth(); // ✅ ALWAYS TOP LEVEL

  const [pendingMove, setPendingMove] = useState<{
    leadId: string;
    from: LeadStatus;
    to: LeadStatus;
    ai?: boolean;
  } | null>(null);

  /* ================= DRAG END ================= */
  const onDragEnd = (event: DragEndEvent) => {
    if (role !== "admin") return; // ✅ ROLE CHECK INSIDE FUNCTION

    const { active, over } = event;
    if (!over) return;

    const lead = leads.find((l) => l.id === active.id);
    if (!lead) return;

    const targetStatus = over.id as LeadStatus;
    if (lead.status === targetStatus) return;

    if (!isAIEnabled()) {
      setPendingMove({
        leadId: lead.id,
        from: lead.status,
        to: targetStatus,
      });
      return;
    }

    const aiDecision = getAIMoveStatus(lead, targetStatus);

    if (aiDecision.autoMove) {
      onStatusChange(lead.id, targetStatus);
      return;
    }

    setPendingMove({
      leadId: lead.id,
      from: lead.status,
      to: targetStatus,
      ai: aiDecision.aiSuggested,
    });
  };

  const confirmMove = () => {
    if (!pendingMove) return;
    onStatusChange(pendingMove.leadId, pendingMove.to);
    setPendingMove(null);
  };

  /* ================= UI ================= */
  if (role !== "admin") {
    return (
      <div className="text-sm text-muted-foreground p-4 border rounded-lg">
        You don’t have permission to move leads
      </div>
    );
  }

  return (
    <>
      <DndContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {PIPELINE_CONFIG.map((stage) => (
            <div
              key={stage.id}
              id={stage.id}
              className="min-w-[280px] bg-secondary/40 rounded-xl p-4"
            >
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${stage.color}`} />
                {stage.label}
              </h4>

              <div className="space-y-3">
                {leads
                  .filter((l) => l.status === stage.id)
                  .map((lead) => (
                    <DraggableLead key={lead.id} lead={lead} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </DndContext>

      {pendingMove && (
        <ConfirmDialog
          open={true}
          title="Confirm Status Change"
          description={`Move lead from "${pendingMove.from.replace(
            "_",
            " "
          )}" to "${pendingMove.to.replace("_", " ")}"?`}
          onConfirm={confirmMove}
          onCancel={() => setPendingMove(null)}
        />
      )}
    </>
  );
}
