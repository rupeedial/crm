import React from "react";
import { getSLAStatus } from "@/utils/sla";

interface Lead {
  id: string;
  followUpAt?: string;
  slaMinutes?: number;
}

interface Props {
  leads: Lead[];
}

const SLAHeatmap: React.FC<Props> = ({ leads }) => {
  let overdue = 0;
  let dueSoon = 0;
  let safe = 0;

  leads.forEach((lead) => {
    const status = getSLAStatus(lead);

    if (status === "OVERDUE") overdue++;
    else if (status === "DUE_SOON") dueSoon++;
    else safe++;
  });

  return (
    <div className="bg-white rounded-2xl p-6 shadow border space-y-4">
      <h3 className="font-bold text-lg">
        🔥 SLA Heatmap
      </h3>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-red-50 p-4 rounded-xl">
          <p className="text-sm text-red-500">
            Overdue
          </p>
          <p className="text-2xl font-bold text-red-600">
            {overdue}
          </p>
        </div>

        <div className="bg-amber-50 p-4 rounded-xl">
          <p className="text-sm text-amber-500">
            Due Soon
          </p>
          <p className="text-2xl font-bold text-amber-600">
            {dueSoon}
          </p>
        </div>

        <div className="bg-emerald-50 p-4 rounded-xl">
          <p className="text-sm text-emerald-500">
            On Time
          </p>
          <p className="text-2xl font-bold text-emerald-600">
            {safe}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SLAHeatmap;
