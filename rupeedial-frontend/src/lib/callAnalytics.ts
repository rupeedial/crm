export function getTodayCallStats(
  callLogs: any[] = [],
  userId: string
) {
  if (!Array.isArray(callLogs)) {
    callLogs = [];
  }

  const today = new Date().toDateString();

  const todayLogs = callLogs.filter(
    (log) =>
      log.userId === userId &&
      new Date(log.startedAt).toDateString() === today
  );

  const totalCalls = todayLogs.length;

  const connected = todayLogs.filter(
    (l) => l.outcome === "CONNECTED"
  ).length;

  const avgDuration =
    totalCalls === 0
      ? 0
      : Math.floor(
          todayLogs.reduce(
            (sum, l) =>
              sum + (l.duration || 0),
            0
          ) / totalCalls
        );

  return {
    totalCalls,
    connected,
    avgDuration,
  };
}
