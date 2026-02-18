import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

import {
  Shield,
  Users,
  UserCheck,
  Building2,
  ChevronRight,
  Sparkles,
  TrendingUp,
  IndianRupee,
} from "lucide-react";


import { UserRole } from "@/types";
import { useAuth } from "@/context/AuthContext";

/* ================= ROLE CONFIG ================= */

const roles: {
  id: UserRole;
  label: string;
  description: string;
  icon: React.ElementType;
  color: string;
}[] = [
  {
    id: "admin",
    label: "Admin",
    description: "Full system control & analytics",
    icon: Shield,
    color: "from-red-500 to-orange-500",
  },
  {
    id: "employee",
    label: "Employee",
    description: "Manage leads & earn commissions",
    icon: Users,
    color: "from-blue-500 to-indigo-500",
  },
  {
  id: "partner",
  label: "Partner / DSA",
  description: "Track files & payouts",
  icon: UserCheck, // ✅ FIXED
  color: "from-emerald-500 to-teal-500",
},

  {
    id: "bank",
    label: "Bank User",
    description: "Process assigned files",
    icon: Building2,
    color: "from-purple-500 to-pink-500",
  },
];

/* ================= COMPONENT ================= */

export default function LoginPage() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  /* 🔐 DEMO LOGIN (ROLE CLICK) */
  const handleRoleClick = (role: UserRole) => {
    setAuth({
      role,
      userId: "1",
    });

    navigate(`/dashboard/${role}`);
  };

  return (
    <div className="min-h-screen gradient-hero flex flex-col">
      {/* ================= HEADER ================= */}
      <header className="p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center">
              <IndianRupee className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">
              RupeeDial
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-white/70 text-sm">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Loan CRM</span>
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-5xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Welcome to Your
              <span className="block mt-2 text-emerald-400">
                Smart Loan Dashboard
              </span>
            </h1>
            <p className="text-white/70 text-lg">
              AI-powered lead scoring & complete loan lifecycle management
            </p>
          </div>

          {/* ================= ROLE CARDS ================= */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {roles.map((role) => (
              <Card
                key={role.id}
                onClick={() => handleRoleClick(role.id)}
                className="relative cursor-pointer group
                  bg-white/10 backdrop-blur-xl border-white/20
                  hover:bg-white/20 transition-all hover:scale-105"
              >
                <div className="p-6">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${role.color}
                    flex items-center justify-center mb-4`}
                  >
                    <role.icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-1">
                    {role.label}
                  </h3>

                  <p className="text-sm text-white/60 mb-4">
                    {role.description}
                  </p>

                  <div className="flex items-center text-emerald-400 text-sm font-medium">
                    Enter Dashboard
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* ================= FEATURES ================= */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { icon: Sparkles, label: "AI Lead Scoring" },
              { icon: TrendingUp, label: "Auto Assignment" },
              { icon: IndianRupee, label: "Commission Simulator" },
            ].map((f) => (
              <div
                key={f.label}
                className="flex flex-col items-center gap-2 p-4 rounded-xl
                bg-white/5 border border-white/10"
              >
                <f.icon className="w-5 h-5 text-emerald-400" />
                <span className="text-xs text-white/70 text-center">
                  {f.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="p-6 text-center text-white/40 text-sm">
        © 2024 RupeeDial. All rights reserved.
      </footer>
    </div>
  );
}
