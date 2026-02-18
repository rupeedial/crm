export interface AutoAssignRule {
  id: string;
  city?: string;        // Mumbai, Delhi
  product?: string;     // PL, BL, HL
  assignedTo: string;   // userId
  priority: number;     // higher = stronger
  enabled: boolean;
}
