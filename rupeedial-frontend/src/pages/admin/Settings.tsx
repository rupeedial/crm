import { useState } from "react";
import {
  Shield,
  Bell,
  Globe,
  CreditCard,
  Database,
  Save,
  CheckCircle,
  Moon,
  Sun,
  Key,
  Mail,
  Activity,
} from "lucide-react";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [saved, setSaved] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  const tabs = [
    { key: "general", label: "General", icon: Globe },
    { key: "notifications", label: "Notifications", icon: Bell },
    { key: "security", label: "Security", icon: Shield },
    { key: "billing", label: "Billing", icon: CreditCard },
    { key: "system", label: "System", icon: Database },
    { key: "api", label: "API Keys", icon: Key },
    { key: "smtp", label: "SMTP", icon: Mail },
    { key: "logs", label: "Activity Logs", icon: Activity },
  ];

  return (
    <div className="p-8 space-y-8 min-h-screen bg-background text-foreground">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Settings</h1>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700 transition"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      {saved && (
        <div className="bg-emerald-50 text-emerald-700 p-3 rounded-lg flex gap-2">
          <CheckCircle size={16} />
          Settings Saved
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* SIDEBAR */}
        <div className="bg-card p-4 rounded-xl shadow-sm space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition ${
                activeTab === tab.key
                  ? "bg-emerald-600 text-white"
                  : "hover:bg-muted text-muted-foreground"
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="lg:col-span-3 bg-card p-8 rounded-xl shadow-sm space-y-6">

          {/* GENERAL */}
          {activeTab === "general" && (
            <>
              <h2 className="text-lg font-semibold">General Settings</h2>

              <input
                className="w-full border rounded-lg px-3 py-2 bg-background"
                defaultValue="RupeeDial"
              />

              <div className="flex justify-between border p-4 rounded-lg">
                <span>Dark Mode</span>
                <button onClick={toggleTheme} className="flex gap-2">
                  {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                  {darkMode ? "Light" : "Dark"}
                </button>
              </div>
            </>
          )}

          {/* SECURITY */}
          {activeTab === "security" && (
            <>
              <h2 className="text-lg font-semibold">Security</h2>

              <input
                type="password"
                placeholder="Change Password"
                className="w-full border rounded-lg px-3 py-2 bg-background"
              />

              <div className="flex justify-between border p-4 rounded-lg">
                <span>Enable 2FA</span>
                <input type="checkbox" />
              </div>
            </>
          )}

          {/* BILLING */}
          {activeTab === "billing" && (
            <>
              <h2 className="text-lg font-semibold">Payment Gateway</h2>

              {/* Razorpay */}
              <div className="border p-4 rounded-lg space-y-2">
                <h3 className="font-semibold">Razorpay</h3>
                <input placeholder="Key ID" className="w-full border rounded-lg px-3 py-2 bg-background" />
                <input placeholder="Secret Key" className="w-full border rounded-lg px-3 py-2 bg-background" />
              </div>

              {/* Stripe */}
              <div className="border p-4 rounded-lg space-y-2">
                <h3 className="font-semibold">Stripe</h3>
                <input placeholder="Publishable Key" className="w-full border rounded-lg px-3 py-2 bg-background" />
                <input placeholder="Secret Key" className="w-full border rounded-lg px-3 py-2 bg-background" />
              </div>
            </>
          )}

          {/* API KEYS */}
          {activeTab === "api" && (
            <>
              <h2 className="text-lg font-semibold">API Keys</h2>

              <div className="space-y-4">
                <div className="border p-4 rounded-lg">
                  <p className="text-sm">Public API Key</p>
                  <p className="font-mono text-xs">pk_live_xxxxxxxx</p>
                </div>

                <div className="border p-4 rounded-lg">
                  <p className="text-sm">Secret API Key</p>
                  <p className="font-mono text-xs">sk_live_xxxxxxxx</p>
                </div>

                <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg">
                  Regenerate Keys
                </button>
              </div>
            </>
          )}

          {/* SMTP */}
          {activeTab === "smtp" && (
            <>
              <h2 className="text-lg font-semibold">SMTP Configuration</h2>

              <input placeholder="SMTP Host" className="w-full border rounded-lg px-3 py-2 bg-background" />
              <input placeholder="SMTP Port" className="w-full border rounded-lg px-3 py-2 bg-background" />
              <input placeholder="Username" className="w-full border rounded-lg px-3 py-2 bg-background" />
              <input type="password" placeholder="Password" className="w-full border rounded-lg px-3 py-2 bg-background" />

              <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg">
                Test Connection
              </button>
            </>
          )}

          {/* ACTIVITY LOGS */}
          {activeTab === "logs" && (
            <>
              <h2 className="text-lg font-semibold">Activity Logs</h2>

              <div className="space-y-3">
                <div className="border p-3 rounded-lg text-sm">
                  Admin logged in – 10:32 AM
                </div>
                <div className="border p-3 rounded-lg text-sm">
                  Campaign Created – Personal Loan Blast
                </div>
                <div className="border p-3 rounded-lg text-sm">
                  API Key Regenerated
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
