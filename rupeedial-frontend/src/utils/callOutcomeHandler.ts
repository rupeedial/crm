export function handleCallOutcome(lead, outcome) {
  if (outcome === "CONNECTED") {
    lead.status = "VERIFIED";
  }

  if (outcome === "CALLBACK") {
    lead.followUpAt = new Date(
      Date.now() + 60 * 60 * 1000
    ).toISOString();
  }

  if (outcome === "NOT_INTERESTED") {
    lead.status = "CLOSED";
  }

  return lead;
}
