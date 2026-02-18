import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal } from "lucide-react";
import { formatCurrency } from "@/lib/mockData";

/* ================= DATA ================= */

const leaderboardData = [
  { rank: 1, name: "Amit Patel", disbursed: 12, amount: 45000000, commission: 675000 },
  { rank: 2, name: "Priya Sharma", disbursed: 10, amount: 38000000, commission: 570000 },
  { rank: 3, name: "Rahul Gupta", disbursed: 8, amount: 32000000, commission: 480000 },
  { rank: 4, name: "Sunita Verma", disbursed: 7, amount: 28000000, commission: 420000 },
  { rank: 5, name: "Vikram Singh", disbursed: 6, amount: 24000000, commission: 360000 },
];

/* ================= HELPERS ================= */

const getRankIcon = (rank: number) => {
  if (rank === 1) return <Trophy className="w-5 h-5 text-amber-500" />;
  if (rank === 2) return <Medal className="w-5 h-5 text-slate-400" />;
  if (rank === 3) return <Medal className="w-5 h-5 text-amber-700" />;

  return (
    <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-muted-foreground">
      #{rank}
    </span>
  );
};

const getRankBg = (rank: number) => {
  if (rank === 1)
    return "bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border-amber-500/20";
  if (rank === 2)
    return "bg-gradient-to-r from-slate-500/10 to-gray-500/10 border-slate-500/20";
  if (rank === 3)
    return "bg-gradient-to-r from-amber-700/10 to-orange-700/10 border-amber-700/20";

  return "bg-secondary/50 border-border";
};

/* ================= COMPONENT ================= */

export function PartnerLeaderboard() {
  if (!leaderboardData.length) {
    return (
      <Card className="p-6 shadow-card">
        <p className="text-sm text-muted-foreground">
          No leaderboard data available
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6 shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold font-display">
              Partner Leaderboard
            </h3>
            <p className="text-sm text-muted-foreground">
              Top performing DSAs this month
            </p>
          </div>
        </div>

        <Badge variant="secondary">February 2024</Badge>
      </div>

      {/* List */}
      <div className="space-y-3">
        {leaderboardData.map((partner) => (
          <div
            key={partner.rank}
            className={`flex items-center gap-4 p-4 rounded-xl border transition-all hover:scale-[1.01] ${getRankBg(
              partner.rank
            )}`}
          >
            {/* Rank */}
            <div className="flex-shrink-0">
              {getRankIcon(partner.rank)}
            </div>

            {/* Name */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{partner.name}</p>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span>{partner.disbursed} cases</span>
                <span>•</span>
                <span>{formatCurrency(partner.amount)}</span>
              </div>
            </div>

            {/* Commission */}
            <div className="text-right">
              <p className="font-bold text-emerald-600">
                {formatCurrency(partner.commission)}
              </p>
              <p className="text-xs text-muted-foreground">Commission</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
