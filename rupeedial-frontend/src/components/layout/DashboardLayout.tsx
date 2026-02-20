
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "@/components/layout/Topbar";
import { useAuth } from "@/context/AuthContext";

export default function DashboardLayout() {
  const { role, loading, user } = useAuth();


  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!role) {
    return (
      <div className="h-screen flex items-center justify-center">
        No Role Found
      </div>
    );
  }

  return (
  <div className="flex h-screen bg-background overflow-hidden">
    
    {/* SIDEBAR */}
    <Sidebar role={role as "admin" | "employee" | "partner"} />

    {/* RIGHT SECTION */}
    <div className="flex-1 flex flex-col min-w-0">

      {/* HEADER */}
      <header className="h-16 bg-white border-b flex items-center justify-between px-8 shadow-sm sticky top-0 z-[1000]">

        {/* SEARCH */}
        <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search leads, campaigns..."
            className="w-full px-4 py-2 rounded-xl border border-gray-200 
                       focus:outline-none focus:ring-2 focus:ring-emerald-500
                       text-sm bg-gray-50"
          />
        </div>

        {/* PROFILE */}
        <div className="ml-6">
          <Topbar />
        </div>

      </header>

      {/* CONTENT */}
      <main className="flex-1 overflow-y-auto p-6 bg-muted/30">
        <Outlet />
      </main>

    </div>
  </div>
);

}
