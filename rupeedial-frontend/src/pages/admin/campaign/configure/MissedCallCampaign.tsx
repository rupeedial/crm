import { useState } from "react";
import {
  PhoneMissed,
  Sparkles,
  Send,
  CheckCircle,
  PhoneCall,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MissedCallCampaign() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    product: "Personal Loan",
    language: "English",
    city: "Mumbai",
    pin: "400001",
    tone: "Professional",
    script: "",
  });

  const [loading, setLoading] = useState(false);
  const [launched, setLaunched] = useState(false);

  const [stats, setStats] = useState({
    calls: 0,
    callbacks: 0,
    leads: 0,
  });

  /* ================= GENERATE ================= */

  const generateScript = () => {
    setLoading(true);

    setTimeout(() => {
      let message = "";

      // Language Logic
      if (form.language === "Hindi") {
        message = `1800-RD-LOAN par missed call dein.

${form.city} me ${form.product} ke liye turant callback paayein.

✔ Zero Cost
✔ Fast Approval
✔ Vishwasniya Sewa`;
      } else {
        message = `Give a missed call on 1800-RD-LOAN

Get instant callback for ${form.product} in ${form.city}.

✔ Zero Cost
✔ Quick Approval
✔ Trusted Assistance`;
      }

      // Tone Logic
      if (form.tone === "Aggressive") {
        message = "⚡ Limited Time Offer ⚡\n\n" + message;
      }

      if (form.tone === "Trust Based") {
        message += "\n\nTrusted by thousands of happy customers.";
      }

      if (form.tone === "Local") {
        message += `\n\nSpecial support for ${form.city} residents.`;
      }

      setForm({ ...form, script: message });
      setLoading(false);
    }, 700);
  };

  /* ================= VALIDATION ================= */

  const compliancePassed =
    form.script.trim().length >= 40;

  /* ================= LAUNCH ================= */

  const launchCampaign = () => {
    if (!compliancePassed) return;

    const calls = Math.floor(Math.random() * 1500) + 300;
    const callbacks = Math.floor(calls * 0.8);
    const leads = Math.floor(callbacks * 0.35);

    setStats({ calls, callbacks, leads });
    setLaunched(true);
  };

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <PhoneMissed className="text-emerald-600" />
        <h1 className="text-2xl font-semibold">Missed Call Campaign</h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* ================= LEFT PANEL ================= */}
        <div className="bg-white border border-emerald-100 rounded-2xl p-6 space-y-6 shadow-sm">

          <div className="grid md:grid-cols-2 gap-4">
            <select
              value={form.product}
              onChange={(e) =>
                setForm({ ...form, product: e.target.value })
              }
              className="border rounded-lg px-3 py-2"
            >
              <option>Personal Loan</option>
              <option>Business Loan</option>
              <option>Home Loan</option>
              <option>Credit Card</option>
              <option>Car Loan</option>
              <option>Gold Loan</option>
            </select>

            <select
              value={form.language}
              onChange={(e) =>
                setForm({ ...form, language: e.target.value })
              }
              className="border rounded-lg px-3 py-2"
            >
              <option>English</option>
              <option>Hindi</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              value={form.city}
              onChange={(e) =>
                setForm({ ...form, city: e.target.value })
              }
              className="border rounded-lg px-3 py-2"
              placeholder="City"
            />

            <input
              value={form.pin}
              onChange={(e) =>
                setForm({ ...form, pin: e.target.value })
              }
              className="border rounded-lg px-3 py-2"
              placeholder="Pin Code"
            />
          </div>

          {/* Tone */}
          <div className="flex gap-2 flex-wrap">
            {["Professional", "Aggressive", "Trust Based", "Local"].map(
              (t) => (
                <button
                  key={t}
                  onClick={() =>
                    setForm({ ...form, tone: t })
                  }
                  className={`px-3 py-1 rounded-full text-xs border ${
                    form.tone === t
                      ? "bg-emerald-600 text-white"
                      : "text-gray-500"
                  }`}
                >
                  {t}
                </button>
              )
            )}
          </div>

          <button
            onClick={generateScript}
            disabled={loading}
            className="w-full bg-emerald-100 text-emerald-700 py-3 rounded-xl flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            {loading ? "Generating..." : "Generate with AI"}
          </button>

          <textarea
            rows={6}
            value={form.script}
            onChange={(e) =>
              setForm({ ...form, script: e.target.value })
            }
            className="border rounded-lg px-3 py-2 w-full resize-none"
            placeholder="Missed call campaign message..."
          />

          {/* Compliance */}
          <div
            className={`flex items-center justify-between p-3 rounded-lg text-sm ${
              compliancePassed ? "bg-emerald-50" : "bg-red-50"
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              {compliancePassed
                ? "Compliance Check Passed"
                : "Message too short"}
            </div>
            <span className="font-medium">
              {compliancePassed ? "READY" : "NOT READY"}
            </span>
          </div>

          <button
            disabled={!compliancePassed}
            onClick={launchCampaign}
            className="w-full bg-emerald-600 disabled:bg-gray-400 text-white py-3 rounded-xl flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            Launch Campaign
          </button>

          {launched && (
            <div className="text-sm text-emerald-600 font-medium">
              Missed Call Campaign Launched Successfully 🚀
            </div>
          )}
        </div>

        {/* ================= RIGHT PANEL ================= */}
        <div className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm flex flex-col">

          <div className="w-full bg-emerald-600 text-white text-center py-2 rounded-lg mb-6 font-semibold">
            LIVE PREVIEW
          </div>

          <div className="flex flex-col items-center bg-gray-50 rounded-xl p-6 shadow-inner">

            <PhoneCall className="text-emerald-600 w-8 h-8 mb-3" />

            <p className="font-semibold mb-3">Call Flow Preview</p>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-sm whitespace-pre-wrap break-words w-full text-gray-700">
              {form.script ||
                "Step 1: User gives missed call\nStep 2: Auto callback triggered\nStep 3: Lead created in CRM"}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 bg-gray-50 p-4 rounded-xl text-center text-sm">
            <p className="font-medium">Live Campaign Stats (Estimated)</p>

            <div className="flex justify-around mt-4">
              <div>
                <p className="text-lg font-semibold">{stats.calls}</p>
                <p className="text-xs text-gray-500">Calls</p>
              </div>
              <div>
                <p className="text-lg font-semibold">{stats.callbacks}</p>
                <p className="text-xs text-gray-500">Callbacks</p>
              </div>
              <div>
                <p className="text-lg font-semibold">{stats.leads}</p>
                <p className="text-xs text-gray-500">Leads</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
