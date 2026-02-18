import { useParams, Link } from "react-router-dom";
import CpPayment from "../Channel Sales/CpPayment";
import { useAuth } from "@/context/AuthContext";
import { canBuyLeads } from "@/utils/packageGuard";

export default function CampaignWallet() {
  const { id } = useParams();

  const { user, loading } = useAuth();

  if (loading) {
    return <div className="p-6">Loading user...</div>;
  }

  if (!user) {
    return (
      <div className="p-6 text-red-500">
        User not found
      </div>
    );
  }

  const currentUser = user;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">
        Campaign #{id} – Wallet & Lead Pricing
      </h2>

      {/* PRICING INFO */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h4 className="font-semibold">Raw Leads</h4>
          <p>₹40 – ₹60</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h4 className="font-semibold">Verified Leads</h4>
          <p>₹90 – ₹120</p>
        </div>

        <div className="bg-red-50 p-4 rounded shadow">
          <h4 className="font-semibold text-red-600">
            Hot Leads
          </h4>
          <p>Premium Pricing</p>
        </div>
      </div>

      {/* WALLET SECTION WITH PACKAGE GATING */}
      <div className="bg-white rounded shadow p-4">
        {canBuyLeads(currentUser.package) ? (
          <CpPayment />
        ) : (
          <div className="bg-yellow-100 p-4 rounded">
            <p className="font-medium">
              Wallet disabled for Free users.
            </p>
            <button className="mt-2 text-blue-600 underline">
              Upgrade to Unlock Wallet
            </button>
          </div>
        )}
      </div>

      {/* CTA */}
      <Link
        to={`/employee/campaign/${id}/leads`}
        className="inline-block bg-green-600 text-white px-6 py-3 rounded"
      >
        Buy Leads & View Lead Board
      </Link>
    </div>
  );
}
