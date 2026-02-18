const stages = ["LOGIN", "IN_PROCESS", "SANCTIONED", "DISBURSED"];

export default function MCFTimeline({ status }: { status: string }) {
  return (
    <div className="space-y-3">
      {stages.map((stage, index) => (
        <div key={stage} className="flex items-center gap-3">
          <div
            className={`w-3 h-3 rounded-full ${
              stages.indexOf(status) >= index
                ? "bg-blue-600"
                : "bg-slate-300"
            }`}
          />
          <p
            className={`text-sm ${
              stages.indexOf(status) >= index
                ? "font-semibold text-slate-800"
                : "text-slate-400"
            }`}
          >
            {stage.replace("_", " ")}
          </p>
        </div>
      ))}
    </div>
  );
}
