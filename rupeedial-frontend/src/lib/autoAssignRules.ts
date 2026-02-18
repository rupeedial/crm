import { AutoAssignRule } from "@/types/AutoAssignRule";

export const AUTO_ASSIGN_RULES: AutoAssignRule[] = [
  {
    id: "MUM_PL",
    city: "Mumbai",
    product: "PL",
    assignedTo: "emp-mumbai-pl",
    priority: 100,
  },
  {
    id: "DEL_BL",
    city: "Delhi",
    product: "BL",
    assignedTo: "emp-delhi-bl",
    priority: 90,
  },
  {
    id: "HL_ALL",
    product: "HL",
    assignedTo: "emp-home-loan",
    priority: 80,
  },
];
