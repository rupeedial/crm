import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Building2,
  User,
  CreditCard,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";

export default function LenderSubmissionPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { lead, lender } = location.state || {};
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!lead || !lender) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200">
          No file selected.
        </div>

        <button
          onClick={() =>
            navigate("/dashboard/employee/sales-coordinator/active-files")
          }
          className="mt-4 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
        >
          Go to Active Files
        </button>
      </div>
    );
  }

  const handleSubmit = async () => {
    setLoading(true);

    // 🔥 Future API Call
    // await axios.post("/api/lender-submit", { leadId: lead.id, lender })

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Lender Submission
          </h1>
          <p className="text-sm text-gray-500">
            Submit verified file to selected lender
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/dashboard/employee/sales-coordinator/active-files")
          }
          className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-800 transition"
        >
          <ArrowLeft size={16} />
          Back
        </button>
      </div>

      {/* MAIN CARD */}
      <div className="bg-white rounded-2xl border shadow-sm p-8 max-w-3xl space-y-6">
        {/* LEAD INFO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <User className="text-purple-600" size={20} />
            <div>
              <p className="text-xs text-gray-500">Customer Name</p>
              <p className="font-medium text-gray-900">
                {lead.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CreditCard className="text-purple-600" size={20} />
            <div>
              <p className="text-xs text-gray-500">Product</p>
              <p className="font-medium text-gray-900">
                {lead.product}
              </p>
            </div>
          </div>
        </div>

        {/* LENDER SECTION */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
          <Building2 className="text-emerald-600" size={20} />
          <div>
            <p className="text-xs text-gray-500">
              Selected Lender
            </p>
            <p className="font-semibold text-emerald-700">
              {lender}
            </p>
          </div>
        </div>

        {/* ACTION AREA */}
        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-xl flex items-center gap-3">
            <CheckCircle size={20} />
            File submitted successfully to {lender}!
          </div>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-emerald-700 transition disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit to Bank"}
          </button>
        )}
      </div>
    </div>
  );
}
