import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "@/components/layout/Topbar";
import { useAuth } from "@/context/AuthContext";

export default function DashboardLayout() {
  const { role } = useAuth(); // ✅ single source of truth

  if (!role) {
    return null; // or loader
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar role={role} />

   <div className="flex-1 flex flex-col">

  {/* HEADER */}
  <header className="h-16 bg-white border-b flex items-center justify-between px-8 shadow-sm">

    {/* LEFT SIDE - SEARCH */}
    <div className="w-96">
      <input
        type="text"
        placeholder="Search leads, campaigns..."
        className="w-full px-4 py-2 rounded-xl border border-gray-200 
                   focus:outline-none focus:ring-2 focus:ring-emerald-500
                   text-sm bg-gray-50"
      />
    </div>

    {/* RIGHT SIDE - PROFILE */}
    <Topbar />

  </header>

  {/* PAGE CONTENT */}
  <main className="flex-1 overflow-y-auto p-6 bg-muted/30">
    <Outlet />
  </main>

</div>


    </div>
  );
}
