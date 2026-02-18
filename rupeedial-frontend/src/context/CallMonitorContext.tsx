import React, { createContext, useContext, useState } from "react";

interface ActiveCall {
  userId: string;
  userName: string;
  leadName: string;
  phone: string;
  startedAt: string;
}

interface CallContextType {
  activeCalls: ActiveCall[];
  startCall: (call: ActiveCall) => void;
  endCall: (userId: string) => void;
}

const CallMonitorContext =
  createContext<CallContextType | null>(null);

export const useCallMonitor = () => {
  const ctx = useContext(CallMonitorContext);
  if (!ctx)
    throw new Error("CallMonitor not found");
  return ctx;
};

export const CallMonitorProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [activeCalls, setActiveCalls] =
    useState<ActiveCall[]>([]);

  const startCall = (call: ActiveCall) => {
    setActiveCalls((prev) => [
      ...prev.filter((c) => c.userId !== call.userId),
      call,
    ]);
  };

  const endCall = (userId: string) => {
    setActiveCalls((prev) =>
      prev.filter((c) => c.userId !== userId)
    );
  };

  return (
    <CallMonitorContext.Provider
      value={{ activeCalls, startCall, endCall }}
    >
      {children}
    </CallMonitorContext.Provider>
  );
};
