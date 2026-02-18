import { X, Shield, Users, Handshake } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SwitchRoleModal({ open, onClose }: Props) {
  const { switchRole } = useAuth();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-xl animate-in zoom-in-95">

        {/* HEADER */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-lg font-bold">Switch Role</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-4">

          <RoleCard
            icon={<Shield />}
            title="Admin"
            desc="Full system access"
            onClick={() => switchRole("admin")}
          />

          <RoleCard
            icon={<Users />}
            title="Employee"
            desc="Lead & sales operations"
            onClick={() => switchRole("employee")}
          />

          <RoleCard
            icon={<Handshake />}
            title="Partner"
            desc="DSA & payout tracking"
            onClick={() => switchRole("partner")}
          />

        </div>
      </div>
    </div>
  );
}

/* ROLE CARD */
function RoleCard({
  icon,
  title,
  desc,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 p-4 rounded-2xl border hover:bg-muted transition"
    >
      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
        {icon}
      </div>

      <div className="text-left">
        <p className="font-semibold">{title}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
    </button>
  );
}
