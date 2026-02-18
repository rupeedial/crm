import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Tooltip } from "@/components/common/Tooltip";
import {
  isAIEnabled,
  toggleAI,
  getAIStatusLabel,
} from "@/lib/aiSettings";

export function AIToggle() {
  const [enabled, setEnabled] = useState<boolean>(true);

  useEffect(() => {
    setEnabled(isAIEnabled());
  }, []);

  const handleToggle = () => {
    const value = toggleAI();
    setEnabled(value);
  };

  return (
    <div className="flex items-center gap-3">
      <Switch checked={enabled} onCheckedChange={handleToggle} />

      <span className="text-sm font-medium">
        {enabled ? "AI Automation ON" : "AI Automation OFF"}
      </span>

      <Tooltip
        text={
          enabled
            ? "AI will auto-move high confidence leads in pipeline"
            : "All lead movements require manual confirmation"
        }
      />
    </div>
  );
}
