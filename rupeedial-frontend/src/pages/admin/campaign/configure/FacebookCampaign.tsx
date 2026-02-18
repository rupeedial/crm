import { useState } from "react";
import {
  Sparkles,
  Facebook,
  Send,
  CheckCircle,
  Image,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FacebookCampaign() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    product: "Personal Loan",
    language: "English",
    city: "Mumbai",
    pin: "400001",
    tone: "Professional",
    headline: "",
    copy: "",
  });

  const [loading, setLoading] = useState(false);
  const [launched, setLaunched] = useState(false);

  const [stats, setStats] = useState({
    impressions: 0,
    clicks: 0,
    leads: 0,
  });

  /* ================= GENERATE AD ================= */

  const generateAd = () => {
    setLoading(true);

    setTimeout(() => {
      let headline = "";
      let copy = "";

      if (form.language === "Hindi") {
        headline = `${form.city} me ${form.product} – Vishesh Offer`;

        copy = `${form.city} me turant ${form.product} chahiye?

✔ Fast approval
✔ Kam documents
✔ Trusted lenders

Abhi apply karein.`;
      } 
      else if (form.language === "Hinglish") {
        headline = `${form.product} Offer in ${form.city} – Limited Time`;

        copy = `Need quick ${form.product} in ${form.city}?

✔ Fast approval
✔ Minimal documents
✔ Trusted partners

Apply Now!`;
      } 
      else {
        headline = `Get ${form.product} in ${form.city} – Apply Today`;

        copy = `Need quick funds in ${form.city}?

Get ${form.product} with fast approval & minimal documents.

✔ Trusted by 1L+ customers
✔ Instant processing

Apply Now`;
      }

      if (form.tone === "Aggressive") {
        headline = "⚡ Limited Time - " + headline;
      }

      if (form.tone === "Trust Based") {
        copy += "\n\nTrusted by 1,00,000+ happy customers.";
      }

      if (form.tone === "Local") {
        copy += `\n\nSpecial offer for ${form.city} customers.`;
      }

      setForm({ ...form, headline, copy });
      setLoading(false);
    }, 700);
  };

  /* ================= VALIDATION ================= */

  const compliancePassed =
    form.headline.trim().length >= 8 &&
    form.copy.trim().length >= 25;

  /* ================= PUBLISH ================= */

  const publishCampaign = () => {
    if (!compliancePassed) return;

    const impressions = Math.floor(Math.random() * 10000) + 5000;
    const clicks = Math.floor(impressions * 0.08);
    const leads = Math.floor(clicks * 0.25);

    setStats({ impressions, clicks, leads });
    setLaunched(true);
  };

  return (
    <div className="space-y-8">

      {/* ================= HEADER WITH BACK ================= */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <Facebook className="text-emerald-600" />
        <h1 className="text-2xl font-semibold">Facebook Campaign</h1>
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

          <input
            value={form.headline}
            onChange={(e) =>
              setForm({ ...form, headline: e.target.value })
            }
            className="border rounded-lg px-3 py-2 w-full"
            placeholder="Ad Headline"
          />

          <textarea
            rows={4}
            value={form.copy}
            onChange={(e) =>
              setForm({ ...form, copy: e.target.value })
            }
            className="border rounded-lg px-3 py-2 w-full resize-none"
            placeholder="Primary Text"
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
                : "Headline & Copy Required"}
            </div>
            <span className="font-medium">
              {compliancePassed ? "READY" : "NOT READY"}
            </span>
          </div>

          <button
            disabled={!compliancePassed}
            onClick={publishCampaign}
            className="w-full bg-emerald-600 disabled:bg-gray-400 text-white py-3 rounded-xl flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            Publish Campaign
          </button>

          {launched && (
            <div className="text-sm text-emerald-600 font-medium">
              Campaign Published Successfully 🚀
            </div>
          )}
        </div>

        {/* ================= RIGHT PANEL ================= */}
        <div className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm flex flex-col">

          <div className="w-full bg-emerald-600 text-white text-center py-2 rounded-lg mb-6 font-semibold">
            LIVE PREVIEW
          </div>

          <div className="border rounded-xl p-4 bg-gray-50 space-y-3 shadow-sm">

            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-emerald-200 rounded-full" />
              <div>
                <p className="text-sm font-semibold">RupeeDial</p>
                <p className="text-xs text-gray-500">Sponsored</p>
              </div>
            </div>

            <p className="text-sm whitespace-pre-wrap break-words">
              {form.copy || "Your ad copy will appear here"}
            </p>

            <div className="h-44 bg-gray-200 rounded-lg flex items-center justify-center">
              <Image className="text-gray-400" />
            </div>

            <h3 className="font-semibold break-words">
              {form.headline || "Ad Headline"}
            </h3>

            <button className="w-full bg-emerald-600 text-white py-2 rounded-lg">
              Apply Now
            </button>
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
