import { AutoAssignRule } from "@/types/AutoAssignRule";
import { toggleRule, deleteRule } from "@/lib/autoAssignRulesStore";

export default function RuleTable({ rules }: { rules: AutoAssignRule[] }) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr>
          <th>City</th>
          <th>Product</th>
          <th>Assigned To</th>
          <th>Priority</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {rules.map(r => (
          <tr key={r.id}>
            <td>{r.city || "Any"}</td>
            <td>{r.product || "Any"}</td>
            <td>{r.assignedTo}</td>
            <td>{r.priority}</td>
            <td>
              <button onClick={() => toggleRule(r.id)}>
                {r.enabled ? "ON" : "OFF"}
              </button>
            </td>
            <td>
              <button onClick={() => deleteRule(r.id)}>❌</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
