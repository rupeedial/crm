import { Lead } from "@/types";
import { getCampaignPerformance } from "@/lib/campaignPerformance";

export default function CampaignPerformanceTable({
  leads,
}: {
  leads: Lead[];
}) {
  const data = getCampaignPerformance(leads);

  return (
    <div className="bg-white rounded-xl border overflow-hidden">
      <h3 className="font-semibold p-4 border-b">
        Campaign Performance
      </h3>

      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="p-3 text-left">Campaign</th>
            <th>Total</th>
            <th>Verified</th>
            <th>Non-Verified</th>
            <th>Follow-ups</th>
            <th>Conversion</th>
          </tr>
        </thead>

        <tbody>
          {data.map((c: any) => (
            <tr key={c.campaignId} className="border-t">
              <td className="p-3 font-medium">
                {c.campaignName}
              </td>
              <td>{c.total}</td>
              <td className="text-green-600">{c.verified}</td>
              <td className="text-red-600">{c.nonVerified}</td>
              <td className="text-amber-600">{c.followUps}</td>
              <td className="font-bold">
                {c.conversion}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
