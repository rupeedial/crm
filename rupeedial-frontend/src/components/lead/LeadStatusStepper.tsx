import { LEAD_STATUSES } from "@/lib/constants";

type Props = {
  status: string;
};

export default function LeadStatusStepper({ status }: Props) {
  const currentIndex = LEAD_STATUSES.indexOf(status as any);

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {LEAD_STATUSES.map((step, index) => {
        const isActive = index <= currentIndex;

        return (
          <div key={step} className="flex items-center gap-2">
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium
                ${
                  isActive
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }
              `}
            >
              {step.replace("_", " ")}
            </div>

            {index < LEAD_STATUSES.length - 1 && (
              <span className="text-gray-400">→</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
