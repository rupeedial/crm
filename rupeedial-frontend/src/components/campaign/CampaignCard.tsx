export default function CampaignCard({ campaign }: any) {
  return (
    <div className="border rounded p-4 flex justify-between items-center">
      <div>
        <p className="font-medium">{campaign.title}</p>
        <p className="text-xs text-gray-500">
          {campaign.channel} • {campaign.status}
        </p>
      </div>

      <button className="text-blue-600 text-sm">
        View
      </button>
    </div>
  );
}
