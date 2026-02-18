import { TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";

export function PerformanceSnapshot() {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <TrendingUp className="w-5 h-5 text-emerald-600" />
        <h3 className="text-lg font-semibold">Performance Snapshot</h3>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Conversion Rate</span>
            <span className="font-medium">62%</span>
          </div>
          <Progress value={62} />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Monthly Target</span>
            <span className="font-medium">85%</span>
          </div>
          <Progress value={85} />
        </div>
      </div>
    </Card>
  );
}
