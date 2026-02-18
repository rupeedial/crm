import { Link, useParams } from "react-router-dom";


export default function CampaignDetails() {
  const { id } = useParams();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">
        Campaign #{id} – Personal Loan WhatsApp
      </h2>

      <div className="bg-white p-4 rounded shadow space-y-2">
        <p><b>Channel:</b> WhatsApp</p>
        <p><b>Lead Price:</b> Raw ₹50 | Verified ₹100</p>

        <div className="flex gap-3 mt-3">
          <Link
            to={`/employee/campaign/${id}/leads`}
            className="btn"
          >
            View Leads
          </Link>

          

          <Link
            to={`/employee/campaign/${id}/wallet`}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Wallet & Pricing
          </Link>
        </div>
      </div>
    </div>
  );
}
