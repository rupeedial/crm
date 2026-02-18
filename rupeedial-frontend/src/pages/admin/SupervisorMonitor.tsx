import React from "react";
import LiveCallBoard from "@/components/admin/LiveCallBoard";

const SupervisorMonitor = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-black">
        Supervisor Monitoring
      </h1>

      <LiveCallBoard />
    </div>
  );
};

export default SupervisorMonitor;
