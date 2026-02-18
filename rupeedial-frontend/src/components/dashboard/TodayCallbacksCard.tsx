import { PhoneCall } from "lucide-react";
import { Lead } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";

interface Props {
  leads: Lead[];
}

export default function TodayCallbacksCard({ leads }: Props) {
  const { user } = useAuth();

  if (!user) return null;

  const today = new Date().toDateString();

  const callbacks = leads.filter(
    (l) =>
      l.assignedTo === user.id &&
      l.followUpAt &&
      new Date(l.followUpAt).toDateString() === today
  );

  return (
    <div className="bg-white rounded-2xl shadow border p-6">
      <div className="flex items-center gap-3">
        <div className="bg-amber-100 text-amber-600 p-3 rounded-xl">
          <PhoneCall size={20} />
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Today Callbacks
          </p>
          <p className="text-2xl font-black">
            {callbacks.length}
          </p>
        </div>
      </div>

      <Link
        to="/dashboard/employee/leads"
        className="inline-block mt-4 text-sm font-bold text-amber-600"
      >
        View Follow-ups →
      </Link>
    </div>
  );
}
