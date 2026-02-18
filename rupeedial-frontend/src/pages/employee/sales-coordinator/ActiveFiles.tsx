import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Building2, IndianRupee } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  income: number;
  product: string;
  status: string;
}

interface Lender {
  name: string;
  minIncome: number;
}

export default function ActiveFilesPage() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const lenders: Lender[] = [
    { name: "HDFC Bank", minIncome: 30000 },
    { name: "ICICI Bank", minIncome: 40000 },
    { name: "Axis Bank", minIncome: 50000 },
  ];

  useEffect(() => {
    // 🔥 API Ready (Later replace with axios.get)
    setTimeout(() => {
      setLeads([
        {
          id: "L-001",
          name: "Rahul Sharma",
          income: 45000,
          product: "Personal Loan",
          status: "VERIFIED",
        },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const verifiedLeads = leads.filter(
    (lead) => lead.status === "VERIFIED"
  );

  const handleMove = (lead: Lead, lender: string) => {
    navigate("/dashboard/employee/sales-coordinator/lender-submission", {
      state: { lead, lender },
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Active Verified Files
        </h1>
        <p className="text-sm text-gray-500">
          Move verified leads to eligible lenders
        </p>
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="text-center py-20 text-gray-500">
          Loading files...
        </div>
      ) : verifiedLeads.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed py-20 text-center text-gray-400">
          No verified leads available
        </div>
      ) : (
        <div className="space-y-6">
          {verifiedLeads.map((lead) => {
            const eligibleLenders = lenders.filter(
              (l) => lead.income >= l.minIncome
            );

            return (
              <div
                key={lead.id}
                className="bg-white rounded-2xl border shadow-sm p-6 space-y-6"
              >
                {/* LEAD INFO */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      {lead.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Lead ID: {lead.id}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full">
                      <CheckCircle size={14} />
                      {lead.status}
                    </span>

                    <span className="flex items-center gap-1 bg-purple-50 text-purple-700 px-3 py-1 rounded-full">
                      <IndianRupee size={14} />
                      ₹{lead.income}
                    </span>

                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                      {lead.product}
                    </span>
                  </div>
                </div>

                {/* ELIGIBLE LENDERS */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Eligible Lenders
                  </h4>

                  {eligibleLenders.length === 0 ? (
                    <p className="text-sm text-red-500">
                      No lender eligible based on income.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {eligibleLenders.map((lender, i) => (
                        <button
                          key={i}
                          onClick={() =>
                            handleMove(lead, lender.name)
                          }
                          className="flex items-center justify-between border rounded-xl px-4 py-3 text-sm hover:bg-emerald-50 hover:border-emerald-400 transition"
                        >
                          <span className="flex items-center gap-2">
                            <Building2
                              size={16}
                              className="text-purple-600"
                            />
                            {lender.name}
                          </span>

                          <span className="text-xs text-gray-500">
                            Min ₹{lender.minIncome}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
