import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { PhoneCall, Clock, AlertTriangle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getTelecallerQueue } from "@/api/telecaller";

interface QueueLead {
  id: string;
  customer_name: string;
  phone: string;
  priority: "FRESH" | "CALLBACK" | "OVERDUE";
  follow_up_at?: string;
}

export default function TelecallerQueueWidget() {
  const { user } = useAuth();
  const [queue, setQueue] = useState<QueueLead[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= SAFE API FUNCTION ================= */
  const getTelecallerQueue = async (
    userId: string
  ): Promise<QueueLead[]> => {
    try {
      // 🔥 Replace with real API later
      // const res = await axios.get(`/api/employee/${userId}/queue`);
      // return res.data;

      return []; // safe fallback
    } catch (error) {
      console.error("Queue API error:", error);
      return [];
    }
  };

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const res = await getTelecallerQueue(user.id);
        setQueue(res);
      } catch (error) {
        console.error("Widget error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const badge = (type: QueueLead["priority"]) => {
    if (type === "FRESH")
      return "bg-green-100 text-green-700";
    if (type === "CALLBACK")
      return "bg-amber-100 text-amber-700";
    return "bg-red-100 text-red-700";
  };

  const icon = (type: QueueLead["priority"]) => {
    if (type === "FRESH") return <PhoneCall size={14} />;
    if (type === "CALLBACK") return <Clock size={14} />;
    return <AlertTriangle size={14} />;
  };

  return (
    <Card className="p-5">
      <h3 className="font-semibold text-lg mb-3">
        📞 Telecaller Queue
      </h3>

      {loading && (
        <p className="text-sm text-slate-500">
          Loading call queue...
        </p>
      )}

      {!loading && queue.length === 0 && (
        <p className="text-sm text-slate-500">
          No calls pending
        </p>
      )}

      <div className="space-y-3">
        {queue.map((lead) => (
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
            </div>

            <span
              className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${badge(
                lead.priority
              )}`}
            >
              {icon(lead.priority)}
              {lead.priority}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
