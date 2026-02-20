import { useState } from "react";
import {
  Settings,
  User,
  Lock,
  Bell,
  Building2,
  Save,
} from "lucide-react";

export default function PartnerSettings() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="p-6 space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Settings className="w-6 h-6 text-green-700" />
          Account Settings
        </h1>
        <p className="text-sm text-slate-500">
          Manage your profile, security and payout settings
        </p>
      </div>

      {/* TABS */}
      <div className="flex gap-4 border-b pb-2 text-sm font-medium">
        <button onClick={() => setActiveTab("profile")}
          className={activeTab === "profile" ? "text-green-700 border-b-2 border-green-700 pb-1" : "text-slate-500"}>
          Profile
        </button>
        <button onClick={() => setActiveTab("security")}
          className={activeTab === "security" ? "text-green-700 border-b-2 border-green-700 pb-1" : "text-slate-500"}>
          Security
        </button>
        <button onClick={() => setActiveTab("bank")}
          className={activeTab === "bank" ? "text-green-700 border-b-2 border-green-700 pb-1" : "text-slate-500"}>
          Bank Details
        </button>
        <button onClick={() => setActiveTab("notifications")}
          className={activeTab === "notifications" ? "text-green-700 border-b-2 border-green-700 pb-1" : "text-slate-500"}>
          Notifications
        </button>
      </div>

      {/* CONTENT */}
      <div className="bg-white rounded-xl shadow-sm border p-6">

        {/* ================= PROFILE ================= */}
        {activeTab === "profile" && (
          <div className="space-y-4">
            <h2 className="font-semibold text-slate-700 flex items-center gap-2">
              <User className="w-4 h-4 text-green-700" />
              Profile Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Full Name"
                className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-600 outline-none" />
              <input type="email" placeholder="Email Address"
                className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-600 outline-none" />
              <input type="text" placeholder="Mobile Number"
                className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-600 outline-none" />
              <input type="text" placeholder="Company Name"
                className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-600 outline-none" />
            </div>

            <button className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-800 transition">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        )}

        {/* ================= SECURITY ================= */}
        {activeTab === "security" && (
          <div className="space-y-4">
            <h2 className="font-semibold text-slate-700 flex items-center gap-2">
              <Lock className="w-4 h-4 text-green-700" />
              Change Password
            </h2>

            <input type="password" placeholder="Current Password"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-600 outline-none" />
            <input type="password" placeholder="New Password"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-600 outline-none" />
            <input type="password" placeholder="Confirm New Password"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-600 outline-none" />

            <button className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-800 transition">
              <Save className="w-4 h-4" />
              Update Password
            </button>
          </div>
        )}

        {/* ================= BANK DETAILS ================= */}
        {activeTab === "bank" && (
          <div className="space-y-4">
            <h2 className="font-semibold text-slate-700 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-green-700" />
              Payout Bank Details
            </h2>

            <input type="text" placeholder="Account Holder Name"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-600 outline-none" />
            <input type="text" placeholder="Bank Name"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-600 outline-none" />
            <input type="text" placeholder="Account Number"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-600 outline-none" />
            <input type="text" placeholder="IFSC Code"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-600 outline-none" />

            <button className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-800 transition">
              <Save className="w-4 h-4" />
              Save Bank Details
            </button>
          </div>
        )}

        {/* ================= NOTIFICATIONS ================= */}
        {activeTab === "notifications" && (
          <div className="space-y-4">
            <h2 className="font-semibold text-slate-700 flex items-center gap-2">
              <Bell className="w-4 h-4 text-green-700" />
              Notification Preferences
            </h2>

            <div className="flex items-center justify-between">
              <span>Email Notifications</span>
              <input type="checkbox" className="accent-green-700 w-4 h-4" />
            </div>

            <div className="flex items-center justify-between">
              <span>SMS Alerts</span>
              <input type="checkbox" className="accent-green-700 w-4 h-4" />
            </div>

            <div className="flex items-center justify-between">
              <span>Payout Notifications</span>
              <input type="checkbox" className="accent-green-700 w-4 h-4" />
            </div>

            <button className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-800 transition">
              <Save className="w-4 h-4" />
              Save Preferences
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
