import { Lead } from "@/types";

export type QueueType = "OVERDUE" | "CALLBACK" | "FRESH";

export interface QueueLead extends Lead {
  priority: QueueType;
  minutesLate?: number;
}

export function buildTelecallerQueue(
  leads: Lead[],
  userId: string
): QueueLead[] {
  const now = new Date();

  return leads
    .filter(l => l.assignedTo === userId)
    .map(l => {
      if (l.followUpAt) {
        const follow = new Date(l.followUpAt);
        const diff =
          (now.getTime() - follow.getTime()) / 60000;

        if (diff > 0) {
          return {
            ...l,
            priority: "OVERDUE",
            minutesLate: Math.floor(diff),
          };
        }

        return {
          ...l,
          priority: "CALLBACK",
        };
      }

      return {
        ...l,
        priority: "FRESH",
      };
    })
    .sort((a, b) => {
      const order = {
        OVERDUE: 1,
        CALLBACK: 2,
        FRESH: 3,
      };
      return order[a.priority] - order[b.priority];
    });
}
