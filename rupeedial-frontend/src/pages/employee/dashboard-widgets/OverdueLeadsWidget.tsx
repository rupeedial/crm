import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { AlertTriangle, PhoneCall } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getOverdueLeads } from "@/api/telecaller";

interface OverdueLead {
  id: string;
  customer_name: string;
  phone: string;
  follow_up_at: string;
  minutes_late: number;
}

export default function OverdueLeadsWidget() {
  const { user } = useAuth();
  const [leads, setLeads] = useState<OverdueLead[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= SAFE FRONTEND MODE ================= */
  const getOverdueLeads = async (
    userId: string
  ): Promise<OverdueLead[]> => {
    try {
      // 🔥 When backend ready, replace this with API call
      // const res = await axios.get(`/api/employee/${userId}/overdue`);
      // return res.data;

      return []; // temporary safe data
    } catch (error) {
      console.error("Overdue API error:", error);
      return [];
    }
  };

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const res = await getOverdueLeads(user.id);
        setLeads(res);
      } catch (error) {
        console.error("Widget error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  return (
    <Card className="p-5 border-red-200 bg-red-50">
      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-red-700">
        <AlertTriangle size={18} />
        Missed / Overdue Leads
      </h3>

      {loading && (
        <p className="text-sm text-slate-500">
          Checking overdue leads...
        </p>
      )}

      {!loading && leads.length === 0 && (
        <p className="text-sm text-slate-600">
          No overdue leads 🎉
        </p>
      )}

      <div className="space-y-3">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="flex justify-between items-center bg-white border rounded-lg p-3"
          >
            <div>
              <p className="font-medium">
                {lead.customer_name}
              </p>
              <p className="text-xs text-slate-500">
                📞 {lead.phone}
              </p>
              <p className="text-xs text-red-600 font-semibold">
                ⏱ {lead.minutes_late} min overdue
              </p>
            </div>

            <button
              className="flex items-center gap-1 text-xs bg-red-600 text-white px-3 py-1 rounded"
              onClick={() =>
                alert(`Call ${lead.phone}`)
              }
            >
              <PhoneCall size={14} />
              Call Now
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}
