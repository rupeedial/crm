import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Phone } from "lucide-react";
import { getNewLeadsToday } from "../../../api/telecaller";
import { useAuth } from "@/context/AuthContext";

interface Lead {
  id: string;
  customer_name: string;
  phone: string;
  assigned_to: string;
  created_at: string;
}

export default function NewLeadsTodayWidget() {
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    getNewLeadsToday(user.id)
      .then((res) => {
        setLeads(res);
      })
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <Card className="p-5">
      <h3 className="font-semibold text-lg mb-3">
        🆕 New Leads Today
      </h3>

      {loading && (
        <p className="text-sm text-slate-500">
          Loading leads...
        </p>
      )}

      {!loading && leads.length === 0 && (
        <p className="text-sm text-slate-500">
          No new leads today
        </p>
      )}

      <div className="space-y-3">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="flex justify-between items-center border rounded-lg p-3"
          >
            <div>
              <p className="font-medium">
                {lead.customer_name}
              </p>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <Phone size={12} /> {lead.phone}
              </p>
            </div>

            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
              NEW
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
