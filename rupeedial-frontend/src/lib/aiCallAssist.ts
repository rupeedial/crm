import { AI_CALL_SCRIPTS } from "./aiCallScripts";
import { CallLog } from "@/types/call";

export async function startAICall({
  lead,
  userId,
}: {
  lead: any;
  userId: string;
}): Promise<CallLog> {
  // 1️⃣ Pick script
  const script = AI_CALL_SCRIPTS.PERSONAL_LOAN;

  // 2️⃣ Simulate AI call delay
  await new Promise((r) => setTimeout(r, 2500));

  // 3️⃣ Fake AI response (later real IVR)
  const interested = Math.random() > 0.3;

  return {
    id: crypto.randomUUID(),
    leadId: lead.id,
    userId,
    type: "AI",
    scriptId: script.id,
    startedAt: new Date().toISOString(),
    endedAt: new Date().toISOString(),
    outcome: interested ? "CONNECTED" : "NOT_INTERESTED",
    aiSummary: interested
      ? "Customer interested. Salary approx ₹35,000."
      : "Customer not interested.",
    recordingUrl: "/mock/recordings/ai-call-demo.mp3",
  };
}
