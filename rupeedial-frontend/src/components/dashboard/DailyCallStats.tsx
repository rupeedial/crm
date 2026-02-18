import React from "react";
import { PhoneCall, TrendingUp } from "lucide-react";

interface Props {
  total: number;
  connected: number;
  avgDuration: number;
  connectRate: number;
}

const DailyCallStats: React.FC<Props> = ({
  total,
  connected,
  avgDuration,
  connectRate,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow border space-y-4">
      <h3 className="font-bold text-lg">
        📊 Today Performance
      </h3>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-slate-500">Total Calls</p>
          <p className="font-bold text-lg">{total}</p>
        </div>

        <div>
          <p className="text-slate-500">Connected</p>
          <p className="font-bold text-lg">{connected}</p>
        </div>

        <div>
          <p className="text-slate-500">Connect Rate</p>
          <p className="font-bold text-lg">
            {connectRate}%
          </p>
        </div>

        <div>
          <p className="text-slate-500">
            Avg Duration
          </p>
          <p className="font-bold text-lg">
            {avgDuration}s
          </p>
        </div>
      </div>
    </div>
  );
};

export default DailyCallStats;
