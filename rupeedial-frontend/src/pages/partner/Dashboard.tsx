import { StatCard } from '@/components/dashboard/StatCard';
import { PartnerLeaderboard } from '@/components/dashboard/PartnerLeaderboard';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency, getLoanTypeLabel } from '@/lib/mockData';

import {
  FileText,
  CheckCircle,
  IndianRupee,
  Trophy,
  Clock,
  ArrowRight,
} from 'lucide-react';

const recentDisbursements = [
  {
    id: 1,
    customer: 'Vikram Singh',
    amount: 5000000,
    loanType: 'home_loan',
    date: '20 Feb 2024',
    commission: 75000,
  },
  {
    id: 2,
    customer: 'Rahul Gupta',
    amount: 2000000,
    loanType: 'business_loan',
    date: '18 Feb 2024',
    commission: 30000,
  },
  {
    id: 3,
    customer: 'Anita Desai',
    amount: 800000,
    loanType: 'car_loan',
    date: '15 Feb 2024',
    commission: 12000,
  },
];

const pendingPayouts = [
  { id: 1, amount: 75000, status: 'processing', expectedDate: '25 Feb 2024' },
  { id: 2, amount: 30000, status: 'approved', expectedDate: '22 Feb 2024' },
];

export default function PartnerDashboard() {
  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">
          Welcome, Amit 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Track your leads, disbursements, and earnings
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="My Active Leads"
          value={18}
          change="3 new this week"
          changeType="positive"
          icon={<FileText className="w-6 h-6" />}
        />
        <StatCard
          title="Disbursed Cases"
          value={12}
          change="This month"
          changeType="positive"
          icon={<CheckCircle className="w-6 h-6" />}
        />
        <StatCard
          title="Total Commission"
          value={formatCurrency(675000)}
          change="This month"
          changeType="positive"
          icon={<IndianRupee className="w-6 h-6" />}
        />
        <StatCard
          title="My Rank"
          value="#1"
          change="Top performer!"
          changeType="positive"
          icon={<Trophy className="w-6 h-6" />}
        />
      </div>

      {/* Disbursements + Payouts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Disbursements */}
        <Card className="p-6 shadow-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold font-display text-foreground">
              Recent Disbursements
            </h3>
            <Button variant="ghost" size="sm">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="space-y-4">
            {recentDisbursements.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary/80 transition-colors"
              >
                <div>
                  <p className="font-medium text-foreground">
                    {item.customer}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {getLoanTypeLabel(item.loanType)} • {item.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-foreground">
                    {formatCurrency(item.amount)}
                  </p>
                  <p className="text-sm text-emerald-600 font-medium">
                    +{formatCurrency(item.commission)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Pending Payouts */}
        <Card className="p-6 shadow-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold font-display text-foreground">
              Pending Payouts
            </h3>
            <Badge variant="warning">
              {pendingPayouts.length} pending
            </Badge>
          </div>

          <div className="space-y-4">
            {pendingPayouts.map((payout) => (
              <div
                key={payout.id}
                className="flex items-center justify-between p-4 rounded-xl bg-secondary/50"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      payout.status === 'approved'
                        ? 'bg-emerald-100'
                        : 'bg-amber-100'
                    }`}
                  >
                    {payout.status === 'approved' ? (
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Clock className="w-5 h-5 text-amber-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-foreground">
                      {formatCurrency(payout.amount)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Expected: {payout.expectedDate}
                    </p>
                  </div>
                </div>

                <Badge
                  variant={
                    payout.status === 'approved' ? 'success' : 'warning'
                  }
                >
                  {payout.status}
                </Badge>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <div className="flex items-center justify-between">
              <span className="font-medium text-emerald-700">
                Total Pending
              </span>
              <span className="text-xl font-bold text-emerald-700">
                {formatCurrency(
                  pendingPayouts.reduce((sum, p) => sum + p.amount, 0)
                )}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Leaderboard */}
      <PartnerLeaderboard />
    </>
  );
}
