import { useState } from "react";
import {
  Settings,
  User,
  Building2,
  Bell,
  Lock,
  Save,
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Profile");

  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@rupeedial.com",
    phone: "9876543210",
  });

  const [company, setCompany] = useState({
    companyName: "RupeeDial Pvt Ltd",
    gst: "27ABCDE1234F1Z5",
    address: "Mumbai, India",
  });

  const [commission, setCommission] = useState({
    defaultRate: 2,
    bonusRate: 0.5,
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    whatsapp: false,
  });

  const saveSettings = () => {
    alert("Settings Saved Successfully ✅");
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex items-center gap-3">
        <Settings className="text-emerald-600" />
        <h1 className="text-2xl font-semibold">Settings</h1>
      </div>

      {/* TABS */}
      <div className="flex gap-4 flex-wrap bg-white p-3 rounded-xl shadow-sm">
        {["Profile", "Company", "Commission", "Notifications", "Security"].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm ${
                activeTab === tab
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              {tab}
            </button>
          )
        )}
      </div>

      {/* CONTENT */}
      <div className="bg-white p-6 rounded-2xl shadow-sm space-y-6">

        {/* PROFILE */}
        {activeTab === "Profile" && (
          <>
            <div className="flex items-center gap-2 mb-4">
              <User className="text-emerald-600" />
              <h2 className="font-semibold">Profile Settings</h2>
            </div>

            <input
              value={profile.name}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
              placeholder="Full Name"
              className="w-full border rounded-lg px-3 py-2"
            />

            <input
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              placeholder="Email"
              className="w-full border rounded-lg px-3 py-2"
            />

            <input
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
              placeholder="Phone"
              className="w-full border rounded-lg px-3 py-2"
            />
          </>
        )}

        {/* COMPANY */}
        {activeTab === "Company" && (
          <>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="text-emerald-600" />
              <h2 className="font-semibold">Company Settings</h2>
            </div>

            <input
              value={company.companyName}
              onChange={(e) =>
                setCompany({ ...company, companyName: e.target.value })
              }
              placeholder="Company Name"
              className="w-full border rounded-lg px-3 py-2"
            />

            <input
              value={company.gst}
              onChange={(e) =>
                setCompany({ ...company, gst: e.target.value })
              }
              placeholder="GST Number"
              className="w-full border rounded-lg px-3 py-2"
            />

            <textarea
              value={company.address}
              onChange={(e) =>
                setCompany({ ...company, address: e.target.value })
              }
              placeholder="Company Address"
              className="w-full border rounded-lg px-3 py-2"
            />
          </>
        )}

        {/* COMMISSION */}
        {activeTab === "Commission" && (
          <>
            <h2 className="font-semibold mb-4">Commission Settings</h2>

            <input
              type="number"
              value={commission.defaultRate}
              onChange={(e) =>
                setCommission({
                  ...commission,
                  defaultRate: e.target.value,
                })
              }
              placeholder="Default Commission %"
              className="w-full border rounded-lg px-3 py-2"
            />

            <input
              type="number"
              value={commission.bonusRate}
              onChange={(e) =>
                setCommission({
                  ...commission,
                  bonusRate: e.target.value,
                })
              }
              placeholder="Bonus Commission %"
              className="w-full border rounded-lg px-3 py-2"
            />
          </>
        )}

        {/* NOTIFICATIONS */}
        {activeTab === "Notifications" && (
          <>
            <div className="flex items-center gap-2 mb-4">
              <Bell className="text-emerald-600" />
              <h2 className="font-semibold">Notification Settings</h2>
            </div>

            {["email", "sms", "whatsapp"].map((type) => (
              <label
                key={type}
                className="flex items-center justify-between border p-3 rounded-lg"
              >
                <span className="capitalize">{type} Alerts</span>
                <input
                  type="checkbox"
                  checked={notifications[type]}
                  onChange={() =>
                    setNotifications({
                      ...notifications,
                      [type]: !notifications[type],
                    })
                  }
                />
              </label>
            ))}
          </>
        )}

        {/* SECURITY */}
        {activeTab === "Security" && (
          <>
            <div className="flex items-center gap-2 mb-4">
              <Lock className="text-emerald-600" />
              <h2 className="font-semibold">Change Password</h2>
            </div>

            <input
              type="password"
              placeholder="Current Password"
              className="w-full border rounded-lg px-3 py-2"
            />

            <input
              type="password"
              placeholder="New Password"
              className="w-full border rounded-lg px-3 py-2"
            />

            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full border rounded-lg px-3 py-2"
            />
          </>
        )}

        {/* SAVE BUTTON */}
        <button
          onClick={saveSettings}
          className="w-full bg-emerald-600 text-white py-3 rounded-xl flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Settings
        </button>
      </div>
    </div>
  );
}
