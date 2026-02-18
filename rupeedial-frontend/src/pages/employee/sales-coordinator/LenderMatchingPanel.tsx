import { useState } from "react";
import { CheckCircle, XCircle, Send } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  income: number;
  product: string;
}

interface Props {
  lead: Lead;
}

const lenders = [
  { name: "HDFC Bank", minIncome: 30000 },
  { name: "ICICI Bank", minIncome: 40000 },
  { name: "Axis Bank", minIncome: 50000 },
  { name: "Bajaj Finserv", minIncome: 25000 },
];

export default function LenderMatchingPanel({ lead }: Props) {
  const [selectedLender, setSelectedLender] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // 🔥 Auto Match Logic
  const eligibleLenders = lenders.filter(
    (lender) => lead.income >= lender.minIncome
  );

  const handleSubmit = () => {
    if (!selectedLender) return;

    console.log("Submitted to:", selectedLender);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-emerald-700 text-sm">
        File submitted to {selectedLender} successfully!
      </div>
    );
  }

  return (
    <div className="border-t pt-4 space-y-4">
      <h4 className="text-sm font-semibold text-gray-700">
        Eligible Lenders
      </h4>

      {eligibleLenders.length === 0 ? (
        <p className="text-sm text-red-500">
          No eligible lenders found.
        </p>
      ) : (
        <div className="space-y-3">
          {eligibleLenders.map((lender, index) => (
            <div
              key={index}
              className={`border rounded-lg p-3 flex justify-between items-center ${
                selectedLender === lender.name
                  ? "border-emerald-500 bg-emerald-50"
                  : ""
              }`}
            >
              <div>
                <p className="font-medium">
                  {lender.name}
                </p>
                <p className="text-xs text-gray-500">
                  Min Income: ₹{lender.minIncome}
                </p>
              </div>

              <button
                onClick={() =>
                  setSelectedLender(lender.name)
                }
                className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200"
              >
                Select
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedLender && (
        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-700"
        >
          <Send size={16} />
          Submit to {selectedLender}
        </button>
      )}
    </div>
  );
}
