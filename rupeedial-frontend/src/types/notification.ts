export type NotificationType =
  | "NEW_LEAD"
  | "FOLLOW_UP"
  | "SLA_BREACH";

export interface Notification {
  id: string;
  userId: string; // telecaller id
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}
