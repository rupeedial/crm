import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { UserRole } from "@/types";

/* ================= TYPES ================= */

export type PackageType = "FREE" | "TRY" | "PRO";

export interface AuthUser {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  dob?: string;
  department?: string;
  manager?: string;
  joiningDate?: string;

  company?: string;
  pan?: string;
  gst?: string;
  bankName?: string;
  accountNumber?: string;
  ifsc?: string;
  wallet?: number;
  kycStatus?: "verified" | "pending" | "rejected";

  package: PackageType;
}

interface AuthContextType {
  user: AuthUser | null;
  role: UserRole | null;
  loading: boolean;
  setAuth: (user: AuthUser) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

/* ================= CONTEXT ================= */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* ================= PROVIDER ================= */

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  /* ================= SAFE INITIAL LOAD ================= */

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("authUser");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        // 🔥 DEFAULT USER (CHANGE ROLE HERE IF NEEDED)
        const defaultUser: AuthUser = {
          id: "EMP-1001",
          role: "admin",
          name: "Amit Sharma",
          email: "amit.sharma@rupeedial.com",
          phone: "9876543210",
          address: "Mumbai, Maharashtra",
          dob: "1998-04-12",
          department: "Sales",
          manager: "Rahul Verma",
          joiningDate: "2024-01-10",
          package: "PRO",
        };

        localStorage.setItem("authUser", JSON.stringify(defaultUser));
        setUser(defaultUser);
      }
    } catch (error) {
      console.error("Auth error:", error);
      localStorage.removeItem("authUser");
    }

    setLoading(false);
  }, []);

  /* ================= ACTIONS ================= */

  const setAuth = (userData: AuthUser) => {
    setUser(userData);
    localStorage.setItem("authUser", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };

  const switchRole = (newRole: UserRole) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      role: newRole,
    };

    setUser(updatedUser);
    localStorage.setItem("authUser", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
       role: user?.role as "admin" | "employee" | "partner" | null,
        loading,
        setAuth,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* ================= HOOK ================= */

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
