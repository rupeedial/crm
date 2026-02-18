import { useState } from "react";
import {
  Sparkles,
  Search,
  Send,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function GoogleAdsCampaign() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    product: "Personal Loan",
    language: "English",
    city: "Mumbai",
    pin: "400001",
    tone: "Professional",
    headline1: "",
    headline2: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [launched, setLaunched] = useState(false);

  const [stats, setStats] = useState({
    impressions: 0,
    clicks: 0,
    leads: 0,
  });

  /* ================= GENERATE ================= */

  const generateAd = () => {
    setLoading(true);

    setTimeout(() => {
      let h1 = "";
      let h2 = "";
      let desc = "";

      // Language Logic
      if (form.language === "Hindi") {
        h1 = `${form.product} ${form.city} me`;
        h2 = "Turant Manzoori – Apply Karein";

        desc = `${form.city} (${form.pin}) me ${form.product} paaye kam byaj dar par. Fast approval aur kam documents.`;
      } 
      else if (form.language === "Hinglish") {
        h1 = `${form.product} in ${form.city}`;
        h2 = "Instant Approval – Apply Now";

        desc = `Get ${form.product} in ${form.city} (${form.pin}). Fast processing & minimal documents. Apply today.`;
      } 
      else {
        h1 = `${form.product} in ${form.city}`;
        h2 = "Instant Approval – Apply Now";

        desc = `Get ${form.product} at low interest rates in ${form.city} (${form.pin}). Fast processing & minimal documents.`;
      }

      // Tone Logic
      if (form.tone === "Aggressive") {
        h2 = "⚡ Limited Time Offer";
      }

      if (form.tone === "Trust Based") {
        desc += " Trusted by thousands of customers.";
      }

      if (form.tone === "Local") {
        desc += ` Special offer for ${form.city} residents.`;
      }

      setForm({
        ...form,
        headline1: h1.slice(0, 30),     // Google limit
        headline2: h2.slice(0, 30),
        description: desc.slice(0, 90), // Google limit
      });

      setLoading(false);
    }, 700);
  };

  /* ================= VALIDATION ================= */

  const compliancePassed =
    form.headline1.trim().length >= 5 &&
    form.headline2.trim().length >= 5 &&
    form.description.trim().length >= 20 &&
    form.headline1.length <= 30 &&
    form.headline2.length <= 30 &&
    form.description.length <= 90;

  /* ================= LAUNCH ================= */

  const launchCampaign = () => {
    if (!compliancePassed) return;

    const impressions = Math.floor(Math.random() * 15000) + 5000;
    const clicks = Math.floor(impressions * 0.1);
    const leads = Math.floor(clicks * 0.25);

    setStats({ impressions, clicks, leads });
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

        <Search className="text-emerald-600" />
        <h1 className="text-2xl font-semibold">Google Ads Campaign</h1>
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
              <option>Hinglish</option>
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

          {/* Headlines */}
          <input
            value={form.headline1}
            onChange={(e) =>
              setForm({ ...form, headline1: e.target.value.slice(0, 30) })
            }
            className="border rounded-lg px-3 py-2 w-full"
            placeholder="Headline 1 (Max 30 chars)"
          />

          <input
            value={form.headline2}
            onChange={(e) =>
              setForm({ ...form, headline2: e.target.value.slice(0, 30) })
            }
            className="border rounded-lg px-3 py-2 w-full"
            placeholder="Headline 2 (Max 30 chars)"
          />

          <textarea
            rows={3}
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value.slice(0, 90) })
            }
            className="border rounded-lg px-3 py-2 w-full resize-none"
            placeholder="Description (Max 90 chars)"
          />

          <button
            onClick={generateAd}
            disabled={loading}
            className="w-full bg-emerald-100 text-emerald-700 py-3 rounded-xl flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            {loading ? "Generating..." : "Generate with AI"}
          </button>

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
                : "Check character limits & fields"}
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
              Campaign Launched Successfully 🚀
            </div>
          )}
        </div>

        {/* ================= RIGHT PANEL ================= */}
        <div className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm flex flex-col">

          <div className="w-full bg-emerald-600 text-white text-center py-2 rounded-lg mb-6 font-semibold">
            LIVE PREVIEW
          </div>

          <div className="bg-gray-50 border rounded-xl p-4 space-y-2">
            <p className="text-xs text-gray-500">
              Ad • www.rupeedial.com
            </p>

            <h3 className="text-blue-600 text-lg font-medium break-words">
              {form.headline1 || "Headline 1"} | {form.headline2 || "Headline 2"}
            </h3>

            <p className="text-sm text-gray-700 break-words">
              {form.description ||
                "Your Google search ad description will appear here."}
            </p>
          </div>

          {/* Stats */}
          <div className="mt-6 bg-gray-50 p-4 rounded-xl text-center text-sm">
            <p className="font-medium">Live Campaign Stats (Estimated)</p>

            <div className="flex justify-around mt-4">
              <div>
                <p className="text-lg font-semibold">{stats.impressions}</p>
                <p className="text-xs text-gray-500">Impressions</p>
              </div>
              <div>
                <p className="text-lg font-semibold">{stats.clicks}</p>
                <p className="text-xs text-gray-500">Clicks</p>
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
