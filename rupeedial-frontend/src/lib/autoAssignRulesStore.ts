import { AutoAssignRule } from "@/types/AutoAssignRule";

let RULES: AutoAssignRule[] = [];

export const getRules = () => RULES;

export const addRule = (rule: AutoAssignRule) => {
  RULES.push(rule);
};

export const updateRule = (rule: AutoAssignRule) => {
  RULES = RULES.map(r => (r.id === rule.id ? rule : r));
};

export const toggleRule = (id: string) => {
  RULES = RULES.map(r =>
    r.id === id ? { ...r, enabled: !r.enabled } : r
  );
};

export const deleteRule = (id: string) => {
  RULES = RULES.filter(r => r.id !== id);
};
