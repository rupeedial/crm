export function getSourceStats(leads: Lead[]) {
  const map: Record<string, number> = {};

  leads.forEach((l) => {
    map[l.source] = (map[l.source] || 0) + 1;
  });

  return map;
}
