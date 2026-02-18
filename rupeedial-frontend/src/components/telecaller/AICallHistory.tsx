import { CallLog } from "@/types/call";

export function AICallHistory({ logs }: { logs: CallLog[] }) {
  return (
    <div className="space-y-3">
      {logs.map((log) => (
        <div
          key={log.id}
          className="border rounded-lg p-3 bg-white"
        >
          <p className="text-xs font-bold text-indigo-600">
            🤖 AI CALL
          </p>

          <p className="text-sm">
            Outcome: {log.outcome}
          </p>

          {log.aiSummary && (
            <p className="text-xs text-slate-600">
              {log.aiSummary}
            </p>
          )}

          {log.recordingUrl && (
            <audio controls src={log.recordingUrl} />
          )}
        </div>
      ))}
    </div>
  );
}
