import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Calculator,
  IndianRupee,
  Users,
  Building2,
  Briefcase,
} from "lucide-react";

import { formatCurrency } from "@/lib/mockData";

export function CommissionSimulator() {
  const [loanAmount, setLoanAmount] = useState<number>(1_000_000);
  const [loanType, setLoanType] = useState<string>("home_loan");
  const [bankRate, setBankRate] = useState<number>(1.5);

  /* ================= SAFE CALCULATION ================= */

  const safeLoanAmount = Math.max(0, loanAmount || 0);
  const safeBankRate = Math.max(0, bankRate || 0);

  const bankPayout = safeLoanAmount * (safeBankRate / 100);
  const companyShare = bankPayout * 0.4;
  const employeeShare = bankPayout * 0.35;
  const partnerShare = bankPayout * 0.25;

  return (
    <Card className="p-6 shadow-card">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center">
          <Calculator className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold font-display">
            Commission Simulator
          </h3>
          <p className="text-sm text-muted-foreground">
            Calculate earnings before disbursement
          </p>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid gap-4 mb-6">
        {/* Loan Amount */}
        <div className="grid gap-2">
          <Label htmlFor="loan-amount">Loan Amount</Label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="loan-amount"
              type="number"
              min={0}
              value={loanAmount}
              onChange={(e) =>
                setLoanAmount(Number(e.target.value) || 0)
              }
              className="pl-9"
            />
          </div>
        </div>

        {/* Loan Type */}
        <div className="grid gap-2">
          <Label>Loan Type</Label>
          <Select value={loanType} onValueChange={setLoanType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="home_loan">Home Loan</SelectItem>
              <SelectItem value="personal_loan">Personal Loan</SelectItem>
              <SelectItem value="business_loan">Business Loan</SelectItem>
              <SelectItem value="car_loan">Car Loan</SelectItem>
              <SelectItem value="lap">LAP</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bank Rate */}
        <div className="grid gap-2">
          <Label htmlFor="bank-rate">Bank Payout Rate (%)</Label>
          <Input
            id="bank-rate"
            type="number"
            step="0.1"
            min={0}
            value={bankRate}
            onChange={(e) =>
              setBankRate(Number(e.target.value) || 0)
            }
          />
        </div>
      </div>

      {/* Breakdown */}
      <div className="space-y-3">
        <Breakdown
          label="Bank Payout"
          value={bankPayout}
          icon={<Building2 className="w-4 h-4" />}
          className="bg-blue-500/10 border-blue-500/20 text-blue-700"
        />

        <Breakdown
          label="Company Share (40%)"
          value={companyShare}
          icon={<Briefcase className="w-4 h-4" />}
          className="bg-purple-500/10 border-purple-500/20 text-purple-700"
        />

        <Breakdown
          label="Employee Share (35%)"
          value={employeeShare}
          icon={<Users className="w-4 h-4" />}
          className="bg-emerald-500/10 border-emerald-500/20 text-emerald-700"
        />

        <Breakdown
          label="Partner Share (25%)"
          value={partnerShare}
          icon={<Users className="w-4 h-4" />}
          className="bg-amber-500/10 border-amber-500/20 text-amber-700"
        />
      </div>
    </Card>
  );
}

/* ================= SMALL COMPONENT ================= */

function Breakdown({
  label,
  value,
  icon,
  className,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  className: string;
}) {
  return (
    <div
      className={`flex items-center justify-between p-3 rounded-lg border ${className}`}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      <span className="font-bold">{formatCurrency(value)}</span>
    </div>
  );
}
