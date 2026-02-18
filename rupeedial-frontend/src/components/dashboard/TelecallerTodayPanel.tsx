import { Lead } from "@/types";

interface Props {
  leads?: Lead[];
}

/**
 * 📞 Today Telecaller Performance
 */
export function TelecallerTodayPanel({ leads = [] }: Props) {
  // Today filter
  const today = new Date().toDateString();

  const todayLeads = leads.filter(
    l => new Date(l.createdAt).toDateString() === today
  );

  return (
    <div className="space-y-4">
      <h4 className="font-semibold">Today's Activity</h4>

      <table className="w-full text-sm border">
        <thead className="bg-muted">
          <tr>
            <th className="p-2 text-left">Lead</th>
            <th className="p-2">Source</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {todayLeads.map((lead) => (
            <tr key={lead.id} className="border-t">
              <td className="p-2">{lead.customerName}</td>
              <td className="p-2 capitalize">{lead.source}</td>
              <td className="p-2 capitalize">
                {lead.status.replace("_", " ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {todayLeads.length === 0 && (
        <p className="text-center text-muted-foreground">
          No activity today
        </p>
      )}
    </div>
  );
}
