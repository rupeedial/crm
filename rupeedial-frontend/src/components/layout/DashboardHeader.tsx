import { useState } from "react";
import { Search, Bell, LogOut, Settings, RefreshCcw } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function DashboardHeader() {
  const { logout, role } = useAuth();
  const [open, setOpen] = useState(false);
  const [switchOpen, setSwitchOpen] = useState(false);

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">

      {/* SEARCH */}
      <div className="relative w-[420px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <input
          placeholder="Search leads, customers, partners..."
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-muted/40 border focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {/* RIGHT ACTIONS */}
      <div className="flex items-center gap-4 relative">

        {/* NOTIFICATION */}
        <button className="p-2 rounded-xl hover:bg-muted">
          <Bell className="w-5 h-5" />
        </button>

        {/* PROFILE */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 bg-muted px-3 py-2 rounded-xl hover:bg-muted/80"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
            A
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold leading-none">Amit Singh</p>
            <p className="text-xs text-muted-foreground capitalize">
              {role}
            </p>
          </div>
        </button>

        {/* DROPDOWN */}
        {open && (
          <div className="absolute right-0 top-14 w-56 bg-white border rounded-2xl shadow-xl overflow-hidden z-50">

            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted">
              <Settings className="w-4 h-4" />
              Settings
            </button>

            <button
  onClick={() => setSwitchOpen(true)}
  className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted"
>
  <RefreshCcw className="w-4 h-4" />
  Switch Role
</button>


            <div className="border-t" />

            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
