import { Phone, BarChart2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  onOpen: (type: "today" | "telecaller" | "source") => void;
}

export function PerformanceActions({ onOpen }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Button
        variant="outline"
        className="h-20 flex gap-3"
        onClick={() => onOpen("today")}
      >
        <Phone />
        Today Telecaller Performance
      </Button>

      <Button
        variant="outline"
        className="h-20 flex gap-3"
        onClick={() => onOpen("telecaller")}
      >
        <BarChart2 />
        Telecaller Performance
      </Button>

      <Button
        variant="outline"
        className="h-20 flex gap-3"
        onClick={() => onOpen("source")}
      >
        <Globe />
        Lead Source Performance
      </Button>
    </div>
  );
}
