import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  Users,
  UserCheck,
  Building2,
  Mail,
  Lock,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types";

/* ================= ROLE CONFIG ================= */

const roles: {
  id: UserRole;
  label: string;
  description: string;
  icon: React.ElementType;
}[] = [
  {
    id: "admin",
    label: "Admin",
    description: "Full access & analytics control",
    icon: Shield,
  },
  {
    id: "employee",
    label: "Employee",
    description: "Lead handling & commissions",
    icon: Users,
  },
  {
    id: "partner",
    label: "Partner / DSA",
    description: "Track files & payouts",
    icon: UserCheck,
  },
  {
    id: "bank",
    label: "Bank User",
    description: "Verify & process applications",
    icon: Building2,
  },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
const [showForgot, setShowForgot] = useState(false);
const [resetEmail, setResetEmail] = useState("");
const [resetSent, setResetSent] = useState(false);

  const [selectedRole, setSelectedRole] =
    useState<UserRole>("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    setAuth({
      role: selectedRole,
      userId: "1",
    });

    navigate(`/dashboard/${selectedRole}`);
  };

  return (
    <div className="min-h-screen bg-[#0f1117] flex items-center justify-center p-6 relative overflow-hidden">

      {/* Background Glow Effects */}
      <div className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl top-[-100px] left-[-100px]" />
      <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-3xl bottom-[-100px] right-[-100px]" />

      <div className="w-full max-w-5xl grid lg:grid-cols-2 bg-[#161b22] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">

        {/* LEFT PANEL */}
        <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-[#1f2937] to-[#111827] text-white">

          <h1 className="text-4xl font-bold mb-6">
            Enterprise Loan CRM
          </h1>

          <p className="text-gray-400 text-lg mb-8">
            Secure role-based access for loan lifecycle
            management, commission automation and
            operational analytics.
          </p>

          <div className="space-y-4 text-sm text-gray-400">
            <div>✔ Bank-grade security</div>
            <div>✔ Real-time performance tracking</div>
            <div>✔ AI powered workflow automation</div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="p-10">

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white">
              Sign in to Continue
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Select your role and enter credentials
            </p>
          </div>

          {/* ROLE GRID */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {roles.map((role) => (
              <div
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`cursor-pointer p-4 rounded-xl border transition-all
                ${
                  selectedRole === role.id
                    ? "border-purple-500 bg-purple-500/10"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >
                <role.icon
                  className={`mb-2 ${
                    selectedRole === role.id
                      ? "text-purple-400"
                      : "text-gray-400"
                  }`}
                  size={20}
                />
                <p className="text-white font-medium">
                  {role.label}
                </p>
                <p className="text-xs text-gray-400">
                  {role.description}
                </p>
              </div>
            ))}
          </div>

          {/* LOGIN FORM */}
          <form onSubmit={handleLogin} className="space-y-5">

            <div>
              <label className="text-sm text-gray-400 mb-2 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-gray-500" size={18} />
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0f1117] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-gray-500" size={18} />
                <input
                  type="password"
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0f1117] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>
              <div className="text-right">
  <button
    type="button"
    onClick={() => setShowForgot(true)}
    className="text-sm text-purple-400 hover:text-purple-300 transition"
  >
    Forgot Password?
  </button>
</div>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 transition text-white font-semibold py-3 rounded-xl shadow-lg shadow-purple-900/40"
            >
              Continue as{" "}
              {roles.find((r) => r.id === selectedRole)?.label}
            </button>
          </form>

          <div className="text-gray-500 text-xs mt-8 text-center">
            © 2026 Enterprise CRM. All rights reserved.
          </div>
        </div>
      </div>
      {/* FORGOT PASSWORD MODAL */}
{showForgot && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

    <div className="bg-[#161b22] border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-2xl">

      {!resetSent ? (
        <>
          <h3 className="text-xl font-semibold text-white mb-4">
            Reset Password
          </h3>

          <p className="text-gray-400 text-sm mb-6">
            Enter your registered email and we’ll send you reset instructions.
          </p>

          <input
            type="email"
            placeholder="Enter your email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            className="w-full bg-[#0f1117] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500 focus:outline-none mb-4"
          />

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowForgot(false)}
              className="px-4 py-2 rounded-lg bg-white/10 text-gray-300 hover:bg-white/20"
            >
              Cancel
            </button>

            <button
              onClick={() => setResetSent(true)}
              className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
            >
              Send Reset Link
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-xl font-semibold text-white mb-4">
            Email Sent ✅
          </h3>

          <p className="text-gray-400 text-sm mb-6">
            If an account exists with <b>{resetEmail}</b>,  
            you’ll receive password reset instructions.
          </p>

          <button
            onClick={() => {
              setShowForgot(false);
              setResetSent(false);
              setResetEmail("");
            }}
            className="w-full py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
          >
            Close
          </button>
        </>
      )}

    </div>
  </div>
)}

    </div>
  );
}
