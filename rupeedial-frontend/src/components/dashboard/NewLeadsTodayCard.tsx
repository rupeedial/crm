import { CalendarPlus } from "lucide-react";
import { Lead } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";

interface Props {
  leads: Lead[];
}

export default function NewLeadsTodayCard({
  leads,
}: Props) {
  const { user } = useAuth();

  if (!user) return null;

  const today = new Date().toDateString();

  const todayLeads = leads.filter(
    (l) =>
      l.assignedTo === user.id &&
      l.status === "LEAD" &&
      l.createdAt &&
      new Date(l.createdAt).toDateString() ===
        today
  );

  return (
    <div className="bg-white rounded-2xl shadow border p-6">
      <div className="flex items-center gap-3">
        <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
          <CalendarPlus size={20} />
        </div>

        <div>
          <p className="text-sm text-slate-500">
            New Leads Today
          </p>
          <p className="text-2xl font-black">
            {todayLeads.length}
          </p>
        </div>
      </div>

      <Link
        to="/dashboard/employee/leads"
        className="inline-block mt-4 text-sm font-bold text-blue-600"
      >
        View Leads →
      </Link>
    </div>
  );
}
