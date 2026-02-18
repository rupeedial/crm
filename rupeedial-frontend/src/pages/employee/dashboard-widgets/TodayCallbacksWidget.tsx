import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Clock, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getTodayCallbacks } from "@/api/telecaller";

interface CallbackLead {
  id: string;
  customer_name: string;
  phone: string;
  follow_up_at: string;
  minutes_late: number;
  overdue: boolean;
}

export default function TodayCallbacksWidget() {
  const { user } = useAuth();
  const [callbacks, setCallbacks] = useState<CallbackLead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    getTodayCallbacks(user.id)
      .then((res) => setCallbacks(res))
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <Card className="p-5">
      <h3 className="font-semibold text-lg mb-3">
        ⏰ Today Callbacks
      </h3>

      {loading && (
        <p className="text-sm text-slate-500">
          Loading follow-ups...
        </p>
      )}

      {!loading && callbacks.length === 0 && (
        <p className="text-sm text-slate-500">
          No callbacks for today 🎉
        </p>
      )}

      <div className="space-y-3">
        {callbacks.map((lead) => (
          <div
            key={lead.id}
            className="flex justify-between items-center border rounded-lg p-3"
          >
            <div>
              <p className="font-medium">
                {lead.customer_name}
              </p>
              <p className="text-xs text-slate-500">
                📞 {lead.phone}
              </p>
              <p className="text-xs text-slate-400">
                Follow-up:{" "}
                {new Date(
                  lead.follow_up_at
                ).toLocaleTimeString()}
              </p>
            </div>

            {lead.overdue ? (
              <span className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-red-100 text-red-700">
                <AlertCircle size={14} />
                {lead.minutes_late} min late
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-green-100 text-green-700">
                <Clock size={14} />
                On time
              </span>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
