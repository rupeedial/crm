import { PhoneCall, Bell } from "lucide-react";

export default function TelecallerDashboardCards({ data }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* New Leads Today */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <div className="flex items-center gap-3">
          <PhoneCall className="text-blue-600" />
          <h3 className="font-semibold">New Leads Today</h3>
        </div>
        <p className="text-3xl font-bold mt-4">
          {data.new_leads_today}
        </p>
      </div>

      {/* Today Callbacks */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <div className="flex items-center gap-3">
          <Bell className="text-amber-600" />
          <h3 className="font-semibold">Today Callbacks</h3>
        </div>

        <p className="text-sm text-muted-foreground mt-2">
          {data.today_callbacks.length} calls scheduled
        </p>
      </div>

    </div>
  );
}
