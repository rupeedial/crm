import { useEffect, useRef, useState } from "react";

export function useCallTimer(active: boolean) {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (active) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [active]);

  const reset = () => setSeconds(0);

  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;

  return {
    seconds,
    formatted: `${minutes.toString().padStart(2, "0")}:${remaining
      .toString()
      .padStart(2, "0")}`,
    reset,
  };
}
