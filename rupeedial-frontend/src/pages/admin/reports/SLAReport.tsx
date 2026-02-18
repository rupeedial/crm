export function getSLAMetrics(leads: Lead[]) {
  let total = 0;
  let overdue = 0;

  leads.forEach((l) => {
    if (!l.followUpAt || !l.slaMinutes) return;
    total++;

    const due =
      new Date(l.followUpAt).getTime() +
      l.slaMinutes * 60 * 1000;
    if (Date.now() > due) overdue++;
  });

  return {
    total,
    overdue,
    compliance:
      total === 0 ? 100 : Math.round(((total - overdue) / total) * 100),
  };
}
