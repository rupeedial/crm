import React from "react";
import { useCallMonitor } from "@/context/CallMonitorContext";

const LiveCallBoard = () => {
  const { activeCalls } = useCallMonitor();

  return (
    <div className="bg-white rounded-2xl p-6 shadow border space-y-4">
      <h3 className="font-bold text-lg">
        📡 Live Call Monitoring
      </h3>

      {activeCalls.length === 0 && (
        <p className="text-sm text-slate-500">
          No active calls
        </p>
      )}

      {activeCalls.map((call) => (
        <div
          key={call.userId}
          className="border rounded-xl p-4 flex justify-between"
        >
          <div>
            <p className="font-bold">
              {call.userName}
            </p>
            <p className="text-xs text-slate-500">
              {call.leadName}
            </p>
            <p className="text-xs">
              📞 {call.phone}
            </p>
          </div>

          <span className="text-xs text-emerald-600 font-bold">
            LIVE
          </span>
        </div>
      ))}
    </div>
  );
};

export default LiveCallBoard;
