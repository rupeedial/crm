import { useState, useRef, useEffect } from "react";
import { User, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";

export default function Topbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  if (!user) return null;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: any) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      
      {/* PROFILE BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 bg-white px-4 py-2 
                   rounded-2xl border border-gray-200 
                   hover:shadow-md transition"
      >
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full 
                        bg-gradient-to-br from-emerald-500 to-purple-600 
                        flex items-center justify-center 
                        text-white font-semibold text-sm">
          {user.name?.charAt(0).toUpperCase()}
        </div>

        <div className="hidden md:block text-left">
          <p className="text-sm font-semibold text-gray-800">
            {user.name}
          </p>
          <p className="text-xs text-gray-500 capitalize">
            {user.role}
          </p>
        </div>
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-3 w-64 
                        bg-white rounded-2xl shadow-2xl 
                        border border-gray-100 overflow-hidden z-50">

          {/* PROFILE LINK */}
          <Link
            to={`/dashboard/${user.role}/profile`}
            className="flex items-center gap-3 px-5 py-4 
                       text-sm hover:bg-gray-50 transition"
          >
            <User size={18} />
            Profile
          </Link>

          {/* LOGOUT */}
          <button
            onClick={logout}
            className="w-full text-left flex items-center gap-3 
                       px-5 py-4 text-sm hover:bg-gray-50 
                       text-red-600 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
