export type FollowUpType = "today" | "past" | "future";

export const getFollowUpType = (
  followUpDate?: Date
): FollowUpType | null => {
  if (!followUpDate) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const date = new Date(followUpDate);
  date.setHours(0, 0, 0, 0);

  if (date.getTime() === today.getTime()) return "today";
  if (date.getTime() < today.getTime()) return "past";
  return "future";
};
