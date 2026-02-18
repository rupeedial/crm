import { employeeTargets } from "@/lib/mockData";
import { formatCurrency } from "@/lib/mockData";

export function EmployeePerformanceTable() {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-card">
      <h3 className="text-lg font-semibold mb-4">
        👥 Employee Performance
      </h3>

      <div className="space-y-3">
        {employeeTargets.map(e => (
          <div
            key={e.employeeId}
            className="flex justify-between text-sm"
          >
            <span>Employee #{e.employeeId}</span>
            <span>
              {formatCurrency(e.achievedAmount)} /{" "}
              {formatCurrency(e.targetAmount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
