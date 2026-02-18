import { useState } from "react";
import { Calculator, IndianRupee } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CalculatorPage() {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [rate, setRate] = useState(1.5);

  const payout = (loanAmount * rate) / 100;
  const employeeShare = payout * 0.35;

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Commission Calculator</h1>
        <p className="text-muted-foreground">
          Calculate your expected commission
        </p>
      </div>

      <Card className="p-6 rounded-2xl shadow-sm border space-y-6">

        {/* INPUTS */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">
              Loan Amount
            </label>
            <Input
              type="number"
              value={loanAmount}
              onChange={(e) =>
                setLoanAmount(Number(e.target.value))
              }
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Bank Payout Rate (%)
            </label>
            <Input
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) =>
                setRate(Number(e.target.value))
              }
            />
          </div>
        </div>

        {/* RESULT */}
        <div className="bg-emerald-50 p-4 rounded-xl">
          <p className="text-sm text-muted-foreground">
            Estimated Employee Commission
          </p>
          <p className="text-xl font-bold text-emerald-700">
            ₹{employeeShare.toLocaleString("en-IN")}
          </p>
        </div>

        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
          <Calculator className="w-4 h-4 mr-2" />
          Calculate
        </Button>
      </Card>
    </div>
  );
}
