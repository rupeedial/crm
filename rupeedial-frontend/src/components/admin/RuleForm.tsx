import { useState } from "react";
import { AutoAssignRule } from "@/types/AutoAssignRule";
import { Button } from "@/components/ui/button";

export default function RuleForm({ onSave }: { onSave: (r: AutoAssignRule) => void }) {
  const [city, setCity] = useState("");
  const [product, setProduct] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [priority, setPriority] = useState(50);

  const handleSubmit = () => {
    onSave({
      id: crypto.randomUUID(),
      city,
      product,
      assignedTo,
      priority,
      enabled: true,
    });
  };

  return (
    <div className="space-y-3">
      <input placeholder="City (Mumbai)" onChange={e => setCity(e.target.value)} />
      <input placeholder="Product (PL / BL)" onChange={e => setProduct(e.target.value)} />
      <input placeholder="Assign To (emp-id)" onChange={e => setAssignedTo(e.target.value)} />
      <input type="number" placeholder="Priority" onChange={e => setPriority(+e.target.value)} />

      <Button onClick={handleSubmit}>Add Rule</Button>
    </div>
  );
}
