import { Lead } from "@/types";

interface Props {
  leads: Lead[];
}

export function LeadsStatusSummary({ leads }: Props) {
  const rows = [
    { label: "Not Called", status: "new" },
    { label: "Not Reachable", status: "contacted" },
    { label: "Not Eligible", status: "rejected" },
    { label: "Not Doable", status: "not_doable" },
  ];

  return (
    <div className="bg-card rounded-xl p-6 shadow-card">
      <h3 className="text-lg font-semibold mb-4">Total Leads</h3>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Status</th>
            <th>Lead</th>
            <th>Loan Amount</th>
            <th>%age</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => {
            const count = leads.filter(l => l.status === r.status).length;
            return (
              <tr key={r.label} className="border-b">
                <td className="py-2">{r.label}</td>
                <td className="text-center">{count}</td>
                <td className="text-center">—</td>
                <td className="text-center">0%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
