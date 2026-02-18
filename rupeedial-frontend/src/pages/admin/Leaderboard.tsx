import { useEffect, useState } from "react";
import { Trophy, ArrowUp, ArrowDown, BarChart3 } from "lucide-react";
import Confetti from "react-confetti";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { echo } from "@/main";   // ✅ ADD THIS

interface Leader {
  id: number;
  name: string;
  role: string;
  revenue: number;
  leads: number;
  previousRank?: number;
}

export default function Leaderboard() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [confetti, setConfetti] = useState(false);
  const [view, setView] = useState<"table" | "graph">("table");
  const [filter, setFilter] = useState<"weekly" | "monthly">("monthly");

  /* =============================
     SORT WITH RANK TRACKING
  ============================= */

  const sortWithRank = (data: Leader[]) => {
    const sorted = [...data].sort((a, b) => b.revenue - a.revenue);

    return sorted.map((leader, index) => ({
      ...leader,
      previousRank:
        leaders.findIndex((l) => l.id === leader.id) + 1 || index + 1,
    }));
  };

  /* =============================
     🔥 REAL BACKEND LISTENER
  ============================= */

 useEffect(() => {
  echo.channel("leaderboard")
    .listen(".leaderboard.updated", (e: any) => {
      const sorted = sortWithRank(e.leaders);

      if (leaders[0]?.id !== sorted[0]?.id) {
        triggerConfetti();
        playSound();
      }

      setLeaders(sorted);
    });

  return () => {
    echo.leave("leaderboard");
  };
}, []);


  /* ============================= */

  const triggerConfetti = () => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 3000);
  };

  const playSound = () => {
    const audio = new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3"
    );
    audio.play();
  };

  const graphData = leaders.map((l) => ({
    name: l.name.split(" ")[0],
    revenue: l.revenue,
  }));

  return (
    <div className="p-8 bg-background min-h-screen text-foreground space-y-6">
      {confetti && <Confetti numberOfPieces={250} />}

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Trophy className="text-yellow-500" />
          <h1 className="text-2xl font-bold">Smart Leaderboard</h1>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setView("table")}
            className={`px-4 py-2 rounded-lg ${
              view === "table" ? "bg-emerald-600 text-white" : "bg-muted"
            }`}
          >
            Table
          </button>

          <button
            onClick={() => setView("graph")}
            className={`px-4 py-2 rounded-lg ${
              view === "graph" ? "bg-emerald-600 text-white" : "bg-muted"
            }`}
          >
            <BarChart3 size={16} />
          </button>

          <button
            onClick={() =>
              setFilter(filter === "monthly" ? "weekly" : "monthly")
            }
            className="px-4 py-2 rounded-lg bg-muted"
          >
            {filter === "monthly" ? "Monthly" : "Weekly"}
          </button>
        </div>
      </div>

      {/* AI INSIGHTS */}
      <div className="bg-card p-4 rounded-xl border">
        <p className="font-semibold">🧠 AI Performance Insights</p>
        <p className="text-sm text-muted-foreground mt-1">
          {leaders[0]?.name} is leading strongly.
          {leaders[1]?.name} is catching up fast.
        </p>
      </div>

      {/* GRAPH VIEW */}
      {view === "graph" && (
        <div className="bg-card p-6 rounded-xl h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={graphData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* TABLE VIEW */}
      {view === "table" && (
        <div className="bg-card p-6 rounded-xl space-y-3">
          <AnimatePresence>
            {leaders.map((leader, index) => {
              const currentRank = index + 1;
              const prevRank = leader.previousRank || currentRank;
              const movedUp = currentRank < prevRank;
              const movedDown = currentRank > prevRank;

              return (
                <motion.div
                  key={leader.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex justify-between items-center p-4 rounded-xl border ${
                    currentRank === 1
                      ? "border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20"
                      : "border-border"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-bold w-6">{currentRank}</span>
                    <div>
                      <p className="font-medium">{leader.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {leader.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {movedUp && (
                      <ArrowUp className="text-green-600 animate-bounce" />
                    )}
                    {movedDown && (
                      <ArrowDown className="text-red-600 animate-bounce" />
                    )}

                    <div className="w-40 bg-muted rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="h-2 bg-emerald-600"
                        animate={{
                          width: `${
                            (leader.revenue / leaders[0]?.revenue) * 100
                          }%`,
                        }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>

                    <p className="font-semibold text-emerald-600 w-28 text-right">
                      ₹ {leader.revenue.toLocaleString()}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
