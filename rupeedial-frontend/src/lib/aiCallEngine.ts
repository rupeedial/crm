import { CallLog } from "@/types/call";

export const startAICall = async ({
  leadId,
  userId,
  scriptId,
}: {
  leadId: string;
  userId: string;
  scriptId: string;
}): Promise<CallLog> => {
  // ⏳ simulate AI call
  await new Promise((r) => setTimeout(r, 2500));

  return {
    id: crypto.randomUUID(),
    leadId,
    userId,
    type: "AI",
    scriptId,
    startedAt: new Date().toISOString(),
    endedAt: new Date().toISOString(),
    outcome: "CONNECTED",
    aiSummary: "Customer is interested. Salary ₹35,000.",
    recordingUrl: "/mock/recordings/ai-call-001.mp3",
  };
};
import { CallLog } from "@/types/call";

export const startAICall = async ({
  leadId,
  userId,
  scriptId,
}: {
  leadId: string;
  userId: string;
  scriptId: string;
}): Promise<CallLog> => {
  // ⏳ simulate AI call
  await new Promise((r) => setTimeout(r, 2500));

  return {
    id: crypto.randomUUID(),
    leadId,
    userId,
    type: "AI",
    scriptId,
    startedAt: new Date().toISOString(),
    endedAt: new Date().toISOString(),
    outcome: "CONNECTED",
    aiSummary: "Customer is interested. Salary ₹35,000.",
    recordingUrl: "/mock/recordings/ai-call-001.mp3",
  };
};
