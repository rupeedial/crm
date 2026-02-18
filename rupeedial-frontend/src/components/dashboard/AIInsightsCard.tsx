import { Brain, AlertTriangle, PhoneCall } from "lucide-react";
import { Card } from "@/components/ui/card";

export function AIInsightsCard() {
  return (
    <Card className="p-5 bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">
          AI Insights
        </h3>
      </div>

      <ul className="space-y-2 text-sm">
        <li className="flex items-center gap-2">
          🔥 <span>5 hot leads need immediate call</span>
        </li>
        <li className="flex items-center gap-2">
          🤖 <span>2 leads auto-qualified by AI</span>
        </li>
        <li className="flex items-center gap-2 text-amber-600">
          <AlertTriangle className="w-4 h-4" />
          <span>3 leads inactive for 48 hrs</span>
        </li>
      </ul>
    </Card>
  );
}
