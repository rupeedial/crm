import React from "react";
import { PhoneCall } from "lucide-react";

interface Props {
  time: string;
}

const CallTimer: React.FC<Props> = ({ time }) => {
  return (
    <div className="flex items-center gap-2 text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
      <PhoneCall size={14} />
      {time}
    </div>
  );
};

export default CallTimer;
