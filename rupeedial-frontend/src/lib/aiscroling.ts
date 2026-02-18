export function calculateAIScore(lead: {
  income: number;
  creditScore: number;
  loanAmount: number;
}) {
  let score = 0;

  if (lead.creditScore >= 750) score += 40;
  if (lead.income >= 30000) score += 30;
  if (lead.loanAmount <= lead.income * 20) score += 30;

  return score; // out of 100
}
