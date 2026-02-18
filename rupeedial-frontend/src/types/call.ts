export type CallType = "MANUAL" | "AUTO" | "AI";

export type CallOutcome =
  | "CONNECTED"
  | "NOT_INTERESTED"
  | "CALLBACK"
  | "NO_ANSWER"
  | "FAILED";

export interface CallLog {
  id: string;
  leadId: string;
  userId: string;
  type: CallType;
  scriptId?: string;
  startedAt: string;
  endedAt?: string;
  outcome?: CallOutcome;
  recordingUrl?: string;
  aiSummary?: string;
}
