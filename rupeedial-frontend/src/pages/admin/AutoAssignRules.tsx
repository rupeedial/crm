import { useState } from "react";
import { getRules, addRule } from "@/lib/autoAssignRulesStore";
import RuleForm from "@/components/admin/RuleForm";
import RuleTable from "@/components/admin/RuleTable";

export default function AutoAssignRules() {
  const [rules, setRules] = useState(getRules());

  const handleAdd = (rule) => {
    addRule(rule);
    setRules([...getRules()]);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Auto Assign Rules</h1>

      <RuleForm onSave={handleAdd} />
      <RuleTable rules={rules} />
    </div>
  );
}
