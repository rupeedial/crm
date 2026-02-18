import { Wallet, Lock, IndianRupee } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { canWithdrawPayout } from "@/utils/packageGuard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function CpPayout() {
  const { user } = useAuth();

  const payoutAmount = 12500;

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">CP Payout</h1>
        <p className="text-muted-foreground">
          Withdraw your channel partner earnings
        </p>
      </div>

      {/* MAIN CARD */}
      <Card className="p-6 rounded-2xl shadow-sm border bg-gradient-to-br from-emerald-50 to-white">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center">
            <Wallet className="text-white w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              Available Payout
            </p>
            <p className="text-2xl font-bold text-emerald-700">
              ₹{payoutAmount.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {user && canWithdrawPayout(user.package) ? (
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
            <IndianRupee className="w-4 h-4 mr-2" />
            Withdraw Now
          </Button>
        ) : (
          <div className="bg-gray-100 p-4 rounded-xl text-sm flex items-center gap-3">
            <Lock className="w-5 h-5 text-gray-500" />
            <div>
              <p className="font-medium">Payout Locked</p>
              <Link
                to="/dashboard/employee/upgrade"
                className="text-blue-600 text-sm underline"
              >
                Upgrade your package to unlock
              </Link>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
