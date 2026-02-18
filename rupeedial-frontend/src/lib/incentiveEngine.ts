export const calculateBonus = (score: number) => {
  if (score >= 90) return 1.2;
  if (score >= 80) return 1.1;
  return 1;
};
