import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { isAIEnabled, toggleAI } from "@/lib/aiSettings";
import { Sparkles } from "lucide-react";

export function AIToggle() {
  const [enabled, setEnabled] = useState(isAIEnabled());

  const onToggle = () => {
    const value = toggleAI();
    setEnabled(value);
  };

  return (
    <div className="flex items-center gap-3 bg-secondary/50 px-4 py-2 rounded-xl">
      <Sparkles className="w-4 h-4 text-emerald-500" />
      <span className="text-sm font-medium">
        AI Auto-Move
      </span>

      <Switch checked={enabled} onCheckedChange={onToggle} />

      <span className="text-xs text-muted-foreground">
        {enabled ? "ON" : "OFF"}
      </span>
    </div>
  );
}
