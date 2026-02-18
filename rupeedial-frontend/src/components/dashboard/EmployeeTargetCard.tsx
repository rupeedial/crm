import { EmployeeTarget } from "@/types";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/mockData";

export function EmployeeTargetCard({ data }: { data: EmployeeTarget }) {
  const percent = Math.round(
    (data.achievedAmount / data.targetAmount) * 100
  );

  const incentive =
    (data.achievedAmount * data.incentiveRate) / 100;

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card space-y-4">
      <h3 className="text-lg font-semibold">🎯 Monthly Target</h3>

      <div className="flex justify-between text-sm">
        <span>Achieved</span>
        <span>{percent}%</span>
      </div>

      <Progress value={percent} />

      <div className="flex justify-between text-sm">
        <span>{formatCurrency(data.achievedAmount)}</span>
        <span>{formatCurrency(data.targetAmount)}</span>
      </div>

      <div className="pt-3 border-t text-sm">
        💰 <strong>Incentive Earned:</strong>{" "}
        {formatCurrency(incentive)}
      </div>
    </div>
  );
}
