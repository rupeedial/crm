import { Lead } from "@/types";

interface Props {
  leads: Lead[];
}

export function LeadSourcePerformancePanel({ leads }: Props) {
  return (
    <div className="space-y-4">
      <table className="w-full text-sm border">
        <thead className="bg-muted">
          <tr>
            <th className="p-2 text-left">Customer</th>
            <th className="p-2">Status</th>
            <th className="p-2">Amount</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((l) => (
            <tr key={l.id} className="border-t">
              <td className="p-2">{l.customerName}</td>
              <td className="p-2 capitalize">{l.status.replace("_"," ")}</td>
              <td className="p-2">₹{l.loanAmount.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {leads.length === 0 && (
        <p className="text-center text-muted-foreground">
          No leads for this source
        </p>
      )}
    </div>
  );
}
