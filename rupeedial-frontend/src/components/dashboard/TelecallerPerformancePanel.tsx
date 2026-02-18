import { Lead } from "@/types";

interface Props {
  leads?: Lead[];
}

/**
 * 📊 Telecaller Performance
 * (mock grouping – backend me real data aayega)
 */
export function TelecallerPerformancePanel({ leads = [] }: Props) {
  // Group by assigned employee
  const grouped = leads.reduce<Record<string, number>>((acc, lead) => {
    const key = lead.assignedEmployeeId || "Unassigned";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const rows = Object.entries(grouped);

  return (
    <div className="space-y-4">
      <h4 className="font-semibold">Telecaller Performance</h4>

      <table className="w-full text-sm border">
        <thead className="bg-muted">
          <tr>
            <th className="p-2 text-left">Telecaller</th>
            <th className="p-2">Leads</th>
          </tr>
        </thead>

        <tbody>
          {rows.map(([name, count]) => (
            <tr key={name} className="border-t">
              <td className="p-2">{name}</td>
              <td className="p-2">{count}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {rows.length === 0 && (
        <p className="text-center text-muted-foreground">
          No telecaller data available
        </p>
      )}
    </div>
  );
}
